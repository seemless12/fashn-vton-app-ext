import React from 'react';
import { HelpCircle } from 'lucide-react';
import ScrollReveal from '../../components/ui/ScrollReveal';

export default function ProblemSection() {
  const questions = [
    'Will it actually suit me?',
    'Will the fit look right?',
    'Will the color work on me?'
  ];

  return (
    <section className="py-24 md:py-32 bg-surface px-6">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <h2 className="text-4xl md:text-[3.5rem] font-extrabold text-dark tracking-tight text-center text-balance leading-tight">
            Online shopping shouldn't feel like guessing.
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {questions.map((q, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="p-8 rounded-2xl bg-surface-alt border border-border text-center h-full flex flex-col items-center justify-center">
                <HelpCircle className="w-8 h-8 text-text-muted mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-dark mb-2">{q}</h3>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-16 text-center">
          <ScrollReveal>
            <p className="text-3xl font-bold text-primary">Now you can see it.</p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
