import React from 'react';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}

export function Toggle({ checked, onChange, label }: ToggleProps) {
  return (
    <label className="group flex cursor-pointer items-center">
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div
          className={`block h-7 w-12 rounded-full transition-colors ${
            checked ? 'bg-[#38aae1]' : 'bg-slate-300 group-hover:bg-slate-400'
          }`}
        ></div>
        <div
          className={`absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
            checked ? 'translate-x-5' : ''
          }`}
        ></div>
      </div>
      {label && (
        <span className="ml-3 text-sm font-medium text-[#25476a]">{label}</span>
      )}
    </label>
  );
}
