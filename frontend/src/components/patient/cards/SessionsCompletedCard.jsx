import React from "react";

function SessionsCompletedCard() {
  return (
    <section className="rounded-2xl bg-white border border-slate-100 px-5 py-4 flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
          Sessions Completed
        </p>
        <div className="h-8 w-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
          <span className="material-icons text-[18px]">monitor_heart</span>
        </div>
      </div>
      <div>
        <p className="text-2xl font-semibold text-slate-900">1</p>
        <p className="text-xs text-emerald-600 mt-1">+2 this week</p>
      </div>
    </section>
  );
}

export default SessionsCompletedCard;
