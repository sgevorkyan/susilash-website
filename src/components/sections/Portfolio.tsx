import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PORTFOLIO_IMAGES } from "@/lib/data";

export async function Portfolio() {
  const t = await getTranslations("portfolio");

  return (
    <section id="work" className="py-24 md:py-32 lg:py-40">
      <div className="mx-auto px-6 md:px-12 lg:px-20">
        <SectionHeading
          label={t("label")}
          title={t("title")}
          description={t("description")}
        />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {PORTFOLIO_IMAGES.map((item, i) => {
            const alt = t(
              `items.${item.id}` as
                | "items.1"
                | "items.2"
                | "items.3"
                | "items.4"
                | "items.5"
                | "items.6",
            );
            return (
              <FadeIn
                key={item.id}
                delay={i * 0.1}
                className="group relative aspect-square overflow-hidden"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={item.src}
                    alt={alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-white text-xs tracking-[0.15em] uppercase font-light">
                      {alt}
                    </p>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
