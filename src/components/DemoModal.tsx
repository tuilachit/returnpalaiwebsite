import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, Maximize } from 'lucide-react';
import { Modal } from './ui/Modal';
import { Button } from './ui/Button';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DemoModal: React.FC<DemoModalProps> = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const totalTime = 120; // 2 minutes

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    // In a real app, this would control video playback
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="ReturnPal Demo">
      <div className="space-y-6">
        {/* Video player mockup */}
        <div className="relative bg-gray-900 rounded-2xl overflow-hidden aspect-video">
          {/* Video placeholder */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
            <motion.div
              className="text-center text-white"
              animate={isPlaying ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto backdrop-blur-sm">
                {isPlaying ? (
                  <Pause className="w-10 h-10" />
                ) : (
                  <Play className="w-10 h-10 ml-1" />
                )}
              </div>
              <p className="text-lg font-medium">
                {isPlaying ? 'Playing Demo Video' : 'Click to Play Demo'}
              </p>
            </motion.div>
          </div>

          {/* Play button overlay */}
          <button
            onClick={handlePlayPause}
            className="absolute inset-0 w-full h-full flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors"
          >
            <span className="sr-only">{isPlaying ? 'Pause' : 'Play'} video</span>
          </button>

          {/* Video controls */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <div className="flex items-center gap-4">
              <button
                onClick={handlePlayPause}
                className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors backdrop-blur-sm"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5 ml-0.5" />
                )}
              </button>

              {/* Progress bar */}
              <div className="flex-1">
                <div className="w-full h-1 bg-white/30 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-white rounded-full"
                    style={{ width: `${(currentTime / totalTime) * 100}%` }}
                    animate={isPlaying ? { width: '100%' } : {}}
                    transition={{ duration: totalTime - currentTime, ease: 'linear' }}
                  />
                </div>
              </div>

              <div className="text-white text-sm font-medium">
                {formatTime(currentTime)} / {formatTime(totalTime)}
              </div>

              <button className="w-8 h-8 text-white hover:text-gray-300 transition-colors">
                <Volume2 className="w-5 h-5" />
              </button>

              <button className="w-8 h-8 text-white hover:text-gray-300 transition-colors">
                <Maximize className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Demo highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { time: '0:15', title: 'Receipt Scanning', description: 'See how easy it is to capture receipts' },
            { time: '0:45', title: 'Calendar Integration', description: 'Automatic deadline tracking' },
            { time: '1:10', title: 'Smart Reminders', description: 'Never miss a return window' },
            { time: '1:35', title: 'One-Tap Returns', description: 'Process returns effortlessly' },
          ].map((highlight, index) => (
            <motion.div
              key={highlight.title}
              className="bg-gray-50 rounded-xl p-4 cursor-pointer hover:bg-gray-100 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setCurrentTime(parseInt(highlight.time.split(':')[0]) * 60 + parseInt(highlight.time.split(':')[1]))}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm font-medium">
                  {highlight.time}
                </div>
                <div>
                  <div className="font-medium text-gray-900">{highlight.title}</div>
                  <div className="text-sm text-gray-600">{highlight.description}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center pt-4 border-t border-gray-200">
          <p className="text-gray-600 mb-4">Ready to transform your return experience?</p>
          <Button size="lg" className="w-full sm:w-auto">
            Download ReturnPal Now
          </Button>
        </div>
      </div>
    </Modal>
  );
};