// DoctorDashboard.jsx
import React, { useState } from "react";

const DoctorDashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [selectedPatient, setSelectedPatient] = useState(null);

  const stats = {
    todayPatients: 8,
    ongoingTherapies: 5,
    pendingFeedback: 3,
    criticalAlerts: 1,
  };

  const patients = [
    {
      id: "P001",
      name: "Rahul Sharma",
      centerName: "AyurSutra Wellness, Nagpur",
      todaySlotTime: "10:30 AM",
      status: "In Therapy",
      chiefComplaint: "Chronic low back pain",
      ageGender: "38 · M",
      prakriti: "Vata‑Pitta",
      diagnosis: "Gridhrasi with Vata aggravation",
      previousTherapiesSummary: "Abhyanga + Swedana (3 days)",
      currentPlanSummary: "Basti course + lifestyle correction",
    },
    {
      id: "P002",
      name: "Anita Verma",
      centerName: "AyurSutra Wellness, Nagpur",
      todaySlotTime: "12:00 PM",
      status: "Scheduled",
      chiefComplaint: "Migraine with acidity",
      ageGender: "31 · F",
      prakriti: "Pitta‑Kapha",
      diagnosis: "Ardhavabhedaka with Amla‑pitta",
      previousTherapiesSummary: "—",
      currentPlanSummary: "Nasya + lifestyle correction",
    },
  ];

  const appointmentsToday = patients.map((p, index) => ({
    ...p,
    room: index === 0 ? "Therapy Room 1" : "Therapy Room 2",
    therapist: index === 0 ? "Therapist Kavya" : "Therapist Rohan",
  }));

  const messages = [
    {
      id: 1,
      from: "patient",
      text: "Doctor, can I continue my regular yoga during this therapy?",
      timeLabel: "09:12",
    },
    {
      id: 2,
      from: "doctor",
      text: "Yes, but avoid intense back‑bending postures on therapy days.",
      timeLabel: "09:20",
    },
  ];

  const feedbackItems = [
    {
      id: "F001",
      patientName: "Rahul Sharma",
      dateLabel: "Mar 10",
      score: 4.5,
      comment: "Back pain is much better after 3 sessions.",
    },
    {
      id: "F002",
      patientName: "Anita Verma",
      dateLabel: "Mar 11",
      score: 4.0,
      comment: "Migraine frequency reduced, acidity persists slightly.",
    },
  ];

  const currentPatient =
    selectedPatient || (patients.length > 0 ? patients[0] : null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-100/60 flex">
      {/* Sidebar */}
      <Sidebar activeSection={activeSection} onChange={setActiveSection} />

      {/* Main content */}
      <main className="flex-1 flex flex-col">
        <TopBar />

        <div className="flex-1 overflow-y-auto px-4 md:px-8 py-5">
          <div className="max-w-6xl mx-auto space-y-6">
            {activeSection === "dashboard" && (
              <DashboardHome
                stats={stats}
                patients={patients}
                currentPatient={currentPatient}
                setSelectedPatient={setSelectedPatient}
                messages={messages}
              />
            )}

            {activeSection === "appointments" && (
              <TodayAppointments appointments={appointmentsToday} />
            )}

            {activeSection === "patients" && (
              <MyPatients
                patients={patients}
                setSelectedPatient={setSelectedPatient}
              />
            )}

            {activeSection === "therapies" && (
              <TherapiesSection currentPatient={currentPatient} />
            )}

            {activeSection === "prescriptions" && (
              <PrescriptionsSection currentPatient={currentPatient} />
            )}

            {activeSection === "feedback" && (
              <FeedbackSection feedbackItems={feedbackItems} />
            )}

            {activeSection === "messages" && (
              <MessagesSection messages={messages} />
            )}

            {activeSection === "settings" && <SettingsSection />}
          </div>
        </div>
      </main>
    </div>
  );
};

/* ========== SIDEBAR ========== */

