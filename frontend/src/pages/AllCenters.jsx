// src/pages/AllCenters.jsx
import React, { useMemo, useState } from "react";
import CenterCard from "../components/CenterCard";
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

const centers = [
  {
    slug: "ayursutra-koramangala",
    name: "AyurSutra Panchakarma Center",
    city: "Bengaluru",
    address: "3rd Cross, 5th Block, Koramangala",
    image: "https://content.jdmagicbox.com/v2/comp/mumbai/b5/022pxx22.xx22.240610200154.h5b5/catalogue/kerala-ayurveda-multi-speciality-clinic-and-panchakarma-center-andheri-mumbai-clinics-g3yMeMOnHu.jpg",
    bookingAiNumber: "+91-80-4000-1234",
    customerNumber: "+91-80-4000-5678",
    openingTime: "07:00",
    closingTime: "21:00",
  },
  {
    slug: "swasthya-kolkata",
    name: "Swasthya Ayurveda Clinic",
    city: "Kolkata",
    address: "12, Lake Road, Rabindra Sarobar",
    image: "https://ayusanjivani.com/wp-content/uploads/2023/08/Ayusanjivani-Ayurveda-is-a-Pune-based-clinic-that-specializes-in-Ayurvedic-therapy-and-treatment.-The-firm-is-the-brain-child-of-Dr.Shailesh-Shamkant-Phalle.jpg",
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
    image: "https://ind.5bestincity.com/profileimages/india/dr-raghavendra-nadargis-ayurveda-and-panchakarma-center-ayurvedic-clinics-akkalkot-solapur-maharashtra/34736-453d0-1.jpg",
    bookingAiNumber: "+91-11-4555-7788",
    customerNumber: "+91-11-4555-9900",
    openingTime: "06:30",
    closingTime: "22:00",
  },
    {
    slug: "ayursutra-koramangala",
    name: "AyurSutra Panchakarma Center",
    city: "Bengaluru",
    address: "3rd Cross, 5th Block, Koramangala",
    image: "https://images.jdmagicbox.com/v2/comp/delhi/y1/011pxx11.xx11.220929115555.c3y1/catalogue/sparsh-vandan-shakti-khand-3-indirapuram-ghaziabad-ayurvedic-doctors-rdbcet1hlp-250.jpg",
    bookingAiNumber: "+91-80-4000-1234",
    customerNumber: "+91-80-4000-5678",
    openingTime: "07:00",
    closingTime: "21:00",
  },
  {
    slug: "swasthya-kolkata",
    name: "Swasthya Ayurveda Clinic",
    city: "Kolkata",
    address: "12, Lake Road, Rabindra Sarobar",
    image: "https://static.wixstatic.com/media/c58084_2aad94813a334460a49903f9549068c9~mv2.png/v1/fill/w_320,h_320,q_90,enc_avif,quality_auto/c58084_2aad94813a334460a49903f9549068c9~mv2.png",
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
    image: "https://content.jdmagicbox.com/v2/comp/mumbai/n9/022pxx22.xx22.170204215020.i6n9/catalogue/kerala-ayurveda-clinic-andheri-west-mumbai-ayurvedic-doctors-bkrk8yxa18.jpg",
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
    image: "https://content.jdmagicbox.com/v2/comp/mumbai/g7/022pxx22.xx22.180212134536.a2g7/catalogue/ojas-ayurved-chikitsalay-juinagar-navi-mumbai-ayurvedic-doctors-for-abdominal-problem-rwoo8d1l1s.jpg",
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
    image: "https://images.jdmagicbox.com/v2/comp/delhi/g1/011pxx11.xx11.230404160028.b5g1/catalogue/dr-viswambharan-kerala-ayur-arogya-green-park-delhi-ayurvedic-doctors-zya6rv81qb.jpg",
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
    image: "https://content.jdmagicbox.com/v2/comp/delhi/r1/011pxx11.xx11.201024140500.m8r1/catalogue/kerala-ayurarogya-green-park-delhi-ayurvedic-clinics-ugtpul99cf.jpg",
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
    image: "https://content.jdmagicbox.com/v2/comp/malappuram/x6/9999px483.x483.230821210649.r8x6/catalogue/dr-lazima-s-avicenna-ayurveda-malappuram-ayurvedic-clinics-7n1us31ogf.jpg",
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
    image: "https://content.jdmagicbox.com/v2/comp/mumbai/b5/022pxx22.xx22.240610200154.h5b5/catalogue/kerala-ayurveda-multi-speciality-clinic-and-panchakarma-center-andheri-mumbai-clinics-g3yMeMOnHu-250.jpg",
    bookingAiNumber: "",
    customerNumber: "+91-44-4300-5566",
    openingTime: "07:30",
    closingTime: "21:00",
  },
];

