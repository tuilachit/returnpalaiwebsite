import React from 'react';
import { motion } from 'framer-motion';
import { Bell, CalendarCheck, ScanLine } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const validationGoals = [
  {
    title: 'Deadline awareness',
    description:
      'Test whether timely reminders reduce missed retailer return windows.',
    icon: Bell,
  },
  {
    title: 'Faster item capture',
    description:
      'Measure whether receipt-assisted entry is meaningfully quicker than manual tracking.',
    icon: ScanLine,
  },
  {
    title: 'Useful calendar context',
    description:
      'Validate whether putting return deadlines beside existing commitments helps people act.',
    icon: CalendarCheck,
  },
];

export const SocialProof: React.FC = () => {
  const { elementRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '50px',
  });

  return (
    <section
      id="validation"
      className="py-24 bg-gradient-to-b from-black to-dark-900 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={elementRef}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-6 py-3 bg-yellow-500/20 text-yellow-400 rounded-full text-sm font-medium mb-6 border border-yellow-500/30 backdrop-blur-md">
            Product validation
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold text-white mb-6">
            What this prototype is
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              {' '}designed to test
            </span>
          </h2>
          <p className="text-xl text-white/70 max-w-4xl mx-auto leading-relaxed">
            ReturnPal is an early product concept. These are hypotheses for
            customer research, not claims about production usage or customer
            outcomes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {validationGoals.map(({ title, description, icon: Icon }, index) => (
            <motion.article
              key={title}
              className="bg-glass-dark backdrop-blur-md rounded-2xl p-8 border border-white/10"
              initial={{ opacity: 0, y: 30 }}
              animate={
                isIntersecting ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
              }
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Icon className="w-10 h-10 text-yellow-400 mb-5" aria-hidden="true" />
              <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
              <p className="text-white/70 leading-relaxed">{description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
