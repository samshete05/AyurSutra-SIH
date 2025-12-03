import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const About = () => {
  return (
    <>
    <Navbar/>
    <div className="bg-emerald-50/40">
      {/* Hero / heading */}
      <section className="bg-gradient-to-r from-[#1E4B3C] to-[#256f5a] text-white">
        <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-100">
            About AyurSutra
          </p>
          <h1 className="mt-2 text-3xl md:text-4xl font-extrabold leading-tight">
            Panchakarma made simple,  
            <span className="block text-emerald-100">
              digital, and patient‑centric.
            </span>
          </h1>
          <p className="mt-4 max-w-2xl text-sm md:text-base text-emerald-50/90">
            AyurSutra is a SaaS platform built to help Panchakarma centers
            schedule therapies, track patient progress, and manage centers
            with the efficiency of modern healthcare software.
          </p>
        </div>
      </section>

      {/* Story + mission */}
      <section className="mx-auto max-w-6xl px-4 py-10 md:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 md:items-start">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-[#1E4B3C]">
              Why AyurSutra exists
            </h2>
            <p className="mt-3 text-sm md:text-base text-gray-700">
              Panchakarma centers still depend heavily on paper registers,
              phone calls, and manual follow‑ups, which makes it difficult to
              manage therapy slots, staff availability, and patient history in
              a consistent way.
            </p>
            <p className="mt-2 text-sm md:text-base text-gray-700">
              AyurSutra brings all of this into one secure digital platform:
              appointment and therapy scheduling, pre‑ and post‑procedure
              instructions, and progress tracking tailored to Panchakarma
              workflows.
            </p>
          </div>

          <div className="rounded-2xl bg-white shadow-md border border-emerald-100 p-5 space-y-3">
            <h3 className="text-sm font-semibold text-[#1E4B3C] uppercase tracking-wide">
              Our mission
            </h3>
            <p className="text-sm md:text-base text-gray-700">
              To empower Ayurvedic and Panchakarma centers with simple,
              reliable software that preserves traditional authenticity while
              improving operational efficiency and patient outcomes.
            </p>
            <ul className="mt-2 space-y-1 text-sm text-gray-700">
              <li>• Reduce manual errors in scheduling and records.</li>
              <li>• Help patients clearly understand their therapy journey.</li>
              <li>• Give center heads better visibility of occupancy and demand.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Key focus areas */}
      <section className="mx-auto max-w-6xl px-4 pb-12 md:px-6 lg:px-8">
        <h2 className="text-xl md:text-2xl font-bold text-[#1E4B3C]">
          What AyurSutra focuses on
        </h2>

        <div className="mt-5 grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl bg-white border border-emerald-100 p-4 shadow-sm">
            <h3 className="text-sm font-semibold text-[#1E4B3C]">
              Patient‑centric care
            </h3>
            <p className="mt-2 text-xs md:text-sm text-gray-700">
              Clear notifications, therapy timelines, and simple tracking so
              patients know exactly what to do before, during, and after each
              Panchakarma session.
            </p>
            <ul className="mt-2 space-y-1 text-xs md:text-sm text-emerald-900 list-disc pl-4">
              <li>Personalized instructions for every therapy step.</li>
              <li>Easy access to progress reports and feedback forms.</li>
              <li>Reminders for appointments and post-therapy care.</li>
              <li>Confidential digital records for privacy and security.</li>
            </ul>
          </div>

          <div className="rounded-2xl bg-white border border-emerald-100 p-4 shadow-sm">
            <h3 className="text-sm font-semibold text-[#1E4B3C]">
              Center efficiency
            </h3>
            <p className="mt-2 text-xs md:text-sm text-gray-700">
              Automated slot management, occupancy insights, and reduced
              no‑shows help centers use their therapy rooms, staff, and
              equipment more effectively.
            </p>
            <ul className="mt-2 space-y-1 text-xs md:text-sm text-emerald-900 list-disc pl-4">
              <li>Centralized dashboard for all appointments and schedules.</li>
              <li>Staff allocation and shift management tools.</li>
              <li>Instant alerts for cancellations and rescheduling.</li>
              <li>Inventory tracking for therapy supplies and medicines.</li>
            </ul>
          </div>

          <div className="rounded-2xl bg-white border border-emerald-100 p-4 shadow-sm">
            <h3 className="text-sm font-semibold text-[#1E4B3C]">
              Real‑time insights
            </h3>
            <p className="mt-2 text-xs md:text-sm text-gray-700">
              Track therapy progress, responses, and feedback over time to
              refine protocols while keeping records organized and accessible.
            </p>
            <ul className="mt-2 space-y-1 text-xs md:text-sm text-emerald-900 list-disc pl-4">
              <li>Visual analytics for therapy outcomes and patient satisfaction.</li>
              <li>Historical data to support research and improvement.</li>
              <li>Customizable reports for center management and compliance.</li>
              <li>Secure cloud storage for all patient and therapy data.</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 rounded-2xl bg-gradient-to-r from-[#1E4B3C] to-[#256f5a] p-6 text-white shadow-md">
          <h3 className="text-lg font-bold mb-2 text-emerald-100">
            How AyurSutra Benefits Everyone
          </h3>
          <ul className="space-y-2 text-sm md:text-base list-disc pl-5">
            <li>
              <span className="font-semibold text-emerald-100">For Patients:</span> 
              Seamless therapy experience, clear instructions, and easy access to their health records.
            </li>
            <li>
              <span className="font-semibold text-emerald-100">For Staff:</span> 
              Simplified scheduling, reduced paperwork, and better coordination for delivering therapies.
            </li>
            <li>
              <span className="font-semibold text-emerald-100">For Center Owners:</span> 
              Real-time visibility into operations, occupancy, and performance, enabling data-driven decisions.
            </li>
            <li>
              <span className="font-semibold text-emerald-100">For the Community:</span> 
              Promotes authentic Ayurvedic care with modern efficiency, helping more people benefit from Panchakarma.
            </li>
          </ul>
        </div>
      </section>
    </div>
    <Footer/>
    </>
  );
};

export default About;
