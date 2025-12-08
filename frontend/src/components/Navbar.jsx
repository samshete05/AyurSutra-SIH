import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bell, UserCircle2, LogOut, User, ChevronDown } from "lucide-react";
import Marquee from "react-fast-marquee";
import MainNavbar from "./MainNavbar";
import axios from "axios";

const megaMenuConfig = {
  concern: {
    title: "Therapies by Concern",
    columns: [
      { heading: "Joint & Muscle Care", items: ["Joint discomfort", "Muscle stiffness", "Mobility support"] },
      { heading: "Women's Wellness", items: ["Cycle balance", "Post-natal care", "Hormonal support"] },
      { heading: "Immunity & Vitality", items: ["Immune support", "Heart vitality", "Respiratory ease"] },
      { heading: "Mind & Sleep", items: ["Stress relief", "Sleep support", "Mental clarity"] },
      { heading: "Skin, Hair & Personal Care", items: ["Skin glow", "Hair & scalp", "Oral & daily care"] },
      { heading: "Metabolism & Gut", items: ["Digestive comfort", "Metabolic balance", "Weight harmony"] },
    ],
    highlights: [
      {
        title: "Abhyanga",
        description: "Warm herbal oil massage designed to calm the nervous system and prepare the body for deeper Panchakarma therapies.",
        imageSrc: "https://www.mattindia.com/wp-content/uploads/2024/10/Ayurvedic-Massage-Therapy-in-Kerala-Techniques-and-Benefits-999x500.jpg",
      },
      {
        title: "Swedana",
        description: "Gentle herbal steam that supports detox through sweating and relieves stiffness in joints and muscles.",
        imageSrc: "https://www.chandigarhayurvedcentre.com/wp-content/uploads/2019/09/Swedana1.jpg",
      },
      {
        title: "Basti",
        description: "Medicated enema therapy used for Vata-related issues such as dryness, pain, and constipation.",
        imageSrc: "https://aradhanaayurveda.com/wp-content/uploads/2020/09/kati-basti.jpg",
      },
    ],
  },

  doshas: {
    title: "Therapies by Dosha",
    columns: [
      { heading: "Vata-focused", items: ["Dryness & stiffness", "Sleep & anxiety", "Nervous system"] },
      { heading: "Pitta-focused", items: ["Heat & acidity", "Skin sensitivity", "Irritability"] },
      { heading: "Kapha-focused", items: ["Metabolic sluggishness", "Respiratory heaviness", "Edema"] },
      { heading: "Balancing Programs", items: ["Seasonal detox plans", "Rejuvenation programs", "Daily routines"] },
    ],
    highlights: [
      {
        title: "Vata Balancing Program",
        description: "Oil-based therapies, grounding routines, and warm diet guidance to stabilize Vata imbalance.",
        imageSrc: "https://i.ytimg.com/vi/G4DIGPf0wC8/maxresdefault.jpg",
      },
      {
        title: "Pitta Cooling Program",
        description: "Soothing therapies and lifestyle suggestions to cool excess heat and support skin & digestive comfort.",
        imageSrc: "https://www.maulirituals.com/cdn/shop/articles/Blog_post_header_7.png?v=1750068522&width=1920",
      },
    ],
  },

  bundles: {
    title: "Care Programs",
    columns: [
      { heading: "Detox & Rejuvenation", items: ["Short detox plans", "Rejuvenation packages"] },
      { heading: "Lifestyle Programs", items: ["Sleep reset", "Stress balance", "Work-life harmony"] },
      { heading: "Condition-Focused", items: ["Back care", "Migraine care", "Metabolic care"] },
    ],
    highlights: [
      {
        title: "7-Day Detox",
        description: "Structured short-term detox combining diet, mild therapies, and guidance.",
        imageSrc: "https://i.ytimg.com/vi/iIcCeiAwKp8/hq720.jpg",
      },
      {
        title: "Rejuvenation Retreat",
        description: "Longer Panchakarma-inspired schedule to rebuild strength and vitality.",
        imageSrc: "https://shathayuretreat.com/wp-content/uploads/2023/03/retreat.png.webp",
      },
    ],
  },
};

