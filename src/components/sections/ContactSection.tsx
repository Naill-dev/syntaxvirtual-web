import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Send, CheckCircle2, MessageCircle, Mail, PhoneCall, Sparkles } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';
import toast from 'react-hot-toast';

interface ContactSectionProps {
  onOpenBooking: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenBooking }) => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'webapp',
    details: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert([{
          full_name: formData.name,
          email: formData.email,
          project_type: formData.projectType,
          message: formData.details
        }]);

      if (error) throw error;

      setStatus('success');
      
      // Trigger celebratory confetti
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };
      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) return clearInterval(interval);
        
        const particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
      }, 250);

      toast.success('Inquiry sent successfully!');
      setFormData({ name: '', email: '', projectType: 'webapp', details: '' });
      setTimeout(() => setStatus('idle'), 5000);

    } catch (err: any) {
      console.error(err);
      toast.error('Failed to send inquiry. Please try again.');
      setStatus('idle');
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('contact@syntaxvirtual.com');
    toast.success('Email copied to clipboard!');
  };

  return (
    <section id="contact" className="relative py-24 lg:py-32 overflow-hidden border-t border-slate-800/80 bg-[#070B22]">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-accent-purple/15 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center">
          
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-200 border border-slate-800 text-xs font-mono text-accent-lavender uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Let's Build Together</span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
                Ready to elevate your{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-light via-electric-light to-white">
                  Digital Presence?
                </span>
              </h2>
              <p className="text-lg text-slate-300 leading-relaxed max-w-lg">
                Whether you need a custom SaaS platform, a high-converting headless e-commerce store, or a bespoke brand identity — we're ready to engineer it.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a href="https://wa.me/1234567890" target="_blank" rel="noreferrer" className="p-4 rounded-2xl bg-surface-200/80 border border-slate-700/50 hover:bg-[#25D366]/10 transition-all flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full bg-surface-100 flex items-center justify-center group-hover:bg-[#25D366] transition-colors"><MessageCircle className="w-5 h-5 text-slate-300 group-hover:text-white" /></div>
                <div><div className="text-sm font-bold text-white">WhatsApp</div><div className="text-xs text-slate-400">Direct Chat</div></div>
              </a>

              <a href="https://t.me/syntaxvirtual" target="_blank" rel="noreferrer" className="p-4 rounded-2xl bg-surface-200/80 border border-slate-700/50 hover:bg-[#229ED9]/10 transition-all flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full bg-surface-100 flex items-center justify-center group-hover:bg-[#229ED9] transition-colors"><MessageCircle className="w-5 h-5 text-slate-300 group-hover:text-white" /></div>
                <div><div className="text-sm font-bold text-white">Telegram</div><div className="text-xs text-slate-400">Fast Response</div></div>
              </a>

              <button onClick={copyEmail} className="p-4 rounded-2xl bg-surface-200/80 border border-slate-700/50 hover:bg-surface-300 transition-all flex items-center gap-4 group text-left">
                <div className="w-10 h-10 rounded-full bg-surface-100 flex items-center justify-center group-hover:bg-slate-700 transition-colors"><Mail className="w-5 h-5 text-slate-300 group-hover:text-white" /></div>
                <div><div className="text-sm font-bold text-white">Email Us</div><div className="text-xs text-slate-400">contact@syntaxvirtual.com</div></div>
              </button>

              <button onClick={onOpenBooking} className="p-4 rounded-2xl bg-gradient-to-r from-accent-purple/20 to-electric-DEFAULT/20 border border-accent-purple/30 hover:border-accent-purple/60 transition-all flex items-center gap-4 group text-left">
                <div className="w-10 h-10 rounded-full bg-accent-purple flex items-center justify-center shadow-glow-sm"><PhoneCall className="w-5 h-5 text-white" /></div>
                <div><div className="text-sm font-bold text-white">Book a Call</div><div className="text-xs text-accent-light">15-min Discovery</div></div>
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-accent-purple/20 to-transparent rounded-3xl blur-xl" />
            
            <form onSubmit={handleSubmit} className="relative p-8 rounded-3xl bg-surface-300/80 border border-slate-700/60 backdrop-blur-2xl shadow-2xl space-y-5">
              <h3 className="text-2xl font-bold text-white mb-6">Project Inquiry</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 ml-1">Name</label>
                  <input required type="text" value={formData.name} onChange={e=>setFormData({...formData, name:e.target.value})} placeholder="John Doe" className="w-full px-4 py-3 rounded-xl bg-surface-100/50 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-accent-purple transition-all" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 ml-1">Email</label>
                  <input required type="email" value={formData.email} onChange={e=>setFormData({...formData, email:e.target.value})} placeholder="john@company.com" className="w-full px-4 py-3 rounded-xl bg-surface-100/50 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-accent-purple transition-all" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 ml-1">Project Type</label>
                <select value={formData.projectType} onChange={e=>setFormData({...formData, projectType:e.target.value})} className="w-full px-4 py-3 rounded-xl bg-surface-100/50 border border-slate-700 text-sm text-white focus:outline-none focus:border-accent-purple transition-all appearance-none">
                  <option value="webapp">Custom Web Application</option>
                  <option value="ecommerce">E-commerce / Shopify Headless</option>
                  <option value="design">UI/UX Design System</option>
                  <option value="saas">SaaS MVP Development</option>
                  <option value="audit">Architecture Audit / Consulting</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 ml-1">Project Details</label>
                <textarea required rows={4} value={formData.details} onChange={e=>setFormData({...formData, details:e.target.value})} placeholder="Tell us about your timeline, budget expectations..." className="w-full px-4 py-3 rounded-xl bg-surface-100/50 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-accent-purple transition-all resize-none"></textarea>
              </div>

              <button type="submit" disabled={status !== 'idle'} className="w-full py-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-accent-purple to-electric-DEFAULT shadow-glow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-80">
                {status === 'idle' && (<><span>Send Inquiry</span><Send className="w-4 h-4" /></>)}
                {status === 'submitting' && (<span className="flex items-center gap-2"><svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Processing...</span>)}
                {status === 'success' && (<span className="flex items-center gap-2 text-emerald-100"><CheckCircle2 className="w-5 h-5 text-emerald-400" /> Received!</span>)}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
