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
        body: JSON.stringify({
          hours,
          quality,
        }),
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

  return (
    <div className="p-4 bg-white rounded-xl shadow-md border">
      <div className="flex justify-between">
        <h3 className="font-semibold">Sleep Tracking</h3>

        {data?.completed ? (
          <span className="text-green-600 text-sm font-semibold">Completed</span>
        ) : (
          <span className="text-gray-500 text-sm">Pending</span>
        )}
      </div>

      {/* HOURS INPUT */}
      <div className="mt-4">
        <label className="text-sm font-medium">Hours Slept</label>
        <input
          type="number"
          min="0"
          max="24"
          value={hours}
          onChange={(e) => setHours(Number(e.target.value))}
          className="mt-1 w-full border p-2 rounded-md"
        />
      </div>

      {/* QUALITY (STARS) */}
      <div className="mt-4">
        <label className="text-sm font-medium">Sleep Quality</label>

        <div className="flex mt-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => setQuality(star)}
              className={`cursor-pointer text-2xl mx-1 ${
                quality >= star ? "text-yellow-500" : "text-gray-300"
              }`}
            >
              ★
            </span>
          ))}
        </div>
      </div>

      {/* SAVE BUTTON */}
      <button
        onClick={handleUpdate}
        disabled={saving}
        className="mt-4 w-full py-2 rounded-lg text-white font-semibold"
        style={{ backgroundColor: themeColor }}
      >
        {saving ? "Saving..." : "Save Sleep"}
      </button>
    </div>
  );
}

export default SleepCard;