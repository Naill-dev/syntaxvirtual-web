import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArticleItem } from '../../types';
import { ArrowRight, BookOpen, Clock, Tag } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';

interface BlogSectionProps {
  onSelectArticle: (article: ArticleItem) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ onSelectArticle }) => {
  const [articles, setArticles] = useState<ArticleItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const { data, error } = await supabase
          .from('articles')
          .select('*')
          .order('published_date', { ascending: false });

        if (error) throw error;
        setArticles(data || []);
      } catch (err) {
        console.error('Error fetching articles:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

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

        {loading ? (
          <div className="flex justify-center py-20">
            <svg className="animate-spin h-10 w-10 text-accent-purple" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-20 bg-surface-200/50 rounded-3xl border border-slate-800">
            <p className="text-slate-400">No articles have been published yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {articles.map((article) => (
              <Link
                key={article.id}
                to={`/blog/${article.slug}`}
                className="group flex flex-col sm:flex-row gap-6 p-6 rounded-3xl bg-surface-300/60 border border-slate-800/80 hover:border-teal-500/40 hover:bg-surface-300/90 transition-all cursor-pointer backdrop-blur-md"
              >
                <div className="w-full sm:w-48 h-48 sm:h-auto flex-shrink-0 overflow-hidden rounded-2xl bg-slate-900 border border-slate-700/50">
                  <img
                    src={article.cover_image_url || article.coverImage}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="flex flex-col justify-between py-1">
                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-3 text-[11px] font-mono text-slate-400">
                      <span className="px-2.5 py-1 rounded-md bg-teal-500/10 text-teal-300 border border-teal-500/20">
                        {article.category}
                      </span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {article.readTime || '5 min read'}</span>
                      <span>{article.date || article.published_date ? new Date(article.date || article.published_date!).toLocaleDateString() : ''}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 leading-snug group-hover:text-teal-300 transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-slate-300 line-clamp-3 mb-4">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-semibold text-teal-400 group-hover:text-teal-300 transition-colors">
                    Read Full Article <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
