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
        body: JSON.stringify({
          severity,
          notes,
        }),
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

  return (
    <div className="p-4 bg-white rounded-xl shadow-md border">
      <div className="flex justify-between">
        <h3 className="font-semibold">Symptoms</h3>
        {data?.completed ? (
          <span className="text-green-600 text-sm font-semibold">Completed</span>
        ) : (
          <span className="text-gray-500 text-sm">Pending</span>
        )}
      </div>

      {/* SEVERITY TRACKER */}
      <div className="mt-4">
        <label className="text-sm font-medium">
          Severity: {severity}/10
        </label>
        <input
          type="range"
          min="0"
          max="10"
          value={severity}
          onChange={(e) => setSeverity(Number(e.target.value))}
          className="w-full mt-2"
        />
      </div>

      {/* NOTES */}
      <textarea
        placeholder="Add notes (optional)"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="w-full mt-3 p-2 border rounded-md text-sm"
        rows={2}
      />

      {/* SAVE BUTTON */}
      <button
        onClick={handleUpdate}
        disabled={saving}
        className="mt-4 w-full py-2 rounded-lg text-white font-semibold"
        style={{ backgroundColor: themeColor }}
      >
        {saving ? "Saving..." : "Save Symptoms"}
      </button>
    </div>
  );
}

export default SymptomCard;
