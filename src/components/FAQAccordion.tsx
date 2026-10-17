'use client';

import React, { useState } from 'react';
import { FAQ_DATA } from '@/data/faq';
import { ChevronDown, HelpCircle, ShieldAlert } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const FAQAccordion: React.FC = () => {
  const [openIds, setOpenIds] = useState<string[]>(['faq-1', 'faq-4']);

  const toggleFAQ = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section id="faq" className="py-20 bg-[#0E1419] border-t border-[#23303B] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#131B22] border border-[#23303B] text-xs font-semibold text-[#B7FF3C]">
            <HelpCircle className="w-3.5 h-3.5" />
            Transparent Answers
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-neutral-400">
            Clear, honest details regarding this technical assessment prototype, demo data, and the
            roadmap for Phase 2.
          </p>
        </ScrollReveal>


        {/* Accordion Container */}
        <div className="space-y-3.5">
          {FAQ_DATA.map((item) => {
            const isOpen = openIds.includes(item.id);
            return (
              <div
                key={item.id}
                className={`bg-[#131B22] border rounded-2xl transition-all duration-200 overflow-hidden ${
                  isOpen ? 'border-[#B7FF3C]/50 shadow-lg shadow-black/40' : 'border-[#23303B]'
                }`}
              >
                <button
                  type="button"
                  id={`faq-question-${item.id}`}
                  onClick={() => toggleFAQ(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item.id}`}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B7FF3C] focus-visible:ring-inset group"
                >
                  <span className="text-base sm:text-lg font-bold text-white group-hover:text-[#B7FF3C] transition-colors duration-200">
                    {item.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-lg bg-[#0E1419] border border-[#23303B] flex items-center justify-center text-neutral-300 shrink-0 transition-all duration-300 ${
                      isOpen ? 'rotate-180 text-[#B7FF3C] border-[#B7FF3C]/50 bg-[#131B22]' : 'group-hover:border-neutral-500'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <div
                  id={`faq-answer-${item.id}`}
                  role="region"
                  aria-labelledby={`faq-question-${item.id}`}
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-[#23303B]/60 pt-4">
                      {item.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>


        {/* Honest Prototype Notice */}
        <div className="mt-12 p-4 rounded-xl bg-[#131B22]/50 border border-[#23303B] flex items-center gap-3 text-xs text-neutral-400">
          <ShieldAlert className="w-4 h-4 text-[#B7FF3C] shrink-0" />
          <span>
            Have technical assessment questions? The entire codebase adheres strictly to Phase 1 constraints: frontend verification only, with genuine backend and persistent database storage slated for Phase 2.
          </span>
        </div>
      </div>
    </section>
  );
};
