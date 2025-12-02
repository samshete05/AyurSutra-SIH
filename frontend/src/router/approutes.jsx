// src/routes/AppRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/home";
import About from "../pages/About";
import { Service } from "../pages/services";
import { Center } from "../pages/center/center";
import { Contact } from "../pages/contact";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import OtpVerification from "../pages/OtpVerification";
import CenterHeadApplicationSuccess from "../pages/center/CenterHeadApplicationSuccess";
import AllCenters from "../pages/center/AllCenters"; // or AllCentersEnhanced
import PatientRoutes from "./PatientRoutes";
// import PanchakarmaDashboard from "../pages/PanchkarmaAdminDashBoard";
import PanchakarmaDashboard from "../pages/center/PanchkarmaAdminDashBoard";
import AppointmentList from "../pages/AppointmentList";
// import <AddDoctorPage></AddDoctorPage> from "../pages/AddDoctor";
import AddDoctorPage from "../pages/center/AddDoctor";
import DoctorDashboard from "../pages/doctor/DoctorDashboard";
import DocDashMain from "../pages/doctor/DocDashMain";
import AddTherapist from "../pages/center/Addtherapist";
import AddTherapy from "../pages/center/Addtherapy";
import ViewTherapies from "../pages/center/ViewTherapy";

// center details and therapy-book and doctor book routes
import CenterDetails from "../pages/center/CenterDetails";
import CenterSettingsPage from "../pages/center/CenterSetting";
import CenterProfilePage from "../pages/center/CenterProfile";
import ProfilePage from "../pages/center/CenterProfile";
import CenterMap from "../pages/center/CenterMap";
import NotFound from "../pages/404";
import ProtectedRoute from "../pages/center/PanchakarmaProtected";
// import TherapyBooking from "../pages/TherapyBooking";
// import DoctorBooking from "../pages/DoctorBooking";
export const AppRoutes = () => {
  return (
     <div className="h-screen w-full">
        <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/service" element={<Service/>}/>
        <Route path="/center" element={<Center/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/otpverification" element={<OtpVerification/>}/>
        <Route path="/center-head-application-success" element={<CenterHeadApplicationSuccess/>}/>
        <Route path="/dashboard" element={<PanchakarmaDashboard/>}/>
        <Route path="/center-appointments" element={<AppointmentList/>}/>
        <Route path="/add-doctor" element={<AddDoctorPage/>}/>
       <Route path="/add-therapist" element={<AddTherapist/>}/>
    <Route path="/add-therapy" element={<AddTherapy/>}/>
    <Route path="/view-therapy" element={<ViewTherapies/>}/>

        <Route path="/doctor-dashboard" element={<DocDashMain/>}/>

        {/* <Route path="/center-setting" element={<CenterSettingsPage/>}/> */}
        <Route path="/center-profile" element={<ProfilePage/>}/>
        {/* <Route path="/center-setting"    /> */}

        <Route path="/allcenters" element={<AllCenters />} />
        <Route path="/patient/*" element={<PatientRoutes />} />
        <Route path="/NotFound" element={<NotFound/>} />
         <Route 
    path="/PanchaKarma-Dashboard"
    element={
      <ProtectedRoute allowedRole="centerHead">
        <PanchakarmaDashboard />
      </ProtectedRoute>
    }
  />

        {/* <Route p/> */}

        {/* Dynamic center route (prefixed to avoid collisions) */}
        {/* <Route path="/center/:slug" element={<CenterDetails />} /> */}

        <Route path="/center/:centerSlug" element={<CenterDetails />} />
        {/* <Route path="/center/:centerSlug/therapy-book" element={<TherapyBooking />} />
        <Route path="/center/:centerSlug/doctor-book" element={<DoctorBooking />} /> */}

        {/* Optional: 404 route last */}
        {/* <Route path="*" element={<NotFound />} /> */}

        <Route path="/center-map" element={<CenterMap/>}/>
      </Routes>
    </div>
  );
};
