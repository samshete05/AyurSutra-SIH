import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ayurCenters = [
  {
    name: "Shanti Ayurveda Panchakarma Center",
    city: "Kochi",
    address: "Beach Road, Fort Kochi",
    aiAgent: "+91-48-4400-2233",
    customer: "+91-48-4400-8899",
    timings: "07:00 – 20:30",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    mapsUrl: "https://www.google.com/maps?q=Beach+Road,+Fort+Kochi",
    type: "Panchakarma Center"
  },
  {
    name: "Vedya Ayurveda & Panchakarma",
    city: "Hyderabad",
    address: "Jubilee Hills Road No. 36",
    aiAgent: "+91-40-6600-7788",
    customer: "+91-40-6600-7799",
    timings: "08:00 – 22:00",
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80",
    mapsUrl: "https://www.google.com/maps?q=Jubilee+Hills+Road+No+36,+Hyderabad",
    type: "Panchakarma Center"
  },
  {
    name: "Saumya Ayurveda Center",
    city: "Chennai",
    address: "Besant Nagar Beach Road",
    aiAgent: "Not available",
    customer: "+91-44-4300-5566",
    timings: "07:30 – 21:00",
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
    mapsUrl: "https://www.google.com/maps?q=Besant+Nagar+Beach+Road,+Chennai",
    type: "Panchakarma Center"
  },
  {
    name: "AyurSutra Panchakarma Center",
    city: "Bengaluru",
    address: "3rd Cross, 5th Block, Koramangala",
    aiAgent: "+91-80-4000-1234",
    customer: "+91-80-4000-5678",
    timings: "07:00 – 21:00",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    mapsUrl: "https://www.google.com/maps?q=Koramangala,+Bengaluru",
    type: "Panchakarma Center"
  },
  {
    name: "Swasthya Ayurveda Clinic",
    city: "Kolkata",
    address: "12, Lake Road, Rabindra Sarobar",
    aiAgent: "Not available",
    customer: "+91-33-3000-3344",
    timings: "08:00 – 20:30",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    mapsUrl: "https://www.google.com/maps?q=Lake+Road,+Rabindra+Sarobar,+Kolkata",
    type: "Ayurveda Clinic"
  },
  {
    name: "Prana Ayurveda & Panchakarma",
    city: "New Delhi",
    address: "D-21, South Extension",
    aiAgent: "+91-11-4555-7788",
    customer: "+91-11-4555-9900",
    timings: "06:30 – 22:00",
    image: "https://images.unsplash.com/photo-1454023492550-5696f8ff10e1?auto=format&fit=crop&w=400&q=80",
    mapsUrl: "https://www.google.com/maps?q=South+Extension,+New+Delhi",
    type: "Panchakarma Center"
  },
  {
    name: "Sattva Ayurveda & Wellness",
    city: "Mumbai",
    address: "2nd Floor, Palm Avenue, Andheri West",
    aiAgent: "+91-22-6000-1212",
    customer: "+91-22-6000-3434",
    timings: "07:30 – 21:30",
    image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=400&q=80",
    mapsUrl: "https://www.google.com/maps?q=2nd+Floor,+Palm+Avenue,+Andheri+West,+Mumbai",
    type: "Panchakarma Center"
  },
  {
    name: "Ojas Panchakarma Retreat",
    city: "Pune",
    address: "Near Mulshi Road, Bavdhan",
    aiAgent: "+91-20-5500-9909",
    customer: "+91-20-5500-8080",
    timings: "06:00 – 20:00",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    mapsUrl: "https://www.google.com/maps?q=Near+Mulshi+Road,+Bavdhan,+Pune",
    type: "Panchakarma Center"
  },
  {
    name: "Amruta Ayurveda Clinic",
    city: "Ahmedabad",
    address: "Nr. Law Garden, Ellis Bridge",
    aiAgent: "Not available",
    customer: "+91-79-4500-6677",
    timings: "09:00 – 19:00",
    image: "https://images.unsplash.com/photo-1520880867055-1e30d1cb001c?auto=format&fit=crop&w=400&q=80",
    mapsUrl: "https://www.google.com/maps?q=Nr.+Law+Garden,+Ellis+Bridge,+Ahmedabad",
    type: "Panchakarma Center"
  }
];

