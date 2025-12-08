import React from 'react'

const DoctorDashboard = () => {
  return (
    <div>DoctorDashboard</div>
  )
}

export default DoctorDashboard













// import React, { useState } from "react";

// const DoctorDashboard = () => {
//   const [activeSection, setActiveSection] = useState("appointments");

//   // ------------------ DUMMY MESSAGES (No backend needed) ------------------
//   const messages = [
//     {
//       _id: "1",
//       text: "Patient Ramesh – Panchakarma session at 3 PM",
//       createdAt: "2025-01-01T10:00:00Z",
//       read: false,
//     },
//     {
//       _id: "2",
//       text: "Patient Sita – Consultation scheduled at 5 PM",
//       createdAt: "2025-01-02T09:30:00Z",
//       read: true,
//     },
//     {
//       _id: "3",
//       text: "Patient Mahesh – Follow-up tomorrow 11 AM",
//       createdAt: "2025-01-03T14:10:00Z",
//       read: false,
//     },
//   ];

//   return (
//     <div className="min-h-screen flex bg-slate-100">
//       <Sidebar active={activeSection} onChange={setActiveSection} />

//       <main className="flex-1 p-6">
//         {activeSection === "dashboard" && <DashboardHome />}
//         {activeSection === "appointments" && <Appointments messages={messages} />}
//         {activeSection === "profile" && <Profile />}
//       </main>
//     </div>
//   );
// };

// /* ---------------- Sidebar ---------------- */

// const Sidebar = ({ active, onChange }) => {
//   const items = [
//     { key: "dashboard", label: "Dashboard Overview" },
//     { key: "appointments", label: "My Appointments" },
//     { key: "profile", label: "My Profile" },
//   ];

//   return (
//     <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col">
//       <div className="px-6 py-6 border-b border-slate-200">
//         <h1 className="text-xl font-bold text-slate-800">Doctor Panel</h1>
//         <p className="text-sm text-slate-500">Panchkarma System</p>
//       </div>

//       <nav className="flex flex-col p-4 space-y-2">
//         {items.map((item) => (
//           <button
//             key={item.key}
//             onClick={() => onChange(item.key)}
//             className={`w-full text-left px-4 py-2 rounded-lg transition ${
//               active === item.key
//                 ? "bg-slate-900 text-white font-semibold"
//                 : "text-slate-700 hover:bg-slate-100"
//             }`}
//           >
//             {item.label}
//           </button>
//         ))}
//       </nav>

//       <div className="mt-auto p-4">
//         <button className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
//           Logout
//         </button>
//       </div>
//     </aside>
//   );
// };

// /* ---------------- Dashboard Home ---------------- */

// const DashboardHome = () => (
//   <div className="bg-white p-6 rounded-xl shadow-sm">
//     <h2 className="text-2xl font-bold text-slate-800">Welcome, Doctor 👋</h2>
//     <p className="text-slate-600 mt-2">
//       Use the left menu to navigate your dashboard.
//     </p>

//     <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
//       <StatCard label="Total Appointments" value="3" />
//       <StatCard label="Unread Messages" value="2" />
//       <StatCard label="Pending Tasks" value="—" />
//     </div>
//   </div>
// );

// const StatCard = ({ label, value }) => (
//   <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
//     <p className="text-sm text-slate-600">{label}</p>
//     <p className="text-2xl font-bold text-slate-800">{value}</p>
//   </div>
// );

// /* ---------------- Appointments (Messages) ---------------- */

// const Appointments = ({ messages }) => {
//   // sort newest -> oldest
//   const sortedMessages = [...messages].sort(
//     (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//   );

//   return (
//     <div className="bg-white p-6 rounded-xl shadow-sm">
//       <h2 className="text-xl font-bold text-slate-900">My Appointments</h2>
//       <p className="text-slate-600 text-sm mb-4">
//         These messages are sent by the center head.
//       </p>

//       <div className="space-y-4">
//         {sortedMessages.map((msg) => (
//           <div
//             key={msg._id}
//             className="border border-slate-200 bg-slate-50 p-4 rounded-lg"
//           >
//             <p className="text-slate-900 font-medium">{msg.text}</p>

//             <p className="text-xs text-slate-500 mt-1">
//               {new Date(msg.createdAt).toLocaleString()}
//             </p>

//             {!msg.read && (
//               <span className="inline-block mt-2 px-2 py-1 text-xs bg-emerald-100 text-emerald-700 rounded-full">
//                 New
//               </span>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };


// /* ---------------- Profile ---------------- */

// const Profile = () => (
//   <div className="bg-white p-6 rounded-xl shadow-sm">
//     <h2 className="text-xl font-bold text-slate-900">My Profile</h2>
//     <p className="text-slate-600 text-sm mb-3">
//       Basic information about the doctor.
//     </p>

//     <ProfileField label="Name" value="Doctor Name" />
//     <ProfileField label="Email" value="doctor@example.com" />
//     <ProfileField label="Center" value="Nagpur Panchakarma Center" />
//   </div>
// );

// const ProfileField = ({ label, value }) => (
//   <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 mt-3">
//     <p className="text-xs text-slate-500">{label}</p>
//     <p className="text-slate-800 font-medium">{value}</p>
//   </div>
// );

// export default DoctorDashboard;
