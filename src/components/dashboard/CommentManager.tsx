import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import { logAuditAction } from '../../lib/audit';
import { ArticleComment } from '../../types';
import toast from 'react-hot-toast';
import { CheckCircle, XCircle, Trash2, Search, MessageSquare } from 'lucide-react';

export const CommentManager: React.FC = () => {
  const [comments, setComments] = useState<(ArticleComment & { articles?: { title: string } })[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const filter = searchParams.get('filter') || 'all';

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const { data, error } = await supabase
        .from('article_comments')
        .select('*, articles(title)')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setComments(data || []);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'Failed to load comments');
    } finally {
      setLoading(false);
    }
  };

  const toggleApproval = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('article_comments')
        .update({ is_approved: !currentStatus })
        .eq('id', id);

      if (error) throw error;
      
      const { data: userData } = await supabase.auth.getUser();
      await logAuditAction(userData.user?.email || 'unknown', currentStatus ? 'unapproved_comment' : 'approved_comment', { comment_id: id });

      setComments(comments.map(c => c.id === id ? { ...c, is_approved: !currentStatus } : c));
      toast.success(currentStatus ? 'Comment hidden' : 'Comment approved');
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'Failed to update status');
    }
  };

  const deleteComment = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this comment?')) return;
    try {
      const { error } = await supabase.from('article_comments').delete().eq('id', id);
      if (error) throw error;
      
      const { data: userData } = await supabase.auth.getUser();
      await logAuditAction(userData.user?.email || 'unknown', 'deleted_comment', { comment_id: id });

      setComments(comments.filter(c => c.id !== id));
      toast.success('Comment deleted');
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'Failed to delete comment');
    }
  };

  if (loading) return <div className="text-slate-400">Loading comments...</div>;

  const filteredComments = comments.filter(c => {
    if (filter === 'pending') return !c.is_approved;
    if (filter === 'approved') return c.is_approved;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-accent-purple" />
          Article Comments
        </h1>
        <div className="flex bg-surface-200 p-1 rounded-xl border border-slate-700 w-max">
          <button onClick={() => setSearchParams({})} className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-colors ${filter === 'all' ? 'bg-slate-700 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}>All</button>
          <button onClick={() => setSearchParams({ filter: 'pending' })} className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-colors ${filter === 'pending' ? 'bg-slate-700 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}>Pending</button>
          <button onClick={() => setSearchParams({ filter: 'approved' })} className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-colors ${filter === 'approved' ? 'bg-slate-700 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}>Approved</button>
        </div>
      </div>

      <div className="bg-surface-300 border border-slate-800 rounded-2xl overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-surface-200 text-xs uppercase font-mono text-slate-400 border-b border-slate-800">
            <tr>
              <th className="px-6 py-4">Article / Author</th>
              <th className="px-6 py-4">Comment</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {filteredComments.length === 0 && (
              <tr><td colSpan={4} className="px-6 py-12 text-center text-slate-500">No {filter !== 'all' ? filter : ''} comments found</td></tr>
            )}
            {filteredComments.map(comment => (
              <tr key={comment.id} className="hover:bg-surface-200/50 transition-colors">
                <td className="px-6 py-4 align-top">
                  <div className="font-bold text-white max-w-[200px] truncate" title={comment.articles?.title}>
                    {comment.articles?.title || 'Unknown Article'}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">{comment.full_name}</div>
                  <div className="text-[10px] text-slate-500 font-mono mt-1">
                    {new Date(comment.created_at).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4 align-top max-w-sm">
                  <p className="whitespace-pre-wrap text-sm text-slate-300 leading-relaxed line-clamp-3 hover:line-clamp-none transition-all">
                    {comment.comment_text}
                  </p>
                </td>
                <td className="px-6 py-4 align-top">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                    comment.is_approved ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {comment.is_approved ? <CheckCircle className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                    {comment.is_approved ? 'Approved' : 'Pending'}
                  </span>
                </td>
                <td className="px-6 py-4 align-top text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => toggleApproval(comment.id, comment.is_approved)}
                      className={`p-2 rounded-lg transition-colors border ${
                        comment.is_approved 
                          ? 'border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/10' 
                          : 'border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white'
                      }`}
                      title={comment.is_approved ? 'Hide Comment' : 'Approve Comment'}
                    >
                      <CheckCircle className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteComment(comment.id)}
                      className="p-2 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-colors"
                      title="Delete Comment"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {comments.length === 0 && (
          <div className="p-8 text-center text-slate-500">
            No comments found.
          </div>
        )}
      </div>
    </div>
  );
};
