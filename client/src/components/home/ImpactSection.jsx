import React, { useState, useEffect, useRef } from 'react';
import siteConfig from '../../config/siteConfig';
import { TrendingUp, Award, CheckCircle, Sparkles } from 'lucide-react';

function CounterItem({ targetValue, suffix, decimals = 0, isTriggered }) {
  const [current, setCurrent] = useState(targetValue);

  useEffect(() => {
    if (!isTriggered) return;
    let startTimestamp = null;
    const duration = 1600; // ms

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const val = ease * targetValue;
      setCurrent(decimals > 0 ? parseFloat(val.toFixed(decimals)) : Math.floor(val));

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    setCurrent(0);
    requestAnimationFrame(step);
  }, [isTriggered, targetValue, decimals]);

  return (
    <span>
      {decimals > 0 ? current.toFixed(decimals) : current}
      {suffix}
    </span>
  );
}

export default function ImpactSection() {
  const [hasTriggered, setHasTriggered] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setHasTriggered(true);
        }
      },
      { threshold: 0.05 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    const fallbackTimer = setTimeout(() => setHasTriggered(true), 1200);

    return () => {
      observer.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <section
      id="impact"
      ref={sectionRef}
      className="relative py-28 bg-[#FAFAFC] border-t border-slate-200 overflow-hidden"
    >
      {/* Ambient soft radiant lighting mesh */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-gradient-to-r from-blue-200/20 via-indigo-200/20 to-pink-200/20 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-bold text-indigo-700 uppercase tracking-wider mb-4 shadow-sm">
            <TrendingUp className="w-3.5 h-3.5 text-pink-600" /> Empirical Benchmark Metrics
          </div>
          <h2 className="text-3xl sm:text-5xl font-montserrat font-extrabold text-slate-900 tracking-tight mb-4">
            Impact in Numbers <br />
            <span className="text-gradient-aurora">Engineered for Quantifiable Value</span>
          </h2>
          <p className="text-base text-slate-600">
            Target metrics and benchmark performance outcomes delivered across enterprise deployments.
          </p>
        </div>

        {/* Counter Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {siteConfig.impactMetrics.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-3xl p-8 bg-white border border-slate-200/90 hover:border-purple-300 text-center transition-all duration-500 shadow-sm hover:shadow-xl hover:-translate-y-2 overflow-hidden"
            >
              {/* Top multi-hue shine on hover */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />

              <div className="relative z-10">
                <div className="text-[10px] font-mono text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full inline-block mb-4 border border-indigo-200 uppercase tracking-wider font-bold">
                  {item.note}
                </div>

                <div className="text-4xl sm:text-5xl lg:text-6xl font-montserrat font-black text-slate-900 tracking-tight mb-3 group-hover:text-indigo-600 transition-all duration-300">
                  <CounterItem
                    targetValue={item.value}
                    suffix={item.suffix}
                    decimals={item.decimals || 0}
                    isTriggered={hasTriggered}
                  />
                </div>

                <div className="h-0.5 w-12 bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-600 mx-auto mb-4 group-hover:w-20 transition-all duration-300" />

                <p className="text-sm font-semibold text-slate-700 leading-snug">
                  {item.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
