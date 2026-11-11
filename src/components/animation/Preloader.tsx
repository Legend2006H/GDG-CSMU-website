"use client";

import React, { useEffect, useRef, useSyncExternalStore } from "react";
import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

// Module-level guard: ensures preloader NEVER renders more than once per browser tab session
let sessionPreloaderDone = false;

function subscribe() {
  return () => {};
}

function getClientSnapshot() {
  if (sessionPreloaderDone) return false;
  try {
    if (sessionStorage.getItem("gdg_csmu_preloader_shown") === "true") {
      sessionPreloaderDone = true;
      return false;
    }
  } catch {}

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) {
    sessionPreloaderDone = true;
    return false;
  }

  sessionPreloaderDone = true;
  try {
    sessionStorage.setItem("gdg_csmu_preloader_shown", "true");
  } catch {}

  return true;
}

function getServerSnapshot() {
  return false;
}

export function Preloader() {
  const shouldRender = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
  const curtainRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!shouldRender) return;

    gsap.registerPlugin(DrawSVGPlugin);

    const counterObj = { value: 0 };
    const curtain = curtainRef.current;
    const path = pathRef.current;
    const counter = counterRef.current;

    if (!curtain || !path) return;

    // Initial state: drawSVG "0%"
    gsap.set(path, { drawSVG: "0%" });

    const tl = gsap.timeline({
      onComplete: () => {
        if (curtain) {
          curtain.style.display = "none";
          curtain.remove();
        }
      },
    });

    // Animate counter 0 -> 100 and drawSVG 0% -> 100% in 0.8s
    tl.to(
      counterObj,
      {
        value: 100,
        duration: 0.8,
        ease: "power2.inOut",
        onUpdate: () => {
          if (counter) {
            counter.innerText = Math.round(counterObj.value).toString();
          }
        },
      },
      0
    );

    tl.to(
      path,
      {
        drawSVG: "100%",
        duration: 0.8,
        ease: "power2.inOut",
      },
      0
    );

    // Short pause: 0.15s
    tl.to({}, { duration: 0.15 });

    // Curtain wipe up: 0.5s expo.inOut
    tl.to(curtain, {
      clipPath: "inset(0 0 100% 0)",
      duration: 0.5,
      ease: "power3.inOut",
    });

    // Safety timeout: hard cap at 1.8s
    const fallbackTimer = setTimeout(() => {
      if (curtain) {
        curtain.style.display = "none";
        curtain.remove();
      }
    }, 1800);

    return () => {
      clearTimeout(fallbackTimer);
      tl.kill();
    };
  }, [shouldRender]);

  if (!shouldRender) return null;

  return (
    <aside
      ref={curtainRef}
      aria-label="Loading GDG CSMU"
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[var(--bg)] text-[var(--white)]"
      style={{ clipPath: "inset(0 0 0% 0)" }}
    >
      <div className="flex flex-col items-center gap-6">
        {/* GDG Chevron / Bracket SVG drawn via DrawSVG */}
        <div className="w-20 h-20 relative flex items-center justify-center">
          <svg
            viewBox="0 0 100 100"
            className="w-16 h-16 stroke-[#4285F4] fill-none"
            style={{ strokeWidth: 8, strokeLinecap: "round", strokeLinejoin: "round" }}
          >
            <path
              ref={pathRef}
              d="M65 15 L30 50 L65 85"
            />
          </svg>
        </div>

        {/* Counter readout */}
        <div className="flex items-center gap-1 font-mono text-xl sm:text-2xl font-bold tracking-wider text-[var(--white)]">
          <span ref={counterRef}>0</span>
          <span className="text-[#4285F4]">%</span>
        </div>

        <p className="font-mono text-xs text-[var(--muted)] tracking-widest uppercase">
          GDG on Campus CSMU
        </p>
      </div>
    </aside>
  );
}
