import React from "react";
import { Activity } from "lucide-react";

function SessionsCompletedCard({
  totalSessions = 1,
  deltaThisWeek = 2,
}) {
  const trendLabel =
    deltaThisWeek > 0
      ? `+${deltaThisWeek} this week`
      : deltaThisWeek < 0
      ? `${deltaThisWeek} this week`
      : "No change this week";

  const trendColor =
    deltaThisWeek > 0
      ? "text-emerald-600"
      : deltaThisWeek < 0
      ? "text-rose-600"
      : "text-slate-500";

  return (
    <section className="rounded-2xl bg-white border border-emerald-50 px-5 py-4 flex flex-col justify-between shadow-[0_10px_30px_rgba(15,23,42,0.03)]">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
          Sessions Completed
        </p>
        <div className="h-8 w-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
          <Activity size={18} className="stroke-[1.8]" />
        </div>
      </div>

      <div>
        <p className="text-2xl font-semibold text-slate-900">
          {totalSessions}
        </p>
        <p className={`text-xs mt-1 ${trendColor}`}>{trendLabel}</p>
      </div>
    </section>
  );
}

export default SessionsCompletedCard;
