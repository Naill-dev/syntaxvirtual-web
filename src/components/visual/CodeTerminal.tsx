import React, { useState } from 'react';
import { Copy, Check, Terminal, Zap, Shield, Sparkles } from 'lucide-react';

interface CodeSnippet {
  id: string;
  filename: string;
  language: string;
  code: string;
  metrics?: { label: string; value: string; color: string }[];
}

export const CodeTerminal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('app');
  const [copied, setCopied] = useState(false);

  const snippets: Record<string, CodeSnippet> = {
    app: {
      id: 'app',
      filename: 'SyntaxEngine.tsx',
      language: 'typescript',
      code: `// SyntaxVirtual Core Platform Architecture
import { EdgeRouter, RealTimeMesh } from '@syntaxvirtual/core';

export default async function Page() {
  const mesh = await RealTimeMesh.connect({
    region: 'global-edge',
    encryption: 'quantum-resistant',
    caching: 'stale-while-revalidate'
  });

  return (
    <SyntaxExperience
      quality="flawless"
      fps={120}
      ttfb="< 25ms"
      lighthouseScore={100}
    >
      <HeroHeadline text="Crafting Digital Excellence" />
      <ArchitectureView telemetry={mesh.telemetry} />
    </SyntaxExperience>
  );
}`,
      metrics: [
        { label: 'Edge TTFB', value: '18ms', color: 'text-emerald-400' },
        { label: 'Lighthouse', value: '100/100', color: 'text-accent-lavender' },
        { label: 'Build Status', value: 'Optimal', color: 'text-electric-light' }
      ]
    },
    performance: {
      id: 'performance',
      filename: 'PerformanceAudit.ts',
      language: 'typescript',
      code: `// Core Web Vitals Real-Time Benchmark
export const auditBenchmarks = {
  largestContentfulPaint: '0.64s', // Target < 2.5s (Grade: A+)
  interactionToNextPaint: '22ms',  // Target < 200ms (Grade: A+)
  cumulativeLayoutShift:  '0.000', // Target < 0.1 (Grade: A+)
  timeToFirstByte:        '18ms',  // Global Edge Average
  compressionRatio:       '88.4%', // Brotli 11 Max Stream
  bundleSizeTotal:        '42.1kB' // Zero runtime bloat
};

export function assertZeroJank() {
  return auditBenchmarks.interactionToNextPaint < '50ms';
}`,
      metrics: [
        { label: 'INP', value: '22ms', color: 'text-emerald-400' },
        { label: 'LCP', value: '0.64s', color: 'text-emerald-400' },
        { label: 'CLS', value: '0.000', color: 'text-emerald-400' }
      ]
    },
    architecture: {
      id: 'architecture',
      filename: 'StackConfig.json',
      language: 'json',
      code: `{
  "brand": "SyntaxVirtual",
  "architect": "Nail Mammadov",
  "frontend": {
    "framework": "Next.js 14 / React 18",
    "language": "TypeScript Strict",
    "styling": "Tailwind CSS + Glassmorphism",
    "motion": "Hardware-Accelerated WebGL/CSS"
  },
  "backend": {
    "api": "FastAPI + Node.js Microservices",
    "cache": "Redis In-Memory Tier",
    "database": "PostgreSQL Distributed Cluster",
    "security": "HIPAA / SOC-2 Ready RBAC"
  }
}`,
      metrics: [
        { label: 'Type Safety', value: 'Strict 100%', color: 'text-blue-400' },
        { label: 'Security', value: 'Enterprise', color: 'text-purple-400' },
        { label: 'Uptime SLA', value: '99.99%', color: 'text-emerald-400' }
      ]
    }
  };

  const currentSnippet = snippets[activeTab] || snippets.app;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-2xl rounded-2xl border border-slate-700/60 bg-surface-200/90 shadow-2xl backdrop-blur-2xl overflow-hidden transition-all duration-300 hover:border-accent-purple/50 hover:shadow-glow-md">
      {/* Window Titlebar */}
      <div className="flex items-center justify-between border-b border-slate-800/80 bg-surface-300/80 px-4 py-3">
        <div className="flex items-center space-x-2">
          <div className="h-3 w-3 rounded-full bg-red-500/80" />
          <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
          <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
          <span className="ml-2 text-xs font-mono text-slate-400 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-accent-violet" />
            syntax-virtual-core
          </span>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center space-x-1 bg-surface-100/60 p-0.5 rounded-lg border border-slate-700/40 text-xs">
          {Object.keys(snippets).map((key) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-2.5 py-1 rounded-md font-mono transition-all ${
                activeTab === key
                  ? 'bg-accent-purple text-white shadow-sm font-medium'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              {snippets[key].filename}
            </button>
          ))}
        </div>

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className="flex items-center space-x-1 text-xs text-slate-400 hover:text-slate-200 transition-colors p-1.5 rounded hover:bg-white/5"
          title="Copy Code"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>

      {/* Code Body */}
      <div className="p-4 sm:p-5 font-mono text-xs sm:text-sm overflow-x-auto text-slate-300 leading-relaxed bg-[#070A1E]/95">
        <pre className="text-slate-300 whitespace-pre">
          <code>
            {currentSnippet.code.split('\n').map((line, i) => {
              // Highlight comments
              if (line.trim().startsWith('//') || line.trim().startsWith('/*') || line.trim().startsWith('*')) {
                return <span key={i} className="text-slate-500 italic block">{line}</span>;
              }
              // Highlight imports/keywords
              return (
                <div key={i} className="flex">
                  <span className="w-6 select-none text-slate-600 text-right mr-4">{i + 1}</span>
                  <span className="flex-1">
                    {line.replace(/export|default|async|function|const|let|var|import|from|return/g, (m) => `\x00${m}\x00`)
                      .split('\x00')
                      .map((part, idx) => {
                        if (['export', 'default', 'async', 'function', 'const', 'let', 'var', 'import', 'from', 'return'].includes(part)) {
                          return <span key={idx} className="text-accent-violet font-semibold">{part}</span>;
                        }
                        if (part.includes('"') || part.includes("'") || part.includes('`')) {
                          return <span key={idx} className="text-emerald-300">{part}</span>;
                        }
                        return part;
                      })}
                  </span>
                </div>
              );
            })}
          </code>
        </pre>
      </div>

      {/* Terminal Live Benchmarks Footer */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-800/80 bg-surface-300/90 px-4 py-2.5 text-xs font-mono">
        <div className="flex items-center gap-2 text-slate-400">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>Engine: <span className="text-white font-medium">Syntax v3.4 Active</span></span>
        </div>

        <div className="flex items-center gap-4">
          {currentSnippet.metrics?.map((m, idx) => (
            <div key={idx} className="flex items-center gap-1">
              <span className="text-slate-400">{m.label}:</span>
              <span className={`font-semibold ${m.color}`}>{m.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
