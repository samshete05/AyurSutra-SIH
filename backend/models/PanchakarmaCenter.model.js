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
  address:{type:String},
  latitude: { type: Number },
  longitude: { type: Number },

  MobileNo: { type: String, required: true },

  BotNumber: { type: String },

  profileImg: { type: String, default: null },

  verified: {
    type: Boolean,
    default: false,
  },
  rating:String,
  // Store doctor references
  Doctors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
    },
  ],

  GeneralAppointment:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"CenterGeneralAppointment"
    }
  ],
  // Last Login date
  lastLoginDate: {
    type: Date,
    default: null,
  },
});

module.exports = mongoose.model("PanchakarmaCenter", PanchakarmaCenterSchema);
