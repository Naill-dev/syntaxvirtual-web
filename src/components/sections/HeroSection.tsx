import React from 'react';
import { ArrowRight, Sparkles, Code2, Zap, ShieldCheck, Star, Play, Terminal } from 'lucide-react';
import { CodeTerminal } from '../visual/CodeTerminal';

interface HeroSectionProps {
  onOpenBooking: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking }) => {
  return (
    <section id="hero" className="relative min-h-screen pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden flex flex-col justify-center">
      {/* Background Gradients and Light Cones */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[500px] bg-[radial-gradient(circle_at_50%_20%,_rgba(20,184,166,0.18)_0%,_rgba(99,102,241,0.12)_35%,_transparent_70%)] pointer-events-none blur-3xl opacity-80" />
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-teal-500/10 filter blur-[100px] pointer-events-none" />
      <div className="absolute top-40 right-10 w-80 h-80 rounded-full bg-indigo-500/10 filter blur-[120px] pointer-events-none" />

      {/* Grid texture overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-200/80 border border-teal-500/30 backdrop-blur-md shadow-glow-sm">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
              </span>
              <span className="text-xs font-mono font-medium text-teal-300 tracking-wider uppercase">
                ✦ Enterprise Software Engineering
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
              Crafting Digital{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-cyan-400 to-indigo-400 text-glow">
                Excellence
              </span>{' '}
              at Scale.
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              SyntaxVirtual transforms ambitious concepts into robust web applications, enterprise-grade digital systems, and secure infrastructures engineered for long-term scalability and flawless user experiences.
            </p>

            {/* Founder Note Badge */}
            <div className="inline-flex items-center gap-3 py-1.5 px-3.5 rounded-xl bg-surface-100/50 border border-slate-800 text-xs text-slate-300">
              <span className="font-mono text-cyan-400 font-semibold">FOUNDED & ARCHITECTED BY</span>
              <span className="text-white font-medium">Nail Mammadov</span>
              <span className="text-slate-500">•</span>
              <span className="text-emerald-400 font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Full-Stack Expertise
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#contact"
                className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-teal-500 via-cyan-600 to-indigo-600 shadow-glow-md hover:shadow-glow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
              >
                <Sparkles className="w-4 h-4 text-teal-100" />
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#portfolio"
                className="w-full sm:w-auto px-7 py-4 rounded-xl text-sm font-semibold text-slate-200 hover:text-white bg-surface-200/80 hover:bg-surface-100 border border-slate-700/60 backdrop-blur-md transition-all flex items-center justify-center gap-2"
              >
                <span>View Selected Work</span>
              </a>

              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto px-5 py-4 rounded-xl text-sm font-medium text-slate-400 hover:text-cyan-300 transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Book 15-min Call</span>
                <span className="text-xs">→</span>
              </button>
            </div>

            {/* Key Micro-Trust Indicators */}
            <div className="pt-6 border-t border-slate-800/60 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
              <div>
                <div className="text-2xl font-bold font-mono text-white">Modern</div>
                <div className="text-xs text-slate-400 font-sans">Tech Stack</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-mono text-cyan-400">Secure</div>
                <div className="text-xs text-slate-400 font-sans">Architecture</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-mono text-indigo-400">Responsive</div>
                <div className="text-xs text-slate-400 font-sans">UI/UX Design</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-mono text-emerald-400">SEO</div>
                <div className="text-xs text-slate-400 font-sans">Optimized</div>
              </div>
            </div>
          </div>

          {/* Right Column: Code Terminal / Architecture Showcase */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <CodeTerminal />
          </div>
        </div>
      </div>
    </section>
  );
};
