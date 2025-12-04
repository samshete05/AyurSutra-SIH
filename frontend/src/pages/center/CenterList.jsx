import React, { useState, useMemo } from "react";
import CenterCard from "../../components/CenterCard";
import centers from "../../data/centers";
// const centers = [
//   {
//     slug: "ayursutra-koramangala",
//     name: "AyurSutra Panchakarma Center",
//     city: "Bengaluru",
//     address: "3rd Cross, 5th Block, Koramangala",
//     image:
//       "https://content.jdmagicbox.com/v2/comp/mumbai/b5/022pxx22.xx22.240610200154.h5b5/catalogue/kerala-ayurveda-multi-speciality-clinic-and-panchakarma-center-andheri-mumbai-clinics-g3yMeMOnHu.jpg",
//     customerNumber: "+91-80-4000-5678",
//     openingTime: "07:00",
//     closingTime: "21:00",
//   },
//   // ... add all your centers here as before
// ];

const toMinutes = (hhmm = "00:00") => {
  const [h = 0, m = 0] = hhmm.split(":").map((v) => Number(v) || 0);
  return h * 60 + m;
};

const isCenterOpenNow = (center, currentMinutes) => {
  const open = toMinutes(center.openingTime);
  const close = toMinutes(center.closingTime);
  if (open <= close) return currentMinutes >= open && currentMinutes <= close;
  return currentMinutes >= open || currentMinutes <= close;
};

