'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Send } from 'lucide-react';

interface InquiryModalProps {
  defaultCategory?: string;
}

const cleanText = (value: string, maxLength: number) =>
  value.replace(/[\u0000-\u001f\u007f]/g, '').slice(0, maxLength);

export default function InquiryModal({
  defaultCategory = '5 Marla',
}: InquiryModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    category: defaultCategory,
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [emailDraft, setEmailDraft] = useState('');

  const closeModal = () => {
    setIsOpen(false);
    setSubmitted(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    const handleInquiryClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest<HTMLAnchorElement>('a[href="#inquire"]');
      if (!link) return;
      event.preventDefault();
      const category = link.dataset.inquiryCategory;
      if (category && ['3 Marla', '5 Marla', '7 Marla', '10 Marla', '1 Kanal'].includes(category)) {
        setFormData((previous) => ({ ...previous, category }));
      }
      setIsOpen(true);
    };

    document.addEventListener('click', handleInquiryClick);
    return () => document.removeEventListener('click', handleInquiryClick);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const cleanedData = {
      name: cleanText(formData.name, 100).trim(),
      phone: cleanText(formData.phone, 30).trim(),
      email: cleanText(formData.email, 254).trim(),
      category: formData.category,
      notes: cleanText(formData.notes, 1000).trim(),
    };
    setFormData((previous) => ({ ...previous, ...cleanedData }));

    const body = [
      `Name: ${cleanedData.name}`,
      `Phone: ${cleanedData.phone}`,
      `Email: ${cleanedData.email}`,
      `Interest: ${cleanedData.category}`,
      `Requirements: ${cleanedData.notes || 'Not provided'}`,
    ].join('\n');
    setEmailDraft(`mailto:info@bajwaestate.com?subject=${encodeURIComponent(`Website inquiry: ${cleanedData.category}`)}&body=${encodeURIComponent(body)}`);
    setSubmitted(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
            className="relative w-full max-w-xl bg-brand-card border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden my-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="inquiry-title"
          >
            {/* Ambient gold glow at top */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-32 bg-brand-gold/15 blur-3xl pointer-events-none rounded-full" />

            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 text-brand-muted hover:text-white p-2 rounded-full border border-white/10 hover:border-brand-gold/40 transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              /* Success State */
              <div className="text-center py-10 space-y-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  className="w-16 h-16 rounded-full bg-brand-gold/20 text-brand-gold flex items-center justify-center mx-auto"
                >
                  <CheckCircle2 className="w-10 h-10" />
                </motion.div>
                <h3 className="font-serif text-3xl font-light text-white">
                  Inquiry Ready to Send
                </h3>
                <p className="text-brand-muted text-sm sm:text-base max-w-md mx-auto leading-relaxed">
                  Your email app will open with your details prepared. Review the message and send it there to contact Bajwa Estate.
                </p>
                <div className="pt-4">
                  <a
                    href={emailDraft}
                    className="inline-flex items-center gap-2 bg-brand-gold text-black font-medium px-8 py-3 rounded-full hover:bg-brand-gold-hover transition-all text-sm"
                  >
                    <Send className="h-4 w-4" /> Open Email App
                  </a>
                  <button onClick={closeModal} className="ml-3 rounded-full border border-white/15 px-6 py-3 text-sm text-white hover:border-brand-gold/50 transition-colors">
                    Close
                  </button>
                </div>
              </div>
            ) : (
              /* Form State */
              <div className="space-y-6">
                <div className="space-y-2">
                  <span className="text-brand-gold text-[11px] font-semibold tracking-[0.25em] uppercase border border-brand-gold/30 px-3 py-1 rounded-full inline-block">
                    PRIVATE CONSULTATION
                  </span>
                  <h3 id="inquiry-title" className="font-serif text-2xl sm:text-3xl font-light text-white">
                    Acquire or Inquire
                  </h3>
                  <p className="text-brand-muted text-xs sm:text-sm font-light">
                    Direct access to our senior real estate advisory team for plots, bespoke estates, and turnkey acquisitions.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="inquiry-name" className="block text-xs uppercase tracking-wider text-brand-muted mb-1.5 font-medium">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="inquiry-name"
                        required
                        value={formData.name}
                        autoComplete="name"
                        maxLength={100}
                        onChange={(e) => setFormData((prev) => ({ ...prev, name: cleanText(e.target.value, 100) }))}
                        placeholder="e.g. Tariq Bajwa"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-brand-muted/40 focus:outline-none focus:border-brand-gold transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="inquiry-phone" className="block text-xs uppercase tracking-wider text-brand-muted mb-1.5 font-medium">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        id="inquiry-phone"
                        required
                        value={formData.phone}
                        autoComplete="tel"
                        inputMode="tel"
                        maxLength={30}
                        onChange={(e) => setFormData((prev) => ({ ...prev, phone: cleanText(e.target.value, 30) }))}
                        placeholder="+92 300 1234567"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-brand-muted/40 focus:outline-none focus:border-brand-gold transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="inquiry-email" className="block text-xs uppercase tracking-wider text-brand-muted mb-1.5 font-medium">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="inquiry-email"
                        required
                        value={formData.email}
                        autoComplete="email"
                        inputMode="email"
                        maxLength={254}
                        onChange={(e) => setFormData((prev) => ({ ...prev, email: cleanText(e.target.value, 254) }))}
                        placeholder="client@domain.com"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-brand-muted/40 focus:outline-none focus:border-brand-gold transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="inquiry-category" className="block text-xs uppercase tracking-wider text-brand-muted mb-1.5 font-medium">
                        Interest Category
                      </label>
                      <select
                        id="inquiry-category"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full bg-brand-card border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-gold transition-colors"
                      >
                        <option value="3 Marla">3 Marla Plot</option>
                        <option value="5 Marla">5 Marla Plot</option>
                        <option value="7 Marla">7 Marla Plot</option>
                        <option value="10 Marla">10 Marla Plot</option>
                        <option value="1 Kanal">1 Kanal Estate</option>
                        <option value="Luxury Villa">Luxury Architectural Villa</option>
                        <option value="Commercial / Development">Commercial / Development</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="inquiry-notes" className="block text-xs uppercase tracking-wider text-brand-muted mb-1.5 font-medium">
                      Special Requirements or Timeline
                    </label>
                    <textarea
                      id="inquiry-notes"
                      rows={3}
                      value={formData.notes}
                      maxLength={1000}
                      onChange={(e) => setFormData((prev) => ({ ...prev, notes: cleanText(e.target.value, 1000) }))}
                      placeholder="Share your preferred phase, plot orientation, or investment timeline..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-brand-muted/40 focus:outline-none focus:border-brand-gold transition-colors resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full bg-brand-gold hover:bg-brand-gold-hover text-black font-medium py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-brand-gold/15 disabled:opacity-50 text-sm font-sans"
                    >
                      <Send className="w-4 h-4" />
                      <span>Prepare Inquiry Email</span>
                    </button>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
