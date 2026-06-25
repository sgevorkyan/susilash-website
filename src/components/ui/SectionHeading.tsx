import { FadeIn } from "./FadeIn";

interface SectionHeadingProps {
  label: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  label,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <FadeIn className={`mb-16 md:mb-24 max-w-2xl ${alignClass}`}>
      <p className="text-xs tracking-[0.3em] uppercase text-gold mb-4">{label}</p>
      <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.1]">
        {title}
      </h2>
      {description && (
        <p className="mt-6 text-muted text-base md:text-lg leading-relaxed font-light">
          {description}
        </p>
      )}
    </FadeIn>
  );
}
