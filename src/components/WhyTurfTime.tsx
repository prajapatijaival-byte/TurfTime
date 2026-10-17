import React from 'react';
import { Sparkles, Calculator, CalendarCheck2, ShieldCheck } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const WhyTurfTime: React.FC = () => {
  const benefits = [
    {
      icon: Sparkles,
      title: 'Convenient Venue Discovery',
      description:
        'Quickly browse curated sports arenas across major Mumbai localities without toggling between scattered social media pages and outdated phone directories.',
      detail: 'Standardized pitch specs and verified surface information.',
    },
    {
      icon: Calculator,
      title: 'Transparent Illustrative Pricing',
      description:
        'Know exactly what a 60, 90, or 120-minute slot costs upfront with an instant rate breakdown. No surprise floodlight surcharges or hidden convenience fees.',
      detail: 'Dynamic cost estimation matching duration in real time.',
    },
    {
      icon: CalendarCheck2,
      title: 'Simple Slot & Time Selection',
      description:
        'Choose from morning match windows, prime evening slots, and midnight floodlit fixtures tailored for amateur leagues, corporate tournaments, and friendly games.',
      detail: 'Designed around common recreational team match hours.',
    },
    {
      icon: ShieldCheck,
      title: 'Streamlined Request Experience',
      description:
        'Built with an accessible, high-performance interface that lets team captains submit complete slot inquiries with sensible validations and zero clutter.',
      detail: 'Built on modern React and TypeScript architecture.',
    },
  ];

  return (
    <section id="why-us" className="py-20 bg-[#090D10] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#B7FF3C]">
            Engineered For Players
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Why Choose TurfTime?
          </h2>
          <p className="text-sm sm:text-base text-neutral-400">
            A purpose-built digital platform removing friction from sports venue bookings across Mumbai.
          </p>
        </ScrollReveal>

        {/* 4 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((item, index) => {
            const Icon = item.icon;
            return (
              <ScrollReveal
                key={index}
                delayMs={index * 80}
                className="h-full"
              >
                <div className="bg-[#0E1419] border border-[#23303B] hover:border-[#B7FF3C]/50 rounded-2xl p-6 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_12px_32px_rgba(183,255,60,0.08)] flex flex-col justify-between group h-full">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-[#131B22] border border-[#23303B] group-hover:border-[#B7FF3C]/40 group-hover:bg-[#131B22] flex items-center justify-center text-[#B7FF3C] mb-5 transition-all duration-300">
                      <Icon className="w-6 h-6 stroke-[2] group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#B7FF3C] transition-colors duration-200">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-4">
                      {item.description}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-[#23303B]/60 text-[11px] text-neutral-400 font-medium">
                    {item.detail}
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

