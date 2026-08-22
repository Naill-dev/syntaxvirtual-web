import React from 'react';
import { UploadCloud, Image as ImageIcon } from 'lucide-react';

export const MediaLibrary = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white flex items-center gap-2"><ImageIcon className="w-6 h-6 text-accent-purple"/> Media Library</h1>
      <div className="border-2 border-dashed border-slate-700 rounded-3xl p-12 flex flex-col items-center justify-center text-center bg-surface-300/50">
        <UploadCloud className="w-12 h-12 text-slate-500 mb-4" />
        <h3 className="text-lg font-medium text-white mb-2">Upload Files</h3>
        <p className="text-sm text-slate-400 mb-6">Drag and drop images here, or click to browse</p>
        <button className="px-6 py-2.5 bg-accent-purple hover:bg-purple-600 text-white font-medium rounded-xl transition-all">Browse Files</button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4 mt-8">
        {/* Placeholder for media items */}
        <div className="aspect-square bg-surface-300 rounded-xl border border-slate-800 flex items-center justify-center">
          <span className="text-slate-500 text-xs">No media yet</span>
        </div>
      </div>
    </div>
  );
};
