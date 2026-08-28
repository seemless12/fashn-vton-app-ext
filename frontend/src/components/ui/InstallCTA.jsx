import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { CHROME_STORE_URL } from '../../lib/constants';
import ScrollReveal from './ScrollReveal';

export default function InstallCTA({ headline, subtitle, variant = 'warm' }) {
  return (
    <section
      className={cn(
        'w-full py-24 px-6',
        variant === 'warm' ? 'bg-primary-tint/50' : 'bg-surface-alt'
      )}
    >
      <ScrollReveal className="max-w-3xl mx-auto text-center flex flex-col items-center">
        <h2 className="text-display md:text-display-lg font-extrabold text-dark tracking-tight text-balance">
          {headline}
        </h2>
        <p className="text-lg text-text-secondary mt-4 mb-10">
          {subtitle}
        </p>
        
        <motion.a
          href={CHROME_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center justify-center bg-primary hover:bg-primary-deep text-white h-14 px-8 text-lg rounded-xl font-semibold shadow-lg shadow-primary/20 hover:shadow-xl transition-all"
        >
          Add Shopping Buddy to Chrome
        </motion.a>

        <Link
          to="/#how-it-works"
          className="mt-6 text-sm text-text-secondary hover:text-primary transition-colors"
        >
          Learn How It Works
        </Link>
      </ScrollReveal>
    </section>
  );
}
