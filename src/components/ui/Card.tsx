import React, { HTMLAttributes, forwardRef } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'gradient';
  padding?: 'sm' | 'md' | 'lg';
  hover?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, variant = 'default', padding = 'md', hover = true, className, ...props }, ref) => {
    const baseClasses = 'rounded-2xl transition-all duration-300';
    
    const variants = {
      default: 'bg-white shadow-sm border border-gray-100',
      elevated: 'bg-white shadow-lg',
      gradient: 'bg-card-gradient backdrop-blur-sm border border-white/20'
    };

    const paddings = {
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8'
    };

    const hoverClasses = hover ? 'hover:shadow-xl hover:scale-[1.02] hover:-translate-y-1' : '';

    return (
      <motion.div
        ref={ref}
        className={clsx(baseClasses, variants[variant], paddings[padding], hoverClasses, className)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = 'Card';