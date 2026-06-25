"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import {
  LOCALE_FLAGS,
  LOCALE_LABELS,
  routing,
  type Locale,
} from "@/i18n/routing";
import { persistLocale } from "@/lib/locale-persistence";

interface LanguageSwitcherProps {
  onLocaleChange?: () => void;
  className?: string;
  layout?: "inline" | "menu";
  variant?: "light" | "dark";
}

export function LanguageSwitcher({
  onLocaleChange,
  className = "",
  layout = "inline",
  variant = "dark",
}: LanguageSwitcherProps) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const handleSelect = (loc: Locale) => {
    persistLocale(loc);
    router.replace(pathname, { locale: loc });
    onLocaleChange?.();
  };

  const inactiveOpacity =
    variant === "light" ? "opacity-60 hover:opacity-90" : "opacity-35 hover:opacity-70";

  if (layout === "menu") {
    return (
      <div className={`flex flex-col items-center gap-4 ${className}`}>
        <div className="flex items-center gap-5">
          {routing.locales.map((loc) => (
            <button
              key={loc}
              onClick={() => handleSelect(loc)}
              className={`flex flex-col items-center gap-2 transition-opacity duration-300 ${
                loc === locale ? "opacity-100" : inactiveOpacity
              }`}
              aria-label={LOCALE_LABELS[loc]}
              aria-current={loc === locale ? "true" : undefined}
            >
              <span className="text-3xl leading-none" aria-hidden="true">
                {LOCALE_FLAGS[loc]}
              </span>
              <span className="text-[10px] tracking-[0.15em] uppercase text-muted">
                {LOCALE_LABELS[loc]}
              </span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {routing.locales.map((loc) => (
        <button
          key={loc}
          onClick={() => handleSelect(loc)}
          className={`p-1 text-xl leading-none transition-opacity duration-300 hero-scrim-text ${
            loc === locale ? "opacity-100" : inactiveOpacity
          }`}
          aria-label={LOCALE_LABELS[loc]}
          aria-current={loc === locale ? "true" : undefined}
        >
          <span aria-hidden="true">{LOCALE_FLAGS[loc]}</span>
        </button>
      ))}
    </div>
  );
}
