"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import eventsData from "@/data/events.json";
import { EventItem } from "@/types/gdg";
import { Calendar, MapPin, Users, ExternalLink, X, Clock, AlertCircle, ArrowLeft } from "lucide-react";
import { TiltCard } from "@/components/animation/TiltCard";
import { EventCountdown } from "@/components/events/EventCountdown";

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  // Lock body scroll and prevent background scroll when modal is open
  useEffect(() => {
    if (!selectedEvent) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedEvent(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedEvent]);

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
                        targetDate={event.startAt || `${event.date}T11:00:00+05:30`}
                        eventTitle={event.title}
                        location={event.location}
                        description={event.description}
                      />
                    </div>

                    <div className="mt-6 pt-4 border-t border-[var(--line)] flex items-center justify-between text-xs font-semibold text-[#8db1ff]">
                      <span>{event.registrationLink ? "View Event Details & Register" : "View Event Details"}</span>
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
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overscroll-contain"
            onClick={() => setSelectedEvent(null)}
            data-lenis-prevent
          >
            <div
              className="bg-[var(--surface-card)] border border-[var(--card-border)] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto overscroll-contain touch-pan-y p-6 md:p-8 space-y-6 shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
              data-lenis-prevent
            >
              <div className="sticky top-0 z-30 flex justify-end pointer-events-none -mt-2 -mr-2">
                <button
                  type="button"
                  className="pointer-events-auto p-2.5 rounded-full bg-[var(--surface-highlight)]/90 backdrop-blur-md text-[var(--white)] hover:bg-[var(--surface-card)] hover:border-[var(--white)] transition-all border border-[var(--card-border)] shadow-lg cursor-pointer"
                  onClick={() => setSelectedEvent(null)}
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

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
                  <span className="text-[var(--muted)] block mb-1">TIME</span>
                  <span className="font-semibold text-[var(--white)]">{selectedEvent.time || "Time to be announced"}</span>
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
                    {selectedEvent.status === "Registration Open" || selectedEvent.status === "Upcoming" || selectedEvent.status === "Upcoming Orientation"
                      ? "EXPECTED ATTENDEES"
                      : "ATTENDANCE"}
                  </span>
                  <span className="font-semibold text-[var(--white)]">{selectedEvent.expectedAttendees}</span>
                </div>
              </div>

              {/* Countdown inside modal for upcoming events */}
              {(selectedEvent.status === "Registration Open" || selectedEvent.status === "Upcoming" || selectedEvent.status === "Upcoming Orientation") && (
                <div className="p-4 rounded-2xl bg-[var(--surface-highlight)] border border-[var(--card-border)]">
                  <EventCountdown
                    targetDate={selectedEvent.startAt || `${selectedEvent.date}T11:00:00+05:30`}
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

              <div className="pt-4 border-t border-[var(--line)] flex flex-col sm:flex-row items-center gap-3 w-full">
                {selectedEvent.registrationLink && selectedEvent.registrationLink.startsWith("http") ? (
                  <a
                    href={selectedEvent.registrationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button button-primary !h-12 w-full sm:!flex-1"
                  >
                    <span>Register Now (Form)</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                ) : selectedEvent.registrationLink === "xyxxx" ? (
                  <div className="button !h-12 w-full sm:!flex-1 opacity-60 cursor-not-allowed">
                    <span>Registration Closed (Past Event)</span>
                  </div>
                ) : (
                  <div className="button !h-12 w-full sm:!flex-1 text-[var(--muted-bright)]">
                    <AlertCircle className="w-4 h-4 text-[#FBBC04]" />
                    <span>Registration: To be confirmed</span>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => setSelectedEvent(null)}
                  className="button !h-12 w-full sm:!flex-1"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Go Back / Cancel</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
