import React, { useEffect, useState } from "react";

const themeColor = "#1e4b3c";

export default function InsightsOverlay({ open, onClose, todayData }) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (open) {
      setTimeout(() => setAnimate(true), 20); // trigger animation after mount
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      
      {/* BACKDROP */}
      <div
        className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-500 ${
          animate ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* CARD */}
      <div
        className={`
          relative bg-white rounded-2xl shadow-xl p-8 w-[90%] md:w-[600px]
          transition-all duration-500 transform 
          ${animate ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"}
        `}
        style={{ animation: "fadeSlideUp 0.5s ease-out" }}
      >
        {/* Title */}
        <h2
          className="text-3xl font-extrabold mb-4 text-center"
          style={{ color: themeColor }}
        >
          Today’s Wellness Insights
        </h2>

        {/* Rows */}
        <div className="space-y-3 mt-6">
          {[
            { label: "Hydration", value: `${todayData.water?.glasses || 0}/${todayData.water?.target || 8} glasses` },
            { label: "Mood", value: todayData.mood?.mood || "Not logged" },
            { label: "Sleep", value: `${todayData.sleep?.hours || 0} hrs` },
            { label: "Activity", value: `${todayData.activity?.steps || 0} steps` },
            { label: "Symptom Level", value: todayData.symptom?.severity || 0 },
            { label: "Medication", value: todayData.medication?.taken ? "Taken" : "Pending" }
          ].map((row, index) => (
            <AnimatedRow
              key={index}
              label={row.label}
              value={row.value}
              delay={index * 0.08}
            />
          ))}
        </div>

        {/* Button */}
        <button
          onClick={onClose}
          className="mt-8 w-full py-3 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-md"
          style={{ backgroundColor: themeColor }}
        >
          Continue
        </button>
      </div>

      {/* KEYFRAME ANIMATIONS */}
      <style>
        {`
          @keyframes fadeSlideUp {
            from { opacity: 0; transform: translateY(15px) scale(0.95); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }

          @keyframes slideUp {
            from { opacity: 0; transform: translateY(12px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
}

/* ANIMATED ROW */
function AnimatedRow({ label, value, delay }) {
  return (
    <div
      className="flex justify-between border-b pb-2"
      style={{
        animation: `slideUp 0.5s ease-out forwards`,
        animationDelay: `${delay}s`,
        opacity: 0
      }}
    >
      <p className="font-medium text-gray-700">{label}</p>
      <p className="text-gray-600">{value}</p>
    </div>
  );
}
