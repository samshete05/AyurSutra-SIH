// // Navbar.jsx
// import React, { useState, useRef, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Marquee from "react-fast-marquee";
// import MainNavbar from "./MainNavbar";
// import axios from "axios";

// const megaMenuConfig = {
//   concern: {
//     title: "Therapies by Concern",
//     columns: [
//       {
//         heading: "Joint & Muscle Care",
//         items: ["Joint discomfort", "Muscle stiffness", "Mobility support"],
//       },
//       {
//         heading: "Women's Wellness",
//         items: ["Cycle balance", "Post-natal care", "Hormonal support"],
//       },
//       {
//         heading: "Immunity & Vitality",
//         items: ["Immune support", "Heart vitality", "Respiratory ease"],
//       },
//       {
//         heading: "Mind & Sleep",
//         items: ["Stress relief", "Sleep support", "Mental clarity"],
//       },
//       {
//         heading: "Skin, Hair & Personal Care",
//         items: ["Skin glow", "Hair & scalp", "Oral & daily care"],
//       },
//       {
//         heading: "Metabolism & Gut",
//         items: ["Digestive comfort", "Metabolic balance", "Weight harmony"],
//       },
//     ],
//     highlights: [
//       {
//         title: "Abhyanga",
//         description:
//           "Warm herbal oil massage designed to calm the nervous system and prepare the body for deeper Panchakarma therapies.",
//         imageSrc:
//           "https://www.mattindia.com/wp-content/uploads/2024/10/Ayurvedic-Massage-Therapy-in-Kerala-Techniques-and-Benefits-999x500.jpg",
//         imageAlt: "Abhyanga full body oil massage",
//       },
//       {
//         title: "Swedana",
//         description:
//           "Gentle herbal steam that supports detox through sweating and relieves stiffness in joints and muscles.",
//         imageSrc:
//           "https://www.chandigarhayurvedcentre.com/wp-content/uploads/2019/09/Swedana1.jpg",
//         imageAlt: "Swedana herbal steam therapy",
//       },
//       {
//         title: "Basti",
//         description:
//           "Medicated enema therapy traditionally used for Vata-related issues such as dryness, pain, and constipation.",
//         imageSrc:
//           "https://aradhanaayurveda.com/wp-content/uploads/2020/09/kati-basti.jpg",
//         imageAlt: "Basti therapy setup",
//       },
//     ],
//   },
//   doshas: {
//     title: "Therapies by Dosha",
//     columns: [
//       {
//         heading: "Vata-focused",
//         items: ["Dryness & stiffness", "Sleep & anxiety", "Nervous system"],
//       },
//       {
//         heading: "Pitta-focused",
//         items: ["Heat & acidity", "Skin sensitivity", "Irritability"],
//       },
//       {
//         heading: "Kapha-focused",
//         items: ["Metabolic sluggishness", "Respiratory heaviness", "Edema"],
//       },
//       {
//         heading: "Balancing Programs",
//         items: ["Seasonal detox plans", "Rejuvenation programs", "Daily routines"],
//       },
//     ],
//     highlights: [
//       {
//         title: "Vata Balancing Program",
//         description:
//           "Oil-based therapies, grounding routines, and warm diet guidance to stabilize Vata imbalance.",
//         imageSrc: "https://i.ytimg.com/vi/G4DIGPf0wC8/maxresdefault.jpg",
//         imageAlt: "Vata balancing program setup",
//       },
//       {
//         title: "Pitta Cooling Program",
//         description:
//           "Soothing therapies and lifestyle suggestions to cool excess heat and support skin and digestive comfort.",
//         imageSrc:
//           "https://www.maulirituals.com/cdn/shop/articles/Blog_post_header_7.png?v=1750068522&width=1920",
//         imageAlt: "Pitta cooling program",
//       },
//     ],
//   },
//   bundles: {
//     title: "Care Programs",
//     columns: [
//       {
//         heading: "Detox & Rejuvenation",
//         items: ["Short detox plans", "Rejuvenation packages"],
//       },
//       {
//         heading: "Lifestyle Programs",
//         items: ["Sleep reset", "Stress balance", "Work-life harmony"],
//       },
//       {
//         heading: "Condition-Focused",
//         items: ["Back care", "Migraine care", "Metabolic care"],
//       },
//     ],
//     highlights: [
//       {
//         title: "7-Day Detox",
//         description:
//           "Structured short-term detox program combining diet, mild therapies, and guided follow-ups.",
//         imageSrc:
//           "https://i.ytimg.com/vi/iIcCeiAwKp8/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBd-3aLC2HuPZdID15_76Zzrw2gdQ",
//         imageAlt: "7-day detox program",
//       },
//       {
//         title: "Rejuvenation Retreat",
//         description:
//           "Longer Panchakarma-inspired schedule focused on rebuilding strength and vitality post-illness or stress.",
//         imageSrc:
//           "https://shathayuretreat.com/wp-content/uploads/2023/03/retreat.png.webp",
//         imageAlt: "Rejuvenation retreat environment",
//       },
//     ],
//   },
// };


