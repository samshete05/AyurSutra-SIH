import React from "react";
import { useNavigate } from "react-router-dom";

const Logo = () => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/")}
      className="mb-8 flex cursor-pointer items-center gap-2"
    >
      <span className="text-xl font-semibold tracking-tight">
        <img
          src="/images/ayursutra-logo.png"   // put your logo file here
          alt="AyurSutra"
          className="h-9 w-auto"
        />
      </span>
    </div>
  );
};

export default Logo;
