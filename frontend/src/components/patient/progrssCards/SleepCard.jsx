import React, { useState } from "react";
import { Moon } from "lucide-react";

const themeColor = "#1e4b3c";

function SleepCard({ data, refresh }) {
  const [hours, setHours] = useState(data?.hours || 0);
  const [quality, setQuality] = useState(data?.quality || 3);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    try {
      setSaving(true);
      const token = localStorage.getItem("authToken");
      await fetch("http://localhost:3000/patient/progress/updateSleep", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ hours, quality }),
      });
      refresh();
    } catch (err) {
      console.error("Sleep update failed:", err);
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
            <Moon size={20} color={themeColor} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Sleep</h3>
            <p className="text-xs text-gray-500">
              Track your daily sleep duration and quality
            </p>
          </div>
        </div>

        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB2PgKISOYQrgK487wROBcaYwv7aQOOnGbuA&s"
          alt="Sleep"
          className="w-16 h-12 rounded-xl object-cover hidden sm:block"
        />
      </div>

      {/* Body */}
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600 mb-1">Hours slept</p>
            <input
              type="number"
              min="0"
              max="24"
              value={hours}
              onChange={(e) => setHours(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[rgba(30,75,60,0.5)]"
            />
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-1">Sleep quality (1–5)</p>
            <input
              type="number"
              min="1"
              max="5"
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[rgba(30,75,60,0.5)]"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="mt-2 inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium text-white w-full"
          style={{ backgroundColor: themeColor }}
        >
          {saving ? "Saving..." : "Save Sleep"}
        </button>
      </div>
    </div>
  );
}

export default SleepCard;
