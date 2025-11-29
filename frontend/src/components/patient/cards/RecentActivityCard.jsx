import React from "react";

function RecentActivityCard() {
  return (
    <section className="rounded-2xl bg-white border border-slate-100 px-5 py-4">
      <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
        Recent Activity
      </p>
      <p className="text-xs text-slate-500 mb-3">
        Your latest completed sessions
      </p>

      <div className="space-y-2">
        <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-3 py-2">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
              <span className="material-icons text-[18px]">spa</span>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-900">
                Abhyanga
              </p>
              <p className="text-xs text-slate-500">
                Completed · 3/10/2024
              </p>
            </div>
          </div>
          <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
            Completed
          </span>
        </div>
      </div>
    </section>
  );
}

export default RecentActivityCard;