const Sidebar = ({ activeSection, onChange }) => {
  const items = [
    { key: "dashboard", label: "Dashboard" },
    { key: "appointments", label: "Today’s Appointments" },
    { key: "patients", label: "My Patients" },
    { key: "therapies", label: "Therapies" },
    { key: "prescriptions", label: "Prescriptions" },
    { key: "feedback", label: "Feedback & Outcomes" },
    { key: "messages", label: "Messages" },
    { key: "settings", label: "Settings" },
  ];

  return (
    <aside className="hidden md:flex md:flex-col w-64 bg-white/90 backdrop-blur border-r border-emerald-100 shadow-[0_8px_30px_rgba(15,118,110,0.08)]">
      <div className="flex items-center gap-2 px-5 py-4 border-b border-emerald-100">
        {/* <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#1E4B3C] to-emerald-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
          A
        </div> */}
        <span className="text-lg font-extrabold text-[#1E4B3C] tracking-tight">
          Doctor's Dashboard
        </span>
      </div>
      <nav className="flex-1 px-3 py-4 text-xs text-gray-700 space-y-1">
        {items.map((item) => (
          <SidebarItem
            key={item.key}
            label={item.label}
            active={activeSection === item.key}
            onClick={() => onChange(item.key)}
          />
        ))}
      </nav>
      <div className="px-4 py-4 border-t border-emerald-100 text-[11px] text-gray-500">
        © {new Date().getFullYear()} AyurSutra
      </div>
    </aside>
  );
};

