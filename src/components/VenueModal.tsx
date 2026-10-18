'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, CheckCircle2, Clock, Users, Maximize2, ShieldAlert, ArrowRight, Zap } from 'lucide-react';
import { Venue } from '@/types';

interface VenueModalProps {
  venue: Venue | null;
  onClose: () => void;
  onSelectForBooking: (venueId: string, duration: number) => void;
}

export const VenueModal: React.FC<VenueModalProps> = ({
  venue,
  onClose,
  onSelectForBooking,
}) => {
  const [selectedDuration, setSelectedDuration] = useState<number>(venue?.availableDurations[0] || 1);
  const [prevVenueId, setPrevVenueId] = useState<string | undefined>(venue?.id);
  const closeBtnRef = React.useRef<HTMLButtonElement>(null);

  if (venue && venue.id !== prevVenueId) {
    setPrevVenueId(venue.id);
    setSelectedDuration(venue.availableDurations[0] || 1);
  }

  // Lock body scroll while modal is active & restore focus
  useEffect(() => {
    if (!venue) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus close button for accessible keyboard navigation
    const timer = setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 50);

    return () => {
      document.body.style.overflow = originalOverflow;
      clearTimeout(timer);
    };
  }, [venue]);

  // Keyboard navigation: Escape key closes modal
  useEffect(() => {
    if (!venue) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [venue, onClose]);

  if (!venue) return null;

  const estimatedTotal = venue.hourlyRate * selectedDuration;


  const handleProceed = () => {
    onSelectForBooking(venue.id, selectedDuration);
    onClose();
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200 cursor-pointer"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-venue-title"
    >
      <div
        className="relative w-full max-w-3xl bg-[#0E1419] border border-[#23303B] rounded-2xl shadow-2xl overflow-hidden my-8 cursor-default animate-modal-pop"
        onClick={(e) => e.stopPropagation()}
      >


        {/* Header Image with Badges */}
        <div className="relative h-64 sm:h-72 w-full bg-[#131B22]">
          <Image
            src={venue.image}
            alt={venue.name}
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E1419] via-black/40 to-black/20" />

          {/* Close button */}
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl bg-black/60 hover:bg-black/80 text-neutral-300 hover:text-white border border-white/10 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-[#B7FF3C] cursor-pointer"
            aria-label="Close venue details dialog"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Locality & Type Badge */}
          <div className="absolute bottom-4 left-6 right-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#B7FF3C] text-[#090D10]">
                  {venue.locality}
                </span>
                <span className="text-xs font-medium text-neutral-300 px-2.5 py-0.5 rounded-full bg-black/50 border border-white/10">
                  {venue.sports.join(' • ')}
                </span>
              </div>
              <h2 id="modal-venue-title" className="text-2xl sm:text-3xl font-black text-white">
                {venue.name}
              </h2>
            </div>
            <div className="text-right">
              <span className="text-[11px] uppercase tracking-wider text-neutral-400 block">Illustrative Rate</span>
              <span className="text-2xl font-extrabold text-[#B7FF3C]">
                ₹{venue.hourlyRate.toLocaleString('en-IN')}
                <span className="text-xs font-normal text-neutral-400"> / hour</span>
              </span>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[calc(85vh-18rem)] overflow-y-auto">
          {/* Tagline / Overview */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-400 mb-1">
              Overview & Specifications
            </h3>
            <p className="text-sm text-neutral-300 leading-relaxed">{venue.description}</p>
          </div>

          {/* Specs grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-[#131B22] border border-[#23303B] space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                <Users className="w-3.5 h-3.5 text-[#B7FF3C]" />
                Team Capacity
              </div>
              <p className="text-xs font-semibold text-white">{venue.teamSize}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#131B22] border border-[#23303B] space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                <Maximize2 className="w-3.5 h-3.5 text-[#B7FF3C]" />
                Dimensions
              </div>
              <p className="text-xs font-semibold text-white">{venue.dimensions}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#131B22] border border-[#23303B] space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                <Clock className="w-3.5 h-3.5 text-[#B7FF3C]" />
                Operating Hours
              </div>
              <p className="text-xs font-semibold text-white">{venue.operatingHours}</p>
            </div>
          </div>

          {/* Facilities Checklist */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-400 mb-3">
              Included Amenities & Equipment
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {venue.facilities.map((facility, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2.5 p-2.5 rounded-lg bg-[#131B22]/60 border border-[#23303B]/80 text-xs text-neutral-200"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#B7FF3C] shrink-0 mt-0.5" />
                  <span>{facility}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Pricing Breakdown Tool */}
          <div className="p-5 rounded-xl bg-[#131B22] border border-[#23303B] space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#B7FF3C]" />
                Illustrative Price Calculator
              </h3>
              <span className="text-[10px] text-neutral-400 uppercase tracking-wider">Demo Estimate</span>
            </div>

            <div className="space-y-2">
              <label className="text-xs text-neutral-400 block">Select Booking Duration:</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {venue.availableDurations.map((duration) => (
                  <button
                    key={duration}
                    type="button"
                    onClick={() => setSelectedDuration(duration)}
                    className={`py-2 px-3 rounded-lg text-xs font-bold transition-all duration-200 active:scale-95 cursor-pointer ${
                      selectedDuration === duration
                        ? 'bg-[#B7FF3C] text-[#090D10] shadow-md shadow-[#B7FF3C]/20'
                        : 'bg-[#0E1419] border border-[#23303B] text-neutral-300 hover:text-white hover:border-neutral-500'
                    }`}
                  >
                    {duration} {duration === 1 ? 'Hour' : 'Hours'}
                  </button>
                ))}
              </div>
            </div>

            {/* Calculations Breakdown */}
            <div className="pt-3 border-t border-[#23303B] space-y-2 text-xs">
              <div className="flex justify-between text-neutral-400">
                <span>Base Rate ({venue.hourlyRate} INR × {selectedDuration} hrs)</span>
                <span>₹{estimatedTotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Floodlight & Facility Access Surcharge</span>
                <span className="text-[#B7FF3C]">₹0 (Included)</span>
              </div>
              <div className="flex justify-between text-sm font-extrabold text-white pt-2 border-t border-[#23303B] items-baseline">
                <span>Estimated Total (Illustrative)</span>
                <span
                  key={`${venue.id}-${selectedDuration}`}
                  className="text-[#B7FF3C] text-base font-black animate-price-pop inline-block"
                >
                  ₹{estimatedTotal.toLocaleString('en-IN')}
                </span>
              </div>

            </div>
          </div>



          {/* Fictional demo notice */}
          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-neutral-900/60 border border-neutral-800 text-[11px] text-neutral-400">
            <ShieldAlert className="w-4 h-4 text-[#B7FF3C] shrink-0 mt-0.5" />
            <p>
              <strong>Notice:</strong> Venue details, pictures, and prices are illustrative demo assets.
              This platform does not process online financial transactions.
            </p>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-6 bg-[#0E1419] border-t border-[#23303B] flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-neutral-300 hover:text-white hover:bg-[#131B22] border border-[#23303B] transition-colors"
          >
            Close
          </button>
          <button
            type="button"
            onClick={handleProceed}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#B7FF3C] text-[#090D10] hover:bg-[#A3EA30] transition-colors shadow-md shadow-[#B7FF3C]/20"
          >
            Book This Turf
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
