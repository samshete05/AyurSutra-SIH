import React, { useEffect, useState } from "react";
import { User, Phone, FileText, ChevronLeft, ChevronRight, Shield } from "lucide-react";

const Step3_PatientDetails = ({ bookingData, handleDataUpdate, handleNext, handlePrevious, isPhoneVerified, therapyData }) => {
  const [formData, setFormData] = useState({
    patientName: bookingData.patientName || "",
    patientPhone: bookingData.patientPhone || "",
    patientAge: bookingData.patientAge || "",
    patientGender: bookingData.patientGender || "",
    notes: bookingData.notes || "",
    selectedTherapist: bookingData.selectedTherapist || "",
    extras: bookingData.extras || {},
  });

  useEffect(() => {
    setFormData({
      patientName: bookingData.patientName || "",
      patientPhone: bookingData.patientPhone || "",
      patientAge: bookingData.patientAge || "",
      patientGender: bookingData.patientGender || "",
      notes: bookingData.notes || "",
      selectedTherapist: bookingData.selectedTherapist || "",
      extras: bookingData.extras || {},
    });
  }, [bookingData]);

  const handleChange = (field, value) => setFormData((p) => ({ ...p, [field]: value }));

  const continueHandler = () => {
    if (!formData.patientName || !formData.patientAge || !formData.patientGender) {
      alert("Please fill Name, Age and Gender");
      return;
    }
    handleDataUpdate({
      patientName: formData.patientName,
      patientPhone: formData.patientPhone,
      patientAge: formData.patientAge,
      patientGender: formData.patientGender,
      notes: formData.notes,
      selectedTherapist: formData.selectedTherapist,
      extras: formData.extras,
    });
    handleNext();
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Patient Information</h3>
        <p className="text-sm text-gray-600">Provide details to complete the booking</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name <span className="text-red-500">*</span></label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input value={formData.patientName} onChange={(e) => handleChange("patientName", e.target.value)} className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#1E4B3C]" />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-700">Phone Number <span className="text-red-500">*</span></label>
            {isPhoneVerified && (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 border border-green-200 text-green-800 text-sm font-medium">
                <Shield className="w-4 h-4" /> Verified
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <div className="flex items-center gap-2 px-4 py-3 border-2 border-gray-200 rounded-lg bg-gray-50">
              <Phone className="w-4 h-4 text-gray-500" />
              <span className="font-medium text-gray-700">+91</span>
            </div>
            <input value={formData.patientPhone} onChange={(e) => handleChange("patientPhone", e.target.value.replace(/\D/g, "").slice(0, 10))} placeholder="9876543210" disabled={isPhoneVerified} className={`flex-1 px-4 py-3 border-2 rounded-lg focus:border-[#1E4B3C] ${isPhoneVerified ? "bg-gray-50 border-green-200 cursor-not-allowed" : "border-gray-200"}`} />
          </div>
          <p className="text-xs text-gray-500 mt-1">We'll use this for SMS updates</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Age <span className="text-red-500">*</span></label>
            <input value={formData.patientAge} onChange={(e) => handleChange("patientAge", e.target.value)} type="number" min="1" max="120" className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#1E4B3C]" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Gender <span className="text-red-500">*</span></label>
            <select value={formData.patientGender} onChange={(e) => handleChange("patientGender", e.target.value)} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#1E4B3C]">
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        {/* therapist select if present */}
        {therapyData?.therapists?.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Therapist (optional)</label>
            <select value={formData.selectedTherapist || ""} onChange={(e) => handleChange("selectedTherapist", e.target.value)} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#1E4B3C]">
              <option value="">No Preference</option>
              {therapyData.therapists.map(t => <option key={t.id} value={t.id}>{t.name} {t.title ? `— ${t.title}` : ""}</option>)}
            </select>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes (Optional)</label>
          <div className="relative">
            <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <textarea value={formData.notes} onChange={(e) => handleChange("notes", e.target.value)} rows={4} className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#1E4B3C]" />
          </div>
        </div>
      </div>

      <div className="flex gap-3 pt-4 border-t">
        <button onClick={handlePrevious} className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 font-medium"><ChevronLeft className="w-4 h-4" /> Back</button>
        <button onClick={continueHandler} className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#1E4B3C] hover:bg-[#163A2E] text-white font-semibold">Review Booking <ChevronRight className="w-4 h-4" /></button>
      </div>
    </div>
  );
};

export default Step3_PatientDetails;
