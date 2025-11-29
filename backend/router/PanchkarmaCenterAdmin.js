const express = require("express");

const PanchakarmaCenterRouter = express.Router();

const z = require('zod');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PanchkarmaModel } = require("../db/db");

const JWT_KEY = process.env.JWT_KEY;
const otpgenerator = require("otp-generator");
const sendemail = require("../otplogic/otp");



PanchakarmaCenterRouter.post("/register", async (req, res) => {
    const requireData = z.object({
        Adminname: z.string().min(3).max(100),
        mobileNo: z.string().min(10).max(10),
        AdminEmail: z.string().min(5).max(100),
        CenterName: z.string().min().max(100),
        LicenseNo: z.string().min(5).max(100),
        password: z.string().min(5).max(100),
        confirmPassword: z.string().min(5).max(100),
        BotNumber:z.string().min(5).max(100)
    })


    const checkdata = requiredatas.safeParse(req.body);

    if (!checkdata.success) {
        res.status(422).send("Invalid Input types");
        return;
    }

    const { Adminname, mobileNo, AdminEmail, CenterName, LicenseNo, password, confirmPassword,
        Centerlattitude, Centerlongitude , BotNumber
    } = req.body;

    if (confirmPassword != password) {
        res.json({
            message: "both password Not Matched!!"
        })
        return;
    }

    const checkAlreadyEmailExistOrNot = await PanchkarmaModel.findOne({
        AdminEmail: AdminEmail
    })

    console.log("check error  s ", checkAlreadyEmailExistOrNot);

    if (checkAlreadyEmailExistOrNot) {
        res.json({
            message: "Admin_Email_Already_Present"
        })
        return;
    }

    const hashedpassword = await bcrypt.hash(password, 5);

    const centerCreate = await PanchkarmaModel.create({
        Centername: CenterName,
        licenseNo: LicenseNo,
        AdminEmail: AdminEmail,
        lattitude: Centerlattitude,
        longitude: Centerlongitude,
        AdminName: Adminname,
        MobileNo: mobileNo,
        Password: hashedpassword,
        BotNumber:BotNumber
    })



    const otp = otpgenerator.generate(6, {
        digits: true, upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false
    })

    const response = await otpmodel.create({
        email: email,
        otp: otp
    })

    await sendemail(registerUser.email, "Email verification code:", otp);

    res.json({
        message: "OTP_Send",
        email: email
    })

})


PanchakarmaCenterRouter.post("/logIn", async (req, res) => {
   
    


})


PanchakarmaCenterRouter.post("/CenterVerifyOtp", async (req, res) => {
  
        const { Adminemail, otp } = req.body;

        console.log("backend otp worksing")
        console.log(req.body);
        console.log(Adminemail);
        console.log(otp);

        const FindCenterAdminFromDB = await PanchkarmaModel.findOne({
            AdminName: Adminemail
        })

        if (!FindCenterAdminFromDB) {
            res.json({
                message: "Admin_not_exist"
            })
            return;
        }

        const FindCenterAdminWithOTP = await otpmodel.findOne({
            otp: otp
        })

        if (!FindCenterAdminWithOTP) {
            res.json({
                message: "INVALID_OTP"
            })
            return;
        }
        const verifyCenterAdminTrue = await PanchkarmaModel.updateOne({
            email: email,
            verified: true
        })

        await otpmodel.findByIdAndDelete({
            _id: FindPatientWithOTP._id
        })

        res.json({
            message: "Verified_otp"
        })


})

PanchakarmaCenterRouter.get("/allcenterList", async (req, res) => {
    //for dropdown menu get all list all centers
   
      const token = req.cookies.uidcookie;
 
     if (!token) {
        return res.json({ message: "not_signedIn" });
      }


      const AllCenters = await PanchkarmaModel.find({});

     
      res.json({
        message:"All centers list",
        AllCenters:AllCenters
      })

})


module.exports = {
    PanchakarmaCenterRouter: PanchakarmaCenterRouter
}