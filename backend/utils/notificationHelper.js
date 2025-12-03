const notificationModel = require("../models/Notification.model");

// Main function to create notifications
const createNotification = async ({
  userId,
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
      type,
      title,
      message,
      priority,
      actionable,
      actions,
      read: false,
    });

    await notification.save();
    console.log(`✅ Notification created for user ${userId}: ${title}`);

    return notification;
  } catch (error) {
    console.error("❌ Error creating notification:", error);
    throw error;
  }
};

// Pre-built notification templates
const NotificationTemplates = {
  // When appointment is booked
  appointmentBooked: (userId, appointmentDate, doctorName, appointmentId) =>
    createNotification({
      userId,
      type: "appointment",
      title: "Appointment Confirmed",
      message: `Your appointment with Dr. ${doctorName} on ${appointmentDate} has been confirmed`,
      priority: "high",
      actionable: true,
      actions: [
        {
          label: "View Details",
          type: "primary",
          link: `/patient/appointments/${appointmentId}`,
        },
        {
          label: "Reschedule",
          type: "secondary",
          link: `/patient/appointments/${appointmentId}/reschedule`,
        },
      ],
    }),

  // 24 hours before appointment
  appointmentReminder: (userId, appointmentDate, time, doctorName) =>
    createNotification({
      userId,
      type: "appointment",
      title: "Appointment Reminder",
      message: `Your appointment with Dr. ${doctorName} is tomorrow at ${time}`,
      priority: "high",
      actionable: true,
      actions: [
        { label: "Confirm", type: "primary" },
        { label: "Cancel", type: "secondary" },
      ],
    }),

  // When treatment plan is updated
  treatmentUpdated: (userId, doctorName, treatmentId) =>
    createNotification({
      userId,
      type: "treatment",
      title: "Treatment Plan Updated",
      message: `Dr. ${doctorName} has updated your Ayurvedic treatment plan`,
      priority: "medium",
      actionable: true,
      actions: [
        {
          label: "View Changes",
          type: "primary",
          link: `/patient/treatments/${treatmentId}`,
        },
      ],
    }),

  // When lab results are ready
  labResultsReady: (userId, testName, reportId) =>
    createNotification({
      userId,
      type: "report",
      title: "Lab Results Available",
      message: `Your ${testName} results are now available to view`,
      priority: "medium",
      actionable: true,
      actions: [
        {
          label: "View Report",
          type: "primary",
          link: `/patient/reports/${reportId}`,
        },
      ],
    }),

  // Medication reminder
  medicationReminder: (userId, medicationName, time) =>
    createNotification({
      userId,
      type: "medication",
      title: "Medication Reminder",
      message: `Time to take ${medicationName} - ${time}`,
      priority: "high",
      actionable: true,
      actions: [
        { label: "Mark as Taken", type: "primary" },
        { label: "Snooze 15 min", type: "secondary" },
      ],
    }),

  // Daily wellness check
  dailyWellnessCheck: (userId) =>
    createNotification({
      userId,
      type: "reminder",
      title: "Daily Wellness Check",
      message: "Don't forget to log your daily symptoms and wellness score",
      priority: "low",
      actionable: true,
      actions: [
        {
          label: "Log Now",
          type: "primary",
          link: "/patient/wellness-tracker",
        },
      ],
    }),

  // Welcome notification for new users
  welcomeMessage: (userId, userName) =>
    createNotification({
      userId,
      type: "promotion",
      title: `Welcome to AyurSutra, ${userName}! 🌿`,
      message:
        "Start your Ayurvedic wellness journey today. Complete your profile to get personalized recommendations.",
      priority: "medium",
      actionable: true,
      actions: [
        {
          label: "Complete Profile",
          type: "primary",
          link: "/patient/my-profile",
        },
      ],
    }),
};

module.exports = {
  createNotification,
  NotificationTemplates,
};
