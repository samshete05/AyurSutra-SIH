import React, { useState, useEffect } from "react";
import { CheckCircle, XCircle, CalendarDays } from "lucide-react";

function CalendarComponent({ appointment, attendanceData = [] }) {
  const [selectedDate, setSelectedDate] = useState(null);

  // Format date to yyyy-mm-dd
  const formatDate = (date) => date.toISOString().split("T")[0];

  const today = new Date();

  // Attendance color map
  const statusColors = {
    present: "bg-emerald-100 text-emerald-700 border-emerald-300",
    absent: "bg-red-100 text-red-700 border-red-300",
    not_marked: "bg-slate-100 text-slate-500 border-slate-300",
  };

  // Main function to mark attendance
  const markAttendance = async (selectedDate, status) => {
    if (!selectedDate) return alert("Select a date!");

    const body = {
      appointmentId: appointment._id,
      patientId: appointment.patientId,
      centerId: appointment.centerId || appointment.CenterId,
      therapyId: appointment.therapyId,
      date: selectedDate,
      status,
    };

    if (!appointment.therapyId) {
      alert("This appointment has no therapy assigned yet.");
      return;
    }

    const res = await fetch(
      "http://localhost:3000/PanchKarmaCenter/mark-therapy-attendance",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );

    const data = await res.json();
    if (res.ok) {
      alert("Attendance updated successfully!");
    }
  };

  // Only allow marking attendance from NEXT DAY of appointment
  const allowedStart = new Date(appointment.appointmentDate);
  allowedStart.setDate(allowedStart.getDate() + 1);

  return (
    <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">

      {/* HEADER */}
      <div className="flex items-center gap-3 mb-4">
        <CalendarDays className="text-emerald-600" size={22} />
        <h3 className="text-lg font-semibold text-slate-800">
          Therapy Attendance Calendar
        </h3>
      </div>

      {/* CALENDAR GRID */}
      <div className="grid grid-cols-7 gap-3 text-center text-sm">
        {[...Array(30).keys()].map((i) => {
          const date = new Date();
          date.setDate(date.getDate() - i);
          const formatted = formatDate(date);

          const isToday = formatted === formatDate(today);

          // find attendance
          const markedEntry = attendanceData.find(
            (d) => d.date.split("T")[0] === formatted
          );

          // Determine if clickable
          const isDisabled = date < allowedStart;

          return (
            <div
              key={i}
              onClick={() => !isDisabled && setSelectedDate(formatted)}
              className={`
                group cursor-pointer rounded-xl p-3 border transition-all
                ${isDisabled ? "opacity-40 cursor-not-allowed" : "hover:shadow-md"}
                ${
                  selectedDate === formatted
                    ? "bg-emerald-600 text-white border-emerald-600"
                    : "bg-slate-50 text-slate-700 border-slate-300"
                }
                ${markedEntry ? statusColors[markedEntry.status] : ""}
              `}
            >
              <div className="text-xs font-medium">
                {formatted}
              </div>

              {/* Status icons */}
              {markedEntry && (
                <div className="mt-1 flex justify-center">
                  {markedEntry.status === "present" && (
                    <CheckCircle size={18} className="text-emerald-600" />
                  )}
                  {markedEntry.status === "absent" && (
                    <XCircle size={18} className="text-red-600" />
                  )}
                </div>
              )}

              {/* Today badge */}
              {isToday && (
                <div className="mt-1 text-[10px] font-semibold text-emerald-600">
                  Today
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ACTION BUTTONS */}
      {selectedDate && (
        <div className="mt-6 flex gap-4 justify-center">
          <button
            onClick={() => markAttendance(selectedDate,"present")}
            className="px-5 py-2 bg-emerald-600 text-white rounded-lg shadow hover:bg-emerald-700"
          >
            ✓ Mark Present
          </button>

          <button
            onClick={() => markAttendance(selectedDate,"absent")}
            className="px-5 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600"
          >
            ✕ Mark Absent
          </button>
        </div>
      )}
    </div>
  );
}

export default CalendarComponent;
