import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';

const variants = {
  primary: 'bg-primary text-white hover:bg-primary-deep shadow-sm',
  secondary: 'border border-primary text-primary hover:bg-primary-soft',
  ghost: 'text-text-secondary hover:bg-gray-50',
  dark: 'bg-dark text-white hover:bg-gray-800',
};

const sizes = {
  sm: 'h-8 px-3 text-xs gap-1.5 rounded-md',
  md: 'h-10 px-5 text-sm gap-2 rounded-lg',
  lg: 'h-12 px-7 text-base gap-2.5 rounded-lg',
};

const Button = forwardRef(({ variant = 'primary', size = 'md', className, children, icon: Icon, loading, disabled, ...rest }, ref) => {
  return (
    <motion.button
      ref={ref}
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.01 }}
      disabled={disabled || loading}
      className={cn(
        'inline-flex items-center justify-center font-medium transition-colors duration-200 cursor-pointer',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
        variants[variant],
        sizes[size],
        className
      )}
      {...rest}
    >
      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : Icon && <Icon className="w-4 h-4" />}
      {children}
    </motion.button>
  );
});

Button.displayName = 'Button';
export default Button;
