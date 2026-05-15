import React from 'react';
import { Trash2 } from 'lucide-react';
import { FormField } from './FormField';
import { Input } from './Input';
import { Select } from './Select';
import { Textarea } from './Textarea';

export interface SeatingConfig {
  id: string;
  name: string;
  minCapacity: string;
  maxCapacity: string;
  pricingType: string;
  amount: string;
  notes: string;
}

interface SeatingConfigCardProps {
  config: SeatingConfig;
  onChange: (config: SeatingConfig) => void;
  onDelete: () => void;
  showDelete: boolean;
}

export function SeatingConfigCard({ config, onChange, onDelete, showDelete }: SeatingConfigCardProps) {
  const updateField = (field: keyof SeatingConfig, value: string) => {
    onChange({ ...config, [field]: value });
  };

  return (
    <div className="relative rounded-xl border border-slate-200 bg-gradient-to-br from-[#25476a]/[0.03] to-white p-5 transition-all hover:border-[#38aae1]/40 hover:shadow-md hover:shadow-[#25476a]/10">
      {showDelete && (
        <button
          type="button"
          onClick={onDelete}
          className="absolute right-4 top-4 rounded-lg p-2 text-red-500 transition-colors hover:bg-red-50 hover:text-red-700"
          title="Delete configuration"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Configuration Name" required>
          <Input
            placeholder="e.g., Small Desk, Group Table"
            value={config.name}
            onChange={(e) => updateField('name', e.target.value)}
          />
        </FormField>

        <FormField label="Pricing Type" required>
          <Select
            value={config.pricingType}
            onChange={(e) => updateField('pricingType', e.target.value)}
          >
            <option value="">Select pricing type</option>
            <option value="hourly">Hourly</option>
            <option value="fixed">Fixed Session</option>
            <option value="free-with-purchase">Free with Purchase</option>
          </Select>
        </FormField>

        <FormField label="Minimum Capacity" required>
          <Input
            type="number"
            placeholder="1"
            value={config.minCapacity}
            onChange={(e) => updateField('minCapacity', e.target.value)}
          />
        </FormField>

        <FormField label="Maximum Capacity" required>
          <Input
            type="number"
            placeholder="10"
            value={config.maxCapacity}
            onChange={(e) => updateField('maxCapacity', e.target.value)}
          />
        </FormField>

        <FormField label="Amount (KES)" required>
          <Input
            type="number"
            placeholder="300"
            value={config.amount}
            onChange={(e) => updateField('amount', e.target.value)}
          />
        </FormField>
      </div>

      <div className="mt-4">
        <FormField label="Notes">
          <Textarea
            placeholder="Additional details about this configuration..."
            value={config.notes}
            onChange={(e) => updateField('notes', e.target.value)}
            rows={2}
          />
        </FormField>
      </div>
    </div>
  );
}
