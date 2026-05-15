import React from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
}

export function Select({ error, className = '', children, ...props }: SelectProps) {
  return (
    <div className="relative">
      <select
        className={`w-full appearance-none rounded-lg border bg-white px-4 py-2.5 pr-11 text-slate-800 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#38aae1]/30 ${
          error ? 'border-red-500' : 'border-slate-200 hover:border-[#38aae1]/50 focus:border-[#38aae1]'
        } ${className}`}
        {...props}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#25476a]/60" />
    </div>
  );
}
