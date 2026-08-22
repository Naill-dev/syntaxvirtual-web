import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import toast from 'react-hot-toast';
import { Briefcase, Plus, Trash2, Edit2 } from 'lucide-react';

export const CareersManager = () => {
  const [careers, setCareers] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<any>(null);

  const openAddModal = () => {
    setEditingJob(null);
    setIsModalOpen(true);
  };

  const openEditModal = (job: any) => {
    setEditingJob(job);
    setIsModalOpen(true);
  };

  const fetchCareers = () => {
    supabase.from('careers').select('*').order('created_at', { ascending: false }).then(({ data }) => setCareers(data || []));
  };

  useEffect(() => {
    fetchCareers();
  }, []);

  const deleteCareer = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      const { error } = await supabase.from('careers').delete().eq('id', id);
      if (error) throw error;
      setCareers(careers.filter(c => c.id !== id));
      toast.success('Deleted');
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Careers Manager</h1>
        <button onClick={openAddModal} className="flex items-center gap-2 px-4 py-2 bg-accent-purple text-white rounded-lg"><Plus className="w-4 h-4"/> Add Job</button>
      </div>
      <div className="bg-surface-300 border border-slate-800 rounded-2xl overflow-hidden">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-surface-200 text-slate-400">
            <tr><th className="px-6 py-4">Title</th><th className="px-6 py-4">Department</th><th className="px-6 py-4">Type</th><th className="px-6 py-4">Status</th><th className="px-6 py-4">Actions</th></tr>
          </thead>
          <tbody>
            {careers.map(c => (
              <tr key={c.id} className="border-t border-slate-800">
                <td className="px-6 py-4 text-white font-medium">{c.title}</td>
                <td className="px-6 py-4">{c.department}</td>
                <td className="px-6 py-4">{c.employment_type}</td>
                <td className="px-6 py-4">{c.is_active ? <span className="text-green-400">Active</span> : <span className="text-slate-500">Inactive</span>}</td>
                <td className="px-6 py-4 flex gap-2">
                  <button onClick={() => openEditModal(c)} className="text-blue-400 hover:text-blue-300"><Edit2 className="w-4 h-4" /></button>
                  <button onClick={() => deleteCareer(c.id)} className="text-red-400 hover:text-red-300"><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <CareerModal 
          job={editingJob} 
          onClose={() => setIsModalOpen(false)} 
          onSuccess={() => {
            setIsModalOpen(false);
            fetchCareers();
          }}
        />
      )}
    </div>
  );
};

const CareerModal = ({ job, onClose, onSuccess }: any) => {
  const [formData, setFormData] = useState({
    title: job?.title || '',
    department: job?.department || '',
    location: job?.location || '',
    employment_type: job?.employment_type || 'Full-time',
    description: job?.description || '',
    salary_range: job?.salary_range || '',
    is_active: job ? job.is_active : true,
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (job) {
        const { error } = await supabase.from('careers').update(formData).eq('id', job.id);
        if (error) throw error;
        toast.success('Job updated');
      } else {
        const { error } = await supabase.from('careers').insert([formData]);
        if (error) throw error;
        toast.success('Job added');
      }
      onSuccess();
    } catch (err: any) {
      toast.error(err.message || 'Failed to save job');
    }
    setSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-surface-300 w-full max-w-2xl rounded-3xl border border-slate-700 overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
          <h3 className="text-xl font-bold text-white">{job ? 'Edit Job' : 'Add New Job'}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white">✕</button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Title</label>
              <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-surface-200 border border-slate-700 rounded-lg px-4 py-2 text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Department</label>
              <input required type="text" value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})} className="w-full bg-surface-200 border border-slate-700 rounded-lg px-4 py-2 text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Location</label>
              <input required type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full bg-surface-200 border border-slate-700 rounded-lg px-4 py-2 text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Employment Type</label>
              <select required value={formData.employment_type} onChange={e => setFormData({...formData, employment_type: e.target.value})} className="w-full bg-surface-200 border border-slate-700 rounded-lg px-4 py-2 text-white outline-none">
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Freelance">Freelance</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Description</label>
            <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-surface-200 border border-slate-700 rounded-lg px-4 py-2 text-white" rows={4}></textarea>
          </div>
          <div className="flex gap-4 items-center">
            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-400 mb-1">Salary Range (Optional)</label>
              <input type="text" value={formData.salary_range} onChange={e => setFormData({...formData, salary_range: e.target.value})} className="w-full bg-surface-200 border border-slate-700 rounded-lg px-4 py-2 text-white" />
            </div>
            <div className="flex items-center gap-2 mt-6">
              <input type="checkbox" id="isActive" checked={formData.is_active} onChange={e => setFormData({...formData, is_active: e.target.checked})} className="w-4 h-4 text-accent-purple bg-surface-200 border-slate-700 rounded" />
              <label htmlFor="isActive" className="text-sm font-medium text-slate-300">Active Listing</label>
            </div>
          </div>
          <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 text-slate-400 hover:text-white">Cancel</button>
            <button disabled={submitting} type="submit" className="px-6 py-2 bg-accent-purple hover:bg-purple-600 text-white rounded-lg transition-colors font-medium">
              {submitting ? 'Saving...' : 'Save Job'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
