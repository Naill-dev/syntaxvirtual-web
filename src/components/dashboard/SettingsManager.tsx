import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import toast from 'react-hot-toast';

export const SettingsManager = () => {
  const [themes, setThemes] = useState<any[]>([]);
  const [sections, setSections] = useState<any[]>([]);

  useEffect(() => {
    supabase.from('theme_settings').select('*').then(({ data }) => setThemes(data || []));
    supabase.from('homepage_sections').select('*').order('display_order').then(({ data }) => setSections(data || []));
  }, []);

  const applyTheme = async (theme: any) => {
    await supabase.from('theme_settings').update({ is_active: false }).neq('id', theme.id);
    await supabase.from('theme_settings').update({ is_active: true }).eq('id', theme.id);
    setThemes(themes.map(t => ({ ...t, is_active: t.id === theme.id })));
    toast.success(`${theme.theme_name} theme applied`);
  };

  const toggleSection = async (section: any) => {
    const newVal = !section.is_enabled;
    await supabase.from('homepage_sections').update({ is_enabled: newVal }).eq('id', section.id);
    setSections(sections.map(s => s.id === section.id ? { ...s, is_enabled: newVal } : s));
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-white">Settings Manager</h1>
      
      <div className="bg-surface-300 p-6 rounded-2xl border border-slate-800">
        <h2 className="text-xl font-bold text-white mb-4">Theme Presets</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {themes.map(t => (
            <div key={t.id} onClick={() => applyTheme(t)} className={`p-4 rounded-xl border cursor-pointer transition-all ${t.is_active ? 'border-accent-purple bg-accent-purple/10' : 'border-slate-700 hover:border-slate-500 bg-surface-200'}`}>
              <div className="font-semibold text-white mb-2">{t.theme_name}</div>
              <div className="flex gap-2 h-6 rounded overflow-hidden">
                <div className="flex-1" style={{ backgroundColor: t.primary_color }}></div>
                <div className="flex-1" style={{ backgroundColor: t.secondary_color }}></div>
                <div className="flex-1" style={{ backgroundColor: t.accent_color }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-surface-300 p-6 rounded-2xl border border-slate-800">
        <h2 className="text-xl font-bold text-white mb-4">Homepage Sections</h2>
        <div className="space-y-2">
          {sections.map(s => (
            <div key={s.id} className="flex justify-between items-center p-4 bg-surface-200 border border-slate-700 rounded-xl">
              <span className="text-white capitalize font-medium">{s.section_key}</span>
              <button onClick={() => toggleSection(s)} className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${s.is_enabled ? 'bg-green-500/20 text-green-400' : 'bg-slate-700 text-slate-400'}`}>
                {s.is_enabled ? 'Enabled' : 'Disabled'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
