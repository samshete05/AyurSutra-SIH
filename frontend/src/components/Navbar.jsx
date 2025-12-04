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
  },
};

const Navbar = () => {
  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("authToken");
  const userName = localStorage.getItem("name");

  const navigate = useNavigate();
  const [activeMegaKey, setActiveMegaKey] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  const rawProfileImage = localStorage.getItem("profileImg");
  const profileImage =
    rawProfileImage && rawProfileImage !== "null" && rawProfileImage !== "undefined" && rawProfileImage !== ""
      ? rawProfileImage
      : null;

  // Notification count for avtar
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchNotifications = async () => {
    if (!token || !role) return;
    const endpoint = 
      role === "patient"
      ? 'http://localhost:3000/patient/notifications/unread/count'
      : 'http://localhost:3000/PanchKarmaCenter/getCenterNotifications'
    try {
      const res = await fetch(endpoint, {
        method: "GET",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        
      });
      if (res.ok) {
        const data = await res.json();
        const count = data.unreadCount || 0;
        setUnreadCount(count);
        localStorage.setItem("notificationCount", count);
        // console.log(`📊 Navbar: Fetched ${count} unread notifications for ${role}`);
      }
    } catch (err) {
      console.error("Navbar notification fetch error:", err);
    }
  };

  useEffect(() => {
    // initial from localStorage
    const stored = localStorage.getItem("notificationCount");
    if (stored) setUnreadCount(parseInt(stored));

    // fetch fresh
    fetchNotifications();

    // listen to global updates (from center pages)
    const handler = (e) => setUnreadCount(e.detail.count);
    window.addEventListener("notificationUpdate", handler);

    return () => window.removeEventListener("notificationUpdate", handler);
  }, [email, role]);

  const handleOpenMega = (key) => setActiveMegaKey(key);
  const handleCloseMega = () => setActiveMegaKey(null);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3000/patient/logout");
    } catch (err) {
      console.warn(err);
    }
    localStorage.clear();
    window.location.reload();
  };

  const HandleDashboardClick = () => {
    if (role === "patient") navigate("/patient");
    else if (role === "centerHead") navigate("/PanchaKarma-Dashboard");
    else navigate("/");
  };

  useEffect(() => {
    const clickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", clickOutside);
    return () => document.removeEventListener("mousedown", clickOutside);
  }, []);

  const activeMega = activeMegaKey ? megaMenuConfig[activeMegaKey] : null;

  const isLoggedIn = Boolean(token);

  return (
    <header className="relative z-40">

      {/* TOP BAR */}
      <div className="bg-[#1E4B3C] text-[11px] md:text-xs text-emerald-50">
        <Marquee pauseOnHover speed={40} gradient={false}>
          <span className="mx-6">Free scheduling dashboard for 3 months!</span>
          <span className="mx-6">Secure digital patient therapy records.</span>
          <span className="mx-6">Automated reminders for therapy routines.</span>
        </Marquee>
      </div>

      <MainNavbar />

      {/* MAIN NAVBAR */}
      <div className="relative bg-white border-b border-emerald-100" onMouseLeave={handleCloseMega}>
        <nav className="flex items-center justify-between px-4 py-3 md:px-6 lg:px-10">

          {/* LOGO */}
          <Link to="/" className="flex items-center text-gray-400 cursor-pointer">
            <img src="https://res.cloudinary.com/dlty7hjfx/image/upload/v1764684761/Gemini_Generated_Image_97y8ep97y8ep97y8_n6yxoh.png" className="h-7" />
            <span className="mx-3 text-gray-300">|</span>
            <img src="https://res.cloudinary.com/dlty7hjfx/image/upload/v1764684757/All_India_Institute_of_Ayurveda_daadpq.jpg" className="h-7" />
            <span className="mx-3 text-gray-300">|</span>
            <img src="https://res.cloudinary.com/dlty7hjfx/image/upload/v1764684757/ministry-of-ayush-logo_nkde9k.png" className="h-7" />
          </Link>

          {/* NAVIGATION BUTTONS */}
          <div className="hidden lg:flex items-center gap-8 text-sm font-medium">

            <button
              type="button"
              onMouseEnter={() => handleOpenMega("concern")}
              className={`cursor-pointer pb-1 border-b-2 ${
                activeMegaKey === "concern"
                  ? "border-[#1E4B3C] text-[#1E4B3C]"
                  : "border-transparent text-emerald-900 hover:text-[#1E4B3C]"
              }`}
            >
              Therapies by Concern
            </button>

            <button
              type="button"
              onMouseEnter={() => handleOpenMega("doshas")}
              className="cursor-pointer pb-1 border-b-2 border-transparent text-emerald-900 hover:text-[#1E4B3C]"
            >
              Therapies by Dosha
            </button>

            <button
              type="button"
              onMouseEnter={() => handleOpenMega("bundles")}
              className="cursor-pointer pb-1 border-b-2 border-transparent text-emerald-900 hover:text-[#1E4B3C]"
            >
              Care Programs
            </button>

            {/* ⭐ Find Centers → Redirect */}
            <button
              type="button"
              onClick={() => navigate("/center-map")}
              className="cursor-pointer pb-1 border-b-2 border-transparent text-emerald-900 hover:text-[#1E4B3C]"
            >
              Find Centers
            </button>
          </div>

          {/* RIGHT SIDE */}
          <div className="hidden md:flex items-center gap-4 text-sm">
            {/* NOT LOGGED IN: show Login + Get Started */}
            {!isLoggedIn && (
              <>
                <Link to="/login" className="cursor-pointer text-emerald-900 hover:text-[#1E4B3C]">
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="cursor-pointer rounded-full bg-[#1E4B3C] px-4 py-2 text-white font-semibold hover:bg-emerald-800"
                >
                  Get Started
                </Link>
              </>
            )}

            {/* LOGGED IN: hide Get Started, show avatar + name + notifications */}
            {isLoggedIn && (
              <div className="flex items-center gap-3">
                {/* Name (optional) */}
                {userName && (
                  <span className="hidden lg:block text-emerald-900 font-medium max-w-[140px] truncate">
                    {userName}
                  </span>
                )}

                {/* Avatar + notification badge + dropdown */}
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="relative cursor-pointer h-10 w-10 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center hover:bg-emerald-200"
                  >
                    <div className="h-full w-full rounded-full overflow-hidden">
                      {profileImage ? (
                        <img src={profileImage} className="h-full w-full object-cover" />
                      ) : (
                        <svg
                          className="w-6 h-6 text-[#1E4B3C]"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 12a5 5 0 100-10 5 5 0 000 10z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 20a8 8 0 0116 0" />
                        </svg>
                      )}
                    </div>

                    {/* Notification badge on avatar */}
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white border-2 border-white">
                        {unreadCount > 9 ? "9+" : unreadCount}
                      </span>
                    )}
                  </button>

                  {profileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-xl border border-emerald-100 py-2 z-50">
                      <button
                        className="cursor-pointer w-full text-left px-4 py-2 hover:bg-emerald-50 text-emerald-900"
                        onClick={HandleDashboardClick}
                      >
                        Dashboard
                      </button>

                      <button
                        className="cursor-pointer w-full text-left px-4 py-2 hover:bg-emerald-50 text-red-600"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* MEGA MENU */}
        {activeMega && (
          <div className="hidden lg:block absolute left-0 right-0 bg-white shadow-xl border-t border-emerald-100">
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
