const mongoose = require("mongoose");

const TherapySchema = new mongoose.Schema({
  centerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PanchakarmaCenter",
    required: true,
  },

  therapyName: {
    type: String,
    required: true,
    trim: true,
  },

  duration: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
    min: 0,
  },

  category: {
    type: String,
    required: true,
  },

  maxPatientsPerDay: {
    type: Number,
    required: true,
    min: 1,
  },

  description: {
    type: String,
    maxlength: 2000,
    required: true
  },
  TherapyImg:String,
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("Therapy", TherapySchema);
