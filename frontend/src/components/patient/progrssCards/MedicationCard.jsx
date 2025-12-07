import React, { useState } from "react";
import { Pill } from "lucide-react";

const themeColor = "#1e4b3c";

function MedicationCard({ data, refresh }) {
  const [taken, setTaken] = useState(data?.taken || false);
  const [missedDoses, setMissedDoses] = useState(data?.missedDoses || 0);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    try {
      setSaving(true);
      const token = localStorage.getItem("authToken");
      await fetch("http://localhost:3000/patient/progress/updateMedication", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          taken,
          missedDoses: taken ? 0 : missedDoses,
        }),
      });
      refresh();
    } catch (err) {
      console.error("Medication update failed:", err);
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
            <Pill size={20} color={themeColor} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Medication
            </h3>
            <p className="text-xs text-gray-500">
              Record if you took your medicines today
            </p>
          </div>
        </div>

        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQttVXigBoznFL_Q3UUGKHFhvrqRjwOAPKjFvMI0-EShkEwqoW1ZJUIhCk&s"
          alt="Medication"
          className="w-16 h-12 rounded-xl object-cover hidden sm:block"
        />
      </div>

      {/* Body */}
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">Did you take your medicines?</p>
          <button
            type="button"
            onClick={() => setTaken(!taken)}
            className={`px-4 py-2 text-sm rounded-lg border font-medium ${
              taken
                ? "text-white"
                : "text-gray-700 bg-white"
            }`}
            style={
              taken
                ? { backgroundColor: themeColor, borderColor: themeColor }
                : { borderColor: "#e5e7eb" }
            }
          >
            {taken ? "Yes" : "No"}
          </button>
        </div>

        {!taken && (
          <div>
            <p className="text-sm text-gray-600 mb-1">Missed doses</p>
            <input
              type="number"
              min="0"
              value={missedDoses}
              onChange={(e) => setMissedDoses(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[rgba(30,75,60,0.5)]"
            />
          </div>
        )}

        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="mt-2 inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium text-white w-full"
          style={{ backgroundColor: themeColor }}
        >
          {saving ? "Saving..." : "Save Medication"}
        </button>
      </div>
    </div>
  );
}

export default MedicationCard;
