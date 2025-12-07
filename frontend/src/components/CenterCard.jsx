import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Home, Bot, Phone, Clock, Leaf } from "lucide-react";

// Convert name into clean slug
const makeSlug = (text = "") =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .trim();

const CenterCard = ({
  slug,
  name,
  city,
  address,
  image,
  bookingAiNumber,
  customerNumber,
  openingTime,
  closingTime,
  centerId,
  mainAddress,
  offTime,
  onTime
}) => {



  // If slug missing, create one from name
  const finalSlug = slug || makeSlug(name || "center");

  // console.log("final",finalSlug);

  return (
<Link to={`/center/${finalSlug}/${centerId}`}>
      <div className="group cursor-pointer relative overflow-hidden rounded-2xl bg-white border border-[#1E4B3C]/15 shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col">
        
        {/* Top accent */}
        <div className="absolute inset-x-0 top-0 h-1 bg-[#1E4B3C]" />

        {/* Image */}
        <div className="h-60 w-full overflow-hidden">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover group-hover:scale-[1.03] transition-transform duration-200"
          />
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col gap-4 text-sm">

          {/* Title */}
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-[#1E4B3C]">{name}</h2>
            <div className="flex items-center gap-1.5 text-xs text-[#1E4B3C]/85">
              <MapPin className="h-4 w-4" />
              <span>{city}</span>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-start gap-2 text-xs text-[#1E4B3C]/75">
            <Home className="h-4 w-4 mt-[2px]" />
            <span>{mainAddress}</span>
          </div>

          {/* Phone numbers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            
            <div className="flex items-start gap-2">
              <Bot className="h-4 w-4 mt-[2px] text-[#1E4B3C]" />
              <div>
                <span className="text-[11px] font-semibold text-[#1E4B3C]/90">AI Agent : </span>
                <span className="text-[#1E4B3C]">{bookingAiNumber || "Not available"}</span>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Phone className="h-4 w-4 mt-[2px] text-[#1E4B3C]" />
              <div>
                <span className="text-[11px] font-semibold text-[#1E4B3C]/90">Customer: </span>
                <span className="text-[#1E4B3C]">{customerNumber || "Not available"}</span>
              </div>
            </div>

          </div>

          {/* Timings */}
          <div className="flex items-center gap-2 text-xs text-[#1E4B3C]/95">
            <Clock className="h-4 w-4" />
            <span className="font-semibold">Timings:</span>
            <span>{onTime} – {offTime}</span>
          </div>

          {/* Footer */}
          <div className="mt-2 pt-3 border-t border-[#1E4B3C]/10 flex justify-between text-xs">
            <div className="flex items-center gap-2 text-[#1E4B3C]/80">
              <Leaf className="h-4 w-4" />
              <span>Panchakarma Center</span>
            </div>
            <span className="font-semibold text-[#1E4B3C] group-hover:underline">
              View details →
            </span>
          </div>

        </div>
      </div>
    </Link>
  );
};

export default CenterCard;
