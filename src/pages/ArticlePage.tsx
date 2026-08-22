import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { supabase } from '../lib/supabaseClient';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { ArticleComments } from '../components/modals/ArticleComments';
import { Clock, Calendar, ArrowLeft } from 'lucide-react';
import { ArticleItem } from '../types';

export const ArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<ArticleItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    if (slug) {
      fetchArticle();
    }
  }, [slug]);

  const fetchArticle = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('slug', slug)
        .single();
      
      if (error) throw error;
      setArticle(data);
    } catch (err) {
      console.error('Error fetching article:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-900">
        <Navbar onOpenBooking={() => setIsBookingOpen(true)} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-slate-400">Loading article...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-900">
        <Navbar onOpenBooking={() => setIsBookingOpen(true)} />
        <div className="flex-1 flex flex-col items-center justify-center space-y-4">
          <div className="text-2xl font-bold text-white">Article Not Found</div>
          <Link to="/#blog" className="text-accent-light hover:underline">Return to Blog</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#060919] selection:bg-accent-purple/30 selection:text-white">
      <Helmet>
        <title>{article.title} | SyntaxVirtual</title>
        <meta name="description" content={article.excerpt || ''} />
        {article.cover_image_url && <meta property="og:image" content={article.cover_image_url} />}
      </Helmet>

      <Navbar onOpenBooking={() => setIsBookingOpen(true)} />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-24 sm:py-32">
        <Link 
          to="/#blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Insights
        </Link>

        <article>
          {/* Cover Image */}
          {(article.cover_image_url || article.coverImage) && (
            <div className="mb-8 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
              <img
                src={article.cover_image_url || article.coverImage}
                alt={article.title}
                className="w-full h-auto max-h-[500px] object-cover"
              />
            </div>
          )}

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 mb-6">
            <span className="px-3 py-1 rounded-md bg-teal-500/10 border border-teal-500/20 text-teal-300">
              {article.category}
            </span>
            {article.readTime && (
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {article.readTime}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {article.date || article.published_date ? new Date(article.date || article.published_date!).toLocaleDateString() : ''}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight mb-8">
            {article.title}
          </h1>

          {/* Author */}
          <div className="flex items-center gap-4 mb-10 pb-10 border-b border-slate-800">
            <img 
              src={article.author?.avatar || '/founder.jpg'} 
              alt={article.author?.name || 'Nail Mammadov'}
              className="w-12 h-12 rounded-full border border-slate-700 object-cover"
            />
            <div>
              <div className="font-bold text-white text-sm">{article.author?.name || 'Nail Mammadov'}</div>
              <div className="text-xs text-slate-400 font-mono">{article.author?.role || 'Founder & Lead Solutions Architect'}</div>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-invert prose-slate max-w-none prose-headings:font-bold prose-headings:text-white prose-a:text-teal-300 prose-code:text-indigo-300 prose-code:bg-surface-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-[#0A0F2C] prose-pre:border prose-pre:border-slate-800">
            {article.content.split('\\n\\n').map((paragraph, i) => {
              if (paragraph.startsWith('### ')) {
                return <h3 key={i} className="text-2xl mt-8 mb-4">{paragraph.replace('### ', '')}</h3>;
              }
              if (paragraph.startsWith('```')) {
                const codeLines = paragraph.split('\\n');
                const code = codeLines.slice(1, -1).join('\\n');
                return (
                  <pre key={i} className="p-4 rounded-xl overflow-x-auto text-sm my-6">
                    <code>{code}</code>
                  </pre>
                );
              }
              if (paragraph.startsWith('- [x]')) {
                return (
                  <div key={i} className="flex items-center gap-2 my-2">
                    <div className="w-4 h-4 rounded bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center">
                      <div className="w-2 h-2 bg-emerald-500 rounded-sm" />
                    </div>
                    <span className="text-slate-300">{paragraph.replace('- [x] ', '')}</span>
                  </div>
                );
              }
              if (paragraph.startsWith('>')) {
                return (
                  <blockquote key={i} className="border-l-4 border-teal-500 pl-4 my-6 italic text-slate-300">
                    {paragraph.replace('> ', '')}
                  </blockquote>
                );
              }
              return <p key={i} className="mb-4 text-slate-300 leading-relaxed">{paragraph}</p>;
            })}
          </div>
        </article>

        {/* Comments Section */}
        <div className="mt-16 pt-10 border-t border-slate-800">
          <ArticleComments articleId={article.id} />
        </div>
      </main>

      <Footer />
    </div>
  );
};
