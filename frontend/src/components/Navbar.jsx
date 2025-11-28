import React, { useState } from "react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMobileMenuOpen((previousState) => !previousState);
  };

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-emerald-100">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6 lg:px-8">
        {/* Logo section */}
        <a href="/" className="flex items-center gap-2">
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
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-6 md:flex text-sm font-medium">
          <a
            href="#features"
            className="text-emerald-900 hover:text-[#1E4B3C] transition-colors"
          >
            Features
          </a>
          <a
            href="#therapies"
            className="text-emerald-900 hover:text-[#1E4B3C] transition-colors"
          >
            Therapies
          </a>
          <a
            href="#pricing"
            className="text-emerald-900 hover:text-[#1E4B3C] transition-colors"
          >
            Pricing
          </a>
          <a
            href="#centers"
            className="text-emerald-900 hover:text-[#1E4B3C] transition-colors"
          >
            For Centers
          </a>
        </div>

        {/* Desktop auth actions */}
        <div className="hidden items-center gap-3 md:flex">
          <a
            href="/login"
            className="text-sm font-medium text-emerald-900 hover:text-[#1E4B3C]"
          >
            Login
          </a>
          <a
            href="/signup"
            className="rounded-full bg-[#1E4B3C] px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-emerald-800 transition-colors"
          >
            Get Started
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={handleToggleMenu}
          className="inline-flex items-center justify-center rounded-md border border-emerald-100 p-2 text-emerald-900 hover:bg-emerald-50 md:hidden"
          aria-label="Toggle navigation"
        >
          <svg
            className={`h-5 w-5 transition-transform ${
              isMobileMenuOpen ? "rotate-90" : ""
            }`}
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {isMobileMenuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <>
                <path d="M4 6h16" />
                <path d="M4 12h16" />
                <path d="M4 18h16" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-emerald-100 bg-white/95 backdrop-blur">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-3 text-sm font-medium">
            <a
              href="#features"
              className="py-1 text-emerald-900 hover:text-[#1E4B3C]"
              onClick={handleToggleMenu}
            >
              Features
            </a>
            <a
              href="#therapies"
              className="py-1 text-emerald-900 hover:text-[#1E4B3C]"
              onClick={handleToggleMenu}
            >
              Therapies
            </a>
            <a
              href="#pricing"
              className="py-1 text-emerald-900 hover:text-[#1E4B3C]"
              onClick={handleToggleMenu}
            >
              Pricing
            </a>
            <a
              href="#centers"
              className="py-1 text-emerald-900 hover:text-[#1E4B3C]"
              onClick={handleToggleMenu}
            >
              For Centers
            </a>

            <div className="mt-2 flex items-center gap-3 border-t border-emerald-100 pt-3">
              <a
                href="/login"
                className="text-emerald-900 hover:text-[#1E4B3C]"
                onClick={handleToggleMenu}
              >
                Login
              </a>
              <a
                href="/signup"
                className="ml-auto rounded-full bg-[#1E4B3C] px-4 py-2 text-xs font-semibold text-white shadow hover:bg-emerald-800"
                onClick={handleToggleMenu}
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
