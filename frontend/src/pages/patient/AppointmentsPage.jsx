import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Appointments = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showBooking, setShowBooking] = useState(false);
  const [formData, setFormData] = useState({
    centerId: "",
    appointmentDate: "",
    treatmentType: "",
    symptoms: "",
    notes: ""
  });

  // Fetch appointments on load
  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        navigate("/login");
        return;
      }

      const resp = await axios.get("http://localhost:3000/patient/getAppointments", {
        headers: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true
      });

      if (resp.data.message === "Success") {
        setAppointments(resp.data.appointments);
      }
      setLoading(false);
    } catch (err) {
      console.error("Error fetching appointments:", err);
      setLoading(false);
      if (err.response?.status === 401) {
        alert("Session expired. Please login again.");
        navigate("/login");
      }
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBookAppointment = async (event) => {
    event.preventDefault();
    
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        alert("Please login first");
        navigate("/login");
        return;
      }

      const resp = await axios.post(
        "http://localhost:3000/patient/bookAppointment",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
          withCredentials: true
        }
      );

      if (resp.data.message === "Appointment_Booked") {
        alert("Appointment booked successfully!");
        setShowBooking(false);
        fetchAppointments(); // Refresh list
        // Reset form
        setFormData({
          centerId: "",
          doctorId: "",
          appointmentDate: "",
          appointmentTime: "",
          treatmentType: "",
          symptoms: "",
          notes: ""
        });
      } else {
        alert("Failed to book appointment");
      }
    } catch (err) {
      console.log("Full error:", err);
      console.log("Error response:", err.response?.data);
      console.log("Error status:", err.response?.status);
      alert(`Error: ${err.response?.data?.message || err.message}`);
    }
  };

  const handleCancelAppointment = async (appointmentId) => {
    if (!window.confirm("Are you sure you want to cancel this appointment?")) {
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      const resp = await axios.post(
        "http://localhost:3000/patient/cancelAppointment",
        { appointmentId },
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
          withCredentials: true
        }
      );

      if (resp.data.message === "Appointment_Cancelled") {
        alert("Appointment cancelled");
        fetchAppointments();
      }
    } catch (err) {
      console.error("Error cancelling:", err);
      alert("Error cancelling appointment");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-emerald-50 to-emerald-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-[#1E4B3C]">My Appointments</h1>
            <p className="text-sm text-gray-600 mt-1">Manage your healthcare appointments</p>
          </div>
          <button
            onClick={() => setShowBooking(!showBooking)}
            className="bg-[#1E4B3C] text-white px-6 py-2.5 rounded-full font-semibold hover:bg-emerald-800 transition-colors"
          >
            {showBooking ? "✕ Close" : "+ Book New Appointment"}
          </button>
        </div>

        {/* Booking Form */}
        {showBooking && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-emerald-100">
            <h2 className="text-xl font-bold text-[#1E4B3C] mb-4">Book New Appointment</h2>
            <form onSubmit={handleBookAppointment} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Center ID <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="centerId"
                    value={formData.centerId}
                    onChange={handleInputChange}
                    required
                    placeholder="eg. 674d1234567890abcdef1234"
                    className="w-full rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:border-[#1E4B3C] focus:ring-1 focus:ring-[#1E4B3C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="appointmentDate"
                    value={formData.appointmentDate}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:border-[#1E4B3C] focus:ring-1 focus:ring-[#1E4B3C]"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Treatment Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="treatmentType"
                    value={formData.treatmentType}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:border-[#1E4B3C] focus:ring-1 focus:ring-[#1E4B3C]"
                  >
                    <option value="">Select treatment type</option>
                    <option value="Panchakarma Consultation">Panchakarma Consultation</option>
                    <option value="Abhyanga">Abhyanga (Oil Massage)</option>
                    <option value="Shirodhara">Shirodhara</option>
                    <option value="Basti">Basti (Enema Therapy)</option>
                    <option value="Nasya">Nasya (Nasal Therapy)</option>
                    <option value="General Consultation">General Consultation</option>
                    <option value="Follow-up">Follow-up Visit</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Symptoms / Reason for Visit
                  </label>
                  <input
                    type="text"
                    name="symptoms"
                    value={formData.symptoms}
                    onChange={handleInputChange}
                    placeholder="e.g., Back pain, stress, digestive issues"
                    className="w-full rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:border-[#1E4B3C] focus:ring-1 focus:ring-[#1E4B3C]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Additional Notes
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Any special requirements, allergies, or preferences"
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:border-[#1E4B3C] focus:ring-1 focus:ring-[#1E4B3C]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#1E4B3C] text-white py-3 rounded-full font-semibold hover:bg-emerald-800 transition-colors"
              >
                Confirm Booking
              </button>
            </form>
          </div>
        )}

        {/* Appointments List */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-12 text-gray-500">Loading appointments...</div>
          ) : appointments.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-emerald-100">
              <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-gray-500 text-lg font-semibold">No appointments found</p>
              <p className="text-sm text-gray-400 mt-2">Book your first appointment to get started</p>
            </div>
          ) : (
            appointments.map((appointment) => (
              <div
                key={appointment._id}
                className="bg-white rounded-2xl shadow-lg p-6 border border-emerald-100 hover:shadow-xl transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-[#1E4B3C]">
                        {appointment.treatmentType}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(appointment.status)}`}>
                        {appointment.status}
                      </span>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="font-semibold">Date:</span> {formatDate(appointment.appointmentDate)}
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-semibold">Time:</span> {appointment.appointmentTime}
                      </div>
                      {appointment.symptoms && (
                        <div className="flex items-start gap-2 mt-2">
                          <svg className="w-4 h-4 text-emerald-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <span><span className="font-semibold">Symptoms:</span> {appointment.symptoms}</span>
                        </div>
                      )}
                      {appointment.notes && (
                        <div className="flex items-start gap-2 text-xs text-gray-500 mt-2 bg-gray-50 p-2 rounded-lg">
                          <span className="font-semibold">Notes:</span> {appointment.notes}
                        </div>
                      )}
                    </div>
                  </div>
                  {appointment.status === 'pending' && (
                    <button
                      onClick={() => handleCancelAppointment(appointment._id)}
                      className="ml-4 bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-semibold hover:bg-red-200 transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Appointments;