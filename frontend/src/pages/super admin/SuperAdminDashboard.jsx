import React, { useMemo, useState } from "react";
import {
  MdDashboard,
  MdOutlineSettings,
} from "react-icons/md";
import { AiOutlineSchedule } from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { BsStars } from "react-icons/bs";
import { HiOutlineUserCircle } from "react-icons/hi";
import { RiUserHeartLine } from "react-icons/ri";
import CenterMap from "../../pages/center/CenterMap"

import { Bell, UserCircle2, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

// ===================== RAW DATA (READ-ONLY) =====================

// CenterGeneralAppointment-like data
const centerAppointments = [
  {
    _id: "69368f9073bc7bb4667a5dd7",
    ServiceType: "therapy",
    patientId: "6935ae9256085374c83a495c",
    Amount: "100",
    PaymentStatus: "paid",
    TherapyId: null,
    PatientName: "Vedant khasbage",
    PatientEmail: "ravan@gmail.com",
    PatientPhone: "7709535901",
    PatientAge: "20",
    PatientGender: "male",
    notes: "this is my note",
    CenterId: "6936772e39fb7b08f4c3fc57",
    appointmentDate: "2025-12-09",
    appointmentSlot: "morning",
  },
  {
    _id: "69369105e15cbe2fbf487063",
    ServiceType: "therapy",
    patientId: "6935ae9256085374c83a495c",
    Amount: "100",
    PaymentStatus: "paid",
    TherapyId: null,
    PatientName: "harsh chafle",
    PatientEmail: "ravan@gmail.com",
    PatientPhone: "7709535901",
    PatientAge: "20",
    PatientGender: "male",
    notes: "",
    CenterId: "6936772e39fb7b08f4c3fc57",
    appointmentDate: "2025-12-12",
    appointmentSlot: "evening",
  },
  {
    _id: "69373ed68e2ba94935a287df",
    ServiceType: "general",
    patientId: "692f25ace9616f86cd0e5f3f",
    Amount: "100",
    PaymentStatus: "paid",
    TherapyId: null,
    PatientName: "Vedant Khasbage",
    PatientEmail: "itsvedantk@gmail.com",
    PatientPhone: "7709535901",
    PatientAge: "20",
    PatientGender: "male",
    notes: "body pain,fever,headache,stress,oil allergy",
    CenterId: "6931fe02a310710a9950521f",
    appointmentDate: "2025-12-22",
    appointmentSlot: "morning",
  },
];

// Doctors / practitioners
const doctors = [
  {
    _id: "6936a5ccbb5ec0613582b88e",
    centerId: "6931fe02a310710a9950521f",
    fullName: "Dr. Aarav Mehta",
    email: "aaravmehta@gmail.com",
    phone: "7709535901",
    speciality: "Ayurveda Physician",
    experience: 5,
    consultationFee: 100,
    gender: "Male",
    degree: "BAMS, MD (Ayurveda)",
    status: "Active",
  },
  {
    _id: "6936a888bb5ec0613582ba2a",
    centerId: "6931fe02a310710a9950521f",
    fullName: "Dr. Nisha Kulkarni",
    email: "nishakulkarnidoc@gmail.com",
    phone: "9823071342",
    speciality: "Ayurveda Physician",
    experience: 10,
    consultationFee: 187,
    gender: "Female",
    degree: "BAMS, Diploma in Cosmeceuticals",
    status: "Active",
  },
  {
    _id: "6936a902bb5ec0613582ba94",
    centerId: "6931fe02a310710a9950521f",
    fullName: "Dr. Rishabh Deshmukh",
    email: "rishabh.deshmukh@gmail.com",
    phone: "5131534351835",
    speciality: "Ayurveda Physician",
    experience: 20,
    consultationFee: 200,
    gender: "Male",
    degree: "BAMS, Fellowship in Spine Care",
    status: "Active",
  },
  {
    _id: "6936aac1bb5ec0613582bd11",
    centerId: "6931fe02a310710a9950521f",
    fullName: "Kunal Rajput",
    email: "kunalrajput@gmail.com",
    phone: "9012266441",
    speciality: "Panchakarma Specialist",
    experience: 12,
    consultationFee: 200,
    gender: "Male",
    degree: "BAMS, Fellowship in Spine Care",
    status: "Active",
  },
  {
    _id: "6937715590656112a11161ed",
    centerId: "6931fe02a310710a9950521f",
    fullName: "test dr",
    email: "vedantkhasbage2005@gmail.com",
    phone: "7709535901",
    speciality: "Panchakarma Specialist",
    experience: 20,
    consultationFee: 200,
    gender: "Male",
    degree: "MD",
    status: "Active",
  },
  {
    _id: "RAVI_BHATT_ID",
    centerId: "6931fe02a310710a9950521f",
    fullName: "Dr. Ravi Bhatt",
    email: "ravibhatt@himalayanbliss.com",
    phone: "9811112233",
    speciality: "Ayurveda Physician",
    experience: 6,
    consultationFee: 250,
    gender: "Male",
    degree: "BAMS, MD (Ayurveda)",
    status: "Active",
  },
];

// Real centers
const coreCenters = [
  {
    _id: "6931fe02a310710a9950521f",
    Adminname: "Vedant Khasbage",
    CenterName: "Himalayan Bliss Ayurveda Retreat",
    email: "itsvedantk@gmail.com",
    city: "Dehradun",
    mainAddress: "Rajpur Road, Near Pacific Hills, Dehradun – 248001",
    verified: false,
    rating: 4.5,
    morningOpenTime: "09:00",
    morningCloseTime: "02:00",
    eveningOpenTime: "15:00",
    eveningCloseTime: "21:00",
  },
  {
    _id: "6936772e39fb7b08f4c3fc57",
    Adminname: "Pankaj Korkalai",
    CenterName: "Tranquil Roots Wellness Center",
    email: "tranquilroots.center@gmail.com",
    city: "Nagpur",
    mainAddress: "Nandapuri, Ramtek, Nagpur – 441106",
    verified: false,
    rating: 4.5,
    morningOpenTime: "09:00",
    morningCloseTime: "01:00",
    eveningOpenTime: "16:00",
    eveningCloseTime: "20:00",
  },
];

// Synthetic extra centers used only for stats / cards
const images = [
  "https://content3.jdmagicbox.com/v2/comp/solapur/w2/9999px217.x217.150728150300.i3w2/catalogue/dr-raghavendra-nadargi-ayurved-and-panchakarma-chikitsalaya-jodibhavi-peth-solapur-ayurvedic-doctors-klies5t1xx.jpg",
  "https://aatreyaayurved.com/wp-content/uploads/2024/07/Aatreya-Ayurveda-Panchakarma-Clinic-Hadapsar-Pune-1536x1024.jpg",
  "https://content.jdmagicbox.com/v2/comp/mumbai/b5/022pxx22.xx22.240610200154.h5b5/catalogue/kerala-ayurveda-multi-speciality-clinic-and-panchakarma-center-andheri-mumbai-clinics-g3yMeMOnHu.jpg",
  "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/07/66/46/c5/ayurshreshta-ayurvedic.jpg?w=900&h=500&s=1",
  "https://content3.jdmagicbox.com/v2/comp/palakkad/k5/9999px491.x491.221023223641.u5k5/catalogue/aayushcare-ayurveda-wellness-clinic-and-panchakarma-centre-palakkad-ayurvedic-treatment-centres-for-panchakarma-og03an8otz.jpg",
];

const syntheticCenters = [
  {
    id: 1,
    name: "Ayushakti Panchakarma Center",
    city: "Mumbai",
    visitors: 240,
    rating: 4.7,
    age: 7,
    photo: images[2],
  },
  {
    id: 2,
    name: "Kerala Ayurveda Kendra",
    city: "Mumbai",
    visitors: 200,
    rating: 4.6,
    age: 5,
    photo: images[3],
  },
  {
    id: 3,
    name: "Aatreya Ayurveda Clinic",
    city: "Pune",
    visitors: 260,
    rating: 4.9,
    age: 9,
    photo: images[1],
  },
  {
    id: 4,
    name: "Vishwamrut Ayurveda",
    city: "Pune",
    visitors: 190,
    rating: 4.7,
    age: 6,
    photo: images[3],
  },
  {
    id: 5,
    name: "Prakruti Wellness Center",
    city: "Nagpur",
    visitors: 175,
    rating: 4.5,
    age: 5,
    photo: images[4],
  },
  {
    id: 6,
    name: "Jeevansparsh Panchakarma",
    city: "Nagpur",
    visitors: 210,
    rating: 4.8,
    age: 8,
    photo: images[0],
  },
];

// Patients
const patients = [
  {
    _id: "692f258cc6b36093c5ffbe3b",
    name: "Harsh Chafle",
    email: "chaflehp@rknec.edu",
    mobileNo: "7972234194",
    city: "Nagpur",
    state: "Maharashtra",
    dateOfBirth: "2004-02-21",
    gender: "Male",
    bloodGroup: "O+",
  },
  {
    _id: "PAT_PANKAJ",
    name: "Pankaj Korkalai",
    email: "pankajkorkalai@example.com",
    mobileNo: "7709191063",
    city: "Nagpur",
    state: "Maharashtra",
    gender: "Male",
  },
  {
    _id: "PAT_VEDANT",
    name: "Vedant Khasbage",
    email: "itsvedantk@gmail.com",
    mobileNo: "7709535901",
    city: "Dehradun",
    state: "Uttarakhand",
    gender: "Male",
  },
  {
    _id: "PAT_MAITHILY",
    name: "Maithily Patle",
    email: "maithily.patle@example.com",
    mobileNo: "8888899999",
    city: "Nagpur",
    state: "Maharashtra",
    gender: "Female",
  },
  {
    _id: "PAT_NILAKSHI",
    name: "Nilakshi Raut",
    email: "nilakshi.raut@example.com",
    mobileNo: "7777788888",
    city: "Pune",
    state: "Maharashtra",
    gender: "Female",
  },
  {
    _id: "PAT_SAMIKSHA",
    name: "Samiksha Shete",
    email: "samiksha.shete@example.com",
    mobileNo: "9999900000",
    city: "Aurangabad",
    state: "Maharashtra",
    gender: "Female",
  },
];

// Therapies
const therapies = [
  {
    _id: "6936ac9ebb5ec0613582bfb3",
    centerId: "6931fe02a310710a9950521f",
    therapyName: "Nasya",
    duration: "30",
    price: 150,
    category: "Shodhana",
  },
  {
    _id: "6936acdebb5ec0613582c013",
    centerId: "6931fe02a310710a9950521f",
    therapyName: "Shirodhara",
    duration: "30",
    price: 200,
    category: "Rasayana",
  },
  {
    _id: "6936ad35bb5ec0613582c143",
    centerId: "6931fe02a310710a9950521f",
    therapyName: "Abhyanga",
    duration: "30",
    price: 200,
    category: "Massage",
  },
  {
    _id: "6936adaabb5ec0613582c3e0",
    centerId: "6931fe02a310710a9950521f",
    therapyName: "Kati Basti",
    duration: "30",
    price: 200,
    category: "Massage",
  },
];

// Therapists
const therapists = [
  {
    _id: "692fd7db594be7d0243cd959",
    centerId: "692f2656e9616f86cd0e5f4a",
    fullName: "VEDANT KHASBAGE",
    phone: "07709535901",
    email: "v33e@gmail.com",
    specialization: "Abhyanga",
    experience: 8,
  },
  {
    _id: "69303612d2475a0860fef85f",
    centerId: "692f2656e9616f86cd0e5f4a",
    fullName: "gaurav bhauuuu",
    phone: "07709535901",
    email: "usering5006552@gmail.com",
    specialization: "Shirodhara",
    experience: 5,
  },
  {
    _id: "69307e19de0820ec69dfccb5",
    centerId: "69304b8e213983f1efa1ce0a",
    fullName: "DARK KNIGHT",
    phone: "9090909090",
    email: "chaflehp@rknec.edu",
    specialization: "Nasya",
    experience: 6,
  },
  {
    _id: "6930c271837d3c0be4a6c975",
    centerId: "692f2656e9616f86cd0e5f4a",
    fullName: "Pankajkorkalai",
    phone: "7709535901",
    email: "pankajkorkalai9@gmail.com",
    specialization: "Shirodhara",
    experience: 5,
  },
  {
    _id: "6936aefcbb5ec0613582ca31",
    centerId: "6931fe02a310710a9950521f",
    fullName: "Pankaj Suryawanshi",
    phone: "7709535901",
    email: "pankajsuryawanshi@gmaol.com",
    specialization: "Nasya",
    experience: 5,
  },
];

// ===================== HELPERS =====================
const formatDate = (dateStr) => {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const statusChipClasses = (status = "") => {
  const s = status.toLowerCase();
  if (s.includes("paid") || s.includes("completed"))
    return "bg-emerald-50 text-emerald-700 border-emerald-200";
  if (s.includes("pending"))
    return "bg-amber-50 text-amber-700 border-amber-200";
  if (s.includes("cancel"))
    return "bg-rose-50 text-rose-700 border-rose-200";
  return "bg-slate-50 text-slate-700 border-slate-200";
};

// ===================== SIDEBAR ITEMS =====================
const sidebarItems = [
  { id: "overview", label: "Dashboard Overview", icon: <MdDashboard size={20} /> },
  { id: "centers-map", label: "Centers Visualization Map", icon: <GoLocation size={20} /> },
  { id: "centers", label: "Centers", icon: <GoLocation size={20} /> },
  { id: "practitioners", label: "Practitioners", icon: <RiUserHeartLine size={20} /> },
  { id: "patients", label: "Patients", icon: <AiOutlineSchedule size={20} /> },
  { id: "appointments", label: "Appointments", icon: <AiOutlineSchedule size={20} /> },
  { id: "therapies", label: "Therapies", icon: <TbDeviceDesktopAnalytics size={20} /> },
  { id: "therapists", label: "Therapists", icon: <TbDeviceDesktopAnalytics size={20} /> },
  { id: "reports", label: "Reports & Analytics", icon: <BsStars size={20} />, badge: "New" },
  { id: "profile", label: "Admin Profile", icon: <HiOutlineUserCircle size={20} /> },
  { id: "settings", label: "Settings", icon: <MdOutlineSettings size={20} /> },
];

// ===================== MAIN COMPONENT =====================
const SuperAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const totalPatients = patients.length;
  const totalCenters = coreCenters.length + syntheticCenters.length;
  const totalAppointments = centerAppointments.length;

  const avgRating = useMemo(() => {
    const ratings = [
      ...coreCenters.map((c) => c.rating),
      ...syntheticCenters.map((c) => c.rating),
    ];
    if (!ratings.length) return 0;
    return (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1);
  }, []);

  const centerAppointmentMap = useMemo(() => {
    const map = {};
    centerAppointments.forEach((a) => {
      if (!map[a.CenterId]) map[a.CenterId] = [];
      map[a.CenterId].push(a);
    });
    return map;
  }, []);

  const therapyStats = useMemo(() => {
    const map = {};
    therapies.forEach((t) => {
      if (!map[t.category]) map[t.category] = 0;
      map[t.category] += 1;
    });
    return map;
  }, []);

  // ----------------- tab renderer -----------------
  const renderTab = () => {
    // OVERVIEW
    if (activeTab === "overview") {
      return (
        <div className="space-y-8">
          {/* Hero */}
          <section className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            <div className="xl:col-span-3">
              <div className="relative overflow-hidden rounded-2xl bg-emerald-900 text-emerald-50 p-6 sm:p-8">
                <div className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(circle_at_top,_#bbf7d0,_transparent_55%),radial-gradient(circle_at_bottom,_#22c55e,_transparent_55%)]" />
                <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-emerald-200">
                      Super Admin Portal
                    </p>
                    <h2 className="mt-2 text-2xl sm:text-3xl font-semibold">
                      Welcome back, Super Admin
                    </h2>
                    <p className="mt-2 text-sm text-emerald-100 max-w-xl">
                      Read‑only control tower for all Panchakarma centers,
                      practitioners and patients under AyurSutra.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2 text-xs">
                      <span className="inline-flex items-center rounded-full bg-emerald-800/60 px-3 py-1">
                        Read‑only · Analytics mode
                      </span>
                      <span className="inline-flex items-center rounded-full bg-emerald-800/60 px-3 py-1">
                        {totalCenters} centers onboarded
                      </span>
                      <span className="inline-flex items-center rounded-full bg-emerald-800/60 px-3 py-1">
                        {totalPatients} registered patients
                      </span>
                    </div>
                  </div>

                  <div className="bg-emerald-800/60 rounded-xl p-4 min-w-[220px] text-sm">
                    <h3 className="text-emerald-50 font-semibold mb-3">
                      Flagship Center
                    </h3>
                    <p className="font-medium">
                      Himalayan Bliss Ayurveda Retreat
                    </p>
                    <p className="text-xs text-emerald-200 mt-1">
                      Rajpur Road, Near Pacific Hills, Dehradun – 248001
                    </p>
                    <p className="text-xs text-emerald-200 mt-2">
                      Timings: 09:00 – 02:00 · 15:00 – 21:00
                    </p>
                    <p className="text-xs text-emerald-200 mt-1">
                      Rating: 4.5 ★ · Certified center
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Global snapshot */}
            <div>
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 h-full flex flex-col">
                <p className="text-xs font-semibold text-slate-500 mb-3">
                  Global Snapshot
                </p>
                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Total patients</span>
                    <span className="font-semibold text-slate-900">
                      {totalPatients}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Total centers</span>
                    <span className="font-semibold text-slate-900">
                      {totalCenters}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Total appointments</span>
                    <span className="font-semibold text-slate-900">
                      {totalAppointments}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Avg. rating</span>
                    <span className="font-semibold text-emerald-700">
                      {avgRating} / 5
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* KPI row */}
          <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
              <p className="text-xs font-medium text-slate-500">
                Registered Patients
              </p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">
                {totalPatients}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Across all AyurSutra centers
              </p>
            </div>
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
              <p className="text-xs font-medium text-slate-500">
                Active Practitioners
              </p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">
                {doctors.length}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Doctors & consultants in network
              </p>
            </div>
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
              <p className="text-xs font-medium text-slate-500">
                Therapies Offered
              </p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">
                {therapies.length}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Core Panchakarma procedures live
              </p>
            </div>
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
              <p className="text-xs font-medium text-slate-500">
                Payment Success (sample)
              </p>
              <p className="mt-2 text-2xl font-semibold text-emerald-600">
                100%
              </p>
              <p className="text-xs text-slate-500 mt-1">
                All tracked appointments are paid
              </p>
            </div>
          </section>
        </div>
      );
    }


    if(activeTab==="centers-map"){
        return(
            <CenterMap/>
        )
    }

    // CENTERS
    if (activeTab === "centers") {
      return (
        <section className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-slate-800">
              Panchakarma Centers
            </h2>
            <p className="text-xs text-slate-500">
              Real centers plus sample network clinics
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 overflow-x-auto">
            <table className="min-w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="text-xs text-slate-500 border-b border-slate-100">
                  <th className="py-2 pr-4">Center</th>
                  <th className="py-2 pr-4">City</th>
                  <th className="py-2 pr-4">Admin</th>
                  <th className="py-2 pr-4">Rating</th>
                  <th className="py-2 pr-4">Doctors</th>
                  <th className="py-2 pr-4">Appointments</th>
                </tr>
              </thead>
              <tbody>
                {coreCenters.map((c) => {
                  const doctorCount = doctors.filter(
                    (d) => d.centerId === c._id
                  ).length;
                  const appts = centerAppointmentMap[c._id] || [];
                  return (
                    <tr
                      key={c._id}
                      className="border-b border-slate-50 last:border-0"
                    >
                      <td className="py-2 pr-4">
                        <div className="flex flex-col">
                          <span className="font-semibold text-slate-900">
                            {c.CenterName}
                          </span>
                          <span className="text-[11px] text-slate-500">
                            {c.mainAddress}
                          </span>
                        </div>
                      </td>
                      <td className="py-2 pr-4 whitespace-nowrap">
                        {c.city}
                      </td>
                      <td className="py-2 pr-4 whitespace-nowrap">
                        {c.Adminname}
                      </td>
                      <td className="py-2 pr-4 whitespace-nowrap">
                        {c.rating.toFixed(1)} ★
                      </td>
                      <td className="py-2 pr-4 whitespace-nowrap">
                        {doctorCount}
                      </td>
                      <td className="py-2 pr-4 whitespace-nowrap">
                        {appts.length}
                      </td>
                    </tr>
                  );
                })}

                {syntheticCenters.map((c) => (
                  <tr
                    key={`syn-${c.id}`}
                    className="border-b border-slate-50 last:border-0"
                  >
                    <td className="py-2 pr-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-900">
                          {c.name}
                        </span>
                        <span className="text-[11px] text-slate-500">
                          Synthetic center
                        </span>
                      </div>
                    </td>
                    <td className="py-2 pr-4 whitespace-nowrap">{c.city}</td>
                    <td className="py-2 pr-4 whitespace-nowrap">—</td>
                    <td className="py-2 pr-4 whitespace-nowrap">
                      {c.rating.toFixed(1)} ★
                    </td>
                    <td className="py-2 pr-4 whitespace-nowrap">—</td>
                    <td className="py-2 pr-4 whitespace-nowrap">
                      {c.visitors}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      );
    }

    // PRACTITIONERS
    if (activeTab === "practitioners") {
      return (
        <section className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-slate-800">
              Practitioners (Doctors)
            </h2>
            <p className="text-xs text-slate-500">
              Active practitioners across core centers
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 overflow-x-auto">
            <table className="min-w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="text-xs text-slate-500 border-b border-slate-100">
                  <th className="py-2 pr-4">Name</th>
                  <th className="py-2 pr-4">Center</th>
                  <th className="py-2 pr-4">Speciality</th>
                  <th className="py-2 pr-4">Experience</th>
                  <th className="py-2 pr-4">Fee</th>
                </tr>
              </thead>
              <tbody>
                {doctors.map((d) => {
                  const center =
                    coreCenters.find((c) => c._id === d.centerId) || {};
                  return (
                    <tr
                      key={d._id}
                      className="border-b border-slate-50 last:border-0"
                    >
                      <td className="py-2 pr-4 whitespace-nowrap">
                        <span className="font-semibold text-slate-900">
                          {d.fullName}
                        </span>
                      </td>
                      <td className="py-2 pr-4 whitespace-nowrap">
                        {center.CenterName || "—"}
                      </td>
                      <td className="py-2 pr-4 whitespace-nowrap">
                        {d.speciality}
                      </td>
                      <td className="py-2 pr-4 whitespace-nowrap">
                        {d.experience} yrs
                      </td>
                      <td className="py-2 pr-4 whitespace-nowrap">
                        ₹{d.consultationFee}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      );
    }

    // PATIENTS
    if (activeTab === "patients") {
      return (
        <section className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-slate-800">
              Patients Directory
            </h2>
            <p className="text-xs text-slate-500">
              Snapshot of patient profiles across centers
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 overflow-x-auto">
            <table className="min-w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="text-xs text-slate-500 border-b border-slate-100">
                  <th className="py-2 pr-4">Name</th>
                  <th className="py-2 pr-4">Email</th>
                  <th className="py-2 pr-4">Phone</th>
                  <th className="py-2 pr-4">City</th>
                  <th className="py-2 pr-4">Gender</th>
                  <th className="py-2 pr-4">DOB</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((p) => (
                  <tr
                    key={p._id}
                    className="border-b border-slate-50 last:border-0"
                  >
                    <td className="py-2 pr-4 whitespace-nowrap">
                      <span className="font-semibold text-slate-900">
                        {p.name}
                      </span>
                    </td>
                    <td className="py-2 pr-4 whitespace-nowrap">
                      {p.email}
                    </td>
                    <td className="py-2 pr-4 whitespace-nowrap">
                      {p.mobileNo}
                    </td>
                    <td className="py-2 pr-4 whitespace-nowrap">
                      {p.city}, {p.state}
                    </td>
                    <td className="py-2 pr-4 whitespace-nowrap">
                      {p.gender || "—"}
                    </td>
                    <td className="py-2 pr-4 whitespace-nowrap">
                      {p.dateOfBirth ? formatDate(p.dateOfBirth) : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      );
    }

    // APPOINTMENTS
    if (activeTab === "appointments") {
      return (
        <section className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-slate-800">
              Center Appointments
            </h2>
            <p className="text-xs text-slate-500">
              Combined general and therapy bookings
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 overflow-x-auto">
            <table className="min-w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="text-xs text-slate-500 border-b border-slate-100">
                  <th className="py-2 pr-4">Patient</th>
                  <th className="py-2 pr-4">Center</th>
                  <th className="py-2 pr-4">Service</th>
                  <th className="py-2 pr-4">Date</th>
                  <th className="py-2 pr-4">Slot</th>
                  <th className="py-2 pr-4">Amount</th>
                  <th className="py-2 pr-4">Payment</th>
                </tr>
              </thead>
              <tbody>
                {centerAppointments.map((a) => {
                  const center =
                    coreCenters.find((c) => c._id === a.CenterId) || {};
                  return (
                    <tr
                      key={a._id}
                      className="border-b border-slate-50 last:border-0"
                    >
                      <td className="py-2 pr-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <span className="font-semibold text-slate-900">
                            {a.PatientName}
                          </span>
                          <span className="text-[11px] text-slate-500">
                            {a.PatientPhone}
                          </span>
                        </div>
                      </td>
                      <td className="py-2 pr-4 whitespace-nowrap">
                        {center.CenterName || "—"}
                      </td>
                      <td className="py-2 pr-4 whitespace-nowrap">
                        {a.ServiceType}
                      </td>
                      <td className="py-2 pr-4 whitespace-nowrap">
                        {formatDate(a.appointmentDate)}
                      </td>
                      <td className="py-2 pr-4 whitespace-nowrap capitalize">
                        {a.appointmentSlot}
                      </td>
                      <td className="py-2 pr-4 whitespace-nowrap">
                        ₹{a.Amount}
                      </td>
                      <td className="py-2 pr-4">
                        <span
                          className={
                            "inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium " +
                            statusChipClasses(a.PaymentStatus)
                          }
                        >
                          {a.PaymentStatus}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      );
    }

    // THERAPIES
    if (activeTab === "therapies") {
      return (
        <section className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-slate-800">
              Therapy Catalogue
            </h2>
            <p className="text-xs text-slate-500">
              Core Panchakarma therapies and utilization
            </p>
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <table className="min-w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="text-xs text-slate-500 border-b border-slate-100">
                    <th className="py-2 pr-4">Therapy</th>
                    <th className="py-2 pr-4">Category</th>
                    <th className="py-2 pr-4">Duration</th>
                    <th className="py-2 pr-4">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {therapies.map((t) => (
                    <tr
                      key={t._id}
                      className="border-b border-slate-50 last:border-0"
                    >
                      <td className="py-2 pr-4 whitespace-nowrap">
                        {t.therapyName}
                      </td>
                      <td className="py-2 pr-4 whitespace-nowrap">
                        {t.category}
                      </td>
                      <td className="py-2 pr-4 whitespace-nowrap">
                        {t.duration} min
                      </td>
                      <td className="py-2 pr-4 whitespace-nowrap">
                        ₹{t.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <h3 className="text-sm font-semibold text-slate-900 mb-3">
                Therapy Categories
              </h3>
              <div className="space-y-3 text-xs sm:text-sm">
                {Object.entries(therapyStats).map(([cat, count]) => (
                  <div key={cat} className="flex items-center gap-3">
                    <div className="w-24 text-slate-600">{cat}</div>
                    <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                        style={{
                          width: `${(count / therapies.length) * 100}%`,
                        }}
                      />
                    </div>
                    <div className="w-6 text-right text-slate-700 font-medium">
                      {count}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      );
    }

    // THERAPISTS
    if (activeTab === "therapists") {
      return (
        <section className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-slate-800">
              Therapists Network
            </h2>
            <p className="text-xs text-slate-500">
              Massage and Panchakarma therapists across centers
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <div className="space-y-3 text-xs sm:text-sm">
              {therapists.map((t) => (
                <div
                  key={t._id}
                  className="border border-slate-100 rounded-lg px-3 py-2.5"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-slate-900">
                      {t.fullName}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      {t.specialization}
                    </p>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    {t.email} · {t.phone}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Experience: {t.experience} yrs
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }

    // REPORTS
    if (activeTab === "reports") {
      return (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-800">
            Reports & Analytics
          </h2>
          <p className="text-xs text-slate-500">
            High‑level metrics and ratios derived from static data.
          </p>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 text-sm text-slate-700 space-y-2">
            <p>
              Total revenue (sample): ₹
              {centerAppointments.reduce(
                (sum, a) => sum + Number(a.Amount || 0),
                0
              )}
            </p>
            <p>Therapy vs General split:  {centerAppointments.filter(a => a.ServiceType === "therapy").length} therapy / {centerAppointments.filter(a => a.ServiceType === "general").length} general.</p>
            <p>
              Unique cities covered:{" "}
              {[
                ...new Set([
                  ...coreCenters.map((c) => c.city),
                  ...syntheticCenters.map((c) => c.city),
                ]),
              ].length}
            </p>
          </div>
        </section>
      );
    }

    // PROFILE
    if (activeTab === "profile") {
      return (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-800">
            Super Admin Profile
          </h2>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700 font-semibold">
              SA
            </div>
            <div className="text-sm">
              <p className="font-semibold text-slate-900">
                AyurSutra Super Admin
              </p>
              <p className="text-xs text-slate-500">
                Read‑only analytics user for monitoring the whole network.
              </p>
            </div>
          </div>
        </section>
      );
    }

    // SETTINGS
    if (activeTab === "settings") {
      return (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-800">
            Settings (Read‑only)
          </h2>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 text-sm text-slate-700 space-y-2">
            <p>Environment: Production sample.</p>
            <p>Authentication: Enabled (JWT).</p>
            <p>Notifications: Twilio + email templates configured.</p>
            <p>Write actions from this dashboard: Disabled.</p>
          </div>
        </section>
      );
    }

    return null;
  };





  const navigate = useNavigate();
const [profileOpen, setProfileOpen] = useState(false);
const [unreadCount] = useState(3); // static for now; wire later if you want real count
const userName = "Super Admin";
const role = "Admin";
const profileImage = null; // you can plug a URL here later






  // ----------------- main layout -----------------
return (
  <div className="h-screen w-screen bg-slate-50 text-slate-900 flex overflow-hidden">
    {/* Sidebar */}
    <aside className="hidden lg:flex lg:flex-col w-64 bg-white border-r border-slate-100 shadow-sm">
      <div className="h-16 flex items-center px-6 border-b border-slate-100">
        <span className="text-lg font-semibold text-black">
          Super Admin DashBoard
        </span>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1 text-sm overflow-y-auto">
        {sidebarItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg font-medium transition ${
              activeTab === item.id
                ? "bg-emerald-50 text-emerald-700"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <span className="flex items-center gap-2">
              {item.icon}
              <span>{item.label}</span>
            </span>
            {item.badge && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </nav>
      <div className="px-4 py-4 border-t border-slate-100 text-xs text-slate-400">
        © {new Date().getFullYear()} AyurSutra
      </div>
    </aside>

    {/* Main content */}
    <div className="flex-1 flex flex-col min-w-0">
      {/* Top bar */}
      {/* <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-4 sm:px-6 flex-shrink-0">
        <div>
          <h1 className="text-lg sm:text-xl font-semibold text-slate-900">
            Super Admin Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            High‑level read‑only overview of the entire AyurSutra network
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right text-xs sm:text-sm">
            <div className="font-semibold text-slate-900">
              AyurSutra Super Admin
            </div>
            <div className="text-slate-500">Read‑only mode</div>
          </div>
          <div className="h-10 w-10 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700 font-semibold">
            SA
          </div>
        </div>
      </header> */}





      <header className="flex-shrink-0 bg-white border-b border-emerald-100">
  {/* top thin strip (optional) */}
  

  {/* main admin navbar */}
  <div className="flex items-center justify-between px-4 py-2.5 md:px-6 lg:px-8">
    {/* LEFT: logo + title */}
    <div className="flex items-center gap-3">
      <div className="flex items-center">
        <img
          src="https://res.cloudinary.com/dlty7hjfx/image/upload/v1764684761/Gemini_Generated_Image_97y8ep97y8ep97y8_n6yxoh.png"
          alt="AyurSutra"
          className="h-7"
        />
        <span className="mx-2 text-gray-300 hidden sm:inline">|</span>
        <span className="hidden sm:block text-lg font-semibold tracking-wide text-slate-600">
          प्रधानाधिकारी
        </span>
      </div>
      
    </div>

    {/* CENTER: simple admin menu (frontend only) */}
    <div className="hidden lg:flex items-center gap-6 text-xs font-medium text-slate-700">
      <button
        type="button"
        className={`pb-1 border-b-2 ${
          activeTab === "overview"
            ? "border-[#1E4B3C] text-[#1E4B3C]"
            : "border-transparent hover:text-emerald-800"
        }`}
        onClick={() => setActiveTab("overview")}
      >
        Overview
      </button>
      <button
        type="button"
        className={`pb-1 border-b-2 ${
          activeTab === "centers"
            ? "border-[#1E4B3C] text-[#1E4B3C]"
            : "border-transparent hover:text-emerald-800"
        }`}
        onClick={() => setActiveTab("centers")}
      >
        Centers
      </button>
      <button
        type="button"
        className={`pb-1 border-b-2 ${
          activeTab === "practitioners"
            ? "border-[#1E4B3C] text-[#1E4B3C]"
            : "border-transparent hover:text-emerald-800"
        }`}
        onClick={() => setActiveTab("practitioners")}
      >
        Practitioners
      </button>
      <button
        type="button"
        className={`pb-1 border-b-2 ${
          activeTab === "reports"
            ? "border-[#1E4B3C] text-[#1E4B3C]"
            : "border-transparent hover:text-emerald-800"
        }`}
        onClick={() => setActiveTab("reports")}
      >
        Reports
      </button>
    </div>

    {/* RIGHT: notifications + profile dropdown */}
    <div className="flex items-center gap-3 md:gap-4">
      {/* notifications badge (static) */}
      <button
        type="button"
        className="relative h-9 w-9 rounded-full border border-emerald-100 bg-emerald-50 flex items-center justify-center text-emerald-700 hover:bg-emerald-100 transition-colors"
      >
        <Bell size={16} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white border-2 border-white">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* profile dropdown */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setProfileOpen((p) => !p)}
          className="flex cursor-pointer items-center gap-2 md:gap-3 px-2 py-1.5 rounded-full hover:bg-slate-50 transition-colors"
        >
          <div className="hidden sm:block text-right">
            <p className="text-xs font-semibold text-slate-900">
              {userName}
            </p>
            <p className="text-[11px] text-slate-500">{role}</p>
          </div>
          {profileImage ? (
            <img
              src={profileImage}
              alt="Profile"
              className="h-9 w-9 rounded-full object-cover border border-slate-300"
            />
          ) : (
            <div className="h-9 w-9 rounded-full bg-emerald-100 flex items-center justify-center">
              <UserCircle2 size={22} className="text-emerald-700" />
            </div>
          )}
          <svg
            className={`w-4 h-4 text-slate-700 transition-transform ${
              profileOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>

        {profileOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
            >
              <UserCircle2 size={18} />
              <span className="font-medium">Back to main site</span>
            </button>

            <div className="h-px bg-slate-200 my-1" />

            <button
              type="button"
              onClick={() => console.log("super admin logout (frontend only)")}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut size={18} />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        )}
      </div>
    </div>
  </div>
</header>

      {/* Scrollable content */}
      <main className="flex-1 overflow-y-auto px-4 sm:px-6 py-6">
        {renderTab()}
      </main>
    </div>
  </div>
);

};

export default SuperAdminDashboard;
