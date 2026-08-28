import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

export default function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = 'up',
  once = true,
  amount = 0.3
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount });
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const getDirectionOffset = () => {
    switch (direction) {
      case 'up': return { y: 30, x: 0 };
      case 'down': return { y: -30, x: 0 };
      case 'left': return { x: -30, y: 0 };
      case 'right': return { x: 30, y: 0 };
      default: return { y: 30, x: 0 };
    }
  };

  const offset = getDirectionOffset();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...offset }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...offset }}
      transition={{ duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  );
}
