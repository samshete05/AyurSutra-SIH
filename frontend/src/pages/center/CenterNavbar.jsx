import { faBell } from "@fortawesome/free-solid-svg-icons";
import CenterNavbarProfile from "./CenterNavbarProfile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";


const CenterNavbar=()=>{
    const [openDropdown, setOpenDropdown] = useState(false);
    const dropdownRef = useRef(null);


    useEffect(() => {
        const handler = (e) => {
          if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setOpenDropdown(false);
          }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
      }, []);
    return    <div className="flex items-center gap-3 relative" ref={dropdownRef}>
        

            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
              <FontAwesomeIcon icon={faBell} className="text-xl" />
            </button>

            <CenterNavbarProfile/>
          </div>
}

export default CenterNavbar;