import React from 'react';
import { AlertCircle, Tag, Trash2, Users } from 'lucide-react';
import { FormField } from './FormField';
import { Input } from './Input';
import { Select } from './Select';
import { Textarea } from './Textarea';
import { Toggle } from './Toggle';

export interface SeatingConfig {
  id: string;
  name: string;
  spaceType: string;
  minCapacity: string;
  maxCapacity: string;
  pricingType: string;
  amount: string;
  priceUnit: string;
  minimumSpend: string;
  isReservable: boolean;
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

  const updateReservable = (value: boolean) => {
    onChange({ ...config, isReservable: value });
  };

  const updatePricingType = (pricingType: string) => {
    onChange({
      ...config,
      pricingType,
      amount: pricingType === 'free-with-purchase' ? '0' : config.amount,
      priceUnit: getDefaultPriceUnit(pricingType, config.priceUnit),
    });
  };

  const getDefaultPriceUnit = (pricingType: string, currentUnit: string) => {
    if (pricingType === 'hourly') return 'hour';
    if (pricingType === 'per-person') return 'person';
    if (pricingType === 'half-day') return 'half-day';
    if (pricingType === 'full-day') return 'day';
    if (pricingType === 'fixed') return 'session';
    return currentUnit;
  };

  const getAmountLabel = () => {
    const labels: Record<string, string> = {
      hourly: 'Hourly Rate (KES)',
      'per-person': 'Price per Person (KES)',
      fixed: 'Session Price (KES)',
      'half-day': 'Half-Day Price (KES)',
      'full-day': 'Full-Day Price (KES)',
    };
    return labels[config.pricingType] || 'Amount (KES)';
  };

  const isPaidPricing =
    config.pricingType &&
    config.pricingType !== 'free-with-purchase' &&
    config.pricingType !== 'custom-quote';
  const minCapacity = Number(config.minCapacity);
  const maxCapacity = Number(config.maxCapacity);
  const hasCapacityError =
    config.minCapacity !== '' &&
    config.maxCapacity !== '' &&
    minCapacity > 0 &&
    maxCapacity > 0 &&
    maxCapacity < minCapacity;
  const hasAmountError = Boolean(isPaidPricing && config.amount && Number(config.amount) < 0);

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

      <div className="mb-5 flex flex-col gap-3 border-b border-slate-100 pb-4 pr-12 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-[#25476a]">{config.name || 'New space option'}</h3>
          <p className="text-sm text-slate-500">
            {config.minCapacity || 'Min'}-{config.maxCapacity || 'Max'} learners
            {config.pricingType ? ` - ${getAmountLabel().replace(' (KES)', '')}` : ''}
          </p>
        </div>
        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#38aae1]/10 px-3 py-1 text-xs font-medium text-[#25476a]">
          <Tag className="h-3.5 w-3.5 text-[#38aae1]" />
          Bookable option
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormField label="Space / Seating Name" required>
          <Input
            placeholder="e.g., Small Desk, Boardroom"
            value={config.name}
            onChange={(e) => updateField('name', e.target.value)}
          />
        </FormField>

        <FormField label="Space Type" required>
          <Select
            value={config.spaceType}
            onChange={(e) => updateField('spaceType', e.target.value)}
          >
            <option value="">Select space type</option>
            <option value="desk">Desk</option>
            <option value="table">Table</option>
            <option value="room">Private Room</option>
            <option value="open-area">Open Area</option>
            <option value="outdoor">Outdoor Space</option>
            <option value="other">Other</option>
          </Select>
        </FormField>

        <FormField label="Minimum Capacity" required>
          <Input
            type="number"
            min="1"
            placeholder="1"
            value={config.minCapacity}
            error={hasCapacityError}
            onChange={(e) => updateField('minCapacity', e.target.value)}
          />
        </FormField>

        <FormField label="Maximum Capacity" required>
          <Input
            type="number"
            min="1"
            placeholder="10"
            value={config.maxCapacity}
            error={hasCapacityError}
            onChange={(e) => updateField('maxCapacity', e.target.value)}
          />
        </FormField>
      </div>

      {hasCapacityError && (
        <div className="mt-3 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          <AlertCircle className="h-4 w-4" />
          Maximum capacity should be greater than or equal to minimum capacity.
        </div>
      )}

      <div className="mt-5 rounded-xl border border-[#25476a]/10 bg-white p-4">
        <div className="mb-4 flex items-center gap-2 text-sm font-medium text-[#25476a]">
          <Users className="h-4 w-4 text-[#38aae1]" />
          Pricing details
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField label="Pricing Model" required>
            <Select
              value={config.pricingType}
              onChange={(e) => updatePricingType(e.target.value)}
            >
              <option value="">Select pricing model</option>
              <option value="hourly">Hourly</option>
              <option value="per-person">Per Person</option>
              <option value="fixed">Fixed Session</option>
              <option value="half-day">Half Day</option>
              <option value="full-day">Full Day</option>
              <option value="free-with-purchase">Free with Purchase</option>
              <option value="custom-quote">Custom Quote</option>
            </Select>
          </FormField>

        {isPaidPricing && (
          <>
            <FormField label={getAmountLabel()} required>
              <Input
                type="number"
                min="0"
                placeholder="300"
                value={config.amount}
                error={hasAmountError}
                onChange={(e) => updateField('amount', e.target.value)}
              />
            </FormField>

            <FormField label="Price Unit">
              <Select
                value={config.priceUnit}
                onChange={(e) => updateField('priceUnit', e.target.value)}
              >
                <option value="">Select price unit</option>
                <option value="hour">Per hour</option>
                <option value="person">Per person</option>
                <option value="session">Per session</option>
                <option value="half-day">Per half day</option>
                <option value="day">Per day</option>
              </Select>
            </FormField>
          </>
        )}

        {config.pricingType === 'free-with-purchase' && (
          <FormField
            label="Minimum Spend / Purchase (KES)"
            helper="Optional. Use this when learners need to buy food, drinks, or services."
          >
            <Input
              type="number"
              min="0"
              placeholder="500"
              value={config.minimumSpend}
              onChange={(e) => updateField('minimumSpend', e.target.value)}
            />
          </FormField>
        )}

        {config.pricingType === 'custom-quote' && (
          <div className="rounded-lg border border-[#feb139]/30 bg-[#feb139]/10 px-3 py-2 text-sm text-[#25476a]">
            Custom quote hides the amount field. Add booking or pricing instructions in notes.
          </div>
        )}
        </div>

        {hasAmountError && (
          <div className="mt-3 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            <AlertCircle className="h-4 w-4" />
            Amount cannot be negative.
          </div>
        )}
      </div>

      <div className="mt-4 rounded-xl border border-[#25476a]/10 bg-[#25476a]/[0.03] p-4">
        <Toggle
          checked={config.isReservable}
          onChange={updateReservable}
          label="This option can be reserved"
        />
      </div>

      <div className="mt-4">
        <FormField label="Notes">
          <Textarea
            placeholder="e.g., Good for quiet study, includes sockets, booking instructions..."
            value={config.notes}
            onChange={(e) => updateField('notes', e.target.value)}
            rows={2}
          />
        </FormField>
      </div>
    </div>
  );
}
