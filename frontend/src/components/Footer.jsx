// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";
import {
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaYoutube,
  FaLinkedinIn
} from "react-icons/fa6";
import { RxTwitterLogo } from "react-icons/rx";

const Footer = () => {
  return (
    <footer className="bg-emerald-950 text-emerald-50 pt-10 pb-6">
      {/* Top bar: logos + optional marquee strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-emerald-800 pb-6">
          {/* Brand + trust logos */}
          <div className="flex flex-col gap-2">
            <Link
              to="/"
              className="flex items-center text-gray-300 cursor-pointer"
            >
              <h1 className="h-9 font-bold text-2xl">AyurSutra</h1>
              <span className="mx-3 text-gray-400">|</span>
              <img
                src="https://res.cloudinary.com/dlty7hjfx/image/upload/v1764684757/All_India_Institute_of_Ayurveda_daadpq.jpg"
                alt="All India Institute of Ayurveda"
                className="h-8 object-contain rounded-2xl"
              />
              <span className="mx-3 text-gray-400">|</span>
              <img
                src="https://res.cloudinary.com/dlty7hjfx/image/upload/v1764684757/ministry-of-ayush-logo_nkde9k.png"
                alt="Ministry of Ayush"
                className="h-8 object-contain"
              />
            </Link>
            <p className="text-xs text-emerald-200/80">
              AyurSutra • Ayurveda-first wellness for modern India.
            </p>
          </div>

          {/* Optional reassurance marquee */}
          <div className="w-full sm:w-1/2">
            <Marquee
              pauseOnHover
              speed={30}
              gradient={false}
              className="text-[11px] sm:text-xs text-emerald-100"
            >
              <span className="mx-6">
                Classical Ayurveda • Curated by certified Vaidyas • Transparent
                sourcing
              </span>
              <span className="mx-6">
                Free guidance for Dosha & routine selection • Gentle, sustainable
                wellness
              </span>
            </Marquee>
          </div>
        </div>
      </div>

      {/* Main link columns */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8">
        <div className="grid gap-10 md:gap-16 md:grid-cols-3">
          {/* Quick links */}
          <div>
            <h3 className="text-sm font-semibold tracking-wide mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm text-emerald-100/90">
              <li>
                <Link to="/about" className="hover:text-white">
                  About AyurSutra
                </Link>
              </li>
              <li>
                <Link to="/clinics" className="hover:text-white">
                  Clinics & Panchakarma
                </Link>
              </li>
              <li>
                <Link to="/academy" className="hover:text-white">
                  Ayurveda Academy
                </Link>
              </li>
              <li>
                <Link to="/research" className="hover:text-white">
                  Research & Development
                </Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-white">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/blogs" className="hover:text-white">
                  Blogs
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="text-sm font-semibold tracking-wide mb-4">
              Policies
            </h3>
            <ul className="space-y-2 text-sm text-emerald-100/90">
              <li>
                <Link to="/policies/terms-of-use" className="hover:text-white">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link to="/policies/privacy-policy" className="hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/policies/shipping-and-delivery"
                  className="hover:text-white"
                >
                  Shipping & Delivery Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/policies/returns-and-cancellations"
                  className="hover:text-white"
                >
                  Return / Cancellation Policy
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="hover:text-white">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Our Network */}
          <div>
            <h3 className="text-sm font-semibold tracking-wide mb-4">
              Our Network
            </h3>
            <ul className="space-y-2 text-sm text-emerald-100/90">
              <li>AyurSutra Nagpur Wellness Centre</li>
              <li>AyurSutra Digital Clinic</li>
              <li>AyurSutra Panchakarma Partners</li>
              <li>AyurSutra Store – India</li>
              <li>AyurSutra Global – Online Consults</li>
            </ul>
          </div>
        </div>

        {/* Bottom row: social + copyright */}
        <div className="mt-10 pt-6 border-t border-emerald-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Social icons */}
          <div className="flex items-center gap-5 text-emerald-50">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-emerald-200"
            >
              <FaFacebookF className="h-5 w-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-emerald-200"
            >
              <RxTwitterLogo className="h-5 w-5" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-emerald-200"
            >
              <FaInstagram className="h-5 w-5" />
            </a>
            <a
              href="https://pinterest.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-emerald-200"
            >
              <FaPinterestP className="h-5 w-5" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-emerald-200"
            >
              <FaYoutube className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-emerald-200"
            >
              <FaLinkedinIn className="h-5 w-5" />
            </a>
          </div>

          <p className="text-[11px] sm:text-xs text-emerald-200/80 text-right">
            © {new Date().getFullYear()} AyurSutra Wellness Pvt. Ltd. All rights
            reserved.
          </p>
        </div>
      </div>
      
    </footer>
  );
};

export default Footer;
