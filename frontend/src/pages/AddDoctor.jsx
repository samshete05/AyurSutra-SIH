import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faMoon } from "@fortawesome/free-solid-svg-icons";
import { Search } from "lucide-react";
import SidePanel from "../components/CenterSidePanel";
import Logo from "../components/SidePanelLogo";

const initialForm = {
  fullName: "",
  email: "",
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
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New doctor profile:", { ...form, gender, status });
    setForm(initialForm);
    setGender("Male");
    setStatus("Active");
    navigate("/doctors"); // or /dashboard
  };

  const labelCls =
    "mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500";
  const inputCls =
    "w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-100";

  return (
    <div className="flex min-h-screen bg-slate-100 text-slate-800">
      {/* Sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white px-6 py-6 md:flex md:flex-col">
        <Logo/>
        <SidePanel />
      </aside>

      {/* Right side */}
      <div className="flex min-h-screen flex-1 flex-col">
        {/* Top bar */}
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
                className="h-10 w-64 rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm outline-none placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-100"
                placeholder="Search doctors, patients..."
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-slate-100">
              <FontAwesomeIcon
                icon={faMoon}
                className="text-base text-slate-600"
              />
            </button>
            <button className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-slate-100">
              <FontAwesomeIcon
                icon={faBell}
                className="text-base text-slate-600"
              />
            </button>
            <div className="flex items-center gap-2 rounded-full bg-slate-100 px-2 py-1">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-sm font-semibold text-white">
                A
              </div>
              <div className="hidden text-left text-xs md:block">
                <div className="font-semibold">Ayur Admin</div>
                <div className="text-[11px] text-slate-500">Center Admin ▾</div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 bg-slate-100 px-4 py-4 md:px-8 md:py-6">
          {/* Title row */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm text-slate-500">
                Create a new doctor profile for the Panchakarma center
              </p>
              <h1 className="text-2xl font-semibold tracking-tight">
                Enter Doctor Credential
              </h1>
            </div>
            <button
              onClick={() => navigate(-1)}
              className="cursor-pointer rounded-full border border-slate-200 px-4 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50"
            >
              ← Back
            </button>
          </div>

          {/* Form card */}
          <div className="rounded-2xl bg-white p-6 shadow-sm shadow-slate-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic info */}
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className={labelCls}>Full name</label>
                  <input
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    required
                    className={inputCls}
                    placeholder="Dr. Arjun Sharma"
                  />
                </div>
                <div>
                  <label className={labelCls}>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className={inputCls}
                    placeholder="doctor@center.com"
                  />
                </div>
                <div>
                  <label className={labelCls}>Phone</label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    className={inputCls}
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div>
                  <label className={labelCls}>Speciality</label>
                  <select
                    name="speciality"
                    value={form.speciality}
                    onChange={handleChange}
                    required
                    className={inputCls}
                  >
                    <option value="">Select speciality</option>
                    <option value="Panchakarma Specialist">
                      Panchakarma Specialist
                    </option>
                    <option value="Ayurveda Physician">
                      Ayurveda Physician
                    </option>
                    <option value="Detox Expert">Detox Expert</option>
                    <option value="Rehabilitation">Rehabilitation</option>
                  </select>
                </div>
              </div>

              {/* Professional details */}
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <label className={labelCls}>Experience (years)</label>
                  <input
                    type="number"
                    min="0"
                    name="experience"
                    value={form.experience}
                    onChange={handleChange}
                    className={inputCls}
                    placeholder="5"
                  />
                </div>
                <div>
                  <label className={labelCls}>Consultation fee (₹)</label>
                  <input
                    type="number"
                    min="0"
                    name="fee"
                    value={form.fee}
                    onChange={handleChange}
                    className={inputCls}
                    placeholder="1000"
                  />
                </div>
                <div>
                  <label className={labelCls}>Gender</label>
                  <div className="flex gap-3 rounded-xl border border-slate-200 bg-slate-50 px-2 py-1 text-xs">
                    {["Male", "Female", "Other"].map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setGender(g)}
                        className={`flex-1 cursor-pointer rounded-full px-2 py-1 font-medium ${
                          gender === g
                            ? "bg-emerald-500 text-white"
                            : "text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className={labelCls}>Degree</label>
                  <input
                    name="degree"
                    value={form.degree}
                    onChange={handleChange}
                    className={inputCls}
                    placeholder="BAMS, MD (Ayurveda)"
                  />
                </div>
                <div>
                  <label className={labelCls}>Registration / License No.</label>
                  <input
                    name="registrationNo"
                    value={form.registrationNo}
                    onChange={handleChange}
                    className={inputCls}
                    placeholder="AYR/REG/12345"
                  />
                </div>
              </div>

              {/* Address & status */}
              <div className="grid gap-4 md:grid-cols-[2fr_1fr]">
                <div>
                  <label className={labelCls}>Clinic / Center address</label>
                  <textarea
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    rows={2}
                    className={`${inputCls} resize-none`}
                    placeholder="Panchakarma Center, MG Road, Pune, Maharashtra"
                  />
                </div>
                <div>
                  <label className={labelCls}>Status</label>
                  <div className="flex gap-3 rounded-xl border border-slate-200 bg-slate-50 px-2 py-1 text-xs">
                    {["Active", "Inactive"].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setStatus(s)}
                        className={`flex-1 cursor-pointer rounded-full px-2 py-1 font-medium ${
                          status === s
                            ? s === "Active"
                              ? "bg-emerald-500 text-white"
                              : "bg-rose-500 text-white"
                            : "text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className={labelCls}>Short bio</label>
                <textarea
                  name="bio"
                  value={form.bio}
                  onChange={handleChange}
                  rows={3}
                  className={`${inputCls} resize-none`}
                  placeholder="Describe the doctor's Panchakarma expertise, approach, and specialties..."
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setForm(initialForm);
                    setGender("Male");
                    setStatus("Active");
                  }}
                  className="cursor-pointer rounded-full border border-slate-200 px-4 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50"
                >
                  Clear
                </button>
                <button
                  type="submit"
                  className="cursor-pointer rounded-full bg-emerald-500 px-6 py-2 text-xs font-semibold text-white shadow-sm hover:bg-emerald-600"
                >
                  Create Doctor Profile
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
