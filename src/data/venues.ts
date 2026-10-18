import { Venue } from '@/types';

/**
 * Illustrative Demo Venue Data for Mumbai Localities.
 * 
 * IMPORTANT DISCLAIMER:
 * All venue names, hourly prices, facilities, images, and time slots are
 * illustrative demonstration data created for the TurfTime sports venue platform.
 * They do not represent real-world registered businesses, verified availability,
 * or commercial contractual rates.
 */
export const SAMPLE_VENUES: Venue[] = [
  {
    id: 'mahalaxmi-apex',
    name: 'Apex Arena Mahalaxmi',
    locality: 'Mahalaxmi',
    headline: 'Championship-grade floodlit synthetic pitch with city skyline backdrop',
    description:
      'Engineered for competitive 7-a-side football and high-intensity box cricket. Features 50mm monofilament FIFA-certified artificial grass with shock absorption underlay, professional 250-lux perimeter floodlights, and covered player dugouts.',
    image: '/images/venues/mahalaxmi.jpg',
    sports: ['Football', 'Box Cricket'],
    hourlyRate: 2200,
    facilities: [
      'FIFA-Standard 50mm Synthetic Turf',
      'High-Mast 250 Lux LED Floodlights',
      'Covered Team Dugouts & Spectator Benches',
      'Clean Locker Rooms & Showers',
      'Mineral Water & Energy Drink Station',
      'Dedicated Car & Two-Wheeler Parking',
      'First Aid & Ice Pack Station'
    ],
    teamSize: '7v7 Football / 8v8 Box Cricket',
    dimensions: '120 ft × 75 ft',
    surface: 'High-Density Synthetic Polyethylene Grass',
    availableDurations: [1, 1.5, 2, 3],
    operatingHours: '06:00 AM – 01:00 AM',
    isPopular: true,
  },
  {
    id: 'lower-parel-skyturf',
    name: 'Skyline Rooftop Turf',
    locality: 'Lower Parel',
    headline: 'High-altitude multi-sport rooftop arena amidst commercial high-rises',
    description:
      'Perched atop a premium corporate park in the heart of Lower Parel. Offers an electrifying rooftop experience with high safety netting, dual turf markings for 5v5 football, box cricket tournaments, and dedicated pickleball setup.',
    image: '/images/venues/lower-parel.jpg',
    sports: ['Football', 'Box Cricket', 'Pickleball'],
    hourlyRate: 2600,
    facilities: [
      'Dual-Marked Multi-Sport Artificial Turf',
      'Full-Enclosure High-Impact Overhead Netting',
      'Rooftop Lounge & Warm-up Zone',
      'Pickleball Net & Racket Provision',
      'Air-Conditioned Changing Cabins',
      'Valet & Multi-Level Basement Parking',
      'Electronic Digital Scoreboard'
    ],
    teamSize: '5v5 Football / 7v7 Box Cricket / Doubles Pickleball',
    dimensions: '105 ft × 65 ft',
    surface: 'All-Weather UV-Treated AstroTurf',
    availableDurations: [1, 1.5, 2],
    operatingHours: '06:00 AM – 02:00 AM',
    isPopular: true,
  },
  {
    id: 'worli-sea-breeze',
    name: 'Worli Sea Breeze Sports Hub',
    locality: 'Worli',
    headline: 'Coastal breeze open-air turf with views of the Bandra-Worli Sea Link',
    description:
      'Positioned along the scenic Worli coastline. Designed for evening and late-night fixtures with cool sea winds, anti-glare directional sports lighting, reinforced perimeter netting, and comfortable spectator viewing galleries.',
    image: '/images/venues/worli.jpg',
    sports: ['Football', 'Box Cricket', 'Futsal'],
    hourlyRate: 2400,
    facilities: [
      'Coastal-Grade Drainage & Fast-Drying Grass',
      'Anti-Glare Directional Night Floodlights',
      'Direct Sea Link Views & Coastal Breeze',
      'Official Futsal & Cricket Crease Markings',
      'Sound System for Tournament Announcements',
      'Player Refreshment Bar',
      'Security Monitored Parking Area'
    ],
    teamSize: '6v6 Football / 8v8 Box Cricket / 5v5 Futsal',
    dimensions: '115 ft × 70 ft',
    surface: 'Non-Infill Bi-Colour Synthetic Turf',
    availableDurations: [1, 1.5, 2, 3],
    operatingHours: '06:30 AM – 12:30 AM',
    isPopular: false,
  },
  {
    id: 'andheri-metro-pro',
    name: 'Metro Pro Turf & Complex',
    locality: 'Andheri West',
    headline: 'Spacious suburban sports enclave with pro-grade training dugouts',
    description:
      'One of suburban Mumbai’s most accessible sports venues, situated 3 minutes from the metro line. Boasts an expansive playing field accommodating up to 8v8 football encounters, tournament-spec box cricket cages, and ample spectator capacity.',
    image: '/images/venues/andheri.jpg',
    sports: ['Football', 'Box Cricket'],
    hourlyRate: 1900,
    facilities: [
      'Extra-Wide Pitch with Rebound Boarding',
      'Pro Dugouts with Padded Substitutes Benches',
      'Tournament Lighting with Zero Dark Spots',
      'Match Ball & Bibs Available on Request',
      'High-Speed WiFi & Charging Points',
      'Dedicated Coach / Referee Platform',
      'Bike & Car Parking On-Site'
    ],
    teamSize: '7v7 to 8v8 Football / 9v9 Box Cricket',
    dimensions: '135 ft × 80 ft',
    surface: 'Monofilament 45mm Sports Synthetic Turf',
    availableDurations: [1, 1.5, 2, 3],
    operatingHours: '06:00 AM – 01:30 AM',
    isPopular: false,
  },
];

export const AVAILABLE_SPORTS = ['All Sports', 'Football', 'Box Cricket', 'Pickleball', 'Futsal'] as const;

export const DEMO_TIME_SLOTS = [
  '06:00 AM – 07:00 AM (Early Bird)',
  '07:00 AM – 08:00 AM (Morning)',
  '08:00 AM – 09:00 AM (Morning)',
  '05:00 PM – 06:00 PM (Twilight)',
  '06:00 PM – 07:00 PM (Prime Floodlit)',
  '07:00 PM – 08:00 PM (Prime Floodlit)',
  '08:00 PM – 09:00 PM (Peak Night)',
  '09:00 PM – 10:00 PM (Peak Night)',
  '10:00 PM – 11:00 PM (Late Night Match)',
  '11:00 PM – 12:00 AM (Midnight Fixture)'
];

export const DEMO_PRICE_RANGE = {
  min: 1500,
  max: 3000,
  defaultMax: 3000,
  step: 100,
};
