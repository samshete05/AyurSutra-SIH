import React from "react";
import { Calendar, MapPin, Clock } from "lucide-react";

function UpcomingAppointmentsCard({ appointments = [] }) {
  if (appointments.length === 0) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <h3 className="font-semibold text-slate-900 mb-4">Upcoming Appointments</h3>
        <p className="text-sm text-slate-500 text-center py-8">No upcoming appointments scheduled</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
      <h3 className="font-semibold text-slate-900 mb-4">Upcoming Appointments</h3>
      
      <div className="space-y-3">
        {appointments.slice(0, 3).map((appointment) => {
          const appointmentDate = new Date(appointment.appointmentDate);
          const formattedDate = appointmentDate.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short'
          });
          
          return (
            <div 
              key={appointment._id} 
              className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="bg-emerald-100 p-2 rounded-lg">
                  <Calendar className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="font-medium text-slate-900">{appointment.treatmentType || 'Consultation'}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formattedDate}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      appointment.status === 'confirmed' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {appointment.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default UpcomingAppointmentsCard;
