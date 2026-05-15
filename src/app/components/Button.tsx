import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-[#25476a] text-white shadow-sm shadow-[#25476a]/20 hover:-translate-y-0.5 hover:bg-[#1d3752] hover:shadow-md focus:ring-[#25476a]',
    secondary: 'bg-[#feb139] text-[#25476a] shadow-sm shadow-[#feb139]/30 hover:-translate-y-0.5 hover:bg-[#fda61f] hover:shadow-md focus:ring-[#feb139]',
    outline: 'bg-white text-[#25476a] border border-[#25476a]/25 hover:-translate-y-0.5 hover:border-[#38aae1] hover:bg-[#38aae1]/5 focus:ring-[#38aae1]',
    danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-2.5',
    lg: 'px-8 py-3',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
