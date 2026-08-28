import ScrollReveal from '../ui/ScrollReveal';
import { CheckCircle2 } from 'lucide-react';
import ShoppingBuddyModal from '../ui/ShoppingBuddyModal';

export default function YourPhoto() {
  const features = [
    "Works with any clear, well-lit photo",
    "Full body or half body shots",
    "Your photos stay private and secure"
  ];

  return (
    <section className="py-24 md:py-32 bg-surface px-6">
      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        <div className="lg:w-1/2">
          <ScrollReveal direction="left">
            <h2 className="text-heading md:text-display font-extrabold text-dark tracking-tight mb-4">
              Then, make it yours.
            </h2>
            <p className="text-lg text-text-secondary leading-relaxed mb-8">
              Upload a clear photo of yourself. Shopping Buddy handles the rest.
            </p>
            
            <ul className="space-y-4">
              {features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="text-primary w-5 h-5 mt-0.5 shrink-0" />
                  <span className="text-sm text-text-secondary">{feature}</span>
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
        
        <div className="lg:w-1/2 w-full">
          <ScrollReveal direction="right" delay={0.2}>
            <ShoppingBuddyModal stage="upload" />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
