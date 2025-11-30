import React from "react";
import { useParams } from "react-router-dom";
import { MapPin, Home, Phone, Clock, Leaf, Bot } from "lucide-react";
import centers from "../../data/centers"; // your data file
import TherapyCard from "../../components/TherapyCard";
import DoctorCard from "../../components/DoctorCard";

const CenterDetails = () => {
  const { centerSlug } = useParams();

  // find center by slug from your big centers array
  const center = centers.find((c) => c.slug === centerSlug);

  if (!center) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-10">
        <p className="text-sm text-red-600">
          Center not found. Please go back and select a valid center.
        </p>
      </main>
    );
  }

  const {
    name,
    city,
    address,
    image,
    bookingAiNumber,
    customerNumber,
    openingTime,
    closingTime,
    therapies = [],
    doctors = [],
  } = center;

  return (
    <main className="min-h-screen bg-[#F5F7F6]">
      {/* Header / hero */}
      <section className="bg-white border-b border-[#1E4B3C]/10">
        <div className="max-w-6xl mx-auto px-4 py-6 md:py-8 grid gap-6 md:grid-cols-[3fr,2fr] items-start">
          {/* Left: center info */}
          <div className="space-y-4">
            <div className="space-y-1">
              <h1 className="text-2xl md:text-3xl font-bold text-[#1E4B3C]">
                {name}
              </h1>
              <p className="flex items-center gap-1.5 text-xs md:text-sm text-[#1E4B3C]/85">
                <MapPin className="h-4 w-4" />
                <span>{city}</span>
              </p>
            </div>

            {/* Address + timings */}
            <div className="grid gap-3 text-xs md:text-sm text-[#1E4B3C]/85 md:grid-cols-2">
              <div className="flex items-start gap-2">
                <Home className="h-4 w-4 mt-[2px]" />
                <div>
                  <p className="font-semibold text-[#1E4B3C]">Address</p>
                  <p className="leading-snug">{address}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="h-4 w-4 mt-[2px]" />
                <div>
                  <p className="font-semibold text-[#1E4B3C]">Timings</p>
                  <p>
                    {openingTime} – {closingTime}
                  </p>
                </div>
              </div>
            </div>

            {/* Phone numbers */}
            <div className="grid gap-3 text-xs md:text-sm text-[#1E4B3C]/90 md:grid-cols-2">
              <div className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-[2px]" />
                <div>
                  <p className="font-semibold text-[#1E4B3C]">
                    Customer number
                  </p>
                  <p className="font-mono tracking-wide">
                    {customerNumber || "Not available"}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Bot className="h-4 w-4 mt-[2px]" />
                <div>
                  <p className="font-semibold text-[#1E4B3C]">
                    AI agent number
                  </p>
                  <p className="font-mono tracking-wide">
                    {bookingAiNumber || "Not available"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: image card */}
          <div className="order-first md:order-last">
            <div className="rounded-2xl overflow-hidden border border-[#1E4B3C]/15 shadow-sm bg-white">
              <div className="h-40 md:h-56 w-full overflow-hidden">
                <img
                  src={image}
                  alt={name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-3 md:p-4 flex items-center justify-between text-xs md:text-sm text-[#1E4B3C]/85">
                <div className="flex items-center gap-2">
                  <Leaf className="h-4 w-4" />
                  <span>Panchakarma Center</span>
                </div>
                <span className="text-[11px] md:text-xs">
                  Same-day slots may be limited.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Therapies + doctors */}
      <section className="max-w-6xl mx-auto px-4 py-6 md:py-8 space-y-8">
        {/* Therapies */}
        <div className="space-y-3">
          <h2 className="text-lg md:text-xl font-semibold text-[#1E4B3C]">
            Therapies at this center
          </h2>
          {therapies.length === 0 ? (
            <p className="text-xs md:text-sm text-[#1E4B3C]/70">
              No therapies listed yet.
            </p>
          ) : (
            <div className="grid gap-4 md:grid-cols-3">
              {therapies.map((t) => (
                <TherapyCard
                  key={t.id}
                  name={t.name}
                  focus={t.focus}
                  duration={t.duration}
                  summary={t.summary}
                  price={t.price}
                  therapyImage={t.therapyImage}
                />
              ))}
            </div>
          )}
        </div>

        {/* Doctors */}
        <div className="space-y-3">
          <h2 className="text-lg md:text-xl font-semibold text-[#1E4B3C]">
            Doctors at this center
          </h2>
          {doctors.length === 0 ? (
            <p className="text-xs md:text-sm text-[#1E4B3C]/70">
              No doctors listed yet.
            </p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {doctors.map((d) => (
                <DoctorCard
                  key={d.id}
                  name={d.name}
                  degree={d.degree}
                  speciality={d.speciality}
                  experience={d.experience}
                  focus={d.focus}
                  fee={d.fee}
                  avatar={d.avatar}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default CenterDetails;
