import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { testimonials } from '../data/content';
import { AccessibleCarousel } from './ui/AccessibleCarousel';

export const SocialProof: React.FC = () => {
  const { elementRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '50px',
  });

  // Transform testimonials for carousel
  const carouselItems = testimonials.map(testimonial => ({
    id: testimonial.id,
    content: (
      <div className="bg-glass-dark backdrop-blur-md rounded-3xl p-12 border border-white/10 relative">
        {/* Quote icon */}
        <div className="absolute top-8 left-8">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center backdrop-blur-md border border-white/10">
            <Quote className="w-6 h-6 text-blue-400" />
          </div>
        </div>

        {/* Content */}
        <div className="text-center">
          {/* Testimonial text */}
          <blockquote className="text-2xl lg:text-3xl font-medium text-white leading-relaxed mb-8">
            "{testimonial.text}"
          </blockquote>

          {/* User info */}
          <div className="flex items-center justify-center gap-4">
            <motion.img
              src={testimonial.avatar}
              alt={testimonial.name}
              className="w-16 h-16 rounded-full object-cover shadow-lg"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            />
            <div className="text-left">
              <div className="font-bold text-white text-lg">
                {testimonial.name}
              </div>
              <div className="text-white/60">
                {testimonial.title}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }));

  return (
    <section id="testimonials" className="py-24 bg-gradient-to-b from-black to-dark-900 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-20 w-64 h-64 bg-yellow-500/10 rounded-full blur-2xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-88 h-88 bg-blue-500/10 rounded-full blur-2xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 20,
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
          <span className="inline-block px-6 py-3 bg-yellow-500/20 text-yellow-400 rounded-full text-sm font-medium mb-6 border border-yellow-500/30 backdrop-blur-md">
            ⭐ Early User Feedback
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold text-white mb-6">
            What Our Beta Users
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              {' '}Are Saying
            </span>
          </h2>
          <p className="text-xl text-white/70 max-w-4xl mx-auto leading-relaxed">
            We're still in beta, but our early users are already seeing results. 
            <span className="text-accent-400 font-semibold">Real feedback from real people testing our app.</span>
          </p>
        </motion.div>

        {/* Main testimonial carousel */}
        <AccessibleCarousel
          items={carouselItems}
          autoPlay={true}
          autoPlayInterval={6000}
          ariaLabel="Customer testimonials"
          className="max-w-4xl mx-auto mb-16"
        />

        {/* Simple value props */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="bg-glass-dark backdrop-blur-md rounded-2xl p-6 border border-white/10">
            <div className="text-4xl mb-4">🚀</div>
            <div className="text-xl font-bold text-white mb-2">Launching Soon</div>
            <div className="text-white/70">Built in Sydney</div>
          </div>
          <div className="bg-glass-dark backdrop-blur-md rounded-2xl p-6 border border-white/10">
            <div className="text-4xl mb-4">🤖</div>
            <div className="text-xl font-bold text-white mb-2">AI Powered</div>
            <div className="text-white/70">Smart & Simple</div>
          </div>
          <div className="bg-glass-dark backdrop-blur-md rounded-2xl p-6 border border-white/10">
            <div className="text-4xl mb-4">💝</div>
            <div className="text-xl font-bold text-white mb-2">Free to Try</div>
            <div className="text-white/70">No hidden costs</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};