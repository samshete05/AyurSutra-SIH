// IndiaPatientsHeatmap.jsx
import React from "react";

const TOTAL_CENTERS = 128; // example total centers across India

const formatNumber = (num) =>
  num.toLocaleString("en-IN", { maximumFractionDigits: 0 });

// Positions and counts per region.
// top/left: where the circle sits on the image (%).
// labelLeft: horizontal position of the label box (%).
// anchor: 'left' or 'right' – which direction the line goes.
const HEAT_POINTS = [
  {
    id: "delhi",
    label: "Delhi NCR",
    top: 16,
    left: 48,
    centers: 14,
    anchor: "right",
    labelLeft: 65,
  },
  {
    id: "mumbai",
    label: "Mumbai",
    top: 58,
    left: 33,
    centers: 18,
    anchor: "left",
    labelLeft: 10,
  },
  {
    id: "pune",
    label: "Pune",
    top: 61,
    left: 36,
    centers: 10,
    anchor: "left",
    labelLeft: 8,
  },
  {
    id: "bengaluru",
    label: "Bengaluru",
    top: 71,
    left: 38,
    centers: 12,
    anchor: "left",
    labelLeft: 8,
  },
  {
    id: "kochi",
    label: "Kochi",
    top: 83,
    left: 39,
    centers: 7,
    anchor: "left",
    labelLeft: 8,
  },
  {
    id: "kolkata",
    label: "Kolkata",
    top: 42,
    left: 72,
    centers: 9,
    anchor: "right",
    labelLeft: 82,
  },
  {
    id: "nagpur",
    label: "Nagpur",
    top: 53,
    left: 47,
    centers: 11,
    anchor: "right",
    labelLeft: 65,
  },
  {
    id: "hyd",
    label: "Hyderabad",
    top: 63,
    left: 47,
    centers: 8,
    anchor: "right",
    labelLeft: 65,
  },
];

const IndiaPatientsHeatmap = () => {
  const maxCenters = Math.max(...HEAT_POINTS.map((p) => p.centers));

  return (
    <section className="w-full min-h-screen bg-white flex items-center justify-center">
      <div className="w-full max-w-5xl mx-auto flex flex-col items-stretch gap-8 py-10">
        {/* Top green card – now shows total centers */}
        <div className="rounded-xl bg-green-700 text-white px-10 py-5 shadow-lg text-center">
          <p className="text-3xl font-semibold">
            {formatNumber(TOTAL_CENTERS)}
          </p>
          <p className="mt-1 text-base font-medium">
            Total Panchakarma Centers in India
          </p>
        </div>

        {/* Large map with overlayed intensity circles + labels */}
        <div className="relative w-full bg-white rounded-2xl overflow-hidden shadow-lg">
          {/* Map image – larger height & width */}
          <img
            src="https://wallpapers.com/images/hd/india-political-map-colorful-9mzk3n5nu99kvif0.jpg"
            alt="India map"
            className="w-full h-[520px] object-cover block"
          />

          {/* Intensity circles + leader lines + labels */}
          {HEAT_POINTS.map((point) => {
            const size = 18 + (point.centers / maxCenters) * 32; // 18–50px
            const half = size / 2;

            // base position of the circle
            const circleTop = `calc(${point.top}% - ${half}px)`;
            const circleLeft = `calc(${point.left}% - ${half}px)`;

            // label vertical position (align with circle center)
            const labelTop = `calc(${point.top}% - 14px)`; // 28px tall label approx

            const lineHorizontalDirection =
              point.anchor === "left" ? -1 : 1;

            return (
              <React.Fragment key={point.id}>
                {/* circle */}
                <div
                  className="absolute rounded-full border-2 border-orange-400 bg-white/80"
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    top: circleTop,
                    left: circleLeft,
                  }}
                  title={`${point.label} · ${point.centers} centers`}
                />

                {/* connector line */}
                <div
                  className="absolute h-[2px] bg-orange-400"
                  style={{
                    top: `calc(${point.top}% + 1px)`,
                    left:
                      point.anchor === "left"
                        ? `calc(${point.left}% - ${half}px)`
                        : `calc(${point.left}% + ${half}px)`,
                    width: `calc(${Math.abs(
                      point.labelLeft - point.left
                    )}% - 4px)`,
                    transformOrigin:
                      point.anchor === "left" ? "right center" : "left center",
                    transform:
                      lineHorizontalDirection === -1
                        ? "scaleX(-1)"
                        : "scaleX(1)",
                  }}
                />

                {/* label box */}
                <div
                  className="absolute px-3 py-1 rounded-lg bg-white/90 border border-slate-200 shadow text-xs text-slate-800"
                  style={{
                    top: labelTop,
                    left: `${point.labelLeft}%`,
                    transform: "translateX(-50%)",
                    minWidth: "110px",
                  }}
                >
                  <p className="font-semibold">{point.label}</p>
                  <p className="text-[11px] text-slate-600">
                    {point.centers} centers
                  </p>
                </div>
              </React.Fragment>
            );
          })}
        </div>

        {/* Bottom note */}
        <div className="flex justify-end px-1">
          <p className="text-[11px] text-slate-600">
            Showing distribution of Panchakarma centers by region. Last
            Updated:{" "}
            {new Date().toLocaleString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </div>
    </section>
  );
};

export default IndiaPatientsHeatmap;
