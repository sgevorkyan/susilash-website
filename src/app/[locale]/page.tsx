import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { Portfolio } from "@/components/sections/Portfolio";
import { About } from "@/components/sections/About";
import { Products } from "@/components/sections/Products";
import { Contact } from "@/components/sections/Contact";
import { routing, type Locale } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  return (
    <>
      <Hero />
      <Portfolio />
      <About />
      <Products />
      <Contact />
    </>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
