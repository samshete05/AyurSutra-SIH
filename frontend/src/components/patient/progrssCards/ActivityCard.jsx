import React, { useState } from "react";

const themeColor = "#1e4b3c";

const levels = [
  { id: "sedentary", label: "Sedentary", icon: "🪑", color: "#94a3b8" },
  { id: "light", label: "Light", icon: "🚶", color: "#60a5fa" },
  { id: "moderate", label: "Moderate", icon: "🏃", color: "#34d399" },
  { id: "active", label: "Active", icon: "🏋️", color: "#fbbf24" },
  { id: "very_active", label: "Very Active", icon: "🔥", color: "#f87171" },
];

function ActivityCard({ data, refresh }) {
  const [steps, setSteps] = useState(data?.steps || 0);
  const [minutes, setMinutes] = useState(data?.exerciseMinutes || 0);
  const [level, setLevel] = useState(data?.activityLevel || "sedentary");
  const [saving, setSaving] = useState(false);

  const handleUpdate = async () => {
    setSaving(true);
    const token = localStorage.getItem("authToken");
    try {
      const res = await fetch("http://localhost:3000/patient/progress/updateActivity", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ steps, exerciseMinutes: minutes, activityLevel: level }),
      });
      const result = await res.json();
      console.log("Activity Update:", result);
      refresh();
    } catch (err) {
      console.error("Activity update failed:", err);
    } finally {
      setSaving(false);
    }
  };

  const currentLevel = levels.find((l) => l.id === level);

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-green-100 overflow-hidden group">
      {/* Card Header */}
      <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 border-b border-orange-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
              🏃
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Activity</h3>
              <p className="text-xs text-gray-500">Daily movement</p>
            </div>
          </div>
          <div
            className="px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1"
            style={{ backgroundColor: currentLevel.color + "20", color: currentLevel.color }}
          >
            {currentLevel.icon} {currentLevel.label}
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6">
        {/* Steps Counter */}
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Steps Today</p>
          <div className="relative">
            <input
              type="number"
              value={steps}
              onChange={(e) => setSteps(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none text-lg font-semibold text-center transition-colors duration-200"
              placeholder="0"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
              steps
            </span>
          </div>
        </div>

        {/* Exercise Minutes */}
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Exercise Duration</p>
          <div className="relative">
            <input
              type="number"
              value={minutes}
              onChange={(e) => setMinutes(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none text-lg font-semibold text-center transition-colors duration-200"
              placeholder="0"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
              mins
            </span>
          </div>
        </div>

        {/* Activity Level Pills */}
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-700 mb-3">Activity Level</p>
          <div className="grid grid-cols-3 gap-2">
            {levels.map((lvl) => (
              <button
                key={lvl.id}
                onClick={() => setLevel(lvl.id)}
                className={`p-2 rounded-xl text-xs font-medium transition-all duration-300 flex flex-col items-center gap-1 ${
                  level === lvl.id
                    ? "scale-105 shadow-md"
                    : "opacity-60 hover:opacity-100"
                }`}
                style={{
                  backgroundColor: level === lvl.id ? lvl.color + "20" : "#f3f4f6",
                  color: level === lvl.id ? lvl.color : "#6b7280",
                  border: level === lvl.id ? `2px solid ${lvl.color}` : "2px solid transparent",
                }}
              >
                <span className="text-lg">{lvl.icon}</span>
                <span className="text-[10px]">{lvl.label}</span>
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
          {saving ? "Updating..." : "Save Activity"}
        </button>
      </div>
    </div>
  );
}

export default ActivityCard;