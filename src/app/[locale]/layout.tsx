import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Noto_Sans_Armenian } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { LocalePersistence } from "@/components/layout/LocalePersistence";
import { routing, type Locale } from "@/i18n/routing";
import { SITE, OG_IMAGE } from "@/lib/constants";
import "../globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const notoArmenian = Noto_Sans_Armenian({
  variable: "--font-armenian",
  subsets: ["armenian"],
  weight: ["300", "400", "500"],
  display: "swap",
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  const languages = Object.fromEntries(
    routing.locales.map((loc) => [loc, `${SITE.url}/${loc}`]),
  );

  return {
    title: {
      default: t("title"),
      template: `%s | ${SITE.name}`,
    },
    description: t("description"),
    keywords: [
      "lash artist",
      "luxury lash extensions",
      "Susi Lash",
      "Susi Manukyan",
      "volume lashes",
      "hybrid lashes",
      "premium lash artist",
      "bespoke lash extensions",
    ],
    authors: [{ name: SITE.artist }],
    creator: SITE.artist,
    openGraph: {
      type: "website",
      locale,
      url: `${SITE.url}/${locale}`,
      siteName: SITE.name,
      title: t("ogTitle"),
      description: t("description"),
      images: [
        {
          url: OG_IMAGE,
          width: 1200,
          height: 630,
          alt: t("ogImageAlt"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("ogTitle"),
      description: t("description"),
      images: [OG_IMAGE],
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `${SITE.url}/${locale}`,
      languages,
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: "metadata" });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    name: SITE.name,
    legalName: SITE.legalName,
    description: t("description"),
    url: `${SITE.url}/${locale}`,
    image: OG_IMAGE,
    founder: {
      "@type": "Person",
      name: SITE.artist,
      jobTitle: t("jobTitle"),
    },
    priceRange: "$$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "42 Teryan Street",
      addressLocality: "Yerevan",
      addressCountry: "AM",
    },
    knowsAbout: [
      "Lash Extensions",
      "Volume Lashes",
      "Hybrid Lashes",
      "Lash Lift",
    ],
  };

  const fontClass =
    locale === "hy"
      ? `${cormorant.variable} ${notoArmenian.variable} font-armenian`
      : `${cormorant.variable} ${inter.variable}`;

  return (
    <html lang={locale} className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${fontClass} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <LocalePersistence />
          <Navigation />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
