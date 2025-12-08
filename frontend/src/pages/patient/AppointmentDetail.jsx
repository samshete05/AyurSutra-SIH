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
  MessageCircle,
  Sun,
  Moon
} from "lucide-react";
import axios from "axios";

const AppointmentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);
  const [rescheduling, setRescheduling] = useState(false);

  const [showCancel, setShowCancel] = useState(false);
  const [showReschedule, setShowReschedule] = useState(false);

  const allData = location.state?.Alldata || null;

  // ------------------------------------------------------------
  // Slot Logic (You can replace with backend logic later)
  // ------------------------------------------------------------
  const mergedSlots = {
    morning: { startTime: "9:00 AM", endTime: "12:00 PM" },
    evening: { startTime: "4:00 PM", endTime: "7:00 PM" }
  };

  const checkSlotAvailability = () => true; // Always available for now

  // ------------------------------------------------------------
  // Transform appointment data
  // ------------------------------------------------------------
  useEffect(() => {
    if (!allData) {
      setLoading(false);
      return;
    }

    const transformed = {
      _id: allData.appointmentDetails?._id || "N/A",
      status: allData.status || "scheduled",

      patientName: allData.patientDetails?.name,
      patientAge: allData.patientDetails?.age,
      patientGender: allData.patientDetails?.gender,
      patientPhone: allData.appointmentDetails?.PatientPhone,
      patientEmail: allData.appointmentDetails?.PatientEmail,

      centerDetails: {
        CenterName: allData.centerDetails?.CenterName,
        mainAddress: allData.centerDetails?.mainAddress,
        MobileNo: allData.centerDetails?.MobileNo,
        Email: allData.centerDetails?.email,
        rating: allData.centerDetails?.rating || 4.5
      },

      appointmentDetails: {
        appointmentDate: allData.appointmentDate,
        appointmentSlot: allData.appointmentDetails?.appointmentSlot,
        tokenNumber: allData.appointmentDetails?.tokenNumber
      },

      tokenAmount: allData.tokenAmount,
      paymentStatus: allData.appointmentDetails?.PaymentStatus
    };

    setAppointment(transformed);
    setLoading(false);
  }, []);

  // ------------------------------------------------------------
  // Cancel Appointment
  // ------------------------------------------------------------
  const handleCancel = async () => {
    setCancelling(true);

    try {
     const resp=await axios.delete("http://localhost:3000/patient/delete-appointment", {
        data: { 
          aptId: appointment._id,
          phoneNo:allData.appointmentDetails?.PatientPhone
        }
      });

      console.log("this is ",resp);

      alert("Appointment cancelled successfully");
      navigate("/patient/appointments");
    } catch (err) {
      alert("Failed to cancel appointment");
    }

    setCancelling(false);
    setShowCancel(false);
  };

  // ------------------------------------------------------------
  // RESCHEDULE LOGIC (Frontend Only)
  // ------------------------------------------------------------
  const [newDate, setNewDate] = useState("");
  const [newSlot, setNewSlot] = useState("");

  const generateDates = () => {
    const arr = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      arr.push(d);
    }
    return arr;
  };

  const handleReschedule = async (date, slot) => {
    setRescheduling(true);
    

    // send to backend later
    console.log("Rescheduled to:", date, slot);
     
      //  const {appointmentId,newdate,newslot}=req.body;

    const changeDate=await axios.post("http://localhost:3000/patient/rescheduleAppointment",{
         newdate:date,
         newslot:slot,
         appointmentId:id,
         phoneNo:allData.appointmentDetails?.PatientPhone
    })

     console.log("check change hua yaa nahi",changeDate);
         if (changeDate.data.message === "changed") {
      navigate("/patient/appointments", { replace: true });
    }

    // alert("Appointment rescheduled!");
    setRescheduling(false);
    setShowReschedule(false);
  };

  // ------------------------------------------------------------
  // RESCHEDULE MODAL (NEW UI)
  // ------------------------------------------------------------
  const RescheduleModal = () => {
  const [newDate, setNewDate] = useState("");
  const [newSlot, setNewSlot] = useState("");

  // FIXED DATE GENERATOR (NO UTC SHIFT)
  const generateDates = () => {
    const arr = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      arr.push(d);
    }
    return arr;
  };

  const formatLocalDate = (d) => {
    // prevents UTC conversion issues
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
      d.getDate()
    ).padStart(2, "0")}`;
  };

  const dates = generateDates();

  const slotsArr = [
    {
      id: "morning",
      label: "Morning",
      icon: Sun,
      time: `${mergedSlots.morning.startTime} - ${mergedSlots.morning.endTime}`,
      available: newDate ? checkSlotAvailability(newDate, "morning") : true
    },
    {
      id: "evening",
      label: "Evening",
      icon: Moon,
      time: `${mergedSlots.evening.startTime} - ${mergedSlots.evening.endTime}`,
      available: newDate ? checkSlotAvailability(newDate, "evening") : true
    }
  ];

  const confirmHandler = () => {
    if (!newDate || !newSlot) return alert("Please select date & slot");
    handleReschedule(newDate, newSlot);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl p-6 overflow-y-auto max-h-[90vh]">

        <div className="flex items-center cursor-pointer gap-3 mb-4">
          <CalendarClock className="w-8 h-6 cursor-pointer text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-800 cursor-pointer">Reschedule Appointment</h2>
        </div>

        {/* DATE SELECTION */}
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
          <Calendar className="w-4 h-4 text-[#1E4B3C]" />
          Select New Date
        </label>

        <div className="grid grid-cols-7 gap-2 max-h-64 overflow-y-auto mb-6">
          {dates.map((d, i) => {
            const formatted = formatLocalDate(d); // FIX APPLIED
            const isSelected = newDate === formatted;

            return (
              <button
                key={i}
                onClick={() => setNewDate(formatted)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  isSelected
                    ? "border-[#1E4B3C] bg-[#1E4B3C] text-white"
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                <div className="text-xs font-medium">
                  {d.toLocaleDateString("en-US", { weekday: "short" })}
                </div>
                <div className="text-xl font-bold">{d.getDate()}</div>
                <div className="text-xs">
                  {d.toLocaleDateString("en-US", { month: "short" })}
                </div>
              </button>
            );
          })}
        </div>

        {/* SLOT SELECTION */}
        {newDate && (
          <>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
              <Clock className="w-4 h-4 text-[#1E4B3C]" />
              Select Time Slot
            </label>

            <div className="grid gap-3">
              {slotsArr.map((slot) => (
                <button
                  key={slot.id}
                  onClick={() => slot.available && setNewSlot(slot.id)}
                  disabled={!slot.available}
                  className={`p-4 rounded-xl border-2 transition-all text-left ${
                    !slot.available
                      ? "border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed"
                      : newSlot === slot.id
                      ? "border-[#1E4B3C] bg-[#1E4B3C]/10"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <slot.icon className="w-8 h-8 text-[#1E4B3C]" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{slot.label}</h4>
                      <p className="text-sm text-gray-600">{slot.time}</p>
                    </div>

                    {slot.available ? (
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                        Available
                      </span>
                    ) : (
                      <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs">
                        Full
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </>
        )}

        {/* ACTION BUTTONS */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={() => setShowReschedule(false)}
            className="px-4 py-2 border rounded-lg hover:bg-gray-100"
          >
            Close
          </button>

          <button
            onClick={confirmHandler}
            disabled={!newDate || !newSlot}
            className={`px-4 py-2 rounded-lg text-white ${
              newDate && newSlot
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            {rescheduling ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Confirm Reschedule"
            )}
          </button>
        </div>

      </div>
    </div>
  );
};


  // ------------------------------------------------------------
  // LOADING UI
  // ------------------------------------------------------------
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-emerald-600" />
      </div>
    );
  }

  if (!appointment) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <AlertCircle className="w-16 h-16 text-gray-400" />
        <p>No appointment found.</p>
      </div>
    );
  }

  // ------------------------------------------------------------
  // RETURN UI (UNCHANGED FROM YOUR ORIGINAL)
  // ------------------------------------------------------------
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">

        {/* BACK BUTTON */}
        <button
          onClick={() => navigate("/patient/appointments")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-5 h-5" /> Back to Appointments
        </button>

        {/* HEADER */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Appointment Details
            </h1>

            <div className="flex items-center gap-3 mt-2">
              <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm">
                {appointment.status}
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

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* CENTER CARD */}
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

            {/* APPOINTMENT INFO */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Appointment Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Date</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-emerald-600" />
                    <p className="font-semibold">
                      {appointment.appointmentDetails.appointmentDate}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-1">Time Slot</p>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-emerald-600" />
                    <p className="font-semibold capitalize">
                      {appointment.appointmentDetails.appointmentSlot}
                    </p>
                  </div>
                </div>
              </div>

              {/* TOKEN NUMBER */}
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

            </div>

            {/* SERVICES */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Services Included
              </h3>
              <span className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm">
                General Consultation
              </span>
            </div>

          </div>

          {/* RIGHT SIDEBAR */}
          <div className="space-y-6">

            {/* PATIENT INFO */}
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

                <p><strong>Age:</strong> {appointment.patientAge}</p>
                <p><strong>Gender:</strong> {appointment.patientGender}</p>
                <p><strong>Phone:</strong> {appointment.patientPhone}</p>
                <p><strong>Email:</strong> {appointment.patientEmail}</p>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="bg-white rounded-xl shadow-sm p-6 space-y-3">
              <button
                onClick={() => setShowReschedule(true)}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700"
              >
                <CalendarClock className="w-5 h-5 inline mr-2" />
                Reschedule Appointment
              </button>

              <button
                onClick={() => setShowCancel(true)}
                className="w-full bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700"
              >
                <XCircle className="w-5 h-5 inline mr-2" />
                Cancel Appointment
              </button>

              {/* <button className="w-full flex items-center justify-center gap-2 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50">
                <MessageCircle className="w-5 h-5" />
                Contact Support
              </button> */}
            </div>

            {/* SUPPORT BOX */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-emerald-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900">Need Help?</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Our support team is available 24/7 to assist you.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* BOTTOM BUTTONS
        <div className="h-24 gap-4 flex bg-white rounded-xl shadow-sm p-6 mt-8">
          <button
            onClick={() => setShowCancel(true)}
            className="w-68 bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700"
          >
            Cancel Appointment
          </button>

          <button
            onClick={() => setShowReschedule(true)}
            className="w-68 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700"
          >
            Reschedule Appointment
          </button>
        </div> */}

      </div>

      {/* MODALS */}
      {showCancel && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            <div className="flex items-center gap-3">
              <XCircle className="w-8 h-8 text-red-600" />
              <h2 className="text-xl font-semibold text-gray-800">
                Cancel Appointment?
              </h2>
            </div>

            <p className="text-gray-600 mt-3">
              Are you sure you want to cancel this appointment?
            </p>

            <div className="flex justify-end gap-3 mt-6">
              <button
              onClick={() => setShowCancel(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-100"
              >
                Close
              </button>

              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                {cancelling ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Confirm Cancel"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {showReschedule && <RescheduleModal />}

    </div>
  );
};

export default AppointmentDetail;
