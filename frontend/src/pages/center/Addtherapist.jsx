import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faMoon } from "@fortawesome/free-solid-svg-icons";
import { Search, UserPlus, Phone, Mail, Stethoscope } from "lucide-react";
import SidePanel from "../../components/CenterSidePanel";
import Logo from "../../components/SidePanelLogo";
import axios from "axios";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  specialization: "",
  experience: "",
  qualification: "",
  address: "",
};

const AddTherapist = () => {
  const email=localStorage.getItem("email");
  const [form, setForm] = useState(initialForm);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("Therapist Data:", form);

    const resp=await axios.post("http://localhost:3000/PanchKarmaCenter/addTherapist",{
      fullName:form.name,
      phone:form.phone,
      email:form.email,
      specialization:form.specialization,
      experience:form.experience,
      qualification:form.qualification,
      address:form.address,
      centerAdminEmail:email
    }) 
    console.log(resp);

    if(resp.data.message=='Therapist_Email_Already_Used'){
      alert("Already Present!!");
      return;
    } else{
        alert("therapist added successfully!!!");
      window.location.reload();
      return;
    }
    


    // navigate("/dashboard");
  };

  const labelCls = "mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500";
  const inputCls = "w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-100";

  return (
    <div className="flex min-h-screen bg-slate-100 text-slate-800">
      {/* Sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white px-6 py-6 md:flex md:flex-col">
        <Logo />
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
                placeholder="Search therapists, patients..."
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-slate-100">
              <FontAwesomeIcon icon={faMoon} className="text-base text-slate-600" />
            </button>
            <button className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-slate-100">
              <FontAwesomeIcon icon={faBell} className="text-base text-slate-600" />
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
              <p className="text-sm text-slate-500">Create a new therapist profile for the Panchakarma center</p>
              <h1 className="text-2xl font-semibold tracking-tight">Add Therapist Details</h1>
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
                  <label className={labelCls}>Full name *</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className={inputCls}
                    placeholder="Anjali Sharma"
                  />
                </div>
                <div>
                  <label className={labelCls}>Phone *</label>
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
                  <label className={labelCls}>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className={inputCls}
                    placeholder="therapist@center.com"
                  />
                </div>
                <div>
                  <label className={labelCls}>Specialization *</label>
                  <select
                    name="specialization"
                    value={form.specialization}
                    onChange={handleChange}
                    required
                    className={inputCls}
                  >
                    <option value="">Select specialization</option>
                    <option value="Abhyanga">Abhyanga (Oil Massage)</option>
                    <option value="Shirodhara">Shirodhara</option>
                    <option value="Basti">Basti Therapy</option>
                    <option value="Nasya">Nasya Therapy</option>
                    <option value="Panchakarma Specialist">Panchakarma Specialist</option>
                  </select>
                </div>
              </div>

              {/* Professional details */}
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className={labelCls}>Experience</label>
                   <input
                    type="experience"
                    name="experience"
                    value={form.experience}
                    onChange={handleChange}
                    className={inputCls}
                    placeholder="5 Years"
                  />
                </div>
                <div>
                  <label className={labelCls}>Qualification</label>
                  <input
                    name="qualification"
                    value={form.qualification}
                    onChange={handleChange}
                    className={inputCls}
                    placeholder="BAMS, Diploma in Panchakarma"
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <label className={labelCls}>Clinic address</label>
                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  rows={2}
                  className={`${inputCls} resize-none`}
                  placeholder="Panchakarma Center, MG Road, Kerala"
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setForm(initialForm)}
                  className="cursor-pointer rounded-full border border-slate-200 px-4 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50"
                >
                  Clear
                </button>
                <button
                  type="submit"
                  className="cursor-pointer rounded-full bg-[#1E4B3C] px-6 py-2 text-xs font-semibold text-white shadow-sm"
                >
                  <UserPlus className="h-4 w-4 inline mr-1" />
                  Add Therapist
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddTherapist;
