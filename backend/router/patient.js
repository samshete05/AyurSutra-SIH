const express = require("express");
const patientRouter=express.Router();

const z =require('zod');
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const patientModel = require("../models/Patient.model");
// const otpmodel = require("../models/Otp.model");
const JWT_KEY=process.env.JWT_KEY;
const otpgenerator=require("otp-generator");
const sendemail=require("../otplogic/otp");
const OtpModel = require("../models/Otp.model");
const PanchakarmaCenterModel = require("../models/PanchakarmaCenter.model");
const AppointmentModel = require("../models/Appointment.model")
const notificationModel = require("../models/Notification.model");
const { NotificationTemplates } = require("../utils/notificationHelper");



// *************************** REGISTER ********************************
patientRouter.post("/register", async function(req,res){
   const requiredatas=z.object({
      name:z.string().min(3).max(100),
      phoneNumber:z.string().min(10).max(13),
      email:z.string().min(5).max(100),
      password:z.string().min(5).max(100),
      confirmPassword:z.string().min(5).max(100),
   })
   let registerUser=null;
   const checkdata=requiredatas.safeParse(req.body);

   if(!checkdata.success){
      res.status(422).send("Invalid Input types");
      return;
   }

   const {
      name,
      phoneNumber,
      email,
      password,
      confirmPassword,
      role,
      lattitude,
      longitude,
      LicenseNo,
      CenterName,
      BotNumber
   } = req.body;
   //   console.log(req);
   const hashedpassword=await bcrypt.hash(password,5);

   // ---------------- Patient Registration ---------------
   if(role=='patient'){ 
      const checkAlreadyEmailExistOrNot=await patientModel.findOne({
         email:email
      })

      // console.log("check errors ",checkAlreadyEmailExistOrNot);

      if(checkAlreadyEmailExistOrNot){
         res.json({
            message:"Email_Present"
         })
         return;
      }

      registerUser=await patientModel.create({
         name:name,
         mobileNo:phoneNumber,
         password:hashedpassword,
         email:email,
         lastLoginDate: null
      });

      // Send Notification to patient
      try {
        await NotificationTemplates.welcomeMessage(
          registerUser._id,
          name,
          "patient"
        );
        // console.log(`Welcome notification sent to patient: ${email}`);
      } catch (error) {
        console.error("Error sending welcome notification:", error);
      }
   } 
   else if(role=='centerHead'){
      const checkAlreadyEmailExistOrNot=await PanchakarmaCenterModel.findOne({
         email:email
   })

     // console.log("check errors ",checkAlreadyEmailExistOrNot);

     if(checkAlreadyEmailExistOrNot){
        res.json({
            message:"Email_Present"
        })
        return;
     }

      registerUser=await PanchakarmaCenterModel.create({
          Adminname:name,
          MobileNo:phoneNumber,
          password:hashedpassword,
          email:email,
          licenseNo:LicenseNo,
          CenterName:CenterName,
          lastLoginDate: null,
     });

      try {
        await NotificationTemplates.welcomeMessage(
          registerUser._id,
          name,
          "centerHead"
        );
        // console.log(`Welcome notification sent to centerHead: ${email}`);
      } catch (error) {
        console.error("Error sending welcome notification:", error);
      }
   }

   // Send OTP
      const otp=otpgenerator.generate(6,{
        digits:true,upperCaseAlphabets:false,specialChars:false,lowerCaseAlphabets:false
     })

        const response=await OtpModel.create({
            email:email,
            otp:otp
        })

        console.log("here!!!",role," ",otp);

   res.json({
        message:"OTP_Send",
        email:email,
        role:registerUser.role
   })

    if(registerUser!=null) await sendemail(registerUser.email,"Email verification code:",otp);
})


