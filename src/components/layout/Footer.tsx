import { getTranslations } from "next-intl/server";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { MailIcon } from "@/components/ui/MailIcon";
import { PhoneIcon } from "@/components/ui/PhoneIcon";
import { SITE, CONTACT } from "@/lib/constants";

export async function Footer() {
  const t = await getTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-foreground/5 py-16 md:py-20">
      <div className="mx-auto px-6 md:px-12 lg:px-20 max-w-3xl flex flex-col items-center text-center">
        <p className="font-serif text-2xl md:text-3xl font-light tracking-wide">
          {SITE.name}
        </p>
        <p className="mt-3 text-xs text-muted tracking-[0.15em]">
          {t("tagline", { artist: SITE.artist })}
        </p>

        <div className="mt-10 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-5 sm:gap-x-8 sm:gap-y-4">
          <a
            href={`tel:${CONTACT.phone}`}
            className="inline-flex items-center gap-2.5 text-sm text-muted hover:text-gold transition-colors duration-300"
            aria-label={t("phone")}
          >
            <PhoneIcon />
            {CONTACT.phoneDisplay}
          </a>
          <span
            className="hidden sm:block w-px h-4 bg-foreground/10"
            aria-hidden="true"
          />
          <a
            href={CONTACT.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 text-sm text-muted hover:text-gold transition-colors duration-300"
            aria-label={t("instagram")}
          >
            <InstagramIcon />
            {CONTACT.instagramHandle}
          </a>
          <span
            className="hidden sm:block w-px h-4 bg-foreground/10"
            aria-hidden="true"
          />
          <a
            href={`mailto:${CONTACT.email}`}
            className="inline-flex items-center gap-2.5 text-sm text-muted hover:text-gold transition-colors duration-300"
            aria-label={t("email")}
          >
            <MailIcon />
            {CONTACT.email}
          </a>
        </div>

        <p className="mt-12 pt-8 border-t border-foreground/5 w-full text-[11px] text-muted/70 tracking-wider">
          &copy; {year} {SITE.legalName}. {t("rights")}
        </p>
      </div>
    </footer>
  );
}
