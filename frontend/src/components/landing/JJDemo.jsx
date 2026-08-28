import React from 'react';
import ScrollReveal from '../../components/ui/ScrollReveal';
import SectionHeading from '../../components/ui/SectionHeading';
import BrowserMockup from '../../components/ui/BrowserMockup';
import ProductPageMockup from '../../components/ui/ProductPageMockup';

export default function JJDemo() {
  return (
    <section className="py-24 md:py-32 bg-surface-alt px-6">
      <SectionHeading 
        overline="See It In Action" 
        title="Try Shopping Buddy on your favorite stores." 
        centered={true}
      />
      <div className="mt-4 text-center">
        <p className="text-sm text-text-muted">
          Example shown with J. Junaid Jamshed — Shopping Buddy is an independent platform.
        </p>
      </div>
      
      <div className="mt-12 max-w-5xl mx-auto">
        <ScrollReveal>
          <BrowserMockup url="junaidjamshed.com/product/premium-kameez">
            <ProductPageMockup showTryOnButton={true} />
          </BrowserMockup>
        </ScrollReveal>
      </div>
    </section>
  );
}
