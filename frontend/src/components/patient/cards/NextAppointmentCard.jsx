import React from "react";
import { CalendarClock } from "lucide-react";

function NextAppointmentCard({
  dateLabel = "Mar 18",
  timeLabel = "14:00",
  therapyName = "Shirodhara",
  progressPercent = 75,
  minutesLeftLabel = "Soon",
}) {
  const clampedProgress = Math.min(100, Math.max(0, progressPercent));

  return (
    <section className="rounded-2xl bg-white border border-emerald-50 px-5 py-4 flex flex-col justify-between shadow-[0_10px_30px_rgba(15,23,42,0.03)]">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
            Next Appointment
          </p>
          <p className="text-[11px] text-slate-400">
            Today&apos;s upcoming session
          </p>
        </div>
        <div className="h-8 w-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
          <CalendarClock size={18} className="stroke-[1.8]" />
        </div>
      </div>

      <div>
        <p className="text-sm font-medium text-slate-900">{therapyName}</p>
        <p className="text-xs text-slate-500 mt-0.5">
          {dateLabel} · {timeLabel}
        </p>

        {/* progress strip */}
        <div className="mt-3 h-1.5 rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-amber-300"
            style={{ width: `${clampedProgress}%` }}
          />
        </div>

        <div className="mt-1 flex items-center justify-between">
          <p className="text-[11px] font-medium text-emerald-600">
            {minutesLeftLabel}
          </p>
          <button className="text-[11px] font-medium text-emerald-700 hover:text-emerald-800">
            View details
          </button>
        </div>
      </div>
    </section>
  );
}

export default NextAppointmentCard;
