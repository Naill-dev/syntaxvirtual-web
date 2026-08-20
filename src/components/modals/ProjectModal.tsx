import React, { useEffect } from 'react';
import { PortfolioItem } from '../../types';
import { X, ExternalLink, Code2, CheckCircle2, Layout, Zap, Database } from 'lucide-react';

interface ProjectModalProps {
  project: PortfolioItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [project]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-[#060919]/80 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-surface-300 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 duration-200">
        
        <div className="relative h-64 sm:h-80 flex-shrink-0">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-300 via-surface-300/40 to-transparent" />
          
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-surface-100/50 backdrop-blur-md text-white hover:bg-surface-100 border border-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="px-3 py-1 rounded-full bg-accent-purple/20 border border-accent-purple/30 text-xs font-mono text-accent-light">
                {project.category}
              </span>
              <span className="px-3 py-1 rounded-full bg-surface-100/50 backdrop-blur-md border border-slate-600 text-xs font-mono text-slate-200">
                {project.year}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">{project.title}</h2>
            <p className="text-slate-300 text-sm font-mono">{project.client}</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 sm:p-8 custom-scrollbar">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            <div className="lg:col-span-2 space-y-8">
              <section>
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <Layout className="w-5 h-5 text-accent-lavender" />
                  Project Overview
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {project.fullStory}
                </p>
              </section>

              <section>
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-electric-light" />
                  The Challenge
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {project.challenge}
                </p>
              </section>

              <section>
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <Database className="w-5 h-5 text-emerald-400" />
                  Architectural Solution
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {project.solution}
                </p>
              </section>
            </div>

            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-surface-200/50 border border-slate-700/60">
                <h4 className="text-xs font-mono uppercase text-slate-400 mb-4">Key Results</h4>
                <div className="space-y-4">
                  {project.results.map((res, i) => (
                    <div key={i}>
                      <div className="text-xl font-bold font-mono text-emerald-400 mb-0.5">{res.value}</div>
                      <div className="text-xs text-slate-300">{res.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-surface-200/50 border border-slate-700/60">
                <h4 className="text-xs font-mono uppercase text-slate-400 mb-3">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="px-2 py-1 rounded bg-surface-100 border border-slate-700 text-xs font-mono text-slate-300 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-accent-violet" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                {project.liveUrl && (
                  <a 
                    href={project.liveUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-full py-3 rounded-xl bg-accent-purple hover:bg-accent-violet text-white text-sm font-semibold flex items-center justify-center gap-2 transition-colors shadow-glow-sm"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Live Project
                  </a>
                )}
                {project.githubUrl && (
                  <a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-full py-3 rounded-xl bg-surface-100 hover:bg-surface-200 border border-slate-700 text-white text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
                  >
                    <Code2 className="w-4 h-4" />
                    Architecture Repository
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
