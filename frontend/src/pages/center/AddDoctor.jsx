import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faMoon } from "@fortawesome/free-solid-svg-icons";
import { Search } from "lucide-react";
import SidePanel from "../../components/CenterSidePanel";
import Logo from "../../components/SidePanelLogo";
import axios from "axios";
import CenterNavbarProfile from "./CenterNavbarProfile";
import CenterNavbar from "./CenterNavbar";

const initialForm = {
  fullName: "",
  email: "",
  password:"",
  phone: "",
  speciality: "",
  experience: "",
  fee: "",
  degree: "",
  registrationNo: "",
  bio: "",
  address: "",
};

const AddDoctorPage = () => {
  const [form, setForm] = useState(initialForm);
  const [gender, setGender] = useState("Male");
  const [status, setStatus] = useState("Active");

  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);   // 🔥 ADDED

  const navigate = useNavigate();
  const Adminemail = localStorage.getItem("email");

  // Handle input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const f = e.target.files[0];
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);  // 🔥 START LOADER

    const fd = new FormData();

    fd.append("Adminemail", Adminemail);
    fd.append("name", form.fullName);
    fd.append("email", form.email);
    fd.append("password", form.password);
    fd.append("phone", form.phone);
    fd.append("speciality", form.speciality);
    fd.append("experience", form.experience);
    fd.append("consultationFee", form.fee);
    fd.append("degree", form.degree);
    fd.append("licenseNo", form.registrationNo);
    fd.append("address", form.address);
    fd.append("bio", form.bio);
    fd.append("gender", gender);
    fd.append("status", status);

    if (file) fd.append("profileImage", file);

    try {
      const resp = await axios.post(
        "http://localhost:3000/PanchKarmaCenter/addDoctor",
        fd,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (resp.data.message === "doctor_added_success") {
        alert("Doctor Added Successfully and Login Credential is send to doctor!");
        window.location.reload();
      } else if (resp.data.message === "Dr_Email_Present_use_different_one!!") {
        alert("Doctor Already Exists!");
      } else {
        alert("Something went wrong!");
      }
    } catch (error) {
      console.error(error);
      alert("Server Error!");
    }

    setLoading(false); // 🔥 STOP LOADER
  };

  const labelCls =
    "mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500";
  const inputCls =
    "w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-100";

  return (
    <div className="flex min-h-screen bg-slate-100 text-slate-800">
      
      {/* Sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white px-6 py-6 md:flex md:flex-col">
        <Logo />
        <SidePanel />
      </aside>

      {/* Main Content */}
      <div className="flex min-h-screen flex-1 flex-col">
        
        {/* Top Navbar */}
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 md:px-8">
          <div className="flex items-center gap-3">
            <button className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-xl md:hidden">
              ☰
            </button>

            <div className="relative hidden items-center md:flex">
              <span className="pointer-events-none absolute left-3 text-slate-400">
                <Search className="h-5 w-5 text-gray-500" />
              </span>

              <input
                className="h-10 w-64 rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm placeholder:text-slate-400"
                placeholder="Search doctors, patients..."
              />
            </div>
          </div>

        <CenterNavbar/>
        </header>

        {/* Page Body */}
        <main className="flex-1 bg-slate-100 px-4 py-4 md:px-8 md:py-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Create a new doctor profile for the Panchakarma center
              </p>
              <h1 className="text-2xl font-semibold">Enter Doctor Credentials</h1>
            </div>

            <button
              onClick={() => navigate(-1)}
              className="rounded-full border border-slate-200 px-4 py-1.5 text-xs hover:bg-slate-50"
            >
              ← Back
            </button>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* IMAGE UPLOAD UI */}
              <div>
                <label className={labelCls}>Profile Image</label>

                <div
                  className="flex items-center gap-6 rounded-xl border border-slate-200 bg-slate-50 p-4 cursor-pointer hover:bg-slate-100 transition"
                  onClick={() => document.getElementById("docUpload").click()}
                >
                  <div className="h-24 w-24 rounded-full overflow-hidden border bg-white shadow-sm flex items-center justify-center">
                    {preview ? (
                      <img src={preview} className="h-full w-full object-cover" />
                    ) : (
                      <span className="text-xs text-slate-400">No Image</span>
                    )}
                  </div>

                  <div>
                    <p className="text-sm font-medium text-slate-700">Upload Image</p>
                    <p className="text-xs text-slate-500 mb-2">PNG / JPG up to 5MB</p>

                    <button
                      type="button"
                      className="rounded-full bg-emerald-500 px-4 py-1.5 text-xs text-white hover:bg-emerald-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        document.getElementById("docUpload").click();
                      }}
                    >
                      Choose File
                    </button>
                  </div>
                </div>

                <input
                  id="docUpload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>

              {/* BASIC INFO */}
              <div className="grid gap-4 md:grid-cols-2">

                <div>
                  <label className={labelCls}>Doctor Full Name</label>
                  <input
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    className={inputCls}
                    required
                  />
                </div>

                <div>
                  <label className={labelCls}>Doctor Email</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className={inputCls}
                    required
                  />
                </div>

                <div>
                  <label className={labelCls}>Set Password for Doctor</label>
                  <input
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    className={inputCls}
                    required
                  />
                </div>

                <div>
                  <label className={labelCls}>Dr.Phone</label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className={inputCls}
                    required
                  />
                </div>

                <div>
                  <label className={labelCls}>Speciality</label>
                  <select
                    name="speciality"
                    value={form.speciality}
                    onChange={handleChange}
                    className={inputCls}
                    required
                  >
                    <option value="">Select specialty</option>
                    <option value="Panchakarma Specialist">Panchakarma Specialist</option>
                    <option value="Ayurveda Physician">Ayurveda Physician</option>
                    <option value="Detox Expert">Detox Expert</option>
                    <option value="Rehabilitation">Rehabilitation</option>
                  </select>
                </div>
              </div>

              {/* PROFESSIONAL INFO */}
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <label className={labelCls}>Experience (years)</label>
                  <input
                    type="number"
                    name="experience"
                    value={form.experience}
                    onChange={handleChange}
                    className={inputCls}
                  />
                </div>

                <div>
                  <label className={labelCls}>Consultation Fee (₹)</label>
                  <input
                    type="number"
                    name="fee"
                    value={form.fee}
                    onChange={handleChange}
                    className={inputCls}
                  />
                </div>

                <div>
                  <label className={labelCls}>Gender</label>
                  <div className="flex gap-3 rounded-xl border bg-slate-50 px-2 py-1">
                    {["Male", "Female", "Other"].map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setGender(g)}
                        className={`flex-1 rounded-full px-2 py-1 text-xs ${
                          gender === g
                            ? "bg-emerald-500 text-white"
                            : "text-slate-700"
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* DEGREE + LICENSE */}
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className={labelCls}>Degree</label>
                  <input
                    name="degree"
                    value={form.degree}
                    onChange={handleChange}
                    className={inputCls}
                  />
                </div>

                <div>
                  <label className={labelCls}>Registration No.</label>
                  <input
                    name="registrationNo"
                    value={form.registrationNo}
                    onChange={handleChange}
                    className={inputCls}
                  />
                </div>
              </div>

              {/* ADDRESS + STATUS */}
              <div className="grid gap-4 md:grid-cols-[2fr_1fr]">
                <div>
                  <label className={labelCls}>Address</label>
                  <textarea
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    rows={2}
                    className={`${inputCls} resize-none`}
                  />
                </div>

                <div>
                  <label className={labelCls}>Status</label>
                  <div className="flex gap-3 rounded-xl border bg-slate-50 px-2 py-1">
                    {["Active", "Inactive"].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setStatus(s)}
                        className={`flex-1 rounded-full px-2 py-1 text-xs ${
                          status === s
                            ? s === "Active"
                              ? "bg-emerald-500 text-white"
                              : "bg-rose-500 text-white"
                            : "text-slate-700"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* BIO */}
              <div>
                <label className={labelCls}>Short Bio</label>
                <textarea
                  name="bio"
                  value={form.bio}
                  onChange={handleChange}
                  rows={3}
                  className={`${inputCls} resize-none`}
                />
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex justify-end gap-3">

                <button
                  type="submit"
                  className="rounded-full cursor-pointer bg-emerald-500 px-6 py-3 text-xs font-semibold text-white hover:bg-emerald-600 flex items-center gap-2"
                >
                  {loading && (
                    <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  )}

                  {loading ? "Creating Doctor..." : "Create Doctor Profile"}
                </button>

              </div>
            </form>

          </div>
        </main>
      </div>

    </div>
  );
};

export default AddDoctorPage;
