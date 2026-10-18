'use client';

import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delayMs = 0,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If user prefers reduced motion or IntersectionObserver is unsupported, show content
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !('IntersectionObserver' in window)
    ) {
      const rafId = requestAnimationFrame(() => setIsVisible(true));
      return () => {
        cancelAnimationFrame(rafId);
      };
    }

    const element = domRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: '0px 0px -20px 0px',
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={domRef}
      style={{
        transitionDelay: isVisible ? `${delayMs}ms` : '0ms',
        transitionDuration: '500ms',
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className={`reveal-animated transition-all duration-500 ease-out will-change-[transform,opacity] ${
        isVisible
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-4 scale-[0.99]'
      } ${className}`}
    >
      {children}
    </div>
  );

};
