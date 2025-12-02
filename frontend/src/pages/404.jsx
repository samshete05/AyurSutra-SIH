import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Home, Search, MapPin, Phone, ArrowRight, Sparkles } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const NotFound = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const quickLinks = [
    {
      to: "/",
      icon: Home,
      title: "Return Home",
      subtitle: "Start your wellness journey",
      gradient: "from-[#1E4B3C] to-[#256f5a]",
      primary: true
    },
    {
      to: "/center-map",
      icon: MapPin,
      title: "Find Centers",
      subtitle: "Locate wellness near you",
      color: "#1E4B3C"
    },
    {
      to: "/allcenters",
      icon: Search,
      title: "Search Centers",
      subtitle: "Find wellness centers",
      color: "#1E4B3C"
    },
    {
      to: "/contact",
      icon: Phone,
      title: "Get Help",
      subtitle: "We're here to assist",
      color: "#1E4B3C"
    },
  ];

  return (
    <>
      <Navbar />

      {/* Animated Background */}
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-emerald-50 via-teal-50/30 to-cyan-50">
        
        {/* Floating Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            className="absolute top-20 left-10 w-72 h-72 bg-[#1E4B3C]/10 rounded-full blur-3xl animate-float"
            style={{
              transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
              transition: "transform 0.3s ease-out"
            }}
          />
          <div 
            className="absolute bottom-20 right-10 w-96 h-96 bg-[#256f5a]/10 rounded-full blur-3xl animate-float-delayed"
            style={{
              transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)`,
              transition: "transform 0.3s ease-out"
            }}
          />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-teal-400/10 rounded-full blur-3xl animate-pulse-slow" />
        </div>

        <div className="relative flex items-center justify-center px-4 py-16 min-h-screen">
          <div className="max-w-5xl w-full">
            
            {/* Hero 404 Number */}
            <div className="text-center mb-12 relative">
              <div className="relative inline-block group">
                <h1 
                  className="text-[140px] md:text-[220px] font-black text-transparent bg-clip-text bg-gradient-to-br from-[#1E4B3C] via-[#256f5a] to-teal-600 leading-none select-none animate-fade-in"
                  style={{
                    transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
                    transition: "transform 0.2s ease-out"
                  }}
                >
                  404
                </h1>
                {/* Glow Effect */}
                <div className="absolute inset-0 blur-3xl opacity-30 bg-gradient-to-br from-[#1E4B3C] to-[#256f5a] group-hover:opacity-40 transition-opacity duration-500"></div>
                
                {/* Sparkle Icon */}
                <Sparkles className="absolute -top-8 -right-8 w-12 h-12 text-[#256f5a] animate-spin-slow opacity-60" />
              </div>
            </div>

            {/* Glassmorphism Main Card */}
            <div className="backdrop-blur-xl bg-white/70 rounded-[2rem] shadow-2xl border border-white/40 overflow-hidden animate-slide-up">
              
              {/* Gradient Top Border */}
              <div className="h-1.5 bg-gradient-to-r from-[#1E4B3C] via-[#256f5a] via-teal-500 to-[#1E4B3C] animate-gradient-x"></div>
              
              <div className="p-8 md:p-14">
                
                {/* Header Section */}
                <div className="text-center mb-10">
                  <div className="inline-block px-4 py-1.5 rounded-full bg-[#1E4B3C]/10 border border-[#1E4B3C]/20 mb-4 backdrop-blur-sm">
                    <span className="text-sm font-semibold text-[#1E4B3C] tracking-wide">
                      PAGE NOT FOUND
                    </span>
                  </div>
                  
                  <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-[#1E4B3C] to-[#256f5a] bg-clip-text text-transparent mb-4 leading-tight">
                    Lost in the Digital Chakra?
                  </h2>
                  
                  <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                    This page wandered off for its Panchakarma detox session. 
                    Let's restore your balance and guide you back to wellness.
                  </p>
                </div>

                {/* Quick Action Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
                  {quickLinks.map((link, idx) => {
                    const Icon = link.icon;
                    return (
                      <Link
                        key={idx}
                        to={link.to}
                        onMouseEnter={() => setIsHovered(idx)}
                        onMouseLeave={() => setIsHovered(null)}
                        className={`group relative flex items-center gap-5 p-6 rounded-2xl transition-all duration-500 ${
                          link.primary
                            ? `bg-gradient-to-r ${link.gradient} text-white shadow-lg hover:shadow-2xl`
                            : "backdrop-blur-md bg-white/60 border-2 border-emerald-100/60 hover:border-[#1E4B3C]/40 hover:bg-white/80 hover:shadow-xl"
                        } hover:scale-[1.03] transform`}
                      >
                        {/* Icon Container */}
                        <div 
                          className={`relative p-4 rounded-xl transition-all duration-500 ${
                            link.primary 
                              ? "bg-white/20 group-hover:bg-white/30" 
                              : "bg-gradient-to-br from-[#1E4B3C]/10 to-[#256f5a]/10 group-hover:from-[#1E4B3C]/20 group-hover:to-[#256f5a]/20"
                          }`}
                        >
                          <Icon 
                            className={`w-7 h-7 transition-transform duration-500 ${
                              link.primary ? "text-white" : "text-[#1E4B3C]"
                            } ${isHovered === idx ? "scale-110 rotate-6" : ""}`}
                          />
                        </div>

                        {/* Text Content */}
                        <div className="flex-1 text-left">
                          <div className={`font-bold text-lg mb-0.5 ${link.primary ? "text-white" : "text-[#1E4B3C]"}`}>
                            {link.title}
                          </div>
                          <div className={`text-sm ${link.primary ? "text-emerald-100" : "text-gray-600"}`}>
                            {link.subtitle}
                          </div>
                        </div>

                        {/* Arrow Icon */}
                        <ArrowRight 
                          className={`w-5 h-5 transition-all duration-500 ${
                            link.primary ? "text-white/80" : "text-[#1E4B3C]/60"
                          } ${isHovered === idx ? "translate-x-2" : ""}`}
                        />

                        {/* Hover Gradient Overlay */}
                        {!link.primary && (
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#1E4B3C]/0 to-[#256f5a]/0 group-hover:from-[#1E4B3C]/5 group-hover:to-[#256f5a]/5 transition-all duration-500" />
                        )}
                      </Link>
                    );
                  })}
                </div>

                {/* Popular Pages - Glass Pills */}
                <div className="pt-8 border-t border-gray-200/50">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#1E4B3C]/30"></div>
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                      Popular Pages
                    </p>
                    <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#1E4B3C]/30"></div>
                  </div>
                  
                  <div className="flex flex-wrap justify-center gap-3">
                    {[
                      { to: "/therapies", label: "Therapies" },
                      { to: "/about", label: "About Us" },
                      { to: "/booking", label: "Book Appointment" },
                      { to: "/blog", label: "Wellness Blog" }
                    ].map((page, idx) => (
                      <Link
                        key={idx}
                        to={page.to}
                        className="group relative px-5 py-2.5 rounded-full backdrop-blur-md bg-gradient-to-r from-emerald-50/80 to-teal-50/80 border border-emerald-200/60 text-[#1E4B3C] text-sm font-medium hover:from-[#1E4B3C] hover:to-[#256f5a] hover:text-white hover:border-transparent hover:shadow-lg hover:scale-105 transition-all duration-300"
                      >
                        <span className="relative z-10">{page.label}</span>
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#1E4B3C] to-[#256f5a] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </Link>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* Help Text with Icon */}
            <div className="text-center mt-8 flex items-center justify-center gap-2 text-sm text-gray-600 animate-fade-in-delayed">
              <span>Need assistance?</span>
              <Link 
                to="/contact" 
                className="inline-flex items-center gap-1 text-[#1E4B3C] hover:text-[#256f5a] font-semibold group transition-colors"
              >
                Contact Support
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

          </div>
        </div>
      </div>

      <Footer />

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(20px); }
        }
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.1); }
        }

        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite; }
        .animate-gradient-x { 
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite; 
        }
        .animate-fade-in { animation: fade-in 0.8s ease-out; }
        .animate-fade-in-delayed { animation: fade-in 1s ease-out 0.3s both; }
        .animate-slide-up { animation: slide-up 0.6s ease-out 0.2s both; }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
      `}</style>
    </>
  );
};

export default NotFound;
