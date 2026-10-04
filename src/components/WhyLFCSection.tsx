import React from 'react';
import { Drumstick, Sparkles, Truck, ShieldCheck, Flame, Heart } from 'lucide-react';

export const WhyLFCSection: React.FC = () => {
  const features = [
    {
      icon: <Drumstick className="w-6 h-6 text-amber-400" />,
      title: '100% Fresh Halal Chicken',
      description: 'Sourced daily from certified local poultry farms. Never frozen, preserving natural juiciness, tenderness, and texture in every cut.'
    },
    {
      icon: <Flame className="w-6 h-6 text-red-500" />,
      title: 'Secret 12-Spice Blend',
      description: 'Our proprietary marinade infuses authentic Lahori spices with a multi-layered crunch coating for an unforgettable savory kick.'
    },
    {
      icon: <Truck className="w-6 h-6 text-emerald-400" />,
      title: '30-Min Hot Express',
      description: 'Dispatched in insulated thermal heat-lock bags so your fried chicken, burgers, and pizzas reach your table piping hot and ultra-crispy.'
    }
  ];

  return (
    <section id="why-us" className="py-16 sm:py-20 bg-[#0E0F14] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-red-500 uppercase tracking-widest bg-red-600/10 px-3 py-1 rounded-full border border-red-500/20 mb-3">
            <Heart className="w-3.5 h-3.5" />
            <span>The Secret Behind The Crunch</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
            WHY LAHORE LOVES LFC
          </h2>
          <p className="text-gray-400 text-sm mt-2">
            We hold zero compromises on ingredient quality, oil purity, and golden crisp perfection.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feat, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-b from-[#181928]/90 via-[#141522]/90 to-[#0F1018]/95 p-6 sm:p-8 rounded-[32px] border border-white/10 hover:border-amber-400/40 hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 text-center space-y-4 group backdrop-blur-md"
            >
              <div className="w-16 h-16 mx-auto rounded-[22px] bg-gradient-to-b from-white/[0.08] to-black/40 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
                {feat.icon}
              </div>
              <h3 className="font-display font-black text-xl text-white group-hover:text-amber-400 transition-colors">
                {feat.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-normal">
                {feat.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
