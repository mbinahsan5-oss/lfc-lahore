import React from 'react';
import { Star, MessageSquareQuote } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const reviews = [
    {
      id: 1,
      name: 'Ali Hassan',
      location: 'Gulberg III, Lahore',
      rating: 5,
      comment: 'Hands down the crispiest Zinger burger in Lahore! The crunch is unmatched and the spicy garlic mayo gives it the perfect hit. Ordered twice this week already.',
      initials: 'AH',
      badgeColor: 'bg-red-600/30 text-red-300'
    },
    {
      id: 2,
      name: 'Usman Khan',
      location: 'DHA Phase 5, Lahore',
      rating: 5,
      comment: 'The 9-piece Zinger Bucket was delivered piping hot in 22 minutes! The family deal price is super reasonable for the quantity. Chicken was juicy right to the bone.',
      initials: 'UK',
      badgeColor: 'bg-amber-500/30 text-amber-300'
    },
    {
      id: 3,
      name: 'Fatima Zahra',
      location: 'Johar Town, Lahore',
      rating: 5,
      comment: 'Their Zinger Paratha Roll and Loaded Cheese Pizza are a killer combination. Placing orders directly via WhatsApp is so fast and hassle-free!',
      initials: 'FZ',
      badgeColor: 'bg-emerald-500/30 text-emerald-300'
    }
  ];

  return (
    <section id="reviews" className="py-16 sm:py-20 bg-[#0A0A0D] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20 mb-3">
            <MessageSquareQuote className="w-3.5 h-3.5" />
            <span>Customer Testimonials</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
            WHAT OUR FOODIES SAY
          </h2>
          <p className="text-gray-400 text-sm mt-2">
            Over 15,000+ satisfied fried chicken enthusiasts across Lahore choose LFC daily.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#14151D] p-6 rounded-3xl border border-white/5 hover:border-amber-400/30 transition-all duration-200 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-gray-300 italic leading-relaxed">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author Meta */}
              <div className="flex items-center gap-3 pt-3 border-t border-white/5">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-xs ${rev.badgeColor}`}>
                  {rev.initials}
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-white">
                    {rev.name}
                  </h4>
                  <p className="text-[11px] text-gray-400">
                    {rev.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
