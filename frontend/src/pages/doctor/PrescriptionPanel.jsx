const PrescriptionPanel = ({ patient, onSavePrescription }) => {
  const isDisabled = !patient;

  return (
    <section className="mt-6 rounded-3xl bg-white border border-emerald-100 p-4">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-xs md:text-sm font-semibold text-[#1E4B3C]">
          Prescription · Medicines, Diet & Lifestyle
        </h3>
        <p className="text-[10px] text-gray-500">
          Editable only for patients assigned to you at this center.
        </p>
      </div>

      <div className="mt-3 grid gap-3 md:grid-cols-3 text-[11px] md:text-xs">
        <textarea
          disabled={isDisabled}
          placeholder="Medicines with dose & duration"
          className="min-h-[90px] rounded-2xl border border-gray-200 bg-gray-50 px-3 py-2 outline-none focus:border-[#1E4B3C] focus:bg-white focus:ring-1 focus:ring-[#1E4B3C]"
        />
        <textarea
          disabled={isDisabled}
          placeholder="Diet advice (Pathya / Apathya)"
          className="min-h-[90px] rounded-2xl border border-gray-200 bg-gray-50 px-3 py-2 outline-none focus:border-[#1E4B3C] focus:bg-white focus:ring-1 focus:ring-[#1E4B3C]"
        />
        <textarea
          disabled={isDisabled}
          placeholder="Lifestyle / daily routine guidance"
          className="min-h-[90px] rounded-2xl border border-gray-200 bg-gray-50 px-3 py-2 outline-none focus:border-[#1E4B3C] focus:bg-white focus:ring-1 focus:ring-[#1E4B3C]"
        />
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[10px] md:text-xs">
        <button
          type="button"
          disabled={isDisabled}
          className={`rounded-full px-4 py-1.5 font-semibold ${
            isDisabled
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-[#1E4B3C] text-white hover:bg-emerald-800"
          }`}
        >
          Save Prescription
        </button>
        <p className="text-gray-500">
          Every prescription save is logged with doctor ID and timestamp.
        </p>
      </div>
    </section>
  );
};


export default PrescriptionPanel;