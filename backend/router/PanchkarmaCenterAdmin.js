const express = require("express");

const PanchakarmaCenterRouter = express.Router();


const z = require('zod');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const { PanchkarmaModel } = require("../db/db");

const JWT_KEY = process.env.JWT_KEY;
const otpgenerator = require("otp-generator");
const sendemail = require("../otplogic/otp");
const DoctorModel = require("../models/Doctor.model");
const SendEmailDoctor = require("../otplogic/doctorCredentialSendEmail");
const PanchakarmaCenterModel = require("../models/PanchakarmaCenter.model");
const TherapyModel = require("../models/Therapy.model");
const TherapistModel = require("../models/Therapist.model");
const upload = require("./multer.js");
const { NotificationTemplates } = require("../utils/notificationHelper.js");
const notificationModel = require("../models/Notification.model")




// PanchakarmaCenterRouter.post("/register", async (req, res) => {
//     const requireData = z.object({
//         Adminname: z.string().min(3).max(100),
//         mobileNo: z.string().min(10).max(10),
//         AdminEmail: z.string().min(5).max(100),
//         CenterName: z.string().min().max(100),
//         LicenseNo: z.string().min(5).max(100),
//         password: z.string().min(5).max(100),
//         confirmPassword: z.string().min(5).max(100),
//         BotNumber:z.string().min(5).max(100)
//     })


//     const checkdata = requireData.safeParse(req.body);

//     if (!checkdata.success) {
//         res.status(422).send("Invalid Input types");
//         return;
//     }

//     const { Adminname, mobileNo, AdminEmail, CenterName, LicenseNo, password, confirmPassword,
//         Centerlattitude, Centerlongitude , BotNumber
//     } = req.body;

//     if (confirmPassword != password) {
//         res.json({
//             message: "both password Not Matched!!"
//         })
//         return;
//     }

//     const checkAlreadyEmailExistOrNot = await PanchkarmaModel.findOne({
//         AdminEmail: AdminEmail
//     })

//     console.log("check error  s ", checkAlreadyEmailExistOrNot);

//     if (checkAlreadyEmailExistOrNot) {
//         res.json({
//             message: "Admin_Email_Already_Present"
//         })
//         return;
//     }

//     const hashedpassword = await bcrypt.hash(password, 5);

//     const centerCreate = await PanchkarmaModel.create({
//         Centername: CenterName,
//         licenseNo: LicenseNo,
//         AdminEmail: AdminEmail,
//         lattitude: Centerlattitude,
//         longitude: Centerlongitude,
//         AdminName: Adminname,
//         MobileNo: mobileNo,
//         Password: hashedpassword,
//         BotNumber:BotNumber
//     })



//     const otp = otpgenerator.generate(6, {
//         digits: true, upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false
//     })

//     const response = await otpmodel.create({
//         email: email,
//         otp: otp
//     })

//     await sendemail(centerCreate.AdminEmail, "Email verification code:", otp);

//     res.json({
//         message: "OTP_Send",
//         email: email
//     })

// })


// PanchakarmaCenterRouter.post("/logIn", async (req, res) => {




// })

