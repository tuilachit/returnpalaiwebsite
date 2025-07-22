import React from 'react';
import { motion } from 'framer-motion';
import { Download, Mail, Phone, MapPin, Twitter, Instagram, Linkedin, Github } from 'lucide-react';
import { Button } from './ui/Button';

interface FooterProps {
  onDownloadClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onDownloadClick }) => {
  const footerSections = [
    {
      title: 'Product',
      links: [
        { label: 'Features', href: '#features' },
        { label: 'How It Works', href: '#how-it-works' },
        { label: 'Pricing', href: '/pricing' },
        { label: 'FAQ', href: '/faq' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Blog', href: '/blog' },
        { label: 'Careers', href: '/careers' },
        { label: 'Press', href: '/press' },
      ],
    },
    {
      title: 'Support',
      links: [
        { label: 'Help Center', href: '/help' },
        { label: 'Contact Us', href: '/contact' },
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
      ],
    },
  ];

  const socialLinks = [
    { icon: Twitter, href: 'https://twitter.com/returnpal', label: 'Twitter' },
    { icon: Instagram, href: 'https://instagram.com/returnpal', label: 'Instagram' },
    { icon: Linkedin, href: 'https://linkedin.com/company/returnpal', label: 'LinkedIn' },
    { icon: Github, href: 'https://github.com/returnpal', label: 'GitHub' },
  ];

  const contactInfo = [
    { icon: Mail, text: 'ai@returnpal.com.au', href: 'mailto:ai@returnpal.com.au' },
    { icon: Phone, text: '+61 2 9876 5432', href: 'tel:+61298765432' },
    { icon: MapPin, text: '123 George Street, Sydney NSW 2000', href: 'https://maps.google.com/?q=123+George+Street+Sydney+NSW+2000' },
  ];

  return (
    <footer className="bg-gradient-to-b from-dark-950 to-black text-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-128 h-128 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Main footer content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Left section - Brand and CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Logo and brand */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <motion.div 
                    className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <span className="text-white font-bold text-xl">AI</span>
                  </motion.div>
                  <div>
                    <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      ReturnPal AI
                    </span>
                    <div className="text-xs text-white/50">Beta • Made in Sydney</div>
                  </div>
                </div>
                <p className="text-lg text-gray-300 leading-relaxed max-w-md">
                  A simple app built by a small team in Sydney to help you never forget a return deadline again. 
                  Currently in beta with early users already saving money.
                </p>
              </div>

              {/* Download CTA */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Join Our Beta</h3>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    variant="secondary"
                    leftIcon={<Download className="w-5 h-5" />}
                    className="bg-glass-light border-white/20 text-white hover:bg-white/20 backdrop-blur-md"
                    onClick={onDownloadClick}
                  >
                    iOS Beta
                  </Button>
                  <Button
                    variant="secondary"
                    leftIcon={<Download className="w-5 h-5" />}
                    className="bg-glass-light border-white/20 text-white hover:bg-white/20 backdrop-blur-md"
                    onClick={onDownloadClick}
                  >
                    Android Beta
                  </Button>
                </div>
              </div>

              {/* Contact info */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Get in Touch</h3>
                <div className="space-y-3">
                  {contactInfo.map((item, index) => {
                    const IconComponent = item.icon;
                    const content = (
                      <div className="flex items-center gap-3 text-white/70 hover:text-white transition-colors">
                        <IconComponent className="w-5 h-5" />
                        <span>{item.text}</span>
                      </div>
                    );

                    return item.href ? (
                      <motion.a
                        key={index}
                        href={item.href}
                        className="block"
                        whileHover={{ x: 5 }}
                      >
                        {content}
                      </motion.a>
                    ) : (
                      <div key={index}>{content}</div>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Right section - Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-8"
            >
              {footerSections.map((section, index) => (
                <div key={section.title} className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">{section.title}</h3>
                  <ul className="space-y-3">
                    {section.links.map((link, linkIndex) => (
                      <motion.li
                        key={link.label}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ 
                          duration: 0.3, 
                          delay: index * 0.1 + linkIndex * 0.05 
                        }}
                        viewport={{ once: true }}
                      >
                        <a
                          href={link.href}
                          className="text-gray-300 hover:text-white transition-colors block"
                        >
                          {link.label}
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Bottom section */}
          <motion.div
            className="pt-8 border-t border-gray-800"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              {/* Copyright */}
              <div className="text-gray-400 text-center md:text-left">
                <p>&copy; 2024 ReturnPal AI. All rights reserved.</p>
                <p className="text-sm mt-1">
                  Made with ❤️ in Sydney • Currently serving Australia
                </p>
              </div>

              {/* Social links */}
              <div className="flex gap-4">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/20 transition-all backdrop-blur-sm"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <IconComponent className="w-5 h-5" />
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};