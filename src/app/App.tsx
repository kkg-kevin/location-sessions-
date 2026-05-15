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

  const [seatingConfigs, setSeatingConfigs] = useState<SeatingConfig[]>([
    {
      id: '1',
      name: 'Small Desk',
      minCapacity: '1',
      maxCapacity: '2',
      pricingType: 'hourly',
      amount: '300',
      notes: '',
    },
    {
      id: '2',
      name: 'Group Table',
      minCapacity: '5',
      maxCapacity: '10',
      pricingType: 'hourly',
      amount: '1500',
      notes: '',
    },
    {
      id: '3',
      name: 'Cafe Seating',
      minCapacity: '1',
      maxCapacity: '4',
      pricingType: 'free-with-purchase',
      amount: '0',
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
      minCapacity: '',
      maxCapacity: '',
      pricingType: '',
      amount: '',
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
  };

  const handleCloseOutput = () => {
    setShowOutput(false);
  };

  const handleEditVenue = () => {
    setShowOutput(false);
  };

  if (showOutput && savedVenue) {
    return <VenueOutput venue={savedVenue} onClose={handleCloseOutput} onEdit={handleEditVenue} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-[#25476a] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center gap-3">
            <Building2 className="w-8 h-8" />
            <h1 className="text-white">Add Venue / Location</h1>
          </div>
          <p className="text-gray-200 mt-2">
            Create a new venue for mentorship learning sessions
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
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
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#38aae1] transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500 mt-1">Maximum file size: 5MB</p>
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
                <label className="block text-gray-700 mb-2">Map Preview</label>
                <div className="bg-gray-100 border border-gray-300 rounded-lg h-64 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <Map className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>Map preview will appear here</p>
                    <p className="text-xs mt-1">Requires Google Maps API integration</p>
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
              <label className="block text-gray-700 mb-3">Add Custom Amenity</label>
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
                      className="px-3 py-2 bg-[#feb139]/20 text-[#25476a] rounded-lg text-sm flex items-center gap-2 border border-[#feb139]/30"
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
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
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

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
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
            title="Seating & Pricing Configurations"
            description="Define capacity tiers and pricing structures for different seating arrangements"
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
        <div className="sticky bottom-0 bg-white border-t-2 border-gray-200 shadow-xl rounded-t-xl mt-8 p-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 justify-end">
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
