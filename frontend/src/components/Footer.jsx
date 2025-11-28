import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1E4B3C] text-emerald-50">
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 lg:px-8">
        {/* Top grid */}
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand + short text */}
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white font-bold text-xl">
                A
              </div>
              <div className="leading-tight">
                <p className="text-lg font-extrabold text-white">
                  AyurSutra
                </p>
                <p className="text-[11px] text-emerald-100">
                  Panchakarma Management Platform
                </p>
              </div>
            </div>
            <p className="mt-4 text-xs md:text-sm text-emerald-100/80">
              Cloud-based Panchakarma scheduling, therapy tracking, and
              patient engagement for modern Ayurveda centers.
            </p>
          </div>

          {/* Product links */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wide">
              Product
            </h4>
            <ul className="mt-3 space-y-2 text-xs md:text-sm text-emerald-100/90">
              <li>
                <a href="#features" className="hover:text-white">
                  Features overview
                </a>
              </li>
              <li>
                <a href="#therapies" className="hover:text-white">
                  Therapy scheduling
                </a>
              </li>
              <li>
                <a href="#tracking" className="hover:text-white">
                  Real‑time tracking
                </a>
              </li>
              <li>
                <a href="#notifications" className="hover:text-white">
                  Patient notifications
                </a>
              </li>
            </ul>
          </div>

          {/* For Centers */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wide">
              For Centers
            </h4>
            <ul className="mt-3 space-y-2 text-xs md:text-sm text-emerald-100/90">
              <li>
                <a href="#workflows" className="hover:text-white">
                  Workflow automation
                </a>
              </li>
              <li>
                <a href="#compliance" className="hover:text-white">
                  Compliance & records
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-white">
                  Pricing plans
                </a>
              </li>
              <li>
                <a href="#demo" className="hover:text-white">
                  Book a demo
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wide">
              Stay updated
            </h4>
            <p className="mt-3 text-xs md:text-sm text-emerald-100/80">
              Get tips on Panchakarma digitization and updates about new
              features in AyurSutra.
            </p>
            <form
              onSubmit={(event) => event.preventDefault()}
              className="mt-4 flex flex-col gap-2 sm:flex-row"
            >
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="w-full rounded-full border border-emerald-300/60 bg-[#1E4B3C] px-4 py-2 text-xs md:text-sm text-emerald-50 placeholder:text-emerald-100/70 focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
              />
              <button
                type="submit"
                className="whitespace-nowrap rounded-full bg-emerald-400 px-4 py-2 text-xs md:text-sm font-semibold text-[#0d2d24] hover:bg-emerald-300 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-8 border-t border-emerald-300/40 pt-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Left side */}
          <p className="text-[11px] md:text-xs text-emerald-100/80">
            © {currentYear} AyurSutra. All rights reserved.
          </p>

          {/* Middle legal links */}
          <div className="flex flex-wrap items-center gap-4 text-[11px] md:text-xs text-emerald-100/90">
            <a href="#privacy" className="hover:text-white">
              Privacy Policy
            </a>
            <span className="hidden h-3 w-px bg-emerald-300/50 md:inline-block" />
            <a href="#terms" className="hover:text-white">
              Terms &amp; Conditions
            </a>
            <span className="hidden h-3 w-px bg-emerald-300/50 md:inline-block" />
            <a href="#cookies" className="hover:text-white">
              Cookie settings
            </a>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-4 text-emerald-100">
            <a
              href="#linkedin"
              aria-label="LinkedIn"
              className="hover:text-white"
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M4.98 3.5C4.98 4.88 3.9 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.22 8.25h4.56V24H.22zM8.34 8.25h4.37v2.14h.06c.61-1.16 2.11-2.39 4.34-2.39 4.64 0 5.49 3.05 5.49 7.02V24h-4.56v-7.1c0-1.69-.03-3.86-2.35-3.86-2.35 0-2.71 1.83-2.71 3.73V24H8.34z" />
              </svg>
            </a>
            <a
              href="#instagram"
              aria-label="Instagram"
              className="hover:text-white"
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm0 2h10c1.66 0 3 1.34 3 3v10c0 1.66-1.34 3-3 3H7c-1.66 0-3-1.34-3-3V7c0-1.66 1.34-3 3-3zm5 2.5A5.5 5.5 0 1 0 17.5 12 5.51 5.51 0 0 0 12 6.5zm0 2A3.5 3.5 0 1 1 8.5 12 3.5 3.5 0 0 1 12 8.5zm5.75-3.25a1.25 1.25 0 1 0 1.25 1.25A1.25 1.25 0 0 0 17.75 5.25z" />
              </svg>
            </a>
            <a
              href="#x"
              aria-label="X / Twitter"
              className="hover:text-white"
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18.25 3H21l-6.5 7.43L21.5 21H17.1l-4.1-5.36L8 21H3l6.75-7.73L2.75 3H7.2l3.7 4.86L18.25 3z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
