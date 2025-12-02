import React from "react";
import { CheckCircle } from "lucide-react";

function SessionsCompletedCard({ count = 0 }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2 mb-4">
        <CheckCircle className="w-5 h-5 text-blue-600" />
        <h3 className="font-semibold text-slate-900">Sessions Completed</h3>
      </div>
      
      <div className="flex items-baseline gap-2">
        <p className="text-4xl font-bold text-slate-900">{count}</p>
        <span className="text-sm text-slate-500">sessions</span>
      </div>
      {
        (count == 0)? <p className="text-xs text-emerald-600 mt-2">You Need to try us</p> :  <p className="text-xs text-green-600 mt-2">Great progress! Keep going 💪</p>
      }
      {/* {count > 0 && (
        <p className="text-xs text-green-600 mt-2">Great progress! Keep going 💪</p>
      )} */}
    </div>
  );
}

export default SessionsCompletedCard;
