import React from 'react';
import { industriesData } from '../../data/companyData';
import IconHelper from '../common/IconHelper';
import { Globe, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function IndustriesSection({ onSelectServiceForContact }) {
  const handleInquireIndustry = (industryTitle) => {
    if (onSelectServiceForContact) {
      onSelectServiceForContact(`${industryTitle} Analytics`);
    }
    const elem = document.getElementById('contact');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="industries" className="relative py-28 bg-[#FAFAFC] border-t border-slate-200 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-blue-100/30 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-700 uppercase tracking-wider mb-3 shadow-sm">
              <Globe className="w-3.5 h-3.5" /> Domain Specialization
            </div>
            <h2 className="text-3xl sm:text-5xl font-montserrat font-extrabold text-slate-900 tracking-tight">
              Industries Where Foresight <br />
              <span className="text-gradient">Dictates Survival</span>
            </h2>
          </div>
          <p className="text-slate-600 max-w-xl text-base sm:text-lg leading-relaxed">
            We operate in high-consequence verticals where regulatory compliance, operational velocity, and model precision are paramount.
          </p>
        </div>

        {/* 4 Industries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {industriesData.map((ind) => (
            <div
              key={ind.id}
              className="bg-white group rounded-3xl p-6 sm:p-7 relative overflow-hidden transition-all duration-300 border border-slate-200/90 hover:border-indigo-300 shadow-sm hover:shadow-xl flex flex-col justify-between"
            >
              <div>
                {/* Icon & Stat Badge */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-white shadow-md group-hover:scale-105 group-hover:border-slate-700 transition-all">
                    <IconHelper name={ind.icon} className="w-5 h-5 text-indigo-300" strokeWidth={1.75} />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-700 bg-slate-100 px-3 py-1 rounded-full border border-slate-200 shadow-sm">
                    {ind.stats}
                  </span>
                </div>

                <h3 className="text-xl font-montserrat font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">
                  {ind.title}
                </h3>

                <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-3">
                  {ind.tagline}
                </p>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                  {ind.description}
                </p>

                {/* Solutions List */}
                <div className="space-y-2 mb-6">
                  {ind.solutions.map((sol, idx) => (
                    <div key={idx} className="flex items-center text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 mr-2 shrink-0" />
                      <span>{sol}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Inquire CTA */}
              <div className="pt-4 border-t border-slate-100">
                <button
                  onClick={() => handleInquireIndustry(ind.title)}
                  className="w-full py-2.5 px-3 rounded-xl text-xs font-bold text-slate-700 hover:text-white bg-slate-50 hover:bg-slate-900 border border-slate-200 transition-all flex items-center justify-center gap-2 group/b"
                >
                  <span>Explore {ind.title} Practice</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/b:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
