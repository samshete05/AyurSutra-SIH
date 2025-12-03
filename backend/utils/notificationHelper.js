const notificationModel = require("../models/Notification.model");

// Main function to create notifications
const createNotification = async ({
  userId,
  userType = "patient", // 'patient' or 'centerHead'
  type,
  title,
  message,
  priority = "medium",
  actionable = false,
  actions = [],
}) => {
  try {
    const notification = new notificationModel({
      userId,
      userType,
      type,
      title,
      message,
      priority,
      actionable,
      actions,
      read: false,
    });

    await notification.save();
    console.log(`Notification created for ${userType} ${userId}: ${title}`);

    return notification;
  } catch (error) {
    console.error("Error creating notification:", error);
    throw error;
  }
};

// Pre-built notification templates
const NotificationTemplates = {
  // Scenario 1: Welcome message after registration
  welcomeMessage: (userId, userName, userType = "patient") =>
    createNotification({
      userId,
      userType,
      type: "promotion",
      title: `Welcome to AyurSutra, ${userName}! 🌿`,
      message:
        userType === "patient"
          ? "Start your Ayurvedic wellness journey today. Complete your profile to get personalized recommendations and book your first consultation."
          : "Welcome to AyurSutra! Set up your center profile to start receiving appointment requests from patients.",
      priority: "medium",
      actionable: true,
      actions:
        userType === "patient"
          ? [
              {
                label: "Complete Profile",
                type: "primary",
                link: "/patient/my-profile",
              },
              {
                label: "Explore Centers",
                type: "secondary",
                link: "/patient/find-centers",
              },
            ]
          : [
              {
                label: "Complete Profile",
                type: "primary",
                link: "/center/profile",
              },
              {
                label: "View Dashboard",
                type: "secondary",
                link: "/center/dashboard",
              },
            ],
    }),

  // Scenario 2: Welcome back message on login
  welcomeBack: (
    userId,
    userName,
    userType = "patient",
    lastLoginDate = null
  ) => {
    const formatDate = (date) => {
      if (!date) return "a while";
      const d = new Date(date);
      return d.toLocaleDateString("en-IN", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    };
    console.log("welcome back called")

    return createNotification({
      userId,
      userType,
      type: "reminder",
      title: `Welcome back, ${userName}! 👋`,
      message:
        userType === "patient"
          ? `Your last visit was on ${formatDate(
              lastLoginDate
            )}. Check out your upcoming appointments and wellness progress.`
          : `Your last visit was on ${formatDate(
              lastLoginDate
            )}. Review today's appointments and patient requests.`,
      priority: "low",
      actionable: true,
      actions:
        userType === "patient"
          ? [
              {
                label: "View Dashboard",
                type: "primary",
                link: "/patient/",
              },
              {
                label: "My Appointments",
                type: "secondary",
                link: "/patient/appointments",
              },
            ]
          : [
              {
                label: "View Dashboard",
                type: "primary",
                link: "/center/dashboard",
              },
              {
                label: "Today's Schedule",
                type: "secondary",
                link: "/center/appointments",
              },
            ],
    });
  },
  // other messages will go here
};

module.exports = {
  createNotification,
  NotificationTemplates,
};
