import ScrollReveal from '../ui/ScrollReveal';
import SectionHeading from '../ui/SectionHeading';
import { ShoppingBag, Zap, Shield, Clock } from 'lucide-react';

export default function BenefitsGrid() {
  const benefits = [
    {
      icon: <ShoppingBag className="w-5 h-5" />,
      title: "Shop naturally",
      desc: "No need to change how you browse. Shopping Buddy fits into your existing shopping flow."
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Try instantly",
      desc: "The virtual fitting room appears right on the product page. One click to see it on you."
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Decide confidently",
      desc: "See how the garment looks before buying. Reduce returns, increase satisfaction."
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: "Save time",
      desc: "No more wondering. Get visual confirmation in seconds, not days."
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-surface px-6">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <SectionHeading 
            overline="Benefits"
            title="Everything you need."
            centered={true}
          />
        </ScrollReveal>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <div className="p-8 rounded-2xl bg-surface-alt border border-border hover:shadow-soft transition-shadow h-full">
                <div className="w-10 h-10 rounded-xl bg-primary-tint text-primary flex items-center justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-bold text-dark mb-2">{benefit.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{benefit.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
