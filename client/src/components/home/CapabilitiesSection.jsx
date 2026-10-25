import React from 'react';
import { capabilitiesData } from '../../data/companyData';
import IconHelper from '../common/IconHelper';
import { Cpu, Sparkles, Layers, CheckCircle } from 'lucide-react';

export default function CapabilitiesSection() {
  return (
    <section id="capabilities" className="relative py-28 bg-[#FAFAFC] border-t border-slate-200 overflow-hidden">
      {/* Background soft radiant accents */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-gradient-to-bl from-purple-200/20 via-pink-200/15 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-gradient-to-tr from-blue-200/20 via-indigo-200/18 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-bold text-indigo-700 uppercase tracking-wider mb-4 shadow-sm">
            <Cpu className="w-3.5 h-3.5 text-pink-600" /> Capabilities &amp; Technology Ecosystem
          </div>
          <h2 className="text-3xl sm:text-5xl font-montserrat font-extrabold text-slate-900 tracking-tight mb-4">
            Deep Technical Mastery. <br />
            <span className="text-gradient-aurora">Production-Grade Rigor.</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            We don’t experiment with unproven toys on your infrastructure. Our engineers harness battle-tested tools across data engineering, neural architectures, and distributed systems.
          </p>
        </div>

        {/* 6 Capabilities Visual Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {capabilitiesData.map((cap) => (
            <div
              key={cap.id}
              className="group relative rounded-3xl p-8 bg-white border border-slate-200/90 hover:border-purple-300 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              {/* Top multi-hue shine on hover */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />
              <div className="absolute top-0 right-0 w-36 h-36 bg-indigo-50/50 rounded-bl-full group-hover:bg-indigo-100/50 transition-colors pointer-events-none" />

              <div className="relative z-10">
                {/* Icon & Category Header */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-white shadow-md group-hover:scale-105 group-hover:border-slate-700 transition-all duration-300">
                    <IconHelper name={cap.icon} className="w-5 h-5 text-indigo-300" strokeWidth={1.75} />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-700 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 shadow-sm">
                    Tier-1 Stack
                  </span>
                </div>

                <h3 className="text-xl font-montserrat font-bold text-slate-900 mb-1.5 group-hover:text-indigo-600 transition-colors">
                  {cap.title}
                </h3>

                <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-3">
                  {cap.subtitle}
                </p>

                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {cap.description}
                </p>
              </div>

              {/* Tool & Tech Badges */}
              <div className="pt-4 border-t border-slate-100">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-800 block mb-2.5">
                  Frameworks &amp; Tooling:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {cap.badges.map((badge, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono font-semibold bg-slate-50 text-slate-700 border border-slate-200 hover:border-indigo-400 hover:text-indigo-600 transition-colors"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
