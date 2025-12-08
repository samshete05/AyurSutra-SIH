import React from "react";
import TherapyProgressGraph from "../progrssCards/TherapyProgressGraph";

function TherapyProgressDashboardCard({ appointmentId }) {
  if (!appointmentId) {
    return (
      <div className="bg-white p-5 rounded-xl shadow text-sm text-slate-500">
        No active therapy found. Start a therapy to track your progress.
      </div>
    );
  }

  return (
    <div className="bg-white p-5 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-3">Therapy Progress</h2>
      <TherapyProgressGraph appointmentId={appointmentId} />
    </div>
  );
}

export default TherapyProgressDashboardCard;
