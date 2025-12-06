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
import AllCenters from "../pages/center/AllCenters"; 
import PatientRoutes from "./PatientRoutes";
import PanchakarmaDashboard from "../pages/center/PanchkarmaAdminDashBoard";
import AppointmentList from "../pages/center/AppointmentList";
import AddDoctorPage from "../pages/center/AddDoctor";
// import DoctorDashboard from "../pages/doctor/DoctorDashboard";
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
// import { elements } from "chart.js";
import PatientProtectedRoute from "../pages/patient/patientProtectedRoute";
import ViewDoctors from "../pages/center/ViewDoctor";
import ViewTherapists from "../pages/center/ViewTherapist";
import CenterNotifications from "../pages/center/CenterNotifications";
import TermsServices from "../pages/TermsServices";
import Privacy from "../pages/privacy";
import HelpCenter from "../pages/HelpCenter";
import AppointmentDetails from "../pages/patient/AppointmentDetail";
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
        <Route path="/dashboard" element={ <ProtectedRoute allowedRole="centerHead"><PanchakarmaDashboard/> </ProtectedRoute> }/>
        <Route path="/center-appointments" element={ <ProtectedRoute allowedRole="centerHead"> <AppointmentList/> </ProtectedRoute>}/>
        <Route path="/add-doctor" element={ <ProtectedRoute allowedRole="centerHead"> <AddDoctorPage/> </ProtectedRoute>}/>
        <Route path="/add-therapist"  element={ <ProtectedRoute allowedRole="centerHead"> <AddTherapist/> </ProtectedRoute>}/>
        <Route path="/add-therapy"  element={ <ProtectedRoute allowedRole="centerHead" > <AddTherapy/> </ProtectedRoute>}/>
        <Route path="/view-therapy" element={ <ProtectedRoute allowedRole="centerHead"> <ViewTherapies/> </ProtectedRoute>}/>
        <Route path="/center-notifications" element={<ProtectedRoute allowedRole="centerHead"><CenterNotifications /></ProtectedRoute>} />

        <Route path="/doctor-dashboard" element={<DocDashMain/>}/>

        {/* <Route path="/center-setting" element={<CenterSettingsPage/>}/> */}
        <Route path="/center-profile" element={ <ProtectedRoute allowedRole="centerHead"> <ProfilePage/> </ProtectedRoute>}/> 
        {/* <Route path="/center-setting"    /> */}

        <Route path="/allcenters" element={<AllCenters />} />
        <Route path="/patient/*" element={ <PatientProtectedRoute allowedRole="patient"> <PatientRoutes /> </PatientProtectedRoute>} />
        <Route path="/NotFound" element={<NotFound/>} />
        <Route path="/view-doctor" element={ <ProtectedRoute allowedRole="centerHead">  <ViewDoctors/>  </ProtectedRoute> } />
        <Route path="/view-therapist" element={<ProtectedRoute allowedRole="centerHead"> <ViewTherapists/> </ProtectedRoute>}/>
        <Route path="/PanchaKarma-Dashboard" element={<ProtectedRoute allowedRole="centerHead"><PanchakarmaDashboard /></ProtectedRoute>
    }
  />

        {/* <Route p/> */}

        {/* Dynamic center route (prefixed to avoid collisions) */}
        {/* <Route path="/center/:slug" element={<CenterDetails />} /> */}

<Route path="/center/:slug/:centerId" element={<CenterDetails />} />
        {/* <Route path="/center/:centerSlug/therapy-book" element={<TherapyBooking />} />
        <Route path="/center/:centerSlug/doctor-book" element={<DoctorBooking />} /> */}

        {/* Optional: 404 route last */}
        {/* <Route path="*" element={<NotFound />} /> */}

        <Route path="/center-map" element={<CenterMap/>}/>
        <Route path="/terms-services" element={<TermsServices />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/help-center" element={<HelpCenter />} />
      </Routes>
    </div>
  );
};
