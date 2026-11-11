"use client";

import React from "react";
import Image from "next/image";
import teamData from "@/data/team.json";
import { TeamMember } from "@/types/gdg";
import { Mail, User } from "lucide-react";

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

export default function TeamPage() {
  const currentTeam = teamData.current as TeamMember[];
  const pastLead = teamData.past.lead as TeamMember[];
  const pastTechnicalHeads = teamData.past.technicalHeads as TeamMember[];
  const pastCoreTeam = teamData.past.coreTeam as TeamMember[];

  const renderMemberCard = (member: TeamMember, highlight = false) => {
    return (
      <div
        key={member.name}
        className={`modern-card p-6 flex flex-col justify-between group transition-all ${
          highlight ? "border-[#4285F4] bg-[rgba(66,133,244,0.03)]" : ""
        }`}
      >
        <div className="space-y-4">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-[var(--surface-highlight)] border border-[var(--line)]">
            {member.photo ? (
              <Image
                src={member.photo}
                alt={member.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-[var(--muted)] bg-[var(--surface-highlight)]">
                <User className="w-16 h-16 opacity-40" />
                <span className="font-mono text-xs mt-2 text-[var(--muted)]">GDG CSMU</span>
              </div>
            )}
          </div>

          <div>
            <h3 className="text-xl font-bold text-[var(--white)] group-hover:text-[#8db1ff] transition-colors">
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

        {/* Social Links */}
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
          {!member.linkedin && !member.github && !member.email && (
            <span className="font-mono text-[11px] text-[var(--muted)]">Core Contributor</span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="subpage">
      <div className="subpage-content">
        <span className="section-index font-mono text-xs uppercase tracking-wider text-[var(--muted)]">
          {"// OUR PEOPLE"}
        </span>

        <h1 className="mt-4">
          Meet Our Team
          <span>Passionate individuals driving innovation and community growth</span>
        </h1>

        {/* Current Team Section */}
        <section className="mt-16">
          <div className="mb-8">
            <span className="font-mono text-xs text-[#4285F4] uppercase tracking-wider font-semibold">
              {"// CURRENT LEADERSHIP"}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[var(--white)] mt-1">
              Current Team
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentTeam.map((member) => renderMemberCard(member, true))}
          </div>
        </section>

        {/* Past Team Section */}
        <section className="mt-24 border-t border-[var(--line)] pt-16">
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
              {pastLead.map((member) => renderMemberCard(member))}
            </div>
          </div>

          {/* Technical Heads */}
          <div className="space-y-6 mb-16">
            <h3 className="text-xl font-bold tracking-tight text-[var(--white)] font-mono text-sm uppercase text-[#34A853]">
              Technical Heads
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastTechnicalHeads.map((member) => renderMemberCard(member))}
            </div>
          </div>

          {/* Core Team */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold tracking-tight text-[var(--white)] font-mono text-sm uppercase text-[#FBBC04]">
              Core Team
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastCoreTeam.map((member) => renderMemberCard(member))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
