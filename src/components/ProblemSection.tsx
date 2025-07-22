import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Clock, DollarSign, Frown } from 'lucide-react';
import { StorySection } from './StorySection';

export const ProblemSection: React.FC = () => {
  const problems = [
    {
      icon: AlertTriangle,
      title: 'Missed Return Windows',
      description: 'Most people forget about return deadlines until it\'s too late',
      stat: '68%',
      statLabel: 'Miss return deadlines'
    },
    {
      icon: Clock,
      title: 'Time Wasted',
      description: 'Searching through emails and receipts for return information',
      stat: '23min',
      statLabel: 'Average search time'
    },
    {
      icon: DollarSign,
      title: 'Money Lost',
      description: 'Money lost on items that could have been returned',
      stat: '$340',
      statLabel: 'Lost per person yearly'
    },
    {
      icon: Frown,
      title: 'Stress & Frustration',
      description: 'The anxiety of not knowing if you can return something',
      stat: '84%',
      statLabel: 'Feel stressed about returns'
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-black to-dark-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"
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
          className="absolute bottom-20 right-10 w-88 h-88 bg-orange-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <StorySection className="text-center mb-20">
          <span className="inline-block px-6 py-3 bg-red-500/20 text-red-400 rounded-full text-sm font-medium mb-6 border border-red-500/30 backdrop-blur-md">
            🤔 The Problem We're Solving
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold text-white mb-6">
            We've All Been There
            <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              {' '}Before
            </span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            You buy something online, forget about the return policy, and suddenly realize you've missed the deadline. 
            <span className="text-red-400 font-semibold"> Research shows this costs Australian shoppers over $2.1 billion annually.</span>
          </p>
        </StorySection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {problems.map((problem, index) => {
            const IconComponent = problem.icon;
            return (
              <StorySection
                key={problem.title}
                delay={index * 0.2}
                direction={index % 2 === 0 ? 'left' : 'right'}
              >
                <motion.div
                  className="bg-glass-dark backdrop-blur-md rounded-2xl p-8 border border-white/10 h-full"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: '0 20px 40px rgba(239, 68, 68, 0.2)'
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="w-18 h-18 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl p-4 mb-6 mx-auto animate-pulse">
                    <IconComponent className="w-full h-full text-white" />
                  </div>
                  
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-400 mb-2">
                      {problem.stat}
                    </div>
                    <div className="text-xs text-white/50 mb-4 uppercase tracking-wide">
                      {problem.statLabel}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">
                      {problem.title}
                    </h3>
                    <p className="text-white/70 leading-relaxed">
                      {problem.description}
                    </p>
                  </div>
                </motion.div>
              </StorySection>
            );
          })}
        </div>

        <StorySection className="mt-20 text-center" delay={0.8}>
          <motion.div
            className="bg-gradient-to-r from-red-500/20 to-orange-500/20 backdrop-blur-md rounded-3xl p-12 border border-red-500/30"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <h3 className="text-3xl font-bold text-white mb-4">
              $2.1B Lost Annually in Australia
            </h3>
            <p className="text-xl text-white/80">
              Australian shoppers lose billions each year on missed return opportunities. What if we could change that? 
              <span className="text-accent-400 font-semibold"> That's exactly what we're building.</span>
            </p>
          </motion.div>
        </StorySection>
      </div>
    </section>
  );
};