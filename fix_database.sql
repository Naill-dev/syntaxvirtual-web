-- 1. Create Portfolio Images Bucket (if it doesn't exist)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('portfolio-images', 'portfolio-images', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Storage RLS Policies for portfolio-images
-- Allow public access to view images
CREATE POLICY "Allow public read portfolio-images" 
ON storage.objects FOR SELECT 
TO public 
USING (bucket_id = 'portfolio-images');

-- Allow authenticated users to upload images
CREATE POLICY "Allow authenticated insert portfolio-images" 
ON storage.objects FOR INSERT 
TO authenticated 
WITH CHECK (bucket_id = 'portfolio-images');

-- Allow authenticated users to update/delete images
CREATE POLICY "Allow authenticated update portfolio-images" 
ON storage.objects FOR UPDATE 
TO authenticated 
USING (bucket_id = 'portfolio-images');

CREATE POLICY "Allow authenticated delete portfolio-images" 
ON storage.objects FOR DELETE 
TO authenticated 
USING (bucket_id = 'portfolio-images');


-- 3. Missing RLS for article_comments
ALTER TABLE article_comments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public insert article_comments" 
ON article_comments FOR INSERT 
TO public 
WITH CHECK (true);

-- 4. Missing authenticated RLS for portfolio and careers (if missing)
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
