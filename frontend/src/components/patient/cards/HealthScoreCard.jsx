import React from "react";
import { Heart } from "lucide-react";

function HealthScoreCard({ score = 0 }) {
  const scoreColor = score >= 8 ? 'text-green-600' : 
                     score >= 6 ? 'text-yellow-600' : 
                     'text-red-600';

  const scoreBg = score >= 8 ? 'bg-green-50' : 
                  score >= 6 ? 'bg-yellow-50' : 
                  'bg-red-50';

  return (
    <div className={`${scoreBg} rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow`}>
      <div className="flex items-center gap-2 mb-4">
        <Heart className={`w-5 h-5 ${scoreColor}`} />
        <h3 className="font-semibold text-slate-900">Health Score</h3>
      </div>
      
      <div className="flex items-baseline gap-2">
        <p className={`text-4xl font-bold ${scoreColor}`}>{score.toFixed(1)}</p>
        <span className="text-sm text-slate-500">/ 10</span>
      </div>
      
      <p className="text-xs text-slate-600 mt-2">
        {score >= 8 ? '✨ Excellent health!' : 
         score >= 6 ? '👍 Good, keep improving' : 
         '⚠️ Needs attention'}
      </p>
    </div>
  );
}

export default HealthScoreCard;
