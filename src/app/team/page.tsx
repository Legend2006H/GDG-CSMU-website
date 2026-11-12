"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import teamData from "@/data/team.json";
import { TeamMember, TeamData } from "@/types/gdg";
import { Mail } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TiltCard } from "@/components/animation/TiltCard";

function LinkedInIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28Z" />
    </svg>
  );
}

function GitHubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z"
      />
    </svg>
  );
}

function getInitials(name: string) {
  const parts = name.trim().split(" ");
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

export default function TeamPage() {
  const typedData = teamData as unknown as TeamData;
  const { current, past } = typedData;

  const floatingImgRef = useRef<HTMLDivElement>(null);
  const [hoveredPhoto, setHoveredPhoto] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // 9. Photo reveals: clip-path inset(100% 0 0 0) -> inset(0), inner image scale 1.3 -> 1, expo.out 1.0s
    const containers = document.querySelectorAll<HTMLElement>(".team-photo-container");
    containers.forEach((container) => {
      const img = container.querySelector("img");
      if (prefersReducedMotion) {
        gsap.set(container, { clipPath: "inset(0% 0 0 0)" });
        if (img) gsap.set(img, { scale: 1 });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });

      tl.fromTo(
        container,
        { clipPath: "inset(100% 0 0 0)" },
        {
          clipPath: "inset(0% 0 0 0)",
          duration: 1.0,
          ease: "expo.out",
        },
        0
      );

      if (img) {
        tl.fromTo(
          img,
          { scale: 1.3 },
          {
            scale: 1,
            duration: 1.0,
            ease: "expo.out",
          },
          0
        );
      }
    });

    // Desktop only floating cursor photo trail
    const isDesktop = window.matchMedia("(pointer: fine) and (hover: hover)").matches;
    if (isDesktop && !prefersReducedMotion && floatingImgRef.current) {
      const floatEl = floatingImgRef.current;
      const xTo = gsap.quickTo(floatEl, "x", { duration: 0.35, ease: "power3.out" });
      const yTo = gsap.quickTo(floatEl, "y", { duration: 0.35, ease: "power3.out" });

      const handleMove = (e: MouseEvent) => {
        xTo(e.clientX + 20);
        yTo(e.clientY + 20);
      };

      window.addEventListener("mousemove", handleMove);
      return () => {
        window.removeEventListener("mousemove", handleMove);
      };
    }
  }, []);

  const [activeMobilePhoto, setActiveMobilePhoto] = useState<string | null>(null);

  const renderMemberCard = (member: TeamMember, highlight = false) => {
    const initials = getInitials(member.name);

    return (
      <TiltCard key={member.name} maxTilt={9} scale={1.02} glare={true} className="h-full">
        <div
          onClick={() => {
            if (member.photo) {
              setActiveMobilePhoto((prev) => (prev === member.photo ? null : member.photo || null));
            }
          }}
          onMouseEnter={() => {
            if (member.photo) setHoveredPhoto(member.photo);
          }}
          onMouseLeave={() => setHoveredPhoto(null)}
          className={`modern-card p-6 flex flex-col justify-between group transition-all h-full cursor-pointer ${
            highlight ? "border-[#4285F4]/40 bg-[rgba(66,133,244,0.02)]" : ""
          }`}
        >
          <div className="space-y-4">
            <div className="team-photo-container relative aspect-square rounded-2xl overflow-hidden bg-[var(--surface-highlight)] border border-[var(--line)] flex items-center justify-center">
              {member.photo ? (
                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500 will-change-transform"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-[var(--muted)] bg-gradient-to-br from-[var(--surface-highlight)] to-[var(--surface-card)] select-none">
                  <span className="font-mono text-3xl font-bold tracking-wider text-[var(--white)] opacity-70 group-hover:scale-110 group-hover:text-[#8db1ff] transition-all">
                    {initials}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--muted)] mt-2">
                    GDG CSMU
                  </span>
                </div>
              )}
            </div>

            <div>
              <h3 className="text-xl font-bold text-[var(--white)] group-hover:text-[#8db1ff] transition-colors cursor-default">
                {member.name}
              </h3>
              <p className="font-mono text-xs text-[#4285F4] mt-1">
                {member.role}
              </p>
              {member.tenure && (
                <p className="font-mono text-[11px] text-[var(--muted)] mt-0.5">
                  {member.tenure}
                </p>
              )}
            </div>
          </div>

          {/* Social Links (only shown if present) */}
          {(member.linkedin || member.github || member.email) ? (
            <div className="mt-5 pt-4 border-t border-[var(--line)] flex items-center gap-3 text-[var(--muted)]">
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name}'s LinkedIn profile`}
                  className="p-2 rounded-full hover:bg-[var(--surface-highlight)] hover:text-[#4285F4] transition-colors"
                >
                  <LinkedInIcon className="w-4 h-4" />
                </a>
              )}
              {member.github && (
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name}'s GitHub profile`}
                  className="p-2 rounded-full hover:bg-[var(--surface-highlight)] hover:text-[var(--white)] transition-colors"
                >
                  <GitHubIcon className="w-4 h-4" />
                </a>
              )}
              {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  aria-label={`Email ${member.name}`}
                  className="p-2 rounded-full hover:bg-[var(--surface-highlight)] hover:text-[#EA4335] transition-colors"
                >
                  <Mail className="w-4 h-4" />
                </a>
              )}
            </div>
          ) : (
            <div className="mt-5 pt-4 border-t border-[var(--line)] flex items-center justify-between text-[var(--muted)] font-mono text-[11px]">
              <span>Core Member</span>
              <span className="text-[10px] text-[#4285F4]">GDG 2026</span>
            </div>
          )}
        </div>
      </TiltCard>
    );
  };

  return (
    <div className="subpage">
      {/* Desktop Floating Photo Follower (hidden on mobile and touch devices) */}
      <div
        ref={floatingImgRef}
        aria-hidden="true"
        className={`fixed pointer-events-none z-50 w-28 h-28 rounded-2xl overflow-hidden border-2 border-white shadow-2xl transition-opacity duration-200 hidden md:block ${
          hoveredPhoto ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
        style={{ top: 0, left: 0 }}
      >
        {hoveredPhoto && (
          <Image
            src={hoveredPhoto}
            alt=""
            fill
            className="object-cover"
          />
        )}
      </div>

      {/* Mobile Modal Photo Preview (tap a team photo = centred 3D glass preview, tap again to close) */}
      {activeMobilePhoto && (
        <div
          onClick={() => setActiveMobilePhoto(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-6 md:hidden animate-fade-in"
        >
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-xs flex flex-col items-center">
            <TiltCard maxTilt={14} scale={1.04} glare={true} className="w-full aspect-square">
              <div className="relative w-full h-full rounded-3xl overflow-hidden border border-white/30 bg-white/10 dark:bg-black/40 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.7)] p-2.5">
                <div className="relative w-full h-full rounded-2xl overflow-hidden bg-black/50">
                  <Image
                    src={activeMobilePhoto}
                    alt="Team member preview"
                    fill
                    className="object-cover"
                    priority
                  />
                  {/* Glass reflective diagonal sheen */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/25 pointer-events-none" />
                </div>
                {/* Close button */}
                <button
                  onClick={() => setActiveMobilePhoto(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/70 border border-white/30 backdrop-blur-md flex items-center justify-center text-white active:scale-95 transition-transform"
                  aria-label="Close preview"
                >
                  ✕
                </button>
              </div>
            </TiltCard>
            <p className="text-center font-mono text-[11px] text-white/70 mt-3 select-none">
              Touch to tilt in 3D · Tap outside to close
            </p>
          </div>
        </div>
      )}

      <div className="subpage-content">
        <span className="section-index font-mono text-xs uppercase tracking-wider text-[var(--muted)]">
          {"// OUR PEOPLE"}
        </span>

        <h1 className="mt-4">
          Meet Our Team
          <span>Passionate individuals driving innovation and community growth</span>
        </h1>

        {/* ========================================================
            NEW TEAM SECTION (Grouped as specified from Instagram)
            ======================================================== */}
        <div className="mt-16 space-y-16">
          {/* 1. Lead Organizers */}
          <section>
            <div className="mb-6">
              <span className="font-mono text-xs text-[#4285F4] uppercase tracking-wider font-semibold">
                {"// CHAPTER LEADERSHIP"}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[var(--white)] mt-1">
                Lead Organizers
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {current.leadOrganizers.map((member) => renderMemberCard(member, true))}
            </div>
          </section>

          {/* 2. Technical Team */}
          <section>
            <div className="mb-6">
              <span className="font-mono text-xs text-[#34A853] uppercase tracking-wider font-semibold">
                {"// ENGINEERING & DEVELOPMENT"}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[var(--white)] mt-1">
                Technical Team
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {current.technicalTeam.map((member) => renderMemberCard(member, true))}
            </div>
          </section>

          {/* 3. Event Management */}
          <section>
            <div className="mb-6">
              <span className="font-mono text-xs text-[#FBBC04] uppercase tracking-wider font-semibold">
                {"// OPERATIONS & LOGISTICS"}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[var(--white)] mt-1">
                Event Management
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {current.eventManagement.map((member) => renderMemberCard(member, true))}
            </div>
          </section>

          {/* 4. Graphic Designing */}
          <section>
            <div className="mb-6">
              <span className="font-mono text-xs text-[#EA4335] uppercase tracking-wider font-semibold">
                {"// DESIGN & BRANDING"}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[var(--white)] mt-1">
                Graphic Designing
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {current.graphicDesigning.map((member) => renderMemberCard(member, true))}
            </div>
          </section>

          {/* 5. PR & Media Team */}
          <section>
            <div className="mb-6">
              <span className="font-mono text-xs text-[#4285F4] uppercase tracking-wider font-semibold">
                {"// OUTREACH & COMMUNICATIONS"}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[var(--white)] mt-1">
                PR &amp; Media Team
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {current.prMedia.map((member) => renderMemberCard(member, true))}
            </div>
          </section>

          {/* 6. Sponsorship Team */}
          <section>
            <div className="mb-6">
              <span className="font-mono text-xs text-[#34A853] uppercase tracking-wider font-semibold">
                {"// CORPORATE RELATIONS & PARTNERSHIPS"}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[var(--white)] mt-1">
                Sponsorship Team
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {current.sponsorshipTeam.map((member) => renderMemberCard(member, true))}
            </div>
          </section>
        </div>

        {/* ========================================================
            PAST TEAM SECTION (Kept 100% as-is, all 9 past members)
            ======================================================== */}
        <section className="mt-28 border-t border-[var(--line)] pt-16">
          <div className="mb-12">
            <span className="font-mono text-xs text-[var(--muted)] uppercase tracking-wider font-semibold">
              {"// ARCHIVE & ALUMNI"}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--white)] mt-1">
              Past Team
            </h2>
            <p className="text-[var(--muted-bright)] text-sm mt-2">
              The founding leaders and core contributors who paved the way for GDG on Campus CSMU.
            </p>
          </div>

          {/* Lead */}
          <div className="space-y-6 mb-16">
            <h3 className="text-xl font-bold tracking-tight text-[var(--white)] font-mono text-sm uppercase text-[#4285F4]">
              Chapter Lead
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {past.lead.map((member) => renderMemberCard(member))}
            </div>
          </div>

          {/* Technical Heads */}
          <div className="space-y-6 mb-16">
            <h3 className="text-xl font-bold tracking-tight text-[var(--white)] font-mono text-sm uppercase text-[#34A853]">
              Technical Heads
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {past.technicalHeads.map((member) => renderMemberCard(member))}
            </div>
          </div>

          {/* Core Team */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold tracking-tight text-[var(--white)] font-mono text-sm uppercase text-[#FBBC04]">
              Core Team
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {past.coreTeam.map((member) => renderMemberCard(member))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
