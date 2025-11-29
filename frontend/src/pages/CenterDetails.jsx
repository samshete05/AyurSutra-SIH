// src/pages/CenterDetails.jsx
import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import centers from "../data/centers"; // make sure this file exists and exports the array
import { MapPin, Phone, Clock } from "lucide-react";

const CenterDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  // find center by slug
  const center = centers.find((c) => c.slug === slug);

  // fallback if not found
  if (!center) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-xl font-semibold">Center not found</h2>
        <p className="mt-2">We couldn't find the center you're looking for.</p>
        <div className="mt-4">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 rounded-full border bg-white"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  const {
    name,
    city,
    address,
    images = [],            // array of images in centers data
    bookingAiNumber,
    customerNumber,
    openingTime,
    closingTime,
    description,
  } = center;

  // gallery state: main image
  const [mainSrc, setMainSrc] = useState(images[0] || "");

  return (
    <div className="min-h-screen bg-[#F5F7F6]">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#1E4B3C]">{name}</h1>
            <p className="text-sm text-[#1E4B3C]/80 mt-1">{city} · {address}</p>
          </div>
          <div>
            <Link to="/allcenters" className="text-sm text-[#1E4B3C] hover:underline">
              ← Back to centers
            </Link>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="rounded-2xl overflow-hidden bg-white shadow-sm">
              <img
                src={mainSrc || images[0] || "/placeholder.jpg"}
                alt={name}
                className="w-full h-96 object-cover"
              />
            </div>

            <div className="mt-3 flex gap-3">
              {images.map((src, idx) => (
                <button
                  key={idx}
                  onClick={() => setMainSrc(src)}
                  className="border rounded overflow-hidden"
                >
                  <img src={src} alt={`${name} ${idx}`} className="w-28 h-16 object-cover" />
                </button>
              ))}
            </div>

            <div className="mt-6 bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-[#1E4B3C]">About</h3>
              <p className="mt-2 text-sm text-[#1E4B3C]/80">{description}</p>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-2 text-sm text-[#1E4B3C]">
                <MapPin className="w-4 h-4" />
                <div>
                  <div className="font-semibold">{city}</div>
                  <div className="text-xs text-[#1E4B3C]/75">{address}</div>
                </div>
              </div>

              <div className="mt-4 border-t pt-4 text-sm text-[#1E4B3C]/90">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <div>
                    <div className="text-[11px] font-semibold">Customer</div>
                    <div className="font-mono text-sm">{customerNumber || "Not available"}</div>
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <div>
                    <div className="text-[11px] font-semibold">Timings</div>
                    <div className="text-sm">{openingTime} – {closingTime}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <h4 className="font-semibold text-[#1E4B3C]">Book / Contact</h4>
              <p className="mt-2 text-sm text-[#1E4B3C]/85">Call to book or for enquiries</p>
              <div className="mt-3">
                <a href={`tel:${customerNumber}`} className="block text-sm font-mono text-[#1E4B3C]">
                  {customerNumber || "Not available"}
                </a>
                {bookingAiNumber && (
                  <a href={`tel:${bookingAiNumber}`} className="block text-sm font-mono text-[#1E4B3C]/90 mt-2">
                    AI Agent: {bookingAiNumber}
                  </a>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CenterDetails;
