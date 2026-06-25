export interface PortfolioImage {
  id: string;
  src: string;
  width: number;
  height: number;
  span?: "tall" | "wide" | "normal";
}

export const PORTFOLIO_IMAGES: PortfolioImage[] = [
  {
    id: "1",
    src: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800&q=80",
    width: 800,
    height: 1000,
    span: "tall",
  },
  {
    id: "2",
    src: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&q=80",
    width: 800,
    height: 600,
    span: "wide",
  },
  {
    id: "3",
    src: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80",
    width: 800,
    height: 1000,
    span: "normal",
  },
  {
    id: "4",
    src: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80",
    width: 800,
    height: 1200,
    span: "tall",
  },
  {
    id: "5",
    src: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&q=80",
    width: 800,
    height: 600,
    span: "normal",
  },
  {
    id: "6",
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&q=80",
    width: 800,
    height: 900,
    span: "normal",
  },
];

export const ABOUT_IMAGE =
  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80";

export const HERO_IMAGE =
  "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=1920&q=85";
