import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowDown, CheckCircle2 } from 'lucide-react';
import { CHROME_STORE_URL, DEMO_PRODUCT } from '../../lib/constants';
import { staggerContainer, staggerItem, scaleUp } from '../../lib/animations';
import { cn } from '../../lib/utils';

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-surface pt-24 pb-16 lg:pt-32 lg:pb-24">
      {/* Background decorative */}
      <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary-soft/60 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-12 lg:gap-16 relative h-full">
        {/* LEFT column */}
        <motion.div 
          className="lg:w-1/2 z-10 flex flex-col items-start"
          variants={staggerContainer(0.12)}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={staggerItem} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-tint border border-primary-soft text-primary text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles className="w-4 h-4" />
            AI Virtual Try-On
          </motion.div>

          <motion.h1 variants={staggerItem} className="text-5xl md:text-6xl lg:text-[4rem] font-extrabold text-dark tracking-tight leading-[1.05] mb-6">
            Try it before <br />
            <span className="text-primary">you buy it.</span>
          </motion.h1>

          <motion.p variants={staggerItem} className="text-lg md:text-xl text-text-secondary leading-relaxed mb-10 max-w-xl">
            See how your favorite clothes look on you before placing the order — directly while you shop.
          </motion.p>

          <motion.div variants={staggerItem} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <motion.a 
              href={CHROME_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-primary hover:bg-primary-deep text-white h-14 px-8 rounded-xl text-lg font-semibold shadow-lg shadow-primary/20 inline-flex items-center justify-center gap-2 transition-colors"
            >
              <Sparkles className="w-5 h-5" />
              Install Shopping Buddy
            </motion.a>
            <motion.a 
              href="#how-it-works"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="border border-border text-text-primary h-14 px-8 rounded-xl text-lg font-medium hover:bg-surface-alt inline-flex items-center justify-center gap-2 transition-colors"
            >
              See how it works
              <ArrowDown className="w-5 h-5" />
            </motion.a>
          </motion.div>
        </motion.div>

        {/* RIGHT column */}
        <motion.div 
          className="lg:w-1/2 relative w-full"
          variants={scaleUp}
          initial="hidden"
          animate="visible"
        >
          <div className="relative w-full max-w-lg mx-auto">
            {/* Main card */}
            <div className="rounded-2xl overflow-hidden shadow-2xl bg-white border border-border">
              {/* Product image area */}
              <div className="aspect-[3/4] relative overflow-hidden bg-gray-100">
                <img 
                  src={DEMO_PRODUCT?.image || '/placeholder-product.jpg'} 
                  alt={DEMO_PRODUCT?.name || 'Product'} 
                  className="object-cover object-top w-full h-full"
                />
                <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-white/90 to-transparent" />
              </div>
              {/* Card Content */}
              <div className="p-5">
                <div className="text-xs text-text-muted uppercase tracking-wider mb-1">
                  {DEMO_PRODUCT?.brand || 'Brand Name'}
                </div>
                <div className="text-base font-semibold text-dark mb-1">
                  {DEMO_PRODUCT?.name || 'Premium Jacket'}
                </div>
                <div className="text-sm font-medium text-text-secondary mb-4">
                  {DEMO_PRODUCT?.price || '$129.99'}
                </div>
                <button className="w-full h-11 bg-primary text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 animate-pulse transition-all">
                  <Sparkles className="w-4 h-4" />
                  Try It On
                </button>
              </div>
            </div>

            {/* Floating result card */}
            <motion.div 
              className="absolute -bottom-6 -right-6 md:-right-12 w-40 md:w-48 rounded-xl overflow-hidden shadow-xl bg-white border border-border z-20"
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            >
              <div className="aspect-square bg-gray-100 overflow-hidden relative">
                <img 
                  src={DEMO_PRODUCT?.image || '/placeholder-product.jpg'} 
                  alt="Perfect fit" 
                  className="object-cover object-top w-full h-full scale-110"
                />
              </div>
              <div className="px-3 py-2 flex items-center gap-2">
                <CheckCircle2 className="text-emerald-500 w-4 h-4 shrink-0" />
                <span className="text-xs font-medium text-dark">Perfect fit</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
