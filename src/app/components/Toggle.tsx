import React from 'react';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}

export function Toggle({ checked, onChange, label }: ToggleProps) {
  return (
    <label className="flex items-center cursor-pointer group">
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div
          className={`block w-12 h-6 rounded-full transition-colors ${
            checked ? 'bg-[#38aae1]' : 'bg-gray-300'
          }`}
        ></div>
        <div
          className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${
            checked ? 'transform translate-x-6' : ''
          }`}
        ></div>
      </div>
      {label && (
        <span className="ml-3 text-gray-700">{label}</span>
      )}
    </label>
  );
}
