import React from "react";
import WelcomeBanner from "../../components/patient/cards/WelcomeBanner";
import NextAppointmentCard from "../../components/patient/cards/NextAppointmentCard";
import SessionsCompletedCard from "../../components/patient/cards/SessionsCompletedCard";
import TreatmentProgressCard from "../../components/patient/cards/TreatmentProgressCard";
import HealthScoreCard from "../../components/patient/cards/HealthScoreCard";
import UpcomingAppointmentsCard from "../../components/patient/cards/UpcomingAppointmentsCard";
import TreatmentGuidelinesCard from "../../components/patient/cards/TreatmentGuidelinesCard";
import RecentActivityCard from "../../components/patient/cards/RecentActivityCard";

function DashboardPage() {
  // For now static demo data; later wire to backend APIs
  const patientName = "Rajesh!";
  const wellnessScore = 8.2;

  return (
    <div className="space-y-6">
      <WelcomeBanner name={patientName} wellnessScore={wellnessScore} />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <NextAppointmentCard />
        <SessionsCompletedCard />
        <TreatmentProgressCard />
        <HealthScoreCard />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <UpcomingAppointmentsCard />
        </div>
        <div>
          <TreatmentGuidelinesCard />
        </div>
      </div>

      <RecentActivityCard />
    </div>
  );
}

export default DashboardPage;
