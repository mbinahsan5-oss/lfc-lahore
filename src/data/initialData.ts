import { Category, MenuItem, HeroSlide, BranchLocation, PromoCode, StoreSettings } from '../types';

export const DEFAULT_CATEGORIES: Category[] = [
  { id: 'all', name: 'All' },
  { id: 'burgers', name: 'Burgers' },
  { id: 'rolls', name: 'Rolls' },
  { id: 'pizzas', name: 'Pizzas' },
  { id: 'buckets', name: 'Buckets' },
  { id: 'deals', name: 'Deals' },
  { id: 'sides', name: 'Sides & Drinks' }
];

export const DEFAULT_HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    title: 'THE ULTIMATE CRISPY',
    highlight: 'FAMILY FEAST',
    subtitle: 'Signature Zinger burger, golden crunch bucket, cheesy pizza slice, paratha roll and tender strips in one legendary combo.',
    badgeText: '#1 Crispy Chicken in Lahore',
    image: './hero section (1).png',
    priceTag: 'Rs. 2,890',
    ctaText: 'Order Feast Now',
    ctaLink: '#menu'
  },
  {
    id: 2,
    title: 'LFC CRISPY CHICKEN',
    highlight: 'ZINGER ROLL',
    subtitle: 'Tender golden crispy chicken strips wrapped in a freshly grilled flaky paratha with signature garlic sauce and sliced onions.',
    badgeText: 'Lahore Street Special',
    image: './hero section (2).png',
    priceTag: 'Rs. 380',
    ctaText: 'Grab A Roll',
    ctaLink: '#menu'
  },
  {
    id: 3,
    title: 'HOT EXTRA CHEESY',
    highlight: 'LOADED PIZZA',
    subtitle: 'Loaded with premium mozzarella cheese pull, spicy grilled chicken cubes, black olives and sliced crunchy capsicums.',
    badgeText: 'Chef Recommended',
    image: './hero section (3).png',
    priceTag: 'Rs. 1,290',
    ctaText: 'Order Hot Pizza',
    ctaLink: '#menu'
  },
  {
    id: 4,
    title: '9-PIECE SIGNATURE',
    highlight: 'ZINGER BUCKET',
    subtitle: 'Nine pieces of legendary 12-spice recipe fried chicken, sizzling hot and super juicy inside with ultra-crunchy crust.',
    badgeText: 'Weekend Bestseller',
    image: './hero section (4).png',
    priceTag: 'Rs. 1,850',
    ctaText: 'Get The Bucket',
    ctaLink: '#menu'
  }
];

export const DEFAULT_MENU_ITEMS: MenuItem[] = [
  {
    id: 1,
    name: 'Crispy Zinger Burger',
    cat: 'Burgers',
    price: 490,
    desc: 'Whole chicken breast fillet marinated in authentic spices, deep-fried to golden perfection, topped with crisp lettuce and spicy mayo in a toasted sesame bun.',
    image: './hero section (1).png',
    badge: 'Bestseller',
    inStock: true,
    spiciness: 2
  },
  {
    id: 2,
    name: 'Zinger Paratha Roll',
    cat: 'Rolls',
    price: 380,
    desc: 'Golden crispy chicken strips wrapped inside a flaky, pan-toasted paratha, drizzled with spicy garlic sauce, sweet chili glaze, and onions.',
    image: './hero section (2).png',
    badge: 'Popular',
    inStock: true,
    spiciness: 2
  },
  {
    id: 3,
    name: 'Extra Cheese Loaded Pizza',
    cat: 'Pizzas',
    price: 1290,
    desc: 'Stretchy golden mozzarella cheese pull, seasoned chicken fajita chunks, black olives, bell peppers, oregano and secret herb tomato sauce.',
    image: './hero section (3).png',
    badge: 'Chef Special',
    inStock: true,
    spiciness: 1
  },
  {
    id: 4,
    name: '9-Piece Zinger Bucket',
    cat: 'Buckets',
    price: 1850,
    desc: 'Nine pieces of our secret-recipe bone-in fried chicken (legs & thighs), intensely crispy on the outside and juicy on the inside, with 2 garlic dips.',
    image: './hero section (4).png',
    badge: 'Mega Value',
    inStock: true,
    spiciness: 2
  },
  {
    id: 5,
    name: 'Tower Burger Supreme',
    cat: 'Burgers',
    price: 690,
    desc: 'Double crunchy chicken breast patties, melted cheddar cheese slice, golden hash brown, and smokey BBQ chipotle glaze.',
    image: './hero section (1).png',
    badge: 'Double Patty',
    inStock: true,
    spiciness: 3
  },
  {
    id: 6,
    name: 'Spicy Chicken Tender Strips (5 Pcs)',
    cat: 'Buckets',
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
    cat: 'Pizzas',
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
    cat: 'Rolls',
    price: 410,
    desc: 'Crispy fried chicken tenders rolled with creamy garlic mayonnaise, pickled gherkins, and crunchy ice-cold shredded cabbage.',
    image: './hero section (2).png',
    badge: 'Creamy',
    inStock: true,
    spiciness: 1
  },
  {
    id: 9,
    name: 'Family Feast Combo Deal',
    cat: 'Deals',
    price: 2890,
    desc: '4 Crispy Zinger Burgers, 4 Pieces Golden Fried Chicken, 1 Jumbo Fries, 2 Paratha Rolls, and 1.5L Chilled Soft Drink.',
    image: './hero section (1).png',
    badge: 'Save 25%',
    inStock: true,
    spiciness: 2
  },
  {
    id: 10,
    name: 'Couple Crunch Deal',
    cat: 'Deals',
    price: 1450,
    desc: '2 Zinger Burgers, 2 Pc Fried Chicken, 1 Large Fries, and 2 Soft Drink cans (250ml).',
    image: './hero section (4).png',
    badge: 'Duo Deal',
    inStock: true,
    spiciness: 2
  },
  {
    id: 11,
    name: 'Peri Peri Masala Fries',
    cat: 'Sides & Drinks',
    price: 240,
    desc: 'Thick crinkle-cut golden potatoes tossed in hot Lahori peri-peri spice dust with spicy garlic dip.',
    image: './hero section (1).png',
    badge: 'Hot Side',
    inStock: true,
    spiciness: 2
  },
  {
    id: 12,
    name: 'Chilled Soft Drink (1.5 Liter)',
    cat: 'Sides & Drinks',
    price: 220,
    desc: 'Ice-cold carbonated beverage (Coke / Sprite / Fanta) to complement your hot crispy chicken feast.',
    image: './hero section (4).png',
    badge: 'Chilled',
    inStock: true,
    spiciness: 0
  }
];

