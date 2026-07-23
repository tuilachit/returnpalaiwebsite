import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, User, Phone, MapPin, Smartphone, Heart, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from './ui/Button';
import { EarlyUsersService } from '../services/earlyUsers';
import type { EarlyUserInsert } from '../lib/supabase';

interface EarlyUserFormProps {
  onSuccess?: () => void;
  className?: string;
}

export const EarlyUserForm: React.FC<EarlyUserFormProps> = ({ onSuccess, className = '' }) => {
  const [formData, setFormData] = useState<EarlyUserInsert>({
    email: '',
    name: '',
    phone: '',
    location: '',
    interest_level: 'high',
    preferred_platform: 'both',
    pain_points: [],
    how_heard: '',
    marketing_consent: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const painPointOptions = [
    'Missed return deadlines',
    'Lost receipts',
    'Confusing return policies',
    'Time-consuming return process',
    'Forgot about purchases',
    'Difficulty tracking return windows',
    'Lost money on expired returns',
    'Stressful return experiences'
  ];

  const howHeardOptions = [
    'Friend recommendation',
    'Social media',
    'Google search',
    'Tech blog',
    'Startup community',
    'Other'
  ];

  const handleInputChange = <K extends keyof EarlyUserInsert>(
    field: K,
    value: EarlyUserInsert[K]
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error status when user starts typing
    if (submitStatus === 'error') {
      setSubmitStatus('idle');
      setErrorMessage('');
    }
  };

  const handlePainPointToggle = (painPoint: string) => {
    const currentPainPoints = formData.pain_points || [];
    const newPainPoints = currentPainPoints.includes(painPoint)
      ? currentPainPoints.filter(p => p !== painPoint)
      : [...currentPainPoints, painPoint];
    
    handleInputChange('pain_points', newPainPoints);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const result = await EarlyUsersService.submitInterest(formData);
      
      if (result.success) {
        setSubmitStatus('success');
        onSuccess?.();
        
        // Reset form after success
        setTimeout(() => {
          setFormData({
            email: '',
            name: '',
            phone: '',
            location: '',
            interest_level: 'high',
            preferred_platform: 'both',
            pain_points: [],
            how_heard: '',
            marketing_consent: false
          });
          setSubmitStatus('idle');
        }, 3000);
      } else {
        setSubmitStatus('error');
        setErrorMessage(result.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setSubmitStatus('error');
      setErrorMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <AnimatePresence mode="wait">
        {submitStatus === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center py-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm"
            >
              <CheckCircle className="w-8 h-8 text-white" />
            </motion.div>
            <h3 className="text-xl font-bold text-white mb-3">You're In! 🎉</h3>
            <p className="text-white/90 mb-4">
              Thanks for joining our early access list. We'll keep you updated on our progress and let you know as soon as ReturnPal AI is ready to download.
            </p>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
              <p className="text-white font-medium mb-2 text-sm">What happens next?</p>
              <ul className="text-white/80 text-xs space-y-1 text-left">
                <li>• We'll send you updates on our development progress</li>
                <li>• You'll get early access when we launch</li>
                <li>• Your feedback will help shape the final product</li>
              </ul>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >

            {/* Error Message */}
            <AnimatePresence>
              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 flex items-center gap-2"
                >
                  <AlertCircle className="w-4 h-4 text-red-300 flex-shrink-0" />
                  <p className="text-red-200 text-sm">{errorMessage}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                  <User className="w-4 h-4 inline mr-1" />
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-3 py-2.5 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 backdrop-blur-sm text-sm"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                  <Mail className="w-4 h-4 inline mr-1" />
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-3 py-2.5 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 backdrop-blur-sm text-sm"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            {/* Optional Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-white mb-2">
                  <Phone className="w-4 h-4 inline mr-1" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-3 py-2.5 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 backdrop-blur-sm text-sm"
                  placeholder="+61 4XX XXX XXX"
                />
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-white mb-2">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="w-full px-3 py-2.5 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 backdrop-blur-sm text-sm"
                  placeholder="Sydney, NSW"
                />
              </div>
            </div>

            {/* Interest Level */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                <Heart className="w-4 h-4 inline mr-1" />
                How interested are you?
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['high', 'medium', 'low'] as const).map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => handleInputChange('interest_level', level)}
                    className={`px-3 py-2 rounded-lg border transition-all text-sm ${
                      formData.interest_level === level
                        ? 'bg-white/20 border-white/40 text-white'
                        : 'bg-white/5 border-white/20 text-white/80 hover:bg-white/10'
                    }`}
                  >
                    {level === 'high' && '🔥 Very Interested'}
                    {level === 'medium' && '👍 Interested'}
                    {level === 'low' && '🤔 Curious'}
                  </button>
                ))}
              </div>
            </div>

            {/* Platform Preference */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                <Smartphone className="w-4 h-4 inline mr-1" />
                Preferred Platform
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['ios', 'android', 'both'] as const).map((platform) => (
                  <button
                    key={platform}
                    type="button"
                    onClick={() => handleInputChange('preferred_platform', platform)}
                    className={`px-3 py-2 rounded-lg border transition-all text-sm ${
                      formData.preferred_platform === platform
                        ? 'bg-white/20 border-white/40 text-white'
                        : 'bg-white/5 border-white/20 text-white/80 hover:bg-white/10'
                    }`}
                  >
                    {platform === 'ios' && '📱 iOS'}
                    {platform === 'android' && '🤖 Android'}
                    {platform === 'both' && '📱🤖 Both'}
                  </button>
                ))}
              </div>
            </div>

            {/* Pain Points */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                What return problems do you face? (Select all that apply)
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {painPointOptions.map((painPoint) => (
                  <button
                    key={painPoint}
                    type="button"
                    onClick={() => handlePainPointToggle(painPoint)}
                    className={`px-3 py-2 rounded-lg border text-left transition-all text-sm ${
                      formData.pain_points?.includes(painPoint)
                        ? 'bg-white/20 border-white/40 text-white'
                        : 'bg-white/5 border-white/20 text-white/80 hover:bg-white/10'
                    }`}
                  >
                    <span className="mr-1 text-xs">
                      {formData.pain_points?.includes(painPoint) ? '✅' : '⬜'}
                    </span>
                    {painPoint}
                  </button>
                ))}
              </div>
            </div>

            {/* How did you hear about us */}
            <div>
              <label htmlFor="how_heard" className="block text-sm font-medium text-white mb-2">
                How did you hear about ReturnPal AI?
              </label>
              <select
                id="how_heard"
                value={formData.how_heard}
                onChange={(e) => handleInputChange('how_heard', e.target.value)}
                className="w-full px-3 py-2.5 bg-white/10 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 backdrop-blur-sm text-sm"
              >
                <option value="" className="bg-gray-800">Select an option</option>
                {howHeardOptions.map((option) => (
                  <option key={option} value={option} className="bg-gray-800">
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* Marketing Consent */}
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="marketing_consent"
                checked={formData.marketing_consent}
                onChange={(e) => handleInputChange('marketing_consent', e.target.checked)}
                className="mt-0.5 rounded border-white/30 bg-white/10 text-white focus:ring-white/50"
              />
              <label htmlFor="marketing_consent" className="text-xs text-white/80">
                I'd like to receive updates about ReturnPal AI development, launch announcements, and occasional tips about managing returns. You can unsubscribe anytime.
              </label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              size="md"
              disabled={isSubmitting}
              isLoading={isSubmitting}
              className="w-full bg-white text-blue-600 hover:bg-white/90 font-semibold"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Joining Early Access...
                </>
              ) : (
                'Join Early Access List'
              )}
            </Button>

            {/* Privacy Note */}
            <p className="text-xs text-white/70 text-center">
              We respect your privacy. Your information will only be used to contact you about ReturnPal AI. 
              We'll never share your data with third parties.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};
