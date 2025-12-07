import React, { useState } from "react";

const themeColor = "#1e4b3c";

function MedicationCard({ data, refresh }) {
  const [taken, setTaken] = useState(data?.taken || false);
  const [missedDoses, setMissedDoses] = useState(data?.missedDoses || 0);
  const [saving, setSaving] = useState(false);

  const handleUpdate = async () => {
    setSaving(true);
    const token = localStorage.getItem("authToken");
    try {
      const res = await fetch("http://localhost:3000/patient/progress/updateMedication", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ taken, missedDoses: taken ? 0 : missedDoses }),
      });
      const result = await res.json();
      console.log("Medication Update:", result);
      refresh();
    } catch (err) {
      console.error("Medication update failed:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-green-100 overflow-hidden group">
      {/* Card Header */}
      <div className="bg-gradient-to-br from-teal-50 to-emerald-50 p-6 border-b border-teal-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
              💊
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Medication</h3>
              <p className="text-xs text-gray-500">Stay on track</p>
            </div>
          </div>
          <div
            className={`px-3 py-1 rounded-lg text-xs font-semibold text-white ${
              taken ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {taken ? "✓ Taken" : "✗ Pending"}
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6">
        {/* Status Toggle */}
        <div className="mb-6">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <p className="text-sm font-medium text-gray-700">Today's Dose</p>
              <p className="text-xs text-gray-500 mt-1">
                {taken ? "You're all set!" : "Don't forget to take your medicine"}
              </p>
            </div>
            <button
              onClick={() => setTaken(!taken)}
              className={`relative w-16 h-8 rounded-full transition-colors duration-300 ${
                taken ? "bg-green-500" : "bg-gray-300"
              }`}
            >
              <div
                className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${
                  taken ? "transform translate-x-8" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Missed Doses Counter */}
        {!taken && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-sm font-medium text-gray-700 mb-3">Missed Doses This Week</p>
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => setMissedDoses(Math.max(0, missedDoses - 1))}
                className="w-10 h-10 rounded-lg bg-white border border-red-300 text-gray-700 font-bold text-lg transition-colors duration-200 flex items-center justify-center shadow-sm"
              >
                −
              </button>
              <div className="px-6 py-2 bg-white rounded-lg border-2 border-red-300 min-w-[80px]">
                <p className="text-2xl font-bold text-center text-red-600">{missedDoses}</p>
              </div>
              <button
                onClick={() => setMissedDoses(missedDoses + 1)}
                className="w-10 h-10 rounded-lg bg-red-500 text-white font-bold text-lg transition-colors duration-200 flex items-center justify-center shadow-md hover:bg-red-600"
              >
                +
              </button>
            </div>
          </div>
        )}

        {/* Success Message */}
        {taken && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
            <div className="text-3xl">✅</div>
            <div>
              <p className="text-sm font-semibold text-green-800">Great job!</p>
              <p className="text-xs text-green-600">
                You're maintaining consistency with your treatment
              </p>
            </div>
          </div>
        )}

        <button
          onClick={handleUpdate}
          disabled={saving}
          className="w-full py-3 rounded-xl font-semibold text-white transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50"
          style={{ backgroundColor: themeColor }}
        >
          {saving ? "Updating..." : "Save Status"}
        </button>
      </div>
    </div>
  );
}

export default MedicationCard;
