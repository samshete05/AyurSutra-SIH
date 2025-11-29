const InstructionManager = ({ patient, onSaveInstructions }) => {
  if (!patient) return null;

  return (
    <section className="mt-4 rounded-3xl bg-emerald-50/60 border border-emerald-100 p-4">
      <h3 className="text-xs md:text-sm font-semibold text-[#1E4B3C] mb-2">
        Pre‑ & Post‑Procedure Instructions
      </h3>
      <div className="grid gap-3 md:grid-cols-2 text-[11px] md:text-xs">
        <textarea
          placeholder="Pre‑procedure instructions (fasting, medicines to stop, etc.)"
          className="min-h-[80px] rounded-2xl border border-gray-200 bg-gray-50 px-3 py-2 outline-none focus:border-[#1E4B3C] focus:bg-white focus:ring-1 focus:ring-[#1E4B3C]"
        />
        <textarea
          placeholder="Post‑procedure instructions (rest, diet, lifestyle restrictions)"
          className="min-h-[80px] rounded-2xl border border-gray-200 bg-gray-50 px-3 py-2 outline-none focus:border-[#1E4B3C] focus:bg-white focus:ring-1 focus:ring-[#1E4B3C]"
        />
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[10px] md:text-xs">
        <button
          type="button"
          className="rounded-full bg-[#1E4B3C] px-4 py-1.5 font-semibold text-white hover:bg-emerald-800"
        >
          Save & Notify Patient
        </button>
        <p className="text-gray-600">
          Notifications can be sent via in‑app, SMS, and email channels.
        </p>
      </div>
    </section>
  );
};

export default InstructionManager;