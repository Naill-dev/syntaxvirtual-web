import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { PortfolioProject } from '../../types';
import toast from 'react-hot-toast';
import { Plus, Edit2, Trash2, X, UploadCloud, Briefcase, ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

export const PortfolioManager: React.FC = () => {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<PortfolioProject | null>(null);

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [techStack, setTechStack] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [liveDemoUrl, setLiveDemoUrl] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [currentImageUrl, setCurrentImageUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('portfolio')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load portfolio projects');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setTechStack('');
    setGithubUrl('');
    setLiveDemoUrl('');
    setImageFile(null);
    setCurrentImageUrl('');
    setEditingProject(null);
  };

  const openModal = (project?: PortfolioProject) => {
    if (project) {
      setEditingProject(project);
      setTitle(project.title);
      setDescription(project.description || '');
      setTechStack(project.tech_stack.join(', '));
      setGithubUrl(project.github_url);
      setLiveDemoUrl(project.live_demo_url || '');
      setCurrentImageUrl(project.image_url || '');
    } else {
      resetForm();
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleImageUpload = async (): Promise<string | null> => {
    if (!imageFile) return currentImageUrl || null;

    const fileExt = imageFile.name.split('.').pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
    
    try {
      const { error: uploadError } = await supabase.storage
        .from('portfolio-images')
        .upload(fileName, imageFile);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('portfolio-images').getPublicUrl(fileName);
      return data.publicUrl;
    } catch (err) {
      console.error('Upload error:', err);
      toast.error('Failed to upload image');
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !githubUrl || !techStack) return;

    setIsSubmitting(true);
    try {
      const imageUrl = await handleImageUpload();
      const techArray = techStack.split(',').map(t => t.trim()).filter(Boolean);

      const projectData = {
        title,
        description,
        tech_stack: techArray,
        github_url: githubUrl,
        live_demo_url: liveDemoUrl || null,
        image_url: imageUrl,
        updated_at: new Date().toISOString()
      };

      if (editingProject) {
        const { error } = await supabase
          .from('portfolio')
          .update(projectData)
          .eq('id', editingProject.id);

        if (error) throw error;
        toast.success('Project updated');
      } else {
        const { error } = await supabase
          .from('portfolio')
          .insert([projectData]);

        if (error) throw error;
        toast.success('Project added');
      }

      closeModal();
      fetchProjects();
    } catch (err) {
      console.error(err);
      toast.error(editingProject ? 'Failed to update project' : 'Failed to add project');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      const { error } = await supabase.from('portfolio').delete().eq('id', id);
      if (error) throw error;
      setProjects(projects.filter(p => p.id !== id));
      toast.success('Project deleted');
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete project');
    }
  };

  if (loading) return <div className="text-slate-400">Loading portfolio...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Briefcase className="w-6 h-6 text-accent-purple" />
          Portfolio Management
        </h1>
        <button
          onClick={() => openModal()}
          className="px-4 py-2 bg-gradient-to-r from-accent-purple to-electric-DEFAULT text-white text-sm font-semibold rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" /> Add Project
        </button>
      </div>

      <div className="bg-surface-300 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-surface-200 text-xs uppercase font-mono text-slate-400 border-b border-slate-800">
              <tr>
                <th className="px-6 py-4">Project</th>
                <th className="px-6 py-4">Tech Stack</th>
                <th className="px-6 py-4">Links</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-surface-200/50 transition-colors">
                  <td className="px-6 py-4 align-top">
                    <div className="flex items-center gap-3">
                      {project.image_url ? (
                        <img src={project.image_url} alt={project.title} className="w-12 h-12 rounded-lg object-cover border border-slate-700 shrink-0" />
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-surface-100 border border-slate-700 flex items-center justify-center shrink-0">
                          <Briefcase className="w-5 h-5 text-slate-500" />
                        </div>
                      )}
                      <div>
                        <div className="font-bold text-white mb-1">{project.title}</div>
                        <div className="text-xs text-slate-400 line-clamp-1 max-w-[200px]">{project.description || 'No description'}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 align-top">
                    <div className="flex flex-wrap gap-1 max-w-[200px]">
                      {project.tech_stack.slice(0, 3).map((tech, i) => (
                        <span key={i} className="px-2 py-0.5 rounded text-[10px] font-mono bg-surface-100 border border-slate-700 text-slate-300">
                          {tech}
                        </span>
                      ))}
                      {project.tech_stack.length > 3 && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-surface-100 border border-slate-700 text-slate-400">
                          +{project.tech_stack.length - 3}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 align-top">
                    <div className="flex flex-col gap-1.5 text-xs">
                      <a href={project.github_url} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors">
                        <FaGithub className="w-3.5 h-3.5" /> Source
                      </a>
                      {project.live_demo_url && (
                        <a href={project.live_demo_url} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors">
                          <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                        </a>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 align-top text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openModal(project)}
                        className="p-2 rounded-lg border border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
                        title="Edit Project"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="p-2 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-colors"
                        title="Delete Project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {projects.length === 0 && (
            <div className="p-8 text-center text-slate-500">
              No projects found.
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#060919]/90 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-surface-300 border border-slate-700 rounded-2xl shadow-2xl p-6 md:p-8 my-8 mx-auto">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold text-white mb-6">
              {editingProject ? 'Edit Project' : 'Add New Project'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5">Project Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full bg-surface-100 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-accent-purple"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5">Description (Optional)</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="w-full bg-surface-100 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent-purple resize-none custom-scrollbar"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">GitHub URL *</label>
                  <input
                    type="url"
                    required
                    value={githubUrl}
                    onChange={e => setGithubUrl(e.target.value)}
                    className="w-full bg-surface-100 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-accent-purple"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">Live Demo URL (Optional)</label>
                  <input
                    type="url"
                    value={liveDemoUrl}
                    onChange={e => setLiveDemoUrl(e.target.value)}
                    className="w-full bg-surface-100 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-accent-purple"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5">Tech Stack (comma-separated) *</label>
                <input
                  type="text"
                  required
                  value={techStack}
                  onChange={e => setTechStack(e.target.value)}
                  placeholder="React, TypeScript, Tailwind CSS"
                  className="w-full bg-surface-100 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-accent-purple"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5">Project Image (Optional)</label>
                
                {currentImageUrl && !imageFile && (
                  <div className="mb-3 relative inline-block">
                    <img src={currentImageUrl} alt="Current" className="w-32 h-20 object-cover rounded-lg border border-slate-700" />
                    <button 
                      type="button" 
                      onClick={() => setCurrentImageUrl('')} 
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}

                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={e => setImageFile(e.target.files?.[0] || null)}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-700 rounded-xl bg-surface-100 hover:bg-surface-200 transition-colors cursor-pointer"
                  >
                    <UploadCloud className="w-6 h-6 text-slate-400 mb-2" />
                    <span className="text-sm text-slate-300">
                      {imageFile ? imageFile.name : 'Click to upload image'}
                    </span>
                  </label>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-5 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-surface-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 bg-gradient-to-r from-accent-purple to-electric-DEFAULT text-white text-sm font-semibold rounded-xl flex items-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {isSubmitting ? 'Saving...' : 'Save Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
