import React, { useEffect, useState } from "react";
import { Phone, Shield, AlertCircle, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import axios from "axios";

const Step2_PhoneVerification = ({
  bookingData,
  handleDataUpdate,
  handleNext,
  handlePrevious,
  otpSent,
  setOtpSent,
  otpBoxes,
  setOtpBoxes,
  otpInputRefs,
  setOtpDigit,
  handleOtpKeyDown,
  handleOtpPaste,
  isLoading,
  setIsLoading,
}) => {
  const [phoneInput, setPhoneInput] = useState(bookingData.patientPhone || "");
  const [patientEmail, setPatientEmail] = useState(bookingData.patientEmail || "");

  useEffect(() => {
    if (!otpSent) setPhoneInput(bookingData.patientPhone || "");
  }, [bookingData.patientPhone, otpSent]);

  // Function to send OTP to phone number
  const sendOTPToPhone = async (phone) => {
    console.log("is this phone no",phone);
    try {
      const response = await axios.post("http://localhost:3000/patient/appointment-otp", {
        phoneNo: phone,
        email: patientEmail, // Send patient's email along with the phone number
      });

      if (response.status === 200) {
        return { ok: true };
      } else {
        return { ok: false, message: response.data.message || "Failed to send OTP" };
      }
    } catch (error) {
      return { ok: false, message: "Network error: " + error.message };
    }
  };

  // Function to verify OTP
  const verifyOTPForPhone = async (phone) => {
    try {
      const otpValue = otpBoxes.join(""); // Join OTP digits into one string

      const response = await axios.post("http://localhost:3000/patient/verify-appointment-otp", {
        phoneNo: phone,
        otp: otpValue, // Send phone number and OTP for verification
      });
      bookingData.patientPhone=phone;

      if (response.status === 200) {
        return { ok: true };
      } else {
        return { ok: false, message: response.data.message || "OTP verification failed" };
      }
    } catch (error) {
      return { ok: false, message: "Network error: " + error.message };
    }
  };

  // Start OTP sending process
  const startSend = async () => {
    if (!phoneInput || phoneInput.length !== 10) {
      alert("Enter a valid 10-digit phone number");
      return;
    }
    const res = await sendOTPToPhone(phoneInput); // Call the sendOTPToPhone function
    if (res.ok) {
      setOtpSent(true); // If OTP is sent successfully, set the state
    } else {
      alert(res.message || "Failed to send OTP");
    }
  };

  // Submit OTP verification process
  const submitVerify = async () => {
    setIsLoading(true); // Set loading state before API call
    const res = await verifyOTPForPhone(phoneInput); // Call the verifyOTPForPhone function
    setIsLoading(false); // Reset loading state after API call completes
    if (res.ok) {
      handleNext(); // If OTP is verified successfully, move to the next step
    } else {
      alert(res.message || "OTP verification failed");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Verify Your Phone</h3>
        <p className="text-sm text-gray-600">
          We will send a 6-digit OTP to your phone (Demo OTP: 123456)
        </p>
      </div>

      {/* Phone Number Input */}
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
        <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
          <Shield className="w-3 h-3" /> We'll send a 6-digit OTP
        </p>
      </div>

      {/* Send OTP Button or OTP Input */}
      {!otpSent ? (
        <button
          onClick={startSend}
          disabled={isLoading || phoneInput.length !== 10}
          className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg font-semibold transition-all ${
            phoneInput.length === 10
              ? "bg-[#1E4B3C] text-white hover:bg-[#163A2E]"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Sending OTP...</span>
            </>
          ) : (
            <>
              <Phone className="w-5 h-5" />
              <span>Send OTP to Phone</span>
            </>
          )}
        </button>
      ) : (
        <div className="space-y-4">
          {/* OTP Input Boxes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
              Enter 6-digit OTP sent to +91 {bookingData.patientPhone || phoneInput}
            </label>
            <div className="flex gap-3 justify-center">
              {otpBoxes.map((d, idx) => (
                <input
                  key={idx}
                  ref={(el) => (otpInputRefs.current[idx] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={d}
                  onChange={(e) => setOtpDigit(idx, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(e, idx)}
                  onPaste={idx === 0 ? handleOtpPaste : undefined}
                  className="w-14 h-14 text-center text-2xl font-semibold border-2 border-gray-300 rounded-lg focus:border-[#1E4B3C] focus:ring-2 focus:ring-[#1E4B3C]/20 focus:outline-none transition-colors bg-white"
                />
              ))}
            </div>
          </div>

          {/* Demo OTP Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-xs text-blue-800 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>
                <strong>Demo:</strong> Use OTP <strong>123456</strong> to verify
              </span>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              onClick={handlePrevious}
              disabled={isLoading}
              className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>

            <button
              onClick={submitVerify}
              disabled={isLoading || otpBoxes.join("").length !== 6}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                otpBoxes.join("").length === 6
                  ? "bg-[#1E4B3C] text-white hover:bg-[#163A2E]"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <span>Verify & Continue</span>
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Step2_PhoneVerification;
