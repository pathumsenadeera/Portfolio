import Cursor from '@/components/Cursor';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import MarqueeSection from '@/components/MarqueeSection';
import StatsSection from '@/components/StatsSection';
import AboutSection from '@/components/AboutSection';
import PortfolioSection from '@/components/PortfolioSection';
import ServicesSection from '@/components/ServicesSection';
import ProcessSection from '@/components/ProcessSection';
import CTABanner from '@/components/CTABanner';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Cursor />
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

        {/* 10. Contact form */}
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
