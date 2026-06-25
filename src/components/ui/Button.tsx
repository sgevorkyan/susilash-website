import { type ReactNode } from "react";

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost";
  external?: boolean;
  className?: string;
}

const variants = {
  primary:
    "bg-foreground text-background hover:bg-foreground/90 border border-foreground",
  outline:
    "bg-transparent text-foreground border border-foreground/30 hover:border-foreground hover:bg-foreground/5",
  ghost:
    "bg-transparent text-foreground border border-transparent hover:border-foreground/20",
};

export function Button({
  href,
  children,
  variant = "primary",
  external = false,
  className = "",
}: ButtonProps) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`inline-flex items-center justify-center gap-2.5 px-8 py-3.5 text-xs tracking-[0.2em] uppercase font-medium transition-all duration-300 ${variants[variant]} ${className}`}
    >
      {children}
    </a>
  );
}
