import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { supabase } from './lib/supabaseClient';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { Toaster } from 'react-hot-toast';

function App() {
  const location = useLocation();

  useEffect(() => {
    // Log page view on route change
    const logPageView = async () => {
      await supabase.from('page_views').insert([{
        page_path: location.pathname,
        user_agent: navigator.userAgent
      }]);
    };
    logPageView();
  }, [location.pathname]);

  return (
    <>
      <Toaster position="top-right" toastOptions={{
        style: {
          background: '#0f172a',
          color: '#fff',
          border: '1px solid #1e293b',
        },
      }} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
