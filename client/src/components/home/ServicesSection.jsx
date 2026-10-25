import React, { useState } from 'react';
import { servicesData } from '../../data/servicesData';
import IconHelper from '../common/IconHelper';
import { ArrowRight, CheckCircle2, ChevronRight, Layers, Sparkles } from 'lucide-react';

export default function ServicesSection({ onSelectServiceForContact }) {
  const [activeDivisionTab, setActiveDivisionTab] = useState('all');

  const handleInquire = (serviceTitle) => {
    if (onSelectServiceForContact) {
      onSelectServiceForContact(serviceTitle);
    }
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentDivisions = activeDivisionTab === 'all'
    ? servicesData.divisions
    : servicesData.divisions.filter(d => d.id === activeDivisionTab);

  return (
    <section id="services" className="relative py-28 bg-[#FAFAFC] border-t border-slate-200 overflow-hidden">
      {/* Background ambient lighting - soft radiant glows */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[500px] bg-gradient-to-tr from-blue-200/25 via-indigo-200/20 to-pink-200/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[650px] h-[450px] bg-gradient-to-bl from-amber-100/30 via-rose-100/30 to-purple-100/30 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-xs font-bold text-purple-700 uppercase tracking-wider mb-4 shadow-sm">
            <Layers className="w-3.5 h-3.5 text-pink-600" /> What We Do &bull; Two Dedicated Divisions
          </div>
          <h2 className="text-3xl sm:text-5xl font-montserrat font-extrabold text-slate-900 tracking-tight mb-4">
            Unified Consulting &amp; <br />
            <span className="text-gradient-aurora">Analytical Engineering</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            From boardroom governance mandates to sub-second streaming inference models, our dual-division model provides full-spectrum strategic clarity and technological execution.
          </p>

          {/* Division Selector Tabs */}
          <div className="flex items-center justify-center gap-2 mt-8 p-1.5 bg-slate-100 border border-slate-200 rounded-2xl max-w-md mx-auto">
            <button
              onClick={() => setActiveDivisionTab('all')}
              className={`flex-1 py-2 px-3 text-xs sm:text-sm font-bold rounded-xl transition-all ${
                activeDivisionTab === 'all'
                  ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All 11 Practices
            </button>
            <button
              onClick={() => setActiveDivisionTab('consulting')}
              className={`flex-1 py-2 px-3 text-xs sm:text-sm font-bold rounded-xl transition-all ${
                activeDivisionTab === 'consulting'
                  ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Consulting (6)
            </button>
            <button
              onClick={() => setActiveDivisionTab('analytical')}
              className={`flex-1 py-2 px-3 text-xs sm:text-sm font-bold rounded-xl transition-all ${
                activeDivisionTab === 'analytical'
                  ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Analytical (5)
            </button>
          </div>
        </div>

        {/* Divisions Presentation */}
        <div className="space-y-16">
          {currentDivisions.map((division) => (
            <div
              key={division.id}
              className="p-6 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-sm relative"
            >
              {/* Division Header Banner */}
              <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-8 border-b border-slate-200 gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-indigo-50 text-indigo-700 border border-indigo-200">
                      {division.badge}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-montserrat font-bold text-slate-900">
                      {division.name}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-600 max-w-2xl mt-1">
                    {division.description}
                  </p>
                </div>

                <div className="text-xs text-indigo-700 font-bold bg-indigo-50/70 px-4 py-2 rounded-xl border border-indigo-100 self-start md:self-auto">
                  {division.services.length} Specialized Service Lines
                </div>
              </div>

              {/* Service Cards Grid */}
              <div className={`grid grid-cols-1 md:grid-cols-2 ${division.id === 'consulting' ? 'lg:grid-cols-3' : 'lg:grid-cols-3'} gap-6`}>
                {division.services.map((service) => (
                  <div
                    key={service.id}
                    className="group relative rounded-2xl p-6 bg-white border border-slate-200/90 hover:border-purple-300 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden"
                  >
                    {/* Top multi-hue shine on hover */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative z-10">
                      {/* Icon & Title Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-11 h-11 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-white shadow-sm group-hover:scale-105 group-hover:border-slate-700 transition-all duration-300">
                          <IconHelper name={service.icon} className="w-5 h-5 text-indigo-300" strokeWidth={1.75} />
                        </div>
                        <span className="text-[10px] font-bold tracking-wider uppercase text-slate-500 px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200">
                          {division.id === 'consulting' ? 'STRATEGY' : 'ENGINEERING'}
                        </span>
                      </div>

                      <h4 className="text-lg font-montserrat font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                        {service.title}
                      </h4>

                      <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 mb-4 leading-relaxed">
                        {service.shortDesc}
                      </p>

                      {/* 3 Key Offerings */}
                      <div className="mt-4 pt-4 border-t border-slate-100">
                        <span className="text-[11px] uppercase tracking-wider font-bold text-indigo-600 block mb-2">
                          Key Deliverables:
                        </span>
                        <ul className="space-y-1.5">
                          {service.offerings.map((offering, idx) => (
                            <li key={idx} className="flex items-start text-xs text-slate-700">
                              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 mr-2 shrink-0 mt-0.5" />
                              <span className="leading-snug">{offering}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Bottom Action / Quick Inquire */}
                    <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between relative z-10">
                      <button
                        onClick={() => handleInquire(service.title)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 group-hover:text-purple-600 transition-colors"
                      >
                        <span>Consult on {service.title}</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
