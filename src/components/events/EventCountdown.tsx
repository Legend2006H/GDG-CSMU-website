"use client";

import React, { useEffect, useState, useSyncExternalStore } from "react";
import { Calendar, Clock, ExternalLink } from "lucide-react";

interface EventCountdownProps {
  targetDate: string; // ISO string e.g. "2026-11-17T10:30:00+05:30"
  eventTitle: string;
  location: string;
  description: string;
}

function subscribe() {
  return () => {};
}

function getClientSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

export function EventCountdown({
  targetDate,
  eventTitle,
  location,
  description,
}: EventCountdownProps) {
  const isMounted = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);

  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>(() => {
    const target = new Date(targetDate).getTime();
    const now = new Date().getTime();
    const difference = target - now;
    if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
    };
  });

  useEffect(() => {
    const target = new Date(targetDate).getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  // Google Calendar pre-filled URL (UTC dates: 20261117T050000Z to 20261117T080000Z for 10:30 AM to 1:30 PM IST)
  const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    eventTitle
  )}&dates=20261117T050000Z/20261117T080000Z&details=${encodeURIComponent(
    description
  )}&location=${encodeURIComponent(location)}`;

  if (!isMounted) {
    return null;
  }

  return (
    <div className="pt-2 space-y-3">
      <div className="flex items-center gap-2 text-xs font-mono text-[var(--muted)]">
        <Clock className="w-3.5 h-3.5 text-[#FBBC04]" />
        <span>STARTS IN:</span>
      </div>

      <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-sm">
        <div className="p-2.5 rounded-xl bg-[var(--surface-highlight)] border border-[var(--card-border)] text-center">
          <span className="block text-xl sm:text-2xl font-bold font-mono text-[var(--white)] leading-tight">
            {String(timeLeft.days).padStart(2, "0")}
          </span>
          <span className="text-[10px] font-mono text-[var(--muted)] uppercase tracking-wider">
            Days
          </span>
        </div>
        <div className="p-2.5 rounded-xl bg-[var(--surface-highlight)] border border-[var(--card-border)] text-center">
          <span className="block text-xl sm:text-2xl font-bold font-mono text-[var(--white)] leading-tight">
            {String(timeLeft.hours).padStart(2, "0")}
          </span>
          <span className="text-[10px] font-mono text-[var(--muted)] uppercase tracking-wider">
            Hours
          </span>
        </div>
        <div className="p-2.5 rounded-xl bg-[var(--surface-highlight)] border border-[var(--card-border)] text-center">
          <span className="block text-xl sm:text-2xl font-bold font-mono text-[var(--white)] leading-tight">
            {String(timeLeft.minutes).padStart(2, "0")}
          </span>
          <span className="text-[10px] font-mono text-[var(--muted)] uppercase tracking-wider">
            Mins
          </span>
        </div>
        <div className="p-2.5 rounded-xl bg-[var(--surface-highlight)] border border-[var(--card-border)] text-center">
          <span className="block text-xl sm:text-2xl font-bold font-mono text-[var(--white)] leading-tight">
            {String(timeLeft.seconds).padStart(2, "0")}
          </span>
          <span className="text-[10px] font-mono text-[var(--muted)] uppercase tracking-wider">
            Secs
          </span>
        </div>
      </div>

      <div className="pt-1">
        <a
          href={gcalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-[#8db1ff] hover:text-[var(--white)] transition-colors py-1"
        >
          <Calendar className="w-3.5 h-3.5 text-[#4285F4]" />
          <span>Add to Google Calendar</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}
