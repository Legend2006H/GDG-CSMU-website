"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, FolderGit2 } from "lucide-react";

export default function ProjectsPage() {
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

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.title}
              className="modern-card p-8 flex flex-col justify-between space-y-6 group hover:border-[#4285F4] transition-all"
            >
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
          ))}
        </div>

        {/* Submit project CTA */}
        <section className="mt-20 modern-card p-10 text-center space-y-4 border border-[var(--card-border)] bg-[var(--surface-card)] rounded-3xl">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-[rgba(52,168,83,0.1)] text-[#34A853] flex items-center justify-center">
            <FolderGit2 className="w-6 h-6" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--white)]">
            Building something with Google technologies?
          </h2>
          <p className="text-[var(--muted-bright)] text-sm max-w-lg mx-auto">
            Share your projects with the CSMU community, receive feedback from mentors, and showcase your work.
          </p>
          <div className="pt-2">
            <Link href="/community" className="button button-primary">
              <span>Submit a Project</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
