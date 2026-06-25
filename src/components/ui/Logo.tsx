import Image from "next/image";
import { LOGO, SITE } from "@/lib/constants";

const sizes = {
  nav: { width: 140, height: 35, className: "h-7 w-auto" },
  footer: { width: 120, height: 30, className: "h-6 w-auto" },
  hero: { width: 320, height: 80, className: "h-16 md:h-20 lg:h-24 w-auto" },
} as const;

type LogoSize = keyof typeof sizes;

interface LogoProps {
  variant?: "dark" | "light";
  size?: LogoSize;
  priority?: boolean;
  className?: string;
}

export function Logo({
  variant = "dark",
  size = "nav",
  priority = false,
  className = "",
}: LogoProps) {
  const { width, height, className: sizeClass } = sizes[size];

  return (
    <Image
      src={LOGO.src}
      alt={SITE.name}
      width={width}
      height={height}
      priority={priority}
      className={`${sizeClass} ${variant === "light" ? "hero-logo-light" : ""} ${className}`.trim()}
    />
  );
}
