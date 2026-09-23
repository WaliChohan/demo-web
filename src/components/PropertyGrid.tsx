'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { AnimatePresence, animate, motion, useMotionValue, type PanInfo } from 'framer-motion';
import Image from 'next/image';
import { MapPin, Bed, Bath, Square, ArrowUpRight, ChevronLeft, ChevronRight, MoveHorizontal } from 'lucide-react';
import SplitTextHeading from './SplitTextHeading';

const properties = [
  {
    id: 1,
    title: 'The Obsidian Villa',
    location: 'Beverly Hills, CA',
    price: '$18,500,000',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=800&auto=format&fit=crop',
    beds: 6,
    baths: 8,
    sqft: '9,400',
    tag: 'Signature Estate',
  },
  {
    id: 2,
    title: 'The Horizon Glasshouse',
    location: 'Malibu, CA',
    price: '$24,000,000',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
    beds: 5,
    baths: 7,
    sqft: '8,200',
    tag: 'Waterfront',
  },
  {
    id: 3,
    title: 'Villa Solstice',
    location: 'Aspen, CO',
    price: '$15,800,000',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop',
    beds: 4,
    baths: 6,
    sqft: '7,100',
    tag: 'Mountain Retreat',
  },
  {
    id: 4,
    title: 'The Sovereign Pavilion',
    location: 'Palm Jumeirah, Dubai',
    price: '$29,000,000',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop',
    beds: 7,
    baths: 9,
    sqft: '12,500',
    tag: 'Ultra-Luxury',
  },
  {
    id: 5,
    title: 'Lumina Ridge Estate',
    location: 'Lake Como, Italy',
    price: '$21,400,000',
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=800&auto=format&fit=crop',
    beds: 5,
    baths: 6,
    sqft: '8,800',
    tag: 'Panoramic Lake',
  },
];

