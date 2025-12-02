import React from "react";
import { Calendar, Clock, MapPin } from "lucide-react";

function NextAppointmentCard({ appointment }) {
  if (!appointment) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-emerald-600" />
          <h3 className="font-semibold text-slate-900">Next Appointment</h3>
        </div>
        <p className="text-sm text-slate-500">No upcoming appointments</p>
      </div>
    );
  }

  const appointmentDate = new Date(appointment.appointmentDate);
  const formattedDate = appointmentDate.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
  const formattedTime = appointment.appointmentTime || 'Time TBD';

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="w-5 h-5 text-emerald-600" />
        <h3 className="font-semibold text-slate-900">Next Appointment</h3>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-start gap-2">
          <Clock className="w-4 h-4 text-slate-500 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-slate-900">{formattedDate}</p>
            <p className="text-xs text-slate-500">{formattedTime}</p>
          </div>
        </div>
        
        <div className="flex items-start gap-2">
          <MapPin className="w-4 h-4 text-slate-500 mt-0.5" />
          <p className="text-sm text-slate-700">{appointment.treatmentType || 'General Consultation'}</p>
        </div>

        <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
          appointment.status === 'confirmed' 
            ? 'bg-green-100 text-green-700' 
            : 'bg-yellow-100 text-yellow-700'
        }`}>
          {appointment.status === 'confirmed' ? 'Confirmed' : 'Pending Confirmation'}
        </div>
      </div>
    </div>
  );
}

export default NextAppointmentCard;
