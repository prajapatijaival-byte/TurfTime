import { FAQItem } from '@/types';

export const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'general',
    question: 'How does TurfTime work?',
    answer:
      'TurfTime is a modern sports venue discovery and booking request interface designed for players and teams. You can find venues via our Match Finder or multi-filter search across Mumbai localities, view comprehensive pitch specifications, calculate dynamic price estimates, and submit a booking request that is securely stored in Supabase PostgreSQL.',
  },
  {
    id: 'faq-2',
    category: 'general',
    question: 'Are the displayed venues and facilities real businesses?',
    answer:
      'No. All venue names (Apex Arena Mahalaxmi, Skyline Rooftop Turf, Worli Sea Breeze, Metro Pro Turf), associated imagery, and listed amenities are illustrative demonstration records. They are modeled after realistic sports turf infrastructure in Mumbai to showcase the platform experience.',
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
      'No. Submitting the booking request form validates your input server-side and securely records your inquiry in Supabase PostgreSQL under "Pending" status. It does not automatically guarantee or lock a slot. A venue coordinator reviews live slot availability and contacts the team organizer directly before any reservation is confirmed.',
  },
  {
    id: 'faq-5',
    category: 'pricing',
    question: 'Are online payments or advance deposits supported?',
    answer:
      'No online payment gateway is connected. TurfTime never asks for credit card, UPI, or banking credentials. Any payment settlements are coordinated offline directly with venue staff after slot verification.',
  },
  {
    id: 'faq-6',
    category: 'technical',
    question: 'How are booking requests stored and secured?',
    answer:
      'Submissions are validated server-side by Next.js Route Handlers (/api/bookings) with authoritative price calculations, then inserted into Supabase PostgreSQL using least-privilege Row Level Security (RLS). Public users can submit requests but cannot view, edit, or delete other users\' records.',
  },
];
