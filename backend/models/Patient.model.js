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

  // Personal Info Fields
  dateOfBirth: String,
  gender: String,
  bloodGroup: String,
  maritalStatus: String,
  occupation: String,
  address: String,
  city: String,
  state: String,
  pincode: String,
  country: {
    type: String,
    default: "India",
  },

  // Medical History Fields
  height: String,
  weight: String,
  bmi: String,
  allergies: [String],
  chronicConditions: [String],
  currentMedications: [String],
  smokingStatus: {
    type: String,
    default: "Non-smoker",
  },
  alcoholConsumption: {
    type: String,
    default: "Never",
  },
  exerciseFrequency: String,
  dietaryPreferences: {
    type: String,
    default: "Vegetarian",
  },

  // Ayurveda Profile Fields
  constitution: String,
  primaryDosha: String,
  secondaryDosha: String,
  prakriti: String,
  currentImbalance: String,
  preferredTreatments: [String],

  // Emergency Contact Fields
  emergencyContact: {
    contactName: String,
    relationship: String,
    contactPhone: String,
    contactEmail: String,
    alternateContactName: String,
    alternateRelationship: String,
    alternatePhone: String,
  },

  // Settings Fields
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
      default: 100,
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
