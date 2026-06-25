"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { Logo } from "@/components/ui/Logo";
import { SITE, CONTACT } from "@/lib/constants";
import { HERO_IMAGE } from "@/lib/data";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative h-screen min-h-[700px] flex items-end overflow-hidden">
      <Image
        src={HERO_IMAGE}
        alt={t("imageAlt")}
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      {/* Top scrim — keeps header readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-transparent" />
      {/* Bottom scrim — keeps hero copy readable */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />

      <div className="relative z-10 w-full px-6 md:px-12 lg:px-20 pb-16 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs md:text-sm tracking-[0.35em] uppercase text-white/90 mb-6 hero-scrim-text">
            {t("tagline")}
          </p>
          <h1 className="sr-only">{SITE.name}</h1>
          <Logo variant="light" size="hero" priority />
          <p className="mt-6 max-w-md text-white/90 text-sm md:text-base font-normal leading-relaxed hero-scrim-text">
            {t("subtitle", { artist: SITE.artist })}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10"
        >
          <Button
            href={CONTACT.instagram}
            variant="primary"
            external
            className="!bg-white !text-foreground !border-white hover:!bg-white/90 shadow-lg shadow-black/20"
          >
            <InstagramIcon />
            {t("instagram")}
          </Button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase text-white/70 hero-scrim-text">
          {t("scroll")}
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-px h-8 bg-white/60"
        />
      </motion.div>
    </section>
  );
}
