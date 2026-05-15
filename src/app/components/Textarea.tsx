import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export function Textarea({ error, className = '', ...props }: TextareaProps) {
  return (
    <textarea
      className={`w-full px-4 py-2.5 border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#38aae1] focus:border-transparent resize-none ${
        error ? 'border-red-500' : 'border-gray-300'
      } ${className}`}
      rows={4}
      {...props}
    />
  );
}
