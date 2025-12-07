// src/components/shopping-view/nfc-feature-card.jsx
import React, { useState, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import nfcCard1 from "../assets/Card@2x.png";
import nfcCard2 from "../assets/Card@2x2.png";

const NFCFeatureCard = () => {
  const [tilt1, setTilt1] = useState({ x: 0, y: 0 });
  const [tilt2, setTilt2] = useState({ x: 0, y: 0 });
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);

  const handleMouseMove = (e, cardRef, setTilt) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * 10;
    const rotateY = ((centerX - x) / centerX) * 10;

    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = (setTilt) => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section className="py-12 md:py-16 px-4">
        <Link to="/nfc-card-at-ayursutra">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 items-center bg-gradient-to-br from-emerald-50 to-white rounded-2xl p-6 md:p-10 border-2 border-emerald-200 hover:border-emerald-400 transition-all duration-300">
          
          {/* Left: Both Card Images Side by Side */}
          <div className="flex justify-center gap-4 md:gap-6">
            {/* Card 1 with Tilt */}
            <div
              ref={card1Ref}
              onMouseMove={(e) => handleMouseMove(e, card1Ref, setTilt1)}
              onMouseLeave={() => handleMouseLeave(setTilt1)}
              className="flex justify-center cursor-pointer group"
              style={{ perspective: "1200px" }}
            >
              <div
                style={{
                  transform: `rotateX(${tilt1.x}deg) rotateY(${tilt1.y}deg)`,
                  transition: "transform 0.15s ease-out",
                  transformStyle: "preserve-3d",
                }}
                className="w-32 md:w-40"
              >
                <div className="relative rounded-xl overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow">
                  <img
                    src={nfcCard1}
                    alt="AyurSutra NFC Card"
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 rounded-xl ring-2 ring-emerald-300/20 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Card 2 with Tilt */}
            <div
              ref={card2Ref}
              onMouseMove={(e) => handleMouseMove(e, card2Ref, setTilt2)}
              onMouseLeave={() => handleMouseLeave(setTilt2)}
              className="flex justify-center cursor-pointer group"
              style={{ perspective: "1200px" }}
            >
              <div
                style={{
                  transform: `rotateX(${tilt2.x}deg) rotateY(${tilt2.y}deg)`,
                  transition: "transform 0.15s ease-out",
                  transformStyle: "preserve-3d",
                }}
                className="w-32 md:w-40"
              >
                <div className="relative rounded-xl overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow">
                  <img
                    src={nfcCard2}
                    alt="AyurSutra NFC Card"
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 rounded-xl ring-2 ring-emerald-300/20 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 rounded-full px-4 py-2 mb-3 text-sm font-semibold">
              <span className="text-lg">✨</span> New Feature
            </div>

            {/* Heading */}
            <h3 className="text-3xl md:text-4xl font-bold text-emerald-900 mb-2">
              Smart NFC Cards
            </h3>
            <p className="text-emerald-700 font-semibold text-base md:text-lg mb-3">
              Priority Access + Exclusive Discounts
            </p>

            {/* Description */}
            <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-5">
              Get your personalized NFC card and enjoy instant priority queue access, 
              15% discounts on all products, and seamless clinic visits across India.
            </p>

            {/* Key Features - Minimal */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-600 flex-shrink-0" />
                <p className="text-gray-700 text-xs md:text-sm">
                  <span className="font-semibold">Priority Queue System</span> - Tap & skip lines
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-amber-600 flex-shrink-0" />
                <p className="text-gray-700 text-xs md:text-sm">
                  <span className="font-semibold">15% Exclusive Discount</span> - On all purchases
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-600 flex-shrink-0" />
                <p className="text-gray-700 text-xs md:text-sm">
                  <span className="font-semibold">Instant Health Records</span> - For faster care
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <Link
              to="/nfc-card-at-ayursutra"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 group text-sm md:text-base"
            >
              Learn More
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
      </Link>
    </section>
  );
};

export default NFCFeatureCard;
