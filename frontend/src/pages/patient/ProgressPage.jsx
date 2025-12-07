import React, { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import WaterCard from "../../components/patient/progrssCards/WaterCard";
import MoodCard from "../../components/patient/progrssCards/MoodCard";
import SymptomCard from "../../components/patient/progrssCards/SymptomCard";
import SleepCard from "../../components/patient/progrssCards/SleepCard";
import ActivityCard from "../../components/patient/progrssCards/ActivityCard";
import MedicationCard from "../../components/patient/progrssCards/MedicationCard";

const themeColor = "#1e4b3c";

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
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setTodayData(data);
      } else {
        setTodayData(null);
      }
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
    let completed = 0;
    let total = 6;
    
    if (todayData.water?.glasses >= todayData.water?.target) completed++;
    if (todayData.mood?.mood) completed++;
    if (todayData.sleep?.hours > 0) completed++;
    if (todayData.activity?.steps > 0) completed++;
    if (todayData.symptom?.severity !== undefined) completed++;
    if (todayData.medication?.taken) completed++;
    
    return Math.round((completed / total) * 100);
  };

  const progressPercent = calculateProgress();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50/30 via-white to-teal-50/20">
      {/* Hero Header Section */}
      <div className="bg-white border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold text-gray-800 mb-1">
                नमस्ते, Welcome Back
              </h1>
              <p className="text-gray-500 text-sm">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            
            {/* Daily Progress Ring */}
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20">
                <svg className="transform -rotate-90 w-20 h-20">
                  <circle
                    cx="40"
                    cy="40"
                    r="32"
                    stroke="#e5e7eb"
                    strokeWidth="6"
                    fill="none"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r="32"
                    stroke={themeColor}
                    strokeWidth="6"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 32}`}
                    strokeDashoffset={`${2 * Math.PI * 32 * (1 - progressPercent / 100)}`}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold" style={{ color: themeColor }}>
                    {progressPercent}%
                  </span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600">Today's Goal</p>
                <p className="text-xs text-gray-400">
                  {progressPercent === 100 ? "Completed!" : "Keep going"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-6 mb-6">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <QuickStat
              icon="💧"
              label="Water"
              value={`${todayData?.water?.glasses || 0}/${todayData?.water?.target || 8}`}
              color={themeColor}
            />
            <QuickStat
              icon={todayData?.mood?.mood === "very_happy" ? "😁" : todayData?.mood?.mood === "happy" ? "🙂" : "😐"}
              label="Mood"
              value={todayData?.mood?.mood || "neutral"}
              color={themeColor}
            />
            <QuickStat
              icon="😴"
              label="Sleep"
              value={`${todayData?.sleep?.hours || 0}h`}
              color={themeColor}
            />
            <QuickStat
              icon="🏃"
              label="Steps"
              value={todayData?.activity?.steps || 0}
              color={themeColor}
            />
            <QuickStat
              icon="🩺"
              label="Symptom"
              value={`Level ${todayData?.symptom?.severity || 0}`}
              color={themeColor}
            />
            <QuickStat
              icon="💊"
              label="Medicine"
              value={todayData?.medication?.taken ? "Taken" : "Pending"}
              color={todayData?.medication?.taken ? "#10b981" : "#ef4444"}
            />
          </div>
        </div>

        {/* Main Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <WaterCard data={todayData?.water} refresh={fetchToday} />
          <MoodCard data={todayData?.mood} refresh={fetchToday} />
          <SleepCard data={todayData?.sleep} refresh={fetchToday} />
          <ActivityCard data={todayData?.activity} refresh={fetchToday} />
          <SymptomCard data={todayData?.symptom} refresh={fetchToday} />
          <MedicationCard data={todayData?.medication} refresh={fetchToday} />
        </div>

        {/* Empty State Message */}
        {!todayData && (
          <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-12 text-center mt-6">
            <div className="text-6xl mb-4">🌱</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Begin Your Wellness Journey
            </h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Start completing today's activities to track your physical and mental well-being
              through the wisdom of Ayurveda.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Quick Stat Component
function QuickStat({ icon, label, value, color }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="text-2xl mb-2">{icon}</div>
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className="text-sm font-semibold text-gray-700 truncate w-full">{value}</p>
    </div>
  );
}

export default ProgressPage;