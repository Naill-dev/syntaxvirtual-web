import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { supabase } from '../lib/supabaseClient';
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
import { CareersSection } from '../components/sections/CareersSection';
import { ArticleModal } from '../components/modals/ArticleModal';
import { BookingModal } from '../components/modals/BookingModal';

import { ArticleItem } from '../types';

export function Home() {
  const [selectedArticle, setSelectedArticle] = useState<ArticleItem | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [sections, setSections] = useState<any[]>([]);
  const [seo, setSeo] = useState<any>(null);

  useEffect(() => {
    supabase.from('homepage_sections').select('*').order('display_order').then(({ data }) => setSections(data || []));
    supabase.from('seo_settings').select('*').eq('page_path', '/').single().then(({ data }) => setSeo(data));
  }, []);

  const handleApplyEstimate = (summary: string) => {
    console.log("Estimate applied: ", summary);
  };

  const renderSection = (key: string) => {
    switch (key) {
      case 'hero': return <HeroSection key="hero" onOpenBooking={() => setIsBookingOpen(true)} />;
      case 'projects': return <PortfolioSection key="projects" />;
      case 'reviews': return <TestimonialsSection key="reviews" />;
      case 'careers': return <CareersSection key="careers" />;
      case 'blog': return <BlogSection key="blog" onSelectArticle={setSelectedArticle} />;
      default: return null;
    }
  };

  return (
    <div className="relative min-h-screen font-sans selection:bg-accent-purple/30 selection:text-white flex flex-col">
      {seo && (
        <Helmet>
          <title>{seo.meta_title || 'SyntaxVirtual | Digital Excellence'}</title>
          <meta name="description" content={seo.meta_description || ''} />
          <meta name="keywords" content={seo.meta_keywords || ''} />
          {seo.og_image_url && <meta property="og:image" content={seo.og_image_url} />}
        </Helmet>
      )}

      <ParticleBackground />
      <Navbar onOpenBooking={() => setIsBookingOpen(true)} />
      
      <main className="flex-1 relative z-10">
        {/* Render dynamic sections first */}
        {sections.filter(s => s.is_enabled).map(s => renderSection(s.section_key))}

        {/* Fallback/static sections that are not in the builder yet, or place them manually */}
        {sections.length === 0 && (
          <HeroSection onOpenBooking={() => setIsBookingOpen(true)} />
        )}
        <TechMarquee />
        <ServicesSection 
          onSelectService={() => setIsBookingOpen(true)}
          onOpenBooking={() => setIsBookingOpen(true)}
        />
        {sections.length === 0 && <PortfolioSection />}
        <ProjectEstimator onApplyEstimate={handleApplyEstimate} />
        <AboutSection />
        <ProcessSection />
        {sections.length === 0 && <BlogSection onSelectArticle={setSelectedArticle} />}
        {sections.length === 0 && <TestimonialsSection />}
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
