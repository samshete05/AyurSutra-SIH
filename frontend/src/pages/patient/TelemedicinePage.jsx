// import React from "react";

// function TelemedicinePage() {
//   return (
//     <div className="space-y-2">
//       <h2 className="text-xl font-semibold text-slate-900">Telemedicines</h2>
//       <p className="text-sm text-slate-600">
//         Join your online consultations and see your telemedicine schedule here.
//       </p>
//     </div>
//   );
// }

// export default TelemedicinePage;


import React, { useState, useEffect } from "react";
import { Video, Calendar, Phone } from "lucide-react";
import { getCalApi } from "@calcom/embed-react";

const doctors = [
  { id: "dr-aarav", name: "Dr. Aarav Mehta", specialization: "Panchakarma Expert", namespace: "dr.-aarav-mehta" },
  { id: "dr-isha", name: "Dr. Isha Kulkarni", specialization: "Women's Health Specialist", namespace: "dr.-aarav-mehta" },
  { id: "dr-rahul", name: "Dr. Rahul Deshpande", specialization: "Chronic Pain Specialist", namespace: "dr.-aarav-mehta" }
];

function TelemedicinePage() {
  const [selectedDoctor, setSelectedDoctor] = useState(doctors[0]);

  // Initialize Cal.com embed UI
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: selectedDoctor.namespace });
      cal("ui", { layout: "month_view" });
    })();
  }, [selectedDoctor]);

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10">
      {/* Header */}
      <div className="max-w-4xl mx-auto space-y-2 mb-6">
        <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
          <Video className="w-7 h-7 text-emerald-600" />
          Telemedicine Consultations
        </h2>

        <p className="text-slate-600 text-sm md:text-base">
          Book a secure online Ayurvedic consultation with our expert doctors.
        </p>
      </div>

      {/* Main Card */}
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-6 md:p-8 space-y-6 border border-slate-200">
        
        {/* Steps Row */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
              <Phone className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">Consult Anywhere</p>
              <p className="text-xs text-slate-600">Join video calls from your home.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">Live Availability</p>
              <p className="text-xs text-slate-600">Choose an open slot instantly.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
              <Video className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">Expert Guidance</p>
              <p className="text-xs text-slate-600">Certified Ayurvedic doctors.</p>
            </div>
          </div>
        </div>

        {/* Doctor Select + Booking */}
        <div className="grid md:grid-cols-2 gap-6">
          
          {/* Left side */}
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 mb-2 block uppercase tracking-wide">
                Select Doctor
              </label>

              <select
                value={selectedDoctor.id}
                onChange={(e) =>
                  setSelectedDoctor(doctors.find((d) => d.id === e.target.value))
                }
                className="w-full rounded-xl border bg-slate-100 border-slate-300 px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                {doctors.map((doc) => (
                  <option key={doc.id} value={doc.id}>
                    {doc.name} — {doc.specialization}
                  </option>
                ))}
              </select>
            </div>

            <div className="bg-slate-100 rounded-xl p-4 border border-slate-200">
              <p className="font-semibold text-slate-800">{selectedDoctor.name}</p>
              <p className="text-sm text-slate-600">{selectedDoctor.specialization}</p>
            </div>

            {/* BOOK SESSION BUTTON */}
            <button
              data-cal-namespace={selectedDoctor.namespace}
              data-cal-link="agenixsoft.in/dr.-aarav-mehta"
              data-cal-config='{"layout":"month_view"}'
              className="w-full md:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Video className="w-4 h-4" />
              Book Telemedicine Session
            </button>
          </div>

          {/* Right side instructions */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 space-y-2">
            <h3 className="text-sm font-semibold text-emerald-900 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              How It Works
            </h3>

            <ol className="list-decimal list-inside text-xs text-emerald-900 space-y-1">
              <li>Select your preferred doctor.</li>
              <li>Click the “Book Session” button.</li>
              <li>Choose date & time on Cal.com.</li>
              <li>Confirm booking.</li>
              <li>Receive meeting link instantly.</li>
            </ol>

            <p className="text-xs text-emerald-700">
              All telemedicine calls are secure and follow Ayurveda consultation standards.
            </p>
          </div>
        </div>
      </div>

      {/* Placeholder for future session history */}
      <div className="max-w-4xl mx-auto mt-8 bg-white p-6 rounded-2xl shadow-md border border-slate-200">
        <h3 className="text-sm font-semibold text-slate-900 mb-2">Upcoming Sessions</h3>
        <p className="text-xs text-slate-500">
          Your booked telemedicine sessions will appear here (frontend only).
        </p>
      </div>
    </div>
  );
}

export default TelemedicinePage;