// ********************* ADD DOCTOR *************************
PanchakarmaCenterRouter.post("/addDoctor",upload.single("profileImage"),
  async (req, res) => {
    try {
      // console.log("hit add dr routes");

      const requireData = z.object({
        name: z.string().min(3).max(100),
        phone: z.string().min(10).max(13),
        email: z.string().min(5).max(100),
        experience: z.string().min(1).max(100),
        speciality: z.string().min(3).max(100),
        consultationFee: z.string().min(1).max(100000),
        degree: z.string().min(2).max(100),
        licenseNo: z.string().min(10).max(1000),
        address: z.string().min(5).max(100),
        bio: z.string().min(10).max(1000),
      });

      const checkdata = requireData.safeParse(req.body);
      if (!checkdata.success) {
        console.error("Zod validation error:", checkdata.error);
        return res
          .status(422)
          .json({
            message: "Invalid Input types",
            details: checkdata.error.errors,
          });
      }

      // destructure
      const {
        name,
        Adminemail,
        phone,
        email,
        experience,
        speciality,
        consultationFee,
        degree,
        licenseNo,
        address,
        bio,
        gender,
        status,
      } = req.body;

      // Ensure Adminemail exists
      if (!Adminemail) {
        console.warn("Adminemail not provided in req.body");
        return res.status(400).json({ message: "Adminemail_required" });
      }

      // find center
      const checkCenterUser = await PanchakarmaCenterModel.findOne({
        email: Adminemail,
      });
      if (!checkCenterUser) {
        console.warn("Center not found for Adminemail:", Adminemail);
        return res.status(404).json({ message: "Center_Not_Found" });
      }

      // check doctor email
      const checkAlready = await DoctorModel.findOne({ email });
      if (checkAlready) {
        return res
          .status(409)
          .json({ message: "Dr_Email_Present_use_different_one!!" });
      }

      // get image url (cloudinary storage puts url in req.file.path when using multer-storage-cloudinary)
      const imageUrl = req.file ? req.file.path : null;
      // console.log("url is ",imageUrl);

      const doctor = await DoctorModel.create({
        centerId: checkCenterUser._id,
        fullName: name,
        phone,
        email,
        experience,
        speciality,
        consultationFee,
        degree,
        bio,
        status,
        gender,
        address,
        licenseNo,
        profileImg: imageUrl,
      });

      await PanchakarmaCenterModel.findByIdAndUpdate(checkCenterUser._id, {
        $push: { Doctors: doctor._id }},
        {new : true}
      );

      // CREATE NOTIFICATION FOR CENTER ADMIN
      try {
        await NotificationTemplates.doctorAdded(
          checkCenterUser._id,
          name,
          speciality
        );
      } catch (error) {
        console.error("Error creating notification:", error);
      }
      return res.status(201).json({
        message: "doctor_added_success",
        doctorId: doctor._id,
      });
    } catch (err) {
      console.error("Error in /addDoctor:", err && err.stack ? err.stack : err);
      return res.status(500).json({ message: "internal_error", error: err.message || err });
    }
  }
);