// *************************** LOGIN ********************************
patientRouter.post("/login", async function (req, res) {
  const requiredatas = z.object({
    email: z.string().min(3).max(100).email(),
    password: z.string().min(5).max(100),
  });

  const checkdata = requiredatas.safeParse(req.body);
  if (!checkdata.success) {
    return res.json({ message: checkdata.error });
  }

  const { email, password, role } = req.body;

  // ---------------- PATIENT LOGIN ----------------
  if (role === "patient") {
    const checkedUser = await patientModel.findOne({ email });

    if (!checkedUser) {
      return res.json({ message: "User_not_exists" });
    }

    const finduser = await bcrypt.compare(password, checkedUser.password);

    if (!finduser) {
      return res.json({ message: "User_not_exists" });
    }

    // GET LAST LOGIN DATE BEFORE UPDATING
    const lastLoginDate = checkedUser.lastLoginDate;
    // console.log(lastLoginDate)

    // UPDATE LAST LOGIN DATE
    await patientModel.findOneAndUpdate(
      { _id: checkedUser._id },
      { $set: { lastLoginDate: new Date() } }
    );

    // console.log(lastLoginDate)

    // SEND WELCOME BACK NOTIFICATION (only if not first login)
      try {
        await NotificationTemplates.welcomeBack(
          checkedUser._id,
          checkedUser.name,
          "patient",
          lastLoginDate
        );
        console.log(`Welcome back notification sent to patient: ${email}`);
      } catch (error) {
        console.error("Error sending welcome back notification:", error);
      }

    const token = jwt.sign({ id: checkedUser._id }, JWT_KEY);

    return res.json({
      token,
      message: "logedin",
      role: checkedUser.role,
      profileimg: checkedUser.ProfileImg,
    });
  }

  // ---------------- CENTER HEAD LOGIN ----------------
  if (role === "centerHead") {
    const centerUser = await PanchakarmaCenterModel.findOne({ email });

    if (!centerUser) {
      return res.json({ message: "center_not_exists" });
    }

    const finduser = await bcrypt.compare(password, centerUser.password);

    if (!finduser) {
      return res.json({ message: "center_not_exists" });
    }

    // GET LAST LOGIN DATE BEFORE UPDATING
    const lastLoginDate = centerUser.lastLoginDate;

    // UPDATE LAST LOGIN DATE
    await PanchakarmaCenterModel.findOneAndUpdate(
      { _id: centerUser._id },
      { $set: { lastLoginDate: new Date() } },
      
    );

    // SEND WELCOME BACK NOTIFICATION (only if not first login)
      try {
        await NotificationTemplates.welcomeBack(
          centerUser._id,
          centerUser.Adminname,
          "centerHead",
          lastLoginDate
        );
        console.log(
          `Welcome back notification sent to centerHead: ${email}`
        );
      } catch (error) {
        console.error("Error sending welcome back notification:", error);
      }

    const token = jwt.sign({ id: centerUser._id }, JWT_KEY);

    return res.json({
      token,
      message: "logedin",
      role: centerUser.role,
      profileimg: centerUser.ProfileImg,
    });
  }

  return res.json({ message: "Invalid_role" });
});


patientRouter.post("/verifyOTP", async (req, res) => {
  const { email, otp, password,role } = req.body;
  

  const user = await patientModel.findOne({ email });
  if (!user) {
    return res.json({ message: "User_not_exist" });
  }

  const FindOtp = await OtpModel.findOne({
    email: email,
    otp: otp
  });

  if (!FindOtp) {
    return res.json({ message: "INVALID_OTP" });
  }


  await patientModel.updateOne({ email }, { verified: true });

  await OtpModel.deleteOne({ _id: FindOtp._id });

  const isMatch = await bcrypt.compare(password, user.password);

  if (isMatch) {
    const token = jwt.sign({ id: user._id }, JWT_KEY)
    return res.json({
      token,
      message: "logedin",
      profileimg:user.ProfileImg
    });
  }

  return res.json({ message: "User_not_exists" });
});

patientRouter.get("/getPatientInfo",async(req,res)=>{
   
   const {email}=req.body;

   console.log("email here",email);

})



