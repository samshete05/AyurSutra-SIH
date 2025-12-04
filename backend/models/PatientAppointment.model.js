// models/PatientAppointment.js
const mongoose = require("mongoose");

const patientAppointmentSchema = new mongoose.Schema(
  {
    // Booking Identification
    bookingId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    tokenNumber: {
      type: String,
      required: true,
      index: true,
    },

    // References
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
      index: true,
    },

    centerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Center",
      required: true,
      index: true,
    },

    centerName: {
      type: String,
      required: true,
    },

    // Patient Details (captured during booking)
    patientDetails: {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
      },
      phone: {
        type: String,
        required: true,
        validate: {
          validator: function (v) {
            return /^\d{10}$/.test(v);
          },
          message: "Phone must be 10 digits",
        },
      },
      age: {
        type: Number,
        required: true,
        min: 1,
        max: 120,
      },
      gender: {
        type: String,
        required: true,
        enum: ["male", "female", "other"],
      },
    },

    // Appointment Scheduling
    appointmentDate: {
      type: Date,
      required: true,
      index: true,
    },

    appointmentSlot: {
      type: String,
      required: true,
      enum: ["morning", "evening"],
    },

    slotDetails: {
      startTime: { type: String, required: true },
      endTime: { type: String, required: true },
    },

    // Service Information
    serviceType: {
      type: String,
      required: true,
      default: "general",
      enum: ["general", "therapy", "consultation"],
    },

    notes: {
      type: String,
      maxlength: 500,
    },

    // Payment Details
    tokenAmount: {
      type: Number,
      required: true,
    },

    paymentStatus: {
      type: String,
      required: true,
      enum: ["pending", "paid", "refunded", "failed"],
      default: "paid",
      index: true,
    },

    paymentId: String,
    paymentDate: {
      type: Date,
      default: Date.now,
    },

    // Status Tracking
    status: {
      type: String,
      required: true,
      enum: [
        "scheduled",
        "confirmed",
        "checked-in",
        "in-progress",
        "completed",
        "cancelled",
        "no-show",
      ],
      default: "scheduled",
      index: true,
    },

    // Email Verification
    emailVerified: {
      type: Boolean,
      default: false,
    },

    // Check-in
    checkInTime: Date,
    checkInBy: String,

    // Completion
    completionTime: Date,
    consultedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
    },

    // Cancellation
    cancellationReason: String,
    cancelledAt: Date,
    cancelledBy: {
      type: String,
      enum: ["patient", "center", "admin"],
    },

    // Refund
    refundStatus: {
      type: String,
      enum: ["not-applicable", "pending", "processed", "failed"],
      default: "not-applicable",
    },
    refundAmount: Number,
    refundDate: Date,

    // Notifications
    notifications: {
      smsConfirmationSent: { type: Boolean, default: false },
      emailConfirmationSent: { type: Boolean, default: false },
      reminderSent: { type: Boolean, default: false },
    },

    // Metadata
    bookingSource: {
      type: String,
      default: "web",
      enum: ["web", "mobile", "phone", "walk-in"],
    },
  },
  {
    timestamps: true,
  }
);

// Compound Indexes for efficient queries
patientAppointmentSchema.index({
  centerId: 1,
  appointmentDate: 1,
  appointmentSlot: 1,
});
patientAppointmentSchema.index({ patientId: 1, appointmentDate: -1 });
patientAppointmentSchema.index({ appointmentDate: 1, status: 1 });

// Generate booking ID before saving
patientAppointmentSchema.pre("save", function (next) {
  if (!this.bookingId) {
    this.bookingId = `BKG${Date.now().toString().slice(-6)}`;
  }
  next();
});

// Check if cancellation is allowed (24 hours before)
patientAppointmentSchema.methods.canCancel = function () {
  const twentyFourHoursFromNow = new Date(Date.now() + 24 * 60 * 60 * 1000);
  return (
    this.appointmentDate > twentyFourHoursFromNow &&
    ["scheduled", "confirmed"].includes(this.status)
  );
};

// Cancel appointment method
patientAppointmentSchema.methods.cancelAppointment = function (
  reason,
  cancelledBy = "patient"
) {
  this.status = "cancelled";
  this.cancellationReason = reason;
  this.cancelledAt = new Date();
  this.cancelledBy = cancelledBy;

  // Check if refund is applicable
  const twentyFourHoursBefore = new Date(
    this.appointmentDate.getTime() - 24 * 60 * 60 * 1000
  );
  if (new Date() < twentyFourHoursBefore) {
    this.refundStatus = "pending";
    this.refundAmount = this.tokenAmount;
  }

  return this.save();
};

const PatientAppointment = mongoose.model(
  "PatientAppointment",
  patientAppointmentSchema
);

module.exports = PatientAppointment;
