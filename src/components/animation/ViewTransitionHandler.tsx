"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

export function ViewTransitionHandler() {
  const pathname = usePathname();
  const prevPathname = useRef(pathname);

  useEffect(() => {
    if (prevPathname.current === pathname) return;
    prevPathname.current = pathname;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // If native document.startViewTransition is supported, let the browser handle it
    // Next.js client router updates trigger this effect on navigation
    const mainEl = document.querySelector("main");
    if (!mainEl) return;

    // 0.8s - 1.0s clean crossfade / slide up
    gsap.fromTo(
      mainEl,
      { opacity: 0.2, y: 12 },
      {
        opacity: 1,
        y: 0,
        duration: 0.85,
        ease: "power3.out",
        clearProps: "all",
      }
    );
  }, [pathname]);

  return null;
}

