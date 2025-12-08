// src/pages/center/CenterDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  MapPin,
  Phone,
  Clock,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Star,
  Shield,
  Compass,
  Building2,
} from "lucide-react";

import TherapyCard from "../../components/TherapyCard";
import DoctorCard from "../../components/DoctorCard";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import BookingGeneralAppointment from "../../components/BookingGeneralAppointment";
import BookingTherapyAppointment from "../../components/bookingtherapy/BookingTherapyAppointment";

const CenterDetails = () => {
  const { centerId } = useParams();
  console.log("Received centerId from URL:", centerId);

  const [center, setCenter] = useState(null);
  const [TherapyData, setTherapyData] = useState(null);
  const [doctorList, setDoctorList] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // UI states
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isTherapyModalOpen, setIsTherapyModalOpen] = useState(false);
  const [selectedTherapy, setSelectedTherapy] = useState(null);

  // Carousel + FAQ states
  const [currentIndex, setCurrentIndex] = useState(0);
  const [openFaq, setOpenFaq] = useState(-1);

  // Fetch center from backend
  useEffect(() => {
    if (!centerId) {
      setError("Center ID missing in URL");
      setLoading(false);
      return;
    }

    const fetchCenter = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await axios.post(
          "http://localhost:3000/PanchKarmaCenter/getCenterProfile",
          { centerId }
        );
        console.log("Backend response also with doctors:", res.data);

        const c = res?.data?.center;
        if (!c) {
          setError("Center not found");
          setCenter(null);
        } else {
          const transformedCenter = {
            id: c._id,
            // main display fields
            name: c.CenterName || c.Adminname || "Panchakarma Center",
            city: c.city || "",
            address: c.mainAddress || "Address not provided",
            profileImg: c.profileImg || "",
            centerImages: Array.isArray(c.centerImages) ? c.centerImages : [],
            locationUrl: c.locationUrl || "",
            bookingAiNumber: c.BotNumber || "",
            customerNumber: c.MobileNo || c.Mobile || "",
            rating: c.rating || 4.5,
            reviewCount: c.reviewCount || 0,

            // working hours from schema
            morningOpenTime: c.morningOpenTime || "09:00",
            morningCloseTime: c.morningCloseTime || "13:00",
            eveningOpenTime: c.eveningOpenTime || "16:00",
            eveningCloseTime: c.eveningCloseTime || "20:00",

            // single opening/closing used in old logic (optional)
            openingTime: c.openingTime || "09:00",
            closingTime: c.closingTime || "18:00",

            // slots for booking modal
            slots: c.slots || {
              morning: { startTime: "10:00 AM", endTime: "12:00 PM", tokenAmount: 100 },
              evening: { startTime: "05:00 PM", endTime: "07:00 PM", tokenAmount: 100 },
            },

            // Therapies and doctors (kept but we will fetch doctors separately)
            therapies: Array.isArray(c.therapies) ? c.therapies : [],
            Doctors: Array.isArray(c.Doctors) ? c.Doctors : [],

            bookingSettings: c.bookingSettings || {
              tokenRefundPolicy: "Standard refund policy applies",
            },

            // admin email used to fetch doctors via /get-doctors
            adminEmail: c.email || c.AdminEmail || c.centerAdminEmail || "",
          };
          setCenter(transformedCenter);
        }
      } catch (err) {
        console.error("Error fetching center:", err);
        setError("Error loading center data");
      } finally {
        setLoading(false);
      }
    };

    fetchCenter();
  }, [centerId]);

  // Fetch therapies separately
  useEffect(() => {
    const fetchTherapyData = async () => {
      if (!centerId) return;

      try {
        const resp = await axios.post(
          "http://localhost:3000/PanchKarmaCenter/get-therapies",
          { centerId }
        );
        console.log("Therapy data from backend:", resp.data);

        const therapies =
          resp.data?.getAllTherapy ||
          resp.data?.therapies ||
          resp.data?.data?.getAllTherapy ||
          [];

        setTherapyData(Array.isArray(therapies) ? therapies : []);
      } catch (err) {
        console.error("Error fetching therapies:", err);
        setTherapyData([]);
      }
    };

    fetchTherapyData();
  }, [centerId]);

  // Fetch doctors separately using the backend route /get-doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      if (!center || !center.adminEmail) {
        setDoctorList([]);
        return;
      }

      try {
        const resp = await axios.post(
          "http://localhost:3000/PanchKarmaCenter/get-doctors",
          { email: center.adminEmail }
        );

        console.log("Fetched Doctors:", resp.data.getAllDr);
        setDoctorList(Array.isArray(resp.data.getAllDr) ? resp.data.getAllDr : []);
      } catch (err) {
        console.error("Error fetching doctors:", err);
        setDoctorList([]);
      }
    };

    fetchDoctors();
  }, [center]);

  // Determine open / closed safely (still used for badge)
  const toMinutesSafe = (time) => {
    if (!time || typeof time !== "string") return null;
    const parts = time.split(":").map(Number);
    if (parts.length < 2 || Number.isNaN(parts[0]) || Number.isNaN(parts[1])) return null;
    return parts[0] * 60 + parts[1];
  };

  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const openingTime = center?.openingTime || "09:00";
  const closingTime = center?.closingTime || "18:00";
  const openMinutes = toMinutesSafe(openingTime);
  const closeMinutes = toMinutesSafe(closingTime);

  const isOpen =
    openMinutes === null || closeMinutes === null
      ? false
      : openMinutes <= closeMinutes
      ? currentMinutes >= openMinutes && currentMinutes <= closeMinutes
      : currentMinutes >= openMinutes || currentMinutes <= closeMinutes;

  // Hero carousel images: use centerImages, fallback to profileImg
  const bannerImages =
    center?.centerImages?.length
      ? center.centerImages
      : center?.profileImg
      ? [center.profileImg]
      : [];

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? (bannerImages.length ? bannerImages.length - 1 : 0) : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === (bannerImages.length ? bannerImages.length - 1 : 0) ? 0 : prev + 1
    );
  };

  const defaultDoctors = [
    {
      _id: "placeholder-doc-1",
      name: "Dr. Available Soon",
      degree: "BAMS",
      speciality: "Ayurvedic Physician",
      experience: "N/A",
      focus: "General Ayurveda",
      fee: "N/A",
      avatar: "https://cdn-icons-png.flaticon.com/512/147/147144.png",
    },
  ];

  // Loading / error states handling early return
  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen flex items-center justify-center bg-[#F5F7F6]">
          <div className="text-center">
            <div className="animate-pulse mb-4 h-8 w-64 bg-gray-200 rounded-lg mx-auto"></div>
            <p className="text-gray-600">Loading center details…</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (error || !center) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen flex items-center justify-center bg-[#F5F7F6]">
          <div className="max-w-3xl mx-auto px-4 py-10">
            <p className="text-sm text-red-600">{error || "Center not found"}</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      {/* ANIMATIONS */}
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        .blink-animation {
          animation: blink 2s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>

      <main className="min-h-screen bg-[#F5F7F6]">
        {/* HERO SECTION */}
        <section className="bg-gradient-to-br from-slate-50 to-gray-100">
          <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
            <div className="grid md:grid-cols-5 gap-6 lg:gap-8 items-start">
              {/* LEFT PANEL */}
              <div className="md:col-span-2 space-y-5">
                {/* Status + Certified Badge */}
                <div className="flex flex-wrap items-center gap-3">
                  {/* Status Badge */}
                  <span
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${
                      isOpen ? "bg-green-500 text-white" : "bg-red-500 text-white"
                    }`}
                  >
                    <span className="w-2 h-2 bg-white rounded-full blink-animation" />
                    {isOpen ? "Open Now" : "Closed"}
                  </span>

                  {/* Certified Center */}
                  <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white border-2 border-emerald-600 shadow-sm hover:shadow-md">
                    <div className="relative">
                      <div className="absolute inset-0 bg-emerald-100 rounded-full animate-pulse" />
                      <Shield className="w-5 h-5 text-emerald-600 relative z-10" />
                    </div>
                    <div className="text-left">
                      <p className="text-[10px] text-emerald-800 font-semibold uppercase tracking-wider">
                        Government
                      </p>
                      <p className="text-xs font-bold text-emerald-900">
                        Certified Center
                      </p>
                    </div>
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full blink-animation" />
                  </div>
                </div>

                {/* Name + Rating */}
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                    {center.name}
                  </h1>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 bg-white border px-3 py-1.5 rounded-lg shadow-sm">
                      <Star className="w-5 h-5 fill-amber-400" />
                      <span className="text-lg font-bold">{center.rating}</span>
                    </div>

                    {center.reviewCount > 0 && (
                      <span className="text-gray-600 text-sm">
                        {center.reviewCount} reviews
                      </span>
                    )}
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-3 text-gray-700">
                  <MapPin className="w-5 h-5 mt-1 text-gray-500" />
                  <div>
                    <p className="font-semibold">{center.city}</p>
                    <p className="text-sm">{center.address}</p>
                  </div>
                </div>

                {/* Timings */}
                <div className="flex items-start gap-3 text-gray-700">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="font-semibold">Timings</p>
                    <p className="text-sm">
                      Morning: {center.morningOpenTime} – {center.morningCloseTime} ·{" "}
                      Evening: {center.eveningOpenTime} – {center.eveningCloseTime}
                    </p>
                  </div>
                </div>

                {/* Contacts */}
                <div className="grid sm:grid-cols-2 gap-3 pt-2">
                  {center.customerNumber && (
                    <a
                      href={`tel:${center.customerNumber}`}
                      className="flex items-center gap-2 bg-white hover:bg-gray-50 shadow-sm border px-4 py-3 rounded-lg"
                    >
                      <Phone className="w-4 h-4" />
                      <div>
                        <p className="text-xs text-gray-500">Call Center</p>
                        <p className="text-sm font-semibold">{center.customerNumber}</p>
                      </div>
                    </a>
                  )}

                  {center.bookingAiNumber && (
                    <a
                      href={`tel:${center.bookingAiNumber}`}
                      className="flex items-center gap-2 bg-white hover:bg-gray-50 shadow-sm border px-4 py-3 rounded-lg"
                    >
                      <Phone className="w-4 h-4" />
                      <div>
                        <p className="text-xs text-gray-500">AI Booking</p>
                        <p className="text-sm font-semibold">{center.bookingAiNumber}</p>
                      </div>
                    </a>
                  )}
                </div>

                {/* Booking Button */}
                <div className="pt-2">
                  <button
                    onClick={() => setIsBookingModalOpen(true)}
                    className="w-full bg-[#1E4B3C] hover:bg-[#163A2E] text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-3 shadow-lg"
                  >
                    <Calendar className="w-5 h-5" />
                    <span className="text-lg">Book General Appointment</span>
                  </button>
                </div>
              </div>

              {/* RIGHT: IMAGE CAROUSEL */}
              <div className="md:col-span-3">
                <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-black">
                  {/* Slides */}
                  <div
                    className="flex transition-transform duration-500 ease-out"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                  >
                    {(center.centerImages?.length ? center.centerImages : [center.profileImg]).map(
                      (imgSrc, idx) => (
                        <div key={idx} className="w-full flex-shrink-0">
                          <img
                            src={imgSrc}
                            alt={`${center.name} view ${idx + 1}`}
                            className="w-full h-80 md:h-[450px] lg:h-[500px] object-cover"
                          />
                        </div>
                      )
                    )}
                  </div>

                  {/* Controls */}
                  {center.centerImages?.length > 1 && (
                    <>
                      <button
                        onClick={handlePrev}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg"
                      >
                        <ChevronLeft className="w-3 h-3" />
                      </button>

                      <button
                        onClick={handleNext}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg"
                      >
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* THERAPIES */}
        <section className="bg-white py-10 md:py-12">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Available Therapies
            </h2>
            <p className="text-sm text-gray-600 mb-6">Explore our range of Ayurvedic therapies</p>

            {!TherapyData?.length ? (
              <div className="text-center py-12 bg-gray-50 border rounded-xl">
                <p className="text-sm text-gray-600">No therapies listed yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {TherapyData.map((t) => (
                  <TherapyCard
                    key={t._id || t.id || Math.random()}
                    {...t}
                    onBook={() => {
                      setSelectedTherapy(t);
                      setIsTherapyModalOpen(true);
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* DOCTORS */}
        <section className="bg-gray-50 py-10 md:py-12">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Our Expert Doctors</h2>
            <p className="text-sm text-gray-600 mb-6">Meet our Ayurvedic physicians</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {(doctorList.length ? doctorList : defaultDoctors).map((d) => (
                <DoctorCard
                bio={d.bio}
                  key={d._id || Math.random()}
                  name={d.name || d.DoctorName}
                  degree={d.degree || "BAMS"}
                  speciality={d.speciality || d.specialization || "Ayurveda"}
                  experience={d.experience || d.experienceYears}
                  focus={d.focus || d.speciality}
                  fee={d.fee}
                  avatar={d.profileImg || d.avatar || "https://cdn-icons-png.flaticon.com/512/147/147144.png"}
                />
              ))}
            </div>
          </div>
        </section>

        {/* MAP SECTION */}
        <section className="bg-gray-50 py-10 md:py-16">
          <div className="max-w-7xl mx-auto px-4">
            {/* Header */}
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">Visit Our Center</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Find us easily with detailed directions</p>
            </div>

            {/* Container */}
            <div className="bg-white rounded-3xl shadow-xl border overflow-hidden">
              <div className="grid lg:grid-cols-3">
                {/* LEFT SIDE: DETAILS */}
                <div className="p-6 md:p-8 bg-gray-50 border-r space-y-6">
                  {/* Address */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Building2 className="w-5 h-5 text-blue-600" />
                      </div>
                      <h3 className="font-bold text-lg">Address</h3>
                    </div>
                    <p className="text-gray-700 pl-11">
                      {center.address} <br /> {center.city}
                    </p>
                  </div>

                  {/* Hours */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Clock className="w-5 h-5 text-green-600" />
                      </div>
                      <h3 className="font-bold text-lg">Hours</h3>
                    </div>
                    <div className="pl-11">
                      <p className="text-gray-700 font-medium">
                        Morning: {center.morningOpenTime} – {center.morningCloseTime} <br />
                        Evening: {center.eveningOpenTime} – {center.eveningCloseTime}
                      </p>
                      <span
                        className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full mt-2 ${
                          isOpen ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isOpen ? "bg-green-500" : "bg-red-500"
                          } blink-animation`}
                        />
                        {isOpen ? "Open Now" : "Closed"}
                      </span>
                    </div>
                  </div>

                  {/* Contact */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Phone className="w-5 h-5 text-purple-600" />
                      </div>
                      <h3 className="font-bold text-lg">Contact</h3>
                    </div>

                    <div className="pl-11 space-y-2">
                      {center.customerNumber && (
                        <a href={`tel:${center.customerNumber}`}>
                          <p className="text-sm">
                            <span className="font-medium">Customer:</span> {center.customerNumber}
                          </p>
                        </a>
                      )}
                      {center.bookingAiNumber && (
                        <a href={`tel:${center.bookingAiNumber}`}>
                          <p className="text-sm">
                            <span className="font-medium">AI Booking:</span> {center.bookingAiNumber}
                          </p>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between bg-amber-50 rounded-xl p-4 border border-amber-200">
                      <div className="flex items-center gap-2">
                        <Star className="w-6 h-6 fill-amber-400" />
                        <div>
                          <p className="text-2xl font-bold">{center.rating}</p>
                          <p className="text-xs">{center.reviewCount} reviews</p>
                        </div>
                      </div>
                      <Shield className="w-8 h-8 text-amber-500" />
                    </div>
                  </div>

                  {/* Directions Button */}
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      `${center.address}, ${center.city}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-[#1E4B3C] hover:bg-[#163A2E] text-white font-semibold py-3.5 rounded-xl shadow-md"
                  >
                    <Compass className="w-5 h-5" />
                    Get Directions
                  </a>
                </div>

                {/* RIGHT SIDE: MAP */}
                <div className="lg:col-span-2 relative h-full w-full">
                  
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110214.99246992456!2d77.8825336433594!3d30.31630180000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3909298c3f6cb66b%3A0xd23354ebae6751!2sPanchtatva%20Ayurvedic%20Clinic%20%26%20Panchakarma%20Centre!5e0!3m2!1sen!2sin!4v1765197635566!5m2!1sen!2sin"
                      className="w-full h-full border-0 rounded-xl"
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ SECTION - reserved for future */}
      </main>

      {/* BOOKING MODAL */}
      <BookingGeneralAppointment
        centerId={centerId}
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        centerData={center}
      />

      <Footer />

      {/* THERAPY BOOKING MODAL */}
      {isTherapyModalOpen && selectedTherapy && center && (
        <BookingTherapyAppointment
          isOpen={isTherapyModalOpen}
          onClose={() => {
            setIsTherapyModalOpen(false);
            setSelectedTherapy(null);
          }}
          centerData={{
            id: center.id || centerId,
            name: center.name || "Wellness Center",
            address: center.address || "",
            phone: center.customerNumber || "",
            slots:
              center.slots || {
                morning: ["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM"],
                evening: ["04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM"],
              },
          }}
          therapyData={{
            id: selectedTherapy._id || selectedTherapy.id,
            name: selectedTherapy.therapyName || selectedTherapy.name,
            category: selectedTherapy.category,
            description: selectedTherapy.description,
            price: selectedTherapy.price,
            image: selectedTherapy.TherapyImg || selectedTherapy.image,
            duration: selectedTherapy.duration,
            maxPatientsPerDay: selectedTherapy.maxPatientsPerDay,
          }}
        />
      )}
    </>
  );
};

export default CenterDetails;
