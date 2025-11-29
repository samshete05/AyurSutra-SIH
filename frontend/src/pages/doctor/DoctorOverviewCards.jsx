const DoctorOverviewCards = ({ stats }) => {
  // stats = { todayPatients, ongoingTherapies, pendingFeedback, criticalAlerts }
  return (
    <section className="grid gap-4 md:grid-cols-4">
      <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-4">
        <p className="text-xs font-semibold text-emerald-900">Today’s Patients</p>
        <p className="mt-2 text-2xl font-bold text-[#1E4B3C]">
          {stats.todayPatients ?? 0}
        </p>
      </div>
      <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-4">
        <p className="text-xs font-semibold text-emerald-900">
          Ongoing Therapies
        </p>
        <p className="mt-2 text-2xl font-bold text-[#1E4B3C]">
          {stats.ongoingTherapies ?? 0}
        </p>
      </div>
      <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-4">
        <p className="text-xs font-semibold text-emerald-900">
          Pending Feedback
        </p>
        <p className="mt-2 text-2xl font-bold text-[#1E4B3C]">
          {stats.pendingFeedback ?? 0}
        </p>
      </div>
      <div className="rounded-2xl bg-red-50 border border-red-200 p-4">
        <p className="text-xs font-semibold text-red-900">
          Alerts (Pain, Adverse Reactions)
        </p>
        <p className="mt-2 text-2xl font-bold text-red-700">
          {stats.criticalAlerts ?? 0}
        </p>
      </div>
    </section>
  );
};
export default DoctorOverviewCards;
