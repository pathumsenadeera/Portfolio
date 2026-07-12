import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://pathum-senadeera.me"),
  title: "Pathum | Creative Designer Portfolio",
  description: "Award-winning graphic designer specializing in brand identity, visual design, and creative direction. Explore bold, cinematic design work.",
  keywords: ["graphic designer", "brand identity", "visual design", "portfolio", "creative director", "Pathum Senadeera", "Sri Lanka", "designer"],
  authors: [{ name: "Pathum Senadeera" }],
  creator: "Pathum Senadeera",
  openGraph: {
    title: "Pathum | Creative Designer Portfolio",
    description: "Bold creative design — Brand identity, visual design & creative direction.",
    siteName: "Pathum Senadeera Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pathum | Creative Designer Portfolio",
    description: "Award-winning graphic designer specializing in brand identity, visual design, and creative direction.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/images/pathum.png",
    shortcut: "/images/pathum.png",
    apple: "/images/pathum.png",
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
      <head>
        {/* Non-blocking Google Fonts — preconnect + deferred stylesheet to avoid render-blocking */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Load font stylesheet non-blocking via media="print" trick */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap"
          media="print"
          // @ts-expect-error – onLoad is valid HTML, needed for progressive font loading
          onLoad="this.media='all'"
        />
        {/* Fallback for JS-disabled environments */}
        <noscript>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap"
          />
        </noscript>
      </head>
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

