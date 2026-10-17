import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'TurfTime — Premium Sports Venue Booking in Mumbai',
  description:
    'Discover and request bookings for premium floodlit artificial turf sports venues across Mumbai localities. Transparent hourly rates, instant price estimation, and easy slot selection for football, box cricket, and pickleball.',
  keywords: [
    'Turf booking Mumbai',
    'Sports venue booking',
    'Football turf',
    'Box cricket turf',
    'Floodlit turf Mumbai',
    'TurfTime',
    'Mahalaxmi turf',
    'Lower Parel rooftop turf',
    'Worli turf',
    'Andheri sports ground',
  ],
  authors: [{ name: 'TurfTime Team' }],
  openGraph: {
    title: 'TurfTime — Premium Sports Venue Booking',
    description:
      'Discover and request bookings for premium floodlit artificial sports turfs across Mumbai.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'TurfTime',
  },
};

export const viewport: Viewport = {
  themeColor: '#090D10',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} scroll-smooth dark`}>
      <body className="bg-[#090D10] text-[#F1F5F9] antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