PanchakarmaCenterRouter.post("/CenterVerifyOtp", async (req, res) => {

  const { Adminemail, otp } = req.body;

  // console.log("backend otp worksing")
  // console.log(req.body);
  // console.log(Adminemail);
  // console.log(otp);

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
  try {
    console.log("➡️ allcenterList hit");

    // console.log("Model loaded:", PanchkarmaModel && PanchkarmaModel.modelName);

    const allCenters = await PanchakarmaCenterModel.find({});
    // console.log("Centers fetched:", allCenters.length);

    return res.json({
      success: true,
      centers: allCenters,
    });

  } catch (err) {
    console.error("🔥 ERROR inside /allcenterList:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
});

// ******************** ADD THERAPY ********************
PanchakarmaCenterRouter.post("/addTherapy", upload.single("therapyImage"),async (req, res) => {
  //console.log("Therapy API called!");

  const requireData = z.object({
    name: z.string().min(3).max(100),
    duration: z.string().min(2).max(50),
    price: z.string().min(1).max(100000),
    category: z.string().min(2).max(100),
    maxPatientsPerDay: z.string().min(1).max(100),
    description: z.string().min(5).max(2000),
    Adminemail: z.string().min(5).max(100),
  });

  const checkdata = requireData.safeParse(req.body);
  // console.log(req.body);

  if (!checkdata.success) {
    res.status(422).json({ message: "Invalid Input types" });
    return;
  }

  const {
    name,
    duration,
    price,
    category,
    maxPatientsPerDay,
    description,
    Adminemail,
  } = req.body;

  const center = await PanchakarmaCenterModel.findOne({
    email: Adminemail,
  });

  if (!center) {
    res.json({
      message: "Center_Not_Found",
    });
    return;
  }

  const imageUrl = req.file ? req.file.path : null;
  // console.log("url is ", imageUrl);

  await TherapyModel.create({
    centerId: center._id,
    therapyName: name,
    duration,
    price,
    category,
    maxPatientsPerDay,
    description,
    TherapyImg: imageUrl,
  });

  // CREATE NOTIFICATION FOR CENTER ADMIN
  try {
    await NotificationTemplates.therapyAdded(
      center._id,
      name,
      category
    );
  } catch (error) {
    console.error("Error creating notification:", error);
  }

  res.json({
    message: "therapy_added_success",
  });
});

// ******************** ADD THERAPIST ********************
PanchakarmaCenterRouter.post("/addTherapist", upload.single("therapistImage"),async (req, res) => {
  // console.log("Adding therapist...");

  const schema = z.object({
    fullName: z.string().min(3).max(100),
    phone: z.string().min(10).max(13),
    email: z.string().optional(),
    specialization: z.string().min(3).max(100),
    experience: z.string().min(1).max(50),
    qualification: z.string().min(2).max(200),
    address: z.string().min(5).max(200),
    centerAdminEmail: z.string().email(),
  });

  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(422).json({ message: "Invalid_Input" });
  }

  const {
    fullName,
    phone,
    email,
    specialization,
    experience,
    qualification,
    address,
    centerAdminEmail,
  } = req.body;

  // console.log("data", req.body);
  const center = await PanchakarmaCenterModel.findOne({
    email: centerAdminEmail,
  });

  if (!center) {
    return res.json({ message: "Center_Not_Found" });
  }

  // Optional email check
  if (email) {
    const emailExists = await TherapistModel.findOne({ email });
    if (emailExists) {
      return res.json({ message: "Therapist_Email_Already_Used" });
    }
  }

  const imageUrl = req.file ? req.file.path : null;
  // console.log("url is ", imageUrl);

  await TherapistModel.create({
    centerId: center._id,
    fullName,
    phone,
    email,
    specialization,
    experience,
    qualification,
    address,
    therapistImg: imageUrl,
  });

  // CREATE NOTIFICATION FOR CENTER ADMIN
  try {
    await NotificationTemplates.therapistAdded(
      center._id,
      fullName,
      specialization
    );
  } catch (error) {
    console.error("Error creating notification:", error);
  }

  return res.json({ message: "therapist_added_success" });
});


PanchakarmaCenterRouter.post("/get-therapies",async(req,res)=>{
  // console.log("hitting get data routes");

  const {centerId}=req.body;
  console.log("hitting the routes",centerId);

  const PanchakarmaCenter=await PanchakarmaCenterModel.findOne({
    _id:centerId
  });

  const getAllTherapy=await TherapyModel.find({
    centerId:PanchakarmaCenter._id
  })
    
  // console.log("mil gaya data!!!",getAllTherapy);

  res.json({
    getAllTherapy
  })

})


PanchakarmaCenterRouter.post("/get-doctors",async(req,res)=>{
  
  // console.log("hitting get doctor routes");

  const {email}=req.body;

  const PanchakarmaCenter=await PanchakarmaCenterModel.findOne({
    email:email
  });

  const getAllDr=await DoctorModel.find({
    centerId:PanchakarmaCenter._id
  })
    
  // console.log("mil gaya data!!!",getAllDr);

  res.json({
    getAllDr
  })


})

PanchakarmaCenterRouter.post("/get-therapists",async(req,res)=>{
   console.log("hitting get doctor routes");

  const {email}=req.body;

  const PanchakarmaCenter=await PanchakarmaCenterModel.findOne({
    email:email
  });

  const getAllTherapist=await TherapistModel.find({
    centerId:PanchakarmaCenter._id
  })
    
  // console.log("mil gaya data!!!",getAllTherapist);

  res.json({
    getAllTherapist
  })  
})

// *************************** GET CENTER PROFILE ********************************
PanchakarmaCenterRouter.post("/getCenterProfile", async function (req, res) {
  console.log("hitting profile route")
  try {
    const { centerId } = req.body;
    console.log(centerId);


    if (!centerId) {
      return res.status(400).json({ message: "CenterId_Required" });
    }

    const center = await PanchakarmaCenterModel.findOne({ _id:centerId });

    if (!center) {
      return res.status(404).json({ message: "Center_Not_Found" });
    }

    return res.status(200).json({
      message: "Profile_Fetched_Successfully",
      center: center,
    });
  } catch (err) {
    console.error("Error in /getCenterProfile:", err);
    return res.status(500).json({
      message: "Internal_Server_Error",
      error: err.message,
    });
  }
});

// *************************** UPDATE CENTER PROFILE ********************************
PanchakarmaCenterRouter.post("/updateCenterProfile",upload.single("profileImg"),
  async function (req, res) {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({ message: "Email_Required" });
      }

      const center = await PanchakarmaCenterModel.findOne({ email: email });

      if (!center) {
        return res.status(404).json({ message: "Center_Not_Found" });
      }

      // Update allowed fields
      if (req.body.Adminname) center.Adminname = req.body.Adminname;
      if (req.body.CenterName) center.CenterName = req.body.CenterName;
      if (req.body.MobileNo) center.MobileNo = req.body.MobileNo;
      if (req.body.location) center.location = req.body.location;
      if (req.body.latitude) center.latitude = parseFloat(req.body.latitude);
      if (req.body.longitude) center.longitude = parseFloat(req.body.longitude);
      if (req.body.BotNumber) center.BotNumber = req.body.BotNumber;

      // Handle profile image
      if (req.file) {
        center.profileImg = req.file.path;
      }

      await center.save();

      // CREATE NOTIFICATION FOR CENTER ADMIN
      try {
        await NotificationTemplates.profileUpdated(
          center._id,
          center.Adminname
        );
      } catch (error) {
        console.error("Error creating notification:", error);
      }

      return res.status(200).json({
        message: "Profile_Updated_Successfully",
        center: {
          id: center._id,
          name: center.Adminname,
          email: center.email,
          centerName: center.CenterName,
          role: center.role,
          profileImg: center.profileImg,
          mobileNo: center.MobileNo,
          location: center.location,
          licenseNo: center.licenseNo,
          latitude: center.latitude,
          longitude: center.longitude,
          BotNumber: center.BotNumber,
        },
      });
    } catch (err) {
      console.error("Error in /updateCenterProfile:", err);
      return res.status(500).json({
        message: "Internal_Server_Error",
        error: err.message,
      });
    }
  }
);


