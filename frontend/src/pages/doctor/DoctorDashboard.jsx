// DoctorDashboard.jsx
import React, { useState } from "react";
import DoctorFeedbackSection from "./DoctorFeedbackSection";

const DoctorDashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [selectedPatientId, setSelectedPatientId] = useState("P1");

  const stats = {
    appointments: { value: 48, diff: "+12% vs last month" },
    newPatients: { value: 98, diff: "+4% vs last month" },
  };

  const appointments = [
    {
      id: "P1",
      name: "George Lindelof",
      phone: "+4 315 23 62",
      email: "george@example.com",
      amount: "₹1,000",
      status: "Paid",
      avatarColor: "bg-sky-200",
    },
    {
      id: "P2",
      name: "Eric Dyer",
      phone: "+2 134 25 65",
      email: "eric@example.com",
      amount: "₹4,000",
      status: "Pending",
      avatarColor: "bg-amber-200",
    },
    {
      id: "P3",
      name: "Michael Campbell",
      phone: "+1 756 52 73",
      email: "michael@example.com",
      amount: "₹2,500",
      status: "Paid",
      avatarColor: "bg-emerald-200",
    },
    {
      id: "P3",
      name: "Michael Campbell",
      phone: "+1 756 52 73",
      email: "michael@example.com",
      amount: "₹2,500",
      status: "Paid",
      avatarColor: "bg-emerald-200",
    },
    {
      id: "P3",
      name: "Michael Campbell",
      phone: "+1 756 52 73",
      email: "michael@example.com",
      amount: "₹2,500",
      status: "Paid",
      avatarColor: "bg-emerald-200",
    },
    {
      id: "P3",
      name: "Michael Campbell",
      phone: "+1 756 52 73",
      email: "michael@example.com",
      amount: "₹2,500",
      status: "Paid",
      avatarColor: "bg-emerald-200",
    },
    {
      id: "P3",
      name: "Michael Campbell",
      phone: "+1 756 52 73",
      email: "michael@example.com",
      amount: "₹2,500",
      status: "Paid",
      avatarColor: "bg-emerald-200",
    },
    {
      id: "P3",
      name: "Michael Campbell",
      phone: "+1 756 52 73",
      email: "michael@example.com",
      amount: "₹2,500",
      status: "Paid",
      avatarColor: "bg-emerald-200",
    },
    {
      id: "P3",
      name: "Michael Campbell",
      phone: "+1 756 52 73",
      email: "michael@example.com",
      amount: "₹2,500",
      status: "Paid",
      avatarColor: "bg-emerald-200",
    },
    {
      id: "P3",
      name: "Michael Campbell",
      phone: "+1 756 52 73",
      email: "michael@example.com",
      amount: "₹2,500",
      status: "Paid",
      avatarColor: "bg-emerald-200",
    },
    {
      id: "P3",
      name: "Michael Campbell",
      phone: "+1 756 52 73",
      email: "michael@example.com",
      amount: "₹2,500",
      status: "Paid",
      avatarColor: "bg-emerald-200",
    },
  ];

  const selectedPatient =
    appointments.find((p) => p.id === selectedPatientId) || appointments[0];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <div className="flex flex-1">
        <Sidebar active={activeSection} onChange={setActiveSection} />

        <main className="flex-1 px-4 md:px-8 py-6">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Page header */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Welcome back, Doctor</p>
                <h1 className="text-2xl md:text-3xl font-semibold text-slate-900">
                  Panchakarma Doctor Dashboard
                </h1>
              </div>
              <p className="text-sm text-slate-500">
                Today · {new Date().toLocaleDateString()}
              </p>
            </div>

            {/* Top stat cards */}
            <section className="grid gap-4">
              <StatCard
                icon="📅"
                title="Appointments"
                value={stats.appointments.value}
                diff={stats.appointments.diff}
              />
              {/* second card commented by you; keep as is */}
              {/* <StatCard
                icon="👥"
                title="New Patients"
                value={stats.newPatients.value}
                diff={stats.newPatients.diff}
              /> */}
            </section>

            {/* Section content controlled by sidebar */}
            {activeSection === "dashboard" && (
              <>
                <DashboardOverview appointments={appointments} />
                <DoctorFeedbackSection />
              </>
            )}

            {activeSection === "appointments" && (
              <AppointmentsTable appointments={appointments} />
            )}

            {activeSection === "patients" && (
              <PatientsArea
                patients={appointments}
                selected={selectedPatient}
                onSelect={setSelectedPatientId}
              />
            )}

            {activeSection === "reports" && <ReportsPlaceholder />}
          </div>
        </main>
      </div>
    </div>
  );
};

