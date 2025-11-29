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

export const patientModel=mongoose.model("Patient",patientSchema);