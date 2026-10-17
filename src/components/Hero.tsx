'use client';

import React from 'react';
import Image from 'next/image';
import { Compass, Sparkles, ShieldAlert, ArrowRight, Clock, MapPin } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onHowItWorksClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onHowItWorksClick }) => {
  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#B7FF3C]/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines & Actions */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Demo Notice Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#131B22] border border-[#23303B] shadow-inner">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B7FF3C] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#B7FF3C]"></span>
              </span>
              <span className="text-xs font-semibold text-neutral-300 tracking-wide">
                Internship Technical Assessment
              </span>
              <span className="text-neutral-500">•</span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#B7FF3C]">
                Phase 1 Frontend Prototype
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black text-white tracking-tight leading-[1.08]">
              Your Game.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B7FF3C] via-[#CEFF66] to-[#88CA16]">
                Your Turf.
              </span>{' '}
              Your Time.
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-neutral-400 max-w-2xl leading-relaxed font-normal">
              Experience modern sports venue discovery. Browse FIFA-grade floodlit synthetic turf
              arenas across Mumbai localities, calculate slot estimates in real time, and submit
              seamless booking inquiries for your squad.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                type="button"
                id="hero-explore-cta"
                onClick={onExploreClick}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-sm uppercase tracking-wider bg-[#B7FF3C] text-[#090D10] hover:bg-[#A3EA30] active:scale-[0.98] transition-all duration-200 shadow-lg shadow-[#B7FF3C]/20 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B7FF3C]"
              >
                <Compass className="w-4 h-4 stroke-[2.5]" />
                Explore Turfs
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <button
                type="button"
                id="hero-how-it-works-cta"
                onClick={onHowItWorksClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-neutral-200 bg-[#131B22] border border-[#23303B] hover:border-neutral-500 hover:text-white hover:bg-[#18222B] transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B7FF3C]"
              >
                <Clock className="w-4 h-4 text-neutral-400" />
                How It Works
              </button>
            </div>

            {/* Quick Micro-Highlights */}
            <div className="pt-4 border-t border-[#23303B]/80 grid grid-cols-3 gap-4 max-w-lg">
              <div className="space-y-0.5">
                <p className="text-xs text-neutral-400">Locations</p>
                <p className="text-sm font-bold text-white flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#B7FF3C]" />
                  4 Mumbai Hubs
                </p>
              </div>
              <div className="space-y-0.5">
                <p className="text-xs text-neutral-400">Rates</p>
                <p className="text-sm font-bold text-white">Transparent INR</p>
              </div>
              <div className="space-y-0.5">
                <p className="text-xs text-neutral-400">Turf Surface</p>
                <p className="text-sm font-bold text-[#B7FF3C]">FIFA Standard</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Decorative Frame */}
              <div className="relative rounded-2xl overflow-hidden border border-[#23303B] bg-[#131B22] shadow-2xl shadow-black/80 group">
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src="/images/hero/hero-turf.jpg"
                    alt="Premium floodlit sports turf stadium with artificial grass"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090D10] via-transparent to-transparent opacity-80" />
                </div>

                {/* Floating Info Overlay Inside Card */}
                <div className="p-5 space-y-3 bg-[#0E1419]/95 backdrop-blur-md border-t border-[#23303B]">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-white uppercase tracking-wider">
                      <Sparkles className="w-3.5 h-3.5 text-[#B7FF3C]" />
                      Floodlit Stadium Experience
                    </span>
                    <span className="text-[11px] font-semibold text-[#B7FF3C] px-2 py-0.5 rounded bg-[#131B22] border border-[#B7FF3C]/30">
                      Illustrative Preview
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    High-density non-infill turf designed for football, box cricket, and evening
                    tournaments.
                  </p>
                </div>
              </div>

              {/* Floating Disclaimer Badge */}
              <div className="mt-3 flex items-start gap-2 p-3 rounded-xl bg-[#131B22]/90 border border-[#23303B] text-neutral-400">
                <ShieldAlert className="w-4 h-4 text-[#B7FF3C] shrink-0 mt-0.5" />
                <p className="text-[11px] leading-tight">
                  <strong className="text-neutral-200">Demonstration Model:</strong> Venue listings,
                  photographs, and pricing are curated demo data created for Phase 1 frontend evaluation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
