'use client';

import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import SplitTextHeading from './SplitTextHeading';

const testimonials = [
  {
    id: 1,
    quote:
      'Working with Bajwa Estate was unlike any property acquisition I have ever experienced. Every detail was curated with extraordinary precision — from the initial site consultation to the final handover, the level of service and craftsmanship was truly world-class.',
    name: 'Jonathan Hargrove',
    title: 'Private Equity Director, London',
    stars: 5,
  },
  {
    id: 2,
    quote:
      'The Obsidian Villa exceeded every expectation we had. Bajwa Estate transformed our vision into an architectural masterpiece that blends seamlessly with the landscape. Their bespoke design process is unparalleled in the luxury market.',
    name: 'Sophia Laurent-Beaumont',
    title: 'Art Collector & Philanthropist, Paris',
    stars: 5,
  },
  {
    id: 3,
    quote:
      'As a seasoned real estate investor, I have engaged many firms across multiple continents. None have matched the strategic clarity, market intelligence, and aesthetic sensibility that Bajwa Estate brings to every engagement. A genuinely elite experience.',
    name: 'Khalid Al-Mansoori',
    title: 'Family Office Principal, Dubai',
    stars: 5,
  },
  {
    id: 4,
    quote:
      'Our hillside retreat in Aspen was conceived and delivered flawlessly. The attention to material provenance, spatial flow, and landscape integration demonstrated a mastery that we had never seen before. This is architecture as art.',
    name: 'Dr. Elaine Westbrook',
    title: 'Tech Founder & Estate Collector, Aspen',
    stars: 5,
  },
];

export default function Testimonials() {
  return (
    <motion.section
      id="about"
      initial={{ opacity: 0, y: 50, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
      className="px-6 md:px-12 lg:px-20 py-24 max-w-7xl mx-auto"
      style={{ willChange: 'transform, opacity' }}
    >
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
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
            CLIENT VOICES
          </span>
        </motion.div>

        <div>
          <SplitTextHeading
            as="h2"
            text="Endorsements of Excellence"
            goldWords={['Excellence']}
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
          Trusted by discerning investors and collectors across the globe.
        </motion.p>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {testimonials.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: index * 0.12, ease: [0.25, 1, 0.5, 1] }}
            data-cursor-hover
            className="bg-brand-card/40 border border-white/10 hover:border-brand-gold/50 hover:-translate-y-1 transition-all duration-500 p-8 rounded-2xl relative flex flex-col justify-between gap-6 shadow-xl group"
          >
            {/* Quote Icon */}
            <div className="absolute top-6 right-6 text-brand-gold/20 group-hover:text-brand-gold/40 transition-colors duration-300">
              <Quote className="w-10 h-10 fill-current" />
            </div>

            {/* Stars */}
            <div className="flex gap-1">
              {Array.from({ length: item.stars }).map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 text-brand-gold fill-brand-gold" />
              ))}
            </div>

            {/* Quote Text */}
            <p className="text-white/80 group-hover:text-white transition-colors duration-300 text-base font-light leading-relaxed font-sans">
              &ldquo;{item.quote}&rdquo;
            </p>

            {/* Client Details */}
            <div className="flex items-center gap-4 pt-4 border-t border-white/10">
              <div className="w-10 h-10 rounded-full bg-brand-gold/20 border border-brand-gold/40 group-hover:border-brand-gold flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                <span className="text-brand-gold text-xs font-semibold font-serif">
                  {item.name.charAt(0)}
                </span>
              </div>
              <div>
                <p className="text-white text-sm font-medium font-sans group-hover:text-brand-gold transition-colors duration-300">
                  {item.name}
                </p>
                <p className="text-brand-muted text-xs tracking-wide">{item.title}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
