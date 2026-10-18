import { NextRequest, NextResponse } from 'next/server';
import { SAMPLE_VENUES } from '@/data/venues';
import { getSupabaseServerClient, isSupabaseConfigured } from '@/lib/supabaseServer';

/**
 * Route Handler: /api/bookings
 * 
 * Phase 2 Supabase PostgreSQL Integration:
 * - Validates all parameters on the server side (name, email, 10-digit phone, date, slot, duration).
 * - Enforces server-side price calculation using authoritative venue data; client-submitted rates are ignored.
 * - Inserts validated requests into Supabase PostgreSQL under least-privilege RLS.
 * - Returns clean HTTP status codes and safe error messages without exposing PII in logs.
 */

export async function GET() {
  const configured = isSupabaseConfigured();
  return NextResponse.json({
    service: 'TurfTime Booking API',
    phase: 2,
    database: {
      provider: 'Supabase PostgreSQL',
      configured,
      status: configured
        ? 'Connected / Ready for transactions'
        : 'Awaiting Supabase project URL & Key in .env.local',
    },
    schema: 'booking_requests',
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 1. Extract inputs
    const fullName = typeof body.fullName === 'string' ? body.fullName.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    const phone = typeof body.phone === 'string' ? body.phone.replace(/[\s\-\+]/g, '') : '';
    const venueId = typeof body.venueId === 'string' ? body.venueId.trim() : '';
    const date = typeof body.date === 'string' ? body.date.trim() : '';
    const timeSlot = typeof body.timeSlot === 'string' ? body.timeSlot.trim() : '';
    const duration = typeof body.duration === 'number' ? body.duration : Number(body.duration);
    const notes = typeof body.notes === 'string' ? body.notes.trim() : '';

    // 2. Strict Server-Side Validation
    const validationErrors: Record<string, string> = {};

    if (!fullName || fullName.length < 2 || fullName.length > 100) {
      validationErrors.fullName = 'Full name is required (2–100 characters).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!email || !emailRegex.test(email) || email.length > 255) {
      validationErrors.email = 'A valid email address is required (e.g., user@example.com).';
    }

    const cleanPhone = phone.slice(-10);
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!cleanPhone || !phoneRegex.test(cleanPhone)) {
      validationErrors.phone = 'A valid 10-digit Indian mobile number is required (starting with 6-9).';
    }

    // Authoritative venue lookup
    const matchedVenue = SAMPLE_VENUES.find((v) => v.id === venueId);
    if (!matchedVenue) {
      validationErrors.venueId = 'Invalid sports venue selected.';
    }

    // Date validation
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!date || !dateRegex.test(date)) {
      validationErrors.date = 'Date must be formatted as YYYY-MM-DD.';
    } else {
      // Safe against global timezone offsets (allows local today across any timezone up to UTC-12)
      const now = new Date();
      const yesterdayUtc = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      if (date < yesterdayUtc) {
        validationErrors.date = 'Booking date cannot be in the past.';
      }
    }

    if (!timeSlot || timeSlot.length < 3 || timeSlot.length > 60) {
      validationErrors.timeSlot = 'A valid time slot window must be selected.';
    }

    if (isNaN(duration) || duration <= 0 || duration > 12) {
      validationErrors.duration = 'Booking duration must be between 1 and 12 hours.';
    } else if (matchedVenue && !matchedVenue.availableDurations.includes(duration)) {
      validationErrors.duration = `Duration ${duration}h is not supported for ${matchedVenue.name}. Supported durations: ${matchedVenue.availableDurations.join(', ')}h.`;
    }

    if (notes && notes.length > 500) {
      validationErrors.notes = 'Optional notes cannot exceed 500 characters.';
    }

    // Return 400 if any validations failed
    if (Object.keys(validationErrors).length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed on one or more booking request fields.',
          validationErrors,
        },
        { status: 400 }
      );
    }

    // 3. Authoritative Server-Side Calculation (Never trust client-submitted prices)
    const authoritativeVenue = matchedVenue!;
    const trustedEstimatedPrice = Math.round(authoritativeVenue.hourlyRate * duration);
    const trustedVenueName = authoritativeVenue.name;

    // 4. Check Supabase Connectivity
    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Database credentials are not yet configured. Please add your Supabase Project URL and Anon/Service Key to .env.local to enable live database persistence.',
          requiresConfiguration: true,
        },
        { status: 503 }
      );
    }

    const supabase = getSupabaseServerClient();
    if (!supabase) {
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to initialize Supabase server client.',
        },
        { status: 500 }
      );
    }

    // 5. Generate secure UUID and Insert Record into Supabase PostgreSQL
    const bookingId = crypto.randomUUID();
    const createdAt = new Date().toISOString();

    const { error } = await supabase
      .from('booking_requests')
      .insert({
        id: bookingId,
        created_at: createdAt,
        customer_name: fullName,
        email,
        phone: cleanPhone,
        venue_id: authoritativeVenue.id,
        venue_name: trustedVenueName,
        booking_date: date,
        start_time: timeSlot,
        duration_hours: duration,
        estimated_price: trustedEstimatedPrice,
        notes: notes || null,
        status: 'pending',
      });

    if (error) {
      console.error('Supabase insert failed with code:', error.code, error.message);
      const isMissingTable =
        error.code === 'PGRST205' ||
        error.message?.includes('Could not find the table') ||
        error.message?.includes('does not exist');

      return NextResponse.json(
        {
          success: false,
          error: isMissingTable
            ? "Database table 'booking_requests' does not exist yet. Please run the SQL migration script in your Supabase SQL Editor to initialize the table and RLS policies."
            : `Database insertion error: ${error.message}`,
          missingTable: isMissingTable,
        },
        { status: isMissingTable ? 503 : 500 }
      );
    }

    // 6. Return 201 Created on Successful Insert
    return NextResponse.json(
      {
        success: true,
        message: 'Your booking inquiry has been recorded and is currently pending review.',
        booking: {
          id: bookingId,
          createdAt,
          status: 'pending',
          venueName: trustedVenueName,
          bookingDate: date,
          startTime: timeSlot,
          durationHours: duration,
          estimatedPrice: trustedEstimatedPrice,
        },
      },
      { status: 201 }
    );
  } catch {
    console.error('API /api/bookings unexpected error');
    return NextResponse.json(
      {
        success: false,
        error: 'An unexpected server error occurred while processing the booking request.',
      },
      { status: 500 }
    );
  }
}
