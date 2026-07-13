import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Courses } from "@/components/sections/Courses";
import { routing, type Locale } from "@/i18n/routing";
import { SITE } from "@/lib/constants";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "courses" });

  return {
    title: t("title"),
    description: t("intro"),
    alternates: {
      canonical: `${SITE.url}/${locale}/courses`,
      languages: Object.fromEntries(
        routing.locales.map((loc) => [loc, `${SITE.url}/${loc}/courses`]),
      ),
    },
  };
}

export default async function CoursesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  return <Courses />;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
