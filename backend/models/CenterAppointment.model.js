const mongoose = require("mongoose");

const CenterAppointmentSchema = new mongoose.Schema(
  {
    // ============ BOOKING IDENTIFICATION ============
    bookingId: {
      type: String,
      unique: true,
      sparse: true, // Allows null initially, but unique when present
    },
    tokenNumber: {
      type: String,
      index: true,
    },

    // ============ REFERENCES ============
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
      index: true,
    },
    CenterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PanchakarmaCenter", // Keep your existing ref name
      required: true,
      index: true,
    },
    TherapyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Therapy",
      required: false,
    },

    // ============ APPOINTMENT TIMING ============
    appointmentDate: {
      type: Date,
      required: true,
      index: true,
    },
    appointmentSlot: {
      type: String,
      enum: ["morning", "evening"],
      required: true,
    },
    slotDetails: {
      startTime: String,
      endTime: String,
    },

    // ============ SERVICE INFORMATION ============
    ServiceType: {
      type: String,
      default: "general",
    },

    // ============ PATIENT DETAILS (For Quick Access) ============
    PatientName: {
      type: String,
      required: true,
    },
    PatientPhone: {
      type: String,
      required: true,
    },
    PatientAge: {
      type: String,
      required: true,
    },
    PatientGender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },
    patientEmail: {
      type: String,
    },

    // ============ CENTER INFO ============
    centerName: String, // Store center name for quick access

    // ============ PAYMENT & TOKEN ============
    Amount: {
      type: String,
      default: "0",
    },
    PaymentStatus: {
      type: String,
      enum: ["pending", "paid", "refunded", "failed"],
      default: "pending",
    },

    // ============ STATUS ============
    status: {
      type: String,
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

    // ============ NOTES & CANCELLATION ============
    notes: String,
    cancellationReason: String,
    cancelledBy: {
      type: String,
      enum: ["patient", "center", "admin"],
    },
    cancelledAt: Date,

    // ============ REFUND ============
    refundStatus: {
      type: String,
      enum: ["not-applicable", "pending", "processed", "failed"],
      default: "not-applicable",
    },
    refundAmount: String,
    refundDate: Date,

    // ============ VERIFICATION ============
    isPhoneVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Auto-adds createdAt and updatedAt
  }
);

// ============ INDEXES FOR PERFORMANCE ============
CenterAppointmentSchema.index({
  CenterId: 1,
  appointmentDate: 1,
  appointmentSlot: 1,
});
CenterAppointmentSchema.index({ patientId: 1, appointmentDate: -1 });

// ============ METHODS ============
// Generate booking ID before first save
CenterAppointmentSchema.pre("save", function (next) {
  if (!this.bookingId && !this.isNew) {
    // Generate on first save only
    next();
  } else if (!this.bookingId) {
    this.bookingId = `BKG${Date.now().toString().slice(-6)}${Math.floor(
      Math.random() * 100
    )}`;
  }
  next();
});

// Check if cancellation is allowed (24 hours before)
CenterAppointmentSchema.methods.canCancel = function () {
  const twentyFourHoursFromNow = new Date(Date.now() + 24 * 60 * 60 * 1000);
  return (
    this.appointmentDate > twentyFourHoursFromNow &&
    ["scheduled", "confirmed"].includes(this.status)
  );
};

// Cancel appointment method
CenterAppointmentSchema.methods.cancelAppointment = async function (
  reason,
  cancelledBy = "patient"
) {
  this.status = "cancelled";
  this.cancellationReason = reason;
  this.cancelledAt = new Date();
  this.cancelledBy = cancelledBy;

  // Refund logic
  const twentyFourHoursBefore = new Date(
    this.appointmentDate.getTime() - 24 * 60 * 60 * 1000
  );
  if (
    new Date() < twentyFourHoursBefore &&
    this.Amount &&
    this.Amount !== "0"
  ) {
    this.refundStatus = "pending";
    this.refundAmount = this.Amount;
  }

  return await this.save();
};

module.exports = mongoose.model(
  "CenterGeneralAppointment",
  CenterAppointmentSchema
);
