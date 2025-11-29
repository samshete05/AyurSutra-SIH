// import 

import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/home";
import About from "../pages/About";
import { Service } from "../pages/services";
import { Center } from "../pages/center";
import { Contact } from "../pages/contact";
import { Register } from "../pages/register";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import OtpVerification from "../pages/OtpVerification";
import CenterHeadApplicationSuccess from "../pages/CenterHeadApplicationSuccess";
import AllCenters from "../pages/AllCenters";
import PatientRoutes from "./PatientRoutes";
import PanchakarmaDashboard from "../pages/PanchkarmaAdminDashBoard";
import AppointmentList from "../pages/AppointmentList";

export const AppRoutes=()=>{

    return <div className="h-screen w-full">
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

        <Route path="/allcenters" element={<AllCenters />} />
        {/* Patient dashboard and nested pages */}
        <Route path="/patient/*" element={<PatientRoutes />} />

        <Route path="/PanchaKarma-Dashboard" element={<PanchakarmaDashboard/>}/>
        </Routes>
    </div>
}