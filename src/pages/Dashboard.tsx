import { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { LogOut, LayoutDashboard, MessageSquare, BookOpen, Inbox, Menu, X, Briefcase, Activity, Settings, Users, Shield, Type, Globe, Image as ImageIcon } from 'lucide-react';
import toast from 'react-hot-toast';

import { DashboardLogin } from '../components/dashboard/DashboardLogin';
import { ReviewManager } from '../components/dashboard/ReviewManager';
import { ArticleManager } from '../components/dashboard/ArticleManager';
import { ContactManager } from '../components/dashboard/ContactManager';
import { CommentManager } from '../components/dashboard/CommentManager';
import { PortfolioManager } from '../components/dashboard/PortfolioManager';
import { AnalyticsDashboard } from '../components/dashboard/AnalyticsDashboard';
import { RoleManager } from '../components/dashboard/RoleManager';
import { CareersManager } from '../components/dashboard/CareersManager';
import { ContentManager } from '../components/dashboard/ContentManager';
import { SeoManager } from '../components/dashboard/SeoManager';
import { MediaLibrary } from '../components/dashboard/MediaLibrary';
import { ActivityLogs } from '../components/dashboard/ActivityLogs';
import { SecurityDashboard } from '../components/dashboard/SecurityDashboard';
import { SettingsManager } from '../components/dashboard/SettingsManager';
import { NotificationBell } from '../components/ui/NotificationBell';

export function Dashboard() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) return;
    let timeoutId: ReturnType<typeof setTimeout>;
    const resetTimeout = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(async () => {
        await supabase.auth.signOut();
        toast.error('Session expired. Please login again.');
        navigate('/dashboard');
      }, 30 * 60 * 1000);
    };
    const events = ['mousemove', 'keypress', 'scroll', 'click'];
    events.forEach(e => window.addEventListener(e, resetTimeout));
    resetTimeout();
    return () => {
      clearTimeout(timeoutId);
      events.forEach(e => window.removeEventListener(e, resetTimeout));
    };
  }, [session, navigate]);

  useEffect(() => { setIsSidebarOpen(false); }, [location.pathname]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/dashboard');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#060919] flex items-center justify-center">
        <svg className="animate-spin h-10 w-10 text-accent-purple" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
      </div>
    );
  }

  if (!session) {
    return <DashboardLogin />;
  }

  const navItems = [
    { path: '/dashboard/analytics', label: 'Analytics', icon: LayoutDashboard },
    { path: '/dashboard/projects', label: 'Projects', icon: Briefcase },
    { path: '/dashboard/reviews', label: 'Reviews', icon: MessageSquare },
    { path: '/dashboard/articles', label: 'Articles', icon: BookOpen },
    { path: '/dashboard/comments', label: 'Comments', icon: MessageSquare },
    { path: '/dashboard/careers', label: 'Careers', icon: Briefcase },
    { path: '/dashboard/inquiries', label: 'Inquiries', icon: Inbox },
    { path: '/dashboard/content', label: 'Content', icon: Type },
    { path: '/dashboard/seo', label: 'SEO', icon: Globe },
    { path: '/dashboard/media', label: 'Media Library', icon: ImageIcon },
    { path: '/dashboard/activity', label: 'Activity Logs', icon: Activity },
    { path: '/dashboard/security', label: 'Security', icon: Shield },
    { path: '/dashboard/users', label: 'Users (Admin)', icon: Users },
    { path: '/dashboard/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#060919] flex">
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}
      
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-surface-300 border-r border-slate-800 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:block ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-accent-purple to-accent-lavender">
            SyntaxVirtual
          </Link>
          <button className="lg:hidden text-slate-400 hover:text-white" onClick={() => setIsSidebarOpen(false)}><X className="w-6 h-6" /></button>
        </div>
        <nav className="px-4 py-2 space-y-1 h-[calc(100vh-160px)] overflow-y-auto">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${location.pathname === item.path ? 'bg-accent-purple text-white shadow-glow-sm' : 'text-slate-400 hover:bg-surface-200 hover:text-white'}`}>
              <item.icon className="w-5 h-5" />
              <span className="font-medium text-sm">{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-800 bg-surface-300">
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-400 hover:bg-red-500/10 transition-colors">
            <LogOut className="w-5 h-5" />
            <span className="font-medium text-sm">Sign Out</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <header className="h-20 border-b border-slate-800 bg-surface-300/50 backdrop-blur-md flex items-center justify-between px-4 sm:px-8 shrink-0">
          <div className="flex items-center gap-4">
            <button className="lg:hidden text-slate-400 hover:text-white p-2" onClick={() => setIsSidebarOpen(true)}>
              <Menu className="w-6 h-6" />
            </button>
            <h2 className="text-lg font-semibold text-white hidden sm:block">Dashboard Overview</h2>
          </div>
          <div className="flex items-center gap-4">
            <NotificationBell />
            <div className="h-8 w-8 rounded-full bg-accent-purple/20 flex items-center justify-center border border-accent-purple/30">
              <span className="text-sm font-medium text-accent-purple">{session.user?.email?.[0].toUpperCase()}</span>
            </div>
          </div>
        </header>
        
        <div className="flex-1 overflow-auto p-4 sm:p-8">
          <div className="max-w-6xl mx-auto">
            <Routes>
              <Route path="/" element={<AnalyticsDashboard />} />
              <Route path="/analytics" element={<AnalyticsDashboard />} />
              <Route path="/projects" element={<PortfolioManager />} />
              <Route path="/reviews" element={<ReviewManager />} />
              <Route path="/articles" element={<ArticleManager />} />
              <Route path="/comments" element={<CommentManager />} />
              <Route path="/inquiries" element={<ContactManager />} />
              <Route path="/careers" element={<CareersManager />} />
              <Route path="/content" element={<ContentManager />} />
              <Route path="/seo" element={<SeoManager />} />
              <Route path="/media" element={<MediaLibrary />} />
              <Route path="/activity" element={<ActivityLogs />} />
              <Route path="/security" element={<SecurityDashboard />} />
              <Route path="/users" element={<RoleManager />} />
              <Route path="/settings" element={<SettingsManager />} />
            </Routes>
          </div>
        </div>
      </main>
    </div>
  );
}
