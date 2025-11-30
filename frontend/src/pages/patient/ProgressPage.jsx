import React, { useState } from "react";
import { 
  TrendingUp, 
  Calendar, 
  Heart, 
  Flame,
  Droplets,
  Wind,
  Sun,
  Moon,
  Award,
  ChevronRight
} from "lucide-react";

function ProgressPage() {
  const [timeRange, setTimeRange] = useState("week");
  
  // Sample data - replace with your backend API
  const weeklyProgress = {
    doshaBalance: {
      vata: 35,
      pitta: 40,
      kapha: 25
    },
    wellnessScore: 82,
    streakDays: 15,
    totalSessions: 24,
    achievements: [
      { id: 1, title: "7 Day Streak", icon: "🔥", unlocked: true },
      { id: 2, title: "Early Riser", icon: "🌅", unlocked: true },
      { id: 3, title: "Meditation Master", icon: "🧘", unlocked: false },
      { id: 4, title: "Herbal Hero", icon: "🌿", unlocked: true }
    ],
    weeklyActivities: [
      { day: "Mon", meditation: 15, yoga: 30, herbs: 1 },
      { day: "Tue", meditation: 20, yoga: 45, herbs: 1 },
      { day: "Wed", meditation: 10, yoga: 30, herbs: 1 },
      { day: "Thu", meditation: 25, yoga: 60, herbs: 1 },
      { day: "Fri", meditation: 15, yoga: 30, herbs: 0 },
      { day: "Sat", meditation: 30, yoga: 45, herbs: 1 },
      { day: "Sun", meditation: 20, yoga: 30, herbs: 1 }
    ],
    recentMilestones: [
      { date: "Nov 28", text: "Completed Panchakarma Day 5", type: "treatment" },
      { date: "Nov 25", text: "Wellness score improved by 12%", type: "improvement" },
      { date: "Nov 22", text: "Started morning yoga routine", type: "habit" }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-emerald-900 mb-2">
              Your Wellness Journey
            </h1>
            <p className="text-slate-600">Track your progress and celebrate milestones</p>
          </div>
          
          {/* Time Range Selector */}
          <div className="flex bg-white rounded-full p-1 shadow-md w-fit">
            {["week", "month", "year"].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-6 py-2 rounded-full text-sm font-medium capitalize transition-all ${
                  timeRange === range
                    ? "bg-emerald-600 text-white shadow-lg"
                    : "text-slate-600 hover:text-emerald-700"
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Wellness Score */}
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-emerald-500">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-emerald-100 rounded-full p-3">
                <Heart className="w-6 h-6 text-emerald-600" />
              </div>
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                +8% this week
              </span>
            </div>
            <p className="text-sm text-slate-600 mb-1">Wellness Score</p>
            <p className="text-4xl font-bold text-slate-900">{weeklyProgress.wellnessScore}</p>
            <div className="mt-4 flex items-center gap-1 text-xs text-slate-500">
              <TrendingUp className="w-3 h-3" />
              <span>Trending upward</span>
            </div>
          </div>

          {/* Streak Days */}
          <div className="bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl p-6 shadow-lg text-white">
            <div className="flex items-center justify-between mb-4">
              <Flame className="w-8 h-8 opacity-90" />
            </div>
            <p className="text-sm opacity-90 mb-1">Current Streak</p>
            <p className="text-4xl font-bold">{weeklyProgress.streakDays} Days</p>
            <p className="text-xs mt-4 opacity-80">Keep going! 🎯</p>
          </div>

          {/* Total Sessions */}
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-blue-500">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 rounded-full p-3">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-1">Total Sessions</p>
            <p className="text-4xl font-bold text-slate-900">{weeklyProgress.totalSessions}</p>
            <p className="text-xs text-slate-500 mt-4">This month</p>
          </div>

          {/* Achievements */}
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-purple-500">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-100 rounded-full p-3">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-1">Achievements</p>
            <p className="text-4xl font-bold text-slate-900">
              {weeklyProgress.achievements.filter(a => a.unlocked).length}/
              {weeklyProgress.achievements.length}
            </p>
            <p className="text-xs text-slate-500 mt-4">Badges earned</p>
          </div>
        </div>

        {/* Dosha Balance & Weekly Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Dosha Balance Card */}
          <div className="lg:col-span-1 bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Dosha Balance</h3>
            
            <div className="space-y-5">
              {/* Vata */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Wind className="w-5 h-5 text-indigo-500" />
                    <span className="text-sm font-semibold text-slate-700">Vata</span>
                  </div>
                  <span className="text-sm font-bold text-slate-900">{weeklyProgress.doshaBalance.vata}%</span>
                </div>
                <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-400 to-indigo-500 rounded-full transition-all duration-700"
                    style={{ width: `${weeklyProgress.doshaBalance.vata}%` }}
                  />
                </div>
              </div>

              {/* Pitta */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Flame className="w-5 h-5 text-red-500" />
                    <span className="text-sm font-semibold text-slate-700">Pitta</span>
                  </div>
                  <span className="text-sm font-bold text-slate-900">{weeklyProgress.doshaBalance.pitta}%</span>
                </div>
                <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-red-400 to-red-500 rounded-full transition-all duration-700"
                    style={{ width: `${weeklyProgress.doshaBalance.pitta}%` }}
                  />
                </div>
              </div>

              {/* Kapha */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Droplets className="w-5 h-5 text-teal-500" />
                    <span className="text-sm font-semibold text-slate-700">Kapha</span>
                  </div>
                  <span className="text-sm font-bold text-slate-900">{weeklyProgress.doshaBalance.kapha}%</span>
                </div>
                <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-teal-400 to-teal-500 rounded-full transition-all duration-700"
                    style={{ width: `${weeklyProgress.doshaBalance.kapha}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-emerald-50 rounded-xl">
              <p className="text-xs text-emerald-800 font-medium">
                💡 Your doshas are well-balanced this week!
              </p>
            </div>
          </div>

          {/* Weekly Activity Chart */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-900">Weekly Activity</h3>
              <div className="flex gap-4 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  <span className="text-slate-600">Meditation</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-slate-600">Yoga</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  <span className="text-slate-600">Herbs</span>
                </div>
              </div>
            </div>

            <div className="flex items-end justify-between gap-2 h-48">
              {weeklyProgress.weeklyActivities.map((day, idx) => {
                const maxValue = 60;
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full flex flex-col items-center gap-1">
                      {/* Yoga Bar */}
                      <div 
                        className="w-full bg-gradient-to-t from-blue-400 to-blue-500 rounded-t-md hover:from-blue-500 hover:to-blue-600 transition-colors cursor-pointer"
                        style={{ height: `${(day.yoga / maxValue) * 100}px` }}
                        title={`Yoga: ${day.yoga} min`}
                      />
                      {/* Meditation Bar */}
                      <div 
                        className="w-full bg-gradient-to-t from-emerald-400 to-emerald-500 rounded-t-md hover:from-emerald-500 hover:to-emerald-600 transition-colors cursor-pointer"
                        style={{ height: `${(day.meditation / maxValue) * 150}px` }}
                        title={`Meditation: ${day.meditation} min`}
                      />
                    </div>
                    <span className="text-xs font-medium text-slate-600">{day.day}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Achievements & Milestones */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Achievements */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Achievements</h3>
            <div className="grid grid-cols-2 gap-3">
              {weeklyProgress.achievements.map((achievement) => (
                <div 
                  key={achievement.id}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    achievement.unlocked
                      ? "border-emerald-200 bg-emerald-50 hover:bg-emerald-100"
                      : "border-slate-200 bg-slate-50 opacity-60"
                  }`}
                >
                  <div className="text-3xl mb-2">{achievement.icon}</div>
                  <p className="text-xs font-semibold text-slate-800">{achievement.title}</p>
                  {achievement.unlocked && (
                    <span className="text-xs text-emerald-600 font-medium">✓ Unlocked</span>
                  )}
                  {!achievement.unlocked && (
                    <span className="text-xs text-slate-400">Locked</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Recent Milestones */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Recent Milestones</h3>
            <div className="space-y-3">
              {weeklyProgress.recentMilestones.map((milestone, idx) => (
                <div 
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group"
                >
                  <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                    milestone.type === "treatment" ? "bg-blue-500" :
                    milestone.type === "improvement" ? "bg-emerald-500" :
                    "bg-purple-500"
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-800">{milestone.text}</p>
                    <p className="text-xs text-slate-500 mt-1">{milestone.date}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ProgressPage;
