import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Clock,
  MapPin,
  FileText,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Loader2,
  ChevronRight,
  Phone,
  Mail,
  IndianRupee,
  Sun,
  Moon,
  User,
  Activity,
  Filter,
  RefreshCw,
} from "lucide-react";

const Appointments = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all"); // all, upcoming, past
  const [cancellingId, setCancellingId] = useState(null);

  // Fetch appointments on load
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

      const response = await fetch("http://localhost:3000/patient/appointments", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok && data.message === "Success") {
        setAppointments(data.appointments);
      } else {
        console.error("Failed to fetch appointments:", data.message);
      }
    } catch (err) {
      console.error("Error fetching appointments:", err);
      if (err.response?.status === 401) {
        alert("Session expired. Please login again.");
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancelAppointment = async (bookingId) => {
    const appointment = appointments.find(apt => apt.bookingId === bookingId);
    
    if (!appointment.canCancel) {
      alert("Cannot cancel: Appointment must be cancelled at least 24 hours in advance.");
      return;
    }

    if (!window.confirm("Are you sure you want to cancel this appointment? If eligible, you will receive a full refund.")) {
      return;
    }

    try {
      setCancellingId(bookingId);
      const token = localStorage.getItem("authToken");

      const response = await fetch("http://localhost:3000/patient/cancelAppointment", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          bookingId,
          reason: "Patient requested cancellation"
        }),
      });

      const data = await response.json();

      if (response.ok && data.message === "Appointment_Cancelled_Successfully") {
        alert(data.data.info || "Appointment cancelled successfully");
        fetchAppointments(); // Refresh list
      } else {
        alert(data.info || data.message || "Failed to cancel appointment");
      }
    } catch (err) {
      console.error("Error cancelling appointment:", err);
      alert("Error cancelling appointment. Please try again.");
    } finally {
      setCancellingId(null);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return `Today, ${date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`;
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return `Tomorrow, ${date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`;
    }
    return date.toLocaleDateString("en-US", { 
      weekday: "long",
      year: "numeric", 
      month: "long", 
      day: "numeric" 
    });
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case 'scheduled':
        return { 
          color: 'bg-blue-100 text-blue-800 border-blue-200',
          icon: Clock,
          label: 'Scheduled'
        };
      case 'confirmed':
        return { 
          color: 'bg-green-100 text-green-800 border-green-200',
          icon: CheckCircle2,
          label: 'Confirmed'
        };
      case 'checked-in':
        return { 
          color: 'bg-purple-100 text-purple-800 border-purple-200',
          icon: User,
          label: 'Checked In'
        };
      case 'in-progress':
        return { 
          color: 'bg-indigo-100 text-indigo-800 border-indigo-200',
          icon: Activity,
          label: 'In Progress'
        };
      case 'completed':
        return { 
          color: 'bg-emerald-100 text-emerald-800 border-emerald-200',
          icon: CheckCircle2,
          label: 'Completed'
        };
      case 'cancelled':
        return { 
          color: 'bg-red-100 text-red-800 border-red-200',
          icon: XCircle,
          label: 'Cancelled'
        };
      case 'no-show':
        return { 
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: AlertCircle,
          label: 'No Show'
        };
      default:
        return { 
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: Clock,
          label: status
        };
    }
  };

  const getFilteredAppointments = () => {
    const now = new Date();
    
    switch (filterStatus) {
      case 'upcoming':
        return appointments.filter(apt => 
          new Date(apt.appointmentDate) >= now && 
          ['scheduled', 'confirmed'].includes(apt.status)
        );
      case 'past':
        return appointments.filter(apt => 
          new Date(apt.appointmentDate) < now || 
          ['completed', 'cancelled', 'no-show'].includes(apt.status)
        );
      default:
        return appointments;
    }
  };

  const filteredAppointments = getFilteredAppointments();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-emerald-50/30 to-emerald-100/50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-[#1E4B3C] mb-2">
                My Appointments
              </h1>
              <p className="text-sm text-gray-600">
                Manage and track your healthcare appointments
              </p>
            </div>
            
            <button
              onClick={() => navigate("/patient/find-centers")}
              className="flex items-center gap-2 bg-gradient-to-r from-[#1E4B3C] to-[#2A6850] text-white px-6 py-3 rounded-xl font-semibold hover:from-[#163A2E] hover:to-[#1E4B3C] transition-all shadow-lg hover:shadow-xl"
            >
              <Calendar className="w-5 h-5" />
              Book New Appointment
            </button>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 bg-white rounded-xl p-2 shadow-md border border-gray-200">
            {[
              { key: 'all', label: 'All Appointments' },
              { key: 'upcoming', label: 'Upcoming' },
              { key: 'past', label: 'Past' }
            ].map((filter) => (
              <button
                key={filter.key}
                onClick={() => setFilterStatus(filter.key)}
                className={`flex-1 px-4 py-2.5 rounded-lg font-semibold text-sm transition-all ${
                  filterStatus === filter.key
                    ? 'bg-[#1E4B3C] text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {filter.label}
                {filter.key !== 'all' && (
                  <span className="ml-2 text-xs opacity-75">
                    ({filter.key === 'upcoming' 
                      ? appointments.filter(apt => apt.isUpcoming).length
                      : appointments.filter(apt => !apt.isUpcoming && apt.status !== 'scheduled').length
                    })
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            <div className="bg-white rounded-xl p-4 border-2 border-blue-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total</p>
                  <p className="text-2xl font-bold text-blue-600">{appointments.length}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border-2 border-green-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Upcoming</p>
                  <p className="text-2xl font-bold text-green-600">
                    {appointments.filter(apt => apt.isUpcoming).length}
                  </p>
                </div>
                <div className="bg-green-100 p-3 rounded-lg">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border-2 border-emerald-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Completed</p>
                  <p className="text-2xl font-bold text-emerald-600">
                    {appointments.filter(apt => apt.status === 'completed').length}
                  </p>
                </div>
                <div className="bg-emerald-100 p-3 rounded-lg">
                  <Activity className="w-6 h-6 text-emerald-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Appointments List */}
        <div className="space-y-4">
          {loading ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-200">
              <Loader2 className="w-12 h-12 text-[#1E4B3C] animate-spin mx-auto mb-4" />
              <p className="text-gray-600 font-semibold">Loading appointments...</p>
            </div>
          ) : filteredAppointments.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center border-2 border-dashed border-gray-300">
              <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-10 h-10 text-gray-400" />
              </div>
              <p className="text-gray-700 text-lg font-semibold mb-2">
                No {filterStatus !== 'all' && filterStatus} appointments found
              </p>
              <p className="text-sm text-gray-500 mb-6">
                {filterStatus === 'all' 
                  ? "Book your first appointment to get started with your healthcare journey"
                  : `You don't have any ${filterStatus} appointments at the moment`
                }
              </p>
              <button
                onClick={() => navigate("/patient/find-centers")}
                className="inline-flex items-center gap-2 bg-[#1E4B3C] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#163A2E] transition-all"
              >
                <Calendar className="w-5 h-5" />
                Book New Appointment
              </button>
            </div>
          ) : (
            filteredAppointments.map((appointment) => {
              const statusConfig = getStatusConfig(appointment.status);
              const StatusIcon = statusConfig.icon;
              const SlotIcon = appointment.appointmentSlot === 'morning' ? Sun : Moon;

              return (
                <div
                  key={appointment._id}
                  className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 hover:shadow-xl transition-all overflow-hidden"
                >
                  {/* Appointment Header */}
                  <div className="bg-gradient-to-r from-[#1E4B3C] to-[#2A6850] p-6 text-white">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
                            <Calendar className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-xs opacity-75 uppercase tracking-wide">Booking ID</p>
                            <p className="text-lg font-bold">#{appointment.bookingId}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 ${statusConfig.color} bg-white`}>
                        <StatusIcon className="w-4 h-4" />
                        <span className="font-semibold text-sm">{statusConfig.label}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <Calendar className="w-4 h-4 opacity-75" />
                          <p className="text-xs opacity-75">Date</p>
                        </div>
                        <p className="font-semibold text-sm">{formatDate(appointment.appointmentDate)}</p>
                      </div>

                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <Clock className="w-4 h-4 opacity-75" />
                          <p className="text-xs opacity-75">Time Slot</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <SlotIcon className="w-4 h-4" />
                          <p className="font-semibold text-sm capitalize">
                            {appointment.appointmentSlot} ({appointment.slotDetails.startTime} - {appointment.slotDetails.endTime})
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Appointment Body */}
                  <div className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Center Details */}
                      <div>
                        <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                          <MapPin className="w-5 h-5 text-[#1E4B3C]" />
                          Center Details
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="bg-gray-50 rounded-lg p-3">
                            <p className="font-semibold text-[#1E4B3C]">{appointment.centerName}</p>
                            {appointment.centerId?.address && (
                              <p className="text-gray-600 text-xs mt-1">{appointment.centerId.address}</p>
                            )}
                          </div>
                          
                          {appointment.centerId?.phone && (
                            <div className="flex items-center gap-2 text-gray-600">
                              <Phone className="w-4 h-4 text-[#1E4B3C]" />
                              <span>{appointment.centerId.phone}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Patient Details */}
                      <div>
                        <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                          <User className="w-5 h-5 text-[#1E4B3C]" />
                          Patient Details
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="grid grid-cols-2 gap-2">
                            <div className="bg-gray-50 rounded-lg p-3">
                              <p className="text-xs text-gray-500 mb-1">Name</p>
                              <p className="font-semibold text-gray-900">{appointment.patientDetails.name}</p>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-3">
                              <p className="text-xs text-gray-500 mb-1">Age / Gender</p>
                              <p className="font-semibold text-gray-900 capitalize">
                                {appointment.patientDetails.age} yrs / {appointment.patientDetails.gender}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 text-gray-600 bg-gray-50 rounded-lg p-2">
                            <Mail className="w-4 h-4 text-[#1E4B3C]" />
                            <span className="text-xs">{appointment.patientDetails.email}</span>
                          </div>
                          
                          <div className="flex items-center gap-2 text-gray-600 bg-gray-50 rounded-lg p-2">
                            <Phone className="w-4 h-4 text-[#1E4B3C]" />
                            <span className="text-xs">+91 {appointment.patientDetails.phone}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Token & Service Info */}
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
                        <div className="flex items-center gap-3">
                          <div className="bg-blue-500 p-3 rounded-lg">
                            <FileText className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <p className="text-xs text-blue-700 font-medium">Token Number</p>
                            <p className="text-2xl font-bold text-blue-900">{appointment.tokenNumber}</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                        <div className="flex items-center gap-3">
                          <div className="bg-green-500 p-3 rounded-lg">
                            <IndianRupee className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <p className="text-xs text-green-700 font-medium">Token Amount</p>
                            <p className="text-2xl font-bold text-green-900">₹{appointment.tokenAmount}</p>
                            {appointment.paymentStatus === 'refunded' && (
                              <p className="text-xs text-green-600 mt-1">✓ Refunded</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Notes */}
                    {appointment.notes && (
                      <div className="mt-4 bg-amber-50 rounded-xl p-4 border border-amber-200">
                        <div className="flex items-start gap-2">
                          <FileText className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-xs font-semibold text-amber-900 mb-1">Additional Notes</p>
                            <p className="text-sm text-amber-800">{appointment.notes}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Cancellation Info */}
                    {appointment.status === 'cancelled' && appointment.cancellationReason && (
                      <div className="mt-4 bg-red-50 rounded-xl p-4 border border-red-200">
                        <div className="flex items-start gap-2">
                          <XCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-xs font-semibold text-red-900 mb-1">Cancellation Reason</p>
                            <p className="text-sm text-red-800">{appointment.cancellationReason}</p>
                            {appointment.cancelledAt && (
                              <p className="text-xs text-red-600 mt-1">
                                Cancelled on {new Date(appointment.cancelledAt).toLocaleDateString('en-US', {
                                  month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
                                })}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="mt-6 flex flex-wrap gap-3">
                      {appointment.canCancel && (
                        <button
                          onClick={() => handleCancelAppointment(appointment.bookingId)}
                          disabled={cancellingId === appointment.bookingId}
                          className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {cancellingId === appointment.bookingId ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              Cancelling...
                            </>
                          ) : (
                            <>
                              <XCircle className="w-4 h-4" />
                              Cancel Appointment
                            </>
                          )}
                        </button>
                      )}

                      {appointment.isUpcoming && (
                        <button
                          onClick={() => {/* Add view details or navigation */}}
                          className="flex items-center gap-2 px-6 py-3 border-2 border-[#1E4B3C] text-[#1E4B3C] rounded-xl font-semibold hover:bg-[#1E4B3C] hover:text-white transition-all"
                        >
                          View Details
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Refresh Button */}
        {!loading && appointments.length > 0 && (
          <div className="mt-6 text-center">
            <button
              onClick={fetchAppointments}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#1E4B3C] rounded-xl font-semibold border-2 border-[#1E4B3C] hover:bg-[#1E4B3C] hover:text-white transition-all shadow-md"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh Appointments
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointments;
