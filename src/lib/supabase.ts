import { createClient } from '@supabase/supabase-js';

// Supabase client (optional, fallback to in-memory if not configured)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

export const isSupabaseConfigured = !!supabase;

// Database schema (run this SQL in Supabase dashboard):
/*
CREATE TABLE IF NOT EXISTS spam_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  number VARCHAR(15) NOT NULL,
  category VARCHAR(50) NOT NULL,
  comment TEXT,
  ip_hash VARCHAR(64),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  INDEX idx_number (number),
  INDEX idx_created_at (created_at)
);

CREATE TABLE IF NOT EXISTS spam_stats (
  number VARCHAR(15) PRIMARY KEY,
  total_reports INT DEFAULT 0,
  categories JSONB DEFAULT '{}',
  confidence_score FLOAT DEFAULT 0,
  first_reported TIMESTAMP WITH TIME ZONE,
  last_reported TIMESTAMP WITH TIME ZONE,
  INDEX idx_confidence (confidence_score DESC)
);

-- Function to increment spam stats
CREATE OR REPLACE FUNCTION increment_spam_report(
  p_number VARCHAR(15),
  p_category VARCHAR(50)
) RETURNS void AS $$
BEGIN
  INSERT INTO spam_stats (number, total_reports, categories, first_reported, last_reported)
  VALUES (
    p_number, 
    1, 
    jsonb_build_object(p_category, 1),
    NOW(),
    NOW()
  )
  ON CONFLICT (number) DO UPDATE SET
    total_reports = spam_stats.total_reports + 1,
    categories = spam_stats.categories || jsonb_build_object(
      p_category, 
      COALESCE((spam_stats.categories->p_category)::int, 0) + 1
    ),
    last_reported = NOW(),
    confidence_score = LEAST(
      1.0,
      (spam_stats.total_reports + 1)::float / 10.0
    );
END;
$$ LANGUAGE plpgsql;
*/
