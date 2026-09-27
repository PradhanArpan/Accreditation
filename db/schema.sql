-- Accreditation Data Portal — schema
-- Run once against your Postgres database (locally, or Render's managed Postgres).

CREATE TABLE IF NOT EXISTS faculty (
  id SERIAL PRIMARY KEY,
  name TEXT,
  designation TEXT,
  qualification TEXT,
  specialization TEXT,
  experience_years INTEGER,
  employment_type TEXT,
  publications_3yr INTEGER,
  patents INTEGER,
  status TEXT DEFAULT 'Draft',
  note TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS infrastructure (
  id SERIAL PRIMARY KEY,
  category TEXT,
  name TEXT,
  capacity TEXT,
  equipment_count INTEGER,
  year_established INTEGER,
  evidence_note TEXT,
  status TEXT DEFAULT 'Draft',
  note TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS research (
  id SERIAL PRIMARY KEY,
  type TEXT,
  title TEXT,
  authors TEXT,
  year INTEGER,
  venue TEXT,
  indexing TEXT,
  amount_inr NUMERIC,
  status TEXT DEFAULT 'Draft',
  note TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS programs (
  id SERIAL PRIMARY KEY,
  name TEXT,
  level TEXT,
  tier TEXT,
  intake INTEGER,
  co_count INTEGER,
  po_count INTEGER,
  attainment_pct NUMERIC,
  status TEXT DEFAULT 'Draft',
  note TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Single-row table: one department profile per academic year record.
-- Kept simple as one active row; extend to (id, academic_year) composite
-- if you need multiple years on file simultaneously.
CREATE TABLE IF NOT EXISTS profile (
  id INTEGER PRIMARY KEY DEFAULT 1,
  academic_year TEXT,
  total_students INTEGER,
  women_students_pct NUMERIC,
  region_diverse_pct NUMERIC,
  esc_students_pct NUMERIC,
  pwd_facilities BOOLEAN,
  placement_pct NUMERIC,
  median_salary_lpa NUMERIC,
  higher_studies_pct NUMERIC,
  budget_allocated_inr NUMERIC,
  budget_utilized_inr NUMERIC,
  library_books_count INTEGER,
  wifi_ict_available BOOLEAN,
  updated_at TIMESTAMPTZ DEFAULT now(),
  CONSTRAINT single_row CHECK (id = 1)
);

-- basic login (Phase 1 add-on — see README "Adding real auth")
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT DEFAULT 'staff', -- 'staff' | 'iqac' | 'admin'
  created_at TIMESTAMPTZ DEFAULT now()
);
