'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import SplitTextHeading from './SplitTextHeading';

const heroVisuals = [
  { src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=90&w=1800&auto=format&fit=crop', alt: 'Contemporary residence framed by a lush landscape', label: 'A considered arrival' },
  { src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=90&w=1800&auto=format&fit=crop', alt: 'Modern residence with warm natural materials', label: 'Material in balance' },
  { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=90&w=1800&auto=format&fit=crop', alt: 'Minimalist architectural home with expansive glazing', label: 'Light, shaped by space' },
  { src: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?q=90&w=1800&auto=format&fit=crop', alt: 'Sculptural luxury villa set among mature trees', label: 'A quieter kind of luxury' },
];

export default function Hero() {
  const [activeVisual, setActiveVisual] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveVisual((current) => (current + 1) % heroVisuals.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, []);

  const showPrevious = () => setActiveVisual((current) => (current - 1 + heroVisuals.length) % heroVisuals.length);
  const showNext = () => setActiveVisual((current) => (current + 1) % heroVisuals.length);

  return (
    <section className="relative isolate min-h-[100svh] w-full overflow-hidden bg-brand-dark">
      {/* Full-screen slideshow background */}
      <div className="absolute inset-0 z-0" data-cursor-label="DRAG">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeVisual}
            initial={{ opacity: 0, scale: 1.06, x: 12 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.985, x: -12 }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={heroVisuals[activeVisual].src}
              alt={heroVisuals[activeVisual].alt}
              fill
              priority={activeVisual === 0}
              sizes="100vw"
              className="object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,17,40,0.98)_0%,rgba(10,17,40,0.9)_38%,rgba(10,17,40,0.58)_65%,rgba(10,17,40,0.22)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/75 via-transparent to-brand-dark/15" />
      </div>

      <div className="relative z-10 mx-auto grid min-h-[100svh] w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 pb-40 pt-28 md:px-12 lg:grid-cols-12 lg:px-20 lg:pb-36">
      {/* Left Content Column */}
      <div className="space-y-3 lg:col-span-8">
        {/* Tagline Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
        >
          <span
            data-cursor-hover
            className="text-brand-gold text-xs font-semibold tracking-[0.25em] uppercase border border-brand-gold/30 hover:border-brand-gold/70 px-3.5 py-1.5 rounded-full inline-block mb-4 transition-all duration-300 hover:scale-105 hover:bg-brand-gold/10 cursor-default"
          >
            EXCLUSIVE ARCHITECTURAL RESIDENCES
          </span>
        </motion.div>

        {/* Main Heading — Split-Text Staggered Entrance & Interactive Hover */}
        <div className="mb-6">
          <SplitTextHeading
            as="h1"
            text="Designing Living Spaces That Redefine Modern Luxury."
            goldWords={['Modern', 'Luxury.']}
            underline={false}
            inView={false}
            hoverEffect={false}
            className="text-3xl min-[375px]:text-4xl sm:text-6xl lg:text-7xl leading-[1.1]"
          />
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 1, 0.5, 1] }}
          className="mb-8 max-w-xl font-sans text-base font-light leading-relaxed text-white/75 md:text-lg"
        >
          Curated architectural properties, high-end interior spaces, and bespoke real estate developments tailored for refined living.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.25, 1, 0.5, 1] }}
          className="flex flex-wrap items-center gap-4 pt-2"
        >
          <a
            href="#properties"
            data-cursor-hover
            className="group relative bg-brand-gold text-black font-medium px-8 py-4 rounded-full hover:bg-brand-gold-hover transition-all duration-300 shadow-lg shadow-brand-gold/15 inline-flex items-center gap-2 overflow-hidden hover:scale-105"
          >
            <span className="relative z-10">Explore Residences</span>
          </a>
          <a
            href="#architecture"
            data-cursor-hover
            className="group relative text-white hover:text-brand-gold transition-all duration-300 font-medium flex items-center gap-2 px-6 py-4 hover:-translate-y-0.5 after:absolute after:bottom-2 after:left-6 after:right-6 after:h-[1px] after:bg-brand-gold after:scale-x-0 group-hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
          >
            <span>View Plot Showcase</span>
            <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
          </a>
          <a
            href="#inquire"
            data-cursor-hover
            className="group relative text-white hover:text-brand-gold transition-all duration-300 font-medium flex items-center gap-2 px-6 py-4 hover:-translate-y-0.5"
          >
            Schedule Consultation
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
      </div>

      {/* Slideshow details and controls */}
      <div className="absolute bottom-10 left-6 right-6 z-20 flex flex-col gap-5 md:left-12 md:right-12 sm:flex-row sm:items-end sm:justify-between lg:left-auto lg:right-[max(5rem,calc((100vw-80rem)/2))] lg:w-[42rem]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.25, 1, 0.5, 1] }}
            className="flex items-center gap-4 rounded-xl border border-white/15 bg-brand-dark/85 p-4 shadow-2xl backdrop-blur-md transition-all duration-300 hover:border-brand-gold/40 sm:max-w-sm"
            data-cursor-hover
          >
            <div className="bg-brand-gold/20 p-2.5 rounded-lg text-brand-gold">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <p className="text-xl font-serif font-bold text-white leading-tight">50+</p>
              <p className="text-xs text-brand-muted font-sans font-light uppercase tracking-wider">
                {heroVisuals[activeVisual].label}
              </p>
            </div>
          </motion.div>

          <div className="flex items-center gap-3 self-end" data-cursor-hover>
            <span className="font-sans text-[11px] tracking-[0.2em] text-white/75 tabular-nums">
              {String(activeVisual + 1).padStart(2, '0')} <span className="text-white/35">/</span> {String(heroVisuals.length).padStart(2, '0')}
            </span>
            <button
              type="button"
              onClick={showPrevious}
              aria-label="Previous architectural visual"
              data-cursor-label="PREV"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-brand-dark/55 text-white backdrop-blur-sm transition-colors hover:border-brand-gold hover:text-brand-gold"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={showNext}
              aria-label="Next architectural visual"
              data-cursor-label="NEXT"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-brand-dark/55 text-white backdrop-blur-sm transition-colors hover:border-brand-gold hover:text-brand-gold"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

      </div>
      <div className="absolute bottom-0 left-0 right-0 z-20 flex h-[2px] gap-1 px-6 md:px-12 lg:px-20" role="group" aria-label="Choose architectural visual">
            {heroVisuals.map((visual, index) => (
              <button
                key={visual.src}
                type="button"
                aria-label={`Show visual ${index + 1}`}
                aria-current={index === activeVisual ? 'true' : undefined}
                onClick={() => setActiveVisual(index)}
                className="relative h-full flex-1 bg-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-gold"
              >
                {index === activeVisual && (
                  <motion.span
                    key={`progress-${activeVisual}`}
                    className="absolute inset-y-0 left-0 w-full origin-left bg-brand-gold"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 5, ease: 'linear' }}
                  />
                )}
              </button>
            ))}
      </div>
    </section>
  );
}
