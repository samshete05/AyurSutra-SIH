import React from "react";
import PatientLayout from "../../layouts/PatientLayout";
import TherapyProgressGraph from "../../components/patient/progrssCards/TherapyProgressGraph";

function TherapyProgress() {
  const appointmentId = localStorage.getItem("activeAppointmentId");

  return (
    <PatientLayout>
      <h1 className="text-2xl font-semibold mb-4">Your Therapy Progress</h1>
      <TherapyProgressGraph appointmentId={appointmentId} />
    </PatientLayout>
  );
}

export default TherapyProgress;
