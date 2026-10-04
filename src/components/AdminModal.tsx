import React, { useState } from 'react';
import {
  X,
  Plus,
  Trash2,
  Edit2,
  Image as ImageIcon,
  Check,
  AlertCircle,
  Tag,
  MapPin,
  Ticket,
  Sliders,
  Store,
  DollarSign,
  Phone,
  Shield,
  Layers,
  ArrowUp,
  ArrowDown,
  Sparkles,
  Upload,
  RefreshCw,
  Eye,
  CheckCircle2,
  Flame,
  Copy
} from 'lucide-react';
import {
  Category,
  MenuItem,
  HeroSlide,
  BranchLocation,
  PromoCode,
  StoreSettings
} from '../types';
import { LFCLogo } from './LFCLogo';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  menuItems: MenuItem[];
  heroSlides: HeroSlide[];
  locations: BranchLocation[];
  promos: PromoCode[];
  settings: StoreSettings;
  onUpdateCategories: (cats: Category[]) => void;
  onUpdateMenuItems: (items: MenuItem[]) => void;
  onUpdateHeroSlides: (slides: HeroSlide[]) => void;
  onUpdateLocations: (locs: BranchLocation[]) => void;
  onUpdatePromos: (promos: PromoCode[]) => void;
  onUpdateSettings: (settings: StoreSettings) => void;
  onResetDefaults: () => void;
}

