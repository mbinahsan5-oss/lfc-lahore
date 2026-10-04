/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { MenuSection } from './components/MenuSection';
import { DealsSection } from './components/DealsSection';
import { LocationsSection } from './components/LocationsSection';
import { WhyLFCSection } from './components/WhyLFCSection';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { AdminModal } from './components/AdminModal';
import {
  Category,
  MenuItem,
  HeroSlide,
  BranchLocation,
  PromoCode,
  CartItem,
  StoreSettings
} from './types';
import {
  DEFAULT_CATEGORIES,
  DEFAULT_HERO_SLIDES,
  DEFAULT_MENU_ITEMS,
  DEFAULT_LOCATIONS,
  DEFAULT_PROMOS,
  DEFAULT_SETTINGS
} from './data/initialData';
import { ShoppingBag, Home, Utensils, MapPin, Phone } from 'lucide-react';

export default function App() {
  // LocalStorage-backed state with initial defaults
  const [categories, setCategories] = useState<Category[]>(() => {
    try {
      const saved = localStorage.getItem('lfc_categories');
      return saved ? JSON.parse(saved) : DEFAULT_CATEGORIES;
    } catch {
      return DEFAULT_CATEGORIES;
    }
  });

  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    try {
      const saved = localStorage.getItem('lfc_menu_items');
      return saved ? JSON.parse(saved) : DEFAULT_MENU_ITEMS;
    } catch {
      return DEFAULT_MENU_ITEMS;
    }
  });

  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(() => {
    try {
      const saved = localStorage.getItem('lfc_hero_slides');
      return saved ? JSON.parse(saved) : DEFAULT_HERO_SLIDES;
    } catch {
      return DEFAULT_HERO_SLIDES;
    }
  });

  const [locations, setLocations] = useState<BranchLocation[]>(() => {
    try {
      const saved = localStorage.getItem('lfc_locations');
      return saved ? JSON.parse(saved) : DEFAULT_LOCATIONS;
    } catch {
      return DEFAULT_LOCATIONS;
    }
  });

  const [promos, setPromos] = useState<PromoCode[]>(() => {
    try {
      const saved = localStorage.getItem('lfc_promos');
      return saved ? JSON.parse(saved) : DEFAULT_PROMOS;
    } catch {
      return DEFAULT_PROMOS;
    }
  });

  const [settings, setSettings] = useState<StoreSettings>(() => {
    try {
      const saved = localStorage.getItem('lfc_settings');
      return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('lfc_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modal states
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Sync to LocalStorage on updates
  useEffect(() => {
    localStorage.setItem('lfc_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('lfc_menu_items', JSON.stringify(menuItems));
  }, [menuItems]);

  useEffect(() => {
    localStorage.setItem('lfc_hero_slides', JSON.stringify(heroSlides));
  }, [heroSlides]);

  useEffect(() => {
    localStorage.setItem('lfc_locations', JSON.stringify(locations));
  }, [locations]);

  useEffect(() => {
    localStorage.setItem('lfc_promos', JSON.stringify(promos));
  }, [promos]);

  useEffect(() => {
    localStorage.setItem('lfc_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('lfc_cart', JSON.stringify(cart));
  }, [cart]);

  // Support AdminLFC1 URL trigger (hash #AdminLFC1, pathname /AdminLFC1, query param ?AdminLFC1)
  useEffect(() => {
    const checkAdminUrl = () => {
      const hash = window.location.hash;
      const pathname = window.location.pathname;
      const search = window.location.search;

      if (
        hash === '#AdminLFC1' ||
        hash.includes('AdminLFC1') ||
        pathname.includes('AdminLFC1') ||
        search.includes('AdminLFC1')
      ) {
        setIsAdminOpen(true);
      }
    };

    checkAdminUrl();
    window.addEventListener('hashchange', checkAdminUrl);
    window.addEventListener('popstate', checkAdminUrl);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setIsAdminOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('hashchange', checkAdminUrl);
      window.removeEventListener('popstate', checkAdminUrl);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Cart operations
  const handleAddToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { ...item, qty: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQty = (id: number, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.qty + delta;
            return newQty > 0 ? { ...item, qty: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Factory Defaults Reset
  const handleResetDefaults = () => {
    setCategories(DEFAULT_CATEGORIES);
    setMenuItems(DEFAULT_MENU_ITEMS);
    setHeroSlides(DEFAULT_HERO_SLIDES);
    setLocations(DEFAULT_LOCATIONS);
    setPromos(DEFAULT_PROMOS);
    setSettings(DEFAULT_SETTINGS);
    setCart([]);
    localStorage.clear();
  };

  // Cart count lookup map for cards
  const cartCountsMap = cart.reduce((map, item) => {
    map[item.id] = item.qty;
    return map;
  }, {} as { [id: number]: number });

  const totalCartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="min-h-screen bg-[#0A0A0D] text-gray-100 flex flex-col selection:bg-amber-500 selection:text-black pb-16 md:pb-0">
      
      {/* HEADER WITH TOP BAR & STICKY ANNOUNCEMENT */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onSecretAdmin={() => setIsAdminOpen(true)}
        settings={settings}
      />

      {/* MAIN CONTENT LANDING */}
      <main className="flex-1">
        {/* HERO SECTION WITH THE 4 PICTURES */}
        <HeroSection slides={heroSlides} logoUrl={settings.logoUrl} />

        {/* MENU SECTION WITH FILTER & CART STEPPERS */}
        <MenuSection
          items={menuItems}
          categories={categories}
          cartItems={cartCountsMap}
          onAddToCart={handleAddToCart}
          onUpdateQty={handleUpdateQty}
        />

        {/* FAMILY BUNDLES & VALUE COMBOS */}
        <DealsSection items={menuItems} onAddToCart={handleAddToCart} />

        {/* LAHORE OUTLET BRANCHES LOCATOR */}
        <LocationsSection locations={locations} />

        {/* WHY CHOOSE LFC (AUTHENTIC RECIPE & 30-MIN EXPRESS) */}
        <WhyLFCSection />

        {/* VERIFIED CUSTOMER REVIEWS */}
        <ReviewsSection />
      </main>

      {/* STORE FOOTER WITH TRIVOX SOLUTIONS DEVELOPER CREDIT */}
      <Footer settings={settings} />

      {/* SLIDE-OUT CART & CHECKOUT DRAWER */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        promos={promos}
        settings={settings}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      {/* COMPREHENSIVE MASTER ADMIN CONTROL SUITE */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => {
          setIsAdminOpen(false);
          if (window.location.hash === '#AdminLFC1') {
            history.replaceState(null, '', ' ');
          }
        }}
        categories={categories}
        menuItems={menuItems}
        heroSlides={heroSlides}
        locations={locations}
        promos={promos}
        settings={settings}
        onUpdateCategories={setCategories}
        onUpdateMenuItems={setMenuItems}
        onUpdateHeroSlides={setHeroSlides}
        onUpdateLocations={setLocations}
        onUpdatePromos={setPromos}
        onUpdateSettings={setSettings}
        onResetDefaults={handleResetDefaults}
      />

      {/* MOBILE STICKY BOTTOM NAVIGATION BAR */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0E0F16]/95 backdrop-blur-xl border-t border-white/10 px-4 py-2.5 flex items-center justify-around shadow-2xl">
        <a
          href="#hero"
          className="flex flex-col items-center gap-1 text-gray-400 hover:text-amber-400 text-center"
        >
          <Home className="w-4 h-4" />
          <span className="text-[10px] font-medium">Home</span>
        </a>

        <a
          href="#menu"
          className="flex flex-col items-center gap-1 text-gray-400 hover:text-amber-400 text-center"
        >
          <Utensils className="w-4 h-4" />
          <span className="text-[10px] font-medium">Menu</span>
        </a>

        {/* Center Cart Button */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center gap-1 text-amber-400 relative"
          aria-label="Open Cart"
        >
          <div className="relative">
            <div className="w-9 h-9 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-black flex items-center justify-center shadow-lg shadow-amber-500/20 active:scale-95 transition-transform">
              <ShoppingBag className="w-4 h-4" />
            </div>
            {totalCartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[9px] font-black min-w-[16px] h-[16px] rounded-full flex items-center justify-center px-0.5 border border-black">
                {totalCartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold text-amber-400">Cart</span>
        </button>

        <a
          href="#locations"
          className="flex flex-col items-center gap-1 text-gray-400 hover:text-amber-400 text-center"
        >
          <MapPin className="w-4 h-4" />
          <span className="text-[10px] font-medium">Outlets</span>
        </a>

        <a
          href={`https://wa.me/${settings.whatsappNumber}`}
          target="_blank"
          rel="noreferrer"
          className="flex flex-col items-center gap-1 text-emerald-400 text-center"
        >
          <Phone className="w-4 h-4" />
          <span className="text-[10px] font-medium">Order</span>
        </a>
      </div>

    </div>
  );
}
