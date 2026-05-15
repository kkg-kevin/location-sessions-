import { useState } from 'react';
import {
  MapPin,
  Building2,
  Phone,
  Clock,
  Wifi,
  Zap,
  Laptop,
  Armchair,
  Monitor,
  Projector,
  Car,
  Droplets,
  Coffee,
  UtensilsCrossed,
  DoorClosed,
  Trees,
  Plus,
  Save,
  FileText,
  X,
  Upload,
  Map,
} from 'lucide-react';
import { SectionCard } from './components/SectionCard';
import { FormField } from './components/FormField';
import { Input } from './components/Input';
import { Textarea } from './components/Textarea';
import { Select } from './components/Select';
import { Toggle } from './components/Toggle';
import { Checkbox } from './components/Checkbox';
import { Button } from './components/Button';
import { AmenityChip } from './components/AmenityChip';
import { SeatingConfigCard, SeatingConfig } from './components/SeatingConfigCard';
import { VenueOutput, VenueData } from './components/VenueOutput';
import { VenueCard } from './components/VenueCard';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const AMENITIES = [
  { id: 'wifi', label: 'WiFi', icon: <Wifi className="w-5 h-5" /> },
  { id: 'charging', label: 'Charging Ports', icon: <Zap className="w-5 h-5" /> },
  { id: 'desks', label: 'Desks', icon: <Laptop className="w-5 h-5" /> },
  { id: 'chairs', label: 'Chairs', icon: <Armchair className="w-5 h-5" /> },
  { id: 'whiteboard', label: 'Whiteboard', icon: <Monitor className="w-5 h-5" /> },
  { id: 'projector', label: 'Projector', icon: <Projector className="w-5 h-5" /> },
  { id: 'parking', label: 'Parking', icon: <Car className="w-5 h-5" /> },
  { id: 'washrooms', label: 'Washrooms', icon: <Droplets className="w-5 h-5" /> },
  { id: 'food', label: 'Food Available', icon: <UtensilsCrossed className="w-5 h-5" /> },
  { id: 'coffee', label: 'Coffee Available', icon: <Coffee className="w-5 h-5" /> },
  { id: 'private', label: 'Private Rooms', icon: <DoorClosed className="w-5 h-5" /> },
  { id: 'outdoor', label: 'Outdoor Seating', icon: <Trees className="w-5 h-5" /> },
];

