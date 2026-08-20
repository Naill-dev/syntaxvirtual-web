import React from 'react';
import { techStackData } from '../../data/techStackData';
import { 
  Code, Atom, Rocket, FileCode, Wind, Server, 
  Terminal, Zap, Database, Layers, Cpu, Box, 
  Share2, Triangle, Cloud, CreditCard 
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Code: <Code className="w-5 h-5" />,
  Atom: <Atom className="w-5 h-5 text-cyan-400" />,
  Rocket: <Rocket className="w-5 h-5 text-orange-400" />,
  FileCode: <FileCode className="w-5 h-5 text-blue-400" />,
  Wind: <Wind className="w-5 h-5 text-sky-400" />,
  Server: <Server className="w-5 h-5 text-emerald-400" />,
  Terminal: <Terminal className="w-5 h-5 text-yellow-400" />,
  Zap: <Zap className="w-5 h-5 text-teal-400" />,
  Database: <Database className="w-5 h-5 text-indigo-400" />,
  Layers: <Layers className="w-5 h-5 text-emerald-400" />,
  Cpu: <Cpu className="w-5 h-5 text-red-400" />,
  Box: <Box className="w-5 h-5 text-blue-400" />,
  Share2: <Share2 className="w-5 h-5 text-pink-400" />,
  Triangle: <Triangle className="w-5 h-5 text-white" />,
  Cloud: <Cloud className="w-5 h-5 text-amber-400" />,
  CreditCard: <CreditCard className="w-5 h-5 text-purple-400" />,
};

export const TechMarquee: React.FC = () => {
  // Duplicate array for seamless infinite marquee effect
  const marqueeItems = [...techStackData, ...techStackData, ...techStackData];

  return (
    <div className="relative py-16 overflow-hidden border-y border-slate-800/80 bg-[#070B22]/70">
      {/* Side Fade Gradient Masks */}
      <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-r from-[#0A0F2C] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-l from-[#0A0F2C] to-transparent z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 mb-8 text-center">
        <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
          ENGINEERED WITH INDUSTRY-LEADING TECHNOLOGIES & CLOUD INFRASTRUCTURE
        </span>
      </div>

      {/* Row 1: Forward Marquee */}
      <div className="flex w-max animate-marquee space-x-6">
        {marqueeItems.map((tech, idx) => (
          <div
            key={`marquee-1-${idx}`}
            className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-surface-200/60 border border-slate-800/80 backdrop-blur-md hover:border-accent-purple/50 hover:bg-surface-200 transition-all cursor-default group shadow-sm"
          >
            <div className="p-2 rounded-xl bg-surface-100/80 border border-slate-700/50 group-hover:scale-110 transition-transform">
              {iconMap[tech.icon] || <Code className="w-5 h-5" />}
            </div>
            <div>
              <div className="text-sm font-semibold text-white group-hover:text-accent-light transition-colors">
                {tech.name}
              </div>
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                {tech.category}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
