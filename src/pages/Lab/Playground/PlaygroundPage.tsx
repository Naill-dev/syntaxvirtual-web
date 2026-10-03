// file: src/pages/Lab/Playground/PlaygroundPage.tsx
import React from 'react';
import { Toolbar } from '../../../components/Lab/Toolbar';
import { SplitPane } from '../../../components/Lab/SplitPane';
import { CodeEditor } from '../../../components/Lab/CodeEditor';
import { OutputPanel } from '../../../components/Lab/OutputPanel';
import { useLabStore } from '../../../stores/labStore';
import { LabBreadcrumb } from '../../../components/Lab/LabBreadcrumb';

export function PlaygroundPage() {
  const { layout } = useLabStore();

  return (
    <div className="flex flex-col h-full w-full bg-slate-950 overflow-hidden">
      <div className="px-4 pt-4 pb-2">
        <LabBreadcrumb />
      </div>
      <Toolbar />
      <div className="flex-1 overflow-hidden relative">
        <SplitPane direction={layout}>
          {/* Sol/Üst: Redaktor */}
          <div className="h-full w-full relative border-r border-slate-800/50">
            <CodeEditor />
          </div>
          
          {/* Sağ/Alt: Nəticə */}
          <div className="h-full w-full relative">
            <OutputPanel />
          </div>
        </SplitPane>
      </div>
    </div>
  );
}
