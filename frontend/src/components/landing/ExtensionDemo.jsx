import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import ScrollReveal from '../../components/ui/ScrollReveal';
import SectionHeading from '../../components/ui/SectionHeading';
import BrowserMockup from '../../components/ui/BrowserMockup';
import ProductPageMockup from '../../components/ui/ProductPageMockup';

export default function ExtensionDemo() {
  return (
    <section className="py-24 md:py-32 bg-surface px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading 
          overline="The Extension" 
          title="One click changes the way you shop." 
          subtitle="Shopping Buddy works alongside your favorite online stores, bringing a virtual fitting room directly into the shopping experience."
          centered={true}
        />
        
        <div className="mt-16">
          <ScrollReveal>
            <BrowserMockup>
              <ProductPageMockup showTryOnButton={true} highlightTryOn={true} />
            </BrowserMockup>
          </ScrollReveal>
        </div>
        
        <div className="mt-10 text-center">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block"
          >
            <Link 
              to="/extension"
              className="inline-flex bg-primary hover:bg-primary-deep text-white h-12 px-8 rounded-xl font-semibold items-center justify-center transition-colors"
            >
              Install Extension →
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
