"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { Logo } from "@/components/ui/Logo";
import { getNavLinks, type NavLink } from "@/lib/constants";

function getNavHref(link: NavLink) {
  if ("hash" in link) {
    return { pathname: "/" as const, hash: link.hash };
  }
  return link.href;
}

export function Navigation() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const hasHeroHeader = pathname === "/" || pathname === "/products";
  const onHero = hasHeroHeader && !scrolled && !menuOpen;
  const barColor = onHero ? "bg-white" : "bg-foreground";

  const linkClass = (extra = "") =>
    `text-xs tracking-[0.2em] uppercase transition-colors duration-300 ${
      onHero
        ? "text-white/90 hover:text-white hero-scrim-text"
        : "text-foreground/70 hover:text-foreground"
    } ${extra}`.trim();

  const navLinks = getNavLinks();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || menuOpen || !hasHeroHeader
            ? "bg-background/95 backdrop-blur-md border-b border-foreground/5"
            : "bg-transparent"
        }`}
      >
        {onHero && (
          <div
            className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent pointer-events-none"
            aria-hidden="true"
          />
        )}
        <nav className="relative mx-auto flex items-center justify-between px-6 md:px-12 lg:px-20 h-20">
          <Link href="/" className="block">
            <Logo
              variant={onHero ? "light" : "dark"}
              size="nav"
              priority
            />
          </Link>

          <ul className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.key}>
                <Link href={getNavHref(link)} className={linkClass()}>
                  {t(link.key)}
                </Link>
              </li>
            ))}
            <li>
              <LanguageSwitcher variant={onHero ? "light" : "dark"} />
            </li>
          </ul>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden relative w-10 h-10 flex flex-col items-center justify-center"
            aria-label={menuOpen ? t("closeMenu") : t("openMenu")}
            aria-expanded={menuOpen}
          >
            <span
              className={`block w-6 h-px transition-all duration-300 shadow-sm ${barColor} ${
                menuOpen ? "rotate-45 translate-y-px" : "-translate-y-[3px]"
              }`}
            />
            <span
              className={`block w-6 h-px transition-all duration-300 shadow-sm ${barColor} ${
                menuOpen ? "-rotate-45 -translate-y-px" : "translate-y-[3px]"
              }`}
            />
          </button>
        </nav>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-background transition-all duration-500 lg:hidden ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <nav className="flex flex-col items-center justify-center h-full gap-10 px-6">
          {navLinks.map((link, i) => (
            <Link
              key={link.key}
              href={getNavHref(link)}
              onClick={() => setMenuOpen(false)}
              className="font-serif text-3xl font-light tracking-wide text-foreground/80 hover:text-foreground transition-colors"
              style={{ transitionDelay: menuOpen ? `${i * 50}ms` : "0ms" }}
            >
              {t(link.key)}
            </Link>
          ))}

          <div className="mt-6 pt-10 border-t border-foreground/8 w-full max-w-xs">
            <p className="text-[10px] tracking-[0.25em] uppercase text-muted text-center mb-6">
              {t("language")}
            </p>
            <LanguageSwitcher
              layout="menu"
              onLocaleChange={() => setMenuOpen(false)}
            />
          </div>
        </nav>
      </div>
    </>
  );
}
