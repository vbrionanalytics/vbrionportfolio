import React, { useState } from 'react';
import { ArrowRight, Users, Sparkles, Briefcase, FileText, CheckCircle2, X, Send, Download } from 'lucide-react';
import siteConfig from '../../config/siteConfig';
import { trackCtaEvent } from '../../services/apiService';
import { LinkedInIcon } from '../common/SocialIcons';

export default function CareersCtaBanner({ onSelectServiceForContact }) {
  const [careersModalOpen, setCareersModalOpen] = useState(false);
  const [deckDownloaded, setDeckDownloaded] = useState(false);

  const sampleRoles = [
    {
      id: 1,
      title: 'Principal AI / ML Research Engineer',
      location: 'Mumbai / Hybrid',
      type: 'Full-time',
      tag: 'OPEN ROLE • IMMEDIATE HIRING',
      skills: ['PyTorch', 'Distributed Systems', 'Low-Latency Inference']
    },
    {
      id: 2,
      title: 'Senior Risk & Regulatory Governance Consultant',
      location: 'Mumbai / Hybrid',
      type: 'Full-time',
      tag: 'OPEN ROLE • HYBRID (BKC)',
      skills: ['ERM Frameworks', 'Statutory Compliance', 'BFSI Advisory']
    },
    {
      id: 3,
      title: 'Lead Healthcare Analytics Architect',
      location: 'Remote / India',
      type: 'Full-time',
      tag: 'OPEN ROLE • REMOTE ELIGIBLE',
      skills: ['FHIR', 'Databricks', 'Predictive Clinical Models']
    }
  ];

  const handleDownloadDeck = () => {
    setDeckDownloaded(true);
    // Track CTA download in DB
    trackCtaEvent('deck_download', 'Executive Capabilities Overview Deck', 'careers_banner');

    // Simulate generation/download of executive capabilities overview
    const element = document.createElement('a');
    const file = new Blob([
      `vbrion analytics — Executive Capabilities Overview\n\nTagline: Engineering What's Next\nContact: ${siteConfig.contact.phone} | ${siteConfig.contact.email}\nAddress: ${siteConfig.contact.address.fullFormatted}\n\n11 Core Services:\n- Risk & Governance\n- Legal Compliances\n- Business Solutions\n- Career Consulting\n- Placement Consulting\n- Technology Consulting & Product Engineering\n- Fintech Solutions\n- Healthcare Analytics\n- Banking Solutions\n- Education Analytics\n- Business Development Analytics\n\n© ${new Date().getFullYear()} vbrion analytics. Confidential.`
    ], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'vbrion-Executive-Capabilities-Overview.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <section className="relative py-24 bg-[#FAFAFC] border-t border-slate-200 overflow-hidden">
      {/* Background ambient soft radiant gradient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-gradient-to-r from-blue-200/20 via-indigo-200/20 to-pink-200/20 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Grand CTA & Careers Container */}
        <div className="bg-white rounded-3xl p-8 sm:p-14 border border-slate-200/90 relative overflow-hidden shadow-xl">
          {/* Subtle top multi-hue line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 via-indigo-500 to-pink-500 to-transparent" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Bold Headline & Value Proposition */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-xs font-bold text-purple-700 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-pink-600" /> Shape The Next Horizon With Us
              </div>

              <h2 className="text-3xl sm:text-5xl font-montserrat font-extrabold text-slate-900 tracking-tight leading-tight">
                Ready to engineer <br />
                <span className="text-gradient-aurora">sustainable advantage?</span>
              </h2>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                Whether you need a confidential board-level governance review, enterprise digital product development, or a high-throughput AI telemetry lakehouse—vbrion is where vision meets execution.
              </p>

              {/* Action Buttons: Dual Path CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#contact"
                  className="px-7 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] inline-flex items-center gap-2"
                >
                  <span>Initiate Client Discovery</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <button
                  onClick={() => setCareersModalOpen(true)}
                  className="px-6 py-3.5 rounded-xl font-bold text-sm text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-all inline-flex items-center gap-2"
                >
                  <Briefcase className="w-4 h-4 text-indigo-600" />
                  <span>Careers &amp; Culture</span>
                </button>

                <button
                  onClick={handleDownloadDeck}
                  className="px-5 py-3.5 rounded-xl font-semibold text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors inline-flex items-center gap-1.5 border border-slate-200"
                  title="Download executive overview deck"
                >
                  <Download className="w-3.5 h-3.5 text-blue-600" />
                  <span>{deckDownloaded ? 'Overview Deck Downloaded' : 'Executive Overview Deck'}</span>
                </button>

                {/* Company LinkedIn CTA */}
                <a
                  href={siteConfig.socials?.linkedin || 'https://linkedin.com/company/vbrion'}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3.5 rounded-xl font-bold text-xs text-indigo-700 bg-indigo-50/70 hover:bg-indigo-100/70 border border-indigo-200 transition-all inline-flex items-center gap-2 group shadow-sm"
                  title="Company LinkedIn"
                >
                  <LinkedInIcon className="w-4 h-4 text-indigo-600 group-hover:scale-110 transition-transform" />
                  <span>Company LinkedIn</span>
                  <span className="px-1.5 py-0.5 text-[9px] font-mono bg-indigo-100 text-indigo-700 rounded border border-indigo-200 font-bold">
                    Connect
                  </span>
                </a>
              </div>
            </div>

            {/* Right Column: Mini Metric & Culture Card */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                    The vbrion Collective
                  </span>
                  <span className="text-[10px] font-mono text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-200 font-bold">
                    Core Principles
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 mt-1 shrink-0" />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Direct Executive Governance</h4>
                      <p className="text-xs text-slate-600">Senior partners lead every engagement from day zero to production release.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600 mt-1 shrink-0" />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Multidisciplinary Synergy</h4>
                      <p className="text-xs text-slate-600">Where legal-tech analysts, quantitative mathematicians, and cloud architects sit at the same table.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-purple-600 mt-1 shrink-0" />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Strict Mutual NDA by Default</h4>
                      <p className="text-xs text-slate-600">All discovery sessions and institutional telemetry are bound by enterprise-grade confidentiality.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                  <span>Explore opportunities:</span>
                  <button
                    onClick={() => setCareersModalOpen(true)}
                    className="text-indigo-600 hover:underline font-bold"
                  >
                    View Open Positions &rarr;
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Careers Modal */}
      {careersModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl relative max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setCareersModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 rounded-xl transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200">
                Careers at vbrion
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
                Hiring
              </span>
            </div>

            <h3 className="text-2xl font-montserrat font-bold text-slate-900 mb-2">
              Join Our Engineering &amp; Advisory Collective
            </h3>
            <p className="text-sm text-slate-600 mb-6">
              We look for mathematicians, regulatory counsels, and engineers with an appetite for high-stakes problem solving.
            </p>

            {/* Roles List */}
            <div className="space-y-3 mb-6">
              {sampleRoles.map((role) => (
                <div
                  key={role.id}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-indigo-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-bold text-slate-900">{role.title}</h4>
                      <span className="text-[10px] font-mono text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200 font-bold">
                        {role.tag}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <span>{role.location}</span>
                      <span>&bull;</span>
                      <span>{role.type}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {role.skills.map((s, idx) => (
                        <span key={idx} className="px-2 py-0.5 text-[10px] font-mono bg-white text-indigo-700 border border-slate-200 rounded font-semibold">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <a
                    href={`mailto:${siteConfig.contact.email}?subject=Application for ${encodeURIComponent(role.title)}`}
                    className="shrink-0 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-md transition-all text-center"
                  >
                    Apply Now
                  </a>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
              <span>Don't see your discipline listed? Send your dossier directly:</span>
              <a href={`mailto:${siteConfig.contact.email}`} className="text-indigo-600 font-bold hover:underline">
                {siteConfig.contact.email}
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
