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
                link: "/dashboard",
              },
              {
                label: "Today's Schedule",
                type: "secondary",
                link: "/center-appointments",
              },
            ],
    });
  },

  // Scenario 3: Doctor successfully added
  doctorAdded: (centerId, doctorName, speciality) =>
    createNotification({
      userId: centerId,
      userType: "centerHead",
      type: "system",
      title: `New Doctor Added Successfully! 🩺`,
      message: `Dr. ${doctorName} (${speciality}) has been added to your center. They are now available for patient consultations.`,
      priority: "medium",
      actionable: true,
      actions: [
        {
          label: "View Doctor",
          type: "primary",
          link: "/view-doctors",
        },
        {
          label: "Add Another",
          type: "secondary",
          link: "/add-doctor",
        },
      ],
    }),

  // Scenario 4: Therapy service added
  therapyAdded: (centerId, therapyName, category) =>
    createNotification({
      userId: centerId,
      userType: "centerHead",
      type: "system",
      title: `New Therapy Service Added! 🌿`,
      message: `${therapyName} (${category}) has been successfully added to your services. Patients can now book this therapy.`,
      priority: "medium",
      actionable: true,
      actions: [
        {
          label: "View All Therapies",
          type: "primary",
          link: "/view-therapy",
        },
        {
          label: "Add Another",
          type: "secondary",
          link: "/add-therapy",
        },
      ],
    }),

  // Scenario 5: Therapist onboarded
  therapistAdded: (centerId, therapistName, specialization) =>
    createNotification({
      userId: centerId,
      userType: "centerHead",
      type: "system",
      title: `New Therapist Onboarded! 👨‍⚕️`,
      message: `${therapistName} has been added as a therapist specializing in ${specialization}. They are ready to serve patients.`,
      priority: "medium",
      actionable: true,
      actions: [
        {
          label: "View Therapists",
          type: "primary",
          link: "/view-therapist",
        },
      ],
    }),

  // Scenario 6: Profile updated
  profileUpdated: (centerId, adminName) =>
    createNotification({
      userId: centerId,
      userType: "centerHead",
      type: "system",
      title: `Profile Updated Successfully! ✅`,
      message: `Your center profile has been updated. All changes are now live and visible to patients.`,
      priority: "low",
      actionable: false,
    }),

  // Scenario 7: New appointment request (when you implement appointments)
  newAppointmentRequest: (centerId, patientName, therapyName, date) =>
    createNotification({
      userId: centerId,
      userType: "centerHead",
      type: "appointment",
      title: `New Appointment Request! 📅`,
      message: `${patientName} has requested an appointment for ${therapyName} on ${date}. Please review and confirm.`,
      priority: "high",
      actionable: true,
      actions: [
        {
          label: "View Request",
          type: "primary",
          link: "/center-appointments",
        },
        {
          label: "Approve",
          type: "secondary",
          link: "/approve-appointment",
        },
      ],
    }),

  // Scenario 8: Appointment confirmed
  appointmentConfirmed: (centerId, patientName, therapyName, date) =>
    createNotification({
      userId: centerId,
      userType: "centerHead",
      type: "appointment",
      title: `Appointment Confirmed! ✅`,
      message: `Appointment for ${patientName} (${therapyName}) on ${date} has been confirmed.`,
      priority: "medium",
      actionable: true,
      actions: [
        {
          label: "View Details",
          type: "primary",
          link: "/center-appointments",
        },
      ],
    }),

  // Scenario 9: Appointment cancelled
  appointmentCancelled: (centerId, patientName, therapyName, date, reason) =>
    createNotification({
      userId: centerId,
      userType: "centerHead",
      type: "alert",
      title: `Appointment Cancelled ⚠️`,
      message: `${patientName}'s appointment for ${therapyName} on ${date} has been cancelled. Reason: ${reason}`,
      priority: "medium",
      actionable: true,
      actions: [
        {
          label: "View Schedule",
          type: "primary",
          link: "/center-appointments",
        },
      ],
    }),

  // Scenario 10: Low inventory/capacity alert (future feature)
  lowCapacityAlert: (centerId, therapyName, availableSlots) =>
    createNotification({
      userId: centerId,
      userType: "centerHead",
      type: "alert",
      title: `Low Capacity Alert! ⚠️`,
      message: `${therapyName} has only ${availableSlots} slots remaining for today. Consider adjusting your schedule.`,
      priority: "high",
      actionable: true,
      actions: [
        {
          label: "Manage Schedule",
          type: "primary",
          link: "/view-therapy",
        },
      ],
    }),

  // Scenario 11: Payment received
  paymentReceived: (centerId, patientName, amount, therapyName) =>
    createNotification({
      userId: centerId,
      userType: "centerHead",
      type: "system",
      title: `Payment Received! 💰`,
      message: `Payment of ₹${amount} received from ${patientName} for ${therapyName}.`,
      priority: "low",
      actionable: true,
      actions: [
        {
          label: "View Billing",
          type: "primary",
          link: "/billing",
        },
      ],
    }),

  // Scenario 12: New patient review/rating
  newReview: (centerId, patientName, rating, therapyName) =>
    createNotification({
      userId: centerId,
      userType: "centerHead",
      type: "system",
      title: `New Review Received! ⭐`,
      message: `${patientName} rated ${therapyName} ${rating}/5 stars. Check out their feedback!`,
      priority: "low",
      actionable: true,
      actions: [
        {
          label: "View Reviews",
          type: "primary",
          link: "/center-reviews",
        },
      ],
    }),

  // Scenario 13: Daily summary
  dailySummary: (centerId, appointmentCount, revenue, newPatients) =>
    createNotification({
      userId: centerId,
      userType: "centerHead",
      type: "reminder",
      title: `Daily Summary 📊`,
      message: `Today: ${appointmentCount} appointments, ₹${revenue} revenue, ${newPatients} new patients. Great work!`,
      priority: "low",
      actionable: true,
      actions: [
        {
          label: "View Dashboard",
          type: "primary",
          link: "/dashboard",
        },
      ],
    }),

  // Scenario 14: Upcoming appointment reminder
  upcomingAppointment: (centerId, patientName, therapyName, timeSlot) =>
    createNotification({
      userId: centerId,
      userType: "centerHead",
      type: "reminder",
      title: `Upcoming Appointment Reminder ⏰`,
      message: `${patientName} has an appointment for ${therapyName} at ${timeSlot}. Please be ready.`,
      priority: "medium",
      actionable: true,
      actions: [
        {
          label: "View Details",
          type: "primary",
          link: "/center-appointments",
        },
      ],
    }),
};

module.exports = {
  createNotification,
  NotificationTemplates,
};
