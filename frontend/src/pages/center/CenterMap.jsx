import React, { useRef, useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { Search, MapPin, Navigation, Star, Calendar, Crosshair, Users, Award, Clock } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "leaflet/dist/leaflet.css";

// Remove default Leaflet icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({});

// Custom Marker Creator (round image)
const createCustomIcon = (img) =>
  L.divIcon({
    html: `
      <div class="marker-wrapper">
        <img src="${img}" class="marker-img" />
      </div>
    `,
    className: "",
    iconSize: [60, 60],
    iconAnchor: [30, 30],
  });

// CSS marker styles (inject into DOM once)
if (!document.getElementById("custom-marker-style")) {
  const style = document.createElement("style");
  style.id = "custom-marker-style";
  style.innerHTML = `
    .marker-wrapper {
      width: 60px;
      height: 60px;
      overflow: hidden;
      border-radius: 50%;
      border: 3px solid #1E4B3C;
      box-shadow: 0 4px 10px rgba(0,0,0,0.25);
      background: white;
    }
    .marker-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    @keyframes popupScale {
      0% { opacity: 0; transform: scale(0.85) translateY(10px); }
      100% { opacity: 1; transform: scale(1) translateY(0); }
    }
    .animate-popup {
      animation: popupScale 0.25s ease-out;
    }
    @keyframes pulse-ring {
      0% { transform: scale(0.8); opacity: 1; }
      100% { transform: scale(2.5); opacity: 0; }
    }
    .pulse-ring {
      animation: pulse-ring 2s cubic-bezier(0, 0, 0.2, 1) infinite;
    }
  `;
  document.head.appendChild(style);
}

// Distance calculator
const calcDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) ** 2;

  return (R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))).toFixed(2);
};

// IMAGE URLs
const images = [
  "https://content3.jdmagicbox.com/v2/comp/solapur/w2/9999px217.x217.150728150300.i3w2/catalogue/dr-raghavendra-nadargi-ayurved-and-panchakarma-chikitsalaya-jodibhavi-peth-solapur-ayurvedic-doctors-klies5t1xx.jpg",
  "https://aatreyaayurved.com/wp-content/uploads/2024/07/Aatreya-Ayurveda-Panchakarma-Clinic-Hadapsar-Pune-1536x1024.jpg",
  "https://content.jdmagicbox.com/v2/comp/mumbai/b5/022pxx22.xx22.240610200154.h5b5/catalogue/kerala-ayurveda-multi-speciality-clinic-and-panchakarma-center-andheri-mumbai-clinics-g3yMeMOnHu.jpg",
  "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/07/66/46/c5/ayurshreshta-ayurvedic.jpg?w=900&h=500&s=1",
  "https://content3.jdmagicbox.com/v2/comp/palakkad/k5/9999px491.x491.221023223641.u5k5/catalogue/aayushcare-ayurveda-wellness-clinic-and-panchakarma-centre-palakkad-ayurvedic-treatment-centres-for-panchakarma-og03an8otz.jpg",
];

