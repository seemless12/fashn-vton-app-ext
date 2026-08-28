import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export default function BrowserMockup({
  children,
  url = 'junaidjamshed.com/product/premium-kameez',
  className,
  animate = false
}) {
  const content = (
    <div className={cn('rounded-2xl overflow-hidden shadow-strong border border-border bg-white', className)}>
      {/* Title bar */}
      <div className="h-10 bg-[#F1F3F4] flex items-center px-3 sm:px-4 border-b border-border">
        {/* Window controls */}
        <div className="flex gap-1.5 shrink-0">
          <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
          <div className="w-3 h-3 rounded-full bg-[#28C840]" />
        </div>

        {/* Address bar */}
        <div className="flex-1 mx-4 h-6 bg-white rounded-md px-3 flex items-center min-w-0">
          <span className="text-[10px] mr-2 shrink-0">Shop</span>
          <span className="text-xs text-text-secondary truncate">{url}</span>
        </div>

        {/* Right side placeholder */}
        <div className="flex gap-1 shrink-0">
          <div className="w-1 h-1 rounded-full bg-text-muted" />
          <div className="w-1 h-1 rounded-full bg-text-muted" />
          <div className="w-1 h-1 rounded-full bg-text-muted" />
        </div>
      </div>

      {/* Content area */}
      <div className="overflow-hidden bg-white">
        {children}
      </div>
    </div>
  );

  if (animate) {
    return (
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {content}
      </motion.div>
    );
  }

  return content;
}
