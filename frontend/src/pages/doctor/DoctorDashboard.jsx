import React, { useState, useMemo } from "react";

import {
  MdDashboard,
  MdOutlineFeedback,
  MdOutlineSettings,
} from "react-icons/md";
import { AiOutlineSchedule } from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { BsStars } from "react-icons/bs";
import { HiOutlineUserCircle } from "react-icons/hi";
import { RiUserHeartLine } from "react-icons/ri";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ComposedChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  PieChart,
  Pie,
  Cell
} from "recharts";




// ==========================================
// SIDEBAR ITEMS
// ==========================================
const sidebarItems = [
  { id: "dashboard", label: "Dashboard Overview", icon: <MdDashboard size={20} /> },
  { id: "appointments", label: "See All Appointments", icon: <AiOutlineSchedule size={20} /> },
  { id: "today", label: "Today's Appointments", icon: <AiOutlineSchedule size={20} /> },
  { id: "followup", label: "Follow-up Patients", icon: <RiUserHeartLine size={20} /> },
  { id: "therapy", label: "Therapy Sessions", icon: <TbDeviceDesktopAnalytics size={20} /> },
  { id: "tasks", label: "Clinical Tasks", icon: <GoLocation size={20} /> },
  { id: "reports", label: "Reports & Analytics", icon: <BsStars size={20} />, badge: "New" },
  { id: "profile", label: "Your Profile", icon: <HiOutlineUserCircle size={20} /> },
  { id: "settings", label: "Settings", icon: <MdOutlineSettings size={20} /> },
];


// ==========================================
// DUMMY DATA (instead of API)
// ==========================================
const dummyAppointments = [
  {
    id: "a1",
    patientDetails: { name: "Aman Verma" },
    appointmentDetails: {
      appointmentDate: "2025-12-10",
      appointmentSlot: "morning",
      ServiceType: "Consultation",
      tokenNumber: "12",
      status: "Scheduled",
    },
  },
  {
    id: "a2",
    patientDetails: { name: "Priya Sharma" },
    appointmentDetails: {
      appointmentDate: "2025-12-10",
      appointmentSlot: "evening",
      ServiceType: "Therapy",
      tokenNumber: "7",
      status: "Completed",
    },
  },
  {
    id: "a3",
    patientDetails: { name: "Rahul Singh" },
    appointmentDetails: {
      appointmentDate: "2025-12-11",
      appointmentSlot: "morning",
      ServiceType: "Consultation",
      tokenNumber: "3",
      status: "Scheduled",
    },
  },
];

const pendingFollowups = [
  { id: 1, name: "Anita Sharma", reason: "Post Panchakarma review", date: "2025-12-10" },
  { id: 2, name: "Rohit Verma", reason: "Chronic back pain follow-up", date: "2025-12-11" },
];

const completedFollowups = [
  { id: 3, name: "Meera Joshi", reason: "Migraine management review", date: "2025-12-05" },
  { id: 4, name: "Aman Gupta", reason: "Detox completion review", date: "2025-12-06" },
];









// ==========================================
// MAIN COMPONENT
// ==========================================
const DoctorDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");


  // ======================
// CLINICAL TASKS STATE
// ======================
const [tasks, setTasks] = useState([
  {
    id: 1,
    title: "Prepare treatment notes for Rohit Verma",
    type: "Consultation",
    due: "Today",
    urgent: true,
    completed: false,
  },
  {
    id: 2,
    title: "Review Panchakarma progress report",
    type: "Therapy",
    due: "Tomorrow",
    urgent: false,
    completed: false,
  },
  {
    id: 3,
    title: "Update herbal medicine chart",
    type: "Clinical",
    due: "Overdue",
    urgent: true,
    completed: false,
  },
  {
    id: 4,
    title: "Submit monthly wellness report",
    type: "Administrative",
    due: "In 3 days",
    urgent: false,
    completed: true,
  },
]);

// TASK ACTIONS
const toggleTaskCompletion = (id) => {
  setTasks((prev) =>
    prev.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    )
  );
};

