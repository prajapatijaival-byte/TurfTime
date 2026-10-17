'use client';

import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
  as?: React.ElementType;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delayMs = 0,
  as: Component = 'div',
}) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // If reduced motion is requested, CSS overrides reveal-on-scroll to fully visible immediately
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    // Flag document as ready for scroll animations
    document.documentElement.classList.add('js-ready');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsRevealed(true);
            if (elementRef.current) {
              observer.unobserve(elementRef.current);
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    const currentElem = elementRef.current;
    if (currentElem) {
      observer.observe(currentElem);
    }

    return () => {
      if (currentElem) {
        observer.unobserve(currentElem);
      }
    };
  }, []);

  return (
    <Component
      ref={elementRef}
      style={delayMs && isRevealed ? { transitionDelay: `${delayMs}ms` } : undefined}
      className={`reveal-on-scroll ${isRevealed ? 'revealed' : ''} ${className}`}
    >
      {children}
    </Component>
  );
};
