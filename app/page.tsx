import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';

// Below-fold sections loaded lazily for code-splitting (components are 'use client' internally)
const MarqueeSection   = dynamic(() => import('@/components/MarqueeSection'));
const StatsSection     = dynamic(() => import('@/components/StatsSection'));
const AboutSection     = dynamic(() => import('@/components/AboutSection'));
const PortfolioSection = dynamic(() => import('@/components/PortfolioSection'));
const ServicesSection  = dynamic(() => import('@/components/ServicesSection'));
const ProcessSection   = dynamic(() => import('@/components/ProcessSection'));
const CTABanner        = dynamic(() => import('@/components/CTABanner'));
const ContactSection   = dynamic(() => import('@/components/ContactSection'));
const Footer           = dynamic(() => import('@/components/Footer'));

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* 1. Hero — above fold, static import */}
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

