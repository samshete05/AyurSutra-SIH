import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const PKLineChart = ({
  title = "Line Chart",
  unit = "k",
  labels,
  values,
  color = "#4F46E5",
}) => {
  const data = {
    labels,
    datasets: [
      {
        label: title,
        data: values,
        borderColor: color,
        backgroundColor: `${color}2A`.replace("#", "#"), // light alpha
        tension: 0.45,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 7,
        pointBorderWidth: 2,
        pointBackgroundColor: color,
        pointBorderColor: "#ffffff",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: "index", intersect: false },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#ffffff",
        titleColor: "#0f172a",
        bodyColor: "#0f172a",
        borderColor: "#e5e7eb",
        borderWidth: 1,
        displayColors: false,
        padding: 10,
        callbacks: {
          title: (items) => items[0].label,
          label: (ctx) => `${title}: ${ctx.parsed.y}${unit}`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#6b7280", font: { size: 11 } },
      },
      y: {
        grid: { color: "#e5e7eb", drawBorder: false },
        ticks: {
          color: "#6b7280",
          font: { size: 11 },
          callback: (v) => `${v}${unit}`,
        },
      },
    },
  };

  return (
    <div className="h-72 w-full">
      <Line data={data} options={options} />
    </div>
  );
};

export default PKLineChart;
