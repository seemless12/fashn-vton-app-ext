import React from 'react';
import ScrollReveal from '../../components/ui/ScrollReveal';
import { cn } from '../../lib/utils';

export default function HowItFeels() {
  const pairs = [
    {
      statement: 'No more guessing.',
      supporting: 'See the garment on you before you buy.'
    },
    {
      statement: 'No extra searching.',
      supporting: 'The extension works while you shop.'
    },
    {
      statement: 'No complicated setup.',
      supporting: 'One click. One photo. One result.'
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-surface px-6">
      <div className="max-w-4xl mx-auto">
        {pairs.map((pair, index) => (
          <ScrollReveal 
            key={index} 
            direction="up" 
            className={cn(
              "mb-16 last:mb-0 max-w-xl",
              index % 2 !== 0 ? "md:ml-auto md:text-right" : "text-left"
            )}
          >
            <h2 className="text-4xl md:text-[3.5rem] font-extrabold text-dark tracking-tight leading-tight">
              {pair.statement}
            </h2>
            <p className="text-lg text-text-secondary mt-2">
              {pair.supporting}
            </p>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
