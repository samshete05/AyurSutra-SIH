const express = require("express");
const router = express.Router();
const PatientAppointment = require("../models/CenterAppointment.model");

// GET ALL APPOINTMENTS (MVP)
router.get("/", async (req, res) => {
  try {
    const appointments = await PatientAppointment.find()
      .sort({ appointmentDate: 1, appointmentSlot: 1 });

    res.json({ success: true, appointments });
  } catch (err) {
    console.error("Fetch appointments error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
