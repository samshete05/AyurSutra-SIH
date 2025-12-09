// // MainNavbar.jsx
// import React from "react";

// const MainNavbar = () => {
//   const links = [
//     { label: "Home", href: "http://localhost:5173/" },
//     { label: "About", href: "http://localhost:5173/about" },
//     { label: "Service", href: "http://localhost:5173/service" },
//     { label: "Center", href: "http://localhost:5173/center" },
//     { label: "Contact", href: "http://localhost:5173/contact" },
//   ];

//   return (
//     <nav className="w-full bg-white border-b border-slate-200">
//       <div className="max-w-6xl mx-auto px-5">
//         <div className="flex h-8 items-center justify-between">
//           {/* Logo / name */}
//           <div className="text-sm font-semibold text-slate-900">
            
//           </div>

//           {/* Links */}
//           <div className="flex items-center space-x-6 text-sm font-medium underline">
//             {links.map((link) => (
//               <a
//                 key={link.href}
//                 href={link.href}
//                 className="text-[#1E4B3C] hover:text-slate-900 transition-colors "
//               >
//                 {link.label}
//               </a>
//             ))}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default MainNavbar;


// MainNavbar.jsx
// src/components/MainNavbar.jsx
import React from "react";
import { Link } from "react-router-dom";

const MainNavbar = () => {
  const links = [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
    { label: "Service", to: "/service" },
    { label: "Center", to: "/center" },
    { label: "Contact", to: "/contact" },
  ];

  return (
    <nav className="w-full bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-5">
        <div className="flex h-8 items-center justify-between">
          {/* Logo / name */}
          <div className="text-sm font-semibold text-slate-900">
            {/* Yaha logo/text aa sakta hai */}
          </div>

          {/* Links + Google Translate */}
          <div className="flex items-center space-x-6 text-sm font-medium underline">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-[#1E4B3C] hover:text-slate-900 transition-colors"
              >
                {link.label}
              </Link>
            ))}

            {/* 👉 Google Translate dropdown Contact ke side mein */}
            <div
              id="google_translate_element"
              className="ml-2 flex items-center"
            ></div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MainNavbar;


