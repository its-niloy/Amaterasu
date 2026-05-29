import React from 'react';

interface ToggleFieldProps {
  label: string;
  icon?: React.ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
  description?: string;
  className?: string;
}

export const ToggleField: React.FC<ToggleFieldProps> = ({ 
  label, 
  icon, 
  checked, 
  onChange, 
  description,
  className = '' 
}) => {
  return (
    <div className={`flex items-center justify-between gap-4 p-3 rounded-xl bg-black/20 border border-white/5 ${className}`}>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-slate-200 flex items-center gap-2 cursor-pointer" onClick={() => onChange(!checked)}>
          {icon && <span className="text-[#ff3e3e]">{icon}</span>}
          {label}
        </label>
        {description && <span className="text-xs text-slate-500">{description}</span>}
      </div>
      
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`
          relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent 
          transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#ff3e3e]/50 focus:ring-offset-2 focus:ring-offset-[#0a0a0a]
          ${checked ? 'bg-gradient-to-r from-[#ff3e3e] to-[#ff7a00]' : 'bg-white/10'}
        `}
      >
        <span
          className={`
            pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 
            transition duration-200 ease-in-out
            ${checked ? 'translate-x-5 shadow-[0_0_10px_rgba(255,255,255,0.5)]' : 'translate-x-0'}
          `}
        />
      </button>
    </div>
  );
};
