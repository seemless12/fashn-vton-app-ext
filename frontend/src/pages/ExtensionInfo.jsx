import { motion } from 'framer-motion';
import { Download, Globe, CheckCircle2, ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button';

export default function ExtensionInfo() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24 max-w-6xl">
      <div className="flex flex-col lg:flex-row items-center gap-16">
        
        {/* Left: Content */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold tracking-wide uppercase mb-6 border border-blue-100">
            <Globe className="w-4 h-4" /> Available for Chrome
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-dark tracking-tight leading-tight mb-6">
            Shop anywhere. <br />
            <span className="text-primary">Try it on here.</span>
          </h1>
          
          <p className="text-lg text-text-secondary leading-relaxed mb-8 max-w-xl">
            Our free Chrome extension lets you browse Junaid Jamshed (and other supported stores), select a garment, and instantly send it to Shopping Buddy for a virtual try-on with a single click.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-12">
            <Button size="lg" className="h-14 px-8 text-lg" icon={Download}>
              Add to Chrome — It's Free
            </Button>
            <Button size="lg" variant="secondary" className="h-14 px-8 text-lg" icon={ArrowRight}>
              See How It Works
            </Button>
          </div>

          <div className="space-y-4">
            {[
              "1-Click Try-On directly from Shopify stores",
              "Automatically extracts high-quality garment images",
              "Saves your favorite products for later"
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3 text-text-primary font-medium">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                {feature}
              </div>
            ))}
          </div>
        </div>

        {/* Right: Visual */}
        <div className="w-full lg:w-1/2 relative">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-white border border-border">
            {/* Mock Browser Header */}
            <div className="bg-gray-100 border-b border-border h-12 flex items-center px-4 gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="mx-4 flex-1 bg-white rounded-md h-7 border border-border flex items-center px-3 text-xs text-text-muted">
                junaidjamshed.com/product
              </div>
            </div>
            {/* Mock Page Content */}
            <div className="p-8 flex gap-8">
              <div className="w-1/2 aspect-[3/4] bg-gray-200 rounded-lg animate-pulse" />
              <div className="w-1/2 space-y-4">
                <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-1/4 bg-gray-200 rounded animate-pulse" />
                <div className="h-10 w-full bg-gray-200 rounded mt-8 animate-pulse" />
              </div>
            </div>
            
            {/* Overlay Extension UI */}
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute bottom-8 right-8 w-64 bg-white rounded-xl shadow-2xl border border-border p-4"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-white font-bold">
                  SB
                </div>
                <div>
                  <p className="font-semibold text-dark text-sm">Shopping Buddy</p>
                  <p className="text-xs text-text-muted">Garment detected</p>
                </div>
              </div>
              <Button size="sm" className="w-full">
                Try It On Now
              </Button>
            </motion.div>
          </div>
        </div>

      </div>
    </div>
  );
}
