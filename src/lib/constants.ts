export const LOGO = {
  src: "/brand/susi-lash-logo.svg",
  width: 292,
  height: 73,
} as const;

export const SITE = {
  name: "Susi Lash",
  legalName: "Susi Lash Artist LLC",
  artist: "Susi Manukyan",
  artistFirstName: "Susi",
  url: "https://susilash.com",
} as const;

export const CONTACT = {
  email: "info@susilash.com",
  instagram: "https://www.instagram.com/susi.lash",
  instagramHandle: "@susi.lash",
  telegram: "https://t.me/+uNgkA7p4cjE3MzZi",
  telegramCommunity: "Susi Lash Community",
  phone: "+37495280200",
  phoneDisplay: "+374 95 280 200",
  location: "42 Teryan Street, Yerevan, Armenia",
} as const;

export type NavLink =
  | { key: "work" | "about" | "products" | "contact"; href: "/"; hash: string }
  | {
      key: "recognition" | "testimonials";
      href: "/recognition" | "/client_testimonials";
    };

export const NAV_LINKS: NavLink[] = [
  { key: "work", href: "/", hash: "work" },
  { key: "about", href: "/", hash: "about" },
  { key: "products", href: "/", hash: "products" },
  { key: "recognition", href: "/recognition" },
  { key: "testimonials", href: "/client_testimonials" },
  { key: "contact", href: "/", hash: "contact" },
];

export const OG_IMAGE =
  "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=1200&q=80";
