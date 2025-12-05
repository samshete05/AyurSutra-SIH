import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const About = () => {
  return (
    <>
      <Navbar />
      <div className="bg-emerald-50/40">
        {/* Hero / heading */}
        <section className="bg-gradient-to-r from-[#1E4B3C] to-[#256f5a] text-white transition-all duration-700 ease-in-out">
          <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 lg:px-8">
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-100 animate-fadeIn">
              About AyurSutra
            </p>
            <h1 className="mt-2 text-4xl md:text-5xl font-extrabold leading-tight animate-slideDown">
              Panchakarma made simple,  
              <span className="block text-emerald-100">
                digital, and patient‑centric.
              </span>
            </h1>
            <p className="mt-4 max-w-2xl text-base md:text-lg text-emerald-50/90 animate-fadeIn">
              AyurSutra is a SaaS platform built to help Panchakarma centers
              schedule therapies, track patient progress, and manage centers
              with the efficiency of modern healthcare software.
            </p>
          </div>
        </section>

        {/* Story + mission */}
        <section className="mx-auto max-w-6xl px-4 py-16 md:px-6 lg:px-8 transition-all duration-700 ease-in-out">
          <div className="md:grid-cols-2 md:items-start">
            <div className="animate-slideLeft mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1E4B3C] mb-4">
                Why AyurSutra exists
              </h2>
              <p className="mt-3 text-base md:text-lg text-gray-700 mb-2">
                Panchakarma centers still depend heavily on paper registers,
                phone calls, and manual follow‑ups, which makes it difficult to
                manage therapy slots, staff availability, and patient history in
                a consistent way.
              </p>
              <p className="mt-2 text-base md:text-lg text-gray-700 mb-2">
                AyurSutra brings all of this into one secure digital platform:
                appointment and therapy scheduling, pre‑ and post‑procedure
                instructions, and progress tracking tailored to Panchakarma
                workflows. Our platform is designed to be intuitive, scalable, and supportive of both traditional and modern practices.
              </p>
              <p className="mt-2 text-base md:text-lg text-gray-700 mb-2">
                With AyurSutra, centers can focus on healing, not paperwork. Patients receive personalized care, and staff enjoy streamlined operations.
              </p>
            </div>

            <div className="rounded-2xl bg-white shadow-lg border border-emerald-100 p-6 space-y-3 animate-slideRight mb-16">
              <h3 className="text-sm font-semibold text-[#1E4B3C] uppercase tracking-wide mb-2">
                OUR MISSION
              </h3>
              <p className="text-base md:text-lg text-gray-700 mb-2">
                To empower Ayurvedic and Panchakarma centers with simple,
                reliable software that preserves traditional authenticity while
                improving operational efficiency and patient outcomes.
              </p>
              <ul className="mt-2 space-y-1 text-base text-gray-700">
                <li>• Reduce manual errors in scheduling and records.</li>
                <li>• Help patients clearly understand their therapy journey.</li>
                <li>• Give center heads better visibility of occupancy and demand.</li>
                <li>• Enable data-driven decisions for continuous improvement.</li>
                <li>• Foster a community of wellness and holistic care.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Key focus areas */}
        <section className="mx-auto max-w-6xl px-4 pb-16 md:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1E4B3C] mb-10 animate-fadeIn">
            What AyurSutra focuses on
          </h2>

          <div className="mt-5 grid gap-12 md:grid-cols-3">
            <div className="rounded-2xl bg-white border border-emerald-100 p-6 shadow-md hover:scale-105 transition-transform duration-300">
              <h3 className="text-base font-semibold text-[#1E4B3C] mb-2">
                Patient‑centric care
              </h3>
              <p className="mt-2 text-sm md:text-base text-gray-700 mb-2">
                Clear notifications, therapy timelines, and simple tracking so
                patients know exactly what to do before, during, and after each
                Panchakarma session.
              </p>
              <ul className="mt-2 space-y-1 text-sm md:text-base text-emerald-900 list-disc pl-4">
                <li>Personalized instructions for every therapy step.</li>
                <li>Easy access to progress reports and feedback forms.</li>
                <li>Reminders for appointments and post-therapy care.</li>
                <li>Confidential digital records for privacy and security.</li>
                <li>24/7 access to therapy history and recommendations.</li>
              </ul>
            </div>

            <div className="rounded-2xl bg-white border border-emerald-100 p-6 shadow-md hover:scale-105 transition-transform duration-300">
              <h3 className="text-base font-semibold text-[#1E4B3C] mb-2">
                Center efficiency
              </h3>
              <p className="mt-2 text-sm md:text-base text-gray-700 mb-2">
                Automated slot management, occupancy insights, and reduced
                no‑shows help centers use their therapy rooms, staff, and
                equipment more effectively.
              </p>
              <ul className="mt-2 space-y-1 text-sm md:text-base text-emerald-900 list-disc pl-4">
                <li>Centralized dashboard for all appointments and schedules.</li>
                <li>Staff allocation and shift management tools.</li>
                <li>Instant alerts for cancellations and rescheduling.</li>
                <li>Inventory tracking for therapy supplies and medicines.</li>
                <li>Integrated billing and reporting features.</li>
              </ul>
            </div>

            <div className="rounded-2xl bg-white border border-emerald-100 p-6 shadow-md hover:scale-105 transition-transform duration-300">
              <h3 className="text-base font-semibold text-[#1E4B3C] mb-2">
                Real‑time insights
              </h3>
              <p className="mt-2 text-sm md:text-base text-gray-700 mb-2">
                Track therapy progress, responses, and feedback over time to
                refine protocols while keeping records organized and accessible.
              </p>
              <ul className="mt-2 space-y-1 text-sm md:text-base text-emerald-900 list-disc pl-4">
                <li>Visual analytics for therapy outcomes and patient satisfaction.</li>
                <li>Historical data to support research and improvement.</li>
                <li>Customizable reports for center management and compliance.</li>
                <li>Secure cloud storage for all patient and therapy data.</li>
                <li>Benchmarking and best-practice sharing across centers.</li>
              </ul>
            </div>
          </div>

          <div className="mt-16 rounded-2xl bg-gradient-to-r from-[#1E4B3C] to-[#256f5a] p-8 text-white shadow-lg animate-fadeIn">
            <h3 className="text-2xl font-bold mb-4 text-emerald-100">
              How AyurSutra Benefits Everyone
            </h3>
            <ul className="space-y-2 text-base md:text-lg list-disc pl-5 mb-4">
              <li>
                <span className="font-semibold text-emerald-100">For Patients:</span> 
                Seamless therapy experience, clear instructions, and easy access to their health records. Personalized care and ongoing support.
              </li>
              <li>
                <span className="font-semibold text-emerald-100">For Staff:</span> 
                Simplified scheduling, reduced paperwork, and better coordination for delivering therapies. Training modules and support resources.
              </li>
              <li>
                <span className="font-semibold text-emerald-100">For Center Owners:</span> 
                Real-time visibility into operations, occupancy, and performance, enabling data-driven decisions. Financial and compliance management.
              </li>
              <li>
                <span className="font-semibold text-emerald-100">For the Community:</span> 
                Promotes authentic Ayurvedic care with modern efficiency, helping more people benefit from Panchakarma. Fosters a network of wellness.
              </li>
            </ul>
            <p className="mt-6 text-emerald-100 text-base">
              AyurSutra is dedicated to making holistic wellness accessible, efficient, and impactful for everyone involved.
            </p>
          </div>
        </section>

        {/* New: Our Values */}
        <section className="mx-auto max-w-6xl px-4 pb-20 md:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1E4B3C] mb-10 animate-fadeIn">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-white rounded-2xl shadow border border-emerald-100 p-6 text-center animate-fadeIn">
              <h4 className="text-lg font-bold text-[#1E4B3C] mb-2">Authenticity</h4>
              <p className="text-gray-700 text-base">
                We honor the roots of Ayurveda and Panchakarma, blending tradition with technology for genuine healing.
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow border border-emerald-100 p-6 text-center animate-fadeIn">
              <h4 className="text-lg font-bold text-[#1E4B3C] mb-2">Empathy</h4>
              <p className="text-gray-700 text-base">
                Every feature is designed with compassion for patients, staff, and center owners—wellness is personal.
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow border border-emerald-100 p-6 text-center animate-fadeIn">
              <h4 className="text-lg font-bold text-[#1E4B3C] mb-2">Innovation</h4>
              <p className="text-gray-700 text-base">
                We continuously improve our platform, embracing new ideas to make holistic care more accessible and effective.
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow border border-emerald-100 p-6 text-center animate-fadeIn">
              <h4 className="text-lg font-bold text-[#1E4B3C] mb-2">Integrity</h4>
              <p className="text-gray-700 text-base">
                Data privacy, transparency, and ethical practices are at the heart of everything we do.
              </p>
            </div>
          </div>
        </section>

        {/* New: Meet the Team */}
        <section className="mx-auto max-w-6xl px-4 pb-24 md:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1E4B3C] mb-10 animate-fadeIn">
            Meet the AyurSutra Team
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-white rounded-2xl shadow border border-emerald-100 p-6 flex flex-col items-center animate-fadeIn">
              <div className="w-24 h-24 rounded-full bg-emerald-100 mb-4 flex items-center justify-center text-3xl font-bold text-[#1E4B3C]">
                A
              </div>
              <h4 className="text-lg font-bold text-[#1E4B3C] mb-1">A</h4>
              <p className="text-emerald-700 mb-1">Founder & CEO</p>
              <p className="text-gray-700 text-center text-sm">
                Visionary behind AyurSutra, passionate about digital health and Ayurveda.
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow border border-emerald-100 p-6 flex flex-col items-center animate-fadeIn">
              <div className="w-24 h-24 rounded-full bg-emerald-100 mb-4 flex items-center justify-center text-3xl font-bold text-[#1E4B3C]">
                R
              </div>
              <h4 className="text-lg font-bold text-[#1E4B3C] mb-1">R</h4>
              <p className="text-emerald-700 mb-1">CTO</p>
              <p className="text-gray-700 text-center text-sm">
                Leads product development, ensuring reliability and innovation.
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow border border-emerald-100 p-6 flex flex-col items-center animate-fadeIn">
              <div className="w-24 h-24 rounded-full bg-emerald-100 mb-4 flex items-center justify-center text-3xl font-bold text-[#1E4B3C]">
                S
              </div>
              <h4 className="text-lg font-bold text-[#1E4B3C] mb-1">S</h4>
              <p className="text-emerald-700 mb-1">Lead Ayurveda Expert</p>
              <p className="text-gray-700 text-center text-sm">
                Guides our clinical content and ensures authentic Ayurvedic practices.
              </p>
            </div>
          </div>
        </section>

        {/* New: Call to Action */}
        <section className="mx-auto max-w-4xl px-4 pb-24 md:px-6 lg:px-8 text-center">
          <div className="rounded-2xl bg-gradient-to-r from-[#1E4B3C] to-[#256f5a] p-10 text-white shadow-lg animate-fadeIn">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-emerald-100">
              Ready to experience the future of Panchakarma?
            </h2>
            <p className="mb-6 text-lg">
              Join AyurSutra and transform your center's operations, patient care, and outcomes. Let's bring Ayurveda into the digital age—together.
            </p>
            <a
              href="/contact"
              className="inline-block bg-white text-[#1E4B3C] font-bold px-8 py-3 rounded-lg shadow hover:bg-emerald-100 transition"
            >
              Contact Us
            </a>
          </div>
        </section>
      </div>
      <Footer />
      {/* Animations */}
      <style>{`
        .animate-fadeIn { animation: fadeIn 1s ease; }
        .animate-slideDown { animation: slideDown 1s ease; }
        .animate-slideLeft { animation: slideLeft 1s ease; }
        .animate-slideRight { animation: slideRight 1s ease; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideDown { from { transform: translateY(-40px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes slideLeft { from { transform: translateX(-40px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes slideRight { from { transform: translateX(40px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
      `}</style>
    </>
  );
};

export default About;
