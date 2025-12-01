import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  MapPin,
  Home,
  Phone,
  Clock,
  Leaf,
  Bot,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import centers from "../../data/centers";
import TherapyCard from "../../components/TherapyCard";
import DoctorCard from "../../components/DoctorCard";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const CenterDetails = () => {
  const { centerSlug } = useParams();
  const center = centers.find((c) => c.slug === centerSlug);

  if (!center) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-10">
        <p className="text-sm text-red-600">
          Center not found. Please go back and select a valid center.
        </p>
      </main>
    );
  }

  const {
    name,
    city,
    address,
    image,
    images = [],
    locationUrl,
    bookingAiNumber,
    customerNumber,
    openingTime,
    closingTime,
    therapies = [],
    doctors = [],
  } = center;

  const bannerImages = images.length ? images : [image];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? bannerImages.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === bannerImages.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <>
    <Navbar/>
    <main className="min-h-screen bg-[#F5F7F6]">
      {/* FULL-WIDTH BANNER CAROUSEL */}
      <section className="w-full bg-black">
        <div className="relative w-full max-h-[360px] md:max-h-[420px] overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {bannerImages.map((imgSrc, idx) => (
              <div key={idx} className="w-full flex-shrink-0">
                <img
                  src={imgSrc}
                  alt={`${name} view ${idx + 1}`}
                  className="w-full h-60 md:h-80 lg:h-[420px] object-cover"
                />
              </div>
            ))}
          </div>

          {bannerImages.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-full bg-black/40 text-white p-2 hover:bg-black/60 transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-full bg-black/40 text-white p-2 hover:bg-black/60 transition-colors"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              <div className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-2">
                {bannerImages.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-1.5 w-4 rounded-full transition-all ${
                      idx === currentIndex
                        ? "bg-white"
                        : "bg-white/40 hover:bg-white/70"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CENTER INFO SECTION */}
      <section className="bg-white border-b border-[#1E4B3C]/10">
        <div className="max-w-6xl mx-auto px-4 py-6 md:py-8 space-y-4">
          <div className="space-y-1">
            <h1 className="text-2xl md:text-3xl font-bold text-[#1E4B3C]">
              {name}
            </h1>
            <p className="flex items-center gap-1.5 text-xs md:text-sm text-[#1E4B3C]/85">
              <MapPin className="h-4 w-4" />
              <span>{city}</span>
            </p>
          </div>

          {/* Address + timings */}
          <div className="grid gap-3 text-xs md:text-sm text-[#1E4B3C]/85 md:grid-cols-2">
            <div className="flex items-start gap-2">
              <Home className="h-4 w-4 mt-[2px]" />
              <div>
                <p className="font-semibold text-[#1E4B3C]">Address</p>
                <p className="leading-snug">{address}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Clock className="h-4 w-4 mt-[2px]" />
              <div>
                <p className="font-semibold text-[#1E4B3C]">Timings</p>
                <p>
                  {openingTime} – {closingTime}
                </p>
              </div>
            </div>
          </div>

          {/* Phone numbers */}
          <div className="grid gap-3 text-xs md:text-sm text-[#1E4B3C]/90 md:grid-cols-2">
            <div className="flex items-start gap-2">
              <Phone className="h-4 w-4 mt-[2px]" />
              <div>
                <p className="font-semibold text-[#1E4B3C]">
                  Customer number
                </p>
                <p className="font-mono tracking-wide">
                  {customerNumber || "Not available"}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Bot className="h-4 w-4 mt-[2px]" />
              <div>
                <p className="font-semibold text-[#1E4B3C]">
                  AI agent number
                </p>
                <p className="font-mono tracking-wide">
                  {bookingAiNumber || "Not available"}
                </p>
              </div>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-[#1E4B3C]/20 bg-[#F5F7F6] px-3 py-1 text-xs md:text-sm text-[#1E4B3C]">
            <Leaf className="h-4 w-4" />
            <span>Panchakarma & Ayurveda wellness center</span>
          </div>
        </div>
      </section>

      {/* THERAPIES + DOCTORS */}
      <section className="max-w-6xl mx-auto px-4 py-6 md:py-8 space-y-8">
        {/* Therapies */}
        <div className="space-y-3">
          <h2 className="text-lg md:text-xl font-semibold text-[#1E4B3C]">
            Therapies at this center
          </h2>
          {therapies.length === 0 ? (
            <p className="text-xs md:text-sm text-[#1E4B3C]/70">
              No therapies listed yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {therapies.map((t) => (
                <div key={t.id} className="w-full">
                  <TherapyCard
                    name={t.name}
                    focus={t.focus}
                    duration={t.duration}
                    summary={t.summary}
                    price={t.price}
                    therapyImage={t.therapyImage}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Doctors */}
        <div className="space-y-3">
          <h2 className="text-lg md:text-xl font-semibold text-[#1E4B3C]">
            Doctors at this center
          </h2>
          {doctors.length === 0 ? (
            <p className="text-xs md:text-sm text-[#1E4B3C]/70">
              No doctors listed yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {doctors.map((d) => (
                <div key={d.id} className="w-full">
                  <DoctorCard
                    name={d.name}
                    degree={d.degree}
                    speciality={d.speciality}
                    experience={d.experience}
                    focus={d.focus}
                    fee={d.fee}
                    avatar={d.avatar}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* RICH FAQ + MAP */}
      <section className="max-w-6xl mx-auto px-4 pb-10 space-y-8">
        {/* FAQ */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2">
            <div>
              <h2 className="text-lg md:text-xl font-semibold text-[#1E4B3C]">
                Frequently asked questions
              </h2>
              <p className="text-xs md:text-sm text-[#1E4B3C]/70">
                Quick answers about bookings, visits and therapies.
              </p>
            </div>
            <span className="inline-flex items-center rounded-full bg-[#1E4B3C]/5 px-3 py-1 text-[11px] md:text-xs text-[#1E4B3C]">
              Updated for all partner centers
            </span>
          </div>

          <div className="space-y-3">
            {/* FAQ 1 */}
            <div className="border border-[#1E4B3C]/15 rounded-2xl bg-white shadow-sm overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === 0 ? -1 : 0)}
                className="w-full flex items-center justify-between gap-3 px-4 py-3 md:px-5 md:py-4 text-left hover:bg-[#F5F7F6] transition-colors"
              >
                <div>
                  <p className="text-sm md:text-base font-medium text-[#1E4B3C]">
                    Do I need a prior appointment?
                  </p>
                  <p className="text-xs md:text-sm text-[#1E4B3C]/70">
                    Know if walk-ins are allowed and when to pre-book.
                  </p>
                </div>
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-full border border-[#1E4B3C]/30 bg-[#F5F7F6] text-[#1E4B3C] transition-transform duration-300 ${
                    openFaq === 0 ? "rotate-180" : ""
                  }`}
                >
                  <ChevronDown className="h-4 w-4" />
                </div>
              </button>
              <div
                className={`px-4 md:px-5 grid transition-all duration-300 ease-out ${
                  openFaq === 0
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="pb-4 text-xs md:text-sm text-[#1E4B3C]/80">
                    Prior appointment is recommended to reduce waiting time,
                    especially for Panchakarma therapies and doctor
                    consultations. Same-day slots may be limited based on doctor
                    and therapist availability.
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ 2 */}
            <div className="border border-[#1E4B3C]/15 rounded-2xl bg-white shadow-sm overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === 1 ? -1 : 1)}
                className="w-full flex items-center justify-between gap-3 px-4 py-3 md:px-5 md:py-4 text-left hover:bg-[#F5F7F6] transition-colors"
              >
                <div>
                  <p className="text-sm md:text-base font-medium text-[#1E4B3C]">
                    What should I bring for my first visit?
                  </p>
                  <p className="text-xs md:text-sm text-[#1E4B3C]/70">
                    Documents and basics that help your doctor.
                  </p>
                </div>
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-full border border-[#1E4B3C]/30 bg-[#F5F7F6] text-[#1E4B3C] transition-transform duration-300 ${
                    openFaq === 1 ? "rotate-180" : ""
                  }`}
                >
                  <ChevronDown className="h-4 w-4" />
                </div>
              </button>
              <div
                className={`px-4 md:px-5 grid transition-all duration-300 ease-out ${
                  openFaq === 1
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="pb-4 text-xs md:text-sm text-[#1E4B3C]/80">
                    Please carry recent medical reports, ongoing prescriptions
                    and an ID proof. Wearing loose, comfortable clothing makes
                    physical examination and assessment easier.
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ 3 */}
            <div className="border border-[#1E4B3C]/15 rounded-2xl bg-white shadow-sm overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === 2 ? -1 : 2)}
                className="w-full flex items-center justify-between gap-3 px-4 py-3 md:px-5 md:py-4 text-left hover:bg-[#F5F7F6] transition-colors"
              >
                <div>
                  <p className="text-sm md:text-base font-medium text-[#1E4B3C]">
                    Are therapies covered by insurance?
                  </p>
                  <p className="text-xs md:text-sm text-[#1E4B3C]/70">
                    Understand how reimbursements typically work.
                  </p>
                </div>
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-full border border-[#1E4B3C]/30 bg-[#F5F7F6] text-[#1E4B3C] transition-transform duration-300 ${
                    openFaq === 2 ? "rotate-180" : ""
                  }`}
                >
                  <ChevronDown className="h-4 w-4" />
                </div>
              </button>
              <div
                className={`px-4 md:px-5 grid transition-all duration-300 ease-out ${
                  openFaq === 2
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="pb-4 text-xs md:text-sm text-[#1E4B3C]/80">
                    Coverage depends on your policy and insurer. Some plans
                    support alternative therapies under wellness or OPD
                    benefits. The center team can help with bills and basic
                    documentation.
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ 4 */}
            <div className="border border-[#1E4B3C]/15 rounded-2xl bg-white shadow-sm overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === 3 ? -1 : 3)}
                className="w-full flex items-center justify-between gap-3 px-4 py-3 md:px-5 md:py-4 text-left hover:bg-[#F5F7F6] transition-colors"
              >
                <div>
                  <p className="text-sm md:text-base font-medium text-[#1E4B3C]">
                    Do you offer online follow-up consultations?
                  </p>
                  <p className="text-xs md:text-sm text-[#1E4B3C]/70">
                    For reviews after the first in-person visit.
                  </p>
                </div>
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-full border border-[#1E4B3C]/30 bg-[#F5F7F6] text-[#1E4B3C] transition-transform duration-300 ${
                    openFaq === 3 ? "rotate-180" : ""
                  }`}
                >
                  <ChevronDown className="h-4 w-4" />
                </div>
              </button>
              <div
                className={`px-4 md:px-5 grid transition-all duration-300 ease-out ${
                  openFaq === 3
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="pb-4 text-xs md:text-sm text-[#1E4B3C]/80">
                    Many doctors support video or phone follow-ups once the
                    initial assessment is done. Exact options and slots depend
                    on each center&apos;s schedule.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MAP */}
        <div className="space-y-3">
          <h2 className="text-lg md:text-xl font-semibold text-[#1E4B3C]">
            Location on map
          </h2>
          <p className="text-xs md:text-sm text-[#1E4B3C]/70">
            Showing directions for:{" "}
            <span className="font-semibold">{address}</span>
          </p>
          <div className="w-full h-64 md:h-80 rounded-2xl overflow-hidden border border-[#1E4B3C]/15 shadow-md">
            {locationUrl ? (
              <iframe
                src={locationUrl}
                title={`${name} location`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full border-0"
                allowFullScreen
              />
            ) : (
              <div className="flex h-full items-center justify-center text-xs md:text-sm text-[#1E4B3C]/70">
                Map will appear here once the center&apos;s embed URL is added.
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
    <Footer/>
    </>
  );
};

export default CenterDetails;
