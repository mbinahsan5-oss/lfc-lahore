import React, { useState, useMemo } from 'react';
import { Search, Plus, Minus, Sparkles, Filter, Check, Eye, X, ShoppingBag, Star } from 'lucide-react';
import { MenuItem, Category } from '../types';

interface MenuSectionProps {
  items: MenuItem[];
  categories: Category[];
  cartItems: { [id: number]: number };
  onAddToCart: (item: MenuItem) => void;
  onUpdateQty: (id: number, delta: number) => void;
}

interface SparkleParticle {
  id: number;
  itemId: number;
  tx: number;
  rot: number;
  emoji: string;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  items,
  categories,
  cartItems,
  onAddToCart,
  onUpdateQty
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  // Sparkle & Crunch Particle System (No chilli icons)
  const [particles, setParticles] = useState<SparkleParticle[]>([]);
  const [recentAddedId, setRecentAddedId] = useState<number | null>(null);

  // Quick View Modal Item
  const [quickViewItem, setQuickViewItem] = useState<MenuItem | null>(null);

  // Trigger Golden Crunch Particle Burst
  const triggerCrunchPop = (itemId: number) => {
    const emojis = ['✨', '⭐', '🫧', '🍗', '🔥', '✨'];
    const newParticles: SparkleParticle[] = Array.from({ length: 6 }).map((_, i) => ({
      id: Date.now() + i + Math.random(),
      itemId,
      tx: (Math.random() - 0.5) * 70, // Spread -35px to +35px
      rot: (Math.random() - 0.5) * 60,
      emoji: emojis[Math.floor(Math.random() * emojis.length)]
    }));

    setParticles((prev) => [...prev, ...newParticles]);
    setRecentAddedId(itemId);

    setTimeout(() => {
      setRecentAddedId(null);
    }, 900);

    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !newParticles.some((np) => np.id === p.id)));
    }, 1000);
  };

  const handleAddWithEffect = (item: MenuItem) => {
    triggerCrunchPop(item.id);
    onAddToCart(item);
  };

  const handleIncrementWithEffect = (id: number) => {
    triggerCrunchPop(id);
    onUpdateQty(id, 1);
  };

  // Filter & sort items
  const filteredItems = useMemo(() => {
    return items
      .filter((item) => {
        const matchesCategory =
          selectedCategory === 'All' ||
          item.cat.toLowerCase() === selectedCategory.toLowerCase();

        const query = searchQuery.trim().toLowerCase();
        const matchesSearch =
          !query ||
          item.name.toLowerCase().includes(query) ||
          item.desc.toLowerCase().includes(query) ||
          item.cat.toLowerCase().includes(query);

        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        return 0; // featured default
      });
  }, [items, selectedCategory, searchQuery, sortBy]);

  // Compute count of items per category
  const categoryCounts = useMemo(() => {
    const counts: { [key: string]: number } = { All: items.length };
    items.forEach((item) => {
      counts[item.cat] = (counts[item.cat] || 0) + 1;
    });
    return counts;
  }, [items]);

  return (
    <section id="menu" className="py-12 sm:py-24 bg-[#08090E] border-t border-white/5 relative overflow-hidden">
      
      {/* AMBIENT GLOW ORBS IN BACKGROUND */}
      <div className="absolute top-10 left-10 w-80 h-80 rounded-full bg-amber-500/10 blur-[130px] animate-bubble-float pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-orange-600/10 blur-[140px] animate-bubble-float-delay pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-amber-400/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Bubble Badge */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-6 sm:mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest mb-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-500/15 to-orange-500/15 border border-amber-400/30 shadow-sm backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>Sizzling Hot & Fresh</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
            </div>
            
            <h2 className="font-display font-black text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
              CRISPY FOOD <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300">MENU</span>
            </h2>
            
            <p className="text-gray-400 text-xs sm:text-sm mt-1 max-w-xl leading-relaxed">
              Crafted fresh on every order. Lahore's crunchiest Zinger burgers, wraps, loaded cheese pizzas & family buckets.
            </p>
          </div>

          {/* Search & Sort Controls (Bubble Glass style) */}
          <div className="flex flex-row items-center gap-2.5 sm:gap-3">
            {/* Search Input Bubble */}
            <div className="relative flex-1 sm:w-64">
              <Search className="w-3.5 h-3.5 text-amber-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search crispy food..."
                className="w-full bg-[#12131D]/90 backdrop-blur-md border border-white/10 rounded-2xl pl-9 pr-7 py-2 sm:py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-xs w-4 h-4 rounded-full bg-white/10 flex items-center justify-center"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Sort Dropdown Bubble */}
            <div className="flex items-center gap-1.5 bg-[#12131D]/90 backdrop-blur-md border border-white/10 rounded-2xl px-3 py-2 sm:py-2.5 shrink-0 shadow-inner">
              <Filter className="w-3.5 h-3.5 text-amber-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-[11px] sm:text-xs text-gray-300 focus:outline-none cursor-pointer font-medium"
              >
                <option value="featured" className="bg-[#161720] text-white">Featured</option>
                <option value="price-asc" className="bg-[#161720] text-white">Price: Low-High</option>
                <option value="price-desc" className="bg-[#161720] text-white">Price: High-Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* BUBBLE CATEGORY PILL TABS */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2 mb-6 sm:mb-10 -mx-3 px-3 sm:mx-0 sm:px-0">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 shadow-sm ${
              selectedCategory === 'All'
                ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-black shadow-lg shadow-amber-500/30 scale-105 font-black'
                : 'bg-[#141522]/90 text-gray-300 hover:bg-[#1C1E2E] hover:text-white border border-white/10'
            }`}
          >
            <span>All Dishes</span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${
              selectedCategory === 'All' ? 'bg-black/20 text-black' : 'bg-white/10 text-gray-400'
            }`}>
              {items.length}
            </span>
          </button>

          {categories
            .filter((c) => c.name !== 'All')
            .map((cat) => {
              const count = categoryCounts[cat.name] || 0;
              const isActive = selectedCategory === cat.name;

              return (
                <button
                  key={cat.id || cat.name}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 shadow-sm ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-black shadow-lg shadow-amber-500/30 scale-105 font-black'
                      : 'bg-[#141522]/90 text-gray-300 hover:bg-[#1C1E2E] hover:text-white border border-white/10'
                  }`}
                >
                  <span>{cat.name}</span>
                  {count > 0 && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${
                      isActive ? 'bg-black/20 text-black' : 'bg-white/10 text-gray-400'
                    }`}>
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
        </div>

        {/* FOOD ITEMS GRID: 2 ITEMS PER LINE ON MOBILE (grid-cols-2) WITH CLEAN NO-CHILLI DESIGN */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-[#13141F]/60 rounded-3xl border border-white/10 space-y-4 max-w-md mx-auto">
            <div className="w-14 h-14 mx-auto rounded-full bg-white/5 flex items-center justify-center text-gray-400 text-2xl">
              🍗
            </div>
            <p className="text-gray-300 text-sm font-medium">No dishes found matching your search.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="text-xs bg-amber-500/20 text-amber-400 border border-amber-500/30 px-4 py-2 rounded-xl font-bold hover:bg-amber-500/30 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
            {filteredItems.map((item) => {
              const qtyInCart = cartItems[item.id] || 0;
              const isRecentAdded = recentAddedId === item.id;
              const itemParticles = particles.filter((p) => p.itemId === item.id);

              return (
                <div key={item.id} className="relative group">
                  {/* Minor backlight glow from back in gold & orange */}
                  <div className="absolute -inset-0.5 bg-gradient-to-br from-amber-500/25 via-orange-500/20 to-amber-400/10 rounded-[28px] sm:rounded-[34px] blur-md opacity-40 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none -z-10" />

                  <div
                    className="bg-gradient-to-b from-[#161726]/95 via-[#12131F]/95 to-[#0D0E16]/95 rounded-[26px] sm:rounded-[32px] p-2.5 sm:p-4 flex flex-col justify-between border border-amber-400/20 hover:border-amber-400/60 hover:shadow-[0_16px_40px_-12px_rgba(245,158,11,0.3)] transition-all duration-300 h-full backdrop-blur-md overflow-hidden"
                  >
                    {/* Subtle inner bubble shine gradient */}
                    <div className="absolute top-0 right-0 w-36 h-36 bg-amber-400/[0.05] rounded-full blur-2xl pointer-events-none" />

                    {/* Floating Golden Sparks Explosion on Add (NO CHILLI) */}
                    {itemParticles.map((p) => (
                      <span
                        key={p.id}
                        className="absolute bottom-12 right-6 text-xl sm:text-2xl animate-chilli-pop z-30 select-none pointer-events-none drop-shadow-md"
                        style={
                          {
                            '--tx': `${p.tx}px`,
                            '--rot': `${p.rot}deg`
                          } as React.CSSProperties
                        }
                      >
                        {p.emoji}
                      </span>
                    ))}

                    <div>
                      {/* ORGANIC FOOD PEDESTAL BUBBLE PLATE */}
                      <div 
                        onClick={() => setQuickViewItem(item)}
                        className="relative aspect-[4/3] rounded-[20px] sm:rounded-[24px] overflow-hidden bg-gradient-to-b from-white/[0.05] via-black/40 to-black/70 mb-2.5 sm:mb-3.5 flex items-center justify-center border border-white/[0.08] group-hover:border-amber-400/40 transition-all cursor-pointer shadow-inner"
                      >
                        {/* Ambient soft glow ring behind food */}
                        <div className="absolute inset-0 bg-radial from-amber-500/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                        <img
                          src={item.image}
                          alt={item.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-contain p-2 sm:p-3 group-hover:scale-110 transition-transform duration-300 filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)]"
                          onError={(e) => {
                            const target = e.currentTarget;
                            if (!target.dataset.triedFallback) {
                              target.dataset.triedFallback = 'true';
                              target.src = '/src/assets/images/lfc_hero_feast_1790963438847.jpg';
                            }
                          }}
                        />

                        {/* Floating Bubble Badge Tag (e.g. Bestseller, Special) */}
                        {item.badge && (
                          <div className="absolute top-2 right-2 bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-black text-[9px] sm:text-[10px] font-black px-2 py-0.5 sm:px-2.5 sm:py-0.5 rounded-full shadow-lg shadow-amber-500/25 border border-white/30 backdrop-blur-md">
                            {item.badge}
                          </div>
                        )}

                        {/* Quick View Eye Bubble (appears on hover) */}
                        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 hover:bg-amber-400 hover:text-black text-white p-1.5 rounded-full backdrop-blur-md border border-white/10 hidden sm:flex items-center justify-center shadow-md">
                          <Eye className="w-3.5 h-3.5" />
                        </div>

                        {/* Sold Out Bubble Scrim */}
                        {!item.inStock && (
                          <div className="absolute inset-0 bg-black/85 backdrop-blur-[2px] flex items-center justify-center">
                            <span className="bg-red-600/90 text-white text-[10px] sm:text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                              Sold Out
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Category Capsule */}
                      <div className="text-[10px] sm:text-xs text-amber-400/90 uppercase tracking-wider font-bold mb-1 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        <span>{item.cat}</span>
                      </div>

                      {/* Title */}
                      <h3 
                        onClick={() => setQuickViewItem(item)}
                        className="font-display font-black text-xs sm:text-base text-white group-hover:text-amber-400 transition-colors line-clamp-1 leading-snug cursor-pointer"
                      >
                        {item.name}
                      </h3>

                      {/* Description */}
                      <p className="text-[10px] sm:text-xs text-gray-400 mt-1 line-clamp-2 leading-relaxed font-normal">
                        {item.desc}
                      </p>
                    </div>

                    {/* Card Footer: Bubble Price Tag & Tactile Add/Stepper Button */}
                    <div className="flex items-center justify-between mt-3 pt-2.5 sm:pt-3 border-t border-white/5">
                      {/* Price Bubble Tag */}
                      <div className="bg-amber-400/10 border border-amber-400/25 px-2 py-1 rounded-xl">
                        <div className="flex items-baseline gap-0.5">
                          <span className="text-[9px] sm:text-[10px] text-amber-400 font-bold uppercase">Rs.</span>
                          <span className="font-display font-black text-amber-400 text-xs sm:text-base tabular-nums">
                            {item.price.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      {!item.inStock ? (
                        <span className="text-[10px] sm:text-xs text-gray-500 italic font-medium">Out</span>
                      ) : qtyInCart > 0 ? (
                        /* Tactile Bubbly Stepper */
                        <div className="flex items-center gap-1 bg-[#1A1C28] border border-amber-400/50 rounded-2xl p-0.5 sm:p-1 shadow-md shadow-amber-500/10">
                          <button
                            onClick={() => onUpdateQty(item.id, -1)}
                            className="w-6 h-6 sm:w-7 sm:h-7 rounded-xl bg-black/50 hover:bg-black/80 active:scale-90 flex items-center justify-center text-white transition-all text-xs"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          </button>
                          
                          <span className="font-display font-black text-xs sm:text-sm text-amber-400 min-w-[16px] sm:min-w-[20px] text-center tabular-nums">
                            {qtyInCart}
                          </span>
                          
                          <button
                            onClick={() => handleIncrementWithEffect(item.id)}
                            className="w-6 h-6 sm:w-7 sm:h-7 rounded-xl bg-gradient-to-br from-amber-400 to-orange-400 hover:from-amber-300 hover:to-orange-300 text-black font-black flex items-center justify-center active:scale-110 transition-transform text-xs shadow-sm"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          </button>
                        </div>
                      ) : (
                        /* Tactile Bubbly Add Button with Golden Crunch Burst (NO CHILLI) */
                        <button
                          onClick={() => handleAddWithEffect(item)}
                          className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-2xl text-xs font-black transition-all shadow-lg active:scale-90 flex items-center gap-1 sm:gap-1.5 select-none ${
                            isRecentAdded
                              ? 'bg-emerald-500 text-black scale-105 shadow-emerald-500/30'
                              : 'bg-gradient-to-r from-red-600 via-orange-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white shadow-red-500/25 hover:shadow-amber-500/30'
                          }`}
                          title="Add to basket"
                        >
                          {isRecentAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span className="text-[10px] sm:text-xs">Added! ✨</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5" />
                              <span className="text-[11px] sm:text-xs uppercase tracking-wide">Add</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* QUICK VIEW BUBBLE MODAL (NO CHILLI) */}
      {quickViewItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-gradient-to-b from-[#181928] via-[#141522] to-[#0E0F17] border border-white/15 rounded-[32px] p-6 max-w-lg w-full relative shadow-2xl overflow-hidden">
            {/* Top Close Button Bubble */}
            <button
              onClick={() => setQuickViewItem(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center text-gray-300 hover:text-white transition-all z-10"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Image Showcase */}
            <div className="relative aspect-[16/10] rounded-[24px] bg-gradient-to-b from-white/[0.04] to-black/60 p-4 flex items-center justify-center mb-5 border border-white/10 shadow-inner">
              <img
                src={quickViewItem.image}
                alt={quickViewItem.name}
                className="w-full h-full object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.7)]"
              />
              {quickViewItem.badge && (
                <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-black text-xs font-black px-3 py-1 rounded-full shadow-lg">
                  {quickViewItem.badge}
                </div>
              )}
            </div>

            {/* Modal Content */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider font-bold text-amber-400">
                  {quickViewItem.cat}
                </span>
                <span className="text-xs bg-amber-500/10 border border-amber-400/20 px-2.5 py-0.5 rounded-full text-amber-300 font-bold flex items-center gap-1">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>Popular Choice</span>
                </span>
              </div>

              <h3 className="font-display font-black text-xl sm:text-2xl text-white">
                {quickViewItem.name}
              </h3>

              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                {quickViewItem.desc}
              </p>

              {/* Highlights Pill Bubbles */}
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="text-[11px] bg-white/5 border border-white/10 px-3 py-1 rounded-full text-gray-300">
                  ✨ 100% Fresh Halal Chicken
                </span>
                <span className="text-[11px] bg-white/5 border border-white/10 px-3 py-1 rounded-full text-gray-300">
                  ⏱️ Freshly Prepared: 15-20 Mins
                </span>
                <span className="text-[11px] bg-white/5 border border-white/10 px-3 py-1 rounded-full text-gray-300">
                  🔥 Lahore's Crunchiest Crust
                </span>
              </div>

              {/* Price & Add to Cart in Modal */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div>
                  <span className="text-[10px] text-gray-400 uppercase block font-semibold">Total Price</span>
                  <span className="font-display font-black text-2xl text-amber-400 tabular-nums">
                    Rs. {quickViewItem.price.toLocaleString()}
                  </span>
                </div>

                <button
                  onClick={() => {
                    handleAddWithEffect(quickViewItem);
                    setQuickViewItem(null);
                  }}
                  className="bg-gradient-to-r from-red-600 via-orange-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white font-black px-6 py-3 rounded-2xl text-xs uppercase tracking-wider shadow-lg shadow-red-500/25 active:scale-95 transition-all flex items-center gap-2 select-none"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Order ✨</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
