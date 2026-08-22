-- 1. Create notifications table if not exists
CREATE TABLE IF NOT EXISTS notifications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  type TEXT NOT NULL,
  message TEXT NOT NULL,
  link TEXT,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Only authenticated users can read their own notifications
DROP POLICY IF EXISTS "Allow authenticated read own notifications" ON notifications;
CREATE POLICY "Allow authenticated read own notifications" 
ON notifications FOR SELECT 
TO authenticated USING (auth.uid() = user_id);

-- Only authenticated users can update their own notifications
DROP POLICY IF EXISTS "Allow authenticated update own notifications" ON notifications;
CREATE POLICY "Allow authenticated update own notifications" 
ON notifications FOR UPDATE 
TO authenticated USING (auth.uid() = user_id);

-- 2. Trigger function for new review notifications
CREATE OR REPLACE FUNCTION create_review_notification()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO notifications (user_id, type, message, link)
  SELECT id, 'review', 'New review from ' || NEW.full_name || ' (Rating: ' || NEW.rating || '/5)', '/dashboard/reviews?filter=pending'
  FROM auth.users
  WHERE email = 'nailmammadovs@gmail.com'; -- Admin email
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop existing trigger if exists
DROP TRIGGER IF EXISTS on_review_created ON reviews;

-- Create trigger
CREATE TRIGGER on_review_created
AFTER INSERT ON reviews
FOR EACH ROW
EXECUTE FUNCTION create_review_notification();

-- 3. Ensure portfolio table has required columns
ALTER TABLE portfolio ADD COLUMN IF NOT EXISTS category TEXT;
ALTER TABLE portfolio ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;
ALTER TABLE portfolio ADD COLUMN IF NOT EXISTS completion_date DATE;
ALTER TABLE portfolio ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id);

-- Make sure tech_stack is TEXT[] (Assuming it is, otherwise you'd have to cast it)

-- 4. Insert 6 real GitHub projects
INSERT INTO portfolio (title, description, tech_stack, github_url, live_demo_url, category, is_featured)
VALUES 
(
  'Coffee Karma', 
  'A coffee shop landing page with modern design and responsive layout.', 
  ARRAY['HTML', 'CSS', 'JavaScript', 'Flexbox', 'CSS Grid'], 
  'https://github.com/Naill-dev/coffekarma', 
  'https://naill-dev.github.io/coffekarma/', 
  'Landing Page', 
  true
),
(
  'CabanTasks', 
  'A Kanban board application with drag-and-drop and LocalStorage persistence.', 
  ARRAY['HTML', 'CSS', 'JavaScript', 'Drag-and-Drop API', 'LocalStorage'], 
  'https://github.com/Naill-dev/cabantasks', 
  'https://naill-dev.github.io/cabantasks/', 
  'Web Application', 
  true
),
(
  'TaskSphere', 
  'A task management dashboard built with React and Context API.', 
  ARRAY['React 18', 'Vite', 'React Router v6', 'Tailwind CSS', 'Context API', 'json-server'], 
  'https://github.com/Naill-dev/devproject', 
  'https://devproject-five.vercel.app', 
  'Dashboard', 
  true
),
(
  'MovieSearch', 
  'A movie search app using the OMDb API with glassmorphism UI.', 
  ARRAY['React 18', 'Vite', 'OMDb API', 'CSS3'], 
  'https://github.com/Naill-dev/moviesearch', 
  'https://moviesearch-qaiz.vercel.app/', 
  'Web Application', 
  false
),
(
  'SananHistory', 
  'A historical timeline website.', 
  ARRAY['HTML', 'CSS', 'JavaScript'], 
  'https://github.com/Naill-dev/SananHistory', 
  NULL, 
  'Landing Page', 
  false
),
(
  'Neon GPA', 
  'A GPA calculator with neon design.', 
  ARRAY['HTML', 'CSS', 'JavaScript'], 
  'https://github.com/Naill-dev/neongpa', 
  NULL, 
  'Web Application', 
  false
);
