import React, { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const GeneralConsentForm = () => {
  const [form, setForm] = useState({
    patientName: "",
    age: "",
    gender: "",
    phone: "",
    therapyName: "",
    date: "",
    address: "",
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.agree) return alert("Please agree to the terms before submitting.");

    console.log("Consent Form Submitted:", form);
    alert("Consent form submitted successfully!");
  };

  const labelCls = "block text-sm font-semibold text-slate-700 mb-1";
  const inputCls =
    "w-full border border-slate-300 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400";

  return (
    <>
    <Navbar/>
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-xl rounded-2xl mt-6 mb-12">
      <h1 className="text-2xl font-bold text-slate-900 mb-2">General Therapy Consent Form</h1>
      <p className="text-slate-600 text-sm mb-6">
        Please fill out this consent form before undergoing any Ayurvedic or Panchakarma therapy.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Patient Information */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Patient Name *</label>
            <input
              type="text"
              name="patientName"
              required
              value={form.patientName}
              onChange={handleChange}
              className={inputCls}
              placeholder="Enter patient name"
              />
          </div>

          <div>
            <label className={labelCls}>Age *</label>
            <input
              type="number"
              name="age"
              required
              value={form.age}
              onChange={handleChange}
              className={inputCls}
              placeholder="18"
            />
          </div>

          <div>
            <label className={labelCls}>Gender *</label>
            <select
              name="gender"
              required
              value={form.gender}
              onChange={handleChange}
              className={inputCls}
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className={labelCls}>Phone Number *</label>
            <input
              type="text"
              name="phone"
              required
              value={form.phone}
              onChange={handleChange}
              className={inputCls}
              placeholder="9876543210"
            />
          </div>

          <div>
            <label className={labelCls}>Therapy Name *</label>
            <input
              type="text"
              name="therapyName"
              required
              value={form.therapyName}
              onChange={handleChange}
              className={inputCls}
              placeholder="Abhyanga / Shirodhara / Panchakarma"
              />
          </div>

          <div>
            <label className={labelCls}>Date *</label>
            <input
              type="date"
              name="date"
              required
              value={form.date}
              onChange={handleChange}
              className={inputCls}
            />
          </div>
        </div>

        {/* Address */}
        <div>
          <label className={labelCls}>Address *</label>
          <textarea
            name="address"
            required
            value={form.address}
            onChange={handleChange}
            className={`${inputCls} h-20`}
            placeholder="Enter address"
          ></textarea>
        </div>

        {/* Consent Text */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-700">
          <h2 className="font-semibold mb-2">Consent Terms</h2>
          <p className="mb-2">
            I hereby give my full consent to undergo the selected Ayurvedic / Panchakarma therapy. The procedure, benefits, and guidelines
            have been clearly explained to me.
          </p>
          <p className="mb-2">
            I understand that Ayurvedic therapies may involve temporary reactions such as fatigue, headache, nausea, body ache,
            detoxification symptoms, or skin redness. These reactions are commonly part of the healing process.
          </p>
          <p className="mb-2 font-semibold text-red-600">
            I agree that any side effects or discomfort caused during or after the therapy are not the responsibility or liability of
            the center, therapists, or doctors. I accept full responsibility for my participation and confirm that I have disclosed all
            medical conditions honestly.
          </p>
          <p>
            I voluntarily choose to undergo this therapy without any pressure, and I understand that Ayurveda is a supportive wellness system,
            not a replacement for emergency medical treatment.
          </p>
        </div>

        {/* Agreement Checkbox */}
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            name="agree"
            checked={form.agree}
            onChange={handleChange}
            className="mt-1 w-4 h-4"
            required
          />
          <p className="text-sm text-slate-700">
            I have read and understood the consent terms above. I accept all conditions and agree to proceed with the therapy.
          </p>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl transition-all"
        >
          Submit Consent Form
        </button>
      </form>
    </div>
    <Footer/>
    </>
  );
};

export default GeneralConsentForm;
