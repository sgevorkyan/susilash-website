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
  "lash-boxes": {
    src: "/products/lash-boxes.webp",
    width: 4058,
    height: 5073,
  },
  "lash-brushes": {
    src: "/products/lash-brushes.webp",
    width: 3714,
    height: 4643,
  },
  "lash-mirrors": {
    src: "/products/lash-mirrors.webp",
    width: 3847,
    height: 4809,
  },
};

export const HERO_IMAGE =
  "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=1920&q=85";
