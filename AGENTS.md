<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# GDG on Campus CSMU — Website Codebase

## Tech Stack
- **Framework:** Next.js 16 (App Router, React 19, TypeScript strict)
- **Styling:** Tailwind CSS v4, custom theme variables (dark & light)
- **Animations:** GSAP ScrollTrigger & HTML5 2D Canvas
- **Icons:** Lucide React

## Commands
- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run lint` — ESLint check
- `npm run typecheck` — TypeScript check
- `npm run check` — Run lint + typecheck + build

## Code Style
- TypeScript strict mode, no `any`
- Named exports, PascalCase components, camelCase utils
- 2-space indentation
- Responsive: mobile-first

## Project Structure
```
src/
  app/              # Next.js routes (/about, /events, /team, /technologies, /community, /contact, /projects)
  components/
    gdg/            # Global components (navbar, footer, theme provider)
    hero/           # Animated hero (DotGrid, DottedChevron, SplitHero, heroConfig)
    ui/             # Base UI primitives
  data/             # JSON data files (events.json, team.json)
  hooks/            # Custom hooks (usePrefersReducedMotion, useCoarsePointer)
  lib/              # Utilities (utils.ts)
  types/            # TypeScript interfaces
public/
  fonts/            # Local typography
  images/           # Chapter logo, team photos, event posters
```
