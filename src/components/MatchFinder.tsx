'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { SAMPLE_VENUES, AVAILABLE_SPORTS, DEMO_PRICE_RANGE } from '@/data/venues';
import { Venue, SportType } from '@/types';
import {
  Compass,
  Users,
  MapPin,
  IndianRupee,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Eye,
  RotateCcw,
  SlidersHorizontal,
  Info,
} from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface MatchFinderProps {
  onSelectVenueForBooking: (venueId: string, duration?: number) => void;
  onViewDetails: (venue: Venue) => void;
}

interface VenueMatchResult {
  venue: Venue;
  matchScore: number;
  reasons: {
    sport: string;
    locality: string;
    budget: string;
    squad: string;
  };
}

const LOCALITY_OPTIONS = [
  'All Localities',
  'Mahalaxmi',
  'Lower Parel',
  'Worli',
  'Andheri West',
] as const;

const SQUAD_PRESETS = [
  { label: '4 (Pickleball / Casual)', value: 4 },
  { label: '10 (5v5 Match)', value: 10 },
  { label: '12 (6v6 Match)', value: 12 },
  { label: '14 (7v7 Standard)', value: 14 },
  { label: '16+ (8v8 / Large Squad)', value: 16 },
];

export const MatchFinder: React.FC<MatchFinderProps> = ({
  onSelectVenueForBooking,
  onViewDetails,
}) => {
  const [selectedSport, setSelectedSport] = useState<string>('All Sports');
  const [playerCount, setPlayerCount] = useState<number>(12);
  const [selectedLocality, setSelectedLocality] = useState<string>('All Localities');
  const [maxBudget, setMaxBudget] = useState<number>(2600);

  // Helper to evaluate squad fit for each venue
  const evaluateSquadFit = (venueId: string, players: number) => {
    switch (venueId) {
      case 'lower-parel-skyturf':
        // 5v5 (10p), doubles pickleball (4p), 7v7 box cricket (14p)
        if (players <= 12) return { score: 25, label: 'Optimal fit for 4–12 players (5v5 Football or Pickleball)' };
        if (players <= 14) return { score: 20, label: 'Accommodates up to 14 players for 7v7 Box Cricket' };
        return { score: 10, label: 'Playable but best suited for squads under 14 players' };

      case 'worli-sea-breeze':
        // 6v6 football (12p), 5v5 futsal (10p), 8v8 cricket (16p)
        if (players >= 10 && players <= 14) return { score: 25, label: 'Optimal pitch size for 10–14 players (6v6 Football / Futsal)' };
        if (players <= 16) return { score: 20, label: 'Supports up to 16 players for 8v8 Box Cricket' };
        return { score: 12, label: 'Accommodates squad with flexible match formats' };

      case 'mahalaxmi-apex':
        // 7v7 football (14p), 8v8 cricket (16p)
        if (players >= 12 && players <= 16) return { score: 25, label: 'Ideal championship dimensions for 12–16 players (7v7)' };
        if (players > 16) return { score: 20, label: 'Comfortably handles larger squads up to 18 players' };
        return { score: 15, label: 'Spacious 120ft pitch, great for open play' };

      case 'andheri-metro-pro':
        // 7v7 to 8v8 football (14-16p), 9v9 cricket (18p)
        if (players >= 14) return { score: 25, label: 'Largest pitch area (135x80 ft), ideal for 14–18+ players' };
        if (players >= 10) return { score: 20, label: 'Expansive field with ample space for 10+ players' };
        return { score: 12, label: 'Generous field size suitable for team practice' };

      default:
        return { score: 15, label: 'General recreational team size match' };
    }
  };

  // Rule-based deterministic recommendation engine
  const matchedVenues: VenueMatchResult[] = useMemo(() => {
    const results: VenueMatchResult[] = [];

    for (const venue of SAMPLE_VENUES) {
      // 1. Sport filter (hard filter if specific sport picked)
      if (selectedSport !== 'All Sports' && !venue.sports.includes(selectedSport as SportType)) {
        continue;
      }

      // 2. Locality filter (hard filter if specific locality picked)
      if (
        selectedLocality !== 'All Localities' &&
        !venue.locality.toLowerCase().includes(selectedLocality.toLowerCase())
      ) {
        continue;
      }

      // 3. Budget filter (hard filter: rate must be <= budget)
      if (venue.hourlyRate > maxBudget) {
        continue;
      }

      // 4. Calculate rule-based match score & factual reasons
      const squadEval = evaluateSquadFit(venue.id, playerCount);
      let score = 50; // base score for meeting all hard constraints

      // Sport scoring
      let sportReason = '';
      if (selectedSport !== 'All Sports') {
        score += 20;
        sportReason = `Dedicated ${selectedSport} markings & equipment`;
      } else {
        score += 15;
        sportReason = `Multi-sport arena supporting ${venue.sports.join(' & ')}`;
      }

      // Locality scoring
      let localityReason = '';
      if (selectedLocality !== 'All Localities') {
        score += 15;
        localityReason = `Located in your preferred area (${venue.locality})`;
      } else {
        score += 10;
        localityReason = `Conveniently situated in ${venue.locality}, Mumbai`;
      }

      // Squad scoring
      score += squadEval.score;
      const squadReason = squadEval.label;

      // Budget scoring
      const budgetSavings = maxBudget - venue.hourlyRate;
      let budgetReason = '';
      if (budgetSavings > 0) {
        score += 10;
        budgetReason = `₹${venue.hourlyRate.toLocaleString('en-IN')}/hr (₹${budgetSavings.toLocaleString('en-IN')}/hr within your budget limit)`;
      } else {
        score += 5;
        budgetReason = `₹${venue.hourlyRate.toLocaleString('en-IN')}/hr (Exactly matches your ₹${maxBudget.toLocaleString('en-IN')} budget)`;
      }

      // Popularity slight boost
      if (venue.isPopular) {
        score += 5;
      }

      results.push({
        venue,
        matchScore: Math.min(score, 99),
        reasons: {
          sport: sportReason,
          locality: localityReason,
          budget: budgetReason,
          squad: squadReason,
        },
      });
    }

    // Sort by matchScore descending
    return results.sort((a, b) => b.matchScore - a.matchScore);
  }, [selectedSport, playerCount, selectedLocality, maxBudget]);

  const handleReset = () => {
    setSelectedSport('All Sports');
    setPlayerCount(12);
    setSelectedLocality('All Localities');
    setMaxBudget(2600);
  };

  return (
    <section id="match-finder" className="py-20 bg-[#0B0F13] border-t border-[#23303B] relative overflow-hidden">
      {/* Decorative ambient background accents */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#B7FF3C]/5 blur-[140px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#131B22] border border-[#B7FF3C]/40 text-xs font-semibold text-[#B7FF3C] shadow-sm">
            <Compass className="w-3.5 h-3.5" />
            Transparent Rule-Based Matching
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Match Finder — Find Your Perfect Turf
          </h2>
          <p className="text-sm sm:text-base text-neutral-400">
            Tell us your sport, squad size, preferred Mumbai locality, and hourly budget. Our rule engine
            scores and ranks the best turf matches with factual explanations.
          </p>
        </ScrollReveal>

        {/* Interactive Filter Configuration Box */}
        <ScrollReveal delayMs={100}>
          <div className="bg-[#0E1419] border border-[#23303B] rounded-2xl p-6 sm:p-8 shadow-2xl mb-12">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#23303B]">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-[#131B22] border border-[#23303B] text-[#B7FF3C]">
                  <SlidersHorizontal className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Match Preferences</h3>
                  <p className="text-xs text-neutral-400">
                    Adjust all 4 parameters simultaneously to see live recommendation rankings.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-neutral-300 bg-[#131B22] border border-[#23303B] hover:text-white hover:border-[#B7FF3C]/50 hover:bg-[#18222B] active:scale-95 transition-all cursor-pointer self-start sm:self-auto group"
                aria-label="Reset all Match Finder filters"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#B7FF3C] group-hover:-rotate-90 transition-transform duration-300" />
                Reset Preferences
              </button>
            </div>

            {/* 4 Control Parameters */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
              {/* 1. Sport Selection */}
              <div className="space-y-2">
                <label
                  htmlFor="match-sport-select"
                  className="block text-xs font-semibold uppercase tracking-wider text-neutral-300"
                >
                  1. Sport Category
                </label>
                <select
                  id="match-sport-select"
                  value={selectedSport}
                  onChange={(e) => setSelectedSport(e.target.value)}
                  className="w-full bg-[#131B22] border border-[#23303B] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#B7FF3C] focus:ring-1 focus:ring-[#B7FF3C] transition-all cursor-pointer"
                >
                  {AVAILABLE_SPORTS.map((sport) => (
                    <option key={sport} value={sport} className="bg-[#131B22] text-white">
                      {sport}
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-neutral-400">Pick any sport or explore all</p>
              </div>

              {/* 2. Squad Size / Player Count */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <label
                    htmlFor="match-players-slider"
                    className="font-semibold uppercase tracking-wider text-neutral-300 flex items-center gap-1"
                  >
                    <Users className="w-3.5 h-3.5 text-[#B7FF3C]" />
                    2. Squad Size
                  </label>
                  <span className="font-bold text-[#B7FF3C] bg-[#131B22] px-2 py-0.5 rounded border border-[#23303B]">
                    {playerCount} Players
                  </span>
                </div>
                <input
                  id="match-players-slider"
                  type="range"
                  min={4}
                  max={20}
                  step={1}
                  value={playerCount}
                  onChange={(e) => setPlayerCount(Number(e.target.value))}
                  className="w-full h-2 bg-[#23303B] rounded-lg appearance-none cursor-pointer accent-[#B7FF3C] focus:outline-none"
                  aria-label="Select number of players in your squad"
                />
                <div className="flex flex-wrap gap-1 pt-1">
                  {SQUAD_PRESETS.map((preset) => (
                    <button
                      key={preset.value}
                      type="button"
                      onClick={() => setPlayerCount(preset.value)}
                      className={`text-[10px] px-1.5 py-0.5 rounded border transition-colors cursor-pointer ${
                        playerCount === preset.value
                          ? 'bg-[#B7FF3C] text-[#090D10] font-bold border-[#B7FF3C]'
                          : 'bg-[#131B22] text-neutral-400 border-[#23303B] hover:text-white'
                      }`}
                    >
                      {preset.value}p
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Preferred Locality */}
              <div className="space-y-2">
                <label
                  htmlFor="match-locality-select"
                  className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 flex items-center gap-1"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#B7FF3C]" />
                  3. Mumbai Locality
                </label>
                <select
                  id="match-locality-select"
                  value={selectedLocality}
                  onChange={(e) => setSelectedLocality(e.target.value)}
                  className="w-full bg-[#131B22] border border-[#23303B] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#B7FF3C] focus:ring-1 focus:ring-[#B7FF3C] transition-all cursor-pointer"
                >
                  {LOCALITY_OPTIONS.map((loc) => (
                    <option key={loc} value={loc} className="bg-[#131B22] text-white">
                      {loc}
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-neutral-400">Filter by neighbourhood</p>
              </div>

              {/* 4. Maximum Hourly Budget */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <label
                    htmlFor="match-budget-slider"
                    className="font-semibold uppercase tracking-wider text-neutral-300 flex items-center gap-1"
                  >
                    <IndianRupee className="w-3.5 h-3.5 text-[#B7FF3C]" />
                    4. Max Budget
                  </label>
                  <span className="font-bold text-[#B7FF3C] bg-[#131B22] px-2 py-0.5 rounded border border-[#23303B]">
                    ₹{maxBudget.toLocaleString('en-IN')}/hr
                  </span>
                </div>
                <input
                  id="match-budget-slider"
                  type="range"
                  min={DEMO_PRICE_RANGE.min}
                  max={DEMO_PRICE_RANGE.max}
                  step={DEMO_PRICE_RANGE.step}
                  value={maxBudget}
                  onChange={(e) => setMaxBudget(Number(e.target.value))}
                  className="w-full h-2 bg-[#23303B] rounded-lg appearance-none cursor-pointer accent-[#B7FF3C] focus:outline-none"
                  aria-label="Select maximum hourly rate in INR"
                />
                <div className="flex justify-between text-[10px] text-neutral-300 pt-1">
                  <span>₹{DEMO_PRICE_RANGE.min}/hr</span>
                  <span>₹{DEMO_PRICE_RANGE.max}/hr</span>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Results Showcase Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#B7FF3C]" />
            <h3 className="text-lg font-bold text-white">
              {matchedVenues.length > 0 ? (
                <>
                  Top Recommendations{' '}
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#131B22] border border-[#23303B] text-[#B7FF3C] ml-1">
                    {matchedVenues.length} {matchedVenues.length === 1 ? 'Venue' : 'Venues'} Found
                  </span>
                </>
              ) : (
                'Recommendation Results'
              )}
            </h3>
          </div>
          <span className="text-xs text-neutral-400 hidden sm:inline-block">
            Ranked by multi-factor suitability score
          </span>
        </div>

        {/* Ranked Matches Grid */}
        {matchedVenues.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {matchedVenues.map((item, index) => {
              const { venue, matchScore, reasons } = item;
              const isTop = index === 0;

              return (
                <ScrollReveal key={venue.id} delayMs={index * 100} className="h-full">
                  <div
                    className={`bg-[#0E1419] border rounded-2xl overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1.5 flex flex-col justify-between h-full ${
                      isTop
                        ? 'border-[#B7FF3C]/80 shadow-2xl shadow-[#B7FF3C]/10'
                        : 'border-[#23303B] hover:border-[#B7FF3C]/50 hover:shadow-xl'
                    }`}
                  >
                    {/* Top Media & Header Banner */}
                    <div className="p-5 sm:p-6 pb-0">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden shrink-0 border border-[#23303B]">
                            <Image
                              src={venue.image}
                              alt={venue.name}
                              fill
                              sizes="64px"
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-semibold text-[#B7FF3C]">{venue.locality}</span>
                              {isTop && (
                                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#B7FF3C] text-[#090D10]">
                                  Best Match
                                </span>
                              )}
                            </div>
                            <h4 className="text-base sm:text-lg font-bold text-white">{venue.name}</h4>
                            <p className="text-xs text-neutral-400 line-clamp-1">{venue.dimensions} • {venue.surface}</p>
                          </div>
                        </div>

                        {/* Match Score Badge */}
                        <div className="text-right shrink-0">
                          <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-[#131B22] border border-[#B7FF3C]/40 text-[#B7FF3C] text-sm font-black shadow-inner">
                            <Sparkles className="w-3.5 h-3.5 fill-current" />
                            {matchScore}% Match
                          </div>
                          <span className="block text-[10px] text-neutral-300 mt-0.5">Rule-based score</span>
                        </div>
                      </div>

                      {/* Why this is recommended: Factual reasons */}
                      <div className="p-3.5 rounded-xl bg-[#131B22] border border-[#23303B] space-y-2 mb-4">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block">
                          Why This Matches Your Match Criteria:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          <div className="flex items-start gap-1.5 text-neutral-200">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#B7FF3C] shrink-0 mt-0.5" />
                            <span>{reasons.sport}</span>
                          </div>
                          <div className="flex items-start gap-1.5 text-neutral-200">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#B7FF3C] shrink-0 mt-0.5" />
                            <span>{reasons.locality}</span>
                          </div>
                          <div className="flex items-start gap-1.5 text-neutral-200">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#B7FF3C] shrink-0 mt-0.5" />
                            <span>{reasons.squad}</span>
                          </div>
                          <div className="flex items-start gap-1.5 text-neutral-200">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#B7FF3C] shrink-0 mt-0.5" />
                            <span>{reasons.budget}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="p-5 sm:p-6 pt-3 border-t border-[#23303B] flex items-center justify-between gap-3 bg-[#090D10]/50">
                      <div>
                        <span className="text-[10px] uppercase font-semibold text-neutral-400 block">
                          Hourly Rate
                        </span>
                        <span className="text-xl font-black text-[#B7FF3C]">
                          ₹{venue.hourlyRate.toLocaleString('en-IN')}
                          <span className="text-xs font-normal text-neutral-400">/hr</span>
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => onViewDetails(venue)}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-neutral-300 hover:text-white bg-[#131B22] border border-[#23303B] hover:border-neutral-500 active:scale-95 transition-all cursor-pointer"
                          aria-label={`View pitch specifications for ${venue.name}`}
                        >
                          <Eye className="w-3.5 h-3.5" />
                          Specs
                        </button>

                        <button
                          type="button"
                          onClick={() => onSelectVenueForBooking(venue.id)}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#B7FF3C] text-[#090D10] hover:bg-[#A3EA30] active:scale-95 transition-all shadow-md shadow-[#B7FF3C]/20 cursor-pointer"
                        >
                          Book Turf
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        ) : (
          /* Helpful No-Matches Suggestion State */
          <div className="bg-[#0E1419] border border-[#23303B] rounded-2xl p-8 sm:p-12 text-center max-w-2xl mx-auto space-y-5 animate-in fade-in duration-300">
            <div className="w-14 h-14 rounded-2xl bg-[#131B22] border border-[#23303B] flex items-center justify-center mx-auto text-[#B7FF3C]">
              <Info className="w-7 h-7" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white mb-2">No Turfs Match All 4 Criteria Simultaneously</h4>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-lg mx-auto">
                Your combination of <strong>{selectedSport}</strong> in <strong>{selectedLocality}</strong> at maximum{' '}
                <strong>₹{maxBudget.toLocaleString('en-IN')}/hr</strong> did not return any exact matches.
              </p>
            </div>

            {/* Helpful contextual suggestions */}
            <div className="p-4 rounded-xl bg-[#131B22] border border-[#23303B] text-left text-xs text-neutral-300 space-y-2 max-w-lg mx-auto">
              <span className="font-bold text-[#B7FF3C] block uppercase tracking-wider text-[10px]">
                Helpful Suggestions:
              </span>
              <ul className="list-disc list-inside space-y-1 text-neutral-400">
                {selectedSport === 'Pickleball' && (
                  <li>Pickleball is currently only available at Skyline Rooftop Turf in Lower Parel.</li>
                )}
                {selectedSport === 'Futsal' && (
                  <li>Futsal is specifically marked at Worli Sea Breeze Sports Hub in Worli.</li>
                )}
                {maxBudget < 1900 && (
                  <li>The lowest hourly rate across all Mumbai venues is ₹1,900/hr (Metro Pro Turf in Andheri West).</li>
                )}
                <li>Try selecting &quot;All Localities&quot; or increasing your budget to ₹2,400–₹2,600/hr.</li>
              </ul>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#B7FF3C] text-[#090D10] hover:bg-[#A3EA30] active:scale-95 transition-all shadow-md shadow-[#B7FF3C]/20 cursor-pointer"
              >
                Reset To Default Preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
