import React from 'react';
import { Monitor, MousePointerClick, Eye } from 'lucide-react';
import ScrollReveal from '../../components/ui/ScrollReveal';
import SectionHeading from '../../components/ui/SectionHeading';

export default function HowItWorks() {
  const steps = [
    {
      num: '01',
      icon: Monitor,
      title: 'Browse',
      desc: 'Shop your favorite online stores normally. Shopping Buddy waits in the background.',
    },
    {
      num: '02',
      icon: MousePointerClick,
      title: 'Try',
      desc: 'Click the Shopping Buddy button when you find something you like.',
    },
    {
      num: '03',
      icon: Eye,
      title: 'See',
      desc: 'Upload your photo and see the garment on you in seconds.',
    }
  ];

  return (
    <section id="how-it-works" className="py-24 md:py-32 bg-surface-alt px-6">
      <SectionHeading 
        overline="How It Works" 
        title="Three steps to your perfect look." 
        centered={true}
      />
      
      <div className="mt-16 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {steps.map((step, i) => (
          <ScrollReveal key={i} delay={i * 0.1}>
            <div className="text-center group">
              <div className="text-5xl font-black text-border group-hover:text-primary transition-colors duration-300 mb-4">
                {step.num}
              </div>
              <div className="w-12 h-12 mx-auto mb-4 p-3 rounded-xl bg-primary-tint text-primary flex items-center justify-center">
                <step.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-dark mb-3">{step.title}</h3>
              <p className="text-text-secondary leading-relaxed text-sm">
                {step.desc}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
