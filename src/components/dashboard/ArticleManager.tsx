import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { logAuditAction } from '../../lib/audit';
import { Trash2, Edit3, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

export function ArticleManager() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentArticle, setCurrentArticle] = useState<any>({});
  
  const fetchArticles = async () => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('published_date', { ascending: false });

      if (error) throw error;
      setArticles(data || []);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load articles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data: userData } = await supabase.auth.getUser();
      const email = userData.user?.email || 'unknown';

      if (currentArticle.id) {
        // Update
        const { error } = await supabase
          .from('articles')
          .update(currentArticle)
          .eq('id', currentArticle.id);
        if (error) throw error;
        await logAuditAction(email, 'updated_article', { article_id: currentArticle.id });
        toast.success('Article updated');
      } else {
        // Insert
        const { error } = await supabase
          .from('articles')
          .insert([currentArticle]);
        if (error) throw error;
        await logAuditAction(email, 'created_article', { title: currentArticle.title });
        toast.success('Article created');
      }
      setIsEditing(false);
      fetchArticles();
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'Failed to save article');
    }
  };

  const deleteArticle = async (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return;
    try {
      const { error } = await supabase.from('articles').delete().eq('id', id);
      if (error) throw error;
      
      const { data: userData } = await supabase.auth.getUser();
      await logAuditAction(userData.user?.email || 'unknown', 'deleted_article', { article_id: id });
      
      toast.success('Article deleted');
      setArticles(articles.filter(a => a.id !== id));
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'Failed to delete article');
    }
  };

  if (loading) return <div className="text-slate-400">Loading articles...</div>;

  if (isEditing) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">{currentArticle.id ? 'Edit Article' : 'New Article'}</h1>
          <button onClick={() => setIsEditing(false)} className="px-4 py-2 rounded-xl bg-surface-200 hover:bg-surface-100 text-sm font-medium">Cancel</button>
        </div>

        <form onSubmit={handleSave} className="bg-surface-300 p-6 rounded-2xl border border-slate-800 space-y-4">
          <div>
            <label className="text-xs font-medium text-slate-400">Title</label>
            <input required type="text" value={currentArticle.title || ''} onChange={e => setCurrentArticle({...currentArticle, title: e.target.value})} className="w-full mt-1 px-4 py-2 rounded-xl bg-surface-200 border border-slate-700 text-white" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-slate-400">Category</label>
              <input required type="text" value={currentArticle.category || ''} onChange={e => setCurrentArticle({...currentArticle, category: e.target.value})} className="w-full mt-1 px-4 py-2 rounded-xl bg-surface-200 border border-slate-700 text-white" />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-400">Cover Image URL</label>
              <input required type="url" value={currentArticle.cover_image_url || ''} onChange={e => setCurrentArticle({...currentArticle, cover_image_url: e.target.value})} className="w-full mt-1 px-4 py-2 rounded-xl bg-surface-200 border border-slate-700 text-white" />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-slate-400">Excerpt</label>
            <textarea required rows={2} value={currentArticle.excerpt || ''} onChange={e => setCurrentArticle({...currentArticle, excerpt: e.target.value})} className="w-full mt-1 px-4 py-2 rounded-xl bg-surface-200 border border-slate-700 text-white"></textarea>
          </div>
          <div>
            <label className="text-xs font-medium text-slate-400">Content (Markdown supported)</label>
            <textarea required rows={10} value={currentArticle.content || ''} onChange={e => setCurrentArticle({...currentArticle, content: e.target.value})} className="w-full mt-1 px-4 py-2 rounded-xl bg-surface-200 border border-slate-700 text-white font-mono text-sm"></textarea>
          </div>
          
          <button type="submit" className="px-6 py-3 rounded-xl bg-accent-purple hover:bg-accent-violet text-white font-bold text-sm">Save Article</button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Articles</h1>
        <button 
          onClick={() => { setCurrentArticle({}); setIsEditing(true); }}
          className="px-4 py-2 rounded-xl bg-accent-purple hover:bg-accent-violet text-white text-sm font-semibold flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> New Article
        </button>
      </div>
      
      <div className="bg-surface-300 border border-slate-800 rounded-2xl overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-surface-200 text-xs uppercase font-mono text-slate-400 border-b border-slate-800">
            <tr>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {articles.map(article => (
              <tr key={article.id} className="hover:bg-surface-200/50 transition-colors">
                <td className="px-6 py-4 font-bold text-white truncate max-w-[200px]">{article.title}</td>
                <td className="px-6 py-4 font-mono text-xs">{article.category}</td>
                <td className="px-6 py-4">{article.published_date}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => { setCurrentArticle(article); setIsEditing(true); }} className="p-1.5 rounded-lg text-slate-400 hover:text-white transition-colors">
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button onClick={() => deleteArticle(article.id)} className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-400/10 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
