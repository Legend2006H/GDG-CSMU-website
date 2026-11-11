"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { SplitHero } from "@/components/hero/SplitHero";
import eventsData from "@/data/events.json";
import {
  ArrowRight,
  Calendar,
  MapPin,
  Users,
  Sparkles,
  Code2,
  Globe,
  Layers,
  Cpu,
  Palette,
  Trophy,
} from "lucide-react";
import { MarqueeStrip } from "@/components/animation/MarqueeStrip";
import { Magnetic } from "@/components/animation/Magnetic";
import { TiltCard } from "@/components/animation/TiltCard";
import { EventCountdown } from "@/components/events/EventCountdown";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

export default function Home() {
  const nextEvent = eventsData.upcoming.length > 0 ? eventsData.upcoming[0] : null;

  const aboutHeadingRef = useRef<HTMLHeadingElement>(null);
  const aboutTextRef = useRef<HTMLParagraphElement>(null);
  const bentoGridRef = useRef<HTMLDivElement>(null);
  const techGridRef = useRef<HTMLDivElement>(null);
  const eventsCardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger, SplitText);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 4. ABOUT SECTION - SplitText masked headline reveal & word-by-word reading scrub
      document.fonts.ready.then(() => {
        if (aboutHeadingRef.current) {
          const splitHeading = new SplitText(aboutHeadingRef.current, {
            type: "lines",
            linesClass: "overflow-hidden",
          });
          gsap.from(splitHeading.lines, {
            scrollTrigger: {
              trigger: aboutHeadingRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            yPercent: 110,
            opacity: 0,
            duration: 0.9,
            stagger: 0.09,
            ease: "expo.out",
          });
        }

        if (aboutTextRef.current) {
          const splitText = new SplitText(aboutTextRef.current, { type: "words" });
          gsap.fromTo(
            splitText.words,
            { opacity: 0.15 },
            {
              opacity: 1,
              stagger: 0.05,
              ease: "none",
              scrollTrigger: {
                trigger: aboutTextRef.current,
                start: "top 80%",
                end: "bottom 45%",
                scrub: true,
              },
            }
          );
        }
      });

      // 5. PROGRAMS / TRACKS - Bento-grid stagger reveal (ONE ScrollTrigger on container)
      if (bentoGridRef.current) {
        gsap.fromTo(
          bentoGridRef.current.children,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "expo.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: bentoGridRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Technologies grid stagger
      if (techGridRef.current) {
        gsap.fromTo(
          techGridRef.current.children,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "expo.out",
            stagger: 0.06,
            scrollTrigger: {
              trigger: techGridRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // 6. EVENTS - Sticky stacking cards GSAP scale-down
      if (eventsCardsRef.current) {
        const cards = eventsCardsRef.current.querySelectorAll<HTMLElement>(".stack-card");
        cards.forEach((card, i) => {
          if (i < cards.length - 1) {
            gsap.to(card, {
              scale: 0.95,
              opacity: 0.85,
              ease: "none",
              scrollTrigger: {
                trigger: cards[i + 1],
                start: "top 70%",
                end: "top 20%",
                scrub: true,
              },
            });
          }
        });
      }
    });

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div className="w-full">
      {/* 2. Yonsei-Style Scroll-to-Open Hero with DotGrid + Dotted Chevrons + SplitText */}
      <SplitHero />

      {/* 4. About Reveal Section */}
      <section id="about" className="relative z-20 max-w-[1200px] mx-auto px-6 py-20 border-t border-[var(--line)]">
        <div className="modern-card relative overflow-hidden p-8 md:p-12 border border-[var(--card-border)] bg-[var(--surface-card)] rounded-3xl">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC04] to-[#34A853]" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Mission & Info */}
            <div className="lg:col-span-7 space-y-4">
              <span className="section-index font-mono text-xs uppercase tracking-wider text-[#8db1ff] font-semibold">
                {"// ABOUT GDG CSMU"}
              </span>
              <h2
                ref={aboutHeadingRef}
                className="text-2xl md:text-4xl font-bold tracking-tight text-[var(--white)] mt-1"
              >
                About GDG on Campus CSMU
              </h2>
              <p
                ref={aboutTextRef}
                className="text-base md:text-lg text-[var(--muted-bright)] leading-relaxed"
              >
                The official Google Developer Groups on Campus chapter at Chhatrapati Shivaji Maharaj University, Panvel. We connect passionate student developers, explore real-world Google ecosystems, and build impactful software together.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link href="/about" className="button button-primary">
                  <span>Read Our Full Story</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/technologies"
                  className="text-xs font-semibold font-mono text-[#8db1ff] hover:text-[var(--white)] flex items-center gap-1.5 transition-colors"
                >
                  <span>Explore 6 Tech Tracks</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Right Column: Density Stats & Track Pills (fills previous empty space) */}
            <div className="lg:col-span-5 space-y-4 bg-[var(--surface)] p-6 rounded-2xl border border-[var(--card-border)]">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-[var(--surface-highlight)] border border-[var(--card-border)]">
                  <span className="text-xl sm:text-2xl font-bold font-mono text-[#4285F4] block">
                    750+
                  </span>
                  <span className="text-xs font-mono text-[var(--muted-bright)]">
                    Community Members
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-[var(--surface-highlight)] border border-[var(--card-border)]">
                  <span className="text-xl sm:text-2xl font-bold font-mono text-[#EA4335] block">
                    15+
                  </span>
                  <span className="text-xs font-mono text-[var(--muted-bright)]">
                    Events &amp; Workshops
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-[var(--surface-highlight)] border border-[var(--card-border)]">
                  <span className="text-xl sm:text-2xl font-bold font-mono text-[#FBBC04] block">
                    30+
                  </span>
                  <span className="text-xs font-mono text-[var(--muted-bright)]">
                    Speakers &amp; Mentors
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-[var(--surface-highlight)] border border-[var(--card-border)]">
                  <span className="text-xl sm:text-2xl font-bold font-mono text-[#34A853] block">
                    100%
                  </span>
                  <span className="text-xs font-mono text-[var(--muted-bright)]">
                    Student Led Community
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-[var(--line)]">
                <span className="text-[11px] font-mono text-[var(--muted)] uppercase tracking-wider block mb-2">
                  Active Tracks at CSMU:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {["Web Dev", "Android", "Cloud", "AI / ML", "UI/UX", "CP"].map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded-md font-mono text-[10px] bg-[var(--surface-highlight)] text-[var(--white)] border border-[var(--line)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6(a). Seamless Marquee Strip Above Events */}
      <MarqueeStrip
        items={[
          "GDG ON CAMPUS CSMU",
          "UPCOMING TECH EVENTS",
          "HANDS-ON WORKSHOPS",
          "EXPERT SESSIONS",
          "INNOVATION & HACKATHONS",
        ]}
        speed={26}
        direction="left"
      />

      {/* 6(b). Next Event & Sticky Stacking Cards */}
      <section id="events" className="max-w-[1200px] mx-auto px-6 py-24">
        <div className="mb-10">
          <span className="section-index font-mono text-xs uppercase tracking-wider text-[var(--muted)]">
            {"// NEXT EVENT"}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mt-2 text-[var(--white)]">
            Don&apos;t miss out on our upcoming event
          </h2>
        </div>

        <div ref={eventsCardsRef} className="space-y-8">
          {nextEvent ? (
            <div data-cursor="VIEW" className="stack-card sticky top-24 z-10 modern-card relative overflow-hidden p-8 md:p-12 border border-[var(--card-border)] bg-[var(--surface-card)] rounded-3xl will-change-transform shadow-2xl">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC04] to-[#34A853]" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4285F4]/15 border border-[#4285F4]/30 text-[#8db1ff] font-mono text-xs font-semibold">
                    <Sparkles className="w-3.5 h-3.5 text-[#4285F4]" />
                    <span>Next Chapter Event</span>
                  </div>

                  <h3 className="text-2xl md:text-4xl font-bold tracking-tight text-[var(--white)]">
                    {nextEvent.title}
                  </h3>

                  <p className="text-[var(--muted-bright)] text-base leading-relaxed">
                    {nextEvent.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 font-mono text-xs text-[var(--muted-bright)]">
                    <div className="flex items-center gap-2.5">
                      <Calendar className="w-4 h-4 text-[#EA4335]" />
                      <span>{nextEvent.displayDate}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <MapPin className="w-4 h-4 text-[#34A853]" />
                      <span>Venue: {nextEvent.location}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Users className="w-4 h-4 text-[#FBBC04]" />
                      <span>Speaker: {nextEvent.speaker}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Code2 className="w-4 h-4 text-[#4285F4]" />
                      <span>Time: {nextEvent.time}</span>
                    </div>
                  </div>

                  {/* Live countdown & Add to Calendar */}
                  <EventCountdown
                    targetDate="2026-11-17T10:30:00+05:30"
                    eventTitle={nextEvent.title}
                    location={nextEvent.location}
                    description={nextEvent.description}
                  />

                  <div className="pt-4 flex flex-wrap items-center gap-4">
                    {nextEvent.registrationLink && (
                      <a
                        href={nextEvent.registrationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="button button-primary"
                        data-cursor="VIEW"
                      >
                        <span>Register Now (Form)</span>
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    )}
                    <Link
                      href="/events"
                      className="px-5 py-2.5 rounded-full text-xs font-semibold font-mono border border-[var(--line)] text-[var(--white)] hover:border-[#4285F4] transition-colors"
                      data-cursor="VIEW"
                    >
                      <span>View All Events</span>
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <TiltCard maxTilt={8} scale={1.03} glare={true} className="rounded-2xl">
                    <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-[var(--line)] bg-[var(--surface-highlight)]">
                      <Image
                        src={nextEvent.image}
                        alt="GDG CSMU Annual Orientation 2026 - Main Auditorium, Panvel"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 40vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.6)] via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className="font-mono text-[11px] text-white/90 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                          CSMU Campus, Panvel · Official
                        </span>
                      </div>
                    </div>
                  </TiltCard>
                </div>
              </div>
            </div>
          ) : (
            <div className="modern-card p-12 text-center text-[var(--muted)] font-mono text-sm">
              No upcoming events yet.
            </div>
          )}
        </div>
      </section>

      {/* 5. What We Do Pillars (Bento-grid stagger reveal) */}
      <section className="max-w-[1200px] mx-auto px-6 py-20 border-t border-[var(--line)]">
        <div className="mb-12">
          <span className="section-index font-mono text-xs uppercase tracking-wider text-[var(--muted)]">
            {"// WHAT WE DO"}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mt-2 text-[var(--white)]">
            Empowering students with Google technologies
          </h2>
        </div>

        <div ref={bentoGridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TiltCard maxTilt={8} scale={1.02} glare={true} className="h-full">
            <div className="modern-card space-y-4 h-full">
              <div className="w-12 h-12 rounded-2xl bg-[rgba(66,133,244,0.1)] border border-[rgba(66,133,244,0.25)] flex items-center justify-center text-[#4285F4]">
                <Code2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[var(--white)]">Workshops &amp; Training</h3>
              <p className="text-sm text-[var(--muted-bright)] leading-relaxed">
                Hands-on workshops covering web, mobile, cloud, and AI technologies.
              </p>
            </div>
          </TiltCard>

          <TiltCard maxTilt={8} scale={1.02} glare={true} className="h-full">
            <div className="modern-card space-y-4 h-full">
              <div className="w-12 h-12 rounded-2xl bg-[rgba(234,67,53,0.1)] border border-[rgba(234,67,53,0.25)] flex items-center justify-center text-[#EA4335]">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[var(--white)]">Community Building</h3>
              <p className="text-sm text-[var(--muted-bright)] leading-relaxed">
                Regular meetups, hackathons, and networking events with industry experts.
              </p>
            </div>
          </TiltCard>

          <TiltCard maxTilt={8} scale={1.02} glare={true} className="h-full">
            <div className="modern-card space-y-4 h-full">
              <div className="w-12 h-12 rounded-2xl bg-[rgba(52,168,83,0.1)] border border-[rgba(52,168,83,0.25)] flex items-center justify-center text-[#34A853]">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[var(--white)]">Project Development</h3>
              <p className="text-sm text-[var(--muted-bright)] leading-relaxed">
                Collaborative projects and mentorship programs for real-world experience.
              </p>
            </div>
          </TiltCard>
        </div>
      </section>

      {/* Technologies Overview */}
      <section className="max-w-[1200px] mx-auto px-6 py-20 border-t border-[var(--line)]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="section-index font-mono text-xs uppercase tracking-wider text-[var(--muted)]">
              {"// TECHNOLOGIES"}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mt-2 text-[var(--white)]">
              Technologies We Explore
            </h2>
          </div>
          <Link href="/technologies" className="text-sm font-semibold text-[#8db1ff] hover:underline flex items-center gap-1">
            <span>Explore all domains</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div ref={techGridRef} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { id: "web", title: "Web Development", icon: Globe, color: "#4285F4" },
            { id: "android", title: "Android Development", icon: Cpu, color: "#34A853" },
            { id: "cloud", title: "Cloud & DevOps", icon: Layers, color: "#EA4335" },
            { id: "ai", title: "AI / ML", icon: Sparkles, color: "#FBBC04" },
            { id: "uiux", title: "UI/UX Design", icon: Palette, color: "#EA4335" },
            { id: "cp", title: "Competitive Programming", icon: Trophy, color: "#4285F4" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <TiltCard key={item.title} maxTilt={10} scale={1.04} glare={true} className="h-full">
                <Link
                  href={`/technologies#${item.id}`}
                  data-cursor="EXPLORE"
                  className="modern-card p-5 text-center flex flex-col items-center justify-between gap-3 hover:border-[#4285F4] hover:-translate-y-1 transition-all h-full group"
                >
                  <div className="flex flex-col items-center gap-3 w-full">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                      style={{ backgroundColor: `${item.color}15`, color: item.color }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-semibold text-[var(--white)] leading-snug line-clamp-2">
                      {item.title}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-semibold text-[#8db1ff] opacity-80 group-hover:opacity-100 flex items-center gap-1 pt-1">
                    <span>Explore</span>
                    <span>→</span>
                  </span>
                </Link>
              </TiltCard>
            );
          })}
        </div>
      </section>

      {/* Core Team Teaser (Preview on Home) */}
      <section className="max-w-[1200px] mx-auto px-6 py-20 border-t border-[var(--line)]">
        <div className="modern-card p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 bg-[var(--surface-card)] rounded-3xl border border-[var(--card-border)]">
          <div className="space-y-3 text-center md:text-left max-w-xl">
            <span className="section-index font-mono text-xs uppercase tracking-wider text-[#8db1ff] font-semibold">
              {"// MEET THE TEAM"}
            </span>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-[var(--white)]">
              Built by students, for students
            </h2>
            <p className="text-sm md:text-base text-[var(--muted-bright)] leading-relaxed">
              Meet our passionate team of organizers, technical leads, and mentors powering GDG on Campus CSMU.
            </p>
          </div>
          <div className="flex items-center gap-4 flex-none">
            <Link href="/team" className="button button-primary" data-cursor="VIEW">
              <span>View Full Chapter Team</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Join Community CTA + Magnetic Buttons */}
      <section className="max-w-[1200px] mx-auto px-6 py-24 border-t border-[var(--line)]">
        <div className="modern-card relative overflow-hidden p-10 md:p-16 text-center space-y-6 bg-gradient-to-b from-[var(--surface-card)] to-[var(--surface)] border border-[var(--card-border)] rounded-3xl shadow-xl">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC04] to-[#34A853]" />

          <div className="inline-flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#4285F4] animate-pulse" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#EA4335] animate-pulse delay-75" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FBBC04] animate-pulse delay-150" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#34A853] animate-pulse delay-200" />
          </div>

          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[var(--white)] max-w-2xl mx-auto">
            Be part of a vibrant community of developers, learners, and innovators
          </h2>

          <p className="text-[var(--muted-bright)] max-w-xl mx-auto text-base">
            Join 750+ student developers at CSMU Panvel. Expand your skills, collaborate on open-source projects, and attend cutting-edge workshops.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Magnetic strength={0.3} maxPull={8} padding={16}>
              <Link href="/community" data-cursor="JOIN" className="button button-primary">
                <span>Become a Member</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Magnetic>
          </div>
        </div>
      </section>

      {/* PHASE 2 — DO NOT BUILD NOW (Roadmap backlog):
          TODO: Projects horizontal-scroll gallery (desktop, swipe fallback)
          TODO: One pinned scrollytelling section in About/Events
          TODO: DrawSVG section dividers
      */}
    </div>
  );
}
