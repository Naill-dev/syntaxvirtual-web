// file: src/pages/Lab/LabLayout.tsx
import { Outlet } from 'react-router-dom';
import { Navbar } from '../../components/layout/Navbar';
import { LabSidebar } from '../../components/Lab/LabSidebar';
import { useEffect } from 'react';

export function LabLayout() {
  useEffect(() => {
    // Force dark mode for Lab
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col font-sans">
      <Navbar onOpenBooking={() => {}} />
      <div className="flex-1 flex overflow-hidden pt-20">
        {/* Sidebar */}
        <div className="hidden md:flex w-64 flex-col border-r border-slate-800/80 bg-slate-900/50 p-4 shadow-[4px_0_24px_-12px_rgba(124,58,237,0.1)]">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 px-2">Syntax Lab</h2>
          <LabSidebar />
        </div>
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-auto bg-slate-950 relative">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
