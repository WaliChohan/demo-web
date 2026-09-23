'use client';

import { motion, type Variants } from 'framer-motion';

interface SplitTextHeadingProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4';
  className?: string;
  goldWords?: string[];
  underline?: boolean;
  inView?: boolean;
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const wordVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 1, 0.5, 1] as [number, number, number, number],
    },
  },
};

export default function SplitTextHeading({
  text,
  as: Component = 'h2',
  className = '',
  goldWords = [],
  underline = false,
  inView = true,
}: SplitTextHeadingProps) {
  const words = text.split(' ');

  const MotionTag = motion[Component];

  const motionProps = inView
    ? {
        initial: 'hidden',
        whileInView: 'visible',
        viewport: { once: true, amount: 0.2 },
      }
    : {
        initial: 'hidden',
        animate: 'visible',
      };

  return (
    <div className="relative inline-block group cursor-pointer" data-cursor-text data-cursor-hover>
      <MotionTag
        variants={containerVariants}
        {...motionProps}
        className={`font-serif tracking-tight transition-all duration-300 group-hover:tracking-wide select-none ${className}`}
        aria-label={text}
      >
        {words.map((word, i) => {
          const cleanWord = word.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '');
          const isGold = goldWords.some(
            (gw) => gw.toLowerCase() === cleanWord.toLowerCase()
          );

          return (
            <motion.span
              key={i}
              variants={wordVariants}
              className={`inline-block mr-[0.25em] transition-transform duration-300 group-hover:-translate-y-0.5 ${
                isGold
                  ? 'text-brand-gold font-normal'
                  : 'text-white font-light'
              }`}
            >
              {word}
            </motion.span>
          );
        })}
      </MotionTag>

      {/* Gold underline draw effect on hover */}
      {underline && (
        <span
          className="absolute -bottom-1 left-0 w-full h-[1.5px] bg-gradient-to-r from-brand-gold via-[#FFF2A3] to-brand-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left pointer-events-none"
        />
      )}
    </div>
  );
}