export default function PropertyGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [maxDrag, setMaxDrag] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const x = useMotionValue(0);

  useEffect(() => {
    const updateConstraints = () => {
      if (containerRef.current && trackRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const trackWidth = trackRef.current.scrollWidth;
        const diff = trackWidth - containerWidth;
        const cardWidth = trackRef.current.firstElementChild?.getBoundingClientRect().width ?? 380;
        const nextMaxDrag = Math.max(0, diff);
        const nextMaxIndex = Math.min(properties.length - 1, Math.ceil(nextMaxDrag / (cardWidth + 32)));
        setMaxDrag(nextMaxDrag);
        setMaxIndex(nextMaxIndex);
        setCurrentIndex((current) => Math.min(current, nextMaxIndex));
        x.set(Math.max(-nextMaxDrag, Math.min(0, x.get())));
      }
    };

    updateConstraints();
    window.addEventListener('resize', updateConstraints);
    return () => window.removeEventListener('resize', updateConstraints);
  }, [x]);

  const slideTo = useCallback((index: number) => {
    const nextIdx = Math.max(0, Math.min(index, properties.length - 1));
    setCurrentIndex(nextIdx);
    const cardWidth = (trackRef.current?.firstElementChild?.getBoundingClientRect().width ?? 380) + 32;
    const targetX = -nextIdx * cardWidth;
    animate(x, Math.max(-maxDrag, targetX), { duration: 0.65, ease: [0.25, 1, 0.5, 1] });
  }, [maxDrag, x]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      slideTo(currentIndex >= maxIndex ? 0 : currentIndex + 1);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [currentIndex, maxIndex, slideTo]);

  const handlePrev = () => slideTo(currentIndex - 1);
  const handleNext = () => slideTo(currentIndex + 1);

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false);
    if (info.offset.x < -60) {
      handleNext();
    } else if (info.offset.x > 60) {
      handlePrev();
    }
  };

  return (
    <motion.section
      id="properties"
      initial={{ opacity: 0, y: 50, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
      className="relative isolate min-h-[100svh] w-full overflow-hidden bg-brand-dark px-6 py-24 md:px-12 lg:px-20"
      style={{ willChange: 'transform, opacity' }}
    >
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            className="absolute inset-0"
          >
            <Image src={properties[currentIndex].image} alt="" fill sizes="100vw" className="object-cover object-center" />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,17,40,0.97)_0%,rgba(10,17,40,0.88)_42%,rgba(10,17,40,0.7)_72%,rgba(10,17,40,0.58)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/25 to-brand-dark/65" />
      </div>
      <div className="relative z-10 mx-auto max-w-7xl">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div className="max-w-2xl space-y-3">
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
              CURATED PORTFOLIO
            </span>
          </motion.div>

          <div>
            <SplitTextHeading
              as="h2"
              text="Featured Architectural Estates"
              goldWords={['Architectural', 'Estates']}
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
            Explore iconic luxury residences meticulously crafted with modern elegance and timeless design.
          </motion.p>
        </div>

        {/* Drag Cue & Navigation Controls */}
        <div className="flex items-center gap-4 self-start md:self-end">
          <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-card/60 border border-white/10 text-xs text-brand-muted">
            <MoveHorizontal className={`w-3.5 h-3.5 text-brand-gold ${isDragging ? 'scale-125' : 'animate-pulse'}`} />
            <span>Swipe or drag estates</span>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-2">
            <motion.button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              animate={{ x: [-2, 2, -2] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
              data-cursor-hover
              className="w-11 h-11 rounded-full border border-white/15 bg-brand-card/80 hover:border-brand-gold hover:text-brand-gold flex items-center justify-center text-white transition-all duration-300 disabled:opacity-30 disabled:hover:border-white/15 disabled:hover:text-white shadow-lg"
              aria-label="Previous estates"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            <motion.button
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              animate={{ x: [2, -2, 2] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
              data-cursor-hover
              className="w-11 h-11 rounded-full border border-white/15 bg-brand-card/80 hover:border-brand-gold hover:text-brand-gold flex items-center justify-center text-white transition-all duration-300 disabled:opacity-30 disabled:hover:border-white/15 disabled:hover:text-white shadow-lg"
              aria-label="Next estates"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Draggable Property Cards Container */}
      <div ref={containerRef} className="cursor-grab active:cursor-grabbing select-none overflow-hidden touch-pan-y">
        <motion.div
          ref={trackRef}
          drag="x"
          dragConstraints={{ left: -maxDrag, right: 0 }}
          dragElastic={0.2}
          style={{ x }}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={handleDragEnd}
          className="flex gap-8"
        >
          {properties.map((property) => (
            <motion.div
              key={property.id}
              className="w-[calc(100vw-3rem)] flex-shrink-0 bg-brand-card/90 border border-white/15 rounded-2xl overflow-hidden group hover:border-brand-gold/60 transition-all duration-500 flex flex-col shadow-2xl hover:shadow-brand-gold/10 sm:w-[380px]"
              data-cursor-label="VIEW"
            >
              {/* Property Image Container with hover zoom */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  sizes="(max-width: 640px) 320px, 380px"
                  draggable={false}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-70 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none" />

                {/* Badge Tag */}
                <div className="absolute top-4 left-4 bg-brand-dark/80 backdrop-blur-md px-3 py-1 rounded-full text-white text-[11px] font-medium tracking-wider uppercase border border-white/15">
                  {property.tag}
                </div>

                {/* Price Tag */}
                <div className="absolute top-4 right-4 bg-brand-dark/85 backdrop-blur-md px-3.5 py-1.5 rounded-full text-brand-gold text-sm font-semibold border border-brand-gold/30 group-hover:border-brand-gold transition-colors">
                  {property.price}
                </div>
              </div>

              {/* Card Info */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-1.5 text-brand-muted text-xs tracking-wider uppercase font-medium mb-2">
                    <MapPin className="w-3.5 h-3.5 text-brand-gold" />
                    <span>{property.location}</span>
                  </div>
                  <h3
                    data-cursor-text
                    className="text-xl font-serif text-white group-hover:text-brand-gold group-hover:tracking-wide transition-all duration-300 font-normal"
                  >
                    {property.title}
                  </h3>
                </div>

                {/* Property Specs */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-brand-muted font-light">
                  <div className="flex items-center gap-1">
                    <Bed className="w-4 h-4 text-brand-gold/80" />
                    <span>{property.beds} Beds</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bath className="w-4 h-4 text-brand-gold/80" />
                    <span>{property.baths} Baths</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Square className="w-4 h-4 text-brand-gold/80" />
                    <span>{property.sqft} Sq Ft</span>
                  </div>
                </div>

                {/* View Estate CTA */}
                <div className="pt-2">
                  <a
                    href="#inquire"
                    data-cursor-hover
                    className="w-full border border-brand-gold/30 group-hover:border-brand-gold text-white group-hover:bg-brand-gold group-hover:text-black transition-all duration-300 px-4 py-2.5 rounded-xl text-xs uppercase tracking-widest font-medium flex items-center justify-between shadow-sm"
                  >
                    <span>Explore Estate</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <div className="mt-9 flex items-center justify-center gap-2.5" role="group" aria-label="Choose featured estate position">
        {Array.from({ length: maxIndex + 1 }, (_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => slideTo(index)}
            aria-label={`Show estate group ${index + 1}`}
            aria-current={currentIndex === index ? 'true' : undefined}
            className={`h-1.5 rounded-full transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-gold ${currentIndex === index ? 'w-8 bg-brand-gold' : 'w-3 bg-white/40 hover:bg-white/80'}`}
          />
        ))}
      </div>
      </div>
    </motion.section>
  );
}
