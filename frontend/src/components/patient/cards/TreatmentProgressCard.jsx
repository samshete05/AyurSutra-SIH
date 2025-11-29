import React from "react";
import { Stethoscope } from "lucide-react";

function TreatmentProgressCard({ progress = 75 }) {
  const clamped = Math.min(100, Math.max(0, progress));

  let status = "Excellent progress";
  let color = "from-emerald-500 via-emerald-400 to-amber-300";
  if (clamped < 30) {
    status = "Just getting started";
    color = "from-slate-400 via-slate-500 to-emerald-400";
  } else if (clamped < 70) {
    status = "Making steady progress";
    color = "from-emerald-500 via-emerald-400 to-emerald-300";
  }

  return (
    <section className="rounded-2xl bg-white border border-emerald-50 px-5 py-4 flex flex-col justify-between shadow-[0_10px_30px_rgba(15,23,42,0.03)]">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
          Treatment Progress
        </p>
        <div className="h-8 w-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
          <Stethoscope size={18} className="stroke-[1.8]" />
        </div>
      </div>

      <div>
        <p className="text-2xl font-semibold text-slate-900">
          {clamped}%
        </p>

        <div className="mt-3 h-1.5 rounded-full bg-slate-100 overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${color}`}
            style={{ width: `${clamped}%` }}
          />
        </div>

        <p className="mt-1 text-xs text-emerald-700">{status}</p>
      </div>
    </section>
  );
}

export default TreatmentProgressCard;
