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
  phone: "+37495280200",
  phoneDisplay: "+374 95 280 200",
  location: "42 Teryan Street, Yerevan, Armenia",
} as const;

export const NAV_ANCHORS = [
  { key: "work" as const, href: "#work" },
  { key: "about" as const, href: "#about" },
  { key: "recognition" as const, href: "#recognition" },
  { key: "testimonials" as const, href: "#testimonials" },
  { key: "contact" as const, href: "#contact" },
] as const;

export const OG_IMAGE =
  "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=1200&q=80";
