'use client';

import { useState } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
  type PanInfo,
} from 'framer-motion';
import { ChevronLeft, ChevronRight, MapPin, Sparkles, MoveHorizontal } from 'lucide-react';
import SplitTextHeading from './SplitTextHeading';

const plotCategories = [
  {
    size: '3 Marla',
    area: '675 sq ft',
    price: 'PKR 45 Lac',
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1200&auto=format&fit=crop',
    description: 'Smartly designed starter homes with modern finishes, perfect for young families seeking quality living in prime locations.',
    beds: 2,
    baths: 2,
  },
  {
    size: '5 Marla',
    area: '1,125 sq ft',
    price: 'PKR 75 Lac',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
    description: 'Elegantly proportioned family residences with spacious interiors, premium fixtures, and landscaped private gardens.',
    beds: 3,
    baths: 3,
  },
  {
    size: '7 Marla',
    area: '1,575 sq ft',
    price: 'PKR 1.1 Cr',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=1200&auto=format&fit=crop',
    description: 'Refined mid-tier residences offering generous living space, double-height ceilings, and bespoke interior detailing.',
    beds: 4,
    baths: 4,
  },
  {
    size: '10 Marla',
    area: '2,250 sq ft',
    price: 'PKR 1.8 Cr',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop',
    description: 'Executive family homes with grand entrance lobbies, dedicated home offices, and resort-inspired outdoor spaces.',
    beds: 5,
    baths: 5,
  },
  {
    size: '1 Kanal',
    area: '4,500 sq ft',
    price: 'PKR 3.5 Cr',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop',
    description: 'Landmark ultra-luxury estates on full Kanal plots, featuring private pools, staff quarters, and architectural grandeur.',
    beds: 6,
    baths: 7,
  },
];

const variants = {
  enter: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? 70 : -70,
  }),
  center: {
    opacity: 1,
    x: 0,
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? -70 : 70,
  }),
};

// Image pan-on-hover hook
function usePanEffect() {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 18 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 18 });
  const panX = useTransform(springX, [0, 1], ['-3%', '3%']);
  const panY = useTransform(springY, [0, 1], ['-3%', '3%']);
  const scale = useSpring(1.06, { stiffness: 80, damping: 20 });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
    scale.set(1.1);
  };

  const onMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
    scale.set(1.06);
  };

  return { panX, panY, scale, onMouseMove, onMouseLeave };
}

