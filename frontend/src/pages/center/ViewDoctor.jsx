import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faMoon } from "@fortawesome/free-solid-svg-icons";
import { Search, Plus, User2, Phone, Mail, Stethoscope, X } from "lucide-react";
import SidePanel from "../../components/CenterSidePanel";
import Logo from "../../components/SidePanelLogo";
import CenterNavbarProfile from "./CenterNavbarProfile";
import axios from "axios";

const ViewDoctors = () => {
  const email = localStorage.getItem("email");

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.post(
          "http://localhost:3000/PanchKarmaCenter/get-doctors",
          { email }
        );
  
        setDoctors(res.data.getAllDr || []);
      } catch (err) {
        console.error("Error fetching doctors:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const filteredDoctors = doctors.filter((doc) =>
    doc.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-slate-100 text-slate-800">
      {/* Sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white px-6 py-6 md:flex md:flex-col">
        <Logo />
        <SidePanel />
      </aside>

      {/* Right side */}
      <div className="flex min-h-screen flex-1 flex-col">
        {/* Top navbar */}
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 md:px-8">
          <div className="flex items-center gap-3">
            <div className="relative hidden items-center md:flex">
              <span className="pointer-events-none absolute left-3 text-slate-400">
                <Search className="h-5 w-5 text-gray-500" />
              </span>

              <input
                className="h-10 w-64 rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm placeholder:text-slate-400"
                placeholder="Search doctors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100">
              <FontAwesomeIcon icon={faMoon} />
            </button>
            <button className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100">
              <FontAwesomeIcon icon={faBell} />
            </button>
            <CenterNavbarProfile />
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 px-4 py-6 md:px-8 md:py-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Panchakarma Center — Doctors</p>
              <h1 className="text-2xl font-semibold tracking-tight">
                Doctors ({filteredDoctors.length})
              </h1>
            </div>

            <button
              onClick={() => navigate("/add-doctor")}
              className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-600"
            >
              <Plus className="h-4 w-4" /> Add New
            </button>
          </div>

          {/* Doctor Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
            {filteredDoctors.map((doc) => (
              <div
                key={doc._id}
                onClick={() => setSelectedDoctor(doc)}
                className="cursor-pointer overflow-hidden rounded-3xl bg-white shadow-md hover:shadow-xl border border-slate-100 hover:border-emerald-200 transition-all duration-300"
              >
                {/* FIXED IMAGE - FULL, NOT CROPPED */}
                <div className="h-48 w-full flex justify-center items-center bg-white rounded-t-3xl overflow-hidden">
  <img
    src={doc.profileImg}
    alt={doc.fullName}
    className="h-full object-contain"
  />
</div>
                {/* Card content */}
                <div className="p-5 space-y-2">
                  <h3 className="text-lg font-bold text-emerald-900">
                    {doc.fullName}
                  </h3>

                  <p className="text-xs text-slate-500">{doc.speciality}</p>

                  <p className="text-xs text-slate-700">
                    <b>Experience:</b> {doc.experience} yrs
                  </p>

                  <p className="text-xs">
                    <b>Status:</b>{" "}
                    <span
                      className={`font-semibold ${
                        doc.status === "Active"
                          ? "text-emerald-600"
                          : "text-rose-600"
                      }`}
                    >
                      {doc.status}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* POP-UP DOCTOR DETAILS */}
      {selectedDoctor && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-3xl shadow-2xl overflow-hidden">
            {/* Big image */}
            <div className="h-96 w-full overflow-hidden">
              <img
                src={selectedDoctor.profileImg}
                alt={selectedDoctor.fullName}
                className="h-48 w-full object-cover"
              />
              <button
                onClick={() => setSelectedDoctor(null)}
                className="absolute top-5 right-5 bg-white px-2 py-2 rounded-full shadow hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-8 space-y-4">
              <h2 className="text-2xl font-bold text-emerald-700">
                {selectedDoctor.fullName}
              </h2>

              <p className="text-sm text-slate-700">{selectedDoctor.bio}</p>

              <div className="space-y-1 text-sm text-slate-700">
                <p>
                  <Stethoscope className="inline h-4 w-4 text-emerald-600 mr-2" />
                  {selectedDoctor.speciality}
                </p>
                <p>
                  <User2 className="inline h-4 w-4 text-emerald-600 mr-2" />
                  Experience: {selectedDoctor.experience} yrs
                </p>
                <p>
                  <Phone className="inline h-4 w-4 text-emerald-600 mr-2" />
                  {selectedDoctor.phone}
                </p>
                <p>
                  <Mail className="inline h-4 w-4 text-emerald-600 mr-2" />
                  {selectedDoctor.email}
                </p>
                <p>
                  <b>Status:</b>{" "}
                  <span
                    className={`font-semibold ${
                      selectedDoctor.status === "Active"
                        ? "text-emerald-600"
                        : "text-rose-600"
                    }`}
                  >
                    {selectedDoctor.status}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewDoctors;