const toMinutes = (hhmm) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

const AllCenters = () => {
  const [cityFilter, setCityFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [openNowOnly, setOpenNowOnly] = useState(false);
  const [opensBefore, setOpensBefore] = useState("all");

  const uniqueCities = Array.from(new Set(centers.map((c) => c.city)));

  const filteredCenters = useMemo(() => {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    return centers.filter((center) => {
      // City filter
      if (cityFilter !== "all" && center.city !== cityFilter) return false;

      // Search filter (name + address)
      const needle = search.trim().toLowerCase();
      if (
        needle &&
        !center.name.toLowerCase().includes(needle) &&
        !center.address.toLowerCase().includes(needle)
      ) {
        return false;
      }

      // Opens before filter
      if (opensBefore !== "all") {
        const filterMinutes = toMinutes(opensBefore);
        const centerOpenMinutes = toMinutes(center.openingTime);
        if (centerOpenMinutes > filterMinutes) return false;
      }

      // Open now filter
      if (openNowOnly) {
        const openMinutes = toMinutes(center.openingTime);
        const closeMinutes = toMinutes(center.closingTime);
        if (currentMinutes < openMinutes || currentMinutes > closeMinutes) {
          return false;
        }
      }

      return true;
    });
  }, [cityFilter, search, openNowOnly, opensBefore]);


  return (
    <>
  
    <Navbar/>
    <main className="min-h-screen bg-[#F5F7F6]">
      {/* Header + filters */}
      <section className="border-b border-[#1E4B3C]/10 bg-white">
        <div className="max-w-6xl mx-auto px-4 py-5 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#1E4B3C]">
                All Panchakarma Centers
              </h1>
              <p className="text-xs md:text-sm text-[#1E4B3C]/80">
                Filter by city, timings, and booking preferences.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 items-center text-xs md:text-sm">
            {/* City filter */}
            <select
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="border border-[#1E4B3C]/20 rounded-full px-3 py-1.5 text-[#1E4B3C] bg-white text-xs md:text-sm"
            >
              <option value="all">All cities</option>
              {uniqueCities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>

            {/* Search */}
            <input
              type="text"
              placeholder="Search name or address"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-[#1E4B3C]/20 rounded-full px-3 py-1.5 text-[#1E4B3C] bg-white w-44 md:w-64 text-xs md:text-sm"
            />

            {/* Opens before */}
            <select
              value={opensBefore}
              onChange={(e) => setOpensBefore(e.target.value)}
              className="border border-[#1E4B3C]/20 rounded-full px-3 py-1.5 text-[#1E4B3C] bg-white text-xs md:text-sm"
            >
              <option value="all">Any opening time</option>
              <option value="07:00">Opens before 7:00</option>
              <option value="08:00">Opens before 8:00</option>
            </select>

            {/* Open now toggle */}
            <div className="flex flex-wrap gap-3 items-center">
              <label className="flex items-center gap-1 cursor-pointer text-[#1E4B3C]/90">
                <input
                  type="checkbox"
                  checked={openNowOnly}
                  onChange={(e) => setOpenNowOnly(e.target.checked)}
                  className="h-3 w-3"
                />
                <span>Open now</span>
              </label>
            </div>
          </div>
        </div>
      </section>

      {/* Cards grid */}
      <section className="max-w-6xl mx-auto px-4 py-6 md:py-8">
        {filteredCenters.length === 0 ? (
          <p className="text-xs md:text-sm text-[#1E4B3C]/70">
            No centers match these filters.
          </p>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filteredCenters.map((center) => (
              <CenterCard key={center.slug} {...center} />
            ))}
          </div>
        )}
      </section>
    </main>
    <Footer/>
      </>
  );
};

export default AllCenters;
