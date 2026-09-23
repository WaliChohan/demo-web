'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Globe, Share2, Mail, Send } from 'lucide-react';
import { useState } from 'react';
import SplitTextHeading from './SplitTextHeading';

const footerLinks = {
  explore: [
    { name: 'Properties', href: '#properties' },
    { name: 'Architecture', href: '#architecture' },
    { name: 'Developments', href: '#studio' },
    { name: 'Private Office', href: '#contact' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '#privacy' },
    { name: 'Terms of Service', href: '#terms' },
    { name: 'Investment Disclaimer', href: '#disclaimer' },
  ],
};

const socials = [
  { icon: Globe, label: 'Website', href: '#' },
  { icon: Share2, label: 'Social', href: '#' },
  { icon: Mail, label: 'Email', href: '#' },
];

export default function Footer() {
  const [email, setEmail] = useState('');

  return (
    <motion.footer
      initial={{ opacity: 0, y: 50, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
      className="bg-brand-dark border-t border-white/10 pt-20 pb-12 px-6 md:px-12 lg:px-20"
      style={{ willChange: 'transform, opacity' }}
    >
      <div className="max-w-7xl mx-auto space-y-20">
        {/* CTA Banner */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 pb-20 border-b border-white/10">
          <div className="max-w-xl">
            <SplitTextHeading
              as="h2"
              text="Ready to Acquire Your Next Landmark Property?"
              goldWords={['Landmark', 'Property?']}
              underline
              className="text-3xl md:text-4xl lg:text-5xl leading-[1.2]"
            />
          </div>
          <a
            href="#contact"
            data-cursor-hover
            className="flex items-center gap-2.5 bg-brand-gold hover:bg-brand-gold-hover text-black font-medium px-8 py-4 rounded-full transition-all duration-300 shrink-0 group shadow-lg shadow-brand-gold/15 hover:scale-105"
          >
            <span>Schedule Consultation</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
          </a>
        </div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Col 1: Brand */}
          <div className="space-y-5">
            <a
              href="#"
              data-cursor-text
              className="font-serif text-brand-gold font-bold text-lg tracking-widest uppercase inline-block hover:tracking-[0.2em] transition-all duration-300"
            >
              Bajwa Estate
            </a>
            <p className="text-brand-muted text-sm font-light leading-relaxed max-w-xs">
              Architectural precision meets visionary real estate. Crafting landmark residences for discerning clients worldwide.
            </p>
            <div className="space-y-2 text-sm text-brand-muted font-light">
              <p>
                <span className="text-white/60 text-xs uppercase tracking-widest block mb-0.5">Email</span>
                info@bajwaestate.com
              </p>
              <p>
                <span className="text-white/60 text-xs uppercase tracking-widest block mb-0.5">Phone</span>
                +92 300 000 0000
              </p>
              <p>
                <span className="text-white/60 text-xs uppercase tracking-widest block mb-0.5">Office</span>
                DHA Phase 6, Lahore &amp; Global Offices
              </p>
            </div>
          </div>

          {/* Col 2: Explore */}
          <div className="space-y-5">
            <h4 className="text-white text-xs font-semibold uppercase tracking-[0.2em]">Explore</h4>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    data-cursor-hover
                    className="relative text-brand-muted text-sm hover:text-brand-gold transition-all duration-300 hover:translate-x-1 inline-block font-light"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Legal */}
          <div className="space-y-5">
            <h4 className="text-white text-xs font-semibold uppercase tracking-[0.2em]">Legal &amp; Governance</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    data-cursor-hover
                    className="relative text-brand-muted text-sm hover:text-brand-gold transition-all duration-300 hover:translate-x-1 inline-block font-light"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div className="space-y-5">
            <h4 className="text-white text-xs font-semibold uppercase tracking-[0.2em]">Private Dispatch</h4>
            <p className="text-brand-muted text-sm font-light leading-relaxed">
              Receive curated market intelligence and exclusive estate releases before they reach the open market.
            </p>
            <div className="flex items-center gap-0 border border-white/15 rounded-full overflow-hidden focus-within:border-brand-gold/50 transition-colors">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 bg-transparent px-4 py-3 text-sm text-white placeholder:text-brand-muted/50 focus:outline-none font-sans min-w-0"
              />
              <button
                type="submit"
                data-cursor-hover
                className="bg-brand-gold hover:bg-brand-gold-hover text-black p-3 m-1 rounded-full transition-all shrink-0 group hover:scale-105"
                aria-label="Subscribe"
              >
                <Send className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/10 text-xs text-brand-muted font-light">
          <div className="space-y-1 text-center sm:text-left">
            <p>© {new Date().getFullYear()} Bajwa Estate. All rights reserved.</p>
            <p className="text-white/30">
              All properties are subject to availability. Investment disclaimer applies — past performance is not indicative of future results.
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            {socials.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                data-cursor-hover
                className="w-8 h-8 rounded-full border border-white/15 hover:border-brand-gold hover:text-brand-gold text-brand-muted flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Icon className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
