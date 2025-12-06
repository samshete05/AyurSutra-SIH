const express = require("express");
const patientRouter=express.Router();
const twilio = require("twilio");

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);

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
const notificationModel = require("../models/Notification.model");
const { NotificationTemplates } = require("../utils/notificationHelper");
const PatientAppointment = require("../models/PatientAppointment.model")
const CenterAppointmentModel = require("../models/CenterAppointment.model");
const PatientModel = require("../models/Patient.model");
const PatientProgressModel = require("../models/PatientProgress.model");



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
          phoneNo:phoneNumber,
            otp:otp,
            email:email
      })

  
      await client.messages.create({
      body: `Your AyurSutra verification OTP is ${otp}`,
      from: process.env.TWILIO_NUMBER,
      to: `+91${phoneNumber}`,
    });
    
      res.json({
        message:"otp_send",
        otp
      })
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
      patientId: checkedUser._id,
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
      centerId:centerUser._id,
      profileimg: centerUser.ProfileImg,
    });
  }

  return res.json({ message: "Invalid_role" });
});

// *************************** VERIFY OTP ********************************
patientRouter.post("/verifyOTP", async (req, res) => {
  const { email, otp, password,role,phoneNo } = req.body;
  console.log(email," ",otp," ",password," ",phoneNo);

  
   let user=null;
   if(role=='patient') user = await patientModel.findOne({ email });
   else user = await PanchakarmaCenterModel.findOne({ email });

  console.log("yayaaaaa",user);
  if (!user) {
    return res.json({ message: "User_not_exist" });
  }

  const FindOtp = await OtpModel.findOne({
    email: email,
    phoneNo:phoneNo,  
    otp: otp
  });
  console.log("yaha parrrr",FindOtp);

  if (!FindOtp) {
    return res.json({ message: "INVALID_OTP" });
  }



     const record = await OtpModel.findOne({ phoneNo }).sort({ createdAt: -1 });

    if (!record) {
      return res.status(400).json({
        success: false,
        message: "OTP expired or not found",
      });
    }

    if (record.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Incorrect_OTP",
      });
    }

    await patientModel.updateOne({ email }, { verified: true });

    // OTP matched → delete it
    await OtpModel.deleteMany({ phoneNo });

  // await OtpModel.deleteOne({ _id: FindOtp._id });

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


// *************************** BOOK GENERAL APPOINTMENT ********************************
patientRouter.post("/bookGeneralAppointment", async function (req, res) {
  try {
    const data = req.body;
    
    // Simple validation
    if (!data.selectedDate || !data.selectedSlot || !data.patientName || !data.patientPhone || !data.patientEmail || !data.centerId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Find patient
    const patient = await PatientModel.findOne({ email: data.patientEmail });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Find center
    const center = await PanchakarmaCenterModel.findById(data.centerId);
    if (!center) {
      return res.status(404).json({ message: "Center not found" });
    }

    // Generate simple IDs
    const bookingId = "BKG" + Date.now().toString().slice(-8);
    const tokenNumber = "T" + Math.floor(Math.random() * 900 + 100);

    // Set slot times
    let slotTime;
    if (data.selectedSlot === "morning") {
      slotTime = { startTime: "10:00 AM", endTime: "12:00 PM" };
    } else {
      slotTime = { startTime: "05:00 PM", endTime: "07:00 PM" };
    }

    console.log("bookign data is ",data);

    // Create appointment directly
    const appointmentData = {
      bookingId: bookingId,
      tokenNumber: tokenNumber,
      
      patientId: patient._id,
      CenterId: data.centerId,
      TherapyId: null,
      
      ServiceType: data.serviceType || "general",
      
      PatientName: data.patientName,
      PatientPhone: data.patientPhone,
      PatientEmail: data.patientEmail,
      PatientAge: String(data.patientAge),
      PatientGender: data.patientGender,
      // profileImg:data.profileImg,
      notes: data.notes || "",
      isPhoneVerified: data.isPhoneVerified || false,
      
      appointmentDate: new Date(data.selectedDate),
      appointmentSlot: data.selectedSlot,
      slotDetails: slotTime,
      
      centerName: center.name || center.CenterName || "Panchakarma Center",
      
      Amount: data.tokenAmount || "100",
      PaymentStatus: "paid",
      status: "scheduled",
    };

    // Save to database
    const appointment = await CenterAppointmentModel.create(appointmentData);

    // Update center if needed
    await PanchakarmaCenterModel.findByIdAndUpdate(data.centerId, {
      $push: { GeneralAppointment: appointment._id }
    });

    // Return success
    return res.status(200).json({
      success: true,
      message: "Appointment booked successfully",
      bookingId: bookingId,
      tokenNumber: tokenNumber,
      appointmentId: appointment._id
    });

  } catch (error) {
    console.log("Error in booking:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Server error", 
      error: error.message 
    });
  }
});

