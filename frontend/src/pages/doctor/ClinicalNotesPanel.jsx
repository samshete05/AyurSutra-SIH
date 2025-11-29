const ClinicalNotesPanel = ({ notes, onAddNote }) => {
  return (
    <section className="mt-4 rounded-3xl bg-white border border-emerald-100 p-4">
      <h3 className="text-xs md:text-sm font-semibold text-[#1E4B3C] mb-2">
        Clinical Notes (Session‑wise)
      </h3>
      <div className="grid gap-3 md:grid-cols-2 text-[11px] md:text-xs">
        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          {notes.map((entry) => (
            <div
              key={entry.id}
              className="rounded-2xl bg-emerald-50/60 border border-emerald-100 p-2"
            >
              <p className="font-semibold text-emerald-900">
                {entry.sessionLabel} · {entry.dateLabel}
              </p>
              <p className="mt-1 text-gray-700 whitespace-pre-wrap">
                {entry.text}
              </p>
            </div>
          ))}
          {notes.length === 0 && (
            <p className="text-gray-500">No notes recorded yet.</p>
          )}
        </div>
        <div>
          <textarea
            placeholder="Add new note for this session (SOAP format, adverse reactions, observations)…"
            className="h-32 w-full rounded-2xl border border-gray-200 bg-gray-50 px-3 py-2 outline-none focus:border-[#1E4B3C] focus:bg-white focus:ring-1 focus:ring-[#1E4B3C]"
          />
          <button
            type="button"
            className="mt-2 rounded-full bg-[#1E4B3C] px-4 py-1.5 text-[11px] font-semibold text-white hover:bg-emerald-800"
          >
            Save Note
          </button>
        </div>
      </div>
    </section>
  );
};

export default ClinicalNotesPanel;