"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";

export interface ProductCarouselItem {
  id: string;
  name: string;
  imageSrc: string;
}

interface ProductCarouselProps {
  items: ProductCarouselItem[];
  intervalMs?: number;
}

export function ProductCarousel({
  items,
  intervalMs = 4000,
}: ProductCarouselProps) {
  const [index, setIndex] = useState(0);
  const [timerKey, setTimerKey] = useState(0);
  const reduceMotion = useReducedMotion();

  const goTo = useCallback((nextIndex: number) => {
    setIndex(nextIndex);
    setTimerKey((key) => key + 1);
  }, []);

  useEffect(() => {
    if (reduceMotion || items.length <= 1) return;

    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % items.length);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [intervalMs, reduceMotion, items.length, timerKey]);

  if (items.length === 0) return null;

  const current = items[index];

  return (
    <div className="relative max-w-5xl mx-auto aspect-[4/5] sm:aspect-[16/10] overflow-hidden bg-beige/30">
      {items.map((item, i) => (
        <div
          key={item.id}
          className={`absolute inset-0 transition-opacity duration-300 ease-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={i !== index}
        >
          <Image
            src={item.imageSrc}
            alt={item.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1024px"
            priority={i === 0}
          />
        </div>
      ))}

      <div
        className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent pointer-events-none"
        aria-hidden="true"
      />
      <h3
        className="absolute bottom-0 left-0 z-10 p-6 md:p-10 font-serif text-2xl md:text-3xl lg:text-4xl font-light text-white tracking-tight"
        aria-live="polite"
      >
        {current.name}
      </h3>

      {items.length > 1 && (
        <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 z-10 flex items-center gap-2">
          {items.map((item, i) => (
            <button
              key={item.id}
              type="button"
              onClick={() => goTo(i)}
              className={`h-px transition-all duration-300 ${
                i === index
                  ? "w-8 bg-white"
                  : "w-4 bg-white/40 hover:bg-white/70"
              }`}
              aria-label={item.name}
              aria-current={i === index ? "true" : undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
}