// *************************** GET PATIENT APPOINTMENTS ********************************
patientRouter.get("/appointments", async function (req, res) {
  try {
    // ---------------- AUTH CHECK ----------------
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, JWT_KEY);
    const patientId = decoded.id;

    // ---------------- QUERY FILTERS ----------------
    const { status, upcoming } = req.query;
    let query = { patientId };

    if (status) query.status = status;

    if (upcoming === "true") {
      query.appointmentDate = { $gte: new Date() };
      query.status = { $in: ["scheduled", "confirmed"] };
    }

    // ---------------- FETCH APPOINTMENTS ----------------
    const appointments = await CenterAppointmentModel.find(query)
      .populate("CenterId") // ← FULL PANCHAKARMA CENTER DETAILS
      .populate("TherapyId", "name description")
      .sort({ appointmentDate: -1 })
      .lean();

    // ---------------- FORMAT RESPONSE ----------------
    const finalArray = appointments.map((apt) => {
      const center = apt.CenterId; // full center details

      // Extra fields
      const isUpcoming =
        new Date(apt.appointmentDate) > new Date() &&
        ["scheduled", "confirmed"].includes(apt.status);

      const hoursDiff =
        (new Date(apt.appointmentDate) - new Date()) / (1000 * 60 * 60);

      const canCancel =
        hoursDiff >= 24 && ["scheduled", "confirmed"].includes(apt.status);

      return {
        centerDetails: center, // FULL CENTER DETAILS
        appointmentDetails: apt,

        patientDetails: {
          name: apt.PatientName,
          phone: apt.PatientPhone,
          email: apt.patientEmail,
          age: apt.PatientAge,
          gender: apt.PatientGender,
        },

        therapyDetails: apt.TherapyId || null,

        tokenAmount: apt.Amount,
        paymentStatus: apt.PaymentStatus,

        isUpcoming,
        canCancel,
      };
    });

    // ---------------- SEND RESPONSE ----------------
    res.json({
      message: "Success",
      count: finalArray.length,
      appointments: finalArray,
    });
  } catch (err) {
    console.error("Error fetching appointments:", err);

    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid Token" });
    }

    res.status(500).json({
      message: "Server Error",
      error: err.message,
    });
  }
});


// *************************** GET SINGLE APPOINTMENT BY BOOKING ID ********************************
patientRouter.get("/appointments/:bookingId", async function(req, res) {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, JWT_KEY);
    const patientId = decoded.id;
    const { bookingId } = req.params;

    const appointment = await CenterAppointment.findOne({ 
      bookingId,
      patientId 
    })
    .populate('centerId', 'name address phone locationUrl slots')
    .populate('therapyId', 'name description duration price');

    if (!appointment) {
      return res.status(404).json({ message: "Appointment_Not_Found" });
    }

    res.json({
      message: "Success",
      appointment
    });

  } catch (err) {
    console.error("Error fetching appointment:", err);
    res.status(500).json({ message: "Server_Error", error: err.message });
  }
});

