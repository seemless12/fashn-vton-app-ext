import React from 'react';
import { ShoppingBag, Sparkles, ThumbsUp } from 'lucide-react';
import ScrollReveal from '../../components/ui/ScrollReveal';

export default function TrustStrip() {
  const items = [
    {
      icon: ShoppingBag,
      title: 'Shop',
      desc: 'Discover clothing normally.',
    },
    {
      icon: Sparkles,
      title: 'Try',
      desc: 'See it on yourself.',
    },
    {
      icon: ThumbsUp,
      title: 'Decide',
      desc: 'Buy with confidence.',
    }
  ];

  return (
    <div className="border-y border-border bg-surface-alt py-6">
      <div className="max-w-5xl mx-auto px-6">
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 md:divide-x md:divide-border">
            {items.map((item, index) => (
              <div key={index} className="text-center px-6">
                <item.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                <h3 className="text-sm font-bold text-dark">{item.title}</h3>
                <p className="text-xs text-text-secondary mt-0.5">{item.desc}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
