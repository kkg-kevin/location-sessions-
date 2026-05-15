import React from 'react';
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Clock,
  Calendar,
  DollarSign,
  CheckCircle2,
  FileText,
  User,
  Globe,
  AlertCircle,
  Users,
  X,
  Download,
  Share2,
  Edit,
} from 'lucide-react';
import { Button } from './Button';

export interface VenueData {
  basicInfo: {
    venueName: string;
    venueType: string;
    description: string;
    photos: string[];
  };
  location: {
    address: string;
    landmark: string;
    googleMapsLink: string;
  };
  contact: {
    personName: string;
    email: string;
    phone: string;
  };
  operational: {
    openingTime: string;
    closingTime: string;
    availableDays: string[];
  };
  amenities: string[];
  policies: {
    purchaseRequired: boolean;
    minSpend?: string;
    policyDescription?: string;
    reservationRequired: boolean;
    maxSessionDuration: string;
    specialNotes: string;
  };
  seatingConfigs: Array<{
    id: string;
    name: string;
    minCapacity: string;
    maxCapacity: string;
    pricingType: string;
    amount: string;
    notes: string;
  }>;
  status: 'draft' | 'published';
  savedAt: string;
}

interface VenueOutputProps {
  venue: VenueData;
  onClose: () => void;
  onEdit: () => void;
}