// *************************** CANCEL APPOINTMENT ********************************
patientRouter.post("/cancelAppointment", async function(req, res) {
  const requiredData = z.object({
    bookingId: z.string().min(1),
    reason: z.string().optional().default("Patient requested cancellation")
  });

  const checkData = requiredData.safeParse(req.body);
  if (!checkData.success) {
    return res.status(422).json({ 
      message: "Invalid_Input",
      errors: checkData.error.errors 
    });
  }

  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, JWT_KEY);
    const patientId = decoded.id;
    const { bookingId, reason } = checkData.data;

    const appointment = await CenterAppointment.findOne({ 
      bookingId,
      patientId 
    });

    if (!appointment) {
      return res.status(404).json({ message: "Appointment_Not_Found" });
    }

    // Check if already cancelled
    if (appointment.status === 'cancelled') {
      return res.status(400).json({ message: "Appointment_Already_Cancelled" });
    }

    // Check if cancellation is allowed (24 hours before)
    if (!appointment.canCancel()) {
      return res.status(400).json({
        message: "Cancellation_Not_Allowed",
        info: "Appointments must be cancelled at least 24 hours in advance for a full refund."
      });
    }

    // Cancel the appointment
    await appointment.cancelAppointment(reason, 'patient');

    // TODO: Send cancellation notifications
    // await sendCancellationSMS(appointment.patientDetails.phone, appointment);
    // await sendCancellationEmail(appointment.patientDetails.email, appointment);

    res.json({
      message: "Appointment_Cancelled_Successfully",
      data: {
        bookingId: appointment.bookingId,
        status: appointment.status,
        refundStatus: appointment.refundStatus,
        refundAmount: appointment.refundAmount,
        info: appointment.refundStatus === 'pending' 
          ? 'Refund will be processed within 5-7 business days'
          : 'No refund applicable'
      }
    });

  } catch (err) {
    console.error("Error cancelling appointment:", err);
    res.status(500).json({ message: "Server_Error", error: err.message });
  }
});

// *************************** RESCHEDULE APPOINTMENT (Optional) ********************************
patientRouter.post("/rescheduleAppointment", async function(req, res) {
  const requiredData = z.object({
    bookingId: z.string().min(1),
    newDate: z.string(),
    newSlot: z.enum(['morning', 'evening']),
    reason: z.string().optional()
  });

  const checkData = requiredData.safeParse(req.body);
  if (!checkData.success) {
    res.status(422).json({ 
      message: "Invalid_Input",
      errors: checkData.error.errors 
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
    const patientId = decoded.id;
    const { bookingId, newDate, newSlot, reason } = checkData.data;

    const appointment = await PatientAppointment.findOne({ 
      bookingId,
      patientId 
    });

    if (!appointment) {
      res.status(404).json({ message: "Appointment_Not_Found" });
      return;
    }

    // Check if rescheduling is allowed
    if (!['scheduled', 'confirmed'].includes(appointment.status)) {
      res.status(400).json({ message: "Rescheduling_Not_Allowed" });
      return;
    }

    // Check new slot availability
    const newAppointmentDate = new Date(newDate);
    const existingCount = await PatientAppointment.countDocuments({
      centerId: appointment.centerId,
      appointmentDate: {
        $gte: new Date(newAppointmentDate.setHours(0, 0, 0, 0)),
        $lt: new Date(newAppointmentDate.setHours(23, 59, 59, 999))
      },
      appointmentSlot: newSlot,
      status: { $in: ['scheduled', 'confirmed', 'checked-in'] }
    });

    if (existingCount >= 30) {
      res.status(400).json({ message: "New_Slot_Full" });
      return;
    }

    // Update appointment
    appointment.appointmentDate = new Date(newDate);
    appointment.appointmentSlot = newSlot;
    appointment.notes = (appointment.notes || '') + `\nRescheduled: ${reason || 'No reason provided'}`;
    
    await appointment.save();

    res.json({
      message: "Appointment_Rescheduled_Successfully",
      appointment
    });

  } catch (err) {
    console.error("Error rescheduling appointment:", err);
    res.status(500).json({ message: "Server_Error" });
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
patientRouter.get("/notifications/unread/count", async function (req, res) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, JWT_KEY);

    const count = await notificationModel.countDocuments({
      userId: decoded.id,
      userType: "patient",
      read: false,
    });

    console.log(`📊 Patient ${decoded.id} has ${count} unread notifications`);

    return res.json({ unreadCount: count });
  } catch (err) {
    console.error("Error getting patient unread count:", err);
    return res.status(500).json({ message: "Server_error" });
  }
});

// *************************** APPOINTMENT OTP ***************************
patientRouter.post("/appointment-otp",async(req,res)=>{

    const {phoneNo,email}=req.body;

   

    
   
    console.log("yeah numbe rhain ",phoneNo);
    console.log(email);
    
    const otp=otpgenerator.generate(6,{
        digits:true,upperCaseAlphabets:false,specialChars:false,lowerCaseAlphabets:false
     })

    const response=await OtpModel.create({
          phoneNo:phoneNo,
            otp:otp,
            email:email
      })

  
      await client.messages.create({
      body: `Your AyurSutra verification OTP is ${otp}`,
      from: process.env.TWILIO_NUMBER,
      to: `+91${phoneNo}`,
    });
    
      res.json({
        message:"otp_send",
        otp
      })

})

patientRouter.post("/verify-appointment-otp", async (req, res) => {
  try {
    const { phoneNo, otp } = req.body;



    console.log(phoneNo," ",otp);

    if (!phoneNo || !otp) {
      return res.status(400).json({
        success: false,
        message: "Phone and OTP are required",
      });
    }



    const record = await OtpModel.findOne({ phoneNo }).sort({ createdAt: -1 });

    if (!record) {
      return res.status(400).json({
        success: false,
        message: "OTP expired or not found",
      });
    }

    if (record.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Incorrect_OTP",
      });
    }

    // OTP matched → delete it
    await OtpModel.deleteMany({ phoneNo });

    return res.json({
      success: true,
      message: "OTP_verified_successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server error verifying OTP",
    });
  }
});

