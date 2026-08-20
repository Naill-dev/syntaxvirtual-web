import React from 'react';
import { Search, PenTool, TerminalSquare, Rocket, CheckCircle2 } from 'lucide-react';

export const ProcessSection: React.FC = () => {
  const steps = [
    {
      id: '01',
      title: 'Discovery & Strategic Blueprint',
      icon: <Search className="w-6 h-6 text-accent-violet" />,
      desc: 'We map out your business objectives, technical constraints, and user personas to construct a robust architectural blueprint.',
      deliverables: ['Technical Requirements Document', 'Architecture Diagram', 'Project Timeline Timeline', 'Tech Stack Selection'],
    },
    {
      id: '02',
      title: 'Architecture & Design Systems',
      icon: <PenTool className="w-6 h-6 text-fuchsia-400" />,
      desc: 'Creating high-fidelity Figma prototypes and engineering a cohesive, scalable UI token system ready for component development.',
      deliverables: ['Atomic Design System', 'Interactive Prototypes', 'Responsive Layout Grids', 'Micro-interaction Specs'],
    },
    {
      id: '03',
      title: 'High-Velocity Engineering',
      icon: <TerminalSquare className="w-6 h-6 text-electric-light" />,
      desc: 'Executing code in agile sprints. We build modular, type-safe, and highly tested features connected to scalable cloud infrastructure.',
      deliverables: ['Clean Codebase (TS/React)', 'API Integration', 'Unit & E2E Testing', 'Performance Benchmarks'],
    },
    {
      id: '04',
      title: 'Launch & Optimization',
      icon: <Rocket className="w-6 h-6 text-emerald-400" />,
      desc: 'Zero-downtime deployment, final SEO/Core Web Vitals auditing, and handing over the keys with full documentation.',
      deliverables: ['Production Deployment', 'Lighthouse 100 Audit', 'Codebase Handover', '30-Day Launch Support'],
    }
  ];

  return (
    <section id="process" className="relative py-24 lg:py-32 overflow-hidden border-t border-slate-800/80 bg-[#070A1E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-200 border border-slate-800 text-xs font-mono text-accent-lavender uppercase tracking-wider">
            <span>The Syntax Engine</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            How We Execute{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-light via-accent-violet to-white">
              Complex Roadmaps.
            </span>
          </h2>
          <p className="text-base text-slate-300">
            A transparent, milestone-driven framework that eliminates technical debt and guarantees on-time delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-transparent via-slate-700 to-transparent -z-10" />

          {steps.map((step, idx) => (
            <div key={step.id} className="relative group">
              <div className="bg-surface-300/80 border border-slate-700/60 p-6 sm:p-8 rounded-3xl backdrop-blur-xl hover:border-accent-purple/50 hover:shadow-glow-sm transition-all h-full flex flex-col group-hover:-translate-y-1 duration-300 relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-surface-100 border border-slate-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {step.icon}
                  </div>
                  <div className="text-3xl font-bold font-mono text-slate-800 group-hover:text-slate-700 transition-colors">
                    {step.id}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-6 flex-grow">
                  {step.desc}
                </p>

                <div className="pt-4 border-t border-slate-800/80">
                  <h4 className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-3">Key Deliverables</h4>
                  <ul className="space-y-2">
                    {step.deliverables.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent-lavender mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
