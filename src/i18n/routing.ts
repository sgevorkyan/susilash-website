import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "hy", "de", "ru"],
  defaultLocale: "en",
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  hy: "Հայերեն",
  de: "Deutsch",
  ru: "Русский",
};

export const LOCALE_FLAGS: Record<Locale, string> = {
  en: "🇬🇧",
  hy: "🇦🇲",
  de: "🇩🇪",
  ru: "🇷🇺",
};

export const LOCALE_SHORT: Record<Locale, string> = {
  en: "EN",
  hy: "HY",
  de: "DE",
  ru: "RU",
};
