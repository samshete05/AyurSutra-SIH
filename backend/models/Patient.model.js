const mongoose = require("mongoose");
const schema = mongoose.Schema;

const patientSchema = new schema({
    role:{
        type:String,
    default:"patient" 
    },
    email:{
        type:String,unique:true
    },
    password:String,
    name:String,
    verified:{
        type:Boolean,
        default:false
    },
    mobileNo:String,
    ProfileImg:String
})

module.exports = mongoose.model("Patient", patientSchema);
