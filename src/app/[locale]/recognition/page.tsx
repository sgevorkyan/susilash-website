import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Recognition } from "@/components/sections/Recognition";
import { routing, type Locale } from "@/i18n/routing";
import { SITE, VISIBLE_SECTIONS } from "@/lib/constants";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "recognition" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `${SITE.url}/${locale}/recognition`,
      languages: Object.fromEntries(
        routing.locales.map((loc) => [loc, `${SITE.url}/${loc}/recognition`]),
      ),
    },
  };
}

export default async function RecognitionPage({ params }: Props) {
  if (!VISIBLE_SECTIONS.recognition) {
    notFound();
  }

  const { locale } = await params;
  setRequestLocale(locale as Locale);

  return (
    <div className="pt-20">
      <Recognition />
    </div>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
