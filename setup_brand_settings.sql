-- ==============================================================================
-- DYNAMIC BRAND & SITE SETTINGS
-- ==============================================================================

-- 1. Create site_settings table
CREATE TABLE IF NOT EXISTS site_settings (
    id TEXT PRIMARY KEY DEFAULT 'global',
    logo_url TEXT,
    site_name TEXT DEFAULT 'SyntaxVirtual',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 2. Insert default global row
INSERT INTO site_settings (id, logo_url, site_name)
VALUES ('global', '', 'SyntaxVirtual')
ON CONFLICT (id) DO NOTHING;

-- 3. Enable RLS
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- 4. Policies for site_settings
DROP POLICY IF EXISTS "Enable read access for all users on site_settings" ON site_settings;
CREATE POLICY "Enable read access for all users on site_settings" 
    ON site_settings FOR SELECT 
    USING (true);

DROP POLICY IF EXISTS "Enable update for authenticated users on site_settings" ON site_settings;
CREATE POLICY "Enable update for authenticated users on site_settings" 
    ON site_settings FOR UPDATE 
    TO authenticated 
    USING (true) 
    WITH CHECK (true);

DROP POLICY IF EXISTS "Enable insert for authenticated users on site_settings" ON site_settings;
CREATE POLICY "Enable insert for authenticated users on site_settings" 
    ON site_settings FOR INSERT 
    TO authenticated 
    WITH CHECK (true);

-- 5. Create 'brand-assets' Storage Bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('brand-assets', 'brand-assets', true)
ON CONFLICT (id) DO NOTHING;

-- 6. Storage Policies for 'brand-assets'
DROP POLICY IF EXISTS "Public Access brand-assets" ON storage.objects;
CREATE POLICY "Public Access brand-assets" 
    ON storage.objects FOR SELECT 
    USING (bucket_id = 'brand-assets');

DROP POLICY IF EXISTS "Auth Upload brand-assets" ON storage.objects;
CREATE POLICY "Auth Upload brand-assets" 
    ON storage.objects FOR INSERT 
    TO authenticated 
    WITH CHECK (bucket_id = 'brand-assets');

DROP POLICY IF EXISTS "Auth Update brand-assets" ON storage.objects;
CREATE POLICY "Auth Update brand-assets" 
    ON storage.objects FOR UPDATE 
    TO authenticated 
    USING (bucket_id = 'brand-assets');

DROP POLICY IF EXISTS "Auth Delete brand-assets" ON storage.objects;
CREATE POLICY "Auth Delete brand-assets" 
    ON storage.objects FOR DELETE 
    TO authenticated 
    USING (bucket_id = 'brand-assets');
