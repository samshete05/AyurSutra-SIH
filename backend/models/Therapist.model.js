const mongoose = require("mongoose");

const TherapistSchema = new mongoose.Schema({
  centerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PanchakarmaCenter",
    required: true,             // therapist belongs to a center
  },

  fullName: {
    type: String,
    required: true,
    trim: true,
  },

  phone: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    unique: true,
    sparse: true,               // unique but optional
  },

  specialization: {
    type: String,
    required: true,
  },

  experience: {
    type: Number,
    min: 0,
  },

  qualification: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("Therapist", TherapistSchema);
