// Navbar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee"; // npm install react-fast-marquee
import RoutesTester from "./RoutesTester";

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
        imageSrc: "https://www.mattindia.com/wp-content/uploads/2024/10/Ayurvedic-Massage-Therapy-in-Kerala-Techniques-and-Benefits-999x500.jpg",
        imageAlt: "Abhyanga full body oil massage",
      },
      {
        title: "Swedana",
        description:
          "Gentle herbal steam that supports detox through sweating and relieves stiffness in joints and muscles.",
        imageSrc: "https://www.chandigarhayurvedcentre.com/wp-content/uploads/2019/09/Swedana1.jpg",
        imageAlt: "Swedana herbal steam therapy",
      },
      {
        title: "Basti",
        description:
          "Medicated enema therapy traditionally used for Vata-related issues such as dryness, pain, and constipation.",
        imageSrc: "https://aradhanaayurveda.com/wp-content/uploads/2020/09/kati-basti.jpg",
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
        imageSrc: "https://www.maulirituals.com/cdn/shop/articles/Blog_post_header_7.png?v=1750068522&width=1920",
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
        imageSrc: "https://i.ytimg.com/vi/iIcCeiAwKp8/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBd-3aLC2HuPZdID15_76Zzrw2gdQ",
        imageAlt: "7-day detox program",
      },
      {
        title: "Rejuvenation Retreat",
        description:
          "Longer Panchakarma-inspired schedule focused on rebuilding strength and vitality post-illness or stress.",
        imageSrc: "https://shathayuretreat.com/wp-content/uploads/2023/03/retreat.png.webp",
        imageAlt: "Rejuvenation retreat environment",
      },
    ],
  },
};

const Navbar = () => {
  const [activeMegaKey, setActiveMegaKey] = useState(null);

  const handleOpen = (key) => {
    setActiveMegaKey(key);
  };

  const handleClose = () => {
    setActiveMegaKey(null);
  };

  const activeMega = activeMegaKey ? megaMenuConfig[activeMegaKey] : null;

  return (
    <header className="relative z-40">
      {/* Top marquee bar */}
      <div className="bg-[#1E4B3C] text-[11px] md:text-xs text-emerald-50">
        <Marquee pauseOnHover speed={40} gradient={false}>
          <span className="mx-6">
            Free scheduling dashboard for the first 3 months for new Panchakarma
            centers.
          </span>
          <span className="mx-6">
            Secure digital records for every therapy session and patient visit.
          </span>
          <span className="mx-6">
            Automated reminders for pre- and post-therapy precautions.
          </span>
        </Marquee>
      </div>

      {/* Dev-only routes tester bar */}
      <RoutesTester />

      {/* Main navbar + mega menu area */}
      <div
        className="relative bg-white border-b border-emerald-100"
        onMouseLeave={handleClose}
      >
        {/* Main navbar */}
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6 lg:px-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#1E4B3C] to-emerald-500 text-white font-bold text-lg">
              A
            </div>
            <div className="leading-tight">
              <p className="text-base md:text-lg font-extrabold text-[#1E4B3C]">
                AyurSutra
              </p>
              <p className="hidden text-[11px] md:block text-emerald-900/70">
                Panchakarma Management Platform
              </p>
            </div>
          </Link>

          {/* Center nav items that control mega menu */}
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
          </div>

          {/* Right auth / CTA */}
          <div className="hidden md:flex items-center gap-3 text-sm">
            <Link
              to="/login"
              className="text-emerald-900 hover:text-[#1E4B3C]"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="rounded-full bg-[#1E4B3C] px-4 py-2 text-white font-semibold hover:bg-emerald-800 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </nav>

        {/* Mega menu panel (desktop) */}
        {activeMega && (
          <div className="hidden lg:block absolute left-0 right-0 bg-white shadow-[0_12px_30px_rgba(15,118,110,0.12)] border-t border-emerald-100">
            <div className="mx-auto max-w-6xl px-8 py-8 h-[50vh] overflow-y-auto">
              <h3 className="text-sm font-semibold text-[#1E4B3C] mb-5">
                {activeMega.title}
              </h3>

              <div className="grid gap-8 lg:grid-cols-4 xl:grid-cols-5 text-sm">
                {/* Column groups */}
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

                {/* Highlight cards with image area */}
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
                        {highlight.imageSrc ? (
                          <img
                            src={highlight.imageSrc}
                            alt={highlight.imageAlt || highlight.title}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full bg-gradient-to-br from-emerald-100 via-emerald-50 to-white" />
                        )}
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

        {/* Mobile handling can remain separate */}
      </div>
    </header>
  );
};

export default Navbar;
