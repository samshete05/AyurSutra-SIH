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

  // ---------------- EMPTY STATE WHEN USER IS NEW ----------------
  if (!todayData) {
    return (
      <div className="p-6 text-center flex flex-col items-center">
        <h2 className="text-2xl font-bold" style={{ color: themeColor }}>
          Welcome to Your Daily Progress!
        </h2>

        <p className="text-gray-600 mt-2 max-w-sm">
          Start completing today’s activities to track your physical and mental well-being.
        </p>

        <img
          src="https://cdni.iconscout.com/illustration/premium/thumb/health-checkup-6026565-4992309.png"
          className="w-60 mt-6"
          alt="Empty"
        />

        <button
          onClick={fetchToday}
          className="mt-6 px-6 py-3 rounded-lg text-white font-semibold shadow-md"
          style={{ backgroundColor: themeColor }}
        >
          Start Today
        </button>
      </div>
    );
  }

  const completion = todayData.completionPercent || 0;

  return (
    <div className="p-4 space-y-6">

      {/* HEADER */}
      <h1 className="text-2xl font-bold" style={{ color: themeColor }}>
        Today’s Tasks
      </h1>

      {/* PROGRESS BAR */}
      <div>
        <p className="text-sm font-semibold">Today's Goal</p>
        <div className="w-full bg-gray-200 rounded-full h-3 mt-1">
          <div
            className="h-3 rounded-full"
            style={{
              width: `${completion}%`,
              backgroundColor: themeColor,
            }}
          ></div>
        </div>
        <span className="text-xs text-gray-500">{completion}% Completed</span>
      </div>

      {/* DAILY CARDS */}
      <div className="space-y-4 pb-10">
        <WaterCard data={todayData.water} refresh={fetchToday} />
        <MoodCard data={todayData.mood} refresh={fetchToday} />
        <SymptomCard data={todayData.symptom} refresh={fetchToday} />
        <SleepCard data={todayData.sleep} refresh={fetchToday} />
        <ActivityCard data={todayData.activity} refresh={fetchToday} />
        <MedicationCard data={todayData.medication} refresh={fetchToday} />
      </div>
    </div>
  );
}

export default ProgressPage;