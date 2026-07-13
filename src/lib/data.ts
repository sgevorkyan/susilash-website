export interface PortfolioImage {
  id: string;
  src: string;
  width: number;
  height: number;
}

export const PORTFOLIO_IMAGES: PortfolioImage[] = [
  {
    id: "1",
    src: "/portfolio/signature-01.webp",
    width: 2876,
    height: 2876,
  },
  {
    id: "2",
    src: "/portfolio/signature-02.webp",
    width: 1280,
    height: 1280,
  },
  {
    id: "3",
    src: "/portfolio/signature-03.webp",
    width: 2684,
    height: 2684,
  },
  {
    id: "4",
    src: "/portfolio/signature-04.webp",
    width: 1280,
    height: 1280,
  },
  {
    id: "5",
    src: "/portfolio/signature-05.webp",
    width: 1280,
    height: 1280,
  },
  {
    id: "6",
    src: "/portfolio/signature-06.webp",
    width: 2693,
    height: 2693,
  },
];

export const ABOUT_IMAGE = "/about/susi-about.webp";

export const FLAGSHIP_PRODUCT_ID = "lash-extensions";

/** Homepage carousel order — full catalog lives in messages/products.items. */
export const HOME_CAROUSEL_PRODUCT_IDS = [
  "lash-extensions",
  "lash-extensions2",
  "lash-boxes",
  "lash-trays",
  "lash-tweezers",
  "lash-brushes2",
  "lash-mirrors",
] as const;

/** Bump when replacing files in /public to bust browser and CDN cache. */
export const PUBLIC_ASSET_VERSION = "3";

function publicAsset(path: string) {
  return `${path}?v=${PUBLIC_ASSET_VERSION}`;
}

export const PRODUCTS_HERO_IMAGE = {
  src: publicAsset("/products/products-hero.webp"),
  width: 1672,
  height: 941,
} as const;

/** Portrait crop for mobile — Susi with the product in frame. */
export const PRODUCTS_HERO_IMAGE_MOBILE = {
  src: publicAsset("/products/products-hero-mobile.webp"),
  width: 900,
  height: 1080,
} as const;

export interface ProductImage {
  src: string;
  width: number;
  height: number;
}

/** Product photos in public/products/ */
export const PRODUCT_IMAGES: Record<string, ProductImage | null> = {
  "lash-extensions": {
    src: "/products/lash-extensions.webp",
    width: 4499,
    height: 4498,
  },
  "lash-extensions2": {
    src: "/products/lash-extensions2.webp",
    width: 4146,
    height: 4146,
  },
  "lash-boxes": {
    src: "/products/lash-boxes.webp",
    width: 4058,
    height: 5073,
  },
  "lash-trays": {
    src: "/products/lash-trays.webp",
    width: 3848,
    height: 4810,
  },
  "lash-brushes": {
    src: "/products/lash-brushes.webp",
    width: 3714,
    height: 4643,
  },
  "lash-brushes2": {
    src: "/products/lash-brushes2.webp",
    width: 4160,
    height: 4160,
  },
  "lash-mirrors": {
    src: "/products/lash-mirrors.webp",
    width: 3847,
    height: 4809,
  },
  "lash-tweezers": {
    src: "/products/lash-tweezers.webp",
    width: 4130,
    height: 4130,
  },
};

export const HERO_IMAGE =
  "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=1920&q=85";
