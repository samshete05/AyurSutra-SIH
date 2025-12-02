import React, { useState, useEffect } from "react";
import { Trophy, Target, Flame, Star, Gift, TrendingUp, Award, Zap } from "lucide-react";

function WellnessGamification({ profile, appointments }) {
  const [showConfetti, setShowConfetti] = useState(false);

  // Calculate wellness stats
  const calculateStats = () => {
    const completedAppointments = appointments?.filter(apt => apt.status === 'completed').length || 0;
    const totalAppointments = appointments?.length || 0;
    
    // Calculate streak (mock - you can make this real based on appointment dates)
    const currentStreak = completedAppointments > 0 ? Math.min(completedAppointments, 7) : 0;
    
    // Calculate points
    const points = completedAppointments * 50 + currentStreak * 10;
    
    // Calculate level
    const level = Math.floor(points / 100) + 1;
    const nextLevelPoints = level * 100;
    const progressToNextLevel = ((points % 100) / 100) * 100;

    return {
      points,
      level,
      currentStreak,
      completedAppointments,
      nextLevelPoints,
      progressToNextLevel
    };
  };

  const stats = calculateStats();

  // Achievements system
  const achievements = [
    {
      id: 1,
      name: "First Step",
      description: "Complete your first appointment",
      icon: Star,
      unlocked: stats.completedAppointments >= 1,
      color: "yellow"
    },
    {
      id: 2,
      name: "Committed",
      description: "Maintain a 3-day streak",
      icon: Flame,
      unlocked: stats.currentStreak >= 3,
      color: "orange"
    },
    {
      id: 3,
      name: "Dedicated",
      description: "Complete 5 appointments",
      icon: Trophy,
      unlocked: stats.completedAppointments >= 5,
      color: "blue"
    },
    {
      id: 4,
      name: "Wellness Master",
      description: "Reach Level 5",
      icon: Award,
      unlocked: stats.level >= 5,
      color: "purple"
    }
  ];

  const unlockedCount = achievements.filter(a => a.unlocked).length;

  // Daily challenges
  const dailyChallenges = [
    { id: 1, task: "Drink 8 glasses of water", completed: false, points: 10 },
    { id: 2, task: "Practice 10 min meditation", completed: false, points: 15 },
    { id: 3, task: "Take prescribed medication", completed: true, points: 20 },
    { id: 4, task: "Log today's symptoms", completed: false, points: 10 }
  ];

  const completedChallenges = dailyChallenges.filter(c => c.completed).length;

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 rounded-2xl p-6 shadow-lg border border-indigo-200">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Trophy className="w-6 h-6 text-indigo-600" />
          <h3 className="font-bold text-lg text-slate-900">Wellness Journey</h3>
        </div>
        <span className="px-3 py-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full text-xs font-semibold flex items-center gap-1">
          <Zap className="w-3 h-3" />
          Level {stats.level}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-slate-700">Level Progress</span>
          <span className="text-xs text-slate-500">{stats.points} / {stats.nextLevelPoints} XP</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all duration-1000 flex items-center justify-end pr-2"
            style={{ width: `${stats.progressToNextLevel}%` }}
          >
            {stats.progressToNextLevel > 10 && (
              <Star className="w-3 h-3 text-white animate-pulse" />
            )}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        {/* Streak Counter */}
        <div className="bg-gradient-to-br from-orange-100 to-red-100 rounded-xl p-4 text-center">
          <Flame className="w-8 h-8 text-orange-600 mx-auto mb-2" />
          <p className="text-3xl font-bold text-orange-900">{stats.currentStreak}</p>
          <p className="text-xs text-orange-700 font-medium">Day Streak 🔥</p>
        </div>

        {/* Total Points */}
        <div className="bg-gradient-to-br from-yellow-100 to-amber-100 rounded-xl p-4 text-center">
          <Star className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
          <p className="text-3xl font-bold text-yellow-900">{stats.points}</p>
          <p className="text-xs text-yellow-700 font-medium">Total Points ⭐</p>
        </div>

        {/* Sessions */}
        <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl p-4 text-center">
          <Target className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <p className="text-3xl font-bold text-blue-900">{stats.completedAppointments}</p>
          <p className="text-xs text-blue-700 font-medium">Sessions Done 🎯</p>
        </div>
      </div>

      {/* Daily Challenges */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold text-slate-900 flex items-center gap-2">
            <Target className="w-5 h-5 text-indigo-600" />
            Daily Challenges
          </h4>
          <span className="text-xs text-slate-500">{completedChallenges}/{dailyChallenges.length} completed</span>
        </div>
        <div className="space-y-2">
          {dailyChallenges.map((challenge) => (
            <div 
              key={challenge.id}
              className={`flex items-center justify-between p-3 rounded-lg border-2 transition-all ${
                challenge.completed 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-white border-slate-200 hover:border-indigo-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <input 
                  type="checkbox" 
                  checked={challenge.completed}
                  readOnly
                  className="w-5 h-5 rounded text-indigo-600"
                />
                <span className={`text-sm ${challenge.completed ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                  {challenge.task}
                </span>
              </div>
              <span className="text-xs font-semibold text-indigo-600">+{challenge.points} XP</span>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold text-slate-900 flex items-center gap-2">
            <Award className="w-5 h-5 text-indigo-600" />
            Achievements
          </h4>
          <span className="text-xs text-slate-500">{unlockedCount}/{achievements.length} unlocked</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {achievements.map((achievement) => {
            const Icon = achievement.icon;
            return (
              <div 
                key={achievement.id}
                className={`p-3 rounded-xl text-center transition-all ${
                  achievement.unlocked 
                    ? `bg-${achievement.color}-100 border-2 border-${achievement.color}-300 shadow-md` 
                    : 'bg-slate-100 border-2 border-slate-200 opacity-50'
                }`}
              >
                <Icon className={`w-8 h-8 mx-auto mb-2 ${
                  achievement.unlocked ? `text-${achievement.color}-600` : 'text-slate-400'
                }`} />
                <p className={`text-xs font-bold ${
                  achievement.unlocked ? 'text-slate-900' : 'text-slate-500'
                }`}>
                  {achievement.name}
                </p>
                <p className="text-[10px] text-slate-600 mt-1">{achievement.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Motivational Message */}
      <div className="mt-6 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl p-4 text-white text-center">
        <Gift className="w-6 h-6 mx-auto mb-2" />
        <p className="text-sm font-semibold">
          {stats.level < 3 ? "Keep going! You're building great habits! 💪" :
           stats.level < 5 ? "Amazing progress! You're a wellness champion! 🌟" :
           "You're a wellness master! Inspiring! 🏆"}
        </p>
      </div>
    </div>
  );
}

export default WellnessGamification;
