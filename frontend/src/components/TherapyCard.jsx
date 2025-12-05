// components/TherapyCard.jsx
import React from "react";
import { Leaf, Clock, Target, Info } from "lucide-react";

const TherapyCard = ({ 
  _id,
  therapyName,
  category,
  centerId,
 description,
  price,
  TherapyImg,
  duration,
  onBook ,
  maxPatientsPerDay
}) => {
  return (
    <div className="rounded-2xl bg-white border border-[#1E4B3C]/10 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col text-sm md:text-base h-full cursor-pointer">

      {/* Image */}
      <div className="h-36 md:h-40 w-full overflow-hidden">
        <img
          src={TherapyImg}
          alt={name}
          className="h-full w-full object-cover"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/300x200?text=Therapy";
          }}
        />
      </div>

      {/* Content */}
      <div className="px-4 pt-4 pb-2 flex flex-col gap-3 flex-grow">

        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 text-[#1E4B3C]">
            <Leaf className="h-5 w-5" />
            <p className="font-semibold text-[#1E4B3C] text-sm md:text-lg leading-snug">
          {therapyName}
        </p>
          </div>

          <span className="text-xs md:text-lg font-semibold text-[#1E4B3C]">
            {typeof price === 'number' ? `₹${price}` : price}
          </span>
        </div>

        {/* Name */}
       

        {/* Chips */}
        <div className="flex flex-wrap gap-2 text-xs md:text-sm text-black">
          <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1">
            <Target className="h-4 w-4" />
            <span>{focus}</span>
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1">
            <Clock className="h-4 w-4" />
            <span>{duration} min</span>
          </span>
        </div>

        {/* Summary */}
        <div className="mt-1 flex items-start gap-2 text-xs md:text-sm text-black leading-snug">
          <Info className="h-4 w-4 mt-[2px] flex-shrink-0" />
          <p className="line-clamp-2">{description}</p>
        </div>

        {/* Book Button */}
        <div className="mt-auto">
          <button
            onClick={onBook}
            className="w-full inline-flex items-center justify-center rounded-full bg-[#1E4B3C] px-6 py-3 my-2 text-xs md:text-sm font-semibold text-white hover:bg-[#173a2f] transition-colors"
          >
            Book Session
          </button>
        </div>

      </div>
    </div>
  );
};

export default TherapyCard;