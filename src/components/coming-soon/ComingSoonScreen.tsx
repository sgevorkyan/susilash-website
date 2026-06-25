"use client";

import { useCallback, useRef, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { CONTACT } from "@/lib/constants";
import { LOCALE_PREFERENCE_KEY, isValidLocale } from "@/lib/locale-persistence";
import { routing } from "@/i18n/routing";

const TAP_TARGET = 3;
const TAP_WINDOW_MS = 4000;

export function ComingSoonScreen() {
  const [status, setStatus] = useState<"idle" | "unlocking">("idle");
  const tapCount = useRef(0);
  const tapTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetTaps = useCallback(() => {
    tapCount.current = 0;
    if (tapTimer.current) {
      clearTimeout(tapTimer.current);
      tapTimer.current = null;
    }
  }, []);

  const unlock = useCallback(() => {
    const stored = localStorage.getItem(LOCALE_PREFERENCE_KEY);
    const locale =
      stored && isValidLocale(stored) ? stored : routing.defaultLocale;

    const redirect = encodeURIComponent(`/${locale}`);
    window.location.assign(`/api/preview/unlock?redirect=${redirect}`);
  }, []);

  const registerTap = useCallback(() => {
    if (status === "unlocking") return;

    if (tapTimer.current) clearTimeout(tapTimer.current);
    tapCount.current += 1;

    if (tapCount.current >= TAP_TARGET) {
      resetTaps();
      setStatus("unlocking");
      unlock();
      return;
    }

    tapTimer.current = setTimeout(resetTaps, TAP_WINDOW_MS);
  }, [resetTaps, status, unlock]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <button
        type="button"
        onPointerUp={(e) => {
          e.preventDefault();
          registerTap();
        }}
        className="mb-10 select-none touch-manipulation focus:outline-none cursor-pointer"
        aria-label="Susi Lash"
      >
        <Logo size="hero" priority className="pointer-events-none" />
      </button>

      <p className="text-xs tracking-[0.35em] uppercase text-muted mb-4">
        Coming Soon
      </p>
      <h1 className="font-serif text-3xl md:text-4xl font-light tracking-tight max-w-md">
        Our website is being crafted
      </h1>
      <p className="mt-4 text-sm text-muted font-light max-w-sm leading-relaxed">
        Something beautiful is on the way. Follow us on Instagram for updates.
      </p>

      <a
        href={CONTACT.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-10 text-xs tracking-[0.2em] uppercase text-muted hover:text-gold transition-colors"
      >
        {CONTACT.instagramHandle}
      </a>

      {status === "unlocking" && (
        <p className="sr-only" aria-live="polite">
          Opening site
        </p>
      )}
    </div>
  );
}
