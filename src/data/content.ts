import { Feature, Step, Testimonial, NavigationItem } from '../types';

export const navigationItems: NavigationItem[] = [
  { id: 'hero', label: 'Home', href: '#hero' },
  { id: 'features', label: 'Features', href: '#features' },
  { id: 'how-it-works', label: 'How It Works', href: '#how-it-works' },
  { id: 'testimonials', label: 'Reviews', href: '#testimonials' },
];

export const features: Feature[] = [
  {
    id: 'calendar-sync',
    icon: 'Calendar',
    title: 'Smart Calendar Sync',
    description: 'Automatically detect return windows from your receipts and add them to your calendar. Never miss a deadline again.',
    gradient: 'from-blue-500 to-teal-500'
  },
  {
    id: 'auto-reminders',
    icon: 'Bell',
    title: 'Smart Reminders',
    description: 'Get timely notifications before your return window expires. Customizable alerts that work with your schedule.',
    gradient: 'from-teal-500 to-purple-500'
  },
  {
    id: 'receipt-scan',
    icon: 'Scan',
    title: 'Receipt Scanning',
    description: 'Snap a photo of your receipt and we\'ll extract the key details. Simple scanning that saves you time.',
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    id: 'multi-retailer',
    icon: 'Store',
    title: 'Multi-Retailer Support',
    description: 'We\'re building a database of Australian retailer policies. Starting with major stores and expanding based on user needs.',
    gradient: 'from-pink-500 to-blue-500'
  },
  {
    id: 'analytics',
    icon: 'TrendingUp',
    title: 'Return Insights',
    description: 'Track your return history and see patterns in your shopping. Simple analytics to help you shop smarter.',
    gradient: 'from-blue-500 to-indigo-500'
  },
  {
    id: 'quick-action',
    icon: 'Zap',
    title: 'Quick Actions',
    description: 'Streamlined return process with helpful shortcuts. We\'re working to make returns as simple as possible.',
    gradient: 'from-indigo-500 to-teal-500'
  }
];

export const steps: Step[] = [
  {
    id: 'scan',
    number: 1,
    title: 'Scan Your Receipt',
    description: 'Take a photo of your receipt and we\'ll extract the important details like purchase date and return policy.',
    icon: 'Camera'
  },
  {
    id: 'track',
    number: 2,
    title: 'Track Return Windows',
    description: 'We calculate your return deadlines and add them to your calendar so you never miss an opportunity.',
    icon: 'Clock'
  },
  {
    id: 'remind',
    number: 3,
    title: 'Get Timely Reminders',
    description: 'Receive notifications before your return window closes. Set your preferred reminder timing.',
    icon: 'Bell'
  },
  {
    id: 'return',
    number: 4,
    title: 'Process Your Return',
    description: 'Get helpful guidance on return processes and keep track of your return status in one place.',
    icon: 'Package'
  }
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    rating: 5,
    text: 'Finally tried the beta and it\'s exactly what I needed! No more sticky notes on my fridge to remember return dates.',
    title: 'Early Beta User'
  },
  {
    id: '2',
    name: 'Michael Park',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    rating: 5,
    text: 'Love the simple interface. Scanned my Uniqlo receipt and it automatically knew the 30-day return policy. Impressed!',
    title: 'Sydney Uni Student'
  },
  {
    id: '3',
    name: 'Lisa Rodriguez',
    avatar: 'https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    rating: 5,
    text: 'Been using it for 2 weeks and already saved $180 on a jacket I forgot about. The reminders actually work!',
    title: 'Marketing Manager'
  },
  {
    id: '4',
    name: 'David Kim',
    avatar: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    rating: 5,
    text: 'Simple app that does exactly what it promises. The team is super responsive to feedback too. Excited to see what\'s next!',
    title: 'Beta Tester'
  }
];