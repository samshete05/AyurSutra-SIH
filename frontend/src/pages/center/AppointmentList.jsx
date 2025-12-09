import { Search } from "lucide-react";
import SidePanel from "../../components/CenterSidePanel";
import Logo from "../../components/SidePanelLogo";
import CenterNavbar from "./CenterNavbar";
import { useEffect } from "react";
import axios from 'axios'
import { useState } from "react";
import CalendarComponent from "../../components/CalendarComponent";

// Helper function to get initials from name
const getInitials = (name) => {
  if (!name) return "?";
  const names = name.split(" ");
  if (names.length === 1) return names[0].charAt(0).toUpperCase();
  return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
};

// Helper function to generate random color based on name
const getRandomColor = (name) => {
  if (!name) return '#6b7280'; // default gray
  
  // Simple hash function for consistent colors
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const colors = [
    '#3b82f6', // blue
    '#10b981', // emerald
    '#8b5cf6', // violet
    '#f59e0b', // amber
    '#ef4444', // red
    '#ec4899', // pink
    '#14b8a6', // teal
    '#f97316', // orange
    '#6366f1', // indigo
    '#06b6d4', // cyan
  ];
  
  return colors[Math.abs(hash) % colors.length];
};

// Avatar component that shows initials
const AvatarWithInitials = ({ name, size = 9 }) => {
  const initials = getInitials(name);
  const bgColor = getRandomColor(name);
  
  return (
    <div 
      className={`h-${size} w-${size} rounded-full flex items-center justify-center text-white font-semibold shadow-sm`}
      style={{ backgroundColor: bgColor }}
    >
      {initials}
    </div>
  );
};

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
  const [patients, setpatients] = useState([]);
  const centerId = localStorage.getItem("centerId");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    const getAppointmentData = async () => {
      try {
        const resp = await axios.post("http://localhost:3000/PanchKarmaCenter/get-center-appoinment", {
          centerId: centerId
        });

        // console.log(resp);
        
        if (resp.data && resp.data.appointmentData) {
          setpatients(resp.data.appointmentData);
        } else {
          console.error("Invalid response format:", resp);
        }
      } catch (error) {
        console.error("Error fetching appointment data:", error);
      }
    };
    
    getAppointmentData();
  }, [centerId]);

  const handleExport = () => {
    // 1. Build CSV header
    const headers = ["Name", "Mobile", "Email", "Amount", "Payment Status"];
    const rows = patients.map((p) => [
      csvEscape(p.PatientName),
      csvEscape(p.PatientPhone),
      csvEscape(p.PatientEmail),
      csvEscape(p.Amount),
      csvEscape(p.PaymentStatus ? "Paid" : "Pending"),
    ]);
    // console.log("APPOINTMENT OBJECT:", p);
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
            <div className="relative hidden items-center md:flex">
              <span className="pointer-events-none absolute left-3 text-slate-400">
                <Search className="h-5 w-5 text-gray-500" />
              </span>
              <input
                className="h-10 w-64 rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm placeholder:text-slate-400"
                placeholder="Search appointments..."
              />
            </div>
          </div>
          <CenterNavbar />
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
            </div>
          </div>
{/* /*********************************************************************************************/}
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
              <select className="h-8 rounded-full border border-slate-200 bg-slate-50 px-3 text-xs text-slate-600 cursor-pointer">
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
                    <th className="px-6 py-2 text-left font-semibold">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {patients.length > 0 ? (
                    patients.map((p, index) => (
                      <tr
                        key={p._id || index}
                        className="rounded-xl bg-slate-50/70 text-sm text-slate-700 hover:bg-slate-100 transition"
                      >
                        <td className="px-6 py-3">
                          <AvatarWithInitials name={p.PatientName} size={9} />
                        </td>
                    
                        <td className="px-6 py-3 font-medium">{p.PatientName}</td>
                        <td className="px-6 py-3 text-slate-500">{p.PatientPhone}</td>
                        <td className="px-6 py-3 text-slate-500">{p.PatientEmail}</td>
                        <td className="px-6 py-3 font-semibold">₹{p.Amount}</td>
                    
                        <td className="px-6 py-3">
                          <PaymentBadge paid={p.PaymentStatus} />
                        </td>
                    
                        {/* NEW ACTION BUTTON CELL */}
                        <td className="px-6 py-3">
                          {false ? (
                            <button
                              onClick={() => handleAssignDoctor(p)}
                              className="px-3 py-2 text-xs rounded-lg bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                            >
                              Assign Doctor
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                setSelectedAppointment(p);
                                setShowModal(true);
                              }}
                              className="px-3 py-2 text-xs rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 cursor-pointer"
                            >
                              Mark Attendance
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center py-8 text-slate-500">
                        No appointments found.
                      </td>
                    </tr>
                  )}
                  </tbody>
              </table>
            </div>
          </div>
          {showModal && selectedAppointment && (
            <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40">

              <div className="bg-white rounded-2xl shadow-xl w-[90%] max-w-4xl p-6 relative">

                {/* Close Button */}
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-4 right-4 text-slate-500 hover:text-black"
                >
                  ✕
                </button>

                {/* Appointment Details */}
                <h2 className="text-xl font-semibold mb-4">
                  Therapy Progress – {selectedAppointment.PatientName}
                </h2>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <p><strong>Phone:</strong> {selectedAppointment.PatientPhone}</p>
                  <p><strong>Email:</strong> {selectedAppointment.PatientEmail}</p>
                  <p><strong>Amount:</strong> ₹{selectedAppointment.Amount}</p>
                  <p><strong>Payment:</strong> {selectedAppointment.PaymentStatus ? "Paid" : "Pending"}</p>
                </div>

                {/* Calendar Section */}
                <div className="mt-6">
                  <h3 className="font-semibold mb-2">Mark Therapy Attendance</h3>
                  <CalendarComponent
                    appointment={selectedAppointment}
                  />
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AppointmentList;