// file: src/components/Lab/CodeEditor.tsx
import React from 'react';
import Editor from '@monaco-editor/react';
import { useLabStore } from '../../stores/labStore';

export function CodeEditor() {
  const { code, htmlCode, cssCode, jsCode, language, theme, setCode, setHtmlCode, setCssCode, setJsCode, run } = useLabStore();

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      run();
    });
  };

  const commonOptions = {
    minimap: { enabled: false },
    fontSize: 14,
    fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, monospace",
    wordWrap: 'on' as const,
    padding: { top: 16 },
    scrollBeyondLastLine: false,
    smoothScrolling: true,
    cursorBlinking: 'smooth',
    cursorSmoothCaretAnimation: 'on' as const,
    formatOnPaste: true,
  };

  if (language === 'html') {
    return (
      <div className="w-full h-full flex flex-col xl:flex-row divide-y xl:divide-y-0 xl:divide-x divide-slate-800/80 bg-slate-950">
        <div className="flex-1 flex flex-col h-full xl:h-auto min-h-[150px]">
          <div className="bg-slate-900/50 text-xs text-slate-400 p-2 font-medium border-b border-slate-800/80 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-orange-500"></span> HTML
          </div>
          <Editor
            height="100%"
            language="html"
            theme={theme === 'dark' ? 'vs-dark' : 'vs-light'}
            value={htmlCode}
            onChange={(val: string | undefined) => setHtmlCode(val || '')}
            options={commonOptions}
          />
        </div>
        <div className="flex-1 flex flex-col h-full xl:h-auto min-h-[150px]">
          <div className="bg-slate-900/50 text-xs text-slate-400 p-2 font-medium border-b border-slate-800/80 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span> CSS
          </div>
          <Editor
            height="100%"
            language="css"
            theme={theme === 'dark' ? 'vs-dark' : 'vs-light'}
            value={cssCode}
            onChange={(val: string | undefined) => setCssCode(val || '')}
            options={commonOptions}
          />
        </div>
        <div className="flex-1 flex flex-col h-full xl:h-auto min-h-[150px]">
          <div className="bg-slate-900/50 text-xs text-slate-400 p-2 font-medium border-b border-slate-800/80 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-yellow-500"></span> JS
          </div>
          <Editor
            height="100%"
            language="javascript"
            theme={theme === 'dark' ? 'vs-dark' : 'vs-light'}
            value={jsCode}
            onChange={(val: string | undefined) => setJsCode(val || '')}
            options={commonOptions}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative">
      <Editor
        height="100%"
        language={language}
        theme={theme === 'dark' ? 'vs-dark' : 'vs-light'}
        value={code}
        onChange={(val: string | undefined) => setCode(val || '')}
        onMount={handleEditorDidMount}
        options={commonOptions}
      />
    </div>
  );
}
