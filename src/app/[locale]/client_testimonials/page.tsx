import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Testimonials } from "@/components/sections/Testimonials";
import { routing, type Locale } from "@/i18n/routing";
import { SITE } from "@/lib/constants";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "testimonials" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `${SITE.url}/${locale}/client_testimonials`,
      languages: Object.fromEntries(
        routing.locales.map((loc) => [
          loc,
          `${SITE.url}/${loc}/client_testimonials`,
        ]),
      ),
    },
  };
}

export default async function ClientTestimonialsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  return (
    <div className="pt-20">
      <Testimonials />
    </div>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
