import React from 'react';
import { motion } from 'framer-motion';
import { Download, Play } from 'lucide-react';
import { Button } from './ui/Button';
import { StorySection } from './StorySection';

interface HeroProps {
  onDownloadClick: () => void;
  onDemoClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onDownloadClick, onDemoClick }) => {
  const currentTime = new Date().getHours();
  const getGreeting = () => {
    if (currentTime < 12) return 'Good morning';
    if (currentTime < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.6,
      },
    },
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-mesh-gradient opacity-30"></div>
      <div className="absolute inset-0">
        {/* Floating orbs */}
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-128 h-128 bg-purple-500/15 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-88 h-88 bg-teal-400/20 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: [1, 1.4, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        
        {/* Mesh gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/80"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          className="text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Greeting */}
          <StorySection className="mb-6">
            <span className="inline-flex items-center px-6 py-3 bg-glass-light backdrop-blur-md rounded-full text-sm font-medium text-white/90 border border-white/20 mb-4">
              👋 {getGreeting()}! Meet Sydney's newest return management app
            </span>
          </StorySection>

          {/* Main headline */}
          <StorySection
            delay={0.2}
            className="text-5xl sm:text-6xl lg:text-8xl font-display font-bold mb-8 leading-tight"
          >
            <span className="bg-gradient-to-r from-blue-400 via-teal-400 to-purple-400 bg-clip-text text-transparent animate-gradient bg-[length:400%_400%]">
              ReturnPal AI
            </span>
            <br />
            <span className="text-white">Never Forget a</span>
            <br />
            <span className="bg-gradient-to-r from-accent-400 via-blue-400 to-teal-400 bg-clip-text text-transparent animate-gradient bg-[length:400%_400%]">
              Return Again
            </span>
          </StorySection>

          {/* Subtitle */}
          <StorySection
            delay={0.4}
            className="text-xl sm:text-2xl text-white/80 mb-12 max-w-4xl mx-auto leading-relaxed"
          >
            An early product concept built in Sydney to explore a simpler way to
            track return deadlines and act before a return window closes.
          </StorySection>

          {/* CTA Buttons */}
          <StorySection
            delay={0.6}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Button
              size="lg"
              leftIcon={<Download className="w-5 h-5" />}
              className="text-lg px-8 py-4"
              onClick={onDownloadClick}
            >
              Join the Beta
            </Button>
            <Button
              variant="secondary"
              size="lg"
              leftIcon={<Play className="w-5 h-5" />}
              className="text-lg px-8 py-4"
              onClick={onDemoClick}
            >
              See How It Works
            </Button>
          </StorySection>

          {/* Simple value proposition */}
          <StorySection
            delay={0.8}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="bg-glass-light backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-4">
                Built for Real People
              </h3>
              <p className="text-white/80 text-lg">
                We're a small team who experienced the frustration of missed return deadlines firsthand. 
                Now we're building the solution we wish existed.
              </p>
            </div>
          </StorySection>
        </motion.div>

        {/* App mockup - floating animation */}
        <StorySection
          delay={1.0}
          className="mt-20 flex justify-center"
        >
          <motion.div
            className="relative"
            animate={{
              y: [0, -30, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-[3rem] blur-2xl scale-110"></div>
            
            <div className="relative w-80 h-96 bg-gradient-to-br from-dark-800 to-dark-900 rounded-[3rem] p-3 shadow-2xl border border-white/10">
              <div className="w-full h-full bg-gradient-to-br from-dark-900 to-black rounded-[2.5rem] overflow-hidden relative">
                {/* Phone notch */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-dark-950 rounded-b-2xl z-10"></div>
                
                {/* App content mockup */}
                <div className="pt-8 px-6 h-full bg-gradient-to-b from-dark-900 to-black">
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="flex justify-between items-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg animate-pulse"></div>
                      <div className="w-6 h-6 bg-white/20 rounded-full"></div>
                    </div>
                    
                    {/* Card */}
                    <div className="bg-glass-light backdrop-blur-md rounded-2xl p-4 border border-white/10">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-blue-500/20 rounded-xl animate-pulse"></div>
                        <div>
                          <div className="w-20 h-3 bg-white/30 rounded mb-1"></div>
                          <div className="w-16 h-2 bg-white/20 rounded"></div>
                        </div>
                      </div>
                      <div className="w-full h-2 bg-white/10 rounded-full">
                        <motion.div 
                          className="h-2 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full"
                          animate={{ width: ['0%', '75%', '0%'] }}
                          transition={{ duration: 3, repeat: Infinity }}
                        />
                      </div>
                    </div>

                    {/* List items */}
                    <div className="space-y-3">
                      {[...Array(4)].map((_, i) => (
                        <motion.div 
                          key={i} 
                          className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/5"
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 2, delay: i * 0.5, repeat: Infinity }}
                        >
                          <div className="w-8 h-8 bg-white/20 rounded-lg"></div>
                          <div className="flex-1">
                            <div className="w-24 h-2 bg-white/30 rounded mb-1"></div>
                            <div className="w-16 h-2 bg-white/20 rounded"></div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </StorySection>
      </div>
    </section>
  );
};
