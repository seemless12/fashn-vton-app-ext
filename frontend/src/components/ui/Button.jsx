import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

const Button = forwardRef(({
  children,
  className,
  variant = 'primary',
  size = 'md',
  as: Component = 'button',
  ...props
}, ref) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg';
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-deep shadow-sm hover:shadow-md',
    secondary: 'border border-border text-text-primary hover:bg-surface-alt',
    ghost: 'text-text-secondary hover:bg-surface-alt hover:text-dark',
    dark: 'bg-dark text-white hover:bg-gray-800',
    'outline-primary': 'border border-primary text-primary hover:bg-primary-soft',
  };

  const sizes = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 py-2 text-sm',
    lg: 'h-12 px-6 text-base',
    icon: 'h-10 w-10',
  };

  const isMotion = Component === motion.button || Component === motion.a;
  
  const motionProps = isMotion ? {
    whileHover: { scale: props.disabled ? 1 : 1.02 },
    whileTap: { scale: props.disabled ? 1 : 0.98 },
  } : {};

  return (
    <Component
      ref={ref}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...motionProps}
      {...props}
    >
      {children}
    </Component>
  );
});

Button.displayName = 'Button';

export default Button;
