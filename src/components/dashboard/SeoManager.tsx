import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import toast from 'react-hot-toast';
import { Save } from 'lucide-react';

export const SeoManager = () => {
  const [pages, setPages] = useState<any[]>([]);
  
  useEffect(() => {
    supabase.from('seo_settings').select('*').then(({ data }) => setPages(data || []));
  }, []);

  const handleChange = (id: string, field: string, value: string) => {
    setPages(pages.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const handleSave = async (page: any) => {
    try {
      const { error } = await supabase.from('seo_settings').update({
        meta_title: page.meta_title,
        meta_description: page.meta_description,
        meta_keywords: page.meta_keywords,
        og_image_url: page.og_image_url
      }).eq('id', page.id);
      if (error) throw error;
      toast.success('SEO updated for ' + page.page_path);
    } catch (err) {
      toast.error('Failed to update SEO');
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-white">SEO Manager</h1>
      {pages.map(page => (
        <div key={page.id} className="bg-surface-300 p-6 rounded-2xl border border-slate-800 space-y-4">
          <h2 className="text-lg font-bold text-white capitalize">{page.page_path === '/' ? 'Home Page' : page.page_path}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1">Meta Title</label>
              <input type="text" value={page.meta_title || ''} onChange={(e) => handleChange(page.id, 'meta_title', e.target.value)} className="w-full bg-surface-200 border border-slate-700 rounded-lg px-4 py-2 text-white" />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Meta Keywords</label>
              <input type="text" value={page.meta_keywords || ''} onChange={(e) => handleChange(page.id, 'meta_keywords', e.target.value)} className="w-full bg-surface-200 border border-slate-700 rounded-lg px-4 py-2 text-white" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-slate-400 mb-1">Meta Description</label>
              <textarea value={page.meta_description || ''} onChange={(e) => handleChange(page.id, 'meta_description', e.target.value)} className="w-full bg-surface-200 border border-slate-700 rounded-lg px-4 py-2 text-white" rows={3}></textarea>
            </div>
            <div className="md:col-span-2 flex gap-2">
              <div className="flex-1">
                <label className="block text-sm text-slate-400 mb-1">OG Image URL</label>
                <input type="text" value={page.og_image_url || ''} onChange={(e) => handleChange(page.id, 'og_image_url', e.target.value)} className="w-full bg-surface-200 border border-slate-700 rounded-lg px-4 py-2 text-white" />
              </div>
              <div className="flex items-end">
                <button onClick={() => handleSave(page)} className="p-2 bg-accent-purple hover:bg-purple-600 text-white rounded-lg transition-colors h-[42px] px-4 flex items-center gap-2"><Save className="w-4 h-4"/> Save</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
