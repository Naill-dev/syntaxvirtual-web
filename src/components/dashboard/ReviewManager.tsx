import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { logAuditAction } from '../../lib/audit';
import { Trash2, CheckCircle, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export function ReviewManager() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReviews(data || []);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load reviews');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const toggleApproval = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('reviews')
        .update({ is_approved: !currentStatus })
        .eq('id', id);

      if (error) throw error;
      
      const { data: userData } = await supabase.auth.getUser();
      await logAuditAction(userData.user?.email || 'unknown', currentStatus ? 'unapproved_review' : 'approved_review', { review_id: id });

      toast.success(`Review ${!currentStatus ? 'approved' : 'hidden'} successfully`);
      setReviews(reviews.map(r => r.id === id ? { ...r, is_approved: !currentStatus } : r));
    } catch (err) {
      console.error(err);
      toast.error('Failed to update review status');
    }
  };

  const deleteReview = async (id: string) => {
    if (!confirm('Are you sure you want to delete this review?')) return;
    
    try {
      const { error } = await supabase.from('reviews').delete().eq('id', id);
      if (error) throw error;
      
      const { data: userData } = await supabase.auth.getUser();
      await logAuditAction(userData.user?.email || 'unknown', 'deleted_review', { review_id: id });

      toast.success('Review deleted');
      setReviews(reviews.filter(r => r.id !== id));
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete review');
    }
  };

  if (loading) return <div className="text-slate-400">Loading reviews...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Review Moderation</h1>
      
      <div className="bg-surface-300 border border-slate-800 rounded-2xl overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-surface-200 text-xs uppercase font-mono text-slate-400 border-b border-slate-800">
            <tr>
              <th className="px-6 py-4">Name / Role</th>
              <th className="px-6 py-4">Rating</th>
              <th className="px-6 py-4">Review</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {reviews.map(review => (
              <tr key={review.id} className="hover:bg-surface-200/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-bold text-white">{review.full_name}</div>
                  <div className="text-xs text-slate-500">{review.role_company}</div>
                </td>
                <td className="px-6 py-4 font-mono text-amber-400">
                  {review.rating} / 5
                </td>
                <td className="px-6 py-4 max-w-xs truncate" title={review.review_text}>
                  {review.review_text}
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                    review.is_approved ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {review.is_approved ? <CheckCircle className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                    {review.is_approved ? 'Approved' : 'Pending'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={() => toggleApproval(review.id, review.is_approved)}
                      className="px-3 py-1.5 rounded-lg bg-surface-100 hover:bg-surface-200 text-xs font-medium transition-colors border border-slate-700"
                    >
                      {review.is_approved ? 'Hide' : 'Approve'}
                    </button>
                    <button 
                      onClick={() => deleteReview(review.id)}
                      className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-400/10 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {reviews.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                  No reviews found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
