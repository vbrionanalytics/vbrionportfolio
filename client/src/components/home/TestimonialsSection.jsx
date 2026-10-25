import React, { useState } from 'react';
import { clientLogos, testimonialsData } from '../../data/companyData';
import { Quote, ChevronLeft, ChevronRight, Star, Building2, Sparkles } from 'lucide-react';

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonialsData.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === testimonialsData.length - 1 ? 0 : prev + 1));
  };

  const currentTestimonial = testimonialsData[currentIndex];

  return (
    <section id="clients" className="relative py-28 bg-[#FAFAFC] border-t border-slate-200 overflow-hidden">
      {/* Background radial soft glows */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-blue-100/30 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-indigo-100/25 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-700 uppercase tracking-wider mb-4 shadow-sm">
            <Building2 className="w-3.5 h-3.5" /> Partners &bull; Executive Testimonials
          </div>
          <h2 className="text-3xl sm:text-5xl font-montserrat font-extrabold text-slate-900 tracking-tight mb-4">
            Trusted by Leaders <br />
            <span className="text-gradient">Across Regulated Sectors</span>
          </h2>
          <p className="text-base text-slate-600 max-w-2xl mx-auto">
            Discover how vbrion's cross-disciplinary consulting and high-throughput data engineering deliver measurable enterprise ROI and governance resilience.
          </p>
        </div>

        {/* Client Logos Marquee Strip */}
        <div className="mb-20">
          <div className="text-center text-xs font-mono uppercase tracking-widest text-slate-500 mb-6 flex items-center justify-center gap-2 font-bold">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Esteemed Enterprise Partners &amp; Industry Collaborations</span>
          </div>
          <div className="relative overflow-hidden py-4 border-y border-slate-200 bg-slate-100/60">
            <div className="flex space-x-8 animate-marquee whitespace-nowrap">
              {[...clientLogos, ...clientLogos].map((logo, idx) => (
                <div
                  key={idx}
                  className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-indigo-300 transition-colors"
                >
                  <Building2 className="w-4 h-4 text-indigo-600" />
                  <span className="font-montserrat font-bold text-sm text-slate-800">
                    {logo.name}
                  </span>
                  <span className="text-[10px] text-blue-700 font-mono font-bold px-2 py-0.5 rounded bg-blue-50 border border-blue-200">
                    {logo.sector}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials Quote Slider */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl p-8 sm:p-12 relative border border-slate-200/90 shadow-xl transition-all duration-300">
            {/* Top quote icon, sector pill & stars */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shadow-sm">
                  <Quote className="w-6 h-6" />
                </div>
                {currentTestimonial.sector && (
                  <span className="px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold tracking-wide uppercase">
                    {currentTestimonial.sector}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 border border-slate-200">
                {[...Array(currentTestimonial.rating || 5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
                <span className="text-xs font-bold text-slate-800 ml-1">5.0</span>
              </div>
            </div>

            {/* Testimonial Quote */}
            <p className="text-lg sm:text-2xl font-normal text-slate-800 leading-relaxed mb-8 italic">
              &ldquo;{currentTestimonial.quote}&rdquo;
            </p>

            {/* Author Info & Slider Controls */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-6 border-t border-slate-100 gap-4">
              <div>
                <h4 className="font-montserrat font-bold text-lg text-slate-900">
                  {currentTestimonial.author}
                </h4>
                <p className="text-xs text-indigo-600 font-bold">
                  {currentTestimonial.title}
                </p>
                <p className="text-xs text-slate-500 font-medium">
                  {currentTestimonial.company}
                </p>
              </div>

              {/* Slider Prev / Next buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={prevSlide}
                  className="w-11 h-11 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 flex items-center justify-center text-slate-700 transition-all cursor-pointer"
                  aria-label="Previous quote"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-xs font-mono text-slate-500 px-2 font-semibold">
                  {currentIndex + 1} / {testimonialsData.length}
                </span>
                <button
                  onClick={nextSlide}
                  className="w-11 h-11 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 flex items-center justify-center text-slate-700 transition-all cursor-pointer"
                  aria-label="Next quote"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Interactive Pagination Dots */}
            <div className="flex justify-center items-center gap-2 pt-8">
              {testimonialsData.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => setCurrentIndex(dotIdx)}
                  aria-label={`Jump to testimonial ${dotIdx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    currentIndex === dotIdx
                      ? 'w-8 bg-indigo-600 shadow-sm'
                      : 'w-2 bg-slate-200 hover:bg-slate-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
