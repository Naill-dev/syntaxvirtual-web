// file: src/components/Lab/CodeEditor.tsx
import React from 'react';
import Editor from '@monaco-editor/react';
import { useLabStore } from '../../stores/labStore';

export function CodeEditor() {
  const { code, language, theme, setCode, run } = useLabStore();

  const handleEditorDidMount = (editor: any, monaco: any) => {
    // Add Ctrl+Enter shortcut to run code
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      run();
    });
  };

  return (
    <div className="w-full h-full relative">
      <Editor
        height="100%"
        language={language === 'html' ? 'html' : language}
        theme={theme === 'dark' ? 'vs-dark' : 'vs-light'}
        value={code}
        onChange={(val: string | undefined) => setCode(val || '')}
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, monospace",
          wordWrap: 'on',
          padding: { top: 16 },
          scrollBeyondLastLine: false,
          smoothScrolling: true,
          cursorBlinking: 'smooth',
          cursorSmoothCaretAnimation: 'on',
          formatOnPaste: true,
        }}
      />
    </div>
  );
}
