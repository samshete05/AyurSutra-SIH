import React, { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate=useNavigate();
  const [selectedRole, setSelectedRole] = useState("patient"); // patient | centerHead | doctor
  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
    selectedInstitute: "",
  });

  const associatedInstitutes = [
    "AyurSutra Wellness Institute, Nagpur",
    "Kerala Heritage Panchakarma Center",
    "AyurVeda Research & Wellness Hospital",
    "Urban Holistic Care Clinic",
  ];

  const handleRoleChange = (role) => {
    setSelectedRole(role);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((previousFormData) => ({
      ...previousFormData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async(event) => {
    event.preventDefault();
    console.log("Login payload:", {
      role: selectedRole,
      ...formData,
    });
    

    const resp=await axios.post("http://localhost:3000/patient/login",{
        email:formData.emailOrPhone,
        password:formData.password,
        role:selectedRole
    },{withCredentials:true})
    console.log("yahi toh han vo",resp);

    if(resp.data.message=='logedin'){
       localStorage.setItem("authToken", resp.data.token);
    localStorage.setItem("email", formData.emailOrPhone);
    localStorage.setItem("role", selectedRole);
        navigate("/")
    } else if(resp.data.message=='center_not_exists'){
      alert("Center Not Exists!!");
      return;
    } else if(resp.data.message=='User_not_exists'){
       alert("User Not Exists!!");
      return;
    } else{
      alert("Invalid Details");
      return;
    }
  };

  const isDoctor = selectedRole === "doctor";

  return (
    <>
    <Navbar/>
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-emerald-50 to-[#1E4B3C]/40 px-4">
      <div className="w-full max-w-xl rounded-3xl bg-white shadow-2xl border border-emerald-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1E4B3C] to-[#256f5a] px-8 pt-7 pb-4 text-center text-white">
          <h1 className="text-2xl font-extrabold tracking-wide">
            AyurSutra Login
          </h1>
          <p className="mt-1 text-xs text-emerald-100">
            Secure access for patients, centers & doctors
          </p>
        </div>

        {/* Role Tabs */}
        <div className="px-6 pt-4 bg-emerald-900/5">
          <div className="grid grid-cols-3 rounded-full bg-emerald-50 text-xs font-semibold overflow-hidden">
            <button
              type="button"
              onClick={() => handleRoleChange("patient")}
              className={`py-2.5 flex items-center justify-center gap-1 transition-all ${
                selectedRole === "patient"
                  ? "bg-[#1E4B3C] text-white shadow-md"
                  : "text-emerald-900 hover:bg-emerald-100"
              }`}
            >
              <span>Patient</span>
            </button>
            <button
              type="button"
              onClick={() => handleRoleChange("centerHead")}
              className={`py-2.5 flex items-center justify-center gap-1 transition-all ${
                selectedRole === "centerHead"
                  ? "bg-[#1E4B3C] text-white shadow-md"
                  : "text-emerald-900 hover:bg-emerald-100"
              }`}
            >
              <span>Center Head</span>
            </button>
            <button
              type="button"
              onClick={() => handleRoleChange("doctor")}
              className={`py-2.5 flex items-center justify-center gap-1 transition-all ${
                selectedRole === "doctor"
                  ? "bg-[#1E4B3C] text-white shadow-md"
                  : "text-emerald-900 hover:bg-emerald-100"
              }`}
            >
              <span>Doctor</span>
            </button>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleFormSubmit}
          className="px-6 pb-7 pt-4 space-y-4 bg-white"
        >
          {/* Email / phone */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Email or Phone <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="emailOrPhone"
              value={formData.emailOrPhone}
              onChange={handleInputChange}
              required
              placeholder={
                selectedRole === "patient"
                  ? "your.email@example.com or +91 XXXXX XXXXX"
                  : "Registered email / phone"
              }
              className="w-full rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 text-xs md:text-sm outline-none focus:border-[#1E4B3C] focus:bg-white focus:ring-1 focus:ring-[#1E4B3C]"
            />
          </div>

          {/* Doctor institute dropdown */}
          {isDoctor && (
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Associated Institute <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  name="selectedInstitute"
                  value={formData.selectedInstitute}
                  onChange={handleInputChange}
                  required={isDoctor}
                  className="w-full appearance-none rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 pr-9 text-xs md:text-sm text-gray-800 outline-none focus:border-[#1E4B3C] focus:bg-white focus:ring-1 focus:ring-[#1E4B3C]"
                >
                  <option value="">Select institute</option>
                  {associatedInstitutes.map((instituteName) => (
                    <option key={instituteName} value={instituteName}>
                      {instituteName}
                    </option>
                  ))}
                </select>
                <svg
                  className="pointer-events-none absolute right-3 top-2.5 h-4 w-4 text-gray-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </div>
            </div>
          )}

          {/* Password */}
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
              placeholder="Enter your password"
              className="w-full rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 text-xs md:text-sm outline-none focus:border-[#1E4B3C] focus:bg-white focus:ring-1 focus:ring-[#1E4B3C]"
            />
          </div>

          {/* Extra row: remember + forgot */}
          <div className="flex items-center justify-between text-[11px] md:text-xs text-gray-600">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="h-3.5 w-3.5 rounded border-gray-300 text-[#1E4B3C] focus:ring-[#1E4B3C]"
              />
              <span>Remember this device</span>
            </label>
            <button
              type="button"
              className="font-semibold text-[#1E4B3C] hover:underline"
            >
              Forgot password?
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="mt-1 cursor-pointer w-full rounded-full bg-[#1E4B3C] py-3 text-sm font-semibold text-white shadow-md hover:bg-emerald-800 transition-colors"
          >
            {isDoctor
              ? "Login as Doctor"
              : selectedRole === "centerHead"
              ? "Login as Center Head"
              : "Login"}
          </button>

          {/* Switch to signup */}
          <p className="pt-2 cursor-pointer text-center text-[11px] md:text-xs text-gray-600">
            New to AyurSutra?{" "}
            <a
              href="/signup"
              className="font-semibold text-[#1E4B3C] hover:underline"
            >
              Create an account
            </a>
          </p>
        </form>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Login;
