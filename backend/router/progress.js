const express = require("express");
const progressRouter = express.Router();
const jwt = require("jsonwebtoken");
const JWT_KEY = process.env.JWT_KEY;
const PatientProgress = require("../models/PatientProgress.model");

function createDefaultProgress(patientId, today) {
  return new PatientProgress({
    patientId,
    date: today,
    water: { glasses: 0, target: 8, completed: false },
    mood: { mood: "neutral", stressLevel: 0, completed: false },
    symptom: { severity: 0, notes: "", completed: false },
    sleep: { hours: 0, quality: 3, completed: false },
    activity: {
      steps: 0,
      exerciseMinutes: 0,
      activityLevel: "sedentary",
      completed: false,
    },
    medication: { taken: false, missedDoses: 0, completed: false },
  });
}

// -----------------------------------------------
// Helper: Ensure nested fields always exist
// -----------------------------------------------
function ensureSubfields(progress) {
  progress.water ||= { glasses: 0, target: 8, completed: false };
  progress.mood ||= { mood: "neutral", stressLevel: 0, completed: false };
  progress.symptom ||= { severity: 0, notes: "", completed: false };
  progress.sleep ||= { hours: 0, quality: 3, completed: false };
  progress.activity ||= {
    steps: 0,
    exerciseMinutes: 0,
    activityLevel: "sedentary",
    completed: false,
  };
  progress.medication ||= {
    taken: false,
    missedDoses: 0,
    completed: false,
  };
}

// ********************** GET TODAY PROGRESS **********************
progressRouter.get("/progress/today", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, JWT_KEY);
    const patientId = decoded.id;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let progress = await PatientProgress.findOne({ patientId, date: today });

    if (!progress) {
      return res.json({ message: "No_Progress_Found", today: null });
    }

    ensureSubfields(progress);

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
    res.status(500).json({ message: "Server_Error" });
  }
});

// ********************** UPDATE WATER **********************
progressRouter.put("/progress/updateWater", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, JWT_KEY);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let progress =
      (await PatientProgress.findOne({ patientId: decoded.id, date: today })) ||
      createDefaultProgress(decoded.id, today);

    ensureSubfields(progress);

    const { glasses } = req.body;
    if (glasses === undefined)
      return res.status(422).json({ message: "Invalid_Input" });

    progress.water.glasses = glasses;
    progress.water.completed = glasses >= progress.water.target;

    await progress.save();

    res.json({ message: "Water_Updated", water: progress.water });
  } catch (err) {
    console.error("Error updating water:", err);
    res.status(500).json({ message: "Server_Error" });
  }
});

// ********************** UPDATE MOOD **********************
progressRouter.put("/progress/updateMood", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, JWT_KEY);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let progress =
      (await PatientProgress.findOne({ patientId: decoded.id, date: today })) ||
      createDefaultProgress(decoded.id, today);

    ensureSubfields(progress);

    const { mood, stressLevel } = req.body;
    if (!mood || stressLevel === undefined)
      return res.status(422).json({ message: "Invalid_Input" });

    progress.mood.mood = mood;
    progress.mood.stressLevel = stressLevel;
    progress.mood.completed = true;

    await progress.save();

    res.json({ message: "Mood_Updated", mood: progress.mood });
  } catch (err) {
    console.error("Error updating mood:", err);
    res.status(500).json({ message: "Server_Error" });
  }
});

// ********************** UPDATE SYMPTOM **********************
progressRouter.put("/progress/updateSymptom", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, JWT_KEY);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let progress =
      (await PatientProgress.findOne({ patientId: decoded.id, date: today })) ||
      createDefaultProgress(decoded.id, today);

    ensureSubfields(progress);

    const { severity, notes } = req.body;
    if (severity === undefined)
      return res.status(422).json({ message: "Invalid_Input" });

    progress.symptom.severity = severity;
    progress.symptom.notes = notes || "";
    progress.symptom.completed = true;

    await progress.save();

    res.json({ message: "Symptom_Updated", symptom: progress.symptom });
  } catch (err) {
    console.error("Error updating symptom:", err);
    res.status(500).json({ message: "Server_Error" });
  }
});

