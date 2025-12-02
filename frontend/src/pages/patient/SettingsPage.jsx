import React, { useState, useEffect } from "react";
import axios from "axios";
import useNavigate from "react-router-dom";
import {
  User,
  Shield,
  Bell,
  Palette,
  Globe,
  Lock,
  Smartphone,
  Mail,
  CreditCard,
  FileText,
  HelpCircle,
  LogOut,
  ChevronRight,
  Moon,
  Sun,
  Eye,
  EyeOff,
  Check,
  Trash2,
  Download,
  AlertCircle,
  Key,
  History,
  UserCheck,
  Languages
} from "lucide-react";

function SettingsPage() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("account");
  const [loading, setLoading] = useState(true);

  // Profile data from backend
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    mobileNo: "",
    verified: false
  });

  // Password change state
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Fetch profile on mount
  useEffect( () => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if(!token){
        navigate("/login");
        return;
      }

      const resp = await axios.get("httpp://localhost:3000/patient/getProfile", {
        headers: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true
      });

      if(resp.data.message === "Success") {
        setProfileData(resp.data.profile);
      }
      setLoading(false);
    }
    catch(err){
      console.error("Error fetching profile: ",err);
      setLoading(false);
      if(err.response?.status === 401){
        alert("Session expired. Please login again.");
        navigate("/login");
      }
    }
  }


  // const toggleSetting = (section, setting) => {
  //   if (section === "account") {
  //     setAccountSettings(prev => ({
  //       ...prev,
  //       [setting]: !prev[setting]
  //     }));
  //   } else if (section === "privacy") {
  //     setPrivacySettings(prev => ({
  //       ...prev,
  //       [setting]: !prev[setting]
  //     }));
  //   }
  //   // TODO: Send update to backend API
  // };

  const handlePasswordChange = async () => {
    if(passwordData.newPassword !== passwordData.confirmPassword){
      alert("Passwords don't match");
      return;
    }
  };

  try{
    const token = localStorage.getItem("authToken");
    const resp = await axios.post(
      "http://localhost:3000/patient/changePassword",
      passwordData,
      {
        headers: {
          Aut,horization: `Bearer ${token}`
        },
        withCredentials: true
      }
    )

    if(resp.data.message === "Password_Changed_Successfully"){
      alert("Password_Changed_Successfully!!!");
      setPasswordData({currentPassword: "", newPassword: "", confirmPassword: ""});
    }
    else if(resp.data.message === "Current_Password_Incorrect"){
      alert("Current password is incorrect!!!")
    }
    else if(resp.data.message === "Password_Mismatch") {
      alert("New Password don't Match!!!");
    }
  }
  catch(err){
    console.errror("Error changing password:", err);
    alert("Error changing password");
  }
};

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3000/patient/logout", {}, {
        withCredentials: true
      });
      localStorage.removeItem("authToken");
      navigate("/login");
    }
    catch(err){
      console.error("Logout error:", err);
      localStorage.removeItem("authToken");
      navigate("/login");
    }
  };

  const settingMenu = [
    {id: "account", label: "Account Settings", icon: User},
    {id: "security", label: "Security and Privacy", icon: Sheild},
    {id: "notifications", label: "Notifications", icon: Bell},
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "language", label: "Language & Region", icon: Globe },
    { id: "billing", label: "Billing & Subscription", icon: CreditCard },
    { id: "data", label: "Data & Privacy", icon: FileText },
    {id: "support", label: "Help and Support", icon: HelpCircle},
  ];

  if(loading){
    return(
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-emerald-600 border-t-transparent"></div>
          <p className="text-slate-500 mt-4">Loading settings...</p>
        </div>
      </div>
    )
  }

  // const handleDeleteAccount = () => {
  //   // TODO: Send account deletion request to backend
  //   console.log("Account deletion requested");
  //   setShowDeleteConfirm(false);
  // };

  // const handleExportData = () => {
  //   // TODO: Request data export from backend
  //   console.log("Data export requested");
  // };

  // const settingsMenu = [
  //   { id: "account", label: "Account Settings", icon: User },
  //   { id: "security", label: "Security & Privacy", icon: Shield },
  //   { id: "notifications", label: "Notifications", icon: Bell },
  //   { id: "appearance", label: "Appearance", icon: Palette },
  //   { id: "language", label: "Language & Region", icon: Globe },
  //   { id: "billing", label: "Billing & Subscription", icon: CreditCard },
  //   { id: "data", label: "Data & Privacy", icon: FileText },
  //   { id: "support", label: "Help & Support", icon: HelpCircle }
  // ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Settings</h1>
          <p className="text-slate-600">
            Manage your account preferences and configurations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Settings Menu Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
              {settingsMenu.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center justify-between px-5 py-4 transition-colors border-l-4 ${
                    activeSection === item.id
                      ? "bg-emerald-50 border-emerald-600 text-emerald-700"
                      : "border-transparent text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium text-sm">{item.label}</span>
                  </div>
                  <ChevronRight className={`w-4 h-4 transition-transform ${
                    activeSection === item.id ? "text-emerald-600" : "text-slate-400"
                  }`} />
                </button>
              ))}

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-5 py-4 text-red-600 hover:bg-red-50 transition-colors border-t border-slate-200"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium text-sm">Logout</span>
              </button>
            </div>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
              
              {/* Account Settings */}
              {activeSection === "account" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Account Settings</h2>
                    <p className="text-sm text-slate-600">Manage your account information and preferences</p>
                  </div>

                  {/* Profile Information */}
                  <div className="p-5 bg-slate-50 rounded-xl">
                    <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                      <User className="w-5 h-5 text-emerald-600" />
                      Profile Information
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium text-slate-900">Full Name</p>
                          <p className="text-sm text-slate-600">Rajesh Kumar</p>
                        </div>
                        <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                          Edit
                        </button>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium text-slate-900">Email Address</p>
                          <p className="text-sm text-slate-600">rajesh.kumar@example.com</p>
                        </div>
                        <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                          Edit
                        </button>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium text-slate-900">Phone Number</p>
                          <p className="text-sm text-slate-600">+91 98765 43210</p>
                        </div>
                        <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Login Activity */}
                  <div className="p-5 bg-slate-50 rounded-xl">
                    <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                      <History className="w-5 h-5 text-blue-600" />
                      Recent Login Activity
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-3 bg-white rounded-lg">
                        <Smartphone className="w-5 h-5 text-green-600 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-slate-900">Mobile App - Android</p>
                          <p className="text-xs text-slate-600">Bangalore, India • Nov 30, 2025 at 6:30 PM</p>
                        </div>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                          Current
                        </span>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-white rounded-lg">
                        <Globe className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-slate-900">Web Browser - Chrome</p>
                          <p className="text-xs text-slate-600">Bangalore, India • Nov 29, 2025 at 10:15 AM</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Account Preferences */}
                  <div className="p-5 bg-slate-50 rounded-xl">
                    <h3 className="font-semibold text-slate-900 mb-4">Account Preferences</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-slate-900">Email Notifications</p>
                          <p className="text-xs text-slate-600">Receive updates via email</p>
                        </div>
                        <button
                          onClick={() => toggleSetting("account", "emailNotifications")}
                          className={`relative w-12 h-6 rounded-full transition-colors ${
                            accountSettings.emailNotifications ? "bg-emerald-600" : "bg-slate-300"
                          }`}
                        >
                          <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                            accountSettings.emailNotifications ? "translate-x-6" : ""
                          }`} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-slate-900">SMS Notifications</p>
                          <p className="text-xs text-slate-600">Receive updates via text message</p>
                        </div>
                        <button
                          onClick={() => toggleSetting("account", "smsNotifications")}
                          className={`relative w-12 h-6 rounded-full transition-colors ${
                            accountSettings.smsNotifications ? "bg-emerald-600" : "bg-slate-300"
                          }`}
                        >
                          <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                            accountSettings.smsNotifications ? "translate-x-6" : ""
                          }`} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-slate-900">Login Alerts</p>
                          <p className="text-xs text-slate-600">Get notified of new logins</p>
                        </div>
                        <button
                          onClick={() => toggleSetting("account", "loginAlerts")}
                          className={`relative w-12 h-6 rounded-full transition-colors ${
                            accountSettings.loginAlerts ? "bg-emerald-600" : "bg-slate-300"
                          }`}
                        >
                          <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                            accountSettings.loginAlerts ? "translate-x-6" : ""
                          }`} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Security & Privacy */}
              {activeSection === "security" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Security & Privacy</h2>
                    <p className="text-sm text-slate-600">Protect your account and personal information</p>
                  </div>

                  {/* Change Password */}
                  <div className="p-5 bg-slate-50 rounded-xl">
                    <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                      <Key className="w-5 h-5 text-emerald-600" />
                      Change Password
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Current Password
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            value={passwordData.currentPassword}
                            onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all pr-12"
                          />
                          <button
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                          >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          New Password
                        </label>
                        <input
                          type={showPassword ? "text" : "password"}
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Confirm New Password
                        </label>
                        <input
                          type={showPassword ? "text" : "password"}
                          value={passwordData.confirmPassword}
                          onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                        />
                      </div>

                      <button
                        onClick={handlePasswordChange}
                        className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition-colors"
                      >
                        Update Password
                      </button>
                    </div>
                  </div>

                  {/* Two-Factor Authentication */}
                  <div className="p-5 bg-slate-50 rounded-xl">
                    <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-blue-600" />
                      Two-Factor Authentication
                    </h3>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <p className="text-sm text-slate-700 mb-2">
                          Add an extra layer of security to your account
                        </p>
                        <p className="text-xs text-slate-600">
                          When enabled, you'll need to enter a code from your phone in addition to your password
                        </p>
                      </div>
                      <button
                        onClick={() => toggleSetting("account", "twoFactorAuth")}
                        className={`relative w-12 h-6 rounded-full transition-colors flex-shrink-0 ml-4 ${
                          accountSettings.twoFactorAuth ? "bg-emerald-600" : "bg-slate-300"
                        }`}
                      >
                        <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                          accountSettings.twoFactorAuth ? "translate-x-6" : ""
                        }`} />
                      </button>
                    </div>
                    {accountSettings.twoFactorAuth && (
                      <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                        Configure 2FA
                      </button>
                    )}
                  </div>

                  {/* Privacy Settings */}
                  <div className="p-5 bg-slate-50 rounded-xl">
                    <h3 className="font-semibold text-slate-900 mb-4">Privacy Settings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-slate-900">Profile Visibility</p>
                          <p className="text-xs text-slate-600">Control who can see your profile</p>
                        </div>
                        <select
                          value={privacySettings.profileVisibility}
                          onChange={(e) => setPrivacySettings({...privacySettings, profileVisibility: e.target.value})}
                          className="px-4 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                        >
                          <option value="public">Public</option>
                          <option value="private">Private</option>
                          <option value="doctors-only">Doctors Only</option>
                        </select>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-slate-900">Show Email Address</p>
                          <p className="text-xs text-slate-600">Display email on your profile</p>
                        </div>
                        <button
                          onClick={() => toggleSetting("privacy", "showEmail")}
                          className={`relative w-12 h-6 rounded-full transition-colors ${
                            privacySettings.showEmail ? "bg-emerald-600" : "bg-slate-300"
                          }`}
                        >
                          <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                            privacySettings.showEmail ? "translate-x-6" : ""
                          }`} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-slate-900">Allow Data Analytics</p>
                          <p className="text-xs text-slate-600">Help us improve our services</p>
                        </div>
                        <button
                          onClick={() => toggleSetting("privacy", "allowDataAnalytics")}
                          className={`relative w-12 h-6 rounded-full transition-colors ${
                            privacySettings.allowDataAnalytics ? "bg-emerald-600" : "bg-slate-300"
                          }`}
                        >
                          <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                            privacySettings.allowDataAnalytics ? "translate-x-6" : ""
                          }`} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications */}
              {activeSection === "notifications" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Notification Preferences</h2>
                    <p className="text-sm text-slate-600">Customize how you receive notifications</p>
                  </div>

                  <div className="p-5 bg-blue-50 rounded-xl border border-blue-200">
                    <div className="flex items-start gap-3">
                      <Bell className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-blue-900 mb-1">
                          Manage Detailed Notification Settings
                        </p>
                        <p className="text-xs text-blue-800 mb-3">
                          Configure notification channels and preferences for different types of alerts
                        </p>
                        <button className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                          Go to Notifications Page
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Appearance */}
              {activeSection === "appearance" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Appearance</h2>
                    <p className="text-sm text-slate-600">Customize the look and feel of your dashboard</p>
                  </div>

                  {/* Theme Selection */}
                  <div className="p-5 bg-slate-50 rounded-xl">
                    <h3 className="font-semibold text-slate-900 mb-4">Theme</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <button
                        onClick={() => setDarkMode(false)}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          !darkMode
                            ? "border-emerald-600 bg-emerald-50"
                            : "border-slate-200 bg-white hover:border-slate-300"
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <Sun className="w-6 h-6 text-amber-500" />
                          <span className="font-semibold text-slate-900">Light Mode</span>
                          {!darkMode && <Check className="w-5 h-5 text-emerald-600 ml-auto" />}
                        </div>
                        <p className="text-xs text-slate-600 text-left">
                          Bright and clean interface for daytime use
                        </p>
                      </button>

                      <button
                        onClick={() => setDarkMode(true)}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          darkMode
                            ? "border-emerald-600 bg-emerald-50"
                            : "border-slate-200 bg-white hover:border-slate-300"
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <Moon className="w-6 h-6 text-indigo-500" />
                          <span className="font-semibold text-slate-900">Dark Mode</span>
                          {darkMode && <Check className="w-5 h-5 text-emerald-600 ml-auto" />}
                        </div>
                        <p className="text-xs text-slate-600 text-left">
                          Easy on the eyes for low-light conditions
                        </p>
                      </button>
                    </div>
                  </div>

                  {/* Font Size */}
                  <div className="p-5 bg-slate-50 rounded-xl">
                    <h3 className="font-semibold text-slate-900 mb-4">Text Size</h3>
                    <div className="space-y-3">
                      <input
                        type="range"
                        min="80"
                        max="120"
                        defaultValue="100"
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-slate-600">
                        <span>Small</span>
                        <span>Default</span>
                        <span>Large</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Language & Region */}
              {activeSection === "language" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Language & Region</h2>
                    <p className="text-sm text-slate-600">Set your preferred language and regional settings</p>
                  </div>

                  <div className="p-5 bg-slate-50 rounded-xl">
                    <h3 className="font-semibold text-slate-900 mb-4">Display Language</h3>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                    >
                      <option value="english">English</option>
                      <option value="hindi">हिंदी (Hindi)</option>
                      <option value="tamil">தமிழ் (Tamil)</option>
                      <option value="telugu">తెలుగు (Telugu)</option>
                      <option value="kannada">ಕನ್ನಡ (Kannada)</option>
                      <option value="malayalam">മലയാളം (Malayalam)</option>
                      <option value="bengali">বাংলা (Bengali)</option>
                      <option value="marathi">मराठी (Marathi)</option>
                    </select>
                  </div>

                  <div className="p-5 bg-slate-50 rounded-xl">
                    <h3 className="font-semibold text-slate-900 mb-4">Time Zone</h3>
                    <select
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                    >
                      <option value="ist">(GMT+5:30) India Standard Time - Mumbai, Delhi</option>
                      <option value="pst">(GMT-8:00) Pacific Standard Time - Los Angeles</option>
                      <option value="est">(GMT-5:00) Eastern Standard Time - New York</option>
                      <option value="gmt">(GMT+0:00) Greenwich Mean Time - London</option>
                    </select>
                  </div>

                  <div className="p-5 bg-slate-50 rounded-xl">
                    <h3 className="font-semibold text-slate-900 mb-4">Date Format</h3>
                    <div className="space-y-2">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="radio" name="dateFormat" defaultChecked className="w-4 h-4 text-emerald-600" />
                        <span className="text-sm text-slate-700">DD/MM/YYYY (30/11/2025)</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="radio" name="dateFormat" className="w-4 h-4 text-emerald-600" />
                        <span className="text-sm text-slate-700">MM/DD/YYYY (11/30/2025)</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="radio" name="dateFormat" className="w-4 h-4 text-emerald-600" />
                        <span className="text-sm text-slate-700">YYYY-MM-DD (2025-11-30)</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Billing & Subscription */}
              {activeSection === "billing" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Billing & Subscription</h2>
                    <p className="text-sm text-slate-600">Manage your membership and payment methods</p>
                  </div>

                  {/* Current Plan */}
                  <div className="p-5 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border-2 border-emerald-200">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-emerald-900 text-lg mb-1">Premium Membership</h3>
                        <p className="text-sm text-emerald-700">Active until January 15, 2026</p>
                      </div>
                      <span className="px-3 py-1 bg-emerald-600 text-white text-xs font-semibold rounded-full">
                        ACTIVE
                      </span>
                    </div>
                    <div className="flex gap-3">
                      <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-colors">
                        Upgrade Plan
                      </button>
                      <button className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-lg text-sm font-medium transition-colors">
                        View Benefits
                      </button>
                    </div>
                  </div>

                  {/* Payment Methods */}
                  <div className="p-5 bg-slate-50 rounded-xl">
                    <h3 className="font-semibold text-slate-900 mb-4">Payment Methods</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-slate-200">
                        <div className="flex items-center gap-3">
                          <CreditCard className="w-5 h-5 text-blue-600" />
                          <div>
                            <p className="text-sm font-medium text-slate-900">•••• •••• •••• 4242</p>
                            <p className="text-xs text-slate-600">Expires 12/2027</p>
                          </div>
                        </div>
                        <button className="text-sm text-red-600 hover:text-red-700 font-medium">
                          Remove
                        </button>
                      </div>
                    </div>
                    <button className="mt-4 text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                      + Add Payment Method
                    </button>
                  </div>

                  {/* Billing History */}
                  <div className="p-5 bg-slate-50 rounded-xl">
                    <h3 className="font-semibold text-slate-900 mb-4">Billing History</h3>
                    <div className="space-y-2">
                      {[
                        { date: "Nov 01, 2025", amount: "₹2,999", status: "Paid" },
                        { date: "Oct 01, 2025", amount: "₹2,999", status: "Paid" },
                        { date: "Sep 01, 2025", amount: "₹2,999", status: "Paid" }
                      ].map((invoice, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-white rounded-lg">
                          <div>
                            <p className="text-sm font-medium text-slate-900">{invoice.date}</p>
                            <p className="text-xs text-slate-600">{invoice.amount}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                              {invoice.status}
                            </span>
                            <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                              Download
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Data & Privacy */}
              {activeSection === "data" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Data & Privacy</h2>
                    <p className="text-sm text-slate-600">Control your data and privacy settings</p>
                  </div>

                  {/* Export Data */}
                  <div className="p-5 bg-slate-50 rounded-xl">
                    <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                      <Download className="w-5 h-5 text-blue-600" />
                      Export Your Data
                    </h3>
                    <p className="text-sm text-slate-600 mb-4">
                      Download a copy of your personal information, appointments, and treatment records
                    </p>
                    <button
                      onClick={handleExportData}
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors"
                    >
                      Request Data Export
                    </button>
                  </div>

                  {/* Delete Account */}
                  <div className="p-5 bg-red-50 rounded-xl border border-red-200">
                    <h3 className="font-semibold text-red-900 mb-4 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5" />
                      Delete Account
                    </h3>
                    <p className="text-sm text-red-800 mb-4">
                      Permanently delete your account and all associated data. This action cannot be undone.
                    </p>
                    {!showDeleteConfirm ? (
                      <button
                        onClick={() => setShowDeleteConfirm(true)}
                        className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition-colors"
                      >
                        Delete My Account
                      </button>
                    ) : (
                      <div className="space-y-3">
                        <p className="text-sm font-semibold text-red-900">
                          Are you absolutely sure? This cannot be undone.
                        </p>
                        <div className="flex gap-3">
                          <button
                            onClick={handleDeleteAccount}
                            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition-colors"
                          >
                            Yes, Delete Forever
                          </button>
                          <button
                            onClick={() => setShowDeleteConfirm(false)}
                            className="px-6 py-3 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-xl font-medium transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Help & Support */}
              {activeSection === "support" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Help & Support</h2>
                    <p className="text-sm text-slate-600">Get assistance and learn more about AyurSutra</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button className="p-5 bg-slate-50 hover:bg-slate-100 rounded-xl text-left transition-colors">
                      <HelpCircle className="w-8 h-8 text-emerald-600 mb-3" />
                      <h3 className="font-semibold text-slate-900 mb-1">Help Center</h3>
                      <p className="text-sm text-slate-600">Browse articles and FAQs</p>
                    </button>

                    <button className="p-5 bg-slate-50 hover:bg-slate-100 rounded-xl text-left transition-colors">
                      <Mail className="w-8 h-8 text-blue-600 mb-3" />
                      <h3 className="font-semibold text-slate-900 mb-1">Contact Support</h3>
                      <p className="text-sm text-slate-600">Get help from our team</p>
                    </button>

                    <button className="p-5 bg-slate-50 hover:bg-slate-100 rounded-xl text-left transition-colors">
                      <FileText className="w-8 h-8 text-purple-600 mb-3" />
                      <h3 className="font-semibold text-slate-900 mb-1">Terms of Service</h3>
                      <p className="text-sm text-slate-600">Read our terms and policies</p>
                    </button>

                    <button className="p-5 bg-slate-50 hover:bg-slate-100 rounded-xl text-left transition-colors">
                      <Shield className="w-8 h-8 text-orange-600 mb-3" />
                      <h3 className="font-semibold text-slate-900 mb-1">Privacy Policy</h3>
                      <p className="text-sm text-slate-600">Learn how we protect your data</p>
                    </button>
                  </div>

                  <div className="p-5 bg-emerald-50 rounded-xl border border-emerald-200">
                    <p className="text-sm text-emerald-900 font-medium mb-2">App Version</p>
                    <p className="text-xs text-emerald-700">AyurSutra v2.5.1 (Build 12045)</p>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
