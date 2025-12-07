import React, { useState } from "react";

const themeColor = "#1e4b3c";

function SleepCard({ data, refresh }) {
  const [hours, setHours] = useState(data?.hours || 0);
  const [quality, setQuality] = useState(data?.quality || 3);
  const [saving, setSaving] = useState(false);

  const handleUpdate = async () => {
    setSaving(true);
    const token = localStorage.getItem("authToken");
    try {
      const res = await fetch("http://localhost:3000/patient/progress/updateSleep", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ hours, quality }),
      });
      const result = await res.json();
      console.log("Sleep Update:", result);
      refresh();
    } catch (err) {
      console.error("Sleep update failed:", err);
    } finally {
      setSaving(false);
    }
  };

  const qualityLabels = ["Poor", "Fair", "Good", "Very Good", "Excellent"];
  const qualityColors = ["#ef4444", "#f97316", "#eab308", "#84cc16", "#22c55e"];

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-green-100 overflow-hidden group">
      {/* Card Header */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 border-b border-indigo-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
              😴
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Sleep Quality</h3>
              <p className="text-xs text-gray-500">Rest & recovery</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold" style={{ color: themeColor }}>
              {hours}h
            </p>
            <p className="text-xs text-gray-500">Tonight</p>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6">
        {/* Hours Input */}
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-700 mb-3">Sleep Duration</p>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setHours(Math.max(0, hours - 0.5))}
              className="w-12 h-12 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xl transition-colors duration-200 flex items-center justify-center shadow-sm"
            >
              −
            </button>
            <div className="px-6 py-3 bg-indigo-50 rounded-xl border-2 border-indigo-200 min-w-[100px]">
              <p className="text-3xl font-bold text-center" style={{ color: themeColor }}>
                {hours}h
              </p>
            </div>
            <button
              onClick={() => setHours(hours + 0.5)}
              className="w-12 h-12 rounded-xl text-white font-bold text-xl transition-colors duration-200 flex items-center justify-center shadow-md hover:shadow-lg"
              style={{ backgroundColor: themeColor }}
            >
              +
            </button>
          </div>
        </div>

        {/* Quality Stars */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <p className="text-sm font-medium text-gray-700">Sleep Quality</p>
            <span
              className="text-xs font-semibold px-3 py-1 rounded-lg text-white"
              style={{ backgroundColor: qualityColors[quality - 1] }}
            >
              {qualityLabels[quality - 1]}
            </span>
          </div>
          <div className="flex justify-between gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setQuality(star)}
                className={`flex-1 p-3 rounded-xl text-2xl transition-all duration-300 ${
                  quality >= star
                    ? "scale-110 shadow-md"
                    : "opacity-40 hover:opacity-70"
                }`}
                style={{
                  backgroundColor: quality >= star ? qualityColors[star - 1] + "20" : "#f3f4f6",
                }}
              >
                ⭐
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleUpdate}
          disabled={saving}
          className="w-full py-3 rounded-xl font-semibold text-white transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50"
          style={{ backgroundColor: themeColor }}
        >
          {saving ? "Saving..." : "Log Sleep"}
        </button>
      </div>
    </div>
  );
}

export default SleepCard;
