'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, type PanInfo } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight, MapPin, MoveHorizontal, Sparkles } from 'lucide-react';
import SplitTextHeading from './SplitTextHeading';

const plotCategories = [
  {
    size: '3 Marla', area: '675 sq ft', price: 'PKR 45 Lac',
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=90&w=2000&auto=format&fit=crop',
    description: 'Smartly designed starter homes with modern finishes, perfect for young families seeking quality living in prime locations.', beds: 2, baths: 2,
  },
  {
    size: '5 Marla', area: '1,125 sq ft', price: 'PKR 75 Lac',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=90&w=2000&auto=format&fit=crop',
    description: 'Elegantly proportioned family residences with spacious interiors, premium fixtures, and landscaped private gardens.', beds: 3, baths: 3,
  },
  {
    size: '7 Marla', area: '1,575 sq ft', price: 'PKR 1.1 Cr',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?q=90&w=2000&auto=format&fit=crop',
    description: 'Refined mid-tier residences offering generous living space, double-height ceilings, and bespoke interior detailing.', beds: 4, baths: 4,
  },
  {
    size: '10 Marla', area: '2,250 sq ft', price: 'PKR 1.8 Cr',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=90&w=2000&auto=format&fit=crop',
    description: 'Executive family homes with grand entrance lobbies, dedicated home offices, and resort-inspired outdoor spaces.', beds: 5, baths: 5,
  },
  {
    size: '1 Kanal', area: '4,500 sq ft', price: 'PKR 3.5 Cr',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=90&w=2000&auto=format&fit=crop',
    description: 'Landmark ultra-luxury estates on full Kanal plots, featuring private pools, staff quarters, and architectural grandeur.', beds: 6, baths: 7,
  },
];

