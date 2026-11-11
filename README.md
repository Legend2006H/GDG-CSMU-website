# Google Developer Groups on Campus — CSMU

Official website for **GDG on Campus at Chhatrapati Shivaji Maharaj University (CSMU)**, Panvel, Navi Mumbai.

> **Learn. Build. Connect.**  
> A community of passionate student developers building the future together with Google developer technologies.

---

## Tech Stack
- **Framework:** [Next.js 16](https://nextjs.org/) (App Router, React 19, TypeScript strict)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) with OKLCH tokens & Dark/Light mode
- **Animations:** [GSAP](https://greensock.com/) ScrollTrigger & HTML5 Canvas 2D
- **Icons:** [Lucide React](https://lucide.dev/)

---

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## Project Structure
```
src/
  app/                    # Next.js App Router pages
    about/                # About GDG CSMU, mission, journey
    community/            # Join our community application
    contact/              # Contact info and location map
    events/               # Upcoming and past events & workshops
    projects/             # Student project showcases
    team/                 # Current & past chapter leadership
    technologies/         # Web, AI/ML, Cloud, Android, UI/UX, DSA
    layout.tsx            # Root layout with topbar & footer
    page.tsx              # Homepage with animated hero & next event
  components/
    gdg/                  # Brand navigation, footer, theme provider
    hero/                 # Canvas DotGrid, DottedChevron, SplitHero
    ui/                   # UI primitives
  data/
    events.json           # Event records
    team.json             # Core & leadership team data
  hooks/                  # Custom React hooks (reduced-motion, pointer)
  lib/                    # Utilities and service helpers
  types/                  # TypeScript interface definitions
public/
  fonts/                  # Local typography files
  images/                 # Chapter logos, team photos, event posters
```

---

## Commands
- `npm run dev` — Start the local development server
- `npm run build` — Create an optimized production build
- `npm run start` — Run the production build locally
- `npm run lint` — Run ESLint check
- `npm run typecheck` — Run TypeScript compiler check
- `npm run check` — Run lint + typecheck + build verification
