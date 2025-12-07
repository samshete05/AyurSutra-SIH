import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Building,
  Phone,
  Mail,
  User,
  IndianRupee,
  XCircle,
  CalendarClock,
  Loader2,
  Shield,
  Printer,
  Download,
  AlertCircle,
  Star,
  MessageCircle
} from "lucide-react";

const AppointmentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);
  const [rescheduling, setRescheduling] = useState(false);
  const [showReschedule, setShowReschedule] = useState(false);
  const [showCancel, setShowCancel] = useState(false);

  const allData = location.state?.Alldata || null;
  console.log(allData);

  // ---------------- TRANSFORM allData INTO UI-FRIENDLY OBJECT ----------------
  useEffect(() => {
    if (!allData) {
      setLoading(false);
      return;
    }

    const transformed = {
      _id: allData.appointmentDetails?._id || "N/A",
      status: allData.status || "scheduled",

      // Patient Info
      patientName: allData.patientDetails?.name || "Unknown Patient",
      patientAge: allData.patientDetails?.age || "N/A",
      patientGender: allData.patientDetails?.gender || "N/A",
      patientContact: allData.patientDetails?.phoneNo || "N/A",
      patientEmail: allData.patientDetails?.email || "N/A",

      // Center Info
      centerDetails: {
        CenterName: allData.centerDetails?.CenterName || "Unknown Center",
        mainAddress: allData.centerDetails?.mainAddress || "No address available",
        MobileNo: allData.centerDetails?.MobileNo || "N/A",
        Email: allData.centerDetails?.Email || "N/A",
        rating: allData.centerDetails?.rating || 4.5
      },

      // Appointment Details
      appointmentDetails: {
        appointmentDate: allData.appointmentDate || "N/A",
        appointmentSlot: allData.appointmentDetails?.appointmentSlot || "N/A",
        tokenNumber: allData.appointmentDetails?.tokenNumber || "N/A",
        doctorAssigned: allData.doctorDetails?.fullName || "Doctor not assigned",
        roomNumber: allData.doctorDetails?.roomNumber || "N/A"
      },

      tokenAmount: allData.tokenAmount || 0,
      paymentStatus: allData.appointmentDetails?.PaymentStatus || "pending",

      notes: allData.notes || "",
      services: allData.services || ["General Consultation"],

      canCancel:
        allData.status === "scheduled" || allData.status === "confirmed",
      canReschedule:
        allData.status === "scheduled" || allData.status === "confirmed"
    };

    setAppointment(transformed);
    setLoading(false);
  }, []);

  // ----------------------- ACTION HANDLERS -----------------------
  const handleCancel = async () => {
    setCancelling(true);
    setTimeout(() => {
      alert("Appointment cancelled successfully");
      setCancelling(false);
      setShowCancel(false);
      navigate("/patient/appointments");
    }, 900);
  };

  const handleReschedule = async () => {
    if (!showReschedule) return setShowReschedule(true);

    setRescheduling(true);
    setTimeout(() => {
      alert("Appointment rescheduled successfully");
      setRescheduling(false);
      setShowReschedule(false);
    }, 900);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  };

  const getSlotTime = (slot) => {
    const times = {
      morning: "9:00 AM - 12:00 PM",
      evening: "4:00 PM - 7:00 PM",
      full_day: "9:00 AM - 7:00 PM"
    };
    return times[slot] || slot;
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // -------------------------- LOADING --------------------------
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-emerald-600 mx-auto" />
          <p className="mt-4 text-gray-600">Loading appointment details...</p>
        </div>
      </div>
    );
  }

  // -------------------------- NULL STATE --------------------------
  if (!appointment) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-700">
            Appointment not found
          </h2>
          <button
            onClick={() => navigate("/patient/appointments")}
            className="mt-4 cursor-pointer px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-emerald-700"
          >
            Back to Appointments
          </button>
        </div>
      </div>
    );
  }

  // -------------------------- MAIN UI (UNCHANGED) --------------------------
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
      
        {/* HEADER */}
        <div className="mb-6">
          <button
            onClick={() => navigate("/patient/appointments")}
            className="flex cursor-pointer items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Appointments
          </button>

          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Appointment Details
              </h1>

              <div className="flex items-center gap-3 mt-2">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(
                    appointment.status
                  )}`}
                >
                  {appointment.status.charAt(0).toUpperCase() +
                    appointment.status.slice(1)}
                </span>

                <span className="text-gray-500 text-sm">
                  ID: #{appointment._id.slice(-6)}
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Printer className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Download className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* LEFT CONTENT */}
          <div className="lg:col-span-2 space-y-6">

            {/* Center Info */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-emerald-100 p-3 rounded-lg">
                  <Building className="w-6 h-6 text-emerald-600" />
                </div>

                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    {appointment.centerDetails.CenterName}
                  </h2>

                  <div className="flex items-center gap-2 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(appointment.centerDetails.rating)
                            ? "text-amber-400 fill-amber-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>

                  <div className="space-y-2">
                    <p className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      {appointment.centerDetails.mainAddress}
                    </p>

                    <p className="flex items-center gap-2 text-gray-600">
                      <Phone className="w-4 h-4" />
                      {appointment.centerDetails.MobileNo}
                    </p>

                    <p className="flex items-center gap-2 text-gray-600">
                      <Mail className="w-4 h-4" />
                      {appointment.centerDetails.Email}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Appointment Information */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Appointment Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Date & Time */}
                <div className="space-y-4">
                  
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Date</p>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-emerald-600" />
                      <p className="font-semibold">
                        {formatDate(appointment.appointmentDetails.appointmentDate)}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 mb-1">Time Slot</p>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-emerald-600" />
                      <div>
                        <p className="font-semibold capitalize">
                          {appointment.appointmentDetails.appointmentSlot}
                        </p>
                        <p className="text-sm text-gray-500">
                          {getSlotTime(appointment.appointmentDetails.appointmentSlot)}
                        </p>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Doctor & Payment */}
                <div className="space-y-4">
                  
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Doctor</p>
                    <div className="flex items-center gap-2">
                      <User className="w-5 h-5 text-emerald-600" />
                      <p className="font-semibold">
                        {appointment.appointmentDetails.doctorAssigned}
                      </p>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Room {appointment.appointmentDetails.roomNumber}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 mb-1">Token Amount</p>
                    <div className="flex items-center gap-2">
                      <IndianRupee className="w-5 h-5 text-emerald-600" />
                      <p className="font-semibold">{appointment.tokenAmount}</p>
                      <span
                        className={`ml-2 text-xs px-2 py-1 rounded ${
                          appointment.paymentStatus === "paid"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {appointment.paymentStatus.toUpperCase()}
                      </span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Token Number */}
              <div className="mt-6 pt-6 border-t">
                <p className="text-sm text-gray-500 mb-2">Token Number</p>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-emerald-700">
                      {appointment.appointmentDetails.tokenNumber}
                    </span>
                    <button className="text-sm text-emerald-600 hover:text-emerald-700">
                      Show at reception
                    </button>
                  </div>
                </div>
              </div>

              {/* Notes */}
              {appointment.notes && (
                <div className="mt-6 pt-6 border-t">
                  <p className="text-sm text-gray-500 mb-2">Important Notes</p>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-gray-700">{appointment.notes}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Services */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Services Included
              </h3>
              <div className="flex flex-wrap gap-2">
                {appointment.services.map((service, index) => (
                  <span
                    key={index}
                    className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="space-y-6">

            {/* Patient Information */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Patient Information
              </h3>

              <div className="space-y-4">
                
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-semibold">{appointment.patientName}</p>
                    <p className="text-sm text-gray-500">
                      Patient ID: #{appointment._id.slice(-6)}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-sm text-gray-500">Age</p>
                    <p className="font-medium">{appointment.patientAge} years</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Gender</p>
                    <p className="font-medium capitalize">
                      {appointment.patientGender}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-gray-500">Contact</p>
                    <p className="font-medium">{appointment.patientContact}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{appointment.patientEmail}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Actions
              </h3>

              <div className="space-y-3">

                {appointment.canReschedule && (
                  <button
                    onClick={handleReschedule}
                    disabled={rescheduling}
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  >
                    {rescheduling ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <CalendarClock className="w-5 h-5" />
                    )}
                    Reschedule Appointment
                  </button>
                )}

                {appointment.canCancel && (
                  <button
                    onClick={() => setShowCancel(true)}
                    className="w-full flex items-center justify-center gap-2 bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700"
                  >
                    <XCircle className="w-5 h-5" />
                    Cancel Appointment
                  </button>
                )}

                <button className="w-full flex items-center justify-center gap-2 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50">
                  <MessageCircle className="w-5 h-5" />
                  Contact Support
                </button>
              </div>
            </div>

            {/* Support */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-emerald-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900">Need Help?</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Our support team is available 24/7 to assist you.
                  </p>
                  <button className="mt-3 text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                    Contact Support →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* ---------------- RESCHEDULE MODAL ---------------- */}
   {showReschedule && ( <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"> <div className="bg-white rounded-xl max-w-md w-full p-6"> <h3 className="text-xl font-bold text-gray-900 mb-4">Reschedule Appointment</h3> <div className="space-y-4"> <div> <label className="block text-sm font-medium text-gray-700 mb-2"> New Date </label> <input type="date" min={new Date().toISOString().split('T')[0]} className="w-full p-3 border border-gray-300 rounded-lg" /> </div> <div> <label className="block text-sm font-medium text-gray-700 mb-2"> New Time Slot </label> <select className="w-full p-3 border border-gray-300 rounded-lg"> <option value="">Select slot</option> <option value="morning">Morning (9 AM - 12 PM)</option> <option value="evening">Evening (4 PM - 7 PM)</option> </select> </div> </div> <div className="flex gap-3 mt-6"> <button onClick={() => setShowReschedule(false)} className="flex-1 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50" > Cancel </button> <button onClick={handleReschedule} disabled={rescheduling} className="flex-1 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50" > {rescheduling ? "Processing..." : "Confirm Reschedule"} </button> </div> </div> </div> )}

      {/* ---------------- CANCEL MODAL ---------------- */}
      {showCancel && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <XCircle className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Cancel Appointment?
              </h3>
              <p className="text-gray-600">
                Are you sure you want to cancel this appointment? This action
                cannot be undone.
              </p>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Reason for cancellation
              </label>
              <select className="w-full p-3 border border-gray-300 rounded-lg">
                <option value="">Select reason</option>
                <option value="schedule">Schedule conflict</option>
                <option value="emergency">Personal emergency</option>
                <option value="other">Other reason</option>
              </select>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowCancel(false)}
                className="flex-1 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Go Back
              </button>

              <button
                onClick={handleCancel}
                disabled={cancelling}
                className="flex-1 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
              >
                {cancelling ? "Cancelling..." : "Cancel Appointment"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AppointmentDetail;
