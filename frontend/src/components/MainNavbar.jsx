// MainNavbar.jsx
import React from "react";

const MainNavbar = () => {
  const links = [
    { label: "Home", href: "http://localhost:5173/" },
    { label: "About", href: "http://localhost:5173/about" },
    { label: "Service", href: "http://localhost:5173/service" },
    { label: "Center", href: "http://localhost:5173/center" },
    { label: "Contact", href: "http://localhost:5173/contact" },
  ];

  return (
    <nav className="w-full bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-5">
        <div className="flex h-8 items-center justify-between">
          {/* Logo / name */}
          <div className="text-sm font-semibold text-slate-900">
            
          </div>

          {/* Links */}
          <div className="flex items-center space-x-6 text-sm font-medium underline">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[#1E4B3C] hover:text-slate-900 transition-colors "
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MainNavbar;
