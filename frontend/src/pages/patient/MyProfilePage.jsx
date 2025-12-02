import React, { useState, useEffect, useRef } from "react";
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
import Loader from "../../components/Loader";

function ProfilePage() {
  const fileInputRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Real patient data from backend
  const [patientData, setPatientData] = useState(null);
  const [editData, setEditData] = useState(null);

  // Fetch profile on mount
  useEffect(() => {
    fetchProfile();
  }, []);

    const fetchProfile = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      window.location.href = '/login';
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/patient/getProfile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (response.ok && data.message === 'Success') {
        // Transform backend data to match UI structure
        const transformedData = {
          personal: {
            firstName: data.profile.name?.split(' ')[0] || '',
            lastName: data.profile.name?.split(' ').slice(1).join(' ') || '',
            email: data.profile.email || '',
            phone: data.profile.mobileNo || '',
            dateOfBirth: data.profile.dateOfBirth || '',
            gender: data.profile.gender || '',
            bloodGroup: data.profile.bloodGroup || '',
            maritalStatus: data.profile.maritalStatus || '',
            occupation: data.profile.occupation || '',
            address: data.profile.address || '',
            city: data.profile.city || '',
            state: data.profile.state || '',
            pincode: data.profile.pincode || '',
            country: data.profile.country || 'India'
          },
          medical: {
            height: data.profile.height || '',
            weight: data.profile.weight || '',
            bmi: data.profile.bmi || '',
            allergies: data.profile.allergies || [],
            chronicConditions: data.profile.chronicConditions || [],
            currentMedications: data.profile.currentMedications || [],
            smokingStatus: data.profile.smokingStatus || 'Non-smoker',
            alcoholConsumption: data.profile.alcoholConsumption || 'Never',
            exerciseFrequency: data.profile.exerciseFrequency || '',
            dietaryPreferences: data.profile.dietaryPreferences || 'Vegetarian'
          },
          ayurveda: {
            constitution: data.profile.constitution || '',
            primaryDosha: data.profile.primaryDosha || '',
            secondaryDosha: data.profile.secondaryDosha || '',
            prakriti: data.profile.prakriti || '',
            currentImbalance: data.profile.currentImbalance || '',
            preferredTreatments: data.profile.preferredTreatments || []
          },
          emergency: {
            contactName: data.profile.emergencyContact?.contactName || '',
            relationship: data.profile.emergencyContact?.relationship || '',
            contactPhone: data.profile.emergencyContact?.contactPhone || '',
            contactEmail: data.profile.emergencyContact?.contactEmail || '',
            alternateContactName: data.profile.emergencyContact?.alternateContactName || '',
            alternateRelationship: data.profile.emergencyContact?.alternateRelationship || '',
            alternatePhone: data.profile.emergencyContact?.alternatePhone || ''
          },
          account: {
            patientId: data.profile.email?.split('@')[0].toUpperCase() || 'N/A',
            registrationDate: '2024-01-15',
            lastVisit: 'N/A',
            totalVisits: 0,
            membershipType: 'Free',
            membershipExpiry: 'N/A',
            preferredLanguage: data.profile.settings?.language || 'english',
            communicationPreference: 'Email & SMS'
          }
        };

        setPatientData(transformedData);
        setEditData(transformedData);
        setProfileImage(data.profile.profileImg);
      } else if (response.status === 401) {
        localStorage.removeItem('authToken');
        window.location.href = '/login';
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

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

  // Handle array input changes (allergies, medications, treatments)
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

    // Save changes to backend
  const handleSave = async () => {
    setSaving(true);
    const token = localStorage.getItem('authToken');

    try {
      const updatePayload = {
        // Basic Info
        name: `${editData.personal.firstName} ${editData.personal.lastName}`.trim(),
        mobileNo: editData.personal.phone,
        profileImg: profileImage,

        // Personal Info
        dateOfBirth: editData.personal.dateOfBirth,
        gender: editData.personal.gender,
        bloodGroup: editData.personal.bloodGroup,
        maritalStatus: editData.personal.maritalStatus,
        occupation: editData.personal.occupation,
        address: editData.personal.address,
        city: editData.personal.city,
        state: editData.personal.state,
        pincode: editData.personal.pincode,
        country: editData.personal.country,

        // Medical History
        height: editData.medical.height,
        weight: editData.medical.weight,
        bmi: editData.medical.bmi,
        allergies: editData.medical.allergies,
        chronicConditions: editData.medical.chronicConditions,
        currentMedications: editData.medical.currentMedications,
        smokingStatus: editData.medical.smokingStatus,
        alcoholConsumption: editData.medical.alcoholConsumption,
        exerciseFrequency: editData.medical.exerciseFrequency,
        dietaryPreferences: editData.medical.dietaryPreferences,

        // Ayurveda Profile
        constitution: editData.ayurveda.constitution,
        primaryDosha: editData.ayurveda.primaryDosha,
        secondaryDosha: editData.ayurveda.secondaryDosha,
        prakriti: editData.ayurveda.prakriti,
        currentImbalance: editData.ayurveda.currentImbalance,
        preferredTreatments: editData.ayurveda.preferredTreatments,

        // Emergency Contact
        emergencyContact: {
          contactName: editData.emergency.contactName,
          relationship: editData.emergency.relationship,
          contactPhone: editData.emergency.contactPhone,
          contactEmail: editData.emergency.contactEmail,
          alternateContactName: editData.emergency.alternateContactName,
          alternateRelationship: editData.emergency.alternateRelationship,
          alternatePhone: editData.emergency.alternatePhone
        }
      };

      const response = await fetch('http://localhost:3000/patient/updateProfile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatePayload)
      });

      const data = await response.json();

      if (response.ok && data.message === 'Profile_Updated') {
        setPatientData(editData);
        setIsEditing(false);
        alert('Profile updated successfully!');
        // Refresh to update TopBar
        window.location.reload();
      } else {
        alert('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  // Cancel editing
  const handleCancel = () => {
    setEditData({ ...patientData });
    setIsEditing(false);
  };

  // Compress image before upload
  const compressImage = (file, maxWidth = 800, quality = 0.7) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          // Resize if needed
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          // Convert to base64 with compression
          const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
          resolve(compressedBase64);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  };


  // Handle profile image upload
    // Handle profile image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert('Image size should be less than 2MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = async () => {
        const newImage = reader.result;
        setProfileImage(newImage);
        setUploadingImage(true);
        
        // Auto-save profile image
        const token = localStorage.getItem('authToken');
        try {

          const compressedImage = await compressImage(file, 800, 0.7);
          setProfileImage(compressedImage);
          const response = await fetch('http://localhost:3000/patient/updateProfile', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ profileImg: newImage })
          });

          const data = await response.json();
          if (response.ok && data.message === 'Profile_Updated') {
            alert('Profile picture updated successfully!');
            window.location.reload(); // Refresh to update TopBar
          } else {
            alert('Failed to update profile picture');
          }
        } catch (error) {
          console.error('Error updating profile picture:', error);
          alert('Network error. Please try again.');
        }
      };
      reader.readAsDataURL(file);
    }
  };


  // Calculate age from DOB
  const calculateAge = (dob) => {
    if (!dob) return 'N/A';
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  if (loading) {
    return (
      <Loader />
    );
  }

  if (!patientData) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 px-4">
      <div className="relative bg-white/70 backdrop-blur-xl shadow-2xl rounded-2xl p-10 max-w-md w-full text-center border border-white/40 animate-fadeIn">
        
        {/* Decorative glow */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-red-100 shadow-lg flex items-center justify-center">
          <AlertCircle className="w-7 h-7 text-red-500" />
        </div>

        <h2 className="mt-6 text-2xl font-semibold text-slate-900">
          Unable to Load Profile
        </h2>

        <p className="mt-2 text-slate-600 leading-relaxed">
          Something went wrong while fetching your data.
          Please check your connection and try again.
        </p>

        <button
          onClick={() => window.location.reload()}
          className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-medium tracking-wide shadow-lg hover:shadow-xl transition-all duration-300 hover:brightness-110 active:scale-95"
        >
          Retry
        </button>

        {/* Subtle bottom note */}
        <p className="mt-3 text-xs text-slate-500">
          If the issue continues, please contact support.
        </p>
      </div>
    </div>
  );
}


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Cover Image */}
          <div className="h-32 bg-cover bg-center" style={{ backgroundImage: "url('https://cdn.pixabay.com/photo/2022/05/13/15/34/rosemary-banner-7194000_1280.jpg')" }}></div>

          
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
                  {isEditing && (
                    <button
                      onClick={() => fileInputRef.current.click()}
                      className="absolute bottom-0 right-0 bg-emerald-600 hover:bg-emerald-700 text-white p-2 rounded-full shadow-lg transition-colors"
                    >
                      <Camera className="w-4 h-4" />
                    </button>
                  )}
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
                    {patientData.personal.dateOfBirth && (
                      <span className="px-3 py-1 bg-blue-100 text-blue-900 rounded-full text-xs font-medium">
                        {calculateAge(patientData.personal.dateOfBirth)} years
                      </span>
                    )}
                    {patientData.ayurveda.constitution && (
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                        {patientData.ayurveda.constitution}
                      </span>
                    )}
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
                      disabled={saving}
                      className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-slate-400 text-white rounded-xl font-medium transition-colors shadow-lg"
                    >
                      <Save className="w-4 h-4" />
                      {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button
                      onClick={handleCancel}
                      disabled={saving}
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
                <p className="text-2xl font-bold text-slate-900">{patientData.personal.bloodGroup || 'N/A'}</p>
              </div>
              <div className="bg-orange-50 rounded-xl p-4">
                <div className="flex items-center gap-2 text-orange-600 mb-1">
                  <Droplets className="w-4 h-4" />
                  <span className="text-xs font-medium">Primary Dosha</span>
                </div>
                <p className="text-lg font-bold text-slate-900">{patientData.ayurveda.primaryDosha || 'N/A'}</p>
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
                    <p className="px-4 py-3 bg-slate-50 rounded-xl text-slate-900">{patientData.personal.dateOfBirth || 'Not set'}</p>
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
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  ) : (
                    <p className="px-4 py-3 bg-slate-50 rounded-xl text-slate-900">{patientData.personal.gender || 'Not set'}</p>
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
                      <option value="">Select Blood Group</option>
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
                    <p className="px-4 py-3 bg-slate-50 rounded-xl text-slate-900">{patientData.personal.bloodGroup || 'Not set'}</p>
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
                      <option value="">Select Status</option>
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                      <option value="Divorced">Divorced</option>
                      <option value="Widowed">Widowed</option>
                    </select>
                  ) : (
                    <p className="px-4 py-3 bg-slate-50 rounded-xl text-slate-900">{patientData.personal.maritalStatus || 'Not set'}</p>
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
                    <p className="px-4 py-3 bg-slate-50 rounded-xl text-slate-900">{patientData.personal.occupation || 'Not set'}</p>
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
                    <p className="px-4 py-3 bg-slate-50 rounded-xl text-slate-900">{patientData.personal.address || 'Not set'}</p>
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
                    <p className="px-4 py-3 bg-slate-50 rounded-xl text-slate-900">{patientData.personal.city || 'Not set'}</p>
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
                    <p className="px-4 py-3 bg-slate-50 rounded-xl text-slate-900">{patientData.personal.state || 'Not set'}</p>
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
                    <p className="px-4 py-3 bg-slate-50 rounded-xl text-slate-900">{patientData.personal.pincode || 'Not set'}</p>
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
                      <p className="px-4 py-3 bg-slate-50 rounded-xl text-slate-900">{patientData.medical.height || 'Not set'} {patientData.medical.height && 'cm'}</p>
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
                      <p className="px-4 py-3 bg-slate-50 rounded-xl text-slate-900">{patientData.medical.weight || 'Not set'} {patientData.medical.weight && 'kg'}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">BMI</label>
                    <p className="px-4 py-3 bg-emerald-50 rounded-xl text-emerald-700 font-semibold">{patientData.medical.bmi || 'N/A'}</p>
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
                      {patientData.medical.allergies.length > 0 ? (
                        patientData.medical.allergies.map((allergy, idx) => (
                          <span key={idx} className="px-3 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium">
                            {allergy}
                          </span>
                        ))
                      ) : (
                        <p className="px-4 py-3 bg-slate-50 rounded-xl text-slate-900">No allergies recorded</p>
                      )}
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
                      {patientData.medical.chronicConditions.length > 0 ? (
                        patientData.medical.chronicConditions.map((condition, idx) => (
                          <span key={idx} className="px-3 py-2 bg-orange-100 text-orange-700 rounded-lg text-sm font-medium">
                            {condition}
                          </span>
                        ))
                      ) : (
                        <p className="px-4 py-3 bg-slate-50 rounded-xl text-slate-900">No chronic conditions recorded</p>
                      )}
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
                      {patientData.medical.currentMedications.length > 0 ? (
                        patientData.medical.currentMedications.map((med, idx) => (
                          <span key={idx} className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">
                            {med}
                          </span>
                        ))
                      ) : (
                        <p className="px-4 py-3 bg-slate-50 rounded-xl text-slate-900">No current medications</p>
                      )}
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
                        placeholder="e.g., 3-4 times/week"
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                      />
                    ) : (
                      <p className="px-4 py-3 bg-slate-50 rounded-xl text-slate-900">{patientData.medical.exerciseFrequency || 'Not set'}</p>
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
                      <p className="text-xl font-bold text-emerald-800">{patientData.ayurveda.constitution || 'Not assessed'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Primary Dosha</p>
                      <p className="text-xl font-bold text-emerald-800">{patientData.ayurveda.primaryDosha || 'Not assessed'}</p>
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
                    <p className="px-4 py-3 bg-slate-50 rounded-xl text-slate-900">{patientData.ayurveda.prakriti || 'Not set'}</p>
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
                    <p className="px-4 py-3 bg-orange-50 rounded-xl text-orange-800 font-medium">{patientData.ayurveda.currentImbalance || 'No imbalance detected'}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Preferred Treatments (comma-separated)</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.ayurveda.preferredTreatments.join(', ')}
                      onChange={(e) => handleArrayInputChange("ayurveda", "preferredTreatments", e.target.value)}
                      placeholder="e.g., Abhyanga, Shirodhara, Panchakarma"
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                    />
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {patientData.ayurveda.preferredTreatments.length > 0 ? (
                        patientData.ayurveda.preferredTreatments.map((treatment, idx) => (
                          <span key={idx} className="px-4 py-2 bg-emerald-100 text-emerald-800 rounded-lg text-sm font-medium">
                            {treatment}
                          </span>
                        ))
                      ) : (
                        <p className="px-4 py-3 bg-slate-50 rounded-xl text-slate-900">No preferred treatments set</p>
                      )}
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
                        <p className="px-4 py-3 bg-white rounded-xl text-slate-900 font-medium">{patientData.emergency.contactName || 'Not set'}</p>
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
                        <p className="px-4 py-3 bg-white rounded-xl text-slate-900">{patientData.emergency.relationship || 'Not set'}</p>
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
                        <p className="px-4 py-3 bg-white rounded-xl text-slate-900 font-medium">{patientData.emergency.contactPhone || 'Not set'}</p>
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
                        <p className="px-4 py-3 bg-white rounded-xl text-slate-900">{patientData.emergency.contactEmail || 'Not set'}</p>
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
                        <p className="px-4 py-3 bg-white rounded-xl text-slate-900 font-medium">{patientData.emergency.alternateContactName || 'Not set'}</p>
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
                        <p className="px-4 py-3 bg-white rounded-xl text-slate-900">{patientData.emergency.alternateRelationship || 'Not set'}</p>
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
                        <p className="px-4 py-3 bg-white rounded-xl text-slate-900 font-medium">{patientData.emergency.alternatePhone || 'Not set'}</p>
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
                        <option value="english">English</option>
                        <option value="hindi">Hindi</option>
                        <option value="tamil">Tamil</option>
                        <option value="telugu">Telugu</option>
                        <option value="kannada">Kannada</option>
                        <option value="malayalam">Malayalam</option>
                      </select>
                    ) : (
                      <p className="px-4 py-3 bg-slate-50 rounded-xl text-slate-900 capitalize">{patientData.account.preferredLanguage}</p>
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
