import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { PortfolioProject } from '../../types';
import { GlowingCard } from '../visual/GlowingCard';
import { ArrowUpRight, Sparkles, Layers, CheckCircle2, Eye, Briefcase, Plus } from 'lucide-react';

export const PortfolioSection: React.FC = () => {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from('portfolio')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setProjects(data || []);
      } catch (error) {
        console.error('Error fetching portfolio:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

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
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <svg className="animate-spin h-8 w-8 text-accent-purple" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        )}

        {/* Empty State */}
        {!loading && projects.length === 0 && (
          <div className="text-center py-20 bg-surface-300/50 border border-slate-800 rounded-2xl backdrop-blur-md">
            <Briefcase className="w-12 h-12 text-slate-500 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-bold text-white mb-2">No projects yet</h3>
            <p className="text-slate-400">Check back soon for updates to our portfolio.</p>
          </div>
        )}

        {/* Project Grid */}
        {!loading && projects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.slice(0, visibleCount).map((project) => (
              <div
                key={project.id}
                className="group relative rounded-2xl border border-slate-800 bg-surface-300/80 overflow-hidden backdrop-blur-xl hover:border-accent-purple/50 transition-all duration-300 flex flex-col justify-between hover:shadow-glow-md hover:-translate-y-1.5"
              >
                <div>
                  {/* Image Container with Zoom and Overlay */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                    {project.image_url ? (
                      <img
                        src={project.image_url}
                        alt={project.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out filter brightness-95 group-hover:brightness-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-500/20 to-purple-500/20">
                        <span className="text-4xl font-bold text-slate-500">🚀</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F2C] via-transparent to-transparent opacity-80" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-accent-light transition-colors line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4 line-clamp-2">
                      {project.description || 'No description provided.'}
                    </p>

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.tech_stack.slice(0, 4).map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-surface-100/80 border border-slate-800 text-[10px] font-mono text-slate-300"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tech_stack.length > 4 && (
                        <span className="px-2 py-0.5 rounded-md bg-surface-100/80 border border-slate-800 text-[10px] font-mono text-slate-400">
                          +{project.tech_stack.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Footer: Links */}
                <div className="px-6 py-4 border-t border-slate-800/80 bg-surface-200/50 flex flex-wrap items-center gap-3">
                  {project.live_demo_url && (
                    <a
                      href={project.live_demo_url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 text-center py-2 px-3 rounded-lg bg-accent-purple/20 border border-accent-purple/50 text-xs font-semibold text-accent-light hover:bg-accent-purple/40 transition-colors"
                    >
                      Live Demo
                    </a>
                  )}
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 text-center py-2 px-3 rounded-lg bg-surface-100 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white hover:bg-surface-200 transition-colors"
                    >
                      Source Code
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && projects.length > visibleCount && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setVisibleCount(prev => prev + 6)}
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-surface-200/50 hover:bg-surface-200 border border-slate-700/50 hover:border-slate-600 text-white rounded-full font-bold text-sm uppercase tracking-wide transition-all backdrop-blur-sm"
            >
              <Plus className="w-4 h-4" />
              Daha çox
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
