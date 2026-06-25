import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ABOUT_IMAGE } from "@/lib/data";
import { SITE } from "@/lib/constants";

export async function About() {
  const t = await getTranslations("about");
  const bio = t.raw("bio") as string[];
  const specializations = t.raw("specializations") as string[];

  return (
    <section id="about" className="py-24 md:py-32 lg:py-40 bg-beige/40">
      <div className="mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <FadeIn>
            <div className="relative aspect-[3/4] max-w-lg mx-auto lg:mx-0 overflow-hidden">
              <Image
                src={ABOUT_IMAGE}
                alt={t("imageAlt", { artist: SITE.artist })}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 80vw, 40vw"
              />
            </div>
          </FadeIn>

          <div>
            <SectionHeading
              label={t("label")}
              title={t("title", { name: SITE.artistFirstName })}
            />

            <div className="space-y-6">
              {bio.map((paragraph, i) => (
                <FadeIn key={i} delay={i * 0.15}>
                  <p className="text-muted text-base md:text-lg leading-relaxed font-light">
                    {paragraph}
                  </p>
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={0.5} className="mt-12">
              <p className="text-xs tracking-[0.3em] uppercase text-gold mb-6">
                {t("specializationsLabel")}
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {specializations.map((item) => (
                  <li
                    key={item}
                    className="text-sm text-foreground/80 font-light flex items-center gap-3"
                  >
                    <span className="w-1 h-1 rounded-full bg-gold flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
