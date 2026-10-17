'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Zap } from 'lucide-react';

interface NavbarProps {
  onBookClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onBookClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Explore Turfs', href: '#explore' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Why TurfTime', href: '#why-us' },
    { label: 'FAQ', href: '#faq' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookCTA = () => {
    setMobileMenuOpen(false);
    if (onBookClick) {
      onBookClick();
    } else {
      const target = document.querySelector('#booking');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#090D10]/95 backdrop-blur-md border-b border-[#23303B] shadow-lg shadow-black/40 py-3.5'
          : 'bg-[#090D10]/80 backdrop-blur-sm border-b border-[#23303B]/60 py-4.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="#hero"
            onClick={(e) => handleLinkClick(e, '#hero')}
            className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B7FF3C] rounded-lg p-1"
            aria-label="TurfTime Home"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#B7FF3C] to-[#88CA16] flex items-center justify-center text-[#090D10] font-black shadow-md shadow-[#B7FF3C]/20 group-hover:scale-105 transition-transform duration-200">
              <Zap className="w-5 h-5 fill-current stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1">
                Turf<span className="text-[#B7FF3C]">Time</span>
              </span>
              <span className="text-[10px] font-semibold tracking-wider uppercase text-neutral-400">
                Sports Venues
              </span>
            </div>
            <span className="ml-1.5 hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#131B22] border border-[#23303B] text-neutral-400">
              Phase 1 Demo
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-5" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="relative text-sm font-medium text-neutral-300 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B7FF3C] rounded px-2.5 py-1.5 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-2.5 right-2.5 h-[2px] bg-[#B7FF3C] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-out origin-left rounded-full" />
              </a>
            ))}
          </nav>

          {/* Header Action Button */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={handleBookCTA}
              type="button"
              id="nav-book-turf-btn"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-[#B7FF3C] text-[#090D10] hover:bg-[#A3EA30] hover:shadow-[0_4px_20px_rgba(183,255,60,0.3)] active:scale-[0.97] transition-all duration-200 shadow-md shadow-[#B7FF3C]/20 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B7FF3C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#090D10]"
            >
              Book a Turf
            </button>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-[#131B22] border border-[#23303B] text-neutral-300 hover:text-white hover:border-[#B7FF3C]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B7FF3C] transition-all duration-200"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
            >
              <div className="relative w-5 h-5 flex items-center justify-center">
                <span
                  className={`absolute transition-all duration-200 transform ${
                    mobileMenuOpen ? 'rotate-90 opacity-0 scale-50' : 'rotate-0 opacity-100 scale-100'
                  }`}
                >
                  <Menu className="w-5 h-5" />
                </span>
                <span
                  className={`absolute transition-all duration-200 transform ${
                    mobileMenuOpen ? 'rotate-0 opacity-100 scale-100' : '-rotate-90 opacity-0 scale-50'
                  }`}
                >
                  <X className="w-5 h-5 text-white" />
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu with smooth CSS height/opacity transition */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-out bg-[#0D141A] border-b border-[#23303B] ${
          mobileMenuOpen ? 'max-h-96 opacity-100 py-4 px-4' : 'max-h-0 opacity-0 py-0 px-4 pointer-events-none'
        }`}
      >
        <div className="space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#23303B]">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Menu Navigation
            </span>
            <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-[#131B22] text-[#B7FF3C] border border-[#B7FF3C]/30">
              Phase 2 Connected
            </span>
          </div>
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="px-3 py-2.5 rounded-lg text-sm font-medium text-neutral-200 hover:bg-[#131B22] hover:text-[#B7FF3C] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="pt-2">
            <button
              onClick={handleBookCTA}
              type="button"
              className="w-full py-3 rounded-xl font-bold text-sm tracking-wide uppercase bg-[#B7FF3C] text-[#090D10] hover:bg-[#A3EA30] active:scale-[0.98] shadow-md shadow-[#B7FF3C]/20 transition-all duration-200"
            >
              Book a Turf Now
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

