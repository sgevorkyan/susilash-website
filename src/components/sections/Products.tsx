import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/LinkButton";
import { ProductCarousel } from "@/components/sections/ProductCarousel";
import { HOME_CAROUSEL_PRODUCT_IDS, PRODUCT_IMAGES } from "@/lib/data";

interface ProductEntry {
  id: string;
  name: string;
  description: string;
}

interface ProductsProps {
  variant?: "preview" | "page";
}

export async function Products({ variant = "preview" }: ProductsProps) {
  const t = await getTranslations("products");
  const items = t.raw("items") as ProductEntry[];
  const itemsById = new Map(items.map((item) => [item.id, item]));

  const carouselItems = HOME_CAROUSEL_PRODUCT_IDS.flatMap((id) => {
    const item = itemsById.get(id);
    const image = PRODUCT_IMAGES[id];
    if (!item || !image) return [];

    return [{ id: item.id, name: item.name, imageSrc: image.src }];
  });

  return (
    <section
      id="products"
      className={
        variant === "preview"
          ? "py-24 md:py-32 lg:py-40"
          : "pt-16 pb-24 md:pt-20 md:pb-32 lg:pb-40"
      }
    >
      <div className="mx-auto px-6 md:px-12 lg:px-20">
        <SectionHeading
          title={variant === "preview" ? t("title") : t("grid.title")}
          description={variant === "preview" ? t("description") : t("grid.description")}
          action={
            variant === "preview" ? (
              <LinkButton href="/products" variant="outline">
                {t("viewAll")}
              </LinkButton>
            ) : undefined
          }
        />

        {variant === "preview" ? (
          <ProductCarousel items={carouselItems} />
        ) : (
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
        )}
      </div>
    </section>
  );
}
