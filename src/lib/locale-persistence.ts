import { routing, type Locale } from "@/i18n/routing";

export const LOCALE_PREFERENCE_KEY = "susilash-locale";
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

export function isValidLocale(value: string): value is Locale {
  return routing.locales.includes(value as Locale);
}

export function persistLocale(locale: Locale) {
  if (typeof window === "undefined") return;

  localStorage.setItem(LOCALE_PREFERENCE_KEY, locale);
  document.cookie = `${LOCALE_PREFERENCE_KEY}=${locale}; path=/; max-age=${LOCALE_COOKIE_MAX_AGE}; SameSite=Lax`;
}

export function getPersistedLocale(): Locale | null {
  if (typeof window === "undefined") return null;

  const stored = localStorage.getItem(LOCALE_PREFERENCE_KEY);
  return stored && isValidLocale(stored) ? stored : null;
}
