-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- 1. PAGE VIEWS (Analytics)
-- ============================================================
CREATE TABLE page_views (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  page_path TEXT NOT NULL,
  visitor_ip TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================
-- 2. USER ROLES (Role Management)
-- ============================================================
CREATE TABLE user_roles (
  user_id UUID REFERENCES auth.users(id) PRIMARY KEY,
  role TEXT NOT NULL CHECK (role IN ('super_admin', 'admin', 'editor'))
);

-- ============================================================
-- 3. CAREERS & APPLICATIONS
-- ============================================================
CREATE TABLE careers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  department TEXT NOT NULL,
  location TEXT NOT NULL,
  employment_type TEXT NOT NULL,
  description TEXT NOT NULL,
  requirements TEXT[],
  salary_range TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE career_applications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  career_id UUID REFERENCES careers(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  cover_letter TEXT,
  resume_url TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================
-- 4. SITE CONTENT (Dynamic Content)
-- ============================================================
CREATE TABLE site_content (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  section TEXT NOT NULL,
  key TEXT NOT NULL,
  value TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================
-- 5. SEO SETTINGS
-- ============================================================
CREATE TABLE seo_settings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  page_path TEXT UNIQUE NOT NULL,
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT,
  og_image_url TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================
-- 6. ACTIVITY LOGS
-- ============================================================
CREATE TABLE activity_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID,
  user_email TEXT,
  action TEXT NOT NULL,
  entity_type TEXT,
  entity_id UUID,
  details JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================
-- 7. THEME SETTINGS
-- ============================================================
CREATE TABLE theme_settings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  theme_name TEXT NOT NULL,
  primary_color TEXT NOT NULL,
  secondary_color TEXT NOT NULL,
  accent_color TEXT NOT NULL,
  is_active BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================
-- 8. HOMEPAGE SECTIONS (Homepage Builder)
-- ============================================================
CREATE TABLE homepage_sections (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  section_key TEXT UNIQUE NOT NULL,
  is_enabled BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0
);

-- ============================================================
-- 9. NOTIFICATIONS
-- ============================================================
CREATE TABLE notifications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID,
  type TEXT NOT NULL, -- 'inquiry', 'review', 'application'
  message TEXT NOT NULL,
  link TEXT,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================
-- 10. ENHANCE EXISTING TABLES
-- ============================================================
ALTER TABLE portfolio ADD COLUMN IF NOT EXISTS category TEXT;
ALTER TABLE portfolio ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;
ALTER TABLE portfolio ADD COLUMN IF NOT EXISTS completion_date DATE;
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;
ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'new';
ALTER TABLE estimator_inquiries ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'new';

-- ============================================================
-- RLS POLICIES
-- ============================================================
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE careers ENABLE ROW LEVEL SECURITY;
ALTER TABLE career_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE theme_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE homepage_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert page_views" ON page_views FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Allow public read careers" ON careers FOR SELECT TO public USING (is_active = true);
CREATE POLICY "Allow public insert career_applications" ON career_applications FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Allow public read site_content" ON site_content FOR SELECT TO public USING (true);
CREATE POLICY "Allow public read seo_settings" ON seo_settings FOR SELECT TO public USING (true);
CREATE POLICY "Allow public read homepage_sections" ON homepage_sections FOR SELECT TO public USING (true);

CREATE POLICY "Allow authenticated full access page_views" ON page_views FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow authenticated full access user_roles" ON user_roles FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow authenticated full access careers" ON careers FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow authenticated full access career_applications" ON career_applications FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow authenticated full access site_content" ON site_content FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow authenticated full access seo_settings" ON seo_settings FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow authenticated full access activity_logs" ON activity_logs FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow authenticated full access theme_settings" ON theme_settings FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow authenticated full access homepage_sections" ON homepage_sections FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow authenticated full access notifications" ON notifications FOR ALL TO authenticated USING (true);

-- ============================================================
-- INITIAL SEED DATA
-- ============================================================
INSERT INTO homepage_sections (section_key, is_enabled, display_order) VALUES
('hero', true, 0),
('projects', true, 1),
('reviews', true, 2),
('careers', true, 3),
('blog', true, 4)
ON CONFLICT (section_key) DO NOTHING;

INSERT INTO theme_settings (theme_name, primary_color, secondary_color, accent_color, is_active) VALUES
('Default', '#6366f1', '#8b5cf6', '#ec4899', true),
('Midnight', '#1e293b', '#334155', '#38bdf8', false),
('Purple', '#7c3aed', '#a855f7', '#d946ef', false),
('Ocean', '#0ea5e9', '#06b6d4', '#22d3ee', false);

INSERT INTO site_content (section, key, value) VALUES
('hero', 'title', 'Crafting Digital Excellence at Scale'),
('hero', 'subtitle', 'Full‑Stack Development & Cloud Architecture'),
('hero', 'description', 'We build high‑performance web applications with modern technologies.'),
('hero', 'cta_text', 'Start a Project'),
('hero', 'cta_url', '/contact'),
('about', 'title', 'About SyntaxVirtual'),
('about', 'description', 'SyntaxVirtual is a full‑stack development studio focused on delivering exceptional digital experiences.'),
('about', 'founder_name', 'Nail Mammadov'),
('about', 'founder_role', 'Founder & Lead Engineer'),
('contact', 'email', 'info@syntaxvirtual.com'),
('contact', 'phone', '+994 50 123 45 67'),
('contact', 'address', 'Baku, Azerbaijan');
