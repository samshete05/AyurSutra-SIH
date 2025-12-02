import React, { useState, useMemo, useEffect } from "react";
import { Heart, Clock4, Pill, Info } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const statusOptions = ["all", "ongoing", "completed", "paused"];

function MyTreatmentsPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [likedIds, setLikedIds] = useState(new Set());
  const [treatments, setTreatments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch treatments on mount
  useEffect(() => {
    fetchTreatments();
  }, []);

  const fetchTreatments = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        navigate("/login");
        return;
      }

      const resp = await axios.get("http://localhost:3000/patient/getMyTreatments", {
        headers: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true
      });

      if (resp.data.message === "Success") {
        setTreatments(resp.data.treatments);
      }
      setLoading(false);
    } catch (err) {
      console.error("Error fetching treatments:", err);
      setLoading(false);
      if (err.response?.status === 401) {
        alert("Session expired. Please login again.");
        navigate("/login");
      }
    }
  };

  const filteredTreatments = useMemo(() => {
    const needle = search.trim().toLowerCase();

    return treatments.filter((t) => {
      if (statusFilter !== "all" && t.status !== statusFilter) return false;
      if (needle && !t.treatmentName?.toLowerCase().includes(needle)) return false;
      return true;
    });
  }, [search, statusFilter, treatments]);

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

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getStatusLabel = (status) => {
    switch(status) {
      case 'ongoing': return 'Active Treatment';
      case 'completed': return 'Completed Treatment';
      case 'paused': return 'Paused Treatment';
      default: return 'Treatment';
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F5F7F6] px-4 py-8">
        <div className="max-w-5xl mx-auto text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-emerald-600 border-t-transparent"></div>
          <p className="text-slate-500 mt-4">Loading treatments...</p>
        </div>
      </main>
    );
  }

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
            <div className="text-center py-12 bg-white rounded-3xl shadow-[0_10px_30px_rgba(15,23,42,0.06)] border border-emerald-50">
              <svg className="mx-auto h-16 w-16 text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-slate-500 text-lg font-semibold">No treatments found</p>
              <p className="text-sm text-slate-400 mt-2">Your treatment history will appear here</p>
            </div>
          ) : (
            filteredTreatments.map((t) => {
              const liked = likedIds.has(t._id);
              return (
                <div
                  key={t._id}
                  className="rounded-3xl bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)] border border-emerald-50 px-4 py-4 md:px-5 md:py-5"
                >
                  <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-stretch">
                    {/* Image side - placeholder since we don't have images in DB */}
                    <div className="md:w-[32%]">
                      <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-emerald-100 to-emerald-50 aspect-video md:aspect-square flex items-center justify-center">
                        <Pill size={48} className="text-emerald-600" />
                      </div>
                    </div>

                    {/* Info side */}
                    <div className="md:w-[68%] flex flex-col justify-between gap-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <p className="text-[11px] font-medium tracking-wide text-emerald-700 uppercase">
                            {getStatusLabel(t.status)}
                          </p>
                          <p className="text-xs text-slate-500 flex items-center gap-1">
                            <Clock4 className="w-3 h-3" />
                            {formatDate(t.startDate)} – {formatDate(t.endDate)}
                          </p>
                          <h2 className="text-lg md:text-xl font-semibold text-slate-900 mt-1">
                            {t.treatmentName || "Untitled Treatment"}
                          </h2>
                        </div>

                        <button
                          type="button"
                          onClick={() => toggleLike(t._id)}
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

                      {/* Bottom row: Medicines / Procedures / Progress */}
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                        {/* Medicines */}
                        <div className="space-y-1">
                          <p className="text-[11px] font-semibold text-slate-700 flex items-center gap-1">
                            <Pill className="w-3 h-3 text-emerald-600" />
                            Medicines
                          </p>
                          {t.medications && t.medications.length > 0 ? (
                            <div className="text-xs text-slate-600 space-y-1">
                              {t.medications.slice(0, 3).map((med, idx) => (
                                <p key={idx} className="leading-relaxed">
                                  {med.name} - {med.dosage} ({med.frequency})
                                </p>
                              ))}
                              {t.medications.length > 3 && (
                                <p className="text-emerald-600 font-medium">
                                  +{t.medications.length - 3} more
                                </p>
                              )}
                            </div>
                          ) : (
                            <p className="text-xs text-slate-400">No medications prescribed</p>
                          )}
                        </div>

                        {/* Procedures */}
                        <div className="space-y-1">
                          <p className="text-[11px] font-semibold text-slate-700">
                            Procedures
                          </p>
                          {t.procedures && t.procedures.length > 0 ? (
                            <div className="text-xs text-slate-600 space-y-1">
                              {t.procedures.slice(0, 3).map((proc, idx) => (
                                <p key={idx} className="leading-relaxed">
                                  {proc.name}
                                </p>
                              ))}
                              {t.procedures.length > 3 && (
                                <p className="text-emerald-600 font-medium">
                                  +{t.procedures.length - 3} more
                                </p>
                              )}
                            </div>
                          ) : (
                            <p className="text-xs text-slate-400">No procedures scheduled</p>
                          )}
                        </div>

                        {/* Progress Notes */}
                        <div className="space-y-1">
                          <p className="text-[11px] font-semibold text-slate-700 flex items-center gap-1">
                            <Info className="w-3 h-3 text-emerald-600" />
                            Progress Notes
                          </p>
                          {t.progress && t.progress.length > 0 ? (
                            <div className="text-xs text-slate-600 space-y-1">
                              <p className="leading-relaxed line-clamp-3">
                                {t.progress[t.progress.length - 1].notes}
                              </p>
                              <p className="text-emerald-600 font-medium">
                                {t.progress.length} note(s) recorded
                              </p>
                            </div>
                          ) : (
                            <p className="text-xs text-slate-400">No progress notes yet</p>
                          )}
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
