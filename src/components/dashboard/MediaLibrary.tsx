import React, { useState, useEffect } from 'react';
import { UploadCloud, Image as ImageIcon, Trash2, Copy, Check } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';
import toast from 'react-hot-toast';

export const MediaLibrary = ({ onSelect }: { onSelect?: (url: string) => void }) => {
  const [files, setFiles] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    const { data, error } = await supabase.storage.from('portfolio-images').list('', {
      sortBy: { column: 'created_at', order: 'desc' }
    });
    if (data) {
      // Filter out hidden files like .emptyFolderPlaceholder
      setFiles(data.filter(f => f.name !== '.emptyFolderPlaceholder'));
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;

    try {
      const { error } = await supabase.storage.from('portfolio-images').upload(fileName, file);
      if (error) throw error;
      toast.success('Uploaded successfully');
      fetchFiles();
    } catch (err) {
      toast.error('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (fileName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('Are you sure you want to delete this file?')) return;
    try {
      const { error } = await supabase.storage.from('portfolio-images').remove([fileName]);
      if (error) throw error;
      toast.success('File deleted');
      setFiles(files.filter(f => f.name !== fileName));
    } catch (err) {
      toast.error('Failed to delete file');
    }
  };

  const handleCopy = (url: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
    toast.success('Copied to clipboard');
  };

  const handleSelect = (fileName: string) => {
    const { data } = supabase.storage.from('portfolio-images').getPublicUrl(fileName);
    if (onSelect) {
      onSelect(data.publicUrl);
    }
  };

  return (
    <div className="space-y-6 max-h-[80vh] overflow-y-auto">
      {!onSelect && <h1 className="text-2xl font-bold text-white flex items-center gap-2"><ImageIcon className="w-6 h-6 text-accent-purple"/> Media Library</h1>}
      <div className="border-2 border-dashed border-slate-700 rounded-3xl p-10 flex flex-col items-center justify-center text-center bg-surface-300/50 relative overflow-hidden transition-colors hover:border-accent-purple/50 hover:bg-surface-300">
        <input 
          type="file" 
          onChange={handleUpload} 
          disabled={uploading}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed" 
          accept="image/*"
        />
        <UploadCloud className="w-12 h-12 text-slate-500 mb-4" />
        <h3 className="text-lg font-medium text-white mb-2">{uploading ? 'Uploading...' : 'Upload Files'}</h3>
        <p className="text-sm text-slate-400 mb-6">Drag and drop images here, or click to browse</p>
        <button disabled={uploading} className="px-6 py-2.5 bg-accent-purple hover:bg-purple-600 text-white font-medium rounded-xl transition-all disabled:opacity-50 pointer-events-none">
          {uploading ? 'Uploading...' : 'Browse Files'}
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-8">
        {files.length === 0 ? (
          <div className="col-span-full py-12 text-center text-slate-500">No media yet</div>
        ) : (
          files.map((file) => {
            const { data } = supabase.storage.from('portfolio-images').getPublicUrl(file.name);
            return (
              <div 
                key={file.id} 
                onClick={() => handleSelect(file.name)}
                className={`group aspect-square bg-surface-300 rounded-xl border border-slate-800 overflow-hidden relative ${onSelect ? 'cursor-pointer hover:border-accent-purple shadow-glow-sm transition-all' : ''}`}
              >
                <img src={data.publicUrl} alt={file.name} className="w-full h-full object-cover" />
                <div className={`absolute inset-0 bg-black/60 flex flex-col justify-center items-center gap-2 transition-opacity ${onSelect ? 'opacity-0 group-hover:opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                  {onSelect ? (
                    <span className="px-3 py-1 bg-accent-purple text-white text-xs font-medium rounded-full">Select</span>
                  ) : (
                    <div className="flex gap-2">
                      <button onClick={(e) => handleCopy(data.publicUrl, e)} className="p-2 bg-surface-200 hover:bg-surface-100 text-white rounded-lg transition-colors">
                        {copiedUrl === data.publicUrl ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                      <button onClick={(e) => handleDelete(file.name, e)} className="p-2 bg-red-500/20 hover:bg-red-500/40 text-red-400 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
