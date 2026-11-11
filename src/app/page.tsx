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
          <span className="section-index font-mono text-xs uppercase tracking-wider text-[#8db1ff] font-semibold">
            {"// ABOUT GDG CSMU"}
          </span>
          <h2
            ref={aboutHeadingRef}
            className="text-2xl md:text-4xl font-bold tracking-tight text-[var(--white)] mt-3"
          >
            About GDG on Campus CSMU
          </h2>
          <p
            ref={aboutTextRef}
            className="mt-4 text-base md:text-xl text-[var(--muted-bright)] leading-relaxed max-w-3xl"
          >
            A student developer community at CSMU. We connect, learn and grow together, and turn what we learn into work our community can use.
          </p>
          <div className="mt-6 pt-4 flex items-center gap-4">
            <Link href="/about" className="button button-primary">
              <span>Read Our Full Story</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
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
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#4285F4] via-[#EA4335] to-[#FBBC04]" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-5">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[rgba(66,133,244,0.12)] text-[#8db1ff] font-mono text-xs font-semibold">
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
                      <span>Time: {nextEvent.time || "To be confirmed"}</span>
                    </div>
                  </div>

                  <div className="pt-4 flex items-center gap-4">
                    <Link href="/events" className="button button-primary" data-cursor="VIEW">
                      <span>View Event Details</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <TiltCard maxTilt={8} scale={1.03} glare={true} className="rounded-2xl">
                    <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-[var(--line)] bg-[var(--surface-highlight)]">
                      <Image
                        src={nextEvent.image}
                        alt={nextEvent.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 40vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.6)] via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className="font-mono text-[11px] text-white/90 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                          GDG CSMU Official
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
            { title: "Web Development", icon: Globe, color: "#4285F4" },
            { title: "Android Development", icon: Cpu, color: "#34A853" },
            { title: "Cloud & DevOps", icon: Layers, color: "#EA4335" },
            { title: "AI / ML", icon: Sparkles, color: "#FBBC04" },
            { title: "UI/UX Design", icon: Palette, color: "#EA4335" },
            { title: "Competitive Programming", icon: Trophy, color: "#4285F4" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <TiltCard key={item.title} maxTilt={10} scale={1.04} glare={true} className="h-full">
                <Link
                  href="/technologies"
                  data-cursor="EXPLORE"
                  className="modern-card p-5 text-center flex flex-col items-center justify-center gap-3 hover:border-[var(--white)] transition-all h-full"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${item.color}15`, color: item.color }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold text-[var(--white)] leading-snug">
                    {item.title}
                  </span>
                </Link>
              </TiltCard>
            );
          })}
        </div>
      </section>

      {/* 7. Join Community CTA + Magnetic Buttons */}
      <section className="max-w-[1200px] mx-auto px-6 py-24 border-t border-[var(--line)]">
        <div className="modern-card relative overflow-hidden p-10 md:p-16 text-center space-y-6 bg-gradient-to-b from-[var(--surface-card)] to-[var(--surface)]">
          <div className="inline-flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#4285F4]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#EA4335]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FBBC04]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#34A853]" />
          </div>

          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[var(--white)] max-w-2xl mx-auto">
            Be part of a vibrant community of developers, learners, and innovators
          </h2>

          <p className="text-[var(--muted-bright)] max-w-xl mx-auto text-base">
            Join 749+ student developers at CSMU. Expand your skills, collaborate on open-source projects, and attend cutting-edge workshops.
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
