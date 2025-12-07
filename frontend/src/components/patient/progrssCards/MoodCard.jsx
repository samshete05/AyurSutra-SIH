import React, { useState } from "react";

const themeColor = "#1e4b3c";

const moods = [
  { id: "very_sad", label: "😢", name: "Very Sad", color: "#ef4444" },
  { id: "sad", label: "😟", name: "Sad", color: "#f97316" },
  { id: "neutral", label: "😐", name: "Neutral", color: "#eab308" },
  { id: "happy", label: "🙂", name: "Happy", color: "#84cc16" },
  { id: "very_happy", label: "😁", name: "Very Happy", color: "#22c55e" },
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
        body: JSON.stringify({ mood: selectedMood, stressLevel: stress }),
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

  const currentMood = moods.find((m) => m.id === selectedMood);

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-green-100 overflow-hidden group">
      {/* Card Header */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 border-b border-purple-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
              {currentMood.label}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Mood Check</h3>
              <p className="text-xs text-gray-500">How are you feeling?</p>
            </div>
          </div>
          <div
            className="px-3 py-1 rounded-lg text-xs font-semibold text-white"
            style={{ backgroundColor: currentMood.color }}
          >
            {currentMood.name}
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6">
        {/* Mood Selector */}
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-700 mb-3">Select Your Mood</p>
          <div className="flex justify-between gap-2">
            {moods.map((mood) => (
              <button
                key={mood.id}
                onClick={() => setSelectedMood(mood.id)}
                className={`flex-1 p-3 rounded-xl text-3xl transition-all duration-300 ${
                  selectedMood === mood.id
                    ? "bg-green-100 border-2 scale-110 shadow-md"
                    : "bg-gray-50 border-2 border-transparent hover:bg-gray-100"
                }`}
                style={
                  selectedMood === mood.id
                    ? { borderColor: themeColor }
                    : {}
                }
              >
                {mood.label}
              </button>
            ))}
          </div>
        </div>

        {/* Stress Level Slider */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm font-medium text-gray-700">Stress Level</p>
            <span
              className="text-lg font-bold px-3 py-1 rounded-lg"
              style={{
                backgroundColor: `rgba(30, 75, 60, ${stress / 10})`,
                color: stress > 5 ? "white" : themeColor,
              }}
            >
              {stress}/10
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="10"
            value={stress}
            onChange={(e) => setStress(Number(e.target.value))}
            className="w-full h-3 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, ${themeColor} 0%, ${themeColor} ${
                stress * 10
              }%, #e5e7eb ${stress * 10}%, #e5e7eb 100%)`,
            }}
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Calm</span>
            <span>Stressed</span>
          </div>
        </div>

        <button
          onClick={handleUpdate}
          disabled={saving}
          className="w-full py-3 rounded-xl font-semibold text-white transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50"
          style={{ backgroundColor: themeColor }}
        >
          {saving ? "Saving..." : "Save Mood"}
        </button>
      </div>
    </div>
  );
}

export default MoodCard;
