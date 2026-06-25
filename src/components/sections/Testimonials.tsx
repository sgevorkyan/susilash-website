import { getTranslations } from "next-intl/server";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface TestimonialEntry {
  quote: string;
  author: string;
  detail: string;
}

export async function Testimonials() {
  const t = await getTranslations("testimonials");
  const items = t.raw("items") as TestimonialEntry[];

  return (
    <section id="testimonials" className="py-24 md:py-32 lg:py-40 bg-beige/40">
      <div className="mx-auto px-6 md:px-12 lg:px-20">
        <SectionHeading
          label={t("label")}
          title={t("title")}
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-6xl mx-auto">
          {items.map((testimonial, i) => (
            <FadeIn key={i} delay={i * 0.15}>
              <blockquote className="flex flex-col h-full p-8 md:p-10 bg-background border border-foreground/5">
                <span className="font-serif text-4xl text-gold/40 leading-none mb-6">
                  &ldquo;
                </span>
                <p className="text-foreground/80 text-sm md:text-base leading-relaxed font-light flex-grow">
                  {testimonial.quote}
                </p>
                <footer className="mt-8 pt-6 border-t border-foreground/5">
                  <cite className="not-italic">
                    <p className="text-sm tracking-wide">{testimonial.author}</p>
                    <p className="text-xs text-muted mt-1 tracking-wider">
                      {testimonial.detail}
                    </p>
                  </cite>
                </footer>
              </blockquote>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
