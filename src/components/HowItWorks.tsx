'use client';

import React from 'react';
import { Compass, CalendarClock, Send, Info } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: '01',
      icon: Compass,
      title: 'Discover a Venue',
      description:
        'Explore Mumbai-inspired synthetic turf arenas. Filter by locality, sport type (football, cricket, pickleball), and budget to match your squad’s requirements.',
      highlight: 'Locality & Sport Filters',
    },
    {
      number: '02',
      icon: CalendarClock,
      title: 'Select Date & Slot',
      description:
        'Choose your match date, floodlit evening or morning time window, and game duration (from 1 to 3 hours). The dynamic calculator instantly figures the estimated total.',
      highlight: 'Live Rate Estimation',
    },
    {
      number: '03',
      icon: Send,
      title: 'Submit Booking Request',
      description:
        'Fill in your captain or organizer contact details and review your slot summary. The form validates all inputs and prepares your inquiry for Phase 2 processing.',
      highlight: 'Validated Request Payload',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-[#0E1419] border-t border-b border-[#23303B] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#B7FF3C]">
            Simple 3-Step Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How TurfTime Works
          </h2>
          <p className="text-sm sm:text-base text-neutral-400">
            Booking a high-quality sports turf shouldn’t involve endless phone calls and manual coordination.
            Here is how our streamlined workflow operates.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="relative bg-[#131B22] border border-[#23303B] hover:border-[#B7FF3C]/50 rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between"
              >
                {/* Step Header */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[#0E1419] border border-[#23303B] group-hover:border-[#B7FF3C]/40 flex items-center justify-center text-[#B7FF3C] transition-colors">
                      <Icon className="w-6 h-6 stroke-[2]" />
                    </div>
                    <span className="text-3xl font-black text-neutral-700 group-hover:text-[#B7FF3C]/30 transition-colors">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#B7FF3C] transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Bottom Highlight Pill */}
                <div className="mt-6 pt-4 border-t border-[#23303B]/60">
                  <span className="text-[11px] font-semibold text-[#B7FF3C] uppercase tracking-wider">
                    {step.highlight}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Prototype Transparency Notice Box */}
        <div className="mt-12 p-4 sm:p-5 rounded-2xl bg-[#131B22]/80 border border-[#23303B] max-w-3xl mx-auto flex items-start gap-3.5">
          <div className="p-2 rounded-lg bg-[#0E1419] border border-[#23303B] text-[#B7FF3C] shrink-0 mt-0.5">
            <Info className="w-4 h-4" />
          </div>
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Prototype Scope Notice
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              This Phase 1 technical prototype submits a structured, validated booking inquiry on the frontend.
              It does not process financial transactions, charge credit cards, or guarantee a verified reservation.
              Live database slot locking and payment capture are reserved for Phase 2.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