// *************************** RESEND CODE ********************************
patientRouter.post("/resendCode",async(req,res)=>{
   try {
      const bodySchema = z.object({
         email: z.string().email().min(5).max(100),
      });
   
      const parseResult = bodySchema.safeParse(req.body);
      if (!parseResult.success) {
         res.status(422).json({
            message: "Invalid_Input",
         });
         return;
      }
   
      const { email } = parseResult.data;
   
      // 1. Check patient exists
      const patient = await patientModel.findOne({ email: email });
      if (!patient) {
         res.json({
            message: "User_not_exist",
         });
         return;
      }
   
      // 2. Optional: block if already verified
      if (patient.verified === true) {
         res.json({
           message: "Already_verified",
         });
         return;
      }
   
      // 3. Delete old OTP (if any)
      await otpmodel.deleteMany({ email: email });
   
      // 4. Generate new OTP
      const otp = otpgenerator.generate(6, {
         digits: true,
         upperCaseAlphabets: false,
         lowerCaseAlphabets: false,
         specialChars: false,
      });
   
      // 5. Save new OTP
      await otpmodel.create({
         email: email,
         otp: otp,
      });
   
      // 6. Send email
      await sendemail(email, "Email verification code (resend):", otp);
   
      // 7. Respond
      res.json({
         message: "OTP_Resent",
         email: email,
      });
   } catch (err) {
      console.error("Error in /resendCode:", err);
      res.status(500).json({
         message: "Server_error",
      });
   }
})

// *************************** FORGET PASSWORD ********************************
// STEP 1 : Patient requests password reset (send OTP to email)
patientRouter.post("/forgetPassword", async (req, res) => {
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
    
      const patient = await patientModel.findOne({ email });
      if (!patient) {
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
    
      res.json({ message: "Resent_OTP_Sent", email });
   } catch (err) {
      console.error("Error in /patient/forgetPassword:", err);
      res.status(500).json({ message: "Server_error" });
   }
});

// *************************** VERIFY RESET OTP ********************************
// STEP 2 : Doctor verifies reset OTP
patientRouter.post("/verifyResetOTP", async (req, res) => {
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

      const patient = await patientModel.findOne({ email });
      if (!patient) {
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
// STEP 3 : Patient sets new password (after OTP)
patientRouter.post("/resetPassword", async (req, res) => {
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
    
      const patient = await patientModel.findOne({ email });
      if (!patient) {
        res.json({ message: "User_not_exist" });
        return;
      }
    
      const otpDoc = await otpmodel.findOne({ email, otp });
      if (!otpDoc) {
        res.json({ message: "INVALID_OTP" });
        return;
      }
    
      const hashed = await bcrypt.hash(newPassword, 5);
    
      await patientModel.updateOne(
        { email },
        { $set: { password: hashed } }
      );
    
      await otpmodel.deleteMany({ email });
    
      res.json({ message: "Password_Reset_Success" });
   } catch (err) {
      console.error("Error in /patient/resetPassword:", err);
      res.status(500).json({ message: "Server_error" });
   }
});

// *************************** CHANGE PASSWORD (For Logged-in Users) ********************************
patientRouter.post("/changePassword", async (req, res) => {
  try {
    const schema = z.object({
      currentPassword: z.string().min(5).max(100),
      newPassword: z.string().min(5).max(100),
      confirmPassword: z.string().min(5).max(100),
    });

    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(422).json({ message: "Invalid_Input" });
    }

    const { currentPassword, newPassword, confirmPassword } = parsed.data;

    if (newPassword !== confirmPassword) {
      return res.json({ message: "Password_Mismatch" });
    }

    // Get user from JWT token
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, JWT_KEY);
    const user = await patientModel.findById(decoded.id);

    if (!user) {
      return res.json({ message: "User_not_exist" });
    }

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.json({ message: "Current_Password_Incorrect" });
    }

    // Update password
    const hashed = await bcrypt.hash(newPassword, 5);
    await patientModel.updateOne(
      { _id: decoded.id },
      { $set: { password: hashed } }
    );

    res.json({ message: "Password_Changed_Successfully" });
  } catch (err) {
    console.error("Error in /changePassword:", err);
    res.status(500).json({ message: "Server_error" });
  }
});


