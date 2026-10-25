import React, { useState } from 'react';
import { processSteps } from '../../data/companyData';
import { GitBranch, Clock, CheckCircle2, ChevronRight, Zap } from 'lucide-react';

export default function ProcessSection() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  return (
    <section id="process" className="relative py-28 bg-[#FAFAFC] border-t border-slate-200 overflow-hidden">
      {/* Radial lighting background */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-100/30 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-bold text-indigo-700 uppercase tracking-wider mb-4 shadow-sm">
            <GitBranch className="w-3.5 h-3.5" /> How We Work &bull; Delivery Lifecycle
          </div>
          <h2 className="text-3xl sm:text-5xl font-montserrat font-extrabold text-slate-900 tracking-tight mb-4">
            From Horizon Discovery to <br />
            <span className="text-gradient">Production Endurance</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            A disciplined, four-phase engineering framework designed to eliminate guesswork, mitigate delivery risk, and guarantee measurable business impact.
          </p>
        </div>

        {/* 4-Step Animated Timeline & Grid */}
        <div className="relative">
          {/* Connecting Indigo Gradient Line across desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-indigo-200 to-transparent -translate-y-12 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {processSteps.map((step, idx) => {
              const isSelected = activeStepIndex === idx;

              return (
                <div
                  key={step.step}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`cursor-pointer rounded-3xl p-7 relative overflow-hidden transition-all duration-300 flex flex-col justify-between ${
                    isSelected
                      ? 'border-2 border-indigo-600 bg-white shadow-xl scale-[1.02]'
                      : 'border border-slate-200/90 bg-white hover:border-indigo-300 shadow-sm hover:shadow-md'
                  }`}
                >
                  {/* Top step badge */}
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center font-montserrat font-black text-xl transition-all ${
                          isSelected
                            ? 'bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md'
                            : 'bg-slate-100 text-slate-700 border border-slate-200'
                        }`}
                      >
                        {step.step}
                      </div>

                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-[11px] font-mono text-slate-600 font-semibold">
                        <Clock className="w-3 h-3 text-indigo-600" />
                        <span>{step.duration}</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-montserrat font-bold text-slate-900 mb-2">
                      {step.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                      {step.description}
                    </p>
                  </div>

                  {/* Core Deliverable Card */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 mt-4">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-600 flex items-center gap-1 mb-1">
                      <Zap className="w-3 h-3" /> Key Milestone
                    </span>
                    <p className="text-xs text-slate-700 font-semibold leading-snug">
                      {step.keyDeliverable}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Process Guarantee Note */}
        <div className="mt-12 text-center text-xs text-slate-500 font-medium">
          <span>Sprint cadences are synchronized with weekly steering briefings and live progress observability.</span>
        </div>
      </div>
    </section>
  );
}
