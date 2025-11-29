import { faCalendar, faUserDoctor } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CircleDollarSign, LayoutDashboard, User } from "lucide-react";
import { useNavigate } from "react-router-dom";



const SidePanel=()=>{

     const navigate=useNavigate();
    return   <div className="">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
              Main
            </p>
            <button onClick={() => navigate("/dashboard")} className="flex cursor-pointer w-full items-center gap-3 rounded-xl bg-slate-900 px-3 py-2 text-sm font-medium text-white shadow-sm">
              <LayoutDashboard className="h-6 w-6" />
              <span>Dashboard</span>
            </button>
            <button onClick={() => navigate("/center-appointments")} className="mt-1 cursor-pointer flex w-full items-center gap-3 rounded-xl px-3 py-2 text-slate-600 hover:bg-slate-100">
              <FontAwesomeIcon icon={faCalendar} className="text-xl" />
              <span>Appointments</span>
            </button>
            <button onClick={() => navigate("/add-doctor")}  className="mt-1 cursor-pointer flex w-full items-center gap-3 rounded-xl px-3 py-2 text-slate-600 hover:bg-slate-100">
              <FontAwesomeIcon icon={faUserDoctor} className="text-xl" />
              <span>Add Doctor</span>
            </button>
            <button className="mt-1 cursor-pointer flex w-full items-center gap-3 rounded-xl px-3 py-2 text-slate-600 hover:bg-slate-100">
              <User className="h-6 w-6 text-gray-700" />
              <span>Treatment Packages</span>
            </button>
            <button className="mt-1 cursor-pointer flex w-full items-center gap-3 rounded-xl px-3 py-2 text-slate-600 hover:bg-slate-100">
              <CircleDollarSign className="h-6 w-6" />
              <span>Billing</span>
            </button>
          </div>
}

export default SidePanel;