import React, { useState } from "react";

const themeColor = "#1e4b3c";

function WaterCard({ data, refresh }) {
  const [glasses, setGlasses] = useState(data?.glasses || 0);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);
    const token = localStorage.getItem("authToken");
    try {
      const res = await fetch("http://localhost:3000/patient/progress/updateWater", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ glasses }),
      });
      const result = await res.json();
      console.log(result);
      refresh();
    } catch (err) {
      console.error("Water update failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const progress = Math.min((glasses / (data?.target || 8)) * 100, 100);

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-green-100 overflow-hidden group">
      {/* Card Header with Icon */}
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 border-b border-blue-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
              💧
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Hydration</h3>
              <p className="text-xs text-gray-500">Stay refreshed</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold" style={{ color: themeColor }}>
              {glasses}
            </p>
            <p className="text-xs text-gray-500">of {data?.target || 8} glasses</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="relative">
          <div className="w-full h-3 bg-white rounded-full overflow-hidden shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-gray-600 mt-2 text-center">
            {Math.round(progress)}% Complete
          </p>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6">
        <div className="flex items-center justify-center gap-4 mb-4">
          <button
            onClick={() => setGlasses(Math.max(0, glasses - 1))}
            className="w-12 h-12 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xl transition-colors duration-200 flex items-center justify-center shadow-sm"
          >
            −
          </button>
          <div className="px-6 py-3 bg-green-50 rounded-xl border-2 border-green-200">
            <p className="text-3xl font-bold text-center" style={{ color: themeColor }}>
              {glasses}
            </p>
          </div>
          <button
            onClick={() => setGlasses(glasses + 1)}
            className="w-12 h-12 rounded-xl text-white font-bold text-xl transition-colors duration-200 flex items-center justify-center shadow-md hover:shadow-lg"
            style={{ backgroundColor: themeColor }}
          >
            +
          </button>
        </div>

        <button
          onClick={handleUpdate}
          disabled={loading}
          className="w-full py-3 rounded-xl font-semibold text-white transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ backgroundColor: themeColor }}
        >
          {loading ? "Updating..." : "Update Progress"}
        </button>
      </div>
    </div>
  );
}

export default WaterCard;
