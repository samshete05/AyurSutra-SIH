// src/pages/AllCentersEnhanced.jsx
import React, { useMemo, useState } from "react";
import CenterCard from "../components/CenterCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const centers = [
  {
    slug: "ayursutra-koramangala",
    name: "AyurSutra Panchakarma Center",
    city: "Bengaluru",
    address: "3rd Cross, 5th Block, Koramangala",
    image:
      "https://content.jdmagicbox.com/v2/comp/mumbai/b5/022pxx22.xx22.240610200154.h5b5/catalogue/kerala-ayurveda-multi-speciality-clinic-and-panchakarma-center-andheri-mumbai-clinics-g3yMeMOnHu.jpg",
    customerNumber: "+91-80-4000-5678",
    openingTime: "07:00",
    closingTime: "21:00",
  },
  {
    slug: "swasthya-kolkata",
    name: "Swasthya Ayurveda Clinic",
    city: "Kolkata",
    address: "12, Lake Road, Rabindra Sarobar",
    image:
      "https://ayusanjivani.com/wp-content/uploads/2023/08/Ayusanjivani-Ayurveda-is-a-Pune-based-clinic-that-specializes-in-Ayurvedic-therapy-and-treatment.-The-firm-is-the-brain-child-of-Dr.Shailesh-Shamkant-Phalle.jpg",
    bookingAiNumber: "",
    customerNumber: "+91-33-3000-3344",
    openingTime: "08:00",
    closingTime: "20:30",
  },
  {
    slug: "prana-delhi",
    name: "Prana Ayurveda & Panchakarma",
    city: "New Delhi",
    address: "D-21, South Extension",
    image:
      "https://ind.5bestincity.com/profileimages/india/dr-raghavendra-nadargis-ayurveda-and-panchakarma-center-ayurvedic-clinics-akkalkot-solapur-maharashtra/34736-453d0-1.jpg",
    bookingAiNumber: "+91-11-4555-7788",
    customerNumber: "+91-11-4555-9900",
    openingTime: "06:30",
    closingTime: "22:00",
  },
  {
    slug: "sattva-andheri",
    name: "Sattva Ayurveda & Wellness",
    city: "Mumbai",
    address: "2nd Floor, Palm Avenue, Andheri West",
    image:
      "https://content.jdmagicbox.com/v2/comp/mumbai/g7/022pxx22.xx22.180212134536.a2g7/catalogue/ojas-ayurved-chikitsalay-juinagar-navi-mumbai-ayurvedic-doctors-for-abdominal-problem-rwoo8d1l1s.jpg",
    bookingAiNumber: "+91-22-6000-1212",
    customerNumber: "+91-22-6000-3434",
    openingTime: "07:30",
    closingTime: "21:30",
  },
  {
    slug: "ojas-pune",
    name: "Ojas Panchakarma Retreat",
    city: "Pune",
    address: "Near Mulshi Road, Bavdhan",
    image:
      "https://images.jdmagicbox.com/v2/comp/delhi/g1/011pxx11.xx11.230404160028.b5g1/catalogue/dr-viswambharan-kerala-ayur-arogya-green-park-delhi-ayurvedic-doctors-zya6rv81qb.jpg",
    bookingAiNumber: "+91-20-5500-9090",
    customerNumber: "+91-20-5500-8080",
    openingTime: "06:00",
    closingTime: "20:00",
  },
  {
    slug: "amruta-ahmedabad",
    name: "Amruta Ayurveda Clinic",
    city: "Ahmedabad",
    address: "Nr. Law Garden, Ellis Bridge",
    image:
      "https://content.jdmagicbox.com/v2/comp/delhi/r1/011pxx11.xx11.201024140500.m8r1/catalogue/kerala-ayurarogya-green-park-delhi-ayurvedic-clinics-ugtpul99cf.jpg",
    bookingAiNumber: "",
    customerNumber: "+91-79-4500-6677",
    openingTime: "09:00",
    closingTime: "19:00",
  },
  {
    slug: "shanti-cochin",
    name: "Shanti Ayurveda Panchakarma Center",
    city: "Kochi",
    address: "Beach Road, Fort Kochi",
    image: "https://images.pexels.com/photos/3738341/pexels-photo-3738341.jpeg",
    bookingAiNumber: "+91-48-4400-2233",
    customerNumber: "+91-48-4400-8899",
    openingTime: "07:00",
    closingTime: "20:30",
  },
  {
    slug: "vedya-hyderabad",
    name: "Vedya Ayurveda & Panchakarma",
    city: "Hyderabad",
    address: "Jubilee Hills Road No. 36",
    image:
      "https://content.jdmagicbox.com/v2/comp/malappuram/x6/9999px483.x483.230821210649.r8x6/catalogue/dr-lazima-s-avicenna-ayurveda-malappuram-ayurvedic-clinics-7n1us31ogf.jpg",
    bookingAiNumber: "+91-40-6600-7788",
    customerNumber: "+91-40-6600-7799",
    openingTime: "08:00",
    closingTime: "22:00",
  },
  {
    slug: "saumya-chennai",
    name: "Saumya Ayurveda Center",
    city: "Chennai",
    address: "Besant Nagar Beach Road",
    image:
      "https://content.jdmagicbox.com/v2/comp/mumbai/b5/022pxx22.xx22.240610200154.h5b5/catalogue/kerala-ayurveda-multi-speciality-clinic-and-panchakarma-center-andheri-mumbai-clinics-g3yMeMOnHu-250.jpg",
    bookingAiNumber: "",
    customerNumber: "+91-44-4300-5566",
    openingTime: "07:30",
    closingTime: "21:00",
  },
];

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

