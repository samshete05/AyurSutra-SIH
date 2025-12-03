import React from "react";
import { TrendingUp } from "lucide-react";

function TreatmentProgressCard({ progress = 0 }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5 text-purple-600" />
        <h3 className="font-semibold text-slate-900">Treatment Progress</h3>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-baseline gap-2">
          <p className="text-4xl font-bold text-slate-900">{progress}%</p>
        </div>
        
        <div className="w-full bg-slate-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <p className="text-xs text-slate-500">
          {progress < 30 ? 'Just getting started' : 
           progress < 70 ? 'Making good progress' : 
           'Almost there!'}
        </p>
      </div>
    </div>
  );
}

export default TreatmentProgressCard;
