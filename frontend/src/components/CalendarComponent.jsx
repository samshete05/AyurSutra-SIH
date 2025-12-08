import React, { useState, useEffect } from "react";

function CalendarComponent({ appointment }) {
  const [attendance, setAttendance] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);

  const markAttendance = async (status) => {
    if (!selectedDate) return alert("Select a date!");

    const body = {
      appointmentId: appointment._id,
      patientId: appointment.PatientId,
      centerId: appointment.CenterId,
      therapyId: appointment.TherapyId,
      date: selectedDate,
      status,
    };
    console.log("SELECTED APPOINTMENT FULL OBJECT:", appointment);



    const res = await fetch("http://localhost:3000/PanchKarmaCenter/mark-therapy-attendance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Attendance updated");
    }
  };

  return (
    <div className="bg-slate-50 p-4 rounded-xl">
      <div className="grid grid-cols-7 gap-2">
        {[...Array(30).keys()].map((i) => {
          const date = new Date();
          date.setDate(date.getDate() - i);
          const formatted = date.toISOString().split("T")[0];

          return (
            <button
              key={i}
              onClick={() => setSelectedDate(formatted)}
              className={`p-3 rounded-lg text-xs border ${
                selectedDate === formatted
                  ? "bg-emerald-600 text-white"
                  : "bg-white"
              }`}
            >
              {formatted}
            </button>
          );
        })}
      </div>

      {selectedDate && (
        <div className="mt-4 flex gap-3">
          <button
            onClick={() => markAttendance("present")}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg"
          >
            Mark Present
          </button>
          <button
            onClick={() => markAttendance("absent")}
            className="px-4 py-2 bg-red-500 text-white rounded-lg"
          >
            Mark Absent
          </button>
        </div>
      )}
    </div>
  );
}

export default CalendarComponent;
