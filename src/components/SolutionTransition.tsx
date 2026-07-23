import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';
import { StorySection } from './StorySection';

export const SolutionTransition: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-dark-900 via-black to-dark-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-128 h-128 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        
        {/* Additional floating elements */}
        <motion.div
          className="absolute top-20 right-20 w-64 h-64 bg-teal-500/10 rounded-full blur-2xl"
          animate={{
            y: [0, -50, 0],
            x: [0, 30, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <StorySection>
          <motion.div
            className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mb-8 shadow-2xl"
            animate={{
              y: [0, -15, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <ArrowDown className="w-12 h-12 text-white" />
          </motion.div>
        </StorySection>

        <StorySection delay={0.3}>
          <h2 className="text-5xl sm:text-6xl lg:text-8xl font-display font-bold mb-8">
            <span className="text-white">Meet</span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-teal-400 to-purple-400 bg-clip-text text-transparent animate-gradient bg-[length:400%_400%]">
              ReturnPal AI
            </span>
          </h2>
        </StorySection>

        <StorySection delay={0.6}>
          <div className="flex items-center justify-center gap-3 mb-8">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles className="w-10 h-10 text-yellow-400" />
            </motion.div>
            <span className="text-2xl font-semibold text-white">
              Your Simple Return Companion
            </span>
            <motion.div
              animate={{ rotate: [360, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles className="w-10 h-10 text-yellow-400" />
            </motion.div>
          </div>
        </StorySection>

        <StorySection delay={0.9}>
          <p className="text-xl sm:text-2xl text-white/80 leading-relaxed max-w-4xl mx-auto">
            With 68% of shoppers missing return deadlines and losing $340+ annually, we knew there had to be a better way. 
            We scan your receipts, track your deadlines, and remind you before it's too late. 
            <span className="text-accent-400 font-semibold">Built by a Sydney team who experienced this frustration firsthand.</span>
          </p>
        </StorySection>

        <StorySection delay={1.2}>
          <motion.div
            className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { label: 'Receipt Scanning', icon: '📱' },
              { label: 'Smart Reminders', icon: '⏰' },
              { label: 'Simple Tracking', icon: '📋' },
            ].map((benefit) => (
              <motion.div
                key={benefit.label}
                className="text-center"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ scale: 1.1 }}
              >
                <div className="text-5xl mb-4">{benefit.icon}</div>
                <div className="font-semibold text-white">{benefit.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </StorySection>
      </div>
    </section>
  );
};
