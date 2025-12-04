import React from "react";
import { Calendar, Clock, Users, IndianRupee, CheckCircle2, AlertCircle } from "lucide-react";

const Step4_Review = ({ bookingData, mergedSlots, therapyData, centerData, setBookingData, setIsLoading, handleNext }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today); 
    tomorrow.setDate(today.getDate() + 1);
    if (date.toDateString() === today.toDateString()) return `Today, ${date.toLocaleDateString()}`;
    if (date.toDateString() === tomorrow.toDateString()) return `Tomorrow, ${date.toLocaleDateString()}`;
    return date.toLocaleDateString();
  };

  const slot = bookingData.selectedSlot ? mergedSlots[bookingData.selectedSlot] : mergedSlots.morning;
  const slotLabel = bookingData.selectedSlot === "morning" ? "Morning" : "Evening";
  
  // Calculate token amount as 10% of therapy price
  const therapyPrice = Number(therapyData?.price) || 0;
  const tokenAmount = Math.round(therapyPrice * 0.1); // 10% of therapy price
  const remainingAmount = therapyPrice - tokenAmount;

  const handleConfirmPayment = () => {
    setIsLoading(true);
    setTimeout(() => {
      const tokenNumber = `T-${String(Math.floor(Math.random() * 999) + 1).padStart(3, "0")}`;
      const bookingId = `BKG${Date.now().toString().slice(-6)}`;
      setBookingData((prev) => ({ ...prev, tokenNumber, bookingId }));
      setIsLoading(false);
      handleNext();
    }, 1200);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Review Your Booking</h3>
        <p className="text-gray-600">Confirm details before payment</p>
      </div>

      {/* Main Review Card */}
      <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 overflow-hidden">
        
        {/* Therapy Details Header - Gradient */}
        <div className="bg-gradient-to-br from-[#1E4B3C] via-[#2A6850] to-[#1E4B3C] p-6 text-white">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full mb-3">
                <Calendar className="w-4 h-4" />
                <span className="text-xs font-semibold">APPOINTMENT</span>
              </div>
              <h4 className="text-2xl font-bold mb-1">{therapyData?.name}</h4>
              <p className="text-sm opacity-90">{therapyData?.summary || centerData.name}</p>
            </div>
          </div>

          {/* Date & Time Grid */}
          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <div className="bg-white/10 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-lg">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs opacity-75 uppercase">Date</p>
                  <p className="font-semibold text-sm mt-0.5">{formatDate(bookingData.selectedDate)}</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-lg">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs opacity-75 uppercase">Time Slot</p>
                  <p className="font-semibold text-sm mt-0.5">
                    {slotLabel} ({slot?.startTime} - {slot?.endTime})
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Patient Details Section */}
        <div className="p-6 bg-gray-50">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-[#1E4B3C]" />
            <h5 className="font-bold text-gray-900">Patient Details</h5>
          </div>

          <div className="grid md:grid-cols-2 gap-3">
            <div className="bg-white p-4 rounded-xl border border-gray-200">
              <p className="text-xs text-gray-500 mb-1">Full Name</p>
              <p className="font-semibold text-gray-900">{bookingData.patientName}</p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-gray-200">
              <p className="text-xs text-gray-500 mb-1">Phone</p>
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
              <p className="text-xs text-gray-500 mb-1">Special Notes</p>
              <p className="text-sm text-gray-700">{bookingData.notes}</p>
            </div>
          )}
        </div>

        {/* Payment Section */}
        <div className="p-6 bg-white border-t-2 border-gray-100">
          {/* Token Amount Display */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 mb-4 border-2 border-green-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <IndianRupee className="w-5 h-5 text-[#1E4B3C]" />
                <span className="font-semibold text-gray-900">Token Amount (10%)</span>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-[#1E4B3C]">₹{tokenAmount}</p>
                <p className="text-xs text-green-600 font-medium flex items-center gap-1 justify-end mt-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Refundable
                </p>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="pt-3 border-t border-green-200">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Therapy Price:</span>
                <span className="font-semibold text-gray-900">₹{therapyPrice}</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Token Amount (10%):</span>
                <span className="font-semibold text-[#1E4B3C]">₹{tokenAmount}</span>
              </div>
              <div className="flex justify-between text-sm pt-2 border-t border-green-200">
                <span className="text-gray-700 font-medium">Pay at Center:</span>
                <span className="font-bold text-gray-900">₹{remainingAmount}</span>
              </div>
            </div>
          </div>

          {/* Refund Policy */}
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-blue-900 mb-2">Refund Policy</p>
                <ul className="text-xs text-blue-800 space-y-1">
                  <li>• Token refunded after your visit completion</li>
                  <li>• Cancel 24 hours before for full token refund</li>
                  <li>• Remaining ₹{remainingAmount} to be paid at center</li>
                  {centerData.bookingSettings?.tokenRefundPolicy && (
                    <li>• {centerData.bookingSettings.tokenRefundPolicy}</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirm Button */}
      <div className="flex gap-3 pt-4">
        <button
          onClick={handleConfirmPayment}
          className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#1E4B3C] to-[#2A6850] text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
        >
          <IndianRupee className="w-6 h-6" />
          <span>Confirm & Pay Token ₹{tokenAmount}</span>
        </button>
      </div>

      {/* Payment Note */}
      <p className="text-center text-sm text-gray-600">
        Pay ₹{tokenAmount} now • Remaining ₹{remainingAmount} at the center
      </p>
    </div>
  );
};

export default Step4_Review;
