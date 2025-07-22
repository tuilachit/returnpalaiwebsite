import React, { useEffect, useState } from 'react';
import { ScrollProgress } from './components/ScrollProgress';
import { SkipLink } from './components/ui/SkipLink';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { ProblemSection } from './components/ProblemSection';
import { SolutionTransition } from './components/SolutionTransition';
import { Features } from './components/Features';
import { HowItWorks } from './components/HowItWorks';
import { SocialProof } from './components/SocialProof';
import { Footer } from './components/Footer';
import { DownloadModal } from './components/DownloadModal';
import { DemoModal } from './components/DemoModal';

function App() {
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  useEffect(() => {
    // Smooth scrolling for all internal links
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement;
      if (target.tagName === 'A' && target.hash) {
        const href = target.getAttribute('href');
        if (href?.startsWith('#')) {
          e.preventDefault();
          const element = document.querySelector(href);
          if (element) {
            element.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            });
          }
        }
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  useEffect(() => {
    // Reduce motion for users who prefer it
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (mediaQuery.matches) {
      document.documentElement.style.setProperty('--animation-duration', '0.01ms');
    }
  }, []);

  const handleDownloadClick = () => {
    setIsDownloadModalOpen(true);
  };

  const handleDemoClick = () => {
    setIsDemoModalOpen(true);
  };

  const handleLearnMoreClick = (featureId: string) => {
    console.log(`Learn more clicked for feature: ${featureId}`);
    // In a real app, this could open a detailed feature modal or navigate to a feature page
    alert(`Learn more about ${featureId} feature - this would show detailed information in a real app.`);
  };

  return (
    <div className="min-h-screen bg-white antialiased">
      <SkipLink href="#main-content">Skip to main content</SkipLink>
      <ScrollProgress />
      <Navigation onDownloadClick={handleDownloadClick} />
      <main id="main-content">
        <Hero 
          onDownloadClick={handleDownloadClick}
          onDemoClick={handleDemoClick}
        />
        <ProblemSection />
        <SolutionTransition />
        <Features onLearnMoreClick={handleLearnMoreClick} />
        <HowItWorks />
        <SocialProof />
      </main>
      <Footer onDownloadClick={handleDownloadClick} />
      
      {/* Modals */}
      <DownloadModal 
        isOpen={isDownloadModalOpen} 
        onClose={() => setIsDownloadModalOpen(false)} 
      />
      <DemoModal 
        isOpen={isDemoModalOpen} 
        onClose={() => setIsDemoModalOpen(false)} 
      />
    </div>
  );
}

export default App;