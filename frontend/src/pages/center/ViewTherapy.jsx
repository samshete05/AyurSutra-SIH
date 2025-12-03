// pages/Center/ViewTherapies.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, DollarSign, CheckCircle2, X } from "lucide-react";
import CenterLayout from "../../layouts/CenterLayout";
import axios from "axios";

const ViewTherapies = () => {
  const email = localStorage.getItem("email");
  const [therapiesData, setTherapiesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTherapy, setSelectedTherapy] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTherapies = async () => {
      try {
        const res = await axios.post("http://localhost:3000/PanchKarmaCenter/get-therapies", {
          email: email,
        });
        setTherapiesData(res.data.getAllTherapy);
      } catch (err) {
        console.error("Error fetching therapies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTherapies();
  }, []);

  return (
    <CenterLayout showSearch={true} searchPlaceholder="Search therapies...">
      <div className="px-4 py-6 md:px-8 md:py-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-slate-500">Panchakarma Center Therapy Catalog</p>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-800">
              Therapy Packages ({therapiesData.length})
            </h1>
          </div>

          <button
            onClick={() => navigate("/add-therapy")}
            className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-600"
          >
            <Plus className="h-4 w-4" />
            Add New
          </button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
          {therapiesData.map((therapy) => (
            <div
              key={therapy._id}
              onClick={() => setSelectedTherapy(therapy)}
              className="cursor-pointer overflow-hidden rounded-3xl bg-white shadow-md hover:shadow-xl border border-slate-100 hover:border-emerald-200 transition-all duration-300 group"
            >
              <div className="h-44 w-full overflow-hidden">
                <img
                  src={therapy.TherapyImg}
                  alt={therapy.therapyName}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 space-y-3">
                <h3 className="text-lg font-bold text-emerald-900 line-clamp-2">
                  {therapy.therapyName}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-3">{therapy.description}</p>
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-700 font-semibold mb-1">
                    <DollarSign className="h-4 w-4 text-emerald-500" />
                    Price
                  </div>
                  <div className="text-xl font-black text-emerald-600">{therapy.price}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* POP WINDOW */}
      {selectedTherapy && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[95vh] shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
            <div className="h-64 w-full bg-slate-200 relative">
              <img
                src={selectedTherapy.TherapyImg}
                alt={selectedTherapy.therapyName}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedTherapy(null)}
                className="absolute top-3 right-3 bg-white/90 p-2 rounded-full shadow text-slate-900 hover:bg-white transition"
              >
                <X className="w-5 h-5 cursor-pointer" />
              </button>
            </div>

            <div className="flex-1 p-8 overflow-y-auto space-y-6">
              <h2 className="text-2xl font-bold text-emerald-800">{selectedTherapy.therapyName}</h2>

              <div>
                <div className="flex items-center gap-2 text-base text-slate-800 font-bold mb-2">
                  <DollarSign className="h-5 w-5 text-emerald-600" />
                  <span>Price</span>
                </div>
                <div className="text-xl font-black text-emerald-700 mb-4">{selectedTherapy.price}</div>
              </div>

              <div>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                  {selectedTherapy.description}
                </p>
              </div>

              <div>
                <button className="w-full mt-4 py-3 bg-gradient-to-r from-emerald-500 to-emerald-700 rounded-2xl text-lg font-bold text-white shadow-lg hover:from-emerald-600 hover:to-emerald-800 transition">
                  Book Therapy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </CenterLayout>
  );
};

export default ViewTherapies;
