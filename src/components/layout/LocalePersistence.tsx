"use client";

import { useEffect, useRef } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { type Locale } from "@/i18n/routing";
import { getPersistedLocale, persistLocale } from "@/lib/locale-persistence";

export function LocalePersistence() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const hasSynced = useRef(false);

  useEffect(() => {
    if (hasSynced.current) return;

    const preferred = getPersistedLocale();

    if (!preferred) {
      persistLocale(locale);
      hasSynced.current = true;
      return;
    }

    if (preferred !== locale) {
      router.replace(pathname, { locale: preferred });
    }

    hasSynced.current = true;
  }, [locale, pathname, router]);

  return null;
}
