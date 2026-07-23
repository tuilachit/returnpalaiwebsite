import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Clock, Bell, Package, CheckCircle } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { steps } from '../data/content';

const iconMap = {
  Camera,
  Clock,
  Bell,
  Package,
};

export const HowItWorks: React.FC = () => {
  const { elementRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '50px',
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const stepVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  const lineVariants = {
    hidden: { scaleY: 0 },
    visible: {
      scaleY: 1,
      transition: {
        duration: 1,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <section id="how-it-works" className="py-24 bg-gradient-to-b from-dark-900 to-black relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-10 w-128 h-128 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          ref={elementRef}
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-6 py-3 bg-teal-500/20 text-teal-400 rounded-full text-sm font-medium mb-6 border border-teal-500/30 backdrop-blur-md">
            🚀 How It Works
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold text-white mb-6">
            Four Simple Steps to
            <span className="bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
              {' '}Never Forget Again
            </span>
          </h2>
          <p className="text-xl text-white/70 max-w-4xl mx-auto leading-relaxed">
            We've designed the simplest possible flow to help you track your returns. 
            No complicated setup, no learning curve - just scan, track, and get reminded.
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isIntersecting ? "visible" : "hidden"}
        >
          {steps.map((step, index) => {
            const IconComponent = iconMap[step.icon as keyof typeof iconMap];
            const isLast = index === steps.length - 1;

            return (
              <div key={step.id} className="relative">
                <motion.div
                  variants={stepVariants}
                  className="flex flex-col lg:flex-row items-center lg:items-start gap-8 mb-16 last:mb-0"
                >
                  {/* Step number and icon */}
                  <div className="flex flex-col items-center lg:items-start">
                    <motion.div
                      className="relative w-20 h-20 mb-4"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      {/* Animated gradient border */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-500 via-teal-500 to-purple-500 rounded-2xl shadow-lg"
                        animate={{
                          rotate: [0, 360],
                        }}
                        transition={{
                          duration: 12,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                      />
                      <div className="absolute inset-1 bg-dark-900 rounded-xl flex items-center justify-center">
                        <IconComponent className="w-8 h-8 text-blue-400" />
                      </div>
                    </motion.div>

                    {/* Step number badge */}
                    <motion.div
                      className="bg-gradient-to-r from-blue-500 to-teal-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-lg"
                      initial={{ scale: 0 }}
                      animate={isIntersecting ? { scale: 1 } : { scale: 0 }}
                      transition={{ delay: index * 0.3 + 0.5, type: "spring", stiffness: 400, damping: 17 }}
                    >
                      {step.number}
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 text-center lg:text-left">
                    <h3 className="text-2xl font-bold text-white mb-4">
                      {step.title}
                    </h3>
                    <p className="text-lg text-white/70 leading-relaxed max-w-2xl">
                      {step.description}
                    </p>
                    
                    {/* Success indicators */}
                    <motion.div
                      className="flex items-center justify-center lg:justify-start gap-2 mt-4 text-accent-400"
                      initial={{ opacity: 0, y: 10 }}
                      animate={isIntersecting ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                      transition={{ delay: index * 0.3 + 0.8 }}
                    >
                      <CheckCircle className="w-5 h-5" />
                      <span className="text-sm font-medium">Simple & Effective</span>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Connecting line */}
                {!isLast && (
                  <motion.div
                    className="absolute left-1/2 lg:left-10 transform -translate-x-1/2 lg:translate-x-0 top-20 w-px h-16 bg-gradient-to-b from-blue-400/50 to-teal-400/50 origin-top"
                    variants={lineVariants}
                    style={{ transformOrigin: 'top' }}
                  />
                )}
              </div>
            );
          })}
        </motion.div>

        {/* Bottom section with demo CTA */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <div className="bg-glass-dark backdrop-blur-md rounded-3xl p-12 border border-white/10">
            <h3 className="text-3xl font-bold text-white mb-4">
              See How Simple It Is
            </h3>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Watch our quick demo to see how easy it is to never forget a return deadline again. 
              No complicated setup, just simple tools that work.
            </p>
            <motion.button
              className="bg-gradient-to-r from-blue-500 to-teal-500 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Watch Demo
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
