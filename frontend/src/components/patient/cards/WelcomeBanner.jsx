import React from "react";

function WelcomeBanner({ name, wellnessScore }) {
  return (
    <section className="relative w-full overflow-hidden rounded-2xl border border-emerald-700/40 bg-emerald-900">
      {/* Fixed banner height for consistent image framing */}
      <div className="relative h-40 md:h-48 lg:h-56">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-[length:cover] bg-center md:bg-[center_right] will-change-transform"
          style={{ backgroundImage: "url('/ayurveda-welcome-banner.jpg')" }}
        />

        {/* Emerald overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/85 via-emerald-900/75 to-emerald-800/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/10" />

        {/* Content */}
        <div className="relative h-full px-6 md:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="max-w-xl py-4">
            <p className="text-[11px] font-semibold tracking-[0.18em] text-emerald-200/80 mb-1 uppercase">
              Patient Portal
            </p>
            <h1 className="text-2xl md:text-3xl font-semibold text-emerald-50 drop-shadow-sm">
              Welcome back, {name}
            </h1>
            <p className="text-sm text-emerald-100/90 mt-1">
              Your wellness journey continues with excellence and personalized Ayurvedic care.
            </p>
            <div className="mt-3 inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(16,185,129,0.45)]" />
              <span className="text-xs font-medium text-emerald-50 bg-emerald-600/60 border border-emerald-300/70 px-2 py-0.5 rounded-full">
                Active
              </span>
            </div>
          </div>

          
        </div>
      </div>
    </section>
  );
}

export default WelcomeBanner;
