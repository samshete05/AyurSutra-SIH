import React, { useState, useMemo } from "react";
import { Heart, Clock4, Pill, Info } from "lucide-react";
import treatments from "../../data/treatments";

const statusOptions = ["all", "active", "completed"];

function MyTreatmentsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [likedIds, setLikedIds] = useState(new Set());

  const filteredTreatments = useMemo(() => {
    const needle = search.trim().toLowerCase();

    return treatments.filter((t) => {
      if (statusFilter !== "all" && t.status !== statusFilter) return false;
      if (needle && !t.name.toLowerCase().includes(needle)) return false;
      return true;
    });
  }, [search, statusFilter]);

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("all");
  };

  const toggleLike = (id) => {
    setLikedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <main className="min-h-screen bg-[#F5F7F6] px-4 py-8">
      <section className="max-w-5xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">My Treatments</h1>
          <p className="mt-1 text-sm text-slate-600 max-w-xl">
            Track your active and completed treatment plans, medicines, and instructions here.
          </p>
        </header>

        {/* Filters */}
        <section className="mb-8 flex flex-col sm:flex-row gap-3 max-w-3xl">
          <input
            type="search"
            className="flex-1 px-4 py-2 rounded-full border border-slate-200 bg-white text-sm text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
            placeholder="Search treatments..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="px-4 py-2 rounded-full border border-slate-200 bg-white text-sm text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            {statusOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt.charAt(0).toUpperCase() + opt.slice(1)}
              </option>
            ))}
          </select>
          <button
            onClick={clearFilters}
            className="px-4 py-2 rounded-full bg-emerald-700 text-white text-sm font-medium shadow-sm hover:bg-emerald-800 transition"
          >
            Clear Filters
          </button>
        </section>

        {/* Treatments list */}
        <section className="space-y-6">
          {filteredTreatments.length === 0 ? (
            <p className="text-center text-slate-500 text-sm">
              No treatments found.
            </p>
          ) : (
            filteredTreatments.map((t) => {
              const liked = likedIds.has(t.id);
              return (
                <div
                  key={t.id}
                  className="rounded-3xl bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)] border border-emerald-50 px-4 py-4 md:px-5 md:py-5"
                >
                  <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-stretch">
                    {/* Image side */}
                    <div className="md:w-[32%]">
                      <div className="rounded-2xl overflow-hidden bg-slate-100 aspect-video md:aspect-square">
                        <img
                          src={t.image}
                          alt={t.name}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                      </div>
                    </div>

                    {/* Info side */}
                    <div className="md:w-[68%] flex flex-col justify-between gap-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <p className="text-[11px] font-medium tracking-wide text-emerald-700 uppercase">
                            {t.status === "active" ? "Active Treatment" : "Completed Treatment"}
                          </p>
                          <p className="text-xs text-slate-500 flex items-center gap-1">
                            <Clock4 className="w-3 h-3" />
                            {t.startDate} – {t.endDate}
                          </p>
                          <h2 className="text-lg md:text-xl font-semibold text-slate-900 mt-1">
                            {t.name}
                          </h2>
                        </div>

                        <button
                          type="button"
                          onClick={() => toggleLike(t.id)}
                          className="shrink-0 rounded-full border border-slate-200 w-8 h-8 flex items-center justify-center text-slate-400 hover:text-emerald-600 hover:border-emerald-200 transition"
                          aria-label="Favourite treatment"
                        >
                          <Heart
                            size={18}
                            className={
                              liked
                                ? "fill-emerald-500 text-emerald-500"
                                : "text-slate-400"
                            }
                          />
                        </button>
                      </div>

                      {/* Bottom row: Medicines / Instructions / Details */}
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                        {/* Medicines */}
                        <div className="space-y-1">
                          <p className="text-[11px] font-semibold text-slate-700 flex items-center gap-1">
                            <Pill className="w-3 h-3 text-emerald-600" />
                            Medicines
                          </p>
                          <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                            {t.medicines?.join(", ")}
                          </p>
                        </div>

                        {/* Key instructions */}
                        <div className="space-y-1">
                          <p className="text-[11px] font-semibold text-slate-700">
                            Key instructions
                          </p>
                          <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                            {t.instructions}
                          </p>
                        </div>

                        {/* Treatment details */}
                        <div className="space-y-1">
                          <p className="text-[11px] font-semibold text-slate-700 flex items-center gap-1">
                            <Info className="w-3 h-3 text-emerald-600" />
                            Treatment details
                          </p>
                          <p className="text-xs text-slate-600 leading-relaxed line-clamp-4">
                            {t.details ||
                              "This therapy helps restore balance in body and mind, supports detoxification, improves circulation, and promotes deep relaxation for better sleep, digestion, and overall vitality."}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </section>
      </section>
    </main>
  );
}

export default MyTreatmentsPage;