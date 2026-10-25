import React, { useState } from 'react';
import { Telescope, Compass, Shield, Target, Award, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';
import BrandLogo from '../common/BrandLogo';

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState('story');

  const coreValues = [
    {
      icon: Telescope,
      title: 'Horizon Foresight',
      badge: 'Vision',
      description: 'Like an astronomer scanning the cosmos, we look beyond quarterly noise to anticipate market shocks, regulatory pivot points, and emergent technological paradigms.'
    },
    {
      icon: Target,
      title: 'Mathematical Rigor',
      badge: 'Certainty',
      description: 'We replace conjecture with deterministic models, empirical telemetry, and verifiable algorithmic proofs that stand up to regulatory audits.'
    },
    {
      icon: Shield,
      title: 'Integrity & Governance',
      badge: 'Trust',
      description: 'Engineering resilient compliance architectures, board-level ethical governance, and transparent AI models that preserve enterprise reputation.'
    },
    {
      icon: Compass,
      title: 'Sovereign Client Impact',
      badge: 'Advantage',
      description: 'We do not build generic cookie-cutter dashboards; we forge durable, defensible competitive moats tailored specifically to your business mechanics.'
    }
  ];

  return (
    <section id="about" className="relative py-28 bg-[#FAFAFC] border-t border-slate-200 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 -left-48 w-96 h-96 bg-indigo-200/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-purple-200/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-bold text-indigo-700 uppercase tracking-wider mb-3">
              <Telescope className="w-3.5 h-3.5" /> Who We Are &amp; What Drives Us
            </div>
            <h2 className="text-3xl sm:text-5xl font-montserrat font-extrabold text-slate-900 tracking-tight">
              Pioneering foresight. <br />
              <span className="text-gradient">Architecting endurance.</span>
            </h2>
          </div>
          <p className="text-slate-600 max-w-xl text-base sm:text-lg leading-relaxed">
            At <strong className="text-slate-900 font-bold">vbrion</strong>, we believe the greatest risk facing modern enterprises is not lack of ambition, but reactive blindness. We engineer clarity through the synthesis of strategic consulting and mathematical intelligence.
          </p>
        </div>

        {/* Brand Story & The Telescope Motif Feature Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 mb-16 relative overflow-hidden border border-slate-200/90 shadow-xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-indigo-100/40 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Visual Brand Monogram Artwork in Prestige Obsidian Vault */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center p-8 bg-slate-950 rounded-2xl border border-slate-800 text-center relative group shadow-lg">
              <div className="w-full max-w-[280px] relative mb-6">
                <img
                  src="/vbrion-full-logo-transparent.png"
                  alt="vbrion analytics official insignia"
                  className="w-full h-auto object-contain filter drop-shadow-[0_0_20px_rgba(56,189,248,0.35)] group-hover:drop-shadow-[0_0_30px_rgba(129,140,248,0.6)] transition-all duration-300"
                  onError={(e) => {
                    e.currentTarget.src = '/vbrion-full-logo.png';
                  }}
                />
              </div>

              <div className="font-montserrat font-bold text-xl text-white tracking-wide">
                The Stargazer &amp; Telescope
              </div>
              <p className="text-xs text-sky-400 font-bold tracking-widest uppercase mt-1">
                The Anatomy of vbrion's Identity
              </p>
              <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                The "VB" monogram fuses architectural line art with an observer peering through a telescope—symbolizing vigilant foresight, precision measurement, and the unyielding pursuit of truth.
              </p>
            </div>

            {/* Brand Story and Differentiator */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex gap-3 border-b border-slate-200 pb-3">
                <button
                  onClick={() => setActiveTab('story')}
                  className={`text-sm font-bold pb-2 border-b-2 transition-all ${
                    activeTab === 'story'
                      ? 'border-indigo-600 text-indigo-600'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Our Brand Story
                </button>
                <button
                  onClick={() => setActiveTab('vision')}
                  className={`text-sm font-bold pb-2 border-b-2 transition-all ${
                    activeTab === 'vision'
                      ? 'border-indigo-600 text-indigo-600'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Vision &amp; Mission
                </button>
              </div>

              {activeTab === 'story' ? (
                <div className="space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed animate-fadeIn">
                  <p>
                    <strong className="text-slate-900 font-semibold">vbrion</strong> was founded on a singular premise: modern enterprises are inundated with historical retrospectives, yet starved of predictive foresight.
                  </p>
                  <p>
                    Traditional consulting houses offer high-level strategic decks without the technical capability to implement high-throughput data systems. Conversely, standard engineering agencies build codebases without deep comprehension of boardroom risk, statutory compliance, or executive strategy.
                  </p>
                  <p>
                    vbrion bridges this divide. By fusing top-tier regulatory, legal, and operational consulting with full-stack digital product engineering, production AI, and scalable cloud architectures, we convert uncertainty into quantifiable, defensible advantage.
                  </p>
                </div>
              ) : (
                <div className="space-y-5 animate-fadeIn">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 block mb-1">
                      Our Vision
                    </span>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      To be the world’s most trusted strategic partner for enterprises navigating high-consequence transformations, setting the global benchmark where empirical AI engineering and executive governance seamlessly converge.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block mb-1">
                      Our Mission
                    </span>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      To engineer resilient organizations by equipping leaders with predictive foresight, bulletproof compliance architectures, and production-grade artificial intelligence systems that create measurable enterprise value.
                    </p>
                  </div>
                </div>
              )}

              <div className="pt-2 flex flex-wrap gap-4 items-center">
                <a
                  href="#services"
                  className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                  <span>Explore Our 11 Practice Lines</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Core Values Grid */}
        <div className="mt-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">
              Foundational Pillars
            </span>
            <h3 className="text-2xl sm:text-3xl font-montserrat font-bold text-slate-900 mt-1">
              The Principles That Govern Our Craft
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((val, idx) => {
              const IconComp = val.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-2xl relative overflow-hidden group flex flex-col justify-between border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-indigo-300 transition-all duration-300"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50/50 rounded-bl-full group-hover:bg-indigo-100/50 transition-colors pointer-events-none" />

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-11 h-11 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-white shadow-sm group-hover:scale-105 group-hover:border-slate-700 transition-all duration-300">
                        <IconComp className="w-5 h-5 text-indigo-300" strokeWidth={1.75} />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                        {val.badge}
                      </span>
                    </div>

                    <h4 className="text-lg font-montserrat font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                      {val.title}
                    </h4>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {val.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-slate-100 flex items-center text-[11px] text-indigo-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Engineered with integrity</span>
                    <Sparkles className="w-3 h-3 ml-1" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
