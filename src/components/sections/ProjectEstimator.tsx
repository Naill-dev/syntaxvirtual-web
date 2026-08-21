import React, { useState } from 'react';
import { Calculator, Check, ArrowRight, Sparkles, Sliders, Shield, Zap } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';
import { sanitizeInput } from '../../lib/sanitize';
import toast from 'react-hot-toast';

interface ProjectEstimatorProps {
  onApplyEstimate: (summary: string) => void;
}

export const ProjectEstimator: React.FC<ProjectEstimatorProps> = ({ onApplyEstimate }) => {
  const [projectType, setProjectType] = useState<'webapp' | 'ecommerce' | 'website' | 'uiux' | 'saas'>('webapp');
  const [speed, setSpeed] = useState<'standard' | 'rush'>('standard');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(['seo', 'auth', 'responsive']);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const projectTypes = [
    { id: 'webapp', label: 'Custom Web Application', baseCost: 4500, time: '3-5 Weeks' },
    { id: 'ecommerce', label: 'Headless E-commerce Platform', baseCost: 5500, time: '4-6 Weeks' },
    { id: 'website', label: 'High-Impact Brand Experience', baseCost: 3200, time: '2-3 Weeks' },
    { id: 'uiux', label: 'Bespoke UI/UX Design System', baseCost: 2800, time: '2-4 Weeks' },
    { id: 'saas', label: 'Enterprise SaaS MVP Architecture', baseCost: 6800, time: '6-8 Weeks' },
  ];

  const featuresList = [
    { id: 'seo', label: '100/100 Core Web Vitals & SEO Suite', cost: 600 },
    { id: 'auth', label: 'Multi-Role Auth & Security Hardening', cost: 800 },
    { id: 'responsive', label: 'Tailwind Glassmorphic Design System', cost: 500 },
    { id: 'ai', label: 'AI LLM Workflow / Vector Search Integration', cost: 1400 },
    { id: 'realtime', label: 'Real-Time WebSockets & Telemetry', cost: 1100 },
    { id: 'payment', label: 'Stripe / Multi-Currency Global Checkout', cost: 900 },
    { id: 'cms', label: 'Headless CMS Integration', cost: 700 },
    { id: 'sla', label: '3-Month Priority SLA & Cloud Optimization', cost: 1200 },
  ];

  const toggleFeature = (id: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const currentTypeObj = projectTypes.find((p) => p.id === projectType) || projectTypes[0];
  const featuresTotal = selectedFeatures.reduce((acc, fId) => {
    const feat = featuresList.find((f) => f.id === fId);
    return acc + (feat ? feat.cost : 0);
  }, 0);

  const speedMultiplier = speed === 'rush' ? 1.25 : 1.0;
  const estimatedTotal = Math.round((currentTypeObj.baseCost + featuresTotal) * speedMultiplier);

  const handleApply = async () => {
    if (!email) {
      toast.error('Please enter your email to save the estimate.');
      return;
    }

    setIsSubmitting(true);
    
    const selectedFeatureLabels = selectedFeatures
      .map((fId) => featuresList.find((f) => f.id === fId)?.label)
      .filter(Boolean);

    const scopeData = {
      type: currentTypeObj.label,
      features: selectedFeatureLabels,
      speed
    };

    try {
      const { error } = await supabase.from('estimator_inquiries').insert([{
        email: sanitizeInput(email),
        project_scope: scopeData,
        budget_range: `$${estimatedTotal.toLocaleString()}`
      }]);

      if (error) throw error;
      
      toast.success('Estimate saved! Scroll down to Contact to continue.');
      setEmail('');
      
      const summary = `Project Scope: ${currentTypeObj.label} | Speed: ${speed === 'rush' ? 'Expedited Delivery' : 'Standard Sprint'} | Selected Features: [${selectedFeatureLabels.join(', ')}] | Estimated Tier: ~$${estimatedTotal.toLocaleString()}`;
      onApplyEstimate(summary);
      
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    } catch (err: any) {
      console.error(err);
      toast.error('Failed to save estimate.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="estimator" className="relative py-24 lg:py-32 overflow-hidden border-t border-slate-800/80">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-accent-purple/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-200 border border-slate-800 text-xs font-mono text-accent-lavender uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5 text-accent-violet" />
            <span>Interactive Scope Builder</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Calculate Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-light via-electric-light to-white">
              Project Investment.
            </span>
          </h2>
          <p className="text-base text-slate-300">
            Tailor your requirements and receive an instant transparent scope and estimated timeline.
          </p>
        </div>

        {/* Interactive Estimator Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-8 bg-surface-300/80 p-6 sm:p-8 rounded-3xl border border-slate-800/90 backdrop-blur-xl shadow-glass">
            {/* Step 1: Project Type */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                1. Select Primary Deliverable
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {projectTypes.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setProjectType(type.id as any)}
                    className={`p-4 rounded-xl text-left border transition-all flex flex-col justify-between ${
                      projectType === type.id
                        ? 'border-accent-purple bg-accent-purple/15 shadow-glow-sm'
                        : 'border-slate-800 bg-surface-200/60 hover:bg-surface-200 hover:border-slate-700'
                    }`}
                  >
                    <div className="font-semibold text-sm text-white mb-1">
                      {type.label}
                    </div>
                    <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                      <span>{type.time}</span>
                      <span className="text-accent-lavender">From ${type.baseCost}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Architecture & Capabilities */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                2. Select Features & Infrastructure Add-ons
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {featuresList.map((feat) => {
                  const isChecked = selectedFeatures.includes(feat.id);
                  return (
                    <div
                      key={feat.id}
                      onClick={() => toggleFeature(feat.id)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between text-xs select-none ${
                        isChecked
                          ? 'border-accent-purple/60 bg-accent-purple/10 text-white'
                          : 'border-slate-800 bg-surface-200/40 text-slate-300 hover:bg-surface-200/80'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center border ${
                            isChecked
                              ? 'bg-accent-purple border-accent-purple text-white'
                              : 'border-slate-700 bg-surface-100'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className="font-medium">{feat.label}</span>
                      </div>
                      <span className="font-mono text-[11px] text-slate-400 ml-2">
                        +${feat.cost}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Turnaround Velocity */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                3. Delivery Velocity
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSpeed('standard')}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    speed === 'standard'
                      ? 'border-accent-purple bg-accent-purple/15 text-white'
                      : 'border-slate-800 bg-surface-200/60 text-slate-400 hover:bg-surface-200'
                  }`}
                >
                  <div className="text-xs font-bold text-white mb-0.5">Standard Agile Sprint</div>
                  <div className="text-[11px] text-slate-400 font-mono">Regular sprint delivery cadence</div>
                </button>
                <button
                  type="button"
                  onClick={() => setSpeed('rush')}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    speed === 'rush'
                      ? 'border-electric-DEFAULT bg-electric-DEFAULT/15 text-white'
                      : 'border-slate-800 bg-surface-200/60 text-slate-400 hover:bg-surface-200'
                  }`}
                >
                  <div className="text-xs font-bold text-white mb-0.5 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-electric-light" />
                    Expedited Velocity
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">Priority queue & fast-track launch</div>
                </button>
              </div>
            </div>
          </div>

          {/* Real-Time Summary Column */}
          <div className="lg:col-span-5 sticky top-28 bg-surface-200/90 border border-slate-700/60 rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-glow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
                Scope Summary
              </span>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
                Live Estimate
              </span>
            </div>

            {/* Selected Spec List */}
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-400">Selected Type:</span>
                <span className="font-semibold text-white">{currentTypeObj.label}</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-400">Estimated Timeline:</span>
                <span className="font-semibold text-white font-mono">{currentTypeObj.time}</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-400">Selected Add-ons:</span>
                <span className="font-semibold text-accent-light font-mono">{selectedFeatures.length} Features</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-400">Delivery Mode:</span>
                <span className="font-semibold text-white capitalize">{speed}</span>
              </div>
            </div>

            {/* Estimated Total Price Box */}
            <div className="p-5 rounded-2xl bg-[#060919]/90 border border-slate-800 text-center space-y-1">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Estimated Investment Tier
              </div>
              <div className="text-4xl font-extrabold font-mono text-white flex items-center justify-center gap-1">
                <span className="text-accent-lavender">$</span>
                <span>{estimatedTotal.toLocaleString()}</span>
              </div>
              <div className="text-[11px] text-slate-500 font-mono">
                *Final contract based on detailed technical specification & roadmap
              </div>
            </div>

            {/* Guarantee Pills */}
            <div className="space-y-2 text-xs text-slate-400 font-sans">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-accent-violet flex-shrink-0" />
                <span>100% IP & Codebase Ownership Handover</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-electric-light flex-shrink-0" />
                <span>30-Day Post-Launch Zero-Bug Guarantee</span>
              </div>
            </div>

            {/* Action Button & Inquiry Form */}
            <div className="space-y-3 pt-4 border-t border-slate-800">
              <input
                type="email"
                placeholder="Enter email to save this estimate..."
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-surface-100/50 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-accent-purple transition-all"
              />
              <button
                type="button"
                onClick={handleApply}
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-accent-purple via-accent-violet to-electric-DEFAULT hover:shadow-glow-md text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-glow-sm disabled:opacity-70"
              >
                {isSubmitting ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <>
                    <span>Save & Discuss Project</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
