import { getTranslations } from "next-intl/server";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface RecognitionEntry {
  year: string;
  title: string;
  organization: string;
  description?: string;
}

export async function Recognition() {
  const t = await getTranslations("recognition");
  const items = t.raw("items") as RecognitionEntry[];

  return (
    <section id="recognition" className="py-24 md:py-32 lg:py-40">
      <div className="mx-auto px-6 md:px-12 lg:px-20">
        <SectionHeading
          label={t("label")}
          title={t("title")}
          description={t("description")}
        />

        <div className="max-w-4xl">
          {items.map((item, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div className="group grid grid-cols-[80px_1fr] md:grid-cols-[120px_1fr] gap-6 md:gap-12 py-8 border-b border-foreground/8 last:border-b-0">
                <p className="font-serif text-2xl md:text-3xl text-gold/80 font-light">
                  {item.year}
                </p>
                <div>
                  <h3 className="font-serif text-xl md:text-2xl font-light tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs tracking-[0.2em] uppercase text-muted mt-2">
                    {item.organization}
                  </p>
                  {item.description && (
                    <p className="text-muted text-sm md:text-base font-light leading-relaxed mt-4 max-w-xl">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
