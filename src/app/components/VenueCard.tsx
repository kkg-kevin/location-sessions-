import {
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  MapPin,
  Pencil,
  Users,
} from 'lucide-react';
import { Button } from './Button';
import type { VenueData } from './VenueOutput';

interface VenueCardProps {
  venue: VenueData;
  onClick: () => void;
  onEdit?: () => void;
}

export function VenueCard({ venue, onClick, onEdit }: VenueCardProps) {
  const getVenueTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      cafe: 'Cafe',
      coworking: 'Coworking Space',
      library: 'Library',
      restaurant: 'Restaurant',
      office: 'Office Space',
      training: 'Training Center',
      other: 'Other',
    };
    return labels[type] || 'Venue';
  };

  const getPriceSummary = () => {
    if (venue.seatingConfigs.some((config) => config.pricingType === 'custom-quote')) {
      return 'Custom quote available';
    }

    const paidConfigs = venue.seatingConfigs
      .filter((config) => config.amount && Number(config.amount) > 0)
      .map((config) => Number(config.amount));

    if (paidConfigs.length === 0) {
      const freeWithPurchase = venue.seatingConfigs.find(
        (config) => config.pricingType === 'free-with-purchase'
      );

      if (freeWithPurchase?.minimumSpend) {
        return `Min spend KES ${Number(freeWithPurchase.minimumSpend).toLocaleString()}`;
      }

      return freeWithPurchase ? 'Free with purchase' : 'Pricing not set';
    }

    return `From KES ${Math.min(...paidConfigs).toLocaleString()}`;
  };

  const getCapacitySummary = () => {
    const minValues = venue.seatingConfigs
      .map((config) => Number(config.minCapacity))
      .filter((value) => value > 0);
    const maxValues = venue.seatingConfigs
      .map((config) => Number(config.maxCapacity))
      .filter((value) => value > 0);

    if (minValues.length === 0 && maxValues.length === 0) {
      return 'Capacity not set';
    }

    const min = minValues.length > 0 ? Math.min(...minValues) : 1;
    const max = maxValues.length > 0 ? Math.max(...maxValues) : min;
    return `${min}-${max} learners`;
  };

  const visibleAmenities = venue.amenities.slice(0, 3);
  const hiddenAmenityCount = Math.max(venue.amenities.length - visibleAmenities.length, 0);
  const availableDays = venue.operational.availableDays.slice(0, 3);
  const hiddenDayCount = Math.max(
    venue.operational.availableDays.length - availableDays.length,
    0
  );

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onClick();
        }
      }}
      className="group overflow-hidden rounded-xl border border-[#25476a]/10 bg-white shadow-sm shadow-[#25476a]/5 transition-all hover:-translate-y-1 hover:border-[#38aae1]/50 hover:shadow-xl hover:shadow-[#25476a]/10 focus:outline-none focus:ring-2 focus:ring-[#38aae1]/40"
    >
      <div className="h-1.5 bg-gradient-to-r from-[#25476a] via-[#38aae1] to-[#feb139]" />
      <div className="p-5">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="mb-2 flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-[#25476a]/5 px-2.5 py-1 text-xs font-medium text-[#25476a]">
                <Building2 className="h-3.5 w-3.5" />
                {getVenueTypeLabel(venue.basicInfo.venueType)}
              </span>
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                  venue.status === 'published'
                    ? 'bg-[#38aae1]/10 text-[#25476a]'
                    : 'bg-[#feb139]/20 text-[#25476a]'
                }`}
              >
                {venue.status === 'published' ? 'Published' : 'Draft'}
              </span>
            </div>
            <h3 className="truncate text-xl font-semibold text-[#25476a]">
              {venue.basicInfo.venueName || 'Untitled venue'}
            </h3>
            <div className="mt-2 flex items-start gap-2 text-sm text-slate-500">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#38aae1]" />
              <span className="line-clamp-2">
                {venue.location.address || venue.location.landmark || 'Location not provided'}
              </span>
            </div>
          </div>
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#38aae1]/10 text-[#38aae1]">
            <MapPin className="h-6 w-6" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 border-y border-slate-100 py-4 sm:grid-cols-3">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Clock className="h-4 w-4 text-[#38aae1]" />
            <span>
              {venue.operational.openingTime || 'Open'} - {venue.operational.closingTime || 'Close'}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Users className="h-4 w-4 text-[#38aae1]" />
            <span>{getCapacitySummary()}</span>
          </div>
          <div className="flex items-center gap-2 text-sm font-medium text-[#25476a]">
            <CheckCircle2 className="h-4 w-4 text-[#feb139]" />
            <span>{getPriceSummary()}</span>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          <div className="flex flex-wrap gap-2">
            {visibleAmenities.length > 0 ? (
              <>
                {visibleAmenities.map((amenity) => (
                  <span
                    key={amenity}
                    className="rounded-full border border-[#38aae1]/20 bg-[#38aae1]/5 px-2.5 py-1 text-xs text-[#25476a]"
                  >
                    {amenity}
                  </span>
                ))}
                {hiddenAmenityCount > 0 && (
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-500">
                    +{hiddenAmenityCount} more
                  </span>
                )}
              </>
            ) : (
              <span className="text-sm text-slate-500">No amenities selected</span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <Calendar className="h-4 w-4 text-[#feb139]" />
            {availableDays.length > 0 ? (
              <>
                <span>{availableDays.join(', ')}</span>
                {hiddenDayCount > 0 && <span>+{hiddenDayCount} days</span>}
              </>
            ) : (
              <span>Availability not set</span>
            )}
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-sm font-medium text-[#38aae1] transition-colors group-hover:text-[#25476a]">
            View full venue details
          </span>
          {onEdit && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={(event) => {
                event.stopPropagation();
                onEdit();
              }}
            >
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
