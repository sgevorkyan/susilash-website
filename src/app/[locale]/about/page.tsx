import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { AboutPageContent } from "@/components/sections/AboutPageContent";
import { routing, type Locale } from "@/i18n/routing";
import { SITE } from "@/lib/constants";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  return {
    title: t("title"),
    description: t("pageDescription"),
    alternates: {
      canonical: `${SITE.url}/${locale}/about`,
      languages: Object.fromEntries(
        routing.locales.map((loc) => [loc, `${SITE.url}/${loc}/about`]),
      ),
    },
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  return <AboutPageContent />;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
