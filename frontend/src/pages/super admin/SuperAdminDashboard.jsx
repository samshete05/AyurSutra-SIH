import React, { useMemo } from "react";

/* ---------- RAW DATA ARRAYS (frontend only) ---------- */

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

// Doctors / Practitioners
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
    licenseNo: "AYU-MH-221134",
    address: "Dharampeth, Nagpur, Maharashtra",
    status: "Active",
    profileImg: "",
    bio: "Expert in Panchkarma with a focus on chronic pain management and detox therapies.",
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
    licenseNo: "1654335431354651",
    address: "Bandra West, Mumbai",
    status: "Active",
    profileImg: "",
    bio: "Highly experienced in Ayurvedic facials, anti-aging therapies, and herbal skincare.",
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
    licenseNo: "413543135461518343",
    address: "Shivaji Nagar, Pune",
    status: "Active",
    profileImg: "",
    bio: "Specializes in Kati Basti, Janu Basti, and joint rehabilitation therapies.",
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
    licenseNo: "45514681686484",
    address: "Ayurvedic General Physician",
    status: "Active",
    profileImg: "",
    bio: "Passionate about holistic healing, lifestyle correction, and immunity-building.",
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
    licenseNo: "768td7s6sjs6tsj5rs5",
    address: "SAHUJI NAGAR KARLA ROAD, NEAR HAJARE COMPLEX",
    status: "Active",
    profileImg: "",
    bio: "This is the short bio.",
  },
  // New practitioner Ravi Bhatt
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
    licenseNo: "AYU-UK-998877",
    address: "Rajpur Road, Dehradun",
    status: "Active",
    profileImg: "",
    bio: "Expert in Panchakarma with a focus on chronic pain management and detox therapies.",
  },
];

// Images and synthetic centers for map-like section
const images = [
  "https://content3.jdmagicbox.com/v2/comp/solapur/w2/9999px217.x217.150728150300.i3w2/catalogue/dr-raghavendra-nadargi-ayurved-and-panchakarma-chikitsalaya-jodibhavi-peth-solapur-ayurvedic-doctors-klies5t1xx.jpg",
  "https://aatreyaayurved.com/wp-content/uploads/2024/07/Aatreya-Ayurveda-Panchakarma-Clinic-Hadapsar-Pune-1536x1024.jpg",
  "https://content.jdmagicbox.com/v2/comp/mumbai/b5/022pxx22.xx22.240610200154.h5b5/catalogue/kerala-ayurveda-multi-speciality-clinic-and-panchakarma-center-andheri-mumbai-clinics-g3yMeMOnHu.jpg",
  "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/07/66/46/c5/ayurshreshta-ayurvedic.jpg?w=900&h=500&s=1",
  "https://content3.jdmagicbox.com/v2/comp/palakkad/k5/9999px491.x491.221023223641.u5k5/catalogue/aayushcare-ayurveda-wellness-clinic-and-panchakarma-centre-palakkad-ayurvedic-treatment-centres-for-panchakarma-og03an8otz.jpg",
];

const syntheticCenters = [
  { id: 1, name: "Ayushakti Panchakarma Center", city: "Mumbai", visitors: 240, rating: 4.7, age: 7, photo: images[2] },
  { id: 2, name: "Kerala Ayurveda Kendra", city: "Mumbai", visitors: 200, rating: 4.6, age: 5, photo: images[3] },
  { id: 3, name: "Aatreya Ayurveda Clinic", city: "Pune", visitors: 260, rating: 4.9, age: 9, photo: images[1] },
  { id: 4, name: "Vishwamrut Ayurveda", city: "Pune", visitors: 190, rating: 4.7, age: 6, photo: images[3] },
  { id: 5, name: "Prakruti Wellness Center", city: "Nagpur", visitors: 175, rating: 4.5, age: 5, photo: images[4] },
  { id: 6, name: "Jeevansparsh Panchakarma", city: "Nagpur", visitors: 210, rating: 4.8, age: 8, photo: images[0] },
];

