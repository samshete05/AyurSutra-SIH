// pages/Center/CenterProfile.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, Save, X, MapPin, Phone, Mail, Building, FileText } from "lucide-react";
import SidePanel from "../../components/CenterSidePanel";
import Logo from "../../components/SidePanelLogo";
import CenterNavbarProfile from "./CenterNavbarProfile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { Search } from "lucide-react";
import axios from 'axios'

const CenterProfile = () => {
  const navigate = useNavigate();
  const centerId = localStorage.getItem("centerId");
  const email=localStorage.getItem("email");

  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (email) {
      fetchProfile();
    }
  }, [email]);

  const fetchProfile = async () => {
    try {
      const response = await axios.post("http://localhost:3000/PanchKarmaCenter/getCenterProfile", 
        {centerId:centerId}
      );
      console.log("data is ",response);

      if (response.data.message) {
        // const data = await response.json();
        console.log("ya yaa ",response.data.center);
        setProfileData(response.data.center);
        setEditedData(response.data.center);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const handleInputChange = (field, value) => {
    setEditedData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("Adminname", editedData.Adminname);
      formData.append("CenterName", editedData.CenterName);
      formData.append("MobileNo", editedData.MobileNo);
      formData.append("location", editedData.location || "");
      formData.append("latitude", editedData.latitude || 0);
      formData.append("longitude", editedData.longitude || 0);
      formData.append("BotNumber", editedData.BotNumber || "");

      if (profileImage) {
        formData.append("profileImg", profileImage);
      }

      const response = await fetch("http://localhost:3000/PanchKarmaCenter/updateCenterProfile", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        alert("Profile updated successfully!");
        fetchProfile(); // Refresh data
        setIsEditing(false);
        setProfileImage(null);
        setImagePreview(null);
      } else {
        const error = await response.json();
        alert(error.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditedData(profileData);
    setIsEditing(false);
    setProfileImage(null);
    setImagePreview(null);
  };

  if (!profileData) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-emerald-600 border-r-transparent"></div>
          <p className="mt-4 text-slate-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white px-6 py-6 md:flex md:flex-col">
        <Logo />
        <nav className="space-y-6 text-sm">
          <SidePanel />
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex min-h-screen flex-1 flex-col">
        {/* Top bar */}
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 md:px-8">
          <div className="flex items-center gap-3">
            <button className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-xl md:hidden">
              ☰
            </button>

            <div className="relative hidden items-center md:flex">
              <span className="pointer-events-none absolute left-3 text-slate-400">
                <Search className="h-6 w-6 cursor-pointer text-gray-600" />
              </span>
              <input
                className="h-10 w-64 rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm outline-none placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-100"
                placeholder="Search..."
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
              <FontAwesomeIcon icon={faBell} className="text-xl" />
            </button>
            <CenterNavbarProfile />
          </div>
        </header>

        {/* Profile Content */}
        <main className="flex-1 px-4 py-6 md:px-8">
          <div className="mx-auto max-w-5xl">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-slate-800">Center Profile</h1>
                <p className="text-sm text-slate-500">Manage your center information and settings</p>
              </div>

              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 transition-colors shadow-sm"
                >
                  Edit Profile
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-2 rounded-xl bg-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-300 transition-colors"
                  >
                    <X className="h-4 w-4" />
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 transition-colors disabled:opacity-50 shadow-sm"
                  >
                    <Save className="h-4 w-4" />
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              )}
            </div>

            {/* Profile Card */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              {/* Profile Picture Section */}
              <div className="mb-8 flex items-start gap-6 border-b border-slate-100 pb-6">
                <div className="relative">
                  {imagePreview || profileData.profileImg ? (
                    <img
                      src={imagePreview || profileData.profileImg}
                      alt="Profile"
                      className="h-28 w-28 rounded-full object-cover border-4 border-slate-100"
                    />
                  ) : (
                    <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-4xl font-semibold text-white border-4 border-slate-100">
                      {profileData.Adminname?.charAt(0).toUpperCase() || "C"}
                    </div>
                  )}

                  {isEditing && (
                    <label className="absolute bottom-0 right-0 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg transition-colors">
                      <Camera className="h-5 w-5" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>

                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-slate-800">
                    {profileData.Adminname}
                  </h2>
                  <p className="text-base text-emerald-600 font-medium mt-1">{profileData.CenterName}</p>
                  <div className="mt-3 inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                    <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-emerald-500" />
                    Center Head
                  </div>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid gap-6 md:grid-cols-2">
                {/* Admin Name */}
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                    <Building className="h-4 w-4 text-emerald-600" />
                    Admin Name
                  </label>
                  <input
                    type="text"
                    value={editedData.Adminname || ""}
                    onChange={(e) => handleInputChange("Adminname", e.target.value)}
                    disabled={!isEditing}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-100 disabled:bg-slate-100 disabled:text-slate-600"
                  />
                </div>

                {/* Center Name */}
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                    <Building className="h-4 w-4 text-emerald-600" />
                    Center Name
                  </label>
                  <input
                    type="text"
                    value={editedData.CenterName || ""}
                    onChange={(e) => handleInputChange("CenterName", e.target.value)}
                    disabled={!isEditing}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-100 disabled:bg-slate-100 disabled:text-slate-600"
                  />
                </div>

                {/* Email (Read-only) */}
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                    <Mail className="h-4 w-4 text-emerald-600" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={profileData.email || ""}
                    disabled
                    className="w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-2.5 text-sm text-slate-500"
                  />
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                    <Phone className="h-4 w-4 text-emerald-600" />
                    Mobile Number
                  </label>
                  <input
                    type="text"
                    value={editedData.MobileNo || ""}
                    onChange={(e) => handleInputChange("MobileNo", e.target.value)}
                    disabled={!isEditing}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-100 disabled:bg-slate-100 disabled:text-slate-600"
                  />
                </div>

                {/* License Number (Read-only) */}
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                    <FileText className="h-4 w-4 text-emerald-600" />
                    License Number
                  </label>
                  <input
                    type="text"
                    value={profileData.licenseNo || ""}
                    disabled
                    className="w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-2.5 text-sm text-slate-500"
                  />
                </div>

                {/* Bot Number */}
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                    <Phone className="h-4 w-4 text-emerald-600" />
                    Bot Number
                  </label>
                  <input
                    type="text"
                    value={editedData.BotNumber || ""}
                    onChange={(e) => handleInputChange("BotNumber", e.target.value)}
                    disabled={!isEditing}
                    placeholder="Optional"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-100 disabled:bg-slate-100 disabled:text-slate-600"
                  />
                </div>

                {/* Location (Full width) */}
                <div className="md:col-span-2">
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                    <MapPin className="h-4 w-4 text-emerald-600" />
                    Location Address
                  </label>
                  <input
                    type="text"
                    value={editedData.location || ""}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    disabled={!isEditing}
                    placeholder="Enter your center's address"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-100 disabled:bg-slate-100 disabled:text-slate-600"
                  />
                </div>

                {/* Latitude */}
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                    <MapPin className="h-4 w-4 text-emerald-600" />
                    Latitude
                  </label>
                  <input
                    type="number"
                    step="0.000001"
                    value={editedData.latitude || ""}
                    onChange={(e) => handleInputChange("latitude", parseFloat(e.target.value))}
                    disabled={!isEditing}
                    placeholder="0.000000"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-100 disabled:bg-slate-100 disabled:text-slate-600"
                  />
                </div>

                {/* Longitude */}
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                    <MapPin className="h-4 w-4 text-emerald-600" />
                    Longitude
                  </label>
                  <input
                    type="number"
                    step="0.000001"
                    value={editedData.longitude || ""}
                    onChange={(e) => handleInputChange("longitude", parseFloat(e.target.value))}
                    disabled={!isEditing}
                    placeholder="0.000000"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-100 disabled:bg-slate-100 disabled:text-slate-600"
                  />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CenterProfile;
