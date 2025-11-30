const centers = [
  {
    slug: "ayursutra-koramangala",
    name: "AyurSutra Panchakarma Center",
    city: "Bengaluru",
    address: "3rd Cross, 5th Block, Koramangala",
    image:
      "https://content.jdmagicbox.com/v2/comp/mumbai/b5/022pxx22.xx22.240610200154.h5b5/catalogue/kerala-ayurveda-multi-speciality-clinic-and-panchakarma-center-andheri-mumbai-clinics-g3yMeMOnHu.jpg",
    bookingAiNumber: "+91-80-4000-1234",
    customerNumber: "+91-80-4000-5678",
    openingTime: "07:00",
    closingTime: "21:00",
    therapies: [
      {
        id: "abhyanga",
        name: "Abhyanga (Full Body Oil Massage)",
        focus: "Joint stiffness • Fatigue • Sleep",
        duration: "60–75 mins",
        summary:
          "Warm medicated oil massage to calm the nervous system and relieve muscular tension.",
        price: "1800",
        therapyImage:
          "https://images.pexels.com/photos/3738341/pexels-photo-3738341.jpeg",
      },
      {
        id: "shirodhara",
        name: "Shirodhara",
        focus: "Stress • Anxiety • Sleep",
        duration: "45–60 mins",
        summary:
          "Gentle pouring of warm oil on the forehead to balance mind and support deep relaxation.",
        price: "2200",
        therapyImage:
          "https://images.pexels.com/photos/3738342/pexels-photo-3738342.jpeg",
      },
      {
        id: "basti",
        name: "Kati / Greeva Basti",
        focus: "Lower back • Neck pain",
        duration: "40–60 mins",
        summary:
          "Localized warm oil pooling over spine areas to support chronic back and neck issues.",
        price: "1600",
        therapyImage:
          "https://images.pexels.com/photos/3738345/pexels-photo-3738345.jpeg",
      },
    ],
    doctors: [
      {
        id: "dr-meera",
        name: "Dr. Meera Nair",
        degree: "MD (Ayurveda)",
        speciality: "Panchakarma & Chronic Pain",
        experience: "12+ years",
        focus: "Chronic pain, metabolic disorders, post-viral recovery",
        fee: "900",
        avatar:
          "https://images.pexels.com/photos/8460124/pexels-photo-8460124.jpeg",
      },
      {
        id: "dr-arjun",
        name: "Dr. Arjun Rao",
        degree: "BAMS",
        speciality: "Lifestyle & Stress",
        experience: "8+ years",
        focus: "Stress, sleep, migraine, lifestyle diseases",
        fee: "750",
        avatar:
          "https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg",
      },
    ],
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
    therapies: [
      {
        id: "udvartana",
        name: "Udvartana (Herbal Powder Massage)",
        focus: "Weight management • Cellulite",
        duration: "45–60 mins",
        summary:
          "Dry herbal powder massage to stimulate circulation and support inch loss.",
        price: "1500",
        therapyImage:
          "https://images.pexels.com/photos/3738343/pexels-photo-3738343.jpeg",
      },
      {
        id: "pizhichil",
        name: "Pizhichil",
        focus: "Joint pain • Weakness",
        duration: "60–75 mins",
        summary:
          "Warm medicated oil is poured in streams over the body for deep rejuvenation.",
        price: "2600",
        therapyImage:
          "https://images.pexels.com/photos/3738344/pexels-photo-3738344.jpeg",
      },
    ],
    doctors: [
      {
        id: "dr-sen",
        name: "Dr. Ananya Sen",
        degree: "BAMS",
        speciality: "Women’s Health & Skin",
        experience: "10+ years",
        focus: "PCOS, skin issues, menstrual health",
        fee: "800",
        avatar:
          "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg",
      },
    ],
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
    therapies: [
      {
        id: "nasya",
        name: "Nasya",
        focus: "Sinus • Migraine • Allergies",
        duration: "30–45 mins",
        summary:
          "Medicated oils are administered through the nose to clear channels in the head and neck.",
        price: "1200",
        therapyImage:
          "https://images.pexels.com/photos/3738346/pexels-photo-3738346.jpeg",
      },
      {
        id: "virechana",
        name: "Virechana",
        focus: "Liver • Skin • Pitta balance",
        duration: "1 day (procedure) + prep",
        summary:
          "Planned purgation therapy to eliminate excess pitta and deep-seated toxins.",
        price: "3500",
        therapyImage:
          "https://images.pexels.com/photos/3738347/pexels-photo-3738347.jpeg",
      },
    ],
    doctors: [
      {
        id: "dr-kapoor",
        name: "Dr. Rohan Kapoor",
        degree: "MD (Ayurveda)",
        speciality: "Gastro & Skin",
        experience: "14+ years",
        focus: "Acidity, IBS, eczema, psoriasis",
        fee: "1000",
        avatar:
          "https://images.pexels.com/photos/2182979/pexels-photo-2182979.jpeg",
      },
      {
        id: "dr-neha",
        name: "Dr. Neha Malhotra",
        degree: "BAMS",
        speciality: "Respiratory & Allergies",
        experience: "7+ years",
        focus: "Sinusitis, asthma, allergic rhinitis",
        fee: "850",
        avatar:
          "https://images.pexels.com/photos/3957987/pexels-photo-3957987.jpeg",
      },
    ],
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
    therapies: [
      {
        id: "shiro-abhyanga",
        name: "Shiro Abhyanga",
        focus: "Stress • Hair fall • Headache",
        duration: "30–45 mins",
        summary:
          "Head, neck and shoulder oil massage to ease tension and nourish hair roots.",
        price: "1000",
        therapyImage:
          "https://images.pexels.com/photos/3738348/pexels-photo-3738348.jpeg",
      },
      {
        id: "netra-tarpana",
        name: "Netra Tarpana",
        focus: "Eye strain • Dry eyes",
        duration: "30–40 mins",
        summary:
          "Ghee-based therapy to soothe and nourish tired, dry eyes from screen exposure.",
        price: "1400",
        therapyImage:
          "https://images.pexels.com/photos/3738349/pexels-photo-3738349.jpeg",
      },
    ],
    doctors: [
      {
        id: "dr-isha",
        name: "Dr. Isha Kulkarni",
        degree: "BAMS",
        speciality: "Stress & Lifestyle",
        experience: "9+ years",
        focus: "Corporate stress, insomnia, anxiety",
        fee: "900",
        avatar:
          "https://images.pexels.com/photos/7659877/pexels-photo-7659877.jpeg",
      },
    ],
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
    therapies: [
      {
        id: "panchakarma-detox",
        name: "7-Day Panchakarma Detox",
        focus: "Full-body detox • Metabolism",
        duration: "7 days",
        summary:
          "Structured detox plan including snehana, swedana and cleansing therapies.",
        price: "12000",
        therapyImage:
          "https://images.pexels.com/photos/3738350/pexels-photo-3738350.jpeg",
      },
    ],
    doctors: [
      {
        id: "dr-sameer",
        name: "Dr. Sameer Patil",
        degree: "MD (Ayurveda)",
        speciality: "Metabolic Disorders",
        experience: "11+ years",
        focus: "Diabetes, obesity, fatty liver",
        fee: "950",
        avatar:
          "https://images.pexels.com/photos/1170979/pexels-photo-1170979.jpeg",
      },
    ],
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
    therapies: [
      {
        id: "kizhi",
        name: "Kizhi (Bolus Massage)",
        focus: "Joint pain • Stiffness",
        duration: "45–60 mins",
        summary:
          "Heated herbal bolus massage to reduce pain and stiffness in joints.",
        price: "1700",
        therapyImage:
          "https://images.pexels.com/photos/3738351/pexels-photo-3738351.jpeg",
      },
    ],
    doctors: [
      {
        id: "dr-raj",
        name: "Dr. Rajesh Shah",
        degree: "BAMS",
        speciality: "Joint & Spine",
        experience: "15+ years",
        focus: "Arthritis, spondylosis, knee pain",
        fee: "800",
        avatar:
          "https://images.pexels.com/photos/2182978/pexels-photo-2182978.jpeg",
      },
    ],
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
    therapies: [
      {
        id: "marma",
        name: "Marma Therapy",
        focus: "Energy balance • Pain",
        duration: "45–60 mins",
        summary:
          "Stimulation of vital marma points to balance energy and relieve pain.",
        price: "1900",
        therapyImage:
          "https://images.pexels.com/photos/3738352/pexels-photo-3738352.jpeg",
      },
    ],
    doctors: [
      {
        id: "dr-leena",
        name: "Dr. Leena Joseph",
        degree: "BAMS",
        speciality: "Holistic Wellness",
        experience: "9+ years",
        focus: "General wellness, immunity, fatigue",
        fee: "700",
        avatar:
          "https://images.pexels.com/photos/5722165/pexels-photo-5722165.jpeg",
      },
    ],
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
    therapies: [
      {
        id: "stress-reset",
        name: "Stress Reset Program",
        focus: "Stress • Sleep • Mood",
        duration: "5 days",
        summary:
          "Combination of abhyanga, shirodhara and counselling to reset stress patterns.",
        price: "9800",
        therapyImage:
          "https://images.pexels.com/photos/3738353/pexels-photo-3738353.jpeg",
      },
    ],
    doctors: [
      {
        id: "dr-rahul",
        name: "Dr. Rahul Verma",
        degree: "BAMS",
        speciality: "Mind-Body Medicine",
        experience: "10+ years",
        focus: "Stress, anxiety, sleep disorders",
        fee: "900",
        avatar:
          "https://images.pexels.com/photos/1170978/pexels-photo-1170978.jpeg",
      },
    ],
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
    therapies: [
      {
        id: "postnatal",
        name: "Postnatal Care Package",
        focus: "Post-delivery recovery",
        duration: "10 days",
        summary:
          "Traditional postnatal care with abhyanga, belly binding and diet guidance.",
        price: "15000",
        therapyImage:
          "https://images.pexels.com/photos/3738354/pexels-photo-3738354.jpeg",
      },
    ],
    doctors: [
      {
        id: "dr-sowmya",
        name: "Dr. Sowmya R.",
        degree: "BAMS",
        speciality: "Women’s Health",
        experience: "8+ years",
        focus: "Postnatal care, hormonal balance",
        fee: "850",
        avatar:
          "https://images.pexels.com/photos/3957988/pexels-photo-3957988.jpeg",
      },
    ],
  },
];

export default centers;
