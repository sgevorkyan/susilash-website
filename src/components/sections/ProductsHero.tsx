"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { LinkButton } from "@/components/ui/LinkButton";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { CONTACT, SITE } from "@/lib/constants";
import { PRODUCTS_HERO_IMAGE, PRODUCTS_HERO_IMAGE_MOBILE } from "@/lib/data";

export function ProductsHero() {
  const t = useTranslations("products");

  return (
    <section className="relative min-h-dvh min-h-[700px] flex items-end overflow-hidden">
      <Image
        src={PRODUCTS_HERO_IMAGE_MOBILE.src}
        alt={t("hero.imageAltMobile")}
        fill
        priority
        unoptimized
        className="object-cover object-center md:hidden"
        sizes="100vw"
      />
      <Image
        src={PRODUCTS_HERO_IMAGE.src}
        alt={t("hero.imageAlt")}
        fill
        priority
        unoptimized
        className="hidden object-cover object-[center_22%] md:block"
        sizes="100vw"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full px-6 md:px-12 lg:px-20 pb-safe md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <p className="text-xs md:text-sm tracking-[0.35em] uppercase text-white/90 mb-6 hero-scrim-text">
            {t("hero.tagline")}
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light tracking-tight leading-[1.05] text-white hero-scrim-text">
            {t("hero.title")}
          </h1>
          <p className="mt-6 max-w-lg text-white/90 text-sm md:text-base font-light leading-relaxed hero-scrim-text">
            {t("hero.subtitle", { artist: SITE.artist })}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col sm:flex-row flex-wrap gap-4"
        >
          <Button
            href={CONTACT.instagramShop}
            variant="primary"
            external
            className="!bg-white !text-foreground !border-white hover:!bg-white/90 shadow-lg shadow-black/20"
          >
            <InstagramIcon />
            {t("hero.cta")}
          </Button>
          <LinkButton
            href="/"
            variant="outline"
            className="!text-white !border-white/50 hover:!bg-white/10 hover:!border-white shadow-lg shadow-black/20"
          >
            {t("hero.backToHome")}
          </LinkButton>
        </motion.div>
      </div>
    </section>
  );
}