/* ========== Sidebar ========== */

const Sidebar = ({ active, onChange }) => {
  const items = [
    { key: "dashboard", label: "Dashboard" },
    { key: "appointments", label: "Appointments" },
    { key: "patients", label: "Patients lists" },
    { key: "reports", label: "Reports" },
  ];

  return (
    <aside className="hidden md:flex md:flex-col w-64 bg-white border-r border-slate-100">
      <div className="px-6 py-5 border-b border-slate-100">
        <p className="text-xs font-semibold tracking-[0.2em] text-slate-400">
          MAIN
        </p>
      </div>
      <nav className="flex-1 px-4 py-4 text-sm text-slate-700 space-y-1">
        {items.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => onChange(item.key)}
            className={`flex items-center gap-3 w-full rounded-lg px-3 py-2.5 transition-colors ${
              active === item.key
                ? "bg-slate-900 text-white font-semibold"
                : "hover:bg-slate-50"
            }`}
          >
            <span className="h-5 w-5 rounded-md bg-slate-100 flex items-center justify-center text-[12px]">
              •
            </span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

/* ========== Stat card ========== */

const StatCard = ({ icon, title, value, diff }) => (
  <div className="rounded-2xl bg-white border border-slate-100 shadow-sm px-5 py-4 flex flex-col justify-between">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-xl bg-slate-50 flex items-center justify-center text-xl">
          {icon}
        </div>
        <p className="text-xs font-medium text-slate-600 uppercase tracking-wide">
          {title}
        </p>
      </div>
      <button
        type="button"
        className="h-7 w-7 flex items-center justify-center rounded-full hover:bg-slate-50 text-slate-400 text-sm"
      >
        ⋮
      </button>
    </div>
    <div className="mt-3 flex items-end justify-between">
      <div>
        <p className="text-2xl font-semibold text-slate-900">{value}</p>
        <p className="mt-1 text-xs text-emerald-500">{diff}</p>
      </div>
      <div className="h-9 w-24 rounded-lg bg-gradient-to-tr from-sky-50 to-emerald-50 flex items-center justify-center text-[10px] text-slate-400">
        trend
      </div>
    </div>
  </div>
);

/* ========== Dashboard overview ========== */

const DashboardOverview = ({ appointments }) => (
  <section className="rounded-2xl bg-white border border-slate-100 shadow-sm p-5">
    <h2 className="text-base font-semibold text-slate-900 mb-1">
      Today’s snapshot
    </h2>
    <p className="text-sm text-slate-500 mb-3">
      Quick outline of today’s schedule. Use the left navigation to manage
      appointments and patient‑wise prescriptions.
    </p>
    <p className="text-sm text-slate-700">
      Total appointments today:{" "}
      <span className="font-semibold">{appointments.length}</span>
    </p>
    <ul className="mt-2 text-sm text-slate-600 list-disc list-inside space-y-1">
      <li>Appointments are read‑only for doctors in this dashboard.</li>
      <li>
        Prescriptions can be created or updated only from the “Patients lists”
        view.
      </li>
      <li>Reports tab will later show outcome and feedback analytics.</li>
    </ul>
  </section>
);

/* ========== Appointments table (read‑only) ========== */

const AppointmentsTable = ({ appointments }) => (
  <section className="rounded-2xl bg-white border border-slate-100 shadow-sm">
    <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
      <div>
        <p className="text-base font-semibold text-slate-900">
          Patients appointments
        </p>
        <p className="text-sm text-slate-500">
          Today’s appointments · payment details for each booking
        </p>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <select className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 outline-none text-slate-600">
          <option>All</option>
          <option>Paid</option>
          <option>Pending</option>
        </select>
      </div>
    </div>

    <div className="overflow-x-auto">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-slate-50 border-b border-slate-100 text-slate-500">
          <tr>
            <th className="px-6 py-3 font-medium">Photo</th>
            <th className="px-6 py-3 font-medium">Patient name</th>
            <th className="px-6 py-3 font-medium">Mobile</th>
            <th className="px-6 py-3 font-medium">Email</th>
            <th className="px-6 py-3 font-medium">Amount</th>
            <th className="px-6 py-3 font-medium">Payment status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((p, index) => (
            <tr
              key={p.id}
              className={`border-b last:border-b-0 ${
                index % 2 === 0 ? "bg-white" : "bg-slate-50/40"
              }`}
            >
              <td className="px-6 py-3">
                <div
                  className={`h-9 w-9 rounded-full ${p.avatarColor} flex items-center justify-center text-xs font-semibold text-slate-700`}
                >
                  {p.name
                    .split(" ")
                    .map((w) => w[0])
                    .join("")}
                </div>
              </td>
              <td className="px-6 py-3 text-slate-800">{p.name}</td>
              <td className="px-6 py-3 text-slate-700">{p.phone}</td>
              <td className="px-6 py-3 text-slate-700">{p.email}</td>
              <td className="px-6 py-3 text-slate-900">{p.amount}</td>
              <td className="px-6 py-3">
                <StatusPill status={p.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>
);

const StatusPill = ({ status }) => {
  if (status === "Paid") {
    return (
      <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
        Paid
      </span>
    );
  }
  if (status === "Pending") {
    return (
      <span className="inline-flex items-center rounded-full bg-amber-50 px-3 py-1 text-sm font-medium text-amber-700">
        Pending
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full bg-slate-50 px-3 py-1 text-sm font-medium text-slate-600">
      {status}
    </span>
  );
};

/* ========== Patients area ========== */

const PatientsArea = ({ patients, selected, onSelect }) => (
  <section className="grid gap-4 lg:grid-cols-3">
    {/* List */}
    <div className="lg:col-span-2 rounded-2xl bg-white border border-slate-100 shadow-sm">
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
        <div>
          <p className="text-base font-semibold text-slate-900">
            Patients list
          </p>
          <p className="text-sm text-slate-500">
            Select a patient to view or update prescription.
          </p>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-100 text-slate-500">
            <tr>
              <th className="px-6 py-3 font-medium">Patient</th>
              <th className="px-6 py-3 font-medium">Mobile</th>
              <th className="px-6 py-3 font-medium">Email</th>
              <th className="px-6 py-3 font-medium">Last visit</th>
              <th className="px-6 py-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((p, index) => {
              const isActive = p.id === selected.id;
              return (
                <tr
                  key={p.id}
                  className={`border-b last:border-b-0 cursor-pointer ${
                    isActive
                      ? "bg-sky-50"
                      : index % 2 === 0
                      ? "bg-white"
                      : "bg-slate-50/40"
                  }`}
                  onClick={() => onSelect(p.id)}
                >
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-9 w-9 rounded-full ${p.avatarColor} flex items-center justify-center text-xs font-semibold text-slate-700`}
                      >
                        {p.name
                          .split(" ")
                          .map((w) => w[0])
                          .join("")}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          {p.name}
                        </p>
                        <p className="text-xs text-slate-500">
                          Patient ID #{p.id}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-slate-700">{p.phone}</td>
                  <td className="px-6 py-3 text-slate-700">{p.email}</td>
                  <td className="px-6 py-3 text-slate-500 text-xs">
                    2 days ago
                  </td>
                  <td className="px-6 py-3">
                    <button
                      type="button"
                      className="rounded-full border border-slate-200 px-3 py-1 text-sm text-slate-600 hover:bg-slate-50"
                    >
                      View
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>

    {/* Prescription panel */}
    <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-4 flex flex-col">
      <p className="text-base font-semibold text-slate-900 mb-1">
        Prescription · {selected.name}
      </p>
      <p className="text-sm text-slate-500 mb-3">
        Only this assigned doctor can create or update prescriptions for this
        patient. All changes are audit‑logged.
      </p>
      <textarea
        placeholder="Medicines with dose & duration..."
        className="h-24 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:bg-white focus:border-sky-400 focus:ring-1 focus:ring-sky-300"
      />
      <textarea
        placeholder="Diet & lifestyle advice..."
        className="h-24 w-full mt-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:bg-white focus:border-sky-400 focus:ring-1 focus:ring-sky-300"
      />
      <button
        type="button"
        className="mt-4 self-end rounded-full bg-sky-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-sky-700"
      >
        Save prescription
      </button>
    </div>
  </section>
);

/* ========== Reports placeholder ========== */

const ReportsPlaceholder = () => (
  <section className="rounded-2xl bg-white border border-slate-100 shadow-sm p-5">
    <h2 className="text-base font-semibold text-slate-900 mb-1">
      Reports
    </h2>
    <p className="text-sm text-slate-500">
      This section will show doctor‑wise outcomes, therapy counts, and feedback
      summaries. For now, it is a placeholder to keep the UI structure clean.
    </p>
  </section>
);

export default DoctorDashboard;
