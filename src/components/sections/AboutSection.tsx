import React from 'react';
import { ShieldCheck, Zap, Code, Award, Sparkles, Terminal, CheckCircle2, Cpu } from 'lucide-react';
import { GlowingCard } from '../visual/GlowingCard';

export const AboutSection: React.FC = () => {
  const stats = [
    { value: '<100ms', label: 'Sub-100ms TTFB', desc: 'Global edge-cached response times' },
    { value: 'Zero', label: 'Technical Debt', desc: 'Strictly typed, modular, and tested' },
    { value: 'Agile', label: 'Modern Execution', desc: 'Iterative, transparent sprint cycles' },
    { value: '100%', label: 'Bespoke Code', desc: 'Hand-crafted architecture, no templates' },
  ];

  const corePillars = [
    {
      icon: <Zap className="w-5 h-5 text-accent-violet" />,
      title: 'Sub-Second Speed by Default',
      desc: 'We treat performance as a fundamental feature, not an optimization pass. Every asset is tree-shaken and edge-cached.',
    },
    {
      icon: <Code className="w-5 h-5 text-electric-light" />,
      title: 'Zero Technical Debt',
      desc: 'Strict TypeScript typing, modular component boundaries, automated testing pipelines, and spotless documentation.',
    },
    {
      icon: <Cpu className="w-5 h-5 text-fuchsia-400" />,
      title: 'Future-Proof Architecture',
      desc: 'Cloud-native microservices, serverless edge compute, and headless decoupling that scale effortlessly to millions of requests.',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
      title: 'Uncompromising Security',
      desc: 'End-to-end encryption, strict OWASP security standards, role-based authorization, and automated vulnerability scanning.',
    },
  ];

  return (
    <section id="about" className="relative py-24 lg:py-32 overflow-hidden border-t border-slate-800/80 bg-[#0A0F2C]">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-accent-purple/10 filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-200 border border-slate-800 text-xs font-mono text-accent-lavender uppercase tracking-wider">
            <span>The Brand Philosophy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Why Visionary Founders Choose{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-light via-accent-violet to-electric-light">
              SyntaxVirtual.
            </span>
          </h2>
          <p className="text-base text-slate-300">
            Founded by <span className="text-white font-medium">Nail Mammadov</span>, SyntaxVirtual was built on a simple conviction: modern web applications should be as fast and reliable as operating systems, and as elegant as luxury timepieces.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-surface-200/60 border border-slate-800/80 backdrop-blur-xl hover:border-accent-purple/40 hover:shadow-glow-sm transition-all text-center sm:text-left"
            >
              <div className="text-3xl sm:text-4xl font-extrabold font-mono text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm font-semibold text-accent-light mb-1">
                {stat.label}
              </div>
              <div className="text-xs text-slate-400">
                {stat.desc}
              </div>
            </div>
          ))}
        </div>

        {/* Narrative & Founder Spotlight */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          {/* Left: Founder Bio Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl p-8 bg-surface-300/90 border border-slate-700/60 backdrop-blur-2xl shadow-glow-sm space-y-6">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-accent-purple shadow-glow-sm bg-slate-800 flex-shrink-0">
                  <img
                    src="/founder.jpg"
                    alt="Nail Mammadov"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Nail Mammadov</h3>
                  <p className="text-xs font-mono text-accent-lavender">Founder & Lead Solutions Architect</p>
                  <p className="text-[11px] text-slate-400">SyntaxVirtual Studio</p>
                </div>
              </div>

              <blockquote className="text-sm text-slate-300 italic leading-relaxed border-l-2 border-accent-purple pl-4">
                "We don't build generic websites. We engineer high-velocity digital instruments that solve complex business bottlenecks, command market authority, and convert traffic into long-term enterprise value."
              </blockquote>

              <div className="pt-4 border-t border-slate-800 flex flex-wrap gap-2 text-xs font-mono">
                <span className="px-2.5 py-1 rounded-lg bg-surface-100 border border-slate-800 text-slate-300">
                  Next.js & React
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-surface-100 border border-slate-800 text-slate-300">
                  Python & FastAPI
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-surface-100 border border-slate-800 text-slate-300">
                  Cloud Architectures
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-surface-100 border border-slate-800 text-slate-300">
                  UI/UX Systems
                </span>
              </div>
            </div>
          </div>

          {/* Right: Core Engineering Pillars */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {corePillars.map((pillar, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-surface-200/40 border border-slate-800/80 backdrop-blur-md hover:bg-surface-200/80 hover:border-slate-700 transition-all space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-surface-100 flex items-center justify-center border border-slate-700/60">
                  {pillar.icon}
                </div>
                <h4 className="text-base font-bold text-white">
                  {pillar.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
