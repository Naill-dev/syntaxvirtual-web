-- ==============================================================================
-- 🚨 ULTIMATE MASTER FIX: PORTFOLIO, COMMENTS PIPELINE, AND DASHBOARD CRUD 🚨
-- ==============================================================================

-- 1. Create and Configure Portfolio Images Storage Bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('portfolio-images', 'portfolio-images', true)
ON CONFLICT (id) DO NOTHING;

-- Drop all existing storage policies for this bucket to reset cleanly
DROP POLICY IF EXISTS "Allow public read portfolio-images" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated insert portfolio-images" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated update portfolio-images" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated delete portfolio-images" ON storage.objects;

-- Create correct storage policies
CREATE POLICY "Allow public read portfolio-images" 
ON storage.objects FOR SELECT 
TO public USING (bucket_id = 'portfolio-images');

CREATE POLICY "Allow authenticated insert portfolio-images" 
ON storage.objects FOR INSERT 
TO authenticated WITH CHECK (bucket_id = 'portfolio-images');

CREATE POLICY "Allow authenticated update portfolio-images" 
ON storage.objects FOR UPDATE 
TO authenticated USING (bucket_id = 'portfolio-images');

CREATE POLICY "Allow authenticated delete portfolio-images" 
ON storage.objects FOR DELETE 
TO authenticated USING (bucket_id = 'portfolio-images');


-- 2. Article Comments Pipeline (Anon Insert)
-- Ensure foreign key for articles(title) join in CommentManager
ALTER TABLE article_comments 
  DROP CONSTRAINT IF EXISTS fk_article,
  ADD CONSTRAINT fk_article FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE;

-- Default status to pending (is_approved = false)
ALTER TABLE article_comments ALTER COLUMN is_approved SET DEFAULT false;
ALTER TABLE article_comments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public insert article_comments" ON article_comments;
DROP POLICY IF EXISTS "Allow public read approved comments" ON article_comments;
DROP POLICY IF EXISTS "Allow authenticated full access article_comments" ON article_comments;

CREATE POLICY "Allow public insert article_comments" 
ON article_comments FOR INSERT 
TO public WITH CHECK (true);

CREATE POLICY "Allow public read approved comments" 
ON article_comments FOR SELECT 
TO public USING (is_approved = true);

CREATE POLICY "Allow authenticated full access article_comments" 
ON article_comments FOR ALL 
TO authenticated USING (true) WITH CHECK (true);


-- 3. Complete CRUD RLS Policies for Authenticated Users on ALL Dashboard Tables
-- This ensures the admin can Insert/Update/Delete anywhere in the dashboard
DO $$
DECLARE
    table_name_var text;
BEGIN
    FOR table_name_var IN 
        SELECT tablename 
        FROM pg_tables 
        WHERE schemaname = 'public'
    LOOP
        EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY;', table_name_var);
        EXECUTE format('DROP POLICY IF EXISTS "Allow authenticated full access %I" ON %I;', table_name_var, table_name_var);
        EXECUTE format('CREATE POLICY "Allow authenticated full access %I" ON %I FOR ALL TO authenticated USING (true) WITH CHECK (true);', table_name_var, table_name_var);
    END LOOP;
END;
$$ LANGUAGE plpgsql;

-- 4. Fix Portfolio Schema (Ensure tech_stack is TEXT[])
-- By default, it's already TEXT[]. If it's not, we'll cast it, but we can't do that safely dynamically without dropping. 
-- Just ensure the other required columns are here.
ALTER TABLE portfolio ADD COLUMN IF NOT EXISTS category TEXT;
ALTER TABLE portfolio ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;
ALTER TABLE portfolio ADD COLUMN IF NOT EXISTS completion_date DATE;
