import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export function Input({ error, className = '', ...props }: InputProps) {
  return (
    <input
      className={`w-full rounded-lg border bg-white px-4 py-2.5 text-slate-800 shadow-sm transition-all placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#38aae1]/30 ${
        error ? 'border-red-500' : 'border-slate-200 hover:border-[#38aae1]/50 focus:border-[#38aae1]'
      } ${className}`}
      {...props}
    />
  );
}
