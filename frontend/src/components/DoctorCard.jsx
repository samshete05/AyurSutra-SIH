import React from "react";
import { Stethoscope, Info } from "lucide-react";

const DoctorCard = ({
  name,
  speciality,
  degree,
  experience,
  focus,
  fee,
  avatar,
  onBook,
}) => {
  return (
    <div className="rounded-2xl bg-white border border-[#1E4B3C]/15 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col w-full h-[410px] cursor-pointer">

      {/* FIXED IMAGE HEIGHT */}
      <div className="h-48 w-full overflow-hidden bg-gray-100">
        <img
          src={
            avatar ||
            "https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg"
          }
          alt={name}
          className="h-full w-full object-cover"
        />
      </div>

      {/* FIXED CONTENT BOX */}
      <div className="p-4 flex flex-col gap-2 flex-1 overflow-hidden">

        {/* Header */}
        <div className="flex items-start justify-between text-[#1E4B3C]">
          <div className="flex items-center gap-2">
            <Stethoscope className="h-4 w-4" />
            <span className="text-xs font-semibold uppercase tracking-wide">
              Doctor
            </span>
          </div>

          {fee && <span className="text-sm font-semibold">₹{fee}</span>}
        </div>

        {/* Name */}
        <p className="font-bold text-[#1E4B3C] text-lg leading-tight line-clamp-1">
          {name}
        </p>

        <p className="text-sm text-black line-clamp-1">{degree}</p>

        <p className="text-sm text-black line-clamp-1">
          Speciality: {speciality}
        </p>

        <p className="text-sm text-black line-clamp-1">
          Experience: {experience}
        </p>

        {/* Focus Areas */}
        <div className="flex items-start gap-2 text-sm text-black leading-snug">
          <Info className="h-4 w-4 mt-[2px] text-[#1E4B3C]" />
          <p className="line-clamp-2">{focus}</p>
        </div>

        {/* Book button (optional if needed later)
        <button
          onClick={onBook}
          className="mt-auto inline-flex items-center justify-center rounded-full bg-[#1E4B3C] px-4 py-2 text-xs font-semibold text-white hover:bg-[#173a2f] transition-colors"
        >
          Book Appointment
        </button> 
        */}

      </div>
    </div>
  );
};

export default DoctorCard;
