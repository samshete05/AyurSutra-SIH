const mongoose=require("mongoose");
const { Center } = require("../../frontend/src/pages/center");

const schema=mongoose.Schema;

mongoose.connect(process.env.MONGO_URL);


const patientSchema=new schema({
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

const otpSchema=new schema({
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


const PanchakarmaCenterSchema=new schema({
    AdminName:String,
    Centername:String,
    MobileNo:String,
    licenseNo:String,
    AdminEmail:{
        type:String,unique:true
    },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  Password:String,
  BotNumber:String
})


const patientModel=mongoose.model("Patient",patientSchema);
const otpmodel=mongoose.model("Otp",otpSchema);
const PanchkarmaModel=mongoose.model("PanchkarmaCenter",PanchakarmaCenterSchema);


module.exports={
    patientModel:patientModel,
    otpmodel:otpmodel,
    PanchkarmaModel:PanchkarmaModel
}