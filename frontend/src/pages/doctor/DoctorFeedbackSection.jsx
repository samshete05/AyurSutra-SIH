// DoctorFeedbackSection.jsx
import React from "react";

const feedbackItems = [
  {
    id: "F1",
    patientName: "Rahul Sharma",
    dateLabel: "27 Nov 2025",
    rating: 4.8,
    comment:
      "Back pain is significantly better. Doctor explained each Panchakarma step very clearly.",
  },
  {
    id: "F2",
    patientName: "Anita Verma",
    dateLabel: "25 Nov 2025",
    rating: 4.5,
    comment:
      "Migraine frequency reduced. Appreciate the detailed diet and lifestyle guidance.",
  },
  {
    id: "F3",
    patientName: "Vikas Patil",
    dateLabel: "22 Nov 2025",
    rating: 4.9,
    comment:
      "Felt well supported throughout Virechana and Basti. Staff coordination was excellent.",
  },
];

const DoctorFeedbackSection = () => {
  return (
    <section className="rounded-2xl bg-white border border-slate-200 shadow-sm p-5">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-base font-semibold text-slate-900">
            Patient feedback
          </h2>
          <p className="text-[12px] text-slate-500">
            Recent feedback for this doctor across Panchakarma cases.
          </p>
        </div>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-[12px] font-medium text-emerald-700">
          Avg. rating: 4.7 / 5
        </span>
      </div>

      <div className="grid gap-3 md:grid-cols-3 text-[13px]">
        {feedbackItems.map((item) => (
          <div
            key={item.id}
            className="rounded-xl border border-slate-200 bg-slate-50/60 px-3 py-3"
          >
            <p className="text-sm font-semibold text-slate-900">
              {item.patientName}
            </p>
            <p className="text-[11px] text-slate-500 mb-1">{item.dateLabel}</p>
            <p className="text-[12px] text-slate-700">{item.comment}</p>
            <p className="mt-2 text-[12px] font-medium text-emerald-700">
              Rating: {item.rating} / 5
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DoctorFeedbackSection;
