import { NextRequest, NextResponse } from 'next/server';

/**
 * Route Handler: /api/bookings
 * 
 * Phase 1 Architecture Contract:
 * Prepares the Next.js App Router API boundary for Phase 2 Supabase integration.
 * In Phase 2, this handler will authenticate requests, check slot conflicts in Supabase,
 * and create an immutable booking record in PostgreSQL.
 */

export async function GET() {
  return NextResponse.json({
    status: 'Phase 1 Frontend Prototype',
    message: 'TurfTime API is structured for Phase 2 Supabase integration.',
    endpoints: {
      venues: 'Available via static dataset in Phase 1; planned Supabase query in Phase 2.',
      bookings: 'POST /api/bookings will handle slot creation and Supabase persistence in Phase 2.',
    },
    version: '1.0.0-phase1',
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Basic structure validation for Phase 2 readiness
    const { fullName, email, phone, venueId, date, timeSlot, duration } = body;

    if (!fullName || !email || !phone || !venueId || !date || !timeSlot || !duration) {
      return NextResponse.json(
        {
          error: 'Missing required booking request parameters.',
          received: { fullName, email, phone, venueId, date, timeSlot, duration },
        },
        { status: 400 }
      );
    }

    // Phase 1 constraint: Explicitly return Phase 1 status without faking DB persistence
    return NextResponse.json(
      {
        success: false,
        phase: 1,
        status: 'api_contract_verified',
        message:
          'Phase 1 API Contract Verified. Full persistent database storage and slot locking will be implemented in Phase 2 using Supabase PostgreSQL.',
        payloadPreview: {
          fullName,
          email,
          phone,
          venueId,
          date,
          timeSlot,
          duration,
        },
      },
      { status: 501 } // 501 Not Implemented (Honest HTTP semantics for Phase 1 prototype)
    );
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON request payload.' },
      { status: 400 }
    );
  }
}
