import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const themeColor = "#1e4b3c";

const WellnessTrendChart = ({ days = 14 }) => {
  const [data, setData] = useState([]);

  const fetchHistory = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    try {
      const res = await fetch(
        `http://localhost:3000/patient/progress/scoreHistory?days=${days}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const json = await res.json();
      if (json.history) {
        const formatted = json.history.map((d) => ({
          date: new Date(d.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }),
          score: d.score,
        }));
        setData(formatted);
      }
    } catch (err) {
      console.error("History fetch error:", err);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-green-100">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">
        Wellness Score Trend
      </h2>

      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="date" stroke="#6b7280" />
          <YAxis stroke="#6b7280" domain={[0, 100]} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="score"
            stroke={themeColor}
            strokeWidth={3}
            dot={{ r: 4, strokeWidth: 2, fill: "white" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WellnessTrendChart;
