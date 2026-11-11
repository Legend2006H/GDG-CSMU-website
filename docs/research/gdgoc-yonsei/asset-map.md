# GDGoC Yonsei asset map

All site-specific files are under `public/sites/gdgoc-yonsei/`. Reference source: `https://gdgoc.yonsei.ac.kr`.

| Local file | Source / derivation | Use | Verification |
| --- | --- | --- | --- |
| `font-display.woff2` | Google Sans Flex loaded by the source | Main body and display text | WOFF2, used via local `@font-face` |
| `font-body.woff2` | Google Sans bold face loaded by the source | Strong display headings | WOFF2, local face declares weight 700 |
| `font-korean.woff2` | Google Sans Code loaded by the source | Labels, dates, metadata | WOFF2, local monospace face |
| `gdgoc-logo.png` | Site logo image | Available logo asset | PNG; current homepage uses an inline dotted emblem recreation |
| `bridge-flags.svg` | Inline SVG extracted from source page | Korea/Japan Bridge Hackathon art | SVG, rendered in Programs |
| `findfest.avif` | Source Next image URL for FindFest | Latest project preview | AVIF despite opaque source asset URL |
| `bluenote.avif` | Source Next image URL for BlueNote | Latest project preview | AVIF |
| `pscheduler.avif` | Source Next image URL for P-scheduler | Latest project preview | AVIF |

## Asset notes

The source's project listing exposes three preview images reused on both the homepage and project archive. The homepage brand emblem is drawn as SVG paths with a CSS dot mask to match the dotted source treatment. No public hero photography, video, or session thumbnail is required by the inspected homepage/archive states. Filenames may not reveal upstream URLs because the source serves optimized Next image responses; each AVIF maps to its matching named project card.
