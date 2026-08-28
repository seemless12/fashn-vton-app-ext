import ScrollReveal from '../ui/ScrollReveal';
import { Monitor, ArrowRight, ArrowDown, Sparkles, Image as ImageIcon } from 'lucide-react';

export default function OneClick() {
  return (
    <section className="py-24 md:py-32 bg-surface-alt px-6">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <h2 className="text-display md:text-display-lg font-extrabold text-dark tracking-tight text-center text-balance">
            One click is all it takes.
          </h2>
        </ScrollReveal>
        
        <ScrollReveal delay={0.2}>
          <div className="mt-12 flex flex-col md:flex-row items-center gap-8 justify-center">
            {/* Step 1 */}
            <div className="rounded-xl bg-white border border-border shadow-soft p-6 text-center w-48 flex flex-col items-center gap-3">
              <Monitor className="w-8 h-8 text-text-secondary" />
              <span className="text-sm font-medium text-dark">Product Page</span>
            </div>
            
            {/* Arrow Desktop */}
            <ArrowRight className="hidden md:block text-2xl text-primary w-8 h-8" />
            
            {/* Arrow Mobile */}
            <ArrowDown className="md:hidden text-2xl text-primary w-8 h-8" />
            
            {/* Step 2 */}
            <div className="rounded-xl bg-primary text-white shadow-glow p-6 text-center w-48 flex flex-col items-center gap-3">
              <Sparkles className="w-8 h-8 text-white" />
              <span className="text-sm font-semibold">Try It On</span>
            </div>
            
            {/* Arrow Desktop */}
            <ArrowRight className="hidden md:block text-2xl text-primary w-8 h-8" />
            
            {/* Arrow Mobile */}
            <ArrowDown className="md:hidden text-2xl text-primary w-8 h-8" />
            
            {/* Step 3 */}
            <div className="rounded-xl bg-white border border-border shadow-soft p-6 text-center w-48 flex flex-col items-center gap-3">
              <ImageIcon className="w-8 h-8 text-text-secondary" />
              <span className="text-sm font-medium text-dark">Your Look</span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
