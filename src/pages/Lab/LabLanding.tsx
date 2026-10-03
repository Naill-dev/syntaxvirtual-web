// file: src/pages/Lab/LabLanding.tsx
import { Link } from 'react-router-dom';

export function LabLanding() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="space-y-4 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          SyntaxVirtual Lab
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl">
          Brauzerdə işləyən interaktiv kod mühiti, inkişaf etdirilmiş simulyatorlar və kod generatorları bir arada.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Placeholder cards for now */}
        <Link to="/lab/playground" className="p-6 rounded-2xl border border-slate-800 bg-slate-900/50 hover:bg-slate-800 transition-colors">
          <h2 className="text-xl font-semibold mb-2 text-white">Live Playground</h2>
          <p className="text-slate-400 text-sm">JS, Python, SQL və HTML/CSS üçün real-time kod redaktoru.</p>
        </Link>
        <Link to="/lab/tools" className="p-6 rounded-2xl border border-slate-800 bg-slate-900/50 hover:bg-slate-800 transition-colors">
          <h2 className="text-xl font-semibold mb-2 text-white">Generatorlar</h2>
          <p className="text-slate-400 text-sm">Regex, SQL, API Mock və Boilerplate alətləri.</p>
        </Link>
        <Link to="/lab/simulators" className="p-6 rounded-2xl border border-slate-800 bg-slate-900/50 hover:bg-slate-800 transition-colors">
          <h2 className="text-xl font-semibold mb-2 text-white">Simulyatorlar</h2>
          <p className="text-slate-400 text-sm">Alqoritm, data strukturu və şəbəkə animasiyaları.</p>
        </Link>
      </div>
    </div>
  );
}
