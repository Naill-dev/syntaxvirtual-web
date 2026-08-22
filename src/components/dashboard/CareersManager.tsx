import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import toast from 'react-hot-toast';
import { Briefcase, Plus, Trash2, Edit2 } from 'lucide-react';

export const CareersManager = () => {
  const [careers, setCareers] = useState<any[]>([]);
  useEffect(() => {
    supabase.from('careers').select('*').order('created_at', { ascending: false }).then(({ data }) => setCareers(data || []));
  }, []);

  const deleteCareer = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    await supabase.from('careers').delete().eq('id', id);
    setCareers(careers.filter(c => c.id !== id));
    toast.success('Deleted');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Careers Manager</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-accent-purple text-white rounded-lg"><Plus className="w-4 h-4"/> Add Job</button>
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
                  <button className="text-blue-400 hover:text-blue-300"><Edit2 className="w-4 h-4" /></button>
                  <button onClick={() => deleteCareer(c.id)} className="text-red-400 hover:text-red-300"><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