export default function AllCentersEnhanced() {
  const [cityFilter, setCityFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [openNowOnly, setOpenNowOnly] = useState(false);
  const [opensBefore, setOpensBefore] = useState("all");
  const [closesBefore, setClosesBefore] = useState("all");
  const [hasCustomerNumber, setHasCustomerNumber] = useState("all");
  const [minOpening, setMinOpening] = useState("all");
  const [sortBy, setSortBy] = useState("relevance");

  // Dynamic values derived from centers
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
        if (toMinutes(center.openingTime) > toMinutes(opensBefore)) return false;
      }

      if (closesBefore !== "all") {
        if (toMinutes(center.closingTime) > toMinutes(closesBefore)) return false;
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

    // sorting
    if (sortBy === "name") {
      list = list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "openingTime") {
      list = list.sort((a, b) => toMinutes(a.openingTime) - toMinutes(b.openingTime));
    } else if (sortBy === "city") {
      list = list.sort((a, b) => a.city.localeCompare(b.city));
    }

    return list;
  }, [cityFilter, search, openNowOnly, opensBefore, closesBefore, hasCustomerNumber, minOpening, sortBy]);

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

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F5F7F6] pb-16">
        <section className="bg-white shadow-sm">
          <div className="max-w-6xl mx-auto px-4 py-6">
            <div className="flex items-start justify-between gap-4 flex-col md:flex-row">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-[#1E4B3C]">
                  All Panchakarma Centers
                </h1>
                <p className="text-sm text-[#1E4B3C]/80 mt-1">Filter & discover centers quickly.</p>
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
                    className={`px-3 py-1 rounded-full text-sm ${cityFilter === "all" ? "bg-[#1E4B3C] text-white" : "bg-white border"}`}>
                    All cities
                  </button>

                  {uniqueCities.map((city) => (
                    <button
                      key={city}
                      onClick={() => setCityFilter(city)}
                      className={`px-3 py-1 rounded-full text-sm ${cityFilter === city ? "bg-[#1E4B3C] text-white" : "bg-white border"}`}>
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
                    className="text-sm border rounded-full px-3 py-2 appearance-none pr-8"
                  >
                    <option value="relevance">Sort: Relevance</option>
                    <option value="name">Sort: Name</option>
                    <option value="openingTime">Sort: Opening time</option>
                    <option value="city">Sort: City</option>
                  </select>
                  <svg className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 8l4 4 4-4" stroke="#334E3A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Advanced filters */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="flex items-center gap-2">
                <label className="text-sm w-28">Opens before</label>
                <select className="flex-1 border rounded-full px-3 py-2 text-sm appearance-none pr-8" value={opensBefore} onChange={(e) => setOpensBefore(e.target.value)}>
                  <option value="all">Any</option>
                  {openingOptions.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
                <svg className="pointer-events-none absolute right-6 top-1/2 transform -translate-y-1/2 w-4 h-4" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 8l4 4 4-4" stroke="#334E3A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-sm w-28">Closes before</label>
                <select className="flex-1 border rounded-full px-3 py-2 text-sm appearance-none pr-8" value={closesBefore} onChange={(e) => setClosesBefore(e.target.value)}>
                  <option value="all">Any</option>
                  {openingOptions.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
                <svg className="pointer-events-none absolute right-6 top-1/2 transform -translate-y-1/2 w-4 h-4" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 8l4 4 4-4" stroke="#334E3A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-sm w-28">Min open time</label>
                <select className="flex-1 border rounded-full px-3 py-2 text-sm appearance-none pr-8" value={minOpening} onChange={(e) => setMinOpening(e.target.value)}>
                  <option value="all">Any</option>
                  {openingOptions.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
                <svg className="pointer-events-none absolute right-6 top-1/2 transform -translate-y-1/2 w-4 h-4" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 8l4 4 4-4" stroke="#334E3A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

            {/* Toggles row */}
            <div className="mt-4 flex flex-wrap gap-3 items-center">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={openNowOnly} onChange={(e) => setOpenNowOnly(e.target.checked)} className="h-4 w-4" />
                <span className="text-sm">Open now</span>
              </label>

              <div className="flex items-center gap-2">
                <label className="text-sm">Customer number</label>
                <div className="relative">
                  <select value={hasCustomerNumber} onChange={(e) => setHasCustomerNumber(e.target.value)} className="border rounded-full px-3 py-1 text-sm appearance-none pr-8">
                    <option value="all">Any</option>
                    <option value="yes">Has number</option>
                    <option value="no">No number</option>
                  </select>
                  {/* inward arrow */}
                  <svg className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 8l4 4 4-4" stroke="#334E3A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>

              <div className="ml-auto text-sm text-gray-500">Tip: click city chips to filter fast</div>
            </div>
          </div>
        </section>

        {/* Results (NO border separating filters and cards) */}
        <section className="max-w-6xl mx-auto px-4 py-6 md:py-8">
          {filteredCenters.length === 0 ? (
            <div className="text-center py-12 text-[#1E4B3C]/70">No centers match these filters.</div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {filteredCenters.map((center, idx) => (
                <CenterCard key={`${center.slug}-${idx}`} {...center} />
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
