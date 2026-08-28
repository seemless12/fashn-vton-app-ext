import { motion } from 'framer-motion';
import ScrollReveal from '../ui/ScrollReveal';
import SectionHeading from '../ui/SectionHeading';
import { cn } from '../../lib/utils';
import { Upload, Sparkles, Image as ImageIcon, Download } from 'lucide-react';

export default function InteractiveDemo() {
  const steps = [
    {
      title: "Browse a product page",
      desc: "Shopping Buddy automatically detects when you're viewing a fashion product.",
      visual: (
        <div className="w-full h-32 bg-surface-alt rounded-lg flex items-center justify-center border border-border/50">
          <ImageIcon className="w-10 h-10 text-text-muted" />
        </div>
      )
    },
    {
      title: "Click Try It On",
      desc: "The Try It On button appears directly on the product page.",
      visual: (
        <div className="w-full h-32 bg-surface-alt rounded-lg flex items-center justify-center border border-border/50">
          <button className="bg-primary text-white px-6 py-3 rounded-full font-semibold shadow-glow animate-pulse flex items-center gap-2">
            Try It On
          </button>
        </div>
      )
    },
    {
      title: "Upload your photo",
      desc: "Select a clear photo of yourself. Shopping Buddy prepares the virtual fitting.",
      visual: (
        <div className="w-full h-32 bg-surface-alt rounded-lg flex items-center justify-center border border-border/50 gap-4 p-4">
          <div className="w-1/2 h-full bg-white rounded border border-dashed border-border flex items-center justify-center">
             <Upload className="w-6 h-6 text-text-muted" />
          </div>
          <div className="w-1/2 h-full bg-white rounded border border-border flex items-center justify-center">
             <ImageIcon className="w-6 h-6 text-text-muted" />
          </div>
        </div>
      )
    },
    {
      title: "See the result",
      desc: "Your AI-generated try-on result appears in seconds. Download it or keep shopping.",
      visual: (
        <div className="w-full h-32 bg-surface-alt rounded-lg flex items-center justify-center border border-border/50 flex-col gap-3">
          <div className="w-16 h-16 bg-white rounded-md border border-border"></div>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-primary text-white text-xs rounded-full flex items-center gap-1">
              <Download className="w-3 h-3" /> Save
            </button>
          </div>
        </div>
      )
    }
  ];

  return (
    <section id="how-extension-works" className="py-24 md:py-32 bg-surface-alt px-6 relative">
      <SectionHeading 
        overline="Step By Step" 
        title="See the full experience." 
        centered={true} 
      />
      
      <div className="mt-16 max-w-4xl mx-auto relative">
        <div className="hidden md:block absolute left-8 top-0 bottom-0 w-px bg-border z-0"></div>
        
        <div className="space-y-16">
          {steps.map((step, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <div className="flex gap-8 items-start relative z-10">
                <div className="hidden md:flex w-16 h-16 rounded-full bg-primary-tint text-primary font-bold text-lg items-center justify-center shrink-0 shadow-sm border border-primary-soft">
                  {index + 1}
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-dark mb-2">
                    <span className="md:hidden mr-2 text-primary">{index + 1}.</span>
                    {step.title}
                  </h3>
                  <p className="text-text-secondary mb-6">{step.desc}</p>
                  
                  <div className="rounded-xl overflow-hidden border border-border bg-white shadow-soft p-4">
                    {step.visual}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
