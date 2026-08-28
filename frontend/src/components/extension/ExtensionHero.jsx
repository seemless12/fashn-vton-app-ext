import { motion } from 'framer-motion';
import { Globe, ArrowDown } from 'lucide-react';
import { CHROME_STORE_URL } from '../../lib/constants';
import { stagger, scaleUp } from '../../lib/animations';
import BrowserMockup from '../ui/BrowserMockup';
import ProductPageMockup from '../ui/ProductPageMockup';

export default function ExtensionHero() {
  return (
    <section className="min-h-[80vh] flex items-center bg-surface pt-24 pb-16 px-6 relative overflow-hidden">
      <div className="absolute -z-10 top-0 right-0 w-1/2 h-full bg-primary-tint/30 rounded-l-[100px] blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        <motion.div 
          className="lg:w-1/2"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={stagger.item} className="inline-flex items-center gap-2 rounded-full bg-primary-tint border border-primary-soft px-3 py-1.5 text-xs font-semibold text-primary uppercase tracking-wider mb-6">
            <Globe className="w-4 h-4" />
            <span>Chrome Extension</span>
          </motion.div>
          
          <motion.h1 variants={stagger.item} className="text-5xl md:text-display-lg font-extrabold text-dark tracking-tight leading-[1.05] mb-6">
            Your virtual fitting room, <br />
            wherever you shop.
          </motion.h1>
          
          <motion.p variants={stagger.item} className="text-lg text-text-secondary leading-relaxed mb-10 max-w-xl">
            Bring AI-powered virtual try-on directly to the fashion stores you already use.
          </motion.p>
          
          <motion.div variants={stagger.item} className="flex flex-col sm:flex-row gap-4">
            <a 
              href={CHROME_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary hover:bg-primary-deep text-white h-14 px-8 rounded-xl text-lg font-semibold shadow-lg shadow-primary/20 inline-flex items-center justify-center gap-2 transition-colors"
            >
              Add to Chrome
            </a>
            <a 
              href="#how-extension-works"
              className="border border-border text-text-primary h-14 px-8 rounded-xl text-lg font-medium hover:bg-surface-alt inline-flex items-center justify-center gap-2 transition-colors"
            >
              See How It Works
              <ArrowDown className="w-5 h-5" />
            </a>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="lg:w-1/2 w-full"
          variants={scaleUp}
          initial="hidden"
          animate="visible"
        >
          <BrowserMockup>
            <ProductPageMockup showTryOnButton={true} highlightTryOn={true} />
          </BrowserMockup>
        </motion.div>
      </div>
    </section>
  );
}
