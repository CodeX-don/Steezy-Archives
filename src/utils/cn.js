import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Merge Tailwind classes safely (clsx + tailwind-merge). */
export function cn(...inputs) {
  return twMerge(clsx(...inputs))
}

/** Format a price in Namibia Dollars. */
export function formatPrice(n) {
  return `N$${Number(n).toLocaleString('en-ZA')}`
}
