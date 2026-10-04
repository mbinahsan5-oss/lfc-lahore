export interface Category {
  id: string;
  name: string;
  icon?: string;
  isCustom?: boolean;
}

export interface MenuItem {
  id: number;
  name: string;
  cat: string;
  price: number;
  desc: string;
  image: string;
  badge?: string;
  inStock: boolean;
  spiciness?: number; // 0 to 3
}

export interface HeroSlide {
  id: number;
  title: string;
  highlight: string;
  subtitle: string;
  badgeText: string;
  image: string;
  priceTag?: string;
  ctaText?: string;
  ctaLink?: string;
}

export interface BranchLocation {
  id: number;
  name: string;
  area: string;
  address: string;
  phone: string;
  timing: string;
  mapUrl?: string;
  isOpen: boolean;
}

export interface PromoCode {
  code: string;
  discount: number; // e.g. 0.15 for 15%
  minOrder: number;
  description: string;
  active: boolean;
}

export interface CartItem extends MenuItem {
  qty: number;
}

export interface StoreSettings {
  announcementBadge: string;
  announcementText: string;
  showAnnouncement: boolean;
  whatsappNumber: string;
  phoneHotline?: string;
  logoUrl?: string;
  deliveryFee: number;
  freeDeliveryThreshold: number;
  minOrderAmount: number;
  currencySymbol: string;
  storeOpen: boolean;
  adminPin: string;
}
