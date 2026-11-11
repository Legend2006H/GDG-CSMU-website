"use client";

import React from "react";
import Link from "next/link";
import { Globe, Cpu, Layers, Sparkles, Palette, Trophy, ArrowRight, Code } from "lucide-react";

export default function TechnologiesPage() {
  const techAreas = [
    {
      id: "web",
      title: "Web Development",
      description: "Modern full-stack web applications, component design systems, and cloud-native frontend architectures.",
      icon: Globe,
      color: "#4285F4",
      topics: ["React", "Angular", "Next.js", "TypeScript", "Tailwind CSS"],
    },
    {
      id: "android",
      title: "Android Development",
      description: "Native and modern Android app development leveraging Google's official frameworks and tools.",
      icon: Cpu,
      color: "#34A853",
      topics: ["Kotlin", "Jetpack Compose", "Android Studio", "Firebase"],
    },
    {
      id: "cloud",
      title: "Cloud & DevOps",
      description: "Scalable cloud infrastructure, container orchestration, and automated deployment pipelines.",
      icon: Layers,
      color: "#EA4335",
      topics: ["Google Cloud Platform", "Docker", "Kubernetes", "CI/CD"],
    },
    {
      id: "ai",
      title: "AI / ML",
      description: "Intelligent systems, neural network modeling, and production-ready machine learning solutions.",
      icon: Sparkles,
      color: "#FBBC04",
      topics: ["TensorFlow", "PyTorch", "Machine Learning", "Deep Learning"],
    },
    {
      id: "uiux",
      title: "UI/UX Design",
      description: "User-centric interface prototyping, design tokens, design systems, and interactive research.",
      icon: Palette,
      color: "#EA4335",
      topics: ["Figma", "Material Design", "User Research", "Prototyping"],
    },
    {
      id: "cp",
      title: "Competitive Programming",
      description: "Algorithmic thinking, optimized data structures, competitive contest strategies, and problem solving.",
      icon: Trophy,
      color: "#4285F4",
      topics: ["Algorithms", "Data Structures", "Problem Solving", "Contests"],
    },
  ];

  return (
    <div className="subpage">
      <div className="subpage-content">
        <span className="section-index font-mono text-xs uppercase tracking-wider text-[var(--muted)]">
          {"// DOMAINS"}
        </span>

        <h1 className="mt-4">
          Technologies We Explore
          <span>Dive into the latest technologies and frameworks with expert guidance</span>
        </h1>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {techAreas.map((area) => {
            const Icon = area.icon;
            return (
              <div
                key={area.title}
                id={area.id}
                className="modern-card p-8 flex flex-col justify-between group hover:border-[var(--white)] transition-all relative overflow-hidden scroll-mt-28"
              >
                <div
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{ backgroundColor: area.color }}
                />

                <div className="space-y-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${area.color}15`, color: area.color }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-2xl font-bold text-[var(--white)]">
                    {area.title}
                  </h3>

                  <p className="text-sm text-[var(--muted-bright)] leading-relaxed">
                    {area.description}
                  </p>

                  <div className="pt-2">
                    <span className="font-mono text-[11px] text-[var(--muted)] uppercase tracking-wider block mb-2.5">
                      Key Topics
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {area.topics.map((topic) => (
                        <span
                          key={topic}
                          className="px-2.5 py-1 rounded-full text-xs font-mono bg-[var(--surface-highlight)] text-[var(--white)] border border-[var(--line)]"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-[var(--line)] flex items-center justify-between text-xs font-mono text-[var(--muted)]">
                  <span>Google Developer Group CSMU</span>
                  <Code className="w-4 h-4 opacity-40" />
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <section className="mt-20 modern-card p-10 md:p-12 text-center space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--white)]">
            Want to learn and build with us?
          </h2>
          <p className="text-[var(--muted-bright)] text-sm max-w-lg mx-auto">
            Choose your interest area and join hands-on workshops, hackathons, and study jams led by GDG CSMU.
          </p>
          <div className="pt-2">
            <Link href="/community" className="button button-primary">
              <span>Join Community</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
