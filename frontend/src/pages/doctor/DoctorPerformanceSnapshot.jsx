const DoctorPerformanceSnapshot = ({ performance }) => {
  return (
    <section className="mt-6 rounded-3xl bg-white border border-emerald-100 p-4">
      <h3 className="text-xs md:text-sm font-semibold text-[#1E4B3C] mb-2">
        Your Performance Snapshot
      </h3>
      <div className="grid gap-4 md:grid-cols-4 text-[11px] md:text-xs">
        <div>
          <p className="text-gray-600">Patients managed (last 30 days)</p>
          <p className="mt-1 text-xl font-bold text-[#1E4B3C]">
            {performance?.patientsLast30 || 0}
          </p>
        </div>
        <div>
          <p className="text-gray-600">Average therapy outcome score</p>
          <p className="mt-1 text-xl font-bold text-[#1E4B3C]">
            {performance?.outcomeScore || "-"}
          </p>
        </div>
        <div>
          <p className="text-gray-600">Average patient feedback rating</p>
          <p className="mt-1 text-xl font-bold text-[#1E4B3C]">
            {performance?.feedbackRating || "-"}
          </p>
        </div>
        <div>
          <p className="text-gray-600">Adverse event rate</p>
          <p className="mt-1 text-xl font-bold text-red-700">
            {performance?.adverseRate || "0%"}
          </p>
        </div>
      </div>
    </section>
  );
};


export default DoctorPerformanceSnapshot;