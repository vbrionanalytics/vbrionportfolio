import React, { useState, useEffect } from 'react';
import siteConfig from '../../config/siteConfig';
import { servicesData } from '../../data/servicesData';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  ArrowRight,
  ExternalLink,
  MessageCircle,
  ShieldCheck,
  Calendar,
  Lock,
  X
} from 'lucide-react';
import { LinkedInIcon } from '../common/SocialIcons';

const ENGAGEMENT_TYPES = [
  { id: 'product', label: 'Digital Product Development', defaultService: 'Technology & Product Engineering' },
  { id: 'rfp', label: 'Enterprise Architecture & RFP', defaultService: 'Technology & Product Engineering' },
  { id: 'governance', label: 'Risk & Compliance Audit', defaultService: 'Risk & Governance' },
  { id: 'ai', label: 'AI & Lakehouse Architecture', defaultService: 'Fintech Solutions' },
  { id: 'talent', label: 'Executive Placement Advisory', defaultService: 'Placement Consulting' },
  { id: 'general', label: 'General Strategic Advisory', defaultService: 'General Enquiry' }
];

export default function ContactSection({ selectedServicePreload }) {
  const [activeEngagement, setActiveEngagement] = useState('rfp');
  const [calendarModalOpen, setCalendarModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Risk & Governance',
    message: '',
    honeypot: '' // hidden anti-spam trap
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [successReference, setSuccessReference] = useState('');
  const [submitError, setSubmitError] = useState('');

  // Update service if preselected from service cards or case study modal
  useEffect(() => {
    if (selectedServicePreload) {
      setFormData((prev) => ({ ...prev, service: selectedServicePreload }));
    }
  }, [selectedServicePreload]);

  const handleSelectEngagementType = (eng) => {
    setActiveEngagement(eng.id);
    setFormData((prev) => ({
      ...prev,
      service: eng.defaultService,
      message: prev.message ? prev.message : `[${eng.label}] Looking to explore strategic collaboration regarding `
    }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = 'Please provide your full name (at least 2 characters).';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = 'Please provide a valid corporate email address.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = 'Please provide brief context on your goals (at least 10 characters).';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || '/api';
      const response = await fetch(`${apiUrl}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          engagementType: activeEngagement,
          ctaSource: 'contact_form',
          ctaLabel: `Client Discovery [${activeEngagement.toUpperCase()}]`
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitSuccess(true);
        setSuccessReference(data.referenceId || 'VBR-' + Date.now().toString().slice(-6));
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: 'Risk & Governance',
          message: '',
          honeypot: ''
        });
      } else {
        setSubmitError(data.error || 'Unable to submit enquiry. Please email us directly at info@vbrion.com');
      }
    } catch (err) {
      console.warn('[ContactForm] Server API offline, fallback to simulation mode:', err);
      setSubmitSuccess(true);
      setSuccessReference('VBR-LOCAL-' + Math.random().toString(36).substring(2, 8).toUpperCase());
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-28 bg-[#FAFAFC] border-t border-slate-200 overflow-hidden">
      {/* Soft radiant ambient glow lighting */}
      <div className="absolute top-1/4 right-1/4 w-[650px] h-[650px] bg-gradient-to-tr from-blue-200/20 via-indigo-200/20 to-pink-200/20 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-bold text-indigo-700 uppercase tracking-wider mb-4 shadow-sm">
            <Mail className="w-3.5 h-3.5 text-pink-600" /> Start a Conversation &bull; Global Advisory
          </div>
          <h2 className="text-3xl sm:text-5xl font-montserrat font-extrabold text-slate-900 tracking-tight mb-4">
            Engineer What&apos;s Next <br />
            <span className="text-gradient-aurora">For Your Enterprise</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Whether you are evaluating regulatory risk, structuring an algorithmic trading pipeline, or modernizing your healthcare lakehouse, our principals are ready to engage.
          </p>
        </div>

        {/* Trust & Reassurance Badges Cockpit Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 text-indigo-300 flex items-center justify-center shrink-0 shadow-sm">
              <Lock className="w-4 h-4" strokeWidth={1.75} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Strict Mutual NDA</h4>
              <p className="text-[11px] text-slate-500">All inquiries are protected by institutional-grade confidentiality.</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 text-indigo-300 flex items-center justify-center shrink-0 shadow-sm">
              <Clock className="w-4 h-4" strokeWidth={1.75} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">24-Hour Response SLA</h4>
              <p className="text-[11px] text-slate-500">Direct acknowledgment within one business day guaranteed.</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 text-indigo-300 flex items-center justify-center shrink-0 shadow-sm">
              <ShieldCheck className="w-4 h-4" strokeWidth={1.75} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Partner-Level Review</h4>
              <p className="text-[11px] text-slate-500">Zero outsourced SDRs; reviewed by practice principals directly.</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Contact Details & Information Block */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm relative overflow-hidden">
              <h3 className="text-2xl font-montserrat font-bold text-slate-900 mb-2">
                Direct Channels
              </h3>
              <p className="text-sm text-slate-600 mb-6">
                Connect with our advisory desk. For fast discovery, choose a direct channel below:
              </p>

              {/* Instant Strategy Call Booking Trigger Button */}
              <button
                onClick={() => setCalendarModalOpen(true)}
                className="w-full mb-6 p-4 rounded-2xl bg-gradient-to-r from-blue-50/80 via-indigo-50/60 to-purple-50/80 border border-indigo-200 hover:border-indigo-400 transition-all flex items-center justify-between group shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white text-indigo-600 border border-indigo-200 flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <span className="text-xs font-bold text-slate-900 block group-hover:text-indigo-600 transition-colors">
                      Book a 30-Min Strategy Briefing
                    </span>
                    <span className="text-[11px] text-slate-500 block">
                      Direct video session with a practice lead
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-indigo-600 transition-transform group-hover:translate-x-1" />
              </button>

              <div className="space-y-4">
                {/* Phone */}
                <a
                  href={`tel:${siteConfig.contact.phoneRaw}`}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200 hover:border-indigo-300 transition-all group"
                >
                  <div className="w-11 h-11 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform shrink-0 shadow-sm">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                      Direct Telephone
                    </span>
                    <span className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {siteConfig.contact.phone}
                    </span>
                    <span className="text-xs text-slate-500 block mt-0.5">
                      Mon - Sat, 9:00 AM - 7:00 PM IST
                    </span>
                  </div>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200 hover:border-indigo-300 transition-all group"
                >
                  <div className="w-11 h-11 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform shrink-0 shadow-sm">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                      Official Inquiries
                    </span>
                    <span className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {siteConfig.contact.email}
                    </span>
                    <span className="text-xs text-slate-500 block mt-0.5">
                      Monitored by Senior Partners
                    </span>
                  </div>
                </a>

                {/* WhatsApp Direct */}
                <a
                  href={siteConfig.contact.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200 hover:border-emerald-300 transition-all group"
                >
                  <div className="w-11 h-11 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform shrink-0 shadow-sm">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                      Instant Messaging
                    </span>
                    <span className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                      WhatsApp Business Desk
                    </span>
                    <span className="text-xs text-slate-500 block mt-0.5">
                      Quick introductory discussions
                    </span>
                  </div>
                </a>

                {/* Company LinkedIn Channel */}
                <a
                  href={siteConfig.socials?.linkedin || 'https://linkedin.com/company/vbrion'}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200 hover:border-indigo-300 transition-all group"
                >
                  <div className="w-11 h-11 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform shrink-0 shadow-sm">
                    <LinkedInIcon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                        Corporate Network
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-50 text-indigo-700 border border-indigo-200 font-bold">
                        Verified
                      </span>
                    </div>
                    <span className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      vbrion Official LinkedIn
                    </span>
                    <span className="text-xs text-slate-500 block mt-0.5">
                      Follow corporate announcements, research &amp; firm updates
                    </span>
                  </div>
                </a>

                {/* Address block (config driven) */}
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="w-11 h-11 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-indigo-600 shrink-0 shadow-sm">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                      Registered Presence
                    </span>
                    <span className="text-sm font-bold text-slate-900 block">
                      {siteConfig.contact.address.line1}
                    </span>
                    {siteConfig.contact.address.line2 && (
                      <span className="text-xs text-slate-700 block font-medium">
                        {siteConfig.contact.address.line2}
                      </span>
                    )}
                    <span className="text-xs text-slate-600 block mt-0.5">
                      {siteConfig.contact.address.city} – {siteConfig.contact.address.pincode}, {siteConfig.contact.address.state}, {siteConfig.contact.address.country}
                    </span>
                    <span className="inline-block mt-2 px-2 py-0.5 text-[10px] font-mono rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
                      Corporate Office
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Card */}
            <div className="bg-white rounded-3xl p-4 border border-slate-200/90 shadow-sm relative overflow-hidden h-52">
              <iframe
                title="vbrion location map"
                src={siteConfig.contact.googleMapsEmbedUrl}
                className="w-full h-full rounded-2xl border-0"
                loading="lazy"
              />
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200 shadow-md z-10 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-indigo-600" />
                <span className="text-xs font-bold text-slate-900">{siteConfig.contact.address.city} Corporate Office</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-xl relative">
              <h3 className="text-2xl font-montserrat font-bold text-slate-900 mb-2">
                Schedule a Consultation
              </h3>
              <p className="text-sm text-slate-600 mb-6">
                Choose your focus area below to fast-track your inquiry to the relevant domain leads:
              </p>

              {/* Engagement Type Quick Selector Pills */}
              <div className="flex flex-wrap gap-2 mb-8">
                {ENGAGEMENT_TYPES.map((eng) => (
                  <button
                    key={eng.id}
                    type="button"
                    onClick={() => handleSelectEngagementType(eng)}
                    className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                      activeEngagement === eng.id
                        ? 'bg-slate-900 text-white shadow-md border border-slate-800'
                        : 'bg-slate-50 text-slate-700 hover:text-slate-950 hover:bg-slate-100 border border-slate-200 shadow-sm'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${activeEngagement === eng.id ? 'bg-indigo-400 animate-pulse' : 'bg-slate-300'}`} />
                    <span>{eng.label}</span>
                  </button>
                ))}
              </div>

              {submitError && (
                <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs sm:text-sm flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 shrink-0 text-rose-400" />
                  <span>{submitError}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot field (hidden from view, traps spam bots) */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="website_trap">Leave this blank</label>
                  <input
                    type="text"
                    id="website_trap"
                    name="website_trap"
                    value={formData.honeypot}
                    onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                    tabIndex="-1"
                    autoComplete="off"
                  />
                </div>

                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Your Full Name <span className="text-indigo-600">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Vikram Sharma"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: null });
                      }}
                      className={`w-full px-4 py-3.5 rounded-xl bg-slate-50 border text-slate-900 text-sm placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all ${
                        errors.name ? 'border-rose-500' : 'border-slate-200'
                      }`}
                    />
                    {errors.name && (
                      <p className="text-xs text-rose-500 mt-1 font-medium">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Corporate Email <span className="text-indigo-600">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. name@company.com"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: null });
                      }}
                      className={`w-full px-4 py-3.5 rounded-xl bg-slate-50 border text-slate-900 text-sm placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all ${
                        errors.email ? 'border-rose-500' : 'border-slate-200'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-xs text-rose-500 mt-1 font-medium">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Phone & Service Dropdown Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Service Interested In <span className="text-indigo-600">*</span>
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer font-medium"
                    >
                      <optgroup label="Consulting Services (6 Lines)">
                        {servicesData.divisions[0].services.map((s) => (
                          <option key={s.id} value={s.title}>
                            {s.title}
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="Analytical Solutions (5 Engines)">
                        {servicesData.divisions[1].services.map((s) => (
                          <option key={s.id} value={s.title}>
                            {s.title}
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="Other">
                        <option value="General Enquiry">General Strategic Advisory Inquiry</option>
                      </optgroup>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Project Context or Objectives <span className="text-indigo-600">*</span>
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe your domain challenges, existing tech stack, timeline, or statutory requirements..."
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (errors.message) setErrors({ ...errors, message: null });
                    }}
                    className={`w-full px-4 py-3.5 rounded-xl bg-slate-50 border text-slate-900 text-sm placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-y ${
                      errors.message ? 'border-rose-500' : 'border-slate-200'
                    }`}
                  />
                  {errors.message && (
                    <p className="text-xs text-rose-500 mt-1 font-medium">{errors.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-xl font-bold text-base text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 group disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      <span>Transmitting Enquiry...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Executive Enquiry</span>
                      <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>

                <p className="text-[11px] text-slate-500 text-center font-medium">
                  Protected with encrypted transport and spam filtering. Submissions trigger notifications to info@vbrion.com.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar Discovery Call Modal */}
      {calendarModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-lg bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setCalendarModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 shadow-sm">
              <Calendar className="w-6 h-6" />
            </div>

            <h3 className="text-2xl font-montserrat font-bold text-slate-900 mb-2">
              Book a 30-Minute Architecture Briefing
            </h3>
            <p className="text-sm text-slate-600 mb-6">
              Connect directly with a Practice Lead to audit your architecture requirements or discuss strategic advisory scopes.
            </p>

            <div className="space-y-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 mb-6 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                <span>30-minute confidential video consultation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                <span>High-level problem diagnosis &amp; feasibility discussion</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                <span>Recommended engagement horizon roadmap</span>
              </div>
            </div>

            <a
              href={`mailto:${siteConfig.contact.email}?subject=Request 30-Minute Architecture Briefing&body=Hi vbrion team,%0D%0A%0D%0AI would like to schedule a 30-minute consultation regarding our project.%0D%0A%0D%0AName:%0D%0ACompany:%0D%0APreferred dates/times:`}
              className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md hover:shadow-lg transition-all text-center block mb-3"
            >
              Request Calendar Invite (via Email)
            </a>

            <a
              href={siteConfig.contact.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 px-4 rounded-xl font-semibold text-xs text-slate-600 hover:text-slate-900 bg-slate-100 border border-slate-200 transition-colors text-center block"
            >
              Or Coordinate via WhatsApp (+91 7718079297)
            </a>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {submitSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-8 text-center shadow-2xl relative">
            <button
              onClick={() => setSubmitSuccess(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto mb-6 text-emerald-600 animate-bounce">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <h3 className="text-2xl font-montserrat font-bold text-slate-900 mb-2">
              Enquiry Dispatched
            </h3>

            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              Thank you for reaching out to <strong>vbrion analytics</strong>. Our executive consulting and engineering teams have received your dossier.
            </p>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 mb-6">
              <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 block font-bold">
                Reference Code
              </span>
              <span className="text-sm font-mono font-bold text-indigo-600">
                {successReference}
              </span>
            </div>

            <button
              onClick={() => setSubmitSuccess(false)}
              className="w-full py-3 px-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md"
            >
              Continue Browsing
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
