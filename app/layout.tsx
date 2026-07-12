import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Pathum | Creative Designer Portfolio",
  description: "Award-winning graphic designer specializing in brand identity, visual design, and creative direction. Explore bold, cinematic design work.",
  keywords: ["graphic designer", "brand identity", "visual design", "portfolio", "creative director"],
  icons: {
    icon: "/images/pathum.png",
    shortcut: "/images/pathum.png",
    apple: "/images/pathum.png",
  },
  openGraph: {
    title: "Pathum | Creative Designer Portfolio",
    description: "Bold creative design — Brand identity, visual design & creative direction.",
    type: "website",
  },
};

import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgress from "@/components/ScrollProgress";
import Cursor from "@/components/Cursor";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <ScrollProgress />
        <SmoothScroll />
        <Cursor />
        <div className="noise" />
        {children}
      </body>
    </html>
  );
}
