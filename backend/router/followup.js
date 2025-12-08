const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");


// =====================================
// FOLLOW-UP SCHEMA (MVP VERSION)
// =====================================
const FollowUpSchema = new mongoose.Schema(
  {
    patientId: { type: String, required: true },
    patientName: { type: String, required: true },

    appointmentId: { type: String, default: null },

    followupDate: { type: String, required: true },
    followupTime: { type: String, required: true },

    serviceType: { type: String, default: "" },
    notes: { type: String, default: "" },

    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const FollowUp = mongoose.model("FollowUp", FollowUpSchema);



// =====================================
// CREATE FOLLOW-UP (NO AUTH)
// =====================================
router.post("/", async (req, res) => {
  try {
    const {
      patientId,
      patientName,
      appointmentId,
      followupDate,
      followupTime,
      notes,
      serviceType,
    } = req.body;

    if (!patientId || !patientName || !followupDate || !followupTime) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const followUp = await FollowUp.create({
      patientId,
      patientName,
      appointmentId: appointmentId || null,
      followupDate,
      followupTime,
      notes: notes || "",
      serviceType: serviceType || "",
    });

    res.status(201).json({ success: true, followUp });
  } catch (err) {
    console.error("Follow-up creation error:", err);
    res.status(500).json({ error: "Server error" });
  }
});



// =====================================
// GET ALL FOLLOW-UPs (GLOBAL)
// =====================================
router.get("/", async (req, res) => {
  try {
    const followups = await FollowUp.find().sort({
      followupDate: 1,
      followupTime: 1,
    });

    res.json({ success: true, followups });
  } catch (err) {
    console.error("Follow-up fetch error:", err);
    res.status(500).json({ error: "Server error" });
  }
});



// =====================================
// MARK FOLLOW-UP AS COMPLETED
// =====================================
router.put("/:id/complete", async (req, res) => {
  try {
    const followUp = await FollowUp.findByIdAndUpdate(
      req.params.id,
      { status: "completed" },
      { new: true }
    );

    if (!followUp) {
      return res.status(404).json({ error: "Follow-up not found" });
    }

    res.json({ success: true, followUp });
  } catch (err) {
    console.error("Status update error:", err);
    res.status(500).json({ error: "Server error" });
  }
});



module.exports = router;
