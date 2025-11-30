// IndiaPatientsHeatmap.jsx
import React from "react";

const TOTAL_PATIENTS = 431_528_428;
const TODAY_PATIENTS = 221_569;

const formatNumber = (num) =>
  num.toLocaleString("en-IN", { maximumFractionDigits: 0 });

// Positions are in % relative to the image container (0–100 both axes).
// Tune these so circles sit on correct cities on your indiaMap image.
const HEAT_POINTS = [
  { id: "delhi", label: "Delhi NCR", top: 13, left: 47, value: 70 },
  { id: "mumbai", label: "Mumbai", top: 55, left: 32, value: 90 },
  { id: "pune", label: "Pune", top: 58, left: 34, value: 60 },
  { id: "bengaluru", label: "Bengaluru", top: 68, left: 36, value: 75 },
  { id: "kochi", label: "Kochi", top: 79, left: 37, value: 50 },
  { id: "kolkata", label: "Kolkata", top: 38, left: 72, value: 65 },
  { id: "nagpur", label: "Nagpur", top: 50, left: 45, value: 55 },
  { id: "hyd", label: "Hyderabad", top: 60, left: 45, value: 40 },
];

const IndiaPatientsHeatmap = () => {
  const maxValue = Math.max(...HEAT_POINTS.map((p) => p.value));

  return (
    <section className="w-full min-h-screen bg-[#dfeeff] flex items-center justify-center">
      <div className="w-full max-w-md mx-auto flex flex-col items-stretch gap-6 py-8">
        {/* Top green card */}
        <div className="rounded-xl bg-green-700 text-white px-6 py-4 shadow-lg text-center">
          <p className="text-2xl font-semibold">
            {formatNumber(TOTAL_PATIENTS)}
          </p>
          <p className="mt-1 text-sm font-medium">
            Total Patients Served
          </p>
        </div>

        {/* Map with overlayed intensity circles */}
        <div className="relative w-full bg-[#dfeeff] rounded-xl overflow-hidden shadow">
          {/* Map image */}
          <img
            src="https://wallpapers.com/images/hd/india-political-map-colorful-9mzk3n5nu99kvif0.jpg"
            alt="India map"
            className="w-full h-auto block"
          />

          {/* Intensity circles */}
          {HEAT_POINTS.map((point) => {
            const size = 10 + (point.value / maxValue) * 40; // circle diameter in px
            const half = size / 2;

            return (
              <button
                key={point.id}
                type="button"
                className="absolute rounded-full border-2 border-orange-400 bg-white/80 hover:bg-orange-50 transition-colors"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  top: `calc(${point.top}% - ${half}px)`,
                  left: `calc(${point.left}% - ${half}px)`,
                }}
                title={`${point.label} · intensity ${point.value}`}
              />
            );
          })}
        </div>

        {/* Bottom green card */}
        <div className="rounded-xl bg-green-700 text-white px-6 py-4 shadow-lg text-center">
          <p className="text-2xl font-semibold">
            {formatNumber(TODAY_PATIENTS)}
          </p>
          <p className="mt-1 text-sm font-medium">
            Patients Served Today
          </p>
        </div>

        {/* Last updated */}
        <div className="flex justify-end">
          <p className="text-[11px] text-slate-600">
            Last Updated:{" "}
            {new Date().toLocaleString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </div>
    </section>
  );
};

export default IndiaPatientsHeatmap;
