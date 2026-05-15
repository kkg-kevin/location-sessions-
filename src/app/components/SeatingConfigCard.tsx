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
    <div className="bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-lg p-5 relative hover:border-[#38aae1]/30 transition-colors">
      {showDelete && (
        <button
          type="button"
          onClick={onDelete}
          className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition-colors"
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
