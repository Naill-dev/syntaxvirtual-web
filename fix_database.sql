-- 1. Create article_comments table
CREATE TABLE IF NOT EXISTS article_comments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  article_id UUID NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT,
  comment_text TEXT NOT NULL,
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Enable RLS on article_comments
ALTER TABLE article_comments ENABLE ROW LEVEL SECURITY;

-- 3. RLS Policies for article_comments
-- Allow anyone (public) to submit a comment (INSERT)
DROP POLICY IF EXISTS "Allow public insert article_comments" ON article_comments;
CREATE POLICY "Allow public insert article_comments" 
ON article_comments FOR INSERT 
TO public 
WITH CHECK (true);

-- Allow public to read only approved comments (SELECT)
DROP POLICY IF EXISTS "Allow public read approved comments" ON article_comments;
CREATE POLICY "Allow public read approved comments" 
ON article_comments FOR SELECT 
TO public 
USING (is_approved = true);

-- Allow authenticated dashboard users full access (SELECT, UPDATE, DELETE)
DROP POLICY IF EXISTS "Allow authenticated full access article_comments" ON article_comments;
CREATE POLICY "Allow authenticated full access article_comments" 
ON article_comments FOR ALL 
TO authenticated 
USING (true) WITH CHECK (true);


-- 4. Create Portfolio Images Bucket (if it doesn't exist)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('portfolio-images', 'portfolio-images', true)
ON CONFLICT (id) DO NOTHING;

-- 5. Storage RLS Policies for portfolio-images
DROP POLICY IF EXISTS "Allow public read portfolio-images" ON storage.objects;
CREATE POLICY "Allow public read portfolio-images" 
ON storage.objects FOR SELECT 
TO public 
USING (bucket_id = 'portfolio-images');

DROP POLICY IF EXISTS "Allow authenticated insert portfolio-images" ON storage.objects;
CREATE POLICY "Allow authenticated insert portfolio-images" 
ON storage.objects FOR INSERT 
TO authenticated 
WITH CHECK (bucket_id = 'portfolio-images');

DROP POLICY IF EXISTS "Allow authenticated update portfolio-images" ON storage.objects;
CREATE POLICY "Allow authenticated update portfolio-images" 
ON storage.objects FOR UPDATE 
TO authenticated 
USING (bucket_id = 'portfolio-images');

DROP POLICY IF EXISTS "Allow authenticated delete portfolio-images" ON storage.objects;
CREATE POLICY "Allow authenticated delete portfolio-images" 
ON storage.objects FOR DELETE 
TO authenticated 
USING (bucket_id = 'portfolio-images');


-- 6. Missing authenticated RLS for portfolio and careers (if missing)
-- Make sure authenticated users can full-access portfolio
DROP POLICY IF EXISTS "Allow authenticated full access portfolio" ON portfolio;
CREATE POLICY "Allow authenticated full access portfolio" 
ON portfolio FOR ALL 
TO authenticated 
USING (true) WITH CHECK (true);

-- Make sure authenticated users can full-access careers
DROP POLICY IF EXISTS "Allow authenticated full access careers" ON careers;
CREATE POLICY "Allow authenticated full access careers" 
ON careers FOR ALL 
TO authenticated 
USING (true) WITH CHECK (true);
