// src/components/AppointmentList.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faMoon,
  faUserDoctor,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import { CircleDollarSign, LayoutDashboard, Search, User } from "lucide-react";
import SidePanel from "../components/CenterSidePanel";
import Logo from "../components/SidePanelLogo";
import CenterNavbarProfile from "./center/CenterNavbarProfile";

const patients = [
  {
    id: 1,
    name: "George Lindelof",
    photo: "https://i.pravatar.cc/80?img=1",
    mobile: "+4 315 23 62",
    email: "george@example.com",
    amount: 1000,
    paid: true,
  },
  {
    id: 2,
    name: "Eric Dyer",
    photo: "https://i.pravatar.cc/80?img=2",
    mobile: "+2 134 25 65",
    email: "eric@example.com",
    amount: 4000,
    paid: false,
  },
  {
    id: 3,
    name: "Michael Campbell",
    photo: "https://i.pravatar.cc/80?img=5",
    mobile: "+1 756 52 73",
    email: "michael@example.com",
    amount: 2500,
    paid: true,
  },
];

// Small helper to escape CSV values
const csvEscape = (value) => {
  if (value == null) return "";
  const str = String(value);
  if (/[",\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
};

const PaymentBadge = ({ paid }) => {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        paid ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
      }`}
    >
      {paid ? "Paid" : "Pending"}
    </span>
  );
};

const AppointmentList = () => {
  const handleExport = () => {
    // 1. Build CSV header
    const headers = ["Name", "Mobile", "Email", "Amount", "Payment Status"];
    const rows = patients.map((p) => [
      csvEscape(p.name),
      csvEscape(p.mobile),
      csvEscape(p.email),
      csvEscape(p.amount),
      csvEscape(p.paid ? "Paid" : "Pending"),
    ]);

    const csvContent =
      headers.join(",") +
      "\n" +
      rows.map((row) => row.join(",")).join("\n");

    // 2. Create blob & download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "appointments.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex min-h-screen bg-slate-100 text-slate-800">
      {/* Sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white px-6 py-6 md:flex md:flex-col">
        <Logo />

        <nav className="space-y-6 text-sm">
          <div>
            <SidePanel />
          </div>
        </nav>
      </aside>

      {/* Right side: Top bar + content */}
      <div className="flex min-h-screen flex-1 flex-col">
        {/* Top bar */}
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 md:px-8">
          <div className="flex items-center gap-3">
            <button className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-xl md:hidden">
              ☰
            </button>
            <div className="relative hidden items-center md:flex">
              <span className="pointer-events-none absolute left-3 text-slate-400">
                <Search className="h-6 w-6 cursor-pointer text-gray-600" />
              </span>
              <input
                className="h-10 w-64 rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm outline-none ring-0 placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-100"
                placeholder="Search patients, appointments..."
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100">
              <FontAwesomeIcon icon={faMoon} className="cursor-pointer text-xl" />
            </button>
            <button className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-slate-100">
              <FontAwesomeIcon icon={faBell} className="cursor-pointer text-xl" />
            </button>
            <CenterNavbarProfile/>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 bg-slate-100 px-4 py-4 md:px-8 md:py-6">
          {/* Page title row */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm text-slate-500">
                Track payments for each appointment
              </p>
              <h1 className="text-2xl font-semibold tracking-tight">
                Patients Appointments
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleExport}
                className="rounded-full cursor-pointer border border-grey-200 px-6 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50"
              >
                Download CSV File
              </button>
              <button className="rounded-full bg-[#1E4B3C] cursor-pointer px-6 py-3 text-xs font-semibold text-white shadow-sm">
                + New Appointment
              </button>
            </div>
          </div>

          {/* Table card */}
          <div className="rounded-2xl bg-white shadow-sm shadow-slate-100">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
              <div>
                <p className="text-sm font-semibold text-slate-800">
                  Today&apos;s Appointments
                </p>
                <p className="text-xs text-slate-400">
                  Payment details for each booking
                </p>
              </div>
              <select className="h-8 rounded-full border border-slate-200 bg-slate-50 px-3 text-xs text-slate-600">
                <option>All</option>
                <option>Paid</option>
                <option>Pending</option>
              </select>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full border-separate border-spacing-y-2 px-4 pb-4">
                <thead>
                  <tr className="text-xs text-slate-400">
                    <th className="px-6 py-2 text-left font-semibold">Photo</th>
                    <th className="px-6 py-2 text-left font-semibold">
                      Patient name
                    </th>
                    <th className="px-6 py-2 text-left font-semibold">
                      Mobile
                    </th>
                    <th className="px-6 py-2 text-left font-semibold">
                      Email
                    </th>
                    <th className="px-6 py-2 text-left font-semibold">
                      Amount
                    </th>
                    <th className="px-6 py-2 text-left font-semibold">
                      Payment status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {patients.map((p) => (
                    <tr
                      key={p.id}
                      className="rounded-xl bg-slate-50/70 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      <td className="px-6 py-3">
                        <img
                          src={p.photo}
                          alt={p.name}
                          className="h-9 w-9 rounded-full object-cover shadow-sm"
                        />
                      </td>
                      <td className="px-6 py-3 font-medium">{p.name}</td>
                      <td className="px-6 py-3 text-slate-500">{p.mobile}</td>
                      <td className="px-6 py-3 text-slate-500">{p.email}</td>
                      <td className="px-6 py-3 font-semibold text-slate-800">
                        ₹{p.amount.toLocaleString("en-IN")}
                      </td>
                      <td className="px-6 py-3">
                        <PaymentBadge paid={p.paid} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppointmentList;