// *************************** GET COMPLETED THERAPIES PENDING FEEDBACK ***************************
patientRouter.get("/therapies/pending-feedback", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, JWT_KEY);

    // Find all completed therapies without feedback
    const pendingFeedbacks = await TherapySessionModel.aggregate([
      {
        $match: {
          patientId: decoded.id,
          status: "completed",
          feedbackGiven: { $ne: true },
        },
      },
      {
        $lookup: {
          from: "panchkarmacenters", // Center collection
          localField: "centerId",
          foreignField: "_id",
          as: "centerDetails",
        },
      },
      {
        $lookup: {
          from: "therapies", // Therapy type collection
          localField: "therapyId",
          foreignField: "_id",
          as: "therapyDetails",
        },
      },
      {
        $unwind: "$centerDetails",
      },
      {
        $unwind: "$therapyDetails",
      },
      {
        $project: {
          _id: 1,
          therapyName: "$therapyDetails.name",
          therapyType: "$therapyDetails.type",
          centerName: "$centerDetails.centerName",
          centerAddress: "$centerDetails.address",
          doctorName: "$doctorName",
          completedDate: "$endDate",
          startDate: "$startDate",
          duration: {
            $dateDiff: {
              startDate: "$startDate",
              endDate: "$endDate",
              unit: "day",
            },
          },
          sessionsCompleted: "$sessionsCompleted",
          totalSessions: "$totalSessions",
        },
      },
      {
        $sort: { completedDate: -1 },
      },
    ]);

    // When marking therapy as completed
    await TherapySessionModel.findByIdAndUpdate(therapyId, {
      status: "completed",
      endDate: new Date(),
      feedbackGiven: false,
    });

    // Create feedback notification for patient
    await notificationService.therapyCompletedFeedback(
      patientId,
      therapy.therapyName,
      center.centerName,
      session.doctorName,
      therapyId
    );

    return res.json({
      message: "Success",
      pendingFeedbacks: pendingFeedbacks,
      count: pendingFeedbacks.length,
    });
  } catch (err) {
    console.error("Error fetching pending feedbacks:", err);
    return res.status(500).json({ message: "Server_Error" });
  }
});

