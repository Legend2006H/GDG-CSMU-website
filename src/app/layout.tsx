import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/gdg/theme-provider";
import { Navbar } from "@/components/gdg/navbar";
import { Footer } from "@/components/gdg/footer";

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
        <ThemeProvider>
          <Navbar />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
