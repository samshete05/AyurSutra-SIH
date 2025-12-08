import React, { useEffect, useState } from "react";
import Loader from "../../components/Loader";

import WaterCard from "../../components/patient/progrssCards/WaterCard";
import MoodCard from "../../components/patient/progrssCards/MoodCard";
import SymptomCard from "../../components/patient/progrssCards/SymptomCard";
import SleepCard from "../../components/patient/progrssCards/SleepCard";
import ActivityCard from "../../components/patient/progrssCards/ActivityCard";
import MedicationCard from "../../components/patient/progrssCards/MedicationCard";

import {
  Droplets,
  Smile,
  Moon,
  Activity as StepsIcon,
  HeartPulse,
  Pill
} from "lucide-react";

import WellnessTrendChart from "../../components/patient/progrssCards/WellnessTrendChart";
import DailyRadarChart from "../../components/patient/progrssCards/DailyRadarChart";

const themeColor = "#1e4b3c";

/* ---------------- CALCULATE WELLNESS SCORE ---------------- */
function calculateWellness(today) {
  if (!today) return 0;

  // WATER
  const waterScore = Math.min(
    (today.water?.glasses || 0) / (today.water?.target || 8),
    1
  ) * 100;

  // MOOD
  const moodMap = {
    very_happy: 100,
    happy: 80,
    neutral: 60,
    sad: 40,
    very_sad: 20
  };
  const moodScore = moodMap[today.mood?.mood] || 60;

  // SLEEP
  const h = today.sleep?.hours || 0;
  let sleepScore = 0;
  if (h >= 8) sleepScore = 100;
  else if (h >= 7) sleepScore = 90;
  else if (h >= 6) sleepScore = 70;
  else if (h >= 5) sleepScore = 50;
  else sleepScore = 30;

  // ACTIVITY
  const stepsScore = Math.min((today.activity?.steps || 0) / 8000, 1) * 70;
  const exerciseScore = Math.min((today.activity?.exerciseMinutes || 0) / 30, 1) * 30;
  const activityScore = stepsScore + exerciseScore;

  // SYMPTOMS (reverse scale)
  const sev = today.symptom?.severity ?? 0;
  const symptomScore = (1 - sev / 10) * 100;

  // MEDICATION
  const medicationScore = today.medication?.taken ? 100 : 40;

  // WEIGHTED FINAL SCORE
  const totalScore =
    waterScore * 0.15 +
    moodScore * 0.20 +
    sleepScore * 0.20 +
    activityScore * 0.20 +
    symptomScore * 0.15 +
    medicationScore * 0.10;

  return Math.round(totalScore);
}

/* ========================== MAIN PAGE ========================== */
function ProgressPage() {
  const [loading, setLoading] = useState(true);
  const [todayData, setTodayData] = useState(null);

  useEffect(() => {
    fetchToday();
  }, []);

  const fetchToday = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      window.location.href = "/login";
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/patient/progress/today", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });

      const data = await response.json();
      setTodayData(response.ok ? data : null);
    } catch (err) {
      console.error("Progress fetch error:", err);
      setTodayData(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  /* ------------------------- COMPLETION % ------------------------- */
  const calculateProgress = () => {
    if (!todayData) return 0;

    const checks = [
      todayData.water?.glasses >= todayData.water?.target,
      !!todayData.mood?.mood,
      todayData.sleep?.hours > 0,
      todayData.activity?.steps > 0,
      todayData.symptom?.severity !== undefined,
      todayData.medication?.taken
    ];

    const completed = checks.filter(Boolean).length;
    return Math.round((completed / checks.length) * 100);
  };

  const progressPercent = calculateProgress();
  const wellnessScore = calculateWellness(todayData);

  return (
    <div className="min-h-screen bg-gray-50 pb-10 rounded-2xl">

      {/* ===================== HERO BANNER ===================== */}
      <div
        className="relative w-full h-100 bg-cover bg-center rounded-2xl"
        style={{
          backgroundImage: "url('/public/progress-banner.jpg')"
        }}
      >
        <div className="relative max-w-7xl mx-auto px-6 py-12 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">

            {/* LEFT TEXT */}
            <div>
              <h1 className="text-4xl font-bold mb-2">
                नमस्ते, Welcome Back
              </h1>
              <p className="text-sm opacity-80">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric"
                })}
              </p>
            </div>

            {/* RIGHT SIDE WELLNESS SCORE BOX */}
            <div className="bg-white/20 backdrop-blur-md rounded-2xl px-6 py-4 flex flex-col items-center border border-white/30">
              <p className="text-lg font-semibold">Wellness Score</p>
              <p className="text-4xl font-extrabold mt-1">{wellnessScore}</p>
            </div>

          </div>
        </div>
      </div>

      {/* ===================== QUICK STATS ===================== */}
      <div className="max-w-7xl mx-auto px-6 mt-6">
        <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-6">

            <QuickStat icon={<Droplets size={20} color={themeColor} />} label="Water"
              value={`${todayData?.water?.glasses || 0}/${todayData?.water?.target || 8}`} />

            <QuickStat icon={<Smile size={20} color={themeColor} />} label="Mood"
              value={todayData?.mood?.mood || "Neutral"} />

            <QuickStat icon={<Moon size={20} color={themeColor} />} label="Sleep"
              value={`${todayData?.sleep?.hours || 0} hrs`} />

            <QuickStat icon={<StepsIcon size={20} color={themeColor} />} label="Steps"
              value={todayData?.activity?.steps || 0} />

            <QuickStat icon={<HeartPulse size={20} color={themeColor} />} label="Symptom"
              value={`Level ${todayData?.symptom?.severity || 0}`} />

            <QuickStat icon={<Pill size={20} color={themeColor} />} label="Medication"
              value={todayData?.medication?.taken ? "Taken" : "Pending"} />

          </div>
        </div>
      </div>

      {/* ===================== MAIN CARDS ===================== */}
      <div className="max-w-7xl mx-auto px-6 mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <WaterCard data={todayData?.water} refresh={fetchToday} />
        <MoodCard data={todayData?.mood} refresh={fetchToday} />
        <SleepCard data={todayData?.sleep} refresh={fetchToday} />
        <ActivityCard data={todayData?.activity} refresh={fetchToday} />
        <SymptomCard data={todayData?.symptom} refresh={fetchToday} />
        <MedicationCard data={todayData?.medication} refresh={fetchToday} />
      </div>

      {/* ===================== CHARTS ===================== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 px-6 max-w-7xl mx-auto">
        <WellnessTrendChart days={14} />
        <DailyRadarChart />
      </div>

    </div>
  );
}

/* ===================== QUICK STAT COMPONENT ===================== */
function QuickStat({ icon, label, value }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-10 h-10 rounded-xl border border-gray-200 bg-gray-50 flex items-center justify-center mb-2">
        {icon}
      </div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-sm font-semibold text-gray-700">{value}</p>
    </div>
  );
}

export default ProgressPage;
