-- Run this in Supabase SQL Editor to verify data
SELECT 'portfolio' as table_name, COUNT(*) as count FROM portfolio
UNION ALL
SELECT 'reviews', COUNT(*) FROM reviews
UNION ALL
SELECT 'articles', COUNT(*) FROM articles
UNION ALL
SELECT 'careers', COUNT(*) FROM careers
UNION ALL
SELECT 'contact_submissions', COUNT(*) FROM contact_submissions
UNION ALL
SELECT 'notifications', COUNT(*) FROM notifications;

-- Check RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
ORDER BY tablename;