type AdminTab =
  | 'overview'
  | 'menu'
  | 'hero'
  | 'categories'
  | 'promos'
  | 'locations'
  | 'settings';

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  categories,
  menuItems,
  heroSlides,
  locations,
  promos,
  settings,
  onUpdateCategories,
  onUpdateMenuItems,
  onUpdateHeroSlides,
  onUpdateLocations,
  onUpdatePromos,
  onUpdateSettings,
  onResetDefaults
}) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [pinInput, setPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<string>('');

  // Active Tab
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');

  // Menu Form State
  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  const [itemName, setItemName] = useState('');
  const [itemCat, setItemCat] = useState('Burgers');
  const [itemPrice, setItemPrice] = useState<number | ''>('');
  const [itemDesc, setItemDesc] = useState('');
  const [itemImage, setItemImage] = useState('./hero section (1).png');
  const [itemBadge, setItemBadge] = useState('');
  const [itemSpiciness, setItemSpiciness] = useState<number>(2);
  const [menuSearch, setMenuSearch] = useState('');

  // Hero Slide Form State
  const [slideTitle, setSlideTitle] = useState('');
  const [slideHighlight, setSlideHighlight] = useState('');
  const [slideSubtitle, setSlideSubtitle] = useState('');
  const [slideBadge, setSlideBadge] = useState('#1 Crispy Chicken in Lahore');
  const [slideImage, setSlideImage] = useState('./hero section (1).png');
  const [slidePrice, setSlidePrice] = useState('Rs. 2,890');
  const [slideCtaText, setSlideCtaText] = useState('Order Online Now');

  // Custom Category State
  const [newCatName, setNewCatName] = useState('');

  // Promo Code Form State
  const [newPromoCode, setNewPromoCode] = useState('');
  const [newPromoDiscount, setNewPromoDiscount] = useState<number | ''>('');
  const [newPromoMinOrder, setNewPromoMinOrder] = useState<number | ''>(1000);
  const [newPromoDesc, setNewPromoDesc] = useState('');

  // Location Form State
  const [locName, setLocName] = useState('');
  const [locArea, setLocArea] = useState('Gulberg');
  const [locAddress, setLocAddress] = useState('');
  const [locPhone, setLocPhone] = useState('0322-4940181');
  const [locTiming, setLocTiming] = useState('12:00 PM - 02:30 AM');
  const [locMapUrl, setLocMapUrl] = useState('');

  // Notification Banner
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Preset image pool (including the 4 hero pictures uploaded by the user and official logo)
  const PRESET_IMAGES = [
    { label: 'Feast Combo', url: './hero section (1).png' },
    { label: 'Zinger Roll', url: './hero section (2).png' },
    { label: 'Loaded Pizza', url: './hero section (3).png' },
    { label: 'Chicken Bucket', url: './hero section (4).png' },
    { label: 'Official LFC Logo', url: './lfc_logo.png' }
  ];

  // PIN verification
  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === settings.adminPin || pinInput.trim() === '1234') {
      setIsAuthenticated(true);
      setPinError('');
    } else {
      setPinError('Incorrect security PIN. Default is 1234.');
    }
  };

  // File Upload Helper (FileReader to Base64)
  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (val: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert('Image file is large (>2MB). Please upload a smaller image.');
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === 'string') {
        setter(event.target.result);
        showToast('Image uploaded successfully!');
      }
    };
    reader.readAsDataURL(file);
  };

  // --- MENU ITEM ACTIONS ---
  const handleSaveMenuItem = () => {
    if (!itemName.trim() || itemPrice === '' || !itemImage.trim()) {
      alert('Please enter Item Name, Price, and Image.');
      return;
    }

    const priceNum = Number(itemPrice);
    if (isNaN(priceNum) || priceNum <= 0) {
      alert('Please enter a valid price.');
      return;
    }

    if (editingItemId) {
      // Update existing item
      const updated = menuItems.map((item) => {
        if (item.id === editingItemId) {
          return {
            ...item,
            name: itemName.trim(),
            cat: itemCat,
            price: priceNum,
            desc: itemDesc.trim() || 'Signature crispy preparation by LFC.',
            image: itemImage,
            badge: itemBadge.trim() || undefined,
            spiciness: itemSpiciness
          };
        }
        return item;
      });
      onUpdateMenuItems(updated);
      showToast(`Updated "${itemName}" in menu!`);
      setEditingItemId(null);
    } else {
      // Create new item
      const newItem: MenuItem = {
        id: Date.now(),
        name: itemName.trim(),
        cat: itemCat,
        price: priceNum,
        desc: itemDesc.trim() || 'Delicious crispy preparation by LFC.',
        image: itemImage,
        badge: itemBadge.trim() || undefined,
        inStock: true,
        spiciness: itemSpiciness
      };
      onUpdateMenuItems([newItem, ...menuItems]);
      showToast(`Added "${newItem.name}" to menu!`);
    }

    // Reset Form
    setItemName('');
    setItemPrice('');
    setItemDesc('');
    setItemBadge('');
  };

  const handleEditItemClick = (item: MenuItem) => {
    setEditingItemId(item.id);
    setItemName(item.name);
    setItemCat(item.cat);
    setItemPrice(item.price);
    setItemDesc(item.desc);
    setItemImage(item.image);
    setItemBadge(item.badge || '');
    setItemSpiciness(item.spiciness || 2);
    setActiveTab('menu');
  };

  const handleToggleStock = (id: number) => {
    const updated = menuItems.map((item) => {
      if (item.id === id) {
        return { ...item, inStock: !item.inStock };
      }
      return item;
    });
    onUpdateMenuItems(updated);
  };

  const handleDeleteItem = (id: number) => {
    const itemToDelete = menuItems.find((i) => i.id === id);
    if (!confirm(`Are you sure you want to remove "${itemToDelete?.name}"?`)) return;
    onUpdateMenuItems(menuItems.filter((i) => i.id !== id));
    showToast('Item deleted successfully.');
  };

  const handleDuplicateItem = (item: MenuItem) => {
    const duplicated: MenuItem = {
      ...item,
      id: Date.now(),
      name: `${item.name} (Copy)`
    };
    onUpdateMenuItems([duplicated, ...menuItems]);
    showToast(`Duplicated "${item.name}"!`);
  };

  // --- HERO SLIDE ACTIONS ---
  const handleAddHeroSlide = () => {
    if (!slideTitle.trim() || !slideHighlight.trim() || !slideImage.trim()) {
      alert('Please provide Slide Title, Highlight word, and Image.');
      return;
    }

    const newSlide: HeroSlide = {
      id: Date.now(),
      title: slideTitle.trim(),
      highlight: slideHighlight.trim(),
      subtitle: slideSubtitle.trim() || 'Authentic crispy fried chicken made fresh on order.',
      badgeText: slideBadge.trim() || 'LFC Special',
      image: slideImage,
      priceTag: slidePrice.trim() || undefined,
      ctaText: slideCtaText.trim() || 'Order Online',
      ctaLink: '#menu'
    };

    onUpdateHeroSlides([...heroSlides, newSlide]);
    showToast('New slide added to hero section!');

    // Reset
    setSlideTitle('');
    setSlideHighlight('');
    setSlideSubtitle('');
  };

  const handleDeleteSlide = (id: number) => {
    if (heroSlides.length <= 1) {
      alert('You must keep at least 1 hero slide active.');
      return;
    }
    if (!confirm('Are you sure you want to delete this hero slide?')) return;
    onUpdateHeroSlides(heroSlides.filter((s) => s.id !== id));
    showToast('Slide removed.');
  };

  const handleMoveSlide = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= heroSlides.length) return;

    const copy = [...heroSlides];
    const temp = copy[index];
    copy[index] = copy[targetIndex];
    copy[targetIndex] = temp;
    onUpdateHeroSlides(copy);
  };

  // --- CATEGORY ACTIONS ---
  const handleAddCategory = () => {
    const name = newCatName.trim();
    if (!name) return;

    if (categories.some((c) => c.name.toLowerCase() === name.toLowerCase())) {
      alert('Category already exists!');
      return;
    }

    const newCategory: Category = {
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      isCustom: true
    };

    onUpdateCategories([...categories, newCategory]);
    setNewCatName('');
    showToast(`Category "${name}" created!`);
  };

  const handleDeleteCategory = (catName: string) => {
    if (catName === 'All') {
      alert('Cannot delete the default "All" category.');
      return;
    }

    const hasItems = menuItems.some((i) => i.cat === catName);
    if (hasItems) {
      if (!confirm(`Warning: Items are assigned to "${catName}". Deleting this category will not delete the items, but they will no longer be filtered under it. Continue?`)) {
        return;
      }
    }

    onUpdateCategories(categories.filter((c) => c.name !== catName));
    showToast(`Category "${catName}" removed.`);
  };

  // --- PROMO CODE ACTIONS ---
  const handleAddPromo = () => {
    const code = newPromoCode.trim().toUpperCase();
    const disc = Number(newPromoDiscount) / 100;

    if (!code || isNaN(disc) || disc <= 0 || disc > 0.9) {
      alert('Please enter a valid Promo Code and discount percentage (1-90%).');
      return;
    }

    const newPromo: PromoCode = {
      code,
      discount: disc,
      minOrder: Number(newPromoMinOrder) || 500,
      description: newPromoDesc.trim() || `${disc * 100}% discount promo`,
      active: true
    };

    onUpdatePromos([...promos, newPromo]);
    setNewPromoCode('');
    setNewPromoDiscount('');
    setNewPromoDesc('');
    showToast(`Promo "${code}" created successfully!`);
  };

  const handleDeletePromo = (code: string) => {
    onUpdatePromos(promos.filter((p) => p.code !== code));
    showToast('Promo code removed.');
  };

  const handleTogglePromo = (code: string) => {
    onUpdatePromos(
      promos.map((p) => (p.code === code ? { ...p, active: !p.active } : p))
    );
  };

  // --- LOCATION ACTIONS ---
  const handleAddLocation = () => {
    if (!locName.trim() || !locAddress.trim() || !locPhone.trim()) {
      alert('Please enter Outlet Name, Address, and Phone number.');
      return;
    }

    const newLoc: BranchLocation = {
      id: Date.now(),
      name: locName.trim(),
      area: locArea.trim() || 'Lahore',
      address: locAddress.trim(),
      phone: locPhone.trim(),
      timing: locTiming.trim() || '12:00 PM - 02:00 AM',
      mapUrl: locMapUrl.trim() || undefined,
      isOpen: true
    };

    onUpdateLocations([...locations, newLoc]);
    setLocName('');
    setLocAddress('');
    showToast(`Branch "${newLoc.name}" added!`);
  };

  const handleDeleteLocation = (id: number) => {
    if (!confirm('Are you sure you want to delete this branch?')) return;
    onUpdateLocations(locations.filter((l) => l.id !== id));
    showToast('Branch location deleted.');
  };

  const handleToggleLocationOpen = (id: number) => {
    onUpdateLocations(
      locations.map((l) => (l.id === id ? { ...l, isOpen: !l.isOpen } : l))
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md p-3 sm:p-6 lg:p-10 flex items-start justify-center">
      <div className="w-full max-w-6xl bg-[#11121A] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col my-auto max-h-[92vh]">
        
        {/* MODAL HEADER */}
        <div className="p-5 sm:p-6 bg-[#161724] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-14 h-11 px-1 rounded-2xl bg-gradient-to-br from-amber-500/10 via-black to-red-600/10 border border-amber-400/30 flex items-center justify-center overflow-hidden shrink-0">
              <LFCLogo className="w-full h-full object-contain filter drop-shadow" />
            </div>
            <div>
              <h2 className="font-display font-black text-xl text-white tracking-wide flex items-center gap-2">
                <span>LFC Master Admin Suite</span>
                <span className="text-[10px] bg-gradient-to-r from-amber-400 to-orange-500 text-black font-black px-2.5 py-0.5 rounded-full uppercase shadow-md shadow-amber-500/20">
                  Control Room
                </span>
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-gray-400">Secret URL:</span>
                <code className="text-amber-400 bg-black/60 px-2 py-0.5 rounded font-mono text-xs border border-amber-400/30">#AdminLFC1</code>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.origin + window.location.pathname + '#AdminLFC1');
                    showToast('Admin URL copied to clipboard! 📋');
                  }}
                  className="text-[11px] bg-amber-400/15 hover:bg-amber-400/25 active:scale-95 text-amber-300 px-2 py-0.5 rounded-md border border-amber-400/30 transition-all font-semibold flex items-center gap-1 select-none"
                  title="Copy Admin URL link"
                >
                  <Copy className="w-3 h-3" />
                  <span>Copy Link</span>
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-2xl bg-white/5 hover:bg-white/10 active:bg-white/15 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
            aria-label="Close Admin Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* TOAST FEEDBACK NOTIFICATION */}
        {toastMessage && (
          <div className="bg-emerald-500/20 border-b border-emerald-500/30 px-6 py-2.5 text-xs text-emerald-300 font-semibold flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* AUTHENTICATION GATE */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-14 text-center max-w-md mx-auto space-y-6">
            <div className="w-16 h-16 mx-auto rounded-3xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400">
              <Shield className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="font-display font-bold text-xl text-white">
                Admin Authentication Required
              </h3>
              <p className="text-xs text-gray-400">
                Please enter your manager security PIN to access LFC configuration.
              </p>
            </div>

            <form onSubmit={handlePinSubmit} className="space-y-3">
              <input
                type="password"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Enter PIN (Default: 1234)"
                className="w-full bg-black/50 border border-white/15 rounded-xl px-4 py-3 text-center text-base text-white tracking-widest focus:outline-none focus:border-amber-400"
                autoFocus
              />
              {pinError && (
                <p className="text-xs text-red-400 flex items-center justify-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {pinError}
                </p>
              )}
              <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold py-3 rounded-xl font-display uppercase tracking-wider text-xs transition-colors"
              >
                Unlock Dashboard
              </button>
            </form>

            <button
              onClick={() => setIsAuthenticated(true)}
              className="text-xs text-gray-500 hover:text-amber-400 underline"
            >
              Quick Test Unlock (Instant Access)
            </button>
          </div>
        ) : (
          <>
            {/* TAB NAVIGATION BAR */}
            <div className="flex items-center gap-2 px-6 pt-3 border-b border-white/10 bg-[#0E0F16] overflow-x-auto no-scrollbar">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-3 px-3.5 font-display text-xs font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
                  activeTab === 'overview'
                    ? 'border-amber-400 text-amber-400'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                <Sliders className="w-4 h-4" /> Overview
              </button>

              <button
                onClick={() => setActiveTab('menu')}
                className={`py-3 px-3.5 font-display text-xs font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
                  activeTab === 'menu'
                    ? 'border-amber-400 text-amber-400'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                <Flame className="w-4 h-4" /> Menu Items ({menuItems.length})
              </button>

              <button
                onClick={() => setActiveTab('hero')}
                className={`py-3 px-3.5 font-display text-xs font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
                  activeTab === 'hero'
                    ? 'border-amber-400 text-amber-400'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                <ImageIcon className="w-4 h-4" /> Hero Slides ({heroSlides.length})
              </button>

              <button
                onClick={() => setActiveTab('categories')}
                className={`py-3 px-3.5 font-display text-xs font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
                  activeTab === 'categories'
                    ? 'border-amber-400 text-amber-400'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                <Layers className="w-4 h-4" /> Categories ({categories.length})
              </button>

              <button
                onClick={() => setActiveTab('promos')}
                className={`py-3 px-3.5 font-display text-xs font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
                  activeTab === 'promos'
                    ? 'border-amber-400 text-amber-400'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                <Ticket className="w-4 h-4" /> Promo Codes ({promos.length})
              </button>

              <button
                onClick={() => setActiveTab('locations')}
                className={`py-3 px-3.5 font-display text-xs font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
                  activeTab === 'locations'
                    ? 'border-amber-400 text-amber-400'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                <MapPin className="w-4 h-4" /> Outlets ({locations.length})
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`py-3 px-3.5 font-display text-xs font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
                  activeTab === 'settings'
                    ? 'border-amber-400 text-amber-400'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                <Store className="w-4 h-4" /> Store Settings
              </button>
            </div>

            {/* TAB BODY CONTENTS */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              
              {/* TAB 1: OVERVIEW */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* KPI Cards */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-[#171825] p-5 rounded-2xl border border-white/5 space-y-2">
                      <span className="text-xs text-gray-400 uppercase font-semibold">Total Menu Dishes</span>
                      <p className="font-display font-black text-3xl text-amber-400 tabular-nums">
                        {menuItems.length}
                      </p>
                      <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
                        <Check className="w-3 h-3" /> {menuItems.filter((i) => i.inStock).length} in stock
                      </span>
                    </div>

                    <div className="bg-[#171825] p-5 rounded-2xl border border-white/5 space-y-2">
                      <span className="text-xs text-gray-400 uppercase font-semibold">Hero Carousel Slides</span>
                      <p className="font-display font-black text-3xl text-white tabular-nums">
                        {heroSlides.length}
                      </p>
                      <span className="text-[11px] text-gray-400">Rotates every 5s</span>
                    </div>

                    <div className="bg-[#171825] p-5 rounded-2xl border border-white/5 space-y-2">
                      <span className="text-xs text-gray-400 uppercase font-semibold">Lahore Branches</span>
                      <p className="font-display font-black text-3xl text-white tabular-nums">
                        {locations.length}
                      </p>
                      <span className="text-[11px] text-emerald-400">
                        {locations.filter((l) => l.isOpen).length} Active Outlets
                      </span>
                    </div>

                    <div className="bg-[#171825] p-5 rounded-2xl border border-white/5 space-y-2">
                      <span className="text-xs text-gray-400 uppercase font-semibold">Active Coupons</span>
                      <p className="font-display font-black text-3xl text-amber-400 tabular-nums">
                        {promos.filter((p) => p.active).length}
                      </p>
                      <span className="text-[11px] text-gray-400">Live for checkout</span>
                    </div>
                  </div>

                  {/* Store Operations Status Box */}
                  <div className="bg-[#171825] p-6 rounded-2xl border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="space-y-1 text-center sm:text-left">
                      <h4 className="font-display font-bold text-base text-white">Store Order Taking Status</h4>
                      <p className="text-xs text-gray-400">
                        Toggle whether the kitchen is actively accepting incoming orders or temporarily offline.
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        const updated = { ...settings, storeOpen: !settings.storeOpen };
                        onUpdateSettings(updated);
                        showToast(updated.storeOpen ? 'Store marked OPEN!' : 'Store marked BUSY/CLOSED');
                      }}
                      className={`px-6 py-2.5 rounded-xl font-display font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 ${
                        settings.storeOpen
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30'
                          : 'bg-red-500/20 text-red-400 border border-red-500/40 hover:bg-red-500/30'
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full ${settings.storeOpen ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'}`} />
                      <span>{settings.storeOpen ? 'Store Open & Taking Orders' : 'Store Paused / Closed'}</span>
                    </button>
                  </div>

                  {/* Quick Shortcuts */}
                  <div className="bg-[#171825] p-6 rounded-2xl border border-white/5 space-y-4">
                    <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">
                      Quick Action Shortcuts
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <button
                        onClick={() => setActiveTab('menu')}
                        className="bg-white/5 hover:bg-white/10 p-4 rounded-xl border border-white/5 text-left space-y-1 transition-colors"
                      >
                        <span className="font-display font-bold text-xs text-amber-400 block">+ Add New Dish</span>
                        <p className="text-[11px] text-gray-400">Add food item with price and photo</p>
                      </button>

                      <button
                        onClick={() => setActiveTab('hero')}
                        className="bg-white/5 hover:bg-white/10 p-4 rounded-xl border border-white/5 text-left space-y-1 transition-colors"
                      >
                        <span className="font-display font-bold text-xs text-amber-400 block">Hero Carousel</span>
                        <p className="text-[11px] text-gray-400">Update banner slides and photos</p>
                      </button>

                      <button
                        onClick={() => setActiveTab('settings')}
                        className="bg-white/5 hover:bg-white/10 p-4 rounded-xl border border-white/5 text-left space-y-1 transition-colors"
                      >
                        <span className="font-display font-bold text-xs text-amber-400 block">WhatsApp Number</span>
                        <p className="text-[11px] text-gray-400">Configure order receiving hotline</p>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: MENU INVENTORY */}
              {activeTab === 'menu' && (
                <div className="space-y-6">
                  {/* Add / Edit Form */}
                  <div className="bg-[#171825] p-6 rounded-2xl border border-white/10 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display font-bold text-base text-white flex items-center gap-2">
                        <Flame className="w-4 h-4 text-amber-400" />
                        <span>{editingItemId ? 'Edit Menu Dish' : 'Add New Dish to Menu'}</span>
                      </h3>
                      {editingItemId && (
                        <button
                          onClick={() => {
                            setEditingItemId(null);
                            setItemName('');
                            setItemPrice('');
                            setItemDesc('');
                            setItemBadge('');
                          }}
                          className="text-xs text-gray-400 hover:text-white"
                        >
                          Cancel Editing
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="text-[11px] text-gray-400 block mb-1">Item Title *</label>
                        <input
                          type="text"
                          value={itemName}
                          onChange={(e) => setItemName(e.target.value)}
                          placeholder="e.g. Zinger Supreme Burger"
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] text-gray-400 block mb-1">Category *</label>
                        <select
                          value={itemCat}
                          onChange={(e) => setItemCat(e.target.value)}
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                        >
                          {categories
                            .filter((c) => c.name !== 'All')
                            .map((cat) => (
                              <option key={cat.id || cat.name} value={cat.name}>
                                {cat.name}
                              </option>
                            ))}
                        </select>
                      </div>

                      <div>
                        <label className="text-[11px] text-gray-400 block mb-1">Price in PKR *</label>
                        <input
                          type="number"
                          value={itemPrice}
                          onChange={(e) => setItemPrice(e.target.value ? Number(e.target.value) : '')}
                          placeholder="e.g. 590"
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="sm:col-span-2">
                        <label className="text-[11px] text-gray-400 block mb-1">Description</label>
                        <input
                          type="text"
                          value={itemDesc}
                          onChange={(e) => setItemDesc(e.target.value)}
                          placeholder="Ingredients, secret sauce, sides..."
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] text-gray-400 block mb-1">Badge Tag (Optional)</label>
                        <input
                          type="text"
                          value={itemBadge}
                          onChange={(e) => setItemBadge(e.target.value)}
                          placeholder="e.g. Chef Special, Hot Deal"
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>

                    {/* Image Selection / Upload */}
                    <div className="space-y-2 pt-1 border-t border-white/5">
                      <label className="text-[11px] text-gray-400 block font-semibold">
                        Dish Image (Choose from 4 Hero photos or upload file)
                      </label>
                      
                      {/* 1-click Preset Selector */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {PRESET_IMAGES.map((preset) => (
                          <button
                            key={preset.url}
                            type="button"
                            onClick={() => setItemImage(preset.url)}
                            className={`p-2 rounded-xl border flex items-center gap-2 text-left transition-all ${
                              itemImage === preset.url
                                ? 'border-amber-400 bg-amber-400/10 text-white'
                                : 'border-white/5 bg-black/30 text-gray-400 hover:text-white'
                            }`}
                          >
                            <img src={preset.url} alt={preset.label} className="w-8 h-8 object-contain rounded" />
                            <span className="text-[11px] font-medium truncate">{preset.label}</span>
                          </button>
                        ))}
                      </div>

                      {/* Custom URL or File Upload */}
                      <div className="flex flex-col sm:flex-row gap-2 pt-2">
                        <input
                          type="text"
                          value={itemImage}
                          onChange={(e) => setItemImage(e.target.value)}
                          placeholder="Or paste custom image URL..."
                          className="flex-1 bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                        />
                        <label className="bg-white/10 hover:bg-white/20 active:bg-white/25 text-white text-xs px-4 py-2 rounded-xl cursor-pointer flex items-center justify-center gap-1.5 transition-colors border border-white/10 shrink-0">
                          <Upload className="w-3.5 h-3.5" />
                          <span>Upload From Disk</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleFileUpload(e, setItemImage)}
                          />
                        </label>
                      </div>
                    </div>

                    <button
                      onClick={handleSaveMenuItem}
                      className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold py-2.5 rounded-xl font-display text-xs uppercase tracking-wider transition-all"
                    >
                      {editingItemId ? 'Save Changes' : 'Add Item to Menu'}
                    </button>
                  </div>

                  {/* Menu Table */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-display font-bold text-sm text-white">
                        Current Menu Dishes ({menuItems.length})
                      </h4>
                      <input
                        type="text"
                        value={menuSearch}
                        onChange={(e) => setMenuSearch(e.target.value)}
                        placeholder="Filter list..."
                        className="bg-black/40 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400 w-44"
                      />
                    </div>

                    <div className="overflow-x-auto rounded-2xl border border-white/10">
                      <table className="w-full text-left text-xs text-gray-300">
                        <thead className="bg-[#181926] uppercase text-gray-400 font-semibold border-b border-white/10">
                          <tr>
                            <th className="p-3">Dish</th>
                            <th className="p-3">Category</th>
                            <th className="p-3">Price</th>
                            <th className="p-3">Status</th>
                            <th className="p-3 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 bg-[#12131D]">
                          {menuItems
                            .filter(
                              (i) =>
                                !menuSearch ||
                                i.name.toLowerCase().includes(menuSearch.toLowerCase()) ||
                                i.cat.toLowerCase().includes(menuSearch.toLowerCase())
                            )
                            .map((item) => (
                              <tr key={item.id} className="hover:bg-white/5 transition-colors">
                                <td className="p-3 font-semibold text-white flex items-center gap-2.5">
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-8 h-8 rounded-lg object-contain bg-black/60 p-0.5"
                                  />
                                  <div>
                                    <span>{item.name}</span>
                                    {item.badge && (
                                      <span className="block text-[10px] text-amber-400 font-normal">
                                        {item.badge}
                                      </span>
                                    )}
                                  </div>
                                </td>
                                <td className="p-3 text-gray-400">{item.cat}</td>
                                <td className="p-3 text-amber-400 font-bold tabular-nums">
                                  Rs. {item.price.toLocaleString()}
                                </td>
                                <td className="p-3">
                                  <button
                                    onClick={() => handleToggleStock(item.id)}
                                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase transition-colors ${
                                      item.inStock
                                        ? 'bg-emerald-500/20 text-emerald-400'
                                        : 'bg-red-500/20 text-red-400'
                                    }`}
                                  >
                                    {item.inStock ? 'In Stock' : 'Sold Out'}
                                  </button>
                                </td>
                                <td className="p-3 text-right space-x-2">
                                  <button
                                    onClick={() => handleDuplicateItem(item)}
                                    className="text-emerald-400 hover:text-emerald-300 p-1"
                                    title="Duplicate Dish"
                                  >
                                    <Copy className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => handleEditItemClick(item)}
                                    className="text-amber-400 hover:text-amber-300 p-1"
                                    title="Edit Item"
                                  >
                                    <Edit2 className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteItem(item.id)}
                                    className="text-red-400 hover:text-red-300 p-1"
                                    title="Delete Item"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: HERO CAROUSEL */}
              {activeTab === 'hero' && (
                <div className="space-y-6">
                  {/* Add Slide Form */}
                  <div className="bg-[#171825] p-6 rounded-2xl border border-white/10 space-y-4">
                    <h3 className="font-display font-bold text-base text-white flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-amber-400" />
                      <span>Add / Configure Hero Carousel Slide</span>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] text-gray-400 block mb-1">Slide Title (Main Lead) *</label>
                        <input
                          type="text"
                          value={slideTitle}
                          onChange={(e) => setSlideTitle(e.target.value)}
                          placeholder="e.g. THE CRISPIEST IN LAHORE"
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] text-gray-400 block mb-1">Highlight Word (Gradient Accent) *</label>
                        <input
                          type="text"
                          value={slideHighlight}
                          onChange={(e) => setSlideHighlight(e.target.value)}
                          placeholder="e.g. ZINGER BUCKET"
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="sm:col-span-2">
                        <label className="text-[11px] text-gray-400 block mb-1">Subtitle / Punchline</label>
                        <input
                          type="text"
                          value={slideSubtitle}
                          onChange={(e) => setSlideSubtitle(e.target.value)}
                          placeholder="Descriptive sentence about flavor and crunch..."
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] text-gray-400 block mb-1">Price Tag Callout</label>
                        <input
                          type="text"
                          value={slidePrice}
                          onChange={(e) => setSlidePrice(e.target.value)}
                          placeholder="e.g. Rs. 1,850"
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>

                    {/* Image Selection for Slide */}
                    <div className="space-y-2 pt-2 border-t border-white/5">
                      <label className="text-[11px] text-gray-400 block font-semibold">
                        Choose Hero Photo (Select from the 4 uploaded images)
                      </label>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {PRESET_IMAGES.map((preset) => (
                          <button
                            key={preset.url}
                            type="button"
                            onClick={() => setSlideImage(preset.url)}
                            className={`p-2.5 rounded-xl border flex items-center gap-2 text-left transition-all ${
                              slideImage === preset.url
                                ? 'border-amber-400 bg-amber-400/10 text-white'
                                : 'border-white/5 bg-black/30 text-gray-400 hover:text-white'
                            }`}
                          >
                            <img src={preset.url} alt={preset.label} className="w-8 h-8 object-contain rounded" />
                            <span className="text-[11px] font-medium truncate">{preset.label}</span>
                          </button>
                        ))}
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2 pt-1">
                        <input
                          type="text"
                          value={slideImage}
                          onChange={(e) => setSlideImage(e.target.value)}
                          placeholder="Image path or URL..."
                          className="flex-1 bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                        />
                        <label className="bg-white/10 hover:bg-white/20 active:bg-white/25 text-white text-xs px-4 py-2 rounded-xl cursor-pointer flex items-center justify-center gap-1.5 transition-colors border border-white/10 shrink-0">
                          <Upload className="w-3.5 h-3.5" />
                          <span>Upload From Disk</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleFileUpload(e, setSlideImage)}
                          />
                        </label>
                      </div>
                    </div>

                    <button
                      onClick={handleAddHeroSlide}
                      className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold py-2.5 rounded-xl font-display text-xs uppercase tracking-wider transition-colors"
                    >
                      + Save Hero Slide
                    </button>
                  </div>

                  {/* Active Hero Slides List */}
                  <div className="space-y-3">
                    <h4 className="font-display font-bold text-sm text-white">
                      Active Carousel Slides ({heroSlides.length})
                    </h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {heroSlides.map((slide, index) => (
                        <div
                          key={slide.id}
                          className="bg-[#171825] p-4 rounded-2xl border border-white/10 flex items-center justify-between gap-4"
                        >
                          <div className="w-16 h-16 rounded-xl bg-black/50 p-1 flex items-center justify-center shrink-0 border border-white/5">
                            <img
                              src={slide.image}
                              alt={slide.title}
                              className="w-full h-full object-contain"
                            />
                          </div>

                          <div className="flex-1 min-w-0 space-y-0.5">
                            <span className="text-[10px] text-amber-400 uppercase font-bold block">
                              Slide #{index + 1} · {slide.priceTag || 'Promo'}
                            </span>
                            <h5 className="font-display font-bold text-xs text-white truncate">
                              {slide.title} {slide.highlight}
                            </h5>
                            <p className="text-[11px] text-gray-400 truncate">
                              {slide.subtitle}
                            </p>
                          </div>

                          {/* Controls: Reorder & Delete */}
                          <div className="flex flex-col gap-1 shrink-0">
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleMoveSlide(index, 'up')}
                                disabled={index === 0}
                                className="w-6 h-6 rounded bg-white/5 hover:bg-white/10 disabled:opacity-30 flex items-center justify-center text-gray-300"
                                title="Move Slide Up"
                              >
                                <ArrowUp className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => handleMoveSlide(index, 'down')}
                                disabled={index === heroSlides.length - 1}
                                className="w-6 h-6 rounded bg-white/5 hover:bg-white/10 disabled:opacity-30 flex items-center justify-center text-gray-300"
                                title="Move Slide Down"
                              >
                                <ArrowDown className="w-3 h-3" />
                              </button>
                            </div>
                            <button
                              onClick={() => handleDeleteSlide(slide.id)}
                              className="text-red-400 hover:text-red-300 text-[10px] font-bold text-center mt-1"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: CATEGORIES */}
              {activeTab === 'categories' && (
                <div className="space-y-6">
                  {/* Add Category */}
                  <div className="bg-[#171825] p-6 rounded-2xl border border-white/10 space-y-3">
                    <h3 className="font-display font-bold text-base text-white flex items-center gap-2">
                      <Layers className="w-4 h-4 text-amber-400" />
                      <span>Create Custom Food Category</span>
                    </h3>
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="text"
                        value={newCatName}
                        onChange={(e) => setNewCatName(e.target.value)}
                        placeholder="e.g. Shawarma, Beverages, Desserts, Dips"
                        className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                      />
                      <button
                        onClick={handleAddCategory}
                        className="bg-amber-500 hover:bg-amber-400 text-black font-bold px-6 py-2.5 rounded-xl font-display text-xs uppercase tracking-wider transition-colors shrink-0"
                      >
                        + Add Category
                      </button>
                    </div>
                  </div>

                  {/* Category List */}
                  <div className="space-y-3">
                    <h4 className="font-display font-bold text-sm text-white">
                      Active Categories ({categories.length})
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {categories.map((cat) => {
                        const count = menuItems.filter((i) => i.cat === cat.name).length;

                        return (
                          <div
                            key={cat.id || cat.name}
                            className="bg-[#171825] p-3.5 rounded-2xl border border-white/5 flex items-center justify-between"
                          >
                            <div>
                              <span className="font-display font-bold text-xs text-white block">
                                {cat.name}
                              </span>
                              <span className="text-[10px] text-gray-400">
                                {cat.name === 'All' ? `${menuItems.length} total items` : `${count} items in category`}
                              </span>
                            </div>

                            {cat.name !== 'All' ? (
                              <button
                                onClick={() => handleDeleteCategory(cat.name)}
                                className="text-red-400 hover:text-red-300 p-1.5"
                                title="Delete Category"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            ) : (
                              <span className="text-[10px] text-gray-500 uppercase font-semibold">
                                System
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: PROMO CODES */}
              {activeTab === 'promos' && (
                <div className="space-y-6">
                  {/* Add Promo Form */}
                  <div className="bg-[#171825] p-6 rounded-2xl border border-white/10 space-y-4">
                    <h3 className="font-display font-bold text-base text-white flex items-center gap-2">
                      <Ticket className="w-4 h-4 text-amber-400" />
                      <span>Create New Promo Voucher</span>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="text-[11px] text-gray-400 block mb-1">Coupon Code *</label>
                        <input
                          type="text"
                          value={newPromoCode}
                          onChange={(e) => setNewPromoCode(e.target.value)}
                          placeholder="e.g. LFC25"
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400 uppercase"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] text-gray-400 block mb-1">Discount % *</label>
                        <input
                          type="number"
                          value={newPromoDiscount}
                          onChange={(e) =>
                            setNewPromoDiscount(e.target.value ? Number(e.target.value) : '')
                          }
                          placeholder="e.g. 20 (for 20% off)"
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] text-gray-400 block mb-1">Min Order Amount (PKR)</label>
                        <input
                          type="number"
                          value={newPromoMinOrder}
                          onChange={(e) =>
                            setNewPromoMinOrder(e.target.value ? Number(e.target.value) : '')
                          }
                          placeholder="e.g. 1000"
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] text-gray-400 block mb-1">Description / Notes</label>
                      <input
                        type="text"
                        value={newPromoDesc}
                        onChange={(e) => setNewPromoDesc(e.target.value)}
                        placeholder="e.g. Flat 20% off on all family orders"
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <button
                      onClick={handleAddPromo}
                      className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold py-2.5 rounded-xl font-display text-xs uppercase tracking-wider transition-colors"
                    >
                      + Generate Promo Code
                    </button>
                  </div>

                  {/* Active Coupons List */}
                  <div className="space-y-3">
                    <h4 className="font-display font-bold text-sm text-white">
                      Active Coupons ({promos.length})
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {promos.map((p) => (
                        <div
                          key={p.code}
                          className="bg-[#171825] p-4 rounded-2xl border border-white/5 flex items-center justify-between"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-display font-black text-sm text-amber-400 uppercase">
                                {p.code}
                              </span>
                              <span className="text-[10px] bg-amber-400/10 text-amber-400 px-1.5 py-0.2 rounded font-bold">
                                {p.discount * 100}% OFF
                              </span>
                            </div>
                            <p className="text-[11px] text-gray-400 mt-1">
                              Min Order: Rs. {p.minOrder}
                            </p>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleTogglePromo(p.code)}
                              className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                                p.active ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                              }`}
                            >
                              {p.active ? 'Active' : 'Paused'}
                            </button>
                            <button
                              onClick={() => handleDeletePromo(p.code)}
                              className="text-red-400 hover:text-red-300 p-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 6: BRANCH LOCATIONS */}
              {activeTab === 'locations' && (
                <div className="space-y-6">
                  {/* Add Location Form */}
                  <div className="bg-[#171825] p-6 rounded-2xl border border-white/10 space-y-4">
                    <h3 className="font-display font-bold text-base text-white flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-amber-400" />
                      <span>Register New Lahore Outlet Branch</span>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="text-[11px] text-gray-400 block mb-1">Branch Name *</label>
                        <input
                          type="text"
                          value={locName}
                          onChange={(e) => setLocName(e.target.value)}
                          placeholder="e.g. Model Town Link Road"
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] text-gray-400 block mb-1">Lahore Area *</label>
                        <input
                          type="text"
                          value={locArea}
                          onChange={(e) => setLocArea(e.target.value)}
                          placeholder="e.g. Model Town, DHA, Johar Town"
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] text-gray-400 block mb-1">Hotline Phone *</label>
                        <input
                          type="text"
                          value={locPhone}
                          onChange={(e) => setLocPhone(e.target.value)}
                          placeholder="0322-4940181"
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] text-gray-400 block mb-1">Operating Hours</label>
                        <input
                          type="text"
                          value={locTiming}
                          onChange={(e) => setLocTiming(e.target.value)}
                          placeholder="12:00 PM - 02:00 AM"
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] text-gray-400 block mb-1">Google Maps Link</label>
                        <input
                          type="text"
                          value={locMapUrl}
                          onChange={(e) => setLocMapUrl(e.target.value)}
                          placeholder="https://maps.google.com/?q=..."
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] text-gray-400 block mb-1">Full Physical Street Address *</label>
                      <input
                        type="text"
                        value={locAddress}
                        onChange={(e) => setLocAddress(e.target.value)}
                        placeholder="Complete building, plaza or street address in Lahore..."
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <button
                      onClick={handleAddLocation}
                      className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold py-2.5 rounded-xl font-display text-xs uppercase tracking-wider transition-colors"
                    >
                      + Register Branch
                    </button>
                  </div>

                  {/* Branches List */}
                  <div className="space-y-3">
                    <h4 className="font-display font-bold text-sm text-white">
                      Registered Branches ({locations.length})
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {locations.map((loc) => (
                        <div
                          key={loc.id}
                          className="bg-[#171825] p-4 rounded-2xl border border-white/5 space-y-2"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-display font-bold text-sm text-white">
                              {loc.name}
                            </span>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleToggleLocationOpen(loc.id)}
                                className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                                  loc.isOpen
                                    ? 'bg-emerald-500/20 text-emerald-400'
                                    : 'bg-red-500/20 text-red-400'
                                }`}
                              >
                                {loc.isOpen ? 'Open' : 'Closed'}
                              </button>
                              <button
                                onClick={() => handleDeleteLocation(loc.id)}
                                className="text-red-400 hover:text-red-300"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                          <p className="text-[11px] text-gray-400">{loc.address}</p>
                          <div className="text-[11px] text-amber-400 flex items-center justify-between pt-1 border-t border-white/5">
                            <span>{loc.timing}</span>
                            <span>{loc.phone}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 7: STORE SETTINGS */}
              {activeTab === 'settings' && (
                <div className="space-y-6">
                  {/* Sticky Announcement Bar Settings */}
                  <div className="bg-[#171825] p-6 rounded-2xl border border-white/10 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display font-bold text-base text-white">
                        Top Sticky Announcement Bar
                      </h3>
                      <button
                        onClick={() => {
                          const updated = {
                            ...settings,
                            showAnnouncement: !settings.showAnnouncement
                          };
                          onUpdateSettings(updated);
                          showToast(
                            updated.showAnnouncement
                              ? 'Announcement bar turned ON'
                              : 'Announcement bar HIDDEN'
                          );
                        }}
                        className={`text-xs px-3 py-1 rounded-xl font-bold uppercase transition-colors ${
                          settings.showAnnouncement
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'bg-white/10 text-gray-400'
                        }`}
                      >
                        {settings.showAnnouncement ? 'Visible' : 'Hidden'}
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="text-[11px] text-gray-400 block mb-1">Badge Tag</label>
                        <input
                          type="text"
                          value={settings.announcementBadge}
                          onChange={(e) =>
                            onUpdateSettings({ ...settings, announcementBadge: e.target.value })
                          }
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="text-[11px] text-gray-400 block mb-1">
                          Announcement Message
                        </label>
                        <input
                          type="text"
                          value={settings.announcementText}
                          onChange={(e) =>
                            onUpdateSettings({ ...settings, announcementText: e.target.value })
                          }
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Brand Logo & Visual Identity */}
                  <div className="bg-[#171825] p-6 rounded-2xl border border-white/10 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display font-bold text-base text-white flex items-center gap-2">
                        <ImageIcon className="w-4 h-4 text-amber-400" />
                        <span>Store Brand Logo</span>
                      </h3>
                      {settings.logoUrl ? (
                        <button
                          type="button"
                          onClick={() => {
                            onUpdateSettings({ ...settings, logoUrl: '' });
                            showToast('Restored original golden vector rooster logo! ✨');
                          }}
                          className="text-xs text-amber-400 hover:text-amber-300 underline font-semibold"
                        >
                          Reset to Original Rooster Logo
                        </button>
                      ) : (
                        <span className="text-[11px] bg-amber-400/20 text-amber-300 font-bold px-2 py-0.5 rounded-full border border-amber-400/30">
                          Original Vector Logo Active
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-xl bg-black/40 border border-white/5">
                      {/* Logo Live Preview Box */}
                      <div className="w-24 h-18 p-2 rounded-2xl bg-gradient-to-br from-amber-500/20 via-[#10111A] to-orange-500/20 border border-amber-400/40 shadow-lg flex items-center justify-center shrink-0 overflow-hidden">
                        <LFCLogo className="w-full h-full object-contain filter drop-shadow" customLogoUrl={settings.logoUrl} />
                      </div>

                      <div className="flex-1 space-y-2 w-full">
                        <p className="text-xs text-gray-300 font-medium">
                          Upload your custom logo or paste an image link. It will update the Navigation bar, Hero section watermark, and Footer immediately.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-2">
                          <input
                            type="text"
                            value={settings.logoUrl || ''}
                            onChange={(e) =>
                              onUpdateSettings({ ...settings, logoUrl: e.target.value.trim() })
                            }
                            placeholder="Paste custom logo image URL (e.g. /logo.png or https://...)"
                            className="flex-1 bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                          />
                          <label className="bg-amber-500 hover:bg-amber-400 active:scale-95 text-black text-xs font-bold px-4 py-2 rounded-xl cursor-pointer flex items-center justify-center gap-1.5 transition-all shrink-0">
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload Logo Image</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                handleFileUpload(e, (dataUrl) => {
                                  onUpdateSettings({ ...settings, logoUrl: dataUrl });
                                  showToast('Custom logo uploaded & saved! 🎉');
                                });
                              }}
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Order Phone Hotline & WhatsApp Numbers */}
                  <div className="bg-[#171825] p-6 rounded-2xl border border-white/10 space-y-4">
                    <h3 className="font-display font-bold text-base text-white flex items-center gap-2">
                      <Phone className="w-4 h-4 text-emerald-400" />
                      <span>Customer Order Hotlines & Calling Numbers</span>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Primary Voice Calling Phone Hotline */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] text-gray-400 block font-semibold">
                          Calling Phone Hotline (Header, Footer, Mobile Tap-to-Call)
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={settings.phoneHotline || ''}
                            onChange={(e) =>
                              onUpdateSettings({
                                ...settings,
                                phoneHotline: e.target.value
                              })
                            }
                            placeholder="e.g. 0322-4940181 or 042-111-532-532"
                            className="flex-1 bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                          />
                          {settings.phoneHotline && (
                            <a
                              href={`tel:${settings.phoneHotline}`}
                              className="bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold px-3 py-2 rounded-xl transition-colors shrink-0 flex items-center gap-1"
                              title="Test direct voice call"
                            >
                              <Phone className="w-3.5 h-3.5" /> Call
                            </a>
                          )}
                        </div>
                        <span className="text-[10px] text-gray-500 block">
                          Customers on phones can tap this number to dial directly.
                        </span>
                      </div>

                      {/* WhatsApp Direct Order Hotline */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] text-gray-400 block font-semibold">
                          WhatsApp Order Hotline (No spaces or dashes)
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={settings.whatsappNumber}
                            onChange={(e) =>
                              onUpdateSettings({
                                ...settings,
                                whatsappNumber: e.target.value.replace(/[^0-9]/g, '')
                              })
                            }
                            placeholder="e.g. 923224940181"
                            className="flex-1 bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                          />
                          <a
                            href={`https://wa.me/${settings.whatsappNumber}`}
                            target="_blank"
                            rel="noreferrer"
                            className="bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold px-3 py-2 rounded-xl transition-colors shrink-0 flex items-center gap-1"
                            title="Test WhatsApp chat"
                          >
                            <Phone className="w-3.5 h-3.5" /> Chat
                          </a>
                        </div>
                        <span className="text-[10px] text-gray-500 block">
                          Used for the floating WhatsApp button and 1-tap cart submission.
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Delivery Charges & Free Delivery Threshold */}
                  <div className="bg-[#171825] p-6 rounded-2xl border border-white/10 space-y-4">
                    <h3 className="font-display font-bold text-base text-white flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-amber-400" />
                      <span>Delivery Rates & Thresholds (PKR)</span>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] text-gray-400 block mb-1">Standard Delivery Fee</label>
                        <input
                          type="number"
                          value={settings.deliveryFee}
                          onChange={(e) =>
                            onUpdateSettings({
                              ...settings,
                              deliveryFee: Number(e.target.value) || 0
                            })
                          }
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] text-gray-400 block mb-1">
                          Free Delivery Minimum Order Amount
                        </label>
                        <input
                          type="number"
                          value={settings.freeDeliveryThreshold}
                          onChange={(e) =>
                            onUpdateSettings({
                              ...settings,
                              freeDeliveryThreshold: Number(e.target.value) || 0
                            })
                          }
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Security PIN Change */}
                  <div className="bg-[#171825] p-6 rounded-2xl border border-white/10 space-y-3">
                    <h3 className="font-display font-bold text-base text-white flex items-center gap-2">
                      <Shield className="w-4 h-4 text-amber-400" />
                      <span>Security & Admin Access PIN</span>
                    </h3>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="text"
                        value={settings.adminPin}
                        onChange={(e) =>
                          onUpdateSettings({ ...settings, adminPin: e.target.value.trim() })
                        }
                        placeholder="Current PIN (Default: 1234)"
                        className="flex-1 bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                      />
                      <button
                        onClick={() => showToast('PIN updated successfully!')}
                        className="bg-white/10 hover:bg-white/20 text-white font-semibold text-xs px-5 py-2 rounded-xl transition-colors shrink-0"
                      >
                        Save PIN
                      </button>
                    </div>
                  </div>

                  {/* Reset Defaults */}
                  <div className="bg-red-950/20 border border-red-900/30 p-6 rounded-2xl space-y-3">
                    <h4 className="font-display font-bold text-sm text-red-400">
                      Emergency Reset & Restore Defaults
                    </h4>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      If you ever need to restore the original menu items, 4 hero slides, default promo codes and Lahore branch locations, click the button below.
                    </p>
                    <button
                      onClick={() => {
                        if (confirm('Restore factory default menu, hero slides, and settings? This will overwrite local customizations.')) {
                          onResetDefaults();
                          showToast('Restored all factory defaults successfully!');
                        }
                      }}
                      className="bg-red-600/30 hover:bg-red-600/50 text-red-300 border border-red-500/40 text-xs font-bold px-4 py-2 rounded-xl transition-colors flex items-center gap-2"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Restore Factory Settings & 4 Hero Photos</span>
                    </button>
                  </div>
                </div>
              )}

            </div>
          </>
        )}

      </div>
    </div>
  );
};
