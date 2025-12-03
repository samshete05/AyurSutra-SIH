import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { faBell, faMoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Search, UserPlus } from "lucide-react";
import SidePanel from "../../components/CenterSidePanel";
import Logo from "../../components/SidePanelLogo";
import axios from "axios";
import CenterNavbarProfile from "./CenterNavbarProfile";
import CenterNavbar from "./CenterNavbar";

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
  const email = localStorage.getItem("email");
  const [form, setForm] = useState(initialForm);

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // IMAGE SELECT
  const handleImageChange = (e) => {
    const f = e.target.files[0];
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("fullName", form.name);
    fd.append("phone", form.phone);
    fd.append("email", form.email);
    fd.append("specialization", form.specialization);
    fd.append("experience", form.experience);
    fd.append("qualification", form.qualification);
    fd.append("address", form.address);
    fd.append("centerAdminEmail", email);

    if (file) fd.append("therapistImage", file);

    const resp = await axios.post(
      "http://localhost:3000/PanchKarmaCenter/addTherapist",
      fd,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    if (resp.data.message === "Therapist_Email_Already_Used") {
      alert("Therapist already exists!");
      return;
    }

    alert("Therapist added successfully!");
    window.location.reload();
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
                placeholder="Search therapists..."
              />
            </div>
          </div>

           <CenterNavbar/>
        </header>

        {/* Content */}
        <main className="flex-1 bg-slate-100 px-4 py-4 md:px-8 md:py-6">
          {/* Title */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm text-slate-500">
                Create a new therapist profile
              </p>
              <h1 className="text-2xl font-semibold">Add Therapist Details</h1>
            </div>

            <button
              onClick={() => navigate(-1)}
              className="cursor-pointer rounded-full border border-slate-200 px-4 py-1.5 text-xs hover:bg-slate-50"
            >
              ← Back
            </button>
          </div>

          {/* Form Box */}
          <div className="rounded-2xl bg-white p-6 shadow-sm shadow-slate-100">

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* IMAGE UPLOAD (Same style as other pages) */}
              <div>
                <label className={labelCls}>Profile Image</label>

                <div
                  className="flex items-center gap-6 rounded-xl border border-slate-200 bg-slate-50 p-4 cursor-pointer hover:bg-slate-100"
                  onClick={() => document.getElementById("therapistUpload").click()}
                >
                  <div className="h-24 w-24 rounded-full overflow-hidden border bg-white shadow-sm flex items-center justify-center">
                    {preview ? (
                      <img src={preview} className="h-full w-full object-cover" />
                    ) : (
                      <span className="text-xs text-slate-400">No Image</span>
                    )}
                  </div>

                  <div>
                    <p className="text-sm font-medium text-slate-700">Upload Photo</p>
                    <p className="text-xs text-slate-500 mb-2">
                      JPG / PNG up to 5MB
                    </p>

                    <button
                      type="button"
                      className="rounded-full bg-emerald-500 px-4 py-1.5 text-xs text-white hover:bg-emerald-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        document.getElementById("therapistUpload").click();
                      }}
                    >
                      Choose File
                    </button>
                  </div>
                </div>

                <input
                  id="therapistUpload"
                    name="therapistImage" 
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>

              {/* BASIC INFO */}
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className={labelCls}>Full Name *</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className={inputCls}
                    required
                  />
                </div>

                <div>
                  <label className={labelCls}>Phone *</label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className={inputCls}
                    required
                  />
                </div>

                <div>
                  <label className={labelCls}>Email</label>
                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className={inputCls}
                  />
                </div>

                <div>
                  <label className={labelCls}>Specialization *</label>
                  <select
                    name="specialization"
                    value={form.specialization}
                    onChange={handleChange}
                    className={inputCls}
                    required
                  >
                    <option value="">Select specialization</option>
                    <option value="Abhyanga">Abhyanga</option>
                    <option value="Shirodhara">Shirodhara</option>
                    <option value="Basti">Basti</option>
                    <option value="Nasya">Nasya</option>
                    <option value="Panchakarma Specialist">
                      Panchakarma Specialist
                    </option>
                  </select>
                </div>
              </div>

              {/* PROFESSIONAL INFO */}
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className={labelCls}>Experience</label>
                  <input
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

              {/* ADDRESS */}
              <div>
                <label className={labelCls}>Clinic Address</label>
                <textarea
                  name="address"
                  rows={2}
                  value={form.address}
                  onChange={handleChange}
                  className={`${inputCls} resize-none`}
                />
              </div>

              {/* BUTTONS */}
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setForm(initialForm);
                    setPreview(null);
                    setFile(null);
                  }}
                  className="rounded-full border px-4 py-1.5 text-xs text-slate-600 hover:bg-slate-50"
                >
                  Clear
                </button>

                <button
                  type="submit"
                  className="rounded-full bg-[#1E4B3C] px-6 py-2 text-xs font-semibold text-white shadow-sm"
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
