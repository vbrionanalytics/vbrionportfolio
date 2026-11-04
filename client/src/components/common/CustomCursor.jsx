import React, { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const posRef = useRef({ x: -100, y: -100 });
  const trailRef = useRef({ x: -100, y: -100 });
  const isPointerRef = useRef(false);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    // Disable on touch devices or if reduced motion is requested
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (prefersReducedMotion || isTouch) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let rAFId = null;

    const handleMouseMove = (e) => {
      posRef.current.x = e.clientX;
      posRef.current.y = e.clientY;

      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        dot.style.opacity = '1';
        ring.style.opacity = '1';
      }

      // Check if hovering interactive element without triggering React renders
      const target = e.target;
      const clickable = !!target?.closest?.('a, button, input, select, textarea, [role="button"], .clickable');

      if (clickable !== isPointerRef.current) {
        isPointerRef.current = clickable;
        if (clickable) {
          ring.style.width = '42px';
          ring.style.height = '42px';
          ring.style.backgroundColor = 'rgba(79, 70, 229, 0.12)';
          ring.style.borderColor = 'rgba(79, 70, 229, 0.55)';
          ring.style.boxShadow = '0 0 16px rgba(79, 70, 229, 0.25)';
        } else {
          ring.style.width = '28px';
          ring.style.height = '28px';
          ring.style.backgroundColor = 'transparent';
          ring.style.borderColor = 'rgba(79, 70, 229, 0.35)';
          ring.style.boxShadow = 'none';
        }
      }

      // Immediate hardware-accelerated transform for pinpoint dot (zero lag)
      dot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
    };

    const handleMouseLeave = () => {
      isVisibleRef.current = false;
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    };

    const handleMouseEnter = () => {
      isVisibleRef.current = true;
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    };

    // Smooth trailing physics running outside React lifecycle
    const renderTrail = () => {
      trailRef.current.x += (posRef.current.x - trailRef.current.x) * 0.22;
      trailRef.current.y += (posRef.current.y - trailRef.current.y) * 0.22;

      ring.style.transform = `translate3d(${trailRef.current.x}px, ${trailRef.current.y}px, 0) translate(-50%, -50%)`;
      rAFId = requestAnimationFrame(renderTrail);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    rAFId = requestAnimationFrame(renderTrail);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (rAFId) cancelAnimationFrame(rAFId);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden hidden md:block">
      {/* Outer subtle halo ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 rounded-full border border-indigo-500/35 opacity-0 pointer-events-none transition-[width,height,background-color,border-color,box-shadow] duration-150 ease-out will-change-transform"
        style={{ width: '28px', height: '28px' }}
      />
      {/* Center pinpoint indicator */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 rounded-full bg-indigo-600 opacity-0 pointer-events-none shadow-[0_0_8px_#4F46E5] will-change-transform"
        style={{ width: '5px', height: '5px' }}
      />
    </div>
  );
}