const SidebarItem = ({ label, active, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex items-center gap-3 w-full rounded-xl px-3 py-2 transition-all ${
      active
        ? "bg-gradient-to-r from-emerald-50 to-emerald-100 text-[#1E4B3C] font-semibold shadow-sm"
        : "text-gray-700 hover:bg-emerald-50"
    }`}
  >
    <span
      className={`h-6 w-6 rounded-xl flex items-center justify-center text-[11px] ${
        active
          ? "bg-[#1E4B3C] text-white shadow"
          : "bg-emerald-50 text-[#1E4B3C]"
      }`}
    >
      •
    </span>
    <span>{label}</span>
  </button>
);

/* ========== TOP BAR ========== */

const TopBar = () => (
  <header className="flex items-center justify-between px-4 md:px-8 py-3 bg-white/90 backdrop-blur border-b border-emerald-100 shadow-sm">
    {/* <div>
      <p className="text-[11px] text-emerald-700 font-medium">Doctor Portal</p>
      <h1 className="text-base md:text-lg font-semibold text-[#1E4B3C]">
        Welcome back, Dr. Meera!
      </h1>
    </div>
    <div className="flex items-center gap-3">
      <button className="relative h-9 w-9 rounded-full bg-emerald-50 flex items-center justify-center text-[#1E4B3C] shadow-sm">
        <span className="absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full bg-red-500 text-[9px] text-white flex items-center justify-center">
          3
        </span>
        <svg
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      </button>
      <div className="flex items-center gap-2">
        <div className="text-right">
          <p className="text-xs font-semibold text-gray-800">
            Dr. Meera Joshi
          </p>
          <p className="text-[10px] text-gray-500">Panchakarma Specialist</p>
        </div>
        <div className="h-9 w-9 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-white flex items-center justify-center text-sm font-semibold shadow-md">
          MJ
        </div>
      </div>
    </div> */}
  </header>
);

/* ========== DASHBOARD HOME ========== */

const DashboardHome = ({
  stats,
  patients,
  currentPatient,
  setSelectedPatient,
  messages,
}) => (
  <div className="space-y-6">
    <HeroBanner />

    <section className="grid gap-4 md:grid-cols-4">
      <StatCard
        label="Today’s Patients"
        value={stats.todayPatients}
        subtitle="+2 vs last week"
      />
      <StatCard
        label="Ongoing Therapies"
        value={stats.ongoingTherapies}
        subtitle="Across all rooms"
      />
      <StatCard
        label="Pending Feedback"
        value={stats.pendingFeedback}
        subtitle="Awaiting patient input"
      />
      <StatCard
        label="Active Alerts"
        value={stats.criticalAlerts}
        subtitle="Pain / adverse events"
        alert
      />
    </section>

    <section className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-5">
        <AssignedPatientsCard
          patients={patients}
          currentPatient={currentPatient}
          onSelectPatient={setSelectedPatient}
        />
        <ClinicalAndSchedulerCard currentPatient={currentPatient} />
      </div>

      <div className="space-y-5">
        <ProgressSnapshotCard />
        <InstructionCard />
        <MessagesMiniCard messages={messages} />
        <PerformanceCard />
      </div>
    </section>
  </div>
);

/* ========== HERO BANNER ========== */

const HeroBanner = () => (
  <section className="relative rounded-3xl overflow-hidden bg-[#1E4B3C] text-emerald-50 min-h-[170px] flex items-stretch shadow-[0_16px_40px_rgba(15,118,110,0.35)]">
    <div className="absolute inset-0 bg-[url('/images/ayur-hero.jpg')] bg-cover bg-center opacity-40" />
    <div className="absolute inset-0 bg-gradient-to-r from-[#1E4B3C] via-[#1E4B3C]/80 to-transparent" />
    <div className="relative z-10 flex-1 px-6 py-5 md:px-8 md:py-6 flex flex-col justify-between">
      <div>
        <p className="text-[11px] uppercase tracking-[0.26em] text-emerald-100/90">
          DOCTOR DASHBOARD
        </p>
        <h2 className="mt-1 text-2xl md:text-3xl font-extrabold tracking-tight">
          Today’s Panchakarma rounds.
        </h2>
        <p className="mt-2 text-xs md:text-sm text-emerald-50/90 max-w-xl">
          Quickly scan today’s caseload, therapy status, and alerts so that each
          patient receives safe, consistent Ayurvedic care.
        </p>
      </div>
      <div className="mt-3 flex flex-wrap gap-3 text-[11px]">
        <span className="inline-flex items-center rounded-full bg-emerald-900/60 px-3 py-1 backdrop-blur">
          <span className="h-2 w-2 rounded-full bg-emerald-300 mr-2" />
          Clinic status: Online
        </span>
        <span className="inline-flex items-center rounded-full bg-emerald-900/40 px-3 py-1 backdrop-blur">
          First appointment at 9:30 AM · 8 patients today
        </span>
      </div>
    </div>
  </section>
);

/* ========== SHARED SMALL COMPONENTS ========== */

const StatCard = ({ label, value, subtitle, alert }) => (
  <div
    className={`rounded-3xl border p-4 shadow-sm bg-white/90 backdrop-blur ${
      alert ? "border-red-200" : "border-emerald-100"
    }`}
  >
    <p
      className={`text-xs font-semibold tracking-wide ${
        alert ? "text-red-700" : "text-emerald-900"
      }`}
    >
      {label}
    </p>
    <p
      className={`mt-2 text-2xl font-bold ${
        alert ? "text-red-700" : "text-[#1E4B3C]"
      }`}
    >
      {value}
    </p>
    <p className="mt-1 text-[11px] text-gray-500">{subtitle}</p>
  </div>
);

/* ========== ASSIGNED PATIENTS ========== */

const AssignedPatientsCard = ({ patients, currentPatient, onSelectPatient }) => (
  <div className="rounded-3xl bg-white/90 backdrop-blur border border-emerald-100 shadow-[0_12px_30px_rgba(15,118,110,0.12)] p-4">
    <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
      <div>
        <h3 className="text-sm font-semibold text-[#1E4B3C]">
          Today’s Assigned Patients
        </h3>
        <p className="text-[11px] text-gray-500">
          Only patients mapped to your doctor ID at this center are visible.
        </p>
      </div>
      <div className="flex gap-2 text-[11px]">
        <input
          type="text"
          placeholder="Search patient"
          className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 outline-none focus:border-[#1E4B3C] focus:bg-white focus:ring-1 focus:ring-[#1E4B3C]"
        />
        <select className="rounded-full border border-gray-200 bg-gray-50 px-2 py-1.5 outline-none focus:border-[#1E4B3C] focus:bg-white focus:ring-1 focus:ring-[#1E4B3C]">
          <option>Today</option>
          <option>All</option>
        </select>
      </div>
    </div>

    <div className="mt-3 overflow-x-auto">
      <table className="min-w-full text-left text-[11px]">
        <thead>
          <tr className="border-b border-emerald-100 bg-emerald-50/70 text-emerald-900">
            <th className="px-3 py-2 font-semibold">Patient</th>
            <th className="px-3 py-2 font-semibold">Slot</th>
            <th className="px-3 py-2 font-semibold">Status</th>
            <th className="px-3 py-2 font-semibold">Complaint</th>
            <th className="px-3 py-2 font-semibold">Action</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((p) => (
            <tr
              key={p.id}
              className={`border-b last:border-b-0 transition-colors ${
                currentPatient?.id === p.id
                  ? "bg-emerald-50"
                  : "hover:bg-emerald-50/60"
              }`}
            >
              <td className="px-3 py-2">
                <div className="font-semibold text-gray-900">{p.name}</div>
                <div className="text-[10px] text-gray-500">{p.centerName}</div>
              </td>
              <td className="px-3 py-2 text-gray-700">{p.todaySlotTime}</td>
              <td className="px-3 py-2">
                <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] text-emerald-800 border border-emerald-100">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mr-1" />
                  {p.status}
                </span>
              </td>
              <td className="px-3 py-2 text-gray-700">{p.chiefComplaint}</td>
              <td className="px-3 py-2">
                <button
                  type="button"
                  onClick={() => onSelectPatient(p)}
                  className="rounded-full bg-[#1E4B3C] px-3 py-1 text-[10px] font-semibold text-white hover:bg-emerald-800 shadow-sm"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
          {patients.length === 0 && (
            <tr>
              <td
                colSpan={5}
                className="px-3 py-4 text-center text-gray-500 text-xs"
              >
                No assigned patients today.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);

/* ========== CLINICAL + SCHEDULER ========== */

const ClinicalAndSchedulerCard = ({ currentPatient }) => (
  <div className="space-y-4">
    <div className="rounded-3xl bg-white/90 backdrop-blur border border-emerald-100 shadow-sm p-4">
      <h3 className="text-sm font-semibold text-[#1E4B3C] mb-2">
        Clinical Profile · {currentPatient?.name || "Select patient"}
      </h3>
      {currentPatient ? (
        <div className="grid gap-3 md:grid-cols-3 text-[11px]">
          <div>
            <p className="font-semibold text-emerald-900 mb-1">Basics</p>
            <p className="text-gray-700">ID: {currentPatient.id}</p>
            <p className="text-gray-700">
              Age / Gender: {currentPatient.ageGender}
            </p>
            <p className="text-gray-700">
              Center: {currentPatient.centerName}
            </p>
          </div>
          <div>
            <p className="font-semibold text-emerald-900 mb-1">
              Prakriti & Diagnosis
            </p>
            <p className="text-gray-700">
              Prakriti: {currentPatient.prakriti}
            </p>
            <p className="text-gray-700">
              Diagnosis: {currentPatient.diagnosis}
            </p>
          </div>
          <div>
            <p className="font-semibold text-emerald-900 mb-1">
              Panchakarma Summary
            </p>
            <p className="text-gray-700">
              Previous: {currentPatient.previousTherapiesSummary}
            </p>
            <p className="text-gray-700">
              Current plan: {currentPatient.currentPlanSummary}
            </p>
          </div>
        </div>
      ) : (
        <p className="text-[11px] text-gray-500">
          Select a patient from the list to view clinical details.
        </p>
      )}
    </div>

    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-3xl bg-white/90 backdrop-blur border border-emerald-100 p-4">
        <h3 className="text-xs md:text-sm font-semibold text-[#1E4B3C] mb-2">
          Schedule / Modify Therapies
        </h3>
        <form className="grid gap-2 text-[11px]">
          <input
            type="text"
            placeholder="Therapy name (e.g. Kati Basti)"
            className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 outline-none focus:border-[#1E4B3C] focus:bg-white focus:ring-1 focus:ring-[#1E4B3C]"
          />
          <div className="grid grid-cols-2 gap-2">
            <input
              type="date"
              className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 outline-none focus:border-[#1E4B3C] focus:bg-white focus:ring-1 focus:ring-[#1E4B3C]"
            />
            <input
              type="time"
              className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 outline-none focus:border-[#1E4B3C] focus:bg-white focus:ring-1 focus:ring-[#1E4B3C]"
            />
          </div>
          <button
            type="submit"
            className="mt-1 rounded-xl bg-[#1E4B3C] px-3 py-2 text-[11px] font-semibold text-white hover:bg-emerald-800 shadow-sm"
          >
            Save Slot (Audit Logged)
          </button>
        </form>
      </div>

      <div className="rounded-3xl bg-white/90 backdrop-blur border border-emerald-100 p-4">
        <h3 className="text-xs md:text-sm font-semibold text-[#1E4B3C] mb-2">
          Quick Prescription
        </h3>
        <div className="grid gap-2 text-[11px]">
          <textarea
            placeholder="Medicines, dose & duration"
            className="h-16 rounded-2xl border border-gray-200 bg-gray-50 px-3 py-2 outline-none focus:border-[#1E4B3C] focus:bg-white focus:ring-1 focus:ring-[#1E4B3C]"
          />
          <textarea
            placeholder="Diet & lifestyle key points"
            className="h-16 rounded-2xl border border-gray-200 bg-gray-50 px-3 py-2 outline-none focus:border-[#1E4B3C] focus:bg-white focus:ring-1 focus:ring-[#1E4B3C]"
          />
          <button
            type="button"
            className="mt-1 rounded-full bg-[#1E4B3C] px-3 py-1.5 text-[11px] font-semibold text-white hover:bg-emerald-800 shadow-sm"
          >
            Save Prescription
          </button>
        </div>
      </div>
    </div>
  </div>
);

/* ========== RIGHT-SIDE CARDS (PROGRESS / INSTRUCTIONS / MESSAGES / PERFORMANCE) ========== */

const ProgressSnapshotCard = () => (
  <div className="rounded-3xl bg-white/90 backdrop-blur border border-emerald-100 p-4 shadow-sm">
    <h3 className="text-xs md:text-sm font-semibold text-[#1E4B3C] mb-2">
      Therapy Progress Snapshot
    </h3>
    <div className="space-y-2 text-[11px] text-gray-700">
      <p>Pain score trend: improving (8 → 4)</p>
      <p>Sleep quality: better over last 3 sessions</p>
      <p>Energy: mild improvement</p>
      <p className="text-red-700 font-semibold">Alerts: None active</p>
    </div>
  </div>
);

const InstructionCard = () => (
  <div className="rounded-3xl bg-emerald-50/80 border border-emerald-100 p-4 shadow-sm">
    <h3 className="text-xs md:text-sm font-semibold text-[#1E4B3C] mb-2">
      Pre‑ / Post‑Procedure Instructions
    </h3>
    <textarea
      placeholder="Key instructions to be shared with patient. These will be sent via app / SMS / email."
      className="h-20 w-full rounded-2xl border border-emerald-100 bg-emerald-50 px-3 py-2 text-[11px] outline-none focus:border-[#1E4B3C] focus:bg-white focus:ring-1 focus:ring-[#1E4B3C]"
    />
    <button
      type="button"
      className="mt-2 rounded-full bg-[#1E4B3C] px-4 py-1.5 text-[11px] font-semibold text-white hover:bg-emerald-800 shadow-sm"
    >
      Save & Notify
    </button>
  </div>
);

const MessagesMiniCard = ({ messages }) => (
  <div className="rounded-3xl bg-white/90 backdrop-blur border border-emerald-100 p-4 shadow-sm">
    <h3 className="text-xs md:text-sm font-semibold text-[#1E4B3C] mb-2">
      Patient Messages
    </h3>
    <div className="h-28 overflow-y-auto space-y-2 text-[11px]">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`max-w-xs rounded-2xl px-3 py-2 ${
            msg.from === "doctor"
              ? "bg-[#1E4B3C] text-emerald-50 ml-auto"
              : "bg-emerald-50 border border-emerald-100 text-gray-800 mr-auto"
          }`}
        >
          <p>{msg.text}</p>
          <p className="mt-1 text-[9px] text-right opacity-70">
            {msg.timeLabel}
          </p>
        </div>
      ))}
    </div>
    <div className="mt-2 flex gap-2 text-[11px]">
      <input
        type="text"
        placeholder="Type a reply…"
        className="flex-1 rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 outline-none focus:border-[#1E4B3C] focus:bg-white focus:ring-1 focus:ring-[#1E4B3C]"
      />
      <button
        type="button"
        className="rounded-full bg-[#1E4B3C] px-4 py-1.5 font-semibold text-white hover:bg-emerald-800 shadow-sm"
      >
        Send
      </button>
    </div>
  </div>
);

const PerformanceCard = () => (
  <div className="rounded-3xl bg-white/90 backdrop-blur border border-emerald-100 p-4 shadow-sm">
    <h3 className="text-xs md:text-sm font-semibold text-[#1E4B3C] mb-2">
      Your Performance
    </h3>
    <div className="grid gap-3 text-[11px] md:grid-cols-2">
      <div>
        <p className="text-gray-600">Patients last 30 days</p>
        <p className="mt-1 text-xl font-bold text-[#1E4B3C]">42</p>
      </div>
      <div>
        <p className="text-gray-600">Avg. feedback rating</p>
        <p className="mt-1 text-xl font-bold text-[#1E4B3C]">4.6 / 5</p>
      </div>
      <div>
        <p className="text-gray-600">Avg. outcome score</p>
        <p className="mt-1 text-xl font-bold text-[#1E4B3C]">4.3 / 5</p>
      </div>
      <div>
        <p className="text-gray-600">Adverse event rate</p>
        <p className="mt-1 text-xl font-bold text-red-700">1.2%</p>
      </div>
    </div>
  </div>
);

/* ========== OTHER SECTIONS FOR SIDEBAR TABS (same logic, nicer styling) ========== */

const TodayAppointments = ({ appointments }) => (
  <div className="space-y-4">
    <h2 className="text-lg font-semibold text-[#1E4B3C]">Today’s Appointments</h2>
    <div className="rounded-3xl bg-white/90 backdrop-blur border border-emerald-100 p-4 shadow-sm">
      <table className="min-w-full text-left text-[11px]">
        <thead>
          <tr className="border-b border-emerald-100 bg-emerald-50/70 text-emerald-900">
            <th className="px-3 py-2 font-semibold">Time</th>
            <th className="px-3 py-2 font-semibold">Patient</th>
            <th className="px-3 py-2 font-semibold">Therapist / Room</th>
            <th className="px-3 py-2 font-semibold">Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((a) => (
            <tr
              key={a.id}
              className="border-b last:border-b-0 hover:bg-emerald-50/60 transition-colors"
            >
              <td className="px-3 py-2">{a.todaySlotTime}</td>
              <td className="px-3 py-2">
                <div className="font-semibold text-gray-900">{a.name}</div>
                <div className="text-[10px] text-gray-500">{a.chiefComplaint}</div>
              </td>
              <td className="px-3 py-2 text-gray-700">
                {a.therapist} · {a.room}
              </td>
              <td className="px-3 py-2">
                <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] text-emerald-800 border border-emerald-100">
                  {a.status}
                </span>
              </td>
            </tr>
          ))}
          {appointments.length === 0 && (
            <tr>
              <td
                colSpan={4}
                className="px-3 py-4 text-center text-gray-500 text-xs"
              >
                No appointments today.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);

const MyPatients = ({ patients, setSelectedPatient }) => (
  <div className="space-y-4">
    <h2 className="text-lg font-semibold text-[#1E4B3C]">My Patients</h2>
    <div className="rounded-3xl bg-white/90 backdrop-blur border border-emerald-100 p-4 shadow-sm">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <input
          type="text"
          placeholder="Search by name, ID, diagnosis…"
          className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-[11px] outline-none focus:border-[#1E4B3C] focus:bg-white focus:ring-1 focus:ring-[#1E4B3C]"
        />
        <div className="flex gap-2 text-[11px]">
          <select className="rounded-full border border-gray-200 bg-gray-50 px-2 py-1.5 outline-none focus:border-[#1E4B3C] focus:bg-white focus:ring-1 focus:ring-[#1E4B3C]">
            <option>All centers</option>
          </select>
          <select className="rounded-full border border-gray-200 bg-gray-50 px-2 py-1.5 outline-none focus:border-[#1E4B3C] focus:bg-white focus:ring-1 focus:ring-[#1E4B3C]">
            <option>All statuses</option>
            <option>In therapy</option>
            <option>Completed</option>
          </select>
        </div>
      </div>

      <div className="mt-3 overflow-x-auto">
        <table className="min-w-full text-left text-[11px]">
          <thead>
            <tr className="border-b border-emerald-100 bg-emerald-50/70 text-emerald-900">
              <th className="px-3 py-2 font-semibold">Patient</th>
              <th className="px-3 py-2 font-semibold">Prakriti</th>
              <th className="px-3 py-2 font-semibold">Diagnosis</th>
              <th className="px-3 py-2 font-semibold">Status</th>
              <th className="px-3 py-2 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((p) => (
              <tr
                key={p.id}
                className="border-b last:border-b-0 hover:bg-emerald-50/60 transition-colors"
              >
                <td className="px-3 py-2">
                  <div className="font-semibold text-gray-900">{p.name}</div>
                  <div className="text-[10px] text-gray-500">{p.centerName}</div>
                </td>
                <td className="px-3 py-2 text-gray-700">{p.prakriti}</td>
                <td className="px-3 py-2 text-gray-700">{p.diagnosis}</td>
                <td className="px-3 py-2">
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] text-emerald-800 border border-emerald-100">
                    {p.status}
                  </span>
                </td>
                <td className="px-3 py-2">
                  <button
                    type="button"
                    onClick={() => setSelectedPatient(p)}
                    className="rounded-full bg-[#1E4B3C] px-3 py-1 text-[10px] font-semibold text-white hover:bg-emerald-800 shadow-sm"
                  >
                    Open in dashboard
                  </button>
                </td>
              </tr>
            ))}
            {patients.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-3 py-4 text-center text-gray-500 text-xs"
                >
                  No patients found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const TherapiesSection = ({ currentPatient }) => (
  <div className="space-y-4">
    <h2 className="text-lg font-semibold text-[#1E4B3C]">Therapies</h2>
    <div className="rounded-3xl bg-white/90 backdrop-blur border border-emerald-100 p-4 shadow-sm space-y-3 text-[11px]">
      <p className="text-gray-700">
        Configure Panchakarma therapy protocols, durations, and session
        sequences. In the production build, this will list all active plans
        across your assigned centers.
      </p>
      <p className="text-gray-700">
        Current context patient:{" "}
        <span className="font-semibold">
          {currentPatient ? currentPatient.name : "none"}
        </span>
      </p>
      <button
        type="button"
        className="rounded-full bg-[#1E4B3C] px-4 py-1.5 text-[11px] font-semibold text-white hover:bg-emerald-800 shadow-sm"
      >
        Create new therapy plan
      </button>
    </div>
  </div>
);

const PrescriptionsSection = ({ currentPatient }) => (
  <div className="space-y-4">
    <h2 className="text-lg font-semibold text-[#1E4B3C]">
      Prescriptions & Orders
    </h2>
    <div className="rounded-3xl bg-white/90 backdrop-blur border border-emerald-100 p-4 shadow-sm space-y-3 text-[11px]">
      <p className="text-gray-700">
        View and manage all prescriptions authored by you. The final version can
        show filters like date range, center, and therapy type, with complete
        audit history.
      </p>
      <p>
        Current context patient:{" "}
        <span className="font-semibold">
          {currentPatient ? currentPatient.name : "none"}
        </span>
      </p>
      <textarea
        placeholder="Write a prescription template or order set..."
        className="h-24 w-full rounded-2xl border border-gray-200 bg-gray-50 px-3 py-2 outline-none focus:border-[#1E4B3C] focus:bg-white focus:ring-1 focus:ring-[#1E4B3C]"
      />
      <button
        type="button"
        className="rounded-full bg-[#1E4B3C] px-4 py-1.5 text-[11px] font-semibold text-white hover:bg-emerald-800 shadow-sm"
      >
        Save as template
      </button>
    </div>
  </div>
);

const FeedbackSection = ({ feedbackItems }) => (
  <div className="space-y-4">
    <h2 className="text-lg font-semibold text-[#1E4B3C]">
      Feedback & Outcomes
    </h2>
    <div className="rounded-3xl bg-white/90 backdrop-blur border border-emerald-100 p-4 shadow-sm">
      <div className="grid gap-4 md:grid-cols-2 text-[11px]">
        {feedbackItems.map((f) => (
          <div
            key={f.id}
            className="rounded-2xl bg-emerald-50/80 border border-emerald-100 p-3"
          >
            <p className="font-semibold text-emerald-900">{f.patientName}</p>
            <p className="text-[10px] text-gray-500">{f.dateLabel}</p>
            <p className="mt-1 text-gray-700">{f.comment}</p>
            <p className="mt-1 text-[10px] text-[#1E4B3C] font-semibold">
              Rating: {f.score} / 5
            </p>
          </div>
        ))}
        {feedbackItems.length === 0 && (
          <p className="text-gray-500 text-xs">No feedback recorded yet.</p>
        )}
      </div>
    </div>
  </div>
);

const MessagesSection = ({ messages }) => (
  <div className="space-y-4">
    <h2 className="text-lg font-semibold text-[#1E4B3C]">Messages</h2>
    <div className="rounded-3xl bg-white/90 backdrop-blur border border-emerald-100 p-4 shadow-sm">
      <div className="h-64 overflow-y-auto space-y-2 text-[11px]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`max-w-sm rounded-2xl px-3 py-2 ${
              msg.from === "doctor"
                ? "bg-[#1E4B3C] text-emerald-50 ml-auto"
                : "bg-emerald-50 border border-emerald-100 text-gray-800 mr-auto"
            }`}
          >
            <p>{msg.text}</p>
            <p className="mt-1 text-[9px] text-right opacity-70">
              {msg.timeLabel}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-3 flex gap-2 text-[11px]">
        <input
          type="text"
          placeholder="Type a new message..."
          className="flex-1 rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 outline-none focus:border-[#1E4B3C] focus:bg-white focus:ring-1 focus:ring-[#1E4B3C]"
        />
        <button
          type="button"
          className="rounded-full bg-[#1E4B3C] px-4 py-1.5 font-semibold text-white hover:bg-emerald-800 shadow-sm"
        >
          Send
        </button>
      </div>
    </div>
  </div>
);

const SettingsSection = () => (
  <div className="space-y-4">
    <h2 className="text-lg font-semibold text-[#1E4B3C]">Settings</h2>
    <div className="rounded-3xl bg-white/90 backdrop-blur border border-emerald-100 p-4 shadow-sm space-y-4 text-[11px]">
      <div>
        <h3 className="text-xs font-semibold text-[#1E4B3C] mb-1">
          Notification Preferences
        </h3>
        <div className="space-y-1 text-gray-700">
          <label className="flex items-center gap-2">
            <input type="checkbox" defaultChecked className="h-3.5 w-3.5" />
            In‑app alerts for new feedback and messages
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" defaultChecked className="h-3.5 w-3.5" />
            Email summary of tomorrow’s schedule
          </label>
        </div>
      </div>
      <div>
        <h3 className="text-xs font-semibold text-[#1E4B3C] mb-1">
          Clinical Safety
        </h3>
        <p className="text-gray-700">
          All actions in this dashboard are audit‑logged with your doctor ID,
          timestamp, and device information to maintain safety and compliance.
        </p>
      </div>
      <button
        type="button"
        className="rounded-full bg-[#1E4B3C] px-4 py-1.5 text-[11px] font-semibold text-white hover:bg-emerald-800 shadow-sm"
      >
        Save Settings
      </button>
    </div>
  </div>
);

export default DoctorDashboard;
