import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Clock,
  MapPin,
  Building,
  Phone,
  Mail,
  IndianRupee,
  XCircle,
  CheckCircle,
  AlertCircle,
  Loader2,
  ChevronRight,
  Filter,
  CalendarDays,
  CalendarX2,
  CalendarCheck,
  Clock3,
} from "lucide-react";

const Appointments = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [cancellingId, setCancellingId] = useState(null);

  const slotTimes = {
    morning: "9:00 AM - 12:00 PM",
    evening: "4:00 PM - 7:00 PM",
    full_day: "9:00 AM - 7:00 PM",
  };

  const getSlotTime = (slot) => slotTimes[slot] || slot;

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("authToken");
      if (!token) {
        navigate("/login");
        return;
      }

      const res = await fetch("http://localhost:3000/patient/appointments", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      console.log("📌 APPOINTMENTS:", data);

      if (res.ok && data.message === "Success") {
        const mapped = data.appointments.map((apt) => ({
          ...apt,
          status: apt.appointmentDetails.status,
          appointmentDate: apt.appointmentDetails.appointmentDate,
          appointmentSlot: apt.appointmentDetails.appointmentSlot,
        }));

        setAppointments(mapped);
      }
    } catch (err) {
      console.error("Error fetching appointments:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelAppointment = async (bookingId) => {
    if (!confirm("Are you sure you want to cancel this appointment?")) return;

    try {
      setCancellingId(bookingId);
      const token = localStorage.getItem("authToken");

      const res = await fetch("http://localhost:3000/patient/cancelAppointment", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookingId,
          reason: "Patient requested cancellation",
        }),
      });

      const result = await res.json();

      if (res.ok) {
        alert("Appointment cancelled.");
        fetchAppointments();
      } else {
        alert(result.message);
      }
    } finally {
      setCancellingId(null);
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const statusMap = {
    scheduled: {
      label: "Scheduled",
      icon: Clock3,
      bg: "bg-gradient-to-r from-blue-50 to-blue-100",
      color: "text-blue-700",
    },
    confirmed: {
      label: "Confirmed",
      icon: CalendarCheck,
      bg: "bg-gradient-to-r from-green-50 to-green-100",
      color: "text-green-700",
    },
    completed: {
      label: "Completed",
      icon: CheckCircle,
      bg: "bg-gradient-to-r from-emerald-50 to-emerald-100",
      color: "text-emerald-700",
    },
    cancelled: {
      label: "Cancelled",
      icon: CalendarX2,
      bg: "bg-gradient-to-r from-red-50 to-red-100",
      color: "text-red-700",
    },
  };

  const filterAppointments = () => {
    switch (filter) {
      case "upcoming":
        return appointments.filter((apt) => apt.isUpcoming);
      case "completed":
        return appointments.filter((apt) => apt.status === "completed");
      case "cancelled":
        return appointments.filter((apt) => apt.status === "cancelled");
      default:
        return appointments;
    }
  };

  const filtered = filterAppointments();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-5 md:p-6">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Appointments</h1>
            <p className="text-gray-600">View and manage your clinic appointments</p>
          </div>

          <button
            onClick={() => navigate("/patient/find-centers")}
            className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-3 rounded-lg shadow hover:bg-emerald-700 transition"
          >
            <Calendar className="w-5 h-5" />
            Book Appointment
          </button>
        </div>

        {/* FILTER TABS */}
        <div className="flex gap-2 mb-6">
          {[
            { key: "all", label: "All", icon: CalendarDays },
            { key: "upcoming", label: "Upcoming", icon: CalendarCheck },
            { key: "completed", label: "Completed", icon: CheckCircle },
            { key: "cancelled", label: "Cancelled", icon: CalendarX2 },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                  filter === tab.key
                    ? "bg-emerald-600 text-white shadow"
                    : "bg-white text-gray-700 shadow-sm"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* LOADING */}
        {loading ? (
          <div className="text-center py-20">
            <Loader2 className="w-12 h-12 animate-spin text-emerald-600 mx-auto" />
            <p className="mt-3 text-gray-600">Loading appointments...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center bg-white rounded-xl py-16 shadow-sm">
            <Calendar className="w-14 h-14 text-gray-300 mx-auto" />
            <p className="text-gray-500 mt-4">No appointments found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {filtered.map((apt) => {
              const status = statusMap[apt.status] || statusMap.scheduled;
              const Icon = status.icon;

              return (
                <div
                  key={apt.appointmentDetails._id}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden"
                >
                  {/* HEADER */}
                  <div className={`px-4 py-3 ${status.bg}`}>
                    <div className="flex justify-between items-center">
                      <div className={`flex items-center gap-2 ${status.color}`}>
                        <Icon className="w-4 h-4" />
                        <span className="font-medium">{status.label}</span>
                      </div>
                      <span className="text-gray-600 text-sm">
                        #{apt.appointmentDetails._id.slice(-6)}
                      </span>
                    </div>
                  </div>

                  {/* BODY */}
                  <div className="p-5">

                    {/* CENTER INFO */}
                    <div className="flex gap-3 mb-4">
                      <div className="bg-emerald-100 p-2 rounded-lg shadow-sm">
                        <Building className="w-5 h-5 text-emerald-700" />
                      </div>

                      <div>
                        <h3 className="font-semibold text-lg text-gray-900">
                          {apt.centerDetails.CenterName}
                        </h3>

                        <p className="flex gap-1 text-sm text-gray-600 mt-1">
                          <MapPin className="w-4 h-4" />
                          {apt.centerDetails.mainAddress}
                        </p>

                        <p className="flex gap-1 text-sm text-gray-600 mt-1">
                          <Phone className="w-4 h-4" />
                          {apt.centerDetails.MobileNo}
                        </p>
                      </div>
                    </div>

                    {/* APPOINTMENT DETAILS */}
                    <div className="grid grid-cols-2 gap-3 mt-4">
                      <div className="bg-gray-50 rounded-lg p-3 shadow-sm">
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Date
                        </p>
                        <p className="font-semibold">
                          {formatDate(apt.appointmentDetails.appointmentDate)}
                        </p>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-3 shadow-sm">
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Slot
                        </p>
                        <p className="font-semibold capitalize">
                          {apt.appointmentDetails.appointmentSlot}
                        </p>
                        <p className="text-xs text-gray-500">
                          {getSlotTime(apt.appointmentDetails.appointmentSlot)}
                        </p>
                      </div>
                    </div>

                    {/* PAYMENT */}
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center gap-2 text-gray-700">
                        <IndianRupee className="w-4 h-4" />
                        <span className="font-semibold">{apt.tokenAmount}</span>
                      </div>

                      {apt.paymentStatus === "refunded" && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                          Refunded
                        </span>
                      )}
                    </div>

                    {/* ACTION BUTTONS */}
                    <div className="flex gap-2 mt-5">

                      {apt.canCancel && (
                        <button
                          onClick={() => handleCancelAppointment(apt.appointmentDetails._id)}
                          disabled={cancellingId === apt.appointmentDetails._id}
                          className="flex-1 flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-700 py-2 rounded-lg transition"
                        >
                          {cancellingId === apt.appointmentDetails._id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <XCircle className="w-4 h-4" />
                          )}
                          Cancel
                        </button>
                      )}


                      <button onClick={()=>navigate("/patient/appointment-details",{state:{Alldata:apt}})} className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg transition">
                        Details <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}

          </div>
        )}

        {/* REFRESH BUTTON */}
        {!loading && appointments.length > 0 && (
          <div className="text-center mt-8">
            <button
              onClick={fetchAppointments}
              className="bg-white shadow-sm hover:shadow px-5 py-2 rounded-lg flex items-center gap-2 mx-auto"
            >
              <Filter className="w-4 h-4" /> Refresh
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointments;
