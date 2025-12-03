import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faStethoscope, faUserDoctor, faUser, faGear } from "@fortawesome/free-solid-svg-icons";
import { CircleDollarSign, LayoutDashboard, User, HandHeart, BriefcaseMedical } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const SidePanel = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const baseItem =
    "mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm cursor-pointer transition-colors";

  const activeClasses = "bg-[#1E4B3C] text-white shadow-sm";
  const inactiveClasses = "text-slate-600 hover:bg-slate-100";

  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
        Main
      </p>

      <button
        onClick={() => navigate("/dashboard")}
        className={`${baseItem} ${isActive("/dashboard") ? activeClasses : inactiveClasses}`}
      >
        <LayoutDashboard className="h-5 w-5" />
        <span>Dashboard</span>
      </button>

      <button
        onClick={() => navigate("/center-appointments")}
        className={`${baseItem} ${isActive("/center-appointments") ? activeClasses : inactiveClasses}`}
      >
        <FontAwesomeIcon icon={faCalendar} className="text-base" />
        <span>Appointments</span>
      </button>

      <p className="mt-6 mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
        Therapists
      </p>

      <button
        onClick={() => navigate("/add-therapist")}
        className={`${baseItem} ${isActive("/add-therapist") ? activeClasses : inactiveClasses}`}
      >
        <FontAwesomeIcon icon={faStethoscope} className="text-base" />
        <span>Add Therapist</span>
      </button>

      <p className="mt-6 mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
        Therapies
      </p>

      <button
        onClick={() => navigate("/add-therapy")}
        className={`${baseItem} ${isActive("/add-therapy") ? activeClasses : inactiveClasses}`}
      >
        <HandHeart className="h-5 w-5" />
        <span>Add Therapy</span>
      </button>

      <button
        onClick={() => navigate("/add-doctor")}
        className={`${baseItem} ${isActive("/add-doctor") ? activeClasses : inactiveClasses}`}
      >
        <FontAwesomeIcon icon={faUserDoctor} className="text-base" />
        <span>Add Doctor</span>
      </button>

      <button
        onClick={() => navigate("/view-therapy")}
        className={`${baseItem} ${isActive("/view-therapy") ? activeClasses : inactiveClasses}`}
      >
        <User className="h-5 w-5" />
        <span>View Therapies</span>
      </button>


         <button
        onClick={() => navigate("/view-therapist")}
        className={`${baseItem} ${isActive("/view-therapist") ? activeClasses : inactiveClasses}`}
      >
        <User className="h-5 w-5" />
        <span>View Therapist</span>
      </button>



       <button
        onClick={() => navigate("/view-doctor")}
        className={`${baseItem} ${isActive("/view-doctor") ? activeClasses : inactiveClasses}`}
      >
    <BriefcaseMedical className="w-6 h-6 text-gray-700" />
        <span>View Doctors</span>
      </button>



      <button
        onClick={() => navigate("/billing")}
        className={`${baseItem} ${isActive("/billing") ? activeClasses : inactiveClasses}`}
      >
        <CircleDollarSign className="h-5 w-5" />
        <span>Billing</span>
      </button>

      {/* NEW SECTION */}
      <p className="mt-6 mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
        Account
      </p>

      <button
        onClick={() => navigate("/center-profile")}
        className={`${baseItem} ${isActive("/center-profile") ? activeClasses : inactiveClasses}`}
      >
        <FontAwesomeIcon icon={faUser} className="text-base" />
        <span>Profile</span>
      </button>

      <button
        onClick={() => navigate("/center-settings")}
        className={`${baseItem} ${isActive("/center-settings") ? activeClasses : inactiveClasses}`}
      >
        <FontAwesomeIcon icon={faGear} className="text-base" />
        <span>Settings</span>
      </button>
    </div>
  );
};

export default SidePanel;
