import { useState } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { ParticleBackground } from '../components/visual/ParticleBackground';
import { HeroSection } from '../components/sections/HeroSection';
import { TechMarquee } from '../components/sections/TechMarquee';
import { ServicesSection } from '../components/sections/ServicesSection';
import { PortfolioSection } from '../components/sections/PortfolioSection';
import { ProjectEstimator } from '../components/sections/ProjectEstimator';
import { AboutSection } from '../components/sections/AboutSection';
import { ProcessSection } from '../components/sections/ProcessSection';
import { BlogSection } from '../components/sections/BlogSection';
import { TestimonialsSection } from '../components/sections/TestimonialsSection';
import { FaqSection } from '../components/sections/FaqSection';
import { ContactSection } from '../components/sections/ContactSection';
import { ArticleModal } from '../components/modals/ArticleModal';
import { BookingModal } from '../components/modals/BookingModal';

import { PortfolioItem, ArticleItem } from '../types';

export function Home() {
  const [selectedArticle, setSelectedArticle] = useState<ArticleItem | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleApplyEstimate = (summary: string) => {
    console.log("Estimate applied: ", summary);
  };

  return (
    <div className="relative min-h-screen font-sans selection:bg-accent-purple/30 selection:text-white flex flex-col">
      <ParticleBackground />
      
      <Navbar onOpenBooking={() => setIsBookingOpen(true)} />
      
      <main className="flex-1 relative z-10">
        <HeroSection onOpenBooking={() => setIsBookingOpen(true)} />
        <TechMarquee />
        <ServicesSection 
          onSelectService={() => setIsBookingOpen(true)}
          onOpenBooking={() => setIsBookingOpen(true)}
        />
        <PortfolioSection />
        <ProjectEstimator onApplyEstimate={handleApplyEstimate} />
        <AboutSection />
        <ProcessSection />
        <BlogSection onSelectArticle={setSelectedArticle} />
        <TestimonialsSection />
        <FaqSection />
        <ContactSection onOpenBooking={() => setIsBookingOpen(true)} />
      </main>

      <Footer />
      
      <ArticleModal 
        article={selectedArticle} 
        onClose={() => setSelectedArticle(null)} 
      />

      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
      />
    </div>
  );
}
