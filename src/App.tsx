import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { supabase } from './lib/supabaseClient';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { Toaster } from 'react-hot-toast';

import { ArticlePage } from './pages/ArticlePage';
import { LabLayout } from './pages/Lab/LabLayout';
import { LabLanding } from './pages/Lab/LabLanding';
import { PlaygroundPage } from './pages/Lab/Playground/PlaygroundPage';

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
        <Route path="/blog/:slug" element={<ArticlePage />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        
        {/* Lab Routes */}
        <Route path="/lab" element={<LabLayout />}>
          <Route index element={<LabLanding />} />
          <Route path="playground" element={<PlaygroundPage />} />
          <Route path="tools/*" element={<div className="p-8 text-white">Tools (Tezliklə)</div>} />
          <Route path="simulators/*" element={<div className="p-8 text-white">Simulators (Tezliklə)</div>} />
          <Route path="snippets" element={<div className="p-8 text-white">Snippets (Tezliklə)</div>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
