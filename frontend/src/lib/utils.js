import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price, currency = 'PKR') {
  return `${currency} ${price?.toLocaleString() ?? '0'}`;
}

export function truncate(str, len = 60) {
  if (!str) return '';
  return str.length > len ? str.slice(0, len) + '...' : str;
}

export function generateId() {
  return Math.random().toString(36).substr(2, 9);
}
