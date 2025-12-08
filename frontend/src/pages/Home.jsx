// Home.jsx
import React from "react";
import AdvancedCenterSearch from "../components/AdvancedCenterSearch";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import HeroCarousel from "../components/HeroCarousel";
import PanchakarmaCentersMap from "../components/PanchakarmaCentersMap";
import TelemedicineProcessTabs from "../components/PanchakarmaPatientFlow";
import HealthBlogsFeature from "../components/HealthBlogsFeature";
import EcommerceFeatureSection from "../components/EcommerceFeatureSection";
import Marquee from "react-fast-marquee";
import { useLocation } from "react-router-dom";
import NFCFeatureCard from "../components/NFCFeatureCard";
import { Link } from "lucide-react";

export const Home = () => {

   const location = useLocation();
    
   
  return (
    <>
      <Navbar />
      <HeroCarousel />


<div className="w-full bg-[#1E4B3C] py-8">
  <Marquee
  direction="right" 
    gradient={false}
    speed={60}
    pauseOnHover={true}
    className="flex items-center text-white text-xs md:text-sm"
  >
    <span className="mx-8 whitespace-nowrap">
      Free scheduling dashboard for the first 3 months for new Panchakarma centers.
    </span>

    <span className="mx-2 opacity-60">|</span>

    <span className="mx-8 whitespace-nowrap">
      Secure digital records for every therapy session and patient visit.
    </span>

    <span className="mx-2 opacity-60">|</span>

    <span className="mx-8 whitespace-nowrap">
      Automated reminders for pre- and post-therapy precautions.
    </span>
  </Marquee>
</div>

      {/* <AdvancedCenterSearch /> */}
      <TelemedicineProcessTabs/>



      {/* Platform overview */}
      <section className="bg-emerald-50/40 py-10 md:py-14">
        <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-700">
                WHY AYURSUTRA
              </p>
              <h2 className="mt-2 text-2xl md:text-3xl font-extrabold text-[#1E4B3C] leading-snug">
                One platform for every
                <span className="block">Panchakarma journey.</span>
              </h2>
              <p className="mt-3 text-sm md:text-base text-gray-700">
                AyurSutra connects patients, center heads, and doctors in a
                single secure platform – from booking and scheduling to therapy
                tracking and follow‑up care.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-gray-700">
                <li>• Automated therapy and room scheduling.</li>
                <li>• Pre‑ and post‑procedure instructions on web and mobile.</li>
                <li>• Real‑time view of session status and patient progress.</li>
              </ul>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-white border border-emerald-100 shadow-sm p-4">
                <p className="text-xs font-semibold text-emerald-800">
                  For Patients
                </p>
                <p className="mt-2 text-xs md:text-sm text-gray-700">
                  Clear guidance on preparation, after‑care, and visit history,
                  so every therapy feels safe and predictable.
                </p>
              </div>
              <div className="rounded-2xl bg-white border border-emerald-100 shadow-sm p-4">
                <p className="text-xs font-semibold text-emerald-800">
                  For Centers
                </p>
                <p className="mt-2 text-xs md:text-sm text-gray-700">
                  Dashboard for occupancy, therapist schedules, and upcoming
                  therapies – no more paper registers.
                </p>
              </div>
              <div className="rounded-2xl bg-white border border-emerald-100 shadow-sm p-4">
                <p className="text-xs font-semibold text-emerald-800">
                  For Doctors
                </p>
                <p className="mt-2 text-xs md:text-sm text-gray-700">
                  Structured SOAP‑style notes, outcomes, and feedback to refine
                  Panchakarma protocols over time.
                </p>
              </div>
              <div className="rounded-2xl bg-white border border-emerald-100 shadow-sm p-4">
                <p className="text-xs font-semibold text-emerald-800">
                  Multi‑Center Ready
                </p>
                <p className="mt-2 text-xs md:text-sm text-gray-700">
                  Manage multiple branches, practitioners, and therapy rooms
                  from a unified cloud panel.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      

      {/* Key features */}
      <section className="bg-white py-10 md:py-14">
        <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-700">
                CORE MODULES
              </p>
              <h2 className="mt-2 text-2xl md:text-3xl font-extrabold text-[#1E4B3C]">
                Built around Panchakarma workflows.
              </h2>
            </div>
            <p className="max-w-md text-xs md:text-sm text-gray-700">
              Every feature is designed with Panchakarma in mind – not generic
              hospital software – so your therapy rooms, staff, and patients
              stay perfectly in sync.
            </p>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4">
              <h3 className="text-sm font-semibold text-[#1E4B3C]">
                Therapy Scheduling Engine
              </h3>
              <p className="mt-2 text-xs md:text-sm text-gray-700">
                Auto‑assign therapists and rooms based on duration, equipment,
                and gender preferences, while avoiding overlaps.
              </p>
            </div>
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/40 p-4">
              <h3 className="text-sm font-semibold text-[#1E4B3C]">
                Pre / Post‑Care Automation
              </h3>
              <p className="mt-2 text-xs md:text-sm text-gray-700">
                Send reminders via in‑app, SMS, or email about fasting, diet,
                rest windows, and follow‑up visits.
              </p>
            </div>
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/40 p-4">
              <h3 className="text-sm font-semibold text-[#1E4B3C]">
                Progress & Feedback Loop
              </h3>
              <p className="mt-2 text-xs md:text-sm text-gray-700">
                Capture symptoms, side‑effects, and improvements after every
                session to refine the plan in real time.
              </p>
            </div>
          </div>
        </div>
      </section>

      <PanchakarmaCentersMap/>


      {/* Workflow steps */}
      <section className="bg-emerald-900 py-10 md:py-14">
        <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8 text-emerald-50">
          <div className="md:flex md:items-start md:justify-between gap-6">
            <div className="max-w-md">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-200">
                HOW IT WORKS
              </p>
              <h2 className="mt-2 text-2xl md:text-3xl font-extrabold">
                From first consultation to last session.
              </h2>
              <p className="mt-3 text-xs md:text-sm text-emerald-100">
                AyurSutra keeps the entire Panchakarma journey in one flow, so
                no detail is missed between doctors, therapists, and patients.
              </p>
            </div>

            <div className="mt-6 grid gap-4 md:mt-0 md:grid-cols-3">
              <div className="rounded-2xl bg-emerald-800/70 p-4">
                <p className="text-xs font-semibold text-emerald-100">
                  Step 1 · Intake
                </p>
                <p className="mt-2 text-xs md:text-sm text-emerald-50">
                  Digital intake forms, prakriti / vikriti details, and baseline
                  vitals captured in one place for doctors.
                </p>
              </div>
              <div className="rounded-2xl bg-emerald-800/70 p-4">
                <p className="text-xs font-semibold text-emerald-100">
                  Step 2 · Plan & Schedule
                </p>
                <p className="mt-2 text-xs md:text-sm text-emerald-50">
                  Create multi‑day Panchakarma plans and auto‑schedule therapies
                  into room and therapist slots.
                </p>
              </div>
              <div className="rounded-2xl bg-emerald-800/70 p-4">
                <p className="text-xs font-semibold text-emerald-100">
                  Step 3 · Track & Refine
                </p>
                <p className="mt-2 text-xs md:text-sm text-emerald-50">
                  Monitor responses, capture notes, and adjust therapies or
                  precautions with every visit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <HealthBlogsFeature/>


      
<div className="w-full bg-[#1E4B3C] py-8">
  <Marquee
  direction="left" 
    gradient={false}
    speed={150}
    pauseOnHover={true}
    className="flex items-center text-white text-xs md:text-sm"
  >
    <span className="mx-8 whitespace-nowrap">
      Ayurveda ecommerce.
    </span>

    <span className="mx-2 opacity-60">|</span>

    <span className="mx-8 whitespace-nowrap">
      Central Ayurvedic store delivering trusted products across India.
    </span>

    <span className="mx-2 opacity-60">|</span>

    <span className="mx-8 whitespace-nowrap">
      Integrated with EMR.
    </span>
  </Marquee>
</div>

      <EcommerceFeatureSection/>

      
      {/* Simple testimonials-style strip */}
      {/* <section className="bg-emerald-50/70 py-8">
        <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-3 text-xs md:text-sm text-gray-700">
            <div className="rounded-2xl bg-white border border-emerald-100 p-4">
              “Our manual paper diary is now fully digital. Rescheduling and
              coordinating therapists has become much smoother.”
            </div>
            <div className="rounded-2xl bg-white border border-emerald-100 p-4">
              “Patients finally get all their instructions in one place instead
              of random WhatsApp messages.”
            </div>
            <div className="rounded-2xl bg-white border border-emerald-100 p-4">
              “The center head dashboard gives clarity on which therapies are
              most in demand in each season.”
            </div>
          </div>
        </div>
      </section> */}

<NFCFeatureCard/>
      

      {/* Call to action */}
      <section className="bg-white py-10 md:py-14">
        <div className="mx-auto max-w-4xl px-4 md:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#1E4B3C]">
            Ready to modernize your Panchakarma center?
          </h2>
          <p className="mt-2 text-xs md:text-sm text-gray-700 max-w-2xl mx-auto">
            Start with a Center Head application, verify your details, and
            receive secure login credentials once your center is approved.
          </p>
          <div className="mt-5 flex items-center justify-center gap-3">
            <a
              href="/signup"
              className="rounded-full bg-[#1E4B3C] px-6 py-2.5 text-xs md:text-sm font-semibold text-white shadow-md hover:bg-emerald-800 transition-colors"
            >
              Apply as Center Head
            </a>
            <a
              href="/contact"
              className="rounded-full border border-[#1E4B3C] px-6 py-2.5 text-xs md:text-sm font-semibold text-[#1E4B3C] hover:bg-emerald-50 transition-colors"
            >
              Talk to our team
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};
