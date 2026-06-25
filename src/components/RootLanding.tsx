"use client";

import { useCallback, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { CONTACT, SITE } from "@/lib/constants";
import { LOCALE_PREFERENCE_KEY, isValidLocale } from "@/lib/locale-persistence";
import { routing } from "@/i18n/routing";

const TAP_TARGET = 3;
const TAP_WINDOW_MS = 4000;

export function RootLanding() {
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
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <button
        type="button"
        onPointerUp={(e) => {
          e.preventDefault();
          registerTap();
        }}
        className="select-none touch-manipulation focus:outline-none cursor-pointer"
        aria-label={SITE.name}
      >
        <h1 className="font-serif text-5xl sm:text-6xl md:text-8xl font-light tracking-tight pointer-events-none">
          {SITE.name}
        </h1>
      </button>

      <p className="mt-6 text-xs sm:text-sm tracking-[0.35em] uppercase text-muted">
        Luxury Lash Artist
      </p>

      <div className="mt-12 flex flex-col sm:flex-row items-center gap-4">
        <Button href={CONTACT.instagram} variant="outline" external>
          <InstagramIcon />
          Instagram
        </Button>
        <Button href={`mailto:${CONTACT.email}`}>Book Appointment</Button>
      </div>

      {status === "unlocking" && (
        <p className="sr-only" aria-live="polite">
          Opening site
        </p>
      )}
    </main>
  );
}
