const express = require("express");
const doctorDashboardRouter = express.Router();


// GET /doctor-dashboard/appointments
doctorDashboardRouter.get("/appointments", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, JWT_KEY);
    const centerId = decoded.centerId;

    if (!centerId) {
      return res.status(400).json({ message: "CenterId_missing_in_token" });
    }

    // Fetch all appointments for this center
    const appointments = await CenterGeneralAppointment.find({
      CenterId: centerId,
    })
      .sort({ appointmentDate: 1 })
      .lean();

    return res.json({
      message: "Success",
      count: appointments.length,
      appointments,
    });
  } catch (err) {
    console.error("Error in /doctor-dashboard/appointments:", err);
    return res.status(500).json({ message: "Server_error" });
  }
});



// GET /doctor-dashboard/appointments-by-date
doctorDashboardRouter.get("/appointments-by-date", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, JWT_KEY);
    const centerId = decoded.centerId;

    const { date, slot } = req.query; // date: "2025-12-09", slot: "morning" | "evening"

    const query = { CenterId: centerId };

    if (date) {
      query.appointmentDate = date; // since your schema stores date as string
    }

    if (slot) {
      query.appointmentSlot = slot;
    }

    const appointments = await CenterGeneralAppointment.find(query)
      .sort({ appointmentDate: 1 })
      .lean();

    return res.json({
      message: "Success",
      count: appointments.length,
      appointments,
    });
  } catch (err) {
    console.error("Error in /doctor-dashboard/appointments-by-date:", err);
    return res.status(500).json({ message: "Server_error" });
  }
});





// GET /doctor-dashboard/appointments/:id
doctorDashboardRouter.get("/appointments/:id", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, JWT_KEY);
    const centerId = decoded.centerId;

    const { id } = req.params;

    const appointment = await CenterGeneralAppointment.findOne({
      _id: id,
      CenterId: centerId,
    }).lean();

    if (!appointment) {
      return res.status(404).json({ message: "Appointment_Not_Found" });
    }

    return res.json({
      message: "Success",
      appointment,
    });
  } catch (err) {
    console.error("Error in /doctor-dashboard/appointments/:id:", err);
    return res.status(500).json({ message: "Server_error" });
  }
});


module.exports = doctorDashboardRouter;