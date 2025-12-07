const mongoose = require("mongoose");
const  Schema  = mongoose.Schema;

// -------- SUB SCHEMAS ---------

const symptomSchema = new Schema(
  {
    severity: { type: Number, min: 0, max: 10, default: 0 },
    notes: { type: String, maxlength: 400, trim: true },
    completed: { type: Boolean, default: false },
  },
  { _id: false }
);

const moodSchema = new Schema(
  {
    mood: {
      type: String,
      enum: ["very_sad", "sad", "neutral", "happy", "very_happy"],
      default: "neutral",
    },
    stressLevel: { type: Number, min: 0, max: 10, default: 0 },
    completed: { type: Boolean, default: false },
  },
  { _id: false }
);

const sleepSchema = new Schema(
  {
    hours: { type: Number, min: 0, max: 24, default: 0 },
    quality: { type: Number, min: 1, max: 5, default: 3 },
    completed: { type: Boolean, default: false },
  },
  { _id: false }
);

const waterSchema = new Schema(
  {
    glasses: { type: Number, min: 0, max: 40, default: 0 },
    target: { type: Number, min: 1, max: 40, default: 8 },
    completed: { type: Boolean, default: false },
  },
  { _id: false }
);

const medicationSchema = new Schema(
  {
    taken: { type: Boolean, default: false },
    missedDoses: { type: Number, min: 0, default: 0 },
    completed: { type: Boolean, default: false },
  },
  { _id: false }
);

const activitySchema = new Schema(
  {
    steps: { type: Number, min: 0, default: 0 },
    exerciseMinutes: { type: Number, min: 0, default: 0 },
    activityLevel: {
      type: String,
      enum: ["sedentary", "light", "moderate", "active", "very_active"],
      default: "sedentary",
    },
    completed: { type: Boolean, default: false },
  },
  { _id: false }
);

// -------- MAIN DAILY PROGRESS DOCUMENT ---------

const patientProgressSchema = new Schema(
  {
    patientId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    date: {
      type: Date,
      required: true,
    },

    symptom: symptomSchema,
    mood: moodSchema,
    sleep: sleepSchema,
    water: waterSchema,
    medication: medicationSchema,
    activity: activitySchema,

    dailyHealthScore: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },

    insightTags: [{ type: String, trim: true }],

    allTasksCompleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// One document per user per day
patientProgressSchema.index({ patientId: 1, date: 1 }, { unique: true });

const PatientProgress = mongoose.model(
  "PatientProgress",
  patientProgressSchema
);

module.exports =  PatientProgress;