// Real Panchakarma centers (core two)
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
    address: "Ramtek",
  },
  {
    _id: "PAT_PANKAJ",
    name: "Pankaj Korkalai",
    email: "pankajkorkalai@example.com",
    mobileNo: "7709191063",
    city: "Nagpur",
    state: "Maharashtra",
    gender: "Male",
    address: "Nandapuri, Ramtek, Nagpur – 441106",
  },
  {
    _id: "PAT_VEDANT",
    name: "Vedant Khasbage",
    email: "itsvedantk@gmail.com",
    mobileNo: "7709535901",
    city: "Dehradun",
    state: "Uttarakhand",
    gender: "Male",
    address: "Rajpur Road, Near Pacific Hills, Dehradun – 248001",
  },
  {
    _id: "PAT_MAITHILY",
    name: "Maithily Patle",
    email: "maithily.patle@example.com",
    mobileNo: "8888899999",
    city: "Nagpur",
    state: "Maharashtra",
    gender: "Female",
    address: "Bajaj Nagar, Nagpur",
  },
  {
    _id: "PAT_NILAKSHI",
    name: "Nilakshi Raut",
    email: "nilakshi.raut@example.com",
    mobileNo: "7777788888",
    city: "Pune",
    state: "Maharashtra",
    gender: "Female",
    address: "Kothrud, Pune",
  },
  {
    _id: "PAT_SAMIKSHA",
    name: "Samiksha Shete",
    email: "samiksha.shete@example.com",
    mobileNo: "9999900000",
    city: "Aurangabad",
    state: "Maharashtra",
    gender: "Female",
    address: "CIDCO, Aurangabad",
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

/* ---------- SMALL HELPERS ---------- */

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

const statusChipClasses = (status) => {
  const s = (status || "").toLowerCase();
  if (s.includes("paid") || s.includes("completed"))
    return "bg-emerald-50 text-emerald-700 border-emerald-100";
  if (s.includes("pending"))
    return "bg-amber-50 text-amber-700 border-amber-100";
  if (s.includes("cancel"))
    return "bg-rose-50 text-rose-700 border-rose-100";
  return "bg-slate-50 text-slate-700 border-slate-100";
};

/* ---------- MAIN COMPONENT ---------- */

const SuperAdminDashboard = () => {
  // Derived stats
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

  // Appointments grouped by center
  const centerAppointmentMap = useMemo(() => {
    const map = {};
    centerAppointments.forEach((apt) => {
      if (!map[apt.CenterId]) map[apt.CenterId] = [];
      map[apt.CenterId].push(apt);
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

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex lg:flex-col w-64 bg-white border-r border-slate-100 shadow-sm">
        <div className="h-16 flex items-center px-6 border-b border-slate-100">
          <span className="text-xl font-semibold text-emerald-700">
            AyurSutra
          </span>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-1 text-sm">
          {[
            "Overview",
            "Centers",
            "Practitioners",
            "Patients",
            "Appointments",
            "Therapies",
            "Therapists",
            "Feedback & Quality",
            "Notifications",
            "Reports & Analytics",
            "Settings",
          ].map((item, idx) => (
            <button
              key={item}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition ${
                idx === 0
                  ? "bg-emerald-50 text-emerald-700"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-slate-300" />
              <span>{item}</span>
            </button>
          ))}
        </nav>
        <div className="px-4 py-4 border-t border-slate-100 text-xs text-slate-400">
          © {new Date().getFullYear()} AyurSutra
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-4 sm:px-6">
          <div>
            <h1 className="text-lg sm:text-xl font-semibold text-slate-900">
              Super Admin Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Read‑only overview of all centers, practitioners and patients
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
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-6">
          {/* Hero + key center */}
          <section className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Hero */}
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
                      Monitor real-time activity across all Panchakarma centers,
                      practitioners and patient journeys.
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

                  {/* Highlight Himalayan Bliss */}
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
                      Rating: 4.5 ★ · Government‑style certified center
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick global stats */}
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
                All {totalAppointments} tracked appointments are paid
              </p>
            </div>
          </section>

          {/* Centers overview */}
          <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-5 overflow-x-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-slate-900">
                  Panchakarma Centers
                </h3>
                <p className="text-xs text-slate-500">
                  Real centers plus sample network clinics
                </p>
              </div>
              <table className="min-w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="text-xs text-slate-500 border-b border-slate-100">
                    <th className="py-2 pr-4">Center</th>
                    <th className="py-2 pr-4">City</th>
                    <th className="py-2 pr-4">Rating</th>
                    <th className="py-2 pr-4">Doctors</th>
                    <th className="py-2 pr-4">Appointments</th>
                  </tr>
                </thead>
                <tbody className="text-xs sm:text-sm">
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
                        <td className="py-2 pr-4 whitespace-nowrap">
                          <div className="flex flex-col">
                            <span className="font-semibold text-slate-900">
                              {c.CenterName}
                            </span>
                            <span className="text-[11px] text-slate-500">
                              Admin: {c.Adminname}
                            </span>
                          </div>
                        </td>
                        <td className="py-2 pr-4 whitespace-nowrap">
                          {c.city}
                        </td>
                        <td className="py-2 pr-4 whitespace-nowrap">
                          {c.rating?.toFixed ? c.rating.toFixed(1) : c.rating} ★
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

            {/* Therapy categories */}
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
                        style={{ width: `${(count / therapies.length) * 100}%` }}
                      />
                    </div>
                    <div className="w-6 text-right text-slate-700 font-medium">
                      {count}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Practitioners + patients */}
          <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Practitioners */}
            <div className="xl:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-5 overflow-x-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-slate-900">
                  Practitioners (Doctors)
                </h3>
                <p className="text-xs text-slate-500">
                  Active practitioners across core centers
                </p>
              </div>
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

            {/* Patients */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-slate-900">
                  Recent Patients
                </h3>
                <p className="text-xs text-slate-500">
                  Snapshot of key patient profiles
                </p>
              </div>
              <div className="space-y-3 text-xs sm:text-sm">
                {patients.map((p) => (
                  <div
                    key={p._id}
                    className="border border-slate-100 rounded-lg px-3 py-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-slate-900">{p.name}</p>
                      <p className="text-[11px] text-slate-500">
                        {p.city}, {p.state}
                      </p>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">
                      {p.email} · {p.mobileNo}
                    </p>
                    {p.dateOfBirth && (
                      <p className="text-[11px] text-slate-400 mt-1">
                        DOB: {formatDate(p.dateOfBirth)} · {p.gender}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Appointments */}
          <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-5 overflow-x-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-slate-900">
                  Center Appointments
                </h3>
                <p className="text-xs text-slate-500">
                  Combined general & therapy bookings
                </p>
              </div>
              <table className="min-w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="text-xs text-slate-500 border-b border-slate-100">
                    <th className="py-2 pr-4">Patient</th>
                    <th className="py-2 pr-4">Center</th>
                    <th className="py-2 pr-4">Date</th>
                    <th className="py-2 pr-4">Slot</th>
                    <th className="py-2 pr-4">Service</th>
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
                          {a.PatientName}
                        </td>
                        <td className="py-2 pr-4 whitespace-nowrap">
                          {center.CenterName || "—"}
                        </td>
                        <td className="py-2 pr-4 whitespace-nowrap">
                          {formatDate(a.appointmentDate)}
                        </td>
                        <td className="py-2 pr-4 whitespace-nowrap capitalize">
                          {a.appointmentSlot}
                        </td>
                        <td className="py-2 pr-4 whitespace-nowrap">
                          {a.ServiceType}
                        </td>
                        <td className="py-2 pr-4 whitespace-nowrap">
                          ₹{a.Amount}
                        </td>
                        <td className="py-2 pr-4">
                          <span
                            className={
                              "inline-flex items-center px-2 py-0.5 rounded-full border text-[11px] font-medium " +
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

            {/* Therapists */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <h3 className="text-sm font-semibold text-slate-900 mb-3">
                Therapists Network
              </h3>
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
        </main>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
