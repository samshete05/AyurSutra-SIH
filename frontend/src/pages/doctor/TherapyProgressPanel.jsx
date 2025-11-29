const TherapyProgressPanel = ({ progress }) => {
  // progress could have aggregated scores and latest feedback flags
  return (
    <section className="mt-6 rounded-3xl bg-white border border-emerald-100 p-4">
      <h3 className="text-xs md:text-sm font-semibold text-[#1E4B3C] mb-2">
        Therapy Progress & Feedback
      </h3>
      <div className="grid gap-4 md:grid-cols-3 text-[11px] md:text-xs">
        <div>
          <p className="text-gray-700">
            Pain score trend: {progress?.painTrendLabel || "N/A"}
          </p>
          <p className="text-gray-700">
            Sleep quality: {progress?.sleepTrendLabel || "N/A"}
          </p>
        </div>
        <div>
          <p className="text-gray-700">
            Energy / fatigue: {progress?.energyTrendLabel || "N/A"}
          </p>
          <p className="text-gray-700">
            Mood / stress: {progress?.moodTrendLabel || "N/A"}
          </p>
        </div>
        <div>
          <p className="font-semibold text-red-700">
            Alerts: {progress?.alertSummary || "No active alerts"}
          </p>
        </div>
      </div>
    </section>
  );
};

export default TherapyProgressPanel;