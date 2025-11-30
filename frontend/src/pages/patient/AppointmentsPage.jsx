import React, { useState } from "react";
import { HeartPulse, Clock, CalendarCheck, CalendarX, X } from "lucide-react";

const dummyUpcoming = [
  { id: 1, therapyName: "Shirodhara", dateTime: "Mar 18, 2024 · 14:00", duration: "45m", description: "Calming oil and head therapy.", imgSrc: "https://images.unsplash.com/photo-1556228724-4e866b065b09?auto=format&fit=crop&w=400&q=60" },
  { id: 2, therapyName: "Abhyanga", dateTime: "Mar 20, 2024 · 10:00", duration: "30m", description: "Full body oil massage for rejuvenation.", imgSrc: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=60" },
  { id: 3, therapyName: "Panchakarma", dateTime: "Mar 25, 2024 · 16:00", duration: "60m", description: "Detoxification therapy for balance.", imgSrc: "https://images.unsplash.com/photo-1499696014601-6d0acf753d35?auto=format&fit=crop&w=400&q=60" },
];

const dummyPast = [
  { id: 4, therapyName: "Nasya", dateTime: "Feb 18, 2024 · 09:00", duration: "40m", description: "Nasal therapy for cleansing.", imgSrc: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=400&q=60" },
  { id: 5, therapyName: "Swedana", dateTime: "Feb 10, 2024 · 11:00", duration: "50m", description: "Herbal steam therapy.", imgSrc: "https://images.unsplash.com/photo-1518704073962-fb069b8b43e7?auto=format&fit=crop&w=400&q=60" },
];

function AppointmentCard({ therapyName, dateTime, duration, status, onClick }) {
  const bgColor = status === "upcoming" ? "bg-emerald-50" : "bg-slate-100";
  const borderColor = status === "upcoming" ? "border-emerald-200" : "border-slate-300";
  const Icon = status === "upcoming" ? CalendarCheck : CalendarX;

  return (
    <div
      onClick={onClick}
      tabIndex={0}
      role="button"
      className={`rounded-xl border ${borderColor} ${bgColor} px-4 py-3 flex items-center justify-between shadow-sm hover:shadow-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-shadow duration-300`}
      aria-label={`${therapyName} appointment on ${dateTime}`}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick() }}
    >
      <div className="flex items-center gap-3">
        <div className={`h-10 w-10 rounded-full flex items-center justify-center text-emerald-600`}>
          <Icon size={22} className="stroke-[2]" />
        </div>
        <div>
          <p className="text-base font-semibold text-slate-900">{therapyName}</p>
          <p className="text-xs text-slate-600">{dateTime}</p>
        </div>
      </div>
      <div className="text-xs text-slate-600">
        <span className="px-2 py-0.5 rounded-full bg-white border border-slate-300">
          {duration}
        </span>
      </div>
    </div>
  );
}

function AppointmentModal({ appointment, onClose, markCompleted }) {
  if (!appointment) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-xl relative p-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-600 hover:text-slate-900"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={appointment.imgSrc}
            alt={`${appointment.therapyName} therapy`}
            className="w-full md:w-48 h-32 md:h-auto object-cover rounded-xl shadow-md"
          />
          <div className="flex-1">
            <h3 className="text-2xl font-semibold text-slate-900 mb-2">{appointment.therapyName}</h3>
            <p className="text-sm text-slate-600 mb-1">{appointment.dateTime}</p>
            <p className="text-sm text-slate-600 mb-4">Duration: {appointment.duration}</p>
            <p className="text-base text-slate-700">{appointment.description}</p>

            {appointment.status === "upcoming" && (
              <button
                onClick={() => markCompleted(appointment.id)}
                className="mt-6 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition"
              >
                Mark as Completed
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AppointmentsPage() {
  const [upcomingAppointments, setUpcomingAppointments] = useState(
    dummyUpcoming.map(a => ({ ...a, status: "upcoming" }))
  );
  const [pastAppointments, setPastAppointments] = useState(
    dummyPast.map(a => ({ ...a, status: "past" }))
  );

  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const openModal = (appointment) => {
    setSelectedAppointment(appointment);
  };

  const closeModal = () => {
    setSelectedAppointment(null);
  };

  const markCompleted = (id) => {
    // Move appointment from upcoming to past
    const completed = upcomingAppointments.find(a => a.id === id);
    if (!completed) return;

    setUpcomingAppointments(upcomingAppointments.filter(a => a.id !== id));
    setPastAppointments([{ ...completed, status: "past" }, ...pastAppointments]);
    closeModal();
  };

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
          <HeartPulse size={32} className="stroke-emerald-600" />
          Appointments
        </h1>
        <p className="text-base text-slate-700 max-w-2xl">
          Manage your upcoming and past Ayurvedic therapy appointments here.
        </p>
      </div>

      {/* Upcoming */}
      <section>
        <h2 className="text-xl font-semibold text-emerald-700 mb-3 flex items-center gap-2">
          <Clock size={20} />
          Upcoming Appointments
        </h2>
        {upcomingAppointments.length === 0 ? (
          <p className="text-sm italic text-slate-500">No upcoming appointments.</p>
        ) : (
          <div className="space-y-3">
            {upcomingAppointments.map(appointment => (
              <AppointmentCard
                key={appointment.id}
                {...appointment}
                onClick={() => openModal(appointment)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Past */}
      <section>
        <h2 className="text-xl font-semibold text-slate-700 mb-3 flex items-center gap-2">
          <CalendarCheck size={20} className="text-slate-700" />
          Past Appointments
        </h2>
        {pastAppointments.length === 0 ? (
          <p className="text-sm italic text-slate-500">No past appointments.</p>
        ) : (
          <div className="space-y-3">
            {pastAppointments.map(appointment => (
              <AppointmentCard
                key={appointment.id}
                {...appointment}
                onClick={() => openModal(appointment)}
              />
            ))}
          </div>
        )}
      </section>

      <AppointmentModal
        appointment={selectedAppointment}
        onClose={closeModal}
        markCompleted={markCompleted}
      />
    </main>
  );
}
