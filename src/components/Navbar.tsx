'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Properties', href: '#properties' },
    { name: 'Architecture', href: '#architecture' },
    { name: 'Studio', href: '#studio' },
    { name: 'About Us', href: '#about' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-brand-dark/80 backdrop-blur-md border-b border-white/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <a
          id="top"
          href="#"
          data-cursor-text
          data-cursor-hover
          className="group relative font-serif text-brand-gold font-bold text-xl tracking-widest uppercase transition-all duration-300 hover:tracking-[0.22em] flex items-center gap-1.5"
        >
          <span>Bajwa</span>
          <span className="text-white/90 group-hover:text-brand-gold transition-colors">Estate</span>
          <span className="absolute -bottom-1 left-0 w-full h-[1.5px] bg-brand-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-10 text-sm font-medium tracking-wide text-gray-300">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              data-cursor-hover
              className="relative py-1 text-gray-300 hover:text-brand-gold transition-all duration-300 hover:-translate-y-0.5 hover:tracking-wider after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1.5px] after:bg-brand-gold after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Desktop CTA Button */}
        <div className="hidden md:block">
          <a
            href="#inquire"
            data-cursor-hover
            className="group relative border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-black transition-all duration-300 px-6 py-2.5 rounded-full text-sm font-medium inline-flex items-center gap-2 overflow-hidden shadow-sm hover:shadow-brand-gold/25"
          >
            <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5">Inquire Now</span>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden flex items-center">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-gray-300 hover:text-brand-gold p-2 transition-colors focus:outline-none"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        id="mobile-navigation"
        aria-hidden={!mobileMenuOpen}
        className={`md:hidden bg-brand-dark/95 backdrop-blur-xl border-b border-white/10 px-6 py-6 space-y-4 ${mobileMenuOpen ? 'block animate-in fade-in slide-in-from-top-2 duration-200' : 'hidden'}`}
      >
          <nav className="flex flex-col space-y-4 text-base font-medium text-gray-300">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-brand-gold transition-colors py-1"
              >
                {link.name}
              </a>
            ))}
          </nav>
          <div className="pt-2">
            <a
              href="#inquire"
              onClick={() => setMobileMenuOpen(false)}
              className="border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-black transition-all px-5 py-2.5 rounded-full text-sm font-medium block text-center"
            >
              Inquire Now
            </a>
          </div>
      </div>
    </header>
  );
}
