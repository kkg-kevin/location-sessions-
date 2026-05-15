import React from 'react';
import { Check } from 'lucide-react';

interface AmenityChipProps {
  label: string;
  icon: React.ReactNode;
  selected: boolean;
  onClick: () => void;
}

export function AmenityChip({ label, icon, selected, onClick }: AmenityChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex items-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${
        selected
          ? 'border-[#38aae1] bg-[#38aae1]/5'
          : 'border-gray-200 hover:border-gray-300 bg-white'
      }`}
    >
      <div className={selected ? 'text-[#38aae1]' : 'text-gray-500'}>
        {icon}
      </div>
      <span className={`text-sm ${selected ? 'text-[#25476a]' : 'text-gray-700'}`}>
        {label}
      </span>
      {selected && (
        <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#38aae1] rounded-full flex items-center justify-center">
          <Check className="w-3 h-3 text-white" strokeWidth={3} />
        </div>
      )}
    </button>
  );
}
