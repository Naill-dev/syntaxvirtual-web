import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import toast from 'react-hot-toast';
import { Save } from 'lucide-react';

export const ContentManager = () => {
  const [content, setContent] = useState<any[]>([]);
  
  useEffect(() => {
    supabase.from('site_content').select('*').then(({ data }) => setContent(data || []));
  }, []);

  const handleChange = (id: string, value: string) => {
    setContent(content.map(c => c.id === id ? { ...c, value } : c));
  };

  const handleSave = async (item: any) => {
    try {
      const { error } = await supabase.from('site_content').update({ value: item.value }).eq('id', item.id);
      if (error) throw error;
      toast.success('Content updated');
    } catch (err) {
      toast.error('Update failed');
    }
  };

  const sections = Array.from(new Set(content.map(c => c.section)));

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-white">Site Content Manager</h1>
      {sections.map(section => (
        <div key={section} className="bg-surface-300 p-6 rounded-2xl border border-slate-800">
          <h2 className="text-xl font-bold text-white capitalize mb-4">{section} Section</h2>
          <div className="space-y-4">
            {content.filter(c => c.section === section).map(item => (
              <div key={item.id} className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-400 capitalize">{item.key.replace('_', ' ')}</label>
                <div className="flex gap-2">
                  <input type="text" value={item.value} onChange={(e) => handleChange(item.id, e.target.value)} className="flex-1 bg-surface-200 border border-slate-700 rounded-lg px-4 py-2 text-white" />
                  <button onClick={() => handleSave(item)} className="p-2 bg-accent-purple hover:bg-purple-600 text-white rounded-lg transition-colors"><Save className="w-5 h-5" /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
