const treatments = [
  {
    id: 1,
    name: "Detox Panchakarma",
    details:
      "A deep Ayurvedic detox that helps eliminate accumulated toxins, improves digestion and metabolism, reduces chronic fatigue, and prepares the body for long‑term healing and rejuvenation.",
    status: "active",
    startDate: "2025-10-01",
    endDate: "2025-11-15",
    sessionCount: 12, // NEW
    nextSession: "2025-10-05 · 10:30 AM", // optional
    medicines: ["Herbal Oil", "Medicated Ghee"],
    instructions: "Avoid fried foods, stay hydrated",
    image:
      "https://t3.ftcdn.net/jpg/01/04/05/04/240_F_104050452_wnkKmIjNzZek4h9e7btpuiP0q0uoRAbE.jpg",
  },
  {
    id: 2,
    name: "Stress Relief Abhyanga",
    details:
      "A warm oil body massage that calms the nervous system, releases muscular tension, improves sleep quality, and supports relief from anxiety and stress‑related headaches.",
    status: "completed",
    startDate: "2025-07-01",
    endDate: "2025-08-10",
    sessionCount: 8,
    nextSession: null,
    medicines: ["Ashwagandha"],
    instructions: "Practice daily meditation",
    image:
      "https://t4.ftcdn.net/jpg/14/92/80/75/240_F_1492807534_yLSsEy4ydFJAE4BNtgbSq1vhZjUf6Syx.jpg",
  },
  {
    id: 3,
    name: "Immunity Boost Ayurveda",
    details:
      "A targeted regimen to strengthen digestion and immunity, support respiratory health, and enhance overall resilience against seasonal infections and recurrent illnesses.",
    status: "active",
    startDate: "2025-11-01",
    endDate: "2025-12-01",
    sessionCount: 10,
    nextSession: "2025-11-04 · 09:00 AM",
    medicines: ["Tulsi Drops", "Triphala"],
    instructions: "Follow balanced diet and rest",
    image:
      "https://media.istockphoto.com/id/1279028225/photo/composition-with-ginger-honey-turmeric-and-oranges-as-natural-cold-remedies.jpg?s=612x612&w=0&k=20&c=mHKFCKnAEgH__ZCs3QabtrXGTiY4ccoI-E_w9IGsP0s=",
  },
];

export default treatments;
