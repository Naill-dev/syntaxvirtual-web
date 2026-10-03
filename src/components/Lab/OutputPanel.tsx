// file: src/components/Lab/OutputPanel.tsx
import React, { useEffect, useState } from 'react';
import { useLabStore } from '../../stores/labStore';
import { Terminal, RefreshCw, Globe } from 'lucide-react';

export function OutputPanel() {
  const { code, language, runTimestamp } = useLabStore();
  const [output, setOutput] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState<'console' | 'preview'>(language === 'html' ? 'preview' : 'console');

  useEffect(() => {
    if (language === 'html') setActiveTab('preview');
    else setActiveTab('console');
  }, [language]);

  useEffect(() => {
    if (runTimestamp === 0) return;
    
    const executeCode = async () => {
      setIsRunning(true);
      setOutput('Running...');
      
      try {
        if (language === 'javascript') {
          // Simple eval wrapper for demonstration (in production, use Web Worker or iframe)
          const oldLog = console.log;
          const logs: string[] = [];
          console.log = (...args) => logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : a).join(' '));
          
          try {
            // eslint-disable-next-line no-eval
            eval(code);
            setOutput(logs.join('\n') || 'Execution complete (no output)');
          } catch (err: any) {
            setOutput(`Error: ${err.message}`);
          } finally {
            console.log = oldLog;
          }
        } 
        else if (language === 'python') {
          setOutput('Python execution requires Pyodide (Addim 6)...');
        } 
        else if (language === 'sql') {
          setOutput('SQL execution requires sql.js (Addim 6)...');
        }
      } catch (err: any) {
        setOutput(err.toString());
      } finally {
        setIsRunning(false);
      }
    };

    executeCode();
  }, [runTimestamp]);

  return (
    <div className="flex flex-col w-full h-full bg-[#0f172a]">
      <div className="flex items-center gap-1 border-b border-slate-800/80 px-2 py-1">
        <button
          onClick={() => setActiveTab('console')}
          className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
            activeTab === 'console' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <Terminal className="w-3.5 h-3.5" />
          Console
        </button>
        {language === 'html' && (
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeTab === 'preview' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            Preview
          </button>
        )}
      </div>
      
      <div className="flex-1 overflow-auto p-4 relative font-mono text-sm">
        {isRunning && (
          <div className="absolute top-4 right-4 text-accent-purple animate-spin">
            <RefreshCw className="w-4 h-4" />
          </div>
        )}
        
        {activeTab === 'console' ? (
          <pre className="text-slate-300 whitespace-pre-wrap">{output || 'Nəticəni görmək üçün "Run" edin'}</pre>
        ) : (
          <iframe
            title="preview"
            sandbox="allow-scripts"
            srcDoc={code}
            className="w-full h-full bg-white rounded"
          />
        )}
      </div>
    </div>
  );
}
