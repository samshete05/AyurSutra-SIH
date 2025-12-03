const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema({
  centerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PanchakarmaCenter",
    required: true,
  },

  fullName: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  phone: {
    type: String,
    required: true,
  },

  speciality: {
    type: String,
    required: true,
  },

  experience: {
    type: Number,
    required: true,
    min: 0,
  },

  consultationFee: {
    type: Number,
    required: true,
    min: 0,
  },

  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: true,
  },

  degree: {
    type: String,
    required: true,
  },

  licenseNo: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    enum: ["Active", "Inactive"],
    default: "Active",
  },
  profileImg:String,
  bio: {
    type: String,
    maxlength: 1000,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("Doctor", DoctorSchema);