export default function PlotGallery() {
  const [[activeIndex, direction], setSlide] = useState([0, 0]);
  const [isDragging, setIsDragging] = useState(false);
  const pan = usePanEffect();
  const current = plotCategories[activeIndex];

  const goTo = (index: number) => {
    const dir = index > activeIndex ? 1 : -1;
    setSlide([index, dir]);
  };

  const prev = () => goTo((activeIndex - 1 + plotCategories.length) % plotCategories.length);
  const next = () => goTo((activeIndex + 1) % plotCategories.length);

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false);
    const threshold = 40;
    const velocityThreshold = 250;

    if (info.offset.x < -threshold || info.velocity.x < -velocityThreshold) {
      next();
    } else if (info.offset.x > threshold || info.velocity.x > velocityThreshold) {
      prev();
    }
  };

  return (
    <motion.section
      id="architecture"
      initial={{ opacity: 0, y: 50, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
      className="py-24 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto"
      style={{ willChange: 'transform, opacity' }}
    >
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span
            data-cursor-hover
            className="text-brand-gold text-xs font-semibold tracking-[0.25em] uppercase border border-brand-gold/30 hover:border-brand-gold/60 px-3.5 py-1 rounded-full inline-block transition-transform duration-300 hover:scale-105 cursor-default"
          >
            PLOT CATEGORIES
          </span>
        </motion.div>

        <div>
          <SplitTextHeading
            as="h2"
            text="Find Your Perfect Plot Size"
            goldWords={['Plot', 'Size']}
            underline
            className="text-3xl md:text-5xl"
          />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-brand-muted text-sm md:text-base font-light"
        >
          From starter plots to full Kanal estates — curated for every lifestyle.
        </motion.p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-2.5 mb-12">
        {plotCategories.map((cat, i) => (
          <button
            key={cat.size}
            onClick={() => goTo(i)}
            data-cursor-hover
            className={`px-5 py-2 rounded-full text-sm font-medium tracking-wide border transition-all duration-300 hover:scale-105 ${
              activeIndex === i
                ? 'bg-brand-gold text-black border-brand-gold shadow-lg shadow-brand-gold/20 scale-105'
                : 'border-white/15 text-brand-muted hover:border-brand-gold/40 hover:text-white'
            }`}
          >
            {cat.size}
          </button>
        ))}
      </div>

      {/* Main Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left: Details */}
        <div className="lg:col-span-5 space-y-7 order-2 lg:order-1">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeIndex + '-details'}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
              className="space-y-6"
            >
              {/* Size label */}
              <div className="flex items-center gap-3">
                <span
                  data-cursor-text
                  className="font-serif text-5xl md:text-6xl font-light text-brand-gold leading-none hover:tracking-wide transition-all duration-300"
                >
                  {current.size}
                </span>
                <div className="flex flex-col text-xs text-brand-muted tracking-widest uppercase gap-1">
                  <span>{current.area}</span>
                  <span className="text-white/40">Plot Area</span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center gap-2">
                <div className="h-px w-8 bg-brand-gold/40" />
                <p className="text-lg font-serif text-white">
                  Starting from{' '}
                  <span className="text-brand-gold font-semibold">{current.price}</span>
                </p>
              </div>

              {/* Description */}
              <p className="text-brand-muted text-base font-light leading-relaxed">
                {current.description}
              </p>

              {/* Specs */}
              <div className="flex gap-6 text-sm text-brand-muted">
                <div className="flex flex-col gap-0.5">
                  <span className="text-2xl font-serif text-white">{current.beds}</span>
                  <span className="text-xs uppercase tracking-widest text-brand-muted/70">
                    Bedrooms
                  </span>
                </div>
                <div className="w-px bg-white/10" />
                <div className="flex flex-col gap-0.5">
                  <span className="text-2xl font-serif text-white">{current.baths}</span>
                  <span className="text-xs uppercase tracking-widest text-brand-muted/70">
                    Bathrooms
                  </span>
                </div>
                <div className="w-px bg-white/10" />
                <div className="flex flex-col gap-0.5">
                  <span className="text-2xl font-serif text-brand-gold">
                    {activeIndex + 1}/{plotCategories.length}
                  </span>
                  <span className="text-xs uppercase tracking-widest text-brand-muted/70">
                    Category
                  </span>
                </div>
              </div>

              {/* CTA */}
              <div className="pt-2">
                <a
                  href="#inquire"
                  data-cursor-hover
                  className="inline-flex items-center gap-2 bg-brand-gold hover:bg-brand-gold-hover text-black font-medium px-7 py-3.5 rounded-full transition-all duration-300 shadow-lg shadow-brand-gold/15 text-sm hover:scale-105"
                >
                  <Sparkles className="w-4 h-4" />
                  Inquire About {current.size}
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right: Gesture-based Draggable Image Carousel */}
        <div className="lg:col-span-7 relative order-1 lg:order-2 select-none">
          <motion.div
            className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl cursor-grab active:cursor-grabbing group hover:border-brand-gold/40 transition-colors duration-300"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.25}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={handleDragEnd}
            onMouseMove={pan.onMouseMove}
            onMouseLeave={pan.onMouseLeave}
            data-cursor-hover
          >
            {/* Image with pan effect */}
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeIndex + '-img'}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                className="absolute inset-0 pointer-events-none"
              >
                <motion.img
                  src={current.image}
                  alt={current.size + ' plot'}
                  className="w-full h-full object-cover"
                  style={{ x: pan.panX, y: pan.panY, scale: pan.scale }}
                  transition={{ type: 'spring', stiffness: 60, damping: 18 }}
                  draggable={false}
                />
              </motion.div>
            </AnimatePresence>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

            {/* Location badge */}
            <div className="absolute top-4 left-4 bg-brand-dark/80 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs flex items-center gap-1.5 text-white border border-white/15 pointer-events-none">
              <MapPin className="w-3 h-3 text-brand-gold" />
              DHA Lahore — Bajwa Estate
            </div>

            {/* Interactive Drag Cue Badge */}
            <div className="absolute top-4 right-4 bg-brand-dark/80 backdrop-blur-md px-3 py-1.5 rounded-full text-[11px] flex items-center gap-1.5 text-brand-muted border border-white/15 pointer-events-none">
              <MoveHorizontal className={`w-3.5 h-3.5 text-brand-gold ${isDragging ? 'scale-125' : 'animate-pulse'}`} />
              <span className="text-white/80">Swipe / Drag</span>
            </div>

            {/* Visual Drag Cue Arrows (bouncing & highlighted) */}
            <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 pointer-events-none">
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                animate={{ x: [-3, 2, -3] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                data-cursor-hover
                className={`pointer-events-auto w-11 h-11 rounded-full bg-brand-dark/80 backdrop-blur-md border flex items-center justify-center transition-all duration-300 shadow-xl ${
                  isDragging
                    ? 'border-brand-gold text-brand-gold scale-110 shadow-brand-gold/30'
                    : 'border-white/20 text-white hover:border-brand-gold hover:text-brand-gold hover:scale-110'
                }`}
                aria-label="Previous plot"
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>

              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                animate={{ x: [3, -2, 3] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                data-cursor-hover
                className={`pointer-events-auto w-11 h-11 rounded-full bg-brand-dark/80 backdrop-blur-md border flex items-center justify-center transition-all duration-300 shadow-xl ${
                  isDragging
                    ? 'border-brand-gold text-brand-gold scale-110 shadow-brand-gold/30'
                    : 'border-white/20 text-white hover:border-brand-gold hover:text-brand-gold hover:scale-110'
                }`}
                aria-label="Next plot"
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Dot indicators */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 pointer-events-auto">
              {plotCategories.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    goTo(i);
                  }}
                  data-cursor-hover
                  className={`rounded-full transition-all duration-300 ${
                    i === activeIndex
                      ? 'w-7 h-1.5 bg-brand-gold shadow-[0_0_8px_rgba(212,175,55,0.6)]'
                      : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/70'
                  }`}
                  aria-label={`Go to ${plotCategories[i].size}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
