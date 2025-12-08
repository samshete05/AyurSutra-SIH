import React from "react";
import { Routes, Route } from "react-router-dom";
import PatientLayout from "../layouts/PatientLayout";
import DashboardPage from "../pages/patient/DashboardPage";
import AppointmentsPage from "../pages/patient/AppointmentsPage";
import FindCentersPage from "../pages/patient/FindCentersPage";
import TelemedicinePage from "../pages/patient/TelemedicinePage";
import AIRecommendationPage from "../pages/patient/AIRecommendationPage";
import MyTreatmentsPage from "../pages/patient/MyTreatmentsPage";
import ProgressPage from "../pages/patient/ProgressPage";
import FeedbackPage from "../pages/patient/FeedbackPage";
import NotificationsPage from "../pages/patient/NotificationsPage";
import MyProfilePage from "../pages/patient/MyProfilePage";
import SettingsPage from "../pages/patient/SettingsPage";
import AppointmentDetails from "../pages/patient/AppointmentDetail";

function PatientRoutes() {
  return (
    <PatientLayout>
      <Routes>
        <Route index element={<DashboardPage />} />
        <Route path="appointments" element={<AppointmentsPage />} />
        <Route path="find-centers" element={<FindCentersPage />} />
        <Route path="telemedicine" element={<TelemedicinePage />} />
        <Route path="ai-recommendation" element={<AIRecommendationPage />} />
        <Route path="my-treatments" element={<MyTreatmentsPage />} />
        <Route path="progress" element={<ProgressPage />} />
        <Route path="/patient/progress/:patientId" element={<ProgressPage />} />
        <Route path="feedback" element={<FeedbackPage />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="my-profile" element={<MyProfilePage />} />
        <Route path="settings" element={<SettingsPage />} />
<Route path="appointment-details/:id" element={<AppointmentDetails />} />
        
        {/* <Route path=""/> */}
      </Routes>
    </PatientLayout>
  );
}

export default PatientRoutes;