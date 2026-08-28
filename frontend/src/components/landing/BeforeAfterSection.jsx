import React from 'react';
import ScrollReveal from '../../components/ui/ScrollReveal';
import SectionHeading from '../../components/ui/SectionHeading';
import BeforeAfter from '../../components/ui/BeforeAfter';
import { DEMO_PRODUCT } from '../../lib/constants';

export default function BeforeAfterSection() {
  return (
    <section className="py-24 md:py-32 bg-surface-alt px-6">
      <SectionHeading 
        overline="See The Difference" 
        title="From product page to your look." 
        centered={true}
      />
      
      <div className="mt-16 max-w-4xl mx-auto">
        <ScrollReveal>
          <BeforeAfter 
            beforeImage={DEMO_PRODUCT?.image || '/placeholder-product.jpg'}
            afterImage={DEMO_PRODUCT?.image || '/placeholder-product.jpg'}
            beforeLabel="Product Page"
            afterLabel="AI Virtual Try-On"
          />
        </ScrollReveal>
      </div>
    </section>
  );
}
