import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { ProductsHero } from "@/components/sections/ProductsHero";
import { Products } from "@/components/sections/Products";
import { routing, type Locale } from "@/i18n/routing";
import { SITE } from "@/lib/constants";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "products" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `${SITE.url}/${locale}/products`,
      languages: Object.fromEntries(
        routing.locales.map((loc) => [loc, `${SITE.url}/${loc}/products`]),
      ),
    },
  };
}

export default async function ProductsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  return (
    <>
      <ProductsHero />
      <Products variant="page" />
    </>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
