"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useTheme } from "./theme-provider";
import { Sun, Moon, Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "Team", href: "/team" },
  { label: "Technologies", href: "/technologies" },
  { label: "Community", href: "/community" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);

  // Scroll progress indicator
  useEffect(() => {
    const header = document.querySelector<HTMLElement>(".topbar");
    if (!header) return;

    let frame = 0;
    const updateProgress = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const progress = max > 0 ? (window.scrollY / max) * 100 : 0;
        header.style.setProperty("--scroll-progress", `${progress}%`);
      });
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    updateProgress();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <>
      <header className="topbar">
        {/* Brand */}
        <Link className="brand" href="/" onClick={() => setOpen(false)}>
          <div className="flex items-center gap-2">
            <div className="relative w-7 h-7 flex-none">
              <Image
                src="/images/gdg-logo.png"
                alt="GDG CSMU Logo"
                width={28}
                height={28}
                className="object-contain"
                style={{ width: "auto", height: "auto" }}
                priority
              />
            </div>
            <span className="font-bold tracking-tight text-sm">GDG CSMU</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="desktop-nav" aria-label="Primary navigation">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-colors duration-200 text-xs tracking-wider ${
                  isActive ? "text-white font-semibold" : "text-[#aaa] hover:text-white"
                }`}
              >
                &lt; {item.label} &gt;
              </Link>
            );
          })}

          {/* Light / Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            className="theme-toggle-btn p-1.5 rounded-full border border-[rgba(255,255,255,0.15)] text-[#aaa] hover:text-white hover:border-[rgba(255,255,255,0.4)] transition-all cursor-pointer"
          >
            {theme === "dark" ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>
        </nav>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            className="p-1.5 rounded-full border border-[rgba(255,255,255,0.15)] text-[#aaa] hover:text-white transition-all cursor-pointer"
          >
            {theme === "dark" ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>

          <button
            className="menu-toggle cursor-pointer"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-[#ddd]" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {open && (
        <div
          className="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <div className="flex items-center justify-between">
            <span className="menu-label font-mono text-xs text-[var(--muted)]">&lt;menu /&gt;</span>
            <button
              className="menu-close text-2xl text-[var(--white)] cursor-pointer"
              aria-label="Close navigation menu"
              onClick={() => setOpen(false)}
            >
              ×
            </button>
          </div>

          <nav aria-label="Mobile primary navigation" className="mt-8 flex flex-col">
            {NAV_ITEMS.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-4 border-b border-[var(--line)] text-[var(--white)] flex items-center justify-between text-2xl font-semibold tracking-tight hover:text-[#4285F4] transition-colors"
                style={{ "--item-index": i } as React.CSSProperties}
              >
                <span>{item.label}</span>
                <small className="font-mono text-xs text-[var(--muted)]">
                  {String(i + 1).padStart(2, "0")}
                </small>
              </Link>
            ))}
          </nav>

          <div className="mt-auto pt-8 flex items-center justify-between text-xs text-[var(--muted)] font-mono">
            <span>GDG on Campus CSMU</span>
            <button
              onClick={toggleTheme}
              className="px-3 py-1.5 rounded-full border border-[var(--line)] text-[var(--muted-bright)] hover:text-[var(--white)] flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              {theme === "dark" ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
              <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
