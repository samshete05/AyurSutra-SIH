import React from "react";

function NextAppointmentCard() {
  return (
    <section className="rounded-2xl bg-white border border-slate-100 px-5 py-4 flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
          Next Appointment
        </p>
        <div className="h-8 w-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">
          <span className="material-icons text-[18px]">event</span>
        </div>
      </div>
      <div>
        <p className="text-lg font-semibold text-slate-900">Mar 18</p>
        <p className="text-sm text-slate-500">14:00</p>
        <div className="mt-3 h-1.5 rounded-full bg-slate-100 overflow-hidden">
          <div className="h-full w-3/4 bg-orange-400" />
        </div>
        <p className="mt-1 text-xs text-orange-500 font-medium">Soon</p>
      </div>
    </section>
  );
}

export default NextAppointmentCard;
