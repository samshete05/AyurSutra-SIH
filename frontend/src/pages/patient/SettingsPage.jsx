import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
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

/**
 * SettingsPage
 * - Now accepts parent props: darkMode, setDarkMode, textSize, setTextSize
 * - Keeps original UI/content structure intact
 * - Syncs settings with parent when appearance changes
 * - Uses axios status checks (axios doesn't expose response.ok)
 */
function SettingsPage({ darkMode, setDarkMode, textSize, setTextSize }) {
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

  // Settings data from backend (initialize from parent props if provided)
  const [settings, setSettings] = useState({
    darkMode: typeof darkMode === "boolean" ? darkMode : false,
    language: "english",
    textSize: typeof textSize === "number" ? textSize : 100,
    timezone: "ist",
    dateFormat: "DD/MM/YYYY"
  });

  // Password change state
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [showPassword, setShowPassword] = useState(false);

  // Helper: axios success checker (since user asked for response.ok like checks)
  const isSuccess = (resp) => resp && resp.status >= 200 && resp.status < 300;

  // Fetch profile and settings on mount
  useEffect(() => {
    fetchProfile();
    fetchSettings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync with parent props when they change
  useEffect(() => {
    setSettings(prev => ({
      ...prev,
      darkMode: typeof darkMode === "boolean" ? darkMode : prev.darkMode,
      textSize: typeof textSize === "number" ? textSize : prev.textSize
    }));
  }, [darkMode, textSize]);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        navigate("/login");
        return;
      }

      const resp = await axios.get("http://localhost:3000/patient/getProfile", {
        headers: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true
      });

      if (isSuccess(resp) && resp.data?.message === "Success") {
        setProfileData(resp.data.profile || {});
      } else {
        // handle unexpected status/message
        console.warn("fetchProfile: unexpected response", resp?.data);
      }
      setLoading(false);
    }
    catch (err) {
      console.error("Error fetching profile:", err);
      setLoading(false);
      if (err.response?.status === 401) {
        alert("Session expired. Please login again.");
        navigate("/login");
      }
    }
  };

  const fetchSettings = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      const resp = await axios.get("http://localhost:3000/patient/getSettings", {
        headers: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true
      });

      if (isSuccess(resp) && resp.data?.message === "Success") {
        const remoteSettings = resp.data.settings || {};
        // Merge remote settings into current, prefer remote when present
        const merged = { ...settings, ...remoteSettings };
        setSettings(merged);
        applySettings(merged);
      } else {
        console.warn("fetchSettings: unexpected response", resp?.data);
      }
    }
    catch (err) {
      console.error("Error fetching settigns:", err);
    }
  };

  const applySettings = (settingsData) => {
    // Dark Mode
    if (settingsData.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Text - Sizing
    if (settingsData.textSize) {
      document.documentElement.style.fontSize = `${settingsData.textSize}%`;
    }
  };

  /**
   * updateAppearance
   * - Sends update to backend
   * - On success updates local settings, applies them, and updates parent via setDarkMode/setTextSize
   */
  const updateAppearance = async (updates) => {
    try {
      const token = localStorage.getItem("authToken");
      const resp = await axios.put(
        "http://localhost:3000/patient/updateAppearance",
        updates,
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
          withCredentials: true
        }
      );

      if (isSuccess(resp) && resp.data?.message === 'Appearance_Updated') {
        const newSettings = { ...settings, ...updates };
        setSettings(newSettings);
        applySettings(newSettings);

        // Sync with parent state if setters provided
        if (updates.darkMode !== undefined && typeof setDarkMode === "function") {
          setDarkMode(updates.darkMode);
        }
        if (updates.textSize !== undefined && typeof setTextSize === "function") {
          setTextSize(updates.textSize);
        }
      } else {
        // Backend didn't return expected message
        console.warn("updateAppearance: unexpected response", resp?.data);
        alert("Error updating appearance settings");
      }
    }
    catch (err) {
      console.error("Error updating appearance:", err);
      alert("Error updating appearance settings");
    }
  };

  const updateLanguageSettings = async (updates) => {
    try {
      const token = localStorage.getItem("authToken");
      const resp = await axios.put(
        "http://localhost:3000/patient/updateLanguage",
        updates,
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
          withCredentials: true
        }
      );

      if (isSuccess(resp) && resp.data?.message === "Language_Settings_Updated") {
        setSettings(prev => ({ ...prev, ...updates }));
        // no parent sync needed for language/timezone/dateFormat in current request
        alert("Language settings updated successfully!!!");
      } else {
        console.warn("updateLanguageSettings: unexpected response", resp?.data);
        alert("Error updating settings!!!");
      }
    }
    catch (err) {
      console.error("Error updating language settings:", err);
      alert("Error updating settings!!!");
    }
  };

  const handleDarkModeToggle = () => {
    updateAppearance({ darkMode: !settings.darkMode });
  };

  const handleTextSizeChange = (e) => {
    const newSize = parseInt(e.target.value, 10);
    if (!Number.isNaN(newSize)) updateAppearance({ textSize: newSize });
  };

  const handleLanguageChange = (e) => {
    updateLanguageSettings({ language: e.target.value });
  };

  const handleTimezoneChange = (e) => {
    updateLanguageSettings({
      language: settings.language,
      timezone: e.target.value
    });
  };

  const handleDateFormatChange = (format) => {
    updateLanguageSettings({
      language: settings.language,
      dateFormat: format
    });
  };

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      const resp = await axios.post(
        "http://localhost:3000/patient/changePassword",
        passwordData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
          withCredentials: true
        }
      );

      if (isSuccess(resp) && resp.data?.message === "Password_Changed_Successfully") {
        alert("Password changed successfully!");
        setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      }
      else if (isSuccess(resp) && resp.data?.message === "Current_Password_Incorrect") {
        alert("Current password is incorrect!");
      }
      else if (isSuccess(resp) && resp.data?.message === "Password_Mismatch") {
        alert("New passwords don't match!");
      } else {
        // If status was success but different message or non-2xx
        console.warn("handlePasswordChange: unexpected response", resp?.data);
        alert("Error changing password");
      }
    }
    catch (err) {
      console.error("Error changing password:", err); 
      alert("Error changing password");
    }
  };

  const handleLogout = async () => {
    try {
      const resp = await axios.post("http://localhost:3000/patient/logout", {}, {
        withCredentials: true
      });

      // Regardless of backend, clear token and navigate to login.
      // But if backend fails with auth, we still clear locally.
      if (!isSuccess(resp)) {
        console.warn("Logout returned non-2xx status", resp?.status);
      }

      localStorage.removeItem("authToken");
      navigate("/login");
    }
    catch (err) {
      console.error("Logout error:", err);
      localStorage.removeItem("authToken");
      navigate("/login");
    }
  };

  const settingsMenu = [
    { id: "account", label: "Account Settings", icon: User },
    { id: "security", label: "Security & Privacy", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "language", label: "Language & Region", icon: Globe },
    { id: "billing", label: "Billing & Subscription", icon: CreditCard },
    { id: "data", label: "Data & Privacy", icon: FileText },
    { id: "support", label: "Help & Support", icon: HelpCircle },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-emerald-600 border-t-transparent"></div>
          <p className="text-slate-500 mt-4">Loading settings...</p>
        </div>
      </div>
    );
  }

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
                          <p className="text-sm text-slate-600">{profileData.name}</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium text-slate-900">Email Address</p>
                          <p className="text-sm text-slate-600">{profileData.email}</p>
                        </div>
                        {profileData.verified && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                            Verified
                          </span>
                        )}
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium text-slate-900">Phone Number</p>
                          <p className="text-sm text-slate-600">{profileData.mobileNo}</p>
                        </div>
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
                          <p className="text-sm font-medium text-slate-900">Web Browser - Chrome</p>
                          <p className="text-xs text-slate-600">India • Dec 02, 2025</p>
                        </div>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                          Current
                        </span>
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
                            onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all pr-12"
                          />
                          <button
                            type="button"
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
                          onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
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
                          onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
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
                        onClick={() => !settings.darkMode || handleDarkModeToggle()}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          !settings.darkMode
                            ? "border-emerald-600 bg-emerald-50"
                            : "border-slate-200 bg-white hover:border-slate-300"
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <Sun className="w-6 h-6 text-amber-500" />
                          <span className="font-semibold text-slate-900">Light Mode</span>
                        </div>
                        <p className="text-xs text-slate-600 text-left">
                          Bright and clean interface for daytime use
                        </p>
                      </button>

                      <button
                        onClick={() => settings.darkMode || handleDarkModeToggle()}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          settings.darkMode
                            ? "border-emerald-600 bg-emerald-50"
                            : "border-slate-200 bg-white hover:border-slate-300"
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <Moon className="w-6 h-6 text-indigo-500" />
                          <span className="font-semibold text-slate-900">Dark Mode</span>
                        </div>
                        <p className="text-xs text-slate-600 text-left">
                          Easy on the eyes for low-light conditions
                        </p>
                      </button>
                    </div>
                  </div>

                  {/* Font Size */}
                  <div className="p-5 bg-slate-50 rounded-xl">
                    <h3 className="font-semibold text-slate-900 mb-4">Text Size: {settings.textSize}%</h3>
                    <div className="space-y-3">
                      <input
                        type="range"
                        min="80"
                        max="120"
                        value={settings.textSize}
                        onChange={handleTextSizeChange}
                        className="w-full accent-emerald-600"
                      />
                      <div className="flex justify-between text-sm text-slate-600">
                        <span>Small (80%)</span>
                        <span>Default (100%)</span>
                        <span>Large (120%)</span>
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
                      value={settings.language}
                      onChange={handleLanguageChange}
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
                      value={settings.timezone}
                      onChange={handleTimezoneChange}
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
                        <input 
                          type="radio" 
                          name="dateFormat" 
                          checked={settings.dateFormat === "DD/MM/YYYY"}
                          onChange={() => handleDateFormatChange("DD/MM/YYYY")}
                          className="w-4 h-4 text-emerald-600" 
                        />
                        <span className="text-sm text-slate-700">DD/MM/YYYY (02/12/2025)</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input 
                          type="radio" 
                          name="dateFormat" 
                          checked={settings.dateFormat === "MM/DD/YYYY"}
                          onChange={() => handleDateFormatChange("MM/DD/YYYY")}
                          className="w-4 h-4 text-emerald-600" 
                        />
                        <span className="text-sm text-slate-700">MM/DD/YYYY (12/02/2025)</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input 
                          type="radio" 
                          name="dateFormat" 
                          checked={settings.dateFormat === "YYYY-MM-DD"}
                          onChange={() => handleDateFormatChange("YYYY-MM-DD")}
                          className="w-4 h-4 text-emerald-600" 
                        />
                        <span className="text-sm text-slate-700">YYYY-MM-DD (2025-12-02)</span>
                      </label>
                    </div>
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
                    <p className="text-xs text-emerald-700">AyurSutra v1.0.0</p>
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
