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
  ChevronDown,
  Calendar,
  Star,
  Shield,
  ExternalLink,
  Compass,
  Building2,
} from "lucide-react";

import TherapyCard from "../../components/TherapyCard";
import DoctorCard from "../../components/DoctorCard";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import BookingGeneralAppointment from "../../components/BookingGeneralAppointment";
import BookingTherapyAppointment from "../../components/bookingtherapy/BookingTherapyAppointment";
// Uncomment if you have therapy booking component
// import BookingTherapyAppointment from "../../components/bookingtherapy/BookingTherapyAppointment";

const CenterDetails = () => {
  const { centerId } = useParams();
  console.log("Received centerId from URL:", centerId);
  

  const [center, setCenter] = useState(null);
  const [TherapyData,setTherapyData]=useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // UI states
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isTherapyModalOpen, setIsTherapyModalOpen] = useState(false);
  const [selectedTherapy, setSelectedTherapy] = useState(null);

  // Carousel + FAQ states
  const [currentIndex, setCurrentIndex] = useState(0);
  const [openFaq, setOpenFaq] = useState(-1);

  // Safe default slots to prevent undefined errors
  const getSafeSlots = () => {
    if (!center || !center.slots) {
      return {
        morning: { startTime: "10:00 AM", endTime: "12:00 PM", tokenAmount: 100 },
        evening: { startTime: "05:00 PM", endTime: "07:00 PM", tokenAmount: 100 },
      };
    }
    return center.slots;
  };

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
        console.log("Backend response:", res.data);

        // Expect res.data.center per your backend
        const c = res?.data?.center;
        if (!c) {
          setError("Center not found");
          setCenter(null);
        } else {
          // Transform backend data to match expected structure
          const transformedCenter = {
            // Basic info
            name: c.CenterName || c.Adminname || "Panchakarma Center",
            city: c.location || "",
            address: c.address || "Address not provided",
            profileImg: c.profileImg || "",
            images: c.images || [],
            locationUrl: c.locationUrl || "",
            bookingAiNumber: c.BotNumber || c.bookingAiNumber || "",
            customerNumber: c.MobileNo || c.customerNumber || "",
            openingTime: c.openingTime || "09:00",
            closingTime: c.closingTime || "18:00",
            rating: c.rating || 4.5,
            reviewCount: c.reviewCount || 0,
            
            // Backend fields that might need transformation
            CenterName: c.CenterName,
            Adminname: c.Adminname,
            location: c.location,
            address: c.address,
            profileImg: c.profileImg,
            images: c.images,
            locationUrl: c.locationUrl,
            BotNumber: c.BotNumber,
            MobileNo: c.MobileNo,
            openingTime: c.openingTime,
            closingTime: c.closingTime,
            rating: c.rating,
            reviewCount: c.reviewCount,
            
            // Slots structure for booking modal
            slots: c.slots || {
              morning: { startTime: "10:00 AM", endTime: "12:00 PM", tokenAmount: 100 },
              evening: { startTime: "05:00 PM", endTime: "07:00 PM", tokenAmount: 100 },
            },
            
            // Therapies (ensure it's an array)
            therapies: Array.isArray(c.therapies) ? c.therapies : [],
            
            // Doctors (ensure it's an array)
            Doctors: Array.isArray(c.Doctors) ? c.Doctors : [],
            
            // Additional fields that might exist
            bookingSettings: c.bookingSettings || {
              tokenRefundPolicy: "Standard refund policy applies"
            }
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
      
      // Ensure we always set an array, never null
      const therapies = resp.data?.getAllTherapy || 
                       resp.data?.therapies || 
                       resp.data?.data?.getAllTherapy || // Try nested structure
                       [];
      
      // Always set as array, even if empty
      setTherapyData(Array.isArray(therapies) ? therapies : []);
    } catch (err) {
      console.error("Error fetching therapies:", err);
      setTherapyData([]); // Always set to empty array on error
    }
  };

  fetchTherapyData();
}, [centerId]);

  // Determine open / closed safely
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

  // Carousel controls
  const bannerImages = center?.images?.length ? center.images : center?.profileImg ? [center.profileImg] : [];
  
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

  // Default doctors if none available
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

      {/* Blinking Animation Styles */}
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
        {/* HERO SECTION WITH CENTER INFO & CAROUSEL */}
        <section className="bg-gradient-to-br from-slate-50 to-gray-100">
          <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
            <div className="grid md:grid-cols-5 gap-6 lg:gap-8 items-start">
              {/* LEFT: Center Info */}
              <div className="md:col-span-2 space-y-5">
                {/* Status & Certification Badges */}
                <div className="flex flex-wrap items-center gap-3">
                  {/* Animated Status Badge */}
                  <span
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${
                      isOpen ? "bg-green-500 text-white" : "bg-red-500 text-white"
                    }`}
                  >
                    <span className={`inline-block w-2 h-2 rounded-full bg-white blink-animation`}></span>
                    {isOpen ? "Open Now" : "Closed"}
                  </span>

                  {/* Government Certified Badge */}
                  <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white border-2 border-emerald-600 shadow-sm hover:shadow-md transition-shadow">
                    <div className="relative">
                      <div className="absolute inset-0 bg-emerald-100 rounded-full animate-pulse"></div>
                      <Shield className="w-5 h-5 text-emerald-600 relative z-10" strokeWidth={2.5} />
                    </div>
                    <div className="text-left">
                      <p className="text-[10px] leading-none text-emerald-800 font-semibold uppercase tracking-wider">Government</p>
                      <p className="text-xs leading-tight text-emerald-900 font-bold">Certified Center</p>
                    </div>
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full blink-animation"></div>
                  </div>
                </div>

                {/* Center Name & Rating */}
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-3 text-gray-900">
                    {center.name}
                  </h1>

                  {/* Rating */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 bg-white shadow-sm px-3 py-1.5 rounded-lg border border-gray-200">
                      <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                      <span className="text-lg font-bold text-gray-900">{center.rating}</span>
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
                  <MapPin className="w-5 h-5 flex-shrink-0 mt-1 text-gray-500" />
                  <div>
                    <p className="font-semibold text-base text-gray-900">{center.city}</p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {center.address}
                    </p>
                  </div>
                </div>

                {/* Timings */}
                <div className="flex items-center gap-3 text-gray-700">
                  <Clock className="w-5 h-5 flex-shrink-0 text-gray-500" />
                  <div>
                    <p className="font-semibold text-base text-gray-900">Timings</p>
                    <p className="text-sm text-gray-600">
                      {openingTime} - {closingTime}
                    </p>
                  </div>
                </div>

                {/* Contact Numbers */}
                <div className="grid sm:grid-cols-2 gap-3 pt-2">
                  {center.customerNumber && (
                    <a
                      href={`tel:${center.customerNumber}`}
                      className="flex items-center gap-2 bg-white hover:bg-gray-50 shadow-sm border border-gray-200 px-4 py-3 rounded-lg transition-all group"
                    >
                      <Phone className="w-4 h-4 group-hover:scale-110 transition-transform text-gray-600" />
                      <div className="text-left">
                        <p className="text-xs text-gray-500">Call Center</p>
                        <p className="text-sm font-semibold text-gray-900">{center.customerNumber}</p>
                      </div>
                    </a>
                  )}
                  {center.bookingAiNumber && (
                    <a
                      href={`tel:${center.bookingAiNumber}`}
                      className="flex items-center gap-2 bg-white hover:bg-gray-50 shadow-sm border border-gray-200 px-4 py-3 rounded-lg transition-all group"
                    >
                      <Phone className="w-4 h-4 group-hover:scale-110 transition-transform text-gray-600" />
                      <div className="text-left">
                        <p className="text-xs text-gray-500">AI Booking</p>
                        <p className="text-sm font-semibold text-gray-900">{center.bookingAiNumber}</p>
                      </div>
                    </a>
                  )}
                </div>

                {/* Primary Booking Button - Opens Modal */}
                <div className="pt-2">
                  <button
                    onClick={() => setIsBookingModalOpen(true)}
                    className="w-full bg-[#1E4B3C] hover:bg-[#163A2E] text-white font-semibold px-8 py-4 rounded-xl flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all group"
                  >
                    <Calendar className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span className="text-lg">Book General Appointment</span>
                  </button>
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    Quick booking for consultations and therapies
                  </p>
                </div>
              </div>

              {/* RIGHT: Larger Image Carousel */}
              <div className="md:col-span-3">
                <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-black">
                  <div
                    className="flex transition-transform duration-500 ease-out"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                  >
                    {bannerImages.length ? (
                      bannerImages.map((imgSrc, idx) => (
                        <div key={idx} className="w-full flex-shrink-0">
                          <img
                            src={imgSrc}
                            alt={`${center.name} view ${idx + 1}`}
                            className="w-full h-80 md:h-[450px] lg:h-[500px] object-cover"
                          />
                        </div>
                      ))
                    ) : (
                      <div className="w-full flex items-center justify-center h-80 md:h-[450px] lg:h-[500px] bg-gray-100">
                        <img
                          src={center.profileImg || "https://via.placeholder.com/900x500?text=Center+Image"}
                          alt="center"
                          className="object-cover w-full h-full"
                        />
                      </div>
                    )}
                  </div>

                  {/* Carousel Controls */}
                  {bannerImages.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={handlePrev}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 p-3 rounded-full shadow-lg transition-all hover:scale-110"
                      >
                        <ChevronLeft className="h-3 w-3" />
                      </button>
                      <button
                        type="button"
                        onClick={handleNext}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 p-3 rounded-full shadow-lg transition-all hover:scale-110"
                      >
                        <ChevronRight className="h-3 w-3" />
                      </button>

                      {/* Image Indicators */}
                      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
                        {bannerImages.map((_, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setCurrentIndex(idx)}
                            className={`h-2 rounded-full transition-all ${
                              idx === currentIndex
                                ? "w-10 bg-white"
                                : "w-2 bg-white/50 hover:bg-white/80"
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* THERAPIES SECTION */}
   <section className="bg-white py-10 md:py-12">
  <div className="max-w-7xl mx-auto px-4">
    <div className="mb-6">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
        Available Therapies
      </h2>
      <p className="text-sm text-gray-600">
        Explore our range of traditional Panchakarma and wellness treatments
      </p>
    </div>

    {!TherapyData || TherapyData.length === 0 ? (
      <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-200">
        <p className="text-sm text-gray-600">
          No therapies listed yet. Please contact the center for available treatments.
        </p>
      </div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {TherapyData.map((t) => (
          <TherapyCard
            key={t.id || t._id || Math.random()} // Add fallback key
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

        {/* DOCTORS SECTION */}
        <section className="bg-gray-50 py-10 md:py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Our Expert Doctors
              </h2>
              <p className="text-sm text-gray-600">
                Meet our experienced Ayurvedic physicians and specialists
              </p>
            </div>

            {center.Doctors.length === 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {defaultDoctors.map((d) => (
                  <DoctorCard
                    key={d._id}
                    name={d.name}
                    degree={d.degree}
                    speciality={d.speciality}
                    experience={d.experience}
                    focus={d.focus}
                    fee={d.fee}
                    avatar={d.avatar}
                  />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {center.Doctors.map((d) => (
                  <DoctorCard
                    key={d._id || d.id}
                    name={d.name || d.DoctorName || "Dr. Not Listed"}
                    degree={d.degree || d.degree || "BAMS"}
                    speciality={d.speciality || d.specialization || "Ayurveda"}
                    experience={d.experience || d.experienceYears || d.years || "N/A"}
                    focus={d.focus || d.focusArea || "-"}
                    fee={d.fee || d.consultationFee || "N/A"}
                    avatar={d.avatar || d.profileImg || d.image || "https://cdn-icons-png.flaticon.com/512/147/147144.png"}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* REDESIGNED MAP SECTION */}
        <section className="bg-gray-50 py-10 md:py-16">
          <div className="max-w-7xl mx-auto px-4">
            {/* Section Header */}
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                Visit Our Center
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Find us easily with detailed location information and directions
              </p>
            </div>

            {/* Main Map Container */}
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200">
              <div className="grid lg:grid-cols-3">
                {/* Left Side - Location Details */}
                <div className="lg:col-span-1 p-6 md:p-8 bg-gradient-to-br from-gray-50 to-white border-r border-gray-200">
                  <div className="space-y-6">
                    {/* Address Section */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Building2 className="w-5 h-5 text-blue-600" />
                        </div>
                        <h3 className="font-bold text-lg text-gray-900">Address</h3>
                      </div>
                      <p className="text-gray-700 leading-relaxed pl-11">
                        {center.address}
                        <br />
                        {center.city}
                      </p>
                    </div>

                    {/* Operating Hours */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <Clock className="w-5 h-5 text-green-600" />
                        </div>
                        <h3 className="font-bold text-lg text-gray-900">Hours</h3>
                      </div>
                      <div className="pl-11">
                        <p className="text-gray-700 font-medium mb-1">
                          {openingTime} - {closingTime}
                        </p>
                        <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${
                          isOpen ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          <span className={`inline-block w-1.5 h-1.5 rounded-full ${isOpen ? 'bg-green-500' : 'bg-red-500'} blink-animation`}></span>
                          {isOpen ? 'Open Now' : 'Currently Closed'}
                        </span>
                      </div>
                    </div>

                    {/* Contact Information */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <Phone className="w-5 h-5 text-purple-600" />
                        </div>
                        <h3 className="font-bold text-lg text-gray-900">Contact</h3>
                      </div>
                      <div className="space-y-2 pl-11">
                        {center.customerNumber && (
                          <a
                            href={`tel:${center.customerNumber}`}
                            className="block text-sm text-gray-700 hover:text-blue-600 transition-colors"
                          >
                            <span className="font-medium">Customer:</span> {center.customerNumber}
                          </a>
                        )}
                        {center.bookingAiNumber && (
                          <a
                            href={`tel:${center.bookingAiNumber}`}
                            className="block text-sm text-gray-700 hover:text-blue-600 transition-colors"
                          >
                            <span className="font-medium">AI Booking:</span> {center.bookingAiNumber}
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Rating Badge */}
                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex items-center justify-between bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-200">
                        <div className="flex items-center gap-2">
                          <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
                          <div>
                            <p className="text-2xl font-bold text-gray-900">{center.rating}</p>
                            <p className="text-xs text-gray-600">{center.reviewCount} reviews</p>
                          </div>
                        </div>
                        <Shield className="w-8 h-8 text-amber-500" />
                      </div>
                    </div>

                    {/* Get Directions Button */}
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        `${center.address}, ${center.city}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full bg-[#1E4B3C] hover:bg-[#163A2E] text-white font-semibold py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg group"
                    >
                      <Compass className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
                      <span>Get Directions</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Right Side - Map */}
                <div className="lg:col-span-2 h-96 lg:h-auto min-h-[500px] relative">
                  {center.locationUrl ? (
                    <iframe
                      src={center.locationUrl}
                      title={`${center.name} location`}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="w-full h-full border-0"
                      allowFullScreen
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                      <div className="text-center space-y-4 p-8">
                        <div className="inline-block p-4 bg-white rounded-full shadow-lg">
                          <MapPin className="w-12 h-12 text-gray-400" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-700 text-lg">Interactive Map</p>
                          <p className="text-sm text-gray-500 mt-1">
                            Map will be displayed here once location URL is configured
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="bg-white py-10 md:py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="mb-6">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-2">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    Frequently Asked Questions
                  </h2>
                  <p className="text-sm text-gray-600">
                    Quick answers about bookings, visits and therapies
                  </p>
                </div>
                <span className="inline-flex items-center rounded-full bg-blue-50 border border-blue-200 px-3 py-1.5 text-xs font-medium text-blue-800">
                  Updated for all partner centers
                </span>
              </div>
            </div>

            <div className="space-y-3">
              {/* FAQ 1 */}
              <div className="border-2 border-gray-200 rounded-xl bg-white shadow-sm overflow-hidden hover:border-gray-300 transition-colors">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === 0 ? -1 : 0)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <p className="text-base font-semibold text-gray-900 mb-1">
                      Do I need a prior appointment?
                    </p>
                    <p className="text-sm text-gray-600">
                      Know if walk-ins are allowed and when to pre-book
                    </p>
                  </div>
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition-transform duration-300 ${
                      openFaq === 0 ? "rotate-180" : ""
                    }`}
                  >
                    <ChevronDown className="h-5 w-5" />
                  </div>
                </button>
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    openFaq === 0 ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-4 text-sm text-gray-700 leading-relaxed">
                      Prior appointment is recommended to reduce waiting time,
                      especially for Panchakarma therapies and doctor
                      consultations. Same-day slots may be limited based on doctor
                      and therapist availability.
                    </p>
                  </div>
                </div>
              </div>

              {/* FAQ 2 */}
              <div className="border-2 border-gray-200 rounded-xl bg-white shadow-sm overflow-hidden hover:border-gray-300 transition-colors">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === 1 ? -1 : 1)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <p className="text-base font-semibold text-gray-900 mb-1">
                      What should I bring for my first visit?
                    </p>
                    <p className="text-sm text-gray-600">
                      Documents and basics that help your doctor
                    </p>
                  </div>
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition-transform duration-300 ${
                      openFaq === 1 ? "rotate-180" : ""
                    }`}
                  >
                    <ChevronDown className="h-5 w-5" />
                  </div>
                </button>
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    openFaq === 1 ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-4 text-sm text-gray-700 leading-relaxed">
                      Please carry recent medical reports, ongoing prescriptions
                      and an ID proof. Wearing loose, comfortable clothing makes
                      physical examination and assessment easier.
                    </p>
                  </div>
                </div>
              </div>

              {/* FAQ 3 */}
              <div className="border-2 border-gray-200 rounded-xl bg-white shadow-sm overflow-hidden hover:border-gray-300 transition-colors">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === 2 ? -1 : 2)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <p className="text-base font-semibold text-gray-900 mb-1">
                      Are therapies covered by insurance?
                    </p>
                    <p className="text-sm text-gray-600">
                      Understand how reimbursements typically work
                    </p>
                  </div>
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition-transform duration-300 ${
                      openFaq === 2 ? "rotate-180" : ""
                    }`}
                  >
                    <ChevronDown className="h-5 w-5" />
                  </div>
                </button>
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    openFaq === 2 ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-4 text-sm text-gray-700 leading-relaxed">
                      Coverage depends on your policy and insurer. Some plans
                      support alternative therapies under wellness or OPD
                      benefits. The center team can help with bills and basic
                      documentation.
                    </p>
                  </div>
                </div>
              </div>

              {/* FAQ 4 */}
              <div className="border-2 border-gray-200 rounded-xl bg-white shadow-sm overflow-hidden hover:border-gray-300 transition-colors">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === 3 ? -1 : 3)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <p className="text-base font-semibold text-gray-900 mb-1">
                      Do you offer online follow-up consultations?
                    </p>
                    <p className="text-sm text-gray-600">
                      For reviews after the first in-person visit
                    </p>
                  </div>
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition-transform duration-300 ${
                      openFaq === 3 ? "rotate-180" : ""
                    }`}
                  >
                    <ChevronDown className="h-5 w-5" />
                  </div>
                </button>
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    openFaq === 3 ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-4 text-sm text-gray-700 leading-relaxed">
                      Many doctors support video or phone follow-ups once the
                      initial assessment is done. Exact options and slots depend
                      on each center's schedule.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Booking Modal for general appointment */}
      <BookingGeneralAppointment
        centerId={centerId}
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        centerData={center}
      />

          {/* THERAPY BOOKING MODAL - ADD THIS */}
      {isTherapyModalOpen && selectedTherapy && center && (
        <BookingTherapyAppointment
          isOpen={isTherapyModalOpen}
          onClose={() => {
            setIsTherapyModalOpen(false);
            setSelectedTherapy(null);
          }}
          centerData={{
            id: center._id || centerId,
            name: center.name || center.CenterName || "Wellness Center",
            address: center.address || "",
            phone: center.MobileNo || center.customerNumber || "",
            slots: center.slots || {
              morning: ["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM"],
              evening: ["04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM"]
            }
          }}
          therapyData={{
            id: selectedTherapy._id,
            name: selectedTherapy.therapyName,
            category: selectedTherapy.category,
            description: selectedTherapy.description,
            price: selectedTherapy.price,
            image: selectedTherapy.TherapyImg,
            duration: selectedTherapy.duration,
            maxPatientsPerDay: selectedTherapy.maxPatientsPerDay
          }}
        />
      )}

      <Footer />
    </>
  );
};

export default CenterDetails;