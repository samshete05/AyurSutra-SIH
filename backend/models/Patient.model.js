const mongoose = require("mongoose");
const schema = mongoose.Schema;

const patientSchema = new schema({
  role: {
    type: String,
    default: "patient",
  },
  email: {
    type: String,
    unique: true,
  },
  password: String,
  name: String,
  verified: {
    type: Boolean,
    default: false,
  },
  mobileNo: String,
  ProfileImg: String,

  // New Settings Fields
  settings: {
    darkMode: {
      type: Boolean,
      default: false,
    },
    language: {
      type: String,
      default: "english",
      enum: [
        "english",
        "hindi",
        "tamil",
        "telugu",
        "kannada",
        "malayalam",
        "bengali",
        "marathi",
      ],
    },
    textSize: {
      type: Number,
      default: 100, // percentage
      min: 80,
      max: 120,
    },
    timezone: {
      type: String,
      default: "ist",
    },
    dateFormat: {
      type: String,
      default: "DD/MM/YYYY",
      enum: ["DD/MM/YYYY", "MM/DD/YYYY", "YYYY-MM-DD"],
    },
  },
});

module.exports = mongoose.model("Patient", patientSchema);
