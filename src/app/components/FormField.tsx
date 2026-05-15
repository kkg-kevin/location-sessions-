import React from 'react';

interface FormFieldProps {
  label: string;
  required?: boolean;
  helper?: string;
  children: React.ReactNode;
}

export function FormField({ label, required, helper, children }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-[#25476a]">
        {label}
        {required && <span className="ml-1 text-[#feb139]">*</span>}
      </label>
      {children}
      {helper && (
        <p className="text-xs text-slate-500">{helper}</p>
      )}
    </div>
  );
}
