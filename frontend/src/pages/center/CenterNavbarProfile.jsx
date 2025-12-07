// components/CenterNavbarProfile.jsx
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, LogOut } from "lucide-react";

const CenterNavbarProfile = () => {
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(false);
  const [centerData, setCenterData] = useState(null);
  const dropdownRef = useRef(null);

  const email = localStorage.getItem("email");

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Fetch center profile data
  useEffect(() => {
    if (email) {
      fetchCenterProfile();
    }
  }, [email]);

  const fetchCenterProfile = async () => {
    try {
      const centerId = localStorage.getItem("centerId")
      const response = await fetch("http://localhost:3000/PanchKarmaCenter/getCenterProfile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ centerId }),
      });

      if (response.ok) {
        const data = await response.json();
        setCenterData(data.center);
      }
    } catch (error) {
      console.error("Error fetching center profile:", error);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleProfileClick = () => {
    setOpenDropdown(false);
    navigate("/center-profile");
  };

  const getProfileImage = () => {
    if (centerData?.profileImg) {
      return centerData.profileImg;
    }
    return null;
  };

  const getInitials = () => {
    if (centerData?.Adminname) {
      return centerData.Adminname.charAt(0).toUpperCase();
    }
    return "C";
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Button */}
      <button
        onClick={() => setOpenDropdown((prev) => !prev)}
        className="flex items-center gap-2 rounded-2xl bg-slate-100 px-2 py-1 cursor-pointer hover:bg-slate-200 transition-colors"
      >
        {/* Profile Image or Initial */}
        {getProfileImage() ? (
          <img
            src={getProfileImage()}
            alt="Profile"
            className="h-8 w-8 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-8 w-8 flex items-center justify-center rounded-full bg-emerald-500 text-sm font-semibold text-white">
            {getInitials()}
          </div>
        )}

        {/* Name and Role */}
        <div className="hidden text-left text-xs md:block">
          <div className="font-semibold">
            {centerData?.Adminname || "Loading..."}
          </div>
          <div className="text-[11px] text-slate-500 capitalize">
            Center Head
          </div>
        </div>

        {/* Dropdown Arrow */}
        <svg
          className={`w-4 h-4 text-slate-600 transition-transform ${
            openDropdown ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {openDropdown && (
        <div className="absolute right-0 top-12 w-48 bg-white shadow-lg rounded-xl border border-emerald-100 py-2 z-50 animate-slide-down">
          {/* Profile Option */}
          <button
            className="flex items-center gap-3 w-full cursor-pointer text-left px-4 py-2.5 text-sm hover:bg-emerald-50 text-slate-700 transition-colors"
            onClick={handleProfileClick}
          >
            <User className="h-4 w-4 text-emerald-600" />
            <span>My Profile</span>
          </button>

          {/* Divider */}
          <div className="border-t border-slate-100 my-1"></div>

          {/* Logout Option */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full cursor-pointer text-left px-4 py-2.5 text-sm hover:bg-red-50 text-red-600 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default CenterNavbarProfile;
