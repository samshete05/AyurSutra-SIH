import React, { useRef, useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
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
      border: 3px solid #22c55e;
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
  { id: 1, name: "Ayushakti Panchakarma Center", location: "Andheri, Mumbai", coords: [19.1197, 72.8468], visitors: 240, rating: 4.7, age: "7Y", photo: images[2] },
  { id: 2, name: "Kerala Ayurveda Kendra", location: "Vile Parle, Mumbai", coords: [19.1003, 72.8424], visitors: 200, rating: 4.6, age: "5Y", photo: images[3] },
  { id: 3, name: "Aatreya Ayurveda Clinic", location: "Hadapsar, Pune", coords: [18.5089, 73.9260], visitors: 260, rating: 4.9, age: "9Y", photo: images[1] },
  { id: 4, name: "Vishwamrut Ayurveda", location: "Kothrud, Pune", coords: [18.5074, 73.8077], visitors: 190, rating: 4.7, age: "6Y", photo: images[3] },
  { id: 5, name: "Prakruti Wellness Center", location: "Dharampeth, Nagpur", coords: [21.1453, 79.0704], visitors: 175, rating: 4.5, age: "5Y", photo: images[4] },
  { id: 6, name: "Jeevansparsh Panchakarma", location: "Manish Nagar, Nagpur", coords: [21.1001, 79.0841], visitors: 210, rating: 4.8, age: "8Y", photo: images[0] },
  { id: 7, name: "Niramaya Ayurveda", location: "CIDCO, Aurangabad", coords: [19.9011, 75.3521], visitors: 160, rating: 4.4, age: "4Y", photo: images[1] },
  { id: 8, name: "AyurvedGram Wellness", location: "Samarth Nagar, Aurangabad", coords: [19.8909, 75.3392], visitors: 180, rating: 4.6, age: "6Y", photo: images[3] },
  { id: 9, name: "Aayushcare Panchakarma Center", location: "Solapur City", coords: [17.6599, 75.9064], visitors: 150, rating: 4.5, age: "5Y", photo: images[0] },
  { id: 10, name: "Shree Ayurvedic Chikitsalaya", location: "Kolhapur", coords: [16.7050, 74.2433], visitors: 110, rating: 4.4, age: "4Y", photo: images[4] },
];

const DashboardMap = () => {
  const mapRef = useRef(null);
  const [userLocation, setUserLocation] = useState(null);

  // User live location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation([pos.coords.latitude, pos.coords.longitude]);
      },
      () => alert("Enable location for distance calculation.")
    );
  }, []);

  return (
    <>
    <Navbar/>
    <div className="w-full flex justify-center py-10">
      <div className="w-[95%] max-w-6xl rounded-3xl bg-slate-100 shadow-xl p-4 relative">

        {/* MAP */}
        <div className="relative rounded-3xl overflow-hidden shadow-lg h-[550px] z-0">
          <MapContainer
            center={[19.7515, 75.7139]} // Maharashtra center
            zoom={7}
            className="h-full w-full"
            whenCreated={(m) => (mapRef.current = m)}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {/* USER LOCATION */}
            {userLocation && (
              <Marker
                position={userLocation}
                icon={L.divIcon({
                  html: `
                    <div class='marker-wrapper animate-pulse' style='border:3px solid #3b82f6;'>
                      <img src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png" class="marker-img" />
                    </div>`,
                  className: "",
                  iconSize: [60, 60],
                  iconAnchor: [30, 30],
                })}
              />
            )}

            {/* CENTER MARKERS */}
            {centers.map((c) => (
              <Marker key={c.id} position={c.coords} icon={createCustomIcon(c.photo)}>
                <Popup className="!p-0 !bg-transparent !shadow-none">
                  <div className="rounded-3xl bg-white/90 backdrop-blur-xl p-6 shadow-xl border border-white/40 w-80 animate-popup relative">

                    {/* Title */}
                    <h2 className="text-xl font-semibold text-slate-900">{c.name}</h2>
                    <p className="text-sm text-slate-600 mt-1">📍 {c.location}</p>

                    {/* Distance */}
                    {userLocation ? (
                      <p className="text-sm text-orange-500 font-bold mt-2">
                        Distance:{" "}
                        {calcDistance(
                          userLocation[0],
                          userLocation[1],
                          c.coords[0],
                          c.coords[1]
                        )}{" "}
                        km
                      </p>
                    ) : (
                      <p className="text-xs text-gray-400 mt-2">(Enable location to view distance)</p>
                    )}

                    {/* Divider */}
                    <div className="my-4 h-px bg-slate-200" />

                    {/* Stats */}
                    <div className="grid grid-cols-3 text-center">
                      <div>
                        <p className="text-[11px] uppercase text-slate-500">Age</p>
                        <p className="text-lg font-semibold">{c.age}</p>
                      </div>
                      <div>
                        <p className="text-[11px] uppercase text-slate-500">Visitors</p>
                        <p className="text-lg font-semibold">{c.visitors}</p>
                      </div>
                      <div>
                        <p className="text-[11px] uppercase text-slate-500">Rating</p>
                        <p className="text-lg font-semibold text-amber-500">⭐ {c.rating}</p>
                      </div>
                    </div>

                    {/* CTA */}
                    <button className="mt-5 w-full py-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium shadow">
                      View Details
                    </button>

                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

      </div>
    </div>
    <Footer/>
    </>
  );
};

export default DashboardMap;
