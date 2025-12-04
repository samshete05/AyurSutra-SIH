import React, { useState, useRef } from "react";
import { X, Check } from "lucide-react";
import Step1_DateAndSlot from "./steps/Step1_DateAndSlot";
import Step2_PhoneVerification from "./steps/Step2_PhoneVerification";
import Step3_PatientDetails from "./steps/Step3_PatientDetails";
import Step4_Review from "./steps/Step4_Review";
import Step5_Confirmation from "./steps/Step5_Confirmation";

const BookingTherapyAppointment = ({ isOpen, onClose, centerData, therapyData }) => {
  const [currentStep, setCurrentStep] = useState(1);

  const [bookingData, setBookingData] = useState({
    serviceType: therapyData?.id || "therapy",
    therapyName: therapyData?.name || "Therapy Session",
    selectedDate: null,
    selectedSlot: null,
    selectedTherapist: therapyData?.therapists?.[0]?.id || null,
    patientName: "",
    patientPhone: "",
    patientAge: "",
    patientGender: "",
    notes: "",
    extras: {},
    isPhoneVerified: false,
    tokenNumber: null,
    bookingId: null,
  });

  const [otpBoxes, setOtpBoxes] = useState(["", "", "", "", "", ""]);
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const otpInputRefs = useRef([]);

  if (!isOpen) return null;

  const handleDataUpdate = (patch) => setBookingData((p) => ({ ...p, ...patch }));
  const handleNext = () => setCurrentStep((s) => Math.min(5, s + 1));
  const handlePrevious = () => setCurrentStep((s) => Math.max(1, s - 1));

  const resetAll = () => {
    setCurrentStep(1);
    setBookingData({
      serviceType: therapyData?.id || "therapy",
      therapyName: therapyData?.name || "Therapy Session",
      selectedDate: null,
      selectedSlot: null,
      selectedTherapist: therapyData?.therapists?.[0]?.id || null,
      patientName: "",
      patientPhone: "",
      patientAge: "",
      patientGender: "",
      notes: "",
      extras: {},
      isPhoneVerified: false,
      tokenNumber: null,
      bookingId: null,
    });
    setOtpBoxes(["", "", "", "", "", ""]);
    setOtpSent(false);
    setIsLoading(false);
  };

  const handleClose = () => {
    resetAll();
    onClose();
  };

  const sendOTPToPhone = async (phone) => {
    if (!phone || phone.replace(/\D/g, "").length !== 10) {
      return { ok: false, message: "Enter a valid 10-digit phone number" };
    }
    handleDataUpdate({ patientPhone: phone });
    setIsLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        setOtpSent(true);
        setIsLoading(false);
        setTimeout(() => otpInputRefs.current[0]?.focus(), 80);
        alert(`OTP sent to +91 ${phone} (Demo OTP: 123456)`);
        resolve({ ok: true });
      }, 700);
    });
  };

  const verifyOTPForPhone = async (phone) => {
    const otpValue = otpBoxes.join("");
    if (otpValue.length !== 6) return { ok: false, message: "Please enter complete OTP" };
    setIsLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        setIsLoading(false);
        if (otpValue === "123456") {
          handleDataUpdate({ patientPhone: phone, isPhoneVerified: true });
          resolve({ ok: true });
        } else {
          resolve({ ok: false, message: "Invalid OTP" });
        }
      }, 800);
    });
  };

  const setOtpDigit = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    setOtpBoxes((prev) => {
      const next = [...prev];
      next[index] = value.slice(-1);
      return next;
    });
    if (value && index < 5) setTimeout(() => otpInputRefs.current[index + 1]?.focus(), 0);
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

  const mergedSlots = {
    morning: therapyData?.slots?.morning || centerData.slots.morning,
    evening: therapyData?.slots?.evening || centerData.slots.evening,
  };

  const checkSlotAvailability = (date, slot) => Math.random() > 0.12;

  const commonProps = {
    bookingData,
    handleDataUpdate,
    handleNext,
    handlePrevious,
    mergedSlots,
    therapyData,
    centerData,
  };

  const steps = [
    { number: 1, label: "Date & Slot" },
    { number: 2, label: "Verify Phone" },
    { number: 3, label: "Details" },
    { number: 4, label: "Review & Pay" },
    { number: 5, label: "Confirm" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[95vh] overflow-hidden flex flex-col my-4">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {currentStep === 5 ? "Booking Confirmed!" : `Book: ${therapyData?.name || "Therapy"}`}
            </h2>
            <p className="text-sm text-gray-600 mt-1">{centerData.name}</p>
          </div>
          <button 
            onClick={handleClose} 
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close booking modal"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Step Progress Indicator - Matching Image */}
        <div className="px-4 py-8 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <React.Fragment key={step.number}>
                {/* Step Circle with Label */}
                <div className="flex flex-col items-center relative z-10">
                  {/* Circle */}
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${
                      currentStep > step.number
                        ? "bg-[#1E9B6F] text-white" // Completed - Green with checkmark
                        : currentStep === step.number
                        ? "bg-[#1E4B3C] text-white" // Current - Dark teal
                        : "bg-gray-300 text-gray-600" // Upcoming - Gray
                    }`}
                  >
                    {currentStep > step.number ? (
                      <Check className="w-7 h-7 stroke-[3]" />
                    ) : (
                      step.number
                    )}
                  </div>
                  
                  {/* Label */}
                  <span
                    className={`mt-3 text-sm font-medium text-center whitespace-nowrap transition-colors ${
                      currentStep >= step.number ? "text-gray-900" : "text-gray-500"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>

                {/* Connector Line Between Steps */}
                {index < steps.length - 1 && (
                  <div className="flex-1 h-1 mx-3 mb-8 relative">
                    {/* Background line (gray) */}
                    <div className="absolute inset-0 bg-gray-300 rounded-full" />
                    
                    {/* Progress line (green) - only shows for completed connections */}
                    <div
                      className={`absolute inset-0 bg-[#1E9B6F] rounded-full transition-all duration-500 ${
                        currentStep > step.number ? "w-full" : "w-0"
                      }`}
                    />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {currentStep === 1 && (
            <Step1_DateAndSlot 
              {...commonProps} 
              checkSlotAvailability={checkSlotAvailability} 
            />
          )}
          
          {currentStep === 2 && (
            <Step2_PhoneVerification
              {...commonProps}
              otpSent={otpSent}
              setOtpSent={setOtpSent}
              otpBoxes={otpBoxes}
              setOtpBoxes={setOtpBoxes}
              otpInputRefs={otpInputRefs}
              setOtpDigit={setOtpDigit}
              handleOtpKeyDown={handleOtpKeyDown}
              handleOtpPaste={handleOtpPaste}
              sendOTPToPhone={sendOTPToPhone}
              verifyOTPForPhone={verifyOTPForPhone}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          )}
          
          {currentStep === 3 && (
            <Step3_PatientDetails 
              {...commonProps} 
              isPhoneVerified={bookingData.isPhoneVerified} 
            />
          )}
          
          {currentStep === 4 && (
            <Step4_Review 
              {...commonProps} 
              mergedSlots={mergedSlots} 
              setBookingData={setBookingData} 
              setIsLoading={setIsLoading} 
              handleNext={handleNext} 
            />
          )}
          
          {currentStep === 5 && (
            <Step5_Confirmation 
              {...commonProps} 
              onClose={handleClose}
            />
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Step {currentStep} of 5
          </div>
          
          {currentStep > 1 && currentStep < 5 && (
            <button
              onClick={handlePrevious}
              className="text-sm text-[#1E4B3C] hover:text-[#163A2E] font-medium transition-colors"
            >
              ← Back
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingTherapyAppointment;
