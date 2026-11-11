"use client";

import { useEffect, useRef } from "react";

/** Reveals the source's long-form text as the reader scrolls through it. */
export function ScrollText({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const words = text.trim().split(/\s+/);
    node.innerHTML = words.map((word) => `<span class="scroll-word">${word.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")}</span>`).join(" ");
    const spans = [...node.querySelectorAll<HTMLElement>(".scroll-word")];
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = node.getBoundingClientRect();
        const progress = Math.min(1, Math.max(0, (window.innerHeight * 0.8 - rect.top) / (rect.height + window.innerHeight * 0.8)));
        const count = Math.floor(progress * spans.length);
        spans.forEach((span, index) => span.classList.toggle("is-read", index < count));
      });
    };
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [text]);
  return <p ref={ref} className={`scroll-text ${className}`} aria-label={text}>{text}</p>;
}

export function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        node.classList.add("is-visible");
        observer.unobserve(node);
      }
    }, { threshold: 0.12, rootMargin: "0px 0px -5% 0px" });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`} style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}>{children}</div>;
}

/** Reveal a larger page section when it enters the viewport. */
export function SectionReveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        node.classList.add("is-visible");
        observer.unobserve(node);
      }
    }, { threshold: 0.08, rootMargin: "0px 0px -4% 0px" });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return <section ref={ref} className={`section-reveal ${className}`} style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}>{children}</section>;
}
