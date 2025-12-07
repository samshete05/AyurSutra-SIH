import React, { useState } from "react";
import { Activity } from "lucide-react";

const themeColor = "#1e4b3c";

function SymptomCard({ data, refresh }) {
  const [severity, setSeverity] = useState(data?.severity || 0);
  const [notes, setNotes] = useState(data?.notes || "");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    try {
      setSaving(true);
      const token = localStorage.getItem("authToken");
      await fetch("http://localhost:3000/patient/progress/updateSymptom", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ severity, notes }),
      });
      refresh();
    } catch (err) {
      console.error("Symptom update failed:", err);
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
            <Activity size={20} color={themeColor} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Symptoms
            </h3>
            <p className="text-xs text-gray-500">
              Log your current discomfort level
            </p>
          </div>
        </div>

        <img
          src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=300&q=80"
          alt="Health"
          className="w-16 h-12 rounded-xl object-cover hidden sm:block"
        />
      </div>

      {/* Body */}
      <div className="p-6 space-y-4">
        <div>
          <div className="flex justify-between items-center mb-1">
            <p className="text-sm text-gray-600">Severity</p>
            <span className="text-xs text-gray-500">{severity}/10</span>
          </div>
          <input
            type="range"
            min="0"
            max="10"
            value={severity}
            onChange={(e) => setSeverity(Number(e.target.value))}
            className="w-full cursor-pointer accent-[rgba(30,75,60,0.8)]"
          />
        </div>

        <div>
          <p className="text-sm text-gray-600 mb-1">Notes</p>
          <textarea
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-[rgba(30,75,60,0.5)]"
            placeholder="Describe any pain, discomfort, or observations..."
          />
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="mt-2 inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium text-white w-full"
          style={{ backgroundColor: themeColor }}
        >
          {saving ? "Saving..." : "Save Symptoms"}
        </button>
      </div>
    </div>
  );
}

export default SymptomCard;
