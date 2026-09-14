/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, ShoppingBag, ChevronRight, Menu, X, Star, Instagram } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from './constants';
import { Product } from './types';

interface CartItem extends Product {
  quantity: number;
}

const WHATSAPP_NUMBER = "2348000000000"; // Placeholder, but handle is @thriftby.anniee
const INSTAGRAM_HANDLE = "thriftby.anniee";
const WHATSAPP_COMMUNITY_LINK = "https://chat.whatsapp.com/example"; // Placeholder for community link

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

const getWhatsAppUrl = (items: CartItem[]) => {
  const baseUrl = `https://wa.me/${WHATSAPP_NUMBER}`;
  if (items.length === 0) {
    return `${baseUrl}?text=${encodeURIComponent("Hello Annie, I'm interested in your bag collection!")}`;
  }
  
  const itemsList = items.map(item => `${item.quantity}x ${item.name}`).join(", ");
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const message = `Hello Annie, I'd like to purchase: ${itemsList}. Total: ${formatPrice(total)}`;
  
  return `${baseUrl}?text=${encodeURIComponent(message)}`;
};

const ProductCard: React.FC<{ product: Product; onAddToCart: (product: Product) => void }> = ({ product, onAddToCart }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
      className="group relative glass rounded-2xl overflow-hidden snap-item w-[95%] max-w-[400px] mx-auto md:w-full md:max-w-none shadow-sm hover:shadow-md transition-all duration-500"
    >
      <div className="aspect-[4/5] overflow-hidden">
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
      </div>
      
      <div className="p-5 md:p-6 space-y-3 bg-white/40">
        <div className="flex justify-between items-start gap-2">
          <h3 className="text-xl md:text-lg font-playfair font-bold leading-tight group-hover:text-accent transition-colors duration-300">
            {product.name}
          </h3>
          <Star className="w-4 h-4 text-accent fill-accent shrink-0" />
        </div>
        
        <p className="text-xs text-charcoal/60 line-clamp-2 font-light">
          {product.description}
        </p>
        
        <div className="pt-4 flex items-center justify-between gap-2">
          <motion.span 
            className="text-xl md:text-lg text-charcoal font-bold tracking-wider"
          >
            {formatPrice(product.price)}
          </motion.span>
          <button 
            onClick={() => onAddToCart(product)}
            className="p-2 rounded-full bg-accent/10 border border-accent/20 text-accent hover:bg-accent hover:text-white transition-all duration-300"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const CartSidebar: React.FC<{ 
  isOpen: boolean; 
  onClose: () => void; 
  items: CartItem[]; 
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}> = ({ isOpen, onClose, items, onUpdateQuantity, onRemove }) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-charcoal/40 backdrop-blur-sm z-[2000]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-off-white border-l border-accent/10 z-[2001] flex flex-col shadow-2xl"
          >
            <div className="p-6 border-b border-accent/10 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <ShoppingBag className="text-accent w-5 h-5" />
                <h2 className="font-playfair font-bold text-xl italic text-accent">Your Selection</h2>
              </div>
              <button onClick={onClose} className="p-2 text-accent hover:bg-accent/10 rounded-full transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
                  <ShoppingBag className="w-12 h-12 text-accent" />
                  <p className="font-light tracking-widest uppercase text-sm">Your cart is empty</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 border border-accent/10">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-playfair font-bold text-charcoal group-hover:text-accent transition-colors">{item.name}</h4>
                        <button onClick={() => onRemove(item.id)} className="text-charcoal/30 hover:text-red-400 transition-colors">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-accent font-medium text-sm">{formatPrice(item.price)}</p>
                      <div className="flex items-center gap-3 pt-2">
                        <button 
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="w-6 h-6 rounded-full border border-accent/20 flex items-center justify-center text-accent hover:bg-accent/10"
                        >
                          -
                        </button>
                        <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="w-6 h-6 rounded-full border border-accent/20 flex items-center justify-center text-accent hover:bg-accent/10"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-accent/10 bg-white/40 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="uppercase tracking-[0.2em] text-xs font-light text-charcoal/50">Subtotal</span>
                  <span className="text-xl font-bold text-charcoal">{formatPrice(total)}</span>
                </div>
                <div className="flex flex-col gap-3">
                  <a 
                    href={getWhatsAppUrl(items)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-accent text-white py-4 rounded-full font-bold uppercase tracking-widest hover:bg-charcoal transition-all duration-300 shadow-md text-center"
                  >
                    Checkout on WhatsApp
                  </a>
                </div>
                <p className="text-[10px] text-center text-charcoal/30 uppercase tracking-widest">
                  Authentication guaranteed on all luxury pieces
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const filteredProducts = activeCategory === 'all' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-beige selection:bg-accent selection:text-white">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-[1000] transition-all duration-500 ${scrolled ? 'bg-off-white/80 backdrop-blur-md py-4 border-b border-accent/10' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <span className="font-playfair font-bold text-2xl tracking-tight text-charcoal">Thrift by Annie</span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-accent font-medium">Luxury Archive</span>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 text-[10px] uppercase tracking-[0.2em] font-medium text-charcoal/70">
            {CATEGORIES.map((cat) => (
              <a key={cat.id} href={`#${cat.id}`} className="hover:text-accent transition-colors duration-300">
                {cat.name}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-charcoal md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 bg-charcoal text-white px-4 md:px-6 py-2 rounded-full font-medium hover:bg-accent transition-colors duration-300"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden md:inline text-xs uppercase tracking-widest">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-lg">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-off-white pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-8 text-2xl font-playfair italic">
              {CATEGORIES.map((cat) => (
                <a key={cat.id} href={`#${cat.id}`} onClick={() => setIsMenuOpen(false)} className="text-charcoal border-b border-accent/10 pb-4">
                  {cat.name}
                </a>
              ))}
              <a href={`https://instagram.com/${INSTAGRAM_HANDLE}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-accent text-lg">
                <Instagram className="w-5 h-5" /> @{INSTAGRAM_HANDLE}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col justify-center items-center text-center px-6 pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/luxury-bag/1920/1080?grayscale" 
            alt="Luxury Bag Background" 
            className="w-full h-full object-cover opacity-20"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-beige via-transparent to-beige" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 max-w-4xl"
        >
          <span className="text-accent uppercase tracking-[0.5em] text-xs font-bold mb-6 block">Curated Luxury Archive</span>
          <h1 className="text-5xl md:text-8xl font-playfair font-bold text-charcoal leading-tight mb-8">
            Timeless Style, <br />
            <span className="italic font-normal text-accent">Rediscovered.</span>
          </h1>
          <p className="text-lg md:text-xl font-light text-charcoal/70 max-w-2xl mx-auto mb-12 leading-relaxed">
            A curated collection of pre-loved designer bags, each with a story to tell and a future in your wardrobe.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => document.getElementById('vintage-totes')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-charcoal text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-accent transition-all duration-500 shadow-xl"
            >
              Shop Collection
            </button>
            <a 
              href={WHATSAPP_COMMUNITY_LINK}
              target="_blank"
              rel="noreferrer"
              className="border border-accent text-accent px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-accent hover:text-white transition-all duration-500"
            >
              Join Community
            </a>
          </div>
        </motion.div>
      </section>

      {/* Catalog Sections */}
      <div className="max-w-7xl mx-auto px-6 py-20 space-y-32">
        {CATEGORIES.map((cat, idx) => (
          <section key={cat.id} id={cat.id} className="scroll-mt-32">
            <div className={`flex flex-col md:flex-row items-center gap-12 mb-16 ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
              <div className="flex-1 space-y-6 text-center md:text-left">
                <span className="text-accent uppercase tracking-[0.3em] text-[10px] font-bold">Category {idx + 1}</span>
                <h2 className="text-4xl md:text-6xl font-playfair italic text-charcoal">{cat.name}</h2>
                <p className="text-charcoal/60 font-light max-w-md mx-auto md:mx-0">{cat.description}</p>
              </div>
              <div className="flex-[2] w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {PRODUCTS.filter(p => p.category === cat.id).map(product => (
                    <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
                  ))}
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* About / Instagram Section */}
      <section className="py-32 px-6 bg-off-white">
        <div className="max-w-7xl mx-auto text-center space-y-12">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-4xl md:text-5xl font-playfair italic text-charcoal">Follow the Journey</h2>
            <p className="text-charcoal/60 font-light">
              Get first dibs on new arrivals and see how we style our favorite pieces on Instagram.
            </p>
            <a 
              href={`https://instagram.com/${INSTAGRAM_HANDLE}`} 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-3 text-accent font-bold uppercase tracking-widest border-b-2 border-accent pb-2 hover:text-charcoal hover:border-charcoal transition-all"
            >
              <Instagram className="w-5 h-5" /> @{INSTAGRAM_HANDLE}
            </a>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="aspect-square overflow-hidden rounded-2xl">
                <img 
                  src={`https://picsum.photos/seed/insta${i}/600/600`} 
                  alt="Instagram Preview" 
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-accent/10 bg-beige">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="flex flex-col">
              <span className="font-playfair font-bold text-xl text-charcoal">Thrift by Annie</span>
              <span className="text-[8px] uppercase tracking-[0.3em] text-accent font-medium">Luxury Archive</span>
            </div>
            <p className="text-xs text-charcoal/50 font-light leading-relaxed">
              Curating the finest pre-owned luxury bags for the discerning collector. Authenticity and style, rediscovered.
            </p>
          </div>
          
          <div>
            <h4 className="text-charcoal uppercase tracking-widest text-[10px] font-bold mb-6">Archive</h4>
            <ul className="space-y-4 text-xs text-charcoal/70 font-light">
              {CATEGORIES.map(cat => (
                <li key={cat.id}><a href={`#${cat.id}`} className="hover:text-accent transition-colors">{cat.name}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-charcoal uppercase tracking-widest text-[10px] font-bold mb-6">Services</h4>
            <ul className="space-y-4 text-xs text-charcoal/70 font-light">
              <li><a href="#" className="hover:text-accent transition-colors">Authentication</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Consignment</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Shipping Info</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-charcoal uppercase tracking-widest text-[10px] font-bold mb-6">Newsletter</h4>
            <p className="text-[10px] text-charcoal/50 mb-4 font-light">Join the archive for early access to drops.</p>
            <div className="flex">
              <input type="email" placeholder="Email address" className="bg-white/50 border border-accent/20 rounded-l-full px-4 py-2 text-xs w-full focus:outline-none focus:border-accent transition-colors" />
              <button className="bg-charcoal text-white px-4 py-2 rounded-r-full text-[10px] font-bold uppercase">Join</button>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-accent/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[8px] uppercase tracking-[0.2em] text-charcoal/30">
          <p>© 2026 Thrift by Annie. All Rights Reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-accent transition-colors">Privacy</a>
            <a href="#" className="hover:text-accent transition-colors">Terms</a>
          </div>
        </div>
      </footer>

      {/* Sticky WhatsApp */}
      <motion.a
        href={getWhatsAppUrl(cart)}
        target="_blank"
        rel="noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        className="fixed bottom-8 right-8 z-50 bg-accent text-white p-4 rounded-full shadow-2xl flex items-center gap-3 group"
      >
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap font-bold text-[10px] uppercase tracking-widest">
          Chat with Annie
        </span>
        <MessageCircle className="w-6 h-6" />
      </motion.a>

      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
      />
    </div>
  );
}

