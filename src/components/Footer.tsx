'use client';

import React from 'react';
import { Zap, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#070A0C] border-t border-[#23303B] text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand Info */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#B7FF3C] to-[#88CA16] flex items-center justify-center text-[#090D10] font-black">
                <Zap className="w-4 h-4 fill-current stroke-[2.5]" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1">
                Turf<span className="text-[#B7FF3C]">Time</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-neutral-400 max-w-md leading-relaxed">
              Premium sports venue discovery and booking request platform. Highlighting floodlit
              synthetic turfs across Mumbai for football, box cricket, and pickleball enthusiasts.
            </p>

            <div className="flex items-center gap-2 text-[11px] text-neutral-400">
              <ShieldCheck className="w-3.5 h-3.5 text-[#B7FF3C]" />
              <span>Independent Sports Venue Discovery Platform</span>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Platform Sections
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="#hero"
                  onClick={(e) => scrollTo(e, '#hero')}
                  className="hover:text-white transition-colors"
                >
                  Home / Overview
                </a>
              </li>
              <li>
                <a
                  href="#explore"
                  onClick={(e) => scrollTo(e, '#explore')}
                  className="hover:text-white transition-colors"
                >
                  Explore Mumbai Turfs
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  onClick={(e) => scrollTo(e, '#how-it-works')}
                  className="hover:text-white transition-colors"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="#why-us"
                  onClick={(e) => scrollTo(e, '#why-us')}
                  className="hover:text-white transition-colors"
                >
                  Why TurfTime
                </a>
              </li>
              <li>
                <a
                  href="#booking"
                  onClick={(e) => scrollTo(e, '#booking')}
                  className="hover:text-white transition-colors"
                >
                  Book a Turf Request
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  onClick={(e) => scrollTo(e, '#faq')}
                  className="hover:text-white transition-colors"
                >
                  Frequently Asked Questions
                </a>
              </li>
            </ul>
          </div>

          {/* Technical Architecture Notes */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Technical Stack
            </h4>
            <ul className="space-y-1.5 text-xs text-neutral-400">
              <li>• Next.js 16 (App Router)</li>
              <li>• React 19 & TypeScript</li>
              <li>• Tailwind CSS v4 Theme</li>
              <li>• Supabase PostgreSQL (Connected)</li>
              <li>• Transparent Rule-Based Match Finder</li>
              <li>• Production Ready for Vercel</li>
            </ul>
          </div>
        </div>

        {/* Demo Disclaimer & Copyright Notice */}
        <div className="pt-8 border-t border-[#23303B]/60 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left text-[11px] text-neutral-400">
          <p className="max-w-2xl leading-relaxed">
            <strong className="text-neutral-300">Disclaimer:</strong> TurfTime is a sports venue discovery
            demonstration platform. Venue titles, imagery, pricing figures, and time slots
            are illustrative showcase records and do not depict verified commercial entities. No
            monetary transactions or active bookings are processed.
          </p>

          <p className="shrink-0 text-neutral-400">
            © 2026 TurfTime. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
