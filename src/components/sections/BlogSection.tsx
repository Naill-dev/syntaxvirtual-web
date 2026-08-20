import React from 'react';
import { blogData } from '../../data/blogData';
import { ArticleItem } from '../../types';
import { ArrowRight, BookOpen, Clock, Tag } from 'lucide-react';

interface BlogSectionProps {
  onSelectArticle: (article: ArticleItem) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ onSelectArticle }) => {
  return (
    <section id="blog" className="relative py-24 lg:py-32 overflow-hidden border-t border-slate-800/80 bg-[#0A0F2C]">
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-accent-purple/5 filter blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-200 border border-slate-800 text-xs font-mono text-accent-lavender uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Technical Insights</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Engineering{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-light to-electric-light">
                Perspectives.
              </span>
            </h2>
            <p className="text-base text-slate-300">
              Deep dives into high-performance web architecture, UI/UX systems, and scaling modern platforms, authored by Nail Mammadov.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogData.map((article) => (
            <div
              key={article.id}
              onClick={() => onSelectArticle(article)}
              className="group flex flex-col sm:flex-row gap-6 p-6 rounded-3xl bg-surface-300/60 border border-slate-800/80 hover:border-accent-purple/40 hover:bg-surface-300/90 transition-all cursor-pointer backdrop-blur-md"
            >
              <div className="w-full sm:w-48 h-48 sm:h-auto flex-shrink-0 overflow-hidden rounded-2xl bg-slate-900 border border-slate-700/50">
                <img
                  src={article.coverImage}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="flex flex-col justify-between py-1">
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-3 text-[11px] font-mono text-slate-400">
                    <span className="px-2.5 py-1 rounded-md bg-accent-purple/10 text-accent-light border border-accent-purple/20">
                      {article.category}
                    </span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {article.readTime}</span>
                    <span>{article.date}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 leading-snug group-hover:text-accent-light transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-slate-300 line-clamp-3 mb-4">
                    {article.excerpt}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-semibold text-accent-lavender group-hover:text-white transition-colors">
                  Read Full Article <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