// *************************** LOGOUT ********************************
patientRouter.post("/logout",async(req,res)=>{
   res.clearCookie("uidcookie", {
      httpOnly: false,  // Ensures the cookie cannot be accessed via JavaScript
      secure: true,    // Ensures the cookie is only sent over HTTPS
   });
   res.status(200).json({
      message:"logedout"
     })
})


// *************************** BOOK APPOINTMENT ********************************
patientRouter.post("/bookAppointment", async function(req, res) {
  const requiredData = z.object({
    centerId: z.string().min(1),
    appointmentDate: z.string(),
    treatmentType: z.string(),
    symptoms: z.string().optional(),
    notes: z.string().optional()
  });

  const checkData = requiredData.safeParse(req.body);
  if (!checkData.success) {
    res.status(422).json({
      message: "Invalid_Input",
      errors: checkData.error
    });
    return;
  }

  const { centerId, appointmentDate, treatmentType, symptoms, notes } = checkData.data;
  
  // Get patient ID from JWT token
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_KEY);
    const patientId = decoded.id;

    const newAppointment = await AppointmentModel.create({
      patientId,
      centerId,
      appointmentDate: new Date(appointmentDate),
      treatmentType,
      symptoms,
      notes,
      status: "pending",
    });

    res.json({
      message: "Appointment_Booked",
      appointmentId: newAppointment._id,
      info: "Center will confirm doctor and time within 24 hours",
    });
  } catch (err) {
    console.error("Error booking appointment:", err);
    res.status(500).json({ message: "Server_error" });
  }
});

// *************************** GET APPOINTMENTS ********************************
patientRouter.get("/getAppointments", async function(req, res) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_KEY);
    const patientId = decoded.id;

    const appointments = await AppointmentModel.find({ patientId })
      .sort({ appointmentDate: -1 });

    res.json({
      message: "Success",
      appointments
    });
  } catch (err) {
    console.error("Error fetching appointments:", err);
    res.status(500).json({ message: "Server_error" });
  }
});


// *************************** CANCEL APPOINTMENT ********************************
patientRouter.post("/cancelAppointment", async function(req, res) {
  const requiredData = z.object({
    appointmentId: z.string().min(1)
  });

  const checkData = requiredData.safeParse(req.body);
  if (!checkData.success) {
    res.status(422).json({ message: "Invalid_Input" });
    return;
  }

  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_KEY);
    const { appointmentId } = checkData.data;

    await AppointmentModel.updateOne(
      { _id: appointmentId, patientId: decoded.id },
      { $set: { status: 'cancelled' } }
    );

    res.json({ message: "Appointment_Cancelled" });
  } catch (err) {
    console.error("Error cancelling appointment:", err);
    res.status(500).json({ message: "Server_error" });
  }
});

