import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { StarRating } from './StarRating';
import { supabase } from '../../lib/supabaseClient';
import toast from 'react-hot-toast';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

import { sanitizeInput } from '../../lib/sanitize';

export const ReviewModal: React.FC<ReviewModalProps> = ({ isOpen, onClose }) => {
  const [rating, setRating] = useState(5);
  const [fullName, setFullName] = useState('');
  const [roleCompany, setRoleCompany] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !reviewText) {
      toast.error("Please fill out all required fields.");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('reviews')
        .insert([
          {
            full_name: sanitizeInput(fullName),
            role_company: sanitizeInput(roleCompany),
            rating,
            review_text: sanitizeInput(reviewText),
            is_approved: false // default
          }
        ]);

      if (error) throw error;

      toast.success("Review submitted successfully! It will appear once approved.");
      setFullName('');
      setRoleCompany('');
      setReviewText('');
      setRating(5);
      onClose();
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to submit review.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-[#060919]/90 backdrop-blur-sm animate-in fade-in duration-200" onClick={onClose} />
      
      <div className="relative w-full max-w-lg bg-surface-300 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-surface-200">
          <h3 className="text-sm font-bold text-white">Submit a Review</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-surface-100 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 ml-1">Overall Rating</label>
            <div className="p-2 rounded-xl bg-surface-100/50 border border-slate-700 inline-block">
              <StarRating rating={rating} onRatingChange={setRating} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 ml-1">Full Name *</label>
              <input required type="text" value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Jane Doe" className="w-full px-4 py-2.5 rounded-xl bg-surface-100/50 border border-slate-700 text-sm text-white focus:border-accent-purple focus:ring-1 focus:ring-accent-purple transition-all" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 ml-1">Role & Company</label>
              <input type="text" value={roleCompany} onChange={e => setRoleCompany(e.target.value)} placeholder="CEO @ TechCorp" className="w-full px-4 py-2.5 rounded-xl bg-surface-100/50 border border-slate-700 text-sm text-white focus:border-accent-purple focus:ring-1 focus:ring-accent-purple transition-all" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 ml-1">Your Review *</label>
            <textarea required rows={4} value={reviewText} onChange={e => setReviewText(e.target.value)} placeholder="How was your experience working with SyntaxVirtual?" className="w-full px-4 py-3 rounded-xl bg-surface-100/50 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple transition-all resize-none"></textarea>
          </div>

          <button type="submit" disabled={isSubmitting} className="w-full py-3.5 rounded-xl bg-accent-purple hover:bg-accent-violet text-white text-sm font-bold shadow-glow-sm transition-all flex items-center justify-center disabled:opacity-70">
            {isSubmitting ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : "Submit Review"}
          </button>
        </form>
      </div>
    </div>
  );
};
