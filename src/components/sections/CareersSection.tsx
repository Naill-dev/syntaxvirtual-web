import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import toast from 'react-hot-toast';
import { Briefcase, MapPin, Clock, Upload, Send } from 'lucide-react';

export const CareersSection = () => {
  const [careers, setCareers] = useState<any[]>([]);
  const [selectedJob, setSelectedJob] = useState<any>(null);

  useEffect(() => {
    supabase.from('careers').select('*').eq('is_active', true).then(({ data }) => setCareers(data || []));
  }, []);

  if (careers.length === 0) return null;

  return (
    <section id="careers" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Join Our Team</h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">Build the future of digital experiences with us.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {careers.map(job => (
            <div key={job.id} className="bg-surface-300 p-8 rounded-3xl border border-slate-800 shadow-xl group hover:border-accent-purple/50 transition-colors">
              <div className="flex items-center gap-3 mb-4 text-accent-purple">
                <Briefcase className="w-5 h-5" />
                <span className="font-medium text-sm tracking-wider uppercase">{job.department}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{job.title}</h3>
              <div className="space-y-2 mb-6 text-sm text-slate-400">
                <div className="flex items-center gap-2"><MapPin className="w-4 h-4"/> {job.location}</div>
                <div className="flex items-center gap-2"><Clock className="w-4 h-4"/> {job.employment_type}</div>
              </div>
              <button onClick={() => setSelectedJob(job)} className="w-full py-3 bg-surface-200 hover:bg-accent-purple text-white rounded-xl transition-colors font-medium">Apply Now</button>
            </div>
          ))}
        </div>
      </div>

      {selectedJob && <ApplicationModal job={selectedJob} onClose={() => setSelectedJob(null)} />}
    </section>
  );
};

const ApplicationModal = ({ job, onClose }: any) => {
  const [formData, setFormData] = useState({ fullName: '', email: '', phone: '', coverLetter: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const { error } = await supabase.from('career_applications').insert([{
        career_id: job.id,
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        cover_letter: formData.coverLetter,
      }]);
      if (error) throw error;
      toast.success('Application submitted successfully!');
      onClose();
    } catch (err) {
      toast.error('Failed to submit application');
    }
    setSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-surface-300 w-full max-w-xl rounded-3xl border border-slate-700 overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
          <h3 className="text-xl font-bold text-white">Apply for {job.title}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white">✕</button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Full Name</label>
            <input required type="text" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} className="w-full bg-surface-200 border border-slate-700 rounded-lg px-4 py-2 text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Email</label>
            <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-surface-200 border border-slate-700 rounded-lg px-4 py-2 text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Phone</label>
            <input type="text" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-surface-200 border border-slate-700 rounded-lg px-4 py-2 text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Cover Letter / Note</label>
            <textarea required value={formData.coverLetter} onChange={e => setFormData({...formData, coverLetter: e.target.value})} className="w-full bg-surface-200 border border-slate-700 rounded-lg px-4 py-2 text-white" rows={4}></textarea>
          </div>
          <button disabled={submitting} type="submit" className="w-full py-3 bg-accent-purple hover:bg-purple-600 text-white rounded-xl transition-colors font-medium flex justify-center items-center gap-2">
            {submitting ? 'Submitting...' : <><Send className="w-4 h-4"/> Submit Application</>}
          </button>
        </form>
      </div>
    </div>
  );
};
