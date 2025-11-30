import React, { useState, useEffect } from "react";
import {
  TrendingUp,
  Calendar,
  Target,
  Award,
  Activity,
  Heart,
  Droplets,
  Wind,
  Flame,
  Clock,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  Download,
  Sparkles,
  ArrowUp,
  ArrowDown,
  Brain,
  Leaf,
  Sun,
  Moon,
  Stars,
  Coffee,
  Pill,
  CheckSquare,
  TrendingDown
} from "lucide-react";

function ProgressPage() {
  const [loading, setLoading] = useState(true);
  const [selectedView, setSelectedView] = useState("overview");
  const [progressData, setProgressData] = useState(null);
  const [animateStats, setAnimateStats] = useState(false);

  useEffect(() => {
    fetchProgressData();
  }, []);

  useEffect(() => {
    if (progressData) {
      setTimeout(() => setAnimateStats(true), 300);
    }
  }, [progressData]);

  const fetchProgressData = async () => {
    setLoading(true);
    setTimeout(() => {
      const mockData = {
        journeyStats: {
          daysActive: 21,
          treatmentsCompleted: 17,
          totalTreatments: 20,
          wellnessScore: 8.2,
          previousScore: 6.8,
          streak: 7,
          badges: 12
        },
        doshaBalance: {
          vata: { current: 35, optimal: 33, trend: "improving" },
          pitta: { current: 40, optimal: 33, trend: "stable" },
          kapha: { current: 25, optimal: 34, trend: "needs_attention" }
        },
        vitalMetrics: [
          { id: 1, name: "Sleep", value: 7.5, max: 10, icon: "Moon", color: "indigo", status: "good" },
          { id: 2, name: "Energy", value: 8.1, max: 10, icon: "Zap", color: "amber", status: "excellent" },
          { id: 3, name: "Stress", value: 3.8, max: 10, icon: "Brain", color: "rose", status: "good", inverted: true },
          { id: 4, name: "Digestion", value: 7.8, max: 10, icon: "Heart", color: "emerald", status: "good" }
        ],
        weeklyTimeline: [
          { day: "M", wellness: 7.2, activities: 3, date: "Nov 25" },
          { day: "T", wellness: 7.5, activities: 4, date: "Nov 26" },
          { day: "W", wellness: 8.0, activities: 5, date: "Nov 27" },
          { day: "T", wellness: 8.3, activities: 4, date: "Nov 28" },
          { day: "F", wellness: 7.9, activities: 3, date: "Nov 29" },
          { day: "S", wellness: 8.4, activities: 5, date: "Nov 30" },
          { day: "S", wellness: 8.7, activities: 6, date: "Dec 1" }
        ],
        treatments: [
          {
            name: "Panchakarma Therapy",
            progress: 85,
            nextSession: "Tomorrow 10:00 AM",
            therapist: "Dr. Priya Sharma",
            type: "detox"
          },
          {
            name: "Herbal Supplements",
            progress: 90,
            nextSession: "Daily - Evening",
            therapist: "Prescribed",
            type: "herbs"
          },
          {
            name: "Yoga & Meditation",
            progress: 75,
            nextSession: "Today 6:00 AM",
            therapist: "Self-guided",
            type: "lifestyle"
          }
        ],
        recentAchievements: [
          { icon: "Flame", title: "7-Day Streak", color: "orange", glow: true },
          { icon: "Target", title: "85% Complete", color: "blue", glow: false },
          { icon: "Heart", title: "Health Improved", color: "pink", glow: true },
          { icon: "Award", title: "320 Points", color: "purple", glow: false }
        ],
        dailyChecklist: [
          { task: "Morning Meditation", done: true, time: "6:00 AM" },
          { task: "Herbal Tea", done: true, time: "7:30 AM" },
          { task: "Therapy Session", done: false, time: "10:00 AM" },
          { task: "Evening Supplements", done: false, time: "8:00 PM" }
        ]
      };
      setProgressData(mockData);
      setLoading(false);
    }, 800);
  };

  const getIconComponent = (iconName) => {
    const icons = {
      Moon, Sun, Brain, Heart, Flame, Target, Award, Coffee, Leaf, Stars
    };
    return icons[iconName] || Heart;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-emerald-200 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-emerald-600 rounded-full border-t-transparent animate-spin"></div>
            <Leaf className="absolute inset-0 m-auto w-8 h-8 text-emerald-600 animate-pulse" />
          </div>
          <p className="text-lg font-medium text-slate-700">Loading your wellness journey...</p>
        </div>
      </div>
    );
  }

  if (!progressData) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      
      {/* Floating Header */}
      <div className=" top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-emerald-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-slate-900">Wellness Journey</h1>
                <p className="text-sm text-slate-600">Day {progressData.journeyStats.daysActive} of transformation</p>
              </div>
            </div>

            <button
              onClick={fetchProgressData}
              className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-emerald-50 border-2 border-emerald-200 rounded-xl text-emerald-700 font-semibold transition-all shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span className="hidden md:inline">Report</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 space-y-6">

        {/* Hero Wellness Score - Neumorphic Design */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-teal-400/20 blur-3xl"></div>
          <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-white" 
          style={{
              backgroundImage: 'url("https://t4.ftcdn.net/jpg/06/44/15/17/240_F_644151789_uizbhoLQ6hAuDZPwfysnj7i8VAkB3c8g.jpg")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              
            {/* Circular Score */}
            <div className="relative mb-6">
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 via-teal-400/20 to-cyan-400/20 blur-3xl animate-pulse"></div>

                <div 
                  className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/50"
                  style={{
                    backgroundImage: 'url("https://t4.ftcdn.net/jpg/06/44/15/17/240_F_644151789_uizbhoLQ6hAuDZPwfysnj7i8VAkB3c8g.jpg")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}
                >
                  {/* Glassmorphic overlay */}
                  {/* <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-emerald-50/85 to-teal-50/80 backdrop-blur-xl"></div> */}
              
                  {/* Content */}
                  <div className="relative z-10 p-8 md:p-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                      {/* LEFT: Interactive 3D Score Circle */}
                      <div className="flex justify-center lg:justify-start">
                        <div 
                          className="relative group cursor-pointer transition-transform duration-500 hover:scale-105"
                          style={{ 
                            transformStyle: 'preserve-3d',
                            perspective: '1000px'
                          }}
                        >
                          {/* Floating particles effect */}
                          <div className="absolute -inset-8 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                            <div className="absolute top-0 left-0 w-3 h-3 bg-emerald-400 rounded-full animate-ping"></div>
                            <div className="absolute top-10 right-0 w-2 h-2 bg-teal-400 rounded-full animate-ping delay-300"></div>
                            <div className="absolute bottom-10 left-10 w-2.5 h-2.5 bg-cyan-400 rounded-full animate-ping delay-600"></div>
                            <div className="absolute bottom-0 right-10 w-2 h-2 bg-emerald-300 rounded-full animate-ping delay-900"></div>
                          </div>
                      
                          {/* Glowing ring effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                      
                          {/* Main score container */}
                          <div className="relative w-72 h-72 md:w-80 md:h-80">

                            {/* Outer decorative rings */}
                            <div className="absolute inset-0 border-4 border-emerald-200/30 rounded-full group-hover:scale-110 transition-transform duration-500"></div>
                            <div className="absolute inset-4 border-2 border-teal-200/20 rounded-full group-hover:scale-105 transition-transform duration-700"></div>
                      
                            {/* SVG Progress Circle */}
                            <svg className="w-full h-full transform -rotate-90">
                              {/* Background circle */}
                              <circle
                                cx="160"
                                cy="160"
                                r="140"
                                fill="none"
                                stroke="#e0f2f1"
                                strokeWidth="16"
                                opacity="0.3"
                              />

                              {/* Animated progress circle */}
                              <circle
                                cx="160"
                                cy="160"
                                r="140"
                                fill="none"
                                stroke="url(#wellnessGradient)"
                                strokeWidth="16"
                                strokeLinecap="round"
                                strokeDasharray={`${2 * Math.PI * 140}`}
                                strokeDashoffset={`${2 * Math.PI * 140 * (1 - progressData.journeyStats.wellnessScore / 10)}`}
                                className={`transition-all duration-[2000ms] ease-out ${animateStats ? 'opacity-100' : 'opacity-0'}`}
                                style={{
                                  filter: 'drop-shadow(0 0 8px rgba(16, 185, 129, 0.6))'
                                }}
                              />

                              {/* Inner glow circle */}
                              <circle
                                cx="160"
                                cy="160"
                                r="130"
                                fill="none"
                                stroke="url(#innerGlow)"
                                strokeWidth="2"
                                opacity="0.6"
                                className="animate-pulse"
                              />

                              <defs>
                                <linearGradient id="wellnessGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                  <stop offset="0%" stopColor="#10b981" />
                                  <stop offset="50%" stopColor="#14b8a6" />
                                  <stop offset="100%" stopColor="#06b6d4" />
                                </linearGradient>
                                <linearGradient id="innerGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.2" />
                                </linearGradient>
                              </defs>
                            </svg>
                            
                            {/* Center content with 3D effect */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                              {/* Glassmorphic background */}
                              <div className="absolute inset-12 bg-white/60 backdrop-blur-md rounded-full border border-white/50 shadow-2xl group-hover:bg-white/70 transition-colors"></div>
                            
                              {/* Score content */}
                              <div className="relative z-10 text-center">
                                <div className="mb-2">
                                  <Sparkles className="w-8 h-8 text-amber-500 mx-auto animate-bounce" />
                                </div>

                                <div className="relative inline-block">
                                  <span className="text-7xl md:text-8xl lg:text-9xl font-black bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent drop-shadow-lg group-hover:scale-110 transition-transform duration-300 inline-block">
                                    {progressData.journeyStats.wellnessScore}
                                  </span>

                                  {/* Floating decorative elements */}
                                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full animate-pulse"></div>
                                  <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full animate-pulse delay-500"></div>
                                </div>
                            
                                <div className="text-2xl md:text-3xl text-slate-400 font-light mb-4">/10</div>

                                {/* Improvement badge */}
                                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full shadow-lg group-hover:shadow-2xl group-hover:scale-105 transition-all">
                                      <ArrowUp className="w-5 h-5 animate-bounce" />
                                      <span className="text-base md:text-lg font-bold">
                                      +{((progressData.journeyStats.wellnessScore - progressData.journeyStats.previousScore) / progressData.journeyStats.previousScore * 100).toFixed(0)}%
                                      </span>
                                  </div>
                            
                                <p className="text-sm text-slate-600 mt-3 font-medium">vs last week</p>
                              </div>
                            </div>
                            
                            {/* Rotating accent dots - with unique animation */}
                            <div className="absolute inset-0 animate-spin-slow pointer-events-none">
                              <div className="absolute top-0 left-1/2 w-4 h-4 bg-emerald-500 rounded-full -translate-x-1/2 shadow-lg"></div>
                              <div className="absolute top-1/2 right-0 w-3 h-3 bg-teal-500 rounded-full -translate-y-1/2 shadow-lg"></div>
                              <div className="absolute bottom-0 left-1/2 w-3 h-3 bg-cyan-500 rounded-full -translate-x-1/2 shadow-lg"></div>
                              <div className="absolute top-1/2 left-0 w-4 h-4 bg-emerald-400 rounded-full -translate-y-1/2 shadow-lg"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>


              {/* Quick Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                {progressData.recentAchievements.map((achievement, idx) => {
                  const IconComponent = getIconComponent(achievement.icon);
                  return (
                    <div
                      key={idx}
                      className={`relative p-6 bg-gradient-to-br ${
                        achievement.color === 'orange' ? 'from-orange-50 to-orange-100' :
                        achievement.color === 'blue' ? 'from-blue-50 to-blue-100' :
                        achievement.color === 'pink' ? 'from-pink-50 to-pink-100' :
                        'from-purple-50 to-purple-100'
                      } rounded-2xl border-2 ${
                        achievement.color === 'orange' ? 'border-orange-200' :
                        achievement.color === 'blue' ? 'border-blue-200' :
                        achievement.color === 'pink' ? 'border-pink-200' :
                        'border-purple-200'
                      } shadow-lg hover:scale-105 transition-transform`}
                    >
                      {achievement.glow && (
                        <div className={`absolute -inset-1 bg-gradient-to-r ${
                          achievement.color === 'orange' ? 'from-orange-400 to-red-400' :
                          'from-pink-400 to-rose-400'
                        } rounded-2xl blur opacity-30 animate-pulse`}></div>
                      )}
                      <div className="relative">
                        <IconComponent className={`w-8 h-8 mb-2 ${
                          achievement.color === 'orange' ? 'text-orange-600' :
                          achievement.color === 'blue' ? 'text-blue-600' :
                          achievement.color === 'pink' ? 'text-pink-600' :
                          'text-purple-600'
                        }`} />
                        <p className="text-sm font-semibold text-slate-700">{achievement.title}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Dosha Balance - Modern Cards with Liquid Fill Effect */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(progressData.doshaBalance).map(([dosha, data]) => {
            const colors = {
              vata: { from: 'from-blue-500', to: 'to-indigo-600', bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700' },
              pitta: { from: 'from-red-500', to: 'to-orange-600', bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700' },
              kapha: { from: 'from-green-500', to: 'to-emerald-600', bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700' }
            }[dosha];

            return (
              <div key={dosha} className={`relative ${colors.bg} rounded-3xl p-6 border-2 ${colors.border} shadow-xl hover:shadow-2xl transition-shadow overflow-hidden group`}>
                
                {/* Liquid fill animation */}
                <div 
                  className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t ${colors.from} ${colors.to} opacity-20 transition-all duration-1000 ease-out`}
                  style={{ height: animateStats ? `${data.current}%` : '0%' }}
                >
                  <div className="absolute top-0 left-0 right-0 h-8 bg-white/30 animate-wave"></div>
                </div>

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 bg-gradient-to-br ${colors.from} ${colors.to} rounded-xl flex items-center justify-center shadow-lg`}>
                        {dosha === 'vata' && <Wind className="w-6 h-6 text-white" />}
                        {dosha === 'pitta' && <Flame className="w-6 h-6 text-white" />}
                        {dosha === 'kapha' && <Droplets className="w-6 h-6 text-white" />}
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 capitalize">{dosha}</h3>
                    </div>
                    <span className={`text-4xl font-bold ${colors.text}`}>{data.current}%</span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Current</span>
                      <span className="text-slate-600">Target: {data.optimal}%</span>
                    </div>
                    
                    <div className="h-3 bg-white/50 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${colors.from} ${colors.to} transition-all duration-1000 ease-out`}
                        style={{ width: animateStats ? `${data.current}%` : '0%' }}
                      ></div>
                    </div>

                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${
                      data.trend === 'improving' ? 'bg-green-100 text-green-700' :
                      data.trend === 'stable' ? 'bg-blue-100 text-blue-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {data.trend === 'improving' && <TrendingUp className="w-3 h-3" />}
                      {data.trend === 'stable' && <Activity className="w-3 h-3" />}
                      {data.trend === 'needs_attention' && <AlertCircle className="w-3 h-3" />}
                      <span className="capitalize">{data.trend.replace('_', ' ')}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Vital Metrics - Horizontal Progress Cards */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl border border-white">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <Activity className="w-7 h-7 text-emerald-600" />
            Daily Vitals
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {progressData.vitalMetrics.map((metric) => {
              const IconComponent = getIconComponent(metric.icon);
              const percentage = (metric.value / metric.max) * 100;
              
              return (
                <div key={metric.id} className="group">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 bg-${metric.color}-100 rounded-lg flex items-center justify-center`}>
                        <IconComponent className={`w-5 h-5 text-${metric.color}-600`} />
                      </div>
                      <span className="font-semibold text-slate-900">{metric.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-slate-900">{metric.value}</span>
                      <span className="text-sm text-slate-500">/{metric.max}</span>
                    </div>
                  </div>

                  <div className="relative h-4 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`absolute inset-y-0 left-0 bg-gradient-to-r from-${metric.color}-400 to-${metric.color}-600 rounded-full transition-all duration-1000 ease-out`}
                      style={{ width: animateStats ? `${percentage}%` : '0%' }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/40 to-white/0 animate-shimmer"></div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-2">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      metric.status === 'excellent' ? 'bg-green-100 text-green-700' :
                      metric.status === 'good' ? 'bg-emerald-100 text-emerald-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {metric.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Weekly Timeline - Minimalist Dots */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl border border-white">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
            <Calendar className="w-7 h-7 text-emerald-600" />
            This Week's Progress
          </h2>

          <div className="flex justify-between items-end h-48">
            {progressData.weeklyTimeline.map((day, idx) => {
              const height = (day.wellness / 10) * 100;
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-3 group">
                  <div className="relative flex-1 flex items-end w-full px-2">
                    <div
                      className="w-full bg-gradient-to-t from-emerald-500 to-teal-400 rounded-t-2xl transition-all duration-700 ease-out group-hover:from-emerald-600 group-hover:to-teal-500 cursor-pointer"
                      style={{ height: animateStats ? `${height}%` : '0%' }}
                    >
                      {/* Tooltip on hover */}
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-16 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap shadow-xl z-10">
                        <p className="font-semibold">{day.date}</p>
                        <p>Wellness: {day.wellness}/10</p>
                        <p>{day.activities} activities</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <span className="text-sm font-bold text-slate-700">{day.day}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Treatment Cards - Glassmorphic */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {progressData.treatments.map((treatment, idx) => (
            <div
              key={idx}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/30 to-teal-400/30 rounded-3xl blur-xl group-hover:blur-2xl transition-all"></div>
              <div className="relative bg-white/70 backdrop-blur-md rounded-3xl p-6 border border-white shadow-xl hover:shadow-2xl transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                    treatment.type === 'detox' ? 'bg-gradient-to-br from-purple-400 to-purple-600' :
                    treatment.type === 'herbs' ? 'bg-gradient-to-br from-green-400 to-green-600' :
                    'bg-gradient-to-br from-blue-400 to-blue-600'
                  } shadow-lg`}>
                    {treatment.type === 'detox' && <Droplets className="w-7 h-7 text-white" />}
                    {treatment.type === 'herbs' && <Leaf className="w-7 h-7 text-white" />}
                    {treatment.type === 'lifestyle' && <Sun className="w-7 h-7 text-white" />}
                  </div>
                  <span className="text-3xl font-bold text-emerald-600">{treatment.progress}%</span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2">{treatment.name}</h3>
                <p className="text-sm text-slate-600 mb-4">{treatment.therapist}</p>

                <div className="h-2 bg-slate-200 rounded-full overflow-hidden mb-4">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-1000 ease-out"
                    style={{ width: animateStats ? `${treatment.progress}%` : '0%' }}
                  ></div>
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Clock className="w-4 h-4" />
                  <span>{treatment.nextSession}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Daily Checklist - Interactive */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl border border-white">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <CheckSquare className="w-7 h-7 text-emerald-600" />
            Today's Checklist
          </h2>

          <div className="space-y-3">
            {progressData.dailyChecklist.map((item, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${
                  item.done
                    ? 'bg-green-50 border-green-200'
                    : 'bg-slate-50 border-slate-200 hover:border-emerald-300'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  item.done ? 'bg-green-500' : 'bg-slate-300'
                }`}>
                  {item.done ? (
                    <CheckCircle className="w-6 h-6 text-white" />
                  ) : (
                    <div className="w-5 h-5 border-2 border-white rounded-lg"></div>
                  )}
                </div>
                
                <div className="flex-1">
                  <p className={`font-semibold ${item.done ? 'text-green-900 line-through' : 'text-slate-900'}`}>
                    {item.task}
                  </p>
                  <p className="text-sm text-slate-600">{item.time}</p>
                </div>

                <ChevronRight className="w-5 h-5 text-slate-400" />
              </div>
            ))}
          </div>
        </div>

      </div>

      <style jsx>{`
        @keyframes wave {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-wave {
          animation: wave 3s ease-in-out infinite;
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
}

export default ProgressPage;
