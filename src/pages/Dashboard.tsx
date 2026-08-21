import { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { LogOut, LayoutDashboard, MessageSquare, BookOpen, Inbox } from 'lucide-react';

import { DashboardLogin } from '../components/dashboard/DashboardLogin';
import { ReviewManager } from '../components/dashboard/ReviewManager';
import { ArticleManager } from '../components/dashboard/ArticleManager';
import { ContactManager } from '../components/dashboard/ContactManager';

export function Dashboard() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/dashboard');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#060919] flex items-center justify-center">
        <svg className="animate-spin h-10 w-10 text-accent-purple" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    );
  }

  if (!session) {
    return <DashboardLogin />;
  }

  const navItems = [
    { name: 'Overview', path: '/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { name: 'Reviews', path: '/dashboard/reviews', icon: <MessageSquare className="w-4 h-4" /> },
    { name: 'Articles', path: '/dashboard/articles', icon: <BookOpen className="w-4 h-4" /> },
    { name: 'Inquiries', path: '/dashboard/inquiries', icon: <Inbox className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-[#060919] text-slate-300 font-sans flex">
      {/* Sidebar */}
      <aside className="w-64 bg-surface-300 border-r border-slate-800 flex flex-col shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-slate-800">
          <Link to="/" className="text-white font-bold text-lg flex items-center gap-2 hover:text-accent-light transition-colors">
            <span className="w-2 h-2 rounded-full bg-accent-purple" />
            Syntax Admin
          </Link>
        </div>
        
        <div className="flex-1 py-6 px-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                location.pathname === item.path
                  ? 'bg-accent-purple text-white shadow-glow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-surface-200'
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </div>

        <div className="p-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-surface-200 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-[#0A0F2C]">
        <div className="p-8 max-w-6xl mx-auto">
          <Routes>
            <Route path="/" element={
              <div className="space-y-6">
                <h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>
                <p className="text-slate-400">Welcome to your secure command center. Use the sidebar to manage content.</p>
              </div>
            } />
            <Route path="/reviews" element={<ReviewManager />} />
            <Route path="/articles" element={<ArticleManager />} />
            <Route path="/inquiries" element={<ContactManager />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
