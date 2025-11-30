// IndiaPatientsHeatmap.jsx
import React from "react";

const TOTAL_CENTERS = 128;

const formatNumber = (num) =>
  num.toLocaleString("en-IN", { maximumFractionDigits: 0 });

// Broad region stats (no map pointers)
const REGIONS = [
  { id: "north", label: "North India", centers: 26 },
  { id: "central", label: "Central India", centers: 22 },
  { id: "south", label: "South India", centers: 30 },
  { id: "west", label: "West India", centers: 20 },
  { id: "east", label: "East India", centers: 18 },
  { id: "ne", label: "North‑East India", centers: 12 },
];

// Key city stats
const KEY_CITIES = [
  { name: "Nagpur", centers: 4 },
  { name: "Dehradun", centers: 1 },
  { name: "Mumbai", centers: 7 },
  { name: "Pune", centers: 5 },
  { name: "Delhi", centers: 6 },
  { name: "Bengaluru", centers: 6 },
];

const IndiaPatientsHeatmap = () => {
  return (
    <section className="w-full bg-white py-8 flex justify-center">
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-6 px-4">
        {/* Top stat card */}
        <div className="rounded-xl bg-[#1E4B3C] text-white px-8 py-4 shadow text-center">
          <p className="text-2xl font-semibold">
            {formatNumber(TOTAL_CENTERS)}
          </p>
          <p className="mt-1 text-sm font-medium">
            Total Panchakarma Centers in India
          </p>
        </div>

        {/* Map + region grid (compact) */}
        <div className="grid gap-4 md:grid-cols-3 items-stretch">
          {/* Map */}
          <div className="md:col-span-2 rounded-2xl overflow-hidden shadow bg-white flex items-center justify-center h-72">
            <img
              src="https://wallpapers.com/images/hd/india-political-map-colorful-9mzk3n5nu99kvif0.jpg"
              alt="India map"
              className="max-h-full max-w-full object-contain block"
            />
          </div>

          {/* Regions summary */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 flex flex-col">
            <p className="text-sm font-semibold text-slate-900 mb-2">
              Regional distribution
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {REGIONS.map((region) => (
                <div
                  key={region.id}
                  className="rounded-lg bg-white border border-slate-200 px-2 py-2"
                >
                  <p className="font-semibold text-slate-800">
                    {region.label}
                  </p>
                  <p className="text-[11px] text-slate-600">
                    {region.centers} centers
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Key cities stats row */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 shadow-sm">
          <p className="text-sm font-semibold text-slate-900 mb-2">
            Key city coverage
          </p>
          <div className="grid gap-2 sm:grid-cols-3 md:grid-cols-6 text-center text-xs">
            {KEY_CITIES.map((city) => (
              <div
                key={city.name}
                className="rounded-lg bg-white border border-slate-200 px-2 py-2"
              >
                <p className="font-semibold text-slate-800">{city.name}</p>
                <p className="text-sm font-bold text-slate-900">
                  {city.centers}
                </p>
                <p className="text-[11px] text-slate-600">centers</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndiaPatientsHeatmap;
