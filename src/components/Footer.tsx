import React from 'react';
import { Phone, MapPin, Clock, ArrowUp } from 'lucide-react';
import { StoreSettings } from '../types';
import { LFCLogo } from './LFCLogo';

interface FooterProps {
  settings: StoreSettings;
}

export const Footer: React.FC<FooterProps> = ({ settings }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black text-gray-400 py-16 border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="w-16 h-12 p-1 rounded-2xl bg-gradient-to-br from-amber-500/20 via-[#10111A] to-orange-500/20 border border-amber-400/40 shadow-lg shadow-amber-500/15 flex items-center justify-center overflow-hidden">
                <LFCLogo className="w-full h-full object-contain filter drop-shadow" customLogoUrl={settings?.logoUrl} />
              </div>
              <div>
                <span className="font-display font-black text-2xl text-white tracking-wider block leading-none">
                  LFC<span className="text-amber-400">.</span>
                </span>
                <span className="text-[11px] text-gray-400 font-medium">Lahore Fried Chicken</span>
              </div>
            </div>
            
            <p className="text-xs text-gray-400 max-w-sm leading-relaxed">
              Serving Lahore's crunchiest fried chicken, gourmet zinger burgers, paratha rolls & loaded cheese-pull pizzas since 2018. Pure fresh ingredients fried to sizzling perfection.
            </p>

            <div className="pt-2 flex items-center gap-4 text-xs text-gray-400">
              <span className="flex items-center gap-1.5 text-gray-300">
                <MapPin className="w-4 h-4 text-amber-400" /> Multiple Lahore Branches
              </span>
              <span className="flex items-center gap-1.5 text-gray-300">
                <Clock className="w-4 h-4 text-emerald-400" /> Open till 3:00 AM
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#hero" className="hover:text-amber-400 transition-colors">Hero Showcase</a>
              </li>
              <li>
                <a href="#menu" className="hover:text-amber-400 transition-colors">Crispy Menu</a>
              </li>
              <li>
                <a href="#deals" className="hover:text-amber-400 transition-colors">Family Combos</a>
              </li>
              <li>
                <a href="#locations" className="hover:text-amber-400 transition-colors">Lahore Outlets</a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-amber-400 transition-colors">Why Choose LFC</a>
              </li>
            </ul>
          </div>

          {/* WhatsApp & Phone Direct Order Hotline */}
          <div>
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-4">
              Order Hotline
            </h4>
            <p className="text-xs text-gray-400 mb-3">
              Direct order support, party catering & takeaways:
            </p>
            <div className="flex flex-col gap-2">
              {settings.phoneHotline && (
                <a
                  href={`tel:${settings.phoneHotline}`}
                  className="inline-flex items-center gap-2.5 text-amber-300 font-display font-bold text-sm bg-amber-500/10 hover:bg-amber-500/20 px-4 py-2.5 rounded-xl border border-amber-500/20 transition-colors"
                >
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>{settings.phoneHotline}</span>
                </a>
              )}
              <a
                href={`https://wa.me/${settings.whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 text-emerald-400 font-display font-bold text-sm bg-emerald-500/10 hover:bg-emerald-500/20 px-4 py-2.5 rounded-xl border border-emerald-500/20 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>WhatsApp: {settings.whatsappNumber}</span>
              </a>
            </div>
            <p className="text-[11px] text-gray-500 mt-2">
              WhatsApp & Phone lines active daily from 12:00 PM to 03:00 AM.
            </p>
          </div>

        </div>

        {/* Bottom Credits Line */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© 2026 Lahore Fried Chicken (LFC). All Rights Reserved.</p>
          
          <div className="flex items-center gap-4">
            <p className="font-medium text-gray-400">
              Developer: <span className="text-amber-400 font-bold tracking-wide">Trivox Solutions</span>
            </p>
            <button
              onClick={scrollToTop}
              className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
              title="Back to Top"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
