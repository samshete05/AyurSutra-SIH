import React, { useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Remove default Leaflet icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({});

// 🔥 Custom Marker Creator (Tailwind-friendly)
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
  
  const images = [
  "https://content3.jdmagicbox.com/v2/comp/solapur/w2/9999px217.x217.150728150300.i3w2/catalogue/dr-raghavendra-nadargi-ayurved-and-panchakarma-chikitsalaya-jodibhavi-peth-solapur-ayurvedic-doctors-klies5t1xx.jpg",
  "https://aatreyaayurved.com/wp-content/uploads/2024/07/Aatreya-Ayurveda-Panchakarma-Clinic-Hadapsar-Pune-1536x1024.jpg",
  "https://content.jdmagicbox.com/v2/comp/mumbai/b5/022pxx22.xx22.240610200154.h5b5/catalogue/kerala-ayurveda-multi-speciality-clinic-and-panchakarma-center-andheri-mumbai-clinics-g3yMeMOnHu.jpg",
  "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/07/66/46/c5/ayurshreshta-ayurvedic.jpg?w=900&h=500&s=1",
  "https://content3.jdmagicbox.com/v2/comp/palakkad/k5/9999px491.x491.221023223641.u5k5/catalogue/aayushcare-ayurveda-wellness-clinic-and-panchakarma-centre-palakkad-ayurvedic-treatment-centres-for-panchakarma-og03an8otz.jpg",
];

const centers = [
  {
    id: 1,
    name: "Ayushakti Panchakarma Center",
    location: "Andheri, Mumbai",
    coords: [19.1197, 72.8468],
    visitors: 240,
    rating: 4.7,
    age: "7Y",
    photo: images[2],
  },
  {
    id: 2,
    name: "Kerala Ayurveda Kendra",
    location: "Vile Parle, Mumbai",
    coords: [19.1003, 72.8424],
    visitors: 200,
    rating: 4.6,
    age: "5Y",
    photo: images[3],
  },
  {
    id: 3,
    name: "Aatreya Ayurveda Clinic",
    location: "Hadapsar, Pune",
    coords: [18.5089, 73.9260],
    visitors: 260,
    rating: 4.9,
    age: "9Y",
    photo: images[1],
  },
  {
    id: 4,
    name: "Vishwamrut Ayurveda",
    location: "Kothrud, Pune",
    coords: [18.5074, 73.8077],
    visitors: 190,
    rating: 4.7,
    age: "6Y",
    photo: images[3],
  },
  {
    id: 5,
    name: "Prakruti Wellness Center",
    location: "Dharampeth, Nagpur",
    coords: [21.1453, 79.0704],
    visitors: 175,
    rating: 4.5,
    age: "5Y",
    photo: images[4],
  },
  {
    id: 6,
    name: "Jeevansparsh Panchakarma",
    location: "Manish Nagar, Nagpur",
    coords: [21.1001, 79.0841],
    visitors: 210,
    rating: 4.8,
    age: "8Y",
    photo: images[0],
  },
  {
    id: 7,
    name: "Niramaya Ayurveda",
    location: "CIDCO, Aurangabad",
    coords: [19.9011, 75.3521],
    visitors: 160,
    rating: 4.4,
    age: "4Y",
    photo: images[1],
  },
  {
    id: 8,
    name: "AyurvedGram Wellness",
    location: "Samarth Nagar, Aurangabad",
    coords: [19.8909, 75.3392],
    visitors: 180,
    rating: 4.6,
    age: "6Y",
    photo: images[3],
  },
  {
    id: 9,
    name: "Aayushcare Panchakarma Center",
    location: "Solapur City, Solapur",
    coords: [17.6599, 75.9064],
    visitors: 150,
    rating: 4.5,
    age: "5Y",
    photo: images[0],
  },
  {
    id: 10,
    name: "Shree Ayurvedic Chikitsalaya",
    location: "Sadar, Kolhapur",
    coords: [16.7050, 74.2433],
    visitors: 110,
    rating: 4.4,
    age: "4Y",
    photo: images[4],
  },
  {
    id: 11,
    name: "Arogya Panchakarma Center",
    location: "Thane West, Thane",
    coords: [19.2183, 72.9781],
    visitors: 245,
    rating: 4.8,
    age: "8Y",
    photo: images[2],
  },
  {
    id: 12,
    name: "AyurLife Healing Center",
    location: "Ghodbunder Road, Thane",
    coords: [19.2659, 72.9741],
    visitors: 220,
    rating: 4.7,
    age: "7Y",
    photo: images[1],
  },
  {
    id: 13,
    name: "VedaCure Ayurveda",
    location: "Navi Mumbai",
    coords: [19.0330, 73.0297],
    visitors: 195,
    rating: 4.5,
    age: "5Y",
    photo: images[4],
  },
  {
    id: 14,
    name: "Arogyam Ayurvedic Center",
    location: "Amravati Camp, Amravati",
    coords: [20.9320, 77.7515],
    visitors: 130,
    rating: 4.3,
    age: "4Y",
    photo: images[3],
  },
  {
    id: 15,
    name: "Swasthya Panchakarma",
    location: "Akola City, Akola",
    coords: [20.7084, 77.0038],
    visitors: 140,
    rating: 4.4,
    age: "4Y",
    photo: images[1],
  },
  {
    id: 16,
    name: "Jeevan Arogya Ayurveda",
    location: "Jalgaon City, Jalgaon",
    coords: [21.0122, 75.5630],
    visitors: 160,
    rating: 4.5,
    age: "5Y",
    photo: images[2],
  },
  {
    id: 17,
    name: "Vedanta Panchakarma",
    location: "Sangli Miraj Road, Sangli",
    coords: [16.8524, 74.5815],
    visitors: 125,
    rating: 4.2,
    age: "3Y",
    photo: images[4],
  },
  {
    id: 18,
    name: "AyuWorld Wellness",
    location: "Satara City, Satara",
    coords: [17.6805, 74.0183],
    visitors: 145,
    rating: 4.4,
    age: "4Y",
    photo: images[3],
  },
  {
    id: 19,
    name: "Panchamrut Ayurveda",
    location: "Latur MIDC, Latur",
    coords: [18.4088, 76.5840],
    visitors: 155,
    rating: 4.5,
    age: "5Y",
    photo: images[0],
  },
  {
    id: 20,
    name: "Prakriti Healing Center",
    location: "Ratnagiri Coastal Road, Ratnagiri",
    coords: [16.9944, 73.3000],
    visitors: 170,
    rating: 4.6,
    age: "6Y",
    photo: images[1],
  },
];




const DashboardMap = () => {
  const mapRef = useRef(null);
  const initialCenter = [21.1458, 79.0882];

  return (
    <div className="w-full flex justify-center py-10">
      <div className="w-[95%] max-w-6xl rounded-3xl bg-slate-100 shadow-xl p-4 relative">

        {/* Top Search Bar */}
        <div className="flex gap-3 mb-4">
          <div className="flex flex-1 items-center gap-2 rounded-full bg-white px-4 py-3 shadow-md">
            <span className="text-lg">🔍</span>
            <input
              placeholder="Search Panchakarma Centers"
              className="w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
            />
          </div>

          {["City", "Distance", "Rating"].map((label) => (
            <button
              key={label}
              className="px-4 py-2 bg-white rounded-full shadow text-xs text-slate-700"
            >
              {label} ▾
            </button>
          ))}
        </div>

        {/* ---------------------- MAP ---------------------- */}
        <div className="relative rounded-3xl overflow-hidden shadow-lg h-[550px] z-0">
          <MapContainer
            center={initialCenter}
            zoom={12}
            className="h-full w-full"
            whenCreated={(m) => (mapRef.current = m)}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {/* 🔥 Custom Image Markers */}
            {centers.map((c) => (
              <Marker
                key={c.id}
                position={c.coords}
                icon={createCustomIcon(c.photo)}
              >
                {/* Popup UI */}
                <Popup className="!p-0 !bg-transparent !shadow-none">
                  <div className="rounded-3xl bg-white/90 backdrop-blur-xl p-6 shadow-xl border border-white/40 w-80 animate-popup relative">

                    {/* Close Button */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        const popup = e.target.closest(".leaflet-popup");
                        popup.style.display = "none";
                      }}
                      className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"
                    >
                      ✕
                    </button>

                    {/* Title */}
                    <h2 className="text-xl font-semibold text-slate-900">
                      {c.name}
                    </h2>

                    {/* Location */}
                    <p className="text-sm text-slate-600 mt-1 flex items-center gap-1">
                      📍 {c.location}
                    </p>

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
                        <p className="text-lg font-semibold text-amber-500">
                          ⭐ {c.rating}
                        </p>
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
  );
};

export default DashboardMap;
