// file: src/components/Lab/SplitPane.tsx
import React, { useState, useRef, useEffect } from 'react';

interface SplitPaneProps {
  direction: 'horizontal' | 'vertical';
  children: [React.ReactNode, React.ReactNode];
  initialRatio?: number;
}

export const SplitPane: React.FC<SplitPaneProps> = ({ direction, children, initialRatio = 50 }) => {
  const [ratio, setRatio] = useState(initialRatio);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const isHorizontal = direction === 'horizontal';

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      
      let newRatio;
      if (isHorizontal) {
        const x = e.clientX - rect.left;
        newRatio = (x / rect.width) * 100;
      } else {
        const y = e.clientY - rect.top;
        newRatio = (y / rect.height) * 100;
      }
      
      if (newRatio > 10 && newRatio < 90) {
        setRatio(newRatio);
      }
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      document.body.style.cursor = 'default';
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isHorizontal]);

  return (
    <div 
      ref={containerRef} 
      className={`w-full h-full flex ${isHorizontal ? 'flex-row' : 'flex-col'}`}
    >
      <div style={{ [isHorizontal ? 'width' : 'height']: `${ratio}%` }} className="relative overflow-hidden">
        {children[0]}
      </div>
      
      <div 
        className={`${isHorizontal ? 'w-1.5 cursor-col-resize hover:bg-accent-purple/50' : 'h-1.5 cursor-row-resize hover:bg-accent-purple/50'} bg-slate-800/80 transition-colors z-10 flex items-center justify-center`}
        onMouseDown={(e) => {
          e.preventDefault();
          isDragging.current = true;
          document.body.style.cursor = isHorizontal ? 'col-resize' : 'row-resize';
        }}
      >
        <div className={`${isHorizontal ? 'h-8 w-0.5' : 'w-8 h-0.5'} bg-slate-600 rounded-full`} />
      </div>

      <div style={{ [isHorizontal ? 'width' : 'height']: `${100 - ratio}%` }} className="relative overflow-hidden">
        {children[1]}
      </div>
    </div>
  );
};
