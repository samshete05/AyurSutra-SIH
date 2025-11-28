// import 

import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/home";
import { About } from "../pages/about";
import { Service } from "../pages/services";
import { Center } from "../pages/center";
import { Contact } from "../pages/contact";

export const AppRoutes=()=>{

    return <div>
        <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/service" element={<Service/>}/>
        <Route path="/center" element={<Center/>}/>
        <Route path="/contact" element={<Contact/>}/>
        </Routes>
    </div>
}