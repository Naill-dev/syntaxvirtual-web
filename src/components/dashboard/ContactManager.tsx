import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Trash2, CheckCircle, Mail } from 'lucide-react';
import toast from 'react-hot-toast';

export function ContactManager() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchInquiries = async () => {
    try {
      const { data: contacts, error: e1 } = await supabase.from('contact_submissions').select('*');
      const { data: estimates, error: e2 } = await supabase.from('estimator_inquiries').select('*');
      
      if (e1) throw e1;
      if (e2) throw e2;

      // Merge and sort
      const merged = [
        ...(contacts || []).map(c => ({ ...c, _source: 'contact' })),
        ...(estimates || []).map(e => ({ ...e, _source: 'estimator' }))
      ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

      setInquiries(merged);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load inquiries');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const markAsRead = async (item: any) => {
    if (item._source !== 'contact') return; // Only contacts have is_read
    try {
      const { error } = await supabase.from('contact_submissions').update({ is_read: true }).eq('id', item.id);
      if (error) throw error;
      setInquiries(inquiries.map(i => i.id === item.id ? { ...i, is_read: true } : i));
    } catch (err) {
      console.error(err);
    }
  };

  const deleteInquiry = async (id: string, source: string) => {
    if (!confirm('Are you sure you want to delete this inquiry?')) return;
    try {
      const table = source === 'contact' ? 'contact_submissions' : 'estimator_inquiries';
      const { error } = await supabase.from(table).delete().eq('id', id);
      if (error) throw error;
      toast.success('Inquiry deleted');
      setInquiries(inquiries.filter(i => i.id !== id));
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete inquiry');
    }
  };

  if (loading) return <div className="text-slate-400">Loading inquiries...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Inquiries & Estimates</h1>
      
      <div className="bg-surface-300 border border-slate-800 rounded-2xl overflow-hidden">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-surface-200 text-xs uppercase font-mono text-slate-400 border-b border-slate-800">
            <tr>
              <th className="px-6 py-4">Source</th>
              <th className="px-6 py-4">Contact Info</th>
              <th className="px-6 py-4">Details</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {inquiries.map(item => (
              <tr key={item.id} className={`transition-colors ${item.is_read === false ? 'bg-surface-200/80 font-medium text-white' : 'hover:bg-surface-200/50'}`}>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-mono uppercase tracking-wider ${
                    item._source === 'contact' ? 'bg-accent-purple/20 text-accent-light border border-accent-purple/30' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  }`}>
                    {item._source}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {item._source === 'contact' ? (
                    <>
                      <div className="font-bold">{item.full_name}</div>
                      <a href={`mailto:${item.email}`} className="text-xs text-accent-lavender hover:underline flex items-center gap-1 mt-0.5"><Mail className="w-3 h-3" /> {item.email}</a>
                    </>
                  ) : (
                    <a href={`mailto:${item.email}`} className="text-xs font-bold text-accent-lavender hover:underline flex items-center gap-1"><Mail className="w-3 h-3" /> {item.email}</a>
                  )}
                </td>
                <td className="px-6 py-4">
                  {item._source === 'contact' ? (
                    <div className="max-w-xs">
                      <div className="text-xs font-mono text-slate-400 mb-1">Type: {item.project_type}</div>
                      <div className="truncate text-sm">{item.message}</div>
                    </div>
                  ) : (
                    <div className="max-w-xs text-xs space-y-1">
                      <div><span className="text-slate-400">Type:</span> {item.project_scope?.type}</div>
                      <div><span className="text-slate-400">Budget:</span> <span className="font-mono text-emerald-400">{item.budget_range}</span></div>
                      <div className="truncate text-slate-500">{item.project_scope?.features?.join(', ')}</div>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 text-xs font-mono text-slate-500">
                  {new Date(item.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {item._source === 'contact' && !item.is_read && (
                      <button onClick={() => markAsRead(item)} className="p-1.5 rounded-lg text-emerald-400 hover:bg-emerald-400/10 transition-colors" title="Mark as Read">
                        <CheckCircle className="w-4 h-4" />
                      </button>
                    )}
                    <button onClick={() => deleteInquiry(item.id, item._source)} className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-400/10 transition-colors">
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
