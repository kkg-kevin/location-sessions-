import React from 'react';
import { Check } from 'lucide-react';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}

export function Checkbox({ checked, onChange, label }: CheckboxProps) {
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
          className={`w-5 h-5 border-2 rounded transition-all ${
            checked
              ? 'bg-[#38aae1] border-[#38aae1]'
              : 'bg-white border-gray-300 group-hover:border-gray-400'
          }`}
        >
          {checked && (
            <Check className="w-full h-full text-white" strokeWidth={3} />
          )}
        </div>
      </div>
      <span className="ml-3 text-gray-700">{label}</span>
    </label>
  );
}