// *************************** GET SPECIFIC THERAPY FOR FEEDBACK ***************************
patientRouter.get("/therapy/:therapyId/feedback-details", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, JWT_KEY);
    const { therapyId } = req.params;

    const therapySession = await TherapySessionModel.findOne({
      _id: therapyId,
      patientId: decoded.id,
      status: "completed"
    })
      .populate("centerId", "centerName address city state")
      .populate("therapyId", "name type description");

    if (!therapySession) {
      return res.status(404).json({ message: "Therapy_Not_Found" });
    }

    // Check if feedback already given
    const existingFeedback = await FeedbackModel.findOne({
      therapySessionId: therapyId
    });

    return res.json({
      message: "Success",
      therapy: {
        id: therapySession._id,
        therapyName: therapySession.therapyId.name,
        therapyType: therapySession.therapyId.type,
        centerName: therapySession.centerId.centerName,
        centerAddress: `${therapySession.centerId.address}, ${therapySession.centerId.city}`,
        doctorName: therapySession.doctorName,
        completedDate: therapySession.endDate,
        startDate: therapySession.startDate,
        sessionsCompleted: therapySession.sessionsCompleted,
        totalSessions: therapySession.totalSessions
      },
      feedbackExists: !!existingFeedback,
      existingFeedback: existingFeedback || null
    });

  } catch (err) {
    console.error("Error fetching therapy details:", err);
    return res.status(500).json({ message: "Server_Error" });
  }
});

// *************************** SUBMIT FEEDBACK ***************************
patientRouter.post("/therapy/:therapyId/feedback", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, JWT_KEY);
    const { therapyId } = req.params;
    const {
      therapyRating,
      therapyComment,
      centerRating,
      centerComment,
      doctorRating,
      doctorComment,
    } = req.body;

    // Validation
    if (!therapyRating || !centerRating || !doctorRating) {
      return res.status(400).json({ message: "All_Ratings_Required" });
    }

    // Get therapy details
    const therapySession = await TherapySessionModel.findOne({
      _id: therapyId,
      patientId: decoded.id,
      status: "completed",
    });

    if (!therapySession) {
      return res.status(404).json({ message: "Therapy_Not_Found" });
    }

    // Check for duplicate feedback
    const existingFeedback = await FeedbackModel.findOne({
      therapySessionId: therapyId,
    });

    if (existingFeedback) {
      return res.status(400).json({ message: "Feedback_Already_Submitted" });
    }

    // Create feedback
    const newFeedback = new FeedbackModel({
      therapySessionId: therapyId,
      patientId: decoded.id,
      centerId: therapySession.centerId,
      doctorName: therapySession.doctorName,

      therapyRating: therapyRating,
      therapyComment: therapyComment || "",

      centerRating: centerRating,
      centerComment: centerComment || "",

      doctorRating: doctorRating,
      doctorComment: doctorComment || "",

      overallRating: Math.round(
        (therapyRating + centerRating + doctorRating) / 3
      ),
      submittedAt: new Date(),
    });

    await newFeedback.save();

    // Mark therapy as feedback given
    await TherapySessionModel.findByIdAndUpdate(therapyId, {
      feedbackGiven: true,
      feedbackId: newFeedback._id,
    });

    // Create notification for center admin
    await notificationModel.create({
      userId: therapySession.centerId,
      userType: "centerHead",
      type: "feedback",
      title: "New Patient Feedback Received",
      message: `Patient has submitted feedback for ${therapySession.therapyId.name}. Overall rating: ${newFeedback.overallRating}/5`,
      priority: "medium",
      actionable: true,
      actions: [
        {
          label: "View Feedback",
          link: `/center/feedback/${newFeedback._id}`,
          type: "primary",
        },
      ],
      read: false,
    });

    // Create center notification for new patient feedback
    await notificationModel.create({
      userId: therapySession.centerId,
      userType: "centerHead",
      type: "feedback",
      title: "New Patient Feedback Received",
      message: `Patient has submitted feedback for ${therapySession.therapyId.name}. Overall rating: ${newFeedback.overallRating}/5`,
      priority: "medium",
      actionable: true,
      actions: [
        {
          label: "View Feedback",
          link: `/center/feedback/${newFeedback._id}`,
          type: "primary",
        },
      ],
      read: false,
    });

    // Optionally notify patient feedback submitted (use your notificationService here)
    await notificationService.feedbackSubmitted(
      decoded.id,
      therapySession.therapyId.name,
      newFeedback.overallRating
    );

    // Optionally notify center admin about new feedback
    await notificationService.newPatientFeedback(
      therapySession.centerId,
      decoded.name || "Patient",
      therapySession.therapyId.name,
      newFeedback.overallRating,
      therapyId
    );

    return res.json({
      message: "Feedback_Submitted_Successfully",
      feedback: newFeedback,
    });
  } catch (err) {
    console.error("Error submitting feedback:", err);
    return res.status(500).json({ message: "Server_Error" });
  }
});

