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
-- Create Tables
CREATE TABLE reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  role_company TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT NOT NULL,
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  cover_image_url TEXT,
  category TEXT,
  published_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  project_type TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE estimator_inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  project_scope JSONB,
  budget_range TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE estimator_inquiries ENABLE ROW LEVEL SECURITY;

-- Policies for Public (Anonymous) Users
CREATE POLICY "Public can insert reviews" ON reviews FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Public can view approved reviews" ON reviews FOR SELECT TO anon USING (is_approved = true);

CREATE POLICY "Public can view all articles" ON articles FOR SELECT TO anon USING (true);

CREATE POLICY "Public can insert contact submissions" ON contact_submissions FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Public can insert estimator inquiries" ON estimator_inquiries FOR INSERT TO anon WITH CHECK (true);

-- Policies for Authenticated Admin Users
CREATE POLICY "Admin full access to reviews" ON reviews FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access to articles" ON articles FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access to contacts" ON contact_submissions FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access to estimator" ON estimator_inquiries FOR ALL TO authenticated USING (true) WITH CHECK (true);
```

## Running Locally

1. `npm install`
2. `npm run dev`
3. Access `/dashboard` to manage content.
