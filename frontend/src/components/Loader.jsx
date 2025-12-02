import React from "react";

const logo =
  "https://res.cloudinary.com/dlty7hjfx/image/upload/v1764687396/ayursutra_rl8x7n.png";

export default function Loader({ text = "Loading AyurSutra..." }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/85 backdrop-blur-md">
      <div
        className="relative flex items-center justify-center"
        style={{
          width: "280px",
          height: "280px",
          pointerEvents: "none",
        }}
      >
        {/* GOLDEN GLOW */}
        <div
          className="absolute rounded-full animate-glow"
          style={{
            width: "200px",
            height: "200px",
            zIndex: 0,
            background:
              "radial-gradient(circle, rgba(255,223,128,0.7), rgba(255,223,128,0) 70%)",
            filter: "blur(16px)",
          }}
        />

        {/* OUTWARD GREEN RINGS (SMALLER + FASTER) */}
        <div
          className="absolute flex items-center justify-center"
          style={{ zIndex: 10, inset: 0 }}
        >
          {/* Ring 1 */}
          <div
            className="ring-style animate-ringOutwards"
            style={{
              width: "230px",
              height: "230px",
              borderColor: "rgba(30,75,60,0.32)",
              animationDelay: "0s",
            }}
          />
          {/* Ring 2 */}
          <div
            className="ring-style animate-ringOutwards"
            style={{
              width: "230px",
              height: "230px",
              borderColor: "rgba(30,75,60,0.26)",
              animationDelay: "0.6s",
            }}
          />
          {/* Ring 3 */}
          <div
            className="ring-style animate-ringOutwards"
            style={{
              width: "230px",
              height: "230px",
              borderColor: "rgba(30,75,60,0.22)",
              animationDelay: "1.2s",
            }}
          />
        </div>

        {/* LOGO */}
        <img
          src={logo}
          alt="AyurSutra Loading"
          className="relative animate-floating-soft"
          style={{
            width: "185px",
            height: "185px",
            zIndex: 20,
            objectFit: "contain",
          }}
        />
      </div>

      {/* TEXT */}
      <p className="mt-2 text-[#1E4B3C] text-lg font-semibold tracking-wide animate-fadeIn">
        {text}
      </p>

      <style>{`
        /* Floating Logo */
        @keyframes floatingSoft {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(1.5deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
        .animate-floating-soft {
          animation: floatingSoft 2.4s ease-in-out infinite;
        }

        /* Glow Pulse */
        @keyframes glowPulse {
          0% { opacity: 0.55; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.08); }
          100% { opacity: 0.55; transform: scale(1); }
        }
        .animate-glow {
          animation: glowPulse 2.6s ease-in-out infinite;
        }

        /* Outward Ring Animation (FASTER NOW) */
        @keyframes ringOutwards {
          0% {
            transform: scale(0.65);
            opacity: 0.4;
          }
          60% {
            opacity: 0.18;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
        .animate-ringOutwards {
          animation: ringOutwards 2s cubic-bezier(.25,.9,.25,1) infinite;
        }

        /* Base Ring Styling */
        .ring-style {
          position: absolute;
          border-radius: 9999px;
          border: 2px solid rgba(30, 75, 60, 0.32);
          pointer-events: none;
        }

        /* Text Fade In */
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(6px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.9s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
