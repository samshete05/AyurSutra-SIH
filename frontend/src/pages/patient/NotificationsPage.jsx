import React, { useState } from "react";
import {
  Bell,
  Mail,
  MessageSquare,
  Clock,
  Calendar,
  Pill,
  FileText,
  Heart,
  Info,
  Settings,
  Check,
  Trash2,
  CheckCheck,
  Search,
  X
} from "lucide-react";

function NotificationsPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSettings, setShowSettings] = useState(false);

  // Simple notification preferences - single setting for all
  const [notificationChannels, setNotificationChannels] = useState({
    inApp: true,
    email: true,
    sms: false
  });

  // Sample notifications - fetch from backend API
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "appointment",
      title: "Upcoming Appointment Reminder",
      message: "Your Panchakarma session is scheduled for tomorrow at 10:00 AM with Dr. Sharma",
      timestamp: "2025-11-30T10:30:00",
      read: false,
      priority: "high",
      actionable: true,
      actions: [
        { label: "Confirm", type: "primary" },
        { label: "Reschedule", type: "secondary" }
      ]
    },
    {
      id: 2,
      type: "medication",
      title: "Medication Reminder",
      message: "Time to take your Triphala supplement - 1 tablet after dinner",
      timestamp: "2025-11-30T09:15:00",
      read: false,
      priority: "medium",
      actionable: true,
      actions: [
        { label: "Mark as Taken", type: "primary" }
      ]
    },
    {
      id: 3,
      type: "report",
      title: "Lab Results Available",
      message: "Your recent blood test results are now available to view",
      timestamp: "2025-11-29T14:20:00",
      read: true,
      priority: "medium",
      actionable: true,
      actions: [
        { label: "View Report", type: "primary" }
      ]
    },
    {
      id: 4,
      type: "treatment",
      title: "Treatment Plan Updated",
      message: "Dr. Sharma has updated your Ayurvedic treatment plan. Please review the changes",
      timestamp: "2025-11-28T16:45:00",
      read: true,
      priority: "medium",
      actionable: true,
      actions: [
        { label: "View Changes", type: "primary" }
      ]
    },
    {
      id: 5,
      type: "reminder",
      title: "Daily Wellness Check",
      message: "Don't forget to log your daily symptoms and wellness score",
      timestamp: "2025-11-28T08:00:00",
      read: true,
      priority: "low",
      actionable: false
    },
    {
      id: 6,
      type: "appointment",
      title: "Appointment Confirmed",
      message: "Your consultation with Dr. Patel on Dec 5 at 3:00 PM has been confirmed",
      timestamp: "2025-11-27T11:30:00",
      read: true,
      priority: "low",
      actionable: false
    },
    {
      id: 7,
      type: "promotion",
      title: "Special Offer: Wellness Package",
      message: "Get 20% off on our comprehensive Ayurveda wellness package this month",
      timestamp: "2025-11-26T09:00:00",
      read: true,
      priority: "low",
      actionable: true,
      actions: [
        { label: "Learn More", type: "secondary" }
      ]
    }
  ]);

  // Toggle notification channel
  const toggleChannel = (channel) => {
    setNotificationChannels(prev => ({
      ...prev,
      [channel]: !prev[channel]
    }));
    // TODO: Send preference update to backend API
    console.log("Updated preferences:", { ...notificationChannels, [channel]: !notificationChannels[channel] });
  };

  // Mark notification as read
  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
    // TODO: Send read status to backend
  };

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
    // TODO: Send batch update to backend
  };

  // Delete notification
  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
    // TODO: Send delete request to backend
  };

  // Get icon for notification type
  const getNotificationIcon = (type) => {
    switch (type) {
      case "appointment": return <Calendar className="w-5 h-5" />;
      case "medication": return <Pill className="w-5 h-5" />;
      case "treatment": return <Heart className="w-5 h-5" />;
      case "report": return <FileText className="w-5 h-5" />;
      case "reminder": return <Clock className="w-5 h-5" />;
      case "promotion": return <Bell className="w-5 h-5" />;
      default: return <Info className="w-5 h-5" />;
    }
  };

  // Get color for notification type
  const getNotificationColor = (type) => {
    switch (type) {
      case "appointment": return "bg-blue-100 text-blue-600";
      case "medication": return "bg-purple-100 text-purple-600";
      case "treatment": return "bg-emerald-100 text-emerald-600";
      case "report": return "bg-orange-100 text-orange-600";
      case "reminder": return "bg-yellow-100 text-yellow-600";
      case "promotion": return "bg-pink-100 text-pink-600";
      default: return "bg-slate-100 text-slate-600";
    }
  };

  // Format timestamp
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now - date) / (1000 * 60));
      return `${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else if (diffInHours < 48) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  // Filter notifications
  const filteredNotifications = notifications.filter(notif => {
    const matchesFilter = activeFilter === "all" || 
                         (activeFilter === "unread" && !notif.read) ||
                         notif.type === activeFilter;
    const matchesSearch = notif.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         notif.message.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
              <Bell className="w-8 h-8 text-emerald-600" />
              Notifications
              {unreadCount > 0 && (
                <span className="px-3 py-1 bg-red-500 text-white text-sm font-semibold rounded-full">
                  {unreadCount}
                </span>
              )}
            </h1>
            <p className="text-slate-600 mt-1">
              Stay updated with your appointments, treatments, and reminders
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={markAllAsRead}
              className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 rounded-xl border border-slate-200 font-medium transition-colors shadow-sm"
            >
              <CheckCheck className="w-4 h-4" />
              Mark All Read
            </button>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-colors shadow-sm ${
                showSettings
                  ? "bg-emerald-600 text-white"
                  : "bg-white hover:bg-slate-50 text-slate-700 border border-slate-200"
              }`}
            >
              <Settings className="w-4 h-4" />
              Settings
            </button>
          </div>
        </div>

        {/* Simplified Notification Settings Panel */}
        {showSettings && (
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200 animate-fadeIn">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-900">
                How do you want to receive notifications?
              </h3>
              <button
                onClick={() => setShowSettings(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <p className="text-sm text-slate-600 mb-6">
              Select your preferred channels to receive all notifications
            </p>

            <div className="space-y-3">
              {/* In-App Notifications */}
              <div
                onClick={() => toggleChannel('inApp')}
                className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all border-2 ${
                  notificationChannels.inApp
                    ? "bg-emerald-50 border-emerald-500"
                    : "bg-slate-50 border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                    notificationChannels.inApp
                      ? "bg-emerald-100"
                      : "bg-slate-200"
                  }`}>
                    <Bell className={`w-6 h-6 ${
                      notificationChannels.inApp
                        ? "text-emerald-600"
                        : "text-slate-400"
                    }`} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">In-App Notifications</h4>
                    <p className="text-sm text-slate-600">
                      Receive alerts within the application
                    </p>
                  </div>
                </div>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all ${
                  notificationChannels.inApp
                    ? "bg-emerald-900 border-emerald-900"
                    : "bg-white border-slate-300"
                }`}>
                  {notificationChannels.inApp && (
                    <Check className="w-4 h-4 text-white" />
                  )}
                </div>
              </div>

              {/* Email Notifications */}
              <div
                onClick={() => toggleChannel('email')}
                className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all border-2 ${
                  notificationChannels.email
                    ? "bg-blue-50 border-emerald-500"
                    : "bg-slate-50 border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                    notificationChannels.email
                      ? "bg-blue-100"
                      : "bg-slate-200"
                  }`}>
                    <Mail className={`w-6 h-6 ${
                      notificationChannels.email
                        ? "text-emerald-600"
                        : "text-slate-400"
                    }`} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Email Notifications</h4>
                    <p className="text-sm text-slate-600">
                      Get updates sent to your email address
                    </p>
                  </div>
                </div>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all ${
                  notificationChannels.email
                    ? "bg-emerald-900 border-emerald-900"
                    : "bg-white border-slate-300"
                }`}>
                  {notificationChannels.email && (
                    <Check className="w-4 h-4 text-white" />
                  )}
                </div>
              </div>

              {/* SMS Notifications */}
              <div
                onClick={() => toggleChannel('sms')}
                className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all border-2 ${
                  notificationChannels.sms
                    ? "bg-purple-50 border-emerald-500"
                    : "bg-slate-50 border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                    notificationChannels.sms
                      ? "bg-purple-100"
                      : "bg-slate-200"
                  }`}>
                    <MessageSquare className={`w-6 h-6 ${
                      notificationChannels.sms
                        ? "text-emerald-600"
                        : "text-slate-400"
                    }`} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">SMS Notifications</h4>
                    <p className="text-sm text-slate-600">
                      Receive text messages on your mobile phone
                    </p>
                  </div>
                </div>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all ${
                  notificationChannels.sms
                    ? "bg-emerald-900 border-emerald-900"
                    : "bg-white border-slate-300"
                }`}>
                  {notificationChannels.sms && (
                    <Check className="w-4 h-4 text-white" />
                  )}
                </div>
              </div>
            </div>

            {/* Active Channels Summary */}
            <div className="mt-6 p-4 bg-slate-50 rounded-xl">
              <div className="flex items-start gap-2">
                <Info className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-slate-700 font-medium mb-1">
                    Active Channels: {Object.values(notificationChannels).filter(Boolean).length} of 3
                  </p>
                  <p className="text-xs text-slate-600">
                    Changes are saved automatically and will apply to all future notifications
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-4 border border-slate-200">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search notifications..."
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              {[
                { id: "all", label: "All", icon: null },
                { id: "unread", label: "Unread", icon: null },
                { id: "appointment", label: "Appointments", icon: Calendar },
                { id: "medication", label: "Medications", icon: Pill },
                { id: "treatment", label: "Treatments", icon: Heart },
                { id: "report", label: "Reports", icon: FileText }
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-colors ${
                    activeFilter === filter.id
                      ? "bg-emerald-600 text-white shadow-lg"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {filter.icon && <filter.icon className="w-4 h-4" />}
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifications.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-slate-200">
              <Bell className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                No notifications found
              </h3>
              <p className="text-slate-600">
                {searchQuery ? "Try adjusting your search" : "You're all caught up!"}
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-white rounded-2xl shadow-md hover:shadow-lg transition-all border-l-4 ${
                  !notification.read
                    ? "border-emerald-500"
                    : "border-transparent"
                }`}
              >
                <div className="p-5">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${getNotificationColor(notification.type)}`}>
                      {getNotificationIcon(notification.type)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-900 mb-1 flex items-center gap-2">
                            {notification.title}
                            {!notification.read && (
                              <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                            )}
                          </h3>
                          <p className="text-sm text-slate-600 leading-relaxed">
                            {notification.message}
                          </p>
                        </div>

                        {/* Delete Button */}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="text-slate-400 hover:text-red-500 transition-colors p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Footer */}
                      <div className="flex flex-wrap items-center gap-3 mt-3">
                        <span className="text-xs text-slate-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatTimestamp(notification.timestamp)}
                        </span>

                        {notification.priority === "high" && (
                          <span className="text-xs font-semibold text-red-600 bg-red-50 px-2 py-1 rounded-full">
                            High Priority
                          </span>
                        )}

                        {/* Action Buttons */}
                        {notification.actionable && notification.actions && (
                          <div className="flex gap-2 ml-auto">
                            {notification.actions.map((action, idx) => (
                              <button
                                key={idx}
                                className={`text-xs font-medium px-4 py-1.5 rounded-lg transition-colors ${
                                  action.type === "primary"
                                    ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                                    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                                }`}
                              >
                                {action.label}
                              </button>
                            ))}
                          </div>
                        )}

                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="text-xs font-medium text-emerald-600 hover:text-emerald-700 flex items-center gap-1 ml-auto"
                          >
                            <Check className="w-3 h-3" />
                            Mark as read
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default NotificationsPage;
