import React from "react";

function UpcomingAppointmentsCard() {
  return (
    <section className="rounded-2xl bg-white border border-slate-100 px-5 py-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
            Upcoming Appointments
          </p>
          <p className="text-xs text-slate-500">
            Your scheduled therapy sessions
          </p>
        </div>
        <button className="text-xs font-medium text-orange-600 hover:text-orange-700">
          View All
        </button>
      </div>

      <div className="mt-2 rounded-xl border border-slate-100 bg-slate-50/70 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500">
            <span className="material-icons text-[18px]">spa</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">
              Shirodhara
            </p>
            <p className="text-xs text-slate-500">
              3/18/2024 · 14:00
            </p>
          </div>
        </div>
        <div className="text-xs text-slate-500">
          <span className="px-2 py-0.5 rounded-full bg-white border border-slate-200">
            45m
          </span>
        </div>
      </div>
    </section>
  );
}

export default UpcomingAppointmentsCard;
