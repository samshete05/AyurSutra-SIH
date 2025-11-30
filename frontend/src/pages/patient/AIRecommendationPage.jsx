import React, { useState } from "react";
import {
  Sparkles,
  Brain,
  Heart,
  TrendingUp,
  Calendar,
  Pill,
  Leaf,
  Sun,
  Moon,
  Droplets,
  Wind,
  Flame,
  ChevronRight,
  ThumbsUp,
  ThumbsDown,
  BookmarkPlus,
  Share2,
  MessageCircle,
  Play,
  Clock,
  Award,
  Target,
  CheckCircle,
  Star,
  Zap,
  RefreshCw,
  ArrowRight
} from "lucide-react";

function AIRecommendationPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [likedRecommendations, setLikedRecommendations] = useState([]);
  const [savedRecommendations, setSavedRecommendations] = useState([]);
  const [showFeedback, setShowFeedback] = useState(null);

  // Sample AI recommendations data
  const recommendations = [
    {
      id: 1,
      category: "treatment",
      title: "Abhyanga (Ayurvedic Oil Massage)",
      subtitle: "Recommended for your Vata imbalance",
      description: "Based on your recent stress levels and sleep patterns, daily Abhyanga can help balance your Vata dosha and improve circulation.",
      confidence: 95,
      benefit: "Reduces stress by 40% and improves sleep quality",
      duration: "15-20 mins daily",
      difficulty: "Easy",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8gJdaBLSWC4GYTDVSPnyAotKPKY1UpOaJmA&s",
      aiInsight: "Your elevated cortisol levels and irregular sleep suggest Vata aggravation. This warm oil massage will ground your energy.",
      nextSteps: ["Book massage session", "Learn self-massage technique", "Choose appropriate oil"],
      tags: ["Stress Relief", "Sleep", "Vata Balance"],
      likes: 142,
      isPersonalized: true
    },
    {
      id: 2,
      category: "diet",
      title: "Cooling Pitta-Balancing Diet Plan",
      subtitle: "AI-curated meal plan for next 7 days",
      description: "Your recent symptoms indicate Pitta aggravation. This cooling diet includes coconut water, cucumber, and sweet fruits.",
      confidence: 88,
      benefit: "Reduces inflammation and improves digestion",
      duration: "7-day plan",
      difficulty: "Moderate",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp9CwjUez2l33Y607lfPzPTm82R9l_uOKJHA&s",
      aiInsight: "Blood pressure readings and digestive patterns show Pitta dominance. Cooling foods will restore balance.",
      nextSteps: ["View meal plan", "Generate shopping list", "Set reminders"],
      tags: ["Pitta Balance", "Cooling", "Digestion"],
      likes: 98,
      isPersonalized: true
    },
    {
      id: 3,
      category: "meditation",
      title: "Pranayama: Nadi Shodhana (Alternate Nostril Breathing)",
      subtitle: "Perfect for your morning routine",
      description: "This breathing technique balances both brain hemispheres and calms the nervous system - ideal for your schedule.",
      confidence: 92,
      benefit: "Enhances focus and reduces anxiety by 50%",
      duration: "10 mins, twice daily",
      difficulty: "Easy",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdre3-WzLChjnfq6WPEc8KistUPSw-smxO0A&s",
      aiInsight: "Your activity patterns show peak stress at 10 AM. Morning pranayama can prevent this spike.",
      nextSteps: ["Watch tutorial", "Set daily reminder", "Track progress"],
      tags: ["Breathing", "Anxiety", "Focus"],
      likes: 256,
      isPersonalized: false
    },
    {
      id: 4,
      category: "lifestyle",
      title: "Dinacharya: Optimal Daily Routine",
      subtitle: "Personalized schedule based on your chronotype",
      description: "AI analysis shows you're a morning person. This routine optimizes your natural rhythm for maximum productivity and health.",
      confidence: 90,
      benefit: "Increases energy levels by 35%",
      duration: "Daily routine",
      difficulty: "Moderate",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGdOuaCYm9nPnYz_u_Z14mSnfFPCPsc75QLA&s",
      aiInsight: "Your wearable data reveals peak performance at 6-10 AM. Let's leverage that window.",
      nextSteps: ["View full routine", "Set morning alarm", "Integrate with calendar"],
      tags: ["Routine", "Energy", "Productivity"],
      likes: 187,
      isPersonalized: true
    },
    {
      id: 5,
      category: "herbs",
      title: "Ashwagandha Supplementation",
      subtitle: "Adaptogen for stress management",
      description: "Clinical studies + your health profile suggest Ashwagandha can significantly reduce your cortisol levels.",
      confidence: 85,
      benefit: "Reduces stress hormones by 28%",
      duration: "8-week course",
      difficulty: "Easy",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBa0SncITj1UcNZz-E2jJLsrtk2aHfNeha5A&s",
      aiInsight: "Stress biomarkers are 40% above optimal. Ashwagandha shows best results for your profile type.",
      nextSteps: ["Consult with doctor", "Order supplement", "Track effectiveness"],
      tags: ["Adaptogen", "Stress", "Cortisol"],
      likes: 312,
      isPersonalized: true
    },
    {
      id: 6,
      category: "yoga",
      title: "Yin Yoga for Deep Relaxation",
      subtitle: "Evening practice for better sleep",
      description: "Slow-paced poses held for 3-5 minutes to release deep tension. Perfect complement to your active morning routine.",
      confidence: 87,
      benefit: "Improves sleep onset by 25 minutes",
      duration: "30 mins before bed",
      difficulty: "Easy",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPtc0rDUmcUb2NtJhbrb5fr8S4GC2DCNM_Ew&s",
      aiInsight: "Sleep tracker shows difficulty falling asleep. Evening yin yoga targets this specific issue.",
      nextSteps: ["Join live class", "Download routine", "Set evening reminder"],
      tags: ["Sleep", "Relaxation", "Flexibility"],
      likes: 203,
      isPersonalized: true
    }
  ];

  const categories = [
    { id: "all", label: "For You", icon: Sparkles },
    { id: "treatment", label: "Treatments", icon: Heart },
    { id: "diet", label: "Nutrition", icon: Leaf },
    { id: "meditation", label: "Mindfulness", icon: Brain },
    { id: "lifestyle", label: "Lifestyle", icon: Sun },
    { id: "herbs", label: "Herbs", icon: Droplets },
    { id: "yoga", label: "Yoga", icon: Target }
  ];

  const handleLike = (id) => {
    if (likedRecommendations.includes(id)) {
      setLikedRecommendations(likedRecommendations.filter(item => item !== id));
    } else {
      setLikedRecommendations([...likedRecommendations, id]);
      setShowFeedback(id);
      setTimeout(() => setShowFeedback(null), 2000);
    }
    // TODO: Send feedback to backend for AI learning
  };

  const handleSave = (id) => {
    if (savedRecommendations.includes(id)) {
      setSavedRecommendations(savedRecommendations.filter(item => item !== id));
    } else {
      setSavedRecommendations([...savedRecommendations, id]);
    }
    // TODO: Save to backend
  };

  const filteredRecommendations = activeCategory === "all"
    ? recommendations
    : recommendations.filter(rec => rec.category === activeCategory);

  return (
    <div className="min-h-screen bg-slate-50 -m-4 md:-m-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Hero Section - Recombee Style */}
        <div className="relative bg-white px-4 md:px-8 pt-0 pb-16 md:pb-24 overflow-hidden">
          {/* Background decorative elements */}          
          <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 leading-tight">
                AI Recommendations
                <br />
                <span className="text-slate-700">and Search</span>
              </h1>
              
              <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed max-w-xl">
                Discover your path to wellness with AI-powered Ayurvedic insights tailored to your unique mind, body, and spirit.
              </p>
              <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed max-w-xl">
                Find your natural balance with personalized Ayurvedic recommendations powered by AI – where ancient wisdom meets modern intelligence.
              </p>
            </div>

            {/* Right Illustration - 3D Isometric Style */}
            <div className="relative">
              <div className="relative w-full h-[500px]">
                {/* Base platform layers */}
                <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-br from-emerald-200 to-teal-200 rounded-full transform rotate-12 opacity-20"></div>
                
                {/* Isometric platforms */}
                <div className="absolute bottom-20 right-20 w-64 h-64">
                  {/* Bottom tier */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-56 h-12 bg-gradient-to-br from-emerald-300 to-emerald-400 rounded-xl transform perspective-1000 -rotate-x-20 shadow-xl">
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-400 to-transparent opacity-50 rounded-xl"></div>
                  </div>
                  
                  {/* Middle tier */}
                  <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-48 h-12 bg-gradient-to-br from-teal-300 to-teal-400 rounded-xl transform perspective-1000 -rotate-x-20 shadow-xl">
                    <div className="absolute inset-0 bg-gradient-to-t from-teal-400 to-transparent opacity-50 rounded-xl"></div>
                  </div>
                  
                  {/* Top tier */}
                  <div className="absolute bottom-32 left-1/2 -translate-x-1/2 w-40 h-12 bg-gradient-to-br from-cyan-300 to-cyan-400 rounded-xl transform perspective-1000 -rotate-x-20 shadow-xl">
                    <div className="absolute inset-0 bg-gradient-to-t from-cyan-400 to-transparent opacity-50 rounded-xl"></div>
                  </div>
                </div>

                {/* Floating elements */}
                <div className="absolute top-10 right-10 w-16 h-16 bg-gradient-to-br from-amber-300 to-orange-400 rounded-lg transform rotate-12 shadow-lg animate-float"></div>
                <div className="absolute top-32 left-10 w-12 h-12 bg-gradient-to-br from-blue-300 to-indigo-400 rounded-lg transform -rotate-12 shadow-lg animate-float-delayed"></div>
                <div className="absolute bottom-40 right-5 w-10 h-10 bg-gradient-to-br from-pink-300 to-rose-400 rounded-full shadow-lg animate-float"></div>

                {/* People icons */}
                <div className="absolute bottom-28 left-10 w-12 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-t-full shadow-lg"></div>
                <div className="absolute bottom-44 right-16 w-12 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-t-full shadow-lg"></div>
                <div className="absolute bottom-60 left-20 w-12 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-t-full shadow-lg"></div>

                {/* Connecting lines */}
                <svg className="absolute inset-0 w-full h-full" style={{ zIndex: -1 }}>
                  <path d="M 100 400 Q 200 300 280 250" stroke="#10b981" strokeWidth="2" fill="none" opacity="0.3" />
                  <path d="M 150 350 Q 220 280 300 220" stroke="#14b8a6" strokeWidth="2" fill="none" opacity="0.3" />
                  <path d="M 120 380 Q 200 320 290 240" stroke="#06b6d4" strokeWidth="2" fill="none" opacity="0.3" />
                </svg>

                {/* Pills/Capsules floating */}
                <div className="absolute top-20 right-32 w-8 h-16 bg-gradient-to-b from-emerald-400 to-emerald-500 rounded-full shadow-md transform rotate-45 animate-float"></div>
                <div className="absolute top-40 left-24 w-6 h-12 bg-gradient-to-b from-teal-400 to-teal-500 rounded-full shadow-md transform -rotate-12 animate-float-delayed"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-4 md:px-8 py-8 space-y-8">
          {/* Category Filter */}
          <div className="bg-white rounded-2xl shadow-lg p-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`ml-1 flex items-center gap-2 px-5 py-3 rounded-xl font-medium whitespace-nowrap transition-all ${
                    activeCategory === category.id
                      ? "bg-emerald-600 text-white shadow-lg scale-105"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  <category.icon className="w-4 h-4" />
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* Recommendations Grid */}
          <div className="space-y-6">
            {filteredRecommendations.map((rec, index) => (
              <div
                key={rec.id}
                className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="p-6 md:p-8">
                  {/* Card Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                        <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                          <img 
                            src={rec.image} 
                            alt={rec.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {rec.isPersonalized && (
                            <span className="px-3 py-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
                              <Zap className="w-3 h-3" />
                              PERSONALIZED
                            </span>
                          )}
                          <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full">
                            {rec.confidence}% Match
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-1">{rec.title}</h3>
                        <p className="text-sm text-emerald-600 font-medium">{rec.subtitle}</p>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-slate-700 leading-relaxed mb-4">{rec.description}</p>

                  {/* AI Insight Box */}
                  <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-4 mb-4 border border-emerald-100">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Brain className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-emerald-900 mb-1">AI Insight</p>
                        <p className="text-sm text-emerald-800">{rec.aiInsight}</p>
                      </div>
                    </div>
                  </div>

                  {/* Benefits & Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="text-xs text-green-600 font-medium">Benefit</p>
                        <p className="text-sm font-semibold text-green-900">{rec.benefit}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <Clock className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="text-xs text-blue-600 font-medium">Duration</p>
                        <p className="text-sm font-semibold text-blue-900">{rec.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                      <Target className="w-5 h-5 text-orange-600" />
                      <div>
                        <p className="text-xs text-orange-600 font-medium">Difficulty</p>
                        <p className="text-sm font-semibold text-orange-900">{rec.difficulty}</p>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {rec.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-full hover:bg-slate-200 transition-colors cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Next Steps */}
                  <div className="mb-6">
                    <p className="text-sm font-semibold text-slate-900 mb-3">Next Steps:</p>
                    <div className="space-y-2">
                      {rec.nextSteps.map((step, idx) => (
                        <button
                          key={idx}
                          className="flex items-center justify-between w-full p-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors group/step"
                        >
                          <div className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-slate-400 group-hover/step:text-emerald-600 transition-colors" />
                            <span className="text-sm text-slate-700 group-hover/step:text-slate-900 font-medium">
                              {step}
                            </span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-400 group-hover/step:text-slate-700 group-hover/step:translate-x-1 transition-all" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Action Bar */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => handleLike(rec.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                          likedRecommendations.includes(rec.id)
                            ? "bg-emerald-100 text-emerald-600"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        <ThumbsUp className={`w-4 h-4 ${likedRecommendations.includes(rec.id) ? "fill-current" : ""}`} />
                        <span className="text-sm font-medium">{rec.likes + (likedRecommendations.includes(rec.id) ? 1 : 0)}</span>
                      </button>

                      <button
                        onClick={() => handleSave(rec.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                          savedRecommendations.includes(rec.id)
                            ? "bg-emerald-100 text-emerald-600"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        <BookmarkPlus className={`w-4 h-4 ${savedRecommendations.includes(rec.id) ? "fill-current" : ""}`} />
                        <span className="text-sm font-medium">
                          {savedRecommendations.includes(rec.id) ? "Saved" : "Save"}
                        </span>
                      </button>

                      <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all">
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-sm font-medium">Discuss</span>
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <button className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors">
                        <Share2 className="w-4 h-4" />
                      </button>
                      <button className="flex items-center gap-2 px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl">
                        <Play className="w-4 h-4" />
                        Start Now
                      </button>
                    </div>
                  </div>

                  {/* Feedback Toast */}
                  {showFeedback === rec.id && (
                    <div className="mt-4 p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg animate-fadeIn">
                      <p className="text-white text-sm font-medium flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Thanks! We'll show you more recommendations like this.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="flex justify-center pb-8">
            <button className="px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all border-2 border-slate-200">
              Load More Recommendations
            </button>
          </div>
        </div>

      </div>

      {/* Add animations in your global CSS or Tailwind config */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(12deg); }
          50% { transform: translateY(-20px) rotate(12deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(-12deg); }
          50% { transform: translateY(-15px) rotate(-12deg); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 3s ease-in-out infinite;
          animation-delay: 1s;
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default AIRecommendationPage;
