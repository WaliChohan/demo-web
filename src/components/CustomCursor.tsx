'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoverLabel, setHoverLabel] = useState('');
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const ringX = useSpring(mouseX, { stiffness: 250, damping: 25 });
  const ringY = useSpring(mouseY, { stiffness: 250, damping: 25 });

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 768px)');
    let isActive = false;

    const onPointerMove = (event: PointerEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
      setIsVisible(true);
    };

    const onPointerOver = (event: PointerEvent) => {
      if (!(event.target instanceof Element)) return;
      const target = event.target.closest<HTMLElement>('[data-cursor-label], [data-cursor-hover]');
      setHoverLabel(target?.dataset.cursorLabel ?? (target ? 'EXPLORE' : ''));
    };

    const onPointerOut = (event: PointerEvent) => {
      if (!(event.target instanceof Element)) return;
      const oldTarget = event.target.closest<HTMLElement>('[data-cursor-label], [data-cursor-hover]');
      const newTarget = event.relatedTarget instanceof Element
        ? event.relatedTarget.closest<HTMLElement>('[data-cursor-label], [data-cursor-hover]')
        : null;
      if (oldTarget !== newTarget) {
        setHoverLabel(newTarget?.dataset.cursorLabel ?? (newTarget ? 'EXPLORE' : ''));
      }
    };

    const onPointerLeave = () => setIsVisible(false);

    const activate = () => {
      if (finePointer.matches && !isActive) {
        document.documentElement.style.cursor = 'none';
        window.addEventListener('pointermove', onPointerMove, { passive: true });
        document.addEventListener('pointerover', onPointerOver);
        document.addEventListener('pointerout', onPointerOut);
        document.addEventListener('pointerleave', onPointerLeave);
        isActive = true;
      } else if (!finePointer.matches && isActive) {
        document.documentElement.style.cursor = '';
        window.removeEventListener('pointermove', onPointerMove);
        document.removeEventListener('pointerover', onPointerOver);
        document.removeEventListener('pointerout', onPointerOut);
        document.removeEventListener('pointerleave', onPointerLeave);
        setIsVisible(false);
        setHoverLabel('');
        isActive = false;
      }
    };

    activate();
    finePointer.addEventListener('change', activate);

    return () => {
      finePointer.removeEventListener('change', activate);
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerover', onPointerOver);
      document.removeEventListener('pointerout', onPointerOut);
      document.removeEventListener('pointerleave', onPointerLeave);
      document.documentElement.style.cursor = '';
    };
  }, [mouseX, mouseY]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block" aria-hidden="true">
      <motion.div
        className="fixed left-0 top-0 flex items-center justify-center rounded-full border border-brand-gold/90 bg-brand-gold/10 text-[8px] font-medium tracking-[0.16em] text-brand-gold shadow-[0_0_20px_rgba(212,175,55,0.4)] mix-blend-screen transition-[width,height,background-color] duration-300"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          width: hoverLabel ? 76 : 38,
          height: hoverLabel ? 76 : 38,
          opacity: isVisible ? 1 : 0,
        }}
      >
        {hoverLabel && <span>{hoverLabel}</span>}
      </motion.div>
    </div>
  );
}
