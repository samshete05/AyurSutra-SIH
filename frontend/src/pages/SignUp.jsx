import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const SignUp = () => {
  const navigate=useNavigate();
  const [selectedUserRole, setSelectedUserRole] = useState("patient"); // 'patient' | 'centerHead'
  const [formData, setFormData] = useState({
    fullName: "",
    emailAddress: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
    // optional extra fields for center head
    centerName: "",
    licenseNumber: "",
    BotNumber:"",
    lattitude:"",
    longitude:""
  });

  const handleRoleChange = (role) => {
    setSelectedUserRole(role);
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((previousFormData) => ({
      ...previousFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFormSubmit = async(event) => {
   
    event.preventDefault();
    console.log(formData)
    // TODO: plug into backend / API
    if(formData.confirmPassword!=formData.password){
      alert("Both password isn't match");
      return;
    }
    
     const resp=await axios.post("http://localhost:3000/patient/register",{
              name:formData.fullName,
                email:formData.emailAddress,
                phoneNumber:formData.phoneNumber,
                password:formData.password,
                confirmPassword:formData.confirmPassword,
                role:selectedUserRole,
                 LicenseNo:formData.licenseNumber,
                CenterName:formData.centerName,
                BotNumber:formData.BotNumber,
                lattitude:formData.lattitude,
                longitude:formData.longitude
            },{withCredentials:true})
      
            if(resp.data.message=="Email_Present"){
              alert("Email Already Present");
              return;
            }
           else if(resp.data.message=='OTP_Send'){
              navigate("/otpverification",{state:{email:formData.emailAddress,password:formData.password,selectedRole:selectedUserRole}})
           }
            console.log(resp);
  };

  const isCenterHead = selectedUserRole === "centerHead";

  return (
    <>
    <Navbar/>
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-emerald-50 to-[#1E4B3C]/40 px-4">
      <div className="w-full max-w-3xl rounded-[32px] bg-white shadow-2xl border border-emerald-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1E4B3C] to-[#256f5a] px-10 pt-8 pb-4 text-center text-white">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-wide">
            AyurSutra
          </h1>
          <p className="mt-1 text-sm md:text-base text-emerald-100">
            Panchakarma Management Platform
          </p>
        </div>

        {/* Role Toggle */}
        <div className="px-6 md:px-10 pt-4 pb-2 bg-emerald-900/5">
          <div className="mx-auto max-w-md rounded-full bg-emerald-50 flex text-sm md:text-base font-semibold overflow-hidden">
            <button
              type="button"
              onClick={() => handleRoleChange("patient")}
              className={`flex-1 flex items-center justify-center gap-1 py-3 transition-all ${
                selectedUserRole === "patient"
                  ? "bg-[#1E4B3C] text-white shadow-md"
                  : "text-gray-700 hover:bg-emerald-100"
              }`}
            >
              <span className="inline-flex items-center justify-center rounded-full">
                {/* user icon */}
                <svg
                  className="w-4 h-4 md:w-5 md:h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z" />
                  <path d="M4 20a8 8 0 0 1 16 0" />
                </svg>
              </span>
              <span>Patient User</span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleChange("centerHead")}
              className={`flex-1 flex items-center justify-center gap-1 py-3 transition-all ${
                selectedUserRole === "centerHead"
                  ? "bg-[#1E4B3C] text-white shadow-md"
                  : "text-gray-700 hover:bg-emerald-100"
              }`}
            >
              <span className="inline-flex items-center justify-center rounded-full">
                {/* building / hospital icon */}
                <svg
                  className="w-4 h-4 md:w-5 md:h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 21V7a2 2 0 0 1 2-2h14v16" />
                  <path d="M3 21h18" />
                  <path d="M9 21v-6h6v6" />
                  <path d="M9 9h.01M9 13h.01M13 9h.01M13 13h.01" />
                </svg>
              </span>
              <span>Center Head</span>
            </button>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleFormSubmit}
          className="px-6 md:px-10 pt-4 pb-6 space-y-4 md:space-y-5 bg-white"
        >
          {/* first row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                placeholder="Enter your full name"
                className="w-full rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:border-[#1E4B3C] focus:bg-white focus:ring-1 focus:ring-[#1E4B3C]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
                placeholder="+91 XXXXXX XXXXX"
                className="w-full rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:border-[#1E4B3C] focus:bg-white focus:ring-1 focus:ring-[#1E4B3C]"
              />
            </div>
          </div>

          {/* email */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="emailAddress"
              value={formData.emailAddress}
              onChange={handleInputChange}
              required
              placeholder="your.email@example.com"
              className="w-full rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:border-[#1E4B3C] focus:bg-white focus:ring-1 focus:ring-[#1E4B3C]"
            />
          </div>

          {/* extra fields for center head */}
          {isCenterHead && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Panchakarma Center Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="centerName"
                  value={formData.centerName}
                  onChange={handleInputChange}
                  required={isCenterHead}
                  placeholder="Enter center / clinic name"
                  className="w-full rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:border-[#1E4B3C] focus:bg-white focus:ring-1 focus:ring-[#1E4B3C]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Registration / License Number{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={handleInputChange}
                  required={isCenterHead}
                  placeholder="AYUSH / Clinic license no."
                  className="w-full rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:border-[#1E4B3C] focus:bg-white focus:ring-1 focus:ring-[#1E4B3C]"
                />
              </div>
            </div>
          )}

          {/* passwords */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                placeholder="Create password"
                className="w-full rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:border-[#1E4B3C] focus:bg-white focus:ring-1 focus:ring-[#1E4B3C]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                placeholder="Confirm password"
                className="w-full rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:border-[#1E4B3C] focus:bg-white focus:ring-1 focus:ring-[#1E4B3C]"
              />
            </div>
          </div>

          {/* terms */}
          <div className="flex items-start gap-2 pt-1 text-xs md:text-sm text-gray-600">
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleInputChange}
              required
              className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#1E4B3C] focus:ring-[#1E4B3C]"
            />
            <p>
              I agree to the{" "}
              <button
                type="button"
                className="font-semibold text-[#1E4B3C] hover:underline"
              >
                Terms &amp; Conditions
              </button>{" "}
              and{" "}
              <button
                type="button"
                className="font-semibold text-[#1E4B3C] hover:underline"
              >
                Privacy Policy
              </button>
              .
            </p>
          </div>

          {/* submit */}
          <button
            type="submit"
            className="mt-1 w-full cursor-pointer rounded-full bg-[#1E4B3C] py-3.5 text-sm md:text-base font-semibold text-white tracking-wide shadow-md hover:bg-emerald-800 transition-all"
          >
            {isCenterHead ? "Submit Center Head Request" : "Create Account"}
          </button>

          {/* footer */}
          <p className="pt-3 text-center text-xs md:text-sm text-gray-600">
            Already have an account?{" "}
            <a onClick={()=>navigate("/login")} href="#" className="font-semibold text-[#1E4B3C] hover:underline">
              Sign In
            </a>
          </p>
        </form>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default SignUp;
