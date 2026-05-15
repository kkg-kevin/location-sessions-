import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export function Textarea({ error, className = '', ...props }: TextareaProps) {
  return (
    <textarea
      className={`w-full resize-none rounded-lg border bg-white px-4 py-2.5 text-slate-800 shadow-sm transition-all placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#38aae1]/30 ${
        error ? 'border-red-500' : 'border-slate-200 hover:border-[#38aae1]/50 focus:border-[#38aae1]'
      } ${className}`}
      rows={4}
      {...props}
    />
  );
}
