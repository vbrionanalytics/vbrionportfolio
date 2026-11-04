import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CustomCursor from './components/common/CustomCursor';
import FloatingQuickActions from './components/common/FloatingQuickActions';
import AIChatbotWidget from './components/common/AIChatbotWidget';
import ScrollToTop from './components/common/ScrollToTop';

import HeroSection from './components/home/HeroSection';
import AboutSection from './components/home/AboutSection';
import ServicesSection from './components/home/ServicesSection';
import PortfolioSection from './components/home/PortfolioSection';
import CapabilitiesSection from './components/home/CapabilitiesSection';
import IndustriesSection from './components/home/IndustriesSection';
import ProcessSection from './components/home/ProcessSection';
import ImpactSection from './components/home/ImpactSection';
import TestimonialsSection from './components/home/TestimonialsSection';
import TeamSection from './components/home/TeamSection';
import CareersCtaBanner from './components/home/CareersCtaBanner';
import ContactSection from './components/home/ContactSection';
import ProjectDetailPage from './pages/ProjectDetailPage';

function HomePage({ selectedServiceForContact, onSelectService }) {
  return (
    <>
      <Navbar />
      <main id="main-content">
        {/* 1. Hero Section */}
        <HeroSection />

        {/* 2. About Section */}
        <AboutSection />

        {/* 3. What We Do: Consulting Services & Analytical Solutions */}
        <ServicesSection onSelectServiceForContact={onSelectService} />

        {/* 4. Our Work / Filterable Portfolio & Case Studies */}
        <PortfolioSection onSelectServiceForContact={onSelectService} />

        {/* 5. Capabilities & Technology Ecosystem */}
        <CapabilitiesSection />

        {/* 6. Industries We Serve */}
        <IndustriesSection onSelectServiceForContact={onSelectService} />

        {/* 7. How We Work (4-Step Lifecycle) */}
        <ProcessSection />

        {/* 8. Impact in Numbers (Animated Counters) */}
        <ImpactSection />

        {/* 9. Clients & Testimonials */}
        <TestimonialsSection />

        {/* 10. Team (Leadership) */}
        <TeamSection />

        {/* Pre-Footer Grand CTA & Careers Banner */}
        <CareersCtaBanner onSelectServiceForContact={onSelectService} />

        {/* 11. Contact & Scheduling Form */}
        <ContactSection selectedServicePreload={selectedServiceForContact} />
      </main>
      <Footer />
      <FloatingQuickActions />
      <AIChatbotWidget onSelectServiceForContact={onSelectService} />
    </>
  );
}

export default function App() {
  const [selectedServiceForContact, setSelectedServiceForContact] = useState('');

  const handleSelectService = (serviceName) => {
    setSelectedServiceForContact(serviceName);
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-[#FAFAFC] text-slate-700 font-inter relative selection:bg-indigo-500/20 selection:text-indigo-600">
        {/* Subtle Custom Cursor for Desktop */}
        <CustomCursor />

        {/* Dynamic Route Switcher */}
        <Routes>
          {/* Main Dynamic Landing Experience */}
          <Route 
            path="/" 
            element={
              <HomePage 
                selectedServiceForContact={selectedServiceForContact} 
                onSelectService={handleSelectService} 
              />
            } 
          />

          {/* Dynamic Dedicated Case Study Detail Pages */}
          <Route path="/project/:id" element={<ProjectDetailPage />} />

          {/* Catch-all redirect to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
