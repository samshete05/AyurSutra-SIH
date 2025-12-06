import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  Loader2,
  ChevronLeft,
  CalendarCheck,
  CalendarX2,
  Share2,
  Download,
  Printer,
  QrCode,
  Navigation,
  PhoneCall,
  MessageCircle,
  FileText,
  Shield,
  Star,
  Users,
  Stethoscope,
  Pill,
  History,
  Receipt,
  AlertCircle,
  ChevronRight,
  MoreVertical,
} from "lucide-react";

const AppointmentDetails = () => {
  const { appointmentId } = useParams();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [cancellationReason, setCancellationReason] = useState("");
  const [rescheduleDate, setRescheduleDate] = useState("");
  const [rescheduleSlot, setRescheduleSlot] = useState("");
  const [showQrCode, setShowQrCode] = useState(false);

  useEffect(() => {
    fetchAppointmentDetails();
  }, [appointmentId]);

  const fetchAppointmentDetails = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("authToken");
      
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch(`http://localhost:3000/patient/appointments/${appointmentId}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok && data.message === "Success") {
        setAppointment(data.appointment);
      } else {
        navigate("/patient/appointments");
      }
    } catch (err) {
      console.error("Error fetching appointment details:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelAppointment = async () => {
    if (!cancellationReason.trim()) {
      alert("Please provide a cancellation reason");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");

      const response = await fetch("http://localhost:3000/patient/cancelAppointment", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          bookingId: appointment.bookingId,
          reason: cancellationReason
        }),
      });

      const data = await response.json();

      if (response.ok && data.message === "Appointment_Cancelled_Successfully") {
        alert("Appointment cancelled successfully");
        navigate("/patient/appointments");
      } else {
        alert(data.info || data.message || "Failed to cancel appointment");
      }
    } catch (err) {
      console.error("Error cancelling appointment:", err);
      alert("Error cancelling appointment. Please try again.");
    } finally {
      setShowCancelModal(false);
    }
  };

  const handleRescheduleAppointment = async () => {
    if (!rescheduleDate || !rescheduleSlot) {
      alert("Please select both date and time slot");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");

      const response = await fetch("http://localhost:3000/patient/rescheduleAppointment", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          bookingId: appointment.bookingId,
          newDate: rescheduleDate,
          newSlot: rescheduleSlot,
          reason: "Patient requested reschedule"
        }),
      });

      const data = await response.json();

      if (response.ok && data.message === "Appointment_Rescheduled") {
        alert("Appointment rescheduled successfully!");
        setShowRescheduleModal(false);
        fetchAppointmentDetails();
      } else {
        alert(data.message || "Failed to reschedule appointment");
      }
    } catch (err) {
      console.error("Error rescheduling appointment:", err);
      alert("Error rescheduling appointment. Please try again.");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { 
      weekday: "short",
      month: "short", 
      day: "numeric",
      year: "numeric"
    });
  };

  const getSlotTime = (slot) => {
    const slotTimes = {
      'morning': '9:00 - 12:00 AM',
      'evening': '4:00 - 7:00 PM',
      'full_day': '9:00 - 7:00 PM'
    };
    return slotTimes[slot] || slot;
  };

  const isUpcoming = appointment && new Date(appointment.appointmentDate) > new Date() && 
                    ['scheduled', 'confirmed'].includes(appointment.status);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
          <p className="mt-4 text-gray-600">Loading appointment details...</p>
        </div>
      </div>
    );
  }

  if (!appointment) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Appointment not found</h3>
          <button
            onClick={() => navigate("/patient/appointments")}
            className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Appointments
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate("/patient/appointments")}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Back</span>
            </button>
            
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Share2 className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <MoreVertical className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-emerald-100 p-3 rounded-xl">
              <Calendar className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Appointment Details</h1>
              <p className="text-sm text-gray-600">#{appointment.bookingId}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm mb-6">
          <div className={`px-6 py-4 ${
            appointment.status === 'completed' ? 'bg-emerald-50 border-b border-emerald-100' :
            appointment.status === 'cancelled' ? 'bg-red-50 border-b border-red-100' :
            'bg-blue-50 border-b border-blue-100'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {appointment.status === 'completed' ? (
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                ) : appointment.status === 'cancelled' ? (
                  <XCircle className="w-5 h-5 text-red-600" />
                ) : (
                  <Calendar className="w-5 h-5 text-blue-600" />
                )}
                <span className="font-medium capitalize">
                  {appointment.status === 'scheduled' ? 'Scheduled' : appointment.status}
                </span>
              </div>
              <button
                onClick={() => setShowQrCode(!showQrCode)}
                className="p-2 hover:bg-white/50 rounded-lg"
              >
                <QrCode className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          <div className="px-6 py-6 border-b border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-sm text-gray-600 mb-1">Date & Time</div>
                <div className="text-lg font-bold text-gray-900">
                  {formatDate(appointment.appointmentDate)}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600 mb-1">Time Slot</div>
                <div className="text-lg font-bold text-gray-900">
                  {getSlotTime(appointment.appointmentSlot)}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>Token #{appointment.tokenNumber}</span>
              <span className="mx-2">•</span>
              <IndianRupee className="w-4 h-4" />
              <span className="font-semibold">{appointment.tokenAmount}</span>
            </div>
          </div>

          <div className="px-6 py-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <Building className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 text-lg mb-1">
                  {appointment.centerId?.name}
                </h3>
                <div className="flex items-center gap-1 text-gray-600 mb-2">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{appointment.centerId?.address}</span>
                </div>
                <div className="flex flex-wrap gap-3 mt-3">
                  {appointment.centerId?.phone && (
                    <button
                      onClick={() => window.location.href = `tel:${appointment.centerId.phone}`}
                      className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      <span className="text-sm font-medium">Call</span>
                    </button>
                  )}
                  <button
                    onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(appointment.centerId?.address)}`, '_blank')}
                    className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Navigation className="w-4 h-4" />
                    <span className="text-sm font-medium">Directions</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Stethoscope className="w-5 h-5 text-gray-600" />
                <h4 className="font-semibold text-gray-900">Treatment Information</h4>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Treatment Type</span>
                  <span className="text-sm font-medium text-gray-900">General Consultation</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Doctor Assigned</span>
                  <span className="text-sm font-medium text-gray-900">Dr. Available</span>
                </div>
                {appointment.notes && (
                  <div className="pt-2 border-t border-gray-200">
                    <div className="text-sm text-gray-600 mb-1">Notes</div>
                    <div className="text-sm text-gray-900">{appointment.notes}</div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              {isUpcoming && (
                <>
                  <button
                    onClick={() => setShowRescheduleModal(true)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white border-2 border-emerald-600 text-emerald-700 rounded-xl font-medium hover:bg-emerald-50 transition-colors"
                  >
                    <CalendarCheck className="w-5 h-5" />
                    Reschedule
                  </button>
                  <button
                    onClick={() => setShowCancelModal(true)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors"
                  >
                    <CalendarX2 className="w-5 h-5" />
                    Cancel
                  </button>
                </>
              )}
              
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors">
                <Receipt className="w-5 h-5" />
                Invoice
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-5 h-5 text-blue-600" />
              <h4 className="font-semibold text-gray-900">Cancellation Policy</h4>
            </div>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Free cancellation 24 hours before appointment</li>
              <li>• 50% refund for cancellations within 24 hours</li>
              <li>• No refund for no-shows</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-2 mb-3">
              <History className="w-5 h-5 text-emerald-600" />
              <h4 className="font-semibold text-gray-900">Visit History</h4>
            </div>
            <div className="text-sm text-gray-600">
              <p>This is your {appointment.visitNumber || 'first'} visit to this center</p>
              <button className="mt-2 text-emerald-600 font-medium hover:text-emerald-700 flex items-center gap-1">
                View all visits
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {showCancelModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-red-100 p-2 rounded-lg">
                <CalendarX2 className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">Cancel Appointment</h3>
                <p className="text-sm text-gray-600">#{appointment.bookingId}</p>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reason for cancellation
              </label>
              <textarea
                value={cancellationReason}
                onChange={(e) => setCancellationReason(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                rows="3"
                placeholder="Please let us know why you're cancelling..."
              />
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
              >
                Go Back
              </button>
              <button
                onClick={handleCancelAppointment}
                className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700"
              >
                Confirm Cancellation
              </button>
            </div>
          </div>
        </div>
      )}

      {showRescheduleModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-emerald-100 p-2 rounded-lg">
                <CalendarCheck className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">Reschedule Appointment</h3>
                <p className="text-sm text-gray-600">Select new date and time</p>
              </div>
            </div>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Date
                </label>
                <input
                  type="date"
                  value={rescheduleDate}
                  onChange={(e) => setRescheduleDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Time Slot
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['morning', 'evening'].map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setRescheduleSlot(slot)}
                      className={`px-4 py-2 rounded-lg border-2 font-medium transition-colors ${
                        rescheduleSlot === slot
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                          : 'border-gray-300 text-gray-700 hover:border-emerald-300'
                      }`}
                    >
                      {slot === 'morning' ? 'Morning (9-12 AM)' : 'Evening (4-7 PM)'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowRescheduleModal(false)}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleRescheduleAppointment}
                className="flex-1 px-4 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700"
              >
                Reschedule
              </button>
            </div>
          </div>
        </div>
      )}

      {showQrCode && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-center">
            <QrCode className="w-32 h-32 mx-auto mb-4 text-gray-800" />
            <h3 className="font-bold text-gray-900 text-lg mb-2">Check-in QR Code</h3>
            <p className="text-sm text-gray-600 mb-4">
              Show this code at the reception for quick check-in
            </p>
            <button
              onClick={() => setShowQrCode(false)}
              className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentDetails;