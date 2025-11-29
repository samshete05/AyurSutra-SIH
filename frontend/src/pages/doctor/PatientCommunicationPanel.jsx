const PatientCommunicationPanel = ({ messages }) => {
  return (
    <section className="mt-4 rounded-3xl bg-emerald-50/70 border border-emerald-100 p-4">
      <h3 className="text-xs md:text-sm font-semibold text-[#1E4B3C] mb-2">
        Patient Communication
      </h3>
      <div className="grid gap-3 md:grid-cols-3 text-[11px] md:text-xs">
        <div className="md:col-span-2 max-h-40 overflow-y-auto space-y-2 pr-1">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`max-w-sm rounded-2xl px-3 py-2 ${
                msg.from === "doctor"
                  ? "ml-auto bg-[#1E4B3C] text-white"
                  : "mr-auto bg-white border border-emerald-100 text-gray-800"
              }`}
            >
              <p>{msg.text}</p>
              <p className="mt-1 text-[9px] opacity-70 text-right">
                {msg.timeLabel}
              </p>
            </div>
          ))}
          {messages.length === 0 && (
            <p className="text-gray-500">No messages exchanged yet.</p>
          )}
        </div>
        <div>
          <textarea
            placeholder="Type a secure message to the patient…"
            className="h-24 w-full rounded-2xl border border-gray-200 bg-gray-50 px-3 py-2 outline-none focus:border-[#1E4B3C] focus:bg-white focus:ring-1 focus:ring-[#1E4B3C]"
          />
          <button
            type="button"
            className="mt-2 rounded-full bg-[#1E4B3C] px-4 py-1.5 font-semibold text-white hover:bg-emerald-800"
          >
            Send Message
          </button>
        </div>
      </div>
      <p className="mt-2 text-[10px] text-gray-500">
        All messages are logged with timestamps to support clinical safety and
        audit requirements.
      </p>
    </section>
  );
};

export default PatientCommunicationPanel;