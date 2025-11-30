import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Activity,
  Heart,
  Droplets,
  Wind,
  Flame,
  Award,
  Target,
  Sparkles,
  Bell,
  Download,
  ChevronRight,
  MessageSquare,
  Pill,
  Coffee,
  Moon,
  Zap,
  Brain,
  ArrowUp,
  ArrowDown,
  Users,
  FileText,
  BarChart3,
  Info,
  CheckSquare,
  XCircle,
  MinusCircle
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
        // THERAPY TRACKING DATA
        currentTherapy: {
          name: "Panchakarma Detoxification Program",
          type: "Comprehensive Detox",
          startDate: "2025-11-10",
          endDate: "2025-12-01",
          duration: "21 days",
          sessionsCompleted: 17,
          totalSessions: 20,
          completionPercentage: 85,
          status: "on_track",
          therapist: {
            name: "Dr. Priya Sharma",
            designation: "Senior Panchakarma Specialist",
            contact: "+91-98765-43210"
          },
          nextSession: {
            date: "2025-12-02",
            time: "10:00 AM",
            therapy: "Abhyanga + Swedana",
            room: "Therapy Room 3",
            duration: "90 minutes"
          }
        },

        // SESSION HISTORY
        sessionHistory: [
          {
            id: 17,
            date: "2025-11-30",
            therapy: "Virechana Karma",
            therapist: "Dr. Priya Sharma",
            duration: "120 mins",
            status: "completed",
            feedback: {
              symptoms: "Mild headache, improved digestion",
              sideEffects: "None",
              satisfaction: 9,
              notes: "Feeling very light and energetic after session"
            },
            therapistNotes: "Patient responding well. Continue current protocol."
          },
          {
            id: 16,
            date: "2025-11-29",
            therapy: "Basti Karma",
            therapist: "Dr. Priya Sharma",
            duration: "90 mins",
            status: "completed",
            feedback: {
              symptoms: "Better sleep, reduced stress",
              sideEffects: "Slight fatigue",
              satisfaction: 8,
              notes: "Excellent progress in stress management"
            },
            therapistNotes: "Monitor fatigue levels. Adjust diet if needed."
          },
          {
            id: 15,
            date: "2025-11-28",
            therapy: "Abhyanga + Swedana",
            therapist: "Dr. Priya Sharma",
            duration: "90 mins",
            status: "completed",
            feedback: {
              symptoms: "Muscle relaxation, better mood",
              sideEffects: "None",
              satisfaction: 10,
              notes: "Best session so far!"
            },
            therapistNotes: "Excellent response. Continue therapy as planned."
          }
        ],

        // UPCOMING SESSIONS
        upcomingSessions: [
          {
            id: 18,
            date: "2025-12-02",
            time: "10:00 AM",
            therapy: "Abhyanga + Swedana",
            therapist: "Dr. Priya Sharma",
            preProcedure: [
              "Empty stomach (4 hours before)",
              "Wear comfortable cotton clothing",
              "Avoid heavy exercise 24 hours before",
              "Stay hydrated"
            ],
            postProcedure: [
              "Rest for 2 hours after therapy",
              "Drink warm water",
              "Avoid cold foods/drinks for 24 hours",
              "Take prescribed herbal tea"
            ]
          },
          {
            id: 19,
            date: "2025-12-03",
            time: "10:00 AM",
            therapy: "Nasya Karma",
            therapist: "Dr. Priya Sharma"
          },
          {
            id: 20,
            date: "2025-12-04",
            time: "10:00 AM",
            therapy: "Final Assessment",
            therapist: "Dr. Priya Sharma"
          }
        ],

        // DOSHA BALANCE
        doshaBalance: {
          vata: {
            current: 35,
            previous: 45,
            optimal: 33,
            status: "improving",
            trend: "down"
          },
          pitta: {
            current: 40,
            previous: 35,
            optimal: 33,
            status: "slightly_high",
            trend: "up"
          },
          kapha: {
            current: 25,
            previous: 20,
            optimal: 34,
            status: "low",
            trend: "up"
          }
        },

        // HEALTH VITALS
        healthMetrics: {
          sleepQuality: { current: 7.5, previous: 6.2, trend: "up", change: 21 },
          stressLevel: { current: 4.2, previous: 6.8, trend: "down", change: -38 },
          energyLevel: { current: 8.1, previous: 6.5, trend: "up", change: 25 },
          digestion: { current: 7.8, previous: 6.0, trend: "up", change: 30 },
          bodyPain: { current: 3.2, previous: 5.8, trend: "down", change: -45 },
          mood: { current: 8.5, previous: 6.8, trend: "up", change: 25 }
        },

        // WEEKLY PROGRESS
        weeklyProgress: [
          { day: "Mon", date: "Nov 25", adherence: 90, wellness: 7.5, sessions: 1, symptoms: 3 },
          { day: "Tue", date: "Nov 26", adherence: 85, wellness: 7.8, sessions: 1, symptoms: 2 },
          { day: "Wed", date: "Nov 27", adherence: 95, wellness: 8.0, sessions: 1, symptoms: 2 },
          { day: "Thu", date: "Nov 28", adherence: 100, wellness: 8.3, sessions: 1, symptoms: 1 },
          { day: "Fri", date: "Nov 29", adherence: 80, wellness: 7.9, sessions: 1, symptoms: 2 },
          { day: "Sat", date: "Nov 30", adherence: 90, wellness: 8.4, sessions: 1, symptoms: 1 },
          { day: "Sun", date: "Dec 1", adherence: 95, wellness: 8.7, sessions: 0, symptoms: 0 }
        ],

        // MEDICATION & DIET ADHERENCE
        medications: [
          {
            name: "Triphala Churna",
            dosage: "1 tsp with warm water",
            timing: "After dinner",
            adherence: 95,
            dosesCompleted: 19,
            totalDoses: 20,
            missedDoses: 1
          },
          {
            name: "Ashwagandha Capsules",
            dosage: "500mg",
            timing: "Before bed",
            adherence: 90,
            dosesCompleted: 18,
            totalDoses: 20,
            missedDoses: 2
          },
          {
            name: "Brahmi Oil Massage",
            dosage: "Self-massage",
            timing: "Morning (scalp)",
            adherence: 85,
            dosesCompleted: 17,
            totalDoses: 20,
            missedDoses: 3
          }
        ],

        dietAdherence: {
          overall: 88,
          breakfast: 95,
          lunch: 90,
          dinner: 85,
          restrictions: ["Avoided dairy", "No cold foods", "No processed sugar"]
        },

        // MILESTONES & ACHIEVEMENTS
        milestones: [
          {
            id: 1,
            title: "Completed 15 Therapy Sessions",
            date: "2025-11-25",
            achieved: true,
            points: 50,
            badge: "🏆"
          },
          {
            id: 2,
            title: "7-Day Attendance Streak",
            date: "2025-11-28",
            achieved: true,
            points: 30,
            badge: "🔥"
          },
          {
            id: 3,
            title: "Improved Sleep Quality by 30%",
            date: "2025-11-22",
            achieved: true,
            points: 40,
            badge: "🌙"
          },
          {
            id: 4,
            title: "Complete Full Therapy Course",
            date: "2025-12-04",
            achieved: false,
            points: 100,
            badge: "⭐"
          },
          {
            id: 5,
            title: "100% Medication Adherence Week",
            date: "Pending",
            achieved: false,
            points: 50,
            badge: "💊"
          }
        ],

        // NOTIFICATIONS
        notifications: [
          {
            id: 1,
            type: "reminder",
            title: "Upcoming Session Tomorrow",
            message: "Abhyanga + Swedana session at 10:00 AM. Remember pre-procedure guidelines.",
            time: "2 hours ago",
            read: false,
            priority: "high"
          },
          {
            id: 2,
            type: "precaution",
            title: "Pre-Procedure Reminder",
            message: "Empty stomach required 4 hours before tomorrow's session.",
            time: "5 hours ago",
            read: false,
            priority: "high"
          },
          {
            id: 3,
            type: "feedback",
            title: "Pending Session Feedback",
            message: "Please provide feedback for your last session (Nov 30).",
            time: "1 day ago",
            read: true,
            priority: "medium"
          }
        ],

        // OVERALL STATS
        overallStats: {
          wellnessScore: 8.2,
          previousScore: 6.8,
          improvementRate: 18,
          totalPoints: 320,
          streak: 7,
          badges: 12,
          daysInTreatment: 21,
          completionPercentage: 85
        }
      };

      setProgressData(mockData);
      setLoading(false);
    }, 1000);
  };

  const getDoshaColor = (dosha) => {
    const colors = {
      vata: { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-700", gradient: "from-blue-400 to-indigo-500" },
      pitta: { bg: "bg-red-50", border: "border-red-200", text: "text-red-700", gradient: "from-red-400 to-orange-500" },
      kapha: { bg: "bg-green-50", border: "border-green-200", text: "text-green-700", gradient: "from-green-400 to-emerald-500" }
    };
    return colors[dosha];
  };

  const getStatusBadge = (status) => {
    const badges = {
      completed: { bg: "bg-green-100", text: "text-green-700", icon: CheckCircle },
      upcoming: { bg: "bg-blue-100", text: "text-blue-700", icon: Clock },
      missed: { bg: "bg-red-100", text: "text-red-700", icon: XCircle },
      on_track: { bg: "bg-emerald-100", text: "text-emerald-700", icon: CheckCircle }
    };
    return badges[status] || badges.completed;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-emerald-200 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-emerald-600 rounded-full border-t-transparent animate-spin"></div>
            <Activity className="absolute inset-0 m-auto w-8 h-8 text-emerald-600 animate-pulse" />
          </div>
          <p className="text-lg font-medium text-slate-700">Loading your wellness progress...</p>
        </div>
      </div>
    );
  }

  if (!progressData) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 space-y-6">

        {/* SECTION 1: HERO WELLNESS SCORE */}
        <div className="relative mb-6">
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
            <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-emerald-50/85 to-teal-50/80 backdrop-blur-xl"></div>

            <div className="relative z-10 p-8 md:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                
                {/* Wellness Score Circle */}
                <div className="flex justify-center lg:justify-start">
                  <div className="relative group cursor-pointer transition-transform duration-500 hover:scale-105" style={{ transformStyle: 'preserve-3d' }}>
                    
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>

                    <div className="relative w-72 h-72 md:w-80 md:h-80">
                      <div className="absolute inset-0 border-4 border-emerald-200/30 rounded-full group-hover:scale-110 transition-transform duration-500"></div>
                      <div className="absolute inset-4 border-2 border-teal-200/20 rounded-full group-hover:scale-105 transition-transform duration-700"></div>

                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="160" cy="160" r="140" fill="none" stroke="#e0f2f1" strokeWidth="16" opacity="0.3" />
                        <circle
                          cx="160"
                          cy="160"
                          r="140"
                          fill="none"
                          stroke="url(#wellnessGradient)"
                          strokeWidth="16"
                          strokeLinecap="round"
                          strokeDasharray={`${2 * Math.PI * 140}`}
                          strokeDashoffset={`${2 * Math.PI * 140 * (1 - progressData.overallStats.wellnessScore / 10)}`}
                          className={`transition-all duration-[2000ms] ease-out ${animateStats ? 'opacity-100' : 'opacity-0'}`}
                          style={{ filter: 'drop-shadow(0 0 8px rgba(16, 185, 129, 0.6))' }}
                        />
                        <circle cx="160" cy="160" r="130" fill="none" stroke="url(#innerGlow)" strokeWidth="2" opacity="0.6" className="animate-pulse" />
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

                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="absolute inset-12 bg-white/60 backdrop-blur-md rounded-full border border-white/50 shadow-2xl group-hover:bg-white/70 transition-colors"></div>
                        <div className="relative z-10 text-center">
                          <Sparkles className="w-8 h-8 text-amber-500 mx-auto animate-bounce mb-2" />
                          <div className="relative inline-block">
                            <span className="text-7xl md:text-8xl font-black bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                              {progressData.overallStats.wellnessScore}
                            </span>
                          </div>
                          <div className="text-2xl text-slate-400 font-light mb-4">/10</div>
                          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full shadow-lg">
                            <ArrowUp className="w-5 h-5" />
                            <span className="text-lg font-bold">+{progressData.overallStats.improvementRate}%</span>
                          </div>
                          <p className="text-sm text-slate-600 mt-3 font-medium">vs treatment start</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="space-y-6">
                  <div>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 rounded-full mb-4">
                      <Sparkles className="w-4 h-4 text-emerald-600" />
                      <span className="text-sm font-bold text-emerald-700">Treatment Overview</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-3">
                      {progressData.currentTherapy.name}
                    </h2>
                    <p className="text-lg text-slate-600">Your personalized Panchakarma journey</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-5 bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl border-2 border-orange-200">
                      <Flame className="w-10 h-10 text-orange-600 mb-3" />
                      <p className="text-sm text-slate-600 mb-1">Streak</p>
                      <p className="text-3xl font-bold text-slate-900">{progressData.overallStats.streak} days</p>
                    </div>
                    
                    <div className="p-5 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border-2 border-purple-200">
                      <Award className="w-10 h-10 text-purple-600 mb-3" />
                      <p className="text-sm text-slate-600 mb-1">Points</p>
                      <p className="text-3xl font-bold text-slate-900">{progressData.overallStats.totalPoints}</p>
                    </div>
                    
                    <div className="p-5 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border-2 border-blue-200">
                      <CheckSquare className="w-10 h-10 text-blue-600 mb-3" />
                      <p className="text-sm text-slate-600 mb-1">Sessions</p>
                      <p className="text-3xl font-bold text-slate-900">{progressData.currentTherapy.sessionsCompleted}/{progressData.currentTherapy.totalSessions}</p>
                    </div>
                    
                    <div className="p-5 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200">
                      <Target className="w-10 h-10 text-green-600 mb-3" />
                      <p className="text-sm text-slate-600 mb-1">Progress</p>
                      <p className="text-3xl font-bold text-slate-900">{progressData.currentTherapy.completionPercentage}%</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: CURRENT THERAPY & NEXT SESSION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Current Therapy Card */}
          <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl border border-white">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <Activity className="w-7 h-7 text-emerald-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Current Treatment</h2>
                  <p className="text-sm text-slate-600">{progressData.currentTherapy.type}</p>
                </div>
              </div>
              
              <div className={`px-4 py-2 rounded-full ${getStatusBadge(progressData.currentTherapy.status).bg} ${getStatusBadge(progressData.currentTherapy.status).text} font-semibold text-sm flex items-center gap-2`}>
                {React.createElement(getStatusBadge(progressData.currentTherapy.status).icon, { className: "w-4 h-4" })}
                <span className="capitalize">{progressData.currentTherapy.status.replace('_', ' ')}</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium text-slate-700">Treatment Progress</span>
                <span className="text-lg font-bold text-emerald-600">{progressData.currentTherapy.completionPercentage}%</span>
              </div>
              <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-1000 ease-out relative"
                  style={{ width: animateStats ? `${progressData.currentTherapy.completionPercentage}%` : '0%' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/40 to-white/0 animate-shimmer"></div>
                </div>
              </div>
              <div className="flex justify-between text-sm text-slate-600 mt-2">
                <span>{progressData.currentTherapy.sessionsCompleted} sessions completed</span>
                <span>{progressData.currentTherapy.totalSessions - progressData.currentTherapy.sessionsCompleted} remaining</span>
              </div>
            </div>

            {/* Treatment Details */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-slate-50 rounded-xl">
                <Calendar className="w-5 h-5 text-slate-500 mb-2" />
                <p className="text-xs text-slate-600">Start Date</p>
                <p className="text-sm font-bold text-slate-900">{progressData.currentTherapy.startDate}</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl">
                <Calendar className="w-5 h-5 text-slate-500 mb-2" />
                <p className="text-xs text-slate-600">End Date</p>
                <p className="text-sm font-bold text-slate-900">{progressData.currentTherapy.endDate}</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl">
                <Clock className="w-5 h-5 text-slate-500 mb-2" />
                <p className="text-xs text-slate-600">Duration</p>
                <p className="text-sm font-bold text-slate-900">{progressData.currentTherapy.duration}</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl">
                <Users className="w-5 h-5 text-slate-500 mb-2" />
                <p className="text-xs text-slate-600">Therapist</p>
                <p className="text-sm font-bold text-slate-900">{progressData.currentTherapy.therapist.name.split(' ')[1]}</p>
              </div>
            </div>

            {/* Therapist Info */}
            <div className="mt-6 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border-2 border-emerald-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {progressData.currentTherapy.therapist.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{progressData.currentTherapy.therapist.name}</p>
                    <p className="text-sm text-slate-600">{progressData.currentTherapy.therapist.designation}</p>
                  </div>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors">
                  <MessageSquare className="w-4 h-4" />
                  <span>Message</span>
                </button>
              </div>
            </div>
          </div>

          {/* Next Session Card */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-6 shadow-xl border-2 border-blue-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                <Clock className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Next Session</h3>
                <p className="text-sm text-slate-600">Upcoming appointment</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-white/70 backdrop-blur-sm rounded-xl">
                <p className="text-xs text-slate-600 mb-1">Therapy Type</p>
                <p className="text-lg font-bold text-slate-900">{progressData.currentTherapy.nextSession.therapy}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 bg-white/70 backdrop-blur-sm rounded-xl">
                  <Calendar className="w-5 h-5 text-blue-600 mb-2" />
                  <p className="text-xs text-slate-600 mb-1">Date</p>
                  <p className="text-sm font-bold text-slate-900">{progressData.currentTherapy.nextSession.date}</p>
                </div>
                <div className="p-4 bg-white/70 backdrop-blur-sm rounded-xl">
                  <Clock className="w-5 h-5 text-blue-600 mb-2" />
                  <p className="text-xs text-slate-600 mb-1">Time</p>
                  <p className="text-sm font-bold text-slate-900">{progressData.currentTherapy.nextSession.time}</p>
                </div>
              </div>

              <div className="p-4 bg-white/70 backdrop-blur-sm rounded-xl">
                <p className="text-xs text-slate-600 mb-1">Location</p>
                <p className="text-sm font-bold text-slate-900">{progressData.currentTherapy.nextSession.room}</p>
              </div>

              <div className="p-4 bg-white/70 backdrop-blur-sm rounded-xl">
                <p className="text-xs text-slate-600 mb-1">Duration</p>
                <p className="text-sm font-bold text-slate-900">{progressData.currentTherapy.nextSession.duration}</p>
              </div>

              <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg transition-colors">
                <Info className="w-5 h-5" />
                <span>View Pre-Procedure Guidelines</span>
              </button>
            </div>
          </div>
        </div>

        {/* SECTION 3: DOSHA BALANCE */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl border border-white">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Droplets className="w-7 h-7 text-purple-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Dosha Balance Tracking</h2>
              <p className="text-sm text-slate-600">Monitor your constitutional balance</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(progressData.doshaBalance).map(([dosha, data]) => {
              const colors = getDoshaColor(dosha);
              return (
                <div key={dosha} className={`p-6 ${colors.bg} rounded-2xl border-2 ${colors.border} hover:shadow-lg transition-shadow`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 bg-gradient-to-br ${colors.gradient} rounded-xl flex items-center justify-center`}>
                        {dosha === 'vata' && <Wind className="w-6 h-6 text-white" />}
                        {dosha === 'pitta' && <Flame className="w-6 h-6 text-white" />}
                        {dosha === 'kapha' && <Droplets className="w-6 h-6 text-white" />}
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 capitalize">{dosha}</h3>
                    </div>
                    <span className="text-3xl font-bold text-slate-900">{data.current}%</span>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-600">Current</span>
                      <span className="text-slate-600">Target: {data.optimal}%</span>
                    </div>
                    <div className="h-3 bg-white/70 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${colors.gradient} transition-all duration-1000 ease-out`}
                        style={{ width: animateStats ? `${data.current}%` : '0%' }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {data.trend === 'up' ? <TrendingUp className="w-4 h-4 text-green-600" /> : <TrendingDown className="w-4 h-4 text-orange-600" />}
                      <span className="text-sm text-slate-600">
                        {Math.abs(data.current - data.previous)}% change
                      </span>
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                      data.status === 'improving' ? 'bg-green-100 text-green-700' :
                      data.status === 'optimal' ? 'bg-emerald-100 text-emerald-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {data.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION 4: HEALTH VITALS */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl border border-white">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center">
              <Heart className="w-7 h-7 text-rose-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Health Vitals Dashboard</h2>
              <p className="text-sm text-slate-600">Track your daily wellness metrics</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(progressData.healthMetrics).map(([metric, data]) => {
              const isPositive = metric === 'stressLevel' || metric === 'bodyPain' ? data.trend === 'down' : data.trend === 'up';
              const icons = {
                sleepQuality: Moon,
                stressLevel: Brain,
                energyLevel: Zap,
                digestion: Heart,
                bodyPain: Activity,
                mood: Sparkles
              };
              const Icon = icons[metric];
              
              return (
                <div key={metric} className="p-6 bg-slate-50 rounded-2xl hover:shadow-lg transition-shadow border-2 border-slate-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      isPositive ? 'bg-green-100' : 'bg-orange-100'
                    }`}>
                      <Icon className={`w-6 h-6 ${isPositive ? 'text-green-600' : 'text-orange-600'}`} />
                    </div>
                    <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-bold ${
                      isPositive ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {isPositive ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                      <span>{Math.abs(data.change)}%</span>
                    </div>
                  </div>

                  <h3 className="text-sm font-semibold text-slate-600 mb-2 capitalize">
                    {metric.replace(/([A-Z])/g, ' $1').trim()}
                  </h3>
                  
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-4xl font-bold text-slate-900">{data.current}</span>
                    <span className="text-lg text-slate-500">/10</span>
                  </div>

                  <div className="h-2 bg-slate-200 rounded-full overflow-hidden mb-2">
                    <div
                      className={`h-full transition-all duration-1000 ${
                        isPositive ? 'bg-gradient-to-r from-green-400 to-emerald-500' : 'bg-gradient-to-r from-orange-400 to-red-500'
                      }`}
                      style={{ width: animateStats ? `${(data.current / 10) * 100}%` : '0%' }}
                    ></div>
                  </div>

                  <p className="text-xs text-slate-500">Previous: {data.previous}/10</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION 5: WEEKLY PROGRESS TIMELINE */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl border border-white">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-7 h-7 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Weekly Activity Timeline</h2>
              <p className="text-sm text-slate-600">Your 7-day wellness journey</p>
            </div>
          </div>

          <div className="flex justify-between items-end h-64 px-4">
            {progressData.weeklyProgress.map((day, idx) => {
              const height = (day.wellness / 10) * 100;
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-3 group">
                  <div className="relative flex-1 flex items-end w-full px-2">
                    <div
                      className="w-full bg-gradient-to-t from-emerald-500 to-teal-400 rounded-t-2xl transition-all duration-700 ease-out group-hover:from-emerald-600 group-hover:to-teal-500 cursor-pointer relative"
                      style={{ height: animateStats ? `${height}%` : '0%' }}
                    >
                      {/* Tooltip */}
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-32 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-4 py-3 rounded-xl text-sm shadow-2xl z-10 whitespace-nowrap">
                        <p className="font-bold text-center mb-2">{day.date}</p>
                        <div className="space-y-1 text-xs">
                          <p>Wellness: {day.wellness}/10</p>
                          <p>Adherence: {day.adherence}%</p>
                          <p>Sessions: {day.sessions}</p>
                          <p>Symptoms: {day.symptoms}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <span className="text-sm font-bold text-slate-700">{day.day}</span>
                    <p className="text-xs text-slate-500">{day.date.split(' ')[1]}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION 6: MEDICATION & DIET ADHERENCE */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Medication Adherence */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Pill className="w-7 h-7 text-purple-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Medication Tracker</h2>
                <p className="text-sm text-slate-600">Herbal supplements adherence</p>
              </div>
            </div>

            <div className="space-y-4">
              {progressData.medications.map((med, idx) => (
                <div key={idx} className="p-5 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-bold text-slate-900 mb-1">{med.name}</h3>
                      <p className="text-sm text-slate-600">{med.dosage} • {med.timing}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-3xl font-bold text-purple-700">{med.adherence}%</span>
                      <p className="text-xs text-slate-600">{med.dosesCompleted}/{med.totalDoses}</p>
                    </div>
                  </div>

                  <div className="h-3 bg-white/70 rounded-full overflow-hidden mb-2">
                    <div
                      className="h-full bg-gradient-to-r from-purple-400 to-pink-500 transition-all duration-1000"
                      style={{ width: animateStats ? `${med.adherence}%` : '0%' }}
                    ></div>
                  </div>

                  {med.missedDoses > 0 && (
                    <div className="flex items-center gap-2 text-xs text-orange-600 mt-2">
                      <AlertCircle className="w-4 h-4" />
                      <span>{med.missedDoses} missed doses</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Diet Adherence */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Coffee className="w-7 h-7 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Diet Adherence</h2>
                <p className="text-sm text-slate-600">Ayurvedic nutrition compliance</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200">
                <p className="text-sm text-slate-600 mb-2">Overall Diet Adherence</p>
                <p className="text-6xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
                  {progressData.dietAdherence.overall}%
                </p>
                <div className="h-4 bg-white/70 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-1000"
                    style={{ width: animateStats ? `${progressData.dietAdherence.overall}%` : '0%' }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl text-center">
                  <p className="text-xs text-slate-600 mb-2">Breakfast</p>
                  <p className="text-2xl font-bold text-slate-900">{progressData.dietAdherence.breakfast}%</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl text-center">
                  <p className="text-xs text-slate-600 mb-2">Lunch</p>
                  <p className="text-2xl font-bold text-slate-900">{progressData.dietAdherence.lunch}%</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl text-center">
                  <p className="text-xs text-slate-600 mb-2">Dinner</p>
                  <p className="text-2xl font-bold text-slate-900">{progressData.dietAdherence.dinner}%</p>
                </div>
              </div>

              <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                <p className="text-sm font-semibold text-slate-900 mb-3">Dietary Compliance</p>
                <div className="space-y-2">
                  {progressData.dietAdherence.restrictions.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-slate-700">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 7: SESSION HISTORY & FEEDBACK */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl border border-white">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center">
                <FileText className="w-7 h-7 text-cyan-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Session History & Feedback</h2>
                <p className="text-sm text-slate-600">Recent therapy sessions with patient feedback</p>
              </div>
            </div>
            <button className="text-emerald-600 hover:text-emerald-700 font-semibold text-sm flex items-center gap-2">
              View All
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4">
            {progressData.sessionHistory.map((session, idx) => (
              <div key={session.id} className="p-6 bg-gradient-to-r from-slate-50 to-slate-100 rounded-2xl border-2 border-slate-200 hover:shadow-lg transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                      #{session.id}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-1">{session.therapy}</h3>
                      <div className="flex items-center gap-4 text-sm text-slate-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{session.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{session.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{session.therapist}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                    <CheckCircle className="w-4 h-4" />
                    <span>Completed</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Patient Feedback */}
                  <div className="p-4 bg-white rounded-xl border border-slate-200">
                    <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-blue-600" />
                      Patient Feedback
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <p className="text-xs text-slate-600 mb-1">Symptoms Reported:</p>
                        <p className="text-slate-900">{session.feedback.symptoms}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-600 mb-1">Side Effects:</p>
                        <p className="text-slate-900">{session.feedback.sideEffects}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-600 mb-1">Patient Notes:</p>
                        <p className="text-slate-900 italic">"{session.feedback.notes}"</p>
                      </div>
                      <div className="flex items-center gap-2 pt-2">
                        <span className="text-xs text-slate-600">Satisfaction:</span>
                        <div className="flex items-center gap-1">
                          {[...Array(10)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-2 h-4 rounded-sm ${
                                i < session.feedback.satisfaction ? 'bg-amber-400' : 'bg-slate-200'
                              }`}
                            ></div>
                          ))}
                        </div>
                        <span className="text-sm font-bold text-slate-900">{session.feedback.satisfaction}/10</span>
                      </div>
                    </div>
                  </div>

                  {/* Therapist Notes */}
                  <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                    <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-emerald-600" />
                      Therapist Notes
                    </h4>
                    <p className="text-sm text-slate-700">{session.therapistNotes}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 8: UPCOMING SESSIONS */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl border border-white">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Calendar className="w-7 h-7 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Upcoming Sessions</h2>
              <p className="text-sm text-slate-600">Your scheduled therapy appointments</p>
            </div>
          </div>

          <div className="space-y-4">
            {progressData.upcomingSessions.map((session, idx) => (
              <div key={session.id} className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border-2 border-blue-200 hover:shadow-lg transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                      #{session.id}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-1">{session.therapy}</h3>
                      <div className="flex items-center gap-4 text-sm text-slate-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{session.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{session.time}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{session.therapist}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {idx === 0 && (
                    <div className="flex items-center gap-2 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold animate-pulse">
                      <Bell className="w-4 h-4" />
                      <span>Tomorrow</span>
                    </div>
                  )}
                </div>

                {session.preProcedure && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="p-4 bg-white rounded-xl border border-blue-200">
                      <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-blue-600" />
                        Pre-Procedure Guidelines
                      </h4>
                      <ul className="space-y-2">
                        {session.preProcedure.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                            <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 bg-white rounded-xl border border-emerald-200">
                      <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                        <Info className="w-4 h-4 text-emerald-600" />
                        Post-Procedure Care
                      </h4>
                      <ul className="space-y-2">
                        {session.postProcedure.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                            <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 9: MILESTONES & ACHIEVEMENTS */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl border border-white">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
              <Award className="w-7 h-7 text-amber-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Achievements & Milestones</h2>
              <p className="text-sm text-slate-600">Celebrate your progress</p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-green-500 via-emerald-500 to-slate-200"></div>

            <div className="space-y-4">
              {progressData.milestones.map((milestone) => (
                <div key={milestone.id} className="relative pl-16">
                  <div className={`absolute left-0 w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                    milestone.achieved
                      ? 'bg-gradient-to-br from-green-400 to-emerald-500 shadow-lg scale-110'
                      : 'bg-slate-200 border-2 border-slate-300'
                  }`}>
                    {milestone.achieved ? (
                      <span className="text-2xl">{milestone.badge}</span>
                    ) : (
                      <MinusCircle className="w-6 h-6 text-slate-400" />
                    )}
                  </div>

                  <div className={`p-5 rounded-2xl transition-all ${
                    milestone.achieved
                      ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 hover:shadow-md'
                      : 'bg-slate-50 border-2 border-slate-200'
                  }`}>
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className={`text-lg font-bold mb-1 ${
                          milestone.achieved ? 'text-green-900' : 'text-slate-700'
                        }`}>
                          {milestone.title}
                        </h3>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-slate-600">{milestone.date}</span>
                          {milestone.achieved && (
                            <span className="flex items-center gap-1 text-xs bg-amber-100 text-amber-700 px-3 py-1 rounded-full font-bold">
                              <Award className="w-3 h-3" />
                              +{milestone.points} points
                            </span>
                          )}
                        </div>
                      </div>

                      {milestone.achieved && (
                        <Sparkles className="w-6 h-6 text-amber-500 animate-pulse" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION 10: NOTIFICATIONS CENTER */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl border border-white">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <Bell className="w-7 h-7 text-red-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Notifications & Reminders</h2>
              <p className="text-sm text-slate-600">Important updates and alerts</p>
            </div>
          </div>

          <div className="space-y-3">
            {progressData.notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-5 rounded-2xl border-2 transition-all ${
                  !notification.read
                    ? 'bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200 hover:shadow-md'
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    notification.priority === 'high' ? 'bg-red-100' : 'bg-blue-100'
                  }`}>
                    {notification.type === 'reminder' && <Clock className={`w-5 h-5 ${notification.priority === 'high' ? 'text-red-600' : 'text-blue-600'}`} />}
                    {notification.type === 'precaution' && <AlertCircle className={`w-5 h-5 ${notification.priority === 'high' ? 'text-red-600' : 'text-blue-600'}`} />}
                    {notification.type === 'feedback' && <MessageSquare className={`w-5 h-5 ${notification.priority === 'high' ? 'text-red-600' : 'text-blue-600'}`} />}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-slate-900">{notification.title}</h3>
                      {!notification.read && (
                        <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
                      )}
                    </div>
                    <p className="text-sm text-slate-700 mb-2">{notification.message}</p>
                    <span className="text-xs text-slate-500">{notification.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col md:flex-row gap-4">
          <button className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-2xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">
            <Download className="w-5 h-5" />
            <span>Download Full Report (PDF)</span>
          </button>
          
          <button className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-white hover:bg-slate-50 border-2 border-slate-200 rounded-2xl font-bold text-slate-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">
            <MessageSquare className="w-5 h-5" />
            <span>Contact Your Therapist</span>
          </button>

          <button className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-white hover:bg-slate-50 border-2 border-slate-200 rounded-2xl font-bold text-slate-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">
            <Calendar className="w-5 h-5" />
            <span>View Full Schedule</span>
          </button>
        </div>

      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
}

export default ProgressPage;