// *************************** GET PATIENT PROGRESS DATA ***************************
patientRouter.get('/progress/:patientId', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, JWT_KEY);
    const { patientId } = req.params;

    if (decoded.id !== patientId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    // Get current therapy session
    const currentTherapy = await CenterAppointmentModel.findOne({
      patient: patientId,
      status: { $in: ['ongoing', 'active'] }
    })
    .populate('therapyId', 'name type description')
    .populate('centerId', 'centerName address city')
    .sort({ startDate: -1 })
    .limit(1);

    if (!currentTherapy) {
      return res.json({ message: "No active therapy found", progressData: null });
    }

    // Get recent progress entries (last 30 days)
    const progressEntries = await PatientProgressModel.find({
      patient: patientId,
      therapySessionId: currentTherapy._id
    })
    .sort({ date: -1 })
    .limit(30);

    // Calculate aggregated stats
    const totalSessions = await TherapySessionModel.countDocuments({
      patient: patientId,
      status: 'completed',
      therapySessionId: currentTherapy._id
    });

    // Calculate dosha balance average
    const avgDosha = progressEntries.reduce((acc, entry) => {
      acc.vata += entry.doshaBalance.vata;
      acc.pitta += entry.doshaBalance.pitta;
      acc.kapha += entry.doshaBalance.kapha;
      return acc;
    }, { vata: 0, pitta: 0, kapha: 0 });

    const daysCount = progressEntries.length || 1;
    const doshaBalance = {
      vata: Math.round(avgDosha.vata / daysCount),
      pitta: Math.round(avgDosha.pitta / daysCount),
      kapha: Math.round(avgDosha.kapha / daysCount)
    };

    // Wellness score average
    const avgWellness = progressEntries.reduce((acc, entry) => {
      acc += entry.wellnessScore;
      return acc;
    }, 0) / (daysCount || 1);

    const responseData = {
      currentTherapy: {
        id: currentTherapy._id,
        name: currentTherapy.therapyId?.name || "Panchakarma Detoxification Program",
        type: currentTherapy.therapyId?.type || "Comprehensive Detox",
        startDate: currentTherapy.startDate?.toISOString().split("T")[0],
        endDate: currentTherapy.endDate?.toISOString().split("T")[0],
        duration: currentTherapy.duration || "21 days",
        sessionsCompleted: totalSessions,
        totalSessions: currentTherapy.totalSessions || 21,
        completionPercentage: Math.round((totalSessions / (currentTherapy.totalSessions || 21)) * 100),
        status: currentTherapy.status === 'completed' ? 'completed' : 'on_track',
        therapist: {
          name: currentTherapy.doctorName || "Dr. Priya Sharma",
          designation: "Senior Panchakarma Specialist",
          contact: currentTherapy.doctorPhone || "+91-98765-43210"
        },
        nextSession: {
          date: currentTherapy.nextSessionDate?.toISOString?.().split?.('T')?.[0] || currentTherapy.nextSessionDate || "2025-12-02",
          time: currentTherapy.nextSessionTime || "10:00 AM",
          therapy: currentTherapy.nextTherapyName || "Abhyanga + Swedana",
          room: currentTherapy.room || "Therapy Room 3",
          duration: currentTherapy.nextSessionDuration || "90 minutes"
        }
      },
    
      // minimal session arrays (frontend handles empty arrays)
      sessionHistory: [], 
      upcomingSessions: [], 
      milestones: [],
      notifications: [],
    
      // averaged dosha values (you computed doshaBalance above)
      doshaBalance: {
        vata: { current: doshaBalance.vata, previous: (doshaBalance.vata + 5), optimal: 33, status: "improving", trend: "down" },
        pitta: { current: doshaBalance.pitta, previous: (doshaBalance.pitta - 3), optimal: 33, status: "slightly_high", trend: "up" },
        kapha: { current: doshaBalance.kapha, previous: (doshaBalance.kapha - 4), optimal: 34, status: "low", trend: "up" }
      },
    
      overallStats: {
        wellnessScore: Number((avgWellness || 0).toFixed(1)),
        previousScore: Number(((avgWellness || 0) - 1.8).toFixed(1)),
        improvementRate: 18,
        totalPoints: Math.round((avgWellness || 0) * 50),
        streak: Math.min(daysCount, 7),
        badges: 12,
        daysInTreatment: 21,
        completionPercentage: Math.round((totalSessions / (currentTherapy.totalSessions || 21)) * 100)
      },
    
      healthMetrics: {
        sleepQuality: { current: 7.5, previous: 6.2, trend: "up", change: 21 },
        stressLevel: { current: 4.2, previous: 6.8, trend: "down", change: -38 },
        energyLevel: { current: 8.1, previous: 6.5, trend: "up", change: 25 },
        digestion: { current: 7.8, previous: 6.0, trend: "up", change: 30 },
        bodyPain: { current: 3.2, previous: 5.8, trend: "down", change: -45 },
        mood: { current: 8.5, previous: 6.8, trend: "up", change: 25 }
      },
    
      weeklyProgress: [],
      medications: [],
      dietAdherence: { overall: 85 }
    };

    return res.json({
      message: "Success",
      progressData: responseData
    });

  } catch (err) {
    console.error("Progress fetch error:", err);
    return res.status(500).json({ message: "Server_Error" });
  }
});

