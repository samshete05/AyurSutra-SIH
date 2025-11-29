const express = require("express");
const doctorRouter = express.Router();

const z = require('zod');
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const doctorModel = require("../models/Doctor.model");



doctorRouter.post("/login", async function(req,res){
    const requiredatas=z.object({
        email:z.string().min(3).max(100).email(),
        password:z.string().min(5).max(100)
    })

    const checkdata=requiredatas.safeParse(req.body);
    if(!checkdata.success){
       res.json({
           message:checkdata.error,
       })
       return;
    }

    const {email,password} =req.body;
    console.log("login in bac",email)
    console.log("login in bac",password)

    const checkedUser=await doctorModel.findOne({
       email:email
    })

    if(!checkedUser){
        res.json({
            message:"User_not_exists"
        })
        return;
    }

    const finduser= await bcrypt.compare(password,checkedUser.password);
    
    if(finduser){
        const token=jwt.sign({
            id:checkedUser._id
        },JWT_KEY)
        res.json({
            token:token,
            message:"logedin"
        })
    }else{
        res.json({
            message:"User_not_exists"
        })
        return;
    }  
    console.log("end")         
})

// *************************** FORGET PASSWORD ********************************
// STEP 1 : Doctor requests password reset (send OTP to email)
doctorRouter.post("/forgetPassword", async (req, res) => {
  try {
    const schema = z.object({
      email: z.string().email().min(5).max(100),
    });

    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      res.status(422).json({ message: "Invalid_Input" });
      return;
    }

    const { email } = parsed.data;

    const doctor = await doctorModel.findOne({ email });
    if (!doctor) {
      res.json({ message: "User_not_exist" });
      return;
    }

    // remove old OTPs
    await otpmodel.deleteMany({ email });

    const otp = otpgenerator.generate(6, {
      digits: true,
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    await otpmodel.create({ email, otp });

    await sendemail(email, "AyurSutra doctor password reset code:", otp);

    res.json({ message: "Reset_OTP_Sent", email });
  } catch (err) {
    console.error("Error in /doctor/forgetPassword:", err);
    res.status(500).json({ message: "Server_error" });
  }
});

// *************************** VERIFY RESET OTP ********************************
// STEP 2 : Doctor verifies reset OTP
doctorRouter.post("/verifyResetOTP", async (req, res) => {
  try {
    const schema = z.object({
      email: z.string().email().min(5).max(100),
      otp: z.string().min(4).max(10),
    });

    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      res.status(422).json({ message: "Invalid_Input" });
      return;
    }

    const { email, otp } = parsed.data;

    const doctor = await doctorModel.findOne({ email });
    if (!doctor) {
      res.json({ message: "User_not_exist" });
      return;
    }

    const otpDoc = await otpmodel.findOne({ email, otp });
    if (!otpDoc) {
      res.json({ message: "INVALID_OTP" });
      return;
    }

    res.json({ message: "Reset_OTP_Verified" });
  } catch (err) {
    console.error("Error in /doctor/verifyResetOTP:", err);
    res.status(500).json({ message: "Server_error" });
  }
});

// *************************** RESET PASSWORD ********************************
// STEP 3 : Doctor sets new password (after OTP)
doctorRouter.post("/resetPassword", async (req, res) => {
  try {
    const schema = z.object({
      email: z.string().email().min(5).max(100),
      otp: z.string().min(4).max(10),
      newPassword: z.string().min(5).max(100),
      confirmPassword: z.string().min(5).max(100),
    });

    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      res.status(422).json({ message: "Invalid_Input" });
      return;
    }

    const { email, otp, newPassword, confirmPassword } = parsed.data;

    if (newPassword !== confirmPassword) {
      res.json({ message: "Password_Mismatch" });
      return;
    }

    const doctor = await doctorModel.findOne({ email });
    if (!doctor) {
      res.json({ message: "User_not_exist" });
      return;
    }

    const otpDoc = await otpmodel.findOne({ email, otp });
    if (!otpDoc) {
      res.json({ message: "INVALID_OTP" });
      return;
    }

    const hashed = await bcrypt.hash(newPassword, 5);

    await doctorModel.updateOne(
      { email },
      { $set: { password: hashed } }
    );

    await otpmodel.deleteMany({ email });

    res.json({ message: "Password_Reset_Success" });
  } catch (err) {
    console.error("Error in /doctor/resetPassword:", err);
    res.status(500).json({ message: "Server_error" });
  }
});




// *************************** LOGOUT ********************************
doctorRouter.post("/logout",async(req,res)=>{
    res.clearCookie("uidcookie", {
        httpOnly: false,  // Ensures the cookie cannot be accessed via JavaScript
        secure: true,    // Ensures the cookie is only sent over HTTPS
    });
    res.status(200).json({
        message:"loggedout"
    })
})



module.exports={
    doctorRouter:doctorRouter
}