// const Navbar = () => {
//   const email = localStorage.getItem("email");
//   const role = localStorage.getItem("role");
//   const token = localStorage.getItem("authToken");
//   const userName = localStorage.getItem("name");

//   const navigate = useNavigate();
//   const [activeMegaKey, setActiveMegaKey] = useState(null);
//   const [profileOpen, setProfileOpen] = useState(false);
//   const profileRef = useRef(null);

//   const rawProfileImage = localStorage.getItem("profileImg");
//   const profileImage =
//     rawProfileImage && rawProfileImage !== "null" && rawProfileImage !== "undefined" && rawProfileImage !== ""
//       ? rawProfileImage
//       : null;

//   // Notification count for avtar
//   const [unreadCount, setUnreadCount] = useState(0);

//   const fetchNotifications = async () => {
//     if (!token || !role) return;
//     const endpoint = 
//       role === "patient"
//       ? 'http://localhost:3000/patient/notifications/unread/count'
//       : 'http://localhost:3000/PanchKarmaCenter/getCenterNotifications'
//     try {
//       const res = await fetch(endpoint, {
//         method: "GET",
//         headers: { 
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`
//         },
        
//       });
//       if (res.ok) {
//         const data = await res.json();
//         const count = data.unreadCount || 0;
//         setUnreadCount(count);
//         localStorage.setItem("notificationCount", count);
//         // console.log(`📊 Navbar: Fetched ${count} unread notifications for ${role}`);
//       }
//     } catch (err) {
//       console.error("Navbar notification fetch error:", err);
//     }
//   };

//   useEffect(() => {
//     // initial from localStorage
//     const stored = localStorage.getItem("notificationCount");
//     if (stored) setUnreadCount(parseInt(stored));

//     // fetch fresh
//     fetchNotifications();

//     // listen to global updates (from center pages)
//     const handler = (e) => setUnreadCount(e.detail.count);
//     window.addEventListener("notificationUpdate", handler);

//     return () => window.removeEventListener("notificationUpdate", handler);
//   }, [email, role]);

//   const handleOpenMega = (key) => setActiveMegaKey(key);
//   const handleCloseMega = () => setActiveMegaKey(null);

//   const handleLogout = async () => {
//     try {
//       await axios.post("http://localhost:3000/patient/logout");
//     } catch (err) {
//       console.warn(err);
//     }
//     localStorage.clear();
//     window.location.reload();
//   };

//   const HandleDashboardClick = () => {
//     if (role === "patient") navigate("/patient");
//     else if (role === "centerHead") navigate("/PanchaKarma-Dashboard");
//     else navigate("/");
//   };

//   useEffect(() => {
//     const clickOutside = (e) => {
//       if (profileRef.current && !profileRef.current.contains(e.target)) {
//         setProfileOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", clickOutside);
//     return () => document.removeEventListener("mousedown", clickOutside);
//   }, []);

//   const activeMega = activeMegaKey ? megaMenuConfig[activeMegaKey] : null;

//   const isLoggedIn = Boolean(token);

//   return (
//     <header className="relative z-40">

//       {/* TOP BAR */}
//       <div className="bg-[#1E4B3C] text-[11px] md:text-xs text-emerald-50">
//         <Marquee pauseOnHover speed={40} gradient={false}>
//           <span className="mx-6">Free scheduling dashboard for 3 months!</span>
//           <span className="mx-6">Secure digital patient therapy records.</span>
//           <span className="mx-6">Automated reminders for therapy routines.</span>
//         </Marquee>
//       </div>

//       <MainNavbar />

//       {/* MAIN NAVBAR */}
//       <div className="relative bg-white border-b border-emerald-100" onMouseLeave={handleCloseMega}>
//         <nav className="flex items-center justify-between px-4 py-3 md:px-6 lg:px-10">

//           {/* LOGO */}
//           <Link to="/" className="flex items-center text-gray-400 cursor-pointer">
//             <img src="https://res.cloudinary.com/dlty7hjfx/image/upload/v1764684761/Gemini_Generated_Image_97y8ep97y8ep97y8_n6yxoh.png" className="h-7" />
//             <span className="mx-3 text-gray-300">|</span>
//             <img src="https://res.cloudinary.com/dlty7hjfx/image/upload/v1764684757/All_India_Institute_of_Ayurveda_daadpq.jpg" className="h-7" />
//             <span className="mx-3 text-gray-300">|</span>
//             <img src="https://res.cloudinary.com/dlty7hjfx/image/upload/v1764684757/ministry-of-ayush-logo_nkde9k.png" className="h-7" />
//           </Link>

//           {/* NAVIGATION BUTTONS */}
//           <div className="hidden lg:flex items-center gap-8 text-sm font-medium">

//             <button
//               type="button"
//               onMouseEnter={() => handleOpenMega("concern")}
//               className={`cursor-pointer pb-1 border-b-2 ${
//                 activeMegaKey === "concern"
//                   ? "border-[#1E4B3C] text-[#1E4B3C]"
//                   : "border-transparent text-emerald-900 hover:text-[#1E4B3C]"
//               }`}
//             >
//               Therapies by Concern
//             </button>

//             <button
//               type="button"
//               onMouseEnter={() => handleOpenMega("doshas")}
//               className="cursor-pointer pb-1 border-b-2 border-transparent text-emerald-900 hover:text-[#1E4B3C]"
//             >
//               Therapies by Dosha
//             </button>

//             <button
//               type="button"
//               onMouseEnter={() => handleOpenMega("bundles")}
//               className="cursor-pointer pb-1 border-b-2 border-transparent text-emerald-900 hover:text-[#1E4B3C]"
//             >
//               Care Programs
//             </button>

//             {/* ⭐ Find Centers → Redirect */}
//             <button
//               type="button"
//               onClick={() => navigate("/center-map")}
//               className="cursor-pointer pb-1 border-b-2 border-transparent text-emerald-900 hover:text-[#1E4B3C]"
//             >
//               Find Centers
//             </button>
//           </div>

//           {/* RIGHT SIDE */}
//           <div className="hidden md:flex items-center gap-4 text-sm">
//             {/* NOT LOGGED IN: show Login + Get Started */}
//             {!isLoggedIn && (
//               <>
//                 <Link to="/login" className="cursor-pointer text-emerald-900 hover:text-[#1E4B3C]">
//                   Login
//                 </Link>
//                 <Link
//                   to="/signup"
//                   className="cursor-pointer rounded-full bg-[#1E4B3C] px-4 py-2 text-white font-semibold hover:bg-emerald-800"
//                 >
//                   Get Started
//                 </Link>
//               </>
//             )}

//             {/* LOGGED IN: hide Get Started, show avatar + name + notifications */}
//             {isLoggedIn && (
//               <div className="flex items-center gap-3">
//                 {/* Name (optional) */}
//                 {userName && (
//                   <span className="hidden lg:block text-emerald-900 font-medium max-w-[140px] truncate">
//                     {userName}
//                   </span>
//                 )}

//                 {/* Avatar + notification badge + dropdown */}
//                 <div className="relative" ref={profileRef}>
//                   <button
//                     onClick={() => setProfileOpen(!profileOpen)}
//                     className="relative cursor-pointer h-10 w-10 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center hover:bg-emerald-200"
//                   >
//                     <div className="h-full w-full rounded-full overflow-hidden">
//                       {profileImage ? (
//                         <img src={profileImage} className="h-full w-full object-cover" />
//                       ) : (
//                         <svg
//                           className="w-6 h-6 text-[#1E4B3C]"
//                           fill="none"
//                           stroke="currentColor"
//                           strokeWidth="2"
//                           viewBox="0 0 24 24"
//                         >
//                           <path strokeLinecap="round" strokeLinejoin="round" d="M12 12a5 5 0 100-10 5 5 0 000 10z" />
//                           <path strokeLinecap="round" strokeLinejoin="round" d="M4 20a8 8 0 0116 0" />
//                         </svg>
//                       )}
//                     </div>

//                     {/* Notification badge on avatar */}
//                     {unreadCount > 0 && (
//                       <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white border-2 border-white">
//                         {unreadCount > 9 ? "9+" : unreadCount}
//                       </span>
//                     )}
//                   </button>

//                   {profileOpen && (
//                     <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-xl border border-emerald-100 py-2 z-50">
//                       <button
//                         className="cursor-pointer w-full text-left px-4 py-2 hover:bg-emerald-50 text-emerald-900"
//                         onClick={HandleDashboardClick}
//                       >
//                         Dashboard
//                       </button>

//                       <button
//                         className="cursor-pointer w-full text-left px-4 py-2 hover:bg-emerald-50 text-red-600"
//                         onClick={handleLogout}
//                       >
//                         Logout
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>
//         </nav>

//         {/* MEGA MENU */}
//         {activeMega && (
//           <div className="hidden lg:block absolute left-0 right-0 bg-white shadow-xl border-t border-emerald-100">
//             <div className="mx-auto max-w-6xl px-8 py-8 h-[50vh] overflow-y-auto">
//               <h3 className="text-sm font-semibold text-[#1E4B3C] mb-5">{activeMega.title}</h3>
//             </div>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Navbar;
// Navbar.jsx

// Navbar.jsx
import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Marquee from "react-fast-marquee";
import RoutesTester from "./RoutesTester";
import AdvancedCenterSearch from "./AdvancedCenterSearch";
import MainNavbar from "./MainNavbar";
import axios from "axios";

const megaMenuConfig = {
  concern: {
    title: "Therapies by Concern",
    columns: [
      {
        heading: "Joint & Muscle Care",
        items: ["Joint discomfort", "Muscle stiffness", "Mobility support"],
      },
      {
        heading: "Women's Wellness",
        items: ["Cycle balance", "Post-natal care", "Hormonal support"],
      },
      {
        heading: "Immunity & Vitality",
        items: ["Immune support", "Heart vitality", "Respiratory ease"],
      },
      {
        heading: "Mind & Sleep",
        items: ["Stress relief", "Sleep support", "Mental clarity"],
      },
      {
        heading: "Skin, Hair & Personal Care",
        items: ["Skin glow", "Hair & scalp", "Oral & daily care"],
      },
      {
        heading: "Metabolism & Gut",
        items: ["Digestive comfort", "Metabolic balance", "Weight harmony"],
      },
    ],
    highlights: [
      {
        title: "Abhyanga",
        description:
          "Warm herbal oil massage designed to calm the nervous system and prepare the body for deeper Panchakarma therapies.",
        imageSrc:
          "https://www.mattindia.com/wp-content/uploads/2024/10/Ayurvedic-Massage-Therapy-in-Kerala-Techniques-and-Benefits-999x500.jpg",
        imageAlt: "Abhyanga full body oil massage",
      },
      {
        title: "Swedana",
        description:
          "Gentle herbal steam that supports detox through sweating and relieves stiffness in joints and muscles.",
        imageSrc:
          "https://www.chandigarhayurvedcentre.com/wp-content/uploads/2019/09/Swedana1.jpg",
        imageAlt: "Swedana herbal steam therapy",
      },
      {
        title: "Basti",
        description:
          "Medicated enema therapy traditionally used for Vata-related issues such as dryness, pain, and constipation.",
        imageSrc:
          "https://aradhanaayurveda.com/wp-content/uploads/2020/09/kati-basti.jpg",
        imageAlt: "Basti therapy setup",
      },
    ],
  },
  doshas: {
    title: "Therapies by Dosha",
    columns: [
      {
        heading: "Vata-focused",
        items: ["Dryness & stiffness", "Sleep & anxiety", "Nervous system"],
      },
      {
        heading: "Pitta-focused",
        items: ["Heat & acidity", "Skin sensitivity", "Irritability"],
      },
      {
        heading: "Kapha-focused",
        items: ["Metabolic sluggishness", "Respiratory heaviness", "Edema"],
      },
      {
        heading: "Balancing Programs",
        items: ["Seasonal detox plans", "Rejuvenation programs", "Daily routines"],
      },
    ],
    highlights: [
      {
        title: "Vata Balancing Program",
        description:
          "Oil-based therapies, grounding routines, and warm diet guidance to stabilize Vata imbalance.",
        imageSrc: "https://i.ytimg.com/vi/G4DIGPf0wC8/maxresdefault.jpg",
        imageAlt: "Vata balancing program setup",
      },
      {
        title: "Pitta Cooling Program",
        description:
          "Soothing therapies and lifestyle suggestions to cool excess heat and support skin and digestive comfort.",
        imageSrc:
          "https://www.maulirituals.com/cdn/shop/articles/Blog_post_header_7.png?v=1750068522&width=1920",
        imageAlt: "Pitta cooling program",
      },
    ],
  },
  bundles: {
    title: "Care Programs",
    columns: [
      {
        heading: "Detox & Rejuvenation",
        items: ["Short detox plans", "Rejuvenation packages"],
      },
      {
        heading: "Lifestyle Programs",
        items: ["Sleep reset", "Stress balance", "Work-life harmony"],
      },
      {
        heading: "Condition-Focused",
        items: ["Back care", "Migraine care", "Metabolic care"],
      },
    ],
    highlights: [
      {
        title: "7-Day Detox",
        description:
          "Structured short-term detox program combining diet, mild therapies, and guided follow-ups.",
        imageSrc: "https://i.ytimg.com/vi/iIcCeiAwKp8/hq720.jpg",
        imageAlt: "7-day detox program",
      },
      {
        title: "Rejuvenation Retreat",
        description:
          "Longer Panchakarma-inspired schedule focused on rebuilding strength and vitality post-illness or stress.",
        imageSrc:
          "https://shathayuretreat.com/wp-content/uploads/2023/03/retreat.png.webp",
        imageAlt: "Rejuvenation retreat environment",
      },
    ],
  },
};

const Navbar = () => {
  const navigate = useNavigate();

  // --- auth + user info from localStorage ---
  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("authToken");
  const userName = localStorage.getItem("name");

  const rawProfileImage = localStorage.getItem("profileImg");
  const profileImage =
    rawProfileImage &&
    rawProfileImage !== "null" &&
    rawProfileImage !== "undefined" &&
    rawProfileImage !== ""
      ? rawProfileImage
      : null;

  const isLoggedIn = Boolean(token);

  const [activeMegaKey, setActiveMegaKey] = useState(null);

  // avatar dropdown + notifications
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const [unreadCount, setUnreadCount] = useState(0);

  const handleOpen = (key) => {
    setActiveMegaKey(key);
  };

  const handleClose = () => {
    setActiveMegaKey(null);
  };

  const activeMega = activeMegaKey ? megaMenuConfig[activeMegaKey] : null;

  // fetch notifications (same logic as your other file)
  const fetchNotifications = async () => {
    if (!token || !role) return;
    const endpoint =
      role === "patient"
        ? "http://localhost:3000/patient/notifications/unread/count"
        : "http://localhost:3000/PanchKarmaCenter/getCenterNotifications";

    try {
      const res = await fetch(endpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        const count = data.unreadCount || 0;
        setUnreadCount(count);
        localStorage.setItem("notificationCount", count);
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

    // listen to global updates
    const handler = (e) => setUnreadCount(e.detail.count);
    window.addEventListener("notificationUpdate", handler);

    return () => window.removeEventListener("notificationUpdate", handler);
  }, [email, role, token]);

  // close avatar dropdown on outside click
  useEffect(() => {
    const clickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", clickOutside);
    return () => document.removeEventListener("mousedown", clickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3000/patient/logout");
    } catch (err) {
      console.warn(err);
    }
    localStorage.clear();
    window.location.reload();
  };

  const handleDashboardClick = () => {
    if (role === "patient") navigate("/patient");
    else if (role === "centerHead") navigate("/PanchaKarma-Dashboard");
    else navigate("/");
  };

  return (
    <header className="relative z-40">
      {/* TOP MARQUEE */}
      <div className="bg-[#1E4B3C] text-[11px] md:text-xs text-emerald-50">
        <Marquee pauseOnHover speed={40} gradient={false}>
          <span className="mx-6">
            Free scheduling dashboard for new Panchakarma centers.
          </span>
          <span className="mx-6">Secure digital therapy session records.</span>
          <span className="mx-6">Automated pre & post-therapy reminders.</span>
        </Marquee>
      </div>

      <MainNavbar />

      {/* NAVBAR */}
      <div
        className="relative bg-white border-b border-emerald-100"
        onMouseLeave={handleClose}
      >
        <nav className="flex w-full items-center justify-between px-4 py-3 md:px-6 lg:px-10">
          {/* LEFT LOGOS */}
          <Link
            to="/"
            className="flex items-center text-gray-400 cursor-pointer"
          >
            <img
              src="https://res.cloudinary.com/dlty7hjfx/image/upload/v1764684761/Gemini_Generated_Image_97y8ep97y8ep97y8_n6yxoh.png"
              className="h-7"
            />
            <span className="mx-3 text-gray-300">|</span>
            <img
              src="https://res.cloudinary.com/dlty7hjfx/image/upload/v1764684757/All_India_Institute_of_Ayurveda_daadpq.jpg"
              className="h-7"
            />
            <span className="mx-3 text-gray-300">|</span>
            <img
              src="https://res.cloudinary.com/dlty7hjfx/image/upload/v1764684757/ministry-of-ayush-logo_nkde9k.png"
              className="h-7"
            />
          </Link>

          {/* CENTER NAV (Desktop) */}
          <div className="hidden lg:flex items-center gap-8 text-sm font-medium">
            <button
              type="button"
              onMouseEnter={() => handleOpen("concern")}
              className={`pb-1 border-b-2 ${
                activeMegaKey === "concern"
                  ? "border-[#1E4B3C] text-[#1E4B3C]"
                  : "border-transparent text-emerald-900 hover:text-[#1E4B3C]"
              }`}
            >
              Therapies by Concern
            </button>

            <button
              type="button"
              onMouseEnter={() => handleOpen("doshas")}
              className={`pb-1 border-b-2 ${
                activeMegaKey === "doshas"
                  ? "border-[#1E4B3C] text-[#1E4B3C]"
                  : "border-transparent text-emerald-900 hover:text-[#1E4B3C]"
              }`}
            >
              Therapies by Dosha
            </button>

            <button
              type="button"
              onMouseEnter={() => handleOpen("bundles")}
              className={`pb-1 border-b-2 ${
                activeMegaKey === "bundles"
                  ? "border-[#1E4B3C] text-[#1E4B3C]"
                  : "border-transparent text-emerald-900 hover:text-[#1E4B3C]"
              }`}
            >
              Care Programs
            </button>

            {/* ⭐ FIND CENTER ADDED HERE ⭐ */}
            <Link
              to="/center-map"
              className="pb-1 border-b-2 border-transparent text-emerald-900 hover:text-[#1E4B3C] font-semibold"
            >
              Find Center
            </Link>
          </div>

          {/* RIGHT SIDE: Auth-based */}
          <div className="hidden md:flex items-center gap-3 text-sm">
            {/* Not logged in: Login + Get Started */}
            {!isLoggedIn && (
              <>
                <Link
                  to="/login"
                  className="text-emerald-900 hover:text-[#1E4B3C]"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="rounded-full bg-[#1E4B3C] px-4 py-2 text-white font-semibold hover:bg-emerald-800"
                >
                  Get Started
                </Link>
              </>
            )}

            {/* Logged in: Avatar + Name + Notification badge + Dropdown */}
            {isLoggedIn && (
              <div className="flex items-center gap-3">
                {userName && (
                  <span className="hidden lg:block text-emerald-900 font-medium max-w-[140px] truncate">
                    {userName}
                  </span>
                )}

                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="relative cursor-pointer h-10 w-10 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center hover:bg-emerald-200"
                  >
                    <div className="h-full w-full rounded-full overflow-hidden">
                      {profileImage ? (
                        <img
                          src={profileImage}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <svg
                          className="w-6 h-6 text-[#1E4B3C]"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 12a5 5 0 100-10 5 5 0 000 10z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 20a8 8 0 0116 0"
                          />
                        </svg>
                      )}
                    </div>

                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white border-2 border-white">
                        {unreadCount > 9 ? "9+" : unreadCount}
                      </span>
                    )}
                  </button>

                  {profileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-xl border border-emerald-100 py-2 z-50">
                      <button
                        className="w-full text-left px-4 py-2 hover:bg-emerald-50 text-emerald-900 cursor-pointer"
                        onClick={handleDashboardClick}
                      >
                        Dashboard
                      </button>
                      <button
                        className="w-full text-left px-4 py-2 hover:bg-emerald-50 text-red-600 cursor-pointer"
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

        {/* MEGA MENU SECTION */}
        {activeMega && (
          <div className="hidden lg:block absolute left-0 right-0 bg-white shadow-[0_12px_30px_rgba(15,118,110,0.12)] border-t border-emerald-100">
            <div className="mx-auto max-w-6xl px-8 py-8 h-[50vh] overflow-y-auto">
              <h3 className="text-sm font-semibold text-[#1E4B3C] mb-5">
                {activeMega.title}
              </h3>

              <div className="grid gap-8 lg:grid-cols-4 xl:grid-cols-5 text-sm">
                {/* Columns */}
                <div className="lg:col-span-3 xl:col-span-3">
                  <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-8">
                    {activeMega.columns.map((column) => (
                      <div key={column.heading}>
                        <p className="font-semibold text-emerald-900 mb-2">
                          {column.heading}
                        </p>
                        <ul className="space-y-1 text-xs text-gray-600">
                          {column.items.map((item) => (
                            <li key={item}>
                              <button
                                type="button"
                                className="hover:text-[#1E4B3C]"
                              >
                                {item}
                              </button>
                            </li>
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

                  {activeMega.highlights?.slice(0, 3).map((highlight) => (
                    <div
                      key={highlight.title}
                      className="rounded-2xl bg-white border border-emerald-100 shadow-sm overflow-hidden"
                    >
                      <div className="h-20 w-full overflow-hidden">
                        <img
                          src={highlight.imageSrc}
                          alt={highlight.imageAlt || highlight.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="p-3">
                        <h4 className="text-xs font-semibold text-[#1E4B3C]">
                          {highlight.title}
                        </h4>
                        <p className="mt-1 text-[11px] text-gray-600">
                          {highlight.description}
                        </p>
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
