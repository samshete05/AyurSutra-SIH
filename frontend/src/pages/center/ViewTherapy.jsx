import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faMoon } from "@fortawesome/free-solid-svg-icons";
import {
  Search,
  Plus,
  DollarSign,
  CheckCircle2,
  X,
} from "lucide-react";
import SidePanel from "../../components/CenterSidePanel";
import Logo from "../../components/SidePanelLogo";
import CenterNavbarProfile from "./CenterNavbarProfile";

// Therapy data
const therapies = [
  {
    id: 1,
    name: "Abhyanga - Herbal Oil Massage",
    shortDesc: "Warm herbal oil massage for detoxification and deep relaxation.",
    fullDesc:
      "Abhyanga is an ancient Ayurvedic full-body massage using warm sesame oil infused with healing herbs. Rhythmic strokes help detoxify tissues, improve circulation, relax muscles, and balance Vata dosha. Ideal for stress relief, stiffness, and overall rejuvenation at the Panchakarma center.",
    price: "₹2,500",
    benefits: [
      "Removes toxins from tissues",
      "Relieves fatigue and relaxes muscles",
      "Improves blood circulation",
      "Enhances skin texture and glow",
    ],
    image: "https://bhagwatiayurveda.com/wp-content/uploads/2023/12/1212949-560x373-1.jpg",
  },
  {
    id: 2,
    name: "Shirodhara - Third Eye Therapy",
    shortDesc: "Gentle oil stream on forehead to calm mind and nerves.",
    fullDesc:
      "Shirodhara pours a gentle stream of warm medicated oil on the forehead (third eye region). It soothes the nervous system, reduces mental fatigue, supports deeper sleep and helps manage headaches and anxiety for Panchakarma guests.",
    price: "₹3,200",
    benefits: [
      "Deep mental relaxation",
      "Improves quality of sleep",
      "Reduces stress and anxiety",
    ],
    image: "https://www.ayurcentre.in/images/abhyanga-ayurvedic-therapy.jpg",
  },
  {
    id: 3,
    name: "Basti - Herbal Enema Therapy",
    shortDesc: "Herbal decoction enema to cleanse colon and balance Vata.",
    fullDesc:
      "Basti is a key Panchakarma therapy where warm herbal decoctions and oils are administered as an enema. It deeply cleanses the colon, improves digestion, supports joint health, and balances Vata dosha in chronic conditions.",
    price: "₹4,500",
    benefits: [
      "Deep colon cleansing",
      "Relieves chronic constipation",
      "Supports joint and lower back health",
    ],
    image:
      "https://www.deepayurveda.in/cdn/shop/files/abhyanga-ayurvedic-body-massage.png?v=1746019383&width=2000",
  },
  {
    id: 4,
    name: "Nasya - Nasal Therapy",
    shortDesc: "Medicated oil drops in nostrils for sinus and head clarity.",
    fullDesc:
      "Nasya includes facial massage, steam and administration of herbal oil drops into the nostrils. It helps clear sinuses, improves breathing, sharpens senses and is useful in headaches and allergies.",
    price: "₹1,800",
    benefits: [
      "Clears sinus congestion",
      "Reduces recurrent headaches",
      "Improves breathing and mental clarity",
    ],
    image: "https://www.ayurcentre.in/images/abhyanga-ayurvedic-therapy.jpg",
  },
];

const ViewTherapies = () => {
  const [selectedTherapy, setSelectedTherapy] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredTherapies = therapies.filter(
    (therapy) =>
      therapy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      therapy.shortDesc.toLowerCase().includes(searchTerm.toLowerCase())
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
        {/* Top bar */}
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 md:px-8">
          <div className="flex items-center gap-3">
            <button className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-xl md:hidden">
              ☰
            </button>
            <div className="relative hidden items-center md:flex">
              <span className="pointer-events-none absolute left-3 text-slate-400">
                <Search className="h-5 w-5 text-gray-500" />
              </span>
              <input
                className="h-10 w-64 rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm outline-none placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-100"
                placeholder="Search therapies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-slate-100">
              <FontAwesomeIcon icon={faMoon} className="text-base text-slate-600" />
            </button>
            <button className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-slate-100">
              <FontAwesomeIcon icon={faBell} className="text-base text-slate-600" />
            </button>
            <CenterNavbarProfile/>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 bg-slate-100 px-4 py-6 md:px-8 md:py-8">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm text-slate-500">Panchakarma Center Therapy Catalog</p>
              <h1 className="text-2xl font-semibold tracking-tight text-slate-800">
                Therapy Packages ({filteredTherapies.length})
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

          {/* Cards: name + short description + price */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
            {filteredTherapies.map((therapy) => (
              <div
                key={therapy.id}
                onClick={() => setSelectedTherapy(therapy)}
                className="cursor-pointer overflow-hidden rounded-3xl bg-white shadow-md hover:shadow-xl border border-slate-100 hover:border-emerald-200 transition-all duration-300 group"
              >
                <div className="h-44 w-full overflow-hidden">
                  <img
                    src={therapy.image}
                    alt={therapy.name}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 space-y-3">
                  <h3 className="text-lg font-bold text-emerald-900 line-clamp-2">
                    {therapy.name}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-3">
                    {therapy.shortDesc}
                  </p>
                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-700 font-semibold mb-1">
                      <DollarSign className="h-4 w-4 text-emerald-500" />
                      Price
                    </div>
                    <div className="text-xl font-black text-emerald-600">
                      {therapy.price}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* POP WINDOW – medium size, full details */}
      {selectedTherapy && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[95vh] shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
            {/* Header image */}
            <div className="h-64 w-full bg-slate-200 relative">
              <img
                src={selectedTherapy.image}
                alt={selectedTherapy.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedTherapy(null)}
                className="absolute top-3 right-3 bg-white/90 p-2 rounded-full shadow text-slate-900 hover:bg-white transition"
              >
                <X className="w-5 h-5 cursor-pointer" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 p-8 overflow-y-auto space-y-6">
              {/* Name */}
              <h2 className="text-2xl font-bold text-emerald-800">
                {selectedTherapy.name}
              </h2>

              {/* Price */}
              <div>
                <div className="flex items-center gap-2 text-base text-slate-800 font-bold mb-2">
                  <DollarSign className="h-5 w-5 text-emerald-600" />
                  <span>Price</span>
                </div>
                <div className="text-xl font-black text-emerald-700 mb-4">
                  {selectedTherapy.price}
                </div>
              </div>

              {/* Full description */}
              <div>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                  {selectedTherapy.fullDesc}
                </p>
              </div>

              {/* Key benefits */}
              <div>
                <div className="flex items-center gap-2 text-base text-emerald-700 font-bold mb-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  <span>Key Benefits</span>
                </div>
                <ul className="space-y-2">
                  {selectedTherapy.benefits.map((b, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-sm md:text-base text-slate-800"
                    >
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div>
                <button className="w-full mt-4 py-3 bg-gradient-to-r from-emerald-500 to-emerald-700 rounded-2xl text-lg font-bold text-white shadow-lg hover:from-emerald-600 hover:to-emerald-800 transition">
                  Book Therapy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewTherapies;
