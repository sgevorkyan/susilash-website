import { getTranslations } from "next-intl/server";
import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/Button";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { TelegramIcon } from "@/components/ui/TelegramIcon";
import { PhoneIcon } from "@/components/ui/PhoneIcon";
import { MailIcon } from "@/components/ui/MailIcon";
import { MapPinIcon } from "@/components/ui/MapPinIcon";
import { CONTACT } from "@/lib/constants";
import { AddressLink } from "@/components/ui/AddressLink";

export async function Contact() {
  const t = await getTranslations("contact");

  return (
    <section id="contact" className="pt-24 pb-12 md:pt-32 md:pb-16 lg:pt-40 lg:pb-20">
      <div className="mx-auto px-6 md:px-12 lg:px-20">
        <div className="max-w-2xl mx-auto text-center">
          <FadeIn>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.1]">
              {t("title")}
            </h2>
            <p className="mt-6 text-muted text-base md:text-lg leading-relaxed font-light">
              {t("description")}
            </p>
          </FadeIn>

          <FadeIn
            delay={0.15}
            className="mt-12 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 w-full max-w-sm sm:max-w-none mx-auto"
          >
            <Button href={`tel:${CONTACT.phone}`} className="w-full sm:w-auto">
              <PhoneIcon />
              {t("call")}
            </Button>
            <Button
              href={CONTACT.instagram}
              variant="outline"
              external
              className="w-full sm:w-auto"
            >
              <InstagramIcon />
              {t("instagram")}
            </Button>
          </FadeIn>

          <FadeIn delay={0.25} className="mt-16 pt-12 border-t border-foreground/8">
            <div className="flex flex-col items-center gap-10 sm:grid sm:grid-cols-2 sm:gap-16 max-w-xl mx-auto w-full">
              <div className="flex flex-col items-center text-center w-full">
                <div className="flex items-center gap-2 mb-2">
                  <MailIcon className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                  <span className="text-xs tracking-[0.2em] uppercase text-muted">
                    {t("email")}
                  </span>
                </div>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-sm hover:text-gold transition-colors break-words"
                >
                  {CONTACT.email}
                </a>
              </div>
              <div className="flex flex-col items-center text-center w-full">
                <div className="flex items-center gap-2 mb-2">
                  <MapPinIcon className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                  <span className="text-xs tracking-[0.2em] uppercase text-muted">
                    {t("location")}
                  </span>
                </div>
                <AddressLink ariaLabel={t("openInMaps")} />
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-foreground/5 text-center">
              <p className="text-xs text-muted font-light leading-relaxed">
                {t("telegramHint")}
              </p>
              <a
                href={CONTACT.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 text-sm text-foreground/70 hover:text-gold transition-colors"
              >
                <TelegramIcon className="w-3.5 h-3.5" />
                {CONTACT.telegramCommunity}
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
