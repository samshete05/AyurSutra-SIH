import React from "react";
import { Leaf, Clock, Target, Info } from "lucide-react";

const TherapyCard = ({ name, focus, duration, summary, price, therapyImage }) => {
  return (
    <div className="rounded-2xl bg-white border border-[#1E4B3C]/10 shadow-sm overflow-hidden text-xs md:text-sm flex flex-col">
      {/* Bigger image, nothing overlaid */}
      {therapyImage && (
        <div className="h-40 md:h-48 w-full overflow-hidden">
          <img
            src={therapyImage}
            alt={name}
            className="h-full w-full object-cover"
          />
        </div>
      )}

      {/* Content below image */}
      <div className="p-4 flex flex-col gap-2">
        {/* Header row: title + price */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 text-[#1E4B3C]/85">
            <Leaf className="h-4 w-4" />
            <p className="text-[11px] font-semibold uppercase tracking-wide">
              Therapy
            </p>
          </div>
          {price && (
            <span className="text-[11px] md:text-xs font-semibold text-[#1E4B3C]">
              ₹{price}
            </span>
          )}
        </div>

        {/* Name */}
        <p className="font-semibold text-[#1E4B3C] text-[13px] md:text-sm">
          {name}
        </p>

        {/* Focus + duration chips */}
        <div className="flex flex-wrap gap-2 text-[11px] md:text-xs text-[#1E4B3C]/85">
          <span className="inline-flex items-center gap-1 rounded-full bg-[#1E4B3C]/5 px-2 py-0.5">
            <Target className="h-3 w-3" />
            <span className="truncate max-w-[150px] md:max-w-[200px]">
              {focus}
            </span>
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-[#1E4B3C]/5 px-2 py-0.5">
            <Clock className="h-3 w-3" />
            <span>{duration}</span>
          </span>
        </div>

        {/* Summary */}
        <div className="mt-1 flex items-start gap-1.5 text-[11px] md:text-xs text-[#1E4B3C]/80 leading-snug">
          <Info className="h-3 w-3 mt-[1px] flex-shrink-0 text-[#1E4B3C]/70" />
          <p>{summary}</p>
        </div>
      </div>
    </div>
  );
};

export default TherapyCard;