// ********************** UPDATE SLEEP **********************
progressRouter.put("/progress/updateSleep", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, JWT_KEY);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let progress =
      (await PatientProgress.findOne({ patientId: decoded.id, date: today })) ||
      createDefaultProgress(decoded.id, today);

    ensureSubfields(progress);

    const { hours, quality } = req.body;
    if (hours === undefined || quality === undefined)
      return res.status(422).json({ message: "Invalid_Input" });

    progress.sleep.hours = hours;
    progress.sleep.quality = quality;
    progress.sleep.completed = true;

    await progress.save();

    res.json({ message: "Sleep_Updated", sleep: progress.sleep });
  } catch (err) {
    console.error("Error updating sleep:", err);
    res.status(500).json({ message: "Server_Error" });
  }
});

// ********************** UPDATE ACTIVITY **********************
progressRouter.put("/progress/updateActivity", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, JWT_KEY);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let progress =
      (await PatientProgress.findOne({ patientId: decoded.id, date: today })) ||
      createDefaultProgress(decoded.id, today);

    ensureSubfields(progress);

    const { steps, exerciseMinutes, activityLevel } = req.body;
    if (steps === undefined || exerciseMinutes === undefined || !activityLevel)
      return res.status(422).json({ message: "Invalid_Input" });

    progress.activity.steps = steps;
    progress.activity.exerciseMinutes = exerciseMinutes;
    progress.activity.activityLevel = activityLevel;
    progress.activity.completed = true;

    await progress.save();

    res.json({ message: "Activity_Updated", activity: progress.activity });
  } catch (err) {
    console.error("Error updating activity:", err);
    res.status(500).json({ message: "Server_Error" });
  }
});

// ********************** UPDATE MEDICATION **********************
progressRouter.put("/progress/updateMedication", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, JWT_KEY);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let progress =
      (await PatientProgress.findOne({ patientId: decoded.id, date: today })) ||
      createDefaultProgress(decoded.id, today);

    ensureSubfields(progress);

    const { taken, missedDoses } = req.body;
    if (taken === undefined)
      return res.status(422).json({ message: "Invalid_Input" });

    progress.medication.taken = taken;
    progress.medication.missedDoses = missedDoses || 0;
    progress.medication.completed = taken === true;

    await progress.save();

    res.json({
      message: "Medication_Updated",
      medication: progress.medication,
    });
  } catch (err) {
    console.error("Error updating medication:", err);
    res.status(500).json({ message: "Server_Error" });
  }
});

// *************************** GET WELLNESS SCORE HISTORY ****************************
progressRouter.get("/progress/scoreHistory", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, JWT_KEY);
    const patientId = decoded.id;

    const days = Number(req.query.days) || 7;

    const startDate = new Date();
    startDate.setHours(0, 0, 0, 0);
    startDate.setDate(startDate.getDate() - days);

    const history = await PatientProgress.find({
      patientId,
      date: { $gte: startDate }
    }).sort({ date: 1 });

    const results = history.map(p => {
      const tasks = [
        p.water.completed,
        p.mood.completed,
        p.symptom.completed,
        p.sleep.completed,
        p.activity.completed,
        p.medication.completed
      ];

      const completed = tasks.filter(Boolean).length;
      const score = Math.round((completed / tasks.length) * 100);

      return {
        date: p.date,
        score
      };
    });

    res.json({
      message: "Success",
      history: results
    });

  } catch (err) {
    console.error("Error fetching score history:", err);
    return res.status(500).json({ message: "Server_Error" });
  }
});

// *************************** GET RADAR CHART DATA ****************************
progressRouter.get("/progress/radarData", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, JWT_KEY);
    const patientId = decoded.id;

    // Today normalized
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const progress = await PatientProgress.findOne({
      patientId,
      date: today
    });

    if (!progress) {
      return res.json({
        message: "No_Progress_Found",
        radar: null
      });
    }

    // normalized values (0–100)
    const radar = {
      Water: Math.min((progress.water.glasses / progress.water.target) * 100, 100),
      Mood: progress.mood.completed ? 100 : 0,
      Sleep: progress.sleep.hours > 0 ? Math.min((progress.sleep.hours / 8) * 100, 100) : 0,
      Activity: progress.activity.steps > 0 ? Math.min((progress.activity.steps / 6000) * 100, 100) : 0,
      Symptom: progress.symptom.completed ? 100 - progress.symptom.severity * 10 : 0,
      Medication: progress.medication.taken ? 100 : 0
    };

    res.json({
      message: "Success",
      radar
    });

  } catch (err) {
    console.error("Error fetching radar data:", err);
    return res.status(500).json({ message: "Server_Error" });
  }
});

module.exports = progressRouter;
