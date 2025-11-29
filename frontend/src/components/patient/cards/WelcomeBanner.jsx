import React from "react";

function WelcomeBanner({ name, wellnessScore }) {
  return (
    <section className="w-full rounded-2xl bg-gradient-to-r from-orange-50 via-amber-50 to-orange-100 border border-orange-100 px-6 py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <div>
        <p className="text-sm font-medium text-orange-600 mb-1">
          Patient Portal
        </p>
        <h1 className="text-2xl md:text-3xl font-semibold text-slate-900">
          Welcome back, {name}
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Your wellness journey continues with excellence.
        </p>
        <div className="mt-3 inline-flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-green-500" />
          <span className="text-xs font-medium text-green-700 bg-green-50 border border-green-100 px-2 py-0.5 rounded-full">
            Active
          </span>
        </div>
      </div>

      <div className="self-stretch md:self-center flex md:flex-col items-center gap-3">
        <div className="text-right">
          <p className="text-xs text-slate-500 uppercase tracking-wide">
            Wellness Score
          </p>
          <p className="text-3xl font-semibold text-orange-500">
            {wellnessScore}
          </p>
          <p className="text-xs text-green-600 flex items-center justify-end gap-1">
            <span className="material-icons text-[14px]">trending_up</span>
            +0.5
          </p>
        </div>
      </div>
    </section>
  );
}

export default WelcomeBanner;
