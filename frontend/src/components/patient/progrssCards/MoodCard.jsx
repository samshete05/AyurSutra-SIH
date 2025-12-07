import React, { useState } from "react";
import { Smile } from "lucide-react";

const themeColor = "#1e4b3c";

const moodOptions = [
  { id: "very_sad", label: "Very low" },
  { id: "sad", label: "Low" },
  { id: "neutral", label: "Neutral" },
  { id: "happy", label: "Positive" },
  { id: "very_happy", label: "Very positive" },
];

function MoodCard({ data, refresh }) {
  const [mood, setMood] = useState(data?.mood || "neutral");
  const [stressLevel, setStressLevel] = useState(data?.stressLevel || 0);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    try {
      setSaving(true);
      const token = localStorage.getItem("authToken");
      await fetch("http://localhost:3000/patient/progress/updateMood", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ mood, stressLevel }),
      });
      refresh();
    } catch (err) {
      console.error("Mood update failed:", err);
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
            <Smile size={20} color={themeColor} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Mood</h3>
            <p className="text-xs text-gray-500">
              How are you feeling today?
            </p>
          </div>
        </div>

        <img
          src="https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=300&q=80"
          alt="Calm"
          className="w-16 h-12 rounded-xl object-cover hidden sm:block"
        />
      </div>

      {/* Body */}
      <div className="p-6 space-y-4">
        <div>
          <p className="text-sm text-gray-600 mb-1">Emotional state</p>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {moodOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setMood(option.id)}
                className={`text-xs px-3 py-2 rounded-lg border text-center ${
                  mood === option.id
                    ? "text-white"
                    : "text-gray-700 bg-white"
                }`}
                style={
                  mood === option.id
                    ? { backgroundColor: themeColor, borderColor: themeColor }
                    : { borderColor: "#e5e7eb" }
                }
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <p className="text-sm text-gray-600">Stress level</p>
            <span className="text-xs text-gray-500">{stressLevel}/10</span>
          </div>
          <input
            type="range"
            min="0"
            max="10"
            value={stressLevel}
            onChange={(e) => setStressLevel(Number(e.target.value))}
            className="w-full cursor-pointer accent-[rgba(30,75,60,0.8)]"
          />
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="mt-2 inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium text-white w-full"
          style={{ backgroundColor: themeColor }}
        >
          {saving ? "Saving..." : "Save Mood"}
        </button>
      </div>
    </div>
  );
}

export default MoodCard;
