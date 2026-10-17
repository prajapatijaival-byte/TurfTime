'use client';

import React from 'react';
import { Search, X, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { AVAILABLE_SPORTS, DEMO_PRICE_RANGE } from '@/data/venues';

interface InteractiveFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedSport: string;
  onSportChange: (sport: string) => void;
  maxPrice: number;
  onMaxPriceChange: (price: number) => void;
  onResetFilters: () => void;
  totalCount: number;
  filteredCount: number;
}

export const InteractiveFilters: React.FC<InteractiveFiltersProps> = ({
  searchQuery,
  onSearchChange,
  selectedSport,
  onSportChange,
  maxPrice,
  onMaxPriceChange,
  onResetFilters,
  totalCount,
  filteredCount,
}) => {
  const isFiltered =
    searchQuery.trim().length > 0 ||
    selectedSport !== 'All Sports' ||
    maxPrice < DEMO_PRICE_RANGE.max;

  return (
    <div className="bg-[#0E1419] border border-[#23303B] rounded-2xl p-5 md:p-6 shadow-xl mb-8 transition-all">
      {/* Top Filter Bar Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#23303B]">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-[#131B22] border border-[#23303B] text-[#B7FF3C]">
            <SlidersHorizontal className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              Filter Venues
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#131B22] border border-[#23303B] text-neutral-400">
                Showing {filteredCount} of {totalCount}
              </span>
            </h3>
            <p className="text-xs text-neutral-400">
              Narrow down venues by Mumbai locality, sport category, or hourly budget.
            </p>
          </div>
        </div>

        {/* Clear Filters Button */}
        {isFiltered && (
          <button
            type="button"
            onClick={onResetFilters}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-neutral-300 bg-[#131B22] border border-[#23303B] hover:text-white hover:border-[#B7FF3C]/50 hover:bg-[#18222B] transition-all cursor-pointer self-start sm:self-auto"
            aria-label="Clear all applied filters"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#B7FF3C]" />
            Reset Filters
          </button>
        )}
      </div>

      {/* Filter Controls Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 pt-5 items-end">
        {/* Search Field */}
        <div className="md:col-span-5 space-y-1.5">
          <label htmlFor="venue-search-input" className="block text-xs font-semibold uppercase tracking-wider text-neutral-400">
            Search Locality or Venue Name
          </label>
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
            <input
              id="venue-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="e.g. Mahalaxmi, Worli, Rooftop, Football..."
              className="w-full bg-[#131B22] border border-[#23303B] rounded-xl pl-10 pr-9 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#B7FF3C] focus:ring-1 focus:ring-[#B7FF3C] transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white p-0.5 rounded"
                aria-label="Clear search input"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Sport Type Filter */}
        <div className="md:col-span-4 space-y-1.5">
          <label htmlFor="sport-type-select" className="block text-xs font-semibold uppercase tracking-wider text-neutral-400">
            Sport / Activity Type
          </label>
          <select
            id="sport-type-select"
            value={selectedSport}
            onChange={(e) => onSportChange(e.target.value)}
            className="w-full bg-[#131B22] border border-[#23303B] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#B7FF3C] focus:ring-1 focus:ring-[#B7FF3C] transition-all cursor-pointer"
          >
            {AVAILABLE_SPORTS.map((sport) => (
              <option key={sport} value={sport} className="bg-[#131B22] text-white">
                {sport}
              </option>
            ))}
          </select>
        </div>

        {/* Max Hourly Budget Slider */}
        <div className="md:col-span-3 space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <label htmlFor="price-range-slider" className="font-semibold uppercase tracking-wider text-neutral-400">
              Max Rate:
            </label>
            <span className="font-bold text-[#B7FF3C] bg-[#131B22] px-2 py-0.5 rounded border border-[#23303B]">
              ₹{maxPrice.toLocaleString('en-IN')}/hr
            </span>
          </div>
          <div className="pt-2">
            <input
              id="price-range-slider"
              type="range"
              min={DEMO_PRICE_RANGE.min}
              max={DEMO_PRICE_RANGE.max}
              step={DEMO_PRICE_RANGE.step}
              value={maxPrice}
              onChange={(e) => onMaxPriceChange(Number(e.target.value))}
              className="w-full h-2 bg-[#23303B] rounded-lg appearance-none cursor-pointer accent-[#B7FF3C] focus:outline-none"
              aria-label="Filter by maximum hourly price"
            />
            <div className="flex justify-between text-[10px] text-neutral-400 pt-1">
              <span>₹{DEMO_PRICE_RANGE.min}</span>
              <span>₹{DEMO_PRICE_RANGE.max}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Sport Category Pills */}
      <div className="mt-4 pt-4 border-t border-[#23303B]/60 flex flex-wrap items-center gap-2">
        <span className="text-xs text-neutral-400 mr-1">Quick Select:</span>
        {AVAILABLE_SPORTS.map((sport) => {
          const isActive = selectedSport === sport;
          return (
            <button
              key={sport}
              type="button"
              onClick={() => onSportChange(sport)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#B7FF3C] text-[#090D10] font-bold shadow-sm shadow-[#B7FF3C]/30'
                  : 'bg-[#131B22] text-neutral-300 border border-[#23303B] hover:border-neutral-500 hover:text-white'
              }`}
            >
              {sport}
            </button>
          );
        })}
      </div>
    </div>
  );
};
