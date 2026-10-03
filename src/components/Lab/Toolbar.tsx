// file: src/components/Lab/Toolbar.tsx
import { Play, Share2, Save, LayoutTemplate } from 'lucide-react';
import { useLabStore } from '../../stores/labStore';

export function Toolbar() {
  const { language, setLanguage, layout, setLayout, run } = useLabStore();

  return (
    <div className="h-12 border-b border-slate-800/80 bg-[#0f172a] flex items-center justify-between px-4">
      <div className="flex items-center gap-3">
        <select 
          value={language}
          onChange={(e) => setLanguage(e.target.value as any)}
          className="bg-slate-900 border border-slate-800 text-sm rounded-lg px-3 py-1.5 outline-none focus:border-accent-purple"
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="sql">SQL</option>
          <option value="html">HTML/CSS/JS</option>
        </select>
        
        <button 
          onClick={run}
          className="flex items-center gap-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 px-4 py-1.5 rounded-lg text-sm font-medium transition-colors"
        >
          <Play className="w-4 h-4" />
          Run
        </button>
      </div>

      <div className="flex items-center gap-2">
        <button 
          onClick={() => setLayout(layout === 'horizontal' ? 'vertical' : 'horizontal')}
          className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          title="Change Layout"
        >
          <LayoutTemplate className="w-4 h-4" />
        </button>
        <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
          <Save className="w-4 h-4" />
          Save
        </button>
        <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
          <Share2 className="w-4 h-4" />
          Share
        </button>
      </div>
    </div>
  );
}
