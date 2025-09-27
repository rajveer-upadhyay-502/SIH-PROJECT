// src/lib/helpers/format.ts

export function formatDate(timestamp: number, locale = "en-US", options?: Intl.DateTimeFormatOptions): string {
  const date = new Date(timestamp);
  return date.toLocaleDateString(locale, options);
}

export function formatTime(timestamp: number, locale = "en-US", options?: Intl.DateTimeFormatOptions): string {
  const date = new Date(timestamp);
  return date.toLocaleTimeString(locale, options);
}

export function capitalize(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function titleCase(str: string): string {
  if (!str) return "";
  return str
    .toLowerCase()
    .split(" ")
    .map(word => capitalize(word))
    .join(" ");
}

// Example: format number as currency
export function formatCurrency(amount: number, currency = "USD", locale = "en-US"): string {
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(amount);
}