// *************************** GET PATIENT PROFILE ********************************
patientRouter.get("/getProfile", async function(req, res) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_KEY);
    const patient = await patientModel.findById(decoded.id).select('-password');

    if (!patient) {
      res.status(404).json({ message: "User_not_found" });
      return;
    }

    res.json({
      message: "Success",
      profile: {
        // Basic Info
        name: patient.name,
        email: patient.email,
        mobileNo: patient.mobileNo,
        verified: patient.verified,
        profileImg: patient.ProfileImg || null,
        role: patient.role,

        // Personal Info
        dateOfBirth: patient.dateOfBirth || '',
        gender: patient.gender || '',
        bloodGroup: patient.bloodGroup || '',
        maritalStatus: patient.maritalStatus || '',
        occupation: patient.occupation || '',
        address: patient.address || '',
        city: patient.city || '',
        state: patient.state || '',
        pincode: patient.pincode || '',
        country: patient.country || 'India',

        // Medical History
        height: patient.height || '',
        weight: patient.weight || '',
        bmi: patient.bmi || '',
        allergies: patient.allergies || [],
        chronicConditions: patient.chronicConditions || [],
        currentMedications: patient.currentMedications || [],
        smokingStatus: patient.smokingStatus || 'Non-smoker',
        alcoholConsumption: patient.alcoholConsumption || 'Never',
        exerciseFrequency: patient.exerciseFrequency || '',
        dietaryPreferences: patient.dietaryPreferences || 'Vegetarian',

        // Ayurveda Profile
        constitution: patient.constitution || '',
        primaryDosha: patient.primaryDosha || '',
        secondaryDosha: patient.secondaryDosha || '',
        prakriti: patient.prakriti || '',
        currentImbalance: patient.currentImbalance || '',
        preferredTreatments: patient.preferredTreatments || [],

        // Emergency Contact
        emergencyContact: patient.emergencyContact || {
          contactName: '',
          relationship: '',
          contactPhone: '',
          contactEmail: '',
          alternateContactName: '',
          alternateRelationship: '',
          alternatePhone: ''
        },

        // Settings
        settings: patient.settings || {
          darkMode: false,
          language: "english",
          textSize: 100,
          timezone: "ist",
          dateFormat: "DD/MM/YYYY"
        }
      }
    });
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).json({ message: "Server_error" });
  }
});

// *************************** UPDATE PROFILE ********************************
patientRouter.put("/updateProfile", async function(req, res) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_KEY);
    const updateData = {};

    // Basic Info
    if (req.body.name) updateData.name = req.body.name;
    if (req.body.mobileNo) updateData.mobileNo = req.body.mobileNo;
    if (req.body.profileImg) updateData.ProfileImg = req.body.profileImg;

    // Personal Info
    if (req.body.dateOfBirth !== undefined) updateData.dateOfBirth = req.body.dateOfBirth;
    if (req.body.gender !== undefined) updateData.gender = req.body.gender;
    if (req.body.bloodGroup !== undefined) updateData.bloodGroup = req.body.bloodGroup;
    if (req.body.maritalStatus !== undefined) updateData.maritalStatus = req.body.maritalStatus;
    if (req.body.occupation !== undefined) updateData.occupation = req.body.occupation;
    if (req.body.address !== undefined) updateData.address = req.body.address;
    if (req.body.city !== undefined) updateData.city = req.body.city;
    if (req.body.state !== undefined) updateData.state = req.body.state;
    if (req.body.pincode !== undefined) updateData.pincode = req.body.pincode;
    if (req.body.country !== undefined) updateData.country = req.body.country;

    // Medical History
    if (req.body.height !== undefined) updateData.height = req.body.height;
    if (req.body.weight !== undefined) updateData.weight = req.body.weight;
    if (req.body.bmi !== undefined) updateData.bmi = req.body.bmi;
    if (req.body.allergies !== undefined) updateData.allergies = req.body.allergies;
    if (req.body.chronicConditions !== undefined) updateData.chronicConditions = req.body.chronicConditions;
    if (req.body.currentMedications !== undefined) updateData.currentMedications = req.body.currentMedications;
    if (req.body.smokingStatus !== undefined) updateData.smokingStatus = req.body.smokingStatus;
    if (req.body.alcoholConsumption !== undefined) updateData.alcoholConsumption = req.body.alcoholConsumption;
    if (req.body.exerciseFrequency !== undefined) updateData.exerciseFrequency = req.body.exerciseFrequency;
    if (req.body.dietaryPreferences !== undefined) updateData.dietaryPreferences = req.body.dietaryPreferences;

    // Ayurveda Profile
    if (req.body.constitution !== undefined) updateData.constitution = req.body.constitution;
    if (req.body.primaryDosha !== undefined) updateData.primaryDosha = req.body.primaryDosha;
    if (req.body.secondaryDosha !== undefined) updateData.secondaryDosha = req.body.secondaryDosha;
    if (req.body.prakriti !== undefined) updateData.prakriti = req.body.prakriti;
    if (req.body.currentImbalance !== undefined) updateData.currentImbalance = req.body.currentImbalance;
    if (req.body.preferredTreatments !== undefined) updateData.preferredTreatments = req.body.preferredTreatments;

    // Emergency Contact
    if (req.body.emergencyContact !== undefined) updateData.emergencyContact = req.body.emergencyContact;

    await patientModel.updateOne(
      { _id: decoded.id },
      { $set: updateData }
    );

    res.json({ message: "Profile_Updated" });
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({ message: "Server_error" });
  }
});


