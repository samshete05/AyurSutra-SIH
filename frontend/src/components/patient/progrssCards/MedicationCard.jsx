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
      const res = await fetch(
        "http://localhost:3000/patient/progress/updateMedication",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            taken,
            missedDoses: taken ? 0 : missedDoses,
          }),
        }
      );

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
    <div className="p-4 bg-white rounded-xl shadow-md border">
      <div className="flex justify-between">
        <h3 className="font-semibold">Medication</h3>

        {data?.completed ? (
          <span className="text-green-600 text-sm font-semibold">Completed</span>
        ) : (
          <span className="text-gray-500 text-sm">Pending</span>
        )}
      </div>

      {/* TAKEN TOGGLE */}
      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm font-medium">Did you take your medicine?</span>

        <button
          onClick={() => setTaken(!taken)}
          className={`px-4 py-2 rounded-lg text-white font-semibold transition ${
            taken ? "bg-green-600" : "bg-gray-400"
          }`}
        >
          {taken ? "Yes" : "No"}
        </button>
      </div>

      {/* MISSED DOSES INPUT */}
      {!taken && (
        <div className="mt-4">
          <label className="text-sm font-medium">Missed Doses</label>
          <input
            type="number"
            min="0"
            value={missedDoses}
            onChange={(e) => setMissedDoses(Number(e.target.value))}
            className="w-full border p-2 rounded-md mt-1"
          />
        </div>
      )}

      {/* SAVE BUTTON */}
      <button
        onClick={handleUpdate}
        disabled={saving}
        className="mt-4 w-full py-2 rounded-lg text-white font-semibold"
        style={{ backgroundColor: themeColor }}
      >
        {saving ? "Saving..." : "Save Medication"}
      </button>
    </div>
  );
}

export default MedicationCard;