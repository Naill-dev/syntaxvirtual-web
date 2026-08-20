import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Sparkles, Code2, PhoneCall } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['hero', 'services', 'portfolio', 'estimator', 'about', 'process', 'blog', 'testimonials', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Work', href: '#portfolio' },
    { label: 'Estimator', href: '#estimator' },
    { label: 'About', href: '#about' },
    { label: 'Process', href: '#process' },
    { label: 'Insights', href: '#blog' },
    { label: 'Reviews', href: '#testimonials' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-surface-300/85 backdrop-blur-xl border-b border-slate-800/80 shadow-glass py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#hero" className="flex items-center gap-3 group focus:outline-none">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-accent-purple to-electric-DEFAULT p-0.5 shadow-glow-sm group-hover:shadow-glow-md transition-all">
            <div className="w-full h-full bg-[#0A0F2C] rounded-[10px] flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 text-accent-lavender group-hover:scale-110 transition-transform duration-300"
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
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-lg tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:via-accent-light group-hover:to-electric-light transition-all">
                Syntax<span className="text-accent-violet">Virtual</span>
              </span>
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
              Crafting Digital Excellence
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1 bg-surface-200/60 border border-slate-800/80 px-4 py-1.5 rounded-full backdrop-blur-md">
          {navLinks.map((link) => {
            const sectionId = link.href.replace('#', '');
            const isActive = activeSection === sectionId;
            return (
              <a
                key={link.label}
                href={link.href}
                className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                  isActive
                    ? 'text-white bg-accent-purple/20 border border-accent-purple/40 shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Action CTAs */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Availability Beacon */}
          <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Available for Q3/Q4</span>
          </div>

          <button
            onClick={onOpenBooking}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white bg-surface-100/60 hover:bg-surface-100 border border-slate-700/60 transition-all"
          >
            <PhoneCall className="w-3.5 h-3.5 text-accent-lavender" />
            <span>Book Call</span>
          </button>

          <a
            href="#contact"
            className="relative group overflow-hidden rounded-xl p-px font-medium text-xs focus:outline-none"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-accent-purple via-electric-DEFAULT to-accent-violet group-hover:opacity-100 transition-opacity" />
            <div className="relative px-4 py-2 rounded-[11px] bg-[#0B1120] group-hover:bg-opacity-80 transition-all flex items-center gap-1.5 text-white shadow-glow-sm">
              <Sparkles className="w-3.5 h-3.5 text-accent-light animate-pulse" />
              <span>Start Project</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-accent-lavender group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white bg-surface-100/60 border border-slate-800 focus:outline-none"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-800 bg-[#0B1120]/95 backdrop-blur-2xl px-6 py-6 animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-surface-100/60 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 border-t border-slate-800/80 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-2.5 rounded-xl text-xs font-medium text-center text-slate-200 bg-surface-100 border border-slate-700/60 flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-accent-lavender" />
                Schedule Discovery Call
              </button>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 rounded-xl text-xs font-medium text-center text-white bg-gradient-to-r from-accent-purple to-electric-DEFAULT shadow-glow-sm flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Start a Project
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
