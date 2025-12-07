import React, { useState } from "react";
import { Activity as ActivityIcon } from "lucide-react";

const themeColor = "#1e4b3c";

const levels = [
  { id: "sedentary", label: "Sedentary" },
  { id: "light", label: "Light" },
  { id: "moderate", label: "Moderate" },
  { id: "active", label: "Active" },
  { id: "very_active", label: "Very active" },
];

function ActivityCard({ data, refresh }) {
  const [steps, setSteps] = useState(data?.steps || 0);
  const [minutes, setMinutes] = useState(data?.exerciseMinutes || 0);
  const [level, setLevel] = useState(data?.activityLevel || "sedentary");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    try {
      setSaving(true);
      const token = localStorage.getItem("authToken");
      await fetch("http://localhost:3000/patient/progress/updateActivity", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          steps,
          exerciseMinutes: minutes,
          activityLevel: level,
        }),
      });
      refresh();
    } catch (err) {
      console.error("Activity update failed:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all">
      {/* Header */}
      <div className="p-5 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center">
            <ActivityIcon size={20} color={themeColor} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Physical Activity
            </h3>
            <p className="text-xs text-gray-500">
              Daily movement and exercise tracking
            </p>
          </div>
        </div>

        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2g7SAV7P4FhNHdFNFoNheFDvwEgZS0aRDBA&s"
          alt="Activity"
          className="w-16 h-12 rounded-xl object-cover hidden sm:block"
        />
      </div>

      {/* Body */}
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600 mb-1">Steps</p>
            <input
              type="number"
              min="0"
              value={steps}
              onChange={(e) => setSteps(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[rgba(30,75,60,0.5)]"
            />
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Exercise minutes</p>
            <input
              type="number"
              min="0"
              value={minutes}
              onChange={(e) => setMinutes(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[rgba(30,75,60,0.5)]"
            />
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-600 mb-1">Activity level</p>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-[rgba(30,75,60,0.5)]"
          >
            {levels.map((l) => (
              <option key={l.id} value={l.id}>
                {l.label}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="mt-2 inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium text-white w-full"
          style={{ backgroundColor: themeColor }}
        >
          {saving ? "Saving..." : "Save Activity"}
        </button>
      </div>
    </div>
  );
}

export default ActivityCard;
