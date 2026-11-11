import Link from "next/link";
import { SectionReveal } from "./scroll-motion";

const nav = [
  ["Sessions", "/en/session"],
  ["Projects", "/en/project"],
  ["Calendar", "/en/calendar"],
  ["Members", "/en/member"],
] as const;

export function SiteHeader() {
  return <header className="topbar"><Link className="brand" href="/"><span className="mini-mark" aria-hidden="true" />GDGoC Yonsei</Link><nav className="desktop-nav" aria-label="Primary navigation">{nav.map(([label, href]) => <Link key={href} href={href}>&lt; {label} &gt;</Link>)}<a href="https://gdgoc.yonsei.ac.kr/en/admin">&lt; GYMS &gt;</a><span className="language">EN <span>English</span><a href="https://gdgoc.yonsei.ac.kr/ko">KO 한국어</a></span></nav><nav className="route-mobile-nav" aria-label="Primary navigation">{nav.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</nav></header>;
}

export function SiteFooter() {
  return <footer className="footer"><div className="footer-top"><div className="footer-intro"><Link className="brand" href="/"><span className="mini-mark" aria-hidden="true" />GDGoC Yonsei</Link><p>GDG on Campus Yonsei, Yonsei University&apos;s student developer community in Sinchon, Seoul.</p></div><div className="footer-column"><h2>EXPLORE</h2>{nav.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</div><div className="footer-column"><h2>CONNECT</h2><a href="https://instagram.com/gdg.yonseiuniv/">Instagram ↗</a><a href="https://linkedin.com/company/gdsc-yonsei/">LinkedIn ↗</a><a href="mailto:gdsc.yonsei.univ@gmail.com">Email ↗</a></div><div className="footer-column"><h2>SITE</h2><a href="https://gdgoc.yonsei.ac.kr/en/admin">GYMS for members</a><a href="https://github.com/gdg-yonsei/gdgoc-yonsei-web">Source code ↗</a></div></div><div className="footer-bottom"><span>© 2026 GDG on Campus Yonsei. All rights reserved.</span><span>Sinchon, Seoul <i /> KST</span><a href="https://gdgoc.yonsei.ac.kr/ko">KO · 한국어</a></div></footer>;
}

export function PageFrame({ children, section }: { children: React.ReactNode; section: string }) {
  return <main className="subpage"><SiteHeader /><div className="subpage-content"><SectionReveal className="subpage-reveal"><span className="section-index">&lt;{section} /&gt;</span>{children}</SectionReveal></div><SiteFooter /></main>;
}

