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
  <Navbar />

  <div className="min-h-screen flex items-center justify-center bg-[#F4F6F0] px-4">
    <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl shadow-lg overflow-hidden">

      {/* LEFT – BRANDING */}
      <div className="hidden md:flex flex-col justify-center px-12 bg-[#1E4B3C] text-white">
        <div className="w-14 h-14 mb-6 rounded-full border border-white/40 flex items-center justify-center text-2xl font-medium">
          ॐ
        </div>

        <h1 className="text-3xl font-semibold">AyurSutra</h1>

        <p className="mt-3 text-sm text-white/80 leading-relaxed">
          Panchakarma Management Platform trusted by
          Ayurvedic centers across India.
        </p>

        <div className="w-12 h-[2px] bg-white/40 my-6"></div>

        <p className="text-sm text-white/70 leading-relaxed">
          Create your account to manage patients,
          clinics, and treatments securely.
        </p>
      </div>

      {/* RIGHT – SIGNUP FORM */}
      <div className="flex flex-col justify-center px-8 py-10 md:px-12">

        <h2 className="text-2xl font-semibold text-[#1E4B3C]">
          Create your account
        </h2>
        <p className="mt-1 text-sm text-gray-600">
          Register as a patient or center head
        </p>

        {/* ROLE TOGGLE */}
        <div className="mt-6">
          <div className="grid grid-cols-2 rounded-lg border border-gray-200 overflow-hidden">
            <button
              type="button"
              onClick={() => handleRoleChange("patient")}
              className={`py-2 text-sm font-medium transition ${
                selectedUserRole === "patient"
                  ? "bg-[#1E4B3C] text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              Patient
            </button>

            <button
              type="button"
              onClick={() => handleRoleChange("centerHead")}
              className={`py-2 text-sm font-medium transition ${
                selectedUserRole === "centerHead"
                  ? "bg-[#1E4B3C] text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              Center Head
            </button>
          </div>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleFormSubmit}
          className="mt-8 space-y-5"
        >

          {/* NAME + PHONE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                placeholder="Enter your full name"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5
                  focus:outline-none focus:ring-2 focus:ring-[#1E4B3C]/40
                  focus:border-[#1E4B3C]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
                placeholder="+91 XXXXXX XXXXX"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5
                  focus:outline-none focus:ring-2 focus:ring-[#1E4B3C]/40
                  focus:border-[#1E4B3C]"
              />
            </div>
          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="emailAddress"
              value={formData.emailAddress}
              onChange={handleInputChange}
              required
              placeholder="you@example.com"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5
                focus:outline-none focus:ring-2 focus:ring-[#1E4B3C]/40
                focus:border-[#1E4B3C]"
            />
          </div>

          {/* CENTER HEAD EXTRA */}
          {isCenterHead && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Center Name
                </label>
                <input
                  type="text"
                  name="centerName"
                  value={formData.centerName}
                  onChange={handleInputChange}
                  required={isCenterHead}
                  placeholder="Clinic / center name"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5
                    focus:outline-none focus:ring-2 focus:ring-[#1E4B3C]/40
                    focus:border-[#1E4B3C]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  License Number
                </label>
                <input
                  type="text"
                  name="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={handleInputChange}
                  required={isCenterHead}
                  placeholder="AYUSH / clinic license"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5
                    focus:outline-none focus:ring-2 focus:ring-[#1E4B3C]/40
                    focus:border-[#1E4B3C]"
                />
              </div>
            </div>
          )}

          {/* PASSWORDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              placeholder="Create password"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5
                focus:outline-none focus:ring-2 focus:ring-[#1E4B3C]/40
                focus:border-[#1E4B3C]"
            />

            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
              placeholder="Confirm password"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5
                focus:outline-none focus:ring-2 focus:ring-[#1E4B3C]/40
                focus:border-[#1E4B3C]"
            />
          </div>

          {/* TERMS */}
          <label className="flex items-start gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleInputChange}
              required
              className="mt-1 h-4 w-4 text-[#1E4B3C]"
            />
            <span>
              I agree to the{" "}
              <span className="text-[#1E4B3C] hover:underline cursor-pointer">
                Terms & Conditions
              </span>{" "}
              and{" "}
              <span className="text-[#1E4B3C] hover:underline cursor-pointer">
                Privacy Policy
              </span>
            </span>
          </label>

          {/* SUBMIT */}
          <button
            type="submit"
            className="w-full bg-[#1E4B3C] text-white py-2.5 rounded-lg
              hover:bg-[#173B30] transition font-medium"
          >
            {isCenterHead ? "Submit Center Head Request" : "Create Account"}
          </button>

          {/* FOOTER */}
          <p className="text-center text-xs text-gray-500 mt-4">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-[#1E4B3C] cursor-pointer hover:underline"
            >
              Sign In
            </span>
          </p>

        </form>
      </div>
    </div>
  </div>

  <Footer />
</>

  );
};

export default SignUp;
