import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Bell, Scan, Store, TrendingUp, Zap, ArrowRight } from 'lucide-react';
import { Card } from './ui/Card';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { features } from '../data/content';
import { StorySection } from './StorySection';

const iconMap = {
  Calendar,
  Bell,
  Scan,
  Store,
  TrendingUp,
  Zap,
};

interface FeaturesProps {
  onLearnMoreClick: (featureId: string) => void;
}

export const Features: React.FC<FeaturesProps> = ({ onLearnMoreClick }) => {
  const { elementRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '50px',
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section id="features" className="py-24 bg-gradient-to-b from-black to-dark-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-10 w-88 h-88 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <StorySection
          ref={elementRef}
          className="text-center mb-20"
        >
          <span className="inline-block px-6 py-3 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium mb-6 border border-blue-500/30 backdrop-blur-md">
            ✨ What We're Building
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold text-white mb-6">
            Simple Features That
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {' '}Actually Work
            </span>
          </h2>
          <p className="text-xl text-white/70 max-w-4xl mx-auto leading-relaxed">
            We're focused on building features that solve real problems. No fluff, no complexity - 
            just tools that help you never lose money on forgotten returns. <span className="text-accent-400 font-semibold">Currently in beta with more features coming soon.</span>
          </p>
        </StorySection>

        {/* Features grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isIntersecting ? "visible" : "hidden"}
        >
          {features.map((feature, index) => {
            const IconComponent = iconMap[feature.icon as keyof typeof iconMap];
            
            return (
              <motion.div
                key={feature.id}
                variants={itemVariants}
                className="group"
              >
                <Card
                  variant="gradient"
                  className="h-full bg-glass-dark backdrop-blur-md border-white/10 hover:border-white/20 transition-all duration-500 group-hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/20"
                >
                  {/* Icon with gradient background */}
                  <motion.div
                    className={`w-18 h-18 rounded-2xl bg-gradient-to-r ${feature.gradient} p-4 mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <IconComponent className="w-full h-full text-white" />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-white/70 leading-relaxed mb-6">
                    {feature.description}
                  </p>

                  {/* Learn more link */}
                  <motion.button
                    className="flex items-center text-blue-400 font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer hover:text-blue-300"
                    whileHover={{ x: 5 }}
                    onClick={() => onLearnMoreClick(feature.id)}
                  >
                    Learn more
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </motion.button>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA section */}
        <StorySection
          className="mt-20 text-center"
          delay={0.8}
        >
          <div className="bg-gradient-to-r from-blue-500/20 via-teal-500/20 to-purple-500/20 backdrop-blur-md rounded-3xl p-12 border border-white/10">
            <h3 className="text-3xl font-bold text-white mb-4">
              Want to Be an Early User?
            </h3>
            <p className="text-xl text-white/80 mb-8">
              Join our beta and help us build something that actually solves your return problems.
            </p>
            <motion.button
              className="bg-white text-black px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Join the Beta
            </motion.button>
          </div>
        </StorySection>
      </div>
    </section>
  );
};