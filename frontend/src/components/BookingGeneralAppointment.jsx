import React, { useState, useRef, useEffect } from "react";
import {
  X,
  Check,
  Calendar,
  ChevronRight,
  ChevronLeft,
  Clock,
  User,
  Mail,
  Phone,
  FileText,
  MapPin,
  CheckCircle2,
  Loader2,
  AlertCircle,
  Edit2,
  Sun,
  Moon,
  Shield,
  IndianRupee,
  Users,
} from "lucide-react";
import axios from "axios";

const BookingGeneralAppointment = ({ isOpen, onClose, centerData, centerId }) => {
  const patientEmail = localStorage.getItem("email");
  console.log("data aaa gayaaaa", centerData);
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    serviceType: "general",
    selectedDate: null,
    selectedSlot: null,
    patientName: "",
    patientPhone: "",
    patientAge: "",
    patientGender: "",
    notes: "",
    isPhoneVerified: false,
    tokenNumber: null,
    bookingId: null,
  });

  const [otpBoxes, setOtpBoxes] = useState(["", "", "", "", "", ""]);
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const otpInputRefs = useRef([]);

  // Safe default slots to prevent undefined errors
  const getSafeSlots = () => {
    if (!centerData || !centerData.slots) {
      return {
        morning: { startTime: "10:00 AM", endTime: "12:00 PM", tokenAmount: 100 },
        evening: { startTime: "05:00 PM", endTime: "07:00 PM", tokenAmount: 100 },
      };
    }
    return centerData.slots;
  };

  if (!isOpen) return null;

  const steps = [
    { number: 1, title: "Date & Slot" },
    { number: 2, title: "Verify Phone" },
    { number: 3, title: "Details" },
    { number: 4, title: "Review" },
    { number: 5, title: "Confirm" },
  ];

  const handleNext = () => { if (currentStep < 5) setCurrentStep((s) => s + 1); };
  const handlePrevious = () => { if (currentStep > 1) setCurrentStep((s) => s - 1); };
  const handleDataUpdate = (data) => setBookingData((prev) => ({ ...prev, ...data }));

  const handleClose = () => {
    setCurrentStep(1);
    setBookingData({
      serviceType: "general",
      selectedDate: null,
      selectedSlot: null,
      patientName: "",
      patientPhone: "",
      patientAge: "",
      patientGender: "",
      notes: "",
      isPhoneVerified: false,
      tokenNumber: null,
      bookingId: null,
    });
    setOtpBoxes(["", "", "", "", "", ""]);
    setOtpSent(false);
    setIsLoading(false);
    onClose();
  };

  const handleSubmit = async () => {
  try {
    const resp = await axios.post("http://localhost:3000/patient/bookGeneralAppointment", {
      selectedDate: bookingData.selectedDate,
      selectedSlot: bookingData.selectedSlot,
      patientName: bookingData.patientName,
      patientPhone: bookingData.patientPhone,
      patientEmail: patientEmail,
      patientAge: bookingData.patientAge,
      patientGender: bookingData.patientGender,
      notes: bookingData.notes || "",
      serviceType: "general",
      isPhoneVerified: bookingData.isPhoneVerified || false,
      centerId: centerId,
      tokenAmount: "100",
      date:bookingData.selectedDate,
      slot:bookingData.selectedSlot
    });

    if (resp.data.success) {
      alert(`Booking successful! Booking ID: ${resp.data.bookingId}`);
      handleClose();
    } else {
      alert("Booking failed: " + resp.data.message);
    }
    
  } catch (error) {
    console.log("Error:", error);
    alert("Booking error: " + (error.response?.data?.message || error.message));
  }
};
  

  const generateAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const checkSlotAvailability = (date, slot) => Math.random() > 0.2;

  // SEND OTP to phone (demo) — saves phone into bookingData immediately
  const sendOTPToPhone = async (phone) => {
    if (!phone || phone.replace(/\D/g, "").length !== 10) {
      return { ok: false, message: "Enter a valid 10-digit phone number" };
    }

    // Keep input persistent
    handleDataUpdate({ patientPhone: phone });

    try {
      setIsLoading(true);

      const resp = await axios.post("http://localhost:3000/patient/appointment-otp", {
        phoneNo: phone,
        email: patientEmail
      });

      console.log("from backend!!", resp);
      // If backend returns success
      if (resp.data.message == 'otp_send') {

        setOtpSent(true);
        setIsLoading(false);

        // Focus OTP input
        setTimeout(() => otpInputRefs.current[0]?.focus(), 80);

        return { ok: true };
      } else {
        setIsLoading(false);
        return { ok: false, message: resp.data.message };
      }
    } catch (err) {
      setIsLoading(false);
      return {
        ok: false,
        message: err.response?.data?.message || "Server error sending OTP",
      };
    }
  };

  // VERIFY OTP for phone
  const verifyOTPForPhone = async (phone) => {
    const otpValue = otpBoxes.join("");

    if (otpValue.length !== 6) {
      return { ok: false, message: "Please enter complete OTP" };
    }

    try {
      setIsLoading(true);

      const resp = await axios.post(
        "http://localhost:3000/patient/verify-appointment-otp",
        {
          phoneNo: phone,
          otp: otpValue,
        }
      );

      console.log("verify or not", resp);

      setIsLoading(false);

      if (resp.data.success) {
        handleDataUpdate({ patientPhone: phone, isPhoneVerified: true });
        return { ok: true };
      } else {
        return { ok: false, message: resp.data.message || "Invalid OTP" };
      }
    } catch (err) {
      setIsLoading(false);
      return {
        ok: false,
        message: err.response?.data?.message || "Server error verifying OTP",
      };
    }
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    setOtpBoxes((prev) => {
      const next = [...prev];
      next[index] = value.slice(-1);
      return next;
    });
    if (value && index < 5) {
      setTimeout(() => otpInputRefs.current[index + 1]?.focus(), 0);
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      setOtpBoxes((prev) => {
        const next = [...prev];
        if (next[index] !== "") {
          next[index] = "";
          setTimeout(() => otpInputRefs.current[index]?.focus(), 0);
          return next;
        } else if (index > 0) {
          next[index - 1] = "";
          setTimeout(() => otpInputRefs.current[index - 1]?.focus(), 0);
          return next;
        }
        return next;
      });
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasteData) {
      const newOtp = pasteData.split("").concat(Array(6 - pasteData.length).fill(""));
      setOtpBoxes(newOtp.slice(0, 6));
      const nextIndex = Math.min(pasteData.length, 5);
      setTimeout(() => otpInputRefs.current[nextIndex]?.focus(), 0);
    }
  };

  const handleEditPhone = () => {
    setOtpSent(false);
    setOtpBoxes(["", "", "", "", "", ""]);
    handleDataUpdate({ isPhoneVerified: false });
  };

  // STEP 1: Date & Slot
  const Step1_DateAndSlot = () => {
    const [selectedDate, setSelectedDate] = useState(bookingData.selectedDate);
    const [selectedSlot, setSelectedSlot] = useState(bookingData.selectedSlot);
    const dates = generateAvailableDates();

    useEffect(() => {
      setSelectedDate(bookingData.selectedDate);
      setSelectedSlot(bookingData.selectedSlot);
    }, [currentStep]);

    // Use safe slots function
    const safeSlots = getSafeSlots();

    const slots = [
      {
        id: "morning",
        label: "Morning Slot",
        icon: Sun,
        time: `${safeSlots.morning.startTime} - ${safeSlots.morning.endTime}`,
        tokenAmount: safeSlots.morning.tokenAmount || 100,
        available: selectedDate ? checkSlotAvailability(selectedDate, "morning") : true,
      },
      {
        id: "evening",
        label: "Evening Slot",
        icon: Moon,
        time: `${safeSlots.evening.startTime} - ${safeSlots.evening.endTime}`,
        tokenAmount: safeSlots.evening.tokenAmount || 100,
        available: selectedDate ? checkSlotAvailability(selectedDate, "evening") : true,
      }
    ];

    const continueHandler = () => {
      if (!selectedDate || !selectedSlot) {
        alert("Please select both date and slot");
        return;
      }
      handleDataUpdate({ selectedDate, selectedSlot });
      handleNext();
    };

    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Book General Consultation</h3>
          <p className="text-sm text-gray-600">Select your preferred date and time slot</p>
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
            <Calendar className="w-4 h-4 text-[#1E4B3C]" />
            Select Appointment Date
          </label>

          <div className="grid grid-cols-7 gap-2 max-h-64 overflow-y-auto">
            {dates.map((date, idx) => {
              const dateString = date.toISOString().split("T")[0];
              const isSelected = selectedDate === dateString;
              const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
              const dayNum = date.getDate();
              const monthName = date.toLocaleDateString("en-US", { month: "short" });

              return (
                <button
                  key={idx}
                  onClick={() => setSelectedDate(dateString)}
                  className={`p-3 rounded-lg border-2 transition-all ${isSelected
                      ? "border-[#1E4B3C] bg-[#1E4B3C] text-white"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                >
                  <div className="text-xs font-medium">{dayName}</div>
                  <div className="text-xl font-bold my-1">{dayNum}</div>
                  <div className="text-xs">{monthName}</div>
                </button>
              );
            })}
          </div>
        </div>

        {selectedDate && (
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
              <Clock className="w-4 h-4 text-[#1E4B3C]" />
              Select Time Slot
            </label>
            <div className="grid gap-3">
              {slots.map((slot) => (
                <button
                  key={slot.id}
                  onClick={() => slot.available && setSelectedSlot(slot.id)}
                  disabled={!slot.available}
                  className={`p-4 rounded-xl border-2 transition-all text-left ${!slot.available
                      ? "border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed"
                      : selectedSlot === slot.id
                        ? "border-[#1E4B3C] bg-[#1E4B3C]/5"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                >
                  <div className="flex items-center gap-4">
                    <slot.icon className="w-8 h-8 text-[#1E4B3C]" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{slot.label}</h4>
                      <p className="text-sm text-gray-600 mt-1">{slot.time}</p>
                    </div>
                    {slot.available ? (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Available
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        Full
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {selectedDate && selectedSlot && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <IndianRupee className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-blue-900">
                  Token Amount: ₹{safeSlots[selectedSlot]?.tokenAmount || 100}
                </p>
                <p className="text-xs text-blue-700 mt-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Fully Refundable after visit or cancellation (24h before)
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-3 pt-4 border-t">
          <button
            onClick={handleClose}
            className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-all font-medium"
          >
            Cancel
          </button>
          <button
            onClick={continueHandler}
            disabled={!selectedDate || !selectedSlot}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg transition-all font-semibold ${selectedDate && selectedSlot
                ? "bg-[#1E4B3C] hover:bg-[#163A2E] text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
          >
            Continue
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  };

  // STEP 2: Phone Verification
  const Step2_PhoneVerification = () => {
    const [phoneInput, setPhoneInput] = useState(bookingData.patientPhone || "");

    useEffect(() => {
      if (!otpSent) setPhoneInput(bookingData.patientPhone || "");
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentStep, bookingData.patientPhone]);

    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Verify Your Phone</h3>
          <p className="text-sm text-gray-600">OTP will be sent to your phone number for verification (SMS)</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-2">
            <div className="flex items-center gap-2 px-4 py-3 border-2 border-gray-200 rounded-lg bg-gray-50">
              <Phone className="w-4 h-4 text-gray-500" />
              <span className="font-medium text-gray-700">+91</span>
            </div>
            <input
              type="tel"
              value={phoneInput}
              onChange={(e) => setPhoneInput(e.target.value.replace(/\D/g, "").slice(0, 10))}
              placeholder="9876543210"
              disabled={otpSent}
              className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#1E4B3C] focus:outline-none transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1.5 flex items-center gap-1">
            <Shield className="w-3 h-3" />
            We'll send a 6-digit OTP to verify your phone number
          </p>
        </div>

        {!otpSent && (
          <button
            onClick={async () => {
              if (!phoneInput || phoneInput.length !== 10) {
                alert("Please enter a valid 10-digit phone number");
                return;
              }
              await sendOTPToPhone(phoneInput);
            }}
            disabled={isLoading || phoneInput.length !== 10}
            className={`w-full py-3 rounded-lg transition-all font-semibold flex items-center justify-center gap-2 ${phoneInput.length === 10
                ? "bg-[#1E4B3C] hover:bg-[#163A2E] text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Sending OTP...
              </>
            ) : (
              <>
                <Phone className="w-5 h-5" />
                Send OTP to Phone
              </>
            )}
          </button>
        )}

        {otpSent && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
                Enter 6-Digit OTP sent to +91 {bookingData.patientPhone || phoneInput}
              </label>

              <div className="flex gap-3 justify-center">
                {otpBoxes.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (otpInputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(e, index)}
                    onPaste={index === 0 ? handleOtpPaste : undefined}
                    aria-label={`OTP digit ${index + 1}`}
                    className="w-14 h-14 text-center text-2xl font-semibold border-2 border-gray-300 rounded-lg focus:border-[#1E4B3C] focus:ring-2 focus:ring-[#1E4B3C]/20 transition-colors bg-white"
                  />
                ))}
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-xs text-blue-800 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span><strong>Demo Mode:</strong> Use OTP <strong>123456</strong> to proceed</span>
              </p>
            </div>
          </div>
        )}

        <div className="flex gap-3 pt-4 border-t">
          <button
            onClick={handlePrevious}
            className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-all font-medium"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>

          {otpSent && (
            <button
              onClick={async () => {
                setIsLoading(true);
                const res = await verifyOTPForPhone(bookingData.patientPhone || phoneInput);
                setIsLoading(false);
                if (res.ok) {
                  handleNext();
                } else {
                  alert(res.message || "OTP verify failed");
                }
              }}
              disabled={isLoading || otpBoxes.join("").length !== 6}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg transition-all font-semibold ${otpBoxes.join("").length === 6 && !isLoading
                  ? "bg-[#1E4B3C] hover:bg-[#163A2E] text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  Verify & Continue
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    );
  };

  // STEP 3: Patient Details (phone locked when verified + verified badge)
  const Step3_PatientDetails = () => {
    const [formData, setFormData] = useState({
      patientName: bookingData.patientName,
      patientPhone: bookingData.patientPhone,
      patientAge: bookingData.patientAge,
      patientGender: bookingData.patientGender,
      notes: bookingData.notes,
    });

    useEffect(() => {
      if (currentStep === 3) {
        setFormData({
          patientName: bookingData.patientName || "",
          patientPhone: bookingData.patientPhone || "",
          patientAge: bookingData.patientAge || "",
          patientGender: bookingData.patientGender || "",
          notes: bookingData.notes || "",
        });
      }
    }, [currentStep, bookingData.patientPhone, bookingData.patientName, bookingData.patientAge, bookingData.patientGender, bookingData.notes]);

    const handleChange = (field, value) => setFormData((prev) => ({ ...prev, [field]: value }));

    const handleContinue = () => {
      if (!formData.patientName || !formData.patientAge || !formData.patientGender) {
        alert("Please fill in all required fields (Name, Age, and Gender)");
        return;
      }
      handleDataUpdate({
        patientName: formData.patientName,
        patientPhone: formData.patientPhone,
        patientAge: formData.patientAge,
        patientGender: formData.patientGender,
        notes: formData.notes,
      });
      handleNext();
    };

    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Patient Information</h3>
          <p className="text-sm text-gray-600">Please provide your details for the appointment</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={formData.patientName}
                onChange={(e) => handleChange("patientName", e.target.value)}
                placeholder="Enter your full name"
                className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#1E4B3C] focus:outline-none transition-colors"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">
                Phone Number <span className="text-red-500">*</span>
              </label>

              {/* Verified badge shown when phone is verified */}
              {bookingData.isPhoneVerified ? (
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 border border-green-200 text-green-800 text-sm font-medium">
                  <Shield className="w-4 h-4" />
                  Verified
                </div>
              ) : null}
            </div>

            <div className="flex gap-2">
              <div className="flex items-center gap-2 px-4 py-3 border-2 border-gray-200 rounded-lg bg-gray-50">
                <Phone className="w-4 h-4 text-gray-500" />
                <span className="font-medium text-gray-700">+91</span>
              </div>
              <input
                type="tel"
                value={formData.patientPhone}
                onChange={(e) => handleChange("patientPhone", e.target.value.replace(/\D/g, "").slice(0, 10))}
                placeholder="9876543210"
                required
                // lock the field when phone is verified
                disabled={bookingData.isPhoneVerified}
                className={`flex-1 px-4 py-3 border-2 rounded-lg focus:border-[#1E4B3C] focus:outline-none transition-colors ${bookingData.isPhoneVerified ? "bg-gray-50 border-green-200 text-gray-700 cursor-not-allowed" : "border-gray-200"
                  }`}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">We'll use this for SMS updates</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Age <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={formData.patientAge}
                onChange={(e) => handleChange("patientAge", e.target.value)}
                placeholder="Enter age"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#1E4B3C] focus:outline-none transition-colors"
                min="1"
                max="120"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.patientGender}
                onChange={(e) => handleChange("patientGender", e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#1E4B3C] focus:outline-none transition-colors"
                required
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Notes (Optional)
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <textarea
                value={formData.notes}
                onChange={(e) => handleChange("notes", e.target.value)}
                placeholder="Any specific concerns or requirements..."
                rows="4"
                className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#1E4B3C] focus:outline-none transition-colors resize-none"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-4 border-t">
          <button
            onClick={handlePrevious}
            className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-all font-medium"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>
          <button
            onClick={handleContinue}
            disabled={!formData.patientName || !formData.patientAge || !formData.patientGender}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg transition-all font-semibold ${formData.patientName && formData.patientAge && formData.patientGender
                ? "bg-[#1E4B3C] hover:bg-[#163A2E] text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
          >
            Review Booking
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  };

  // STEP 4: Review
  const Step4_Review = () => {
    const safeSlots = getSafeSlots();
    const slotInfo = (() => {
      const slot = safeSlots[bookingData.selectedSlot];
      const SlotIcon = bookingData.selectedSlot === "morning" ? Sun : Moon;
      return {
        name: bookingData.selectedSlot === "morning" ? "Morning" : "Evening",
        icon: SlotIcon,
        time: `${slot?.startTime || "N/A"} - ${slot?.endTime || "N/A"}`,
        amount: slot?.tokenAmount || 100
      };
    })();

    const formatDate = (dateString) => {
      if (!dateString) return "Not selected";
      const date = new Date(dateString);
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);

      if (date.toDateString() === today.toDateString()) {
        return `Today, ${date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`;
      } else if (date.toDateString() === tomorrow.toDateString()) {
        return `Tomorrow, ${date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`;
      }
      return date.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
    };

    const handleConfirmPayment = () => {
      setIsLoading(true);
      setTimeout(() => {
        const tokenNumber = `T-${String(Math.floor(Math.random() * 999) + 1).padStart(3, "0")}`;
        const bookingId = `BKG${Date.now().toString().slice(-6)}`;
        handleDataUpdate({ tokenNumber, bookingId });
        setIsLoading(false);
        handleNext();
      }, 1500);
    };

    return (
      <div className="space-y-6 max-w-3xl mx-auto">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Almost There!</h3>
          <p className="text-gray-600">Review your booking details before confirming</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-br from-[#1E4B3C] via-[#2A6850] to-[#1E4B3C] p-6 text-white">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full mb-3">
                  <Calendar className="w-4 h-4" />
                  <span className="text-xs font-semibold">APPOINTMENT DETAILS</span>
                </div>
                <h4 className="text-2xl font-bold mb-1">General Consultation</h4>
                <p className="text-sm opacity-90">{centerData?.name || "Medical Center"}</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                <slotInfo.icon className="w-8 h-8" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs opacity-75 uppercase tracking-wide">Date</p>
                    <p className="font-semibold text-sm mt-0.5">{formatDate(bookingData.selectedDate)}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs opacity-75 uppercase tracking-wide">Time Slot</p>
                    <p className="font-semibold text-sm mt-0.5">{slotInfo.name} ({slotInfo.time})</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-gray-50">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-[#1E4B3C]" />
              <h5 className="font-bold text-gray-900">Patient Information</h5>
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              <div className="bg-white p-4 rounded-xl border border-gray-200">
                <p className="text-xs text-gray-500 mb-1">Full Name</p>
                <p className="font-semibold text-gray-900">{bookingData.patientName}</p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-gray-200">
                <p className="text-xs text-gray-500 mb-1">Phone Number</p>
                <p className="font-semibold text-gray-900">+91 {bookingData.patientPhone}</p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-gray-200">
                <p className="text-xs text-gray-500 mb-1">Age</p>
                <p className="font-semibold text-gray-900">{bookingData.patientAge} years</p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-gray-200">
                <p className="text-xs text-gray-500 mb-1">Gender</p>
                <p className="font-semibold text-gray-900 capitalize">{bookingData.patientGender}</p>
              </div>
            </div>

            {bookingData.notes && (
              <div className="mt-3 bg-white p-4 rounded-xl border border-gray-200">
                <p className="text-xs text-gray-500 mb-1">Additional Notes</p>
                <p className="text-sm text-gray-700">{bookingData.notes}</p>
              </div>
            )}
          </div>

          <div className="p-6 bg-white border-t-2 border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <IndianRupee className="w-5 h-5 text-[#1E4B3C]" />
                <span className="font-semibold text-gray-900">Token Amount</span>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-[#1E4B3C]">₹{slotInfo.amount}</p>
                <p className="text-xs text-green-600 font-medium flex items-center gap-1 justify-end mt-1">
                  <CheckCircle2 className="w-3 h-3" />
                  100% Refundable
                </p>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-blue-900 mb-2">Refund Policy</p>
                  <ul className="text-xs text-blue-800 space-y-1">
                    <li>• Full refund after your visit</li>
                    <li>• Cancel 24 hours before for full refund</li>
                    <li>• {centerData?.bookingSettings?.tokenRefundPolicy || "Standard refund policy applies"}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-5 border border-amber-200">
          <div className="flex items-start gap-3">
            <div className="bg-amber-100 p-2 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-amber-700" />
            </div>
            <div className="flex-1">
              <h6 className="font-bold text-amber-900 mb-2">Before You Arrive</h6>
              <ul className="text-sm text-amber-800 space-y-1">
                <li>✓ Arrive anytime during your selected slot</li>
                <li>✓ Check-in at reception with your token number</li>
                <li>✓ Bring any relevant medical reports</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            onClick={handlePrevious}
            disabled={isLoading}
            className="flex items-center gap-2 px-6 py-3.5 border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-all font-semibold text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </button>
          <button
            onClick={handleConfirmPayment}
            disabled={isLoading}
            className="flex-1 flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#1E4B3C] to-[#2A6850] hover:from-[#163A2E] hover:to-[#1E4B3C] text-white rounded-xl transition-all font-bold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                Processing Payment...
              </>
            ) : (
              <>
                <Check className="w-6 h-6" />
                Pay ₹{slotInfo.amount} & Confirm
              </>
            )}
          </button>
        </div>
      </div>
    );
  };

  // STEP 5: Confirmation
  const Step5_Confirmation = () => {
    const safeSlots = getSafeSlots();
    const slotInfo = (() => {
      const slot = safeSlots[bookingData.selectedSlot];
      const SlotIcon = bookingData.selectedSlot === "morning" ? Sun : Moon;
      return {
        name: bookingData.selectedSlot === "morning" ? "Morning" : "Evening",
        icon: SlotIcon,
        time: `${slot?.startTime || "N/A"} - ${slot?.endTime || "N/A"}`,
        amount: slot?.tokenAmount || 100
      };
    })();

    const formatDate = (dateString) => {
      if (!dateString) return "Not selected";
      const date = new Date(dateString);
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);

      if (date.toDateString() === today.toDateString()) {
        return `Today, ${date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`;
      } else if (date.toDateString() === tomorrow.toDateString()) {
        return `Tomorrow, ${date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`;
      }
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    };

    return (
      <div className="space-y-6 max-w-2xl mx-auto py-4">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full shadow-xl mb-6 animate-bounce">
            <CheckCircle2 className="w-14 h-14 text-white" strokeWidth={3} />
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h3>
          <p className="text-gray-600">Your appointment has been successfully scheduled</p>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#1E4B3C] to-[#2A6850] rounded-2xl transform rotate-1"></div>
          <div className="relative bg-gradient-to-br from-[#1E4B3C] via-[#2A6850] to-[#163A2E] rounded-2xl p-8 text-white shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm opacity-75 uppercase tracking-wider mb-1">Booking ID</p>
                <p className="text-2xl font-bold">#{bookingData.bookingId}</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                <Calendar className="w-8 h-8" />
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-4">
              <p className="text-sm opacity-75 uppercase tracking-wider mb-2 text-center">Your Token Number</p>
              <div className="flex items-center justify-center gap-3">
                <div className="bg-white/20 p-2 rounded-lg">
                  <Shield className="w-6 h-6" />
                </div>
                <p className="text-5xl font-black tracking-wider">{bookingData.tokenNumber}</p>
              </div>
              <p className="text-xs text-center mt-3 opacity-75">Show this at reception</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <p className="text-xs opacity-75 mb-1">Date</p>
                <p className="font-semibold text-sm">{formatDate(bookingData.selectedDate)}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <p className="text-xs opacity-75 mb-1">Time</p>
                <p className="font-semibold text-sm flex items-center gap-1">
                  <slotInfo.icon className="w-4 h-4" />
                  {slotInfo.time}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h4 className="font-bold text-gray-900 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#1E4B3C]" />
              Appointment Summary
            </h4>
          </div>

          <div className="p-6 space-y-3">
            <div className="flex justify-between items-start py-2">
              <span className="text-sm text-gray-600">Center</span>
              <span className="font-semibold text-gray-900 text-right">{centerData?.name || "Medical Center"}</span>
            </div>

            <div className="flex justify-between items-start py-2">
              <span className="text-sm text-gray-600">Service</span>
              <span className="font-semibold text-gray-900">General Consultation</span>
            </div>

            <div className="flex justify-between items-start py-2">
              <span className="text-sm text-gray-600">Patient</span>
              <span className="font-semibold text-gray-900">{bookingData.patientName}</span>
            </div>

            <div className="flex justify-between items-start py-2 border-t border-gray-200 pt-3">
              <span className="text-sm text-gray-600">Token Paid</span>
              <div className="text-right">
                <p className="font-bold text-green-600 text-lg">₹{slotInfo.amount}</p>
                <p className="text-xs text-gray-500">100% Refundable</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-200">
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-blue-500 p-2 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-white" />
            </div>
            <h4 className="font-bold text-blue-900">What's Next?</h4>
          </div>

          <div className="space-y-3">
            {[
              { step: "1", text: `Arrive between ${slotInfo.time}`, icon: Clock },
              { step: "2", text: `Show Token ${bookingData.tokenNumber} at reception`, icon: Shield },
              { step: "3", text: "Check-in and wait for your turn", icon: Users },
              { step: "4", text: "Consultation with our doctor", icon: User },
              { step: "5", text: "Token amount refunded after visit", icon: IndianRupee },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="bg-blue-500 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                  {item.step}
                </div>
                <div className="flex-1 flex items-center gap-2">
                  <item.icon className="w-4 h-4 text-blue-700 flex-shrink-0" />
                  <p className="text-sm text-blue-900 font-medium">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="bg-green-500 p-2 rounded-lg">
              <Phone className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-green-700 mb-0.5">SMS Confirmation Sent</p>
              <p className="text-sm font-semibold text-green-900">+91 {bookingData.patientPhone}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-3 text-center">Need Help?</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={`tel:${centerData?.customerNumber || "0000000000"}`}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#1E4B3C] hover:bg-[#163A2E] text-white rounded-xl transition-all font-semibold shadow-md hover:shadow-lg"
            >
              <Phone className="w-4 h-4" />
              Call {centerData?.customerNumber || "Customer Service"}
            </a>
            <a
              href={centerData?.locationUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-300 rounded-xl transition-all font-semibold"
            >
              <MapPin className="w-4 h-4" />
              Get Directions
            </a>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full py-4 bg-gradient-to-r from-[#1E4B3C] to-[#2A6850] hover:from-[#163A2E] hover:to-[#1E4B3C] text-white rounded-xl transition-all font-bold text-lg shadow-lg hover:shadow-xl"
        >
          Done
        </button>
      </div>
    );
  };

  const StepIndicator = () => (
    <div className="flex items-center justify-between">
      {steps.map((step, index) => (
        <React.Fragment key={step.number}>
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${step.number < currentStep
                ? "bg-emerald-600 text-white"
                : step.number === currentStep
                  ? "bg-[#1E4B3C] text-white ring-4 ring-[#1E4B3C]/20"
                  : "bg-gray-200 text-gray-500"
              }`}>
              {step.number < currentStep ? <Check className="w-5 h-5" /> : step.number}
            </div>
            <span className={`text-xs mt-2 font-medium hidden sm:block ${step.number <= currentStep ? "text-gray-900" : "text-gray-500"
              }`}>{step.title}</span>
          </div>

          {index < steps.length - 1 && (
            <div className={`flex-1 h-1 mx-2 rounded-full transition-all ${step.number < currentStep ? "bg-emerald-600" : "bg-gray-200"
              }`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <Step1_DateAndSlot />;
      case 2: return <Step2_PhoneVerification />;
      case 3: return <Step3_PatientDetails />;
      case 4: return <Step4_Review />;
      case 5: return <Step5_Confirmation />;
      default: return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[95vh] overflow-hidden flex flex-col my-4">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl text-black-800">
              {currentStep === 5 ? "Booking Confirmed!" : "Booking General Appointment At"}
            </h2>
            <p className="text-sm text-gray-600 mt-1">{centerData?.name || "Medical Center"}</p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {currentStep < 5 && (
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <StepIndicator />
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-6">{renderStep()}</div>
      </div>
    </div>
  );
};

export default BookingGeneralAppointment;