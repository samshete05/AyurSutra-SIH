const TherapyScheduler = ({ patient, onSchedule }) => {
  if (!patient) return null;

  return (
    <section className="mt-4 rounded-3xl bg-white border border-emerald-100 p-4">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <h3 className="text-xs md:text-sm font-semibold text-[#1E4B3C]">
          Schedule / Modify Therapies
        </h3>
        <p className="text-[10px] text-gray-500">
          All changes are audit‑logged with timestamp, doctor ID, and old / new
          values.
        </p>
      </div>
      <form
        className="mt-3 grid gap-3 md:grid-cols-4 text-[11px] md:text-xs"
        onSubmit={(event) => {
          event.preventDefault();
          // collect form data and call onSchedule(...)
        }}
      >
        <input
          type="text"
          placeholder="Therapy name (e.g. Virechana)"
          className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 outline-none focus:border-[#1E4B3C] focus:bg-white focus:ring-1 focus:ring-[#1E4B3C]"
        />
        <input
          type="date"
          className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 outline-none focus:border-[#1E4B3C] focus:bg-white focus:ring-1 focus:ring-[#1E4B3C]"
        />
        <input
          type="time"
          className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 outline-none focus:border-[#1E4B3C] focus:bg-white focus:ring-1 focus:ring-[#1E4B3C]"
        />
        <button
          type="submit"
          className="rounded-xl bg-[#1E4B3C] px-3 py-2 font-semibold text-white hover:bg-emerald-800"
        >
          Save Slot
        </button>
      </form>
    </section>
  );
};


export default TherapyScheduler;