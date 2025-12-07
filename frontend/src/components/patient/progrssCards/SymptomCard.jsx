import React, { useState } from "react";

const themeColor = "#1e4b3c";

function SymptomCard({ data, refresh }) {
  const [severity, setSeverity] = useState(data?.severity || 0);
  const [notes, setNotes] = useState(data?.notes || "");
  const [saving, setSaving] = useState(false);

  const handleUpdate = async () => {
    setSaving(true);
    const token = localStorage.getItem("authToken");
    try {
      const res = await fetch("http://localhost:3000/patient/progress/updateSymptom", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ severity, notes }),
      });
      const result = await res.json();
      console.log("Symptom Update:", result);
      refresh();
    } catch (err) {
      console.error("Symptom update failed:", err);
    } finally {
      setSaving(false);
    }
  };

  const getSeverityColor = (level) => {
    const colors = ["#22c55e", "#84cc16", "#eab308", "#f97316", "#ef4444"];
    return colors[Math.min(Math.floor(level / 2), 4)];
  };

  const getSeverityLabel = (level) => {
    if (level === 0) return "None";
    if (level <= 2) return "Mild";
    if (level <= 5) return "Moderate";
    if (level <= 7) return "Severe";
    return "Critical";
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-green-100 overflow-hidden group">
      {/* Card Header */}
      <div className="bg-gradient-to-br from-red-50 to-orange-50 p-6 border-b border-red-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
              🩺
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Symptoms</h3>
              <p className="text-xs text-gray-500">Track your health</p>
            </div>
          </div>
          <div
            className="px-3 py-1 rounded-lg text-xs font-semibold text-white"
            style={{ backgroundColor: getSeverityColor(severity) }}
          >
            {getSeverityLabel(severity)}
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6">
        {/* Severity Scale */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <p className="text-sm font-medium text-gray-700">Severity Level</p>
            <span
              className="text-lg font-bold px-3 py-1 rounded-lg text-white"
              style={{ backgroundColor: getSeverityColor(severity) }}
            >
              {severity}/10
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="10"
            value={severity}
            onChange={(e) => setSeverity(Number(e.target.value))}
            className="w-full h-3 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, ${getSeverityColor(severity)} 0%, ${getSeverityColor(
                severity
              )} ${severity * 10}%, #e5e7eb ${severity * 10}%, #e5e7eb 100%)`,
            }}
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>No Pain</span>
            <span>Worst Pain</span>
          </div>
        </div>

        {/* Visual Pain Scale */}
        <div className="mb-6">
          <div className="grid grid-cols-11 gap-1">
            {[...Array(11)].map((_, i) => (
              <button
                key={i}
                onClick={() => setSeverity(i)}
                className={`h-8 rounded transition-all duration-200 ${
                  severity >= i ? "scale-110" : "opacity-30"
                }`}
                style={{
                  backgroundColor: getSeverityColor(i),
                }}
              />
            ))}
          </div>
        </div>

        {/* Notes Textarea */}
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-700 mb-2">Additional Notes</p>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Describe your symptoms..."
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none text-sm resize-none transition-colors duration-200"
            rows="3"
          />
        </div>

        <button
          onClick={handleUpdate}
          disabled={saving}
          className="w-full py-3 rounded-xl font-semibold text-white transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50"
          style={{ backgroundColor: themeColor }}
        >
          {saving ? "Logging..." : "Log Symptoms"}
        </button>
      </div>
    </div>
  );
}

export default SymptomCard;
