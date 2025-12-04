
import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Home, Bot, Phone, Clock, Leaf } from "lucide-react";

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
  centerId
}) => {
  console.log("yaha par",centerId)
  return (
<Link to={`/center/${encodeURIComponent(slug)}/${centerId}`}>
     
    <div className="group cursor-pointer relative overflow-hidden rounded-2xl bg-white border border-[#1E4B3C]/15 shadow-sm hover:shadow-lg hover:border-[#1E4B3C]/60 transition-all duration-200 flex flex-col">
      {/* Top accent bar */}
      <div className="absolute inset-x-0 top-0 h-1 bg-[#1E4B3C]" />

      {/* Image */}
      <div className="h-60 w-full overflow-hidden">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transform group-hover:scale-[1.03] transition-transform duration-200"
        />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-4 text-sm">
        {/* Name + city */}
        <div className="space-y-1">
          <h2 className="text-lg font-semibold text-[#1E4B3C]">
            {name}
          </h2>
          <div className="flex items-center gap-1.5 text-xs md:text-sm text-[#1E4B3C]/85">
            <MapPin className="h-4 w-4" />
            <span>{city}</span>
          </div>
        </div>

        {/* Address */}
        <div className="flex items-start gap-2 text-xs md:text-sm text-[#1E4B3C]/75 leading-snug">
          <Home className="h-4 w-4 mt-[2px]" />
          <span>{address}</span>
        </div>

        {/* Booking numbers (stacked nicely) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs md:text-sm">
          {/* AI Agent */}
          <div className="flex items-start gap-2">
            <Bot className="h-4 w-4 mt-[2px] text-[#1E4B3C]" />
            <div className="flex flex-col">
              <span className="text-[11px] md:text-xs font-semibold text-[#1E4B3C]/90">
                AI Agent
              </span>
              <span className="font-mono text-xs md:text-sm tracking-wide text-[#1E4B3C]/95">
                {bookingAiNumber || "Not available"}
              </span>
            </div>
          </div>

          {/* Customer */}
          <div className="flex items-start gap-2">
            <Phone className="h-4 w-4 mt-[2px] text-[#1E4B3C]" />
            <div className="flex flex-col">
              <span className="text-[11px] md:text-xs font-semibold text-[#1E4B3C]/90">
                Customer
              </span>
              <span className="font-mono text-xs md:text-sm tracking-wide text-[#1E4B3C]/95">
                {customerNumber || "Not available"}
              </span>
            </div>
          </div>
        </div>

        {/* Timings */}
        <div className="flex items-center gap-2 text-xs md:text-sm text-[#1E4B3C]/95">
          <Clock className="h-4 w-4 text-[#1E4B3C]" />
          <span className="font-semibold">Timings:</span>
          <span>
            {openingTime} – {closingTime}
          </span>
        </div>

        {/* Footer actions */}
        <div className="mt-2 pt-3 border-t border-[#1E4B3C]/10 flex items-center justify-between text-xs md:text-sm">
          <div className="flex items-center gap-2 text-[#1E4B3C]/80">
            <Leaf className="h-4 w-4" />
            <span>Panchakarma Center</span>
          </div>

          {/* Link updated to top-level slug (encoded) */}
          {/* <Link
            to={`/center/${encodeURIComponent(slug)}`}
            className="font-semibold text-[#1E4B3C] hover:underline"
          > */}
            View details →
        </div>
      </div>
    </div>
          </Link>
  );
};

export default CenterCard;
