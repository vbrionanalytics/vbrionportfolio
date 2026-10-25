import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check if device has touch capability or prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (prefersReducedMotion || isTouch) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target;
      const clickable = target.closest('a, button, input, select, textarea, [role="button"], .clickable');
      setIsPointer(!!clickable);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  // Smooth trail animation
  useEffect(() => {
    if (isTouchDevice) return;
    let animationFrameId;

    const follow = () => {
      setTrailingPos(prev => ({
        x: prev.x + (position.x - prev.x) * 0.18,
        y: prev.y + (position.y - prev.y) * 0.18,
      }));
      animationFrameId = requestAnimationFrame(follow);
    };

    animationFrameId = requestAnimationFrame(follow);
    return () => cancelAnimationFrame(animationFrameId);
  }, [position, isTouchDevice]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden transition-opacity duration-300">
      {/* Outer subtle halo ring */}
      <div
        className="fixed rounded-full border border-[#00D4FF]/40 -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-out"
        style={{
          left: `${trailingPos.x}px`,
          top: `${trailingPos.y}px`,
          width: isPointer ? '44px' : '30px',
          height: isPointer ? '44px' : '30px',
          backgroundColor: isPointer ? 'rgba(0, 212, 255, 0.08)' : 'transparent',
          boxShadow: isPointer ? '0 0 15px rgba(0, 212, 255, 0.3)' : 'none',
        }}
      />
      {/* Center glowing dot */}
      <div
        className="fixed rounded-full bg-[#00D4FF] -translate-x-1/2 -translate-y-1/2 shadow-[0_0_8px_#00D4FF]"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: isPointer ? '6px' : '4px',
          height: isPointer ? '6px' : '4px',
        }}
      />
    </div>
  );
}
