# GDGoC Yonsei route map

Reference origin: `https://gdgoc.yonsei.ac.kr`

| Reference route | Local route | Page purpose / behavior | Public availability |
| --- | --- | --- | --- |
| `/en` | `/en` and `/` | Home, community overview, programs, parts, latest sessions/projects, recruitment | Public |
| `/en/session` | `/en/session` | Session archive with search and type/part/generation filters, grouped by generation and month | Public; all 42 public index records recreated; individual details remain source links |
| `/en/project` | `/en/project` | Project archive with search | Public; three 25-26 projects |
| `/en/calendar` | `/en/calendar` | Month grid, Today and previous/next month controls | Public |
| `/en/member` | `/en/member` | Member generations and dates | Public |
| `/en/member/26-27` | `/en/member/26-27` | Public roster grouped by organizer and six teams (ML/AI has two groups) | Public; 37 listed memberships, repeated people may appear across teams |
| `/en/member/25-26` | `/en/member/25-26` | Public roster grouped by organizer and teams | Public; 32 listed memberships, repeated people may appear across teams |
| `/en/admin` (GYMS) | external source link | Member/admin workspace | Source returned only a loading state in public inspection; requires the source site and likely member access |
| `/ko` | external source link | Korean language version | Public but not recreated locally |
| `/en/session/{generation}/{id}` | `/en/session/{generation}/{id}` | Session detail with source title/summary and index metadata (date, time, location, generation, part, and type), related sessions | All 42 public detail routes generated from the source archive IDs |
| `/en/project/25-26/{id}` | `/en/project/25-26/{id}` | Public project case study, summary, available team links, timeline, cover image, and related projects | Local pages for FindFest, BlueNote, and P-scheduler |

Primary nav relationships: Home links to the local session log, project archive, calendar, and member directory, with GYMS remaining a source destination. Program part links point to session filters; the public archive data only has records for Organizer, Cloud, Front-End, and UX/UI. Homepage project cards open the local project archive with the selected project highlighted; project archive cards link to local detail pages for the three public projects.

## Limitations

This implementation covers the English homepage, primary public archive routes, two publicly indexed generation rosters, all three public 25-26 project detail routes, and all 42 indexed session detail routes. Korean pages remain source links. GYMS did not expose public content. Project detail pages use the available archive preview image rather than reproducing the complete source galleries. Session posters use a local recreation because the source poster images were not exposed as downloadable image elements during inspection. Roster cards use initials instead of member portraits because the directory's image references have not been downloaded and mapped.