export const DEFAULT_LOCATIONS: BranchLocation[] = [
  {
    id: 101,
    name: 'Gulberg III Main Branch',
    area: 'Gulberg',
    address: 'Main Boulevard, Opposite Liberty Roundabout, Gulberg III, Lahore',
    phone: '0322-4940181',
    timing: '12:00 PM - 02:30 AM',
    mapUrl: 'https://maps.google.com/?q=Liberty+Market+Gulberg+Lahore',
    isOpen: true
  },
  {
    id: 102,
    name: 'DHA Phase 5 Outlet',
    area: 'DHA',
    address: 'Commercial Broadway, Sector C, Phase 5 DHA, Lahore',
    phone: '0322-4940181',
    timing: '12:00 PM - 03:30 AM',
    mapUrl: 'https://maps.google.com/?q=DHA+Phase+5+Commercial+Broadway+Lahore',
    isOpen: true
  },
  {
    id: 103,
    name: 'Johar Town Branch',
    area: 'Johar Town',
    address: 'G-3 Market, Main Boulevard Road, Johar Town, Lahore',
    phone: '0322-4940181',
    timing: '01:00 PM - 02:00 AM',
    mapUrl: 'https://maps.google.com/?q=G-3+Market+Johar+Town+Lahore',
    isOpen: true
  },
  {
    id: 104,
    name: 'MM Alam Road Flagship',
    area: 'Gulberg',
    address: 'Near Hussain Chowk, MM Alam Road, Gulberg II, Lahore',
    phone: '0322-4940181',
    timing: '12:00 PM - 03:00 AM',
    mapUrl: 'https://maps.google.com/?q=MM+Alam+Road+Lahore',
    isOpen: true
  },
  {
    id: 105,
    name: 'Bahria Town Safari Outlet',
    area: 'Bahria Town',
    address: 'Safari Villas Commercial, Bahria Town, Lahore',
    phone: '0322-4940181',
    timing: '01:00 PM - 01:30 AM',
    mapUrl: 'https://maps.google.com/?q=Bahria+Town+Safari+Villas+Lahore',
    isOpen: true
  }
];

export const DEFAULT_PROMOS: PromoCode[] = [
  {
    code: 'LFC15',
    discount: 0.15,
    minOrder: 1000,
    description: 'Flat 15% OFF on orders above Rs. 1000',
    active: true
  },
  {
    code: 'CRUNCH20',
    discount: 0.20,
    minOrder: 2000,
    description: '20% Mega Savings on Family Orders over Rs. 2000',
    active: true
  },
  {
    code: 'WELCOME10',
    discount: 0.10,
    minOrder: 500,
    description: '10% Welcome Discount for new customers',
    active: true
  }
];

export const DEFAULT_SETTINGS: StoreSettings = {
  announcementBadge: 'Hot Deal',
  announcementText: '🔥 Flat 15% OFF on Family Bundles | Use Promo Code: LFC15',
  showAnnouncement: true,
  whatsappNumber: '923224940181',
  phoneHotline: '0322-4940181',
  logoUrl: '',
  deliveryFee: 150,
  freeDeliveryThreshold: 2500,
  minOrderAmount: 300,
  currencySymbol: 'Rs.',
  storeOpen: true,
  adminPin: '1234'
};
