import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faMoon } from "@fortawesome/free-solid-svg-icons";
import { Search, Plus, User2, Phone, Mail, Stethoscope, X, MapPin } from "lucide-react";
import SidePanel from "../../components/CenterSidePanel";
import Logo from "../../components/SidePanelLogo";
import CenterNavbarProfile from "./CenterNavbarProfile";
import axios from "axios";
import CenterNavbar from "./CenterNavbar";

const ViewTherapists = () => {
  const email = localStorage.getItem("email");

  const [therapists, setTherapists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTherapist, setSelectedTherapist] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTherapists = async () => {
      try {
        const res = await axios.post(
          "http://localhost:3000/PanchKarmaCenter/get-therapists",
          { email }
        );
   console.log(res);
        setTherapists(res.data.getAllTherapist || []);
      } catch (err) {
        console.error("Error fetching therapists:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTherapists();
  }, []);

  const filteredTherapists = therapists.filter((t) =>
    t.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-slate-100 text-slate-800">
      {/* Sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white px-6 py-6 md:flex md:flex-col">
        <Logo />
        <SidePanel />
      </aside>

      {/* Right Panel */}
      <div className="flex min-h-screen flex-1 flex-col">
        {/* Top Navbar */}
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 md:px-8">
          <div className="flex items-center gap-3">
            <div className="relative hidden md:flex items-center">
              <span className="pointer-events-none absolute left-3 text-slate-400">
                <Search className="h-5 w-5 text-gray-500" />
              </span>

              <input
                className="h-10 w-64 rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm placeholder:text-slate-400"
                placeholder="Search therapists..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <CenterNavbar />
        </header>

        {/* Content */}
        <main className="flex-1 px-4 py-6 md:px-8 md:py-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Panchakarma Center — Therapists</p>
              <h1 className="text-2xl font-semibold tracking-tight">
                Therapists ({filteredTherapists.length})
              </h1>
            </div>

            <button
              onClick={() => navigate("/add-therapist")}
              className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-600"
            >
              <Plus className="h-4 w-4" /> Add New
            </button>
          </div>

          {/* Therapist Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-7">
            {filteredTherapists.map((t) => (
              <div
                key={t._id}
                onClick={() => setSelectedTherapist(t)}
                className="cursor-pointer rounded-3xl bg-white shadow-md hover:shadow-xl border border-slate-100 hover:border-emerald-200 transition-all duration-300 overflow-hidden"
              >
                {/* Image FIXED SIZE */}
                <div className="h-48 w-full overflow-hidden">
                  <img
                    src={t.therapistImg}
                    alt={t.fullName}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-5 space-y-2">
                  <h3 className="text-lg font-bold text-emerald-900">{t.fullName}</h3>
                  <p className="text-xs text-slate-500">{t.specialization}</p>
                  <p className="text-xs text-slate-700">
                    <b>Experience:</b> {t.experience} yrs
                  </p>
                  <p className="text-xs text-slate-700">
                    <b>Qualification:</b> {t.qualification}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* POPUP MODAL */}
      {selectedTherapist && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-3xl shadow-2xl overflow-hidden relative">

            {/* Large Image */}
            <div className="h-72 w-full overflow-hidden">
              <img
                src={selectedTherapist.therapistImg}
                alt={selectedTherapist.fullName}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Close Button */}
            <button
              onClick={() => setSelectedTherapist(null)}
              className="absolute top-6 right-6 bg-white p-2 rounded-full shadow hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Content */}
            <div className="p-8 space-y-4">
              <h2 className="text-2xl font-bold text-emerald-700">
                {selectedTherapist.fullName}
              </h2>

              <p className="text-sm text-slate-700">{selectedTherapist.specialization}</p>

              <div className="space-y-2 text-sm text-slate-700">
                <p>
                  <User2 className="inline h-4 w-4 text-emerald-600 mr-2" />
                  Experience: {selectedTherapist.experience} yrs
                </p>

                <p>
                  <Stethoscope className="inline h-4 w-4 text-emerald-600 mr-2" />
                  Qualification: {selectedTherapist.qualification}
                </p>

                <p>
                  <Phone className="inline h-4 w-4 text-emerald-600 mr-2" />
                  {selectedTherapist.phone}
                </p>

                {selectedTherapist.email && (
                  <p>
                    <Mail className="inline h-4 w-4 text-emerald-600 mr-2" />
                    {selectedTherapist.email}
                  </p>
                )}

                <p>
                  <MapPin className="inline h-4 w-4 text-emerald-600 mr-2" />
                  {selectedTherapist.address}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewTherapists;
