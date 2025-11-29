import React from "react";
import { Link } from "react-router-dom";

const RoutesTester = () => {
  const routeLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/service", label: "Service" },
    { to: "/center", label: "Center" },
    { to: "/contact", label: "Contact" },
    { to: "/signup", label: "Sign Up" },
    { to: "/login", label: "Login" },
    { to: "/otpverification", label: "OTP Verification" },
    { to: "/doctor-dashboard", label: "Doctor DashBoard" },
    { to: "/dashboard", label: "Center Head DashBoard" },
    { to: "/patient", label: "Patient DashBoard" },
    {
      to: "/center-head-application-success",
      label: "Center Head Success",
    },
  ];

  return (
    <div className="w-full bg-slate-50 border-b border-gray-200 text-sm">
      <div className="mx-auto max-w-6xl flex flex-wrap items-center gap-2 px-4 py-2">
        <span className="font-semibold text-gray-700">Routes Tester:</span>
        {routeLinks.map((route) => (
          <Link
            key={route.to}
            to={route.to}
            className="rounded-full border border-gray-300 px-3 py-1 text-gray-700 hover:bg-gray-100 hover:border-gray-400"
          >
            {route.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RoutesTester;
