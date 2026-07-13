import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/LinkButton";
import { ABOUT_IMAGE } from "@/lib/data";
import { SITE } from "@/lib/constants";

export async function About() {
  const t = await getTranslations("about");
  const bio = t.raw("bio") as string[];

  return (
    <section id="about" className="py-16 md:py-24 lg:py-32 bg-beige/40">
      <div className="mx-auto px-6 md:px-12 lg:px-20">
        <SectionHeading
          title={t("title")}
          className="mb-8 md:mb-10 lg:mb-14"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 xl:gap-20 items-start">
          <FadeIn>
            <div className="relative aspect-[3/4] max-w-sm mx-auto lg:max-w-none lg:mx-0 overflow-hidden">
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
            <div className="space-y-5 md:space-y-6">
              {bio.map((paragraph, i) => (
                <FadeIn key={i} delay={i * 0.15}>
                  <p className="text-muted text-base md:text-lg leading-relaxed font-light">
                    {paragraph}
                  </p>
                </FadeIn>
              ))}
            </div>

            <FadeIn
              delay={0.5}
              className="mt-8 md:mt-10 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4"
            >
              <LinkButton href="/about" variant="outline">
                {t("moreAbout")}
              </LinkButton>
              <LinkButton href="/courses" variant="outline">
                {t("courses")}
              </LinkButton>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
