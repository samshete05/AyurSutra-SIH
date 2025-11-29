import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker icon in many bundlers
const defaultIcon = new L.Icon({
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = defaultIcon;

// Small hook component to handle clicks + geolocation on the map
const LocationSelector = ({ onLocationChange }) => {
  useMapEvents({
    click(event) {
      onLocationChange({
        lat: event.latlng.lat,
        lng: event.latlng.lng,
        from: "mapClick",
      });
    },
  });

  return null;
};

const AdvancedCenterSearch = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [locationMode, setLocationMode] = useState("any"); // any | nearMe | city
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isLocating, setIsLocating] = useState(false);

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    const payload = {
      query: searchQuery.trim(),
      locationMode,
      location: selectedLocation, // {lat, lng, from}
    };

    if (onSearch) {
      onSearch(payload);
    } else {
      console.log("Center search payload:", payload);
    }
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          from: "geolocation",
        };
        setSelectedLocation(coords);
        setLocationMode("nearMe");
        setIsLocating(false);
        setIsMapOpen(true);
      },
      (error) => {
        console.error("Error getting location:", error);
        alert("Could not get current location. Please allow location access.");
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleMapLocationChange = (coords) => {
    setSelectedLocation(coords);
    setLocationMode("city");
  };

  const mapCenter = selectedLocation || { lat: 20.5937, lng: 78.9629 }; // India center

  return (
    <section className="bg-emerald-50/40 py-6 px-4">
      <div className="mx-auto max-w-5xl rounded-3xl bg-white shadow-lg border border-emerald-100 p-4 md:p-6">
        <h2 className="text-lg md:text-xl font-bold text-[#1E4B3C] mb-3">
          Find a Panchakarma Center
        </h2>

        {/* Search + filters row */}
        <form
          onSubmit={handleSearchSubmit}
          className="flex flex-col gap-3 md:flex-row md:items-center"
        >
          {/* Main search input */}
          <div className="flex-1">
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Search by name, city, or keyword
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-2.5 text-gray-400">
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m21 21-4.35-4.35" />
                  <circle cx="11" cy="11" r="6" />
                </svg>
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="e.g. Nagpur, Tridosha Wellness Center…"
                className="w-full rounded-full border border-gray-200 bg-gray-50 pl-9 pr-4 py-2.5 text-xs md:text-sm outline-none focus:border-[#1E4B3C] focus:bg-white focus:ring-1 focus:ring-[#1E4B3C]"
              />
            </div>
          </div>

          {/* Location mode selector */}
          <div className="md:w-60">
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Location filter
            </label>
            <select
              value={locationMode}
              onChange={(event) => setLocationMode(event.target.value)}
              className="w-full rounded-full border border-gray-200 bg-gray-50 px-3 py-2.5 text-xs md:text-sm outline-none focus:border-[#1E4B3C] focus:bg-white focus:ring-1 focus:ring-[#1E4B3C]"
            >
              <option value="any">Anywhere</option>
              <option value="nearMe">Near my location</option>
              <option value="city">Choose on map / city</option>
            </select>
          </div>

          {/* Search button */}
          <div className="md:w-32">
            <button
              type="submit"
              className="w-full rounded-full bg-[#1E4B3C] py-2.5 text-xs md:text-sm font-semibold text-white shadow-md hover:bg-emerald-800 transition-colors"
            >
              Search
            </button>
          </div>
        </form>

        {/* Location actions */}
        <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] md:text-xs text-gray-600">
          <button
            type="button"
            onClick={handleUseCurrentLocation}
            className="inline-flex items-center gap-1 rounded-full border border-emerald-200 px-3 py-1 text-[#1E4B3C] hover:bg-emerald-50"
          >
            <svg
              className="h-3.5 w-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="3" />
              <path d="M12 2v3M12 19v3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M2 12h3M19 12h3M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" />
            </svg>
            {isLocating ? "Locating…" : "Use my current location"}
          </button>

          <button
            type="button"
            onClick={() => setIsMapOpen((previous) => !previous)}
            className="inline-flex items-center gap-1 rounded-full border border-emerald-200 px-3 py-1 hover:bg-emerald-50"
          >
            <svg
              className="h-3.5 w-3.5 text-[#1E4B3C]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 6l7-3 7 3 4-2v14l-4 2-7-3-7 3V4z" />
              <path d="M10 3v13" />
              <path d="M17 6v13" />
            </svg>
            {isMapOpen ? "Hide location picker" : "Open map picker"}
          </button>

          {selectedLocation && (
            <span className="ml-auto rounded-full bg-emerald-50 px-3 py-1 text-[10px] text-emerald-900 border border-emerald-200">
              Selected: {selectedLocation.lat.toFixed(4)},{" "}
              {selectedLocation.lng.toFixed(4)}{" "}
              {selectedLocation.from === "geolocation" ? "(GPS)" : "(map)"}
            </span>
          )}
        </div>

        {/* Map picker */}
        {isMapOpen && (
          <div className="mt-4 h-64 overflow-hidden rounded-2xl border border-emerald-100">
            <MapContainer
              center={[mapCenter.lat, mapCenter.lng]}
              zoom={selectedLocation ? 13 : 5}
              scrollWheelZoom={false}
              className="h-full w-full"
            >
              <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <LocationSelector onLocationChange={handleMapLocationChange} />
              {selectedLocation && (
                <Marker
                  position={[selectedLocation.lat, selectedLocation.lng]}
                />
              )}
            </MapContainer>
          </div>
        )}
      </div>
    </section>
  );
};

export default AdvancedCenterSearch;
