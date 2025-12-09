const express = require("express");
const adrRouter = express.Router();
const ADRReport = require("../models/ADRReport.model");
const PatientModel = require("../models/Patient.model");
const PanchakarmaCenterModel = require("../models/PanchakarmaCenter.model");
const jwt = require("jsonwebtoken");

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// Get all patients list
adrRouter.get("/patients/list", verifyToken, async (req, res) => {
  try {
    const patients = await PatientModel.find()
      .select("_id name email mobileNo address city state dateOfBirth gender prakriti primaryDosha chronicConditions smokingStatus alcoholConsumption allergies currentMedications")
      .limit(100);

    res.json(patients);
  } catch (error) {
    console.error("Error fetching patients:", error);
    res.status(500).json({ message: "Error fetching patients", error: error.message });
  }
});

// Get specific patient details
adrRouter.get("/patients/:patientId", verifyToken, async (req, res) => {
  try {
    const patient = await PatientModel.findById(req.params.patientId);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.json(patient);
  } catch (error) {
    console.error("Error fetching patient:", error);
    res.status(500).json({ message: "Error fetching patient", error: error.message });
  }
});

// Get all centers list
adrRouter.get("/centers/list", verifyToken, async (req, res) => {
  try {
    const centers = await PanchakarmaCenterModel.find()
      .select("_id CenterName centerCode address city state")
      .limit(100);

    res.json(centers);
  } catch (error) {
    console.error("Error fetching centers:", error);
    res.status(500).json({ message: "Error fetching centers", error: error.message });
  }
});

// Get current user info
adrRouter.get("/auth/me", verifyToken, async (req, res) => {
  try {
    // Decode token to get user info
    const token = req.headers.authorization?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    
    res.json({
      id: decoded.id,
      name: decoded.name || "User",
      email: decoded.email,
      role: decoded.role,
      MobileNo: decoded.mobileNo
    });
  } catch (error) {
    console.error("Error getting user info:", error);
    res.status(500).json({ message: "Error getting user info" });
  }
});

// Create/Submit ADR Report
adrRouter.post("/adr-reports", verifyToken, async (req, res) => {
  try {
    const { adrNumberYear, ...reportData } = req.body;

    // Check if report with same ADR number already exists
    const existingReport = await ADRReport.findOne({ adrNumberYear });
    if (existingReport) {
      return res.status(400).json({ message: "ADR number already exists" });
    }

    const newReport = new ADRReport({
      adrNumberYear,
      ...reportData,
      submittedBy: req.user.id,
      submittedAt: new Date(),
      status: "Submitted"
    });

    const savedReport = await newReport.save();
    res.status(201).json({
      message: "ADR Report submitted successfully",
      reportId: savedReport._id,
      adrNumber: savedReport.adrNumberYear
    });
  } catch (error) {
    console.error("Error submitting ADR report:", error);
    res.status(500).json({ message: "Error submitting report", error: error.message });
  }
});

// Get all ADR reports (admin view)
adrRouter.get("/adr-reports", verifyToken, async (req, res) => {
  try {
    const reports = await ADRReport.find()
      .populate("patientId", "name email")
      .populate("submittedBy", "name email")
      .sort({ submittedAt: -1 });

    res.json(reports);
  } catch (error) {
    console.error("Error fetching reports:", error);
    res.status(500).json({ message: "Error fetching reports", error: error.message });
  }
});

// Get specific ADR report
adrRouter.get("/adr-reports/:reportId", verifyToken, async (req, res) => {
  try {
    const report = await ADRReport.findById(req.params.reportId)
      .populate("patientId")
      .populate("submittedBy");

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    res.json(report);
  } catch (error) {
    console.error("Error fetching report:", error);
    res.status(500).json({ message: "Error fetching report", error: error.message });
  }
});

// Update ADR report
adrRouter.put("/adr-reports/:reportId", verifyToken, async (req, res) => {
  try {
    const report = await ADRReport.findByIdAndUpdate(
      req.params.reportId,
      req.body,
      { new: true }
    );

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    res.json({ message: "Report updated successfully", report });
  } catch (error) {
    console.error("Error updating report:", error);
    res.status(500).json({ message: "Error updating report", error: error.message });
  }
});

module.exports = adrRouter;
