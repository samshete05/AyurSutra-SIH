import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import CenterCard from "../../components/CenterCard";

const toMinutes = (hhmm = "00:00") => {
  const [h = 0, m = 0] = hhmm.split(":").map((v) => Number(v) || 0);
  return h * 60 + m;
};

const isCenterOpenNow = (center, currentMinutes) => {
  const open = toMinutes(center.openingTime || "00:00");
  const close = toMinutes(center.closingTime || "23:59");

  if (open <= close) return currentMinutes >= open && currentMinutes <= close;
  return currentMinutes >= open || currentMinutes <= close;
};

const ArrowSVG = (
  <svg
    className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4"
    viewBox="0 0 20 20"
    fill="none"
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
  /* ---------------- STATE ---------------- */
  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [cityFilter, setCityFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [openNowOnly, setOpenNowOnly] = useState(false);
  const [opensBefore, setOpensBefore] = useState("all");
  const [closesBefore, setClosesBefore] = useState("all");
  const [hasCustomerNumber, setHasCustomerNumber] = useState("all");
  const [minOpening, setMinOpening] = useState("all");
  const [sortBy, setSortBy] = useState("relevance");

  /* ---------------- QUICK TOP CITIES ---------------- */
  const topCities = [
    "Bengaluru",
    "Hyderabad",
    "Nagpur",
    "Dehradun",
    "Mumbai",
    "Delhi",
    "Chennai",
    "Pune",
    "Kolkata",
    "Ahmedabad",
  ];

  /* ---------------- FETCH BACKEND DATA ---------------- */
  useEffect(() => {
    const fetchCenters = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/PanchKarmaCenter/allcenterList",
          { withCredentials: true }
        );
        console.log("yeah hain data",res);

        if (res.data.success) {
          setCenters(res.data.centers);
        } else {
          setError("Failed to load centers");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load centers");
      }

      setLoading(false);
    };

    fetchCenters();
  }, []);

  /* ---------------- OPTIONS ---------------- */
  const uniqueCities = [...new Set(centers.map((c) => c.city).filter(Boolean))];

  const openingOptions = [
    ...new Set(centers.map((c) => c.openingTime).filter(Boolean)),
  ].sort();

  /* ---------------- FILTER + SORT ---------------- */
  const filteredCenters = useMemo(() => {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const needle = search.toLowerCase().trim();

    let list = centers.filter((center) => {
      if (cityFilter !== "all" && center.city !== cityFilter) return false;

      if (needle) {
        const hay = `${center.CenterName} ${center.address} ${center.city}`.toLowerCase();
        if (!hay.includes(needle)) return false;
      }

      if (opensBefore !== "all" && toMinutes(center.openingTime) > toMinutes(opensBefore))
        return false;

      if (closesBefore !== "all" && toMinutes(center.closingTime) > toMinutes(closesBefore))
        return false;

      if (hasCustomerNumber !== "all") {
        const has = Boolean(center.MobileNo?.trim());
        if (hasCustomerNumber === "yes" && !has) return false;
        if (hasCustomerNumber === "no" && has) return false;
      }

      if (minOpening !== "all" && toMinutes(center.openingTime) < toMinutes(minOpening))
        return false;

      if (openNowOnly && !isCenterOpenNow(center, currentMinutes)) return false;

      return true;
    });

    if (sortBy === "name") {
      list.sort((a, b) => a.CenterName.localeCompare(b.CenterName));
    } else if (sortBy === "openingTime") {
      list.sort((a, b) => toMinutes(a.openingTime) - toMinutes(b.openingTime));
    } else if (sortBy === "city") {
      list.sort((a, b) => (a.city || "").localeCompare(b.city || ""));
    }

    return list;
  }, [
    centers,
    cityFilter,
    search,
    openNowOnly,
    opensBefore,
    closesBefore,
    hasCustomerNumber,
    minOpening,
    sortBy,
  ]);

  /* ---------------- CLEAR FILTERS ---------------- */
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

  /* ---------------- UI RETURN ---------------- */
  if (loading) return <p className="text-center py-20">Loading centers...</p>;

  if (error) return <p className="text-center py-20 text-red-600">{error}</p>;

  return (
    <main className="min-h-screen bg-[#F5F7F6] pb-16">
      <section className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-[#1E4B3C]">
            All Panchakarma Centers
          </h1>

          <div className="mt-2 text-sm text-gray-700">
            Results: <b>{filteredCenters.length}</b>
          </div>

          {/* SEARCH */}
          <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="col-span-2 flex flex-wrap gap-2">
              <input
                className="flex-1 border rounded-full px-4 py-2 text-sm shadow-sm"
                placeholder="Search name, address or city"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <button
                onClick={() => setCityFilter("all")}
                className={`px-3 py-1 rounded-full text-sm ${
                  cityFilter === "all"
                    ? "bg-[#1E4B3C] text-white"
                    : "bg-white border"
                }`}
              >
                All cities
              </button>

              {uniqueCities.map((city) => (
                <button
                  key={city}
                  onClick={() => setCityFilter(city)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    cityFilter === city
                      ? "bg-green-700 text-white"
                      : "bg-white border"
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>

            {/* SORT */}
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={clearAll}
                className="px-3 py-2 border rounded-full text-sm"
              >
                Clear
              </button>

              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border rounded-full px-3 py-2 text-sm pr-8 appearance-none"
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

          {/* ⭐ TOP CITIES BADGE FILTERS */}
          <div className="mt-4 max-w-6xl mx-auto px-1">
            <div className="flex items-center gap-2 overflow-x-auto py-2">

              {/* ALL BADGE */}
              <button
                onClick={() => setCityFilter("all")}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full font-semibold text-sm transition-all
                  border shadow-sm
                  ${
                    cityFilter === "all"
                      ? "bg-[#1E4B3C] text-white border-[#1E4B3C]"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
              >
                All
              </button>

              {/* CITY BADGES */}
              {topCities.map((city) => (
                <button
                  key={city}
                  onClick={() => setCityFilter(city)}
                  className={`flex-shrink-0 px-4 py-1.5 rounded-full font-semibold text-sm transition-all
                    border shadow-sm
                    ${
                      cityFilter === city
                        ? "bg-green-700 text-white border-green-700"
                        : "bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          {/* ADVANCED FILTERS */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="flex items-center gap-2">
              <label className="text-sm w-28">Opens before</label>
              <div className="relative w-full">
                <select
                  value={opensBefore}
                  onChange={(e) => setOpensBefore(e.target.value)}
                  className="w-full border rounded-full px-3 py-2 text-sm pr-8 appearance-none"
                >
                  <option value="all">Any</option>
                  {openingOptions.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
                {ArrowSVG}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm w-28">Closes before</label>
              <div className="relative w-full">
                <select
                  value={closesBefore}
                  onChange={(e) => setClosesBefore(e.target.value)}
                  className="w-full border rounded-full px-3 py-2 text-sm pr-8 appearance-none"
                >
                  <option value="all">Any</option>
                  {openingOptions.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
                {ArrowSVG}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm w-28">Min open time</label>
              <div className="relative w-full">
                <select
                  value={minOpening}
                  onChange={(e) => setMinOpening(e.target.value)}
                  className="w-full border rounded-full px-3 py-2 text-sm pr-8 appearance-none"
                >
                  <option value="all">Any</option>
                  {openingOptions.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
                {ArrowSVG}
              </div>
            </div>
          </div>

          {/* TOGGLES */}
          <div className="mt-4 flex items-center gap-3">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={openNowOnly}
                onChange={(e) => setOpenNowOnly(e.target.checked)}
              />
              <span className="text-sm">Open now</span>
            </label>

            <div className="flex items-center gap-2">
              <label className="text-sm">Customer number</label>
              <div className="relative">
                <select
                  value={hasCustomerNumber}
                  onChange={(e) => setHasCustomerNumber(e.target.value)}
                  className="border rounded-full px-3 py-1 text-sm pr-8 appearance-none"
                >
                  <option value="all">Any</option>
                  <option value="yes">Has number</option>
                  <option value="no">No number</option>
                </select>
                {ArrowSVG}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredCenters.map((center) => (
            <CenterCard
              key={center._id}
              centerId={center._id}
              name={center.CenterName}
              city={center.city}
              address={center.address}
              image={center.profileImg}
              customerNumber={center.MobileNo}
              bookingAiNumber={center.BotNumber}
              openingTime={center.openingTime || "09:00"}
              closingTime={center.closingTime || "21:00"}
              mainAddress={center.mainAddress}
              offTime={center.offTime}
              onTime={center.onTime}
              BotNumber={center.BotNumber}
              slug={center.CenterName?.toLowerCase().replace(/\s+/g, "-")}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