export default function PlotGallery() {
  const [[activeIndex, direction], setSlide] = useState([0, 0]);
  const [isDragging, setIsDragging] = useState(false);
  const current = plotCategories[activeIndex];

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setSlide(([index]) => [(index + 1) % plotCategories.length, 1]);
    }, 7000);
    return () => window.clearTimeout(timer);
  }, [activeIndex]);

  const goTo = (index: number) => {
    setSlide(([currentIndex]) => [index, index >= currentIndex ? 1 : -1]);
  };
  const prev = () => goTo((activeIndex - 1 + plotCategories.length) % plotCategories.length);
  const next = () => goTo((activeIndex + 1) % plotCategories.length);

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false);
    if (info.offset.x < -50 || info.velocity.x < -300) next();
    if (info.offset.x > 50 || info.velocity.x > 300) prev();
  };

  return (
    <section
      id="architecture"
      className="relative isolate min-h-[100svh] w-full overflow-hidden bg-brand-dark"
    >
      <div className="absolute inset-0 z-0" data-cursor-label="DRAG">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={activeIndex}
            custom={direction}
            initial={{ opacity: 0, scale: 1.08, x: direction > 0 ? 24 : -24 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 1.02, x: direction > 0 ? -24 : 24 }}
            transition={{ duration: 0.85, ease: [0.25, 1, 0.5, 1] }}
            className="absolute inset-0"
          >
            <Image src={current.image} alt={`${current.size} architectural residence`} fill sizes="100vw" className="object-cover object-center" priority={activeIndex === 0} />
          </motion.div>
        </AnimatePresence>
        <motion.div
          className="absolute inset-0 z-0 cursor-grab touch-pan-y active:cursor-grabbing"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.12}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={handleDragEnd}
          aria-label="Swipe to browse plot sizes"
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(10,17,40,0.97)_0%,rgba(10,17,40,0.86)_42%,rgba(10,17,40,0.52)_72%,rgba(10,17,40,0.25)_100%)]" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-dark/85 via-transparent to-brand-dark/30" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-7xl flex-col justify-center px-6 pb-36 pt-28 md:px-12 lg:px-20">
        <div className="mb-10 max-w-2xl space-y-4">
          <span className="inline-flex rounded-full border border-brand-gold/40 bg-brand-dark/40 px-4 py-2 text-[11px] font-semibold tracking-[0.25em] text-brand-gold backdrop-blur-md">
            PLOT CATEGORIES
          </span>
          <SplitTextHeading as="h2" text="Find Your Perfect Plot Size" goldWords={['Plot', 'Size']} underline={false} className="text-3xl md:text-5xl" />
          <p className="max-w-xl text-sm leading-relaxed text-white/75 md:text-base">
            From considered starter plots to full Kanal estates, explore a residence designed around the way you want to live.
          </p>
        </div>

        <div className="mb-10 -mx-6 overflow-x-auto px-6 md:mx-0 md:px-0">
          <div className="flex w-max gap-2.5 md:w-auto md:flex-wrap">
            {plotCategories.map((category, index) => (
              <button
                key={category.size}
                type="button"
                onClick={() => goTo(index)}
                aria-pressed={activeIndex === index}
                className={`rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-gold ${activeIndex === index
                  ? 'border-brand-gold bg-brand-gold text-brand-dark shadow-lg shadow-brand-gold/20'
                  : 'border-white/30 bg-brand-dark/45 text-white/80 backdrop-blur-md hover:border-brand-gold/70 hover:text-white'
                }`}
              >
                {category.size}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={`${activeIndex}-details`}
            custom={direction}
            initial={{ opacity: 0, y: 16, x: direction > 0 ? 24 : -24 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: -10, x: direction > 0 ? -24 : 24 }}
            transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
            className="max-w-xl rounded-2xl border border-white/15 bg-brand-dark/70 p-5 shadow-2xl backdrop-blur-xl sm:p-7"
          >
            <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="font-serif text-5xl font-light leading-none text-brand-gold md:text-6xl">{current.size}</p>
                <p className="mt-3 flex items-center gap-2 text-xs uppercase tracking-[0.17em] text-white/60">
                  <MapPin className="h-3.5 w-3.5 text-brand-gold" /> DHA Lahore <span className="text-white/30">·</span> {current.area}
                </p>
              </div>
              <p className="text-right text-xs uppercase tracking-widest text-white/55">
                Starting from <span className="mt-1 block font-serif text-xl tracking-normal text-white">{current.price}</span>
              </p>
            </div>
            <p className="max-w-lg text-sm leading-relaxed text-white/75 md:text-base">{current.description}</p>
            <div className="mt-6 flex items-end justify-between gap-5 border-t border-white/15 pt-5">
              <div className="flex gap-6 text-white/65">
                <p><span className="block font-serif text-2xl text-white">{current.beds}</span><span className="text-[10px] uppercase tracking-widest">Bedrooms</span></p>
                <p><span className="block font-serif text-2xl text-white">{current.baths}</span><span className="text-[10px] uppercase tracking-widest">Bathrooms</span></p>
                <p><span className="block font-serif text-2xl text-brand-gold">{String(activeIndex + 1).padStart(2, '0')}<span className="text-white/35"> / {String(plotCategories.length).padStart(2, '0')}</span></span><span className="text-[10px] uppercase tracking-widest">Collection</span></p>
              </div>
                <a href="#inquire" data-inquiry-category={current.size} className="inline-flex shrink-0 items-center gap-2 rounded-full bg-brand-gold px-4 py-3 text-xs font-semibold text-brand-dark transition hover:bg-white sm:px-5">
                <Sparkles className="h-4 w-4" /><span className="hidden sm:inline">Inquire</span><ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-8 right-6 z-20 flex items-center gap-4 md:right-12 lg:right-[max(5rem,calc((100vw-80rem)/2))]">
        <span className="hidden items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-white/55 sm:flex">
          <MoveHorizontal className={`h-4 w-4 text-brand-gold ${isDragging ? 'scale-125' : ''}`} /> Swipe to explore
        </span>
        <button type="button" onClick={prev} aria-label="Previous plot size" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-brand-dark/65 text-white backdrop-blur-md transition hover:border-brand-gold hover:text-brand-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-gold"><ChevronLeft className="h-5 w-5" /></button>
        <button type="button" onClick={next} aria-label="Next plot size" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-brand-dark/65 text-white backdrop-blur-md transition hover:border-brand-gold hover:text-brand-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-gold"><ChevronRight className="h-5 w-5" /></button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20 flex h-[2px] gap-1 px-6 md:px-12 lg:px-20" role="group" aria-label="Choose plot size">
        {plotCategories.map((category, index) => (
          <button key={category.size} type="button" onClick={() => goTo(index)} aria-label={`Show ${category.size}`} aria-current={activeIndex === index ? 'true' : undefined} className="relative h-full flex-1 bg-white/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-gold">
            {index === activeIndex && <motion.span key={activeIndex} className="absolute inset-y-0 left-0 w-full origin-left bg-brand-gold" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 7, ease: 'linear' }} />}
          </button>
        ))}
      </div>
    </section>
  );
}