export function VenueOutput({ venue, onClose, onEdit }: VenueOutputProps) {
  const formatTime = (time: string) => {
    if (!time) return 'Not set';
    return time;
  };

  const getPricingTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      hourly: 'Hourly',
      fixed: 'Fixed Session',
      'free-with-purchase': 'Free with Purchase',
    };
    return labels[type] || type;
  };

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
    return labels[type] || type;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#25476a]/70 backdrop-blur-sm">
      <div className="min-h-screen px-4 py-8">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl shadow-[#25476a]/30">
          {/* Header */}
          <div className="relative bg-gradient-to-r from-[#25476a] to-[#38aae1] p-6 text-white sm:p-8">
            <div className="absolute inset-x-0 bottom-0 h-1 bg-[#feb139]" />
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  {venue.status === 'draft' ? (
                    <span className="px-3 py-1 bg-[#feb139] text-[#25476a] rounded-full text-sm font-medium">
                      Draft
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-green-500 text-white rounded-full text-sm font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      Published
                    </span>
                  )}
                  <span className="text-sm text-white/75">
                    Saved on {new Date(venue.savedAt).toLocaleString()}
                  </span>
                </div>
                <h1 className="text-white text-3xl mb-2">{venue.basicInfo.venueName}</h1>
                <div className="flex items-center gap-2 text-gray-100">
                  <Building2 className="w-5 h-5" />
                  <span>{getVenueTypeLabel(venue.basicInfo.venueType)}</span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="rounded-lg p-2 text-white transition-colors hover:bg-white/20"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex items-center justify-between border-b border-[#25476a]/10 bg-[#25476a]/[0.03] px-5 py-4 sm:px-8">
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" size="sm" onClick={onEdit}>
                <Edit className="w-4 h-4 mr-2" />
                Edit Venue
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8 p-5 sm:p-8">
            {/* Basic Information */}
            <section>
              <h2 className="text-[#25476a] mb-4 flex items-center gap-2">
                <Building2 className="w-6 h-6" />
                Basic Information
              </h2>
              <div className="space-y-4 rounded-xl border border-slate-200 bg-slate-50 p-6">
                <div>
                  <label className="text-sm text-gray-600 block mb-1">Description</label>
                  <p className="text-gray-800">
                    {venue.basicInfo.description || 'No description provided'}
                  </p>
                </div>
                {venue.basicInfo.photos.length > 0 && (
                  <div>
                    <label className="text-sm text-gray-600 block mb-2">Photos</label>
                    <div className="flex gap-2">
                      {venue.basicInfo.photos.map((photo, idx) => (
                        <div
                          key={idx}
                          className="w-20 h-20 bg-gray-200 rounded border border-gray-300"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Location & Contact - Side by Side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Location */}
              <section>
                <h2 className="text-[#25476a] mb-4 flex items-center gap-2">
                  <MapPin className="w-6 h-6" />
                  Location
                </h2>
                <div className="space-y-3 rounded-xl border border-[#38aae1]/20 bg-gradient-to-br from-[#38aae1]/5 to-[#38aae1]/10 p-6">
                  <div>
                    <label className="text-sm text-gray-600 block mb-1">Address</label>
                    <p className="text-gray-800">{venue.location.address || 'Not provided'}</p>
                  </div>
                  {venue.location.landmark && (
                    <div>
                      <label className="text-sm text-gray-600 block mb-1">Landmark</label>
                      <p className="text-gray-800">{venue.location.landmark}</p>
                    </div>
                  )}
                  {venue.location.googleMapsLink && (
                    <div>
                      <label className="text-sm text-gray-600 block mb-1">Google Maps</label>
                      <a
                        href={venue.location.googleMapsLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#38aae1] hover:underline flex items-center gap-1"
                      >
                        <Globe className="w-4 h-4" />
                        View on Maps
                      </a>
                    </div>
                  )}
                </div>
              </section>

              {/* Contact */}
              <section>
                <h2 className="text-[#25476a] mb-4 flex items-center gap-2">
                  <User className="w-6 h-6" />
                  Contact Information
                </h2>
                <div className="space-y-3 rounded-xl border border-[#feb139]/20 bg-gradient-to-br from-[#feb139]/5 to-[#feb139]/10 p-6">
                  <div>
                    <label className="text-sm text-gray-600 block mb-1">Contact Person</label>
                    <p className="text-gray-800">{venue.contact.personName || 'Not provided'}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 block mb-1">Email</label>
                    <a
                      href={`mailto:${venue.contact.email}`}
                      className="text-[#25476a] hover:underline flex items-center gap-2"
                    >
                      <Mail className="w-4 h-4" />
                      {venue.contact.email || 'Not provided'}
                    </a>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 block mb-1">Phone</label>
                    <a
                      href={`tel:${venue.contact.phone}`}
                      className="text-[#25476a] hover:underline flex items-center gap-2"
                    >
                      <Phone className="w-4 h-4" />
                      {venue.contact.phone || 'Not provided'}
                    </a>
                  </div>
                </div>
              </section>
            </div>

            {/* Operational Information */}
            <section>
              <h2 className="text-[#25476a] mb-4 flex items-center gap-2">
                <Clock className="w-6 h-6" />
                Operational Hours
              </h2>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <div>
                    <label className="text-sm text-gray-600 block mb-1">Opening Time</label>
                    <p className="text-gray-800 text-lg">{formatTime(venue.operational.openingTime)}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 block mb-1">Closing Time</label>
                    <p className="text-gray-800 text-lg">{formatTime(venue.operational.closingTime)}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-600 block mb-2">Available Days</label>
                  <div className="flex flex-wrap gap-2">
                    {venue.operational.availableDays.length > 0 ? (
                      venue.operational.availableDays.map((day) => (
                        <span
                          key={day}
                          className="px-3 py-1 bg-[#38aae1] text-white rounded-full text-sm"
                        >
                          {day}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500 text-sm">No days selected</span>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* Amenities */}
            <section>
              <h2 className="text-[#25476a] mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6" />
                Amenities & Facilities
              </h2>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
                {venue.amenities.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {venue.amenities.map((amenity) => (
                      <span
                        key={amenity}
                        className="px-4 py-2 bg-white border-2 border-[#38aae1] text-[#25476a] rounded-lg text-sm flex items-center gap-2"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#38aae1]" />
                        {amenity}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No amenities selected</p>
                )}
              </div>
            </section>

            {/* Policies */}
            <section>
              <h2 className="text-[#25476a] mb-4 flex items-center gap-2">
                <FileText className="w-6 h-6" />
                Venue Policies
              </h2>
              <div className="space-y-4">
                {venue.policies.purchaseRequired && (
                  <div className="bg-[#feb139]/10 border-l-4 border-[#feb139] rounded-lg p-5">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-[#feb139] mt-0.5" />
                      <div className="flex-1">
                        <h3 className="text-[#25476a] mb-2">Purchase Required</h3>
                        {venue.policies.minSpend && (
                          <p className="text-gray-700 mb-1">
                            Minimum Spend: <strong>KES {venue.policies.minSpend}</strong>
                          </p>
                        )}
                        {venue.policies.policyDescription && (
                          <p className="text-gray-600 text-sm">{venue.policies.policyDescription}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {venue.policies.reservationRequired && (
                  <div className="bg-[#38aae1]/10 border-l-4 border-[#38aae1] rounded-lg p-5">
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-[#38aae1] mt-0.5" />
                      <div>
                        <h3 className="text-[#25476a]">Reservation Required</h3>
                        <p className="text-gray-600 text-sm">Prior booking is mandatory for this venue</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="bg-gray-50 rounded-lg p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-600 block mb-1">Max Session Duration</label>
                    <p className="text-gray-800">
                      {venue.policies.maxSessionDuration
                        ? `${venue.policies.maxSessionDuration} hour(s)`
                        : 'Unlimited'}
                    </p>
                  </div>
                  {venue.policies.specialNotes && (
                    <div>
                      <label className="text-sm text-gray-600 block mb-1">Special Notes</label>
                      <p className="text-gray-800">{venue.policies.specialNotes}</p>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Seating Configurations */}
            <section>
              <h2 className="text-[#25476a] mb-4 flex items-center gap-2">
                <Users className="w-6 h-6" />
                Seating & Pricing Configurations
              </h2>
              <div className="space-y-4">
                {venue.seatingConfigs.map((config, index) => (
                  <div
                    key={config.id}
                    className="rounded-xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 transition-all hover:border-[#38aae1]/40 hover:shadow-md hover:shadow-[#25476a]/10"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-[#25476a] text-lg">{config.name || `Configuration ${index + 1}`}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="px-3 py-1 bg-[#feb139]/20 text-[#25476a] rounded-full text-sm">
                            {getPricingTypeLabel(config.pricingType)}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-semibold text-[#25476a]">
                          {config.pricingType === 'free-with-purchase' ? (
                            'Free*'
                          ) : (
                            <>KES {config.amount || '0'}</>
                          )}
                        </div>
                        {config.pricingType === 'hourly' && (
                          <div className="text-sm text-gray-600">per hour</div>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="text-xs text-gray-600 block mb-1">Min Capacity</label>
                        <div className="flex items-center gap-1 text-gray-800">
                          <Users className="w-4 h-4" />
                          <span>{config.minCapacity || '0'}</span>
                        </div>
                      </div>
                      <div>
                        <label className="text-xs text-gray-600 block mb-1">Max Capacity</label>
                        <div className="flex items-center gap-1 text-gray-800">
                          <Users className="w-4 h-4" />
                          <span>{config.maxCapacity || '0'}</span>
                        </div>
                      </div>
                    </div>

                    {config.notes && (
                      <div className="rounded-lg border border-slate-200 bg-white p-3">
                        <label className="text-xs text-gray-600 block mb-1">Notes</label>
                        <p className="text-gray-700 text-sm">{config.notes}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Footer */}
          <div className="border-t border-[#25476a]/10 bg-[#25476a]/[0.03] px-5 py-6 sm:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-gray-600">
                This venue configuration can be edited at any time
              </p>
              <div className="flex gap-3">
                <Button variant="outline" onClick={onClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={onEdit}>
                  Edit Venue
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
