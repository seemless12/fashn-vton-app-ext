// Chrome Web Store URL — update when the extension is published
export const CHROME_STORE_URL = import.meta.env.VITE_CHROME_STORE_URL || '/extension';

// API Base URL — use env var for production, fallback for dev
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

// Brand
export const BRAND = {
  name: 'Shopping Buddy',
  tagline: 'Try it before you buy it.',
  description: 'See how your favorite clothes look on you before placing the order — directly while you shop.',
};

// Navigation links
export const NAV_LINKS = [
  { name: 'How It Works', path: '/#how-it-works' },
  { name: 'Extension', path: '/extension' },
];

// Example product for mockups
export const DEMO_PRODUCT = {
  name: 'Ribbed Knit Sweater',
  brand: 'Outfitters',
  price: 'PKR 4,990',
  image: '/demo-product.png',
  tryonImage: '/demo-tryon.png',
  siteUrl: 'outfitters.com.pk',
};
