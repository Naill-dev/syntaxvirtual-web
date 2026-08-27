import React, { useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { supabase } from '../../lib/supabaseClient';
import toast from 'react-hot-toast';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const modules = {
  toolbar: [
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],
    [{ 'indent': '-1'}, { 'indent': '+1' }],
    [{ 'align': [] }],
    ['link', 'image', 'video'],
    ['clean']
  ],
  clipboard: {
    matchVisual: false,
  }
};

const formats = [
  'header', 'bold', 'italic', 'underline', 'strike',
  'blockquote', 'code-block',
  'list', 'bullet', 'script', 'indent', 'align',
  'link', 'image', 'video'
];

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const quillRef = useRef<any>(null);

  const handleImageInsert = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      const quill = quillRef.current?.getEditor();
      if (!quill) return;

      const range = quill.getSelection(true);
      
      const toastId = toast.loading('Uploading image...');
      
      // Upload to Supabase
      const { data, error } = await supabase.storage
        .from('brand-assets') // using brand-assets since it's the public bucket we created earlier for logo etc
        .upload(`articles/${Date.now()}_${file.name}`, file);

      if (error) {
        console.error('Upload error:', error);
        toast.error('Failed to upload image', { id: toastId });
        return;
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('brand-assets')
        .getPublicUrl(data.path);

      // Insert image into editor
      quill.insertEmbed(range.index, 'image', urlData.publicUrl);
      quill.setSelection(range.index + 1);
      toast.success('Image uploaded!', { id: toastId });
    };
  };

  return (
    <div className="rich-text-editor text-slate-900 bg-white rounded-lg overflow-hidden">
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        style={{ height: '350px', marginBottom: '40px' }}
      />
      <div className="p-2 border-t border-gray-200 bg-gray-50 flex justify-end">
        <button
          type="button"
          onClick={handleImageInsert}
          className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-700 transition-colors flex items-center gap-2"
        >
          <span>📷</span> Insert Image
        </button>
      </div>
    </div>
  );
}
