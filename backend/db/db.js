const mongoose=require("mongoose");

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


const patientModel=mongoose.model("Patient",patientSchema);
const otpmodel=mongoose.model("Otp",otpSchema);


module.exports={
    patientModel:patientModel,
    otpmodel:otpmodel
}