// file: src/stores/labStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Language = 'javascript' | 'python' | 'sql' | 'html';
export type LayoutDirection = 'horizontal' | 'vertical';

interface LabState {
  code: string;
  htmlCode: string;
  cssCode: string;
  jsCode: string;
  language: Language;
  layout: LayoutDirection;
  theme: 'dark' | 'light';
  setCode: (code: string) => void;
  setHtmlCode: (code: string) => void;
  setCssCode: (code: string) => void;
  setJsCode: (code: string) => void;
  setLanguage: (lang: Language) => void;
  setLayout: (layout: LayoutDirection) => void;
  setTheme: (theme: 'dark' | 'light') => void;
  runTimestamp: number;
  run: () => void;
}

const defaultCode: Record<Language, string> = {
  javascript: 'console.log("Hello, SyntaxVirtual Lab!");',
  python: 'print("Hello from Python!")',
  sql: '-- Run SQL logic\nSELECT * FROM test;',
  html: '<!-- Web Playground (Live Preview) -->'
};

export const useLabStore = create<LabState>()(
  persist(
    (set) => ({
      code: defaultCode.javascript,
      htmlCode: '<div class="card">\n  <h1>Hello Web</h1>\n  <p>SyntaxVirtual Lab-a xoş gəlmişsiniz!</p>\n</div>',
      cssCode: 'body {\n  font-family: system-ui, sans-serif;\n  background: #f8fafc;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100vh;\n  margin: 0;\n}\n\n.card {\n  background: white;\n  padding: 2rem;\n  border-radius: 12px;\n  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);\n  text-align: center;\n}\n\nh1 {\n  color: #4f46e5;\n  margin-top: 0;\n}',
      jsCode: 'console.log("Web səhifəsi yükləndi!");\n\ndocument.querySelector("h1").addEventListener("click", () => {\n  alert("Mənə kliklədin!");\n});',
      language: 'javascript',
      layout: 'horizontal',
      theme: 'dark',
      runTimestamp: 0,
      setCode: (code) => set({ code }),
      setHtmlCode: (htmlCode) => set({ htmlCode }),
      setCssCode: (cssCode) => set({ cssCode }),
      setJsCode: (jsCode) => set({ jsCode }),
      setLanguage: (lang) => set({ language: lang, code: defaultCode[lang] }),
      setLayout: (layout) => set({ layout }),
      setTheme: (theme) => set({ theme }),
      run: () => set({ runTimestamp: Date.now() }),
    }),
    {
      name: 'syntax-lab-storage',
      partialize: (state) => ({ 
        code: state.code, 
        htmlCode: state.htmlCode, 
        cssCode: state.cssCode, 
        jsCode: state.jsCode, 
        language: state.language, 
        layout: state.layout 
      }),
    }
  )
);
