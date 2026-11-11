"use client";

import React, { useEffect, useRef, useSyncExternalStore } from "react";
import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getSnapshot() {
  if (typeof window === "undefined") return true; // hidden on SSR
  const hasVisited = sessionStorage.getItem("gdg_csmu_preloader_shown");
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return hasVisited !== null || prefersReduced;
}

function getServerSnapshot() {
  return true;
}

export function Preloader() {
  const isExcluded = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const curtainRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (isExcluded) return;

    // Register plugin
    gsap.registerPlugin(DrawSVGPlugin);

    let isDone = false;
    const counterObj = { value: 0 };

    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem("gdg_csmu_preloader_shown", "true");
        if (curtainRef.current) {
          curtainRef.current.style.display = "none";
        }
      },
    });

    // 1. Initial state: drawSVG "0%"
    if (pathRef.current) {
      gsap.set(pathRef.current, { drawSVG: "0%" });
    }

    // 2. Animate counter 0 -> 100 and drawSVG 0% -> 100%
    tl.to(
      counterObj,
      {
        value: 100,
        duration: 0.9,
        ease: "power2.inOut",
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.textContent = Math.round(counterObj.value).toString();
          }
        },
      },
      0
    );

    if (pathRef.current) {
      tl.to(
        pathRef.current,
        {
          drawSVG: "100%",
          duration: 0.9,
          ease: "power2.inOut",
        },
        0
      );
    }

    // 3. Wait for fonts & hero image or fallback hard cap (gated on document.fonts.ready, capped at 2.2s)
    const assetPromise = Promise.all([
      document.fonts ? document.fonts.ready : Promise.resolve(),
      new Promise((resolve) => {
        if (document.readyState === "complete") resolve(true);
        else window.addEventListener("load", () => resolve(true), { once: true });
      }),
    ]);

    const timeoutPromise = new Promise((resolve) => setTimeout(resolve, 2200));

    Promise.race([assetPromise, timeoutPromise]).then(() => {
      if (isDone) return;
      isDone = true;

      // Curtain lift with clip-path
      if (curtainRef.current) {
        tl.to(curtainRef.current, {
          clipPath: "inset(0 0 100% 0)",
          duration: 0.8,
          ease: "power3.inOut",
        });
      }
    });

    return () => {
      tl.kill();
    };
  }, [isExcluded]);

  if (isExcluded) return null;

  return (
    <aside
      ref={curtainRef}
      aria-label="Loading GDG CSMU"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#101010] text-white"
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
            {/* GDG Chevron bracket shape */}
            <path
              ref={pathRef}
              d="M65 15 L30 50 L65 85"
            />
          </svg>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs tracking-widest text-[#8db1ff]">
          <span>LOADING GDG CSMU</span>
          <span>[<span ref={counterRef}>0</span>%]</span>
        </div>
      </div>
    </aside>
  );
}
