import React, { useEffect } from 'react';
import { ArticleItem } from '../../types';
import { X, Clock, Calendar, ArrowLeft } from 'lucide-react';
import { ArticleComments } from './ArticleComments';

interface ArticleModalProps {
  article: ArticleItem | null;
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ article, onClose }) => {
  useEffect(() => {
    if (article) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [article]);

  if (!article) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center sm:p-6 bg-[#060919]/95 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full h-full sm:max-w-4xl sm:h-auto sm:max-h-[95vh] bg-surface-300 sm:border sm:border-slate-700 sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 duration-200">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-surface-300 shrink-0">
          <button 
            onClick={onClose}
            className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Insights
          </button>
          <div className="text-xs font-mono text-slate-500 uppercase">
            {article.category}
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <article className="max-w-3xl mx-auto px-6 py-8 sm:px-12 sm:py-12">
            
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 mb-6">
              <span className="px-3 py-1 rounded-md bg-accent-purple/10 border border-accent-purple/20 text-accent-light">
                {article.category}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {article.readTime}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {article.date}
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

            {/* Markdown Content rendered manually for this demo */}
            <div className="prose prose-invert prose-slate max-w-none prose-headings:font-bold prose-headings:text-white prose-a:text-accent-light prose-code:text-accent-lavender prose-code:bg-surface-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-[#0A0F2C] prose-pre:border prose-pre:border-slate-800">
              {article.content.split('\\n\\n').map((paragraph, i) => {
                if (paragraph.startsWith('### ')) {
                  return <h3 key={i} className="text-2xl mt-8 mb-4">{paragraph.replace('### ', '')}</h3>;
                }
                if (paragraph.startsWith('```')) {
                  const codeLines = paragraph.split('\\n');
                  // Extract language and code
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
                    <blockquote key={i} className="border-l-4 border-accent-purple pl-4 my-6 italic text-slate-300">
                      {paragraph.replace('> ', '')}
                    </blockquote>
                  );
                }
                return <p key={i} className="mb-4 text-slate-300 leading-relaxed">{paragraph}</p>;
              })}
            </div>

            {/* Comments Section */}
            <ArticleComments articleId={article.id} />
          </article>
        </div>
      </div>
    </div>
  );
};
