// file: src/stores/labStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Language = 'javascript' | 'python' | 'sql' | 'html';
export type LayoutDirection = 'horizontal' | 'vertical';

interface LabState {
  code: string;
  language: Language;
  layout: LayoutDirection;
  setCode: (code: string) => void;
  setLanguage: (lang: Language) => void;
  setLayout: (layout: LayoutDirection) => void;
  runTimestamp: number;
  run: () => void;
}

const defaultCode: Record<Language, string> = {
  javascript: 'console.log("Hello, SyntaxVirtual Lab!");',
  python: 'print("Hello from Python!")',
  sql: '-- Run SQL logic\nSELECT * FROM test;',
  html: '<div style="color: blue; text-align: center;">\n  <h1>Hello Web</h1>\n</div>'
};

export const useLabStore = create<LabState>()(
  persist(
    (set) => ({
      code: defaultCode.javascript,
      language: 'javascript',
      layout: 'horizontal',
      runTimestamp: 0,
      setCode: (code) => set({ code }),
      setLanguage: (lang) => set({ language: lang, code: defaultCode[lang] }),
      setLayout: (layout) => set({ layout }),
      run: () => set({ runTimestamp: Date.now() }),
    }),
    {
      name: 'syntax-lab-storage',
      partialize: (state) => ({ code: state.code, language: state.language, layout: state.layout }),
    }
  )
);
