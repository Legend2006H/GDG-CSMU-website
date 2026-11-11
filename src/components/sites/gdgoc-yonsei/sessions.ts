export type SessionType = "Tech Talk" | "Part Session";
export type SessionRecord = {
  title: string;
  date: string;
  time: string;
  type: SessionType;
  part: "Organizer" | "Cloud" | "Front-End" | "UX/UI";
  generation: "26-27" | "25-26" | "24-25";
  place: string;
};

// Public index records transcribed from the source Session Log. The archive
// reports 42 total records: 5 + 33 + 4 across the listed generations.
export const sessions: SessionRecord[] = [
  { title: "GDGoC Yonsei 26-2 fourth T19", date: "2026-09-29", time: "19:00", type: "Tech Talk", part: "Organizer", generation: "26-27", place: "Yonsei University Engineering Hall 1 A685, 50 Yonsei-ro, Seodaemun-gu, Seoul 03722" },
  { title: "GDGoC Yonsei 26-2 Third T19", date: "2026-09-22", time: "19:00", type: "Tech Talk", part: "Organizer", generation: "26-27", place: "Yonsei University Engineering Hall 1 A690, 50 Yonsei-ro, Seodaemun-gu, Seoul 03722" },
  { title: "GDGoC Yonsei 26-2 Second T19", date: "2026-09-15", time: "19:00", type: "Tech Talk", part: "Organizer", generation: "26-27", place: "Yonsei University Engineering Hall 1 A685, 50 Yonsei-ro, Seodaemun-gu, Seoul 03722" },
  { title: "GDGoC Yonsei 26-2 First T19", date: "2026-09-08", time: "19:00", type: "Tech Talk", part: "Organizer", generation: "26-27", place: "Yonsei University Engineering Hall 1, 50 Yonsei-ro, Seodaemun-gu, Seoul 03722" },
  { title: "GDGoC Yonsei 5th Generation Onboarding", date: "2026-09-01", time: "19:00", type: "Tech Talk", part: "Organizer", generation: "26-27", place: "Seodaemun Youth Azit 쉼표, 83-55 Changcheon-dong, Seodaemun-gu, Seoul 03727" },

  { title: "26-1 GDGoC Yonsei The Ninth T19 Session", date: "2026-05-26", time: "19:00", type: "Tech Talk", part: "Organizer", generation: "25-26", place: "Yonsei University" },
  { title: "GDGoC Yonsei The 8th T19 Section", date: "2026-05-19", time: "19:00", type: "Tech Talk", part: "Organizer", generation: "25-26", place: "Yonsei University Engineering Hall 1, 50 Yonsei-ro, Seodaemun-gu, Seoul 03722" },
  { title: "2026 Korea x Japan GDGoC: The Bridge Hackathon (Build w/ AI)", date: "2026-05-16", time: "12:30", type: "Tech Talk", part: "Organizer", generation: "25-26", place: "Korea University, Seoul Campus, 145 Anam-ro, Seongbuk-gu, Seoul 136-701" },
  { title: "GDGoC Yonsei The Seventh T19", date: "2026-05-12", time: "19:00", type: "Tech Talk", part: "Organizer", generation: "25-26", place: "Yonsei University Engineering Hall 1, 50 Yonsei-ro, Seodaemun-gu, Seoul 03722" },
  { title: "26-1 The Sixth T19", date: "2026-04-28", time: "19:00", type: "Tech Talk", part: "Organizer", generation: "25-26", place: "Yonsei University Engineering Hall 1 A685, 50 Yonsei-ro, Seodaemun-gu, Seoul 03722" },
  { title: "26-1 The Fifth T19", date: "2026-04-07", time: "19:00", type: "Tech Talk", part: "Organizer", generation: "25-26", place: "Yonsei University Engineering Hall 4 D503, 50 Yonsei-ro, Seodaemun-gu, Seoul 03722" },
  { title: "26-1 The Fourth T19", date: "2026-03-31", time: "19:00", type: "Tech Talk", part: "Organizer", generation: "25-26", place: "Yonsei University Engineering Hall 4 D503, 50 Yonsei-ro, Seodaemun-gu, Seoul 03722" },
  { title: "26-1 The Third T19", date: "2026-03-24", time: "19:00", type: "Tech Talk", part: "Organizer", generation: "25-26", place: "Yonsei University, 50 Yonsei-ro, Seodaemun-gu, Seoul 03722" },
  { title: "26-1 Second T19", date: "2026-03-17", time: "19:00", type: "Tech Talk", part: "Organizer", generation: "25-26", place: "Yonsei University Engineering Hall 1 A320" },
  { title: "26-1 First T19", date: "2026-03-10", time: "19:00", type: "Tech Talk", part: "Organizer", generation: "25-26", place: "Yonsei University Engineering Hall 1 A685" },
  { title: "Yonsei X Korea Demo Day", date: "2025-12-05", time: "18:00", type: "Tech Talk", part: "Organizer", generation: "25-26", place: "Korea University Aegineung Student Union Building 301" },
  { title: "25-26 Tenth T19", date: "2025-12-02", time: "19:00", type: "Tech Talk", part: "Organizer", generation: "25-26", place: "Yonsei University Engineering Hall 1 A685" },
  { title: "GDG DevFest Cloud x Seoul 2025", date: "2025-11-30", time: "13:00", type: "Tech Talk", part: "Organizer", generation: "25-26", place: "Sogang University Matteo Hall, 35 Baekbeom-ro, Mapo-gu, Seoul 04107" },
  { title: "25-26 Homecoming Day", date: "2025-11-25", time: "19:00", type: "Tech Talk", part: "Organizer", generation: "25-26", place: "Yonsei University Engineering Hall A685" },
  { title: "Nov.24 Last Cloud Part Session", date: "2025-11-24", time: "19:00", type: "Part Session", part: "Cloud", generation: "25-26", place: "Online (Discord)" },
  { title: "RE:ALThon 2nd: Iwha X Yonsei X Sungkyunkwan X Sogang X Korea Univ.", date: "2025-11-22", time: "13:30", type: "Tech Talk", part: "Organizer", generation: "25-26", place: "Sogang University Matteo Hall Room 102, 35 Baekbeom-ro, Mapo-gu, Seoul 04107" },
  { title: "25-26 Eighth T19", date: "2025-11-18", time: "19:00", type: "Tech Talk", part: "Organizer", generation: "25-26", place: "Yonsei University Engineering Hall A685" },
  { title: "Nov.17 Cloud Part Session", date: "2025-11-17", time: "19:00", type: "Part Session", part: "Cloud", generation: "25-26", place: "Yonsei University Engineering Hall A544" },
  { title: "25-26 Seventh T19", date: "2025-11-11", time: "19:00", type: "Tech Talk", part: "Organizer", generation: "25-26", place: "Yonsei University Engineering Hall 1 A685" },
  { title: "11/10 Cloud Part Session", date: "2025-11-10", time: "19:00", type: "Part Session", part: "Cloud", generation: "25-26", place: "Discord (untact)" },
  { title: "25-26 Sixth T19", date: "2025-11-04", time: "19:00", type: "Tech Talk", part: "Organizer", generation: "25-26", place: "Yonsei University Engineering Hall A685" },
  { title: "Nov, 3 Cloud Part Session", date: "2025-11-03", time: "19:00", type: "Part Session", part: "Cloud", generation: "25-26", place: "Yonsei University Engineering Hall A546" },
  { title: "25-26 Fifth T19", date: "2025-10-28", time: "19:00", type: "Tech Talk", part: "Organizer", generation: "25-26", place: "Yonsei University Engineering Hall 1 A685" },
  { title: "25-26 Fourth T19", date: "2025-09-30", time: "19:00", type: "Tech Talk", part: "Organizer", generation: "25-26", place: "Yonsei University Engineering Hall 2 731" },
  { title: "9/29 Cloud Part Session", date: "2025-09-29", time: "19:00", type: "Part Session", part: "Cloud", generation: "25-26", place: "Online" },
  { title: "25-26 Third T19", date: "2025-09-23", time: "19:00", type: "Tech Talk", part: "Organizer", generation: "25-26", place: "Yonsei University Engineering Hall 1 A685" },
  { title: "Front Session 3", date: "2025-09-22", time: "20:40", type: "Part Session", part: "Front-End", generation: "25-26", place: "Yonsei University Engineering Hall 1 A544" },
  { title: "Sep/22 Cloud part session", date: "2025-09-22", time: "19:00", type: "Part Session", part: "Cloud", generation: "25-26", place: "Yonsei University Engineering Hall A544" },
  { title: "UX/UI Part Session", date: "2025-09-16", time: "21:00", type: "Part Session", part: "UX/UI", generation: "25-26", place: "Yonsei University Engineering Hall D 201" },
  { title: "25-26 Second T19", date: "2025-09-16", time: "19:00", type: "Tech Talk", part: "Organizer", generation: "25-26", place: "Yonsei University Engineering Hall 1 A685" },
  { title: "Cloud session: Sep.15", date: "2025-09-15", time: "19:00", type: "Part Session", part: "Cloud", generation: "25-26", place: "Yonsei University Engineering Hall A544" },
  { title: "25-26 First T19", date: "2025-09-09", time: "19:00", type: "Tech Talk", part: "Organizer", generation: "25-26", place: "Yonsei University Engineering Hall 1 A685" },
  { title: "25-26 Onboarding", date: "2025-09-02", time: "19:00", type: "Tech Talk", part: "Organizer", generation: "25-26", place: "A685, Engineering Hall 1, Yonsei University" },

  { title: "2025 Korea x Japan SW·AI Hackathon: The Bridge - Cloud, Connect, and Contribute", date: "2025-05-17", time: "13:00", type: "Tech Talk", part: "Organizer", generation: "24-25", place: "Code Chrysalis, Motoazabu 3-1-35 Vort Motoazabu B2F, Minato City, Tokyo 106-0046" },
  { title: "Demo Day: Yonsei X Korea Univ.", date: "2024-12-05", time: "18:00", type: "Tech Talk", part: "Organizer", generation: "24-25", place: "Google for Startups Campus, 417 Yeongdong-daero, Gangnam-gu, Seoul 06182" },
  { title: "10/29 T19 Session", date: "2024-10-29", time: "19:00", type: "Tech Talk", part: "Organizer", generation: "24-25", place: "Yonsei University, Sinchon Campus, Seoul" },
  { title: "Onboarding Event of GDG Yonsei", date: "2024-09-10", time: "16:19", type: "Tech Talk", part: "Organizer", generation: "24-25", place: "Yonsei University, Yonsei-ro 50, Seoul 03722" },
];
