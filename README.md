<div align="center">

  <img src="public/images/gdg-logo.png" alt="GDG CSMU logo" width="220" />

  # GDG on Campus — CSMU

  ### Learn. Build. Connect.

  A student-led developer community at **Chhatrapati Shivaji Maharaj University (CSMU), Panvel, Maharashtra**.

  Discover technology, learn by building, collaborate with fellow developers, and turn ideas into real projects.

  <p>
    <a href="https://gdg-csmu-website.vercel.app/">Visit Website</a> ·
    <a href="https://github.com/Legend2006H/GDG-CSMU-website">GitHub Repository</a>
  </p>

  ![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white)
  ![React](https://img.shields.io/badge/React-19-149eca?logo=react&logoColor=white)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
  ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
  ![GSAP](https://img.shields.io/badge/Animations-GSAP-88CE02?logo=greensock&logoColor=111111)
  ![Deployment](https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel&logoColor=white)

</div>

---

## About the project

The **GDG on Campus CSMU website** is the digital home of our campus developer community. It helps students explore the chapter, discover learning opportunities, find events, meet the organizing team, explore technology domains, and connect with the community.

The website is built with Next.js and TypeScript, with a responsive interface, motion effects, and a reusable component structure.

## Website sections

| Section | What you'll find |
|---|---|
| **Home** | Introduction to GDG CSMU, community highlights, and featured content. |
| **About** | The chapter's purpose, mission, vision, and community story. |
| **Events** | Upcoming activities and an archive of past events. The orientation feature includes an event countdown and IST timestamp. |
| **Team** | Current chapter leads and organizing teams. |
| **Technologies** | Technology domains and areas members can explore. |
| **Projects** | Student projects and community work. |
| **Community** | Information for students who want to get involved. |
| **Contact** | Ways to reach the community and find the campus. |

## Highlights

- Responsive layouts for desktop, tablet, and mobile screens.
- Next.js App Router with TypeScript.
- Dark and light theme support.
- GSAP-powered motion and scroll interactions.
- Canvas-based hero visuals and lightweight CSS visual effects.
- Smooth scrolling with Lenis.
- Reusable UI components and shared navigation/footer.
- Event cards with detailed event information.
- Live event countdown with India Standard Time (IST) formatting.
- Current team directory backed by local JSON data.
- Local font and image assets.
- Reduced-motion support for visitors who prefer less animation.

> **Project scope:** The current repository is a Next.js website. Event and team content is maintained in local JSON files. Firebase is listed as a dependency, but a live Firebase-backed registration or admin workflow should not be considered configured unless the relevant integration and environment setup are added separately.

## Tech stack

| Technology | Purpose |
|---|---|
| [Next.js 16](https://nextjs.org/) | React framework and App Router |
| [React 19](https://react.dev/) | Component-based user interface |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe application code |
| [Tailwind CSS 4](https://tailwindcss.com/) | Styling and responsive layouts |
| [GSAP](https://gsap.com/) | Animation and scroll interactions |
| [Lenis](https://lenis.darkroom.engineering/) | Smooth scrolling |
| [Lucide React](https://lucide.dev/) | Icons |
| [date-fns](https://date-fns.org/) | Date utilities |

---

## Getting started

Follow these steps to run the website locally.

### Prerequisites

- **Node.js 24.12 or newer** is recommended for this repository.
- npm (included with Node.js).
- Git (optional, if you plan to clone the repository).
- A code editor such as [Visual Studio Code](https://code.visualstudio.com/).

Check your installed versions:

```bash
node --version
npm --version
```

### 1. Clone the repository

```bash
git clone https://github.com/Legend2006H/GDG-CSMU-website.git
cd GDG-CSMU-website
```

Alternatively, download the repository as a ZIP from GitHub and extract it. Open the extracted project folder in VS Code.

### 2. Install dependencies

**Windows PowerShell:**

```powershell
npm.cmd install
```

**macOS / Linux:**

```bash
npm install
```

If PowerShell blocks `npm.ps1` because of its execution policy, use `npm.cmd` as shown above. This avoids changing your machine's PowerShell execution policy.

### 3. Start the development server

**Windows PowerShell:**

```powershell
npm.cmd run dev
```

**macOS / Linux:**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. Keep the terminal running while you use the local website. Changes to source files will normally appear through Next.js Fast Refresh.

### 4. Create a production build

```bash
npm run build
```

Run the production build locally with:

```bash
npm run start
```

Then visit [http://localhost:3000](http://localhost:3000).

---

## Available scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the local development server. |
| `npm run build` | Creates an optimized production build. |
| `npm run start` | Serves the production build locally. |
| `npm run lint` | Runs ESLint. |
| `npm run typecheck` | Runs the TypeScript compiler without emitting files. |
| `npm run check` | Runs lint, type checking, and the production build in sequence. |

On Windows PowerShell, prefix npm commands with `npm.cmd` if script execution blocks `npm` (for example, `npm.cmd run build`).

---

## Project structure

```text
GDG-CSMU-website/
├── public/
│   ├── fonts/                 # Locally hosted font files
│   └── images/                # Logos, team photos, event posters, and visuals
│       ├── events/
│       └── team/
├── src/
│   ├── app/                   # Next.js App Router pages
│   │   ├── about/
│   │   ├── community/
│   │   ├── contact/
│   │   ├── events/
│   │   ├── projects/
│   │   ├── team/
│   │   ├── technologies/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx           # Homepage
│   ├── components/
│   │   ├── animation/         # Motion, transitions, cursor, and scroll components
│   │   ├── events/            # Event countdown component
│   │   ├── gdg/               # Branding, navigation, footer, and theme provider
│   │   ├── hero/              # Homepage hero visuals
│   │   └── ui/                # Reusable UI primitives
│   ├── data/
│   │   ├── events.json        # Upcoming and archived event content
│   │   └── team.json          # Current team and organizer information
│   ├── hooks/                 # Reusable React hooks
│   ├── lib/                   # Shared utilities and integrations
│   └── types/                 # TypeScript types
├── .env.local.example         # Environment-variable template
├── .nvmrc                    # Node.js version reference
├── next.config.ts             # Next.js configuration
├── package.json               # Dependencies and scripts
├── package-lock.json          # Locked dependency versions
└── README.md
```

---

## Updating website content

Most chapter information is maintained in JSON files, so common content updates do not require editing page components.

### Add or update an event

Edit `src/data/events.json`.

- Add future events to the `upcoming` array.
- Keep completed events in the `past` array.
- Use a unique `id` for every event.
- Update the title, description, date, time, location, mode, attendance details, and poster path.
- Put event images in `public/images/events/` and reference them with a path beginning `/images/events/`.
- For countdown-enabled events, provide an ISO 8601 `startAt` value with the correct timezone offset. For India, use `+05:30`.

Example event record:

```json
{
  "id": "example-workshop-2026",
  "title": "Example Developer Workshop",
  "date": "2026-12-05",
  "displayDate": "Saturday, 5 December 2026",
  "time": "11:00 AM IST",
  "location": "CSMU Campus, Panvel",
  "mode": "In-Person (Offline)",
  "expectedAttendees": "To be announced",
  "speaker": "GDG CSMU Team",
  "description": "A short description of the workshop.",
  "registrationLink": null,
  "image": "/images/events/example-workshop.png",
  "status": "Upcoming",
  "startAt": "2026-12-05T11:00:00+05:30"
}
```

Only publish confirmed dates, venues, speakers, attendance figures, and registration URLs. Do not use placeholder links as real registration links.

### Update team members

Edit `src/data/team.json`.

- Update the appropriate current team group.
- Keep each member's `name` and `role` accurate.
- Add a portrait under `public/images/team/` and set the matching `photo` path.
- Add LinkedIn, GitHub, or email values only when the member has provided the correct public details.
- Use `null` for unavailable optional values.

### Update images and branding

Place optimized image assets in the relevant `public/images/` subfolder. Reference public assets from components using paths such as `/images/events/event-poster.png`. Use descriptive alternative text for meaningful images.

### Update page content and styling

- Page content lives in `src/app/<section>/page.tsx`.
- Shared site-wide styles live in `src/app/globals.css`.
- Shared navigation and footer components live in `src/components/gdg/`.
- Reusable motion components live in `src/components/animation/`.

---

## Environment variables

The repository includes `.env.local.example` as a template. Review it before configuring external services. If a feature you add requires credentials:

1. Add the variable name (not its secret value) to `.env.local.example`.
2. Put your local secret values in `.env.local`.
3. Add production values through your hosting provider's environment-variable settings.
4. Never commit `.env.local`, API keys, private tokens, or service-account credentials.

Do not expose private credentials through variables prefixed with `NEXT_PUBLIC_`; those values are bundled for browser access.

---

## Deployment on Vercel

This project is configured for a standard Next.js deployment and includes a `vercel.json` file.

1. Push the project to a GitHub repository.
2. Sign in to [Vercel](https://vercel.com/) and choose **Add New → Project**.
3. Import the GDG CSMU GitHub repository.
4. Keep the detected Next.js framework and default build settings unless the deployment dashboard reports a specific requirement.
5. Add any required environment variables under **Project Settings → Environment Variables**. The current static/local-JSON content does not require a database connection to render.
6. Deploy and check the generated production URL.
7. For future updates, push commits to the connected branch; Vercel can build and deploy them automatically.

Before announcing a release, test the deployed pages, navigation, event details, images, mobile layout, and any external links.

---

## Troubleshooting

<details>
<summary><strong>PowerShell says npm.ps1 cannot be loaded</strong></summary>

Use the Windows command shim:

```powershell
npm.cmd install
npm.cmd run dev
```

You do not need to permanently change the PowerShell execution policy just to run npm commands.
</details>

<details>
<summary><strong>Port 3000 is already in use</strong></summary>

Stop the other development server with `Ctrl + C`, or start Next.js on another port:

```bash
npm run dev -- --port 3001
```

Then open `http://localhost:3001`.
</details>

<details>
<summary><strong>Changes are not appearing</strong></summary>

Save the file and wait for Fast Refresh. If needed, stop the server with `Ctrl + C` and restart it. If the issue persists, remove the `.next` build cache and run the development command again.
</details>

<details>
<summary><strong>Dependency installation fails</strong></summary>

Check that the installed Node.js version meets the recommended version above, confirm your internet connection, and retry:

```bash
npm install
```

If the lockfile has not intentionally changed, avoid deleting `package-lock.json` as a first troubleshooting step.
</details>

---

## Contributing

Contributions from GDG CSMU members are welcome. Before opening a pull request:

1. Create a branch for your change.
2. Keep components reusable and follow the existing project conventions.
3. Check that content, dates, links, and images are accurate.
4. Run the available quality checks:

   ```bash
   npm run lint
   npm run typecheck
   npm run build
   ```

5. Provide a clear description and screenshots for visual changes.
6. Open a pull request against the repository's main development branch.

For major changes, discuss the proposed approach with the website maintainers before implementation.

## Community links

- **Website:** [gdg-csmu-website.vercel.app](https://gdg-csmu-website.vercel.app/)
- **Source code:** [Legend2006H/GDG-CSMU-website](https://github.com/Legend2006H/GDG-CSMU-website)

Update this section with the chapter's verified Instagram, LinkedIn, WhatsApp, and email links when the official URLs are confirmed.

## Acknowledgements

Built with care by the GDG on Campus CSMU community. Thanks to the student organizers, contributors, mentors, and everyone who helps make the campus developer ecosystem more welcoming and collaborative.

---

<div align="center">

  **GDG on Campus — CSMU**

  *Learn. Build. Connect.*

</div>