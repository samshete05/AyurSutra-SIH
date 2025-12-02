const mongoose = require("mongoose");
const schema = mongoose.Schema;



const otpSchema = new schema({
  email: {
    type: String,
    required: true
  },
  otp: {
    type: String
  },
  createdAt: {
    type: Date,
    expires: '5m',
    default: Date.now
  }
});


module.exports = mongoose.model("Otp",otpSchema); 