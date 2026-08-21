import React, { useState, useEffect } from 'react';
import { Quote, PlusCircle } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';
import { TestimonialItem } from '../../types';
import { StarRating } from '../reviews/StarRating';
import { ReviewModal } from '../reviews/ReviewModal';

export const TestimonialsSection: React.FC = () => {
  const [reviews, setReviews] = useState<TestimonialItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data, error } = await supabase
          .from('reviews')
          .select('*')
          .eq('is_approved', true)
          .order('created_at', { ascending: false });

        if (error) throw error;

        // Map DB fields to component types if needed, though they align well
        setReviews(data as TestimonialItem[]);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return (
    <section id="testimonials" className="relative py-24 lg:py-32 overflow-hidden border-t border-slate-800/80 bg-[#070A1E]">
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[400px] rounded-[100%] bg-electric-DEFAULT/5 filter blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-20">
          <div className="text-center md:text-left space-y-4 max-w-2xl">
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
          
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 rounded-xl bg-surface-200 border border-slate-700 hover:border-accent-purple hover:bg-surface-100 text-white text-sm font-semibold transition-all flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            Submit a Review
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <svg className="animate-spin h-10 w-10 text-accent-purple" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-20 bg-surface-200/50 rounded-3xl border border-slate-800">
            <p className="text-slate-400">No reviews have been published yet.</p>
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {reviews.map((t) => (
              <div
                key={t.id}
                className="break-inside-avoid relative p-6 sm:p-8 rounded-3xl bg-surface-300/80 border border-slate-800 backdrop-blur-xl hover:border-slate-600 transition-colors"
              >
                <div className="mb-4">
                  <StarRating rating={t.rating || 5} readonly />
                </div>
                
                <Quote className="absolute top-6 right-6 w-8 h-8 text-slate-800" />

                <p className="text-sm sm:text-base text-slate-200 leading-relaxed mb-6">
                  "{t.content || (t as any).review_text}"
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full border border-slate-700 bg-surface-100 flex items-center justify-center text-slate-300 font-bold">
                    {(t.name || (t as any).full_name || 'A').charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                      {t.name || (t as any).full_name}
                    </h4>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">{t.role || (t as any).role_company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ReviewModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};
