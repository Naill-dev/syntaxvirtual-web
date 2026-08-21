import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Trash2, CheckCircle, Mail } from 'lucide-react';
import toast from 'react-hot-toast';

export function ContactManager() {
  const [activeTab, setActiveTab] = useState<'contact' | 'estimator'>('contact');
  const [contacts, setContacts] = useState<any[]>([]);
  const [estimates, setEstimates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchInquiries = async () => {
    try {
      const { data: contactsData, error: e1 } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });
        
      const { data: estimatesData, error: e2 } = await supabase
        .from('estimator_inquiries')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (e1) throw e1;
      if (e2) throw e2;

      setContacts(contactsData || []);
      setEstimates(estimatesData || []);
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

  const markAsRead = async (id: string) => {
    try {
      const { error } = await supabase.from('contact_submissions').update({ is_read: true }).eq('id', id);
      if (error) throw error;
      setContacts(contacts.map(c => c.id === id ? { ...c, is_read: true } : c));
    } catch (err) {
      console.error(err);
    }
  };

  const deleteContact = async (id: string) => {
    if (!confirm('Are you sure you want to delete this contact submission?')) return;
    try {
      const { error } = await supabase.from('contact_submissions').delete().eq('id', id);
      if (error) throw error;
      toast.success('Submission deleted');
      setContacts(contacts.filter(c => c.id !== id));
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete submission');
    }
  };

  const deleteEstimate = async (id: string) => {
    if (!confirm('Are you sure you want to delete this estimator inquiry?')) return;
    try {
      const { error } = await supabase.from('estimator_inquiries').delete().eq('id', id);
      if (error) throw error;
      toast.success('Inquiry deleted');
      setEstimates(estimates.filter(e => e.id !== id));
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete inquiry');
    }
  };

  if (loading) return <div className="text-slate-400">Loading inquiries...</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-white">Inquiries Manager</h1>
        
        <div className="flex bg-surface-200 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('contact')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === 'contact' ? 'bg-accent-purple text-white shadow-glow-sm' : 'text-slate-400 hover:text-white'}`}
          >
            Contact Submissions
          </button>
          <button
            onClick={() => setActiveTab('estimator')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === 'estimator' ? 'bg-accent-purple text-white shadow-glow-sm' : 'text-slate-400 hover:text-white'}`}
          >
            Estimator Inquiries
          </button>
        </div>
      </div>
      
      <div className="bg-surface-300 border border-slate-800 rounded-2xl overflow-hidden">
        {activeTab === 'contact' && (
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-surface-200 text-xs uppercase font-mono text-slate-400 border-b border-slate-800">
              <tr>
                <th className="px-6 py-4">Name / Email</th>
                <th className="px-6 py-4">Project Type</th>
                <th className="px-6 py-4">Message</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {contacts.map(item => (
                <tr key={item.id} className={`transition-colors ${item.is_read === false ? 'bg-surface-200/80 font-medium text-white' : 'hover:bg-surface-200/50'}`}>
                  <td className="px-6 py-4">
                    <div className="font-bold">{item.full_name}</div>
                    <a href={`mailto:${item.email}`} className="text-xs text-accent-lavender hover:underline flex items-center gap-1 mt-0.5"><Mail className="w-3 h-3" /> {item.email}</a>
                  </td>
                  <td className="px-6 py-4 text-xs font-mono">{item.project_type}</td>
                  <td className="px-6 py-4">
                    <div className="truncate max-w-xs text-sm">{item.message}</div>
                  </td>
                  <td className="px-6 py-4 text-xs font-mono text-slate-500">
                    {new Date(item.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {!item.is_read && (
                        <button onClick={() => markAsRead(item.id)} className="p-1.5 rounded-lg text-emerald-400 hover:bg-emerald-400/10 transition-colors" title="Mark as Read">
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      )}
                      <button onClick={() => deleteContact(item.id)} className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-400/10 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {contacts.length === 0 && <tr><td colSpan={5} className="px-6 py-8 text-center text-slate-500">No contact submissions found.</td></tr>}
            </tbody>
          </table>
        )}

        {activeTab === 'estimator' && (
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-surface-200 text-xs uppercase font-mono text-slate-400 border-b border-slate-800">
              <tr>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Project Type & Budget</th>
                <th className="px-6 py-4">Selected Features</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {estimates.map(item => (
                <tr key={item.id} className="hover:bg-surface-200/50 transition-colors">
                  <td className="px-6 py-4">
                    <a href={`mailto:${item.email}`} className="text-sm font-bold text-accent-lavender hover:underline flex items-center gap-1"><Mail className="w-3 h-3" /> {item.email}</a>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-white mb-1">{item.project_scope?.type}</div>
                    <div className="text-xs font-mono text-emerald-400">{item.budget_range}</div>
                    <div className="text-[10px] uppercase tracking-wider text-slate-500 mt-1">{item.project_scope?.speed} Delivery</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1.5 max-w-xs">
                      {item.project_scope?.features?.map((f: string, i: number) => (
                        <span key={i} className="px-2 py-0.5 rounded text-[10px] font-mono bg-surface-200 text-slate-400 border border-slate-700">
                          {f}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs font-mono text-slate-500">
                    {new Date(item.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => deleteEstimate(item.id)} className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-400/10 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {estimates.length === 0 && <tr><td colSpan={5} className="px-6 py-8 text-center text-slate-500">No estimator inquiries found.</td></tr>}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
