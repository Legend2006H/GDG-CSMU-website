# GDGoC Yonsei QA report

## Current status

| Requirement | Evidence | Result |
| --- | --- | --- |
| Homepage plus linked public index routes exist | Next production route listing and browser route visit | Pass for `/`, `/en`, `/en/session` (dynamic query route), `/en/project`, `/en/calendar`, `/en/member` |
| Public generation directories | Source route inspection and local pages | Pass for `/en/member/26-27` and `/en/member/25-26`; portraits are represented by initials |
| Production checks | `npm run check` | Pass after route, filter, and roster implementation |
| Archive interactions | Browser UI: session archive shows 42 records; `?part=Cloud` selects Cloud and shows seven records; `?part=UI/UX` maps to the public `UX/UI` record; `?generation=26-27` shows five records; project query selects BlueNote | Pass |
| Project details | Source project detail pages inspected for FindFest, BlueNote, and P-scheduler; local case study routes visited for BlueNote and P-scheduler | Pass for route and content rendering; full source galleries are not recreated |
| Session details | 42 source detail URLs and page descriptions collected from the public archive; all 42 local pages prerendered; source and local detail for 26-27 fourth T19 viewed in browser | Pass for route, metadata, summary, related-session rendering; exact source poster art and some full event copy remain approximate |
| Desktop page rendering | Local homepage, project, session, member pages viewed at 1440×900; wide session at 1920×1080 | Pass for rendering; not an exact pixel-difference assessment |
| Mobile page rendering | Local calendar at 390×844; responsive DOM measured at 390×844 and 360×800 | Pass; mobile nav is horizontally scrollable |
| Horizontal overflow | Browser measured `scrollWidth` at 1920×1080, 1440×900, 1280×800, 768×1024, 390×844, 360×800 | No horizontal document overflow at those sizes |
| Runtime errors | Browser warning/error log on archive page | No JS errors observed in reviewed page states |
| Full source/local visual comparisons | Matched viewport and section screenshots | Incomplete; source screenshots and numeric pixel comparison are not saved |
| Homepage scroll comparison | Source and local `/en` scrolled through hero, About, Programs, Six parts, sessions, projects, Join, and footer at approximately 666×920; checked mobile menu open/Escape close | Pass for visual review; scroll animations and responsive card grids reviewed, numeric pixel comparison not captured |

## Known gaps

- Session archive includes all 42 public records, grouped by generation and month, with type, part, date, and location filters. All 42 detail routes show source-derived summaries and archive metadata; source poster art and full event descriptions are not fully reproduced.
- Project archive has all three public projects, but its source text advertises filters for generation, tech stack, live demo, and open source. The local version currently includes search and generation chips; public facet data was not exposed in the extracted content.
- Calendar reproduces the month grid and controls. It opens to September 2026 (five source T19 dates) and can navigate months; full event data for other months is not mapped.
- Public roster routes include team names and member names, but not portraits or emails; initials are used. Older member generations have archive cards because detailed pages were not verified.
- GYMS returned a loading-only page and remains linked to the source. Privacy/terms content and Korean-language pages are not recreated. Project case-study routes are local; their galleries are limited to the available archive cover images.
- Source program-card scroll choreography and precise motion timing remain approximate, as detailed in `animation-inventory.md`. Tablet-width homepage hero, two-column part/project grids, latest-section headers, and dotted Join treatment were tuned during this comparison.

## Run locally

From the repository root run `npm run dev`, then open `http://localhost:3000`. Use `npm run check` for lint, typecheck, and production build.

