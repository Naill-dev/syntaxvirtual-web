-- ==============================================================================
-- ADD ARTICLE SLUGS FOR SEO DYNAMIC ROUTING
-- ==============================================================================

-- 1. Add slug column (nullable temporarily)
ALTER TABLE articles ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE;

-- 2. Auto-generate basic URL-friendly slugs for existing articles based on their titles
-- We append a small substring of their UUID to guarantee uniqueness
UPDATE articles
SET slug = lower(regexp_replace(regexp_replace(title, '[^a-zA-Z0-9\s-]', '', 'g'), '\s+', '-', 'g')) || '-' || substring(id::text, 1, 6)
WHERE slug IS NULL;

-- 3. Make the slug column required for all future articles
ALTER TABLE articles ALTER COLUMN slug SET NOT NULL;
