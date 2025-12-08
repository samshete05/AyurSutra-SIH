// src/pages/NFC.jsx
import React, { useState, useRef, useEffect } from "react";
import { Smartphone, Zap, Users, Gift, Clock, CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import nfcCard1 from "../assets/Card@2x.png";
import nfcCard2 from "../assets/Card@2x2.png";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const NFC = () => {
  const [tilt1, setTilt1] = useState({ x: 0, y: 0 });
  const [tilt2, setTilt2] = useState({ x: 0, y: 0 });
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleMouseMove = (e, cardRef, setTilt) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * 12;
    const rotateY = ((centerX - x) / centerX) * 12;

    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = (setTilt) => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-emerald-50 to-white">
        <Navbar/>
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-700 text-white py-14 md:py-18">
        <div className="max-w-6xl mx-auto px-4 md:px-6 text-center">
          <div className="inline-block mb-4 px-4 py-2 bg-amber-400/20 rounded-full border border-amber-400/30 backdrop-blur-sm">
            <span className="text-amber-300 text-sm font-semibold">✨ Exclusive Feature</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            AyurSutra NFC Card
          </h1>
          <p className="text-lg md:text-xl text-emerald-100">
            Smart Wellness Cards for Valued Patients
          </p>
        </div>
      </div>

      {/* Section 1: What is NFC */}
      <section className="py-14 md:py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left: GIF/Animation */}
            <div className="flex justify-center order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-xl bg-white p-3 border-4 border-emerald-200 hover:border-emerald-400 transition-colors w-full max-w-sm">
                <img
                  src="https://cdn.dribbble.com/userupload/36413736/file/original-917229ce1b62817fa76cff02b62aa76d.gif"
                  alt="NFC Animation"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>

            {/* Right: Content */}
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-bold text-emerald-900 mb-4">
                What is NFC Technology?
              </h2>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-7">
                NFC (Near Field Communication) is a wireless technology that allows secure, instant 
                communication between devices. Our AyurSutra NFC cards enable seamless, contactless 
                interaction with our clinic systems.
              </p>

              {/* Key points */}
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-emerald-100 p-2.5 rounded-lg flex-shrink-0 mt-0.5">
                    <Zap className="h-5 w-5 text-emerald-700" />
                  </div>
                  <div>
                    <p className="font-semibold text-emerald-900">Instant Identification</p>
                    <p className="text-gray-600 text-sm">Your card is recognized instantly at our clinics</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-emerald-100 p-2.5 rounded-lg flex-shrink-0 mt-0.5">
                    <Smartphone className="h-5 w-5 text-emerald-700" />
                  </div>
                  <div>
                    <p className="font-semibold text-emerald-900">Contactless & Safe</p>
                    <p className="text-gray-600 text-sm">No physical contact needed, hygienic and secure</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-emerald-100 p-2.5 rounded-lg flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="h-5 w-5 text-emerald-700" />
                  </div>
                  <div>
                    <p className="font-semibold text-emerald-900">Encrypted Data</p>
                    <p className="text-gray-600 text-sm">Your health information is protected with advanced encryption</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Our NFC Card Design - REDUCED SIZE */}
      <section className="py-14 md:py-24 px-4 bg-gradient-to-b from-emerald-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-900 mb-2">
              Your AyurSutra NFC Card
            </h2>
            <p className="text-gray-700 mb-1">
              A smart card designed for our valued regular patients
            </p>
            
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 justify-center max-w-3xl mx-auto">
            {/* Card 1 - NFC Card with Tilt */}
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
                className="w-45 md:w-55"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-300">
                  <img
                    src={nfcCard1}
                    alt="NFC Card Front"
                    className="w-full h-auto object-cover rounded-2xl"
                  />
                  <div className="absolute inset-0 rounded-2xl ring-2 ring-emerald-300/20 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Card 2 - Patient Card with Tilt */}
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
                className="w-45 md:w-55"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-300">
                  <img
                    src={nfcCard2}
                    alt="NFC Card Patient"
                    className="w-full h-auto object-cover rounded-2xl"
                  />
                  <div className="absolute inset-0 rounded-2xl ring-2 ring-emerald-300/20 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

     {/* Section 3: What NFC Does for AyurSutra */}
<section className="py-16 md:py-28 px-4 bg-gradient-to-b from-white via-emerald-50 to-white">
  <div className="max-w-6xl mx-auto">
    <div className="text-center mb-14">
      <div className="inline-block mb-3 px-4 py-2 bg-emerald-100 rounded-full border border-emerald-300">
        <span className="text-emerald-700 text-sm font-semibold">🎁 Exclusive Benefits</span>
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-emerald-900 mb-3">
        Premium Membership Benefits
      </h2>
      <p className="text-gray-700 text-base md:text-lg max-w-2xl mx-auto">
        Experience hassle-free clinic visits with priority access, special discounts, and personalized wellness care
      </p>
    </div>

    {/* Benefits Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      
      {/* Benefit 1: Priority Queue */}
      <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500/10 to-emerald-100/20 border-2 border-emerald-200 p-6 hover:border-emerald-500 transition-all duration-300 hover:shadow-xl">
        <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-400/10 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-500" />
        
        <div className="relative z-10">
          <div className="bg-emerald-500/20 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:bg-emerald-500/30 transition-colors">
            <Users className="h-6 w-6 text-emerald-700" />
          </div>
          <h3 className="font-bold text-emerald-900 text-lg mb-2">Priority Queue System</h3>
          <p className="text-gray-700 text-sm leading-relaxed">
            Skip registration lines instantly. Simply tap your NFC card at the clinic entrance and get priority consultation slots.
          </p>
          <div className="mt-4 text-xs font-semibold text-emerald-600 bg-emerald-50 rounded-lg px-3 py-2 inline-block">
            ⏱️ Saves 15-20 mins per visit
          </div>
        </div>
      </div>

      {/* Benefit 2: Exclusive Discount */}
      <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500/10 to-amber-100/20 border-2 border-amber-200 p-6 hover:border-amber-500 transition-all duration-300 hover:shadow-xl">
        <div className="absolute top-0 right-0 w-20 h-20 bg-amber-400/10 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-500" />
        
        <div className="relative z-10">
          <div className="bg-amber-500/20 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:bg-amber-500/30 transition-colors">
            <Gift className="h-6 w-6 text-amber-700" />
          </div>
          <h3 className="font-bold text-emerald-900 text-lg mb-2">15% Flat Discount</h3>
          <p className="text-gray-700 text-sm leading-relaxed">
            Save on all Ayurvedic medicines, herbal products, wellness packages, and consultation fees across all clinics.
          </p>
          <div className="mt-4 text-xs font-semibold text-amber-600 bg-amber-50 rounded-lg px-3 py-2 inline-block">
            💰 Save ₹1500+ annually
          </div>
        </div>
      </div>

      {/* Benefit 3: Instant Health Records */}
      <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500/10 to-emerald-100/20 border-2 border-emerald-200 p-6 hover:border-emerald-500 transition-all duration-300 hover:shadow-xl">
        <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-400/10 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-500" />
        
        <div className="relative z-10">
          <div className="bg-emerald-500/20 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:bg-emerald-500/30 transition-colors">
            <Clock className="h-6 w-6 text-emerald-700" />
          </div>
          <h3 className="font-bold text-emerald-900 text-lg mb-2">Instant Medical History</h3>
          <p className="text-gray-700 text-sm leading-relaxed">
            Your complete Prakriti analysis, past treatments, herbal prescriptions, and wellness recommendations load instantly.
          </p>
          <div className="mt-4 text-xs font-semibold text-emerald-600 bg-emerald-50 rounded-lg px-3 py-2 inline-block">
            📋 Zero paperwork hassle
          </div>
        </div>
      </div>

      {/* Benefit 4: Smart Appointment Scheduling */}
      <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500/10 to-amber-100/20 border-2 border-amber-200 p-6 hover:border-amber-500 transition-all duration-300 hover:shadow-xl">
        <div className="absolute top-0 right-0 w-20 h-20 bg-amber-400/10 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-500" />
        
        <div className="relative z-10">
          <div className="bg-amber-500/20 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:bg-amber-500/30 transition-colors">
            <Zap className="h-6 w-6 text-amber-700" />
          </div>
          <h3 className="font-bold text-emerald-900 text-lg mb-2">Smart Wellness Reminders</h3>
          <p className="text-gray-700 text-sm leading-relaxed">
            Get personalized SMS & WhatsApp reminders for follow-ups, seasonal detox treatments, and prescribed wellness routines.
          </p>
          <div className="mt-4 text-xs font-semibold text-amber-600 bg-amber-50 rounded-lg px-3 py-2 inline-block">
            🔔 Never miss treatment dates
          </div>
        </div>
      </div>

      {/* Benefit 5: Loyalty Rewards */}
      <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500/10 to-emerald-100/20 border-2 border-emerald-200 p-6 hover:border-emerald-500 transition-all duration-300 hover:shadow-xl">
        <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-400/10 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-500" />
        
        <div className="relative z-10">
          <div className="bg-emerald-500/20 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:bg-emerald-500/30 transition-colors">
            <CheckCircle2 className="h-6 w-6 text-emerald-700" />
          </div>
          <h3 className="font-bold text-emerald-900 text-lg mb-2">Loyalty Rewards Program</h3>
          <p className="text-gray-700 text-sm leading-relaxed">
            Earn 1 reward point per ₹10 spent. Redeem for free medicines, premium treatments, or extend consultation sessions.
          </p>
          <div className="mt-4 text-xs font-semibold text-emerald-600 bg-emerald-50 rounded-lg px-3 py-2 inline-block">
            🎯 Spend ₹5000 = Free treatment
          </div>
        </div>
      </div>

      {/* Benefit 6: All Clinic Access */}
      <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500/10 to-amber-100/20 border-2 border-amber-200 p-6 hover:border-amber-500 transition-all duration-300 hover:shadow-xl">
        <div className="absolute top-0 right-0 w-20 h-20 bg-amber-400/10 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-500" />
        
        <div className="relative z-10">
          <div className="bg-amber-500/20 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:bg-amber-500/30 transition-colors">
            <Smartphone className="h-6 w-6 text-amber-700" />
          </div>
          <h3 className="font-bold text-emerald-900 text-lg mb-2">Pan-India Clinic Access</h3>
          <p className="text-gray-700 text-sm leading-relaxed">
            Use your card at any AyurSutra clinic across India. Your health profile syncs automatically for consistent care.
          </p>
          <div className="mt-4 text-xs font-semibold text-amber-600 bg-amber-50 rounded-lg px-3 py-2 inline-block">
            🌍 40+ clinic network
          </div>
        </div>
      </div>
    </div>

    {/* Bottom CTA */}
    <div className="mt-12 text-center">
      <p className="text-gray-700 mb-4">
        Ready to experience premium wellness benefits?
      </p>
      <Link
        to="/clinics"
        className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
      >
        Get Your NFC Card Today
        <ArrowRight className="h-5 w-5" />
      </Link>
    </div>
  </div>
</section>


      {/* Section 4: How to Get Your Card */}
      <section className="py-14 md:py-24 px-4 bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-700 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              How to Get Your NFC Card
            </h2>
            <p className="text-emerald-100">
              Join our exclusive patient community in 4 easy steps
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            {[
              { num: "1", title: "Visit Clinic", desc: "Visit any AyurSutra clinic" },
              { num: "2", title: "Register", desc: "Complete registration process" },
              { num: "3", title: "Receive Card", desc: "Get your NFC card instantly" },
              { num: "4", title: "Start Saving", desc: "Enjoy exclusive benefits" },
            ].map((step, idx) => (
              <div key={idx} className="text-center">
                <div className="bg-amber-400 text-emerald-900 rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg mx-auto mb-3">
                  {step.num}
                </div>
                <h3 className="font-semibold mb-1">{step.title}</h3>
                <p className="text-emerald-100 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link
              to="/clinics"
              className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-emerald-900 font-bold px-7 py-3 rounded-lg transition-all shadow-lg hover:shadow-xl hover:scale-105 duration-300"
            >
              Find Nearest Clinic
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Section 5: FAQ */}
      <section className="py-14 md:py-24 px-4 bg-emerald-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-emerald-900 text-center mb-10">
            Frequently Asked Questions
          </h2>

          <div className="space-y-3">
            {[
              {
                q: "Who is eligible for an NFC card?",
                a: "Any patient who visits us regularly (minimum 2 consultations in 6 months) can get an NFC card. You'll be assessed by our Vaidyas to ensure commitment to wellness.",
              },
              {
                q: "Is my health data secure?",
                a: "Yes, absolutely. Your data is encrypted with military-grade security. Only authorized terminals can read your card with complete user control.",
              },
              {
                q: "What if I lose my card?",
                a: "Simply visit any clinic to deactivate it. We'll issue a replacement within 24 hours for a minimal fee of ₹99.",
              },
              {
                q: "Works at all locations?",
                a: "Yes! Your card works at all AyurSutra clinics across India with instant health record synchronization.",
              },
              {
                q: "How much discount?",
                a: "You get 15% on all medicines and consultations, plus loyalty points (1 point per ₹10 spent) for rewards.",
              },
            ].map((faq, idx) => (
              <details
                key={idx}
                className="bg-white rounded-lg border-2 border-emerald-200 p-5 cursor-pointer hover:border-emerald-400 hover:bg-emerald-50/30 transition-all group"
              >
                <summary className="flex items-center justify-between font-semibold text-emerald-900">
                  {faq.q}
                  <span className="text-emerald-700 group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <p className="text-gray-700 mt-3 text-sm">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 md:py-16 px-4 bg-gradient-to-r from-emerald-600 to-emerald-700">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Ready to Join Our Wellness Community?
          </h2>
          <p className="text-emerald-100 text-lg mb-7">
            Get your NFC card today and start saving
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/clinics"
              className="bg-amber-400 hover:bg-amber-300 text-emerald-900 font-bold px-7 py-3 rounded-lg transition-all shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-2"
            >
              Find Clinic
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white hover:bg-white/10 font-bold px-7 py-3 rounded-lg transition-all inline-flex items-center justify-center gap-2"
            >
              Contact Us
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
};

export default NFC;
