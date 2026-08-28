import { motion } from 'framer-motion';
import ScrollReveal from '../ui/ScrollReveal';
import SectionHeading from '../ui/SectionHeading';
import { DEMO_PRODUCT } from '../../lib/constants';

export default function ProductDetection() {
  return (
    <section className="py-24 md:py-32 bg-surface px-6">
      <div className="max-w-5xl mx-auto text-center">
        <ScrollReveal>
          <SectionHeading 
            title="It knows what you're looking at."
            subtitle="Shopping Buddy detects the product you're viewing and prepares it for virtual try-on."
            centered={true}
          />
        </ScrollReveal>
        
        <ScrollReveal delay={0.2}>
          <div className="mt-16 max-w-xs mx-auto relative">
            <div className="aspect-[3/4] rounded-xl overflow-hidden relative shadow-lg">
              <img 
                src={DEMO_PRODUCT.image} 
                alt="Detected product" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <motion.div 
              className="absolute inset-0 rounded-xl border-2 border-dashed border-primary"
              animate={{ opacity: [0, 1, 1, 0], scale: [0.95, 1, 1, 0.95] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
            
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
              <span className="text-xs font-medium text-primary bg-primary-tint px-3 py-1 rounded-full shadow-sm border border-primary-soft">
                Product detected
              </span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
