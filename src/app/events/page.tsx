"use client";

import React, { useState } from "react";
import Image from "next/image";
import eventsData from "@/data/events.json";
import { EventItem } from "@/types/gdg";
import { Calendar, MapPin, Users, ExternalLink, X, Clock, AlertCircle } from "lucide-react";
import { TiltCard } from "@/components/animation/TiltCard";
import { EventCountdown } from "@/components/events/EventCountdown";

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  const upcomingEvents = eventsData.upcoming as EventItem[];
  const pastEvents = eventsData.past as EventItem[];

  return (
    <div className="subpage">
      <div className="subpage-content">
        <span className="section-index font-mono text-xs uppercase tracking-wider text-[var(--muted)]">
          {"// EVENTS & WORKSHOPS"}
        </span>

        <h1 className="mt-4">
          Events &amp; Workshops
          <span>Join our tech events, workshops, and community meetups</span>
        </h1>

        {/* Upcoming Events Section */}
        <section className="mt-16">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[var(--white)]">
              Upcoming Events
            </h2>
            <span className="font-mono text-xs text-[#4285F4]">
              {upcomingEvents.length} upcoming
            </span>
          </div>

          {upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {upcomingEvents.map((event) => (
                <TiltCard key={event.id} maxTilt={7} scale={1.02} glare={true} className="h-full">
                  <div
                    data-cursor="VIEW"
                    onClick={() => setSelectedEvent(event)}
                    className="modern-card p-6 md:p-8 cursor-pointer flex flex-col justify-between group hover:border-[#4285F4] transition-all h-full"
                  >
                    <div className="space-y-4">
                      <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-[var(--surface-highlight)]">
                        <Image
                          src={event.image}
                          alt={event.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div className="absolute top-3 left-3 bg-[#4285F4] text-white font-mono text-[11px] font-semibold px-2.5 py-1 rounded-full">
                          {event.status}
                        </div>
                      </div>

                      <h3 className="text-xl md:text-2xl font-bold text-[var(--white)] group-hover:text-[#8db1ff] transition-colors">
                        {event.title}
                      </h3>

                      <p className="text-sm text-[var(--muted-bright)] line-clamp-2">
                        {event.description}
                      </p>

                      <div className="space-y-2 pt-2 font-mono text-xs text-[var(--muted)]">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-[#EA4335]" />
                          <span>{event.displayDate}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-[#FBBC04]" />
                          <span>Time: {event.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-[#34A853]" />
                          <span>Location: {event.location}</span>
                        </div>
                      </div>

                      {/* Live Countdown & Add to Calendar */}
                      <EventCountdown
                        targetDate={event.date + "T10:30:00+05:30"}
                        eventTitle={event.title}
                        location={event.location}
                        description={event.description}
                      />
                    </div>

                    <div className="mt-6 pt-4 border-t border-[var(--line)] flex items-center justify-between text-xs font-semibold text-[#8db1ff]">
                      <span>View Event Details &amp; Register</span>
                      <span>→</span>
                    </div>
                  </div>
                </TiltCard>
              ))}
            </div>
          ) : (
            <div className="modern-card p-8 text-center text-[var(--muted)] font-mono text-sm">
              No upcoming events yet.
            </div>
          )}
        </section>

        {/* Past Events Section */}
        <section className="mt-24">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[var(--white)]">
              Past Events
            </h2>
            <span className="font-mono text-xs text-[var(--muted)]">
              {pastEvents.length} archived
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pastEvents.map((event) => (
              <TiltCard key={event.id} maxTilt={7} scale={1.02} glare={true} className="h-full">
                <div
                  data-cursor="VIEW"
                  onClick={() => setSelectedEvent(event)}
                  className="modern-card p-6 md:p-8 cursor-pointer flex flex-col justify-between group hover:border-[var(--line)] transition-all h-full"
                >
                  <div className="space-y-4">
                    <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-[var(--surface-highlight)]">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute top-3 left-3 bg-[#222]/80 backdrop-blur-md text-[#bbb] font-mono text-[11px] font-semibold px-2.5 py-1 rounded-full border border-white/10">
                        {event.status}
                      </div>
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold text-[var(--white)] group-hover:text-[#8db1ff] transition-colors">
                      {event.title}
                    </h3>

                    <p className="text-sm text-[var(--muted-bright)] line-clamp-2">
                      {event.description}
                    </p>

                    <div className="space-y-2 pt-2 font-mono text-xs text-[var(--muted)]">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[#EA4335]" />
                        <span>{event.displayDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#34A853]" />
                        <span>{event.location} · {event.mode}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-[#FBBC04]" />
                        <span>Attendance: {event.expectedAttendees}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[var(--line)] flex items-center justify-between text-xs font-semibold text-[var(--muted)] group-hover:text-[var(--white)]">
                    <span>View Event Details</span>
                    <span>→</span>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </section>

        {/* Modal for Event Details */}
        {selectedEvent && (
          <div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedEvent(null)}
          >
            <div
              className="bg-[var(--surface-card)] border border-[var(--card-border)] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 space-y-6 shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-6 right-6 p-2 rounded-full bg-[var(--surface-highlight)] text-[var(--white)] hover:opacity-80 transition-opacity"
                onClick={() => setSelectedEvent(null)}
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <TiltCard maxTilt={8} scale={1.02} glare={true} className="rounded-2xl">
                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-black/90 border border-white/20 shadow-lg">
                  <Image
                    src={selectedEvent.image}
                    alt={selectedEvent.title}
                    fill
                    className="object-contain"
                  />
                  {/* Glass sheen */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/15 pointer-events-none" />
                </div>
              </TiltCard>

              <div className="space-y-3">
                <div className="inline-block px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[var(--surface-highlight)] text-[var(--muted-bright)]">
                  {selectedEvent.status}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-[var(--white)]">
                  {selectedEvent.title}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 border-y border-[var(--line)] font-mono text-xs text-[var(--muted-bright)]">
                <div>
                  <span className="text-[var(--muted)] block mb-1">DATE</span>
                  <span className="font-semibold text-[var(--white)]">{selectedEvent.displayDate}</span>
                </div>
                <div>
                  <span className="text-[var(--muted)] block mb-1">LOCATION &amp; MODE</span>
                  <span className="font-semibold text-[var(--white)]">{selectedEvent.location} ({selectedEvent.mode})</span>
                </div>
                <div>
                  <span className="text-[var(--muted)] block mb-1">SPEAKER</span>
                  <span className="font-semibold text-[var(--white)]">{selectedEvent.speaker}</span>
                </div>
                <div>
                  <span className="text-[var(--muted)] block mb-1">
                    {selectedEvent.status === "Registration Open" || selectedEvent.status === "Upcoming"
                      ? "EXPECTED ATTENDEES"
                      : "ATTENDANCE"}
                  </span>
                  <span className="font-semibold text-[var(--white)]">{selectedEvent.expectedAttendees}</span>
                </div>
              </div>

              {/* Countdown inside modal for upcoming events */}
              {(selectedEvent.status === "Registration Open" || selectedEvent.status === "Upcoming") && (
                <div className="p-4 rounded-2xl bg-[var(--surface-highlight)] border border-[var(--card-border)]">
                  <EventCountdown
                    targetDate={selectedEvent.date + "T10:30:00+05:30"}
                    eventTitle={selectedEvent.title}
                    location={selectedEvent.location}
                    description={selectedEvent.description}
                  />
                </div>
              )}

              <div className="space-y-2">
                <h4 className="text-sm font-bold uppercase tracking-wider text-[var(--muted)] font-mono">
                  About Event
                </h4>
                <p className="text-base text-[var(--white)] leading-relaxed">
                  {selectedEvent.description}
                </p>
              </div>

              <div className="pt-2">
                {selectedEvent.registrationLink && selectedEvent.registrationLink.startsWith("http") ? (
                  <a
                    href={selectedEvent.registrationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button button-primary w-full"
                  >
                    <span>Register Now (Form)</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                ) : selectedEvent.registrationLink === "xyxxx" ? (
                  <div className="p-3 rounded-xl bg-[var(--surface-highlight)] text-center text-xs font-mono text-[var(--muted)]">
                    Registration Closed (Past Event)
                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-[var(--surface-highlight)] text-center text-xs font-mono text-[var(--muted-bright)] flex items-center justify-center gap-2">
                    <AlertCircle className="w-4 h-4 text-[#FBBC04]" />
                    <span>Registration: To be confirmed</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
