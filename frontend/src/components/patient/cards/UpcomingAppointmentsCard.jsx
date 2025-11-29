import React from "react";
import { HeartPulse } from "lucide-react";

function UpcomingAppointmentsCard({
  appointments = [],
  onViewAll = () => {},
}) {
  return (
    <section className="rounded-2xl bg-white border border-emerald-50 px-5 py-4 shadow-[0_10px_30px_rgba(15,23,42,0.03)]">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
            Upcoming Appointments
          </p>
          <p className="text-xs text-slate-500">Your scheduled therapy sessions</p>
        </div>
        <button
          onClick={onViewAll}
          className="text-xs font-medium text-amber-600 hover:text-amber-700 transition"
        >
          View All
        </button>
      </div>

      {appointments.length === 0 ? (
        <p className="text-xs text-slate-400 italic">No upcoming appointments.</p>
      ) : (
        appointments.map(({ id, therapyName, dateTime, duration }) => (
          <div
            key={id}
            className="mt-2 rounded-xl border border-slate-100 bg-slate-50/70 px-4 py-3 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500">
                <HeartPulse size={18} className="stroke-[1.8]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">{therapyName}</p>
                <p className="text-xs text-slate-500">{dateTime}</p>
              </div>
            </div>
            <div className="text-xs text-slate-500">
              <span className="px-2 py-0.5 rounded-full bg-white border border-slate-200">
                {duration}
              </span>
            </div>
          </div>
        ))
      )}
    </section>
  );
}

export default UpcomingAppointmentsCard;
