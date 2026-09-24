'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Globe, Mail, Send } from 'lucide-react';
import { type FormEvent, useState } from 'react';
import Image from 'next/image';
import SplitTextHeading from './SplitTextHeading';

const footerLinks = {
  explore: [
    { name: 'Properties', href: '#properties' },
    { name: 'Architecture', href: '#architecture' },
    { name: 'Developments', href: '#studio' },
    { name: 'Private Office', href: '#contact' },
  ],
  legal: [
    { name: 'Privacy Policy', href: 'mailto:info@bajwaestate.com?subject=Request%20for%20Privacy%20Policy' },
    { name: 'Terms of Service', href: 'mailto:info@bajwaestate.com?subject=Request%20for%20Terms%20of%20Service' },
    { name: 'Investment Disclaimer', href: '#disclaimer' },
  ],
};

const socials = [
  { icon: Globe, label: 'Back to top', href: '#top' },
  { icon: Mail, label: 'Email', href: 'mailto:info@bajwaestate.com' },
];

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const body = `Please add ${email.trim()} to the Bajwa Estate Private Dispatch mailing list.`;
    window.location.href = `mailto:info@bajwaestate.com?subject=Private%20Dispatch%20Subscription&body=${encodeURIComponent(body)}`;
  };

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
            href="#inquire"
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
              aria-label="Bajwa Estate home"
              className="inline-flex transition-opacity duration-300 hover:opacity-80"
            >
              <Image
                src="/brand/bajwa-estate-logo.png"
                alt="Bajwa Estate"
                width={750}
                height={660}
                className="h-auto w-36 object-contain sm:w-40"
              />
            </a>
            <p className="text-brand-muted text-sm font-light leading-relaxed max-w-xs">
              Architectural precision meets visionary real estate. Crafting landmark residences for discerning clients worldwide.
            </p>
            <div id="contact" className="space-y-2 text-sm text-brand-muted font-light scroll-mt-24">
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
                Plot 7 Block 17 Sector B1 Township College Road Akbar Chowk, Township Block A Phase 1 Johar Town, Lahore, 54000, Pakistan
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
            <form onSubmit={handleSubscribe} className="flex items-center gap-0 border border-white/15 rounded-full overflow-hidden focus-within:border-brand-gold/50 transition-colors">
              <label htmlFor="private-dispatch-email" className="sr-only">Email address for the Private Dispatch</label>
              <input
                id="private-dispatch-email"
                type="email"
                required
                value={email}
                maxLength={254}
                onChange={(e) => setEmail(e.target.value.replace(/[\u0000-\u001f\u007f]/g, '').slice(0, 254))}
                placeholder="your@email.com"
                className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-white placeholder:text-brand-muted/50 focus:outline-none font-sans"
              />
              <button
                type="submit"
                data-cursor-hover
                className="bg-brand-gold hover:bg-brand-gold-hover text-black p-3 m-1 rounded-full transition-all shrink-0 group hover:scale-105"
                aria-label="Prepare an email subscription request"
              >
                <Send className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </form>
            <p className="text-xs leading-relaxed text-brand-muted/80">Opens an email draft so you can send your subscription request.</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/10 text-xs text-brand-muted font-light">
          <div className="space-y-1 text-center sm:text-left">
            <p>© {new Date().getFullYear()} Bajwa Estate. All rights reserved.</p>
            <p id="disclaimer" className="scroll-mt-24 text-white/50">
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