export default function App() {
  // Form state
  const [venueName, setVenueName] = useState('');
  const [venueType, setVenueType] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [googleMapsLink, setGoogleMapsLink] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [openingTime, setOpeningTime] = useState('');
  const [closingTime, setClosingTime] = useState('');
  const [minSpend, setMinSpend] = useState('');
  const [policyDescription, setPolicyDescription] = useState('');
  const [maxSessionDuration, setMaxSessionDuration] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');

  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [customAmenity, setCustomAmenity] = useState('');
  const [customAmenities, setCustomAmenities] = useState<string[]>([]);
  const [purchaseRequired, setPurchaseRequired] = useState(false);
  const [reservationRequired, setReservationRequired] = useState(false);

  const [savedVenue, setSavedVenue] = useState<VenueData | null>(null);
  const [showOutput, setShowOutput] = useState(false);
  const [showVenueDetails, setShowVenueDetails] = useState(false);

  const [seatingConfigs, setSeatingConfigs] = useState<SeatingConfig[]>([
    {
      id: '1',
      name: 'Small Desk',
      spaceType: 'desk',
      minCapacity: '1',
      maxCapacity: '2',
      pricingType: 'hourly',
      amount: '300',
      priceUnit: 'hour',
      minimumSpend: '',
      isReservable: true,
      notes: '',
    },
    {
      id: '2',
      name: 'Group Table',
      spaceType: 'table',
      minCapacity: '5',
      maxCapacity: '10',
      pricingType: 'hourly',
      amount: '1500',
      priceUnit: 'hour',
      minimumSpend: '',
      isReservable: true,
      notes: '',
    },
    {
      id: '3',
      name: 'Cafe Seating',
      spaceType: 'table',
      minCapacity: '1',
      maxCapacity: '4',
      pricingType: 'free-with-purchase',
      amount: '0',
      priceUnit: '',
      minimumSpend: '500',
      isReservable: false,
      notes: 'Coffee purchase required',
    },
  ]);

  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const toggleAmenity = (id: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const addCustomAmenity = () => {
    if (customAmenity.trim() && !customAmenities.includes(customAmenity.trim())) {
      setCustomAmenities([...customAmenities, customAmenity.trim()]);
      setCustomAmenity('');
    }
  };

  const removeCustomAmenity = (amenity: string) => {
    setCustomAmenities(customAmenities.filter((a) => a !== amenity));
  };

  const addSeatingConfig = () => {
    const newConfig: SeatingConfig = {
      id: Date.now().toString(),
      name: '',
      spaceType: '',
      minCapacity: '',
      maxCapacity: '',
      pricingType: '',
      amount: '',
      priceUnit: '',
      minimumSpend: '',
      isReservable: true,
      notes: '',
    };
    setSeatingConfigs([...seatingConfigs, newConfig]);
  };

  const updateSeatingConfig = (id: string, updatedConfig: SeatingConfig) => {
    setSeatingConfigs(
      seatingConfigs.map((config) => (config.id === id ? updatedConfig : config))
    );
  };

  const deleteSeatingConfig = (id: string) => {
    setSeatingConfigs(seatingConfigs.filter((config) => config.id !== id));
  };

  const handleSave = (status: 'draft' | 'published') => {
    const venueData: VenueData = {
      basicInfo: {
        venueName,
        venueType,
        description,
        photos: [],
      },
      location: {
        address,
        landmark,
        googleMapsLink,
      },
      contact: {
        personName: contactName,
        email,
        phone,
      },
      operational: {
        openingTime,
        closingTime,
        availableDays: selectedDays,
      },
      amenities: [
        ...selectedAmenities.map((id) => {
          const amenity = AMENITIES.find((a) => a.id === id);
          return amenity?.label || id;
        }),
        ...customAmenities,
      ],
      policies: {
        purchaseRequired,
        minSpend: purchaseRequired ? minSpend : undefined,
        policyDescription: purchaseRequired ? policyDescription : undefined,
        reservationRequired,
        maxSessionDuration,
        specialNotes,
      },
      seatingConfigs,
      status,
      savedAt: new Date().toISOString(),
    };

    setSavedVenue(venueData);
    setShowOutput(true);
    setShowVenueDetails(false);
  };

  const handleCloseOutput = () => {
    setShowVenueDetails(false);
  };

  const handleEditVenue = () => {
    setShowOutput(false);
    setShowVenueDetails(false);
  };

  if (showOutput && savedVenue) {
    return (
      <div className="min-h-screen bg-[linear-gradient(180deg,#f7fbff_0%,#eef7fb_45%,#ffffff_100%)] text-slate-800">
        <div className="relative overflow-hidden bg-[#25476a] text-white shadow-lg shadow-[#25476a]/20">
          <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-[#feb139] via-[#38aae1] to-[#feb139]" />
          <div className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:py-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm text-white/90">
                  <Building2 className="h-4 w-4 text-[#feb139]" />
                  Saved venue preview
                </div>
                <h1 className="text-3xl text-white">Venues</h1>
                <p className="mt-1 max-w-2xl text-white/75">
                  Users can scan compact venue cards and open the full venue information when
                  they need more detail.
                </p>
              </div>
              <Button variant="secondary" onClick={handleEditVenue}>
                <Plus className="mr-2 h-5 w-5" />
                Add or Edit Venue
              </Button>
            </div>
          </div>
        </div>

        <main className="mx-auto max-w-7xl px-5 py-8 sm:px-6">
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-[#25476a]">Available Venues</h2>
              <p className="text-sm text-slate-500">
                Compact cards keep the browsing view manageable as more venues are added.
              </p>
            </div>
            <span className="rounded-full bg-[#38aae1]/10 px-3 py-1 text-sm font-medium text-[#25476a]">
              1 venue saved
            </span>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <VenueCard
              venue={savedVenue}
              onClick={() => setShowVenueDetails(true)}
              onEdit={handleEditVenue}
            />
          </div>
        </main>

        {showVenueDetails && (
          <VenueOutput
            venue={savedVenue}
            onClose={handleCloseOutput}
            onEdit={handleEditVenue}
          />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f7fbff_0%,#eef7fb_45%,#ffffff_100%)] text-slate-800">
      {/* Header */}
      <div className="relative overflow-hidden bg-[#25476a] text-white shadow-lg shadow-[#25476a]/20">
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-[#feb139] via-[#38aae1] to-[#feb139]" />
        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:py-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm text-white/90">
                <MapPin className="h-4 w-4 text-[#feb139]" />
                Venue onboarding
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15">
                  <Building2 className="h-7 w-7 text-[#feb139]" />
                </div>
                <div>
                  <h1 className="text-3xl text-white">Add Venue / Location</h1>
                  <p className="mt-1 text-white/75">
                    Capture venue details for mentorship learning sessions.
                  </p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-3 lg:min-w-[520px]">
              <div className="rounded-xl border border-white/15 bg-white/10 px-4 py-3">
                <div className="flex items-center gap-2 text-white/65">
                  <Clock className="h-4 w-4 text-[#38aae1]" />
                  Schedule
                </div>
                <p className="mt-1 font-medium text-white">Hours and days</p>
              </div>
              <div className="rounded-xl border border-white/15 bg-white/10 px-4 py-3">
                <div className="flex items-center gap-2 text-white/65">
                  <Wifi className="h-4 w-4 text-[#38aae1]" />
                  Amenities
                </div>
                <p className="mt-1 font-medium text-white">Facilities and access</p>
              </div>
              <div className="rounded-xl border border-white/15 bg-white/10 px-4 py-3">
                <div className="flex items-center gap-2 text-white/65">
                  <Phone className="h-4 w-4 text-[#38aae1]" />
                  Contact
                </div>
                <p className="mt-1 font-medium text-white">Owner details</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-6">
        <div className="space-y-6">
          {/* Section 1: Basic Information */}
          <SectionCard
            title="Basic Information"
            description="Enter the fundamental details about the venue"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField label="Venue Name" required>
                <Input
                  placeholder="e.g., Artcaffe Westlands"
                  value={venueName}
                  onChange={(e) => setVenueName(e.target.value)}
                />
              </FormField>

              <FormField label="Venue Type" required>
                <Select value={venueType} onChange={(e) => setVenueType(e.target.value)}>
                  <option value="">Select venue type</option>
                  <option value="cafe">Cafe</option>
                  <option value="coworking">Coworking Space</option>
                  <option value="library">Library</option>
                  <option value="restaurant">Restaurant</option>
                  <option value="office">Office Space</option>
                  <option value="training">Training Center</option>
                  <option value="other">Other</option>
                </Select>
              </FormField>
            </div>

            <div className="mt-6">
              <FormField label="Description">
                <Textarea
                  placeholder="Describe the venue, its atmosphere, and what makes it suitable for learning sessions..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FormField>
            </div>

            <div className="mt-6">
              <FormField label="Venue Photos" helper="Upload images of the venue (JPG, PNG)">
                <div className="cursor-pointer rounded-xl border border-dashed border-[#38aae1]/50 bg-[#38aae1]/5 p-8 text-center transition-all hover:border-[#38aae1] hover:bg-[#38aae1]/10">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
                    <Upload className="h-6 w-6 text-[#38aae1]" />
                  </div>
                  <p className="font-medium text-[#25476a]">Click to upload or drag and drop</p>
                  <p className="mt-1 text-xs text-slate-500">Maximum file size: 5MB</p>
                </div>
              </FormField>
            </div>
          </SectionCard>

          {/* Section 2: Location Information */}
          <SectionCard
            title="Location Information"
            description="Provide detailed location and navigation details"
          >
            <div className="space-y-6">
              <FormField label="Physical Address" required>
                <Input
                  placeholder="e.g., Westlands Square, Ring Road Parklands"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </FormField>

              <FormField label="Landmark / Directions">
                <Input
                  placeholder="e.g., Next to Sarit Centre, opposite Shell Petrol Station"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                />
              </FormField>

              <FormField label="Google Maps Link">
                <Input
                  placeholder="https://maps.google.com/..."
                  value={googleMapsLink}
                  onChange={(e) => setGoogleMapsLink(e.target.value)}
                />
              </FormField>

              {/* Map Preview Placeholder */}
              <div className="mt-4">
                <label className="mb-2 block text-sm font-medium text-[#25476a]">Map Preview</label>
                <div className="flex h-64 items-center justify-center rounded-xl border border-[#25476a]/10 bg-[linear-gradient(135deg,rgba(56,170,225,0.12),rgba(254,177,57,0.12))]">
                  <div className="text-center text-slate-500">
                    <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm">
                      <Map className="h-7 w-7 text-[#38aae1]" />
                    </div>
                    <p className="font-medium text-[#25476a]">Map preview will appear here</p>
                    <p className="mt-1 text-xs">Requires Google Maps API integration</p>
                  </div>
                </div>
              </div>
            </div>
          </SectionCard>

          {/* Section 3: Contact Information */}
          <SectionCard
            title="Contact Information"
            description="Primary contact details for venue coordination"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField label="Contact Person Name" required>
                <Input
                  placeholder="e.g., John Doe"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                />
              </FormField>

              <FormField label="Email Address" required>
                <Input
                  type="email"
                  placeholder="contact@venue.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormField>

              <FormField label="Phone Number" required>
                <Input
                  type="tel"
                  placeholder="+254 712 345 678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </FormField>
            </div>
          </SectionCard>

          {/* Section 4: Operational Information */}
          <SectionCard
            title="Operational Information"
            description="Working hours and availability schedule"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <FormField label="Opening Time" required helper="Select time in 12-hour format">
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    type="time"
                    value={openingTime}
                    onChange={(e) => setOpeningTime(e.target.value)}
                  />
                  <Select
                    value={openingTime.includes('PM') ? 'PM' : 'AM'}
                    onChange={(e) => {
                      const time = openingTime.replace(/\s?(AM|PM)/, '');
                      setOpeningTime(`${time} ${e.target.value}`);
                    }}
                  >
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </Select>
                </div>
              </FormField>

              <FormField label="Closing Time" required helper="Select time in 12-hour format">
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    type="time"
                    value={closingTime}
                    onChange={(e) => setClosingTime(e.target.value)}
                  />
                  <Select
                    value={closingTime.includes('PM') ? 'PM' : 'AM'}
                    onChange={(e) => {
                      const time = closingTime.replace(/\s?(AM|PM)/, '');
                      setClosingTime(`${time} ${e.target.value}`);
                    }}
                  >
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </Select>
                </div>
              </FormField>
            </div>

            <FormField label="Available Days" required>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                {DAYS.map((day) => (
                  <Checkbox
                    key={day}
                    label={day}
                    checked={selectedDays.includes(day)}
                    onChange={() => toggleDay(day)}
                  />
                ))}
              </div>
            </FormField>
          </SectionCard>

          {/* Section 5: Amenities / Facilities */}
          <SectionCard
            title="Amenities / Facilities"
            description="Select all available amenities and facilities"
          >
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {AMENITIES.map((amenity) => (
                <AmenityChip
                  key={amenity.id}
                  label={amenity.label}
                  icon={amenity.icon}
                  selected={selectedAmenities.includes(amenity.id)}
                  onClick={() => toggleAmenity(amenity.id)}
                />
              ))}
            </div>

            {/* Custom Amenities */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <label className="mb-3 block text-sm font-medium text-[#25476a]">Add Custom Amenity</label>
              <div className="flex gap-3">
                <Input
                  placeholder="e.g., Standing Desks, Pet Friendly"
                  value={customAmenity}
                  onChange={(e) => setCustomAmenity(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addCustomAmenity();
                    }
                  }}
                />
                <Button type="button" variant="outline" onClick={addCustomAmenity}>
                  <Plus className="w-5 h-5 mr-2" />
                  Add
                </Button>
              </div>

              {customAmenities.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {customAmenities.map((amenity) => (
                    <span
                      key={amenity}
                      className="flex items-center gap-2 rounded-lg border border-[#feb139]/30 bg-[#feb139]/20 px-3 py-2 text-sm text-[#25476a]"
                    >
                      {amenity}
                      <button
                        type="button"
                        onClick={() => removeCustomAmenity(amenity)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </SectionCard>

          {/* Section 6: Venue Policies */}
          <SectionCard
            title="Venue Policies"
            description="Define terms, conditions, and requirements"
          >
            <div className="space-y-6">
              <div className="rounded-xl border border-[#25476a]/10 bg-[#25476a]/[0.03] p-5">
                <Toggle
                  checked={purchaseRequired}
                  onChange={setPurchaseRequired}
                  label="Purchase Required"
                />

                {purchaseRequired && (
                  <div className="mt-4 pl-2 space-y-4 border-l-4 border-[#feb139]">
                    <FormField label="Minimum Spend Amount (KES)" required>
                      <Input
                        type="number"
                        placeholder="500"
                        value={minSpend}
                        onChange={(e) => setMinSpend(e.target.value)}
                      />
                    </FormField>
                    <FormField label="Policy Description">
                      <Textarea
                        placeholder="e.g., Each learner must purchase at least one beverage"
                        rows={3}
                        value={policyDescription}
                        onChange={(e) => setPolicyDescription(e.target.value)}
                      />
                    </FormField>
                  </div>
                )}
              </div>

              <div className="rounded-xl border border-[#25476a]/10 bg-[#25476a]/[0.03] p-5">
                <Toggle
                  checked={reservationRequired}
                  onChange={setReservationRequired}
                  label="Reservation Required"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField label="Maximum Session Duration">
                  <Select
                    value={maxSessionDuration}
                    onChange={(e) => setMaxSessionDuration(e.target.value)}
                  >
                    <option value="">Select duration</option>
                    <option value="1">1 hour</option>
                    <option value="2">2 hours</option>
                    <option value="3">3 hours</option>
                    <option value="4">4 hours</option>
                    <option value="unlimited">Unlimited</option>
                  </Select>
                </FormField>

                <FormField label="Notes / Special Instructions">
                  <Input
                    placeholder="e.g., Only available after 6 PM"
                    value={specialNotes}
                    onChange={(e) => setSpecialNotes(e.target.value)}
                  />
                </FormField>
              </div>
            </div>
          </SectionCard>

          {/* Section 7: Seating & Pricing Configurations */}
          <SectionCard
            title="Spaces, Capacity & Pricing"
            description="Define each bookable seating option, its capacity, reservation rules, and pricing model"
          >
            <div className="space-y-4">
              {seatingConfigs.map((config) => (
                <SeatingConfigCard
                  key={config.id}
                  config={config}
                  onChange={(updated) => updateSeatingConfig(config.id, updated)}
                  onDelete={() => deleteSeatingConfig(config.id)}
                  showDelete={seatingConfigs.length > 1}
                />
              ))}
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={addSeatingConfig}
              className="mt-4 w-full md:w-auto"
            >
              <Plus className="w-5 h-5 mr-2 inline-block" />
              Add Configuration
            </Button>
          </SectionCard>
        </div>

        {/* Bottom Actions */}
        <div className="sticky bottom-0 mt-8 rounded-t-2xl border border-[#25476a]/10 bg-white/95 p-4 shadow-2xl shadow-[#25476a]/15 backdrop-blur sm:p-5">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 md:flex-row md:justify-end">
            <Button variant="outline" size="lg">
              <X className="w-5 h-5 mr-2 inline-block" />
              Cancel
            </Button>
            <Button variant="secondary" size="lg" onClick={() => handleSave('draft')}>
              <FileText className="w-5 h-5 mr-2 inline-block" />
              Save as Draft
            </Button>
            <Button variant="primary" size="lg" onClick={() => handleSave('published')}>
              <Save className="w-5 h-5 mr-2 inline-block" />
              Save Venue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
