export const projects = [
  {
    id: "e2cc68fd-b411-4d56-bc1f-bcb034e0fbab",
    name: "FindFest : oTP team 1",
    description: "Seoul Festival Explorer: RAG(Retrieval-Augmented Generation) based Personalized City Guide & Smart Festival Recommender",
    image: "/sites/gdgoc-yonsei/findfest.avif",
    stack: "AI · RAG · Web",
    team: ["Park Hyunji", "Lim Seongyoon", "Kim Yechan", "Kim Yena", "YEONJUNG CHO", "Seunghyun Lim"],
    summary: "FindFest: Integrated Cultural Event Exploration Platform for Seoul. FindFest is a web service that consolidates scattered festival and event information from across Seoul into a single platform, allowing users to explore the city as if they were on a guided journey.",
    sections: [
      { title: "Project Background & Objectives", items: ["Problem Definition: Addressed the difficulty of searching for events due to fragmented information across various channels (district offices, SNS, etc.), the lack of personalized management systems, and poor user experiences.", "Solution: Built an integrated platform providing city-wide data by incorporating an AI chatbot, user authentication, and a Save/Favorite feature.", "Target Audience: Primarily targeting young adults in their 20s and 30s with high demand for cultural activities, social gatherings, and extracurricular experiences."] },
      { title: "Core Technologies & Implementation", items: ["Frontend: Next.js (App Router) and TypeScript.", "Backend: FastAPI and SQLAlchemy with PostgreSQL and pgvector for relational data and vector embeddings.", "AI: Upstage Solar LLM and embedding models for advanced search and chatbot features.", "Deployment: Amazon EC2 using Docker Compose.", "Data pipeline: Seoul Open Data Plaza API collection, de-duplication, vector embedding and storage.", "AI chatbot: LangGraph workflow analyzes intent for recommendations, date-based searches and general conversation.", "Personalization: JWT authentication allows users to save events and manage a profile.", "Dynamic filtering: Category, date picker and keyword search."] },
      { title: "Collaboration & Achievements", items: ["The team used GitHub branches and pull-request code reviews, with schedules and meeting minutes managed in Notion.", "The service integrated more than 4,200 event data points and delivered an MVP with AI interaction and personalized user management."] },
    ],
    github: ["https://github.com/cecilecodes", "https://github.com/yoon9531", "https://github.com/yechance7", "", "https://github.com/yjella04", ""],
  },
  {
    id: "16684d3e-3c6e-4599-a10b-f023f714a6b2",
    name: "BlueNote: oTP team 3",
    description: "A customised note-sharing (note-exchange) website for Yonsei University students.",
    image: "/sites/gdgoc-yonsei/bluenote.avif",
    stack: "Web · Community",
    team: ["YEON EUNSEO", "Yun Minkyun", "Kang Hyunbi", "Cho Yerin", "Yang Boran"],
    summary: "Blue Note is a trusted note-sharing / note-exchange web app for Yonsei University students. It aims to fix the inefficiencies of anonymous P2P note trading, by turning accumulated notes each semester into a shared campus learning asset repository.",
    sections: [{ title: "How it works", items: ["Users log in via Yonsei email verification to establish identity.", "Note providers upload notes and receive access incentives and permissions to view other notes.", "Note viewers can browse uploaded notes, organised with course-based categorisation for easier discovery.", "Quality is checked through like/dislike feedback. AI features include note summaries with key points, difficulty and estimated study time, plus cross-validation of verifiable claims against academic and educational sources.", "Tech stack: React, Vite and Tailwind on the frontend; Spring Boot with presigned URLs and Caffeine local cache on the backend; OpenAI GPT-4o-mini and Semantic Scholar API for AI."] }],
    github: ["", "https://github.com/min-guni", "", "https://github.com/yerincho04", ""],
  },
  {
    id: "865cc34f-4073-4782-9d46-671832d009da",
    name: "P-scheduler : oTP team 4",
    description: "AI scheduler program based on lecture material input",
    image: "/sites/gdgoc-yonsei/pscheduler.avif",
    stack: "AI · Productivity",
    team: ["LEE SeokWon", "Chae Jaeho", "Baek Jeongyun", "Lee Chanhee", "Yang Seohyun", "JANG GYESANG"],
    summary: "A service that automatically generates a realistic study timeline using AI when users upload their course materials and exam dates.",
    sections: [],
    github: ["https://github.com/leerura", "", "https://github.com/jjyyuunn", "", "", ""],
  },
] as const;

export const projectById = new Map<string, (typeof projects)[number]>(projects.map((project) => [project.id, project]));
