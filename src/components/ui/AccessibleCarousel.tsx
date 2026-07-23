import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

interface CarouselItem {
  id: string;
  content: React.ReactNode;
}

interface AccessibleCarouselProps {
  items: CarouselItem[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showControls?: boolean;
  showIndicators?: boolean;
  ariaLabel?: string;
  className?: string;
}

export const AccessibleCarousel: React.FC<AccessibleCarouselProps> = ({
  items,
  autoPlay = false,
  autoPlayInterval = 5000,
  showControls = true,
  showIndicators = true,
  ariaLabel = "Content carousel",
  className = ""
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
    setIsUserInteracting(true);
  }, [items.length]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    setIsUserInteracting(true);
  }, [items.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
    setIsUserInteracting(true);
  }, []);

  const toggleAutoPlay = useCallback(() => {
    setIsPlaying(!isPlaying);
    setIsUserInteracting(true);
  }, [isPlaying]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        goToPrevious();
        break;
      case 'ArrowRight':
        event.preventDefault();
        goToNext();
        break;
      case 'Home':
        event.preventDefault();
        goToSlide(0);
        break;
      case 'End':
        event.preventDefault();
        goToSlide(items.length - 1);
        break;
      case ' ':
      case 'Enter':
        event.preventDefault();
        toggleAutoPlay();
        break;
    }
  }, [goToNext, goToPrevious, goToSlide, items.length, toggleAutoPlay]);

  // Auto-play functionality with pause on interaction
  useEffect(() => {
    if (isPlaying && !isUserInteracting) {
      intervalRef.current = setInterval(goToNext, autoPlayInterval);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, isUserInteracting, goToNext, autoPlayInterval]);

  // Reset user interaction flag after a delay
  useEffect(() => {
    if (isUserInteracting) {
      const timeout = setTimeout(() => {
        setIsUserInteracting(false);
      }, 10000); // Resume auto-play after 10 seconds of no interaction

      return () => clearTimeout(timeout);
    }
  }, [isUserInteracting]);

  // Pause on hover/focus
  const handleMouseEnter = () => setIsUserInteracting(true);
  const handleMouseLeave = () => setIsUserInteracting(false);

  return (
    <div className={`relative ${className}`}>
      {/* Screen reader announcement */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Slide {currentIndex + 1} of {items.length}
      </div>

      {/* Main carousel container */}
      <div
        ref={carouselRef}
        className="relative overflow-hidden rounded-2xl focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2"
        role="region"
        aria-label={ariaLabel}
        aria-roledescription="carousel"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="w-full"
            role="tabpanel"
            aria-label={`Slide ${currentIndex + 1} of ${items.length}`}
          >
            {items[currentIndex]?.content}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation controls */}
      {showControls && items.length > 1 && (
        <div className="flex items-center justify-between mt-4">
          <button
            onClick={goToPrevious}
            className="flex items-center justify-center w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            aria-label="Previous slide"
            type="button"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {autoPlay && (
            <button
              onClick={toggleAutoPlay}
              className="flex items-center justify-center w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
              type="button"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>
          )}

          <button
            onClick={goToNext}
            className="flex items-center justify-center w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            aria-label="Next slide"
            type="button"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}

      {/* Slide indicators */}
      {showIndicators && items.length > 1 && (
        <div className="flex justify-center gap-2 mt-4" role="tablist" aria-label="Slide navigation">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                index === currentIndex
                  ? 'bg-blue-400 scale-125'
                  : 'bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
              aria-selected={index === currentIndex}
              role="tab"
              type="button"
            />
          ))}
        </div>
      )}

      {/* Instructions for keyboard users */}
      <div className="sr-only">
        Use arrow keys to navigate slides, Home and End to go to first or last slide, 
        and Space or Enter to pause/play automatic slideshow.
      </div>
    </div>
  );
};
