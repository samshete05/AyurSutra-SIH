import React, { useState } from "react";

const dummyDoctorAppointments = [
  {
    id: "apt1",
    patientName: "Rahul Sharma",
    phone: "9876543210",
    age: 28,
    gender: "Male",
    date: "2025-12-11",
    slot: "morning",
    service: "Therapy",
    amount: "500",
    notes: "Back pain issue",
    status: "scheduled",
  },
  {
    id: "apt2",
    patientName: "Priya Verma",
    phone: "9876501234",
    age: 24,
    gender: "Female",
    date: "2025-12-12",
    slot: "evening",
    service: "General Consultation",
    amount: "300",
    notes: "",
    status: "scheduled",
  },
];

const DoctorAppointments = () => {
    const [appointments] = useState(dummyDoctorAppointments);
    
    const [selectedApt, setSelectedApt] = useState(null);
    const [showPreNotificationForm, setShowPreNotificationForm] = useState(false);
    const [preMsg, setPreMsg] = useState({
      title: "",
      body: "",
    });
    const [showTherapyList, setShowTherapyList] = useState(false);
    const [showTherapySuccess, setShowTherapySuccess] = useState(false);

    const availableTherapies = [
      "Abhyanga",
      "Shirodhara",
      "Nasya",
      "Potli Massage",
      "Kati Basti",
      "Pizhichil",
      "Udvartana",
    ];


  const sendConsentLetter = () => {
    alert("Consent letter sent!");
  };

  const handleSendPreNotification = () => {
    alert("Pre-notification sent to patient!");
    setShowPreNotificationForm(false);
  };

  const cancelAppointment = () => {
    alert("Appointment cancelled!");
  };

  const rescheduleAppointment = () => {
    alert("Reschedule popup will open here!");
  };

  return (
    <div className="space-y-8 p-4">
      {/* HEADER */}
      <h2 className="text-xl font-semibold text-slate-800">
        All Appointments
      </h2>

      {/* LIST VIEW */}
      {!selectedApt && (
        <div className="bg-white p-6 rounded-3xl shadow-lg overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-slate-500 border-b">
                <th className="py-2 text-left">Patient</th>
                <th className="py-2 text-left">Date</th>
                <th className="py-2 text-left">Slot</th>
                <th className="py-2 text-left">Service</th>
                <th className="py-2 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {appointments.map((apt) => (
                <tr
                  key={apt.id}
                  className="border-b hover:bg-slate-50 transition"
                >
                  <td className="py-3">
                    <div className="font-medium">{apt.patientName}</div>
                    <div className="text-xs text-slate-500">{apt.phone}</div>
                  </td>

                  <td className="py-3">{apt.date}</td>
                  <td className="py-3 capitalize">{apt.slot}</td>
                  <td className="py-3">{apt.service}</td>

                  <td className="py-3 space-x-2">
                    <button
                      onClick={() => {
                        setSelectedApt(apt);
                      }}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs"
                    >
                      View Details
                    </button>

                    <button
                      onClick={() => setShowPreNotificationForm(apt.id)}
                      className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-xs"
                    >
                      Pre-Notify
                    </button>

                    <button
                      onClick={sendConsentLetter}
                      className="px-3 py-1 bg-orange-100 text-orange-700 rounded-lg text-xs"
                    >
                      Consent Letter
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* PRE-NOTIFICATION FORM */}
      {showPreNotificationForm && !selectedApt && (
        <div className="bg-white p-6 rounded-3xl shadow-lg max-w-lg">
          <h3 className="font-semibold text-slate-800 mb-4">
            Send Pre-Notification
          </h3>

          <input
            type="text"
            placeholder="Message Title"
            value={preMsg.title}
            onChange={(e) =>
              setPreMsg({ ...preMsg, title: e.target.value })
            }
            className="w-full px-3 py-2 bg-slate-100 rounded-xl mb-3"
          />

          <textarea
            placeholder="Message Body"
            value={preMsg.body}
            onChange={(e) =>
              setPreMsg({ ...preMsg, body: e.target.value })
            }
            className="w-full px-3 py-2 bg-slate-100 rounded-xl mb-3"
          />

          <div className="flex gap-2">
            <button
              onClick={handleSendPreNotification}
              className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-sm"
            >
              Send
            </button>

            <button
              onClick={() => setShowPreNotificationForm(false)}
              className="px-4 py-2 bg-slate-200 text-slate-700 rounded-xl text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* APPOINTMENT DETAILS CARD */}
      {selectedApt && (
        <div className="bg-white p-6 rounded-3xl shadow-lg max-w-2xl">
          <button
            onClick={() => setSelectedApt(null)}
            className="text-xs text-slate-500 underline mb-4"
          >
            ← Back to Appointments
          </button>

          <h3 className="text-lg font-semibold mb-4">Appointment Details</h3>

          <div className="space-y-3 text-sm">
            <p><strong>Patient:</strong> {selectedApt.patientName}</p>
            <p><strong>Phone:</strong> {selectedApt.phone}</p>
            <p><strong>Age:</strong> {selectedApt.age}</p>
            <p><strong>Gender:</strong> {selectedApt.gender}</p>
            <p><strong>Service:</strong> {selectedApt.service}</p>
            <p><strong>Date:</strong> {selectedApt.date}</p>
            <p><strong>Slot:</strong> {selectedApt.slot}</p>
            <p><strong>Amount:</strong> ₹{selectedApt.amount}</p>
            <p><strong>Notes:</strong> {selectedApt.notes || "—"}</p>
            <p><strong>Status:</strong> {selectedApt.status}</p>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={cancelAppointment}
              className="px-4 py-2 bg-red-100 text-red-700 rounded-xl text-sm"
            >
              Cancel Appointment
            </button>

            <button
              onClick={rescheduleAppointment}
              className="px-4 py-2 bg-blue-100 text-blue-700 rounded-xl text-sm"
            >
              Reschedule
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorAppointments;
