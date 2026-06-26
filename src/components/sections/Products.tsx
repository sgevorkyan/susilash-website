import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { TelegramIcon } from "@/components/ui/TelegramIcon";
import { CONTACT } from "@/lib/constants";
import { PRODUCT_IMAGES } from "@/lib/data";

interface ProductEntry {
  id: string;
  name: string;
  description: string;
}

export async function Products() {
  const t = await getTranslations("products");
  const items = t.raw("items") as ProductEntry[];

  return (
    <section id="products" className="py-24 md:py-32 lg:py-40">
      <div className="mx-auto px-6 md:px-12 lg:px-20">
        <SectionHeading
          label={t("label")}
          title={t("title")}
          description={t("description")}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {items.map((item, i) => {
            const image = PRODUCT_IMAGES[item.id];

            return (
              <FadeIn key={item.id} delay={i * 0.1}>
                <article className="h-full border border-foreground/8 bg-background transition-colors duration-300 hover:border-foreground/15 overflow-hidden">
                  {image && (
                    <div className="relative aspect-square bg-beige/30">
                      <Image
                        src={image.src}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="p-8 md:p-10">
                    <h3 className="font-serif text-xl md:text-2xl font-light tracking-tight">
                      {item.name}
                    </h3>
                    <p className="mt-4 text-muted text-sm md:text-base font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </article>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn delay={0.4} className="mt-14 md:mt-16 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4">
          <Button href={CONTACT.instagram} external>
            <InstagramIcon />
            {t("cta")}
          </Button>
          <Button href={CONTACT.telegram} variant="outline" external>
            <TelegramIcon />
            {t("telegramCta")}
          </Button>
        </FadeIn>
      </div>
    </section>
  );
}
