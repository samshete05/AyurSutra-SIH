import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const NotFound = () => {
  return (
    <>
      <Navbar />

      {/* Wrapper */}
      <div className="min-h-screen bg-emerald-50/40 flex flex-col">

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-[#1E4B3C] to-[#256f5a] text-white py-16">
          <div className="mx-auto max-w-6xl px-4 text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-100">
              Error 404
            </p>
            <h1 className="mt-2 text-4xl md:text-5xl font-extrabold">
              Page not found
            </h1>
            <p className="mt-4 max-w-xl mx-auto text-emerald-50/80 text-sm md:text-base">
              Looks like this page wandered off for Panchakarma detox.
              Don’t worry—we’ll guide you back.
            </p>
          </div>
        </section>

        {/* Content Card */}
        <div className="flex-1 flex justify-center px-4">
          <div className="mt-10 mb-20 max-w-lg w-full rounded-2xl bg-white shadow-md border border-emerald-100 p-8 text-center">
            <h2 className="text-xl font-bold text-[#1E4B3C]">
              Oops! Nothing to see here.
            </h2>

            <p className="mt-3 text-gray-700 text-sm md:text-base">
              The page you’re looking for doesn’t exist or has been moved.
            </p>

            <div className="mt-6">
              <Link
                to="/"
                className="inline-block bg-[#1E4B3C] text-white px-6 py-2 rounded-xl text-sm md:text-base font-medium shadow-sm hover:bg-[#256f5a] transition"
              >
                Go back home
              </Link>
            </div>
          </div>
        </div>

      </div>

      <Footer />
    </>
  );
};

export default NotFound;
