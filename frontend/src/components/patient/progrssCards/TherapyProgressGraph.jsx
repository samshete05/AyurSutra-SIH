import React, { useEffect, useState } from "react";
import {
  CheckCircle,
  XCircle,
  Circle,
  Flame,
  Trophy,
  Award,
} from "lucide-react";

function TherapyProgressGraph({ appointmentId }) {
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProgress = async () => {
    try {
      const res = await fetch(
        "http://localhost:3000/PanchKarmaCenter/patient/therapy-progress",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ appointmentId }),
        }
      );

      const data = await res.json();
      if (data.message === "Success") {
        setProgress(data.progress);
      }
    } catch (err) {
      console.error("Error fetching therapy progress:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProgress();
  }, []);

  if (loading) return <p>Loading progress...</p>;
  if (!progress)
    return (
      <p className="text-sm text-slate-500">
        No progress data yet. Once attendance is marked you’ll see updates here.
      </p>
    );

  const attendance = progress.attendance.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <div className="bg-white rounded-2xl shadow p-6 space-y-6">
      <h2 className="text-xl font-semibold">Therapy Progress</h2>

      {/* Streak */}
      <div className="flex gap-3 items-center">
        <Flame className="text-orange-500 h-6 w-6" />
        <span className="text-lg font-bold">{progress.streakCount}-day streak</span>
      </div>

      {/* Achievements */}
      <div className="flex gap-4 text-xs">
        {progress.milestones.sevenDays && (
          <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1 rounded-full">
            <Trophy className="h-4 w-4 text-emerald-600" />
            7 Days Streak
          </div>
        )}
        {progress.milestones.fifteenDays && (
          <div className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full">
            <Award className="h-4 w-4 text-blue-600" />
            15 Days Streak
          </div>
        )}
        {progress.milestones.thirtyDays && (
          <div className="flex items-center gap-2 bg-yellow-50 px-3 py-1 rounded-full">
            <Trophy className="h-4 w-4 text-yellow-600" />
            30 Days Streak
          </div>
        )}
      </div>

      {/* Calendar Stick */}
      <div className="grid grid-cols-7 gap-2">
        {attendance.map((day, index) => {
          let icon = <Circle className="text-slate-300" />;
          if (day.status === "present") icon = <CheckCircle className="text-emerald-600" />;
          if (day.status === "absent") icon = <XCircle className="text-red-500" />;

          return (
            <div
              key={index}
              className="flex flex-col items-center text-[10px] text-slate-600"
            >
              {icon}
              <span>
                {new Date(day.date).toLocaleDateString("en-US", {
                  day: "numeric",
                })}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TherapyProgressGraph;
