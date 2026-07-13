import type { MetadataRoute } from "next";
import { SITE, VISIBLE_SECTIONS } from "@/lib/constants";
import { routing } from "@/i18n/routing";

function getSitemapPages() {
  const pages = ["", "/products", "/about", "/courses"] as string[];

  if (VISIBLE_SECTIONS.recognition) {
    pages.push("/recognition");
  }
  if (VISIBLE_SECTIONS.testimonials) {
    pages.push("/client_testimonials");
  }

  return pages;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = getSitemapPages();

  return routing.locales.flatMap((locale) =>
    pages.map((page) => ({
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
