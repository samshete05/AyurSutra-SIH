import React from "react";
import { HeartPulse, Star } from "lucide-react";

function HealthScoreCard({ score = 8.2, maxScore = 10 }) {
  const percentage = Math.min(100, Math.max(0, (score / maxScore) * 100));
  const ratingOutOfFive = Math.round((score / maxScore) * 5);

  return (
    <section className="rounded-2xl bg-white border border-emerald-50 px-5 py-4 flex flex-col justify-between shadow-[0_10px_30px_rgba(15,23,42,0.03)]">
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
          Health Score
        </p>
        <div className="h-8 w-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
          <HeartPulse size={18} className="stroke-[1.8]" />
        </div>
      </div>

      <div>
        <div className="flex items-baseline gap-1">
          <p className="text-2xl font-semibold text-slate-900">
            {score.toFixed(1)}
          </p>
          <p className="text-xs text-slate-500">/ {maxScore}</p>
        </div>

        {/* Subtle progress bar */}
        <div className="mt-3 h-1.5 rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-amber-300"
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Star rating + label */}
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-0.5 text-amber-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={16}
                className={
                  i < ratingOutOfFive
                    ? "fill-amber-400 stroke-amber-400"
                    : "stroke-amber-200"
                }
              />
            ))}
          </div>
          <p className="text-[11px] text-emerald-600 font-medium">
            {score >= 8 ? "Excellent" : score >= 6 ? "Good" : "Needs attention"}
          </p>
        </div>
      </div>
    </section>
  );
}

export default HealthScoreCard;
