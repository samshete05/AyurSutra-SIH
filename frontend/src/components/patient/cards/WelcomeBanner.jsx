import React from "react";

function WelcomeBanner({ name, wellnessScore }) {
  return (
    <section
      className="relative w-full overflow-hidden rounded-2xl border border-orange-100"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/patient-hero.jpg')" }}
      />

      {/* Gradient overlay to keep text readable */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-900/70 via-orange-800/40 to-transparent" />

      {/* Content */}
      <div className="relative px-6 py-6 md:px-8 md:py-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold tracking-wide text-orange-100 mb-1 uppercase">
            Patient Portal
          </p>
          <h1 className="text-2xl md:text-3xl font-semibold text-white drop-shadow-sm">
            Welcome back, {name}
          </h1>
          <p className="text-sm text-orange-50/90 mt-1 max-w-xl">
            Your wellness journey continues with excellence and personalized Ayurvedic care.
          </p>
          <div className="mt-3 inline-flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(16,185,129,0.35)]" />
            <span className="text-xs font-medium text-emerald-50 bg-emerald-500/40 border border-emerald-300/70 px-2 py-0.5 rounded-full">
              Active
            </span>
          </div>
        </div>

        <div className="self-stretch md:self-center flex md:flex-col items-center gap-3">
          <div className="backdrop-blur-sm bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-right">
            <p className="text-[10px] text-orange-50/80 uppercase tracking-[0.18em]">
              Wellness Score
            </p>
            <p className="text-3xl font-semibold text-amber-300">
              {wellnessScore}
            </p>
            <p className="text-[11px] text-emerald-200 flex items-center justify-end gap-1 mt-1">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-300" />
              Improving · +0.5
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WelcomeBanner;
