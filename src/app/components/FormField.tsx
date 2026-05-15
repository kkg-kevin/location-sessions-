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
      <label className="block text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
      {helper && (
        <p className="text-xs text-gray-500">{helper}</p>
      )}
    </div>
  );
}
