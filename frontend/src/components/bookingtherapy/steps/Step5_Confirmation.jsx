import React from "react";
import { CheckCircle2, Calendar, Shield, MapPin, Phone } from "lucide-react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Step5_Confirmation = ({ bookingData, centerData, therapyData }) => {
  const formatDate = (d) => d ? new Date(d).toLocaleDateString() : "-";
  const slot = bookingData.selectedSlot ? (therapyData?.slots?.[bookingData.selectedSlot] || centerData.slots[bookingData.selectedSlot]) : null;
 const patientEmail=localStorage.getItem("email");
 const profileImg=localStorage.getItem("profileImg");

  const {centerId}=useParams();



  const handleSubmit=async()=>{
    console.log("final data",bookingData);
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
            serviceType: "therapy",
            isPhoneVerified: bookingData.isPhoneVerified || false,
            centerId: centerId,
            tokenAmount: "100",
            profileImg:profileImg,
            date:bookingData.selectedDate,
            slot:bookingData.selectedSlot
          });
      
          if (resp.data.success) {
            alert(`Booking successful! Booking ID: ${resp.data.bookingId}`);
            const resp2=await axios.post("http://localhost:3000/patient/pre-notification",{
             phoneNo:bookingData.patientPhone
            })

            console.log("check pref notify!! ",resp2);
          //  window.location.reload();
          } else {
            alert("Booking failed: " + resp.data.message);
          }
          
        } catch (error) {
          console.log("Error:", error);
          alert("Booking error: " + (error.response?.data?.message || error.message));
        }

    window.location.reload();
  }

  console.log("final data is ",bookingData);
  return (
    <div className="space-y-6 max-w-2xl mx-auto py-4">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full shadow-xl mb-6 animate-bounce"><CheckCircle2 className="w-14 h-14 text-white" strokeWidth={3} /></div>
        <h3 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h3>
        <p className="text-gray-600">Your session is scheduled</p>
      </div>

      <div className="bg-gradient-to-br from-[#1E4B3C] to-[#2A6850] rounded-2xl p-6 text-white shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm opacity-75">Booking ID</p>
            <p className="text-2xl font-bold">#{bookingData.bookingId}</p>
          </div>
          <div className="bg-white/20 p-3 rounded-xl"><Calendar className="w-8 h-8" /></div>
        </div>

        <div className="bg-white/10 rounded-xl p-6 mb-4">
          <p className="text-sm opacity-75 uppercase tracking-wide mb-2 text-center">Your Token Number</p>
          <div className="flex items-center justify-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg"><Shield className="w-6 h-6" /></div>
            <p className="text-5xl font-black tracking-wider">{bookingData.tokenNumber}</p>
          </div>
          <p className="text-xs text-center mt-3 opacity-75">Show at reception</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/10 rounded-lg p-3">
            <p className="text-xs opacity-75 mb-1">Date</p>
            <p className="font-semibold text-sm">{formatDate(bookingData.selectedDate)}</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <p className="text-xs opacity-75 mb-1">Time</p>
            <p className="font-semibold text-sm">{bookingData.selectedSlot ? `${slot?.startTime} - ${slot?.endTime}` : "-"}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <h4 className="font-bold text-gray-900 flex items-center gap-2"><MapPin className="w-5 h-5 text-[#1E4B3C]" /> Appointment Summary</h4>
        </div>
        <div className="p-6 space-y-3">
          <div className="flex justify-between"><span className="text-sm text-gray-600">Center</span><span className="font-semibold text-gray-900">{centerData.name}</span></div>
          <div className="flex justify-between"><span className="text-sm text-gray-600">Therapy</span><span className="font-semibold text-gray-900">{therapyData?.name}</span></div>
          <div className="flex justify-between"><span className="text-sm text-gray-600">Patient</span><span className="font-semibold text-gray-900">{bookingData.patientName}</span></div>
          <div className="flex justify-between border-t border-gray-200 pt-3">
            <span className="text-sm text-gray-600">Token Paid</span>
            <div className="text-right">
              <p className="font-bold text-green-600 text-lg">₹{slot?.tokenAmount ?? therapyData?.price}</p>
              <p className="text-xs text-gray-500">100% Refundable</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
        <div className="flex items-center gap-3">
          <div className="bg-green-500 p-2 rounded-lg"><Phone className="w-5 h-5 text-white" /></div>
          <div>
            <p className="text-xs text-green-700 mb-0.5">SMS Confirmation Sent</p>
            <p className="text-sm font-semibold text-green-900">+91 {bookingData.patientPhone}</p>
          </div>
        </div>
      </div>


        <div className="flex gap-3 pt-4">
        <button
          onClick={handleSubmit}
          className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#1E4B3C] to-[#2A6850] text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
        >
          <span>Done</span>
        </button>
      </div>
    </div>
  );
};

export default Step5_Confirmation;
