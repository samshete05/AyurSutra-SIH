import React from "react";
import { Activity, CheckCircle, Clock, XCircle, AlertCircle } from "lucide-react";

function RecentActivityCard({ activities = [] }) {
  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'ongoing':
        return <Clock className="w-4 h-4 text-blue-600" />;
      case 'upcoming':
        return <AlertCircle className="w-4 h-4 text-orange-600" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Activity className="w-4 h-4 text-slate-600" />;
    }
  };

  const getStatusBadge = (status) => {
    const statusLower = status.toLowerCase();
    const styles = {
      completed: 'bg-green-100 text-green-700',
      ongoing: 'bg-blue-100 text-blue-700',
      upcoming: 'bg-orange-100 text-orange-700',
      pending: 'bg-yellow-100 text-yellow-700',
      cancelled: 'bg-red-100 text-red-700'
    };
    
    return styles[statusLower] || 'bg-slate-100 text-slate-700';
  };

  if (activities.length === 0) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="w-5 h-5 text-emerald-600" />
          <h3 className="font-semibold text-slate-900">Recent Activity</h3>
        </div>
        <div className="text-center py-8">
          <Activity className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="text-sm text-slate-500">No recent activities</p>
          <p className="text-xs text-slate-400 mt-1">Your treatment activities will appear here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-emerald-600" />
          <h3 className="font-semibold text-slate-900">Recent Activity</h3>
        </div>
        <span className="text-xs text-slate-500">{activities.length} total</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="text-left text-xs font-semibold text-slate-600 py-3 px-2">Treatment</th>
              <th className="text-left text-xs font-semibold text-slate-600 py-3 px-2">Status</th>
              <th className="text-left text-xs font-semibold text-slate-600 py-3 px-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity, index) => (
              <tr 
                key={activity.id || index} 
                className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
              >
                <td className="py-3 px-2">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(activity.status)}
                    <span className="text-sm font-medium text-slate-900">{activity.name}</span>
                  </div>
                </td>
                <td className="py-3 px-2">
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(activity.status)}`}>
                    {activity.status}
                  </span>
                </td>
                <td className="py-3 px-2">
                  <span className="text-xs text-slate-600">{activity.date}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {activities.length > 5 && (
        <div className="mt-4 text-center">
          <button className="text-xs text-emerald-600 hover:text-emerald-700 font-medium">
            View all activities →
          </button>
        </div>
      )}
    </div>
  );
}

export default RecentActivityCard;
