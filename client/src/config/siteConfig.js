/**
 * vbrion Portfolio - Central Configuration File
 * All contact info, branding, address, social links and feature flags are managed here.
 */

export const siteConfig = {
  company: {
    name: 'vbrion',
    wordmark: 'vbrion analytics',
    tagline: 'Engineering What\'s Next',
    shortDescription: 'Combining expert consulting with digital product engineering, data analytics, and AI intelligence to anticipate what is next and engineer sustainable advantage.',
    foundedYear: 2024,
  },

  contact: {
    phone: '+91 7718079297',
    phoneRaw: '+917718079297',
    email: 'info@vbrion.com',
    whatsappUrl: 'https://wa.me/917718079297?text=Hello%20vbrion%20team%2C%20I%20would%20like%20to%20discuss%20a%20project.',
    // Registered Office Details
    address: {
      line1: 'No. 301/180, Vinayagar Kovil Street',
      line2: '10-A, Nadar Medu',
      city: 'Erode',
      state: 'Tamil Nadu',
      pincode: '638002',
      country: 'India',
      fullFormatted: 'No. 301/180, Vinayagar Kovil Street, 10-A, Nadar Medu, Erode – 638002, Tamil Nadu, India'
    },
    googleMapsEmbedUrl: 'https://maps.google.com/maps?q=Nadar+Medu,+Erode,+Tamil+Nadu+638002&t=&z=15&ie=UTF8&iwloc=&output=embed'
  },

  socials: {
    linkedin: 'https://linkedin.com/company/vbrion',
    twitter: 'https://twitter.com/vbrion_ai',
    github: 'https://github.com/vbrion',
    instagram: 'https://instagram.com/vbrion.analytics',
  },

  featureFlags: {
    enableAiAssistant: true,
    enableCustomCursor: true,
    enableParticleHero: true,
  },

  impactMetrics: [
    { id: 1, label: 'Analytics & AI Models Deployed', value: 120, suffix: '+', note: 'Production ML Pipelines' },
    { id: 2, label: 'Compliance & Governance Accuracy', value: 99.8, suffix: '%', decimals: 1, note: 'Audit Pass Rate' },
    { id: 3, label: 'Average Client Efficiency Gain', value: 38, suffix: '%', note: 'Resource Optimization' },
    { id: 4, label: 'Enterprise Domains Served', value: 8, suffix: '+', note: 'Regulated Sectors' },
  ],

  navigation: [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Work', href: '#portfolio' },
    { label: 'Capabilities', href: '#capabilities' },
    { label: 'Industries', href: '#industries' },
    { label: 'Process', href: '#process' },
    { label: 'Impact', href: '#impact' },
    { label: 'Contact', href: '#contact' },
  ]
};

export default siteConfig;
