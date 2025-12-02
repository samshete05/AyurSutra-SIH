// Navbar.jsx
import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
      { heading: "Metabolism & Gut", items: ["Digestive comfort", "Metabolic balance", "Weight harmony"] }
    ],
    highlights: [
      {
        title: "Abhyanga",
        description: "Warm herbal oil massage designed for deep relaxation.",
        imageSrc: "https://www.mattindia.com/wp-content/uploads/2024/10/Ayurvedic-Massage-Therapy-in-Kerala-Techniques-and-Benefits-999x500.jpg",
      },
      {
        title: "Swedana",
        description: "Herbal steam therapy relieving stiffness.",
        imageSrc: "https://www.chandigarhayurvedcentre.com/wp-content/uploads/2019/09/Swedana1.jpg",
      },
      {
        title: "Basti",
        description: "Medicated enema used for Vata-related disorders.",
        imageSrc: "https://aradhanaayurveda.com/wp-content/uploads/2020/09/kati-basti.jpg",
      },
    ],
  },
  // Other menu configs…
};

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const [activeMegaKey, setActiveMegaKey] = useState(null);

  // Profile Dropdown
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  const handleOpenMega = (key) => setActiveMegaKey(key);
  const handleCloseMega = () => setActiveMegaKey(null);

  // Logout
  const handleLogout = async () => {
    await axios.post("http://localhost:3000/patient/logout");
    localStorage.removeItem("authToken");
    window.location.reload();
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const activeMega = activeMegaKey ? megaMenuConfig[activeMegaKey] : null;

  return (
    <header className="relative z-40">
      {/* Top marquee */}
      <div className="bg-[#1E4B3C] text-[11px] md:text-xs text-emerald-50">
        <Marquee pauseOnHover speed={40} gradient={false}>
          <span className="mx-6">Free scheduling dashboard for 3 months!</span>
          <span className="mx-6">Secure digital patient therapy records.</span>
          <span className="mx-6">Automated reminders for therapy routines.</span>
        </Marquee>
      </div>

      <MainNavbar />

      {/* Main navbar */}
      <div className="relative bg-white border-b border-emerald-100" onMouseLeave={handleCloseMega}>
        <nav className="flex w-full items-center justify-between px-4 py-3 md:px-6 lg:px-10">

          {/* LEFT LOGOS */}
          <Link to="/" className="flex items-center text-gray-400">
            <img src="Gemini_Generated_Image_97y8ep97y8ep97y8.png" className="h-7" />
            <span className="mx-3 text-gray-300">|</span>
            <img src="All_India_Institute_of_Ayurveda.jpg" className="h-7" />
            <span className="mx-3 text-gray-300">|</span>
            <img src="ministry-of-ayush-logo.png" className="h-7" />
          </Link>

          {/* Mega menu buttons */}
          <div className="hidden lg:flex items-center gap-8 text-sm font-medium">
            <button type="button"
              onMouseEnter={() => handleOpenMega("concern")}
              className={`pb-1 border-b-2 ${activeMegaKey === "concern" ? "border-[#1E4B3C] text-[#1E4B3C]" : "border-transparent text-emerald-900 hover:text-[#1E4B3C]"}`}
            >Therapies by Concern</button>

            <button type="button"
              onMouseEnter={() => handleOpenMega("doshas")}
              className={`pb-1 border-b-2 ${activeMegaKey === "doshas" ? "border-[#1E4B3C] text-[#1E4B3C]" : "border-transparent text-emerald-900 hover:text-[#1E4B3C]"}`}
            >Therapies by Dosha</button>

            <button type="button"
              onMouseEnter={() => handleOpenMega("bundles")}
              className={`pb-1 border-b-2 ${activeMegaKey === "bundles" ? "border-[#1E4B3C] text-[#1E4B3C]" : "border-transparent text-emerald-900 hover:text-[#1E4B3C]"}`}
            >Care Programs</button>
          </div>

          {/* RIGHT SIDE: profile / login / signup */}
          <div className="hidden md:flex items-center gap-4 text-sm">
            
            {/* If NOT logged in → show Login */}
            {!token && (
              <Link to="/login" className="text-emerald-900 hover:text-[#1E4B3C]">
                Login
              </Link>
            )}

            {/* If logged in → show Profile Icon */}
            {token && (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="h-10 w-10 cursor-pointer rounded-full bg-emerald-100 flex items-center justify-center border border-emerald-300 hover:bg-emerald-200 transition"
                >
                  <svg className="w-6 h-6 text-[#1E4B3C]" fill="none" stroke="currentColor" strokeWidth="2"
                    viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12a5 5 0 100-10 5 5 0 000 10z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 20a8 8 0 0116 0" />
                  </svg>
                </button>

                {/* Dropdown */}
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-white shadow-lg rounded-xl border border-emerald-100 py-2 z-50">
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-sm hover:bg-emerald-50 text-emerald-900"
                      onClick={() => setProfileOpen(false)}
                    >
                      Dashboard
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="block w-full cursor-pointer text-left px-4 py-2 text-sm hover:bg-emerald-50 text-red-600"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* GET STARTED always visible */}
            <Link
              to="/signup"
              className="rounded-full bg-[#1E4B3C] px-4 py-2 text-white font-semibold hover:bg-emerald-800 transition"
            >
              Get Started
            </Link>
          </div>
        </nav>

        {/* Mega menu */}
        {activeMega && (
          <div className="hidden lg:block absolute left-0 right-0 bg-white shadow-[0_12px_30px_rgba(15,118,110,0.12)] border-t border-emerald-100">
            <div className="mx-auto max-w-6xl px-8 py-8 h-[50vh] overflow-y-auto">
              <h3 className="text-sm font-semibold text-[#1E4B3C] mb-5">{activeMega.title}</h3>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
