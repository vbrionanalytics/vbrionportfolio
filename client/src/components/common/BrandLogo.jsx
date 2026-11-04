import React from 'react';

export default function BrandLogo({ size = 'default', showTagline = false, className = '' }) {
  const isCompact = size === 'sm';
  const isLarge = size === 'lg';
  const isHeader = size === 'header' || size === 'default';

  // Responsive sizing tailored for prominent visibility and crystal-clear typography
  const logoHeight = isCompact 
    ? 'h-12 sm:h-14' 
    : isLarge 
    ? 'h-24 sm:h-28' 
    : 'h-16 sm:h-20 lg:h-24'; // Header / Default size: large and bold

  return (
    <a 
      href="/#hero" 
      className={`inline-flex items-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00D4FF] rounded-2xl py-1 px-1 transition-all ${className}`}
      aria-label="vbrion analytics home"
    >
      {/* Complete Official Brand Logo housed in an executive slate badge for crystal-clear contrast */}
      <div className={`relative flex items-center justify-center shrink-0 ${logoHeight} px-3 py-1 bg-slate-900/95 border border-slate-800 rounded-2xl shadow-sm transition-transform duration-300 group-hover:scale-105 group-hover:border-indigo-500/50 group-hover:shadow-indigo-500/20`}>
        <img
          src="/vbrion-full-logo-transparent.png"
          alt="vbrion analytics - engineering what's next"
          className="h-full w-auto max-w-none object-contain filter drop-shadow-[0_0_8px_rgba(56,189,248,0.35)] transition-all duration-300"
          onError={(e) => {
            e.currentTarget.src = '/vbrion-full-logo.png';
          }}
        />
      </div>
    </a>
  );
}
