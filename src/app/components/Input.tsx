import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export function Input({ error, className = '', ...props }: InputProps) {
  return (
    <input
      className={`w-full px-4 py-2.5 border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#38aae1] focus:border-transparent ${
        error ? 'border-red-500' : 'border-gray-300'
      } ${className}`}
      {...props}
    />
  );
}
