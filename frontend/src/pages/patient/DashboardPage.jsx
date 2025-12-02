import React, { useState, useEffect } from "react";
import WelcomeBanner from "../../components/patient/cards/WelcomeBanner";
import NextAppointmentCard from "../../components/patient/cards/NextAppointmentCard";
import SessionsCompletedCard from "../../components/patient/cards/SessionsCompletedCard";
import TreatmentProgressCard from "../../components/patient/cards/TreatmentProgressCard";
import HealthScoreCard from "../../components/patient/cards/HealthScoreCard";
import UpcomingAppointmentsCard from "../../components/patient/cards/UpcomingAppointmentsCard";
import TreatmentGuidelinesCard from "../../components/patient/cards/TreatmentGuidelinesCard";
import RecentActivityCard from "../../components/patient/cards/RecentActivityCard";
import DoshaBalanceChart from "../../components/patient/cards/DoshaBalanceChart";
import WellnessGamification from "../../components/patient/cards/WellnessGamification";
import Loader from "../../components/Loader";

function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    profile: null,
    appointments: [],
    treatments: [],
    guidelines: [], // ✅ Add this
    stats: {
      sessionsCompleted: 0,
      treatmentProgress: 0,
      healthScore: 0
    }
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    window.location.href = '/login';
    return;
  }

  try {
    // Fetch profile
    const profileResponse = await fetch('http://localhost:3000/patient/getProfile', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    const profileData = await profileResponse.json();

    // Fetch appointments
    const appointmentsResponse = await fetch('http://localhost:3000/patient/getAppointments', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    const appointmentsData = await appointmentsResponse.json();

    // Process data
    if (profileResponse.ok && profileData.message === 'Success') {
      const appointments = appointmentsData.appointments || [];
      
      // Filter upcoming and completed appointments
      const now = new Date();
      const upcomingAppointments = appointments
        .filter(apt => new Date(apt.appointmentDate) >= now && apt.status !== 'cancelled')
        .sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate));
      
      const completedAppointments = appointments.filter(apt => apt.status === 'completed');

      // Calculate stats
      const sessionsCompleted = completedAppointments.length;
      const totalAppointments = appointments.length;
      const treatmentProgress = totalAppointments > 0 
        ? Math.round((sessionsCompleted / totalAppointments) * 100) 
        : 0;

      // Mock health score calculation
      const healthScore = 8.2;

      // Recent activities from appointments
      const recentActivities = appointments
        .slice(0, 5)
        .map(apt => ({
          id: apt._id,
          name: apt.treatmentType || 'General Consultation',
          status: apt.status === 'completed' ? 'Completed' : 
                  apt.status === 'confirmed' ? 'Upcoming' : 
                  apt.status === 'pending' ? 'Pending' : 'Ongoing',
          date: new Date(apt.appointmentDate).toLocaleDateString('en-GB')
        }));

      // Generate treatment guidelines based on profile
      const guidelines = generateGuidelines(profileData.profile);

      setDashboardData({
        profile: profileData.profile,
        appointments: upcomingAppointments,
        treatments: recentActivities,
        guidelines: guidelines,
        stats: {
          sessionsCompleted,
          treatmentProgress,
          healthScore
        }
      });
    }
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
  } finally {
    setLoading(false);
  }
};

// Helper function to generate guidelines based on profile
const generateGuidelines = (profile) => {
  const guidelines = [];
  let idCounter = 1;

  // Hydration guideline
  guidelines.push({
    id: idCounter++,
    icon: 'Droplets',
    title: "Hydration",
    description: "Drink 8-10 glasses of water daily",
    iconColor: "text-blue-600",
    iconBg: "bg-blue-100"
  });

  // Diet guideline based on dietary preferences
  const dietPref = profile.dietaryPreferences || 'Vegetarian';
  guidelines.push({
    id: idCounter++,
    icon: 'Utensils',
    title: "Diet",
    description: `Follow ${dietPref.toLowerCase()} dietary plan`,
    iconColor: "text-green-600",
    iconBg: "bg-green-100"
  });

  // Sleep guideline
  guidelines.push({
    id: idCounter++,
    icon: 'Moon',
    title: "Sleep",
    description: "Maintain 7-8 hours of quality sleep",
    iconColor: "text-purple-600",
    iconBg: "bg-purple-100"
  });

  // Dosha-specific guideline
  if (profile.primaryDosha) {
    const doshaAdvice = {
      'Vata': 'Stay warm, eat warm foods, maintain routine',
      'Pitta': 'Keep cool, avoid spicy foods, stay calm',
      'Kapha': 'Stay active, eat light foods, avoid oversleeping'
    };
    
    guidelines.push({
      id: idCounter++,
      icon: 'Sun',
      title: `${profile.primaryDosha} Balance`,
      description: doshaAdvice[profile.primaryDosha] || 'Practice yoga and meditation',
      iconColor: "text-orange-600",
      iconBg: "bg-orange-100"
    });
  } else {
    guidelines.push({
      id: idCounter++,
      icon: 'Sun',
      title: "Morning Routine",
      description: "Practice yoga and meditation",
      iconColor: "text-orange-600",
      iconBg: "bg-orange-100"
    });
  }

  return guidelines;
};

  if (loading) {
    return (
      <Loader />
    );
  }

  return (
  <div className="space-y-6">
    <WelcomeBanner 
      name={dashboardData.profile?.name || 'Guest'} 
      wellnessScore={dashboardData.stats.healthScore} 
    />

    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <NextAppointmentCard 
        appointment={dashboardData.appointments[0] || null} 
      />
      <SessionsCompletedCard 
        count={dashboardData.stats.sessionsCompleted} 
      />
      <TreatmentProgressCard 
        progress={dashboardData.stats.treatmentProgress} 
      />
      <HealthScoreCard 
        score={dashboardData.stats.healthScore} 
      />
    </div>

    <div className="grid gap-4 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <UpcomingAppointmentsCard 
          appointments={dashboardData.appointments} 
        />
      </div>
      <div>
        <TreatmentGuidelinesCard 
          guidelines={dashboardData.guidelines} 
        />
      </div>
    </div>

    <RecentActivityCard 
      activities={dashboardData.treatments} 
    />

    <DoshaBalanceChart 
      profile={dashboardData.profile} 
    />

    <WellnessGamification 
      profile={dashboardData.profile} 
      appointments={dashboardData.appointments}
    />
  </div>
);

}

export default DashboardPage;
