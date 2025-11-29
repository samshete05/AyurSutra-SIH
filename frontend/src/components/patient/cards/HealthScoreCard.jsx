import React from "react";

function HealthScoreCard() {
  return (
    <section className="rounded-2xl bg-white border border-slate-100 px-5 py-4 flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
          Health Score
        </p>
        <div className="h-8 w-8 rounded-full bg-fuchsia-50 flex items-center justify-center text-fuchsia-500">
          <span className="material-icons text-[18px]">favorite</span>
        </div>
      </div>
      <div>
        <p className="text-2xl font-semibold text-slate-900">8.2</p>
        <p className="text-xs text-slate-500">/ 10</p>
        <div className="mt-2 flex items-center gap-0.5 text-amber-400 text-[16px]">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className="material-icons text-[18px]">
              star
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HealthScoreCard;
