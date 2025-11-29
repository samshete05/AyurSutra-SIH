import React from "react";
import { Activity } from "lucide-react";

function RecentActivityCard({ activities = [] }) {
  return (
    <section className="rounded-2xl bg-white border border-emerald-50 px-5 py-4 shadow-[0_10px_30px_rgba(15,23,42,0.03)]">
      <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
        Recent Activity
      </p>
      <p className="text-xs text-slate-500 mb-3">Your latest completed sessions</p>

      <div className="space-y-2">
        {activities.length === 0 ? (
          <p className="text-xs text-slate-400 italic">No recent activity.</p>
        ) : (
          activities.map(({ id, name, status, date }) => (
            <div
              key={id}
              className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-3 py-2"
            >
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                  <Activity size={18} className="stroke-[1.8]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">{name}</p>
                  <p className="text-xs text-slate-500">
                    {status} · {date}
                  </p>
                </div>
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                {status}
              </span>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default RecentActivityCard;
