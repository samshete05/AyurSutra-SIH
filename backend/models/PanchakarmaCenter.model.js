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

  // location: { type: String },
  // address:{type:String},
  // latitude: { type: Number },

  // WORKING HOURS - NEW FIELDS
  morningOpenTime: { type: String, default: "09:00" },
  morningCloseTime: { type: String, default: "01:00" },
  eveningOpenTime: { type: String, default: "04:00" },
  eveningCloseTime: { type: String, default: "08:00" },
  onTime: { type: String, default: "09:00" },
  offTime: { type: String, default: "08:00" },

  longitude: { type: Number },

  MobileNo: { type: String, required: true },

  BotNumber: { type: String },

  profileImg: { type: String, default: null },

  verified: {
    type: Boolean,
    default: false,
  },
  rating: String,
  // Store doctor references
  Doctors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
    },
  ],

  GeneralAppointment: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CenterGeneralAppointment",
    },
  ],

  centerImages: [
    {
      type: String, // Cloudinary/Multer URLs
      required: false,
    },
  ],
  mainAddress: { type: String, required: false },
  city: { type: String, required: false },
  locationUrl: { type: String, required: false },

  // Last Login date
  lastLoginDate: {
    type: Date,
    default: null,
  },
});

module.exports = mongoose.model("PanchakarmaCenter", PanchakarmaCenterSchema);
