import React from "react";
import { FileText, Droplets, Utensils, Moon, Sun } from "lucide-react";

function TreatmentGuidelinesCard({ guidelines }) {
  // Icon mapping
  const iconMap = {
    Droplets,
    Utensils,
    Moon,
    Sun
  };

  // Default guidelines if none provided
  const defaultGuidelines = [
    {
      id: 1,
      icon: "Droplets",
      title: "Hydration",
      description: "Drink 8-10 glasses of water daily",
      iconColor: "text-blue-600",
      iconBg: "bg-blue-100"
    },
    {
      id: 2,
      icon: "Utensils",
      title: "Diet",
      description: "Follow prescribed dietary plan",
      iconColor: "text-green-600",
      iconBg: "bg-green-100"
    },
    {
      id: 3,
      icon: "Moon",
      title: "Sleep",
      description: "Maintain 7-8 hours of quality sleep",
      iconColor: "text-purple-600",
      iconBg: "bg-purple-100"
    },
    {
      id: 4,
      icon: "Sun",
      title: "Morning Routine",
      description: "Practice yoga and meditation",
      iconColor: "text-orange-600",
      iconBg: "bg-orange-100"
    }
  ];

  const displayGuidelines = guidelines && guidelines.length > 0 
    ? guidelines 
    : defaultGuidelines;

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="w-5 h-5 text-emerald-600" />
        <h3 className="font-semibold text-slate-900">Treatment Guidelines</h3>
      </div>

      <div className="space-y-3">
        {displayGuidelines.map((guideline) => {
          const Icon = iconMap[guideline.icon] || FileText;
          return (
            <div 
              key={guideline.id} 
              className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <div className={`${guideline.iconBg} p-2 rounded-lg`}>
                <Icon className={`w-4 h-4 ${guideline.iconColor}`} />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm text-slate-900">{guideline.title}</p>
                <p className="text-xs text-slate-600 mt-0.5">{guideline.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-slate-200">
        <p className="text-xs text-slate-500 text-center">
          💡 Follow these guidelines for best results
        </p>
      </div>
    </div>
  );
}

export default TreatmentGuidelinesCard;
