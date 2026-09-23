'use client';

import { motion, type Variants } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import SplitTextHeading from './SplitTextHeading';

export default function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40, scale: 0.99 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
      className="min-h-screen pt-28 pb-16 px-6 md:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-7xl mx-auto"
      style={{ willChange: 'transform, opacity' }}
    >
      {/* Left Content Column */}
      <div className="lg:col-span-7 space-y-3">
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
            underline
            inView={false}
            className="text-4xl sm:text-6xl lg:text-7xl leading-[1.1]"
          />
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 1, 0.5, 1] }}
          className="text-brand-muted text-base md:text-lg max-w-xl font-sans font-light mb-8 leading-relaxed"
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
        </motion.div>
      </div>

      {/* Right Visual Column */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.25, 1, 0.5, 1] }}
        className="lg:col-span-5 relative"
      >
        <div
          className="aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 relative shadow-2xl group transition-all duration-500 hover:border-brand-gold/40"
          data-cursor-hover
        >
          <motion.img
            initial={{ scale: 1.15, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.25, 1, 0.5, 1] }}
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop"
            alt="Luxury Architectural Residence"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent pointer-events-none" />

          {/* Floating Stats Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.25, 1, 0.5, 1] }}
            className="absolute bottom-6 left-6 right-6 sm:right-auto bg-brand-dark/85 backdrop-blur-md border border-white/15 p-4 rounded-xl shadow-2xl flex items-center gap-4 transition-all duration-300 hover:border-brand-gold/40 hover:scale-[1.02]"
            data-cursor-hover
          >
            <div className="bg-brand-gold/20 p-2.5 rounded-lg text-brand-gold">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <p className="text-xl font-serif font-bold text-white leading-tight">50+</p>
              <p className="text-xs text-brand-muted font-sans font-light uppercase tracking-wider">
                Bespoke Estates Developed
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
}
