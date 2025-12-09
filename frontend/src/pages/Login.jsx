import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState("patient");
  const [centerList, setCenterList] = useState([]);

  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
    selectedInstitute: "",
    centerId: "", // <-- Added
  });

  // ================================
  // FETCH ALL CENTERS ON PAGE LOAD
  // ================================
  useEffect(() => {
    fetchCenters();
  }, []);

  const fetchCenters = async () => {
    try {
      const resp = await axios.get(
        "http://localhost:3000/PanchKarmaCenter/allcenterList"
      );

      console.log("CENTER DATA:", resp.data);

      if (resp.data.success) {
        setCenterList(resp.data.centers);
      }
    } catch (err) {
      console.error("Error fetching centers:", err);
    }
  };

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    setFormData((prev) => ({
      ...prev,
      selectedInstitute: "",
      centerId: "",
    }));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((previousFormData) => ({
      ...previousFormData,
      [name]: value,
    }));
  };

  // ================================
  // LOGIN SUBMIT HANDLER
  // ================================
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log("Selected Data:", formData);
    console.log("Selected Role:", selectedRole);

    let url = "http://localhost:3000/patient/login";
    if (selectedRole === "doctor") url = "http://localhost:3000/doctor/login";

    const resp = await axios.post(
      url,
      {
        email: formData.emailOrPhone,
        password: formData.password,
        role: selectedRole,
        institute: formData.selectedInstitute,
        centerId: formData.centerId, // <-- Send centerId to backend
      },
      { withCredentials: true }
    );

    localStorage.setItem("profileImg", resp.data.profileimg);

    if (resp.data.message === "logedin") {
      localStorage.setItem("authToken", resp.data.token);
      localStorage.setItem("email", formData.emailOrPhone);
      localStorage.setItem("role", selectedRole);

      if (selectedRole === "centerHead")
        localStorage.setItem("centerId", resp.data.centerId);

      navigate("/");
    } else if (resp.data.message === "center_not_exists") {
      alert("Center Not Exists!!");
    } else if (resp.data.message === "User_not_exists") {
      alert("User Not Exists!!");
    } else {
      alert("Doctor Not exists");
    }
  };

  const isDoctor = selectedRole === "doctor";

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex items-center justify-center bg-[#F4F6F0] px-4">
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl shadow-lg overflow-hidden">
          
          {/* IMAGE / BRANDING */}
          <div
            className="hidden md:flex relative flex-col justify-center px-12 text-white"
            style={{
              backgroundImage:
                "url('https://cdn.dribbble.com/userupload/22224091/file/original-c8ecf8d1de681520cfc56fadeb2a7b6f.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black/45"></div>

            <div className="relative z-10">
              <div className="w-14 h-14 mb-6 rounded-full border border-white/40 flex items-center justify-center text-2xl font-medium">
                ॐ
              </div>

              <h1 className="text-3xl font-semibold">AyurSutra</h1>

              <p className="mt-3 text-sm text-white/85">
                Secure access for patients, centers, and doctors across India.
              </p>

              <div className="w-12 h-[2px] bg-white/40 my-6"></div>

              <p className="text-sm text-white/75">
                Login to manage Ayurvedic care with industry-grade security.
              </p>
            </div>
          </div>

          {/* LOGIN FORM */}
          <div className="flex flex-col justify-center px-8 py-10 md:px-12">
            <h2 className="text-2xl font-semibold text-[#1E4B3C]">Welcome back</h2>
            <p className="mt-1 text-sm text-gray-600">
              Login using your AyurSutra account
            </p>

            {/* ROLE TABS */}
            <div className="mt-6">
              <div className="grid grid-cols-3 rounded-lg border border-gray-200 overflow-hidden">
                {["patient", "centerHead", "doctor"].map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => handleRoleChange(role)}
                    className={`py-2 text-sm font-medium transition ${
                      selectedRole === role
                        ? "bg-[#1E4B3C] text-white"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {role === "patient"
                      ? "Patient"
                      : role === "centerHead"
                      ? "Center Head"
                      : "Doctor"}
                  </button>
                ))}
              </div>
            </div>

            {/* FORM */}
            <form onSubmit={handleFormSubmit} className="mt-8 space-y-5">

              {/* EMAIL / PHONE */}
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
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5"
                />
              </div>

              {/* DOCTOR INSTITUTE DROPDOWN */}
              {isDoctor && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Your Institute
                  </label>

                  <select
                    value={formData.selectedInstitute}
                    onChange={(e) => {
                      const selectedName = e.target.value;
                      const selectedCenter = centerList.find(
                        (c) => c.CenterName === selectedName
                      );

                      setFormData((prev) => ({
                        ...prev,
                        selectedInstitute: selectedName,
                        centerId: selectedCenter?._id || "", // <-- STORE ID HERE
                      }));
                    }}
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5"
                  >
                    <option value="">Select Institute</option>

                    {centerList.map((center) => (
                      <option key={center._id} value={center.CenterName}>
                        {center.CenterName}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* PASSWORD */}
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
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5"
                />
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                className="w-full bg-[#1E4B3C] text-white py-2.5 rounded-lg hover:bg-[#173B30]"
              >
                {selectedRole === "doctor"
                  ? "Login as Doctor"
                  : selectedRole === "centerHead"
                  ? "Login as Center Head"
                  : "Login"}
              </button>

              <p className="text-center text-xs text-gray-500 mt-4">
                Don't have an account?{" "}
                <a href="/signup" className="text-[#1E4B3C] hover:underline">
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
