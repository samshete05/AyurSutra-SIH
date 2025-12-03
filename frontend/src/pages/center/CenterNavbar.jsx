// components/CenterNavbar.jsx
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CenterNavbarProfile from "../../pages/center/CenterNavbarProfile";

const CenterNavbar = () => {
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);
  const email = localStorage.getItem("email");

  // Fetch notifications
  const fetchNotifications = async () => {
    if (!email) return;

    try {
      const response = await fetch(
        "http://localhost:3000/PanchKarmaCenter/getCenterNotifications",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const count = data.unreadCount || 0;
        setUnreadCount(count);
        localStorage.setItem("notificationCount", count);
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
    };

    window.addEventListener("notificationUpdate", handleUpdate);

    return () => {
      clearInterval(interval);
      window.removeEventListener("notificationUpdate", handleUpdate);
    };
  }, [email]);

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => navigate("/center-notifications")}
        className="relative flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
      >
        <FontAwesomeIcon icon={faBell} className="text-xl text-slate-700" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-semibold text-white">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      <CenterNavbarProfile />
    </div>
  );
};

export default CenterNavbar;