const ArrowSVG = (
  <svg
    className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 8l4 4 4-4"
      stroke="#334E3A"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function CenterList() {
  // Filter states
  const [cityFilter, setCityFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [openNowOnly, setOpenNowOnly] = useState(false);
  const [opensBefore, setOpensBefore] = useState("all");
  const [closesBefore, setClosesBefore] = useState("all");
  const [hasCustomerNumber, setHasCustomerNumber] = useState("all");
  const [minOpening, setMinOpening] = useState("all");
  const [sortBy, setSortBy] = useState("relevance");

  const uniqueCities = Array.from(new Set(centers.map((c) => c.city)));
  const openingOptions = Array.from(new Set(centers.map((c) => c.openingTime))).sort();

  const filteredCenters = useMemo(() => {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const needle = search.trim().toLowerCase();

    let list = centers.filter((center) => {
      if (cityFilter !== "all" && center.city !== cityFilter) return false;

      if (needle) {
        const hay = `${center.name} ${center.address} ${center.city}`.toLowerCase();
        if (!hay.includes(needle)) return false;
      }

      if (opensBefore !== "all") {
        if (toMinutes(center.openingTime) > toMinutes(opensBefore))
          return false;
      }

      if (closesBefore !== "all") {
        if (toMinutes(center.closingTime) > toMinutes(closesBefore))
          return false;
      }

      if (hasCustomerNumber !== "all") {
        const has = Boolean(center.customerNumber && center.customerNumber.trim());
        if (hasCustomerNumber === "yes" && !has) return false;
        if (hasCustomerNumber === "no" && has) return false;
      }

      if (minOpening !== "all") {
        if (toMinutes(center.openingTime) < toMinutes(minOpening)) return false;
      }

      if (openNowOnly) {
        if (!isCenterOpenNow(center, currentMinutes)) return false;
      }

      return true;
    });

    if (sortBy === "name") {
      list = list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "openingTime") {
      list = list.sort((a, b) => toMinutes(a.openingTime) - toMinutes(b.openingTime));
    } else if (sortBy === "city") {
      list = list.sort((a, b) => a.city.localeCompare(b.city));
    }

    return list;
  }, [
    cityFilter,
    search,
    openNowOnly,
    opensBefore,
    closesBefore,
    hasCustomerNumber,
    minOpening,
    sortBy,
  ]);

  const clearAll = () => {
    setCityFilter("all");
    setSearch("");
    setOpenNowOnly(false);
    setOpensBefore("all");
    setClosesBefore("all");
    setHasCustomerNumber("all");
    setMinOpening("all");
    setSortBy("relevance");
  };


  console.log("here is center data",filteredCenters);
  return (
    <main className="min-h-screen bg-[#F5F7F6] pb-16">
      <section className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-start justify-between gap-4 flex-col md:flex-row">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#1E4B3C]">
                All Panchakarma Centers
              </h1>
              <p className="text-sm text-[#1E4B3C]/80 mt-1">
                Filter & discover centers quickly.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="text-sm text-[#1E4B3C]/70">Results:</div>
              <div className="px-3 py-1 rounded-full bg-[#1E4B3C] text-white text-sm">{filteredCenters.length}</div>
            </div>
          </div>

          {/* Filter bar */}
          <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="col-span-2 flex flex-wrap gap-2 items-center">
              {/* Search */}
              <div className="flex-1 min-w-[180px]">
                <input
                  className="w-full border rounded-full px-4 py-2 text-sm shadow-sm"
                  placeholder="Search name, address or city"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              {/* City chips */}
              <div className="flex gap-2 flex-wrap items-center">
                <button
                  onClick={() => setCityFilter("all")}
                  className={`px-3 py-1 rounded-full text-sm ${cityFilter === "all" ? "bg-[#1E4B3C] text-white" : "bg-white border"}`}
                >
                  All cities
                </button>

                {uniqueCities.map((city) => (
                  <button
                    key={city}
                    onClick={() => setCityFilter(city)}
                    className={`px-3 py-1 rounded-full text-sm ${cityFilter === city ? "bg-[#1E4B3C] text-white" : "bg-white border"}`}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 justify-end">
              <button
                onClick={clearAll}
                className="text-sm px-3 py-2 rounded-full border hover:bg-[#F3F7F6]"
              >
                Clear
              </button>

              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-sm border rounded-full px-3 py-2 pr-8 appearance-none bg-[url('')]"
                >
                  <option value="relevance">Sort: Relevance</option>
                  <option value="name">Sort: Name</option>
                  <option value="openingTime">Sort: Opening time</option>
                  <option value="city">Sort: City</option>
                </select>
                {ArrowSVG}
              </div>
            </div>
          </div>

          {/* Advanced filters */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="flex items-center gap-2">
              <label className="text-sm w-28">Opens before</label>
              <div className="relative flex-1">
                <select
                  className="w-full border rounded-full px-3 py-2 text-sm pr-8 appearance-none bg-[url('')]"
                  value={opensBefore}
                  onChange={(e) => setOpensBefore(e.target.value)}
                >
                  <option value="all">Any</option>
                  {openingOptions.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
                {ArrowSVG}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm w-28">Closes before</label>
              <div className="relative flex-1">
                <select
                  className="w-full border rounded-full px-3 py-2 text-sm pr-8 appearance-none bg-[url('')]"
                  value={closesBefore}
                  onChange={(e) => setClosesBefore(e.target.value)}
                >
                  <option value="all">Any</option>
                  {openingOptions.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
                {ArrowSVG}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm w-28">Min open time</label>
              <div className="relative flex-1">
                <select
                  className="w-full border rounded-full px-3 py-2 text-sm pr-8 appearance-none bg-[url('')]"
                  value={minOpening}
                  onChange={(e) => setMinOpening(e.target.value)}
                >
                  <option value="all">Any</option>
                  {openingOptions.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
                {ArrowSVG}
              </div>
            </div>
          </div>

          {/* Toggles */}
          <div className="mt-4 flex flex-wrap gap-3 items-center">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={openNowOnly}
                onChange={(e) => setOpenNowOnly(e.target.checked)}
                className="h-4 w-4"
              />
              <span className="text-sm">Open now</span>
            </label>

            <div className="flex items-center gap-2">
              <label className="text-sm">Customer number</label>
              <div className="relative">
                <select
                  value={hasCustomerNumber}
                  onChange={(e) => setHasCustomerNumber(e.target.value)}
                  className="border rounded-full px-3 py-1 text-sm pr-8 appearance-none bg-[url('')]"
                >
                  <option value="all">Any</option>
                  <option value="yes">Has number</option>
                  <option value="no">No number</option>
                </select>
                {ArrowSVG}
              </div>
            </div>

            <div className="ml-auto text-sm text-gray-500">
              Tip: click city chips to filter fast
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="max-w-6xl mx-auto px-4 py-6 md:py-8">
        {filteredCenters.length === 0 ? (
          <div className="text-center py-12 text-[#1E4B3C]/70">No centers match these filters.</div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filteredCenters.map((center, idx) => (
              <CenterCard  centerId={center.centerId} key={`${center.slug}-${idx}`} {...center} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
