
export const XP_TABLE = {
  WATER: 5,
  MEDITATION: 10,
  MEDICINE: 8,
  SLEEP: 6,
  MOOD_LOG: 4,
  APPOINTMENT: 15,
  TELECONSULT: 25, // revenue-related
  REFERRAL: 40, // revenue-related
  SUBSCRIPTION_UPGRADE: 50, // revenue-related
  TASK_COMPLETED: 10,
};

export const COIN_TABLE = {
  WATER: 1,
  MEDITATION: 2,
  MEDICINE: 1,
  SLEEP: 1,
  MOOD_LOG: 1,
  APPOINTMENT: 3,
  TELECONSULT: 5,
  REFERRAL: 10,
  SUBSCRIPTION_UPGRADE: 15,
  TASK_COMPLETED: 2,
};

// XP required per level (simple formula: level * 100)
export const getNextLevelXP = (level) => level * 100;

// Badge conditions
export const BADGE_DEFINITIONS = [
  {
    key: "STREAK_7",
    name: "Consistency Champ",
    description: "Maintained a 7-day streak",
    icon: "🔥",
    check: (g) => g.streak.current >= 7,
  },
  {
    key: "LEVEL_5",
    name: "Rising Healer",
    description: "Reached Level 5",
    icon: "🌿",
    check: (g) => g.level >= 5,
  },
  {
    key: "TELE_5",
    name: "Telemedicine Pro",
    description: "Completed 5 teleconsultations",
    icon: "📞",
    check: (g) => g.teleconsultCount >= 5,
  },
  {
    key: "REF_3",
    name: "Community Builder",
    description: "Referred 3 new patients",
    icon: "🤝",
    check: (g) => g.referralCount >= 3,
  },
  {
    key: "SLEEP_30",
    name: "Sleep Guardian",
    description: "Logged sleep data for 30 days",
    icon: "😴",
    check: (g) => g.history.filter((h) => h.type === "SLEEP").length >= 30,
  },
];
