const mongoose = require("mongoose");

const DailyCheckinSchema = new mongoose.Schema({
  wellnessScore: Number,
  mood: String,
  notes: String,
  symptoms: [String],
  date: { type: Date, default: Date.now },
});

const PatientProgressSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },

  // Stores all daily check-ins
  dailyCheckins: [DailyCheckinSchema],

  // This can be auto-calculated or updated by doctor/admin
  currentTherapy: { type: Object, default: {} },
  sessionHistory: { type: Array, default: [] },
  upcomingSessions: { type: Array, default: [] },
  doshaBalance: { type: Object, default: {} },
  healthMetrics: { type: Object, default: {} },
  weeklyProgress: { type: Array, default: [] },
  medications: { type: Array, default: [] },
  dietAdherence: { type: Object, default: {} },
  milestones: { type: Array, default: [] },
  notifications: { type: Array, default: [] },
  overallStats: { type: Object, default: {} },

  lastUpdated: { type: Date, default: Date.now },
});

module.exports = mongoose.model("PatientProgress", PatientProgressSchema);
