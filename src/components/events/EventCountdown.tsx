"use client";

import React, { useSyncExternalStore } from "react";
import { Clock, CalendarDays } from "lucide-react";

interface EventCountdownProps {
  targetDate: string;
  eventTitle: string;
  location: string;
  description: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function subscribe(callback: () => void) {
  const interval = window.setInterval(callback, 1000);
  return () => window.clearInterval(interval);
}

function getSnapshot() {
  return Math.floor(Date.now() / 1000);
}

function getServerSnapshot() {
  return 0;
}

function calculateTimeLeft(diffMs: number): TimeLeft {
  const diff = Math.max(0, diffMs);
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1_000),
  };
}

export function EventCountdown({ targetDate, eventTitle, location, description }: EventCountdownProps) {
  const currentSec = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const target = new Date(targetDate).getTime();
  const isClient = currentSec > 0;
  const nowMs = isClient ? currentSec * 1000 : target;
  const eventHasStarted = isClient && nowMs >= target;
  const timeLeft = isClient ? calculateTimeLeft(target - nowMs) : { days: 0, hours: 0, minutes: 0, seconds: 0 };

  const timestamp = new Intl.DateTimeFormat("en-IN", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
    timeZoneName: "short",
  }).format(new Date(targetDate));

  const units: Array<{ label: string; value: number }> = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Mins", value: timeLeft.minutes },
    { label: "Secs", value: timeLeft.seconds },
  ];

  return (
    <div className="pt-2 space-y-3" aria-live="off">
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[var(--muted)]">
        <span className="inline-flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 text-[#FBBC04]" />
          <span>{eventHasStarted ? "EVENT STARTED" : "COUNTDOWN TO ORIENTATION"}</span>
        </span>
        <span className="text-[#8db1ff]">Live · IST</span>
      </div>

      <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-md">
        {units.map((unit) => (
          <div key={unit.label} className="p-2.5 rounded-xl bg-[var(--surface-highlight)] border border-[var(--card-border)] text-center">
            <span className="block text-xl sm:text-2xl font-bold font-mono text-[var(--white)] leading-tight tabular-nums">
              {String(unit.value).padStart(2, "0")}
            </span>
            <span className="text-[10px] font-mono text-[var(--muted)] uppercase tracking-wider">{unit.label}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-1 text-xs font-mono text-[var(--muted)]">
        <span className="inline-flex items-center gap-2 text-[var(--muted-bright)]">
          <CalendarDays className="w-3.5 h-3.5 text-[#4285F4]" />
          <time dateTime={targetDate}>{timestamp}</time>
        </span>
        <span className="sr-only">{eventTitle}. {location}. {description}</span>
      </div>
    </div>
  );
}