// *************************** SUBMIT DAILY PROGRESS CHECK-IN ***************************
patientRouter.post('/progress/daily-checkin/:patientId', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, JWT_KEY);
    const { patientId } = req.params;

    if (decoded.id !== patientId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const { wellnessScore, mood, notes, symptoms } = req.body;

    // 1️⃣ Check if progress record exists
    let progress = await PatientProgressModel.findOne({ patientId });

    // 2️⃣ If not exists → create new blank progress record
    if (!progress) {
      progress = new PatientProgressModel({
        patientId,
        dailyCheckins: [],
        sessionHistory: [],
        medications: [],
        weeklyProgress: [],
        upcomingSessions: [],
        milestones: [],
        notifications: [],
        overallStats: {}
      });
    }

    // 3️⃣ Push new check-in entry
    progress.dailyCheckins.push({
      wellnessScore,
      mood,
      notes,
      symptoms,
      date: new Date()
    });

    progress.lastUpdated = new Date();

    await progress.save();

    return res.json({
      message: "Daily_Checkin_Saved",
      success: true
    });

  } catch (err) {
    console.error("Daily checkin error:", err);
    return res.status(500).json({ message: "Server_Error" });
  }
});

patientRouter.post("/pre-notification",async(req,res)=>{
    
   const {phoneNo}=req.body;
   
    console.log("yeah numbe pre notify ",phoneNo);

  
      await client.messages.create({
      body: `Congratulations Your Session has been Scheduled Successfully with Your Registered Number ${phoneNo} 
      Check Your DashBoard for more details.` ,
      from: process.env.TWILIO_NUMBER,
      to: `+91${phoneNo}`,
    });
    

    await client.messages.create({
     body: `Consultation with an Ayurvedic Practitioner\n
         Health Evaluation\n
         Pre-Therapy Preparation (Snehana and Swedana)\n
         Dietary Changes\n
         Rest and Mental Preparation\n
         Avoidance of Heavy Activities`,
  from: process.env.TWILIO_NUMBER,
  to: `+91${phoneNo}`,
});

    
      res.json({
        message:"message_send",
        otp
      })
  

})

module.exports={
   patientRouter:patientRouter
}