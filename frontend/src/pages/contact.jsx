import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const Contact = () => {
  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-br from-emerald-50/60 via-emerald-100 to-white min-h-screen flex flex-col">
        <div className="max-w-4xl mx-auto px-4 py-12 flex-1">
          {/* Decorative header with icon and wave */}
          <div className="relative mb-10">
            <div className="flex items-center gap-3 mb-4 animate-fadeIn">
              <span className="bg-[#1E4B3C] text-white rounded-full p-3 text-3xl shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="inline" width="32" height="32" fill="currentColor" viewBox="0 0 16 16"><path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-5.857 3.514a1 1 0 0 1-1.286 0L2 5.383V12a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V5.383z"/></svg>
              </span>
              <h1 className="text-4xl font-bold text-[#1E4B3C]">Contact AyurSutra</h1>
            </div>
            <svg className="absolute left-0 bottom-[-20px] w-full h-8" viewBox="0 0 1440 320"><path fill="#1E4B3C" fillOpacity="0.08" d="M0,160L1440,32L1440,320L0,320Z"></path></svg>
          </div>
          {/* Info cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12 animate-fadeIn">
            <div className="bg-white rounded-xl shadow-md p-6 border border-emerald-100 flex flex-col items-center">
              <span className="text-emerald-600 text-3xl mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16"><path d="M3.654 1.328a.678.678 0 0 1 1.015-.063l2.29 2.29c.329.329.445.81.293 1.243l-.547 1.64a.678.678 0 0 1-.646.46c-.26 0-.52-.1-.707-.293L4.21 5.21a.678.678 0 0 1-.063-1.015l1.507-1.507zm8.485 8.485a.678.678 0 0 1-.063 1.015l-1.507 1.507a.678.678 0 0 1-1.015-.063l-2.29-2.29a.678.678 0 0 1-.293-.707l.547-1.64a.678.678 0 0 1 .646-.46c.26 0 .52.1.707.293l1.507 1.507a.678.678 0 0 1 .063 1.015z"/></svg>
              </span>
              <h2 className="font-semibold text-[#1E4B3C] mb-1">Call Us</h2>
              <p className="text-gray-700 text-sm">+91 98765 43210</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 border border-emerald-100 flex flex-col items-center">
              <span className="text-emerald-600 text-3xl mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16"><path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-5.857 3.514a1 1 0 0 1-1.286 0L2 5.383V12a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V5.383z"/></svg>
              </span>
              <h2 className="font-semibold text-[#1E4B3C] mb-1">Email</h2>
              <p className="text-gray-700 text-sm">
                <a href="mailto:support@ayursutra.com" className="text-orange-500 underline">support@ayursutra.com</a>
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 border border-emerald-100 flex flex-col items-center">
              <span className="text-emerald-600 text-3xl mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16"><path d="M8 3.293l6 6V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V9.293l6-6zm5 6.707V13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V10l5-5 5 5z"/></svg>
              </span>
              <h2 className="font-semibold text-[#1E4B3C] mb-1">Visit Us</h2>
              <p className="text-gray-700 text-sm">AyurSutra HQ, Wellness Avenue, Mumbai</p>
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
          <form className="bg-white rounded-2xl shadow-md p-8 space-y-6 border border-emerald-100 animate-fadeIn">
            <div>
              <label className="block text-[#1E4B3C] font-semibold mb-2" htmlFor="name">Name</label>
              <input
                className="w-full px-4 py-2 border border-emerald-200 rounded focus:outline-none focus:ring-2 focus:ring-emerald-400"
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
                className="w-full px-4 py-2 border border-emerald-200 rounded focus:outline-none focus:ring-2 focus:ring-emerald-400"
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
                className="w-full px-4 py-2 border border-emerald-200 rounded focus:outline-none focus:ring-2 focus:ring-emerald-400"
                id="message"
                name="message"
                rows={5}
                placeholder="How can we help you?"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-[#1E4B3C] text-white font-bold px-6 py-2 rounded hover:bg-emerald-700 transition"
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