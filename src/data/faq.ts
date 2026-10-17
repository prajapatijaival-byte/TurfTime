import { FAQItem } from '@/types';

export const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'general',
    question: 'How does TurfTime work?',
    answer:
      'TurfTime is a digital sports venue discovery and booking request interface designed for players and teams. In this current Phase 1 prototype, you can explore premium floodlit venues across Mumbai localities, filter by sport, locality, and hourly pricing, view comprehensive pitch specifications, and construct an illustrative booking request with dynamic price estimation.',
  },
  {
    id: 'faq-2',
    category: 'general',
    question: 'Are the displayed venues and facilities real businesses?',
    answer:
      'No. All venue names (Apex Arena Mahalaxmi, Skyline Rooftop Turf, Worli Sea Breeze, Metro Pro Turf), associated imagery, and listed amenities are fictional illustrative demo records crafted specifically for this technical assessment. They are modeled after realistic sports turf infrastructure in Mumbai for demonstration purposes.',
  },
  {
    id: 'faq-3',
    category: 'pricing',
    question: 'Are the displayed hourly rates actual market prices?',
    answer:
      'The hourly rates shown (such as ₹1,900 to ₹2,600/hr) are illustrative benchmark figures reflecting standard prime-time synthetic turf rates in Mumbai. They do not constitute actual commercial quotations or legally binding contractual pricing.',
  },
  {
    id: 'faq-4',
    category: 'booking',
    question: 'Does submitting a request confirm a booking reservation?',
    answer:
      'No. Submitting the booking request form in this Phase 1 prototype validates user input on the frontend and calculates estimated costs. It does not create a database reservation or block slots on an active venue calendar. Real-time availability checks and instant confirmations are slated for Phase 2 integration.',
  },
  {
    id: 'faq-5',
    category: 'pricing',
    question: 'Are online payments or advance deposits supported?',
    answer:
      'No online payment gateway is connected in Phase 1. You will never be asked to enter credit card, UPI, or banking credentials. Any future monetary transactions will occur only after Phase 2 integrates compliant payment processors.',
  },
  {
    id: 'faq-6',
    category: 'technical',
    question: 'What is planned for Phase 2 backend integration?',
    answer:
      'Phase 2 will introduce Next.js Route Handlers coupled with a Supabase PostgreSQL database to store genuine user accounts, venue schedules, live slot locks, booking confirmation emails, and administrative venue management tools.',
  },
];
