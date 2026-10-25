import React, { useEffect, useRef } from 'react';
import { ArrowRight, Eye, Sparkles, Compass, ShieldCheck, Activity, ChevronDown } from 'lucide-react';
import siteConfig from '../../config/siteConfig';

export default function HeroSection() {
  const canvasRef = useRef(null);

  // Animated Particle & Constellation Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle nodes representing data points and telescope stars
    const particleCount = Math.min(Math.floor(width / 16), 75);
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 1.8 + 0.8,
        alpha: Math.random() * 0.6 + 0.2,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw faint connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.18 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(79, 70, 229, ${p.alpha * 0.7})`;
        ctx.shadowColor = '#6366F1';
        ctx.shadowBlur = 6;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-32 sm:pt-36 pb-16 overflow-hidden bg-[#FAFAFC]"
    >
      {/* Dynamic Animated Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0 opacity-50"
      />

      {/* Background Data Grid Mesh Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-70 z-0 pointer-events-none" />

      {/* Atmospheric Multi-Hue Radiant Gradient Soft Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[500px] bg-gradient-to-tr from-blue-300/20 via-purple-300/20 to-pink-300/20 blur-[130px] rounded-full pointer-events-none z-0" />
      <div className="absolute top-1/3 -left-20 w-[500px] h-[500px] bg-gradient-to-br from-indigo-200/25 to-pink-200/20 blur-[130px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-20 -right-20 w-[550px] h-[550px] bg-gradient-to-tl from-amber-200/20 via-rose-200/20 to-purple-200/20 blur-[130px] rounded-full pointer-events-none z-0" />

      {/* Floating Cyber Accents for Desktop */}
      <div className="hidden xl:block absolute left-12 top-1/3 animate-float pointer-events-none z-10">
        <div className="px-4 py-2.5 rounded-2xl bg-white/95 border border-slate-200/90 backdrop-blur-xl shadow-lg flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse shadow-[0_0_8px_#2563EB]" />
          <div className="text-left">
            <div className="text-[10px] font-mono uppercase text-blue-600 font-bold">Real-Time Inference</div>
            <div className="text-xs font-bold text-slate-800">&lt; 15ms Latency Mesh</div>
          </div>
        </div>
      </div>

      <div className="hidden xl:block absolute right-12 top-2/5 animate-float-delayed pointer-events-none z-10">
        <div className="px-4 py-2.5 rounded-2xl bg-white/95 border border-slate-200/90 backdrop-blur-xl shadow-lg flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-pink-600 animate-pulse shadow-[0_0_8px_#DB2777]" />
          <div className="text-left">
            <div className="text-[10px] font-mono uppercase text-pink-600 font-bold">Regulatory Defense</div>
            <div className="text-xs font-bold text-slate-800">100% Audit Readiness</div>
          </div>
        </div>
      </div>

      <div className="hidden xl:block absolute left-16 bottom-28 animate-float-card pointer-events-none z-10">
        <div className="px-4 py-2.5 rounded-2xl bg-white/95 border border-slate-200/90 backdrop-blur-xl shadow-lg flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10B981]" />
          <div className="text-left">
            <div className="text-[10px] font-mono uppercase text-emerald-600 font-bold">Product Engineering</div>
            <div className="text-xs font-bold text-slate-800">99.99% Enterprise Uptime</div>
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Top Foresight Tag with Radiant Glow */}
        <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/95 border border-slate-200/90 backdrop-blur-xl mb-8 shadow-sm transition-transform hover:scale-105">
          <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-blue-600 to-pink-600 animate-pulse" />
          <span className="text-xs font-bold tracking-wider uppercase text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-600">
            vbrion analytics • Foresight &amp; Engineering
          </span>
          <span className="text-xs text-slate-300 hidden sm:inline">|</span>
          <span className="text-xs text-slate-600 hidden sm:inline flex items-center gap-1.5 font-medium">
            <Eye className="w-3.5 h-3.5 text-pink-600" /> Looking Beyond The Curve
          </span>
        </div>

        {/* Main Headline: "Engineering What's Next" (Proper Capitalization) */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-montserrat font-black tracking-tight text-slate-900 max-w-5xl leading-[1.06] mb-6 drop-shadow-sm">
          Engineering <br className="hidden sm:inline" />
          <span className="text-gradient-aurora animate-shimmer-text">
            What&apos;s Next
          </span>
        </h1>

        {/* Sub-line with perfect grammar and clarity */}
        <p className="text-lg sm:text-xl md:text-2xl text-slate-600 max-w-3xl font-normal leading-relaxed mb-10 text-balance">
          We combine high-stakes strategic consulting with precision data, analytics, 
          and AI engineering—equipping forward-looking enterprises to anticipate market shifts, navigate complex governance, and build sustainable advantage.
        </p>

        {/* CTAs: Vibrant Executive Multi-Color Primary + Clean White Secondary */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-16">
          <a
            href="#portfolio"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 text-base font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/35 transition-all duration-300 hover:scale-[1.04] active:scale-[0.98] group relative overflow-hidden"
          >
            <span className="relative z-10">View Our Work</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1.5 relative z-10" />
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>

          <a
            href="#contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 text-base font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200/90 hover:border-indigo-400 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <span>Get in Touch</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-pink-50 text-pink-700 border border-pink-200 font-mono font-semibold">
              Direct
            </span>
          </a>
        </div>

        {/* Core Horizon Iridescent Cards with Product Development Spotlight */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl w-full pt-6 border-t border-slate-200">
          <div className="card-iridescent p-4 text-left group hover:scale-[1.02] transition-transform">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-600 mb-1.5">
              <Compass className="w-4 h-4 text-blue-600 group-hover:rotate-45 transition-transform" />
              <span>Horizon Vision</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">Predictive foresight into emerging regulatory and market shifts</p>
          </div>

          <div className="card-iridescent p-4 text-left group hover:scale-[1.02] transition-transform">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 mb-1.5">
              <ShieldCheck className="w-4 h-4 text-indigo-600 group-hover:scale-110 transition-transform" />
              <span>Risk &amp; Governance</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">Bulletproof compliance frameworks and board-level oversight</p>
          </div>

          <div className="card-iridescent p-4 text-left group hover:scale-[1.02] transition-transform">
            <div className="flex items-center gap-2 text-xs font-bold text-purple-600 mb-1.5">
              <Activity className="w-4 h-4 text-purple-600 group-hover:scale-110 transition-transform" />
              <span>Product Engineering</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">End-to-end enterprise SaaS, cloud-native platforms, and scalable microservices</p>
          </div>

          <div className="card-iridescent p-4 text-left group hover:scale-[1.02] transition-transform">
            <div className="flex items-center gap-2 text-xs font-bold text-pink-600 mb-1.5">
              <Sparkles className="w-4 h-4 text-pink-600 group-hover:scale-110 transition-transform" />
              <span>AI &amp; Predictive Rigor</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">Production machine learning models and high-throughput streaming telemetry</p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <a
          href="#about"
          className="mt-12 inline-flex flex-col items-center text-xs text-slate-400 hover:text-indigo-600 transition-colors group"
          aria-label="Scroll to About section"
        >
          <span className="tracking-widest uppercase text-[10px] mb-1 font-semibold">Explore vbrion</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-indigo-600" />
        </a>
      </div>
    </section>
  );
}
