# SyntaxVirtual Platform

Premium web development agency website built with React, TypeScript, Tailwind CSS, and Supabase.

## Supabase Setup Instructions

1. Create a new project at [Supabase](https://supabase.com/).
2. Go to **Project Settings -> API** and copy the `Project URL` and `anon public` key.
3. Rename `.env.example` to `.env` in the root of your project and paste your credentials:

```
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

4. Go to **Authentication -> Providers** and ensure **Email** is enabled.
5. Create an Admin user via **Authentication -> Users -> Add User**. This email/password will be used to log into the `/dashboard`.
6. Go to **SQL Editor** in Supabase and run the following schema to create your tables and security policies:

### SQL Schema

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Reviews Table
CREATE TABLE reviews (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  full_name TEXT NOT NULL,
  role_company TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT NOT NULL,
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Articles Table
CREATE TABLE articles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  cover_image_url TEXT,
  category TEXT,
  published_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Contact Submissions Table
CREATE TABLE contact_submissions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  project_type TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Estimator Inquiries Table
CREATE TABLE estimator_inquiries (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email TEXT NOT NULL,
  project_scope JSONB,
  budget_range TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security (RLS) Policies
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE estimator_inquiries ENABLE ROW LEVEL SECURITY;

-- Public can insert into reviews
CREATE POLICY "Allow public insert reviews" ON reviews
  FOR INSERT TO public WITH CHECK (true);

-- Public can read approved reviews only
CREATE POLICY "Allow public read approved reviews" ON reviews
  FOR SELECT TO public USING (is_approved = true);

-- Public can insert contact submissions
CREATE POLICY "Allow public insert contact" ON contact_submissions
  FOR INSERT TO public WITH CHECK (true);

-- Public can insert estimator inquiries
CREATE POLICY "Allow public insert estimator" ON estimator_inquiries
  FOR INSERT TO public WITH CHECK (true);

-- Public can read articles
CREATE POLICY "Allow public read articles" ON articles
  FOR SELECT TO public USING (true);

-- Authenticated users (dashboard) have full access
CREATE POLICY "Allow authenticated full access reviews" ON reviews
  FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow authenticated full access articles" ON articles
  FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow authenticated full access contact" ON contact_submissions
  FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow authenticated full access estimator" ON estimator_inquiries
  FOR ALL TO authenticated USING (true);
```


