// import React from "react";
// import { Leaf, Clock, Target, Info } from "lucide-react";

// const TherapyCard = ({ name, focus, duration, summary, price, therapyImage, onBook }) => {
//   return (
//     <div className="rounded-2xl bg-white border border-[#1E4B3C]/10 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col text-sm md:text-base h-full cursor-pointer">

//       {/* Image */}
//       {therapyImage && (
//         <div className="h-36 md:h-40 w-full overflow-hidden">
//           <img
//             src={therapyImage}
//             alt={name}
//             className="h-full w-full object-cover"
//           />
//         </div>
//       )}

//       {/* Content */}
//       <div className="px-4 pt-4 pb-2 flex flex-col gap-3 flex-grow">

//         {/* Header */}
//         <div className="flex items-start justify-between gap-2">
//           <div className="flex items-center gap-2 text-[#1E4B3C]">
//             <Leaf className="h-5 w-5" />
//             <p className="text-xs md:text-sm font-semibold uppercase tracking-wide">
//               Therapy
//             </p>
//           </div>

//           {price && (
//             <span className="text-xs md:text-lg font-semibold text-[#1E4B3C]">
//               ₹{price}
//             </span>
//           )}
//         </div>

//         {/* Name */}
//         <p className="font-semibold text-[#1E4B3C] text-sm md:text-lg leading-snug">
//           {name}
//         </p>

//         {/* Chips */}
//         <div className="flex flex-wrap gap-2 text-xs md:text-sm text-black">
//           <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1">
//             <Target className="h-4 w-4" />
//             <span>{focus}</span>
//           </span>
//           <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1">
//             <Clock className="h-4 w-4" />
//             <span>{duration}</span>
//           </span>
//         </div>

//         {/* Summary */}
//         <div className="mt-1 flex items-start gap-2 text-xs md:text-sm text-black leading-snug">
//           <Info className="h-4 w-4 mt-[2px] flex-shrink-0" />
//           <p>{summary}</p>
//         </div>

//         {/* Book Button — Sticks to bottom */}
//         <div className="mt-auto">
//           <button
//             onClick={onBook}
//             className="w-full inline-flex items-center justify-center rounded-full bg-[#1E4B3C] px-6 py-3 my-2 text-xs md:text-sm font-semibold text-white hover:bg-[#173a2f] transition-colors"
//           >
//             Book Session
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default TherapyCard;

import React from "react";
import { Leaf, Clock, Target, Info } from "lucide-react";

const TherapyCard = ({ id, name, focus, duration, summary, price, therapyImage, onBook }) => {
  return (
    <div className="rounded-2xl bg-white border border-[#1E4B3C]/10 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col text-sm md:text-base h-full cursor-pointer">
      {therapyImage && (
        <div className="h-36 md:h-40 w-full overflow-hidden">
          <img src={therapyImage} alt={name} className="h-full w-full object-cover" />
        </div>
      )}

      <div className="px-4 pt-4 pb-2 flex flex-col gap-3 flex-grow">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 text-[#1E4B3C]">
            <Leaf className="h-5 w-5" />
            <p className="text-xs md:text-sm font-semibold uppercase tracking-wide">Therapy</p>
          </div>

          {price && (
            <span className="text-xs md:text-lg font-semibold text-[#1E4B3C]">₹{price}</span>
          )}
        </div>

        <p className="font-semibold text-[#1E4B3C] text-sm md:text-lg leading-snug">{name}</p>

        <div className="flex flex-wrap gap-2 text-xs md:text-sm text-black">
          <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1">
            <Target className="h-4 w-4" />
            <span>{focus}</span>
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1">
            <Clock className="h-4 w-4" />
            <span>{duration}</span>
          </span>
        </div>

        <div className="mt-1 flex items-start gap-2 text-xs md:text-sm text-black leading-snug">
          <Info className="h-4 w-4 mt-[2px] flex-shrink-0" />
          <p>{summary}</p>
        </div>

        <div className="mt-auto">
          <button
            onClick={() => onBook && onBook({ id, name, focus, duration, summary, price, therapyImage })}
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
