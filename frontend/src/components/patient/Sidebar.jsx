import React from "react";
import {NavLink, Link } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarClock,
  MapPin,
  Video,
  Brain,
  Pill,
  BarChart2,
  MessageSquare,
  Bell,
  User,
  Settings,
} from "lucide-react"; 


const navItems = [
  { label: "Dashboard", to: "/patient", exact: true, icon: LayoutDashboard },
  { label: "Appointments", to: "/patient/appointments", badge: 2, icon: CalendarClock },
  { label: "Find Centers", to: "/patient/find-centers", icon: MapPin},
  { label: "Telemedicines", to: "/patient/telemedicine", icon: Video },
  { label: "AI Recommendation", to: "/patient/ai-recommendation", badge: "New", icon: Brain },
  { label: "My Treatments", to: "/patient/my-treatments", icon: Pill },
  { label: "Progress", to: "/patient/progress", icon: BarChart2 },
  { label: "Feedback", to: "/patient/feedback", icon: MessageSquare },
//   { label: "Notification", to: "/patient/notifications", badge: 3, icon: Bell },
  { label: "My Profile", to: "/patient/my-profile", icon: User },
  { label: "Setting", to: "/patient/settings", icon: Settings },
];

function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col">
        <div className="h-16 flex items-center px-5 border-b border-slate-100">
            <div className="flex items-center gap-2">
                <Link to="/" className="flex items-center gap-2 cursor-pointer">
                  <img
                    src='https://res.cloudinary.com/dlty7hjfx/image/upload/v1764684761/Gemini_Generated_Image_97y8ep97y8ep97y8_n6yxoh.png'
                    alt="AyurSutra logo"
                    className="h-8 w-auto object-contain"
                  />
                </Link>
            </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
            {navItems.map((item) => {
                const Icon = item.icon;
                return (
                    <NavLink
                    key={item.label}
                    to={item.to}
                    end={item.exact}
                    className={({ isActive }) =>
                        `flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium cursor-pointer transition
                        ${
                            isActive
                                ? "bg-emerald-50 text-emerald-900"
                                : "text-slate-600 hover:bg-slate-50 hover:text-emerald-900"
                        }`
                    }
                    >
                    <div className="flex items-center gap-2">
                        <Icon size={18} className="shrink-0" />
                        <span>{item.label}</span>
                    </div>
                
                    {item.badge && (
                        <span
                            className={`text-xs px-2 py-0.5 rounded-full ${
                                item.badge === "New"
                                    ? "bg-red-100 text-orange-600"
                                    : "bg-slate-100 text-slate-700"
                                }`
                            }
                        >
                            {item.badge}
                        </span>
                    )}
                    </NavLink>
                );
            })}
        </nav>

      <div className="px-4 py-3 border-t border-slate-100 text-xs text-slate-400">
        © {new Date().getFullYear()} AyurSutra
      </div>
    </aside>
  );
}

export default Sidebar;
