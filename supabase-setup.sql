-- Spam Reports Table
CREATE TABLE IF NOT EXISTS spam_reports (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  phone_number text NOT NULL,
  report_type text NOT NULL CHECK (report_type IN ('spam', 'scam', 'fraud', 'telemarketing', 'other')),
  description text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Index for faster phone number lookups
CREATE INDEX IF NOT EXISTS idx_spam_reports_phone ON spam_reports(phone_number);

-- Enable RLS (Row Level Security)
ALTER TABLE spam_reports ENABLE ROW LEVEL SECURITY;

-- Policy: anyone can read spam reports
CREATE POLICY "Anyone can read spam reports"
  ON spam_reports FOR SELECT
  TO public
  USING (true);

-- Policy: anyone can insert spam reports
CREATE POLICY "Anyone can insert spam reports"
  ON spam_reports FOR INSERT
  TO public
  WITH CHECK (true);
