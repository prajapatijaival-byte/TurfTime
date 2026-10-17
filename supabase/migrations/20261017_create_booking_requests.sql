-- TurfTime — Database Setup & Migration Script for Supabase PostgreSQL
-- Table: booking_requests
-- Run this script in the Supabase SQL Editor (Dashboard -> SQL Editor -> New Query)

-- 1. Create table
CREATE TABLE IF NOT EXISTS booking_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  customer_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  venue_id VARCHAR(50) NOT NULL,
  venue_name VARCHAR(120) NOT NULL,
  booking_date DATE NOT NULL,
  start_time VARCHAR(60) NOT NULL,
  duration_hours NUMERIC(3, 1) NOT NULL CHECK (duration_hours > 0 AND duration_hours <= 12),
  estimated_price INTEGER NOT NULL CHECK (estimated_price >= 0),
  notes TEXT,
  status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'cancelled'))
);

-- 2. Performance & lookup indexes
CREATE INDEX IF NOT EXISTS idx_booking_requests_venue_date 
  ON booking_requests (venue_id, booking_date);

CREATE INDEX IF NOT EXISTS idx_booking_requests_created_at 
  ON booking_requests (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_booking_requests_status 
  ON booking_requests (status);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE booking_requests ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if re-running
DROP POLICY IF EXISTS "Allow public insert of booking requests" ON booking_requests;
DROP POLICY IF EXISTS "Allow service role full access" ON booking_requests;

-- 4. Least-Privilege Policies:
-- Allow public / anon users to submit pending booking inquiries ONLY
CREATE POLICY "Allow public insert of booking requests"
  ON booking_requests
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    status = 'pending' AND
    customer_name IS NOT NULL AND
    email IS NOT NULL AND
    phone IS NOT NULL AND
    venue_id IS NOT NULL AND
    booking_date >= CURRENT_DATE
  );

-- Service role (internal server admin) retains full management permissions
CREATE POLICY "Allow service role full access"
  ON booking_requests
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- NOTE: No SELECT, UPDATE, or DELETE policies exist for anon users.
-- Therefore, public visitors CANNOT read, alter, or purge customer data.
