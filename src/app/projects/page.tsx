"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { TiltCard } from "@/components/animation/TiltCard";

export default function ProjectsPage() {
  const [activeSlide, setActiveSlide] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      title: "GDG CSMU Official Website",
      category: "Web Platform",
      description:
        "The official community hub for GDG on Campus CSMU built with Next.js, TypeScript, and modern animation architecture.",
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "GSAP"],
      link: "/",
      status: "Active",
    },
    {
      title: "Chapter Event & Study Jam Portal",
      category: "Community Tools",
      description:
        "Collaborative registration and tracking platform for Google Cloud Study Jams, Web workshops, and AI bootcamps.",
      tags: ["React", "Cloud", "Firebase"],
      link: "/events",
      status: "Active",
    },
    {
      title: "INIT Hackathon Showcases",
      category: "Student Innovation",
      description:
        "Innovative student-led prototypes developed during CSMU hackathons and developer sprints using Google developer technologies.",
      tags: ["AI/ML", "Android", "Cloud"],
      link: "/events",
      status: "Archived",
    },
  ];

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const scrollLeft = scrollContainerRef.current.scrollLeft;
    const width = scrollContainerRef.current.clientWidth;
    const index = Math.round(scrollLeft / width);
    setActiveSlide(index);
  };

  const scrollToSlide = (index: number) => {
    if (!scrollContainerRef.current) return;
    const width = scrollContainerRef.current.clientWidth;
    scrollContainerRef.current.scrollTo({
      left: index * width,
      behavior: "smooth",
    });
    setActiveSlide(index);
  };

  return (
    <div className="subpage">
      <div className="subpage-content">
        <span className="section-index font-mono text-xs uppercase tracking-wider text-[var(--muted)]">
          {"// PROJECTS & SHOWCASE"}
        </span>

        <h1 className="mt-4">
          Community Projects
          <span>Real-world solutions built by student developers at CSMU</span>
        </h1>

        {/* DESKTOP VIEW: Grid with 3D TiltCards */}
        <div className="hidden md:grid mt-16 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <TiltCard key={project.title} maxTilt={9} scale={1.03} glare={true} className="h-full">
              <div className="modern-card p-8 flex flex-col justify-between space-y-6 group hover:border-[#4285F4] transition-all h-full">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[rgba(66,133,244,0.12)] text-[#8db1ff]">
                      {project.category}
                    </span>
                    <span className="font-mono text-xs text-[var(--muted)]">
                      {project.status}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[var(--white)] group-hover:text-[#8db1ff] transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-sm text-[var(--muted-bright)] leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-0.5 rounded-md font-mono text-[11px] bg-[var(--surface-highlight)] text-[var(--muted-bright)]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[var(--line)]">
                  <Link
                    href={project.link}
                    className="text-xs font-semibold text-[#8db1ff] hover:underline flex items-center justify-between"
                  >
                    <span>Explore Project</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>

        {/* MOBILE VIEW (RULE 1 #12): Swipeable Snap Carousel */}
        <div className="block md:hidden mt-12 space-y-6">
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-4 pb-4"
            style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}
          >
            {projects.map((project, i) => (
              <div
                key={project.title}
                className="w-full flex-none snap-center"
              >
                <div className="modern-card p-6 flex flex-col justify-between space-y-5 border border-[var(--card-border)] bg-[var(--surface-card)] rounded-2xl min-h-[340px]">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full text-[11px] font-mono font-semibold bg-[rgba(66,133,244,0.12)] text-[#8db1ff]">
                        {project.category}
                      </span>
                      <span className="font-mono text-xs text-[var(--muted)]">
                        0{i + 1} / 0{projects.length}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-[var(--white)]">
                      {project.title}
                    </h3>

                    <p className="text-xs text-[var(--muted-bright)] leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.tags.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded font-mono text-[10px] bg-[var(--surface-highlight)] text-[var(--muted-bright)]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[var(--line)]">
                    <Link
                      href={project.link}
                      className="text-xs font-semibold text-[#8db1ff] flex items-center justify-between py-1"
                    >
                      <span>Explore Project</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel controls: Dots + Arrows */}
          <div className="flex items-center justify-between px-2 pt-2">
            <div className="flex items-center gap-2">
              {projects.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeSlide === idx ? "w-6 bg-[#4285F4]" : "w-2 bg-[var(--line)]"
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollToSlide(Math.max(0, activeSlide - 1))}
                disabled={activeSlide === 0}
                aria-label="Previous project"
                className="p-2 rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--white)] disabled:opacity-30 disabled:pointer-events-none"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollToSlide(Math.min(projects.length - 1, activeSlide + 1))}
                disabled={activeSlide === projects.length - 1}
                aria-label="Next project"
                className="p-2 rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--white)] disabled:opacity-30 disabled:pointer-events-none"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Submit project CTA */}
        <section className="mt-20 modern-card p-8 md:p-10 text-center space-y-4 border border-[var(--card-border)] bg-[var(--surface-card)] rounded-3xl">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[var(--white)]">
            Have a project to showcase?
          </h2>
          <p className="text-[var(--muted-bright)] max-w-xl mx-auto text-sm leading-relaxed">
            We love highlighting projects built by CSMU developers. Reach out to the technical team to get your project featured.
          </p>
          <div className="pt-2">
            <Link href="/contact" className="button button-primary">
              <span>Submit Your Project</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