const Navbar = () => {
  const navigate = useNavigate();

  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("authToken");
  const userName = localStorage.getItem("name");
  // console.log(localStorage)

  const rawProfileImage = localStorage.getItem("profileImg");
  const profileImage =
    rawProfileImage &&
    rawProfileImage !== "null" &&
    rawProfileImage !== "undefined" &&
    rawProfileImage !== ""
      ? rawProfileImage
      : null;

  const [activeMegaKey, setActiveMegaKey] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const [unreadCount, setUnreadCount] = useState(0);

  const isLoggedIn = Boolean(token);

  // NOTIFICATIONS FETCH
  const fetchNotifications = async () => {
    if (!token || !role) return;

    const endpoint =
      role === "patient"
        ? "http://localhost:3000/patient/notifications/unread/count"
        : "http://localhost:3000/PanchKarmaCenter/getCenterNotifications";

    try {
      const res = await fetch(endpoint, { headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) {
        const data = await res.json();
        setUnreadCount(data.unreadCount || 0);
      }
    } catch (err) {}
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // CLICK OUTSIDE DROPDOWN
  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3000/patient/logout");
    } catch {}
    localStorage.clear();
    window.location.reload();
  };

  const HandleDashboardClick = () => {
    if (role === "patient") navigate("/patient");
    else if (role === "centerHead") navigate("/PanchaKarma-Dashboard");
    else navigate("/");
  };

  return (
    <header className="relative z-40">

      {/* TOP MARQUEE */}
      <div className="bg-[#1E4B3C] text-[11px] md:text-xs text-emerald-50">
        <Marquee pauseOnHover speed={40} gradient={false}>
          <span className="mx-6">Free scheduling dashboard for new Panchakarma centers.</span>
          <span className="mx-6">Secure digital therapy session records.</span>
          <span className="mx-6">Automated pre & post-therapy reminders.</span>
        </Marquee>
      </div>

      <MainNavbar />

      {/* MAIN NAV */}
      <div className="relative bg-white border-b border-emerald-100">
        <nav className="flex justify-between items-center px-4 py-3 md:px-6 lg:px-10">

          {/* LEFT LOGOS */}
          <Link to="/" className="flex items-center">
            <img src="https://res.cloudinary.com/dlty7hjfx/image/upload/v1764684761/Gemini_Generated_Image_97y8ep97y8ep97y8_n6yxoh.png" className="h-7" />
            <span className="mx-3 text-gray-300">|</span>
            <img src="https://res.cloudinary.com/dlty7hjfx/image/upload/v1764684757/All_India_Institute_of_Ayurveda_daadpq.jpg" className="h-7" />
            <span className="mx-3 text-gray-300">|</span>
            <img src="https://res.cloudinary.com/dlty7hjfx/image/upload/v1764684757/ministry-of-ayush-logo_nkde9k.png" className="h-7" />
          </Link>

          {/* CENTER MENU */}
          <div className="hidden lg:flex items-center gap-8 text-sm font-medium">

            {/* ---- Open on hover ---- */}
            <button
              onMouseEnter={() => setActiveMegaKey("concern")}
              className={`pb-1 border-b-2 ${
                activeMegaKey === "concern" ? "border-[#1E4B3C] text-[#1E4B3C]" : "border-transparent text-emerald-900"
              }`}
            >
              Therapies by Concern
            </button>

            <button
              onMouseEnter={() => setActiveMegaKey("doshas")}
              className={`pb-1 border-b-2 ${
                activeMegaKey === "doshas" ? "border-[#1E4B3C] text-[#1E4B3C]" : "border-transparent text-emerald-900"
              }`}
            >
              Therapies by Dosha
            </button>

            <button
              onMouseEnter={() => setActiveMegaKey("bundles")}
              className={`pb-1 border-b-2 ${
                activeMegaKey === "bundles" ? "border-[#1E4B3C] text-[#1E4B3C]" : "border-transparent text-emerald-900"
              }`}
            >
              Care Programs
            </button>

            <Link to="/center-map">Find Center</Link>
            <a href="https://blogs.ayursutra.online" target="_blank" rel="noreferrer">Blogs</a>
            <a href="https://shop.ayursutra.online" target="_blank" rel="noreferrer">Shop</a>
          </div>

          {/* RIGHT SIDE (PROFILE) */}
          <div className="hidden md:flex items-center gap-4">

            {!isLoggedIn && (
              <>
                <Link to="/login" className="text-slate-700 hover:text-emerald-700">
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-[#1E4B3C] px-4 py-2 rounded-full text-white font-semibold hover:bg-emerald-800 transition-colors"
                >
                  Get Started
                </Link>
              </>
            )}

            {isLoggedIn && (
              <div className="flex items-center gap-3">
              
                {userName && (
                  <span className="hidden lg:block max-w-[150px] truncate text-slate-900 font-medium">
                    {userName}
                  </span>
                )}

                {/* PROFILE DROPDOWN (UPDATED UI) */}
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex cursor-pointer items-center gap-3 px-3 py-2"
                  >
                    {/* TEXT */}
                    <div className="text-right hidden sm:block">
                      <p className="text-sm font-semibold text-slate-900">
                        {userName || "User"}
                      </p>
                      <p className="text-xs text-slate-500">
                        {role || "Account"}
                      </p>
                    </div>
              
                    {/* PROFILE IMAGE OR ICON */}
                    <div className="relative">
                      {profileImage ? (
                        <img
                          src={profileImage}
                          alt="Profile"
                          className="h-9 w-9 rounded-full object-cover border border-slate-300"
                        />
                      ) : (
                        <div className="h-9 w-9 rounded-full bg-emerald-100 flex items-center justify-center">
                          <UserCircle2 size={24} className="text-emerald-700" />
                        </div>
                      )}

                      {/* NOTIFICATION BADGE */}
                      {unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white border-2 border-white">
                          {unreadCount > 9 ? "9+" : unreadCount}
                        </span>
                      )}
                    </div>
                    
                    {/* CHEVRON */}
                    <svg
                      className={`w-4 h-4 text-slate-700 transition-transform ${
                        profileOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                    
                  {/* DROPDOWN MENU */}
                  {profileOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50 animate-fadeIn">
                      <button
                        onClick={HandleDashboardClick}
                        className="w-full cursor-pointer flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804" />
                          <path d="M12 12a5 5 0 100-10 5 5 0 000 10z" />
                        </svg>
                        <span className="font-medium">Dashboard</span>
                      </button>
                  
                      <div className="h-px bg-slate-200 my-1"></div>
                  
                      <button
                        onClick={handleLogout}
                        className="w-full cursor-pointer flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut size={18} />
                        <span className="font-medium">Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

        </nav>

        {/* ================= MEGA MENU (simple hover version) ================= */}
        {activeMegaKey && (
          <div
            className="hidden lg:block absolute left-0 right-0 bg-white shadow-[0_12px_30px_rgba(15,118,110,0.12)] border-t border-emerald-100"
            onMouseLeave={() => setActiveMegaKey(null)}
          >
            <div className="mx-auto max-w-6xl px-8 py-8 h-[50vh] overflow-y-auto">

              <h3 className="text-sm font-semibold text-[#1E4B3C] mb-5">
                {megaMenuConfig[activeMegaKey].title}
              </h3>

              <div className="grid gap-8 lg:grid-cols-4 xl:grid-cols-5 text-sm">
                
                {/* Columns */}
                <div className="lg:col-span-3 xl:col-span-3">
                  <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-8">
                    {megaMenuConfig[activeMegaKey].columns.map((col) => (
                      <div key={col.heading}>
                        <p className="font-semibold text-emerald-900 mb-2">{col.heading}</p>
                        <ul className="space-y-1 text-xs text-gray-600">
                          {col.items.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Highlights */}
                <div className="lg:col-span-1 xl:col-span-2 border-l border-emerald-100 pl-6 space-y-4">
                  <p className="text-xs font-semibold text-emerald-900 uppercase tracking-wide">
                    Panchakarma Highlights
                  </p>

                  {megaMenuConfig[activeMegaKey].highlights.map((h) => (
                    <div key={h.title} className="rounded-xl bg-white border border-emerald-100 shadow-sm overflow-hidden">
                      <div className="h-20 w-full overflow-hidden">
                        <img src={h.imageSrc} className="h-full w-full object-cover" />
                      </div>
                      <div className="p-3">
                        <h4 className="text-xs font-semibold text-[#1E4B3C]">{h.title}</h4>
                        <p className="mt-1 text-[11px] text-gray-600">{h.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

              </div>

            </div>
          </div>
        )}

      </div>
    </header>
  );
};

export default Navbar;
// Fully Working but not 
