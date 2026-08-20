import React, { useEffect, useState } from 'react';
import { X, Calendar, Clock, Video, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setStep(1);
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#7C3AED', '#3B82F6', '#10B981']
    });
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-[#060919]/90 backdrop-blur-sm animate-in fade-in duration-200" onClick={onClose} />
      
      <div className="relative w-full max-w-md bg-surface-300 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-surface-200">
          <h3 className="text-sm font-bold text-white">Discovery Call</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-surface-100 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 1 && (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
              <div>
                <h4 className="text-lg font-bold text-white mb-2">Select a Date & Time</h4>
                <p className="text-xs text-slate-400">15-minute technical discovery session with Nail Mammadov.</p>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => setStep(2)} className="p-4 rounded-xl border border-slate-700 bg-surface-200 hover:border-accent-purple hover:bg-surface-100 transition-all text-left">
                  <Calendar className="w-5 h-5 text-accent-lavender mb-2" />
                  <div className="text-sm font-bold text-white">Tomorrow</div>
                  <div className="text-xs text-slate-400 font-mono mt-1">10:00 AM UTC</div>
                </button>
                <button onClick={() => setStep(2)} className="p-4 rounded-xl border border-slate-700 bg-surface-200 hover:border-accent-purple hover:bg-surface-100 transition-all text-left">
                  <Calendar className="w-5 h-5 text-accent-lavender mb-2" />
                  <div className="text-sm font-bold text-white">Wednesday</div>
                  <div className="text-xs text-slate-400 font-mono mt-1">2:30 PM UTC</div>
                </button>
              </div>

              <div className="p-4 rounded-xl bg-surface-100 border border-slate-800 flex items-start gap-3">
                <Video className="w-5 h-5 text-slate-400 shrink-0" />
                <p className="text-xs text-slate-400 leading-relaxed">
                  Web meet link will be provided via email immediately after booking.
                </p>
              </div>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleBook} className="space-y-5 animate-in slide-in-from-right-4 duration-300">
              <div>
                <h4 className="text-lg font-bold text-white mb-1">Your Details</h4>
                <div className="text-xs text-accent-light font-mono flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> Selected: Tomorrow, 10:00 AM UTC
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 ml-1">Full Name</label>
                <input required type="text" className="w-full px-4 py-2.5 rounded-xl bg-surface-100/50 border border-slate-700 text-sm text-white focus:border-accent-purple focus:ring-1 focus:ring-accent-purple transition-all" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 ml-1">Work Email</label>
                <input required type="email" className="w-full px-4 py-2.5 rounded-xl bg-surface-100/50 border border-slate-700 text-sm text-white focus:border-accent-purple focus:ring-1 focus:ring-accent-purple transition-all" />
              </div>

              <button type="submit" className="w-full py-3.5 rounded-xl bg-accent-purple hover:bg-accent-violet text-white text-sm font-bold shadow-glow-sm transition-all mt-4">
                Confirm Booking
              </button>
              <button type="button" onClick={() => setStep(1)} className="w-full text-xs text-slate-400 hover:text-white transition-colors">
                Back to calendar
              </button>
            </form>
          )}

          {step === 3 && (
            <div className="text-center py-8 space-y-4 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-8 h-8 text-emerald-400" />
              </div>
              <h4 className="text-2xl font-bold text-white">Booking Confirmed</h4>
              <p className="text-sm text-slate-300 max-w-xs mx-auto">
                Your discovery session is scheduled. A calendar invitation has been sent to your email.
              </p>
              <button onClick={onClose} className="mt-8 px-6 py-2.5 rounded-xl bg-surface-100 border border-slate-700 text-white text-sm font-medium hover:bg-surface-200 transition-colors">
                Close Window
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
