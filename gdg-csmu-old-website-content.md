# GDG CSMU — all content from the old website

Source site: https://gdg-csmu-official.netlify.app/
Site title: GDG CSMU Official Website
Extracted: 11 November 2026

This file contains the information that was on the old site — its text, past events, team members, technologies, contact details and links. It does not contain the site's design or layout.

**Images:** every image the old site used is listed with its full direct link in the [Image references](#image-references--direct-links-you-can-use-directly) section near the end of this file — the site logo, all 9 team photos and both event posters, plus the fallback image. Each link was checked on 11 November 2026 and loaded as an image, so you can paste a link straight into your new website, a document or a design tool. The team photos also appear as full links in the Team section, and each event poster is embedded under its event.

## Pages on the old site

| Page | Address |
| --- | --- |
| Home | `/` |
| About | `/about` |
| Events | `/events` |
| Team | `/team` |
| Technologies | `/technologies` |
| Community | `/community` |
| Contact | `/contact` |
| Admin login | `/admin/login` |
| Admin — manage events | `/admin/events` |
| Admin — view members | `/admin/members` |

Navigation labels, in order: Home, About, Events, Team, Technologies, Community, Contact.

Footer text: "Official Google Developers Group on Campus at CSMU. Building a community of passionate developers."

Footer credit: "Built & Maintained by GDG CSMU Technical Team"

Footer copyright line: "© GDG on Campus CSMU. All rights reserved." (the year is generated automatically, so it shows the current year)

## Home page

Headline: **Learn. Build. Connect.**

Intro text: "Join the official Google Developers Group at CSMU. A community of passionate developers building the future together."

Buttons: "Join Community" (goes to the Community page) and "Upcoming Events" (goes to the Events page).

### Numbers shown on the home page

These numbers are typed into the home page code, not counted live from the database:

| Figure | Number shown |
| --- | ---: |
| Members | 749+ |
| Events | 15+ |
| Workshops | 5+ |

### Next Event section

Heading: "Next Event" — "Don't miss out on our upcoming event"

This section is filled automatically from the events database: it shows the soonest event whose date has not passed, with its title, date, location and description. If an event has no description, the site shows: "Join us for our upcoming GDG CSMU event."

If there is no future event in the database, the site shows: "No upcoming events yet."

At the time of extraction, both events in the database were already past, so this section would have shown "No upcoming events yet."

## About page

Heading: "About GDG on Campus CSMU"

Intro: "A vibrant community of passionate developers united by technology and innovation"

### What is Google Developers Group?

"Google Developers Groups (GDGs) are community-led, not-for-profit developer communities that bring together developers who are passionate about Google's developer technologies. From beginners to experts, GDG welcomes everyone interested in technology."

"GDG on Campus is a university-based extension of the GDG program, designed specifically for students who want to learn, share knowledge, and collaborate on projects using Google technologies."

### Our Mission

"To empower CSMU students with cutting-edge developer skills, foster innovation, and create a supportive community where everyone can learn, build, and grow together using Google's technologies."

### Our Vision

"To be the leading student developer community in CSMU, inspiring the next generation of tech innovators and creating impactful solutions that make a difference in our university and beyond."

### What We Do

| Activity | Description |
| --- | --- |
| Workshops & Training | Hands-on workshops covering web, mobile, cloud, and AI technologies |
| Community Building | Regular meetups, hackathons, and networking events with industry experts |
| Project Development | Collaborative projects and mentorship programs for real-world experience |

### Our Journey — timeline on the About page

| Year | Milestone |
| --- | --- |
| 2024 | GDG on Campus CSMU Founded |
| 2024 | Info Session & Blockchain Workshop |
| 2025 | Speaker Session & Study Jams Launched |
| 2025 | Bootcamps, Hackathon & Community Growth |
| 2026 | DevFest CSMU - Our Flagship Event |

These five milestones are the only other activity names on the site. There are no separate event records, dates, speakers or descriptions for them anywhere on the site or in its events database — see the Events section below.

## Events

Events page heading: "Events & Workshops" — "Join our tech events, workshops, and community meetups"

The Events page has two sections, "Upcoming Events" and "Past Events". Events are not written into the page itself: the page loads them live from the chapter's events database and sorts them by date — a date that has passed goes under Past Events, a future date goes under Upcoming Events. Clicking an event opens its details: date, location, speaker, an About text, and a "Register Now" button, or "Registration Closed" once the date has passed.

### All events in the database at extraction (2 events)

Both records are complete below — these are the only two events the database held on 11 November 2026, and both dates had passed, so both showed as past events.

#### 1. Build on Stellar Bootcamp: GDG INNOVATION SPRINT!

| Field | Value |
| --- | --- |
| Date | 2025-11-12 |
| Location | Panvel |
| Mode | Online |
| Attendees (expected figure stored with the event) | 200 |
| Speaker | Not stored — the site showed its default, "GDG CSMU Team" |
| Description | Not stored — the site showed its default, "More details will be shared soon." |
| Registration link | Stored as `xyxxx` — this is not a working link |
| Record added to the database | 27 January 2026 |

Event image (direct link): https://res.cloudinary.com/dzydmjfmi/image/upload/v1769540827/igxfzk41ybwqzbhi6ktw.png

![Build on Stellar Bootcamp: GDG INNOVATION SPRINT! — event poster](https://res.cloudinary.com/dzydmjfmi/image/upload/v1769540827/igxfzk41ybwqzbhi6ktw.png)

#### 2. INIT 2026

| Field | Value |
| --- | --- |
| Date | 2026-02-23 |
| Location | CSMU, Panvel |
| Mode | Offline |
| Attendees (expected figure stored with the event) | 50 |
| Speaker | Not stored — the site showed its default, "GDG CSMU Team" |
| Description | Not stored — the site showed its default, "More details will be shared soon." |
| Record added to the database | 20 February 2026 |

Registration link for INIT 2026: https://forms.gle/1myVMeNZQwgjXR9y7

Event image (direct link): https://res.cloudinary.com/dzydmjfmi/image/upload/v1771571335/qsnkhslv6vnwfpxf0v7d.png

![INIT 2026 — event poster](https://res.cloudinary.com/dzydmjfmi/image/upload/v1771571335/qsnkhslv6vnwfpxf0v7d.png)

### Event fields the site could store

When an admin adds an event, the form asks for: Event Title, Date, Location, Mode (Offline / Online), Expected Attendees, Google Form Registration Link, and an image. The event detail view can also show a Speaker and a Description, but neither of the two stored events has those fields filled in.

Note the gap: the home page claims 15+ events and 5+ workshops, but only the two records above exist in the database, plus the five milestone names in the About timeline. Any other past events the chapter ran were never recorded on this website.

## Team — past members

Team page heading: "Meet Our Team" — "Passionate individuals driving innovation and community growth"

The page lists 9 people in three groups. The Photo column gives the full direct link to the photo the site used for each person, so you can open it or paste it straight into the new site. All 9 photo links, the logo and both event posters are also collected together in the Image references section near the end of this file.

### Lead

| Name | Role | Photo (direct link) |
| --- | --- | --- |
| Tanisha Hegde | GDGoC Organizer | https://gdg-csmu-official.netlify.app/team/tanisha.jpeg |

- LinkedIn: https://www.linkedin.com/in/tanisha-hegde-b9bb44268/
- GitHub: none listed (the site stored `#`)
- Email shown for her card: gdgoc.csmu@gmail.com

### Technical Heads

| Name | Role | Photo (direct link) |
| --- | --- | --- |
| Varad Madhav | Technical Head (Ai/Ml) | https://gdg-csmu-official.netlify.app/team/varad.jpeg |
| Prathamesh Padher | Technical Head (Frontend) | https://gdg-csmu-official.netlify.app/team/prathamesh.jpeg |

- Varad Madhav — LinkedIn: https://www.linkedin.com/in/varadmadhav/ — GitHub: https://github.com/Varadmadhav
- Prathamesh Padher — LinkedIn: https://www.linkedin.com/in/prathamesh-padher-6bb094269/ — GitHub: https://github.com/PrathameshPadher?tab=repositories

### Core Team

| Name | Role | Photo (direct link) |
| --- | --- | --- |
| Aarya Shewale | UI/UX Head | https://gdg-csmu-official.netlify.app/team/aarya.jpeg |
| Jayesh Jadhav | Management and Design Head | https://gdg-csmu-official.netlify.app/team/jayesh1.jpeg |
| Sakshi Gollar | Social Media Head | https://gdg-csmu-official.netlify.app/team/sakshi.jpeg |
| Pratik Harugade | Management Head | https://gdg-csmu-official.netlify.app/team/pratik.jpeg |
| Vallabh Patil | Media Head | https://gdg-csmu-official.netlify.app/team/patil.jpeg |
| Prathamesh Tripathi | Operational Head | https://gdg-csmu-official.netlify.app/team/prathameshtripathi.jpeg |

- Aarya Shewale — LinkedIn: https://www.linkedin.com/in/aarya-shewale-4b04712ab/ — GitHub: https://github.com/AaryaShewale07
- Jayesh Jadhav — LinkedIn: https://www.linkedin.com/in/jayeshvj/ — GitHub: https://github.com/jayxvj
- Sakshi Gollar — LinkedIn: https://www.linkedin.com/in/sakshigollar31/ — GitHub: https://github.com/sakshig3101/sak.git
- Pratik Harugade — LinkedIn: https://www.linkedin.com/in/pratik-pramod-harugade/ — GitHub: https://github.com/ppharugade
- Vallabh Patil — LinkedIn: https://www.linkedin.com/in/vallabh-patil-8810ba374/ — GitHub: https://github.com/Patil2004-hash
- Prathamesh Tripathi — LinkedIn: https://www.linkedin.com/in/tripathiprathamesh/ — GitHub: none listed (the site stored `#`)

Role spellings above are exactly as the site stored them, including "Technical Head (Ai/Ml)" and the trailing space in "Pratik Harugade ".

## Technologies

Technologies page heading: "Technologies We Explore" — "Dive into the latest technologies and frameworks with expert guidance"

| Technology area | Topics listed |
| --- | --- |
| Web Development | React, Angular, Next.js, TypeScript, Tailwind CSS |
| Android Development | Kotlin, Jetpack Compose, Android Studio, Firebase |
| Cloud & DevOps | Google Cloud Platform, Docker, Kubernetes, CI/CD |
| AI / ML | TensorFlow, PyTorch, Machine Learning, Deep Learning |
| UI/UX Design | Figma, Material Design, User Research, Prototyping |
| Competitive Programming | Algorithms, Data Structures, Problem Solving, Contests |

## Community page — joining

Heading: "Join Our Community" — "Be part of a vibrant community of developers, learners, and innovators"

Form heading: "Become a Member"

The application form asks for:

- Full Name
- Email
- Student ID
- Interests (multiple choice): Web Development, Android Development, Cloud & DevOps, AI/ML, UI/UX Design, Competitive Programming

Button: "Submit Application". If the same email applies twice, the site shows: "This email is already registered". On success it shows: "Application submitted successfully!"

Applications are saved to a members database that only the admin pages can view. Those applications contain students' personal emails and student IDs, so they are not copied into this file — this file only covers the public team information from the Team page.

### Connect With Us (shown on the Community page)

- GDG community: https://developers.google.com/community/gdg
- WhatsApp: https://chat.whatsapp.com/GULUy0LN36c0NkRiMEyW2i
- Instagram: https://www.instagram.com/gdgoncampus.csmu?igsh=M2F6anJjZnNqYWd3
- LinkedIn: https://www.linkedin.com/company/google-developer-group-on-campus-csmu/posts/?feedView=all

## Contact page

Heading: "Get In Touch" — "Have questions? We'd love to hear from you!"

| Contact detail | Value |
| --- | --- |
| Email | gdgoc.csmu@gmail.com |
| Location | CSMU Campus, Panvel, Navi Mumbai, Maharashtra 410221 |
| Phone | +91 98677 89541 |

Map shown on the page: https://www.google.com/maps?q=CSMU%20Campus%20Panvel&output=embed

The contact form ("Send us a message") asks for Name, Email, Subject and Message, with the button "Send Message".

## All social and external links on the site

- Email: mailto:gdgoc.csmu@gmail.com (shown as gdgoc.csmu@gmail.com)
- GDG community: https://developers.google.com/community/gdg
- WhatsApp group: https://chat.whatsapp.com/GULUy0LN36c0NkRiMEyW2i
- Instagram (@gdgoncampus.csmu): https://www.instagram.com/gdgoncampus.csmu?igsh=M2F6anJjZnNqYWd3
- LinkedIn company page: https://www.linkedin.com/company/google-developer-group-on-campus-csmu/posts/?feedView=all
- Fallback event image used when an event has no image: https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800

## Image references — direct links you can use directly

Every image the old site used, with a full link you can paste straight into the new website. There are 13 in total: 1 site logo, 9 team photos, 2 event posters and 1 fallback image. Every link below was checked on 11 November 2026 and loaded as an image.

**One warning before you rely on them:** the logo and the 9 team photos are hosted on the old website itself. If that old site is taken down, those 10 links will stop working — download copies of the files if you want to keep them permanently. The 2 event posters are hosted on Cloudinary and the fallback image is on Unsplash, so those do not depend on the old site staying up.

### How to add an image from these links

- **Just the link:** copy the link from any table below and paste it wherever an image URL is asked for.
- **In Markdown:** copy the "Markdown embed" line given for the image, for example `![GDG CSMU logo](https://gdg-csmu-official.netlify.app/team/gdg-logo.png)`
- **In HTML / a website:** `<img src="PASTE-LINK-HERE" alt="Describe the image">`

### Site logo (1)

Used in the site header, next to the "GDG on Campus" name.

| Image | Direct link |
| --- | --- |
| GDG CSMU logo | https://gdg-csmu-official.netlify.app/team/gdg-logo.png |

Markdown embed: `![GDG CSMU logo](https://gdg-csmu-official.netlify.app/team/gdg-logo.png)`

![GDG CSMU logo](https://gdg-csmu-official.netlify.app/team/gdg-logo.png)

### Team photos (9)

| Person | Role | Direct link |
| --- | --- | --- |
| Tanisha Hegde | GDGoC Organizer | https://gdg-csmu-official.netlify.app/team/tanisha.jpeg |
| Varad Madhav | Technical Head (Ai/Ml) | https://gdg-csmu-official.netlify.app/team/varad.jpeg |
| Prathamesh Padher | Technical Head (Frontend) | https://gdg-csmu-official.netlify.app/team/prathamesh.jpeg |
| Aarya Shewale | UI/UX Head | https://gdg-csmu-official.netlify.app/team/aarya.jpeg |
| Jayesh Jadhav | Management and Design Head | https://gdg-csmu-official.netlify.app/team/jayesh1.jpeg |
| Sakshi Gollar | Social Media Head | https://gdg-csmu-official.netlify.app/team/sakshi.jpeg |
| Pratik Harugade | Management Head | https://gdg-csmu-official.netlify.app/team/pratik.jpeg |
| Vallabh Patil | Media Head | https://gdg-csmu-official.netlify.app/team/patil.jpeg |
| Prathamesh Tripathi | Operational Head | https://gdg-csmu-official.netlify.app/team/prathameshtripathi.jpeg |

Markdown embeds for the team photos — copy any line to show that photo:

- `![Tanisha Hegde](https://gdg-csmu-official.netlify.app/team/tanisha.jpeg)`
- `![Varad Madhav](https://gdg-csmu-official.netlify.app/team/varad.jpeg)`
- `![Prathamesh Padher](https://gdg-csmu-official.netlify.app/team/prathamesh.jpeg)`
- `![Aarya Shewale](https://gdg-csmu-official.netlify.app/team/aarya.jpeg)`
- `![Jayesh Jadhav](https://gdg-csmu-official.netlify.app/team/jayesh1.jpeg)`
- `![Sakshi Gollar](https://gdg-csmu-official.netlify.app/team/sakshi.jpeg)`
- `![Pratik Harugade](https://gdg-csmu-official.netlify.app/team/pratik.jpeg)`
- `![Vallabh Patil](https://gdg-csmu-official.netlify.app/team/patil.jpeg)`
- `![Prathamesh Tripathi](https://gdg-csmu-official.netlify.app/team/prathameshtripathi.jpeg)`

### Event posters (2)

| Event | Direct link |
| --- | --- |
| Build on Stellar Bootcamp: GDG INNOVATION SPRINT! (2025-11-12) | https://res.cloudinary.com/dzydmjfmi/image/upload/v1769540827/igxfzk41ybwqzbhi6ktw.png |
| INIT 2026 (2026-02-23) | https://res.cloudinary.com/dzydmjfmi/image/upload/v1771571335/qsnkhslv6vnwfpxf0v7d.png |

Markdown embeds for the event posters:

- `![Build on Stellar Bootcamp poster](https://res.cloudinary.com/dzydmjfmi/image/upload/v1769540827/igxfzk41ybwqzbhi6ktw.png)`
- `![INIT 2026 poster](https://res.cloudinary.com/dzydmjfmi/image/upload/v1771571335/qsnkhslv6vnwfpxf0v7d.png)`

Both posters are also embedded, as visible images, under their events in the Events section above.

### Fallback image (1)

The site showed this stock photo whenever an event had no image of its own. It is an Unsplash photo, not a GDG CSMU photo.

| Image | Direct link |
| --- | --- |
| Fallback event image (Unsplash) | https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800 |

Markdown embed: `![Fallback event image](https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800)`

### No other images on the site

There are no other image files in the old site's code: no hero or banner image, no gallery photos, no project screenshots and no separate favicon image file. Everything the site displayed visually, apart from these 13 images, was text, colour and icons drawn in code.

## What was not on the site

- No project list, gallery, sponsors, testimonials, FAQs or blog — those sections do not exist on this site.
- No event descriptions or speakers for any event: both stored events leave those fields empty, and no other event records exist.
- No dates more specific than the year for the five About-page milestones.
- Login credentials, form-service keys and database keys that appear inside the site's code are not content, so they are not included here.
