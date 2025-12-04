const mongoose=require("mongoose");

const CenterAppointMentSchema=new mongoose.Schema({
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
            required:true,  
        }
})

module.exports = mongoose.model("CenterAppointment", CenterAppointMentSchema);