// *************************** GET NOTIFICATION UNREAD ********************************
PanchakarmaCenterRouter.get(
  "/getCenterNotifications",
  async function (req, res) {
    try {
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const decoded = jwt.verify(token, process.env.JWT_KEY || JWT_KEY);
      // console.log("🔍 Token decoded:", decoded);

      // Find center by _id from token.id
      const center = await PanchakarmaCenterModel.findOne({ _id: decoded.id });

      if (!center) {
        // console.log("❌ Center not found for id:", decoded.id);
        return res.status(404).json({ message: "Center_Not_Found" });
      }

      // console.log("✅ Center found:", center._id);

      const notifications = await notificationModel
        .find({
          userId: center._id,
          userType: "centerHead",
        })
        .sort({ createdAt: -1 })
        .limit(50);

      const unreadCount = await notificationModel.countDocuments({
        userId: center._id,
        userType: "centerHead",
        read: false,
      });

      return res.json({ notifications, unreadCount });
    } catch (err) {
      console.error("Error in /getCenterNotifications:", err);
      return res
        .status(500)
        .json({ message: "Server_Error", error: err.message });
    }
  }
);


// *************************** MARK CENTER NOTIFICATION AS READ ********************************
PanchakarmaCenterRouter.post(
  "/markCenterNotificationRead",
  async function (req, res) {
    try {
      const { notificationId } = req.body;

      if (!notificationId) {
        return res.status(400).json({ message: "NotificationId_Required" });
      }

      const notification = await notificationModel.findByIdAndUpdate(
        notificationId,
        { read: true },
        { new: true }
      );

      if (!notification) {
        return res.status(404).json({ message: "Notification_Not_Found" });
      }

      return res.status(200).json({
        message: "Notification_Marked_As_Read",
        notification: notification,
      });
    } catch (err) {
      console.error("Error in /markCenterNotificationRead:", err);
      return res.status(500).json({
        message: "Internal_Server_Error",
        error: err.message,
      });
    }
  }
);

// *************************** MARK ALL CENTER NOTIFICATIONS AS READ ********************************
PanchakarmaCenterRouter.post(
  "/markAllCenterNotificationsRead",
  async function (req, res) {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({ message: "Email_Required" });
      }

      const center = await PanchakarmaCenterModel.findOne({ email: email });

      if (!center) {
        return res.status(404).json({ message: "Center_Not_Found" });
      }

      const result = await notificationModel.updateMany(
        {
          userId: center._id,
          userType: "centerHead",
          read: false,
        },
        { read: true }
      );

      return res.status(200).json({
        message: "All_Notifications_Marked_As_Read",
        modifiedCount: result.modifiedCount,
      });
    } catch (err) {
      console.error("Error in /markAllCenterNotificationsRead:", err);
      return res.status(500).json({
        message: "Internal_Server_Error",
        error: err.message,
      });
    }
  }
);

// *************************** DELETE CENTER NOTIFICATION ********************************
PanchakarmaCenterRouter.post(
  "/deleteCenterNotification",
  async function (req, res) {
    try {
      const { notificationId } = req.body;

      if (!notificationId) {
        return res.status(400).json({ message: "NotificationId_Required" });
      }

      const notification = await notificationModel.findByIdAndDelete(
        notificationId
      );

      if (!notification) {
        return res.status(404).json({ message: "Notification_Not_Found" });
      }

      return res.status(200).json({
        message: "Notification_Deleted_Successfully",
      });
    } catch (err) {
      console.error("Error in /deleteCenterNotification:", err);
      return res.status(500).json({
        message: "Internal_Server_Error",
        error: err.message,
      });
    }
  }
);


module.exports = {
  PanchakarmaCenterRouter: PanchakarmaCenterRouter
}