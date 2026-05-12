import {
  ShoppingCart, Bus, Pill, GraduationCap, Zap, Shirt,
  Home, UtensilsCrossed, Baby, Sparkles, PiggyBank, Package,
  Gem, Smartphone, School, Building2, Plane, Car,
  Wallet, Heart, Gift, Tv, Laptop, Bike,
} from 'lucide-react';

export const CATEGORY_COLORS = [
  '#2D7A5F', '#4A7FB5', '#D4583B', '#8B5EB0', '#E8A849',
  '#C75B8E', '#8B7355', '#D4733B', '#3BA4B8', '#C8912F',
  '#2D7A5F', '#7A7F93',
];

// Lucide icons for expense categories
export const CATEGORY_ICONS = [
  ShoppingCart, Bus, Pill, GraduationCap, Zap, Shirt,
  Home, UtensilsCrossed, Baby, Sparkles, PiggyBank, Package,
];

// Lucide icons for savings goals
export const GOAL_ICON_OPTIONS = [
  { icon: Gem,        label: 'Jewellery' },
  { icon: Smartphone, label: 'Phone' },
  { icon: School,     label: 'Education' },
  { icon: Building2,  label: 'Home' },
  { icon: Plane,      label: 'Travel' },
  { icon: Car,        label: 'Vehicle' },
  { icon: Shirt,      label: 'Clothing' },
  { icon: Wallet,     label: 'Savings' },
  { icon: PiggyBank,  label: 'Piggy Bank' },
  { icon: Sparkles,   label: 'Festival' },
  { icon: Baby,       label: 'Children' },
  { icon: Pill,       label: 'Health' },
  { icon: Gift,       label: 'Gift' },
  { icon: Tv,         label: 'TV' },
  { icon: Laptop,     label: 'Laptop' },
  { icon: Bike,       label: 'Bike' },
];

// Map goal icon name → Lucide component (for stored goals)
export const GOAL_ICON_MAP = Object.fromEntries(
  GOAL_ICON_OPTIONS.map(({ icon, label }) => [label, icon])
);

export const QUICK_AMOUNTS = [50, 100, 200, 500, 1000, 2000, 5000];

export const LANG_OPTIONS = [
  { c: 'en', n: 'English',  l: 'English' },
  { c: 'hi', n: 'हिन्दी',    l: 'Hindi' },
  { c: 'mr', n: 'मराठी',     l: 'Marathi' },
  { c: 'ta', n: 'தமிழ்',     l: 'Tamil' },
];

export const fmt = (n) => '₹' + Math.round(n).toLocaleString('en-IN');
