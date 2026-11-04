import React, { useState, useEffect } from 'react';
import siteConfig from '../../config/siteConfig';
import { MessageCircle, Phone, ArrowUp, ChevronUp } from 'lucide-react';

export default function FloatingQuickActions() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <aside aria-label="Quick contact actions" className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto">
      {/* Scroll to Top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="w-10 h-10 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-indigo-600 shadow-md flex items-center justify-center transition-all hover:scale-110 active:scale-95"
          aria-label="Scroll to top of page"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}

      {/* Quick Phone Call Button */}
      <a
        href={`tel:${siteConfig.contact.phoneRaw}`}
        className="w-12 h-12 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-indigo-600 shadow-md flex items-center justify-center transition-all duration-300 hover:scale-110 group relative"
        aria-label={`Call vbrion directly at ${siteConfig.contact.phone}`}
      >
        <Phone className="w-5 h-5 group-hover:rotate-12 transition-transform" />
        <span className="absolute right-14 bg-slate-900 text-white text-xs font-semibold py-1.5 px-3 rounded-xl border border-slate-800 shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Call {siteConfig.contact.phone}
        </span>
      </a>

      {/* Floating WhatsApp Action Button */}
      <a
        href={siteConfig.contact.whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className="w-13 h-13 p-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white shadow-[0_0_20px_rgba(16,185,129,0.5)] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group relative"
        aria-label="Chat on WhatsApp with vbrion"
      >
        <MessageCircle className="w-7 h-7 fill-white text-emerald-500" />
        <span className="absolute right-16 bg-slate-900 text-white text-xs font-semibold py-1.5 px-3 rounded-xl border border-slate-800 shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Chat on WhatsApp (+91 7718079297)
        </span>
      </a>
    </aside>
  );
}
