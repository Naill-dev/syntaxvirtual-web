// file: src/components/Lab/LabSidebar.tsx
import { Link, useLocation } from 'react-router-dom';
import { Terminal, Settings, Server, BookOpen, Home } from 'lucide-react';

export function LabSidebar() {
  const location = useLocation();

  const links = [
    { label: 'Playground', path: '/lab/playground', icon: Terminal },
    { label: 'Tools', path: '/lab/tools', icon: Settings },
    { label: 'Simulators', path: '/lab/simulators', icon: Server },
    { label: 'Snippets', path: '/lab/snippets', icon: BookOpen },
  ];

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <nav className="flex flex-col gap-2">
        <Link 
          to="/lab"
          className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            location.pathname === '/lab' 
              ? 'bg-accent-purple/20 text-accent-light border border-accent-purple/30' 
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <Home className="w-4 h-4" />
          Lab Ana Səhifə
        </Link>
        
        <div className="my-2 border-b border-slate-800/80"></div>

        {links.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname.startsWith(link.path);
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive 
                  ? 'bg-accent-purple/20 text-accent-light border border-accent-purple/30' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Icon className="w-4 h-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
