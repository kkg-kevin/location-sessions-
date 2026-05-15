import React from 'react';
import { Check } from 'lucide-react';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}

export function Checkbox({ checked, onChange, label }: CheckboxProps) {
  return (
    <label className={`group flex cursor-pointer items-center rounded-lg border px-3 py-2.5 transition-all ${
      checked
        ? 'border-[#38aae1]/40 bg-[#38aae1]/10'
        : 'border-slate-200 bg-white hover:border-[#38aae1]/40'
    }`}>
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
              : 'bg-white border-slate-300 group-hover:border-[#38aae1]'
          }`}
        >
          {checked && (
            <Check className="w-full h-full text-white" strokeWidth={3} />
          )}
        </div>
      </div>
      <span className="ml-3 text-sm text-slate-700">{label}</span>
    </label>
  );
}