// Panchakarma Centers Data
const centers = [
  { id: 1, name: "Ayushakti Panchakarma Center", location: "Andheri, Mumbai", coords: [19.1197, 72.8468], visitors: 240, rating: 4.7, age: 7, photo: images[2] },
  { id: 2, name: "Kerala Ayurveda Kendra", location: "Vile Parle, Mumbai", coords: [19.1003, 72.8424], visitors: 200, rating: 4.6, age: 5, photo: images[3] },
  { id: 3, name: "Aatreya Ayurveda Clinic", location: "Hadapsar, Pune", coords: [18.5089, 73.9260], visitors: 260, rating: 4.9, age: 9, photo: images[1] },
  { id: 4, name: "Vishwamrut Ayurveda", location: "Kothrud, Pune", coords: [18.5074, 73.8077], visitors: 190, rating: 4.7, age: 6, photo: images[3] },
  { id: 5, name: "Prakruti Wellness Center", location: "Dharampeth, Nagpur", coords: [21.1453, 79.0704], visitors: 175, rating: 4.5, age: 5, photo: images[4] },
  { id: 6, name: "Jeevansparsh Panchakarma", location: "Manish Nagar, Nagpur", coords: [21.1001, 79.0841], visitors: 210, rating: 4.8, age: 8, photo: images[0] },
  { id: 7, name: "Niramaya Ayurveda", location: "CIDCO, Aurangabad", coords: [19.9011, 75.3521], visitors: 160, rating: 4.4, age: 4, photo: images[1] },
  { id: 8, name: "AyurvedGram Wellness", location: "Samarth Nagar, Aurangabad", coords: [19.8909, 75.3392], visitors: 180, rating: 4.6, age: 6, photo: images[3] },
  { id: 9, name: "Aayushcare Panchakarma Center", location: "Solapur City", coords: [17.6599, 75.9064], visitors: 150, rating: 4.5, age: 5, photo: images[0] },
  { id: 10, name: "Shree Ayurvedic Chikitsalaya", location: "Kolhapur", coords: [16.7050, 74.2433], visitors: 110, rating: 4.4, age: 4, photo: images[4] },
    {
    id: 11,
    name: "Himalayan Bliss Ayurveda Retreat",
    location: "Rajpur Road, Near Pacific Hills, Dehradun",
    coords: [30.316302, 78.026729],
    visitors: 160, // arbitrary, adjust if needed
    rating: 4.5,
    age: 6,
    photo: "https://www.google.com/maps/place/Himalayan+Bliss+Ayurveda+Retreat/@30.323454,78.043221,17z/...",
  },
  {
    id: 12,
    name: "Tranquil Roots Wellness Center",
    location: "Nandapuri, Ramtek, Nagpur",
    coords: [21.3977, 79.3319],
    visitors: 140, // arbitrary
    rating: 4.5,
    age: 5,
    photo: "https://res.cloudinary.com/dnjeghqw0/image/upload/v1765177601/doctor_profiles/ow4u5m9hsuffugbe8yjg.avif",
  },

];

