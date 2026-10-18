'use client';

import React, { useState, Suspense } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { MatchFinder } from '@/components/MatchFinder';
import { VenueSection } from '@/components/VenueSection';
import { HowItWorks } from '@/components/HowItWorks';
import { WhyTurfTime } from '@/components/WhyTurfTime';
import { BookingForm } from '@/components/BookingForm';
import { FAQAccordion } from '@/components/FAQAccordion';
import { Footer } from '@/components/Footer';
import { VenueModal } from '@/components/VenueModal';
import { SAMPLE_VENUES } from '@/data/venues';
import { Venue } from '@/types';

export default function Home() {
  const [bookingVenueId, setBookingVenueId] = useState<string>(SAMPLE_VENUES[0].id);
  const [bookingDuration, setBookingDuration] = useState<number>(1);
  const [activeModalVenue, setActiveModalVenue] = useState<Venue | null>(null);

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectVenueForBooking = (venueId: string, duration?: number) => {
    setBookingVenueId(venueId);
    if (duration) {
      setBookingDuration(duration);
    }
    scrollToSection('#booking');
  };

  return (
    <div className="min-h-screen bg-[#090D10] text-[#F1F5F9] selection:bg-[#B7FF3C] selection:text-[#090D10]">
      {/* 1. Navigation */}
      <Navbar onBookClick={() => scrollToSection('#booking')} />

      <main id="main-content">
        {/* 2. Hero Section */}
        <Hero
          onExploreClick={() => scrollToSection('#explore')}
          onMatchFinderClick={() => scrollToSection('#match-finder')}
        />

        {/* Feature 1: Match Finder — Find Your Perfect Turf */}
        <MatchFinder
          onSelectVenueForBooking={handleSelectVenueForBooking}
          onViewDetails={(venue) => setActiveModalVenue(venue)}
        />

        {/* 3, 4, 5. Explore Turfs, Interactive Filters, Venue Details & Pricing */}
        <VenueSection
          onSelectVenueForBooking={handleSelectVenueForBooking}
          onViewDetails={(venue) => setActiveModalVenue(venue)}
        />

        {/* 6. How It Works */}
        <HowItWorks />

        {/* 7. Why TurfTime */}
        <WhyTurfTime />

        {/* 8. Booking Request Form */}
        <Suspense fallback={<div className="py-20 text-center text-neutral-500 text-xs">Loading booking form...</div>}>
          <BookingForm
            preselectedVenueId={bookingVenueId}
            preselectedDuration={bookingDuration}
          />
        </Suspense>

        {/* 9. FAQ */}
        <FAQAccordion />
      </main>

      {/* 10. Footer */}
      <Footer />

      {/* Shared Venue Modal (triggered from Match Finder or Explore Turfs) */}
      <VenueModal
        venue={activeModalVenue}
        onClose={() => setActiveModalVenue(null)}
        onSelectForBooking={handleSelectVenueForBooking}
      />
    </div>
  );
}
