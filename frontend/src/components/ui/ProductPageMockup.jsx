import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { DEMO_PRODUCT } from '../../lib/constants';

export default function ProductPageMockup({
  showTryOnButton = true,
  onTryOnClick,
  highlightTryOn = false
}) {
  return (
    <div className="flex flex-col md:flex-row gap-8 p-4 sm:p-6">
      {/* LEFT: Product Image */}
      <div className="w-full md:w-1/2">
        <div className="aspect-[3/4] rounded-xl overflow-hidden bg-gray-100">
          <img 
            src={DEMO_PRODUCT?.image || 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80'} 
            alt={DEMO_PRODUCT?.name || 'Product Image'}
            className="w-full h-full object-cover object-top"
          />
        </div>
      </div>

      {/* RIGHT: Product Details */}
      <div className="w-full md:w-1/2 flex flex-col justify-start pt-2">
        <div className="text-xs uppercase tracking-widest text-text-muted font-medium mb-1">
          {DEMO_PRODUCT?.brand || 'Brand'}
        </div>
        
        <h1 className="text-xl font-bold text-dark mb-2">
          {DEMO_PRODUCT?.name || 'Product Name'}
        </h1>
        
        <div className="text-lg font-semibold text-dark mb-6">
          {DEMO_PRODUCT?.price || '$0.00'}
        </div>
        
        {/* Size selector */}
        <div className="mb-4">
          <div className="text-sm font-medium text-text-secondary mb-2">Size</div>
          <div className="flex gap-2">
            {['S', 'M', 'L', 'XL'].map((size) => (
              <button
                key={size}
                className={cn(
                  "w-10 h-10 rounded-lg border text-sm font-medium flex items-center justify-center transition-colors",
                  size === 'M' 
                    ? "bg-dark text-white border-dark" 
                    : "border-border text-dark hover:bg-surface-alt"
                )}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
        
        {/* Add to Cart button */}
        <button className="w-full h-12 bg-dark text-white rounded-xl font-medium text-sm mb-3 hover:bg-black transition-colors">
          Add to Cart
        </button>
        
        {/* Shopping Buddy Try On button */}
        {showTryOnButton && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onTryOnClick}
            className={cn(
              "w-full h-12 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 bg-primary text-white transition-all",
              highlightTryOn && "animate-pulse-glow ring-2 ring-primary/30 ring-offset-2"
            )}
          >
            <span>Try It On</span>
          </motion.button>
        )}
      </div>
    </div>
  );
}
