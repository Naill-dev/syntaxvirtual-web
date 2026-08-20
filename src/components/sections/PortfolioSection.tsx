import React, { useState } from 'react';
import { portfolioData } from '../../data/portfolioData';
import { PortfolioItem } from '../../types';
import { GlowingCard } from '../visual/GlowingCard';
import { ArrowUpRight, Sparkles, Layers, CheckCircle2, Eye } from 'lucide-react';

interface PortfolioSectionProps {
  onSelectProject: (project: PortfolioItem) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ onSelectProject }) => {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const filterTabs = ['All', 'Web Apps', 'UI/UX', 'E-commerce', 'AI / Cloud'];

  const filteredProjects = activeFilter === 'All'
    ? portfolioData
    : portfolioData.filter((p) => p.category === activeFilter);

  return (
    <section id="portfolio" className="relative py-24 lg:py-32 overflow-hidden border-t border-slate-800/80 bg-[#070A1E]/80">
      {/* Background Glow */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-accent-purple/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-200 border border-slate-800 text-xs font-mono text-accent-lavender uppercase tracking-wider">
              <span>Selected Works & Case Studies</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Crafted with Precision.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-light via-electric-light to-white">
                Proven by Numbers.
              </span>
            </h2>
            <p className="text-base text-slate-300">
              Explore flagship web applications, headless commerce systems, and digital platforms engineered by SyntaxVirtual.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 bg-surface-200/80 p-1.5 rounded-2xl border border-slate-800 backdrop-blur-md self-start md:self-auto">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                  activeFilter === tab
                    ? 'bg-accent-purple text-white shadow-glow-sm font-semibold'
                    : 'text-slate-400 hover:text-white hover:bg-surface-100/60'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="group relative rounded-2xl border border-slate-800 bg-surface-300/80 overflow-hidden backdrop-blur-xl hover:border-accent-purple/50 transition-all duration-300 flex flex-col justify-between cursor-pointer hover:shadow-glow-md hover:-translate-y-1.5"
            >
              <div>
                {/* Image Container with Zoom and Overlay */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out filter brightness-95 group-hover:brightness-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F2C] via-transparent to-transparent opacity-80" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                    <span className="px-3 py-1 rounded-full bg-[#0A0F2C]/85 backdrop-blur-md border border-slate-700/60 text-[11px] font-mono text-accent-light font-medium shadow-sm">
                      {project.category}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-[#0A0F2C]/85 backdrop-blur-md border border-slate-700/60 text-[11px] font-mono text-slate-300">
                      {project.year}
                    </span>
                  </div>

                  {/* Hover Quick Action */}
                  <div className="absolute inset-0 bg-accent-purple/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="px-4 py-2 rounded-xl bg-[#0A0F2C]/90 border border-accent-purple/50 text-xs font-semibold text-white flex items-center gap-2 shadow-glow-sm transform translate-y-2 group-hover:translate-y-0 transition-transform">
                      <Eye className="w-4 h-4 text-accent-lavender" />
                      <span>View Full Case Study</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="text-xs font-mono text-slate-400 mb-1.5">
                    {project.client}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-accent-light transition-colors line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4 line-clamp-2">
                    {project.summary}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tags.slice(0, 4).map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-surface-100/80 border border-slate-800 text-[10px] font-mono text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer: Metrics */}
              <div className="px-6 py-4 border-t border-slate-800/80 bg-surface-200/50 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {project.results.slice(0, 2).map((res, idx) => (
                    <div key={idx}>
                      <div className="text-xs font-bold font-mono text-emerald-400">
                        {res.value}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {res.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="w-8 h-8 rounded-lg bg-surface-100 border border-slate-700/60 flex items-center justify-center text-slate-300 group-hover:text-white group-hover:border-accent-purple/50 group-hover:bg-accent-purple/20 transition-all">
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