const DashboardMap = () => {
  const mapRef = useRef(null);
  const [userLocation, setUserLocation] = useState(null);
  const [isLocating, setIsLocating] = useState(false);
  
  // Filter States - All unselected by default
  const [filters, setFilters] = useState({
    search: "",
    rating: "",
    age: "",
    radius: ""
  });

  // User live location (optional on load)
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation([pos.coords.latitude, pos.coords.longitude]);
      },
      () => console.log("Location access not enabled")
    );
  }, []);

  // Current Location Button Handler with Auto Zoom
  const goToCurrentLocation = () => {
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = [pos.coords.latitude, pos.coords.longitude];
        setUserLocation(coords);
        // Auto zoom to level 13 with smooth animation
        mapRef.current?.flyTo(coords, 13, { 
          duration: 1.5,
          easeLinearity: 0.25 
        });
        setTimeout(() => setIsLocating(false), 1500);
      },
      () => {
        alert("Please enable location access in your browser settings.");
        setIsLocating(false);
      }
    );
  };

  // Filter Centers
  const filteredCenters = centers.filter((center) => {
    // Search Filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesSearch = 
        center.name.toLowerCase().includes(searchLower) ||
        center.location.toLowerCase().includes(searchLower);
      if (!matchesSearch) return false;
    }

    // Rating Filter
    if (filters.rating) {
      if (center.rating < parseFloat(filters.rating)) return false;
    }

    // Age Filter
    if (filters.age) {
      if (center.age < parseInt(filters.age)) return false;
    }

    // Radius Filter (only if user location available)
    if (filters.radius && userLocation) {
      const distance = calcDistance(
        userLocation[0],
        userLocation[1],
        center.coords[0],
        center.coords[1]
      );
      if (parseFloat(distance) > parseInt(filters.radius)) return false;
    }

    return true;
  });

  // Reset Filters
  const resetFilters = () => {
    setFilters({
      search: "",
      rating: "",
      age: "",
      radius: ""
    });
  };

  return (
    <>
      {/* <Navbar /> */}
      <div className="w-full flex justify-center py-10 bg-gradient-to-br from-emerald-50 via-white to-teal-50/30">
        <div className="w-[95%] max-w-7xl">
          
          {/* Filter Panel - Beautiful Cards */}
          <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            
            {/* Search Filter */}
            <div className="lg:col-span-2 backdrop-blur-xl bg-white/80 rounded-2xl shadow-lg border border-white/60 p-4 hover:shadow-xl transition-all">
              <label className="flex items-center gap-2 text-xs font-bold text-[#1E4B3C] uppercase tracking-wide mb-2">
                <Search className="w-4 h-4" />
                Search
              </label>
              <input
                type="text"
                placeholder="Search centers or locations..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border-2 border-emerald-100 focus:border-[#1E4B3C] focus:outline-none text-sm bg-white/90 transition-all"
              />
            </div>

            {/* Rating Filter */}
            <div className="backdrop-blur-xl bg-gradient-to-br from-amber-50/90 to-white/80 rounded-2xl shadow-lg border border-amber-100/60 p-4 hover:shadow-xl transition-all">
              <label className="flex items-center gap-2 text-xs font-bold text-[#1E4B3C] uppercase tracking-wide mb-2">
                <Star className="w-4 h-4 text-amber-500" />
                Min Rating
              </label>
              <select
                value={filters.rating}
                onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border-2 border-amber-100 focus:border-amber-500 focus:outline-none text-sm bg-white/90 font-medium transition-all cursor-pointer"
              >
                <option value="">Any Rating</option>
                <option value="4.0">4.0+</option>
                <option value="4.5">4.5+</option>
                <option value="4.8">4.8+</option>
              </select>
            </div>

            {/* Age Filter */}
            <div className="backdrop-blur-xl bg-gradient-to-br from-blue-50/90 to-white/80 rounded-2xl shadow-lg border border-blue-100/60 p-4 hover:shadow-xl transition-all">
              <label className="flex items-center gap-2 text-xs font-bold text-[#1E4B3C] uppercase tracking-wide mb-2">
                <Calendar className="w-4 h-4 text-blue-500" />
                Min Age
              </label>
              <select
                value={filters.age}
                onChange={(e) => setFilters({ ...filters, age: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border-2 border-blue-100 focus:border-blue-500 focus:outline-none text-sm bg-white/90 font-medium transition-all cursor-pointer"
              >
                <option value="">Any Age</option>
                <option value="3">3+ Years</option>
                <option value="5">5+ Years</option>
                <option value="7">7+ Years</option>
              </select>
            </div>

            {/* Radius Filter */}
            <div className="backdrop-blur-xl bg-gradient-to-br from-purple-50/90 to-white/80 rounded-2xl shadow-lg border border-purple-100/60 p-4 hover:shadow-xl transition-all">
              <label className="flex items-center gap-2 text-xs font-bold text-[#1E4B3C] uppercase tracking-wide mb-2">
                <Navigation className="w-4 h-4 text-purple-500" />
                Radius
              </label>
              <select
                value={filters.radius}
                onChange={(e) => setFilters({ ...filters, radius: e.target.value })}
                disabled={!userLocation}
                className="w-full px-4 py-2.5 rounded-xl border-2 border-purple-100 focus:border-purple-500 focus:outline-none text-sm bg-white/90 font-medium transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="">Any Distance</option>
                <option value="10">Within 10 km</option>
                <option value="25">Within 25 km</option>
                <option value="50">Within 50 km</option>
                <option value="100">Within 100 km</option>
              </select>
              {!userLocation && (
                <p className="text-[10px] text-gray-500 mt-1">Enable location to use</p>
              )}
            </div>

          </div>

          {/* Filter Actions Bar with Current Location Button */}
          <div className="mb-6 flex flex-col md:flex-row items-center justify-between gap-4 backdrop-blur-xl bg-white/70 rounded-2xl shadow-lg border border-white/60 px-6 py-4">
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-gray-600">
                Showing <span className="text-[#1E4B3C] font-bold text-lg">{filteredCenters.length}</span> of {centers.length} centers
              </span>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Current Location Button - Above Map */}
              <button
                onClick={goToCurrentLocation}
                disabled={isLocating}
                className="group relative"
              >
                <div className="relative">
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#1E4B3C] to-[#256f5a] rounded-xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
                  
                  {/* Button Content */}
                  <div className="relative backdrop-blur-xl bg-gradient-to-r from-[#1E4B3C] to-[#256f5a] rounded-xl shadow-lg border border-white/20 px-5 py-2.5 hover:scale-105 transition-all duration-300">
                    <div className="flex items-center gap-2">
                      {isLocating ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                          <span className="font-bold text-white text-sm whitespace-nowrap">Locating...</span>
                        </>
                      ) : (
                        <>
                          <Crosshair className="w-5 h-5 text-white group-hover:rotate-90 transition-transform duration-500" />
                          <span className="font-bold text-white text-sm whitespace-nowrap">Current Location</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </button>

              {/* Reset Filters Button */}
              <button
                onClick={resetFilters}
                className="px-5 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-sm font-semibold text-gray-700 transition-all hover:scale-105"
              >
                Reset Filters
              </button>
            </div>
          </div>

          {/* MAP */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[800px] bg-white border-4 border-white">
            <MapContainer
              center={[19.7515, 75.7139]}
              zoom={7}
              className="h-full w-full"
              ref={mapRef}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

              {/* USER LOCATION MARKER */}
              {userLocation && (
                <Marker
                  position={userLocation}
                  icon={L.divIcon({
                    html: `
                      <div style="position: relative;">
                        <div class="pulse-ring" style="position: absolute; width: 60px; height: 60px; border-radius: 50%; background: rgba(59, 130, 246, 0.3); top: 0; left: 0;"></div>
                        <div class='marker-wrapper animate-pulse' style='border:3px solid #3b82f6;'>
                          <img src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png" class="marker-img" />
                        </div>
                      </div>
                    `,
                    className: "",
                    iconSize: [60, 60],
                    iconAnchor: [30, 30],
                  })}
                >
                  <Popup>
                    <div className="text-center p-2">
                      <div className="flex items-center gap-2 justify-center">
                        <MapPin className="w-4 h-4 text-blue-600" />
                        <p className="font-bold text-blue-600">Your Location</p>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              )}

              {/* CENTER MARKERS */}
              {filteredCenters.map((c) => (
                <Marker key={c.id} position={c.coords} icon={createCustomIcon(c.photo)}>
                  <Popup className="!p-0 !bg-transparent !shadow-none">
                    <div className="rounded-3xl bg-white/95 backdrop-blur-xl p-6 shadow-xl border border-white/40 w-80 animate-popup relative">
                      
                      {/* Title */}
                      <h2 className="text-xl font-semibold text-slate-900">{c.name}</h2>
                      <div className="flex items-center gap-1 text-sm text-slate-600 mt-1">
                        <MapPin className="w-4 h-4" />
                        <p>{c.location}</p>
                      </div>

                      {/* Distance */}
                      {userLocation ? (
                        <div className="flex items-center gap-1 text-sm text-orange-500 font-bold mt-2">
                          <Navigation className="w-4 h-4" />
                          <p>Distance: {calcDistance(userLocation[0], userLocation[1], c.coords[0], c.coords[1])} km</p>
                        </div>
                      ) : (
                        <p className="text-xs text-gray-400 mt-2">(Enable location to view distance)</p>
                      )}

                      {/* Divider */}
                      <div className="my-4 h-px bg-slate-200" />

                      {/* Stats */}
                      <div className="grid grid-cols-3 text-center gap-2">
                        <div className="bg-blue-50 rounded-xl p-2">
                          <div className="flex items-center justify-center mb-1">
                            <Clock className="w-4 h-4 text-blue-500" />
                          </div>
                          <p className="text-[11px] uppercase text-slate-500">Age</p>
                          <p className="text-lg font-semibold text-blue-600">{c.age}Y</p>
                        </div>
                        <div className="bg-purple-50 rounded-xl p-2">
                          <div className="flex items-center justify-center mb-1">
                            <Users className="w-4 h-4 text-purple-500" />
                          </div>
                          <p className="text-[11px] uppercase text-slate-500">Visitors</p>
                          <p className="text-lg font-semibold text-purple-600">{c.visitors}</p>
                        </div>
                        <div className="bg-amber-50 rounded-xl p-2">
                          <div className="flex items-center justify-center mb-1">
                            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                          </div>
                          <p className="text-[11px] uppercase text-slate-500">Rating</p>
                          <p className="text-lg font-semibold text-amber-600">{c.rating}</p>
                        </div>
                      </div>

                      {/* CTA */}
                      <button className="mt-5 w-full py-2.5 rounded-xl bg-gradient-to-r from-[#1E4B3C] to-[#256f5a] text-white font-medium shadow hover:shadow-lg transition-all flex items-center justify-center gap-2 group">
                        <span>View Details</span>
                        <Award className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      </button>

                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>

          </div>

        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default DashboardMap;
