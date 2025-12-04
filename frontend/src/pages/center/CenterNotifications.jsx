// pages/Center/CenterNotifications.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Bell, 
  CheckCircle2, 
  AlertCircle, 
  Info, 
  Gift, 
  Calendar,
  Trash2,
  CheckCheck,
  ArrowLeft
} from "lucide-react";
import CenterLayout from "../../layouts/CenterLayout";

const CenterNotifications = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem("email");
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    const token = localStorage.getItem("authToken"); 
    if (!token) {
      console.error("No token found in localStorage");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3000/PanchKarmaCenter/getCenterNotifications",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token}`
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("📥 Fetched notifications:", data);
        setNotifications(data.notifications || []);
        setUnreadCount(data.unreadCount || 0);
      } else {
        console.error("Failed to fetch notifications:", response.status);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      const response = await fetch(
        "http://localhost:3000/PanchKarmaCenter/markCenterNotificationRead",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ notificationId: notificationId }),
        }
      );

      if (response.ok) {
        setNotifications((prev) =>
          prev.map((notif) =>
            notif._id === notificationId ? { ...notif, read: true } : notif
          )
        );

        const newCount = Math.max(0, unreadCount - 1);
        setUnreadCount(newCount);

        // UPDATE GLOBALLY
        localStorage.setItem("notificationCount", newCount);
        window.dispatchEvent(
          new CustomEvent("notificationUpdate", {
            detail: { count: newCount },
          })
        );

        console.log("✅ Marked notification as read:", notificationId);
      }
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const markAllAsRead = async () => {
    const token = localStorage.getItem("authToken");
    if (!token || !email) return;

    try {
      const response = await fetch(
        "http://localhost:3000/PanchKarmaCenter/markAllCenterNotificationsRead",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({ email: email }),
        }
      );

      if (response.ok) {
        setNotifications((prev) =>
          prev.map((notif) => ({ ...notif, read: true }))
        );
        setUnreadCount(0);

        // UPDATE GLOBALLY
        localStorage.setItem("notificationCount", 0);
        window.dispatchEvent(
          new CustomEvent("notificationUpdate", {
            detail: { count: 0 },
          })
        );

        console.log("✅ Marked all notifications as read");
      }
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
    }
  };

  const deleteNotification = async (notificationId) => {
    try {
      const response = await fetch(
        "http://localhost:3000/PanchKarmaCenter/deleteCenterNotification",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ notificationId: notificationId }),
        }
      );

      if (response.ok) {
        const deletedNotif = notifications.find((n) => n._id === notificationId);

        setNotifications((prev) =>
          prev.filter((notif) => notif._id !== notificationId)
        );

        // Update count if it was unread
        if (deletedNotif && !deletedNotif.read) {
          const newCount = Math.max(0, unreadCount - 1);
          setUnreadCount(newCount);

          // UPDATE GLOBALLY
          localStorage.setItem("notificationCount", newCount);
          window.dispatchEvent(
            new CustomEvent("notificationUpdate", {
              detail: { count: newCount },
            })
          );
        }

        console.log("🗑️ Deleted notification:", notificationId);
      }
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case "appointment":
        return <Calendar className="h-5 w-5 text-blue-500" />;
      case "alert":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case "promotion":
        return <Gift className="h-5 w-5 text-purple-500" />;
      case "system":
        return <CheckCircle2 className="h-5 w-5 text-emerald-500" />;
      case "reminder":
        return <Info className="h-5 w-5 text-amber-500" />;
      default:
        return <Bell className="h-5 w-5 text-slate-500" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "border-l-red-500 bg-red-50";
      case "medium":
        return "border-l-amber-500 bg-amber-50";
      case "low":
        return "border-l-emerald-500 bg-emerald-50";
      default:
        return "border-l-slate-300 bg-white";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString("en-IN", {
      month: "short",
      day: "numeric",
      year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
    });
  };

  if (loading) {
    return (
      <CenterLayout showSearch={false}>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-emerald-500 border-r-transparent"></div>
            <p className="mt-4 text-slate-600">Loading notifications...</p>
          </div>
        </div>
      </CenterLayout>
    );
  }

  return (
    <CenterLayout showSearch={false}>
      <div className="px-4 py-6 md:px-8 md:py-8">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm hover:bg-slate-50 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-slate-700" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Notifications</h1>
              <p className="text-sm text-slate-500">
                {unreadCount > 0 ? `${unreadCount} unread` : "All caught up!"}
              </p>
            </div>
          </div>

          {notifications.length > 0 && unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-600 transition-colors"
            >
              <CheckCheck className="h-4 w-4" />
              Mark all as read
            </button>
          )}
        </div>

        {/* Notifications List */}
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
              <Bell className="h-10 w-10 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800">No notifications yet</h3>
            <p className="mt-2 text-sm text-slate-500">
              We'll notify you when something important happens
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((notif) => (
              <div
                key={notif._id}
                onClick={() => !notif.read && markAsRead(notif._id)}
                className={`group relative rounded-2xl border-l-4 p-5 shadow-sm transition-all hover:shadow-md cursor-pointer ${
                  notif.read ? "bg-white border-l-slate-200" : getPriorityColor(notif.priority)
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="mt-1 flex-shrink-0">{getIcon(notif.type)}</div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <h3
                          className={`text-sm font-semibold ${
                            notif.read ? "text-slate-700" : "text-slate-900"
                          }`}
                        >
                          {notif.title}
                        </h3>
                        <p
                          className={`mt-1 text-sm ${
                            notif.read ? "text-slate-500" : "text-slate-700"
                          }`}
                        >
                          {notif.message}
                        </p>
                      </div>

                      {/* Delete button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNotification(notif._id);
                        }}
                        className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-full hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </button>
                    </div>

                    {/* Actions */}
                    {notif.actionable && notif.actions && notif.actions.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {notif.actions.map((action, idx) => (
                          <button
                            key={idx}
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(action.link);
                            }}
                            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                              action.type === "primary"
                                ? "bg-emerald-500 text-white hover:bg-emerald-600"
                                : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                            }`}
                          >
                            {action.label}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Timestamp */}
                    <div className="mt-2 flex items-center gap-3 text-xs text-slate-400">
                      <span>{formatDate(notif.createdAt)}</span>
                      {!notif.read && (
                        <span className="flex h-2 w-2 rounded-full bg-emerald-500"></span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </CenterLayout>
  );
};

export default CenterNotifications;
