import React, { useState } from 'react';
import { MapPin, Phone, Clock, Navigation, CheckCircle2 } from 'lucide-react';
import { BranchLocation } from '../types';

interface LocationsSectionProps {
  locations: BranchLocation[];
}

export const LocationsSection: React.FC<LocationsSectionProps> = ({ locations }) => {
  const [selectedArea, setSelectedArea] = useState<string>('All');

  // Extract unique areas
  const areas = ['All', ...Array.from(new Set(locations.map((l) => l.area).filter(Boolean)))];

  const filteredLocations = locations.filter((loc) => {
    if (selectedArea === 'All') return true;
    return loc.area === selectedArea;
  });

  return (
    <section id="locations" className="py-16 sm:py-20 bg-[#0A0A0D] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20 mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>Visit Our Outlets</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
            OUR LOCATIONS
          </h2>
          <p className="text-gray-400 text-sm mt-2">
            Find an LFC branch near you in Lahore for dine-in, takeaway, or blazing hot express delivery.
          </p>
        </div>

        {/* Area Filter Tabs */}
        {areas.length > 2 && (
          <div className="flex items-center justify-center gap-2 overflow-x-auto no-scrollbar pb-6">
            {areas.map((area) => (
              <button
                key={area}
                onClick={() => setSelectedArea(area)}
                className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  selectedArea === area
                    ? 'bg-amber-500 text-black shadow-md'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {area}
              </button>
            ))}
          </div>
        )}

        {/* Location Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLocations.map((loc) => (
            <div
              key={loc.id}
              className="bg-[#14151D] rounded-2xl p-6 space-y-4 border border-white/5 hover:border-amber-400/30 transition-all duration-200 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-lg text-white">
                        {loc.name}
                      </h3>
                      {loc.area && (
                        <span className="text-[11px] text-gray-400 block font-medium">
                          {loc.area}, Lahore
                        </span>
                      )}
                    </div>
                  </div>

                  {loc.isOpen ? (
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Open
                    </span>
                  ) : (
                    <span className="bg-red-500/10 text-red-400 text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0">
                      Closed
                    </span>
                  )}
                </div>

                {/* Timing */}
                <div className="flex items-center gap-2 text-xs text-amber-300/90 bg-white/[0.02] p-2.5 rounded-xl border border-white/5">
                  <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="font-medium">{loc.timing}</span>
                </div>

                {/* Physical Address */}
                <p className="text-xs text-gray-400 leading-relaxed">
                  {loc.address}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-2">
                <a
                  href={`tel:${loc.phone}`}
                  className="flex items-center gap-2 text-xs text-white hover:text-amber-400 font-semibold bg-white/5 hover:bg-white/10 px-3.5 py-2 rounded-xl border border-white/5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>{loc.phone}</span>
                </a>

                {loc.mapUrl && (
                  <a
                    href={loc.mapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-semibold bg-amber-400/10 hover:bg-amber-400/20 px-3 py-2 rounded-xl transition-colors"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Map</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
