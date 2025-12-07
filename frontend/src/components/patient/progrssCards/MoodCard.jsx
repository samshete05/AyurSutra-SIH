import React, { useState } from "react";

const themeColor = "#1e4b3c";

const moods = [
  { id: "very_sad", label: "😢" },
  { id: "sad", label: "😟" },
  { id: "neutral", label: "😐" },
  { id: "happy", label: "🙂" },
  { id: "very_happy", label: "😁" },
];

function MoodCard({ data, refresh }) {
  const [selectedMood, setSelectedMood] = useState(data?.mood || "neutral");
  const [stress, setStress] = useState(data?.stressLevel || 0);
  const [saving, setSaving] = useState(false);

  const handleUpdate = async () => {
    setSaving(true);
    const token = localStorage.getItem("authToken");

    try {
      const res = await fetch("http://localhost:3000/patient/progress/updateMood", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          mood: selectedMood,
          stressLevel: stress,
        }),
      });

      const result = await res.json();
      console.log("Mood Update Response:", result);

      refresh();
    } catch (err) {
      console.error("Mood update failed:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-md border">
      <div className="flex justify-between">
        <h3 className="font-semibold">Mood & Stress</h3>

        {data?.completed ? (
          <span className="text-green-600 text-sm font-semibold">Completed</span>
        ) : (
          <span className="text-gray-500 text-sm">Pending</span>
        )}
      </div>

      {/* MOOD SELECTOR */}
      <div className="flex justify-between mt-4">
        {moods.map((m) => (
          <button
            key={m.id}
            onClick={() => setSelectedMood(m.id)}
            className={`text-3xl transition ${
              selectedMood === m.id ? "scale-110" : "opacity-50"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* STRESS LEVEL SLIDER */}
      <div className="mt-5">
        <label className="text-sm font-medium">Stress Level: {stress}/10</label>
        <input
          type="range"
          min="0"
          max="10"
          value={stress}
          onChange={(e) => setStress(Number(e.target.value))}
          className="w-full mt-2"
        />
      </div>

      {/* SAVE BUTTON */}
      <button
        onClick={handleUpdate}
        disabled={saving}
        className="mt-4 w-full py-2 rounded-lg text-white font-semibold"
        style={{ backgroundColor: themeColor }}
      >
        {saving ? "Saving..." : "Save Mood"}
      </button>
    </div>
  );
}

export default MoodCard;
