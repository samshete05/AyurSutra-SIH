// src/components/HeroCarousel.jsx
import React, { useState, useEffect } from "react";

const slides = [
  {
    id: 1,
    image:
      "http://parijatak.com/public/images/slider/parijatak-banner-panchakrma.jpg",
  },
  {
    id: 2,
    image:
      "http://parijatak.com/public/images/slider/parijatak-banner-ayurveda2.jpg",
  },
  {
    id: 3,
    image:
      "https://www.yuktiherbs.com/cdn/shop/t/13/assets/best.png?v=53702848045265437271754113030",
  },
];

const HeroCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const prev = () =>
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  const next = () =>
    setActiveIndex((prev) => (prev + 1) % slides.length);

  return (
    <section className="relative h-[60vh] md:h-[70vh] lg:h-[80vh] w-full overflow-hidden">
      {/* Slider images */}
      <div
        className="flex h-full w-full transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="relative h-full w-full flex-shrink-0">
            <img
              src={slide.image}
              alt={`Panchakarma slide ${slide.id}`}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Dark gradient overlay for readability */}
      {/* <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/70 via-black/55 to-black/10" /> */}

      {/* Left text block */}
      {/* <div className="absolute inset-y-0 left-0 flex items-center">
        <div className="px-6 sm:px-10 lg:px-16 max-w-3xl space-y-4 text-white">
          <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.25em]" style={{ color: "#1E4B3C" }}>
            AyurSutra • Panchakarma
          </p>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight md:leading-snug">
            Book Panchakarma Session with AyurSutra
          </h1>
          <p className="text-sm md:text-base max-w-xl" style={{ color: "#E5F3ED" }}>
            Schedule, track, and personalize every Panchakarma therapy session
            from a single, intuitive dashboard.
          </p>
          <button
            className="mt-2 inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm md:text-base font-semibold shadow-lg transition"
            style={{
              backgroundColor: "#1E4B3C",
              color: "white",
              boxShadow: "0 10px 30px rgba(30,75,60,0.5)",
            }}
          >
            Book Session
          </button> */}

          {/* Dots */}
          {/* <div className="mt-5 flex items-center gap-2">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => setActiveIndex(index)}
                className="h-2.5 rounded-full transition-all"
                style={{
                  width: index === activeIndex ? "1.75rem" : "0.625rem",
                  backgroundColor:
                    index === activeIndex ? "#1E4B3C" : "rgba(255,255,255,0.5)",
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div> */}

      {/* Arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full text-white backdrop-blur-sm transition"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        ‹
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full text-white backdrop-blur-sm transition"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        ›
      </button>
    </section>
  );
};

export default HeroCarousel;
