const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  status: {
    type: String,
    enum: ["present", "absent", "not_marked"],
    default: "not_marked",
  },
  notes: { type: String, default: "" },
});

const therapyProgressSchema = new mongoose.Schema(
  {
    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CenterAppointment",
      required: true,
    },
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    centerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PanchakarmaCenter",
      required: true,
    },
    therapyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Therapy",
      required: true,
    },

    attendance: [attendanceSchema],

    streakCount: { type: Number, default: 0 },

    milestones: {
      sevenDays: { type: Boolean, default: false },
      fifteenDays: { type: Boolean, default: false },
      thirtyDays: { type: Boolean, default: false },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TherapyProgress", therapyProgressSchema);
