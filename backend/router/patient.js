const express=require("express");
const patientRouter=express.Router();

const z =require('zod');
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const { patientModel, otpmodel } = require("../db/db");
const JWT_KEY=process.env.JWT_KEY;
const otpgenerator=require("otp-generator");
const sendemail=require("../otplogic/otp");




patientRouter.post("/register", async function(req,res){
     const requiredatas=z.object({
        name:z.string().min(3).max(100),
        mobileNo:z.string().min(10).max(10),
        email:z.string().min(5).max(100),
        password:z.string().min(5).max(100)
     })

     const checkdata=requiredatas.safeParse(req.body);


     if(!checkdata.success){
        res.status(422).send("Invalid Input types");
        return;
    }

     const {name,mobileNo,email,password}=req.body;
     console.log(req);
     const hashedpassword=await bcrypt.hash(password,5);
     console.log(name);
     console.log(mobileNo);
     console.log(email);
     console.log(password);

   
     const checkAlreadyEmailExistOrNot=await patientModel.findOne({
        email:email
     })

     console.log("check error  s ",checkAlreadyEmailExistOrNot);

     if(checkAlreadyEmailExistOrNot){
        res.json({
            message:"Email_Present"
        })
        return;
     }

     const registerUser=await patientModel.create({
          name:name,
          mobileNo:mobileNo,
          password:hashedpassword,
          email:email
     })


      const otp=otpgenerator.generate(6,{
        digits:true,upperCaseAlphabets:false,specialChars:false,lowerCaseAlphabets:false
     })

        const response=await otpmodel.create({
            email:email,
            otp:otp
        })

     await sendemail(registerUser.email,"Email verification code:",otp);
               
     res.json({
        message:"OTP_Send",
        email:email
     })

})


 patientRouter.post("/verifyOTP",async(req,res)=>{
             const {email,otp}=req.body;

             
             console.log("backend otp worksing")
             console.log(req.body);
             console.log(email);
             console.log(otp);

             const FindPatientFromDB=await patientModel.findOne({
                email:email
             })

             if(!FindPatientFromDB){
                res.json({
                 message:"User_not_exist"
                })
                return;
              }

             const FindPatientWithOTP=await otpmodel.findOne({
               otp:otp
             })

             if(!FindPatientWithOTP){
               res.json({
                message:"INVALID_OTP"
               })
               return;
             }
             const verifyPatientTrue=await patientModel.updateOne({
                  email:email,
                  verified:true
             })

             await otpmodel.findByIdAndDelete({
                _id:FindPatientWithOTP._id
             })

             res.json({
                message:"Verified_otp"
             })
 })




 module.exports={
 patientRouter:patientRouter
        }