import React from "react";
import Sidebar from "../components/patient/Sidebar";
import TopBar from "../components/patient/TopBar";

function PatientLayout({ children }) {
  return (
    <div className="h-screen w-full bg-slate-50 text-slate-900 flex overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar />
        <main className="flex-1 overflow-y-auto px-6 py-4 lg:px-10 lg:py-6">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}

export default PatientLayout;
