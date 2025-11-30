import React from "react";
import { Stethoscope } from "lucide-react";

const DoctorCard = ({ name, speciality, degree, experience, focus, fee, avatar }) => {
  return (
    <div className="rounded-2xl bg-white border border-[#1E4B3C]/10 shadow-sm overflow-hidden text-xs md:text-sm flex flex-col">
      <div className="flex items-center gap-3 p-4 pb-2">
        {avatar && (
          <img
            src={avatar}
            alt={name}
            className="h-10 w-10 md:h-12 md:w-12 rounded-full object-cover border border-[#1E4B3C]/20"
          />
        )}
        <div className="flex-1 space-y-0.5">
          <p className="font-semibold text-[#1E4B3C]">{name}</p>
          <p className="text-[11px] md:text-xs text-[#1E4B3C]/85">
            {degree}
          </p>
          <p className="text-[11px] md:text-xs text-[#1E4B3C]/80">
            Speciality: {speciality}
          </p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <Stethoscope className="h-4 w-4 text-[#1E4B3C]" />
          {fee && (
            <span className="text-[11px] md:text-xs font-semibold text-[#1E4B3C]">
              Fee: ₹{fee}
            </span>
          )}
        </div>
      </div>

      <div className="px-4 pb-4 space-y-1">
        <p className="text-[11px] md:text-xs text-[#1E4B3C]/80">
          Experience: {experience}
        </p>
        <p className="text-[11px] md:text-xs text-[#1E4B3C]/75 leading-snug">
          Focus areas: {focus}
        </p>
      </div>
    </div>
  );
};

export default DoctorCard;
