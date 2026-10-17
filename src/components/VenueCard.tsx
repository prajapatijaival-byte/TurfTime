'use client';

import React from 'react';
import Image from 'next/image';
import { MapPin, Users, Sparkles, ArrowRight, Eye } from 'lucide-react';
import { Venue } from '@/types';

interface VenueCardProps {
  venue: Venue;
  onViewDetails: (venue: Venue) => void;
  onBookNow: (venueId: string) => void;
}

export const VenueCard: React.FC<VenueCardProps> = ({
  venue,
  onViewDetails,
  onBookNow,
}) => {
  return (
    <article className="group bg-[#0E1419] border border-[#23303B] hover:border-[#B7FF3C] rounded-2xl overflow-hidden transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-[0_16px_36px_rgba(183,255,60,0.12),0_4px_12px_rgba(0,0,0,0.6)] flex flex-col h-full">
      {/* Image Container with Badges */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#131B22]">
        <Image
          src={venue.image}
          alt={`Floodlit artificial sports turf at ${venue.name}, ${venue.locality}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E1419] via-transparent to-transparent opacity-80" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-semibold text-white">
            <MapPin className="w-3.5 h-3.5 text-[#B7FF3C]" />
            <span>{venue.locality}</span>
          </div>

          {venue.isPopular && (
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#B7FF3C] text-[#090D10] text-[11px] font-black tracking-wide uppercase shadow-sm">
              <Sparkles className="w-3 h-3 fill-current" />
              Popular
            </span>
          )}
        </div>

        {/* Bottom sport pills inside image */}
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
          {venue.sports.map((sport) => (
            <span
              key={sport}
              className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-[#131B22]/90 backdrop-blur-sm text-neutral-300 border border-[#23303B] transition-colors group-hover:border-[#B7FF3C]/30"
            >
              {sport}
            </span>
          ))}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex flex-col flex-grow space-y-4">
        {/* Title and Hourly Rate */}
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-lg font-bold text-white group-hover:text-[#B7FF3C] transition-colors duration-200 leading-snug">
              {venue.name}
            </h3>
          </div>
          <p className="text-xs text-neutral-400 mt-1 line-clamp-2 leading-relaxed">
            {venue.headline}
          </p>
        </div>

        {/* Key Venue Highlights */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center gap-2 text-xs text-neutral-300">
            <Users className="w-3.5 h-3.5 text-[#B7FF3C] shrink-0" />
            <span className="truncate">{venue.teamSize}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B7FF3C]/80 shrink-0" />
            <span className="truncate">{venue.facilities.slice(0, 2).join(' • ')}</span>
          </div>
        </div>

        {/* Price & Action Area */}
        <div className="mt-auto pt-4 border-t border-[#23303B]/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[10px] uppercase font-semibold tracking-wider text-neutral-400 block">
              Illustrative Rate
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-extrabold text-[#B7FF3C] group-hover:brightness-110 transition-all duration-200">
                ₹{venue.hourlyRate.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-neutral-400">/ hour</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onViewDetails(venue)}
              className="inline-flex items-center justify-center p-2 rounded-xl text-neutral-300 hover:text-white bg-[#131B22] border border-[#23303B] hover:border-neutral-500 hover:bg-[#18222B] active:scale-95 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B7FF3C]"
              aria-label={`View details for ${venue.name}`}
              title="View pitch specifications and price breakdown"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onBookNow(venue.id)}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#B7FF3C] text-[#090D10] hover:bg-[#A3EA30] hover:shadow-[0_4px_16px_rgba(183,255,60,0.25)] active:scale-95 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B7FF3C] group/btn"
            >
              Book Turf
              <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform duration-200" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

