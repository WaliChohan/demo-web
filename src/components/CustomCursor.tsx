'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [hoverType, setHoverType] = useState<'default' | 'action' | 'text'>('default');
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth trailing spring ring
  const ringX = useSpring(mouseX, { stiffness: 140, damping: 18, mass: 0.5 });
  const ringY = useSpring(mouseY, { stiffness: 140, damping: 18, mass: 0.5 });

  // Fast follower dot
  const dotX = useSpring(mouseX, { stiffness: 350, damping: 24, mass: 0.2 });
  const dotY = useSpring(mouseY, { stiffness: 350, damping: 24, mass: 0.2 });

  const ringScale = useMotionValue(1);
  const ringScaleSpring = useSpring(ringScale, { stiffness: 220, damping: 22 });
  const dotScale = useMotionValue(1);
  const dotScaleSpring = useSpring(dotScale, { stiffness: 250, damping: 20 });

  const hoverRef = useRef<'default' | 'action' | 'text'>('default');

  useEffect(() => {
    const checkIsTouchOrMobile = () => {
      return (
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.innerWidth < 768
      );
    };

    if (checkIsTouchOrMobile()) {
      document.documentElement.style.cursor = '';
      return;
    }

    document.documentElement.style.cursor = 'none';

    const handleResize = () => {
      if (checkIsTouchOrMobile()) {
        document.documentElement.style.cursor = '';
        setIsVisible(false);
      } else {
        document.documentElement.style.cursor = 'none';
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (checkIsTouchOrMobile()) return;
      if (!isVisible) setIsVisible(true);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseLeaveWindow = () => {
      setIsVisible(false);
    };

    const handleMouseEnterWindow = () => {
      if (!checkIsTouchOrMobile()) {
        setIsVisible(true);
      }
    };

    const updateHoverState = (type: 'default' | 'action' | 'text') => {
      hoverRef.current = type;
      setHoverType(type);

      if (type === 'action') {
        ringScale.set(2.4);
        dotScale.set(0);
      } else if (type === 'text') {
        ringScale.set(2.8);
        dotScale.set(0.3);
      } else {
        ringScale.set(1);
        dotScale.set(1);
      }
    };

    const handleElementHover = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      if (target.matches('[data-cursor-text], h1, h2, h3, h4')) {
        updateHoverState('text');
      } else {
        updateHoverState('action');
      }
    };

    const handleElementLeave = () => {
      updateHoverState('default');
    };

    const attachListeners = () => {
      if (checkIsTouchOrMobile()) return [];
      const interactiveEls = document.querySelectorAll<HTMLElement>(
        'a, button, [data-cursor-hover], [data-cursor-text], h1, h2, h3, h4'
      );
      interactiveEls.forEach((el) => {
        el.style.cursor = 'none';
        el.addEventListener('mouseenter', handleElementHover);
        el.addEventListener('mouseleave', handleElementLeave);
      });
      return interactiveEls;
    };

    const els = attachListeners();

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize);
    document.addEventListener('mouseleave', handleMouseLeaveWindow);
    document.addEventListener('mouseenter', handleMouseEnterWindow);

    // Re-bind when DOM mutations happen
    const observer = new MutationObserver(() => attachListeners());
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.documentElement.style.cursor = '';
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
      document.removeEventListener('mouseenter', handleMouseEnterWindow);
      observer.disconnect();
      els.forEach((el) => {
        el.removeEventListener('mouseenter', handleElementHover);
        el.removeEventListener('mouseleave', handleElementLeave);
      });
    };
  }, [isVisible, mouseX, mouseY, ringScale, dotScale]);

  return (
    <div className="hidden md:block">
      {/* Outer interactive ring */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] transition-opacity duration-300"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          scale: ringScaleSpring,
          opacity: isVisible ? 1 : 0,
        }}
      >
        <div
          className={`w-9 h-9 rounded-full border transition-all duration-300 ${
            hoverType === 'action'
              ? 'border-brand-gold bg-brand-gold/15 shadow-[0_0_20px_rgba(212,175,55,0.5)]'
              : hoverType === 'text'
              ? 'border-brand-gold/90 bg-brand-gold/10 backdrop-blur-[1px] shadow-[0_0_25px_rgba(212,175,55,0.4)]'
              : 'border-brand-gold/80 bg-transparent'
          }`}
          style={{
            borderWidth: hoverType === 'default' ? '1.5px' : '2px',
          }}
        />
      </motion.div>

      {/* Inner precise dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] transition-opacity duration-300"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          scale: dotScaleSpring,
          opacity: isVisible ? 1 : 0,
        }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-brand-gold shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
      </motion.div>
    </div>
  );
}
