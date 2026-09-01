import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Camera } from 'lucide-react';
import { cn } from '../../lib/utils';
import { DEMO_PRODUCT } from '../../lib/constants';

export default function ShoppingBuddyModal({
  stage = 'upload',
  className
}) {
  return (
    <div className={cn("bg-white rounded-2xl shadow-strong border border-border overflow-hidden max-w-2xl w-full mx-auto", className)}>
      {/* Header */}
      <div className="px-6 py-4 border-b border-border flex items-center gap-3">
        <Sparkles className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-bold text-dark">Shopping Buddy</h2>
        <span className="text-xs text-text-muted ml-auto hidden sm:inline-block">Try it before you buy it.</span>
      </div>

      {/* Body */}
      <div className="relative">
        <AnimatePresence mode="wait">
          {stage === 'upload' && (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6"
            >
              <div>
                <div className="text-sm font-medium text-text-muted mb-2">Your Photo</div>
                <div className="aspect-[3/4] rounded-xl border-2 border-dashed border-border bg-surface-alt flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
                  <Camera className="w-8 h-8 text-text-muted mb-3" />
                  <span className="text-sm text-text-muted font-medium mb-1">Upload your photo</span>
                  <span className="text-xs text-text-muted/60">or drag and drop</span>
                </div>
              </div>

              <div>
                <div className="text-sm font-medium text-text-muted mb-2">Selected Garment</div>
                <div className="aspect-[3/4] rounded-xl overflow-hidden bg-gray-100">
                  <img 
                    src={DEMO_PRODUCT?.image || 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80'} 
                    alt="Selected Garment"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {stage === 'generating' && (
            <motion.div
              key="generating"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="p-12 flex flex-col items-center justify-center min-h-[300px]"
            >
              <div className="w-12 h-12 border-[3px] border-primary border-t-transparent rounded-full animate-spin mx-auto" />
              <h3 className="text-lg font-medium text-dark mt-6 text-center">Creating your look...</h3>
              
              <div className="w-48 h-1 bg-border rounded-full mx-auto mt-4 overflow-hidden relative">
                <motion.div 
                  className="absolute left-0 top-0 bottom-0 bg-primary"
                  initial={{ width: "0%" }}
                  animate={{ width: "80%" }}
                  transition={{ duration: 3, ease: "easeOut" }}
                />
              </div>
            </motion.div>
          )}

          {stage === 'result' && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="p-6"
            >
              <h3 className="text-lg font-semibold text-dark text-center mb-4">Your look is ready</h3>
              
              <div className="aspect-[3/4] rounded-xl overflow-hidden bg-gray-100 mx-auto max-w-xs shadow-lg">
                <img 
                  src={DEMO_PRODUCT?.tryonImage || DEMO_PRODUCT?.image || 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80'} 
                  alt="AI Try-on Result"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              
              <div className="flex flex-wrap gap-3 justify-center mt-6">
                <button className="border border-border rounded-lg px-4 py-2 text-sm font-medium text-dark hover:bg-surface-alt transition-colors">
                  Download
                </button>
                <button className="border border-border rounded-lg px-4 py-2 text-sm font-medium text-dark hover:bg-surface-alt transition-colors">
                  Try Another
                </button>
                <button className="bg-primary text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-primary-deep transition-colors">
                  View Product
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      {stage === 'upload' && (
        <div className="px-6 py-4 border-t border-border">
          <motion.button 
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="w-full h-12 bg-primary text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-primary-deep transition-colors"
          >
            <span>Generate Try-On</span>
          </motion.button>
        </div>
      )}
    </div>
  );
}
