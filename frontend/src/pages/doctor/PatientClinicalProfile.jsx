const PatientClinicalProfile = ({ patient }) => {
  if (!patient) {
    return (
      <section className="mt-6 rounded-3xl bg-white border border-emerald-100 p-4 text-xs text-gray-500">
        Select a patient from the list to view clinical details.
      </section>
    );
  }

  return (
    <section className="mt-6 rounded-3xl bg-white border border-emerald-100 shadow-sm p-4">
      <h2 className="text-sm md:text-base font-semibold text-[#1E4B3C] mb-3">
        Clinical Profile · {patient.name}
      </h2>
      <div className="grid gap-4 md:grid-cols-3 text-[11px] md:text-xs">
        <div>
          <h3 className="font-semibold text-emerald-900 mb-1">Basics</h3>
          <p className="text-gray-700">ID: {patient.id}</p>
          <p className="text-gray-700">Age / Gender: {patient.ageGender}</p>
          <p className="text-gray-700">Center: {patient.centerName}</p>
        </div>
        <div>
          <h3 className="font-semibold text-emerald-900 mb-1">
            Prakriti & Diagnosis
          </h3>
          <p className="text-gray-700">
            Prakriti: {patient.prakriti || "—"}
          </p>
          <p className="text-gray-700">
            Vikriti / Diagnosis: {patient.diagnosis || "—"}
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-emerald-900 mb-1">
            Panchakarma History
          </h3>
          <p className="text-gray-700">
            Previous therapies: {patient.previousTherapiesSummary || "—"}
          </p>
          <p className="text-gray-700">
            Current plan: {patient.currentPlanSummary || "—"}
          </p>
        </div>
      </div>
    </section>
  );
};
export default PatientClinicalProfile;