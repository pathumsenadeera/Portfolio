'use client';

import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import MarqueeSection from '@/components/MarqueeSection';

// Load all Firebase-dependent sections only on the client
// to avoid SSR/client hydration mismatch errors
const HeroSection     = dynamic(() => import('@/components/HeroSection'),     { ssr: false });
const StatsSection    = dynamic(() => import('@/components/StatsSection'),    { ssr: false });
const AboutSection    = dynamic(() => import('@/components/AboutSection'),    { ssr: false });
const PortfolioSection = dynamic(() => import('@/components/PortfolioSection'), { ssr: false });
const ServicesSection = dynamic(() => import('@/components/ServicesSection'), { ssr: false });
const ProcessSection  = dynamic(() => import('@/components/ProcessSection'),  { ssr: false });
const CTABanner       = dynamic(() => import('@/components/CTABanner'),       { ssr: false });
const ContactSection  = dynamic(() => import('@/components/ContactSection'),  { ssr: false });
const Footer          = dynamic(() => import('@/components/Footer'),          { ssr: false });

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* 1. Hero */}
        <HeroSection />

        {/* 2. Scrolling ribbon marquee (between Hero & About) */}
        <MarqueeSection />

        {/* 3. Stats strip */}
        <StatsSection />

        {/* 4. About + floating tool tags */}
        <AboutSection />

        {/* 5. Portfolio fan carousel */}
        <PortfolioSection />

        {/* 6. Services cards */}
        <ServicesSection />

        {/* 7. How I Work (process) */}
        <ProcessSection />

        {/* 8. CTA banner */}
        <CTABanner />

        {/* 9. Contact form */}
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
