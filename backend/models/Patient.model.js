const mongoose = require("mongoose");
const schema = mongoose.Schema;

const patientSchema = new schema({
    email:{
        type:String,unique:true
    },
    password:String,
    firstname:String,
    lastname:String,
    verified:{
        type:Boolean,
        default:false
    }
})

module.exports.patientModel = mongoose.model("Patient",patientSchema);