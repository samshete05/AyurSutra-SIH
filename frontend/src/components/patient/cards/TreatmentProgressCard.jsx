import React from "react";

function TreatmentProgressCard() {
  const progress = 75;

  return (
    <section className="rounded-2xl bg-white border border-slate-100 px-5 py-4 flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
          Treatment Progress
        </p>
        <div className="h-8 w-8 rounded-full bg-sky-50 flex items-center justify-center text-sky-500">
          <span className="material-icons text-[18px]">blur_circular</span>
        </div>
      </div>
      <div>
        <p className="text-2xl font-semibold text-slate-900">{progress}%</p>
        <div className="mt-3 h-1.5 rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full bg-sky-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-1 text-xs text-slate-500">Excellent progress</p>
      </div>
    </section>
  );
}

export default TreatmentProgressCard;
