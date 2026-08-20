import React, { useState } from 'react';
import { servicesData } from '../../data/servicesData';
import { ServiceItem } from '../../types';
import { GlowingCard } from '../visual/GlowingCard';
import { 
  Code2, Palette, Zap, Cpu, ShoppingBag, 
  Sparkles, ShieldCheck, ArrowRight, CheckCircle2, 
  Layers, ExternalLink 
} from 'lucide-react';

interface ServicesSectionProps {
  onSelectService: (service: ServiceItem) => void;
  onOpenBooking: () => void;
}

const iconComponents: Record<string, React.ReactNode> = {
  Code2: <Code2 className="w-6 h-6 text-accent-violet" />,
  Palette: <Palette className="w-6 h-6 text-fuchsia-400" />,
  Zap: <Zap className="w-6 h-6 text-electric-light" />,
  Cpu: <Cpu className="w-6 h-6 text-indigo-400" />,
  ShoppingBag: <ShoppingBag className="w-6 h-6 text-emerald-400" />,
  Sparkles: <Sparkles className="w-6 h-6 text-amber-400" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6 text-sky-400" />,
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService, onOpenBooking }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  const categories = ['All', 'Engineering', 'Design', 'Optimization', 'Full-Stack', 'E-commerce', 'Branding', 'Operations'];

  const filteredServices = selectedFilter === 'All'
    ? servicesData
    : servicesData.filter(s => s.category === selectedFilter);

  return (
    <section id="services" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 rounded-full bg-accent-purple/10 filter blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 rounded-full bg-electric-DEFAULT/10 filter blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-200 border border-slate-800 text-xs font-mono text-accent-lavender uppercase tracking-wider">
            <span>Specialized Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Engineered for Precision,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-light to-electric-light">
              Built for Growth.
            </span>
          </h2>
          <p className="text-base text-slate-300 leading-relaxed">
            Every solution is bespoke, hand-crafted without shortcuts, and optimized for maximum speed, security, and enterprise scalability.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedFilter === cat
                    ? 'bg-accent-purple text-white shadow-glow-sm'
                    : 'bg-surface-200/80 text-slate-400 hover:text-white hover:bg-surface-100 border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredServices.map((service) => (
            <GlowingCard
              key={service.id}
              className="flex flex-col justify-between group hover:translate-y-[-4px] transition-all duration-300"
            >
              <div>
                {/* Header with Icon & Category */}
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 rounded-xl bg-surface-100/90 border border-slate-700/60 shadow-inner group-hover:scale-110 transition-transform">
                    {iconComponents[service.iconName] || <Code2 className="w-6 h-6 text-accent-violet" />}
                  </div>
                  <span className="text-[11px] font-mono uppercase px-2.5 py-1 rounded-full bg-surface-100 border border-slate-800 text-slate-400">
                    {service.category}
                  </span>
                </div>

                {/* Service Title */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent-light transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  {service.shortDesc}
                </p>

                {/* Feature Highlights */}
                <ul className="space-y-2 mb-6">
                  {service.features.slice(0, 3).map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-400">
                      <CheckCircle2 className="w-4 h-4 text-accent-violet flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card Footer: Metric & Modal Button */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div className="text-xs font-mono text-emerald-400 font-medium">
                  {service.metrics}
                </div>
                <button
                  onClick={() => onSelectService(service)}
                  className="flex items-center gap-1 text-xs font-semibold text-accent-light hover:text-white group/btn transition-colors"
                >
                  <span>Explore Scope</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </GlowingCard>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-surface-200 via-surface-300 to-surface-200 border border-slate-800/90 shadow-glass flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h4 className="text-lg font-bold text-white mb-1">
              Need a custom architecture or technical audit?
            </h4>
            <p className="text-sm text-slate-400">
              We provide comprehensive codebase audits, cloud migration strategies, and bespoke retainers.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenBooking}
              className="px-5 py-3 rounded-xl bg-accent-purple hover:bg-accent-violet text-white text-xs font-semibold shadow-glow-sm hover:shadow-glow-md transition-all whitespace-nowrap"
            >
              Book Discovery Session
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
