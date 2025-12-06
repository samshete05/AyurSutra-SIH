// layouts/CenterLayout.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Search } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import SidePanel from "../components/CenterSidePanel";
import Logo from "../components/SidePanelLogo";
import CenterNavbarProfile from "../pages/center/CenterNavbarProfile";

const CenterLayout = ({ children, showSearch = true, searchPlaceholder = "Search..." }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [unreadCount, setUnreadCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const email = localStorage.getItem("email");

  // Fetch notifications
  const fetchNotifications = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    try {
      const response = await fetch(
        "http://localhost:3000/PanchKarmaCenter/getCenterNotifications",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        const count = data.unreadCount || 0;
        setUnreadCount(count);
        localStorage.setItem("notificationCount", count);
        console.log("📊 Notification count:", count);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    // Load from localStorage first
    const stored = localStorage.getItem("notificationCount");
    if (stored) {
      setUnreadCount(parseInt(stored));
    }

    // Fetch fresh data
    fetchNotifications();

    // Poll every 30 seconds
    const interval = setInterval(fetchNotifications, 30000);

    // Listen for custom events
    const handleUpdate = (e) => {
      setUnreadCount(e.detail.count);
      console.log("🔔 Notification count updated:", e.detail.count);
    };

    window.addEventListener("notificationUpdate", handleUpdate);

    return () => {
      clearInterval(interval);
      window.removeEventListener("notificationUpdate", handleUpdate);
    };
  }, [email, location.pathname]); // Re-fetch on route change

  return (
    <div className="flex min-h-screen bg-slate-100 text-slate-800">
      {/* Sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white px-6 py-6 md:flex md:flex-col">
        <Logo />
        <nav className="space-y-6 text-sm">
          <SidePanel />
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex min-h-screen flex-1 flex-col">
        {/* Top bar */}
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 md:px-8">
          <div className="flex items-center gap-3">
            <button className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-xl md:hidden">
              ☰
            </button>

            {showSearch && (
              <div className="relative hidden items-center md:flex">
                <span className="pointer-events-none absolute left-3 text-slate-400">
                  <Search className="h-5 w-5 text-gray-500" />
                </span>
                <input
                  className="h-10 w-64 rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm outline-none placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-100"
                  placeholder={searchPlaceholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            )}
          </div>

          {/* RIGHT SIDE - Notification + Profile */}
          <div className="flex items-center gap-3">
            {/* Notification Bell */}
            <button
              onClick={() => navigate("/center-notifications")}
              className="relative flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 hover:bg-emerald-100 transition-colors"
            >
              <FontAwesomeIcon icon={faBell} className="text-xl text-emerald-600" />
              
              {/* DYNAMIC BADGE */}
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-lg border-2 border-white animate-pulse">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </button>

            {/* Profile Component */}
            <CenterNavbarProfile />
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 bg-slate-100">
          {children}
        </main>
      </div>
    </div>
  );
};

export default CenterLayout;
