// pages/Center/CenterProfile.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, Save, X, MapPin, Phone, Mail, Building, FileText, Clock } from "lucide-react";
import SidePanel from "../../components/CenterSidePanel";
import Logo from "../../components/SidePanelLogo";
import CenterNavbarProfile from "./CenterNavbarProfile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { Search } from "lucide-react";
import axios from 'axios'
import Loader from "../../components/Loader";

const CenterProfile = () => {
  const navigate = useNavigate();
  const centerId = localStorage.getItem("centerId");
  const email = localStorage.getItem("email");

  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [centerImages, setCenterImages] = useState([]);
  const [newCenterImages, setNewCenterImages] = useState([]);

  useEffect(() => {
    if (email) {
      fetchProfile();
    }
  }, [email]);

  const fetchProfile = async () => {
    try {
      const response = await axios.post("http://localhost:3000/PanchKarmaCenter/getCenterProfile", 
        { centerId }
      );
      
      console.log("Profile data:", response.data.center);
      
      const centerData = response.data.center;
      setProfileData(centerData);
      setEditedData(centerData);
      setCenterImages(centerData.centerImages || []);
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

  const handleCenterImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setNewCenterImages(files);
    
    const previews = files.map(file => URL.createObjectURL(file));
    setCenterImages(prev => [...prev.filter(img => !img.startsWith('blob:')), ...previews]);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("centerId", centerId);
      
      // All schema fields (excluding lat/lng)
      formData.append("Adminname", editedData.Adminname || "");
      formData.append("CenterName", editedData.CenterName || "");
      formData.append("MobileNo", editedData.MobileNo || "");
      formData.append("mainAddress", editedData.mainAddress || "");
      formData.append("city", editedData.city || "");
      formData.append("locationUrl", editedData.locationUrl || "");
      formData.append("BotNumber", editedData.BotNumber || "");
      formData.append("morningOpenTime", editedData.morningOpenTime || "");
      formData.append("morningCloseTime", editedData.morningCloseTime || "");
      formData.append("eveningOpenTime", editedData.eveningOpenTime || "");
      formData.append("eveningCloseTime", editedData.eveningCloseTime || "");
      formData.append("onTime", editedData.onTime || "");
      formData.append("closeTime", editedData.closeTime || "");

      if (profileImage) {
        formData.append("profileImg", profileImage);
      }

      newCenterImages.forEach((file) => {
        formData.append("centerImages", file);
      });

      const response = await fetch("http://localhost:3000/PanchKarmaCenter/updateCenterProfile", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        alert("Profile updated successfully!");
        fetchProfile();
        setIsEditing(false);
        setProfileImage(null);
        setImagePreview(null);
        setNewCenterImages([]);
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
    setCenterImages(profileData?.centerImages || []);
    setNewCenterImages([]);
    setIsEditing(false);
    setProfileImage(null);
    setImagePreview(null);
  };

  if (!profileData) {
    return (
      <Loader />
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

                {/* Main Address (Full width) */}
                <div className="md:col-span-2">
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                    <MapPin className="h-4 w-4 text-emerald-600" />
                    Main Address
                  </label>
                  <input
                    type="text"
                    value={editedData.mainAddress || ""}
                    onChange={(e) => handleInputChange("mainAddress", e.target.value)}
                    disabled={!isEditing}
                    placeholder="Enter full street address"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-100 disabled:bg-slate-100 disabled:text-slate-600"
                  />
                </div>

                {/* City */}
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                    <MapPin className="h-4 w-4 text-emerald-600" />
                    City
                  </label>
                  <input
                    type="text"
                    value={editedData.city || ""}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    disabled={!isEditing}
                    placeholder="Enter city name"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-100 disabled:bg-slate-100 disabled:text-slate-600"
                  />
                </div>

                {/* Google Maps Link */}
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                    <MapPin className="h-4 w-4 text-emerald-600" />
                    Google Maps Link
                  </label>
                  <input
                    type="url"
                    value={editedData.locationUrl || ""}
                    onChange={(e) => handleInputChange("locationUrl", e.target.value)}
                    disabled={!isEditing}
                    placeholder="https://maps.google.com/..."
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-100 disabled:bg-slate-100 disabled:text-slate-600"
                  />
                </div>
              </div>

              {/* Working Hours Section */}
              <div className="mt-8 md:col-span-2">
                <label className="mb-6 flex items-center gap-2 text-sm font-medium text-slate-700 block">
                  <Clock className="h-5 w-5 text-emerald-600" />
                  Slot/Appointment Booking Time 
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-50 p-6 rounded-2xl">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-slate-700">Morning Open</label>
                    <input
                      type="time"
                      value={editedData.morningOpenTime || "09:00"}
                      onChange={(e) => handleInputChange("morningOpenTime", e.target.value)}
                      disabled={!isEditing}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm focus:border-emerald-400 focus:ring-1 focus:ring-emerald-100 disabled:bg-slate-100"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-slate-700">Morning Close</label>
                    <input
                      type="time"
                      value={editedData.morningCloseTime || "13:00"}
                      onChange={(e) => handleInputChange("morningCloseTime", e.target.value)}
                      disabled={!isEditing}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm focus:border-emerald-400 focus:ring-1 focus:ring-emerald-100 disabled:bg-slate-100"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-slate-700">Evening Open</label>
                    <input
                      type="time"
                      value={editedData.eveningOpenTime || "16:00"}
                      onChange={(e) => handleInputChange("eveningOpenTime", e.target.value)}
                      disabled={!isEditing}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm focus:border-emerald-400 focus:ring-1 focus:ring-emerald-100 disabled:bg-slate-100"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-slate-700">Evening Close</label>
                    <input
                      type="time"
                      value={editedData.eveningCloseTime || "20:00"}
                      onChange={(e) => handleInputChange("eveningCloseTime", e.target.value)}
                      disabled={!isEditing}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm focus:border-emerald-400 focus:ring-1 focus:ring-emerald-100 disabled:bg-slate-100"
                    />
                  </div>
                </div>
              </div>

              {/* Total  Hours Section */}
              <div className="mt-8 md:col-span-2">
                <label className="mb-6 flex items-center gap-2 text-sm font-medium text-slate-700 block">
                  <Clock className="h-5 w-5 text-emerald-600" />
                  Working Hours
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-50 p-6 rounded-2xl">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-slate-700">Morning Open</label>
                    <input
                      type="time"
                      value={editedData.morningOpenTime || "09:00"}
                      onChange={(e) => handleInputChange("onTime", e.target.value)}
                      disabled={!isEditing}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm focus:border-emerald-400 focus:ring-1 focus:ring-emerald-100 disabled:bg-slate-100"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-slate-700">Evening Close</label>
                    <input
                      type="time"
                      value={editedData.eveningCloseTime || "20:00"}
                      onChange={(e) => handleInputChange("closeTime", e.target.value)}
                      disabled={!isEditing}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm focus:border-emerald-400 focus:ring-1 focus:ring-emerald-100 disabled:bg-slate-100"
                    />
                  </div>
                </div>
              </div>

              {/* Center Images Section */}
              <div className="mt-8 md:col-span-2">
                <label className="mb-4 flex items-center gap-2 text-sm font-medium text-slate-700 block">
                  <Camera className="h-5 w-5 text-emerald-600" />
                  Center Images (Max 5)
                </label>
                
                {isEditing ? (
                  <div>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleCenterImagesChange}
                      className="w-full rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 px-8 py-8 text-sm file:mr-4 file:py-3 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                    />
                    <p className="mt-2 text-xs text-slate-500">Upload up to 5 images (Max 5MB each)</p>
                    
                    {newCenterImages.length > 0 && (
                      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
                        {newCenterImages.map((file, idx) => (
                          <img
                            key={idx}
                            src={URL.createObjectURL(file)}
                            alt={`Preview ${idx + 1}`}
                            className="h-20 w-20 rounded-xl object-cover border"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {centerImages?.length > 0 ? (
                      centerImages.map((img, idx) => (
                        <img
                          key={idx}
                          src={img}
                          alt={`Center ${idx + 1}`}
                          className="h-24 w-24 rounded-xl object-cover border"
                        />
                      ))
                    ) : (
                      <p className="col-span-full py-8 text-center text-slate-500 border-2 border-dashed border-slate-200 rounded-xl">
                        No center images uploaded
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Google Maps Display */}
              {profileData.locationUrl && !isEditing && (
                <div className="mt-8 md:col-span-2">
                  <label className="mb-4 flex items-center gap-2 text-sm font-medium text-slate-700 block">
                    <MapPin className="h-4 w-4 text-emerald-600" />
                    Location on Map
                  </label>
                  <iframe
                    src={profileData.locationUrl}
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-2xl w-full"
                  />
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CenterProfile;
