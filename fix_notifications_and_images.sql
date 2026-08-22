-- ============================================================
-- FIX REVIEW NOTIFICATION TRIGGER
-- ============================================================

-- Step 1: Drop existing trigger and function
DROP TRIGGER IF EXISTS on_review_created ON reviews;
DROP FUNCTION IF EXISTS create_review_notification();

-- Step 2: Recreate function with correct user_id lookup and SECURITY DEFINER
CREATE OR REPLACE FUNCTION create_review_notification()
RETURNS TRIGGER AS $$
DECLARE
  admin_user_id UUID;
BEGIN
  -- Get admin user ID
  SELECT id INTO admin_user_id 
  FROM auth.users 
  WHERE email = 'nailmammadovs@gmail.com';
  
  -- Insert notification if admin exists
  IF admin_user_id IS NOT NULL THEN
    INSERT INTO notifications (user_id, type, message, link)
    VALUES (
      admin_user_id,
      'review',
      'New review from ' || NEW.full_name || ' (Rating: ' || NEW.rating || '/5)',
      '/dashboard/reviews?filter=pending'
    );
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 3: Create trigger
CREATE TRIGGER on_review_created
AFTER INSERT ON reviews
FOR EACH ROW
EXECUTE FUNCTION create_review_notification();


-- ============================================================
-- FIX PORTFOLIO IMAGES PLACEHOLDERS
-- ============================================================

UPDATE portfolio 
SET image_url = 'https://placehold.co/600x400/1e293b/6366f1?text=' || REPLACE(title, ' ', '+')
WHERE image_url IS NULL OR image_url = '';
