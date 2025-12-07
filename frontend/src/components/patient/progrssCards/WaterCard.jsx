import React, { useState } from "react";
import { Droplets } from "lucide-react";

const themeColor = "#1e4b3c";

function WaterCard({ data, refresh }) {
  const [glasses, setGlasses] = useState(data?.glasses || 0);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    try {
      setSaving(true);
      const token = localStorage.getItem("authToken");
      await fetch("http://localhost:3000/patient/progress/updateWater", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ glasses }),
      });
      refresh();
    } catch (err) {
      console.error("Water update failed:", err);
    } finally {
      setSaving(false);
    }
  };

  const percentage =
    data?.target && data.target > 0
      ? Math.min(100, Math.round((glasses / data.target) * 100))
      : 0;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all">
      {/* Header */}
      <div className="p-5 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center">
            <Droplets size={20} color={themeColor} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Water Intake
            </h3>
            <p className="text-xs text-gray-500">
              Track your daily hydration goal
            </p>
          </div>
        </div>

        <img
          src="https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=300&q=80"
          alt="Water"
          className="w-16 h-12 rounded-xl object-cover hidden sm:block"
        />
      </div>

      {/* Body */}
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Today's progress</p>
            <p className="text-xl font-semibold text-gray-800">
              {glasses} / {data?.target || 8} glasses
            </p>
          </div>

          <div className="text-right">
            <p
              className="text-sm font-medium"
              style={{ color: themeColor }}
            >
              {percentage}%
            </p>
            <p className="text-xs text-gray-500">of your target</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="number"
            min="0"
            max="40"
            value={glasses}
            onChange={(e) => setGlasses(Number(e.target.value))}
            className="w-24 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[rgba(30,75,60,0.5)]"
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setGlasses((g) => Math.max(0, g - 1))}
              className="px-3 py-2 text-xs border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              - 1
            </button>
            <button
              type="button"
              onClick={() => setGlasses((g) => g + 1)}
              className="px-3 py-2 text-xs border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              + 1
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="mt-2 inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium text-white w-full"
          style={{ backgroundColor: themeColor }}
        >
          {saving ? "Saving..." : "Save Water Intake"}
        </button>
      </div>
    </div>
  );
}

export default WaterCard;
