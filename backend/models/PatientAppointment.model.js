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
      // Format: BKG123456
    },

    tokenNumber: {
      type: String,
      required: true,
      index: true,
      // Format: T-001, T-002, etc.
    },

    // Center Reference
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

    // Patient Information (from booking form)
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
        index: true,
      },
      phone: {
        type: String,
        required: true,
        validate: {
          validator: function (v) {
            return /^\d{10}$/.test(v);
          },
          message: (props) =>
            `${props.value} is not a valid 10-digit phone number!`,
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

    // If patient is registered user (optional)
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true,
    },

    // Appointment Scheduling Details
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
      startTime: String, // e.g., "09:00 AM"
      endTime: String, // e.g., "01:00 PM"
    },

    // Service Type
    serviceType: {
      type: String,
      required: true,
      default: "general",
      enum: ["general", "therapy", "consultation", "follow-up"],
    },

    // Payment & Token Details
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

    paymentId: {
      type: String,
    },

    paymentDate: {
      type: Date,
      default: Date.now,
    },

    // Appointment Status
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

    // Additional Information
    notes: {
      type: String,
      maxlength: 500,
    },

    // Email Verification (from Step 2)
    emailVerified: {
      type: Boolean,
      default: false,
    },

    // Check-in Details
    checkInTime: {
      type: Date,
    },

    checkInBy: {
      type: String, // Staff member who checked in
    },

    // Completion Details
    completionTime: {
      type: Date,
    },

    consultedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor", // If you have a Doctor model
    },

    // Cancellation Details
    cancellationReason: {
      type: String,
    },

    cancelledAt: {
      type: Date,
    },

    cancelledBy: {
      type: String, // 'patient' or 'center'
    },

    // Refund Details
    refundStatus: {
      type: String,
      enum: ["not-applicable", "pending", "processed", "failed"],
      default: "not-applicable",
    },

    refundAmount: {
      type: Number,
    },

    refundDate: {
      type: Date,
    },

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
    timestamps: true, // Adds createdAt and updatedAt
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes for efficient querying [web:2][web:10]
patientAppointmentSchema.index({
  centerId: 1,
  appointmentDate: 1,
  appointmentSlot: 1,
});
patientAppointmentSchema.index({
  "patientDetails.email": 1,
  appointmentDate: 1,
});
patientAppointmentSchema.index({ userId: 1, status: 1 });
patientAppointmentSchema.index({ appointmentDate: 1, status: 1 });
patientAppointmentSchema.index({ createdAt: 1 }); // For sorting by booking time

// Virtual for formatted appointment date
patientAppointmentSchema.virtual("formattedAppointmentDate").get(function () {
  return this.appointmentDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
});

// Virtual for checking if appointment is upcoming
patientAppointmentSchema.virtual("isUpcoming").get(function () {
  return this.appointmentDate > new Date() && this.status === "scheduled";
});

// Virtual for checking if cancellation is allowed (24 hours before)
patientAppointmentSchema.virtual("canCancel").get(function () {
  const twentyFourHoursFromNow = new Date(Date.now() + 24 * 60 * 60 * 1000);
  return (
    this.appointmentDate > twentyFourHoursFromNow &&
    ["scheduled", "confirmed"].includes(this.status)
  );
});

// Pre-save middleware: Generate booking ID if not provided
patientAppointmentSchema.pre("save", function (next) {
  if (!this.bookingId) {
    this.bookingId = `BKG${Date.now().toString().slice(-6)}`;
  }
  next();
});

// Method to cancel appointment
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

// Method to check-in patient
patientAppointmentSchema.methods.checkIn = function (staffMember) {
  this.status = "checked-in";
  this.checkInTime = new Date();
  this.checkInBy = staffMember;
  return this.save();
};

// Static method to get appointments for a patient by email
patientAppointmentSchema.statics.getPatientAppointments = function (
  email,
  filters = {}
) {
  const query = { "patientDetails.email": email, ...filters };
  return this.find(query)
    .populate("centerId", "name address phone")
    .sort({ appointmentDate: -1 });
};

// Static method to get appointments for a center on a specific date and slot
patientAppointmentSchema.statics.getSlotAppointments = function (
  centerId,
  date,
  slot
) {
  return this.find({
    centerId,
    appointmentDate: {
      $gte: new Date(date).setHours(0, 0, 0, 0),
      $lt: new Date(date).setHours(23, 59, 59, 999),
    },
    appointmentSlot: slot,
    status: { $in: ["scheduled", "confirmed", "checked-in"] },
  }).countDocuments();
};

const PatientAppointment = mongoose.model(
  "PatientAppointment",
  patientAppointmentSchema
);

module.exports = PatientAppointment;
