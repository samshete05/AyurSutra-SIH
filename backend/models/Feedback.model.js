// models/Feedback.model.js
const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  therapySessionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "therapysessions",
    required: true,
  },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "patients",
    required: true,
  },
  centerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "panchkarmacenters",
    required: true,
  },
  doctorName: {
    type: String,
    required: true,
  },

  // Therapy feedback
  therapyRating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  therapyComment: {
    type: String,
    default: "",
  },

  // Center feedback
  centerRating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  centerComment: {
    type: String,
    default: "",
  },

  // Doctor feedback
  doctorRating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  doctorComment: {
    type: String,
    default: "",
  },

  // Overall
  overallRating: {
    type: Number,
    required: true,
  },

  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("feedbacks", feedbackSchema);
