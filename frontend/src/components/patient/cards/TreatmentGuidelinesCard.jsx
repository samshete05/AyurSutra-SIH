import React from "react";

function TreatmentGuidelinesCard({
  beforeSession = [
    "Empty bladder before treatment.",
    "Avoid heavy meals 1–2 hours prior."
  ],
  afterSession = [
    "Rest in a quiet environment.",
    "Avoid loud noises and screens."
  ]
}) {
  return (
    <section className="rounded-2xl bg-white border border-emerald-50 px-5 py-4 shadow-[0_10px_30px_rgba(15,23,42,0.03)]">
      <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
        Treatment Guidelines
      </p>
      <p className="text-xs text-slate-500 mb-3">
        Important precautions to follow
      </p>

      <div className="space-y-3 text-xs">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2.5">
          <p className="font-semibold text-emerald-700 mb-1">
            Before Your Session
          </p>
          <ul className="space-y-1 text-emerald-800 list-disc list-inside">
            {beforeSession.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-cyan-200 bg-cyan-50 px-3 py-2.5">
          <p className="font-semibold text-cyan-700 mb-1">
            After Your Session
          </p>
          <ul className="space-y-1 text-cyan-800 list-disc list-inside">
            {afterSession.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default TreatmentGuidelinesCard;
