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
import InsightsOverlay from "../../components/patient/progrssCards/InsightsOverlay";

const themeColor = "#1e4b3c";

function ProgressPage() {
  const [loading, setLoading] = useState(true);
  const [todayData, setTodayData] = useState(null);
  const [showInsights, setShowInsights] = useState(true);

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
      const response = await fetch(
        "http://localhost:3000/patient/progress/today",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      );

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

  // Calculate completion percentage
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

  return (
    <div className="min-h-screen bg-gray-50 pb-10 rounded-2xl">

      {/* ******************** HERO BANNER ******************** */}
      <div
        className="relative w-full h-100 bg-cover bg-center rounded-2xl"
        style={{
          backgroundImage:
            "url('/public/progress-banner.jpg')",
        }}
      >
        {/* <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-black/10"></div> */}

        <div className="relative max-w-7xl mx-auto px-6 py-12 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
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

            {/* Progress Ring */}
            <div className="flex items-center gap-4">
              <div className="relative w-24 h-24">
                <svg className="transform -rotate-90 w-full h-full">
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="green"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    strokeDashoffset={`${
                      2 * Math.PI * 40 * (1 - progressPercent / 100)
                    }`}
                    strokeLinecap="round"
                    className="transition-all duration-700 ease-out"
                  />
                </svg>

                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold">{progressPercent}%</span>
                </div>
              </div>

              <div>
                <p className="text-sm">Today's Progress</p>
                <p className="text-xs opacity-70">
                  {progressPercent === 100 ? "Completed" : "Keep improving"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ******************** QUICK STATS ******************** */}
      <div className="max-w-7xl mx-auto px-6 mt-6">
        <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-6">

            <QuickStat
              icon={<Droplets size={20} color={themeColor} />}
              label="Water"
              value={`${todayData?.water?.glasses || 0} / ${
                todayData?.water?.target || 8
              }`}
            />

            <QuickStat
              icon={<Smile size={20} color={themeColor} />}
              label="Mood"
              value={todayData?.mood?.mood || "Neutral"}
            />

            <QuickStat
              icon={<Moon size={20} color={themeColor} />}
              label="Sleep"
              value={`${todayData?.sleep?.hours || 0} hrs`}
            />

            <QuickStat
              icon={<StepsIcon size={20} color={themeColor} />}
              label="Steps"
              value={`${todayData?.activity?.steps || 0}`}
            />

            <QuickStat
              icon={<HeartPulse size={20} color={themeColor} />}
              label="Symptom"
              value={`Level ${todayData?.symptom?.severity || 0}`}
            />

            <QuickStat
              icon={<Pill size={20} color={themeColor} />}
              label="Medication"
              value={todayData?.medication?.taken ? "Taken" : "Pending"}
            />

          </div>
        </div>
      </div>

      {/* ******************** MAIN CARDS ******************** */}
      <div className="max-w-7xl mx-auto px-6 mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <WaterCard data={todayData?.water} refresh={fetchToday} />
        <MoodCard data={todayData?.mood} refresh={fetchToday} />
        <SleepCard data={todayData?.sleep} refresh={fetchToday} />
        <ActivityCard data={todayData?.activity} refresh={fetchToday} />
        <SymptomCard data={todayData?.symptom} refresh={fetchToday} />
        <MedicationCard data={todayData?.medication} refresh={fetchToday} />
      </div>

      {/* ******************** EMPTY STATE ******************** */}
      {!todayData && (
        <div className="max-w-7xl mx-auto px-6 mt-10">
          <div className="bg-white shadow-sm border border-gray-200 rounded-2xl p-10 text-center">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Begin Your Wellness Tracking
            </h3>
            <p className="text-gray-500 max-w-lg mx-auto">
              Start logging today’s activities to monitor your Ayurvedic
              wellness journey.
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <WellnessTrendChart days={14} />
        <DailyRadarChart />
      </div>

      {todayData && (
      <InsightsOverlay
        open={showInsights}
        onClose={() => setShowInsights(false)}
        todayData={todayData}
      />
    )}
  </div>
)}

/* COMPONENT: Quick Stat Box */
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
