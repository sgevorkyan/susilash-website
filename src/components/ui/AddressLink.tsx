"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { CONTACT } from "@/lib/constants";
import { DEFAULT_MAPS_URL, resolveMapsUrl } from "@/lib/maps";

interface AddressLinkProps {
  ariaLabel: string;
  className?: string;
}

export function AddressLink({ ariaLabel, className = "" }: AddressLinkProps) {
  const locale = useLocale();
  const [href, setHref] = useState(DEFAULT_MAPS_URL);

  useEffect(() => {
    setHref(
      resolveMapsUrl(CONTACT.location, {
        userAgent: navigator.userAgent,
        locale,
      }),
    );
  }, [locale]);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={`text-sm hover:text-gold transition-colors ${className}`}
    >
      {CONTACT.location}
    </a>
  );
}
