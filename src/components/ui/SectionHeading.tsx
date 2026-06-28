import { FadeIn } from "./FadeIn";
import { type ReactNode } from "react";

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  action?: ReactNode;
}

export function SectionHeading({
  label,
  title,
  description,
  align = "left",
  className = "",
  action,
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";
  const actionAlignClass =
    align === "center" ? "flex justify-center" : "flex justify-start";

  return (
    <div className={`mb-16 md:mb-24 max-w-2xl ${alignClass} ${className}`}>
      <FadeIn>
        {label && (
          <p className="text-xs tracking-[0.3em] uppercase text-gold mb-4">{label}</p>
        )}
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.1]">
          {title}
        </h2>
        {description && (
          <p className="mt-6 text-muted text-base md:text-lg leading-relaxed font-light">
            {description}
          </p>
        )}
      </FadeIn>
      {action && (
        <FadeIn delay={0.1} className={`mt-8 ${actionAlignClass}`}>
          {action}
        </FadeIn>
      )}
    </div>
  );
}