// *************************** GET PATIENT SETTINGS ********************************
patientRouter.get("/getSettings", async function(req, res) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_KEY);
    const patient = await patientModel.findById(decoded.id).select('settings');

    if (!patient) {
      res.status(404).json({ message: "User_not_found" });
      return;
    }

    res.json({
      message: "Success",
      settings: patient.settings || {
        darkMode: false,
        language: "english",
        textSize: 100,
        timezone: "ist",
        dateFormat: "DD/MM/YYYY"
      }
    });
  } catch (err) {
    console.error("Error fetching settings:", err);
    res.status(500).json({ message: "Server_error" });
  }
});

// *************************** UPDATE APPEARANCE SETTINGS ********************************
patientRouter.put("/updateAppearance", async function(req, res) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_KEY);
    const updateData = {};
    
    if (req.body.darkMode !== undefined) {
      updateData['settings.darkMode'] = req.body.darkMode;
    }
    if (req.body.textSize) {
      updateData['settings.textSize'] = req.body.textSize;
    }

    await patientModel.updateOne(
      { _id: decoded.id },
      { $set: updateData }
    );

    res.json({ message: "Appearance_Updated" });
  } catch (err) {
    console.error("Error updating appearance:", err);
    res.status(500).json({ message: "Server_error" });
  }
});


// *************************** UPDATE LANGUAGE SETTINGS ********************************
patientRouter.put("/updateLanguage", async function(req, res) {
  const requiredData = z.object({
    language: z.enum(["english", "hindi", "tamil", "telugu", "kannada", "malayalam", "bengali", "marathi"]),
    timezone: z.string().optional(),
    dateFormat: z.enum(["DD/MM/YYYY", "MM/DD/YYYY", "YYYY-MM-DD"]).optional()
  });

  const checkData = requiredData.safeParse(req.body);
  if (!checkData.success) {
    res.status(422).json({
      message: "Invalid_Input",
      errors: checkData.error
    });
    return;
  }

  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_KEY);
    const updateData = {};
    
    updateData['settings.language'] = checkData.data.language;
    if (checkData.data.timezone) {
      updateData['settings.timezone'] = checkData.data.timezone;
    }
    if (checkData.data.dateFormat) {
      updateData['settings.dateFormat'] = checkData.data.dateFormat;
    }

    await patientModel.updateOne(
      { _id: decoded.id },
      { $set: updateData }
    );

    res.json({ message: "Language_Settings_Updated" });
  } catch (err) {
    console.error("Error updating language settings:", err);
    res.status(500).json({ message: "Server_error" });
  }
});

// *************************** UPDATE ALL SETTINGS ********************************
patientRouter.put("/updateSettings", async function(req, res) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_KEY);
    const updateData = {};
    
    if (req.body.darkMode !== undefined) {
      updateData['settings.darkMode'] = req.body.darkMode;
    }
    if (req.body.language) {
      updateData['settings.language'] = req.body.language;
    }
    if (req.body.textSize) {
      updateData['settings.textSize'] = req.body.textSize;
    }
    if (req.body.timezone) {
      updateData['settings.timezone'] = req.body.timezone;
    }
    if (req.body.dateFormat) {
      updateData['settings.dateFormat'] = req.body.dateFormat;
    }

    await patientModel.updateOne(
      { _id: decoded.id },
      { $set: updateData }
    );

    res.json({ message: "Settings_Updated" });
  } catch (err) {
    console.error("Error updating settings:", err);
    res.status(500).json({ message: "Server_error" });
  }
});

