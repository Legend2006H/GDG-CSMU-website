# Animation and interaction inventory

Source: `https://gdgoc.yonsei.ac.kr/en`. Behaviors were sampled on desktop and mobile by scrolling, opening the mobile menu, hovering cards/links, and inspecting the accessible source content. Exact source timing/easing values are not exposed in the inspected page, so those values are described as observed behavior and local values are documented separately.

| Element | Trigger / behavior | Reversibility | Local implementation |
| --- | --- | --- | --- |
| Header | Remains pinned while page scrolls; nav links and language links respond to hover/focus | Persistent | Fixed translucent bar; scroll progress accent tracks document position |
| Hero entrance | On initial page load, eyebrow, wordmark, copy and actions reveal upward in sequence; colored brand marks scale/rotate into place and drift subtly | Entrance plays once; marks drift while page remains open | CSS keyframes; copy delays 60–440ms, mark reveal 120ms; reduced-motion preference disables it |
| Subpage content | Main content region reveals with a short upward movement and blur fade when it enters the viewport; it does not replay after scrolling away | One-time reveal | Shared `PageFrame` IntersectionObserver reveal, 700ms cubic-bezier transition; reduced-motion preference makes it immediate |
| Mobile menu | Tap menu button to open full-screen nav; menu links appear in a stagger; close button/Escape closes and body scroll locks | Reversible | CSS keyframes, React state, Escape handler, focusable links, body overflow lock |
| About manifesto | Word color changes from muted gray toward white with scroll progress | Reverses on upward scroll | `ScrollText` updates word states from element/document geometry on scroll and resize |
| About values / cards | Fade and rise into view as they enter viewport | One-time reveal | `IntersectionObserver`, 750ms cubic-bezier transition, per-card delay |
| Program / part cards | Scroll reveal and hover response | Hover reverses; reveals persist | Shared `Reveal` wrapper, background/transform transitions |
| Join section | Dotted multicolor field and side brand marks frame centered heading and social/calendar actions; responsive layout keeps the CTA group centered | Static decoration; actions retain link behavior | CSS layered dot field and dot-masked brand SVGs; tablet layout keeps heading and paired cards/links aligned |
| Project cards and images | Image scales subtly and card lifts/border brightens on hover | Reversible | CSS transforms and transitions |
| Session rows | Row background appears and item nudges horizontally on hover | Reversible | CSS transition |
| Header progress line | Multi-color line grows with page scroll fraction | Scroll-linked and reversible | RequestAnimationFrame throttled scroll listener |
| Calendar | Previous/next controls and Today update visible month grid | Reversible | Client state; generated month layout |
| Archive filters | Search and select inputs update visible session/project records | Reversible | Client-side `useMemo` filtering |

## Local motion values

- Reveal: 750ms, `cubic-bezier(.22,.8,.24,1)`, 26px vertical offset, 12% observer threshold, 5% bottom root margin; delay staggers vary by section.
- Mobile menu: 420ms opacity; nav rows stagger by 55ms from 80ms with 12px upward offset; color rule grows over 750ms after 100ms.
- Project hover: card 300ms; image scale 1.06 over 700ms.
- Scroll text: word color transition 220ms; progress is calculated from the element position and viewport height.
- Reduced-motion preference disables/reduces reveal and menu animations and native smooth scrolling.

## Remaining uncertainty

The source's precise easing/durations, any hidden pointer-following behavior, and animation changes at intermediate breakpoints have not been confirmed from source runtime instrumentation. The local program-card compositions and scroll reveals are approximations; their scroll presentation is not a frame-accurate reproduction. Source and local homepage sections were scrolled at a 666px-wide viewport, and the hero, timeline, project grid, join area, and mobile menu were visually reviewed. Exact timing fidelity is not claimed.
