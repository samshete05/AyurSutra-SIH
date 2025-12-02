const mongoose = require("mongoose");
const schema = mongoose.Schema;

const PanchakarmaCenterSchema = new schema({
  role: {
    type: String,
    default: "centerHead",
  },

  Adminname: String,
  CenterName: String,
  licenseNo: String,
  password: String,

  email: {
    type: String,
    unique: true,
  },

  location: { type: String },
  latitude: { type: Number },
  longitude: { type: Number },

  MobileNo: { type: String, required: true },

  BotNumber: { type: String },

  verified: {
    type: Boolean,
    default: false,
  },

  // Store doctor references
  Doctors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
    }
  ],
});

module.exports = mongoose.model("PanchakarmaCenter", PanchakarmaCenterSchema);
