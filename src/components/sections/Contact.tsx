import { getTranslations } from "next-intl/server";
import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/Button";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { TelegramIcon } from "@/components/ui/TelegramIcon";
import { CONTACT } from "@/lib/constants";
import { AddressLink } from "@/components/ui/AddressLink";

export async function Contact() {
  const t = await getTranslations("contact");

  return (
    <section id="contact" className="py-24 md:py-32 lg:py-40">
      <div className="mx-auto px-6 md:px-12 lg:px-20">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <p className="text-xs tracking-[0.3em] uppercase text-gold mb-4">
              {t("label")}
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.1]">
              {t("title")}
            </h2>
            <p className="mt-6 text-muted text-base md:text-lg leading-relaxed font-light max-w-xl mx-auto">
              {t("description")}
            </p>
          </FadeIn>

          <FadeIn delay={0.2} className="mt-12 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4">
            <Button href={CONTACT.instagram} external>
              <InstagramIcon />
              {t("instagram")}
            </Button>
            <Button href={CONTACT.telegram} variant="outline" external>
              <TelegramIcon />
              {t("telegram")}
            </Button>
          </FadeIn>

          <FadeIn delay={0.4} className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 pt-16 border-t border-foreground/8 max-w-4xl mx-auto">
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-muted mb-3">
                {t("phone")}
              </p>
              <a
                href={`tel:${CONTACT.phone}`}
                className="text-sm hover:text-gold transition-colors"
              >
                {CONTACT.phoneDisplay}
              </a>
            </div>
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-muted mb-3">
                {t("email")}
              </p>
              <a
                href={`mailto:${CONTACT.email}`}
                className="text-sm hover:text-gold transition-colors"
              >
                {CONTACT.email}
              </a>
            </div>
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-muted mb-3">
                {t("instagram")}
              </p>
              <a
                href={CONTACT.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:text-gold transition-colors"
              >
                {CONTACT.instagramHandle}
              </a>
            </div>
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-muted mb-3">
                {t("telegram")}
              </p>
              <a
                href={CONTACT.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:text-gold transition-colors"
              >
                {CONTACT.telegramCommunity}
              </a>
            </div>
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-muted mb-3">
                {t("location")}
              </p>
              <AddressLink ariaLabel={t("openInMaps")} />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
