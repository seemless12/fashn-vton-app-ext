import React from 'react';
import { cn } from '../../lib/utils';
import ScrollReveal from './ScrollReveal';

export default function SectionHeading({
  overline,
  title,
  subtitle,
  centered = true,
  className
}) {
  return (
    <ScrollReveal className={cn(className, centered && 'text-center')}>
      {overline && (
        <p className="uppercase tracking-widest text-xs font-semibold text-primary mb-3">
          {overline}
        </p>
      )}
      <h2 className="text-display md:text-display-lg font-extrabold text-dark tracking-tight text-balance mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-0">
          {subtitle}
        </p>
      )}
    </ScrollReveal>
  );
}
