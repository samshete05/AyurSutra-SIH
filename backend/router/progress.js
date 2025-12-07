const express = require("express");
const progressRouter = express.Router();
const jwt = require("jsonwebtoken");
const JWT_KEY = process.env.JWT_KEY;
const PatientProgress = require("../models/PatientProgress.model");


// **************************** PROGRESS TODAY ****************************
progressRouter.get("/progress/today", async function (req, res) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, JWT_KEY);
    const patientId = decoded.id;

    // Normalize today's date (00:00:00)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let progress = await PatientProgress.findOne({
      patientId,
      date: today,
    });

    // If no entry, return null (frontend shows empty state)
    if (!progress) {
      return res.json({
        message: "No_Progress_Found",
        today: null,
      });
    }

    // Calculate completion %
    const tasks = [
      progress.water.completed,
      progress.mood.completed,
      progress.symptom.completed,
      progress.sleep.completed,
      progress.activity.completed,
      progress.medication.completed,
    ];

    const completed = tasks.filter(Boolean).length;
    const completionPercent = Math.round((completed / tasks.length) * 100);

    return res.json({
      message: "Success",
      completionPercent,
      water: progress.water,
      mood: progress.mood,
      symptom: progress.symptom,
      sleep: progress.sleep,
      activity: progress.activity,
      medication: progress.medication,
    });
  } catch (err) {
    console.error("Error fetching today progress:", err);
    return res.status(500).json({ message: "Server_Error" });
  }
});

// *************************** UPDATE WATER INTAKE ********************************
progressRouter.put("/progress/updateWater", async function(req, res) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, JWT_KEY);
    const patientId = decoded.id;

    const { glasses } = req.body;

    if (glasses === undefined) {
      return res.status(422).json({ message: "Invalid_Input" });
    }

    // Normalize today's date
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Auto-create today's progress document if not present
    let progress = await PatientProgress.findOne({ patientId, date: today });

    if (!progress) {
      progress = new PatientProgress({
        patientId,
        date: today,
      });
    }

    // Update water
    progress.water.glasses = glasses;
    progress.water.completed = glasses >= progress.water.target;

    await progress.save();

    return res.json({
      message: "Water_Updated",
      water: progress.water,
    });

  } catch (err) {
    console.error("Error updating water:", err);
    return res.status(500).json({ message: "Server_Error" });
  }
});

// *************************** UPDATE MOOD ********************************
progressRouter.put("/progress/updateMood", async function (req, res) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, JWT_KEY);
    const patientId = decoded.id;

    const { mood, stressLevel } = req.body;

    if (!mood || stressLevel === undefined) {
      return res.status(422).json({ message: "Invalid_Input" });
    }

    // Normalize today's date
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let progress = await PatientProgress.findOne({
      patientId,
      date: today,
    });

    // Auto-create if not found
    if (!progress) {
      progress = new PatientProgress({
        patientId,
        date: today,
      });
    }

    // Update mood
    progress.mood.mood = mood;
    progress.mood.stressLevel = stressLevel;
    progress.mood.completed = true;

    await progress.save();

    return res.json({
      message: "Mood_Updated",
      mood: progress.mood,
    });
  } catch (err) {
    console.error("Error updating mood:", err);
    return res.status(500).json({ message: "Server_Error" });
  }
});

// *************************** UPDATE SYMPTOM ********************************
progressRouter.put("/progress/updateSymptom", async function (req, res) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, JWT_KEY);
    const patientId = decoded.id;

    const { severity, notes } = req.body;

    if (severity === undefined) {
      return res.status(422).json({ message: "Invalid_Input" });
    }

    // Normalize today's date
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let progress = await PatientProgress.findOne({
      patientId,
      date: today,
    });

    // Auto-create document if needed
    if (!progress) {
      progress = new PatientProgress({
        patientId,
        date: today,
      });
    }

    // Update symptom
    progress.symptom.severity = severity;
    progress.symptom.notes = notes || "";
    progress.symptom.completed = true;

    await progress.save();

    return res.json({
      message: "Symptom_Updated",
      symptom: progress.symptom,
    });
  } catch (err) {
    console.error("Error updating symptom:", err);
    return res.status(500).json({ message: "Server_Error" });
  }
});

// *************************** UPDATE SLEEP ********************************
progressRouter.put("/progress/updateSleep", async function (req, res) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, JWT_KEY);
    const patientId = decoded.id;

    const { hours, quality } = req.body;

    if (hours === undefined || quality === undefined) {
      return res.status(422).json({ message: "Invalid_Input" });
    }

    // Normalize today's date
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let progress = await PatientProgress.findOne({
      patientId,
      date: today,
    });

    // Create if missing
    if (!progress) {
      progress = new PatientProgress({
        patientId,
        date: today,
      });
    }

    // Update sleep fields
    progress.sleep.hours = hours;
    progress.sleep.quality = quality;
    progress.sleep.completed = true;

    await progress.save();

    return res.json({
      message: "Sleep_Updated",
      sleep: progress.sleep,
    });
  } catch (err) {
    console.error("Error updating sleep:", err);
    return res.status(500).json({ message: "Server_Error" });
  }
});

// *************************** UPDATE ACTIVITY ********************************
progressRouter.put("/progress/updateActivity", async function (req, res) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, JWT_KEY);
    const patientId = decoded.id;

    const { steps, exerciseMinutes, activityLevel } = req.body;

    if (steps === undefined || exerciseMinutes === undefined || !activityLevel) {
      return res.status(422).json({ message: "Invalid_Input" });
    }

    // Normalize today's date
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let progress = await PatientProgress.findOne({
      patientId,
      date: today,
    });

    // Auto-create if not found
    if (!progress) {
      progress = new PatientProgress({
        patientId,
        date: today,
      });
    }

    // Update activity fields
    progress.activity.steps = steps;
    progress.activity.exerciseMinutes = exerciseMinutes;
    progress.activity.activityLevel = activityLevel;
    progress.activity.completed = true;

    await progress.save();

    return res.json({
      message: "Activity_Updated",
      activity: progress.activity,
    });
  } catch (err) {
    console.error("Error updating activity:", err);
    return res.status(500).json({ message: "Server_Error" });
  }
});

// *************************** UPDATE MEDICATION ********************************
progressRouter.put("/progress/updateMedication", async function (req, res) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, JWT_KEY);
    const patientId = decoded.id;

    const { taken, missedDoses } = req.body;

    if (taken === undefined) {
      return res.status(422).json({ message: "Invalid_Input" });
    }

    // Normalize today's date
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let progress = await PatientProgress.findOne({
      patientId,
      date: today,
    });

    // Auto-create if not found
    if (!progress) {
      progress = new PatientProgress({
        patientId,
        date: today,
      });
    }

    // Update medication fields
    progress.medication.taken = taken;
    progress.medication.missedDoses = missedDoses || 0;
    progress.medication.completed = taken === true;

    await progress.save();

    return res.json({
      message: "Medication_Updated",
      medication: progress.medication,
    });

  } catch (err) {
    console.error("Error updating medication:", err);
    return res.status(500).json({ message: "Server_Error" });
  }
});


module.exports = progressRouter;
