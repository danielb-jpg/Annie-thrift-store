import { Product, Category } from './types';

export const CATEGORIES: Category[] = [
  { id: 'vintage-totes', name: 'Vintage Totes', description: 'Timeless classics for everyday elegance.' },
  { id: 'designer-clutches', name: 'Designer Clutches', description: 'Statement pieces for your evening affairs.' },
  { id: 'luxury-crossbodies', name: 'Luxury Crossbodies', description: 'Hands-free luxury for the modern woman.' },
];

export const PRODUCTS: Product[] = [
  // Vintage Totes
  {
    id: 'tote-1',
    name: 'Classic Leather Shopper',
    price: 45000,
    category: 'vintage-totes',
    image: 'https://picsum.photos/seed/bag1/800/800',
    description: 'Spacious vintage leather tote with a beautiful patina.'
  },
  {
    id: 'tote-2',
    name: 'Canvas Heritage Tote',
    price: 32000,
    category: 'vintage-totes',
    image: 'https://picsum.photos/seed/bag2/800/800',
    description: 'Durable canvas with leather trim, perfect for weekend getaways.'
  },
  {
    id: 'tote-3',
    name: 'Woven Straw Market Bag',
    price: 28000,
    category: 'vintage-totes',
    image: 'https://picsum.photos/seed/bag3/800/800',
    description: 'Hand-woven straw tote with leather handles.'
  },

  // Designer Clutches
  {
    id: 'clutch-1',
    name: 'Midnight Silk Envelope',
    price: 55000,
    category: 'designer-clutches',
    image: 'https://picsum.photos/seed/bag4/800/800',
    description: 'Elegant silk clutch with a hidden chain strap.'
  },
  {
    id: 'clutch-2',
    name: 'Gold-Tone Box Clutch',
    price: 75000,
    category: 'designer-clutches',
    image: 'https://picsum.photos/seed/bag5/800/800',
    description: 'Vintage-inspired hard-shell clutch with metallic finish.'
  },
  {
    id: 'clutch-3',
    name: 'Beaded Art Deco Pouch',
    price: 68000,
    category: 'designer-clutches',
    image: 'https://picsum.photos/seed/bag6/800/800',
    description: 'Intricately beaded clutch with vintage charm.'
  },

  // Luxury Crossbodies
  {
    id: 'crossbody-1',
    name: 'Quilted Chain Camera Bag',
    price: 85000,
    category: 'luxury-crossbodies',
    image: 'https://picsum.photos/seed/bag7/800/800',
    description: 'Soft quilted leather with a classic chain strap.'
  },
  {
    id: 'crossbody-2',
    name: 'Minimalist Saddle Bag',
    price: 52000,
    category: 'luxury-crossbodies',
    image: 'https://picsum.photos/seed/bag8/800/800',
    description: 'Clean lines and premium leather for daily wear.'
  },
  {
    id: 'crossbody-3',
    name: 'Vintage Monogram Flap',
    price: 120000,
    category: 'luxury-crossbodies',
    image: 'https://picsum.photos/seed/bag9/800/800',
    description: 'Rare monogrammed piece in excellent condition.'
  },
];

