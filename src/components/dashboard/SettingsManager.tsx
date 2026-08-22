import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import toast from 'react-hot-toast';

export const SettingsManager = () => {
  const [themes, setThemes] = useState<any[]>([]);
  const [sections, setSections] = useState<any[]>([]);
  const [siteSettings, setSiteSettings] = useState<{ id: string; logo_url: string; site_name: string } | null>(null);
  const [uploadingLogo, setUploadingLogo] = useState(false);

  useEffect(() => {
    supabase.from('theme_settings').select('*').then(({ data }) => setThemes(data || []));
    supabase.from('homepage_sections').select('*').order('display_order').then(({ data }) => setSections(data || []));
    supabase.from('site_settings').select('*').eq('id', 'global').single().then(({ data }) => setSiteSettings(data || { id: 'global', logo_url: '', site_name: 'SyntaxVirtual' }));
  }, []);

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `logo-${Date.now()}.${fileExt}`;

    setUploadingLogo(true);
    try {
      const { error: uploadError } = await supabase.storage
        .from('brand-assets')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from('brand-assets')
        .getPublicUrl(fileName);

      const newUrl = publicUrlData.publicUrl;
      setSiteSettings(prev => prev ? { ...prev, logo_url: newUrl } : null);
      
      // Auto-save
      await supabase.from('site_settings').update({ logo_url: newUrl }).eq('id', 'global');
      toast.success('Logo uploaded and saved');
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'Failed to upload logo');
    } finally {
      setUploadingLogo(false);
    }
  };

  const saveSiteSettings = async () => {
    if (!siteSettings) return;
    try {
      const { error } = await supabase.from('site_settings').update(siteSettings).eq('id', 'global');
      if (error) throw error;
      toast.success('Site settings saved');
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'Failed to save site settings');
    }
  };

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
        <h2 className="text-xl font-bold text-white mb-4">Brand Settings (Logo)</h2>
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <div className="w-full sm:w-1/3">
            <label className="text-xs font-medium text-slate-400 mb-2 block">Site Logo</label>
            <div className="relative h-32 bg-slate-900 border border-slate-700 rounded-xl overflow-hidden flex items-center justify-center group">
              {siteSettings?.logo_url ? (
                <img src={siteSettings.logo_url} alt="Site Logo" className="max-h-full max-w-full object-contain p-4" />
              ) : (
                <span className="text-slate-500 font-mono text-sm">No Logo</span>
              )}
              <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity">
                <span className="text-white text-sm font-medium">Upload Logo</span>
                <input type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} disabled={uploadingLogo} />
              </label>
            </div>
            {uploadingLogo && <div className="text-xs text-accent-lavender mt-2 animate-pulse">Uploading...</div>}
          </div>
          
          <div className="flex-1 w-full space-y-4">
            <div>
              <label className="text-xs font-medium text-slate-400 block mb-1">Site Name</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={siteSettings?.site_name || ''} 
                  onChange={e => setSiteSettings(prev => prev ? { ...prev, site_name: e.target.value } : null)}
                  className="flex-1 px-4 py-2 bg-surface-200 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-accent-purple"
                />
                <button onClick={saveSiteSettings} className="px-4 py-2 bg-accent-purple hover:bg-accent-violet text-white font-medium rounded-xl transition-colors">
                  Save
                </button>
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-400 block mb-1">Current Logo URL</label>
              <input type="text" readOnly value={siteSettings?.logo_url || ''} className="w-full px-4 py-2 bg-surface-200 border border-slate-700 rounded-xl text-slate-400 font-mono text-xs opacity-70" />
            </div>
          </div>
        </div>
      </div>
      
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
            <div key={s.id} className="flex items-center justify-between p-3 rounded-lg bg-surface-200 border border-slate-700">
              <div className="font-medium text-slate-200">{s.section_key}</div>
              <button 
                onClick={() => toggleSection(s)}
                className={`w-12 h-6 rounded-full transition-colors relative ${s.is_enabled ? 'bg-emerald-500' : 'bg-slate-600'}`}
              >
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${s.is_enabled ? 'left-7' : 'left-1'}`} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
