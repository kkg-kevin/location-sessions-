import React from 'react';

interface SectionCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function SectionCard({ title, description, children }: SectionCardProps) {
  return (
    <section className="overflow-hidden rounded-xl border border-[#25476a]/10 bg-white shadow-sm shadow-[#25476a]/5 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#25476a]/10">
      <div className="h-1.5 bg-gradient-to-r from-[#25476a] via-[#38aae1] to-[#feb139]" />
      <div className="p-5 sm:p-6">
        <div className="mb-6 border-b border-slate-100 pb-4">
          <h2 className="text-[#25476a]">{title}</h2>
          {description && (
            <p className="mt-1 text-sm text-slate-500">{description}</p>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}
