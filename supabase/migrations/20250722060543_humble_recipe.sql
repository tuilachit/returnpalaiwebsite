/*
  # Early Users Interest Collection

  1. New Tables
    - `early_users`
      - `id` (uuid, primary key)
      - `email` (text, unique, required)
      - `name` (text, required)
      - `phone` (text, optional)
      - `location` (text, optional)
      - `interest_level` (text, enum: high, medium, low)
      - `preferred_platform` (text, enum: ios, android, both)
      - `pain_points` (text array, optional)
      - `how_heard` (text, optional)
      - `marketing_consent` (boolean, default false)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      - `status` (text, enum: pending, contacted, converted, default: pending)

  2. Security
    - Enable RLS on `early_users` table
    - Add policy for public insert (form submissions)
    - Add policy for authenticated admin read access

  3. Indexes
    - Email index for quick lookups
    - Created_at index for chronological queries
    - Status index for filtering
*/

-- Create enum types
CREATE TYPE interest_level AS ENUM ('high', 'medium', 'low');
CREATE TYPE platform_preference AS ENUM ('ios', 'android', 'both');
CREATE TYPE user_status AS ENUM ('pending', 'contacted', 'converted');

-- Create early_users table
CREATE TABLE IF NOT EXISTS early_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  phone text,
  location text,
  interest_level interest_level DEFAULT 'medium',
  preferred_platform platform_preference DEFAULT 'both',
  pain_points text[],
  how_heard text,
  marketing_consent boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  status user_status DEFAULT 'pending',
  
  -- Constraints
  CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  CONSTRAINT valid_phone CHECK (phone IS NULL OR phone ~* '^\+?[1-9]\d{1,14}$')
);

-- Enable RLS
ALTER TABLE early_users ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can submit interest form"
  ON early_users
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read all early users"
  ON early_users
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update early users"
  ON early_users
  FOR UPDATE
  TO authenticated
  USING (true);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_early_users_email ON early_users(email);
CREATE INDEX IF NOT EXISTS idx_early_users_created_at ON early_users(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_early_users_status ON early_users(status);
CREATE INDEX IF NOT EXISTS idx_early_users_interest_level ON early_users(interest_level);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_early_users_updated_at
  BEFORE UPDATE ON early_users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert some sample data for testing (remove in production)
INSERT INTO early_users (email, name, location, interest_level, preferred_platform, pain_points, how_heard, marketing_consent) VALUES
('sarah.chen@example.com', 'Sarah Chen', 'Sydney, NSW', 'high', 'ios', ARRAY['missed return deadlines', 'lost receipts'], 'friend recommendation', true),
('michael.park@example.com', 'Michael Park', 'Melbourne, VIC', 'medium', 'android', ARRAY['time consuming returns', 'confusing policies'], 'social media', false),
('lisa.rodriguez@example.com', 'Lisa Rodriguez', 'Brisbane, QLD', 'high', 'both', ARRAY['forgot return dates', 'lost money'], 'google search', true);