const TherapyTimeline = ({ sessions }) => {
  // sessions = [{dayLabel, therapyName, status, feedbackFlag}]
  return (
    <section className="mt-4 rounded-3xl bg-emerald-50/60 border border-emerald-100 p-4">
      <h3 className="text-xs md:text-sm font-semibold text-[#1E4B3C] mb-3">
        Therapy Timeline
      </h3>
      <div className="flex gap-3 overflow-x-auto pb-1 text-[11px] md:text-xs">
        {sessions.map((session) => (
          <div
            key={session.dayLabel + session.therapyName}
            className="min-w-[120px] rounded-2xl bg-white border border-emerald-100 p-2"
          >
            <p className="font-semibold text-emerald-900">
              {session.dayLabel}
            </p>
            <p className="mt-1 text-gray-700">{session.therapyName}</p>
            <p className="mt-1 text-[10px] text-gray-500">
              Status: {session.status}
            </p>
            {session.feedbackFlag && (
              <p className="mt-1 text-[10px] text-red-600">
                Alert: {session.feedbackFlag}
              </p>
            )}
          </div>
        ))}
        {sessions.length === 0 && (
          <p className="text-gray-500 text-xs">No sessions planned.</p>
        )}
      </div>
    </section>
  );
};

export default TherapyTimeline;