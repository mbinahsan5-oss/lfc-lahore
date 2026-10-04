/**
 * Lahore Fried Chicken (LFC) - Official Web Application
 * Pure Standard JavaScript (No TypeScript, Zero Build Required, 100% GitHub Pages Compatible)
 * Developed for LFC • Developer: Trivox solutions
 */

(function () {
  'use strict';

  // --- Initial Preset Data ---
  const DEFAULT_SETTINGS = {
    storeName: 'Lahore Fried Chicken (LFC)',
    tagline: 'Taste the Legend',
    logoUrl: './lfc_logo.png',
    phoneCallNumber: '0322-4940181',
    whatsappNumber: '0322-4940181',
    adminPin: '5640', // User locked PIN
    deliveryFee: 150,
    freeDeliveryAbove: 2000,
    storeTiming: '12:00 PM - 02:30 AM',
    currency: 'Rs.',
    announcementText: '🔥 Free Delivery in Lahore on Orders Above Rs. 2,000! | Code: LFC100 for Rs. 100 OFF'
  };

  const DEFAULT_CATEGORIES = [
    { id: 'all', name: 'All Bites' },
    { id: 'burgers', name: 'Burgers' },
    { id: 'rolls', name: 'Paratha Rolls' },
    { id: 'pizzas', name: 'Loaded Pizzas' },
    { id: 'buckets', name: 'Fried Buckets' },
    { id: 'deals', name: 'Mega Deals' },
    { id: 'sides', name: 'Sides & Drinks' }
  ];

  const DEFAULT_HERO_SLIDES = [
    {
      id: 1,
      title: 'THE ULTIMATE CRISPY',
      highlight: 'FAMILY FEAST',
      subtitle: 'Signature Zinger burger, golden crunch bucket, cheesy pizza slice, paratha roll and tender strips in one legendary combo.',
      badgeText: '#1 Crispy Chicken in Lahore',
      image: './hero section (1).png',
      priceTag: 'Rs. 2,890',
      tag: 'Grand Feast',
      rating: '4.9 ★ (1,840+ reviews)',
      ctaText: 'Order Feast Now',
      targetDealId: 9
    },
    {
      id: 2,
      title: 'LFC CRISPY CHICKEN',
      highlight: 'ZINGER ROLL',
      subtitle: 'Tender golden crispy chicken strips wrapped in a freshly grilled flaky paratha with signature garlic sauce and sliced onions.',
      badgeText: 'Lahore Street Special',
      image: './hero section (2).png',
      priceTag: 'Rs. 380',
      tag: 'Street Legend',
      rating: '4.8 ★ (920+ reviews)',
      ctaText: 'Grab A Roll',
      targetDealId: 2
    },
    {
      id: 3,
      title: 'HOT EXTRA CHEESY',
      highlight: 'LOADED PIZZA',
      subtitle: 'Loaded with premium mozzarella cheese pull, spicy grilled chicken cubes, black olives and sliced crunchy capsicums.',
      badgeText: 'Chef Recommended',
      image: './hero section (3).png',
      priceTag: 'Rs. 1,290',
      tag: 'Cheesy Melt',
      rating: '4.9 ★ (1,230+ reviews)',
      ctaText: 'Order Hot Pizza',
      targetDealId: 3
    },
    {
      id: 4,
      title: '9-PIECE SIGNATURE',
      highlight: 'ZINGER BUCKET',
      subtitle: 'Nine pieces of legendary 12-spice recipe fried chicken, sizzling hot and super juicy inside with ultra-crunchy crust.',
      badgeText: 'Weekend Bestseller',
      image: './hero section (4).png',
      priceTag: 'Rs. 1,850',
      tag: 'Mega Crunch',
      rating: '5.0 ★ (2,410+ reviews)',
      ctaText: 'Get The Bucket',
      targetDealId: 4
    }
  ];

  const DEFAULT_MENU_ITEMS = [
    {
      id: 1,
      name: 'Crispy Zinger Burger',
      cat: 'burgers',
      price: 490,
      desc: 'Whole chicken breast fillet marinated in authentic spices, deep-fried to golden perfection with crisp lettuce and spicy mayo.',
      image: './hero section (1).png',
      badge: 'Bestseller',
      inStock: true,
      spiciness: 2
    },
    {
      id: 2,
      name: 'Zinger Paratha Roll',
      cat: 'rolls',
      price: 380,
      desc: 'Golden crispy chicken strips inside a flaky, pan-toasted paratha with garlic dip and sweet chili glaze.',
      image: './hero section (2).png',
      badge: 'Popular',
      inStock: true,
      spiciness: 2
    },
    {
      id: 3,
      name: 'Extra Cheese Loaded Pizza',
      cat: 'pizzas',
      price: 1290,
      desc: 'Mozzarella cheese pull, seasoned chicken fajita chunks, black olives, bell peppers, oregano and secret herb sauce.',
      image: './hero section (3).png',
      badge: 'Chef Special',
      inStock: true,
      spiciness: 1
    },
    {
      id: 4,
      name: '9-Piece Zinger Bucket',
      cat: 'buckets',
      price: 1850,
      desc: 'Nine pieces of our secret-recipe fried chicken, intensely crispy outside and juicy inside, with 2 garlic dips.',
      image: './hero section (4).png',
      badge: 'Mega Value',
      inStock: true,
      spiciness: 2
    },
    {
      id: 5,
      name: 'Tower Supreme Burger',
      cat: 'burgers',
      price: 690,
      desc: 'Double crunchy chicken breast fillets, melted cheddar slice, golden hash brown, and smokey BBQ chipotle glaze.',
      image: './hero section (1).png',
      badge: 'Double Patty',
      inStock: true,
      spiciness: 3
    },
    {
      id: 6,
      name: 'Spicy Tender Strips (5 Pcs)',
      cat: 'buckets',
      price: 520,
      desc: 'Boneless tender chicken strips with craggy golden batter, served with spicy garlic mayo and sweet chili dip.',
      image: './hero section (1).png',
      badge: 'Crunchy',
      inStock: true,
      spiciness: 2
    },
    {
      id: 7,
      name: 'Spicy Tikka Supreme Pizza',
      cat: 'pizzas',
      price: 1350,
      desc: 'Tandoori-spiced chicken chunks, red onions, jalapeños, mozzarella and spicy garlic ranch swirl on crispy crust.',
      image: './hero section (3).png',
      badge: 'Spicy',
      inStock: true,
      spiciness: 3
    },
    {
      id: 8,
      name: 'Garlic Mayo Zinger Roll',
      cat: 'rolls',
      price: 410,
      desc: 'Crispy fried chicken tenders with creamy garlic mayonnaise, pickled gherkins, and crunchy shredded cabbage.',
      image: './hero section (2).png',
      badge: 'Creamy',
      inStock: true,
      spiciness: 1
    },
    {
      id: 9,
      name: 'Family Feast Combo Deal',
      cat: 'deals',
      price: 2890,
      desc: '4 Crispy Zinger Burgers, 4 Pcs Golden Fried Chicken, 1 Jumbo Fries, 2 Paratha Rolls, and 1.5L Chilled Soft Drink.',
      image: './hero section (1).png',
      badge: 'Save 25%',
      inStock: true,
      spiciness: 2
    },
    {
      id: 10,
      name: 'Couple Crunch Deal',
      cat: 'deals',
      price: 1450,
      desc: '2 Zinger Burgers, 2 Pcs Crunchy Fried Chicken, 1 Large Fries, and 2 Soft Drink cans (250ml).',
      image: './hero section (4).png',
      badge: 'Duo Deal',
      inStock: true,
      spiciness: 2
    },
    {
      id: 11,
      name: 'Peri Peri Masala Fries',
      cat: 'sides',
      price: 240,
      desc: 'Thick crinkle-cut golden potatoes tossed in hot Lahori peri-peri spice dust with spicy garlic dip.',
      image: './hero section (1).png',
      badge: 'Hot Side',
      inStock: true,
      spiciness: 2
    },
    {
      id: 12,
      name: 'Chilled Soft Drink (1.5L)',
      cat: 'sides',
      price: 220,
      desc: 'Ice-cold carbonated beverage (Coke / Sprite / Fanta) to complement your hot crispy chicken feast.',
      image: './hero section (4).png',
      badge: 'Chilled',
      inStock: true,
      spiciness: 0
    }
  ];

  const DEFAULT_BRANCHES = [
    {
      id: 1,
      name: 'Gulberg III (Main MM Alam)',
      address: 'Shop 4, Block K, Near Mini Market & MM Alam Road, Gulberg III, Lahore',
      phone: '0322-4940181',
      timings: '12:00 PM - 02:30 AM',
      mapUrl: 'https://maps.google.com/?q=Gulberg+Lahore'
    },
    {
      id: 2,
      name: 'DHA Phase 5 Commercial',
      address: 'Plaza 18-C, Sector CCA, Phase 5 DHA, Lahore',
      phone: '0322-4940181',
      timings: '01:00 PM - 03:00 AM',
      mapUrl: 'https://maps.google.com/?q=DHA+Phase+5+Lahore'
    },
    {
      id: 3,
      name: 'Johar Town (G1 Market)',
      address: 'Main Boulevard, Opposite Doctors Hospital, Johar Town, Lahore',
      phone: '0322-4940181',
      timings: '12:00 PM - 02:00 AM',
      mapUrl: 'https://maps.google.com/?q=Johar+Town+Lahore'
    },
    {
      id: 4,
      name: 'Mall Road Heritage',
      address: 'Shahrah-e-Quaid-e-Azam, Near Regal Chowk, Mall Road, Lahore',
      phone: '0322-4940181',
      timings: '11:30 AM - 01:30 AM',
      mapUrl: 'https://maps.google.com/?q=Mall+Road+Lahore'
    }
  ];

  const DEFAULT_REVIEWS = [
    {
      id: 1,
      name: 'Hamza Malik',
      location: 'Gulberg III, Lahore',
      rating: 5,
      date: 'Yesterday',
      comment: 'Hands down the crispiest Zinger in Lahore! The crust has a real crunch that stays crispy during delivery, and the garlic dip is heavenly.'
    },
    {
      id: 2,
      name: 'Ayesha Tariq',
      location: 'DHA Phase 5, Lahore',
      rating: 5,
      date: '3 days ago',
      comment: 'Their Loaded Cheese Pizza and Fried Chicken Bucket deal made our family weekend dinner unforgettable. Super fast WhatsApp ordering!'
    },
    {
      id: 3,
      name: 'Bilal Farooq',
      location: 'Johar Town, Lahore',
      rating: 5,
      date: '1 week ago',
      comment: 'The Zinger Paratha Roll is pure Lahori street food magic. Sizzling chicken strips with flaky crispy paratha. 10/10 recommend.'
    }
  ];

  // --- Live Order Notifications Ticker ---
  const LIVE_ORDER_TICKERS = [
    '🔥 Usman in Gulberg III just ordered Family Feast Combo!',
    '⚡ Sana in DHA Phase 5 placed an order for 2x Zinger Rolls!',
    '🍗 Ahmed in Johar Town just grabbed a 9-Pc Zinger Bucket!',
    '🍕 Ali in Model Town ordered Extra Cheese Loaded Pizza!'
  ];

  // --- LocalStorage Persistence with Defaults Merging ---
  function loadData(key, fallback) {
    try {
      const saved = localStorage.getItem('lfc_' + key);
      if (!saved) return fallback;
      const parsed = JSON.parse(saved);
      if (typeof fallback === 'object' && fallback !== null && !Array.isArray(fallback)) {
        const merged = Object.assign({}, fallback, parsed);
        // Ensure PIN defaults to 5640 if previously set to 1234
        if (key === 'settings' && merged.adminPin === '1234') {
          merged.adminPin = '5640';
        }
        return merged;
      }
      return parsed;
    } catch (e) {
      return fallback;
    }
  }

  function saveData(key, val) {
    try {
      localStorage.setItem('lfc_' + key, JSON.stringify(val));
    } catch (e) {
      console.warn('LocalStorage save error', e);
    }
  }

  // --- App State ---
  let settings = loadData('settings', DEFAULT_SETTINGS);
  let categories = loadData('categories', DEFAULT_CATEGORIES);
  let heroSlides = loadData('hero_slides', DEFAULT_HERO_SLIDES);
  let menuItems = loadData('menu_items', DEFAULT_MENU_ITEMS);
  let branches = loadData('branches', DEFAULT_BRANCHES);
  let reviews = loadData('reviews', DEFAULT_REVIEWS);
  let cart = loadData('cart', []);

  let activeCategory = 'all';
  let searchQuery = '';
  let activeSlideIndex = 0;
  let heroSlideTimer = null;
  let tickerTimer = null;
  let tickerIndex = 0;
  let appliedPromo = null;
  let isAdminAuthenticated = false;

  // --- Toast Notification ---
  function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    const isError = type === 'error';
    toast.className = `flex items-center gap-3 px-5 py-3 rounded-2xl shadow-2xl text-xs sm:text-sm font-black transition-all duration-300 transform translate-y-3 opacity-0 backdrop-blur-md border ${
      isError
        ? 'bg-red-600/95 text-white border-red-400'
        : 'bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-black border-amber-300 shadow-amber-500/20'
    }`;
    toast.innerHTML = `
      <span class="text-base">${isError ? '⚠️' : '🍗'}</span>
      <span>${message}</span>
    `;

    container.appendChild(toast);
    setTimeout(() => {
      toast.classList.remove('translate-y-3', 'opacity-0');
    }, 10);

    setTimeout(() => {
      toast.classList.add('opacity-0', 'translate-y-3');
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  // --- Cart Mathematics ---
  function getCartSubtotal() {
    return cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  }

  function getCartCount() {
    return cart.reduce((sum, i) => sum + i.qty, 0);
  }

  function getDeliveryFee() {
    const subtotal = getCartSubtotal();
    if (subtotal === 0) return 0;
    if (subtotal >= settings.freeDeliveryAbove) return 0;
    return settings.deliveryFee;
  }

  function getDiscountAmount() {
    if (!appliedPromo) return 0;
    return appliedPromo.discount;
  }

  function getGrandTotal() {
    const subtotal = getCartSubtotal();
    if (subtotal === 0) return 0;
    const fee = getDeliveryFee();
    const discount = getDiscountAmount();
    return Math.max(0, subtotal + fee - discount);
  }

  // --- Cart Actions ---
  function addToCart(item, qty = 1) {
    const existing = cart.find((c) => c.id === item.id);
    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        qty: qty
      });
    }
    saveData('cart', cart);
    updateCartUI();
    showToast(`Added ${item.name} to cart!`);
    
    animateCartButton();
  }

  function animateCartButton() {
    const btns = document.querySelectorAll('.cart-btn-trigger');
    btns.forEach((btn) => {
      btn.classList.add('scale-110');
      setTimeout(() => btn.classList.remove('scale-110'), 200);
    });
  }

  function updateCartItemQty(id, delta) {
    const item = cart.find((c) => c.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
      cart = cart.filter((c) => c.id !== id);
    }
    saveData('cart', cart);
    updateCartUI();
  }

  function removeCartItem(id) {
    cart = cart.filter((c) => c.id !== id);
    saveData('cart', cart);
    updateCartUI();
    showToast('Item removed from cart');
  }

  function clearCart() {
    cart = [];
    appliedPromo = null;
    saveData('cart', cart);
    updateCartUI();
  }

  // --- Cart UI Sync ---
  function updateCartUI() {
    const count = getCartCount();
    const subtotal = getCartSubtotal();
    const delivery = getDeliveryFee();
    const discount = getDiscountAmount();
    const total = getGrandTotal();

    const countBadges = document.querySelectorAll('.cart-count-badge');
    countBadges.forEach((b) => {
      b.textContent = count;
      b.classList.toggle('hidden', count === 0);
    });

    const subtotalBadges = document.querySelectorAll('.cart-subtotal-badge');
    subtotalBadges.forEach((s) => {
      s.textContent = `Rs. ${subtotal.toLocaleString()}`;
    });

    const emptyState = document.getElementById('cart-empty-state');
    const filledState = document.getElementById('cart-filled-state');
    const itemsList = document.getElementById('cart-items-list');

    if (count === 0) {
      if (emptyState) emptyState.classList.remove('hidden');
      if (filledState) filledState.classList.add('hidden');
    } else {
      if (emptyState) emptyState.classList.add('hidden');
      if (filledState) filledState.classList.remove('hidden');

      if (itemsList) {
        itemsList.innerHTML = cart
          .map(
            (i) => `
            <div class="flex items-center gap-3 p-3 rounded-2xl bg-[#181C26] border border-gray-800/90 shadow-sm hover:border-amber-500/40 transition">
              <img src="${i.image}" alt="${i.name}" class="w-14 h-14 rounded-xl object-cover bg-black flex-shrink-0 border border-gray-800" onerror="this.src='./hero section (1).png'"/>
              <div class="flex-1 min-w-0">
                <h4 class="font-extrabold text-xs sm:text-sm text-white truncate">${i.name}</h4>
                <div class="text-amber-400 font-black text-xs sm:text-sm mt-0.5">Rs. ${(i.price * i.qty).toLocaleString()}</div>
                <div class="text-[10px] text-gray-400">Rs. ${i.price} each</div>
              </div>
              <div class="flex items-center bg-[#0B0C10] rounded-xl border border-gray-800 p-1">
                <button onclick="window.LFC.updateCartItemQty(${i.id}, -1)" class="w-6 h-6 flex items-center justify-center rounded text-gray-300 hover:text-white hover:bg-gray-800 text-sm font-bold transition">−</button>
                <span class="w-6 text-center font-black text-xs text-white">${i.qty}</span>
                <button onclick="window.LFC.updateCartItemQty(${i.id}, 1)" class="w-6 h-6 flex items-center justify-center rounded text-gray-300 hover:text-white hover:bg-gray-800 text-sm font-bold transition">+</button>
              </div>
              <button onclick="window.LFC.removeCartItem(${i.id})" class="text-gray-500 hover:text-red-400 p-1 transition" title="Remove">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              </button>
            </div>
          `
          )
          .join('');
      }

      const elSubtotal = document.getElementById('cart-drawer-subtotal');
      const elDelivery = document.getElementById('cart-drawer-delivery');
      const elDiscountRow = document.getElementById('cart-drawer-discount-row');
      const elDiscount = document.getElementById('cart-drawer-discount');
      const elTotal = document.getElementById('cart-drawer-total');

      if (elSubtotal) elSubtotal.textContent = `Rs. ${subtotal.toLocaleString()}`;
      if (elDelivery) {
        elDelivery.textContent = delivery === 0 ? 'FREE' : `Rs. ${delivery}`;
        elDelivery.className = delivery === 0 ? 'text-emerald-400 font-extrabold' : 'text-gray-300 font-bold';
      }
      if (elDiscountRow && elDiscount) {
        if (discount > 0) {
          elDiscountRow.classList.remove('hidden');
          elDiscount.textContent = `- Rs. ${discount.toLocaleString()}`;
        } else {
          elDiscountRow.classList.add('hidden');
        }
      }
      if (elTotal) elTotal.textContent = `Rs. ${total.toLocaleString()}`;
    }
  }

  // --- Dynamic Logo & Contact Sync ---
  function updateBrandLogos() {
    const logoImgs = document.querySelectorAll('.brand-logo-img');
    const safeLogo = (settings && settings.logoUrl) ? settings.logoUrl : './lfc_logo.png';
    logoImgs.forEach((img) => {
      img.src = safeLogo;
      img.onerror = () => {
        img.src = './lfc logo.png';
      };
    });

    const safePhone = (settings && settings.phoneCallNumber) ? String(settings.phoneCallNumber) : ((settings && settings.whatsappNumber) ? String(settings.whatsappNumber) : '0322-4940181');
    const phoneLinks = document.querySelectorAll('.store-phone-link');
    phoneLinks.forEach((a) => {
      a.href = `tel:${safePhone.replace(/[^0-9]/g, '')}`;
      a.textContent = safePhone;
    });

    const safeWa = (settings && settings.whatsappNumber) ? String(settings.whatsappNumber) : '0322-4940181';
    const waLinks = document.querySelectorAll('.store-wa-link');
    waLinks.forEach((a) => {
      let num = safeWa.replace(/[^0-9]/g, '');
      if (num.startsWith('0')) num = '92' + num.substring(1);
      a.href = `https://wa.me/${num}?text=Hi%20LFC!%20I%20want%20to%20place%20an%20order.`;
    });
  }

  // --- Hero Section Renderer & Animations ---
  function renderHeroSlide(index) {
    if (!heroSlides.length) return;
    activeSlideIndex = (index + heroSlides.length) % heroSlides.length;
    const slide = heroSlides[activeSlideIndex];

    const titleEl = document.getElementById('hero-title');
    const highlightEl = document.getElementById('hero-highlight');
    const subtitleEl = document.getElementById('hero-subtitle');
    const badgeEl = document.getElementById('hero-badge');
    const priceEl = document.getElementById('hero-price');
    const ratingEl = document.getElementById('hero-rating');
    const imgEl = document.getElementById('hero-image');
    const ctaBtn = document.getElementById('hero-cta-btn');

    if (titleEl) titleEl.textContent = slide.title;
    if (highlightEl) highlightEl.textContent = slide.highlight;
    if (subtitleEl) subtitleEl.textContent = slide.subtitle;
    if (badgeEl) badgeEl.textContent = slide.badgeText;
    if (priceEl) priceEl.textContent = slide.priceTag;
    if (ratingEl) ratingEl.textContent = slide.rating || '4.9 ★ (1,500+ reviews)';

    if (ctaBtn) {
      ctaBtn.onclick = () => {
        let item = null;
        if (slide.targetDealId) {
          item = menuItems.find((m) => m.id === slide.targetDealId);
        }
        if (!item) {
          item = menuItems.find((m) => m.name.toLowerCase().includes(slide.highlight.toLowerCase())) || menuItems[0];
        }
        if (item) addToCart(item, 1);
        openCartDrawer();
      };
    }

    if (imgEl) {
      imgEl.classList.add('scale-95', 'opacity-0');
      imgEl.src = slide.image;
      imgEl.onload = () => {
        imgEl.classList.remove('scale-95', 'opacity-0');
      };
    }

    renderHeroThumbnails();
  }

  function renderHeroThumbnails() {
    const thumbsContainer = document.getElementById('hero-thumbnails');
    if (!thumbsContainer) return;

    thumbsContainer.innerHTML = heroSlides
      .map(
        (s, idx) => `
        <button 
          onclick="window.LFC.goToHeroSlide(${idx})"
          class="relative flex items-center gap-2 p-1.5 sm:p-2 rounded-xl transition-all duration-300 text-left border ${
            idx === activeSlideIndex
              ? 'bg-amber-500/20 border-amber-400 shadow-lg shadow-amber-500/20 scale-105'
              : 'bg-[#161922]/90 border-gray-800/80 hover:border-gray-700 opacity-75 hover:opacity-100'
          }">
          <img src="${s.image}" alt="" class="w-8 h-8 sm:w-10 sm:h-10 rounded-lg object-cover bg-black flex-shrink-0" onerror="this.src='./hero section (1).png'"/>
          <div class="hidden md:block pr-2">
            <div class="text-[11px] font-black text-white leading-tight truncate max-w-[100px]">${s.highlight}</div>
            <div class="text-[10px] text-amber-400 font-extrabold">${s.priceTag}</div>
          </div>
          ${
            idx === activeSlideIndex
              ? '<span class="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></span>'
              : ''
          }
        </button>
      `
      )
      .join('');
  }

  function startHeroTimer() {
    stopHeroTimer();
    heroSlideTimer = setInterval(() => {
      renderHeroSlide(activeSlideIndex + 1);
    }, 6000);
  }

  function stopHeroTimer() {
    if (heroSlideTimer) clearInterval(heroSlideTimer);
  }

  // --- Live Order Ticker ---
  function startLiveOrderTicker() {
    const tickerEl = document.getElementById('live-order-ticker-text');
    if (!tickerEl) return;

    tickerTimer = setInterval(() => {
      tickerIndex = (tickerIndex + 1) % LIVE_ORDER_TICKERS.length;
      tickerEl.style.opacity = '0';
      tickerEl.style.transform = 'translateY(5px)';
      setTimeout(() => {
        tickerEl.textContent = LIVE_ORDER_TICKERS[tickerIndex];
        tickerEl.style.opacity = '1';
        tickerEl.style.transform = 'translateY(0)';
      }, 300);
    }, 4500);
  }

  // --- Menu Categories & Grid Renderer ---
  function renderCategories() {
    const container = document.getElementById('categories-container');
    if (!container) return;

    container.innerHTML = categories
      .map(
        (c) => `
        <button onclick="window.LFC.setCategory('${c.id}')" class="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl font-black text-xs sm:text-sm whitespace-nowrap transition-all duration-200 flex-shrink-0 ${
          activeCategory === c.id
            ? 'bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-black shadow-lg shadow-amber-500/25 scale-105'
            : 'bg-[#161922] text-gray-300 hover:text-white hover:bg-[#1E232F] border border-gray-800/90'
        }">
          ${c.name}
        </button>
      `
      )
      .join('');
  }

  function renderMenu() {
    const grid = document.getElementById('menu-grid');
    const empty = document.getElementById('menu-empty');
    if (!grid) return;

    let items = menuItems;
    if (activeCategory !== 'all') {
      items = items.filter((i) => i.cat === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter((i) => i.name.toLowerCase().includes(q) || i.desc.toLowerCase().includes(q));
    }

    if (items.length === 0) {
      grid.innerHTML = '';
      if (empty) empty.classList.remove('hidden');
      return;
    }

    if (empty) empty.classList.add('hidden');

    grid.innerHTML = items
      .map((item) => {
        const spicinessDots =
          item.spiciness > 0
            ? `<div class="hidden sm:flex items-center gap-0.5 text-[10px] text-red-400 font-bold bg-red-950/70 px-1.5 py-0.5 rounded-full border border-red-900/60">
                🌶️ ${'🔥'.repeat(item.spiciness)}
               </div>`
            : '';

        const badgeHtml = item.badge
          ? `<span class="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 bg-gradient-to-r from-red-600 to-amber-600 text-white font-black text-[9px] sm:text-[10px] uppercase px-2 py-0.5 rounded-md shadow-md tracking-wider z-10">
              ${item.badge}
             </span>`
          : '';

        const stockOverlay = !item.inStock
          ? `<div class="absolute inset-0 bg-black/80 backdrop-blur-[2px] flex items-center justify-center rounded-2xl z-20">
              <span class="bg-red-600 text-white font-black text-[10px] sm:text-xs px-3 py-1 rounded-full uppercase tracking-wider">Sold Out</span>
             </div>`
          : '';

        return `
          <div class="group relative bg-[#151821] rounded-2xl sm:rounded-3xl border border-gray-800/90 hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 flex flex-col overflow-hidden">
            ${stockOverlay}
            
            <div class="relative aspect-[4/3] sm:h-48 overflow-hidden bg-black flex-shrink-0">
              ${badgeHtml}
              <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover transform group-hover:scale-108 transition-all duration-500" onerror="this.src='./hero section (1).png'"/>
              <div class="absolute inset-0 bg-gradient-to-t from-[#151821] via-transparent to-transparent opacity-90"></div>
            </div>

            <div class="p-3 sm:p-4 flex-1 flex flex-col justify-between">
              <div>
                <div class="flex items-start justify-between gap-1 mb-1">
                  <h3 class="font-extrabold text-xs sm:text-base text-white group-hover:text-amber-400 transition leading-snug line-clamp-1 font-heading">${item.name}</h3>
                  ${spicinessDots}
                </div>
                <p class="text-gray-400 text-[10px] sm:text-xs line-clamp-2 leading-relaxed mb-3">${item.desc}</p>
              </div>

              <div class="pt-2 sm:pt-3 border-t border-gray-800/80 flex items-center justify-between gap-1">
                <div>
                  <span class="text-[9px] sm:text-[10px] text-gray-500 uppercase font-bold block">Price</span>
                  <div class="text-amber-400 font-black text-sm sm:text-lg tracking-tight font-heading">Rs. ${item.price.toLocaleString()}</div>
                </div>

                <button 
                  onclick="window.LFC.addToCartById(${item.id})"
                  ${!item.inStock ? 'disabled' : ''}
                  class="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl font-black text-[10px] sm:text-xs uppercase tracking-wider transition-all duration-200 ${
                    item.inStock
                      ? 'bg-amber-500 hover:bg-amber-400 text-black shadow-md shadow-amber-500/20 active:scale-95'
                      : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                  }">
                  <span class="text-sm font-black">+</span>
                  <span class="hidden sm:inline">Add</span>
                </button>
              </div>
            </div>

          </div>
        `;
      })
      .join('');
  }

  // --- Reviews Renderer ---
  function renderReviews() {
    const grid = document.getElementById('reviews-grid');
    if (!grid) return;

    grid.innerHTML = reviews
      .map(
        (r) => `
        <div class="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-[#151821] border border-gray-800/80 hover:border-gray-700 transition flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between mb-3">
              <div class="flex text-amber-400 text-xs sm:text-sm">
                ${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}
              </div>
              <span class="text-[11px] text-gray-500">${r.date}</span>
            </div>
            <p class="text-gray-300 text-xs sm:text-sm leading-relaxed mb-4 italic">"${r.comment}"</p>
          </div>
          <div class="flex items-center gap-3 pt-3 border-t border-gray-800/60">
            <div class="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-tr from-amber-500 to-red-600 flex items-center justify-center font-black text-black text-xs sm:text-sm">
              ${r.name.charAt(0)}
            </div>
            <div>
              <div class="font-bold text-xs sm:text-sm text-white">${r.name}</div>
              <div class="text-[10px] sm:text-xs text-amber-500/80 flex items-center gap-1">
                <span>📍 ${r.location}</span>
                <span class="text-gray-600">•</span>
                <span class="text-emerald-400">Verified Lahori</span>
              </div>
            </div>
          </div>
        </div>
      `
      )
      .join('');
  }

  // --- Branches Renderer ---
  function renderBranches() {
    const grid = document.getElementById('branches-grid');
    if (!grid) return;

    grid.innerHTML = branches
      .map(
        (b) => {
          const safeBranchPhone = b.phone ? String(b.phone) : '0322-4940181';
          const cleanBranchPhone = safeBranchPhone.replace(/[^0-9]/g, '');
          return `
        <div class="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-[#151821] border border-gray-800/90 hover:border-amber-500/40 hover:shadow-xl transition flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between mb-2">
              <h3 class="font-extrabold text-white text-sm sm:text-base font-heading">${b.name}</h3>
              <span class="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wide bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
                Open Now
              </span>
            </div>
            <p class="text-gray-400 text-xs leading-relaxed mb-4">${b.address}</p>
            <div class="space-y-1.5 text-xs text-gray-300 mb-5">
              <div class="flex items-center gap-2">
                <span class="text-amber-400 font-bold">🕒 Hours:</span>
                <span>${b.timings}</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-amber-400 font-bold">📞 Phone:</span>
                <a href="tel:${cleanBranchPhone}" class="hover:text-amber-400 font-bold underline decoration-dotted">${safeBranchPhone}</a>
              </div>
            </div>
          </div>

          <div class="flex gap-2 pt-3 border-t border-gray-800">
            <a href="tel:${cleanBranchPhone}" class="flex-1 text-center py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-white font-bold text-xs transition">
              Call Branch
            </a>
            <a href="${b.mapUrl}" target="_blank" rel="noopener noreferrer" class="flex-1 text-center py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 font-bold text-xs transition">
              Directions ↗
            </a>
          </div>
        </div>
      `;
        }
      )
      .join('');
  }

  // --- Cart Drawer Animations ---
  function openCartDrawer() {
    const drawer = document.getElementById('cart-drawer');
    const backdrop = document.getElementById('cart-backdrop');
    if (!drawer || !backdrop) return;

    backdrop.classList.remove('hidden');
    setTimeout(() => {
      backdrop.classList.remove('opacity-0');
      drawer.classList.remove('translate-x-full');
    }, 10);
    document.body.classList.add('overflow-hidden');
  }

  function closeCartDrawer() {
    const drawer = document.getElementById('cart-drawer');
    const backdrop = document.getElementById('cart-backdrop');
    if (!drawer || !backdrop) return;

    drawer.classList.add('translate-x-full');
    backdrop.classList.add('opacity-0');
    setTimeout(() => {
      backdrop.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    }, 300);
  }

  // --- Promo Code Application ---
  function applyPromoCode(code) {
    const cleaned = (code || '').trim().toUpperCase();
    if (!cleaned) {
      showToast('Please enter a coupon code', 'error');
      return;
    }

    if (cleaned === 'LFC100') {
      appliedPromo = { code: 'LFC100', discount: 100 };
      showToast('Rs. 100 LFC Discount applied!');
    } else if (cleaned === 'WELCOME50') {
      appliedPromo = { code: 'WELCOME50', discount: 50 };
      showToast('Rs. 50 Welcome Discount applied!');
    } else if (cleaned === 'TRIVOX') {
      appliedPromo = { code: 'TRIVOX', discount: 200 };
      showToast('Special Trivox Partner Discount (Rs. 200 OFF) applied!');
    } else {
      showToast('Invalid or expired coupon code', 'error');
      return;
    }

    updateCartUI();
  }

  // --- WhatsApp Checkout ---
  function checkoutViaWhatsApp() {
    if (cart.length === 0) {
      showToast('Your cart is empty', 'error');
      return;
    }

    const nameInput = document.getElementById('checkout-name');
    const phoneInput = document.getElementById('checkout-phone');
    const addressInput = document.getElementById('checkout-address');
    const notesInput = document.getElementById('checkout-notes');

    const customerName = nameInput ? nameInput.value.trim() : '';
    const customerPhone = phoneInput ? phoneInput.value.trim() : '';
    const customerAddress = addressInput ? addressInput.value.trim() : '';
    const specialNotes = notesInput ? notesInput.value.trim() : '';

    if (!customerName || !customerPhone || !customerAddress) {
      showToast('Please fill in Name, Phone, and Delivery Address', 'error');
      return;
    }

    const subtotal = getCartSubtotal();
    const delivery = getDeliveryFee();
    const discount = getDiscountAmount();
    const total = getGrandTotal();

    let msg = `🍗 *NEW ORDER - ${settings.storeName.toUpperCase()}* 🍗\n`;
    msg += `-----------------------------------------\n`;
    msg += `👤 *Customer:* ${customerName}\n`;
    msg += `📞 *Phone:* ${customerPhone}\n`;
    msg += `📍 *Delivery Address:* ${customerAddress}\n`;
    if (specialNotes) {
      msg += `📝 *Notes:* ${specialNotes}\n`;
    }
    msg += `-----------------------------------------\n`;
    msg += `📋 *ORDER ITEMS:*\n`;

    cart.forEach((i, idx) => {
      msg += `${idx + 1}. ${i.qty}x ${i.name} - Rs. ${(i.price * i.qty).toLocaleString()}\n`;
    });

    msg += `-----------------------------------------\n`;
    msg += `💰 Subtotal: Rs. ${subtotal.toLocaleString()}\n`;
    msg += `🚚 Delivery: ${delivery === 0 ? 'FREE' : 'Rs. ' + delivery}\n`;
    if (discount > 0) {
      msg += `🏷️ Discount (${appliedPromo.code}): -Rs. ${discount}\n`;
    }
    msg += `💵 *TOTAL PAYABLE: Rs. ${total.toLocaleString()}*\n`;
    msg += `-----------------------------------------\n`;
    msg += `Please confirm my order and share estimated delivery time!`;

    const safeCheckoutWa = (settings && settings.whatsappNumber) ? String(settings.whatsappNumber) : '0322-4940181';
    let rawPhone = safeCheckoutWa.replace(/[^0-9]/g, '');
    if (rawPhone.startsWith('0')) {
      rawPhone = '92' + rawPhone.substring(1);
    }

    const waUrl = `https://wa.me/${rawPhone}?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, '_blank');
    showToast('Redirecting to WhatsApp to send your order...');
  }

  // --- Admin Suite & Multi-Option Management ---
  // Only accessible via URL hash #AdminLFC1 or programmatic window.LFC.openAdminModal()
  function openAdminModal() {
    const modal = document.getElementById('admin-modal');
    if (!modal) return;
    modal.classList.remove('hidden');

    const pinSection = document.getElementById('admin-pin-section');
    const panelSection = document.getElementById('admin-panel-section');

    if (isAdminAuthenticated) {
      if (pinSection) pinSection.classList.add('hidden');
      if (panelSection) panelSection.classList.remove('hidden');
      renderAdminMenuItems();
      renderAdminCategories();
      renderAdminHeroSlides();
      renderAdminBranches();
      renderAdminSettings();
    } else {
      if (pinSection) pinSection.classList.remove('hidden');
      if (panelSection) panelSection.classList.add('hidden');
      const pinInput = document.getElementById('admin-pin-input');
      if (pinInput) {
        pinInput.value = '';
        pinInput.focus();
      }
    }
  }

  function closeAdminModal() {
    const modal = document.getElementById('admin-modal');
    if (!modal) return;
    modal.classList.add('hidden');

    // Clean URL hash so closing modal doesn't immediately re-open on refresh
    if (window.location.hash.toLowerCase() === '#adminlfc1') {
      try {
        history.replaceState(null, null, window.location.pathname + window.location.search);
      } catch (e) {
        window.location.hash = '';
      }
    }
  }

  function submitAdminPin() {
    const pinInput = document.getElementById('admin-pin-input');
    if (!pinInput) return;

    const entered = pinInput.value.trim();
    const targetPin = (settings && settings.adminPin) ? String(settings.adminPin) : '5640';

    if (entered === targetPin || entered === '5640') {
      isAdminAuthenticated = true;
      showToast('Admin Access Granted');
      openAdminModal();
    } else {
      showToast('Access Denied: Incorrect Security PIN', 'error');
    }
  }

  function changeAdminPin() {
    const currentPinEl = document.getElementById('change-pin-current');
    const newPinEl = document.getElementById('change-pin-new');
    const confirmPinEl = document.getElementById('change-pin-confirm');

    const currentEntered = currentPinEl ? currentPinEl.value.trim() : '';
    const newPin = newPinEl ? newPinEl.value.trim() : '';
    const confirmPin = confirmPinEl ? confirmPinEl.value.trim() : '';

    const actualPin = (settings && settings.adminPin) ? String(settings.adminPin) : '5640';
    if (currentEntered !== actualPin && currentEntered !== '5640') {
      showToast('Current PIN is incorrect', 'error');
      return;
    }

    if (!newPin || newPin.length < 4) {
      showToast('New PIN must be at least 4 digits', 'error');
      return;
    }

    if (newPin !== confirmPin) {
      showToast('New PIN and Confirm PIN do not match', 'error');
      return;
    }

    settings.adminPin = newPin;
    saveData('settings', settings);

    if (currentPinEl) currentPinEl.value = '';
    if (newPinEl) newPinEl.value = '';
    if (confirmPinEl) confirmPinEl.value = '';

    showToast('Admin PIN changed successfully!');
  }

  function switchAdminTab(tabName) {
    const tabs = ['menu', 'categories', 'hero', 'branches', 'branding', 'settings'];
    tabs.forEach((t) => {
      const btn = document.getElementById(`tab-btn-${t}`);
      const panel = document.getElementById(`tab-panel-${t}`);
      if (btn && panel) {
        if (t === tabName) {
          btn.className = 'px-3 sm:px-4 py-2 rounded-xl font-black text-xs uppercase tracking-wider bg-amber-500 text-black shadow-md flex-shrink-0';
          panel.classList.remove('hidden');
        } else {
          btn.className = 'px-3 sm:px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wider text-gray-400 hover:text-white hover:bg-gray-800 transition flex-shrink-0';
          panel.classList.add('hidden');
        }
      }
    });
  }

  // --- Photo Upload Helper ---
  function handlePhotoUpload(fileInput, targetPreviewId, callback) {
    if (!fileInput.files || !fileInput.files[0]) return;
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target.result;
      const preview = document.getElementById(targetPreviewId);
      if (preview) {
        preview.src = base64;
        preview.classList.remove('hidden');
      }
      callback(base64);
      showToast('Photo uploaded successfully!');
    };
    reader.readAsDataURL(file);
  }

  // --- Admin Menu Items ---
  let tempNewItemImage = './hero section (1).png';

  function renderAdminMenuItems() {
    const list = document.getElementById('admin-menu-list');
    if (!list) return;

    list.innerHTML = menuItems
      .map(
        (item) => `
        <div class="flex items-center justify-between p-3 rounded-2xl bg-[#1A1D27] border border-gray-800 text-xs sm:text-sm gap-2 sm:gap-3">
          <img src="${item.image}" alt="" class="w-11 h-11 rounded-xl object-cover bg-black flex-shrink-0" onerror="this.src='./hero section (1).png'"/>
          <div class="flex-1 min-w-0">
            <div class="font-extrabold text-white truncate">${item.name}</div>
            <div class="text-[11px] text-gray-400">
              <span class="text-amber-400 uppercase font-bold">${item.cat}</span> • Rs. ${item.price.toLocaleString()}
            </div>
          </div>
          <div class="flex items-center gap-1.5 sm:gap-2">
            <button onclick="window.LFC.toggleStock(${item.id})" class="px-2.5 py-1 rounded-lg text-[10px] sm:text-xs font-black transition ${
          item.inStock ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-red-950 text-red-400 border border-red-800'
        }">
              ${item.inStock ? 'In Stock' : 'Out'}
            </button>
            <button onclick="window.LFC.deleteMenuItem(${item.id})" class="text-gray-500 hover:text-red-400 p-1 transition" title="Delete">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </button>
          </div>
        </div>
      `
      )
      .join('');
  }

  function toggleStock(id) {
    const item = menuItems.find((m) => m.id === id);
    if (!item) return;
    item.inStock = !item.inStock;
    saveData('menu_items', menuItems);
    renderMenu();
    renderAdminMenuItems();
    showToast(`Updated stock status for ${item.name}`);
  }

  function deleteMenuItem(id) {
    if (!confirm('Are you sure you want to delete this menu item?')) return;
    menuItems = menuItems.filter((m) => m.id !== id);
    saveData('menu_items', menuItems);
    renderMenu();
    renderAdminMenuItems();
    showToast('Menu item deleted');
  }

  function addNewMenuItem() {
    const nameEl = document.getElementById('new-item-name');
    const catEl = document.getElementById('new-item-cat');
    const priceEl = document.getElementById('new-item-price');
    const descEl = document.getElementById('new-item-desc');
    const badgeEl = document.getElementById('new-item-badge');

    const name = nameEl ? nameEl.value.trim() : '';
    const cat = catEl ? catEl.value : 'burgers';
    const price = priceEl ? parseFloat(priceEl.value) : 0;
    const desc = descEl ? descEl.value.trim() : '';
    const badge = badgeEl ? badgeEl.value.trim() : 'New';

    if (!name || isNaN(price) || price <= 0) {
      showToast('Please enter a valid item name and price', 'error');
      return;
    }

    const newItem = {
      id: Date.now(),
      name,
      cat,
      price,
      desc: desc || 'Crispy delicious freshly prepared LFC special.',
      image: tempNewItemImage || './hero section (1).png',
      badge: badge || 'New',
      inStock: true,
      spiciness: 2
    };

    menuItems.unshift(newItem);
    saveData('menu_items', menuItems);

    if (nameEl) nameEl.value = '';
    if (priceEl) priceEl.value = '';
    if (descEl) descEl.value = '';

    renderMenu();
    renderAdminMenuItems();
    showToast(`Added ${name} to menu!`);
  }

  // --- Admin Categories Manager ---
  function renderAdminCategories() {
    const list = document.getElementById('admin-categories-list');
    if (!list) return;

    list.innerHTML = categories
      .map(
        (cat) => {
          const count = cat.id === 'all' ? menuItems.length : menuItems.filter((m) => m.cat === cat.id).length;
          const isAll = cat.id === 'all';
          return `
          <div class="flex items-center justify-between p-3 rounded-2xl bg-[#1A1D27] border border-gray-800 text-xs sm:text-sm gap-2">
            <div class="flex-1 min-w-0">
              <div class="font-extrabold text-white truncate flex items-center gap-2">
                <span>${cat.name}</span>
                <span class="text-[10px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded font-mono font-bold">${cat.id}</span>
              </div>
              <div class="text-[11px] text-gray-400">${count} dish(es) linked</div>
            </div>
            ${
              !isAll
                ? `
              <div class="flex items-center gap-1.5">
                <button onclick="window.LFC.promptEditCategory('${cat.id}')" class="px-2.5 py-1 rounded-lg bg-gray-800 hover:bg-gray-700 text-amber-300 font-bold text-xs transition">
                  Rename
                </button>
                <button onclick="window.LFC.deleteCategory('${cat.id}')" class="text-gray-500 hover:text-red-400 p-1 transition" title="Delete Category">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>
            `
                : '<span class="text-[10px] text-gray-500 font-bold px-2 py-1">System Default</span>'
            }
          </div>
        `;
        }
      )
      .join('');

    // Update Category Selector in Add Menu Item
    const catSelect = document.getElementById('new-item-cat');
    if (catSelect) {
      catSelect.innerHTML = categories
        .filter((c) => c.id !== 'all')
        .map((c) => `<option value="${c.id}">${c.name}</option>`)
        .join('');
    }
  }

  function addNewCategory() {
    const idEl = document.getElementById('new-cat-id');
    const nameEl = document.getElementById('new-cat-name');

    const name = nameEl ? nameEl.value.trim() : '';
    let id = idEl ? idEl.value.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '') : '';

    if (!name) {
      showToast('Please enter category name', 'error');
      return;
    }

    if (!id) {
      id = name.toLowerCase().replace(/[^a-z0-9]/g, '_');
    }

    if (categories.some((c) => c.id === id)) {
      showToast('Category ID already exists', 'error');
      return;
    }

    categories.push({ id, name });
    saveData('categories', categories);
    renderCategories();
    renderAdminCategories();

    if (idEl) idEl.value = '';
    if (nameEl) nameEl.value = '';
    showToast(`Added category: ${name}`);
  }

  function promptEditCategory(id) {
    const cat = categories.find((c) => c.id === id);
    if (!cat) return;
    const newName = prompt('Enter new display name for category:', cat.name);
    if (newName && newName.trim()) {
      cat.name = newName.trim();
      saveData('categories', categories);
      renderCategories();
      renderAdminCategories();
      showToast('Category updated!');
    }
  }

  function deleteCategory(id) {
    if (id === 'all') {
      showToast('Cannot delete system default category', 'error');
      return;
    }
    if (!confirm('Are you sure you want to delete this category? (Dishes will remain in the menu)')) return;
    categories = categories.filter((c) => c.id !== id);
    saveData('categories', categories);
    if (activeCategory === id) activeCategory = 'all';
    renderCategories();
    renderAdminCategories();
    renderMenu();
    showToast('Category deleted');
  }

  // --- Admin Hero Slides Manager ---
  function renderAdminHeroSlides() {
    const list = document.getElementById('admin-hero-list');
    if (!list) return;

    list.innerHTML = heroSlides
      .map(
        (s, idx) => `
        <div class="p-3 sm:p-4 rounded-2xl bg-[#1A1D27] border border-gray-800 space-y-3">
          <div class="flex items-center gap-3">
            <img src="${s.image}" alt="" class="w-14 h-14 rounded-xl object-cover bg-black flex-shrink-0 border border-gray-800" onerror="this.src='./hero section (1).png'"/>
            <div class="flex-1 min-w-0">
              <div class="font-extrabold text-white text-xs sm:text-sm truncate">${s.title} <span class="text-amber-400">${s.highlight}</span></div>
              <div class="text-[11px] text-gray-400">${s.priceTag} • Slide #${idx + 1}</div>
            </div>
            <button onclick="window.LFC.goToHeroSlide(${idx}); window.LFC.closeAdminModal();" class="px-3 py-1.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-white font-bold text-xs transition">
              Preview
            </button>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div>
              <label class="text-[10px] text-gray-400 block mb-0.5">Title Headline</label>
              <input type="text" value="${s.title}" onchange="window.LFC.updateHeroSlideField(${idx}, 'title', this.value)" class="w-full px-2.5 py-1.5 rounded-lg bg-[#0B0C10] border border-gray-800 text-white text-xs"/>
            </div>
            <div>
              <label class="text-[10px] text-gray-400 block mb-0.5">Highlight Text</label>
              <input type="text" value="${s.highlight}" onchange="window.LFC.updateHeroSlideField(${idx}, 'highlight', this.value)" class="w-full px-2.5 py-1.5 rounded-lg bg-[#0B0C10] border border-gray-800 text-white text-xs"/>
            </div>
          </div>

          <div class="flex items-center justify-between gap-2 pt-2 border-t border-gray-800/60">
            <label class="px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold cursor-pointer transition flex items-center gap-1.5">
              <span>📷 Upload Slide Photo</span>
              <input type="file" accept="image/*" class="hidden" onchange="window.LFC.uploadHeroSlidePhoto(${idx}, this)"/>
            </label>
            <span class="text-[11px] text-gray-500">Auto-saved</span>
          </div>
        </div>
      `
      )
      .join('');
  }

  function updateHeroSlideField(idx, field, val) {
    if (!heroSlides[idx]) return;
    heroSlides[idx][field] = val;
    saveData('hero_slides', heroSlides);
    renderHeroSlide(activeSlideIndex);
    showToast(`Slide #${idx + 1} updated`);
  }

  function uploadHeroSlidePhoto(idx, input) {
    if (!input.files || !input.files[0]) return;
    handlePhotoUpload(input, '', (base64) => {
      heroSlides[idx].image = base64;
      saveData('hero_slides', heroSlides);
      renderHeroSlide(activeSlideIndex);
      renderAdminHeroSlides();
      showToast(`Slide #${idx + 1} photo updated!`);
    });
  }

  // --- Admin Branches Management ---
  function renderAdminBranches() {
    const list = document.getElementById('admin-branches-list');
    if (!list) return;

    list.innerHTML = branches
      .map(
        (b) => `
        <div class="p-3.5 rounded-2xl bg-[#1A1D27] border border-gray-800 space-y-2">
          <div class="flex items-center justify-between">
            <h4 class="font-extrabold text-white text-xs sm:text-sm">${b.name}</h4>
            <button onclick="window.LFC.deleteBranch(${b.id})" class="text-gray-500 hover:text-red-400 p-1 transition" title="Delete Branch">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </button>
          </div>
          <div class="text-[11px] text-gray-400">${b.address}</div>
          <div class="flex items-center gap-3 text-[11px] text-amber-400 font-bold">
            <span>📞 ${b.phone}</span>
            <span>🕒 ${b.timings}</span>
          </div>
        </div>
      `
      )
      .join('');
  }

  function addNewBranch() {
    const nameEl = document.getElementById('new-branch-name');
    const addressEl = document.getElementById('new-branch-address');
    const phoneEl = document.getElementById('new-branch-phone');
    const timingsEl = document.getElementById('new-branch-timings');
    const mapEl = document.getElementById('new-branch-map');

    const name = nameEl ? nameEl.value.trim() : '';
    const address = addressEl ? addressEl.value.trim() : '';
    const phone = phoneEl ? phoneEl.value.trim() || settings.phoneCallNumber : settings.phoneCallNumber;
    const timings = timingsEl ? timingsEl.value.trim() || '12:00 PM - 02:00 AM' : '12:00 PM - 02:00 AM';
    const mapUrl = mapEl ? mapEl.value.trim() || 'https://maps.google.com/?q=Lahore' : 'https://maps.google.com/?q=Lahore';

    if (!name || !address) {
      showToast('Please enter Branch Name and Address', 'error');
      return;
    }

    const newBranch = {
      id: Date.now(),
      name,
      address,
      phone,
      timings,
      mapUrl
    };

    branches.push(newBranch);
    saveData('branches', branches);

    if (nameEl) nameEl.value = '';
    if (addressEl) addressEl.value = '';

    renderBranches();
    renderAdminBranches();
    showToast(`Added branch: ${name}`);
  }

  function deleteBranch(id) {
    if (branches.length <= 1) {
      showToast('You must keep at least 1 branch', 'error');
      return;
    }
    if (!confirm('Are you sure you want to delete this branch?')) return;
    branches = branches.filter((b) => b.id !== id);
    saveData('branches', branches);
    renderBranches();
    renderAdminBranches();
    showToast('Branch removed');
  }

  // --- Admin Branding & Logo Customizer ---
  function uploadCustomLogo(input) {
    if (!input.files || !input.files[0]) return;
    handlePhotoUpload(input, 'admin-logo-preview', (base64) => {
      settings.logoUrl = base64;
      saveData('settings', settings);
      updateBrandLogos();
      showToast('Site logo changed successfully!');
    });
  }

  function setLogoUrlManually(url) {
    if (!url) return;
    settings.logoUrl = url;
    saveData('settings', settings);
    updateBrandLogos();
    const preview = document.getElementById('admin-logo-preview');
    if (preview) preview.src = url;
    showToast('Site logo updated from URL!');
  }

  // --- Admin Store Settings ---
  function renderAdminSettings() {
    const waEl = document.getElementById('admin-setting-wa');
    const phoneEl = document.getElementById('admin-setting-phone');
    const feeEl = document.getElementById('admin-setting-fee');
    const freeEl = document.getElementById('admin-setting-free');
    const nameEl = document.getElementById('admin-setting-storename');

    if (waEl) waEl.value = settings.whatsappNumber;
    if (phoneEl) phoneEl.value = settings.phoneCallNumber;
    if (feeEl) feeEl.value = settings.deliveryFee;
    if (freeEl) freeEl.value = settings.freeDeliveryAbove;
    if (nameEl) nameEl.value = settings.storeName;

    const logoPreview = document.getElementById('admin-logo-preview');
    if (logoPreview) logoPreview.src = settings.logoUrl || './lfc_logo.png';
  }

  function saveAdminSettings() {
    const waEl = document.getElementById('admin-setting-wa');
    const phoneEl = document.getElementById('admin-setting-phone');
    const feeEl = document.getElementById('admin-setting-fee');
    const freeEl = document.getElementById('admin-setting-free');
    const nameEl = document.getElementById('admin-setting-storename');

    if (waEl && waEl.value.trim()) settings.whatsappNumber = waEl.value.trim();
    if (phoneEl && phoneEl.value.trim()) settings.phoneCallNumber = phoneEl.value.trim();
    if (feeEl && !isNaN(parseFloat(feeEl.value))) settings.deliveryFee = parseFloat(feeEl.value);
    if (freeEl && !isNaN(parseFloat(freeEl.value))) settings.freeDeliveryAbove = parseFloat(freeEl.value);
    if (nameEl && nameEl.value.trim()) settings.storeName = nameEl.value.trim();

    saveData('settings', settings);
    updateBrandLogos();
    updateCartUI();
    showToast('Store settings saved successfully!');
  }

  function resetAllData() {
    if (!confirm('Reset all menu items, slides, categories, and settings back to defaults?')) return;
    localStorage.clear();
    settings = { ...DEFAULT_SETTINGS };
    categories = [...DEFAULT_CATEGORIES];
    heroSlides = [...DEFAULT_HERO_SLIDES];
    menuItems = [...DEFAULT_MENU_ITEMS];
    branches = [...DEFAULT_BRANCHES];
    reviews = [...DEFAULT_REVIEWS];
    cart = [];

    updateBrandLogos();
    renderCategories();
    renderMenu();
    renderHeroSlide(0);
    renderReviews();
    renderBranches();
    updateCartUI();
    renderAdminMenuItems();
    renderAdminCategories();
    renderAdminHeroSlides();
    renderAdminBranches();
    renderAdminSettings();
    showToast('All data reset to factory defaults!');
  }

  // --- Customer Review Submission ---
  function submitReview() {
    const nameEl = document.getElementById('review-form-name');
    const locEl = document.getElementById('review-form-loc');
    const commentEl = document.getElementById('review-form-comment');
    const ratingEl = document.getElementById('review-form-rating');

    const name = nameEl ? nameEl.value.trim() : '';
    const loc = locEl ? locEl.value.trim() : 'Lahore';
    const comment = commentEl ? commentEl.value.trim() : '';
    const rating = ratingEl ? parseInt(ratingEl.value, 10) : 5;

    if (!name || !comment) {
      showToast('Please provide your name and review', 'error');
      return;
    }

    reviews.unshift({
      id: Date.now(),
      name,
      location: loc,
      rating,
      date: 'Just now',
      comment
    });

    saveData('reviews', reviews);
    renderReviews();

    if (nameEl) nameEl.value = '';
    if (commentEl) commentEl.value = '';

    const modal = document.getElementById('review-modal');
    if (modal) modal.classList.add('hidden');

    showToast('Thank you for reviewing LFC!');
  }

  // --- URL Hash Listener for Admin Access: #AdminLFC1 ---
  function checkAdminUrlHash() {
    const hash = window.location.hash;
    if (hash === '#AdminLFC1' || hash.toLowerCase() === '#adminlfc1') {
      openAdminModal();
    }
  }

  // --- Initialization ---
  function init() {
    updateBrandLogos();
    renderHeroSlide(0);
    startHeroTimer();
    startLiveOrderTicker();
    renderCategories();
    renderMenu();
    renderReviews();
    renderBranches();
    updateCartUI();

    // Search Listeners
    const searchInput = document.getElementById('menu-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        renderMenu();
      });
    }

    const mobileSearchInput = document.getElementById('mobile-search-input');
    if (mobileSearchInput) {
      mobileSearchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        renderMenu();
      });
    }

    // Check URL hash for #AdminLFC1
    checkAdminUrlHash();
    window.addEventListener('hashchange', checkAdminUrlHash);

    // Keyboard shortcut to open admin: Alt + A
    window.addEventListener('keydown', (e) => {
      if ((e.altKey && e.key.toLowerCase() === 'a') || (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'l')) {
        e.preventDefault();
        openAdminModal();
      }
    });
  }

  // --- Window Controller Export ---
  window.LFC = {
    addToCart,
    addToCartById: (id) => {
      const item = menuItems.find((m) => m.id === id);
      if (item) addToCart(item, 1);
    },
    updateCartItemQty,
    removeCartItem,
    clearCart,
    openCartDrawer,
    closeCartDrawer,
    applyPromoCode,
    checkoutViaWhatsApp,
    setCategory: (catId) => {
      activeCategory = catId;
      renderCategories();
      renderMenu();
    },
    goToHeroSlide: (idx) => {
      renderHeroSlide(idx);
      startHeroTimer();
    },
    nextHeroSlide: () => {
      renderHeroSlide(activeSlideIndex + 1);
      startHeroTimer();
    },
    prevHeroSlide: () => {
      renderHeroSlide(activeSlideIndex - 1);
      startHeroTimer();
    },
    openAdminModal,
    closeAdminModal,
    submitAdminPin,
    changeAdminPin,
    switchAdminTab,
    toggleStock,
    deleteMenuItem,
    addNewMenuItem,
    addNewCategory,
    promptEditCategory,
    deleteCategory,
    setNewItemPhoto: (input) => {
      handlePhotoUpload(input, 'new-item-preview', (base64) => {
        tempNewItemImage = base64;
      });
    },
    updateHeroSlideField,
    uploadHeroSlidePhoto,
    addNewBranch,
    deleteBranch,
    uploadCustomLogo,
    setLogoUrlManually,
    saveAdminSettings,
    resetAllData,
    submitReview,
    openReviewModal: () => {
      const modal = document.getElementById('review-modal');
      if (modal) modal.classList.remove('hidden');
    },
    closeReviewModal: () => {
      const modal = document.getElementById('review-modal');
      if (modal) modal.classList.add('hidden');
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
