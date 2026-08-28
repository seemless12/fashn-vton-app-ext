import ScrollReveal from '../ui/ScrollReveal';
import SectionHeading from '../ui/SectionHeading';
import ShoppingBuddyModal from '../ui/ShoppingBuddyModal';

export default function AIResult() {
  return (
    <section className="py-24 md:py-32 bg-surface-alt px-6">
      <div className="max-w-5xl mx-auto text-center">
        <ScrollReveal>
          <SectionHeading 
            title="See yourself in it."
            subtitle="Your AI-generated virtual try-on result, ready in seconds."
            centered={true}
          />
        </ScrollReveal>
        
        <ScrollReveal delay={0.2}>
          <div className="mt-16 max-w-2xl mx-auto">
            <ShoppingBuddyModal stage="result" />
            <p className="mt-6 text-center text-xs text-text-muted">
              Results are AI-generated visualizations for shopping reference.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
