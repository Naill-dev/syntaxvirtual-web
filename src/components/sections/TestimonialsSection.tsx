import React from 'react';
import { testimonialsData } from '../../data/testimonialsData';
import { Star, ShieldCheck, Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials" className="relative py-24 lg:py-32 overflow-hidden border-t border-slate-800/80 bg-[#070A1E]">
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[400px] rounded-[100%] bg-electric-DEFAULT/5 filter blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-200 border border-slate-800 text-xs font-mono text-accent-lavender uppercase tracking-wider">
            <span>Verified Social Proof</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Trusted by Leaders in{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-light via-electric-light to-white">
              Tech & Enterprise.
            </span>
          </h2>
        </div>

        {/* CSS Masonry-style Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {testimonialsData.map((t) => (
            <div
              key={t.id}
              className="break-inside-avoid relative p-6 sm:p-8 rounded-3xl bg-surface-300/80 border border-slate-800 backdrop-blur-xl hover:border-slate-600 transition-colors"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              
              <Quote className="absolute top-6 right-6 w-8 h-8 text-slate-800" />

              <p className="text-sm sm:text-base text-slate-200 leading-relaxed mb-6">
                "{t.content}"
              </p>

              <div className="flex items-center gap-4">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-full border border-slate-700 object-cover"
                />
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                    {t.name}
                    {t.verified && (
                      <span title="Verified Client">
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      </span>
                    )}
                  </h4>
                  <p className="text-xs text-slate-400">{t.role}</p>
                  <p className="text-[10px] font-mono text-accent-lavender mt-0.5 uppercase tracking-wider">{t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
