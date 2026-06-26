import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";
import { routing } from "@/i18n/routing";

const PAGES = ["", "/recognition", "/client_testimonials"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return routing.locales.flatMap((locale) =>
    PAGES.map((page) => ({
      url: `${SITE.url}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: page === "" && locale === routing.defaultLocale ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((loc) => [
            loc,
            `${SITE.url}/${loc}${page}`,
          ]),
        ),
      },
    })),
  );
}
