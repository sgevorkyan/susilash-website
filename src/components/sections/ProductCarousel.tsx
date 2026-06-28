"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export interface ProductCarouselItem {
  id: string;
  name: string;
  imageSrc: string;
}

interface ProductCarouselProps {
  items: ProductCarouselItem[];
  intervalMs?: number;
  previousLabel: string;
  nextLabel: string;
}

function ChevronLeftIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

export function ProductCarousel({
  items,
  intervalMs = 5000,
  previousLabel,
  nextLabel,
}: ProductCarouselProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [timerKey, setTimerKey] = useState(0);
  const reduceMotion = useReducedMotion();

  const goTo = useCallback((nextIndex: number) => {
    setIndex(nextIndex);
    setTimerKey((key) => key + 1);
  }, []);

  const goForward = useCallback(() => {
    setIndex((current) => (current + 1) % items.length);
  }, [items.length]);

  const goBack = useCallback(() => {
    setIndex((current) => (current - 1 + items.length) % items.length);
    setTimerKey((key) => key + 1);
  }, [items.length]);

  const goForwardManual = useCallback(() => {
    goForward();
    setTimerKey((key) => key + 1);
  }, [goForward]);

  useEffect(() => {
    if (reduceMotion || paused || items.length <= 1) return;

    const timer = setInterval(goForward, intervalMs);
    return () => clearInterval(timer);
  }, [goForward, intervalMs, paused, reduceMotion, items.length, timerKey]);

  if (items.length === 0) return null;

  const current = items[index];

  return (
    <div
      className="relative max-w-5xl mx-auto aspect-[4/5] sm:aspect-[16/10] overflow-hidden bg-beige/30"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={current.id}
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
          aria-live="polite"
        >
          <Image
            src={current.imageSrc}
            alt={current.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1024px"
            priority={index === 0}
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent"
            aria-hidden="true"
          />
          <h3 className="absolute bottom-0 left-0 p-6 md:p-10 font-serif text-2xl md:text-3xl lg:text-4xl font-light text-white tracking-tight">
            {current.name}
          </h3>
        </motion.div>
      </AnimatePresence>

      {items.length > 1 && (
        <>
          <button
            type="button"
            onClick={goBack}
            className="absolute left-4 md:left-6 top-1/2 z-10 -translate-y-1/2 p-2 text-white/75 hover:text-white transition-colors duration-300"
            aria-label={previousLabel}
          >
            <ChevronLeftIcon />
          </button>
          <button
            type="button"
            onClick={goForwardManual}
            className="absolute right-4 md:right-6 top-1/2 z-10 -translate-y-1/2 p-2 text-white/75 hover:text-white transition-colors duration-300"
            aria-label={nextLabel}
          >
            <ChevronRightIcon />
          </button>
          <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 flex items-center gap-2 z-10">
            {items.map((item, i) => (
              <button
                key={item.id}
                type="button"
                onClick={() => goTo(i)}
                className={`h-px transition-all duration-500 ${
                  i === index
                    ? "w-8 bg-white"
                    : "w-4 bg-white/40 hover:bg-white/70"
                }`}
                aria-label={item.name}
                aria-current={i === index ? "true" : undefined}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
