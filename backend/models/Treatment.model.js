const mongoose = require("mongoose");

const treatmentSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
    },
    centerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Center",
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
    },
    treatmentName: String,
    startDate: Date,
    endDate: Date,
    status: {
      type: String,
      enum: ["ongoing", "completed", "paused"],
      default: "ongoing",
    },
    medications: [
      {
        name: String,
        dosage: String,
        frequency: String,
      },
    ],
    procedures: [
      {
        name: String,
        date: Date,
        notes: String,
      },
    ],
    progress: [
      {
        date: Date,
        notes: String,
        doctorId: mongoose.Schema.Types.ObjectId,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Treatment", treatmentSchema);
