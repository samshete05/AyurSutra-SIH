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
    localStorage.setItem("profileImg",resp.data.profileimg);
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
  <Navbar />

  <div className="min-h-screen flex items-center justify-center bg-[#F4F6F0] px-4">
    <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl shadow-lg overflow-hidden">

      {/* LEFT SECTION – BRANDING WITH IMAGE */}
      <div
        className="hidden md:flex relative flex-col justify-center px-12 text-white"
        style={{
          backgroundImage:
            "url('https://cdn.dribbble.com/userupload/22224091/file/original-c8ecf8d1de681520cfc56fadeb2a7b6f.png?resize=752x564&vertical=center')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* overlay */}
        <div className="absolute inset-0 bg-black/45"></div>

        {/* content */}
        <div className="relative z-10">
          <div className="w-14 h-14 mb-6 rounded-full border border-white/40 flex items-center justify-center text-2xl font-medium">
            ॐ
          </div>

          <h1 className="text-3xl font-semibold">AyurSutra</h1>

          <p className="mt-3 text-sm text-white/85 leading-relaxed">
            Secure access for patients, centers, and doctors across India.
          </p>

          <div className="w-12 h-[2px] bg-white/40 my-6"></div>

          <p className="text-sm text-white/75 leading-relaxed">
            Login to manage treatments, institutions, and Ayurvedic care
            with industry-grade security.
          </p>
        </div>
      </div>

      {/* RIGHT SECTION – LOGIN */}
      <div className="flex flex-col justify-center px-8 py-10 md:px-12">

        <h2 className="text-2xl font-semibold text-[#1E4B3C]">
          Welcome back
        </h2>
        <p className="mt-1 text-sm text-gray-600">
          Login using your AyurSutra account
        </p>

        {/* ROLE TABS */}
        <div className="mt-6">
          <div className="grid grid-cols-2 rounded-lg border border-gray-200 overflow-hidden">
            <button
              type="button"
              onClick={() => handleRoleChange("patient")}
              className={`py-2 text-sm font-medium transition ${
                selectedRole === "patient"
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
                selectedRole === "centerHead"
                  ? "bg-[#1E4B3C] text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              Center Head
            </button>

            {/* <button
              type="button"
              onClick={() => handleRoleChange("doctor")}
              className={`py-2 text-sm font-medium transition ${
                selectedRole === "doctor"
                  ? "bg-[#1E4B3C] text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              Doctor
            </button> */}
          </div>
        </div>

        {/* FORM */}
        <form onSubmit={handleFormSubmit} className="mt-8 space-y-5">

          {/* Email / Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email or Phone
            </label>
            <input
              type="text"
              name="emailOrPhone"
              value={formData.emailOrPhone}
              onChange={handleInputChange}
              required
              placeholder={
                selectedRole === "patient"
                  ? "you@example.com or +91 XXXXX XXXXX"
                  : "Registered email or phone"
              }
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5
                focus:outline-none focus:ring-2 focus:ring-[#1E4B3C]/40
                focus:border-[#1E4B3C]"
            />
          </div>

          {/* Doctor Institute */}
          {isDoctor && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Associated Institute
              </label>
              <select
                name="selectedInstitute"
                value={formData.selectedInstitute}
                onChange={handleInputChange}
                required={isDoctor}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5
                  focus:outline-none focus:ring-2 focus:ring-[#1E4B3C]/40
                  focus:border-[#1E4B3C]"
              >
                <option value="">Select institute</option>
                {associatedInstitutes.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              placeholder="Enter your password"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5
                focus:outline-none focus:ring-2 focus:ring-[#1E4B3C]/40
                focus:border-[#1E4B3C]"
            />
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between text-sm text-gray-600">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="h-4 w-4 text-[#1E4B3C] focus:ring-[#1E4B3C]"
              />
              Remember me
            </label>

            <button
              type="button"
              className="text-[#1E4B3C] font-medium hover:underline"
            >
              Forgot password?
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[#1E4B3C] text-white py-2.5 rounded-lg
              hover:bg-[#173B30] transition font-medium"
          >
            {isDoctor
              ? "Login as Doctor"
              : selectedRole === "centerHead"
              ? "Login as Center Head"
              : "Login"}
          </button>

          {/* Signup */}
          <p className="text-center text-xs text-gray-500 mt-4">
            Don’t have an account?{" "}
            <a
              href="/signup"
              className="text-[#1E4B3C] hover:underline"
            >
              Create an account
            </a>
          </p>

        </form>
      </div>
    </div>
  </div>

  <Footer />
</>


  );
};

export default Login;









//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++



// import React, { useState } from "react";
// import Footer from "../components/Footer";
// import Navbar from "../components/Navbar";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// const Login = () => {
//   const navigate=useNavigate();
//   const [selectedRole, setSelectedRole] = useState("patient"); // patient | centerHead | doctor
//   const [formData, setFormData] = useState({
//     emailOrPhone: "",
//     password: "",
//     selectedInstitute: "",
//   });

//   const associatedInstitutes = [
//     "AyurSutra Wellness Institute, Nagpur",
//     "Kerala Heritage Panchakarma Center",
//     "AyurVeda Research & Wellness Hospital",
//     "Urban Holistic Care Clinic",
//   ];

//   const handleRoleChange = (role) => {
//     setSelectedRole(role);
//   };

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setFormData((previousFormData) => ({
//       ...previousFormData,
//       [name]: value,
//     }));
//   };

//   const handleFormSubmit = async(event) => {
//     event.preventDefault();
//     console.log("Login payload:", {
//       role: selectedRole,
//       ...formData,
//     });
    

//     const resp=await axios.post("http://localhost:3000/patient/login",{
//         email:formData.emailOrPhone,
//         password:formData.password,
//         role:selectedRole
//     },{withCredentials:true})
//     console.log("yahi toh han vo",resp);
//     localStorage.setItem("profileImg",resp.data.profileimg);
//     if(resp.data.message=='logedin'){
//        localStorage.setItem("authToken", resp.data.token);
//     localStorage.setItem("email", formData.emailOrPhone);
//     localStorage.setItem("role", selectedRole);
//         navigate("/")
//     } else if(resp.data.message=='center_not_exists'){
//       alert("Center Not Exists!!");
//       return;
//     } else if(resp.data.message=='User_not_exists'){
//        alert("User Not Exists!!");
//       return;
//     } else{
//       alert("Invalid Details");
//       return;
//     }
//   };

//   const isDoctor = selectedRole === "doctor";

//   return (
//     <>
//     <Navbar/>
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-emerald-50 to-[#1E4B3C]/40 px-4">
//       <div className="w-full max-w-xl rounded-3xl bg-white shadow-2xl border border-emerald-100 overflow-hidden">
//         {/* Header */}
//         <div className="bg-gradient-to-r from-[#1E4B3C] to-[#256f5a] px-8 pt-7 pb-4 text-center text-white">
//           <h1 className="text-2xl font-extrabold tracking-wide">
//             AyurSutra Login
//           </h1>
//           <p className="mt-1 text-xs text-emerald-100">
//             Secure access for patients, centers & doctors
//           </p>
//         </div>

//         {/* Role Tabs */}
//         <div className="px-6 pt-4 bg-emerald-900/5">
//           <div className="grid grid-cols-3 rounded-full bg-emerald-50 text-xs font-semibold overflow-hidden">
//             <button
//               type="button"
//               onClick={() => handleRoleChange("patient")}
//               className={`py-2.5 flex items-center justify-center gap-1 transition-all ${
//                 selectedRole === "patient"
//                   ? "bg-[#1E4B3C] text-white shadow-md"
//                   : "text-emerald-900 hover:bg-emerald-100"
//               }`}
//             >
//               <span>Patient</span>
//             </button>
//             <button
//               type="button"
//               onClick={() => handleRoleChange("centerHead")}
//               className={`py-2.5 flex items-center justify-center gap-1 transition-all ${
//                 selectedRole === "centerHead"
//                   ? "bg-[#1E4B3C] text-white shadow-md"
//                   : "text-emerald-900 hover:bg-emerald-100"
//               }`}
//             >
//               <span>Center Head</span>
//             </button>
//             <button
//               type="button"
//               onClick={() => handleRoleChange("doctor")}
//               className={`py-2.5 flex items-center justify-center gap-1 transition-all ${
//                 selectedRole === "doctor"
//                   ? "bg-[#1E4B3C] text-white shadow-md"
//                   : "text-emerald-900 hover:bg-emerald-100"
//               }`}
//             >
//               <span>Doctor</span>
//             </button>
//           </div>
//         </div>

//         {/* Form */}
//         <form
//           onSubmit={handleFormSubmit}
//           className="px-6 pb-7 pt-4 space-y-4 bg-white"
//         >
//           {/* Email / phone */}
//           <div>
//             <label className="block text-xs font-semibold text-gray-700 mb-1">
//               Email or Phone <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               name="emailOrPhone"
//               value={formData.emailOrPhone}
//               onChange={handleInputChange}
//               required
//               placeholder={
//                 selectedRole === "patient"
//                   ? "your.email@example.com or +91 XXXXX XXXXX"
//                   : "Registered email / phone"
//               }
//               className="w-full rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 text-xs md:text-sm outline-none focus:border-[#1E4B3C] focus:bg-white focus:ring-1 focus:ring-[#1E4B3C]"
//             />
//           </div>

//           {/* Doctor institute dropdown */}
//           {isDoctor && (
//             <div>
//               <label className="block text-xs font-semibold text-gray-700 mb-1">
//                 Associated Institute <span className="text-red-500">*</span>
//               </label>
//               <div className="relative">
//                 <select
//                   name="selectedInstitute"
//                   value={formData.selectedInstitute}
//                   onChange={handleInputChange}
//                   required={isDoctor}
//                   className="w-full appearance-none rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 pr-9 text-xs md:text-sm text-gray-800 outline-none focus:border-[#1E4B3C] focus:bg-white focus:ring-1 focus:ring-[#1E4B3C]"
//                 >
//                   <option value="">Select institute</option>
//                   {associatedInstitutes.map((instituteName) => (
//                     <option key={instituteName} value={instituteName}>
//                       {instituteName}
//                     </option>
//                   ))}
//                 </select>
//                 <svg
//                   className="pointer-events-none absolute right-3 top-2.5 h-4 w-4 text-gray-500"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="1.8"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 >
//                   <path d="M6 9l6 6 6-6" />
//                 </svg>
//               </div>
//             </div>
//           )}

//           {/* Password */}
//           <div>
//             <label className="block text-xs font-semibold text-gray-700 mb-1">
//               Password <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleInputChange}
//               required
//               placeholder="Enter your password"
//               className="w-full rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 text-xs md:text-sm outline-none focus:border-[#1E4B3C] focus:bg-white focus:ring-1 focus:ring-[#1E4B3C]"
//             />
//           </div>

//           {/* Extra row: remember + forgot */}
//           <div className="flex items-center justify-between text-[11px] md:text-xs text-gray-600">
//             <label className="flex items-center gap-2">
//               <input
//                 type="checkbox"
//                 className="h-3.5 w-3.5 rounded border-gray-300 text-[#1E4B3C] focus:ring-[#1E4B3C]"
//               />
//               <span>Remember this device</span>
//             </label>
//             <button
//               type="button"
//               className="font-semibold text-[#1E4B3C] hover:underline"
//             >
//               Forgot password?
//             </button>
//           </div>

//           {/* Submit */}
//           <button
//             type="submit"
//             className="mt-1 cursor-pointer w-full rounded-full bg-[#1E4B3C] py-3 text-sm font-semibold text-white shadow-md hover:bg-emerald-800 transition-colors"
//           >
//             {isDoctor
//               ? "Login as Doctor"
//               : selectedRole === "centerHead"
//               ? "Login as Center Head"
//               : "Login"}
//           </button>

//           {/* Switch to signup */}
//           <p className="pt-2 cursor-pointer text-center text-[11px] md:text-xs text-gray-600">
//             New to AyurSutra?{" "}
//             <a
//               href="/signup"
//               className="font-semibold text-[#1E4B3C] hover:underline"
//             >
//               Create an account
//             </a>
//           </p>
//         </form>
//       </div>
//     </div>
//     <Footer/>
//     </>
//   );
// };

// export default Login;
