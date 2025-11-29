const AssignedPatientsTable = ({
  patients,
  selectedPatientId,
  onSelectPatient,
}) => {
  // patients = [{id, name, centerName, todaySlotTime, status, chiefComplaint}]
  return (
    <section className="mt-6 rounded-3xl bg-white border border-emerald-100 shadow-sm p-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-sm md:text-base font-semibold text-[#1E4B3C]">
            Assigned Patients
          </h2>
          <p className="text-[11px] text-gray-600">
            Only patients mapped to your doctor ID at this center are shown.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 text-[11px] md:text-xs">
          <input
            type="text"
            placeholder="Search by name or ID"
            className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-[11px] outline-none focus:border-[#1E4B3C] focus:bg-white focus:ring-1 focus:ring-[#1E4B3C]"
          />
          <select className="rounded-full border border-gray-200 bg-gray-50 px-2 py-1.5 text-[11px] outline-none focus:border-[#1E4B3C] focus:bg-white focus:ring-1 focus:ring-[#1E4B3C]">
            <option value="today">Today</option>
            <option value="all">All</option>
            <option value="in-therapy">In Therapy</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      <div className="mt-3 overflow-x-auto">
        <table className="min-w-full text-left text-[11px] md:text-xs">
          <thead>
            <tr className="border-b border-emerald-100 bg-emerald-50/60 text-emerald-900">
              <th className="px-3 py-2 font-semibold">Patient</th>
              <th className="px-3 py-2 font-semibold">Today Slot</th>
              <th className="px-3 py-2 font-semibold">Status</th>
              <th className="px-3 py-2 font-semibold">Chief Complaint</th>
              <th className="px-3 py-2 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr
                key={patient.id}
                className={`border-b last:border-b-0 ${
                  patient.id === selectedPatientId
                    ? "bg-emerald-50"
                    : "hover:bg-emerald-50/60"
                }`}
              >
                <td className="px-3 py-2">
                  <div className="font-semibold text-gray-900">
                    {patient.name}
                  </div>
                  <div className="text-[10px] text-gray-500">
                    {patient.centerName}
                  </div>
                </td>
                <td className="px-3 py-2 text-gray-700">
                  {patient.todaySlotTime || "-"}
                </td>
                <td className="px-3 py-2">
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] text-emerald-800 border border-emerald-100">
                    {patient.status}
                  </span>
                </td>
                <td className="px-3 py-2 text-gray-700">
                  {patient.chiefComplaint}
                </td>
                <td className="px-3 py-2">
                  <button
                    type="button"
                    onClick={() => onSelectPatient(patient)}
                    className="rounded-full bg-[#1E4B3C] px-3 py-1 text-[10px] font-semibold text-white hover:bg-emerald-800"
                  >
                    Open Profile
                  </button>
                </td>
              </tr>
            ))}
            {patients.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-3 py-4 text-center text-gray-500 text-xs"
                >
                  No patients assigned for the selected filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};
export default AssignedPatientsTable;