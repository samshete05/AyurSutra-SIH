import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faMoon } from "@fortawesome/free-solid-svg-icons";
import { Search, PlusCircle, Clock, DollarSign } from "lucide-react";
import SidePanel from "../../components/CenterSidePanel";
import Logo from "../../components/SidePanelLogo";
import axios from "axios";
import CenterNavbarProfile from "./CenterNavbarProfile";

const initialForm = {
  name: "",
  description: "",
  duration: "",
  price: "",
  maxPatients: "",
  category: "",
};

const AddTherapy = () => {
  const [form, setForm] = useState(initialForm);
  const navigate = useNavigate();
  const Adminemail=localStorage.getItem("email");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("Therapy Data:", form);
   
    const resp=await axios.post("http://localhost:3000/PanchKarmaCenter/addTherapy",{
      name:form.name,
    duration:form.duration,
    price:form.price,
    category:form.category,
    maxPatientsPerDay:form.maxPatients,
    description:form.description,
    Adminemail:Adminemail
    })
    if(resp.data.message=='therapy_added_success'){
      alert("Therapy Added Successfully!!!");
      window.location.reload()
      return;
    } else{
      alert("something went wrong!!");
    }
    
    
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
                placeholder="Search therapies, patients..."
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
            <CenterNavbarProfile/>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 bg-slate-100 px-4 py-4 md:px-8 md:py-6">
          {/* Title row */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm text-slate-500">Create a new therapy package for the Panchakarma center</p>
              <h1 className="text-2xl font-semibold tracking-tight">Add Therapy Package</h1>
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
                <div className="md:col-span-2">
                  <label className={labelCls}>Therapy name *</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className={inputCls}
                    placeholder="Abhyanga - Herbal Oil Massage"
                  />
                </div>
                <div>
                  <label className={labelCls}>Duration *</label>
                  <select name="duration" value={form.duration} onChange={handleChange} required className={inputCls}>
                    <option value="">Select duration</option>
                    <option value="30">30 minutes</option>
                    <option value="45">45 minutes</option>
                    <option value="60">60 minutes</option>
                    <option value="90">90 minutes</option>
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Price (₹) *</label>
                  <input
                    type="number"
                    min="0"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    required
                    className={inputCls}
                    placeholder="2500"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className={labelCls}>Category *</label>
                  <select name="category" value={form.category} onChange={handleChange} required className={inputCls}>
                    <option value="">Select category</option>
                    <option value="Massage">Massage Therapy</option>
                    <option value="Shodhana">Shodhana (Purification)</option>
                    <option value="Rasayana">Rasayana (Rejuvenation)</option>
                    <option value="Panchakarma">Panchakarma Package</option>
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Max patients per day</label>
                  <input
                    type="number"
                    min="1"
                    name="maxPatients"
                    value={form.maxPatients}
                    onChange={handleChange}
                    className={inputCls}
                    placeholder="10"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className={labelCls}>Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={3}
                  className={`${inputCls} resize-none`}
                  placeholder="Brief description of the therapy, benefits, and process..."
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
                  <PlusCircle className="h-4 w-4 inline mr-1" />
                  Add Therapy
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddTherapy;