export const Contact = () => {
  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/allcenters')
      .then(res => res.json())
      .then(data => {
        setCenters(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar />
      {/* Green Info Box - styled like About file */}
      <section
        className="w-full flex items-center"
        style={{
          background: "linear-gradient(90deg, #276b5c 0%, #256d4f 100%)",
          minHeight: "380px",
          borderBottomLeftRadius: "0px",
          borderBottomRightRadius: "0px",
          marginBottom: "0",
          boxShadow: "0 4px 24px 0 rgba(30,75,60,0.12)",
          transition: "all 0.6s cubic-bezier(.4,0,.2,1)"
        }}
      >
        <div className="max-w-5xl mx-auto px-8 py-12 w-full">
          <div className="mb-6">
            <span className="tracking-widest text-white/80 text-sm font-semibold uppercase" style={{ letterSpacing: "2px" }}>
              CONTACT AYURSUTRA
            </span>
          </div>
          <h1
            className="text-4xl md:text-5xl font-extrabold text-white mb-6"
            style={{
              lineHeight: 1.15,
              letterSpacing: "0.5px",
              textShadow: "0 2px 8px rgba(0,0,0,0.08)",
              transition: "all 0.6s cubic-bezier(.4,0,.2,1)"
            }}
          >
            Connect with our team for<br />
            <span className="text-[#bfffe2]">Ayurvedic guidance & support.</span>
          </h1>
          <p
            className="text-white/90 text-xl md:text-2xl font-medium"
            style={{
              maxWidth: "700px",
              lineHeight: 1.5,
              transition: "all 0.6s cubic-bezier(.4,0,.2,1)"
            }}
          >
            Reach out for personalized advice, center details, or any help you need. We're here to support your wellness journey with expert care and prompt responses.
          </p>
        </div>
      </section>
      <div className="bg-gradient-to-br from-emerald-50/60 via-emerald-100 to-white min-h-screen flex flex-col">
        <div className="max-w-7xl mx-auto px-4 py-12 flex-1">
          {/* Move Locate Our Center map to the top */}
          <div className="mb-10 animate-fadeIn">
            <div
              className="overflow-hidden shadow-lg border border-emerald-100 mx-auto"
              style={{ maxWidth: 1300, position: "relative", height: 340 }}
            >
              <iframe
                title="AyurSutra Center Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3772.964184710017!2d73.85674307519644!3d18.52043098257409!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c06c3e6b5e6b%3A0x8e1e4e1e4e1e4e1e!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000001!5m2!1sen!2sin"
                style={{
                  zIndex: 3,
                  position: "absolute",
                  height: "180",
                  width: "100%",
                  padding: 0,
                  borderWidth: 0,
                  margin: 0,
                  left: 0,
                  top: 0,
                  touchAction: "pan-x pan-y"
                }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <p className="text-gray-700 mt-2 text-sm text-center">
              Find us at AyurSutra HQ, Lavale, Pune, Maharashtra.
            </p>
          </div>

          {/* Ayurvedic Centers as Cards with Map */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-[#1E4B3C] mb-4 animate-fadeIn">Our Ayurvedic Centers</h2>
            <div className="grid md:grid-cols-3 gap-10">
              {ayurCenters.map((center) => (
                <div
                  key={center.name}
                  className="bg-white shadow-lg border border-emerald-100 overflow-hidden flex flex-col animate-fadeIn"
                  style={{ width: 400, height: 470, minWidth: 320, maxWidth: 400, margin: "0 auto", transition: "box-shadow 0.3s" }}
                >
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-[#1E4B3C] mb-1">{center.name}</h3>
                    <div className="text-emerald-700 mb-1">{center.city}</div>
                    <div className="font-semibold mb-1">{center.address}</div>
                    <div className="text-sm mb-1">
                      <span className="font-semibold">AI Agent:</span> {center.aiAgent}
                    </div>
                    <div className="text-sm mb-1">
                      <span className="font-semibold">Customer:</span> {center.customer}
                    </div>
                    <div className="mb-1">
                      <span className="font-semibold text-emerald-700">Timings:</span> {center.timings}
                    </div>
                    <div className="mb-2">
                      <span className="font-semibold text-emerald-700">{center.type}</span>
                    </div>
                    <div className="rounded-lg overflow-hidden border border-emerald-50 shadow-sm mb-2 w-full">
                      <iframe
                        title={center.name + " Location"}
                        src={`https://www.google.com/maps?q=${encodeURIComponent(center.address + ', ' + center.city)}&output=embed`}
                        width="100%"
                        height="180"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                    </div>
                    <button
                      className="mt-auto bg-emerald-600 text-white font-semibold px-4 py-2 rounded hover:bg-emerald-700 transition"
                      onClick={() => window.open(center.mapsUrl, "_blank")}
                    >
                      View on Map
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Image and info before the form */}
          <div className="flex flex-col md:flex-row items-center gap-8 mb-8 animate-slideDown">
            <img
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
              alt="Ayurvedic Consultation"
              className="rounded-2xl shadow-md w-full md:w-56 h-44 object-cover"
            />
            <div>
              <h2 className="text-xl font-semibold text-[#1E4B3C] mb-2">We're Listening!</h2>
              <p className="text-gray-700">
                Whether you have a question about therapies, need technical support, or want to share your experience, our team is ready to assist you. Your feedback helps us improve AyurSutra for everyone.
              </p>
              <ul className="mt-2 text-gray-700 list-disc pl-5 text-sm">
                <li>Response within 24 hours on working days</li>
                <li>All queries are confidential and secure</li>
                <li>Support available in English, Hindi, and Marathi</li>
              </ul>
            </div>
          </div>
          {/* Contact form */}
          <form className="bg-white rounded-2xl shadow-md p-8 space-y-6 border border-emerald-100 animate-fadeIn mb-8 transition-all duration-700">
            <div>
              <label className="block text-[#1E4B3C] font-semibold mb-2" htmlFor="name">Name</label>
              <input
                className="w-full px-4 py-2 border border-emerald-200 rounded focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all duration-300"
                type="text"
                id="name"
                name="name"
                placeholder="Your Name"
                required
              />
            </div>
            <div>
              <label className="block text-[#1E4B3C] font-semibold mb-2" htmlFor="email">Email</label>
              <input
                className="w-full px-4 py-2 border border-emerald-200 rounded focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all duration-300"
                type="email"
                id="email"
                name="email"
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-[#1E4B3C] font-semibold mb-2" htmlFor="message">Message</label>
              <textarea
                className="w-full px-4 py-2 border border-emerald-200 rounded focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all duration-300"
                id="message"
                name="message"
                rows={5}
                placeholder="How can we help you?"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-[#1E4B3C] text-white font-bold px-6 py-2 rounded hover:bg-emerald-700 transition-all duration-300"
            >
              Send Message
            </button>
          </form>
          {/* Social links */}
          <div className="mt-10 text-gray-700 text-center animate-fadeIn">
            <p>
              Or email us directly at <a href="mailto:support@ayursutra.com" className="text-orange-500 underline">support@ayursutra.com</a>
            </p>
            <p className="mt-2">
              For urgent queries, visit our <a href="/help-center" className="text-orange-500 underline">Help Center</a>.
            </p>
            <div className="flex justify-center gap-6 mt-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-emerald-600 text-2xl hover:text-emerald-900 transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16"><path d="M8.94 8.94v3.12h2.06v-3.12h1.38l.22-1.72h-1.6V6.5c0-.5.14-.84.86-.84h.74V4.18c-.13-.02-.57-.06-1.09-.06-1.08 0-1.83.66-1.83 1.87v1.23H7.5v1.72h1.44z"/></svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-emerald-600 text-2xl hover:text-emerald-900 transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16"><path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.009-.422A6.673 6.673 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.084.797A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.381A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115c-.212 0-.417-.021-.616-.061a3.293 3.293 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-emerald-600 text-2xl hover:text-emerald-900 transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16"><path d="M8 3.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9zm0 7.5a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm4.5-7a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm1.5 1.5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h.5a1 1 0 0 1 1 1v.5a1 1 0 0 1-1 1z"/></svg>
              </a>
            </div>
          </div>
        </div>
        <Footer />
      </div>
      {/* Animations */}
      <style>{`
        .animate-fadeIn { animation: fadeIn 1s ease; }
        .animate-slideDown { animation: slideDown 1s ease; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideDown { from { transform: translateY(-40px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      `}</style>
    </>
  );
};