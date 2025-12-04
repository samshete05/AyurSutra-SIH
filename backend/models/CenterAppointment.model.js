const mongoose=require("mongoose");

const CenterAppointMentSchema=new mongoose.Schema({
       ServiceType:String,
        patientId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Patient",
            required:true,
        },
        Amount:String,
        PaymentStatus:String,
        TherapyId:{
             type:mongoose.Schema.Types.ObjectId,
            ref:"Therapy",
            required:false,  
        },
        PatientName:String,
        PatientPhone:String,
        PatientAge:String,
        PatientGender:String,
        notes:String,
        CenterId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"PanchakarmaCenter",
            required:true,   
        }
})

module.exports = mongoose.model("CenterGeneralAppointment", CenterAppointMentSchema);


