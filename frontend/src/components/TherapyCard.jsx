import React from "react";
import { Leaf, Clock, Target, Info } from "lucide-react";

const TherapyCard = ({ name, focus, duration, summary, price, therapyImage, onBook }) => {
  return (
    <div className="rounded-2xl bg-white border border-[#1E4B3C]/10 shadow-sm overflow-hidden flex flex-col text-sm md:text-base">
      {/* Bigger image, no overlay */}
      {therapyImage && (
        <div className="h-40 md:h-50 w-full overflow-hidden">
          <img
            src={therapyImage}
            alt={name}
            className="h-full w-full object-cover"
          />
        </div>
      )}

      {/* Content below image */}
      <div className="p-4 flex flex-col gap-3 h-full">
        {/* Header row: label + price (teal) */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 text-[#1E4B3C]">
            <Leaf className="h-5 w-5" />
            <p className="text-xs md:text-sm font-semibold uppercase tracking-wide">
              Therapy
            </p>
          </div>
          {price && (
            <span className="text-xs md:text-lg font-semibold text-[#1E4B3C]">
              ₹{price}
            </span>
          )}
        </div>

        {/* Therapy name (teal) */}
        <p className="font-semibold text-[#1E4B3C] text-sm md:text-lg leading-snug">
          {name}
        </p>

        {/* Focus + duration chips (black text) */}
        <div className="flex flex-wrap gap-2 text-xs md:text-sm text-black">
          <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1">
            <Target className="h-4 w-4" />
            <span className="truncate max-w-[180px] md:max-w-[240px]">
              {focus}
            </span>
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1">
            <Clock className="h-4 w-4" />
            <span>{duration}</span>
          </span>
        </div>

        {/* Summary (black) */}
        <div className="mt-1 flex items-start gap-2 text-xs md:text-sm text-black leading-snug">
          <Info className="h-4 w-4 mt-[2px] flex-shrink-0" />
          <p>{summary}</p>
        </div>

        {/* Book button at bottom */}
        <button
          onClick={onBook}
          className="mt-3 inline-flex items-center justify-center rounded-full bg-[#1E4B3C] px-4 py-2 text-xs md:text-sm font-semibold text-white hover:bg-[#173a2f] transition-colors"
        >
          Book Session
        </button>
      </div>
    </div>
  );
};

export default TherapyCard;
