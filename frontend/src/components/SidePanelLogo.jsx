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
          src="https://res.cloudinary.com/dlty7hjfx/image/upload/v1764684761/Gemini_Generated_Image_97y8ep97y8ep97y8_n6yxoh.png"
          alt="AyurSutra"
          className="h-9 w-auto"
        />
      </span>
    </div>
  );
};

export default Logo;
