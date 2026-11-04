import React, { useState, useEffect } from 'react';
import BrandLogo from '../common/BrandLogo';
import { servicesData } from '../../data/servicesData';
import siteConfig from '../../config/siteConfig';
import { Menu, X, ChevronDown, ArrowRight, PhoneCall, Sparkles } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenus = () => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200/80 shadow-sm py-2 sm:py-2.5'
          : 'bg-white/80 backdrop-blur-md border-b border-slate-200/60 py-3 sm:py-4'
      }`}
    >
      {/* Dynamic multi-hue bottom light rail */}
      <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-blue-500/40 via-purple-500/40 to-pink-500/40 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between">
          {/* Brand Logo with Monogram and Wordmark */}
          <BrandLogo size="default" />

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            <a
              href="/#about"
              className="px-3.5 py-2 text-sm font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-100/60 rounded-lg transition-colors"
            >
              About
            </a>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                type="button"
                className="flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-100/60 rounded-lg transition-colors focus:outline-none"
                aria-expanded={servicesDropdownOpen}
              >
                <span>Services</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180 text-indigo-600' : ''}`} />
              </button>

              {/* Mega Dropdown Panel */}
              {servicesDropdownOpen && (
                <div className="absolute top-full -left-20 w-[640px] pt-2 z-50">
                  <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 grid grid-cols-2 gap-6 animate-fadeIn">
                    {/* Consulting Division */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                        <span className="text-xs font-bold tracking-wider uppercase text-indigo-600">
                          Consulting Services
                        </span>
                        <span className="text-[10px] text-slate-400">6 Practices</span>
                      </div>
                      <div className="space-y-1">
                        {servicesData.divisions[0].services.map((item) => (
                          <a
                            key={item.id}
                            href="/#services"
                            onClick={closeMenus}
                            className="block p-2 rounded-lg hover:bg-slate-50 transition-colors group"
                          >
                            <div className="text-sm font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                              {item.title}
                            </div>
                            <div className="text-xs text-slate-500 line-clamp-1">
                              {item.shortDesc}
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>

                    {/* Analytical Division */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                        <span className="text-xs font-bold tracking-wider uppercase text-blue-600">
                          Analytical Solutions
                        </span>
                        <span className="text-[10px] text-slate-400">5 Engines</span>
                      </div>
                      <div className="space-y-1">
                        {servicesData.divisions[1].services.map((item) => (
                          <a
                            key={item.id}
                            href="/#services"
                            onClick={closeMenus}
                            className="block p-2 rounded-lg hover:bg-slate-50 transition-colors group"
                          >
                            <div className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                              {item.title}
                            </div>
                            <div className="text-xs text-slate-500 line-clamp-1">
                              {item.shortDesc}
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>

                    <div className="col-span-2 pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                      <span>Need a custom consultative &amp; engineering blueprint?</span>
                      <a href="/#contact" onClick={closeMenus} className="text-indigo-600 font-semibold hover:underline flex items-center gap-1">
                        Schedule a Consultation <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <a
              href="/#portfolio"
              className="px-3.5 py-2 text-sm font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-100/60 rounded-lg transition-colors"
            >
              Our Work
            </a>

            <a
              href="/#capabilities"
              className="px-3.5 py-2 text-sm font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-100/60 rounded-lg transition-colors"
            >
              Capabilities
            </a>

            <a
              href="/#industries"
              className="px-3.5 py-2 text-sm font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-100/60 rounded-lg transition-colors"
            >
              Industries
            </a>

            <a
              href="/#process"
              className="px-3.5 py-2 text-sm font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-100/60 rounded-lg transition-colors"
            >
              Process
            </a>

            <a
              href="/#impact"
              className="px-3.5 py-2 text-sm font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-100/60 rounded-lg transition-colors"
            >
              Impact
            </a>
          </nav>

          {/* Action CTA & Phone preview */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={`tel:${siteConfig.contact.phoneRaw}`}
              className="flex items-center gap-2 text-xs text-slate-600 hover:text-slate-900 transition-colors font-medium"
              title="Call vbrion"
            >
              <PhoneCall className="w-3.5 h-3.5 text-indigo-600" />
              <span>{siteConfig.contact.phone}</span>
            </a>

            <a
              href="#contact"
              className="relative inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-xl shadow-md shadow-indigo-500/20 hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] group overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>Get in Touch</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </a>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-indigo-600" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[75px] sm:top-[85px] md:top-[95px] bg-white border-b border-slate-200 px-6 py-6 shadow-2xl max-h-[85vh] overflow-y-auto z-50">
          <div className="flex flex-col space-y-4">
            <a
              href="/#about"
              onClick={closeMenus}
              className="text-base font-semibold text-slate-900 hover:text-indigo-600 py-2 border-b border-slate-100"
            >
              About vbrion
            </a>
            <a
              href="/#services"
              onClick={closeMenus}
              className="text-base font-semibold text-slate-900 hover:text-indigo-600 py-2 border-b border-slate-100"
            >
              Our 11 Services
            </a>
            <a
              href="/#portfolio"
              onClick={closeMenus}
              className="text-base font-semibold text-slate-900 hover:text-indigo-600 py-2 border-b border-slate-100"
            >
              Portfolio &amp; Work
            </a>
            <a
              href="/#capabilities"
              onClick={closeMenus}
              className="text-base font-semibold text-slate-900 hover:text-indigo-600 py-2 border-b border-slate-100"
            >
              Capabilities &amp; Tech
            </a>
            <a
              href="/#industries"
              onClick={closeMenus}
              className="text-base font-semibold text-slate-900 hover:text-indigo-600 py-2 border-b border-slate-100"
            >
              Industries We Serve
            </a>
            <a
              href="/#process"
              onClick={closeMenus}
              className="text-base font-semibold text-slate-900 hover:text-indigo-600 py-2 border-b border-slate-100"
            >
              How We Work
            </a>
            <a
              href="/#impact"
              onClick={closeMenus}
              className="text-base font-semibold text-slate-900 hover:text-indigo-600 py-2 border-b border-slate-100"
            >
              Impact in Numbers
            </a>

            <div className="pt-4 flex flex-col gap-3">
              <a
                href="/#contact"
                onClick={closeMenus}
                className="w-full text-center py-3 px-4 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-md"
              >
                Get in Touch
              </a>
              <a
                href={`tel:${siteConfig.contact.phoneRaw}`}
                className="w-full text-center py-2 text-sm text-slate-600 hover:text-slate-900 font-medium"
              >
                Call: {siteConfig.contact.phone}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
