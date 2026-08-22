import React, { useState, useEffect } from 'react';
import { Send, Check, ArrowUp, Code2, Users, MessageSquare, MessageCircle, Mail } from 'lucide-react';
import { FaLinkedin, FaInstagram, FaGithub, FaDiscord } from 'react-icons/fa';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [siteSettings, setSiteSettings] = useState<{ logo_url?: string; site_name?: string } | null>(null);

  useEffect(() => {
    import('../../lib/supabaseClient').then(({ supabase }) => {
      supabase
        .from('site_settings')
        .select('logo_url, site_name')
        .eq('id', 'global')
        .single()
        .then(({ data }) => setSiteSettings(data || null));
    });
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 4000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-slate-800/80 bg-[#060919] text-slate-400">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-purple/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          <div className="lg:col-span-2 space-y-6">
            {siteSettings?.logo_url ? (
              <img
                src={siteSettings.logo_url}
                alt={siteSettings.site_name || "SyntaxVirtual Logo"}
                className="h-[85px] sm:h-[105px] w-auto object-contain drop-shadow-[0_0_8px_rgba(124,58,237,0.3)]"
              />
            ) : (
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-accent-purple to-electric-DEFAULT p-0.5 shadow-glow-sm">
                  <div className="w-full h-full bg-[#0A0F2C] rounded-[10px] flex items-center justify-center">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-5 h-5 text-accent-lavender"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polygon points="12 2 2 7 12 12 22 7 12 2" />
                      <polyline points="2 17 12 22 22 17" />
                      <polyline points="2 12 12 17 22 12" />
                    </svg>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-xl tracking-tight text-white">
                    Syntax<span className="text-accent-violet">Virtual</span>
                  </span>
                  <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
                    Crafting Digital Excellence
                  </span>
                </div>
              </div>
            )}

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Official web development and digital solutions studio founded by{' '}
              <span className="text-white font-medium">Nail Mammadov</span>. Engineering bespoke high-performance web applications, scalable platforms, and luxury design systems for forward-thinking brands.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>All Systems 100% Operational</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-200 font-semibold">
              Capabilities
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#services" className="hover:text-white transition-colors">Web Development</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">UI/UX Design Systems</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">SEO & Edge Performance</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Custom Web Applications</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">E-commerce Solutions</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Maintenance & 24/7 SLA</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-200 font-semibold">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#portfolio" className="hover:text-white transition-colors">Selected Case Studies</a></li>
              <li><a href="#estimator" className="hover:text-white transition-colors">Project Cost Estimator</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">Why SyntaxVirtual</a></li>
              <li><a href="#process" className="hover:text-white transition-colors">Engineering Roadmap</a></li>
              <li><a href="#blog" className="hover:text-white transition-colors">Technical Insights</a></li>
              <li><a href="#testimonials" className="hover:text-white transition-colors">Client Testimonials</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-200 font-semibold">
              Stay Informed
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Subscribe to technical essays by Nail Mammadov on web performance, architecture, and design.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-100/80 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-accent-purple transition-all"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-3 rounded-lg bg-accent-purple hover:bg-accent-violet text-white text-xs flex items-center justify-center transition-all"
                >
                  {subscribed ? <Check className="w-3.5 h-3.5" /> : <Send className="w-3.5 h-3.5" />}
                </button>
              </div>
              {subscribed && (
                <p className="text-xs text-emerald-400 flex items-center gap-1 font-mono">
                  <Check className="w-3 h-3" /> Subscribed successfully!
                </p>
              )}
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-slate-500">
            © {new Date().getFullYear()} <span className="text-slate-300 font-medium">SyntaxVirtual</span>. All rights reserved. Founded & Architected by{' '}
            <span className="text-slate-200 font-medium">Nail Mammadov</span>.
          </p>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 text-slate-400">
              <a
                href="https://www.linkedin.com/in/nail-məmmədov"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
                title="LinkedIn"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/nail.coding"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
                title="Instagram"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/Naill-dev"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
                title="GitHub"
              >
                <FaGithub className="w-5 h-5" />
              </a>
              <a
                href="https://discord.com/users/synt4x777"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
                title="Discord"
              >
                <FaDiscord className="w-5 h-5" />
              </a>
            </div>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-surface-100/80 hover:bg-surface-100 border border-slate-800 text-slate-400 hover:text-white transition-colors"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
