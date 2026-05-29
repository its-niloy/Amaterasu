import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface SectionCardProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export const SectionCard: React.FC<SectionCardProps> = ({ 
  title, 
  subtitle, 
  icon, 
  children,
  defaultOpen = true
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="glass-card rounded-2xl overflow-hidden mb-4">
      <button 
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between bg-white/5 hover:bg-white/10 transition-colors"
      >
        <div className="flex items-center gap-4">
          {icon && (
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff3e3e]/20 to-[#ff7a00]/20 flex items-center justify-center text-[#ff3e3e]">
              {icon}
            </div>
          )}
          <div className="text-left">
            <h3 className="text-lg font-bold font-outfit text-white tracking-wide">{title}</h3>
            {subtitle && <p className="text-sm text-slate-400">{subtitle}</p>}
          </div>
        </div>
        <div className="text-slate-400 p-2">
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </button>
      
      <div 
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="p-6 border-t border-white/5">
          {children}
        </div>
      </div>
    </div>
  );
};
