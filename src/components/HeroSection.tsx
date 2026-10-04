import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Clock, ShieldCheck, Star, ArrowRight, Sparkles } from 'lucide-react';
import { HeroSlide } from '../types';
import { LFCLogo } from './LFCLogo';

interface HeroSectionProps {
  slides: HeroSlide[];
  logoUrl?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ slides, logoUrl }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Auto-advance slider every 4.5 seconds
  useEffect(() => {
    if (slides.length <= 1 || isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [slides.length, isPaused]);

  if (slides.length === 0) return null;

  const currentSlide = slides[currentIndex] || slides[0];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Mobile swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (diff > 45) {
      handleNext();
    } else if (diff < -45) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  return (
    <section
      id="hero"
      className="relative overflow-hidden pt-4 pb-12 sm:pt-8 sm:pb-20 bg-gradient-to-b from-[#07080C] via-[#0D0E17] to-[#08090E]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* AMBIENT RADIAL LIGHTING (Multi-device optimized glow) */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[340px] sm:w-[600px] h-[340px] sm:h-[450px] bg-gradient-to-br from-amber-500/15 via-red-600/15 to-transparent rounded-full blur-[100px] sm:blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 -right-20 w-64 sm:w-96 h-64 sm:h-96 bg-amber-400/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 -left-20 w-64 sm:w-96 h-64 sm:h-96 bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        
        {/* RESPONSIVE HERO GRID: Stacks on mobile, side-by-side on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-14 items-center">
          
          {/* COLUMN 1: HERO COPY & CALL TO ACTION (First on mobile, left on desktop) */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-6 text-center lg:text-left order-1 lg:order-1 relative">
            
            {/* Soft gold/orange back aura behind headline */}
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
            
            {/* Authentic Brand Badge with Original LFC Logo */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-black to-orange-500/20 border border-amber-400/40 text-amber-300 text-[11px] sm:text-xs font-black uppercase tracking-wider backdrop-blur-md shadow-lg shadow-amber-500/10 select-none">
              <div className="w-5 h-4 flex items-center justify-center shrink-0">
                <LFCLogo className="w-full h-full object-contain" customLogoUrl={logoUrl} />
              </div>
              <span className="truncate">{currentSlide.badgeText || '#1 Fried Chicken in Lahore'}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping shrink-0" />
            </div>

            {/* Main Headline */}
            <h1 className="font-display font-black text-2xl sm:text-4xl lg:text-6xl text-white tracking-tight leading-[1.1] text-balance">
              {currentSlide.title}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300 drop-shadow-md">
                {currentSlide.highlight || 'LEGENDARY'}
              </span>
            </h1>

            {/* Subtitle Description */}
            <p className="text-gray-300 text-xs sm:text-base max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              {currentSlide.subtitle}
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2.5 sm:gap-4 pt-1 sm:pt-2">
              <a
                href={currentSlide.ctaLink || '#menu'}
                className="w-full sm:w-auto bg-gradient-to-r from-red-600 via-orange-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white font-black text-xs sm:text-sm uppercase tracking-wider px-7 sm:px-8 py-3.5 sm:py-4 rounded-2xl shadow-xl shadow-red-600/30 active:scale-95 transition-all text-center flex items-center justify-center gap-2 border border-white/20 select-none"
              >
                <span>{currentSlide.ctaText || 'Order Online Now'}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#deals"
                className="w-full sm:w-auto bg-[#141522]/90 hover:bg-[#1E2032] active:scale-95 border border-white/10 hover:border-amber-400/40 text-gray-200 hover:text-white font-bold text-xs sm:text-sm px-6 py-3.5 sm:py-4 rounded-2xl transition-all text-center backdrop-blur-md"
              >
                View Family Deals
              </a>
            </div>

            {/* Quick Proof Metrics (Specially tuned for 3-column mobile display) */}
            <div className="pt-4 sm:pt-6 border-t border-white/10 grid grid-cols-3 gap-2 sm:gap-4 max-w-lg mx-auto lg:mx-0 text-center">
              <div className="bg-[#12131D]/80 p-2 sm:p-3 rounded-2xl border border-white/5 shadow-sm backdrop-blur-sm">
                <div className="flex items-center justify-center gap-1 text-amber-400 mb-0.5">
                  <Clock className="w-3.5 h-3.5 shrink-0" />
                  <p className="font-display font-black text-xs sm:text-base text-amber-400">30 Mins</p>
                </div>
                <p className="text-[9px] sm:text-[11px] text-gray-400 font-medium">Fast Express</p>
              </div>

              <div className="bg-[#12131D]/80 p-2 sm:p-3 rounded-2xl border border-white/5 shadow-sm backdrop-blur-sm">
                <div className="flex items-center justify-center gap-1 text-emerald-400 mb-0.5">
                  <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                  <p className="font-display font-black text-xs sm:text-base text-emerald-400">100%</p>
                </div>
                <p className="text-[9px] sm:text-[11px] text-gray-400 font-medium">Fresh Halal</p>
              </div>

              <div className="bg-[#12131D]/80 p-2 sm:p-3 rounded-2xl border border-white/5 shadow-sm backdrop-blur-sm">
                <div className="flex items-center justify-center gap-1 text-amber-400 mb-0.5">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 shrink-0" />
                  <p className="font-display font-black text-xs sm:text-base text-amber-400">4.9 ★</p>
                </div>
                <p className="text-[9px] sm:text-[11px] text-gray-400 font-medium">15k+ Foodies</p>
              </div>
            </div>

          </div>

          {/* COLUMN 2: HIGH-IMPACT HERO CAROUSEL FRAME (Second on mobile, right on desktop) */}
          <div className="lg:col-span-6 relative order-2 lg:order-2">
            <div
              className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-lg group"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {/* MINOR GLOW FROM BACK IN GOLD & ORANGE COLOR */}
              <div className="absolute -inset-1 sm:-inset-2 bg-gradient-to-r from-amber-500/25 via-orange-500/30 to-amber-400/20 rounded-[32px] sm:rounded-[44px] blur-xl opacity-75 group-hover:opacity-100 transition duration-500 pointer-events-none -z-10" />
              
              {/* Outer Glow container with Organic Bubble contours */}
              <div className="relative bg-gradient-to-b from-[#181928]/95 via-[#131422]/95 to-[#0D0E17]/98 rounded-[28px] sm:rounded-[40px] p-3 sm:p-6 border border-amber-400/30 shadow-2xl hover:border-amber-400/50 transition-colors backdrop-blur-md overflow-hidden">
                
                {/* Hero Showcase Display Area */}
                <div className="relative aspect-[4/3] rounded-[22px] sm:rounded-[28px] overflow-hidden bg-gradient-to-b from-white/[0.05] via-black/40 to-black/70 flex items-center justify-center border border-white/10 shadow-inner group">
                  
                  {/* Floating Price Pill Tag */}
                  {currentSlide.priceTag && (
                    <div className="absolute top-2.5 right-2.5 sm:top-3.5 sm:right-3.5 z-20 bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-black px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full shadow-xl shadow-amber-500/25 flex items-center gap-1 border border-white/30 backdrop-blur-md">
                      <span className="text-[9px] sm:text-[10px] uppercase font-black tracking-wider">Only</span>
                      <span className="font-display font-black text-xs sm:text-base">{currentSlide.priceTag}</span>
                    </div>
                  )}

                  {/* Watermark of Authentic LFC Logo in top-left */}
                  <div className="absolute top-2.5 left-2.5 sm:top-3.5 sm:left-3.5 z-20 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-full border border-amber-400/30 flex items-center gap-1.5 shadow-md">
                    <div className="w-5 h-4">
                      <LFCLogo className="w-full h-full object-contain" customLogoUrl={logoUrl} />
                    </div>
                    <span className="text-[9px] sm:text-[10px] font-black text-amber-300 uppercase tracking-wide">
                      Lahore Fried Chicken
                    </span>
                  </div>

                  {/* Hero Dish Image */}
                  <img
                    key={currentSlide.id}
                    src={currentSlide.image}
                    alt={currentSlide.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain p-3 sm:p-4 max-h-[220px] sm:max-h-[340px] animate-float-slow transition-opacity duration-300 filter drop-shadow-[0_16px_28px_rgba(0,0,0,0.8)]"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.dataset.triedFallback) {
                        target.dataset.triedFallback = 'true';
                        target.src = `/src/assets/images/lfc_hero_feast_1790963438847.jpg`;
                      }
                    }}
                  />

                  {/* Quick prev/next overlay arrows for easy tapping */}
                  <button
                    onClick={handlePrev}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity z-20 sm:hidden"
                    aria-label="Previous"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity z-20 sm:hidden"
                    aria-label="Next"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Slider Controls Bar (Desktop arrows + active progress dots) */}
                <div className="flex items-center justify-between pt-3 sm:pt-4">
                  <button
                    onClick={handlePrev}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 border border-white/10 hidden sm:flex items-center justify-center text-gray-300 hover:text-white transition-all shadow-md"
                    aria-label="Previous Hero Slide"
                  >
                    <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>

                  {/* Bubble Progress Indicators */}
                  <div className="flex items-center justify-center gap-1.5 sm:gap-2 w-full sm:w-auto">
                    {slides.map((slide, idx) => (
                      <button
                        key={slide.id}
                        onClick={() => setCurrentIndex(idx)}
                        className={`transition-all rounded-full ${
                          idx === currentIndex
                            ? 'w-7 sm:w-9 h-2 sm:h-2.5 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300 shadow-md shadow-amber-400/40'
                            : 'w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white/20 hover:bg-white/40'
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={handleNext}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 border border-white/10 hidden sm:flex items-center justify-center text-gray-300 hover:text-white transition-all shadow-md"
                    aria-label="Next Hero Slide"
                  >
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>

                {/* 4 Interactive Thumbnail Selector Chips */}
                <div className="grid grid-cols-4 gap-1.5 sm:gap-2 pt-3 mt-3 border-t border-white/10">
                  {slides.map((slide, idx) => (
                    <button
                      key={slide.id}
                      onClick={() => setCurrentIndex(idx)}
                      className={`relative aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden p-1 transition-all ${
                        idx === currentIndex
                          ? 'border-2 border-amber-400 bg-amber-400/15 shadow-md shadow-amber-400/30 scale-105'
                          : 'border border-white/10 bg-black/40 opacity-70 hover:opacity-100'
                      }`}
                      title={slide.title}
                    >
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-contain"
                      />
                    </button>
                  ))}
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
