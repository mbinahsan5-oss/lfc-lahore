import React, { useState } from 'react';
import { ShoppingBag, Users, Check, Flame } from 'lucide-react';
import { MenuItem } from '../types';

interface DealsSectionProps {
  items: MenuItem[];
  onAddToCart: (item: MenuItem) => void;
}

export const DealsSection: React.FC<DealsSectionProps> = ({ items, onAddToCart }) => {
  const [poppingDealId, setPoppingDealId] = useState<number | null>(null);

  // Filter for deals or high-value bundles
  const deals = items.filter((i) => i.cat === 'Deals' || i.price >= 1400);

  const handleClaimBundle = (deal: MenuItem) => {
    setPoppingDealId(deal.id);
    onAddToCart(deal);
    setTimeout(() => setPoppingDealId(null), 900);
  };

  if (deals.length === 0) return null;

  return (
    <section id="deals" className="py-14 sm:py-20 bg-gradient-to-b from-[#0E0F14] via-[#12131A] to-[#0E0F14] border-t border-white/5 relative overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20 mb-3">
            <Users className="w-3.5 h-3.5" />
            <span>Value Bundles</span>
          </div>
          <h2 className="font-display font-black text-2xl sm:text-5xl text-white tracking-tight">
            LFC FAMILY BUNDLES
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm mt-2">
            Maximum crunch for gatherings and weekend feasts at unbeatable combo savings.
          </p>
        </div>

        {/* Deals Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-8">
          {deals.slice(0, 4).map((deal) => {
            const isPopping = poppingDealId === deal.id;

            return (
              <div key={deal.id} className="relative group">
                {/* Minor backlight glow in gold & orange */}
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/25 via-orange-500/20 to-amber-400/15 rounded-[36px] blur-lg opacity-40 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none -z-10" />

                <div
                  className="bg-gradient-to-b from-[#181928]/90 via-[#151622]/90 to-[#10111A]/95 rounded-[32px] p-5 sm:p-7 flex flex-col sm:flex-row items-center gap-5 sm:gap-7 border border-amber-400/20 hover:border-amber-400/60 shadow-2xl hover:shadow-[0_20px_50px_-12px_rgba(245,158,11,0.25)] transition-all duration-300 h-full backdrop-blur-md overflow-hidden"
                >
                  {/* Floating Golden Burst */}
                  {isPopping && (
                    <div className="absolute top-4 right-8 text-2xl animate-chilli-pop pointer-events-none z-30 select-none drop-shadow-md">
                      ✨🍗🔥⭐
                    </div>
                  )}

                {/* Deal Image Bubble Plate */}
                <div className="w-full sm:w-44 h-40 sm:h-44 rounded-[24px] bg-gradient-to-b from-white/[0.04] to-black/60 overflow-hidden flex items-center justify-center p-3 shrink-0 border border-white/10 group-hover:scale-105 transition-transform duration-300 shadow-inner">
                  <img
                    src={deal.image}
                    alt={deal.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.7)]"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.dataset.triedFallback) {
                        target.dataset.triedFallback = 'true';
                        target.src = '/src/assets/images/lfc_hero_feast_1790963438847.jpg';
                      }
                    }}
                  />
                </div>

                {/* Deal Info */}
                <div className="space-y-2.5 flex-1 text-center sm:text-left w-full">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <span className="bg-gradient-to-r from-red-600 to-orange-500 text-white text-[10px] font-black uppercase px-3 py-1 rounded-full shadow-md">
                      {deal.badge || 'Mega Savings'}
                    </span>
                    <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-bold bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                      <Check className="w-3 h-3" /> Includes Drinks & Sides
                    </span>
                  </div>

                  <h3 className="font-display font-black text-lg sm:text-2xl text-white group-hover:text-amber-400 transition-colors">
                    {deal.name}
                  </h3>

                  <p className="text-xs text-gray-400 leading-relaxed font-normal">
                    {deal.desc}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-white/5">
                    <div>
                      <span className="text-[10px] text-gray-400 uppercase block font-semibold">Bundle Price</span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-xs text-amber-400 font-bold">Rs.</span>
                        <span className="font-display font-black text-xl sm:text-2xl text-amber-400 tabular-nums">
                          {deal.price.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleClaimBundle(deal)}
                      className={`px-5 py-2.5 rounded-2xl text-xs uppercase tracking-wider font-black transition-all flex items-center gap-2 active:scale-90 shadow-lg border border-white/20 select-none ${
                        isPopping
                          ? 'bg-emerald-500 text-black scale-105 shadow-emerald-500/30'
                          : 'bg-gradient-to-r from-red-600 via-red-500 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white shadow-red-500/25 hover:shadow-amber-500/30'
                      }`}
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>{isPopping ? 'Claimed! ✨' : 'Claim Bundle'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
          })}
        </div>

      </div>
    </section>
  );
};
