import React, { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const OtpVerification = () => {
  const navigate=useNavigate();

  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const inputReferences = useRef([]);
  const location = useLocation();
   const email = location.state?.email;
   const password = location.state?.password;
   const selectedRole=location.state?.selectedRole;

   console.log("role is ss",selectedRole)
   

   console.log("here mail",email);

  const handleChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return; // allow only single digit

    const updatedOtpDigits = [...otpDigits];
    updatedOtpDigits[index] = value;
    setOtpDigits(updatedOtpDigits);

    // auto move to next
    if (value && index < otpDigits.length - 1) {
      inputReferences.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !otpDigits[index] && index > 0) {
      inputReferences.current[index - 1]?.focus();
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const text = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!text) return;
    const digitsArray = text.split("");
    const updatedOtpDigits = [...otpDigits];
    for (let index = 0; index < 6; index += 1) {
      updatedOtpDigits[index] = digitsArray[index] || "";
    }
    setOtpDigits(updatedOtpDigits);
    const lastFilledIndex = Math.min(text.length, 6) - 1;
    if (lastFilledIndex >= 0) {
      inputReferences.current[lastFilledIndex]?.focus();
    }
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    const otpCode = otpDigits.join("");
    console.log("Verifying OTP:", otpCode);
    // TODO: call backend verification API

    if(otpCode==""){
      alert("Enter Valid OTP!!");
      return;
    } else{
       const resp=await axios.post("http://localhost:3000/patient/verifyOTP",{
          otp:otpCode,
          email:email,
          password:password
       }, { withCredentials: true })
       console.log(resp);
       if(resp.data.message=='logedin'){
           localStorage.setItem("authToken", resp.data.token);
    localStorage.setItem("email", email);
    localStorage.setItem("role", selectedRole);
    // if(selectedRole=='centerHead')  localStorage.setItem("centerId", resp.data.token);
        localStorage.setItem("authToken", resp.data.token);
        navigate("/",{state:{email:email}})
       } else{
        alert("Invalid OTP!!");
        return;
       }
    }
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-emerald-50 to-[#1E4B3C]/40 px-4">
      <div className="w-full max-w-md rounded-3xl bg-white shadow-2xl border border-emerald-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1E4B3C] to-[#256f5a] px-8 pt-7 pb-4 text-center text-white">
          <h1 className="text-2xl font-extrabold tracking-wide">
            Email Verification
          </h1>
          <p className="mt-1 text-xs text-emerald-100">
            Enter the 6‑digit code sent to your registered email address.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="px-6 pb-7 pt-5 space-y-5 bg-white"
        >
          <div className="text-center text-xs text-gray-600">
            <p>
              We have sent a one‑time password (OTP) to your email. Please do
              not share this code with anyone.
            </p>
          </div>

          {/* OTP boxes */}
          <div
            className="flex items-center justify-center gap-2"
            onPaste={handlePaste}
          >
            {otpDigits.map((digitValue, index) => (
              <input
                key={index}
                ref={(element) => {
                  inputReferences.current[index] = element;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digitValue}
                onChange={(event) => handleChange(index, event.target.value)}
                onKeyDown={(event) => handleKeyDown(index, event)}
                className="h-11 w-10 md:h-12 md:w-11 text-center text-lg md:text-xl font-semibold text-gray-900 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:bg-white focus:border-[#1E4B3C] focus:ring-1 focus:ring-[#1E4B3C]"
              />
            ))}
          </div>

          {/* Resend / info */}
          <div className="flex items-center justify-between text-[11px] md:text-xs text-gray-600">
            <button
              type="button"
              className="text-[#1E4B3C] font-semibold hover:underline"
            >
              Resend code
            </button>
            <p>Code expires in 10 minutes.</p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full cursor-pointer rounded-full bg-[#1E4B3C] py-3 text-sm font-semibold text-white shadow-md hover:bg-emerald-800 transition-colors"
          >
            Verify Email
          </button>

          {/* Back to login */}
          <p className="pt-1 text-center text-[11px] md:text-xs text-gray-600">
            Entered wrong email?{" "}
            <a
              href="/login"
              className="font-semibold text-[#1E4B3C] hover:underline"
            >
              Go back to login
            </a>
          </p>
        </form>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default OtpVerification;
