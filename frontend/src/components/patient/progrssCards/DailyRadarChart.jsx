import React, { useEffect, useState } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const themeColor = "#1e4b3c";

const DailyRadarChart = () => {
  const [radarData, setRadarData] = useState([]);

  const fetchRadar = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    try {
      const res = await fetch("http://localhost:3000/patient/progress/radarData", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const json = await res.json();

      if (json.radar) {
        const formatted = Object.entries(json.radar).map(([key, value]) => ({
          metric: key,
          value: Math.round(value),
        }));
        setRadarData(formatted);
      }
    } catch (err) {
      console.error("Radar fetch error:", err);
    }
  };

  useEffect(() => {
    fetchRadar();
  }, []);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-green-100">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">
        Today's Wellness Balance
      </h2>

      <ResponsiveContainer width="100%" height={320}>
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="metric" tick={{ fill: "#374151", fontSize: 12 }} />
          <Tooltip />
          <Radar
            name="Today"
            dataKey="value"
            stroke={themeColor}
            fill={themeColor}
            fillOpacity={0.35}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DailyRadarChart;
