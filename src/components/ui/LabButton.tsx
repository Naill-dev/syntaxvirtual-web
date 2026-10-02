import React from 'react';
import { Beaker } from 'lucide-react';

interface LabButtonProps {
  text?: string;
  className?: string;
  icon?: React.ReactNode;
  isMobile?: boolean;
}

export const LabButton: React.FC<LabButtonProps> = ({ 
  text = "Syntax Lab", 
  className = "", 
  icon = <Beaker className="w-4 h-4" />,
  isMobile = false
}) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Basic Google Analytics / Plausible event simulation
    // if (typeof window !== 'undefined' && window.gtag) {
    //   window.gtag('event', 'click_lab_button');
    // }
  };

  if (isMobile) {
    return (
      <a
        href="https://lab.syntaxvirtual.com"
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className={`flex items-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-accent-purple/20 to-electric-cyan/20 border border-accent-purple/30 text-white font-medium hover:bg-surface-200 transition-colors ${className}`}
        aria-label="Go to SyntaxVirtual Lab"
      >
        <span className="text-electric-cyan">{icon}</span>
        {text}
      </a>
    );
  }

  return (
    <a
      href="https://lab.syntaxvirtual.com"
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={`group relative inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(124,58,237,0.5)] active:scale-95 ${className}`}
      aria-label="Go to SyntaxVirtual Lab"
    >
      {/* Background Gradient */}
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-accent-purple via-electric-DEFAULT to-accent-purple bg-[length:200%_auto] animate-shimmer" />
      
      {/* Ripple/Glow Overlay on Hover */}
      <span className="absolute inset-0 w-full h-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      {/* Content */}
      <span className="relative z-10 flex items-center gap-2 drop-shadow-md">
        <span className="animate-pulse">{icon}</span>
        {text}
      </span>
    </a>
  );
};
