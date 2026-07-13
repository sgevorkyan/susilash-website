import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/LinkButton";
import { Recognition } from "@/components/sections/Recognition";
import { ABOUT_IMAGE } from "@/lib/data";
import { SITE } from "@/lib/constants";

export async function AboutPageContent() {
  const t = await getTranslations("about");
  const bio = t.raw("bio") as string[];

  return (
    <>
      <section className="pt-28 pb-16 md:pt-32 md:pb-24">
        <div className="mx-auto px-6 md:px-12 lg:px-20">
          <SectionHeading
            title={t("title")}
            description={t("pageDescription")}
            action={
              <LinkButton href="/" variant="outline">
                {t("backToHome")}
              </LinkButton>
            }
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14 lg:gap-20 items-start max-w-6xl">
            <FadeIn>
              <div className="relative aspect-[3/4] max-w-md mx-auto lg:max-w-none lg:mx-0 overflow-hidden">
                <Image
                  src={ABOUT_IMAGE}
                  alt={t("imageAlt", { artist: SITE.artist })}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 80vw, 40vw"
                  priority
                />
              </div>
            </FadeIn>

            <div className="space-y-5 md:space-y-6">
              {bio.map((paragraph, i) => (
                <FadeIn key={i}>
                  <p className="text-muted text-base md:text-lg leading-relaxed font-light">
                    {paragraph}
                  </p>
                </FadeIn>
              ))}

              <FadeIn className="pt-4">
                <LinkButton href="/courses" variant="outline">
                  {t("courses")}
                </LinkButton>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      <Recognition />
    </>
  );
}