const toggleUrgent = (id) => {
  setTasks((prev) =>
    prev.map((t) =>
      t.id === id ? { ...t, urgent: !t.urgent } : t
    )
  );
};




  
  const appointments = dummyAppointments;

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const todayAppointments = useMemo(
    () => appointments.filter((a) => a.appointmentDetails.appointmentDate === "2025-12-10"),
    [appointments]
  );

  const nextAppointment = appointments[0];

  const statusChipClasses = (status) => {
    const s = status.toLowerCase();
    if (s.includes("scheduled")) return "bg-emerald-100 text-emerald-700";
    if (s.includes("completed")) return "bg-blue-100 text-blue-700";
    return "bg-red-100 text-red-700";
  };


  // ==========================================
  // PAGE RENDERER
  // ==========================================
  const renderPage = () => {





    // =============================
// THERAPY SESSIONS (THERAPIES PERFORMED BY DOCTOR)
// =============================
if (activeTab === "therapy") {
  const doctorTherapies = [
    {
      id: 1,
      title: "Shirodhara",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNy2bCdb15DgZtm1fc0tRlXTnd8MOO9ZBpXQ&s",
      description: "Mind calming therapy using herbal oil drip.",
      sessionsDone: 128,
      avgDuration: "45 min",
      successRate: 94,
    },
    {
      id: 2,
      title: "Abhyanga",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_kzPkz56v0pOYxmzBPNJvLQYh-hPe6IpeDQ&s",
      description: "Full body warm oil massage for detoxification.",
      sessionsDone: 204,
      avgDuration: "60 min",
      successRate: 89,
    },
    {
      id: 3,
      title: "Kati Basti",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxNTOB3IrU0xV-dfWhrKUKgMBFSrFFI8qDZw&s",
      description: "Back pain relief therapy with warm medicated oils.",
      sessionsDone: 97,
      avgDuration: "40 min",
      successRate: 91,
    },
    {
      id: 4,
      title: "Nasya",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6t2_6fsupeOOUzj5_q-vZ-MRa7AVu0OXuxg&s",
      description: "Nasal detox therapy for migraine and sinus issues.",
      sessionsDone: 75,
      avgDuration: "30 min",
      successRate: 87,
    },
  ];

  return (
    <div className="space-y-10">

      {/* HEADER */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Therapies Performed</h2>
        <p className="text-xl text-slate-500 mt-1">
          Overview of all Ayurveda therapies conducted by the practitioner.
        </p>
      </div>

      {/* THERAPY CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">

        {doctorTherapies.map((therapy) => (
          <div
            key={therapy.id}
            className="bg-white/95 backdrop-blur rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition cursor-pointer"
          >
            {/* IMAGE */}
            <div className="h-40 w-full overflow-hidden">
              <img
                src={therapy.image}
                alt={therapy.title}
                className="h-full w-full object-cover hover:scale-105 transition"
              />
            </div>

            {/* CONTENT */}
            <div className="p-6 space-y-3">
              <h3 className="text-lg font-semibold text-slate-800">
                {therapy.title}
              </h3>

              <p className="text-sm text-slate-500">{therapy.description}</p>

              {/* STATS */}
              <div className="grid grid-cols-3 text-center text-xs mt-4">
                <div>
                  <p className="font-semibold text-slate-700">{therapy.sessionsDone}</p>
                  <p className="text-slate-500">Sessions</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-700">{therapy.avgDuration}</p>
                  <p className="text-slate-500">Duration</p>
                </div>
                <div>
                  <p className="font-semibold text-emerald-600">{therapy.successRate}%</p>
                  <p className="text-slate-500">Success</p>
                </div>
              </div>

              {/* BUTTON */}
              <button className="w-full mt-4 py-2 text-sm bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition">
                View Details
              </button>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}







 
// =============================
// CLINICAL TASKS PAGE
// =============================
if (activeTab === "tasks") {
  return (
    <div className="space-y-10">

      {/* PAGE HEADER */}
      <div>
        <h2 className="text-xl font-semibold text-slate-800">Clinical Tasks</h2>
        <p className="text-xs text-slate-500 mt-1">
          Manage today's workflow — therapy tasks, consultations, reports & more.
        </p>
      </div>

      {/* FILTERS */}
      <div className="flex flex-wrap gap-3">
        {["All", "Pending", "Completed", "Urgent", "Therapy", "Consultation"].map((f) => (
          <button
            key={f}
            className="px-4 py-1.5 bg-white rounded-full shadow-sm text-xs hover:bg-emerald-50 hover:text-emerald-700 transition"
          >
            {f}
          </button>
        ))}
      </div>

      {/* TASK LISTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* PENDING / OVERDUE / TODAY */}
        <div className="space-y-6">

          {/* ACTIVE TASKS */}
          <div className="bg-white/95 backdrop-blur p-6 rounded-3xl shadow-lg">
            <h3 className="text-sm font-semibold mb-3">Pending Tasks</h3>

            <div className="space-y-4">
              {tasks.filter((t) => !t.completed).map((task) => (
                <div
                  key={task.id}
                  className="p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition shadow-sm"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium">{task.title}</p>
                      <p className="text-xs text-slate-500 mt-1">
                        {task.type} • {task.due}
                      </p>
                    </div>

                    {task.urgent && (
                      <span className="px-2 py-0.5 text-[10px] rounded-full bg-red-100 text-red-600">
                        Urgent
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() => toggleTaskCompletion(task.id)}
                      className="text-xs px-3 py-1 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                    >
                      Mark Done
                    </button>

                    <button
                      onClick={() => toggleUrgent(task.id)}
                      className="text-xs px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
                    >
                      {task.urgent ? "Remove Urgent" : "Mark Urgent"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* OVERDUE */}
          <div className="bg-white/95 backdrop-blur p-6 rounded-3xl shadow-lg">
            <h3 className="text-sm font-semibold mb-3">Overdue Tasks</h3>

            <div className="space-y-4">
              {tasks
                .filter((t) => t.due === "Overdue" && !t.completed)
                .map((task) => (
                  <div
                    key={task.id}
                    className="p-4 rounded-xl bg-rose-50 shadow-sm border border-rose-100"
                  >
                    <p className="font-medium">{task.title}</p>
                    <p className="text-xs text-rose-600 mt-1">
                      {task.type} • {task.due}
                    </p>
                  </div>
                ))}
            </div>
          </div>

        </div>

        {/* COMPLETED TASKS */}
        <div className="bg-white/95 backdrop-blur p-6 rounded-3xl shadow-lg h-fit">
          <h3 className="text-sm font-semibold mb-3">Completed Tasks</h3>

          <div className="space-y-4">
            {tasks.filter((t) => t.completed).map((task) => (
              <div
                key={task.id}
                className="p-4 rounded-xl bg-green-50 shadow-sm border border-green-100"
              >
                <p className="font-medium line-through text-slate-500">{task.title}</p>
                <p className="text-xs text-green-700 mt-1">
                  {task.type} • Completed
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}









   // =============================
// REPORTS & ANALYTICS PAGE
// =============================




if (activeTab === "reports") {
  return (
    <div className="space-y-10">

      {/* TOP KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Patients (This Month)", value: 420 },
          { label: "Avg Session Duration", value: "32 min" },
          { label: "Monthly Revenue", value: "₹48,200" },
          { label: "Returning Patients", value: "64%" },
        ].map((kpi) => (
          <div
            key={kpi.label}
            className="bg-white/90 backdrop-blur p-6 rounded-2xl shadow-md"
          >
            <p className="text-xs text-slate-500">{kpi.label}</p>
            <p className="text-2xl font-semibold text-slate-800 mt-2">
              {kpi.value}
            </p>
          </div>
        ))}
      </div>

      {/* MONTHLY PATIENT GROWTH */}
      <div className="bg-white/95 backdrop-blur p-6 rounded-3xl shadow-lg">
        <h3 className="text-sm font-semibold mb-4">Monthly Patient Growth</h3>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={[
              { month: "Jan", patients: 120 },
              { month: "Feb", patients: 160 },
              { month: "Mar", patients: 180 },
              { month: "Apr", patients: 150 },
              { month: "May", patients: 210 },
              { month: "Jun", patients: 250 },
            ]}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.25} />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              dataKey="patients"
              stroke="#059669"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* REVENUE PER THERAPY */}
      <div className="bg-white/95 backdrop-blur p-6 rounded-3xl shadow-lg">
        <h3 className="text-sm font-semibold mb-4">
          Revenue Per Therapy (This Month)
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={[
              { therapy: "Nasya", revenue: 8000 },
              { therapy: "Shirodhara", revenue: 12000 },
              { therapy: "Abhyanga", revenue: 15000 },
              { therapy: "Kati Basti", revenue: 13000 },
            ]}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.25} />
            <XAxis dataKey="therapy" />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="revenue"
              fill="#10b981"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* SESSION LOAD AREA CHART */}
      <div className="bg-white/95 backdrop-blur p-6 rounded-3xl shadow-lg">
        <h3 className="text-sm font-semibold mb-4">Session Load (30 Days)</h3>

        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={[
              { day: 1, sessions: 18 },
              { day: 5, sessions: 30 },
              { day: 10, sessions: 50 },
              { day: 15, sessions: 45 },
              { day: 20, sessions: 60 },
              { day: 25, sessions: 40 },
              { day: 30, sessions: 55 },
            ]}
          >
            <defs>
              <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#34d399" stopOpacity={0.7} />
                <stop offset="100%" stopColor="#34d399" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" opacity={0.25} />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Area
              dataKey="sessions"
              stroke="#059669"
              strokeWidth={3}
              fill="url(#areaFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* PIE CHART - AGE DEMOGRAPHICS */}
      <div className="bg-white/95 backdrop-blur p-6 rounded-3xl shadow-lg">
        <h3 className="text-sm font-semibold mb-4">Patient Age Demographics</h3>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={[
                { name: "18–25", value: 20 },
                { name: "26–40", value: 35 },
                { name: "41–60", value: 30 },
                { name: "60+", value: 15 },
              ]}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="value"
              label
            >
              <Cell fill="#10b981" />
              <Cell fill="#34d399" />
              <Cell fill="#6ee7b7" />
              <Cell fill="#2dd4bf" />
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* RADAR - THERAPY SATISFACTION */}
      <div className="bg-white/95 backdrop-blur p-6 rounded-3xl shadow-lg">
        <h3 className="text-sm font-semibold mb-4">Therapy Satisfaction Score</h3>

        <ResponsiveContainer width="100%" height={300}>
          <RadarChart
            data={[
              { therapy: "Nasya", score: 82 },
              { therapy: "Shirodhara", score: 95 },
              { therapy: "Abhyanga", score: 90 },
              { therapy: "Kati Basti", score: 88 },
            ]}
          >
            <PolarGrid />
            <PolarAngleAxis dataKey="therapy" />
            <PolarRadiusAxis angle={30} domain={[0, 100]} />
            <Radar
              dataKey="score"
              fill="#10b981"
              stroke="#059669"
              fillOpacity={0.5}
            />
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}











    // ==========================================
// PROFILE PAGE
// ==========================================





if (activeTab === "profile") {
  return (
    <div className="max-w-4xl mx-auto space-y-8">

      {/* TOP PROFILE CARD */}
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg p-8 flex gap-8 items-center">

        {/* DOCTOR IMAGE */}
        <div className="h-32 w-32 rounded-2xl overflow-hidden shadow-md">
          <img
            src="https://res.cloudinary.com/dnjeghqw0/image/upload/v1765189068/doctor_profiles/knvqsmnh50eqrhmvao1l.jpg"
            alt="Doctor"
            className="h-full w-full object-cover"
          />
        </div>

        {/* INFO */}
        <div>
          <h2 className="text-2xl font-semibold text-slate-800">Dr. Ravi Bhatt</h2>
          <p className="text-slate-600 text-sm">
            BAMS, MD (Ayurveda) — Ayurveda Physician
          </p>

          <p className="mt-2 text-sm text-slate-500 leading-relaxed max-w-xl">
            Expert in Panchakarma with a focus on chronic pain management, detox therapies,
            and holistic healing. Practicing at Himalayan Bliss Ayurveda Retreat for 5+ years.
          </p>

          <div className="flex gap-3 mt-4 text-xs">
            <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full">
              Experience: 5 Years
            </span>

            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
              Speciality: Panchakarma
            </span>
          </div>
        </div>
      </div>


      {/* CENTER DETAILS CARD */}
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg p-8">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">
          Center Details
        </h3>

        <div className="space-y-2 text-sm text-slate-600">
          <p><strong>Center Name:</strong> Himalayan Bliss Ayurveda Retreat</p>
          <p><strong>Type:</strong> Government · Certified Center</p>
          <p><strong>Rating:</strong> 4.5 ★</p>
          <p><strong>City:</strong> Dehradun</p>
          <p><strong>Address:</strong> Rajpur Road, Near Pacific Hills, Dehradun – 248001</p>
          <p><strong>Timings:</strong> Morning 09:00–02:00 · Evening 15:00–21:00</p>
        </div>
      </div>

      {/* CONTACT BLOCK */}
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Contact Information</h3>

        <div className="space-y-2 text-sm text-slate-600">
          <p><strong>Email:</strong> dr.ravi@ayursutra.com</p>
          <p><strong>Phone:</strong> +91 98765 43210</p>
        </div>
      </div>

    </div>
  );
}



// =============================
// SETTINGS PAGE
// =============================
if (activeTab === "settings") {
  return (
    <div className="max-w-3xl mx-auto space-y-10">

      {/* ACCOUNT SETTINGS */}
      <div className="bg-white/90 backdrop-blur-sm p-6 rounded-3xl shadow-lg">
        <h2 className="text-lg font-semibold text-slate-800">Account Settings</h2>
        <p className="text-xs text-slate-500 mb-6">Manage your profile information</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          <div>
            <label className="text-xs text-slate-600">Full Name</label>
            <input
              className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-100 focus:outline-none"
              defaultValue="Dr. Ravi Bhatt"
            />
          </div>

          <div>
            <label className="text-xs text-slate-600">Email</label>
            <input
              className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-100 focus:outline-none"
              defaultValue="dr.ravi@ayursutra.com"
            />
          </div>

          <div>
            <label className="text-xs text-slate-600">Phone</label>
            <input
              className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-100 focus:outline-none"
              defaultValue="+91 98765 43210"
            />
          </div>

          <div>
            <label className="text-xs text-slate-600">Speciality</label>
            <input
              className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-100 focus:outline-none"
              defaultValue="Ayurveda Physician"
            />
          </div>

        </div>

        <button className="mt-6 bg-emerald-600 text-white px-6 py-2 rounded-xl hover:bg-emerald-700 transition">
          Save Changes
        </button>
      </div>

      {/* PASSWORD CHANGE */}
      <div className="bg-white/90 backdrop-blur-sm p-6 rounded-3xl shadow-lg">
        <h2 className="text-lg font-semibold text-slate-800">Change Password</h2>
        <p className="text-xs text-slate-500 mb-6">Update your login security</p>

        <div className="space-y-4">
          <div>
            <label className="text-xs text-slate-600">Current Password</label>
            <input
              type="password"
              className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-100"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="text-xs text-slate-600">New Password</label>
            <input
              type="password"
              className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-100"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="text-xs text-slate-600">Confirm New Password</label>
            <input
              type="password"
              className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-100"
              placeholder="••••••••"
            />
          </div>
        </div>

        <button className="mt-6 bg-emerald-600 text-white px-6 py-2 rounded-xl hover:bg-emerald-700 transition">
          Update Password
        </button>
      </div>

      {/* NOTIFICATION SETTINGS */}
      <div className="bg-white/90 backdrop-blur-sm p-6 rounded-3xl shadow-lg">
        <h2 className="text-lg font-semibold text-slate-800">Notification Preferences</h2>
        <p className="text-xs text-slate-500 mb-6">Choose how you receive updates</p>

        <div className="space-y-3">

          <label className="flex items-center justify-between bg-slate-100 px-4 py-3 rounded-xl">
            <span className="text-sm text-slate-700">Appointment Alerts</span>
            <input type="checkbox" className="toggle-checkbox" defaultChecked />
          </label>

          <label className="flex items-center justify-between bg-slate-100 px-4 py-3 rounded-xl">
            <span className="text-sm text-slate-700">Patient Follow-up Reminders</span>
            <input type="checkbox" className="toggle-checkbox" defaultChecked />
          </label>

          <label className="flex items-center justify-between bg-slate-100 px-4 py-3 rounded-xl">
            <span className="text-sm text-slate-700">Therapy Session Notifications</span>
            <input type="checkbox" className="toggle-checkbox" />
          </label>

        </div>
      </div>

      {/* CLINIC PREFERENCES */}
      <div className="bg-white/90 backdrop-blur-sm p-6 rounded-3xl shadow-lg">
        <h2 className="text-lg font-semibold text-slate-800">Clinic Preferences</h2>
        <p className="text-xs text-slate-500 mb-6">Customize your workflow</p>

        <div className="space-y-4">

          <label className="flex items-center justify-between bg-slate-100 px-4 py-3 rounded-xl">
            <span className="text-sm text-slate-700">Auto-assign Token Numbers</span>
            <input type="checkbox" defaultChecked />
          </label>

          <label className="flex items-center justify-between bg-slate-100 px-4 py-3 rounded-xl">
            <span className="text-sm text-slate-700">Enable Digital Prescriptions</span>
            <input type="checkbox" />
          </label>

          <label className="flex items-center justify-between bg-slate-100 px-4 py-3 rounded-xl">
            <span className="text-sm text-slate-700">Auto-send Follow-up Messages</span>
            <input type="checkbox" defaultChecked />
          </label>

        </div>
      </div>

    </div>
  );
}







// default for pages not implemented yet
if (activeTab !== "dashboard") {
  return (
    <div className="p-10 text-center text-slate-500">
      <h2 className="text-xl font-semibold">{activeTab} Page Coming Soon…</h2>
    </div>
  );
}


    return (
      <>
        {/* HERO */}
        <section className="bg-gradient-to-r from-emerald-700 to-emerald-600 text-white rounded-3xl p-10 shadow-xl">
          <h1 className="text-3xl font-semibold">Welcome back, Dr. Ravi Bhatt</h1>
          <p className="text-sm mt-2 opacity-80">
            Managing patients at Himalayan Bliss Ayurveda Retreat
          </p>

          <div className="flex gap-3 mt-4 text-xs">
            <span className="bg-white/20 px-3 py-1 rounded-full">Government · Certified Center</span>
            <span className="bg-white/20 px-3 py-1 rounded-full">Rating: 4.5 ★</span>
            <span className="bg-white/20 px-3 py-1 rounded-full">Dehradun</span>
          </div>
        </section>

        {/* STATS */}
        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">

          {/* Next Appointment */}
          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-md hover:shadow-lg transition">
            <p className="text-xs text-slate-500">Next Appointment</p>
            <p className="text-lg font-semibold mt-2">{nextAppointment.patientDetails.name}</p>
            <p className="text-xs text-slate-500">
              {formatDate(nextAppointment.appointmentDetails.appointmentDate)} ·{" "}
              {nextAppointment.appointmentDetails.appointmentSlot}
            </p>
          </div>

          {/* Sessions Today */}
          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-md hover:shadow-lg transition">
            <p className="text-xs text-slate-500">Sessions Today</p>
            <p className="text-3xl font-semibold">{todayAppointments.length}</p>
          </div>

          {/* Treatment Progress */}
          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-md hover:shadow-lg transition">
            <p className="text-xs text-slate-500">Treatment Progress</p>
            <p className="text-xl font-semibold">42%</p>
            <div className="w-full h-2 bg-slate-200 rounded-full mt-2">
              <div className="h-full bg-emerald-600 rounded-full" style={{ width: "42%" }} />
            </div>
          </div>

          {/* Clinic Score */}
          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-md hover:shadow-lg transition">
            <p className="text-xs text-slate-500">Clinic Score</p>
            <p className="text-3xl font-semibold text-emerald-600">9.2</p>
          </div>
        </section>

        {/* APPOINTMENTS TABLE + TODAY SECTION */}
        <section className="mt-8 grid grid-cols-1 xl:grid-cols-3 gap-6">

          {/* TABLE */}
          {/* <div className="xl:col-span-2 bg-white/95 backdrop-blur p-6 rounded-3xl shadow-lg overflow-x-auto">
            <h3 className="font-semibold text-sm mb-4">Upcoming Appointments</h3>

            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-slate-500 border-b border-slate-200">
                  <th className="py-2 text-left">Patient</th>
                  <th className="py-2 text-left">Date</th>
                  <th className="py-2 text-left">Slot</th>
                  <th className="py-2 text-left">Service</th>
                  <th className="py-2 text-left">Token</th>
                  <th className="py-2 text-left">Status</th>
                </tr>
              </thead>

              <tbody>
                {appointments.map((a) => (
                  <tr
                    key={a.id}
                    className="border-b border-slate-100 hover:bg-slate-50/60 transition"
                  >
                    <td className="py-3">{a.patientDetails.name}</td>
                    <td className="py-3">{formatDate(a.appointmentDetails.appointmentDate)}</td>
                    <td className="py-3">{a.appointmentDetails.appointmentSlot}</td>
                    <td className="py-3">{a.appointmentDetails.ServiceType}</td>
                    <td className="py-3">{a.appointmentDetails.tokenNumber}</td>
                    <td className="py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${statusChipClasses(
                          a.appointmentDetails.status
                        )}`}
                      >
                        {a.appointmentDetails.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div> */}

          {/* TODAY */}
          {/* <div className="bg-white/95 backdrop-blur p-6 rounded-3xl shadow-lg">
            <h3 className="font-semibold text-sm mb-3">Today's Appointments</h3>

            {todayAppointments.length === 0 ? (
              <p className="text-slate-400 text-sm">No appointments today.</p>
            ) : (
              <div className="space-y-3">
                {todayAppointments.map((a) => (
                  <div key={a.id} className="rounded-xl p-4 bg-white/90 shadow hover:shadow-md transition">
                    <p className="font-semibold">{a.patientDetails.name}</p>
                    <p className="text-xs text-slate-500">
                      {a.appointmentDetails.appointmentSlot} · {a.appointmentDetails.ServiceType}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div> */}
        </section>



        {/* CHARTS SECTION */}
<section className="mt-8 grid grid-cols-1 xl:grid-cols-3 gap-6">

  {/* WEEKLY BAR CHART */}
  <div className="xl:col-span-2 bg-white/95 backdrop-blur p-6 rounded-3xl shadow-lg">
    <h3 className="font-semibold text-sm mb-4">Weekly Sessions Overview</h3>

    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={[
        { day: "Mon", sessions: 8 },
        { day: "Tue", sessions: 12 },
        { day: "Wed", sessions: 5 },
        { day: "Thu", sessions: 10 },
        { day: "Fri", sessions: 7 },
        { day: "Sat", sessions: 4 },
        { day: "Sun", sessions: 0 },
      ]}>
        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="sessions" fill="#059669" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </div>

  {/* THERAPY DISTRIBUTION PIE CHART */}
  <div className="bg-white/95 backdrop-blur p-6 rounded-3xl shadow-lg">
    <h3 className="font-semibold text-sm mb-4">Therapy Distribution</h3>

    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie
          data={[
            { name: "Nasya", value: 30 },
            { name: "Shirodhara", value: 20 },
            { name: "Abhyanga", value: 25 },
            { name: "Kati Basti", value: 25 },
          ]}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#059669"
          dataKey="value"
          label
        >
          <Cell fill="#34d399" />
          <Cell fill="#10b981" />
          <Cell fill="#6ee7b7" />
          <Cell fill="#2dd4bf" />
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  </div>

</section>



      </>
    );
  };


  // ==========================================
  // MAIN LAYOUT
  // ==========================================
  return (
  <div className="flex h-screen overflow-hidden bg-slate-50">

    {/* SIDEBAR — NEVER SCROLLS */}
    <aside className="hidden lg:flex flex-col w-64 bg-white shadow-sm h-screen overflow-hidden flex-shrink-0">

      <div className="h-16 flex items-center px-6 border-b border-slate-200">
        <span className="text-2xl font-semibold text-emerald-700">AyurSutra</span>
      </div>

      {/* FIXED MENU — NO SCROLLING */}
      <nav className="flex flex-col px-4 py-4 gap-1">
        {sidebarItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition
              ${
                activeTab === item.id
                  ? "bg-emerald-50 text-emerald-700 shadow-sm"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
          >
            {/* Active indicator */}
            {activeTab === item.id && (
              <div className="absolute left-0 h-full w-1 bg-emerald-600 rounded-r"></div>
            )}

            {item.icon}
            {item.label}

            {item.badge && (
              <span className="ml-auto text-[10px] px-2 py-0.5 bg-rose-100 text-rose-600 rounded-full">
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </nav>

      <div className="mt-auto p-4 text-xs text-slate-500 border-t border-slate-200">
        © {new Date().getFullYear()} AyurSutra
      </div>
    </aside>

    {/* MAIN AREA — ONLY THIS SCROLLS */}
    <div className="flex-1 flex flex-col overflow-hidden">

      {/* FIXED TOP BAR */}
      <header className="h-16 bg-white flex items-center justify-between px-6 border-b border-slate-200 flex-shrink-0">
        <h1 className="text-lg font-semibold">Practitioner Dashboard</h1>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="font-semibold leading-tight">Dr. Ravi Bhatt</p>
            <p className="text-xs text-slate-500 leading-tight">Practitioner</p>
          </div>

          <div className="h-10 w-10 rounded-full bg-emerald-200 flex items-center justify-center font-semibold text-emerald-700">
            RB
          </div>
        </div>
      </header>

      {/* SCROLLABLE PAGE CONTENT */}
      <main className="flex-1 overflow-y-auto p-6">
        {renderPage()}
      </main>

    </div>

  </div>
);

};

export default DoctorDashboard;
