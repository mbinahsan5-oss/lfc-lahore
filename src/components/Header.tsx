import React, { useState } from 'react';
import { ShoppingBag, Menu as MenuIcon, X, Phone, MapPin } from 'lucide-react';
import { StoreSettings } from '../types';
import { LFCLogo } from './LFCLogo';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onSecretAdmin?: () => void;
  settings: StoreSettings;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onSecretAdmin,
  settings
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [announcementDismissed, setAnnouncementDismissed] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const handleBrandClick = (e: React.MouseEvent) => {
    // Secret 5-click easter egg to open admin if hash is forgotten
    const newCount = clickCount + 1;
    setClickCount(newCount);
    if (newCount >= 5) {
      setClickCount(0);
      if (onSecretAdmin) onSecretAdmin();
    }
  };

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Menu', href: '#menu' },
    { label: 'Deals', href: '#deals' },
    { label: 'Outlets', href: '#locations' },
    { label: 'Why LFC', href: '#why-us' },
    { label: 'Reviews', href: '#reviews' },
  ];

  return (
    <>
      {/* TOP ANNOUNCEMENT STICKY BAR */}
      {settings.showAnnouncement && !announcementDismissed && (
        <div className="bg-gradient-to-r from-red-700 via-red-600 to-amber-600 text-white text-xs sm:text-sm font-semibold py-2 px-4 shadow-sm z-50 transition-all">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
            <div className="flex-1 flex items-center justify-center gap-2 text-center truncate">
              {settings.announcementBadge && (
                <span className="bg-black/30 text-amber-300 px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider shrink-0">
                  {settings.announcementBadge}
                </span>
              )}
              <span className="truncate">{settings.announcementText}</span>
            </div>
            <button
              onClick={() => setAnnouncementDismissed(true)}
              className="text-white/80 hover:text-white p-1 rounded hover:bg-black/20 transition-colors shrink-0"
              aria-label="Dismiss banner"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* MAIN TOP NAVIGATION BAR (One-row, 3-zone contract) */}
      <header className="sticky top-0 z-40 bg-[#0E0F14]/90 backdrop-blur-md border-b border-white/10 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* ZONE 1: BRAND TITLE WITH OFFICIAL LFC LOGO */}
          <a
            href="#hero"
            onClick={handleBrandClick}
            className="flex items-center gap-3 group select-none"
            title="Lahore Fried Chicken (LFC) - Secret Admin: 5 Clicks"
          >
            <div className="w-16 h-12 p-1 rounded-2xl bg-gradient-to-br from-amber-500/20 via-[#10111A] to-orange-500/20 border border-amber-400/40 shadow-lg shadow-amber-500/15 group-hover:scale-105 group-hover:border-amber-400/70 transition-all duration-200 flex items-center justify-center overflow-hidden backdrop-blur-md">
              <LFCLogo 
                className="w-full h-full object-contain filter drop-shadow group-hover:scale-105 transition-transform" 
                customLogoUrl={settings?.logoUrl} 
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-black text-2xl tracking-wider text-white leading-none">
                  LFC<span className="text-amber-400">.</span>
                </span>
                <span className="text-[10px] bg-red-600/30 text-red-400 font-bold px-2 py-0.5 rounded-full border border-red-500/30 uppercase tracking-widest hidden sm:inline-block">
                  Lahore
                </span>
              </div>
              <span className="text-[11px] text-gray-400 font-medium tracking-wide block">
                Lahore Fried Chicken
              </span>
            </div>
          </a>

          {/* ZONE 2: NAVIGATION LINKS */}
          <nav className="hidden md:flex items-center gap-7 font-medium text-sm text-gray-300">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-amber-400 transition-colors py-1 relative group font-semibold"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-200 group-hover:w-full rounded-full" />
              </a>
            ))}
          </nav>

          {/* ZONE 3: PRIMARY ACTIONS (Phone Hotline, Cart, Mobile Toggle) */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Quick Phone Hotline Button */}
            {(settings?.phoneHotline || settings?.whatsappNumber) && (
              <a
                href={`tel:${settings?.phoneHotline || settings?.whatsappNumber}`}
                className="hidden lg:flex items-center gap-1.5 text-xs text-amber-300 font-bold px-3 py-2 rounded-2xl bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/25 transition-all shadow-sm active:scale-95"
                title="Call LFC Order Hotline"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>{settings?.phoneHotline || settings?.whatsappNumber}</span>
              </a>
            )}

            {/* Shopping Cart Drawer Trigger with Bubbly Pill Glow */}
            <button
              onClick={onOpenCart}
              className="relative bg-gradient-to-r from-red-600 via-red-500 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white font-black px-4 sm:px-5 py-2.5 rounded-2xl flex items-center gap-2.5 shadow-lg shadow-red-500/25 active:scale-90 transition-all border border-white/20 select-none"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 text-white" />
              <span className="hidden sm:inline font-display uppercase tracking-wider text-xs">Cart</span>
              <span className="bg-black text-amber-400 text-xs font-black min-w-[22px] h-[22px] px-1 rounded-full flex items-center justify-center border border-amber-400/40">
                {cartCount}
              </span>
            </button>

            {/* Mobile Menu Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-white/5 text-gray-300 hover:text-white border border-white/10"
              aria-label="Toggle mobile navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#12131A] border-b border-white/10 px-4 py-4 space-y-2 animate-fadeIn">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-200 hover:bg-white/5 hover:text-amber-400 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-gray-400 px-3">
              <a
                href={`https://wa.me/${settings.whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-emerald-400 hover:underline"
              >
                <Phone className="w-3.5 h-3.5" /> Order: {settings.whatsappNumber}
              </a>
              <span className="flex items-center gap-1 text-amber-400">
                <MapPin className="w-3.5 h-3.5" /> Lahore, PK
              </span>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
