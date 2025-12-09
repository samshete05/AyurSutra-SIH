// src/components/AppointmentList.jsx
import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import SidePanel from "../../components/CenterSidePanel";
import Logo from "../../components/SidePanelLogo";
import CenterNavbar from "./CenterNavbar";
import axios from "axios";
import CalendarComponent from "../../components/CalendarComponent";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* ----------------------------------------------------------
   Helper Functions
-----------------------------------------------------------*/

const getInitials = (name) => {
  if (!name) return "?";
  const parts = name.split(" ");
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const getRandomColor = (name) => {
  if (!name) return "#6b7280";
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const colors = [
    "#3b82f6",
    "#10b981",
    "#8b5cf6",
    "#f59e0b",
    "#ef4444",
    "#ec4899",
    "#14b8a6",
    "#f97316",
    "#6366f1",
    "#06b6d4",
  ];
  return colors[Math.abs(hash) % colors.length];
};

const AvatarWithInitials = ({ name }) => {
  return (
    <div
      className="h-9 w-9 rounded-full flex items-center justify-center text-white font-semibold shadow-sm"
      style={{ backgroundColor: getRandomColor(name) }}
    >
      {getInitials(name)}
    </div>
  );
};

const PaymentBadge = ({ paid }) => (
  <span
    className={`px-3 py-1 rounded-full text-xs font-semibold ${
      paid ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
    }`}
  >
    {paid ? "Paid" : "Pending"}
  </span>
);

/* ----------------------------------------------------------
   MAIN COMPONENT
-----------------------------------------------------------*/

const AppointmentList = () => {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const centerId = localStorage.getItem("centerId");

  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const [showAppointmentModal, setShowAppointmentModal] = useState(false); // for attendance/calendar
  const [showDoctorModal, setShowDoctorModal] = useState(false); // for assign doctor

  // Load appointments + doctors
  useEffect(() => {
    const loadAppointments = async () => {
      try {
        const res = await axios.post(
          "http://localhost:3000/PanchKarmaCenter/get-center-appoinment",
          { centerId }
        );
        setPatients(res.data?.appointmentData || []);
      } catch (e) {
        console.error("Error loading appointments:", e);
      }
    };

    const loadDoctors = async () => {
      try {
        const res = await axios.post(
          "http://localhost:3000/PanchKarmaCenter/get-center-doctors",
          { centerId }
        );
        setDoctors(res.data?.doctors || []);
      } catch (e) {
        console.error("Error loading doctors:", e);
      }
    };

    loadAppointments();
    loadDoctors();
  }, [centerId]);

  const assignToDoctor = async (doctorId) => {
    if (!selectedAppointment) return;

    try {
      await axios.post(
        "http://localhost:3000/PanchKarmaCenter/assign-patient-to-doctor",
        {
          doctorId: doctorId,
          patientId: selectedAppointment._id, // yahi tum log appointment ko patientId bol rahe ho
        }
      );

      toast.success("Patient successfully assigned!");

      // UI me turant reflect karne ke liye
      setPatients((prev) =>
        prev.map((apt) =>
          apt._id === selectedAppointment._id
            ? { ...apt, assignedDoctorId: doctorId }
            : apt
        )
      );

      setShowDoctorModal(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to assign patient");
    }
  };

  // CSV download
  const downloadCSV = () => {
    const rows = [
      ["Name", "Phone", "Email", "Amount", "Payment Status"],
      ...patients.map((p) => [
        p.PatientName,
        p.PatientPhone,
        p.PatientEmail,
        p.Amount,
        p.PaymentStatus ? "Paid" : "Pending",
      ]),
    ];

    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "appointments.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex min-h-screen bg-slate-100 text-slate-800">
      <ToastContainer theme="light" />

      {/* Sidebar */}
      <aside className="hidden w-64 bg-white px-6 py-6 md:flex md:flex-col">
        <Logo />
        <SidePanel />
      </aside>

      {/* MAIN AREA */}
      <div className="flex flex-1 flex-col">
        {/* NAVBAR */}
        <header className="flex items-center justify-between bg-white px-4 py-3 md:px-8">
          <div className="relative hidden md:flex items-center">
            <Search className="absolute left-3 h-5 w-5 text-gray-500" />
            <input
              className="h-10 w-64 rounded-xl bg-slate-50 pl-9 pr-3 text-sm"
              placeholder="Search appointments..."
            />
          </div>

          <CenterNavbar />
        </header>

        {/* CONTENT */}
        <main className="flex-1 px-4 py-6 md:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-sm text-slate-500">Track payments</p>
              <h1 className="text-2xl font-semibold">Patients Appointments</h1>
            </div>

            <button
              onClick={downloadCSV}
              className="border rounded-full px-6 py-2 text-xs text-slate-600 cursor-pointer"
            >
              Download CSV
            </button>
          </div>

          {/* TABLE */}
          <div className="bg-white shadow-sm">
            <div className="flex justify-between border-b px-6 py-4">
              <div>
                <p className="font-semibold">Today's Appointments</p>
                <p className="text-xs text-slate-400">Payment details</p>
              </div>

              <select className="border rounded-full bg-slate-50 px-3 text-xs cursor-pointer">
                <option>All</option>
                <option>Paid</option>
                <option>Pending</option>
              </select>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full border-separate border-spacing-y-2 p-4">
                <thead>
                  <tr className="text-xs text-slate-400">
                    <th className="px-6 py-2">Photo</th>
                    <th className="px-6 py-2">Name</th>
                    <th className="px-6 py-2">Phone</th>
                    <th className="px-6 py-2">Email</th>
                    <th className="px-6 py-2">Amount</th>
                    <th className="px-6 py-2">Payment</th>
                    <th className="px-6 py-2">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {patients.map((p, i) => (
                    <tr
                      key={i}
                      className="bg-slate-50 hover:bg-slate-100 cursor-pointer transition"
                      onClick={() => {
                        setSelectedAppointment(p);
                        setShowAppointmentModal(true);
                      }}
                    >
                      <td className="px-6 py-3">
                        <AvatarWithInitials name={p.PatientName} />
                      </td>

                      <td className="px-6 py-3">{p.PatientName}</td>
                      <td className="px-6 py-3 text-slate-500">
                        {p.PatientPhone}
                      </td>
                      <td className="px-6 py-3 text-slate-500">
                        {p.PatientEmail}
                      </td>

                      <td className="px-6 py-3 font-semibold">₹{p.Amount}</td>

                      <td className="px-6 py-3">
                        <PaymentBadge paid={p.PaymentStatus} />
                      </td>

                      {/* ACTION BUTTON (Assign Doctor OR Mark Attendance) */}
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-2">
                          {!p.assignedDoctorId ? (
                            <button
                              className="bg-blue-600 text-white text-xs px-3 py-1 rounded hover:bg-blue-700"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedAppointment(p);
                                setShowDoctorModal(true);
                              }}
                            >
                              Assign Doctor
                            </button>
                          ) : (
                            <button
                              className="bg-emerald-600 text-white text-xs px-3 py-1 rounded hover:bg-emerald-700"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedAppointment(p);
                                setShowAppointmentModal(true); // ye Calendar wala modal kholega
                              }}
                            >
                              Mark Attendance
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ATTENDANCE / THERAPY PROGRESS MODAL */}
          {showAppointmentModal && selectedAppointment && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
              <div className="bg-white p-6 w-[90%] max-w-4xl rounded-2xl shadow-xl relative">
                <button
                  onClick={() => setShowAppointmentModal(false)}
                  className="absolute top-3 right-4 text-xl text-slate-600"
                >
                  ✕
                </button>

                <h2 className="text-xl font-semibold mb-4">
                  Therapy Progress – {selectedAppointment.PatientName}
                </h2>

                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                  <p>
                    <strong>Phone:</strong> {selectedAppointment.PatientPhone}
                  </p>
                  <p>
                    <strong>Email:</strong> {selectedAppointment.PatientEmail}
                  </p>
                  <p>
                    <strong>Amount:</strong> ₹{selectedAppointment.Amount}
                  </p>
                  <p>
                    <strong>Payment:</strong>{" "}
                    {selectedAppointment.PaymentStatus ? "Paid" : "Pending"}
                  </p>
                </div>

                <div className="mt-4">
                  <h3 className="font-semibold mb-2">
                    Mark Therapy Attendance
                  </h3>
                  <CalendarComponent appointment={selectedAppointment} />
                </div>
              </div>
            </div>
          )}

          {/* DOCTOR ASSIGN MODAL */}
          {showDoctorModal && selectedAppointment && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
              <div className="bg-white p-6 w-[95%] max-w-md rounded-xl shadow-lg relative">
                <button
                  onClick={() => setShowDoctorModal(false)}
                  className="absolute top-3 right-4 text-2xl text-gray-500 hover:text-black"
                >
                  ✕
                </button>

                <h2 className="text-xl font-semibold mb-1 text-slate-800">
                  Assign Doctor
                </h2>
                <p className="text-sm text-slate-500 mb-4">
                  Choose a doctor for{" "}
                  <strong>{selectedAppointment.PatientName}</strong>
                </p>

                <div className="max-h-80 overflow-y-auto space-y-2">
                  {doctors.length > 0 ? (
                    doctors.map((doc) => (
                      <div
                        key={doc._id}
                        onClick={() => assignToDoctor(doc._id)}
                        className="border p-3 rounded-lg hover:bg-blue-50 transition cursor-pointer"
                      >
                        <p className="font-semibold">{doc.fullName}</p>
                        <p className="text-xs text-slate-500">
                          {doc.speciality}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-slate-500 text-sm">
                      No doctors found.
                    </p>
                  )}
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
