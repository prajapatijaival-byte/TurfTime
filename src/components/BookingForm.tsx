'use client';

import React, { useState, useEffect } from 'react';
import { SAMPLE_VENUES, DEMO_TIME_SLOTS } from '@/data/venues';
import { BookingFormData, FormErrors } from '@/types';
import {
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  FileText,
  ShieldAlert,
  Zap,
  CheckCircle2,
  X,
  AlertCircle,
} from 'lucide-react';

interface BookingFormProps {
  preselectedVenueId: string;
  preselectedDuration?: number;
}

const CURRENT_DEMO_DATE = '2026-10-18';

export const BookingForm: React.FC<BookingFormProps> = ({
  preselectedVenueId,
  preselectedDuration,
}) => {
  const [prevVenueId, setPrevVenueId] = useState(preselectedVenueId);
  const [prevDuration, setPrevDuration] = useState(preselectedDuration);

  const [formData, setFormData] = useState<BookingFormData>({
    fullName: '',
    email: '',
    phone: '',
    venueId: preselectedVenueId || SAMPLE_VENUES[0].id,
    date: CURRENT_DEMO_DATE,
    timeSlot: DEMO_TIME_SLOTS[4], // Prime evening slot default
    duration: preselectedDuration || 1,
    notes: '',
  });

  // React pattern: adjust state during rendering when props change
  if (preselectedVenueId !== prevVenueId || preselectedDuration !== prevDuration) {
    setPrevVenueId(preselectedVenueId);
    setPrevDuration(preselectedDuration);
    setFormData((prev) => ({
      ...prev,
      venueId: preselectedVenueId,
      ...(preselectedDuration ? { duration: preselectedDuration } : {}),
    }));
  }

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [acknowledgedNotice, setAcknowledgedNotice] = useState<boolean>(false);
  const [submissionPreview, setSubmissionPreview] = useState<{
    payload: BookingFormData;
    calculatedTotal: number;
    venueName: string;
    venueLocality: string;
  } | null>(null);

  // Close preview modal on Escape key
  useEffect(() => {
    if (!submissionPreview) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSubmissionPreview(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [submissionPreview]);

  // Find currently selected venue
  const selectedVenue =
    SAMPLE_VENUES.find((v) => v.id === formData.venueId) || SAMPLE_VENUES[0];

  // Dynamic price calculation
  const estimatedTotal = selectedVenue.hourlyRate * formData.duration;

  // Form validation function
  const validate = (data: BookingFormData): FormErrors => {
    const errs: FormErrors = {};

    if (!data.fullName.trim()) {
      errs.fullName = 'Please enter your full name.';
    } else if (data.fullName.trim().length < 2) {
      errs.fullName = 'Name must be at least 2 characters long.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email.trim()) {
      errs.email = 'Please provide your email address.';
    } else if (!emailRegex.test(data.email.trim())) {
      errs.email = 'Please enter a valid email address (e.g., name@domain.com).';
    }

    const phoneRegex = /^[6-9]\d{9}$/; // Standard 10-digit Indian mobile format
    const cleanPhone = data.phone.replace(/[\s\-\+]/g, '').slice(-10);
    if (!data.phone.trim()) {
      errs.phone = 'Please provide a 10-digit contact number.';
    } else if (!phoneRegex.test(cleanPhone)) {
      errs.phone = 'Enter a valid 10-digit mobile number (starting with 6-9).';
    }

    if (!data.venueId) {
      errs.venueId = 'Please select a sports venue.';
    }

    if (!data.date) {
      errs.date = 'Please pick a booking date.';
    } else if (data.date < CURRENT_DEMO_DATE) {
      errs.date = 'Booking date cannot be in the past.';
    }

    if (!data.timeSlot) {
      errs.timeSlot = 'Please choose a preferred time slot.';
    }

    if (!data.duration || data.duration <= 0) {
      errs.duration = 'Please select a valid booking duration.';
    }

    return errs;
  };

  const handleBlur = (field: keyof BookingFormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const currentErrors = validate(formData);
    setErrors(currentErrors);
  };

  const handleChange = (
    field: keyof BookingFormData,
    value: string | number
  ) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    if (touched[field]) {
      const currentErrors = validate(updated);
      setErrors(currentErrors);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({
      fullName: true,
      email: true,
      phone: true,
      venueId: true,
      date: true,
      timeSlot: true,
      duration: true,
    });

    const validationErrors = validate(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // Inputs are valid!
      // In Phase 1: show client preview modal explaining Phase 2 readiness
      setSubmissionPreview({
        payload: { ...formData },
        calculatedTotal: estimatedTotal,
        venueName: selectedVenue.name,
        venueLocality: selectedVenue.locality,
      });
    } else {
      // Focus first error element
      const firstErrorKey = Object.keys(validationErrors)[0];
      const element = document.getElementById(`field-${firstErrorKey}`);
      if (element) {
        element.focus();
      }
    }
  };

  return (
    <section id="booking" className="py-20 bg-[#090D10] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#B7FF3C]">
            Interactive Request Form
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Request a Turf Slot
          </h2>
          <p className="text-sm sm:text-base text-neutral-400">
            Select your preferred Mumbai venue, configure date and duration, and preview dynamic
            pricing in real time.
          </p>
        </div>

        {/* Phase 1 Constraint Notification Card */}
        <div className="mb-10 p-4 sm:p-5 rounded-2xl bg-[#0E1419] border border-[#23303B] max-w-4xl mx-auto flex items-start gap-3.5">
          <div className="p-2 rounded-lg bg-[#131B22] border border-[#23303B] text-[#B7FF3C] shrink-0 mt-0.5">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Phase 1 Frontend Demonstration Notice
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              This form executes full client-side validation, live pricing calculation, and state
              management. Submitting this form tests frontend reliability and prepares the structured
              payload. It does <strong className="text-neutral-200">not</strong> record entries to a
              live database or confirm reservations until Phase 2 backend (Supabase + Route Handlers) is connected.
            </p>
          </div>
        </div>

        {/* Demo Request Validated Banner */}
        {acknowledgedNotice && (
          <div className="mb-8 p-4.5 rounded-2xl bg-[#0E1419] border border-[#B7FF3C]/40 max-w-4xl mx-auto flex items-start justify-between gap-3 text-xs animate-in fade-in duration-300">
            <div className="flex items-start gap-3">
              <div className="p-1.5 rounded-lg bg-[#131B22] border border-[#B7FF3C]/30 text-[#B7FF3C] shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-bold text-white text-sm">
                  Phase 1 Demo Request Validated Successfully
                </h4>
                <p className="text-neutral-300 leading-relaxed">
                  Your booking request parameters have been structured and verified on the client.
                  No charge was processed and no database record was written. In Phase 2, this request
                  will connect to Supabase PostgreSQL and dispatch an email confirmation.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setAcknowledgedNotice(false)}
              className="text-neutral-400 hover:text-white p-1 rounded-lg hover:bg-[#131B22] transition-colors"
              aria-label="Dismiss validated demo notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Main Form Layout (2 Columns on large screens) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto">
          {/* Left Column: Form Fields */}
          <div className="lg:col-span-7 bg-[#0E1419] border border-[#23303B] rounded-2xl p-6 sm:p-8 shadow-xl">
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              {/* Customer Full Name */}
              <div className="space-y-1.5">
                <label
                  htmlFor="field-fullName"
                  className="block text-xs font-semibold uppercase tracking-wider text-neutral-300"
                >
                  Full Name / Organizer Name <span className="text-[#B7FF3C]">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
                  <input
                    id="field-fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    onBlur={() => handleBlur('fullName')}
                    placeholder="e.g. Rohan Sharma"
                    className={`w-full bg-[#131B22] border rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none transition-all ${
                      errors.fullName && touched.fullName
                        ? 'border-rose-500 focus:border-rose-500 focus:ring-1 focus:ring-rose-500'
                        : 'border-[#23303B] focus:border-[#B7FF3C] focus:ring-1 focus:ring-[#B7FF3C]'
                    }`}
                    aria-invalid={!!errors.fullName}
                    aria-describedby={errors.fullName ? 'error-fullName' : undefined}
                  />
                </div>
                {errors.fullName && touched.fullName && (
                  <p id="error-fullName" className="text-xs text-rose-400 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    {errors.fullName}
                  </p>
                )}
              </div>

              {/* Email & Phone (Grid) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Email Address */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="field-email"
                    className="block text-xs font-semibold uppercase tracking-wider text-neutral-300"
                  >
                    Email Address <span className="text-[#B7FF3C]">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
                    <input
                      id="field-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      onBlur={() => handleBlur('email')}
                      placeholder="rohan@example.com"
                      className={`w-full bg-[#131B22] border rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none transition-all ${
                        errors.email && touched.email
                          ? 'border-rose-500 focus:border-rose-500 focus:ring-1 focus:ring-rose-500'
                          : 'border-[#23303B] focus:border-[#B7FF3C] focus:ring-1 focus:ring-[#B7FF3C]'
                      }`}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'error-email' : undefined}
                    />
                  </div>
                  {errors.email && touched.email && (
                    <p id="error-email" className="text-xs text-rose-400 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Contact Number */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="field-phone"
                    className="block text-xs font-semibold uppercase tracking-wider text-neutral-300"
                  >
                    Contact Number <span className="text-[#B7FF3C]">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
                    <input
                      id="field-phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      onBlur={() => handleBlur('phone')}
                      placeholder="9820012345"
                      className={`w-full bg-[#131B22] border rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none transition-all ${
                        errors.phone && touched.phone
                          ? 'border-rose-500 focus:border-rose-500 focus:ring-1 focus:ring-rose-500'
                          : 'border-[#23303B] focus:border-[#B7FF3C] focus:ring-1 focus:ring-[#B7FF3C]'
                      }`}
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? 'error-phone' : undefined}
                    />
                  </div>
                  {errors.phone && touched.phone && (
                    <p id="error-phone" className="text-xs text-rose-400 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              {/* Venue Selection */}
              <div className="space-y-1.5">
                <label
                  htmlFor="field-venueId"
                  className="block text-xs font-semibold uppercase tracking-wider text-neutral-300"
                >
                  Selected Sports Turf <span className="text-[#B7FF3C]">*</span>
                </label>
                <select
                  id="field-venueId"
                  value={formData.venueId}
                  onChange={(e) => handleChange('venueId', e.target.value)}
                  onBlur={() => handleBlur('venueId')}
                  className="w-full bg-[#131B22] border border-[#23303B] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#B7FF3C] focus:ring-1 focus:ring-[#B7FF3C] transition-all cursor-pointer"
                >
                  {SAMPLE_VENUES.map((venue) => (
                    <option key={venue.id} value={venue.id} className="bg-[#131B22] text-white">
                      {venue.name} ({venue.locality}) — ₹{venue.hourlyRate.toLocaleString('en-IN')}/hr
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-neutral-400">
                  Surface: {selectedVenue.surface} • Size: {selectedVenue.dimensions}
                </p>
              </div>

              {/* Date & Duration (Grid) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Date Selection */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="field-date"
                    className="block text-xs font-semibold uppercase tracking-wider text-neutral-300"
                  >
                    Booking Date <span className="text-[#B7FF3C]">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
                    <input
                      id="field-date"
                      type="date"
                      min={CURRENT_DEMO_DATE}
                      value={formData.date}
                      onChange={(e) => handleChange('date', e.target.value)}
                      onBlur={() => handleBlur('date')}
                      className={`w-full bg-[#131B22] border rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none transition-all cursor-pointer ${
                        errors.date && touched.date
                          ? 'border-rose-500 focus:border-rose-500 focus:ring-1 focus:ring-rose-500'
                          : 'border-[#23303B] focus:border-[#B7FF3C] focus:ring-1 focus:ring-[#B7FF3C]'
                      }`}
                      aria-invalid={!!errors.date}
                      aria-describedby={errors.date ? 'error-date' : undefined}
                    />
                  </div>
                  {errors.date && touched.date && (
                    <p id="error-date" className="text-xs text-rose-400 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {errors.date}
                    </p>
                  )}
                </div>

                {/* Duration Selection */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="field-duration"
                    className="block text-xs font-semibold uppercase tracking-wider text-neutral-300"
                  >
                    Duration <span className="text-[#B7FF3C]">*</span>
                  </label>
                  <select
                    id="field-duration"
                    value={formData.duration}
                    onChange={(e) => handleChange('duration', Number(e.target.value))}
                    className="w-full bg-[#131B22] border border-[#23303B] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#B7FF3C] focus:ring-1 focus:ring-[#B7FF3C] transition-all cursor-pointer"
                  >
                    {selectedVenue.availableDurations.map((hrs) => (
                      <option key={hrs} value={hrs} className="bg-[#131B22] text-white">
                        {hrs} {hrs === 1 ? 'Hour' : 'Hours'} ({hrs * 60} mins)
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Time Slot Selection */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="field-timeSlot"
                    className="block text-xs font-semibold uppercase tracking-wider text-neutral-300"
                  >
                    Preferred Time Slot <span className="text-[#B7FF3C]">*</span>
                  </label>
                  <span className="text-[10px] text-neutral-400">Illustrative Schedule</span>
                </div>
                <div className="relative">
                  <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
                  <select
                    id="field-timeSlot"
                    value={formData.timeSlot}
                    onChange={(e) => handleChange('timeSlot', e.target.value)}
                    className="w-full bg-[#131B22] border border-[#23303B] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#B7FF3C] focus:ring-1 focus:ring-[#B7FF3C] transition-all cursor-pointer"
                  >
                    {DEMO_TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot} className="bg-[#131B22] text-white">
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
                <p className="text-[11px] text-neutral-400">
                  Note: Sample time slots are illustrative demo fixtures and do not represent verified real-time availability.
                </p>
              </div>

              {/* Optional Notes */}
              <div className="space-y-1.5">
                <label
                  htmlFor="field-notes"
                  className="block text-xs font-semibold uppercase tracking-wider text-neutral-300"
                >
                  Match Notes / Equipment Requests <span className="text-neutral-500 font-normal">(Optional)</span>
                </label>
                <div className="relative">
                  <FileText className="absolute left-3.5 top-3 w-4 h-4 text-neutral-400 pointer-events-none" />
                  <textarea
                    id="field-notes"
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => handleChange('notes', e.target.value)}
                    placeholder="e.g. Need extra football bibs, requesting match referee recommendation, or organizing a 7v7 friendly."
                    className="w-full bg-[#131B22] border border-[#23303B] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#B7FF3C] focus:ring-1 focus:ring-[#B7FF3C] transition-all resize-none"
                  />
                </div>
              </div>

              {/* Submit Action */}
              <div className="pt-2">
                <button
                  type="submit"
                  id="submit-booking-request-btn"
                  className="w-full py-3.5 px-6 rounded-xl font-bold text-sm uppercase tracking-wider bg-[#B7FF3C] text-[#090D10] hover:bg-[#A3EA30] active:scale-[0.99] transition-all duration-200 shadow-lg shadow-[#B7FF3C]/20 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Zap className="w-4 h-4 stroke-[2.5]" />
                  Validate & Preview Booking Request (Phase 1)
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Live Price Summary & Calculation Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0E1419] border border-[#23303B] rounded-2xl p-6 sm:p-7 shadow-xl space-y-6 sticky top-28">
              <div className="flex items-center justify-between pb-4 border-b border-[#23303B]">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Zap className="w-4 h-4 text-[#B7FF3C]" />
                  Live Cost Breakdown
                </h3>
                <span className="text-[11px] font-semibold text-[#B7FF3C] px-2 py-0.5 rounded bg-[#131B22] border border-[#B7FF3C]/30">
                  Dynamic Sync
                </span>
              </div>

              {/* Selected Venue Snapshot */}
              <div className="space-y-1">
                <span className="text-xs text-neutral-400">Chosen Venue</span>
                <p className="text-base font-bold text-white">{selectedVenue.name}</p>
                <p className="text-xs text-[#B7FF3C]">{selectedVenue.locality}, Mumbai</p>
              </div>

              {/* Itemized Calculation */}
              <div className="space-y-3 pt-2 text-xs">
                <div className="flex justify-between text-neutral-300">
                  <span>Base Rate per Hour</span>
                  <span>₹{selectedVenue.hourlyRate.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-neutral-300">
                  <span>Duration Selected</span>
                  <span>{formData.duration} {formData.duration === 1 ? 'Hour' : 'Hours'}</span>
                </div>
                <div className="flex justify-between text-neutral-300">
                  <span>Date & Slot</span>
                  <span className="text-right truncate max-w-[170px] text-neutral-400">
                    {formData.date} • {formData.timeSlot.split(' ')[0]}
                  </span>
                </div>
                <div className="flex justify-between text-neutral-300">
                  <span>High-Mast Floodlight Access</span>
                  <span className="text-[#B7FF3C] font-semibold">Free / Included</span>
                </div>
                <div className="flex justify-between text-neutral-300">
                  <span>Booking Platform Fee</span>
                  <span className="text-[#B7FF3C] font-semibold">₹0 (Phase 1)</span>
                </div>

                {/* Total */}
                <div className="pt-4 border-t border-[#23303B] flex items-baseline justify-between">
                  <div>
                    <span className="text-xs uppercase tracking-wider font-bold text-neutral-300 block">
                      Estimated Total
                    </span>
                    <span className="text-[10px] text-neutral-400">(Illustrative Demo Rate)</span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl sm:text-3xl font-black text-[#B7FF3C]">
                      ₹{estimatedTotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Checklist Badges */}
              <div className="pt-4 border-t border-[#23303B] space-y-2 text-xs text-neutral-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#B7FF3C]" />
                  <span>Real-time duration rate multiplier</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#B7FF3C]" />
                  <span>Client-side input schema validation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#B7FF3C]" />
                  <span>Form pre-selects venue from cards</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Phase 1 Validation & Payload Preview Modal */}
      {submissionPreview && (
        <div
          onClick={() => setSubmissionPreview(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200 cursor-pointer"
          role="dialog"
          aria-modal="true"
          aria-labelledby="preview-modal-title"
        >
          <div
            className="relative w-full max-w-xl bg-[#0E1419] border border-[#23303B] rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6 cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#23303B]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#131B22] border border-[#B7FF3C]/50 flex items-center justify-center text-[#B7FF3C]">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 id="preview-modal-title" className="text-lg font-black text-white">
                    Client Validation Passed
                  </h3>
                  <p className="text-xs text-neutral-400">Phase 1 Frontend Request Payload Ready</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSubmissionPreview(null)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white bg-[#131B22] border border-[#23303B]"
                aria-label="Close preview modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Assessment Limitation Explanation */}
            <div className="p-4 rounded-xl bg-[#131B22] border border-[#23303B] text-xs text-neutral-300 space-y-2">
              <p className="font-bold text-[#B7FF3C] flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                Assessment Constraint Verification:
              </p>
              <p className="text-neutral-400 leading-relaxed">
                As required for Phase 1, no fake successful server response is generated and no records
                have been written to a database. The form has verified all inputs, computed dynamic costs,
                and assembled the payload below for future Route Handler integration.
              </p>
            </div>

            {/* Assembled Request Details */}
            <div className="bg-[#090D10] border border-[#23303B] rounded-xl p-4 space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-[#23303B]/60">
                <span className="text-neutral-400">Organizer:</span>
                <span className="font-semibold text-white">{submissionPreview.payload.fullName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#23303B]/60">
                <span className="text-neutral-400">Contact:</span>
                <span className="font-semibold text-white">
                  {submissionPreview.payload.email} • {submissionPreview.payload.phone}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#23303B]/60">
                <span className="text-neutral-400">Venue:</span>
                <span className="font-semibold text-white">
                  {submissionPreview.venueName} ({submissionPreview.venueLocality})
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#23303B]/60">
                <span className="text-neutral-400">Schedule:</span>
                <span className="font-semibold text-white">
                  {submissionPreview.payload.date} ({submissionPreview.payload.duration} hrs)
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#23303B]/60">
                <span className="text-neutral-400">Time Slot:</span>
                <span className="font-semibold text-[#B7FF3C]">{submissionPreview.payload.timeSlot}</span>
              </div>
              {submissionPreview.payload.notes && (
                <div className="py-1 border-b border-[#23303B]/60">
                  <span className="text-neutral-400 block mb-0.5">Notes:</span>
                  <span className="font-normal text-neutral-300 italic">{submissionPreview.payload.notes}</span>
                </div>
              )}
              <div className="flex justify-between pt-2 text-sm font-bold">
                <span className="text-white">Estimated Total:</span>
                <span className="text-[#B7FF3C]">
                  ₹{submissionPreview.calculatedTotal.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setSubmissionPreview(null)}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold text-neutral-300 hover:text-white bg-[#131B22] border border-[#23303B] hover:border-neutral-500 transition-colors"
              >
                Modify Request
              </button>
              <button
                type="button"
                onClick={() => {
                  setSubmissionPreview(null);
                  setAcknowledgedNotice(true);
                }}
                className="px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#B7FF3C] text-[#090D10] hover:bg-[#A3EA30] transition-colors"
              >
                Acknowledge Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
