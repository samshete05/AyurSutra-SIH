import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const CenterNavbarProfile=()=>{
    //   const email = localStorage.getItem("email");
  const navigate = useNavigate();
  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");

  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef(null);


  
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleDashboard = () => {
    if (role === "patient") navigate("/patient");
    else navigate("/PanchaKarma-Dashboard");
  };

    return <div>
          {/* Profile Icon */}
            <button
              onClick={() => setOpenDropdown((prev) => !prev)}
              className="flex items-center gap-2 rounded-full bg-slate-100 px-2 py-1 cursor-pointer"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-sm font-semibold text-white">
                {email ? email.charAt(0).toUpperCase() : "U"}
              </div>
              <div className="hidden text-left text-xs md:block">
                <div className="font-semibold">{email}</div>
                <div className="text-[11px] text-slate-500 capitalize">{role}</div>
              </div>
            </button>

            {/* Dropdown */}
            {openDropdown && (
              <div className="absolute right-0 top-12 w-44 bg-white shadow-lg rounded-xl border border-emerald-100 py-2 z-50 animate-slide-down">
                <button
                  className="block w-full cursor-pointer text-left px-4 py-2 text-sm hover:bg-emerald-50 text-emerald-900"
                  onClick={handleDashboard}
                >
                  Dashboard
                </button>

                <button
                  onClick={handleLogout}
                  className="block w-full cursor-pointer text-left px-4 py-2 text-sm hover:bg-emerald-50 text-red-600"
                >
                  Logout
                </button>
              </div>
            )}
    </div>
}


export default CenterNavbarProfile;