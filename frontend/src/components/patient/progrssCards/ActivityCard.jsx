import React, { useState } from "react";

const themeColor = "#1e4b3c";

const levels = [
  { id: "sedentary", label: "Sedentary" },
  { id: "light", label: "Light" },
  { id: "moderate", label: "Moderate" },
  { id: "active", label: "Active" },
  { id: "very_active", label: "Very Active" },
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
        body: JSON.stringify({
          steps,
          exerciseMinutes: minutes,
          activityLevel: level,
        }),
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

  return (
    <div className="p-4 bg-white rounded-xl shadow-md border">
      <div className="flex justify-between">
        <h3 className="font-semibold">Physical Activity</h3>
        {data?.completed ? (
          <span className="text-green-600 text-sm font-semibold">Completed</span>
        ) : (
          <span className="text-gray-500 text-sm">Pending</span>
        )}
      </div>

      {/* STEPS INPUT */}
      <div className="mt-4">
        <label className="text-sm font-medium">Steps</label>
        <input
          type="number"
          min="0"
          value={steps}
          onChange={(e) => setSteps(Number(e.target.value))}
          className="mt-1 w-full border p-2 rounded-md"
        />
      </div>

      {/* EXERCISE MINUTES */}
      <div className="mt-4">
        <label className="text-sm font-medium">Exercise Minutes</label>
        <input
          type="number"
          min="0"
          value={minutes}
          onChange={(e) => setMinutes(Number(e.target.value))}
          className="mt-1 w-full border p-2 rounded-md"
        />
      </div>

      {/* ACTIVITY LEVEL */}
      <div className="mt-4">
        <label className="text-sm font-medium">Activity Level</label>
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="w-full p-2 border rounded-md mt-1"
        >
          {levels.map((lvl) => (
            <option key={lvl.id} value={lvl.id}>
              {lvl.label}
            </option>
          ))}
        </select>
      </div>

      {/* SAVE BUTTON */}
      <button
        onClick={handleUpdate}
        disabled={saving}
        className="mt-4 w-full py-2 rounded-lg text-white font-semibold"
        style={{ backgroundColor: themeColor }}
      >
        {saving ? "Saving..." : "Save Activity"}
      </button>
    </div>
  );
}

export default ActivityCard;