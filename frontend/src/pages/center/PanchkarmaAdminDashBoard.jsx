import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faCalendar, faMoon, faUserDoctor } from "@fortawesome/free-solid-svg-icons";
import { CircleDollarSign, Download, LayoutDashboard, Search, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

// import PKLineChart from "./PKLineChart";

// import PKLineChart from "../components/PkLineChart";
// import SidePanel from "../components/CenterSidePanel";
// import Logo from "../components/SidePanelLogo";
import SidePanel from "../../components/CenterSidePanel";
import PKLineChart from "../../components/PkLineChart";
// import SidePane
import Logo from "../../components/SidePanelLogo";

const monthLabels = [
  "Feb","Mar","Apr","May","Jun","Jul",
  "Aug","Sep","Oct","Nov","Dec","Jan"
];

// dummy data
const revenueValues = [195, 150, 230, 170, 185, 194, 183, 205, 210, 208, 222, 235];
const patientValues = [80, 90, 110, 100, 120, 130, 150, 145, 140, 138, 142, 155];
const therapyValues = [60, 72, 95, 90, 98, 105, 120, 118, 115, 117, 121, 130];

const PanchakarmaDashboard = () => {
    const navigate=useNavigate();

  return (

    <div className="flex min-h-screen bg-slate-100 text-slate-800">
      {/* Sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white px-6 py-6 md:flex md:flex-col">
      
        <Logo/>

        <nav className="space-y-6 text-sm">
             <SidePanel/>
        </nav>
      </aside>

      {/* Main content */}
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
                placeholder="Search patients, therapies..."
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
            <div className="flex items-center gap-2 rounded-full bg-slate-100 px-2 py-1">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-sm font-semibold text-white">
                A
              </div>
              <div className="hidden text-left text-xs md:block">
                <div className="font-semibold">Ayur Admin</div>
                <div className="text-[11px] text-slate-500">
                  Center Admin ▾
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 bg-slate-100 px-4 py-4 md:px-8 md:py-6">
          {/* Title + filters */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm text-slate-500">
                Welcome back, Ayur Admin
              </p>
              <h1 className="text-2xl font-semibold tracking-tight">
                Panchakarma Dashboard
              </h1>
            </div>
            <div className="flex cursor-pointer items-center gap-3">
              <select className="h-9 cursor-pointer rounded-full border border-slate-200 bg-white px-3 text-xs font-medium text-slate-600 shadow-sm">
                <option>This Month</option>
                <option>Last Month</option>
                <option>Last 3 Months</option>
              </select>
              <button className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-emerald-200 hover:bg-emerald-600">
                Download <Download className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>

          {/* KPI cards */}
          <div className="mb-6 grid gap-4 md:grid-cols-4">
            {[
              { title: "Annual Revenue", value: "$2,840,000", trend: "+20%" },
              { title: "Monthly Revenue", value: "$120,000", trend: "+25%" },
              { title: "Total Patients", value: "1,420", trend: "+18%" },
              { title: "Therapy Sessions", value: "980", trend: "+15%" },
            ].map((kpi) => (
              <div
                key={kpi.title}
                className="transform rounded-2xl bg-white p-4 shadow-sm shadow-slate-100 transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-105 hover:shadow-xl"
              >
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  {kpi.title}
                </p>
                <p className="mb-1 text-2xl font-semibold">{kpi.value}</p>
                <p
                  className={`text-xs font-semibold ${
                    kpi.trend.startsWith("+") ? "text-emerald-500" : "text-rose-500"
                  }`}
                >
                  {kpi.trend}
                </p>
              </div>
            ))}
          </div>

          {/* Three line charts – all same style, different data */}
          <div className="grid gap-4 2xl:grid-cols-3 lg:grid-cols-2">
            {/* Revenue line chart */}
            <div className="rounded-2xl bg-white p-5 shadow-sm shadow-slate-100">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Revenue Trend
                  </p>
                  <p className="text-xs text-slate-400">
                    Dummy revenue (in thousands)
                  </p>
                </div>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-600">
                  12 months
                </span>
              </div>
              <PKLineChart
                title="Revenue"
                unit="k"
                labels={monthLabels}
                values={revenueValues}
                color="#4F46E5"
              />
            </div>

            {/* Patients line chart */}
            <div className="rounded-2xl bg-white p-5 shadow-sm shadow-slate-100">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Patients Trend
                  </p>
                  <p className="text-xs text-slate-400">
                    Dummy monthly patient visits
                  </p>
                </div>
                <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-sky-600">
                  12 months
                </span>
              </div>
              <PKLineChart
                title="Patients"
                unit=""
                labels={monthLabels}
                values={patientValues}
                color="#0EA5E9"
              />
            </div>

            {/* Therapy sessions line chart */}
            <div className="rounded-2xl bg-white p-5 shadow-sm shadow-slate-100">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Therapy Sessions
                  </p>
                  <p className="text-xs text-slate-400">
                    Dummy total sessions per month
                  </p>
                </div>
                <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-medium text-violet-600">
                  12 months
                </span>
              </div>
              <PKLineChart
                title="Sessions"
                unit=""
                labels={monthLabels}
                values={therapyValues}
                color="#8B5CF6"
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PanchakarmaDashboard;
