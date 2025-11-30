import React, { useState, useRef } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit2,
  Save,
  X,
  Camera,
  Shield,
  Heart,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  Droplets,
  Weight,
  Ruler,
  Activity
} from "lucide-react";

function ProfilePage() {
  const fileInputRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");
  const [profileImage, setProfileImage] = useState(null);

  // Initial patient data - fetch from backend API
  const [patientData, setPatientData] = useState({
    personal: {
      firstName: "Rajesh",
      lastName: "Kumar",
      email: "rajesh.kumar@example.com",
      phone: "+91 98765 43210",
      dateOfBirth: "1985-06-15",
      gender: "Male",
      bloodGroup: "O+",
      maritalStatus: "Married",
      occupation: "Software Engineer",
      address: "123, MG Road, Indiranagar",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560038",
      country: "India"
    },
    medical: {
      height: "175",
      weight: "72",
      bmi: "23.5",
      allergies: ["Peanuts", "Penicillin"],
      chronicConditions: ["Hypertension"],
      currentMedications: ["Amlodipine 5mg"],
      smokingStatus: "Non-smoker",
      alcoholConsumption: "Occasional",
      exerciseFrequency: "3-4 times/week",
      dietaryPreferences: "Vegetarian"
    },
    ayurveda: {
      constitution: "Pitta-Vata",
      primaryDosha: "Pitta",
      secondaryDosha: "Vata",
      prakriti: "Pitta dominant with moderate Vata",
      currentImbalance: "Mild Pitta aggravation",
      preferredTreatments: ["Abhyanga", "Shirodhara", "Panchakarma"]
    },
    emergency: {
      contactName: "Priya Kumar",
      relationship: "Spouse",
      contactPhone: "+91 98765 12345",
      contactEmail: "priya.kumar@example.com",
      alternateContactName: "Amit Kumar",
      alternateRelationship: "Brother",
      alternatePhone: "+91 98765 67890"
    },
    account: {
      patientId: "AYR2025001234",
      registrationDate: "2024-01-15",
      lastVisit: "2025-11-25",
      totalVisits: 24,
      membershipType: "Premium",
      membershipExpiry: "2026-01-15",
      preferredLanguage: "English",
      communicationPreference: "Email & SMS"
    }
  });

  const [editData, setEditData] = useState({ ...patientData });

  // Handle input changes
  const handleInputChange = (section, field, value) => {
    setEditData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  // Handle array input changes (allergies, medications)
  const handleArrayInputChange = (section, field, value) => {
    const arrayValue = value.split(',').map(item => item.trim()).filter(item => item);
    setEditData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: arrayValue
      }
    }));
  };

  // Save changes
  const handleSave = () => {
    setPatientData(editData);
    setIsEditing(false);
    // TODO: Send PUT request to backend API
    console.log("Saving data:", editData);
  };

  // Cancel editing
  const handleCancel = () => {
    setEditData({ ...patientData });
    setIsEditing(false);
  };

  // Handle profile image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        // TODO: Upload to backend
      };
      reader.readAsDataURL(file);
    }
  };

  // Calculate age from DOB
  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Cover Image */}
          <div className="h-32" style={{ backgroundImage: "url('https://cdn.pixabay.com/photo/2022/05/13/15/34/rosemary-banner-7194000_1280.jpg')" }}></div>
          
          {/* Profile Info */}
          <div className="px-6 pb-6">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-16 md:-mt-20">
              {/* Profile Picture */}
              <div className="flex flex-col md:flex-row md:items-end gap-4">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl bg-slate-200 overflow-hidden">
                    {profileImage ? (
                      <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-emerald-100">
                        <User className="w-16 h-16 text-emerald-900" />
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => fileInputRef.current.click()}
                    className="absolute bottom-0 right-0 bg-emerald-600 hover:bg-emerald-700 text-white p-2 rounded-full shadow-lg transition-colors"
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>

                {/* Name and Basic Info */}
                <div className="mt-4 md:mt-0 md:mb-4">
                  <h1 className="text-3xl font-bold text-slate-900">
                    {patientData.personal.firstName} {patientData.personal.lastName}
                  </h1>
                  <p className="text-slate-600 mt-1">Patient ID: {patientData.account.patientId}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-900 rounded-full text-xs font-medium">
                      {patientData.account.membershipType} Member
                    </span>
                    <span className="px-3 py-1 bg-blue-100 text-black rounded-full text-xs font-medium">
                      {calculateAge(patientData.personal.dateOfBirth)} years
                    </span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                      {patientData.ayurveda.constitution}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-4 md:mt-0 md:mb-4">
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition-colors shadow-lg"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit Profile
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleSave}
                      className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition-colors shadow-lg"
                    >
                      <Save className="w-4 h-4" />
                      Save Changes
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex items-center gap-2 px-6 py-3 bg-slate-600 hover:bg-slate-700 text-white rounded-xl font-medium transition-colors shadow-lg"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="bg-emerald-50 rounded-xl p-4">
                <div className="flex items-center gap-2 text-emerald-600 mb-1">
                  <Activity className="w-4 h-4" />
                  <span className="text-xs font-medium">Total Visits</span>
                </div>
                <p className="text-2xl font-bold text-slate-900">{patientData.account.totalVisits}</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-4">
                <div className="flex items-center gap-2 text-blue-600 mb-1">
                  <Calendar className="w-4 h-4" />
                  <span className="text-xs font-medium">Last Visit</span>
                </div>
                <p className="text-sm font-bold text-slate-900">{patientData.account.lastVisit}</p>
              </div>
              <div className="bg-purple-50 rounded-xl p-4">
                <div className="flex items-center gap-2 text-purple-600 mb-1">
                  <Heart className="w-4 h-4" />
                  <span className="text-xs font-medium">Blood Group</span>
                </div>
                <p className="text-2xl font-bold text-slate-900">{patientData.personal.bloodGroup}</p>
              </div>
              <div className="bg-orange-50 rounded-xl p-4">
                <div className="flex items-center gap-2 text-orange-600 mb-1">
                  <Droplets className="w-4 h-4" />
                  <span className="text-xs font-medium">Primary Dosha</span>
                </div>
                <p className="text-lg font-bold text-slate-900">{patientData.ayurveda.primaryDosha}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="border-b border-slate-200">
            <div className="flex overflow-x-auto">
              {[
                { id: "personal", label: "Personal Info", icon: User },
                { id: "medical", label: "Medical History", icon: Heart },
                { id: "ayurveda", label: "Ayurveda Profile", icon: Droplets },
                { id: "emergency", label: "Emergency Contact", icon: AlertCircle },
                { id: "account", label: "Account Details", icon: Shield }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap transition-colors border-b-2 ${
                    activeTab === tab.id
                      ? "border-emerald-600 text-emerald-600 bg-emerald-50"
                      : "border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            
            {/* Personal Info Tab */}
            {activeTab === "personal" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">First Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.personal.firstName}
                      onChange={(e) => handleInputChange("personal", "firstName", e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                    />
                  ) : (
                    <p className="px-4 py-3 bg-slate-50 rounded-xl text-slate-900">{patientData.personal.firstName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Last Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.personal.lastName}
                      onChange={(e) => handleInputChange("personal", "lastName", e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                    />
                  ) : (
                    <p className="px-4 py-3 bg-slate-50 rounded-xl text-slate-900">{patientData.personal.lastName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    <Mail className="w-4 h-4 inline mr-1" />
                    Email
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editData.personal.email}
                      onChange={(e) => handleInputChange("personal", "email", e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                    />
                  ) : (
                    <p className="px-4 py-3 bg-slate-50 rounded-xl text-slate-900">{patientData.personal.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    <Phone className="w-4 h-4 inline mr-1" />
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editData.personal.phone}
                      onChange={(e) => handleInputChange("personal", "phone", e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                    />
                  ) : (
                    <p className="px-4 py-3 bg-slate-50 rounded-xl text-slate-900">{patientData.personal.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Date of Birth</label>
                  {isEditing ? (
                    <input
                      type="date"
                      value={editData.personal.dateOfBirth}
                      onChange={(e) => handleInputChange("personal", "dateOfBirth", e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                    />
                  ) : (
                    <p className="px-4 py-3 bg-slate-50 rounded-xl text-slate-900">{patientData.personal.dateOfBirth}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Gender</label>
                  {isEditing ? (
                    <select
                      value={editData.personal.gender}
                      onChange={(e) => handleInputChange("personal", "gender", e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  ) : (
                    <p className="px-4 py-3 bg-slate-50 rounded-xl text-slate-900">{patientData.personal.gender}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Blood Group</label>
                  {isEditing ? (
                    <select
                      value={editData.personal.bloodGroup}
                      onChange={(e) => handleInputChange("personal", "bloodGroup", e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                    >
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                    </select>
                  ) : (
                    <p className="px-4 py-3 bg-slate-50 rounded-xl text-slate-900">{patientData.personal.bloodGroup}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Marital Status</label>
                  {isEditing ? (
                    <select
                      value={editData.personal.maritalStatus}
                      onChange={(e) => handleInputChange("personal", "maritalStatus", e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                    >
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                      <option value="Divorced">Divorced</option>
                      <option value="Widowed">Widowed</option>
                    </select>
                  ) : (
                    <p className="px-4 py-3 bg-slate-50 rounded-xl text-slate-900">{patientData.personal.maritalStatus}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Occupation</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.personal.occupation}
                      onChange={(e) => handleInputChange("personal", "occupation", e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                    />
                  ) : (
                    <p className="px-4 py-3 bg-slate-50 rounded-xl text-slate-900">{patientData.personal.occupation}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Address
                  </label>
                  {isEditing ? (
                    <textarea
                      value={editData.personal.address}
                      onChange={(e) => handleInputChange("personal", "address", e.target.value)}
                      rows="2"
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                    />
                  ) : (
                    <p className="px-4 py-3 bg-slate-50 rounded-xl text-slate-900">{patientData.personal.address}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">City</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.personal.city}
                      onChange={(e) => handleInputChange("personal", "city", e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                    />
                  ) : (
                    <p className="px-4 py-3 bg-slate-50 rounded-xl text-slate-900">{patientData.personal.city}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">State</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.personal.state}
                      onChange={(e) => handleInputChange("personal", "state", e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                    />
                  ) : (
                    <p className="px-4 py-3 bg-slate-50 rounded-xl text-slate-900">{patientData.personal.state}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Pincode</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.personal.pincode}
                      onChange={(e) => handleInputChange("personal", "pincode", e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                    />
                  ) : (
                    <p className="px-4 py-3 bg-slate-50 rounded-xl text-slate-900">{patientData.personal.pincode}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Country</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.personal.country}
                      onChange={(e) => handleInputChange("personal", "country", e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                    />
                  ) : (
                    <p className="px-4 py-3 bg-slate-50 rounded-xl text-slate-900">{patientData.personal.country}</p>
                  )}
                </div>
              </div>
            )}

            {/* Medical History Tab */}
            {activeTab === "medical" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      <Ruler className="w-4 h-4 inline mr-1" />
                      Height (cm)
                    </label>
                    {isEditing ? (
                      <input
                        type="number"
                        value={editData.medical.height}
                        onChange={(e) => handleInputChange("medical", "height", e.target.value)}
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                      />
                    ) : (
                      <p className="px-4 py-3 bg-slate-50 rounded-xl text-slate-900">{patientData.medical.height} cm</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      <Weight className="w-4 h-4 inline mr-1" />
                      Weight (kg)
                    </label>
                    {isEditing ? (
                      <input
                        type="number"
                        value={editData.medical.weight}
                        onChange={(e) => handleInputChange("medical", "weight", e.target.value)}
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                      />
                    ) : (
                      <p className="px-4 py-3 bg-slate-50 rounded-xl text-slate-900">{patientData.medical.weight} kg</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">BMI</label>
                    <p className="px-4 py-3 bg-emerald-50 rounded-xl text-emerald-700 font-semibold">{patientData.medical.bmi}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    <AlertCircle className="w-4 h-4 inline mr-1 text-red-600" />
                    Allergies (comma-separated)
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.medical.allergies.join(', ')}
                      onChange={(e) => handleArrayInputChange("medical", "allergies", e.target.value)}
                      placeholder="e.g., Peanuts, Penicillin"
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                    />
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {patientData.medical.allergies.map((allergy, idx) => (
                        <span key={idx} className="px-3 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium">
                          {allergy}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Chronic Conditions (comma-separated)</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.medical.chronicConditions.join(', ')}
                      onChange={(e) => handleArrayInputChange("medical", "chronicConditions", e.target.value)}
                      placeholder="e.g., Hypertension, Diabetes"
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                    />
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {patientData.medical.chronicConditions.map((condition, idx) => (
                        <span key={idx} className="px-3 py-2 bg-orange-100 text-orange-700 rounded-lg text-sm font-medium">
                          {condition}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Current Medications (comma-separated)</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.medical.currentMedications.join(', ')}
                      onChange={(e) => handleArrayInputChange("medical", "currentMedications", e.target.value)}
                      placeholder="e.g., Amlodipine 5mg, Aspirin"
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                    />
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {patientData.medical.currentMedications.map((med, idx) => (
                        <span key={idx} className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">
                          {med}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Smoking Status</label>
                    {isEditing ? (
                      <select
                        value={editData.medical.smokingStatus}
                        onChange={(e) => handleInputChange("medical", "smokingStatus", e.target.value)}
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                      >
                        <option value="Non-smoker">Non-smoker</option>
                        <option value="Former smoker">Former smoker</option>
                        <option value="Current smoker">Current smoker</option>
                      </select>
                    ) : (
                      <p className="px-4 py-3 bg-slate-50 rounded-xl text-slate-900">{patientData.medical.smokingStatus}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Alcohol Consumption</label>
                    {isEditing ? (
                      <select
                        value={editData.medical.alcoholConsumption}
                        onChange={(e) => handleInputChange("medical", "alcoholConsumption", e.target.value)}
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                      >
                        <option value="Never">Never</option>
                        <option value="Occasional">Occasional</option>
                        <option value="Regular">Regular</option>
                      </select>
                    ) : (
                      <p className="px-4 py-3 bg-slate-50 rounded-xl text-slate-900">{patientData.medical.alcoholConsumption}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Exercise Frequency</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.medical.exerciseFrequency}
                        onChange={(e) => handleInputChange("medical", "exerciseFrequency", e.target.value)}
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                      />
                    ) : (
                      <p className="px-4 py-3 bg-slate-50 rounded-xl text-slate-900">{patientData.medical.exerciseFrequency}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Dietary Preferences</label>
                    {isEditing ? (
                      <select
                        value={editData.medical.dietaryPreferences}
                        onChange={(e) => handleInputChange("medical", "dietaryPreferences", e.target.value)}
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                      >
                        <option value="Vegetarian">Vegetarian</option>
                        <option value="Non-vegetarian">Non-vegetarian</option>
                        <option value="Vegan">Vegan</option>
                        <option value="Eggetarian">Eggetarian</option>
                      </select>
                    ) : (
                      <p className="px-4 py-3 bg-slate-50 rounded-xl text-slate-900">{patientData.medical.dietaryPreferences}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Ayurveda Profile Tab */}
            {activeTab === "ayurveda" && (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200">
                  <h3 className="text-lg font-bold text-emerald-900 mb-4">Prakriti Analysis</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Constitution Type</p>
                      <p className="text-xl font-bold text-emerald-800">{patientData.ayurveda.constitution}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Primary Dosha</p>
                      <p className="text-xl font-bold text-emerald-800">{patientData.ayurveda.primaryDosha}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Prakriti Description</label>
                  {isEditing ? (
                    <textarea
                      value={editData.ayurveda.prakriti}
                      onChange={(e) => handleInputChange("ayurveda", "prakriti", e.target.value)}
                      rows="3"
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                    />
                  ) : (
                    <p className="px-4 py-3 bg-slate-50 rounded-xl text-slate-900">{patientData.ayurveda.prakriti}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    <AlertCircle className="w-4 h-4 inline mr-1 text-orange-600" />
                    Current Imbalance
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.ayurveda.currentImbalance}
                      onChange={(e) => handleInputChange("ayurveda", "currentImbalance", e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                    />
                  ) : (
                    <p className="px-4 py-3 bg-orange-50 rounded-xl text-orange-800 font-medium">{patientData.ayurveda.currentImbalance}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Preferred Treatments (comma-separated)</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.ayurveda.preferredTreatments.join(', ')}
                      onChange={(e) => handleArrayInputChange("ayurveda", "preferredTreatments", e.target.value)}
                      placeholder="e.g., Abhyanga, Shirodhara"
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                    />
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {patientData.ayurveda.preferredTreatments.map((treatment, idx) => (
                        <span key={idx} className="px-4 py-2 bg-emerald-100 text-emerald-800 rounded-lg text-sm font-medium">
                          {treatment}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Emergency Contact Tab */}
            {activeTab === "emergency" && (
              <div className="space-y-6">
                <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-red-900 mb-4 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Primary Emergency Contact
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Contact Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editData.emergency.contactName}
                          onChange={(e) => handleInputChange("emergency", "contactName", e.target.value)}
                          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                        />
                      ) : (
                        <p className="px-4 py-3 bg-white rounded-xl text-slate-900 font-medium">{patientData.emergency.contactName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Relationship</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editData.emergency.relationship}
                          onChange={(e) => handleInputChange("emergency", "relationship", e.target.value)}
                          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                        />
                      ) : (
                        <p className="px-4 py-3 bg-white rounded-xl text-slate-900">{patientData.emergency.relationship}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Contact Phone</label>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={editData.emergency.contactPhone}
                          onChange={(e) => handleInputChange("emergency", "contactPhone", e.target.value)}
                          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                        />
                      ) : (
                        <p className="px-4 py-3 bg-white rounded-xl text-slate-900 font-medium">{patientData.emergency.contactPhone}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Contact Email</label>
                      {isEditing ? (
                        <input
                          type="email"
                          value={editData.emergency.contactEmail}
                          onChange={(e) => handleInputChange("emergency", "contactEmail", e.target.value)}
                          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                        />
                      ) : (
                        <p className="px-4 py-3 bg-white rounded-xl text-slate-900">{patientData.emergency.contactEmail}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-orange-900 mb-4">Alternate Emergency Contact</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Contact Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editData.emergency.alternateContactName}
                          onChange={(e) => handleInputChange("emergency", "alternateContactName", e.target.value)}
                          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                        />
                      ) : (
                        <p className="px-4 py-3 bg-white rounded-xl text-slate-900 font-medium">{patientData.emergency.alternateContactName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Relationship</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editData.emergency.alternateRelationship}
                          onChange={(e) => handleInputChange("emergency", "alternateRelationship", e.target.value)}
                          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                        />
                      ) : (
                        <p className="px-4 py-3 bg-white rounded-xl text-slate-900">{patientData.emergency.alternateRelationship}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Contact Phone</label>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={editData.emergency.alternatePhone}
                          onChange={(e) => handleInputChange("emergency", "alternatePhone", e.target.value)}
                          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                        />
                      ) : (
                        <p className="px-4 py-3 bg-white rounded-xl text-slate-900 font-medium">{patientData.emergency.alternatePhone}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Account Details Tab */}
            {activeTab === "account" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Patient ID</label>
                    <p className="px-4 py-3 bg-slate-100 rounded-xl text-slate-900 font-mono">{patientData.account.patientId}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Registration Date</label>
                    <p className="px-4 py-3 bg-slate-50 rounded-xl text-slate-900">{patientData.account.registrationDate}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Membership Type</label>
                    <div className="px-4 py-3 bg-emerald-50 rounded-xl">
                      <span className="text-emerald-800 font-bold">{patientData.account.membershipType}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Membership Expiry</label>
                    <p className="px-4 py-3 bg-slate-50 rounded-xl text-slate-900">{patientData.account.membershipExpiry}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Preferred Language</label>
                    {isEditing ? (
                      <select
                        value={editData.account.preferredLanguage}
                        onChange={(e) => handleInputChange("account", "preferredLanguage", e.target.value)}
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                      >
                        <option value="English">English</option>
                        <option value="Hindi">Hindi</option>
                        <option value="Tamil">Tamil</option>
                        <option value="Telugu">Telugu</option>
                        <option value="Kannada">Kannada</option>
                        <option value="Malayalam">Malayalam</option>
                      </select>
                    ) : (
                      <p className="px-4 py-3 bg-slate-50 rounded-xl text-slate-900">{patientData.account.preferredLanguage}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Communication Preference</label>
                    {isEditing ? (
                      <select
                        value={editData.account.communicationPreference}
                        onChange={(e) => handleInputChange("account", "communicationPreference", e.target.value)}
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                      >
                        <option value="Email only">Email only</option>
                        <option value="SMS only">SMS only</option>
                        <option value="Email & SMS">Email & SMS</option>
                        <option value="Phone call">Phone call</option>
                      </select>
                    ) : (
                      <p className="px-4 py-3 bg-slate-50 rounded-xl text-slate-900">{patientData.account.communicationPreference}</p>
                    )}
                  </div>
                </div>

                {/* Account Stats */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
                  <h3 className="text-lg font-bold text-blue-900 mb-4">Account Statistics</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-xl p-4">
                      <p className="text-sm text-slate-600 mb-1">Total Visits</p>
                      <p className="text-2xl font-bold text-slate-900">{patientData.account.totalVisits}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4">
                      <p className="text-sm text-slate-600 mb-1">Last Visit</p>
                      <p className="text-sm font-bold text-slate-900">{patientData.account.lastVisit}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4">
                      <p className="text-sm text-slate-600 mb-1">Member Since</p>
                      <p className="text-sm font-bold text-slate-900">{patientData.account.registrationDate}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}

export default ProfilePage;
