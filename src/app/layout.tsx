import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/gdg/theme-provider";
import { Navbar } from "@/components/gdg/navbar";
import { Footer } from "@/components/gdg/footer";
import { SmoothScrollProvider } from "@/components/animation/SmoothScrollProvider";
import { Preloader } from "@/components/animation/Preloader";
import { ViewTransitionHandler } from "@/components/animation/ViewTransitionHandler";
import { TouchFollower } from "@/components/animation/TouchFollower";
import { CustomCursor } from "@/components/animation/CustomCursor";
import { GlobalMagnetic } from "@/components/animation/GlobalMagnetic";

export const metadata: Metadata = {
  title: "GDG CSMU | Google Developer Group on Campus CSMU",
  description:
    "Official Google Developers Group on Campus at CSMU. A community of passionate developers building the future together. Learn. Build. Connect.",
  icons: {
    icon: "/images/gdg-logo.png",
    apple: "/images/gdg-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[10001] focus:px-4 focus:py-2 focus:bg-[#4285F4] focus:text-white focus:rounded-full focus:shadow-lg focus:outline-none font-mono text-xs font-semibold"
        >
          Skip to main content
        </a>
        <ThemeProvider>
          <SmoothScrollProvider>
            <Preloader />
            <TouchFollower />
            <CustomCursor />
            <GlobalMagnetic />
            <ViewTransitionHandler />
            <Navbar />
            <main id="main-content" className="flex-1 w-full">{children}</main>
            <Footer />
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