// *************************** GET NOTIFICATIONS ********************************
patientRouter.get("/notifications", async function(req, res) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_KEY);
    
    // Fetch notifications from database
    const notifications = await notificationModel
      .find({ userId: decoded.id })
      .sort({ createdAt: -1 })
      .limit(50);
    
    // Transform to match frontend format
    const formattedNotifications = notifications.map(notif => ({
      id: notif._id.toString(),
      type: notif.type,
      title: notif.title,
      message: notif.message,
      timestamp: notif.createdAt.toISOString(),
      read: notif.read,
      priority: notif.priority,
      actionable: notif.actionable,
      actions: notif.actions
    }));

    res.json({ notifications: formattedNotifications });
  } catch (err) {
    console.error("Error fetching notifications:", err);
    res.status(500).json({ message: "Server_error" });
  }
});

// *************************** MARK NOTIFICATION AS READ ********************************
patientRouter.put("/notifications/:id/read", async function(req, res) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_KEY);
    const notificationId = req.params.id;
    
    // Update notification in database
    await notificationModel.updateOne(
      { _id: notificationId, userId: decoded.id },
      { $set: { read: true } }
    );
    
    res.json({ message: "Marked as read" });
  } catch (err) {
    console.error("Error marking notification as read:", err);
    res.status(500).json({ message: "Server_error" });
  }
});

// *************************** MARK ALL AS READ ********************************
patientRouter.put("/notifications/markAllRead", async function(req, res) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_KEY);
    
    // Update all notifications in database
    await notificationModel.updateMany(
      { userId: decoded.id, read: false },
      { $set: { read: true } }
    );
    
    res.json({ message: "All marked as read" });
  } catch (err) {
    console.error("Error marking all as read:", err);
    res.status(500).json({ message: "Server_error" });
  }
});

// *************************** DELETE NOTIFICATION ********************************
patientRouter.delete("/notifications/:id", async function(req, res) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_KEY);
    const notificationId = req.params.id;
    
    // Delete notification from database
    await notificationModel.deleteOne({
      _id: notificationId,
      userId: decoded.id
    });
    
    res.json({ message: "Notification deleted" });
  } catch (err) {
    console.error("Error deleting notification:", err);
    res.status(500).json({ message: "Server_error" });
  }
});

// *************************** UPDATE NOTIFICATION PREFERENCES ********************************
patientRouter.put("/updateNotificationPreferences", async function(req, res) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_KEY);
    const { notificationPreferences } = req.body;
    
    await patientModel.updateOne(
      { _id: decoded.id },
      { $set: { notificationPreferences } }
    );

    res.json({ message: "Preferences updated" });
  } catch (err) {
    console.error("Error updating preferences:", err);
    res.status(500).json({ message: "Server_error" });
  }
});

// *************************** CREATE NOTIFICATION (Helper Function) ********************************
patientRouter.post("/createNotification", async function(req, res) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const { userId, type, title, message, priority, actionable, actions } = req.body;
    
    const notification = new notificationModel({
      userId,
      type,
      title,
      message,
      priority: priority || 'medium',
      actionable: actionable || false,
      actions: actions || []
    });

    await notification.save();
    
    res.json({ message: "Notification created", notificationId: notification._id });
  } catch (err) {
    console.error("Error creating notification:", err);
    res.status(500).json({ message: "Server_error" });
  }
});

// *************************** GET UNREAD COUNT ********************************
patientRouter.get("/notifications/unread/count", async function(req, res) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_KEY);
    
    const count = await notificationModel.countDocuments({
      userId: decoded.id,
      read: false
    });
    
    res.json({ unreadCount: count });
  } catch (err) {
    console.error("Error getting unread count:", err);
    res.status(500).json({ message: "Server_error" });
  }
});

module.exports={
   patientRouter:patientRouter
}