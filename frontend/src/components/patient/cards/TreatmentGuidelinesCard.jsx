import React from "react";

function TreatmentGuidelinesCard() {
  return (
    <section className="rounded-2xl bg-white border border-slate-100 px-5 py-4">
      <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
        Treatment Guidelines
      </p>
      <p className="text-xs text-slate-500 mb-3">
        Important precautions to follow
      </p>

      <div className="space-y-3 text-xs">
        <div className="rounded-xl border border-orange-100 bg-orange-50 px-3 py-2.5">
          <p className="font-semibold text-orange-700 mb-1">
            Before Your Session
          </p>
          <ul className="space-y-1 text-orange-800">
            <li>• Empty bladder before treatment.</li>
            <li>• Avoid heavy meals 1–2 hours prior.</li>
          </ul>
        </div>

        <div className="rounded-xl border border-sky-100 bg-sky-50 px-3 py-2.5">
          <p className="font-semibold text-sky-700 mb-1">
            After Your Session
          </p>
          <ul className="space-y-1 text-sky-800">
            <li>• Rest in a quiet environment.</li>
            <li>• Avoid loud noises and screens.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default TreatmentGuidelinesCard;
