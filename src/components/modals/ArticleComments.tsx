import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { ArticleComment } from '../../types';
import toast from 'react-hot-toast';
import { MessageSquare, User, Send, Calendar } from 'lucide-react';

interface ArticleCommentsProps {
  articleId: string;
}

export const ArticleComments: React.FC<ArticleCommentsProps> = ({ articleId }) => {
  const [comments, setComments] = useState<ArticleComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({ fullName: '', email: '', commentText: '' });

  useEffect(() => {
    fetchComments();
  }, [articleId]);

  const fetchComments = async () => {
    try {
      const { data, error } = await supabase
        .from('article_comments')
        .select('*')
        .eq('article_id', articleId)
        .eq('is_approved', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setComments(data || []);
    } catch (err) {
      console.error('Error fetching comments:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.commentText.trim()) return;

    setSubmitting(true);
    try {
      const { error } = await supabase.from('article_comments').insert([
        {
          article_id: articleId,
          full_name: formData.fullName,
          email: formData.email,
          comment_text: formData.commentText,
          is_approved: false, // Default to pending
        },
      ]);

      if (error) throw error;
      
      toast.success('Comment submitted! Waiting for approval.');
      setFormData({ fullName: '', email: '', commentText: '' });
    } catch (err) {
      console.error(err);
      toast.error('Failed to submit comment. Try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-16 pt-10 border-t border-slate-800">
      <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
        <MessageSquare className="w-5 h-5 text-accent-lavender" />
        Comments ({comments.length})
      </h3>

      {/* Add Comment Form */}
      <div className="bg-surface-200/50 border border-slate-800 rounded-2xl p-6 mb-10">
        <h4 className="text-sm font-semibold text-white mb-4">Leave a Comment</h4>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                placeholder="Full Name *"
                required
                value={formData.fullName}
                onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full bg-surface-100 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-accent-purple transition-colors"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email Address (optional)"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-surface-100 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-accent-purple transition-colors"
              />
            </div>
          </div>
          <div>
            <textarea
              placeholder="Your comment... *"
              required
              rows={4}
              value={formData.commentText}
              onChange={e => setFormData({ ...formData, commentText: e.target.value })}
              className="w-full bg-surface-100 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent-purple transition-colors resize-none custom-scrollbar"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 bg-gradient-to-r from-accent-purple to-electric-DEFAULT text-white text-sm font-semibold rounded-xl flex items-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {submitting ? 'Submitting...' : (
                <>
                  <Send className="w-4 h-4" /> Post Comment
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Comment List */}
      <div className="space-y-6">
        {loading ? (
          <div className="text-slate-400 text-sm">Loading comments...</div>
        ) : comments.length === 0 ? (
          <div className="text-slate-500 text-sm italic border border-dashed border-slate-800 rounded-xl p-8 text-center">
            No comments yet. Be the first to share your thoughts.
          </div>
        ) : (
          comments.map(comment => (
            <div key={comment.id} className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-surface-200 border border-slate-700 flex items-center justify-center shrink-0">
                <User className="w-5 h-5 text-slate-400" />
              </div>
              <div className="flex-1 bg-surface-200/30 rounded-2xl p-5 border border-slate-800/80 hover:border-slate-700 transition-colors">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="font-semibold text-white text-sm">{comment.full_name}</div>
                  <div className="text-xs text-slate-500 font-mono flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(comment.created_at).toLocaleDateString()}
                  </div>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
                  {comment.comment_text}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
