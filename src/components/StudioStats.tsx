'use client';

import { motion } from 'framer-motion';
import SplitTextHeading from './SplitTextHeading';

const stats = [
  { value: '$1.2B+', label: 'Portfolio Value Developed' },
  { value: '98%', label: 'Client Satisfaction & Retention' },
  { value: '45+', label: 'International Design Awards' },
  { value: '12', label: 'Prime Global Locations' },
];

export default function StudioStats() {
  return (
    <motion.section
      id="studio"
      initial={{ opacity: 0, y: 50, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
      className="bg-brand-card/50 border-y border-white/10 my-12 py-24 px-6 md:px-12 lg:px-20"
      style={{ willChange: 'transform, opacity' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Top Narrative Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left: Tagline + Heading */}
          <div className="lg:col-span-5 space-y-5">
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
                THE STUDIO
              </span>
            </motion.div>

            <div>
              <SplitTextHeading
                as="h2"
                text="Bespoke Design & Strategic Real Estate"
                goldWords={['Design', 'Strategic']}
                underline
                className="text-3xl md:text-4xl leading-[1.2]"
              />
            </div>
          </div>

          {/* Right: Editorial Description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
            className="lg:col-span-7 flex items-center"
          >
            <p className="text-brand-muted text-lg font-light leading-relaxed">
              At <span className="text-white font-normal">Bajwa Estate Studio</span>, we operate at the intersection of visionary architecture and precision-driven property strategy. Our bespoke design philosophy transforms prime acreage into iconic residences — each conceived through a rigorous process of master planning, environmental harmonics, and ultra-luxury specification. From initial concept to final handover, we orchestrate every detail: structural composition, interior curation, material provenance, and landscape integration. Our portfolio spans private estates, hillside retreats, and urban sky residences across the most coveted addresses.
            </p>
          </motion.div>
        </div>

        {/* Bottom Key Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16 pt-12 border-t border-white/10">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 + index * 0.12, ease: [0.25, 1, 0.5, 1] }}
              className="group cursor-default"
              data-cursor-hover
            >
              <p className="font-serif text-4xl md:text-5xl font-light text-brand-gold mb-2 group-hover:scale-105 group-hover:translate-x-1 transition-all duration-300 origin-left">
                {stat.value}
              </p>
              <p className="text-xs uppercase tracking-widest text-brand-muted group-hover:text-white transition-colors duration-300">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
