import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, Plus, Minus, ArrowRight, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { CartItem, PromoCode, StoreSettings } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  promos: PromoCode[];
  settings: StoreSettings;
  onUpdateQty: (id: number, delta: number) => void;
  onRemoveItem: (id: number) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  promos,
  settings,
  onUpdateQty,
  onRemoveItem,
  onClearCart
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);
  const [couponError, setCouponError] = useState('');
  
  // Checkout Form State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery (COD)');
  const [specialNote, setSpecialNote] = useState('');
  const [formError, setFormError] = useState('');

  // Calculations
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const isFreeDelivery = subtotal >= settings.freeDeliveryThreshold && subtotal > 0;
  const deliveryFee = items.length === 0 ? 0 : isFreeDelivery ? 0 : settings.deliveryFee;

  let discountAmount = 0;
  if (appliedPromo && subtotal >= appliedPromo.minOrder) {
    discountAmount = Math.round(subtotal * appliedPromo.discount);
  }

  const grandTotal = Math.max(0, subtotal - discountAmount + deliveryFee);
  const progressToFreeDelivery = Math.min(100, (subtotal / settings.freeDeliveryThreshold) * 100);
  const amountNeededForFreeDelivery = settings.freeDeliveryThreshold - subtotal;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');

    const cleanCode = couponCode.trim().toUpperCase();
    if (!cleanCode) {
      setCouponError('Please enter a promo code');
      return;
    }

    const matchedPromo = promos.find((p) => p.code.toUpperCase() === cleanCode && p.active);
    if (!matchedPromo) {
      setCouponError('Invalid promo code');
      setAppliedPromo(null);
      return;
    }

    if (subtotal < matchedPromo.minOrder) {
      setCouponError(`Minimum order value of Rs. ${matchedPromo.minOrder} required for ${cleanCode}`);
      return;
    }

    setAppliedPromo(matchedPromo);
    setCouponError('');
  };

  const handleRemoveCoupon = () => {
    setAppliedPromo(null);
    setCouponCode('');
    setCouponError('');
  };

  const handleSubmitWhatsApp = () => {
    setFormError('');

    if (items.length === 0) {
      setFormError('Your cart is empty. Please add items first.');
      return;
    }

    if (!fullName.trim()) {
      setFormError('Please enter your full name');
      return;
    }

    if (!phone.trim()) {
      setFormError('Please enter your phone or WhatsApp number');
      return;
    }

    if (!address.trim()) {
      setFormError('Please enter your complete delivery address');
      return;
    }

    // Format professional WhatsApp order message
    let msg = `*🍗 NEW ORDER - LAHORE FRIED CHICKEN (LFC)*\n\n`;
    msg += `*Customer Details:*\n`;
    msg += `• *Name:* ${fullName.trim()}\n`;
    msg += `• *Phone:* ${phone.trim()}\n`;
    msg += `• *Delivery Address:* ${address.trim()}\n`;
    if (landmark.trim()) {
      msg += `• *Landmark:* ${landmark.trim()}\n`;
    }
    msg += `• *Payment Method:* ${paymentMethod}\n`;
    if (specialNote.trim()) {
      msg += `• *Special Instructions:* ${specialNote.trim()}\n`;
    }
    msg += `\n*Order Items:*\n`;

    items.forEach((item, index) => {
      msg += `${index + 1}. *${item.name}* x${item.qty} = Rs. ${(item.price * item.qty).toLocaleString()}\n`;
    });

    msg += `\n*Bill Summary:*\n`;
    msg += `• *Subtotal:* Rs. ${subtotal.toLocaleString()}\n`;
    if (discountAmount > 0 && appliedPromo) {
      msg += `• *Discount (${appliedPromo.code}):* -Rs. ${discountAmount.toLocaleString()}\n`;
    }
    msg += `• *Delivery Fee:* ${deliveryFee === 0 ? 'FREE' : `Rs. ${deliveryFee}`}\n`;
    msg += `• *GRAND TOTAL:* Rs. ${grandTotal.toLocaleString()}\n\n`;
    msg += `Please confirm my order and share estimated delivery time. Thank you!`;

    const encodedMsg = encodeURIComponent(msg);
    const whatsappUrl = `https://wa.me/${settings.whatsappNumber}?text=${encodedMsg}`;

    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#101118] border-l border-white/10 shadow-2xl flex flex-col">
          
          {/* Drawer Header */}
          <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#151622]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-white">Your Cart</h3>
                <span className="text-[11px] text-gray-400">
                  {items.reduce((s, i) => s + i.qty, 0)} items in basket
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {items.length > 0 && (
                <button
                  onClick={onClearCart}
                  className="text-xs text-red-400 hover:text-red-300 px-2 py-1 rounded hover:bg-white/5 transition-colors"
                  title="Clear Cart"
                >
                  Clear
                </button>
              )}
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                aria-label="Close cart"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Free Delivery Progress */}
          {items.length > 0 && (
            <div className="px-5 py-3 bg-[#13141E] border-b border-white/5">
              <div className="flex items-center justify-between text-xs mb-1.5">
                {isFreeDelivery ? (
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> Congratulations! You got FREE Delivery!
                  </span>
                ) : (
                  <span className="text-gray-300">
                    Add <strong className="text-amber-400 font-display">Rs. {amountNeededForFreeDelivery.toLocaleString()}</strong> more for FREE Delivery
                  </span>
                )}
                <span className="text-gray-500 font-mono text-[10px]">
                  Rs. {settings.freeDeliveryThreshold}
                </span>
              </div>
              <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-300"
                  style={{ width: `${progressToFreeDelivery}%` }}
                />
              </div>
            </div>
          )}

          {/* Drawer Body: Items & Form */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-white/5 flex items-center justify-center text-gray-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="font-display font-bold text-base text-white">Your Basket is Empty</h4>
                <p className="text-xs text-gray-400 max-w-xs mx-auto">
                  Browse our crispy fried chicken, burgers, paratha rolls & loaded pizzas to get started!
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 bg-amber-500 text-black font-bold text-xs px-5 py-2.5 rounded-xl hover:bg-amber-400 transition-colors"
                >
                  Start Ordering
                </button>
              </div>
            ) : (
              <>
                {/* Item List */}
                <div className="space-y-3">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                    Order Items ({items.length})
                  </span>
                  
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="bg-[#161722] p-3 rounded-2xl border border-white/5 flex items-center justify-between gap-3"
                    >
                      <div className="w-12 h-12 rounded-xl bg-black/40 p-1 shrink-0 flex items-center justify-center">
                        <img
                          src={item.image}
                          alt={item.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            const target = e.currentTarget;
                            if (!target.dataset.triedFallback) {
                              target.dataset.triedFallback = 'true';
                              target.src = '/src/assets/images/lfc_hero_feast_1790963438847.jpg';
                            }
                          }}
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-display font-semibold text-xs text-white truncate">
                          {item.name}
                        </h4>
                        <span className="text-amber-400 font-display font-bold text-xs tabular-nums block mt-0.5">
                          Rs. {(item.price * item.qty).toLocaleString()}
                        </span>
                      </div>

                      {/* Quantity Stepper */}
                      <div className="flex items-center gap-1.5 bg-black/50 border border-white/10 rounded-xl p-1 shrink-0">
                        <button
                          onClick={() => onUpdateQty(item.id, -1)}
                          className="w-6 h-6 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-300 hover:text-white text-xs"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-white min-w-[16px] text-center tabular-nums">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => onUpdateQty(item.id, 1)}
                          className="w-6 h-6 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-300 hover:text-white text-xs"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-gray-500 hover:text-red-400 p-1 transition-colors shrink-0"
                        title="Remove Item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Coupon Code Input */}
                <div className="bg-[#161722] p-4 rounded-2xl border border-white/5 space-y-3">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                    Have a Promo Code?
                  </span>
                  
                  {appliedPromo ? (
                    <div className="flex items-center justify-between bg-emerald-500/10 border border-emerald-500/20 px-3 py-2 rounded-xl text-xs text-emerald-400">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>
                          <strong>{appliedPromo.code}</strong> applied ({appliedPromo.discount * 100}% OFF)
                        </span>
                      </div>
                      <button
                        onClick={handleRemoveCoupon}
                        className="text-red-400 hover:underline font-semibold text-[11px]"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="e.g. LFC15 or CRUNCH20"
                        className="flex-1 bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 uppercase"
                      />
                      <button
                        type="submit"
                        className="bg-white/10 hover:bg-white/20 active:bg-white/25 text-white font-semibold text-xs px-4 py-2 rounded-xl transition-colors"
                      >
                        Apply
                      </button>
                    </form>
                  )}

                  {couponError && (
                    <p className="text-[11px] text-red-400 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3 h-3" /> {couponError}
                    </p>
                  )}
                </div>

                {/* Delivery Customer Details Form */}
                <div className="bg-[#161722] p-4 rounded-2xl border border-white/5 space-y-3">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                    Delivery Details
                  </span>

                  <div className="space-y-2.5">
                    <div>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Full Name *"
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-400"
                        required
                      />
                    </div>

                    <div>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Phone / WhatsApp Number (e.g. 0322-1234567) *"
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-400"
                        required
                      />
                    </div>

                    <div>
                      <textarea
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        rows={2}
                        placeholder="Complete Street Address, House/Apt No. *"
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 resize-none"
                        required
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        value={landmark}
                        onChange={(e) => setLandmark(e.target.value)}
                        placeholder="Nearby Landmark (Optional, e.g. Near Shell pump)"
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] text-gray-400 block mb-1">Payment Method</label>
                      <select
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                      >
                        <option value="Cash on Delivery (COD)">Cash on Delivery (COD)</option>
                        <option value="JazzCash Mobile Account">JazzCash Mobile Account</option>
                        <option value="EasyPaisa Mobile Account">EasyPaisa Mobile Account</option>
                        <option value="Bank Transfer (Online)">Online Bank Transfer</option>
                      </select>
                    </div>

                    <div>
                      <input
                        type="text"
                        value={specialNote}
                        onChange={(e) => setSpecialNote(e.target.value)}
                        placeholder="Rider note (e.g. Extra spicy mayo dip, call upon arrival)"
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  {formError && (
                    <p className="text-[11px] text-red-400 flex items-center gap-1 font-semibold pt-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {formError}
                    </p>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Drawer Footer: Bill Breakdown & Submit */}
          {items.length > 0 && (
            <div className="p-5 border-t border-white/10 bg-[#141520] space-y-4">
              
              {/* Cost Breakdown */}
              <div className="space-y-1.5 text-xs text-gray-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white font-medium tabular-nums">
                    Rs. {subtotal.toLocaleString()}
                  </span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount Savings ({appliedPromo?.code})</span>
                    <span className="font-medium tabular-nums">
                      -Rs. {discountAmount.toLocaleString()}
                    </span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className="text-white font-medium tabular-nums">
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-400 font-bold uppercase">Free</span>
                    ) : (
                      `Rs. ${deliveryFee}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-base font-bold text-white border-t border-white/10 pt-2">
                  <span>Grand Total</span>
                  <span className="text-amber-400 font-display text-xl tabular-nums">
                    Rs. {grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Order via WhatsApp Submit Button */}
              <button
                onClick={handleSubmitWhatsApp}
                className="w-full bg-gradient-to-r from-emerald-500 via-emerald-600 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 active:scale-95 transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="font-display uppercase text-xs sm:text-sm tracking-wider">
                  Confirm Order via WhatsApp
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[10px] text-gray-500 text-center">
                Instant order confirmation directly with LFC kitchen dispatcher on WhatsApp.
              </p>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
