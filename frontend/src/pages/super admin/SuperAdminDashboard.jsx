import React, { useMemo, useState } from "react";
import { MdDashboard, MdOutlineSettings } from "react-icons/md";
import { AiOutlineSchedule } from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { BsStars } from "react-icons/bs";
import { HiOutlineUserCircle } from "react-icons/hi";
import { RiUserHeartLine } from "react-icons/ri";
import CenterMap from "../../pages/center/CenterMap";

import { Bell, UserCircle2, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";



import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";


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
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMgRzs_NeM0zd4J4YNx0b48f5CBnsT5FnyzSWoLvngQgddFz-XWGBr1-S9SUgqnjREZyg&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQloDz30jj655uqtl0IMR8EZxCKBZlVAb4XvZS27TUXI2YvBqPOeQZkLWcjq3lL6-x6qec&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7jtLXaZ1VA7k71eRzqdL-vg3WMVYdhqsJEg&s"
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
    photo: images[6],
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
    photo: images[7],
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
  if (s.includes("cancel")) return "bg-rose-50 text-rose-700 border-rose-200";
  return "bg-slate-50 text-slate-700 border-slate-200";
};

// ===================== SIDEBAR ITEMS =====================
const sidebarItems = [
  {
    id: "overview",
    label: "Dashboard Overview",
    icon: <MdDashboard size={20} />,
  },
  {
    id: "centers-map",
    label: "Centers Visualization Map",
    icon: <GoLocation size={20} />,
  },
  { id: "centers", label: "Centers", icon: <GoLocation size={20} /> },
  {
    id: "practitioners",
    label: "Practitioners",
    icon: <RiUserHeartLine size={20} />,
  },
  { id: "patients", label: "Patients", icon: <AiOutlineSchedule size={20} /> },
  {
    id: "appointments",
    label: "Appointments",
    icon: <AiOutlineSchedule size={20} />,
  },
  {
    id: "therapies",
    label: "Therapies",
    icon: <TbDeviceDesktopAnalytics size={20} />,
  },
  {
    id: "therapists",
    label: "Therapists",
    icon: <TbDeviceDesktopAnalytics size={20} />,
  },
  {
    id: "reports",
    label: "Reports & Analytics",
    icon: <BsStars size={20} />,
    badge: "New",
  },
  {
    id: "profile",
    label: "Admin Profile",
    icon: <HiOutlineUserCircle size={20} />,
  },
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




  // Patients per city
const patientsPerCity = useMemo(() => {
  const map = {};
  patients.forEach((p) => {
    if (!p.city) return;
    map[p.city] = (map[p.city] || 0) + 1;
  });
  return Object.entries(map).map(([city, count]) => ({ city, count }));
}, []);

// Appointments per service type
const apptsByService = useMemo(() => {
  const map = {};
  centerAppointments.forEach((a) => {
    const key = a.ServiceType || "other";
    map[key] = (map[key] || 0) + 1;
  });
  return Object.entries(map).map(([service, value]) => ({ service, value }));
}, []);

// Average therapy price by category
const avgPriceByCategory = useMemo(() => {
  const sum = {};
  const cnt = {};
  therapies.forEach((t) => {
    if (!sum[t.category]) {
      sum[t.category] = 0;
      cnt[t.category] = 0;
    }
    sum[t.category] += Number(t.price || 0);
    cnt[t.category] += 1;
  });
  return Object.keys(sum).map((cat) => ({
    category: cat,
    avgPrice: cnt[cat] ? Math.round(sum[cat] / cnt[cat]) : 0,
  }));
}, []);








const [settingsState, setSettingsState] = useState({
  // toggles
  showPatientIdentifiers: true,
  showCenterFinancials: true,
  showPractitionerLoad: true,
  dailySummaryEmail: false,
  criticalAlerts: true,
  weeklyCancellationReport: true,
  maskPatientContact: true,
  restrictDownloads: false,
  anonymizedSharingOnly: false,
  // selects
  timezone: "Asia/Kolkata",
  dateFormat: "DD MMM YYYY",
  currency: "INR",
});








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

      {/* Demographics & activity charts */}
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Patients per city */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <h3 className="text-sm font-semibold text-slate-900 mb-3">
            Patients by City
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            Distribution of registered patients across key cities
          </p>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={patientsPerCity} margin={{ top: 5, right: 5, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="city" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Appointments by service type */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <h3 className="text-sm font-semibold text-slate-900 mb-3">
            Appointments by Service Type
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            Split between general consultations and therapies
          </p>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={apptsByService} margin={{ top: 5, right: 5, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="service" tick={{ fontSize: 10 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 10 }} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 10 }} />
                <Bar dataKey="value" name="Appointments" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Avg therapy price by category */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <h3 className="text-sm font-semibold text-slate-900 mb-3">
            Avg Therapy Price by Category
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            Quick comparison of typical session pricing
          </p>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={avgPriceByCategory} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="category" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="avgPrice"
                  stroke="#f97316"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>
    </div>
  );
}


    if (activeTab === "centers-map") {
      return <CenterMap />;
    }

    // CENTERS
    if (activeTab === "centers") {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">
          Panchakarma Centers
        </h2>
        <p className="text-sm text-slate-500">
          High‑level view of key Panchakarma centers in the AyurSutra network
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Real centers */}
        {coreCenters.map((c, idx) => {
          const doctorCount = doctors.filter(
            (d) => d.centerId === c._id
          ).length;
          const appts = centerAppointmentMap[c._id] || [];
          const img = images[idx % images.length];

          return (
            <div
              key={c._id}
              className="bg-white rounded-2xl border border-slate-100 shadow-md hover:shadow-lg transition-shadow overflow-hidden flex flex-col"
            >
              {/* Image */}
              <div className="h-32 w-full overflow-hidden">
                <img
                  src={img}
                  alt={c.CenterName}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col gap-4 text-[13px]">
                {/* Name + location */}
                <div>
                  <p className="text-base font-semibold text-slate-900">
                    {c.CenterName}
                  </p>
                  <p className="mt-1 text-slate-600">
                    {c.city}
                    {" · "}
                    <span className="text-slate-500">
                      {c.mainAddress}
                    </span>
                  </p>
                </div>

                {/* Pills row */}
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 text-xs font-medium">
                    {c.rating.toFixed(1)} ★ Rating
                  </span>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-slate-50 text-slate-700 border border-slate-100 text-xs font-medium">
                    {doctorCount} Doctors
                  </span>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-slate-50 text-slate-700 border border-slate-100 text-xs font-medium">
                    {appts.length} Appointments
                  </span>
                </div>

                {/* Two‑column meta */}
                <div className="grid grid-cols-2 gap-3 text-slate-700 text-[13px]">
                  <div className="space-y-1">
                    <p className="text-[11px] uppercase tracking-wide text-slate-400">
                      Admin
                    </p>
                    <p className="font-medium">{c.Adminname}</p>
                    <p className="text-[12px] text-slate-500 break-all">
                      {c.email}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[11px] uppercase tracking-wide text-slate-400">
                      Timings
                    </p>
                    <p>
                      Morning:{" "}
                      <span className="font-medium">
                        {c.morningOpenTime}–{c.morningCloseTime}
                      </span>
                    </p>
                    <p>
                      Evening:{" "}
                      <span className="font-medium">
                        {c.eveningOpenTime}–{c.eveningCloseTime}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Footer line */}
                <div className="mt-auto pt-2 border-t border-slate-100 text-[11px] text-emerald-700 uppercase tracking-wide">
                  Real center · Read‑only analytics
                </div>
              </div>
            </div>
          );
        })}

        {/* Synthetic/sample centers */}
        {syntheticCenters.map((c) => (
          <div
            key={c.id}
            className="bg-white rounded-2xl border border-slate-100 shadow-md hover:shadow-lg transition-shadow overflow-hidden flex flex-col"
          >
            <div className="h-32 w-full overflow-hidden">
              <img
                src={c.photo}
                alt={c.name}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="p-5 flex-1 flex flex-col gap-4 text-[13px]">
              <div>
                <p className="text-base font-semibold text-slate-900">
                  {c.name}
                </p>
                <p className="mt-1 text-slate-600">
                  {c.city}
                  {" · "}
                  <span className="text-slate-500">
                    Sample Panchakarma clinic
                  </span>
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 text-xs font-medium">
                  {c.rating.toFixed(1)} ★ Rating
                </span>
                <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-slate-50 text-slate-700 border border-slate-100 text-xs font-medium">
                  ~{c.visitors} yearly visitors
                </span>
                <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-slate-50 text-slate-700 border border-slate-100 text-xs font-medium">
                  Age: {c.age} yrs
                </span>
              </div>

              <div className="space-y-1 text-slate-700 text-[13px]">
                <p className="text-[11px] uppercase tracking-wide text-slate-400">
                  Focus
                </p>
                <p>
                  Ayurvedic therapies, wellness packages, and seasonal
                  detox programs (sample data).
                </p>
              </div>

              <div className="mt-auto pt-2 border-t border-slate-100 text-[11px] text-slate-500 uppercase tracking-wide">
                Synthetic center · For UI & analytics only
              </div>
            </div>
          </div>
        ))}
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
                    <td className="py-2 pr-4 whitespace-nowrap">{p.email}</td>
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
  const therapyCards = [
    {
      key: "Nasya",
      title: "Nasya",
      img: "https://www.keralatourism.org/images/ayurveda/static-banner/large/Nasya_Chikitsa-18022020060940.jpg", // your DB image
      subtitle: "Shodhana · 30 min · ₹150",
      bullets: [
        "Clears nasal passages and sinuses",
        "Supports migraine and headache relief",
        "Helps improve breathing and mental clarity",
      ],
    },
    {
      key: "Shirodhara",
      title: "Shirodhara",
      img: "https://ayusanjivani.com/wp-content/uploads/2021/06/SHIRODHARA.jpg",
      subtitle: "Rasayana · 30 min · ₹200",
      bullets: [
        "Continuous oil stream over forehead",
        "Deeply calming for mind and nervous system",
        "Used for sleep imbalance and anxiety",
      ],
    },
    {
      key: "Abhyanga",
      title: "Abhyanga",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3vMz8B9epLwWS3TmykDvZ_g6uyAP8jKS75Q&s",
      subtitle: "Massage · 30 min · ₹200",
      bullets: [
        "Full‑body warm oil massage",
        "Supports detox and circulation",
        "Relaxes muscles and reduces fatigue",
      ],
    },
    {
      key: "Kati Basti",
      title: "Kati Basti",
      img: "https://images.squarespace-cdn.com/content/v1/5b7c6b233e2d09ca641ecb53/1553365390039-7S66HSLCZHZ55VJR42MP/kati+basti+-+low+back+ayurvedic+treatment",
      subtitle: "Massage · 30 min · ₹200",
      bullets: [
        "Localized oil pool on lower back",
        "Useful in lumbar pain and stiffness",
        "Supports spine and nerve comfort",
      ],
    },
  ];

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">
          Therapy Catalogue
        </h2>
        <p className="text-sm text-slate-500">
          Core Panchakarma therapies at Himalayan Bliss Ayurveda Retreat
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left: therapy cards (2 columns on large) */}
        <div className="xl:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-5">
          {therapyCards.map((card) => (
            <div
              key={card.key}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col"
            >
              <div className="h-28 w-full overflow-hidden">
                <img
                  src={card.img}
                  alt={card.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-4 flex-1 flex flex-col gap-3 text-[13px]">
                <div>
                  <p className="text-base font-semibold text-slate-900">
                    {card.title}
                  </p>
                  <p className="mt-1 text-xs font-medium text-emerald-700">
                    {card.subtitle}
                  </p>
                </div>

                <ul className="list-disc list-inside text-slate-600 text-[13px] space-y-1">
                  {card.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>

                <div className="mt-auto pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                  Read‑only overview · Bookings managed from practitioner
                  dashboards.
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right: category utilization */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <h3 className="text-sm font-semibold text-slate-900 mb-3">
            Therapy Categories
          </h3>
          <p className="text-xs text-slate-500 mb-3">
            Distribution of therapies by clinical focus
          </p>
          <div className="space-y-4 text-xs sm:text-sm">
            {Object.entries(therapyStats).map(([cat, count]) => (
              <div key={cat} className="flex items-center gap-3">
                <div className="w-28 text-slate-700 font-medium">{cat}</div>
                <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                    style={{
                      width: `${(count / therapies.length) * 100}%`,
                    }}
                  />
                </div>
                <div className="w-8 text-right text-slate-800 font-semibold">
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
                    <p className="font-semibold text-slate-900">{t.fullName}</p>
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
  // ---------- local analytics data ----------
  const revenueByCenter = coreCenters.map((c) => {
    const appts = centerAppointments.filter((a) => a.CenterId === c._id);
    const revenue = appts.reduce(
      (sum, a) => sum + Number(a.Amount || 0),
      0
    );
    return {
      center: c.CenterName.split(" ")[0], // short label
      revenue,
      appointments: appts.length,
    };
  });

  const revenueByService = ["therapy", "general"].map((type) => {
    const list = centerAppointments.filter((a) => a.ServiceType === type);
    return {
      type: type[0].toUpperCase() + type.slice(1),
      revenue: list.reduce((sum, a) => sum + Number(a.Amount || 0), 0),
      count: list.length,
    };
  });

  const loadByCenter = coreCenters.map((c) => {
    const appts = centerAppointments.filter((a) => a.CenterId === c._id);
    const doctorsCount = doctors.filter((d) => d.centerId === c._id).length || 1;
    return {
      center: c.CenterName.split(" ")[0],
      avgPerDoctor: +(appts.length / doctorsCount).toFixed(1),
    };
  });

  const pieColors = ["#10b981", "#6366f1", "#f97316"];

  const totalRevenue = centerAppointments.reduce(
    (sum, a) => sum + Number(a.Amount || 0),
    0
  );

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">
          Reports & Analytics
        </h2>
        <p className="text-sm text-slate-500">
          Visual overview of revenue, service mix, and center load (static demo
          using current in‑memory data).
        </p>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
          <p className="text-xs font-medium text-slate-500">
            Total Revenue (sample)
          </p>
          <p className="mt-2 text-2xl font-semibold text-emerald-600">
            ₹{totalRevenue}
          </p>
          <p className="text-xs text-slate-500 mt-1">
            From {centerAppointments.length} recorded appointments
          </p>
        </div>
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
          <p className="text-xs font-medium text-slate-500">
            Centers Reporting
          </p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">
            {coreCenters.length}
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Only real centers (sample centers excluded)
          </p>
        </div>
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
          <p className="text-xs font-medium text-slate-500">
            Unique Cities Covered
          </p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">
            {
              [
                ...new Set([
                  ...coreCenters.map((c) => c.city),
                  ...syntheticCenters.map((c) => c.city),
                ]),
              ].length
            }
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Across real + sample network centers
          </p>
        </div>
      </div>

      {/* Charts grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Revenue by center (column chart) */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 xl:col-span-2">
          <h3 className="text-sm font-semibold text-slate-900 mb-2">
            Revenue by Center
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            Shows total appointment revenue per real Panchakarma center.
          </p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={revenueByCenter}
                margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="center" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar
                  dataKey="revenue"
                  name="Revenue (₹)"
                  fill="#10b981"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="appointments"
                  name="Appointments"
                  fill="#6366f1"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Service split pie */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <h3 className="text-sm font-semibold text-slate-900 mb-2">
            Therapy vs General Split
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            Distribution of revenue and count by service type.
          </p>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Pie
                  data={revenueByService}
                  dataKey="revenue"
                  nameKey="type"
                  outerRadius={70}
                  innerRadius={35}
                  paddingAngle={4}
                >
                  {revenueByService.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={pieColors[index % pieColors.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 text-[11px] text-slate-500">
            Therapy revenue: ₹{revenueByService[0].revenue} · General revenue: ₹
            {revenueByService[1].revenue}
          </div>
        </div>
      </div>

      {/* Load chart */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
        <h3 className="text-sm font-semibold text-slate-900 mb-2">
          Average Appointments per Doctor (by Center)
        </h3>
        <p className="text-xs text-slate-500 mb-4">
          Approximate load per practitioner, useful for balancing staffing.
        </p>
        <div className="h-60">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={loadByCenter}
              margin={{ top: 10, right: 20, left: -10, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="center" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="avgPerDoctor"
                stroke="#f97316"
                strokeWidth={2}
                dot={{ r: 3 }}
                name="Avg appointments / doctor"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}

    // PROFILE
if (activeTab === "profile") {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">
          Super Admin Profile
        </h2>
        <p className="text-sm text-slate-500">
          Read‑only control role for monitoring all AyurSutra centers and users.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        {/* Left: avatar + basic info */}
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700 font-semibold text-lg">
            SA
          </div>
          <div className="text-sm space-y-1">
            <p className="font-semibold text-slate-900 text-base">
              AyurSutra Super Admin
            </p>
            <p className="text-xs text-slate-500">
              Role: Global read‑only analytics & monitoring user.
            </p>
            <p className="text-xs text-slate-500">
              Access scope: All centers, practitioners, patients, therapies and
              appointments.
            </p>
          </div>
        </div>

        {/* Right: meta info */}
        <div className="grid grid-cols-2 gap-4 text-[13px] text-slate-700 w-full md:w-auto">
          <div className="space-y-1">
            <p className="text-[11px] uppercase tracking-wide text-slate-400">
              Account ID
            </p>
            <p className="font-medium">SA‑001</p>
          </div>
          <div className="space-y-1">
            <p className="text-[11px] uppercase tracking-wide text-slate-400">
              Permissions
            </p>
            <p className="font-medium">Read‑only · No write or delete</p>
          </div>
          <div className="space-y-1">
            <p className="text-[11px] uppercase tracking-wide text-slate-400">
              Data visibility
            </p>
            <p>All regions · All Panchakarma centers</p>
          </div>
          <div className="space-y-1">
            <p className="text-[11px] uppercase tracking-wide text-slate-400">
              Created for
            </p>
            <p>Analytics, audits, and quality monitoring</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 text-[13px] text-slate-700 space-y-2">
        <p className="font-semibold text-slate-900 text-sm">
          Responsibilities
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>Monitor center performance and appointment volumes.</li>
          <li>Review therapy mix and patient distribution across cities.</li>
          <li>Ensure data consistency without altering operational records.</li>
          <li>Support decision‑making for new centers and capacity planning.</li>
        </ul>
      </div>
    </section>
  );
}


// SETTINGS
if (activeTab === "settings") {
  const handleToggle = (key) => {
    setSettingsState((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSelect = (key, value) => {
    setSettingsState((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">
          Super Admin Settings
        </h2>
        <p className="text-sm text-slate-500">
          Configure how analytics are displayed for the AyurSutra network. These
          preferences are currently stored only in the frontend state.
        </p>
      </div>

      {/* Top summary row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[13px]">
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Environment
          </p>
          <p className="mt-1 font-medium text-slate-900">
            Production (demo)
          </p>
          <p className="text-[11px] text-slate-500">
            Dashboard uses in‑memory data arrays synced from MongoDB.
          </p>
        </div>
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Access Level
          </p>
          <p className="mt-1 font-medium text-slate-900">
            Super Admin · Analytics + UI preferences
          </p>
          <p className="text-[11px] text-slate-500">
            Platform data is untouched; only your view changes.
          </p>
        </div>
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Auth & Security
          </p>
          <p className="mt-1 font-medium text-slate-900">
            JWT login · Role‑based access
          </p>
          <p className="text-[11px] text-slate-500">
            Patients, centers and practitioners use separate roles.
          </p>
        </div>
      </div>

      {/* Settings groups */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-[13px]">
        {/* Data visibility */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Data visibility
          </p>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={settingsState.showPatientIdentifiers}
              onChange={() => handleToggle("showPatientIdentifiers")}
              className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
            />
            <span>Show patient identifiers (name, phone, email)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={settingsState.showCenterFinancials}
              onChange={() => handleToggle("showCenterFinancials")}
              className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
            />
            <span>Show center financial metrics (revenue, volume)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={settingsState.showPractitionerLoad}
              onChange={() => handleToggle("showPractitionerLoad")}
              className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
            />
            <span>Show practitioner workload analytics</span>
          </label>
        </div>

        {/* Time & regional */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Time & regional
          </p>

          <div className="space-y-1">
            <p className="text-xs text-slate-500">Default timezone</p>
            <select
              value={settingsState.timezone}
              onChange={(e) => handleSelect("timezone", e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
              <option value="UTC">UTC</option>
            </select>
          </div>

          <div className="space-y-1">
            <p className="text-xs text-slate-500">Date format</p>
            <select
              value={settingsState.dateFormat}
              onChange={(e) => handleSelect("dateFormat", e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              <option value="DD MMM YYYY">21 Dec 2025 (DD MMM YYYY)</option>
              <option value="DD/MM/YYYY">21/12/2025 (DD/MM/YYYY)</option>
              <option value="YYYY-MM-DD">2025‑12‑21 (YYYY‑MM‑DD)</option>
            </select>
          </div>

          <div className="space-y-1">
            <p className="text-xs text-slate-500">Currency</p>
            <select
              value={settingsState.currency}
              onChange={(e) => handleSelect("currency", e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              <option value="INR">INR (₹)</option>
              <option value="USD">USD ($)</option>
            </select>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Notifications
          </p>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={settingsState.dailySummaryEmail}
              onChange={() => handleToggle("dailySummaryEmail")}
              className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
            />
            <span>Send daily summary email to Super Admin</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={settingsState.criticalAlerts}
              onChange={() => handleToggle("criticalAlerts")}
              className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
            />
            <span>Enable critical alerts for center downtime</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={settingsState.weeklyCancellationReport}
              onChange={() => handleToggle("weeklyCancellationReport")}
              className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
            />
            <span>Send weekly report for high cancellation rates</span>
          </label>
        </div>

        {/* Privacy & access */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Privacy & access
          </p>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={settingsState.maskPatientContact}
              onChange={() => handleToggle("maskPatientContact")}
              className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
            />
            <span>Mask patient contact details in exports</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={settingsState.restrictDownloads}
              onChange={() => handleToggle("restrictDownloads")}
              className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
            />
            <span>Restrict download of raw appointment lists</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={settingsState.anonymizedSharingOnly}
              onChange={() => handleToggle("anonymizedSharingOnly")}
              className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
            />
            <span>Allow only anonymized charts for external sharing</span>
          </label>
        </div>
      </div>

      <p className="text-[11px] text-slate-500">
        These settings currently affect only how data is presented in this
        Super Admin dashboard. To persist them across sessions, connect this
        state to your backend or a user‑preferences API.
      </p>
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
                      onClick={() =>
                        console.log("super admin logout (frontend only)")
                      }
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
