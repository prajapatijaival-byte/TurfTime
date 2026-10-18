'use client';

import React, { useState, useMemo } from 'react';
import { SAMPLE_VENUES, DEMO_PRICE_RANGE } from '@/data/venues';
import { Venue, SportType } from '@/types';
import { VenueCard } from './VenueCard';
import { InteractiveFilters } from './InteractiveFilters';
import { VenueModal } from './VenueModal';
import { ShieldAlert, Frown, Sparkles } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface VenueSectionProps {
  onSelectVenueForBooking: (venueId: string, duration?: number) => void;
  onViewDetails?: (venue: Venue) => void;
}

export const VenueSection: React.FC<VenueSectionProps> = ({
  onSelectVenueForBooking,
  onViewDetails,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSport, setSelectedSport] = useState('All Sports');
  const [maxPrice, setMaxPrice] = useState(DEMO_PRICE_RANGE.defaultMax);
  const [internalModalVenue, setInternalModalVenue] = useState<Venue | null>(null);

  const handleOpenDetails = (venue: Venue) => {
    if (onViewDetails) {
      onViewDetails(venue);
    } else {
      setInternalModalVenue(venue);
    }
  };

  // Multi-filter evaluation
  const filteredVenues = useMemo(() => {
    return SAMPLE_VENUES.filter((venue) => {
      // 1. Search Query (name or locality)
      if (searchQuery.trim().length > 0) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = venue.name.toLowerCase().includes(query);
        const matchesLocality = venue.locality.toLowerCase().includes(query);
        const matchesHeadline = venue.headline.toLowerCase().includes(query);
        if (!matchesName && !matchesLocality && !matchesHeadline) {
          return false;
        }
      }

      // 2. Sport Filter
      if (selectedSport !== 'All Sports') {
        const matchesSport = venue.sports.includes(selectedSport as SportType);
        if (!matchesSport) return false;
      }

      // 3. Max Hourly Price
      if (venue.hourlyRate > maxPrice) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedSport, maxPrice]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedSport('All Sports');
    setMaxPrice(DEMO_PRICE_RANGE.defaultMax);
  };

  const handleBookFromCard = (venueId: string) => {
    onSelectVenueForBooking(venueId);
  };

  const handleBookFromModal = (venueId: string, duration: number) => {
    onSelectVenueForBooking(venueId, duration);
  };

  return (
    <section id="explore" className="py-20 bg-[#090D10] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#131B22] border border-[#23303B] text-xs font-semibold text-[#B7FF3C]">
            <Sparkles className="w-3.5 h-3.5" />
            Curated Mumbai Arenas
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Explore Premium Sports Turfs
          </h2>
          <p className="text-sm sm:text-base text-neutral-400">
            Compare verified pitch specifications, synthetic turf quality, and transparent hourly rates
            across prime Mumbai sports hubs.
          </p>
        </ScrollReveal>

        {/* Interactive Multi-Filter Bar */}
        <ScrollReveal delayMs={100}>
          <InteractiveFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedSport={selectedSport}
            onSportChange={setSelectedSport}
            maxPrice={maxPrice}
            onMaxPriceChange={setMaxPrice}
            onResetFilters={handleResetFilters}
            totalCount={SAMPLE_VENUES.length}
            filteredCount={filteredVenues.length}
          />
        </ScrollReveal>

        {/* Venues Grid or Empty State */}
        {filteredVenues.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredVenues.map((venue, idx) => (
              <ScrollReveal key={venue.id} delayMs={idx * 75} className="h-full">
                <VenueCard
                  venue={venue}
                  onViewDetails={handleOpenDetails}
                  onBookNow={handleBookFromCard}
                />
              </ScrollReveal>
            ))}
          </div>
        ) : (
          /* Helpful Empty State */
          <div className="bg-[#0E1419] border border-[#23303B] rounded-2xl p-12 text-center max-w-xl mx-auto space-y-4 animate-in fade-in duration-300">
            <div className="w-14 h-14 rounded-2xl bg-[#131B22] border border-[#23303B] flex items-center justify-center mx-auto text-neutral-400">
              <Frown className="w-7 h-7 text-[#B7FF3C]" />
            </div>
            <h3 className="text-lg font-bold text-white">No Matching Venues Found</h3>

            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              We couldn’t find any sports venues matching your current criteria (Search:{' '}
              {searchQuery ? `"${searchQuery}"` : 'None'}, Sport: {selectedSport}, Max Rate: ₹{maxPrice}/hr).
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={handleResetFilters}
                className="px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#B7FF3C] text-[#090D10] hover:bg-[#A3EA30] transition-colors shadow-md"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        )}

        {/* Section Disclaimer Banner */}
        <div className="mt-12 p-4 rounded-xl bg-[#0E1419] border border-[#23303B] flex flex-col sm:flex-row items-center justify-between gap-3 text-neutral-400 text-xs">
          <div className="flex items-center gap-2.5">
            <ShieldAlert className="w-4 h-4 text-[#B7FF3C] shrink-0" />
            <span>
              <strong>Illustrative Demo Notice:</strong> Listed venues, pricing in INR, images, and
              facilities are mock records designed for this technical evaluation.
            </span>
          </div>
          <span className="text-[11px] text-[#B7FF3C] shrink-0 font-medium">
            Curated Demo Data
          </span>
        </div>
      </div>

      {/* Modal Dialog (only if not handled by parent) */}
      {!onViewDetails && (
        <VenueModal
          venue={internalModalVenue}
          onClose={() => setInternalModalVenue(null)}
          onSelectForBooking={handleBookFromModal}
        />
      )}
    </section>
  );
};
