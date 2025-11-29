const mongoose = require("mongoose");
const schema = mongoose.Schema;



const otpSchema = new schema({
    email:{
        ref:"users",
        type:String,
        required:true
    },
    otp:{
        type:String,
        unique:true
    },
    createdAt: { type: Date, expires: '5m', default: Date.now }
})

module.exports.OtpModel = mongoose.model("Otp",otpSchema); 