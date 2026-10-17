export type SportType = 'Football' | 'Box Cricket' | 'Pickleball' | 'Futsal';

export interface Venue {
  id: string;
  name: string;
  locality: string;
  headline: string;
  description: string;
  image: string;
  sports: SportType[];
  hourlyRate: number; // in INR
  facilities: string[];
  teamSize: string;
  dimensions: string;
  surface: string;
  availableDurations: number[]; // in hours e.g. [1, 1.5, 2, 3]
  operatingHours: string;
  isPopular?: boolean;
}

export interface VenueFilterState {
  searchQuery: string;
  selectedSport: string;
  maxPrice: number;
}

export interface BookingFormData {
  fullName: string;
  email: string;
  phone: string;
  venueId: string;
  date: string;
  timeSlot: string;
  duration: number; // in hours
  notes: string;
}

export interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  venueId?: string;
  date?: string;
  timeSlot?: string;
  duration?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'booking' | 'pricing' | 'technical';
}
